from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Event(models.Model):
    EVENT_TYPES = (
        (0, "Ограниченная группа"),
        (1, "Индивидуальное"),
        (2, "Массовое"),
    )
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    duration = models.DurationField()
    slug = models.SlugField(max_length=100, unique=True)
    event_type = models.IntegerField(choices=EVENT_TYPES, default=0)
    max_members = models.IntegerField(default=30)
    reg_needed = models.BooleanField(default=False)
    thumbnail = models.ImageField(upload_to="events")
    organizer = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    min_price = models.IntegerField()
    max_price = models.IntegerField()
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"

    def __str__(self):
        return self.name
