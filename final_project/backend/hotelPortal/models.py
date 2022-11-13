from enum import Enum
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class Client(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(null=True, blank=True, max_length=10)
    tele = models.CharField(max_length=20)


class Payment(models.Model):
    Unpaid = 'Unpaid'
    Paid = 'Paid'
    Canceled = 'Canceled'

    STATUS_CHOICES = [
        (Unpaid, 'Unpaid'),
        (Paid, 'Paid'),
        (Canceled, 'Canceled'),
    ]

    price = models.FloatField(validators=[MinValueValidator(0)], )
    status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default=Unpaid,
    )


class Room(models.Model):
    Standard = 'Standard'
    Deluxe = 'Deluxe'
    Connecting = 'Connecting'
    Suite = 'Suite'

    TYPE_CHOICES = [
        (Standard, 'Standard'),
        (Deluxe, 'Deluxe'),
        (Connecting, 'Connecting'),
        (Suite, 'Suite'),
    ]

    North = 'North'
    South = 'South'
    East = 'East'
    West = 'West'

    DIRECTION_CHOICES = [
        (North, 'North'),
        (South, 'South'),
        (East, 'East'),
        (West, 'West'),
    ]

    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        default=Standard,
    )

    occupancy = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    roomNum = models.CharField(max_length=5)
    direction = models.CharField(
        max_length=12,
        choices=DIRECTION_CHOICES,
        default=North
    )
    price = models.FloatField(validators=[MinValueValidator(0)], )


class Order(models.Model):
    room = models.ForeignKey(Room, on_delete=models.PROTECT)
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    payment = models.ForeignKey(Payment, on_delete=models.PROTECT)
    startTime = models.DateField(null=True, blank=True)
    endTime = models.DateField(null=True, blank=True)
