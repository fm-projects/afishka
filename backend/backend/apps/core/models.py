from datetime import timedelta
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import datetime


class User(AbstractUser):
    starred_events = models.ManyToManyField(to="Event")


class Event(models.Model):
    name = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", blank=True)
    start = models.DateTimeField("Начало")
    end = models.DateTimeField("Окончание")
    participants = models.IntegerField("Количество участников", default=1)
    reg_needed = models.BooleanField("Требуется регистрация", default=False)
    # thumbnail = models.ImageField("Обложка", upload_to="events", blank=True)
    organizer = models.CharField("Организатор", max_length=100, blank=True)
    address = models.CharField("Адрес", max_length=200, blank=True)
    verbose_address = models.CharField("Краткий адрес", max_length=200, blank=True)
    price = models.IntegerField("Цена", default=0)
    max_price = models.IntegerField("Максимальная цена", default=None, null=True, blank=True)

    accepted = models.BooleanField("Прошло модерацию", default=False)
    creator = models.ForeignKey(
        to=User, on_delete=models.CASCADE, verbose_name="Создатель"
    )

    class Meta:
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"

    def __str__(self):
        return self.name
