from rest_framework import viewsets, serializers, permissions, status

from backend.apps.core.models import User
from backend.apps.core.serializers import UserSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken


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
