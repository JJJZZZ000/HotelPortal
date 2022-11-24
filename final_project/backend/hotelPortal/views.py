from random import randint
import requests
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.http import HttpResponse, Http404, HttpResponseForbidden, JsonResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
# from django.utils.datetime_safe import datetime
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import Q
from django.db import models, transaction, IntegrityError, OperationalError
from django.contrib.auth.models import User
from django.utils.dateparse import parse_date
import os
import threading
from flask import Flask, redirect, request

import stripe

from django.utils import timezone
import datetime
from datetime import timedelta
from hotelPortal.models import Room, Order, Client, Payment

import json
import django.middleware.csrf


@login_required
@ensure_csrf_cookie
def home(request):
    return


def login(request):
    if request.headers['access-token'] is None:
        return HttpResponse(status=403)
    user = getUser(request)
    if user is None:
        response = requests.get(
            'https://www.googleapis.com/oauth2/v3/tokeninfo',
            params={'id_token': request.headers['access-token']}
        )
        if not response.ok:
            return HttpResponse(status=403)
        info = response.json()
        username = info['email']
        firstname = info['given_name']
        lastname = info['family_name']
        email = info['email']
        user = User.objects.create_user(username=username,
                                        password="111111",
                                        email=email,
                                        first_name=firstname,
                                        last_name=lastname)
        user.save()

    return HttpResponse(status=200)





def _my_json_error_response(message, status=200):
    # You can create your JSON by constructing the string representation yourself (or just use json.dumps)
    response_json = '{ "error": "' + message + '" }'
    return HttpResponse(response_json, content_type='application/json', status=status)


