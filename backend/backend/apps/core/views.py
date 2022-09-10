from rest_framework import viewsets

from backend.apps.core.models import User
from backend.apps.core.serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
