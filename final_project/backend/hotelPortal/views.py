from random import randint

from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.http import HttpResponse, Http404, HttpResponseForbidden, JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils.datetime_safe import datetime
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import models
from django.contrib.auth.models import User
from hotelPortal.models import Room, Order, Client, Payment

import json


@login_required
@ensure_csrf_cookie
def home(request):
    return


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

def order_list(request):
    response_data = []
    if request.method == 'GET':
        order_room = request.GET.get('room', None)
        order_paymentStatus = request.GET.get('paymentStatus', None)
        order_startTime = request.GET.get('startTime', None)
        order_endTime = request.GET.get('endTime', None)
        query_set = Order.objects.all()
        # if order_room:
        orders = serializers.serialize("json", query_set)
        response_data = orders

        print(order_startTime)

    # response_json = json.dumps(response_data)
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

        query_set = Room.objects.all()
        if room_type:
            query_set = query_set.filter(type=room_type)
        if room_direction:
            query_set = query_set.filter(direction=room_direction)
        if room_occupancy:
            print(room_occupancy)
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
        rooms = serializers.serialize("json", query_set)
        response_data = rooms

    # response_json = json.dumps(response_data)

    response = HttpResponse(response_data, content_type='application/json')
    # response = JsonResponse(list(response_data), safe=False)
    response['Access-Control-Allow-Origin'] = '*'

    return response


def add_room(request):
    response_data = []
    room1 = Room(type=Room.Standard, occupancy=2, roomNum='A101', direction=Room.East, price=200)
    room2 = Room(type=Room.Deluxe, occupancy=3, roomNum='A102', direction=Room.West, price=500)
    room1.save()
    room2.save()

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
    user = User.objects.create_user(username=str(randint(1,10000)),
                                    email='deyneeraj666.com',
                                    password='glass onion')
    user.save()
    client1 = Client(user=user, tele="123", age=10)
    client1.save()
    startTime = datetime.now()
    endTime = datetime.now()
    order1 = Order(room=room1, client=client1, payment=payment1, startTime=startTime, endTime=endTime)
    order1.save()
    response_json = json.dumps(response_data)
    response = HttpResponse(response_json, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    print()
    return response

