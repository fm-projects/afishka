from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class TelegramUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="tg_user")
    telegram_id = models.IntegerField(null=False, unique=True)
    data = models.JSONField(null=True)

    def __str__(self):
        return self.telegram_username


class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    slug = models.SlugField(max_length=100, unique=True)
    thumbnail = models.ImageField(upload_to="events")
    organizer = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    min_price = models.IntegerField()
    max_price = models.IntegerField()
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"
