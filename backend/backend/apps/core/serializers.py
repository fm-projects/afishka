from rest_framework import serializers

from backend.apps.core.models import Event, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "id", "is_staff"]


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "starred_events", "id", "is_staff"]