def demo(request):
    response_data = []
    # for model_item in AjaxItem.objects.all():
    #     my_item = {
    #         'id': model_item.id,
    #         'text': model_item.text,
    #         'ip_addr': str(model_item.ip_addr),
    #         'user': model_item.user.username,
    #     }
    #     response_data.append(my_item)

    my_item = {
        'id': 123,
        'text': 'Hello world!',
    }
    response_data.append(my_item)

    response_json = json.dumps(response_data)

    response = HttpResponse(response_json, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'

    return response


def getUser(request):
    # for the first time logging in, request could not find 'access-token' header.
    try:
        access_token = request.headers['access-token']
    except:
        return None

    if access_token is None:
        return None
    response = requests.get(
        'https://www.googleapis.com/oauth2/v3/tokeninfo',
        params={'id_token': access_token}
    )
    if not response.ok:
        return None
    email = response.json()['email']
    user = User.objects.filter(email=email).first()
    # print(user.email)
    return user


def order_list(request):
    user = getUser(request)
    if user is None:
        return HttpResponse(status=403)
    response_data = []
    if request.method == 'GET':
        order_room = request.GET.get('room', None)
        order_paymentStatus = request.GET.get('paymentStatus', None)
        order_startTime = request.GET.get('startTime', None)
        order_endTime = request.GET.get('endTime', None)
        query_set = Order.objects.all()
        if order_room:
            query_set = query_set.filter(room__roomNum=order_room)
        if order_paymentStatus:
            query_set = query_set.filter(payment__status=order_paymentStatus)
        if order_startTime:
            start_date = parse_date(order_startTime)
            # end_date = parse_date(order_endTime)
            query_set = query_set.filter(startTime__gte=start_date)
        if order_endTime:
            end_date = parse_date(order_endTime)
            query_set = query_set.filter(endTime__lte=end_date)
        resp_data = []
        pk = 1
        for order in query_set.iterator():
            data = {}
            data['model'] = 'hotelPortal.room'
            data['pk'] = pk
            pk = pk + 1
            fields = {}
            fields['room'] = order.room.roomNum
            fields['paymentStatus'] = order.payment.status
            fields['paymentPrice'] = order.room.price * (order.endTime - order.startTime).days
            fields['startTime'] = order.startTime.strftime("%Y-%m-%d")
            fields['endTime'] = order.endTime.strftime("%Y-%m-%d")
            data['fields'] = fields
            resp_data.append(data)
        # orders = serializers.serialize("json", resp_data)
        orders = json.dumps(resp_data)
        response_data = orders
    response = HttpResponse(response_data, content_type='application/json')
    # response = JsonResponse(list(response_data), safe=False)
    response['Access-Control-Allow-Origin'] = '*'

    return response


def cancel_order(request):
    return


def room_list(request):
    response_data = []
    if request.method == 'GET':
        room_type = request.GET.get('type', None)
        room_direction = request.GET.get('direction', None)
        room_occupancy = request.GET.get('occupancy', None)
        room_price = request.GET.get('price', None)
        start_time = request.GET.get('startTime', None)
        end_time = request.GET.get('endTime', None)

        print(start_time, end_time, datetime.datetime.now())
        # process with the time format.

        query_set = Room.objects.all()
        if room_type:
            query_set = query_set.filter(type=room_type)
        if room_direction:
            query_set = query_set.filter(direction=room_direction)
        if room_occupancy:
            if room_occupancy == 'One':
                query_set = query_set.filter(occupancy=1)
            elif room_occupancy == 'Two':
                query_set = query_set.filter(occupancy=2)
            elif room_occupancy == 'Three':
                query_set = query_set.filter(occupancy=3)
            else:
                query_set = query_set.filter(occupancy__gt=3)
        if room_price:
            if room_price == '1':
                query_set = query_set.filter(price__lte=100)
            elif room_price == '2':
                query_set = query_set.filter(price__gte=100, price__lte=200)
            elif room_price == '3':
                query_set = query_set.filter(price__gte=200, price__lte=300)
            else:
                query_set = query_set.filter(price__gte=300)
        if start_time is None:
            now = datetime.datetime.now()
            start_time = now
            end_time = now + timedelta(days=1)
        # else:
        # process with the startTime format.

        # get all orders which have a crash with the target time period.
        orders = Order.objects.exclude(Q(startTime__gte=end_time) | Q(endTime__lte=start_time)).all()
        room_ids = []
        for order in orders:
            room_ids.append(order.room.roomNum)
        room_ids = list(set(room_ids))
        query_set = query_set.exclude(roomNum__in=room_ids)
        rooms = serializers.serialize("json", query_set)
        response_data = rooms
        print(rooms)

    # response_json = json.dumps(response_data)

    response = HttpResponse(response_data, content_type='application/json')
    # response = JsonResponse(list(response_data), safe=False)
    response['Access-Control-Allow-Origin'] = '*'

    return response


# deprecated
def room_detail(request, id):
    response_data = []
    if request.method == 'GET':
        room = serializers.serialize("json", Room.objects.filter(id=id).all())
        response_data = room

    response = HttpResponse(response_data, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'

    return response


@ensure_csrf_cookie
def checkout(request):
    response_data = []
    if request.method == 'POST':
        data = json.loads(request.body)['data']
        rooms = data['rooms']
        start_time = data['startTime']
        end_time = data['endTime']
        total_day = data['totalDay']
        print(rooms, start_time, end_time)

        lock = threading.Lock()
        if lock.acquire():
            try:
                # if there are concurrent requests, the second request will wait until the
                # first request finish the transaction.
                # So here verify and remove any conflicts.
                no_conflict_rooms = []
                for room in rooms:
                    target_room = Room.objects.filter(roomNum=room['roomNum']).all()[0]
                    conflict_order = Order.objects.filter(room=target_room).exclude(
                        Q(startTime__gte=end_time) | Q(endTime__lte=start_time)).all()
                    if len(conflict_order) == 0:
                        no_conflict_rooms.append(room)
                if len(no_conflict_rooms) == 0:
                    response_data.append("All rooms are booked!")
                    response = HttpResponse(response_data, content_type='application/json')
                    return response
                rooms = no_conflict_rooms
                print(rooms)
                try:
                    with transaction.atomic():

                        # 1.add payment.
                        total_price = 0
                        for room in rooms:
                            total_price += room['price'] * total_day
                        payment = Payment(price=total_price, status=Payment.Unpaid)
                        payment.save()

                        # 2.add orders.
                        for room in rooms:
                            target_room = Room.objects.filter(roomNum=room['roomNum']).all()[0]
                            # just for test so hard code it.
                            new_user = {}
                            if len(User.objects.filter(username='test').all()) == 0:
                                new_user = User.objects.create_user(username='test', password='111')
                                new_user.save()
                            else:
                                new_user = User.objects.filter(username='test').all()[0]
                            client = Client(user=new_user, age=10, gender='male', tele='13680309545')
                            client.save()
                            order = Order(room=target_room, payment=payment, startTime=start_time,
                                          endTime=end_time, client=client)
                            order.save()

                        # 3.call stripe.
                        stripe.api_key = "sk_test_51M3RttD0xw27lQoLvFVh8cmQgWisx8ZE2FpO7xqsbYw6SeLdIFuLfjE7nyXkoJiFRjsDR7GEpry4vO3L6XnLTsRf00lpwoFMMx"

                        # app = Flask(__name__,
                        #             static_url_path='',
                        #             static_folder='public')
                        MY_DOMAIN = 'http://localhost:3000/hotelPortal'

                        # @app.route('/create-checkout-session', methods=['POST'])
                        # def create_checkout_session():
                        # set up the product.
                        picture = ''
                        for room in rooms:
                            picture = room['roomPicture']
                        product = stripe.Product.create(name=payment.id,
                                                        images=[picture])
                        # set up the price.
                        stripe_payment = stripe.Price.create(product=product.id, unit_amount=payment.price,
                                                             currency="usd")
                        checkout_session = stripe.checkout.Session.create(
                            line_items=[
                                {
                                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                                    'price': stripe_payment.id,
                                    'quantity': 1,
                                },
                            ],
                            mode='payment',
                            success_url=MY_DOMAIN + '/#/success?payment_id=' + str(payment.id),
                            cancel_url=MY_DOMAIN + '/#/failed',
                        )
                        # return render(redirect(checkout_session.url, code=303))
                        # print(checkout_session.url)
                        # response = HttpResponseRedirect(checkout_session.url)
                        # response.status_code = 303
                        #
                        # token = request.COOKIES.get('csrftoken')
                        # print(token)
                        # response.set_cookie('csrftoken', token)
                        # response.set_cookie('X-CSRFToken', token)
                        # response.headers['X-CSRFToken'] = token

                        # temp = {
                        #     'url': checkout_session.url,
                        # }
                        response_data.append(checkout_session.url)
                        print(checkout_session)
                        response = HttpResponse(response_data, content_type='application/json')
                        return response
                except Exception as e:
                    print(e)
                    transaction.rollback()

            except Exception as e:
                print(e)
            finally:
                lock.release()

    response = HttpResponse(response_data, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Credentials'] = 'true'
    # response['Access-Control-Allow-Headers'] = 'X-CSRFToken'
    return response


def add_room(request):
    response_data = []
    roomPicture1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMkH20Fc2sMlDoCMMMFoLLPe6ZP2-lMwSgg&usqp=CAU"
    roomPicture2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlPGxaNOGgbwuqZgZcJ2EqKgBVdL0HZ7T9w&usqp=CAU"
    roomPicture3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4eR2ZNo5m4tF_dOjR-UMKLIVdhyxH7wCYrQ&usqp=CAU"
    roomPicture4 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe1M3BVgc5ENOYkVy6GbInsKwzFVMWsu5scg&usqp=CAU"
    room1 = Room(type=Room.Standard, occupancy=2, roomNum='A101', direction=Room.East, price=200, roomPicture=roomPicture1)
    room2 = Room(type=Room.Deluxe, occupancy=3, roomNum='A102', direction=Room.West, price=500, roomPicture=roomPicture2)
    room3 = Room(type=Room.Suite, occupancy=4, roomNum='A103', direction=Room.North, price=700, roomPicture=roomPicture3)
    room4 = Room(type=Room.Connecting, occupancy=5, roomNum='A104', direction=Room.South, price=100, roomPicture=roomPicture4)
    room1.save()
    room2.save()
    room3.save()
    room4.save()

    response_json = json.dumps(response_data)

    response = HttpResponse(response_json, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'

    return response


def add_order(request):
    add_room(request)
    response_data = []
    room1 = Room.objects.all()[0]
    payment1 = Payment(price=100.00, status=Payment.Unpaid)
    payment1.save()
    user = User.objects.create_user(username=str(randint(1, 10000)),
                                    email='deyneeraj666.com',
                                    password='glass onion')
    user.save()
    client1 = Client(user=user, tele="123", age=10)
    client1.save()
    startTime = datetime.datetime.now()
    endTime = datetime.datetime.now()
    order1 = Order(room=room1, client=client1, payment=payment1, startTime=startTime, endTime=endTime)
    order1.save()
    response_json = json.dumps(response_data)
    response = HttpResponse(response_json, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    print()
    return response


def change_payment_status(request):
    response_data = []
    if request.method == 'POST':
        data = json.loads(request.body)['data']
        payment_id = data['paymentId']
        Payment.objects.filter(pk=payment_id).update(status=Payment.Paid)

    response = HttpResponse(response_data, content_type='application/json')
    return response


def get_csrf_token(request):
    token = django.middleware.csrf.get_token(request)
    response_data = {}
    print(token)
    # print(token)
    # response_data = {
    #     'csrf_token': token,
    # }
    response = HttpResponse(response_data, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    return response
