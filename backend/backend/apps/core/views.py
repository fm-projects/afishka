from rest_framework import viewsets, serializers, permissions, status

from backend.apps.core.models import Event, User
from backend.apps.core.serializers import UserSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from django.shortcuts import get_object_or_404


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LogoutView(APIView):
    """Logout users by blacklisting their refresh token."""

    class RefreshTokenSerializer(serializers.Serializer):
        refresh = serializers.CharField()

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        """Logout the user."""
        serializer = self.RefreshTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data["refresh"]
        try:
            token = RefreshToken(refresh_token, verify=True)
            token.blacklist()
        except Exception as e:
            raise TokenError(e)
        return Response(status=status.HTTP_205_RESET_CONTENT)


class EventActionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    class EventActionSerializer(serializers.Serializer):
        event = serializers.IntegerField()
        star = serializers.BooleanField(default=True)

    def post(self, request):
        request.user: User
        serializer = self.EventActionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = get_object_or_404(Event, pk=serializer.data["event"])
        if serializer.data["star"]:
            request.user.starred_events.add(event)
        else:
            request.user.starred_events.remove(event)
        return Response(status=status.HTTP_204_NO_CONTENT)
