from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.http import HttpResponse, Http404, HttpResponseForbidden, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import models
from django.db.models import Q

from django.utils import timezone
import datetime
from datetime import timedelta

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
        orders = Order.objects.exclude(Q(startTime__gte=end_time) & Q(endTime__gte=start_time)).all()
        room_ids = []
        for order in orders:
            room_ids.append(order.room.roomNum)
        room_ids = list(set(room_ids))
        query_set = query_set.exclude(roomNum__in=room_ids)
        rooms = serializers.serialize("json", query_set)
        response_data = rooms

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