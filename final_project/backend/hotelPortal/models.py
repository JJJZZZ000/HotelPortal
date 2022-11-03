from enum import Enum
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models

class Client(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    age = models.PositiveIntegerField()
    gender = models.CharField(null=True, blank=True)
    tele = models.CharField(max_length=20)

class Payment(models.Model):
    class Status(models.TextChoices):
        Unpaid = 'Unpaid'
        Paid = 'Paid'
        Canceled = 'Canceled'

    price = models.FloatField(validators=[MinValueValidator(0)],)
    status = models.CharField(
        max_length=8,
        choices=Status.choices,
        default=Status.Unpaid,
    )

class Room(models.Model):
    # class Type(models.TextChoice):
    #     Standard = 'Standard',
    #     Deluxe = 'Deluxe',
    #     Connecting = 'Connecting',
    #     Suite = 'Suite',
    # class Direction(models.TextChoices):
    #     North = 'North',
    #     South = 'South',
    #     East = 'East',
    #     West = 'West',
    Type = (
        ('Standard', 'Standard'),
        ('Deluxe', 'Deluxe'),
        ('Connecting', 'Connecting'),
        ('Suite', 'Suite')
    )
    Direction= (
        ('North', 'North'),
        ('South', 'South'),
        ('East', 'East'),
        ('West', 'West')
    )
    type = models.CharField(
        max_length = 10,
        choices=Type.choices,
        default=Type.Standard,
    )
    occupancy = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    roomNum = models.CharField(max_length=5)
    direction = models.CharField(
        max_length=12,
        choices=Direction.choices,
        default='All'
    )
    price = models.FloatField(validators=[MinValueValidator(0)],)

class Order(models.Model):
    roomList = models.ForeignKey(Room, on_delete=models.PROTECT)
    client = models.ForeignKey(Client, on_delete=models.PROTECT)
    payment = models.ForeignKey(Payment, on_delete=models.PROTECT)
    startTime = models.DateField(null=True, blank=True)
    endTime = models.DateField(null=True, blank=True)
