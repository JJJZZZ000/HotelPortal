from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.http import HttpResponse, Http404, HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

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
