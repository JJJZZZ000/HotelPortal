from django.urls import path
from hotelPortal import views

urlpatterns =[
    path('', views.home),
#     path('add-item', views.add_item, name='ajax-add-item'),
#     path('delete-item/<int:item_id>', views.delete_item, name='ajax-delete-item'),
#     path('get-list', views.get_list_json_dumps_serializer),
#     path('get-list-django-serializer', views.get_list_django_serializer),
#     path('get-list-xml', views.get_list_xml),
#     path('get-list-xml-template', views.get_list_xml_template),

    path('demo', views.demo),
    path('room_list', views.room_list),
    path('add_room', views.add_room),
    path('room_detail/<int:id>', views.room_detail),
]