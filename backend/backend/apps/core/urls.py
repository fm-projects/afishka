from django.urls import path, include

from backend.apps.core import views

urlpatterns = [
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/jwt/blacklist/", views.LogoutView.as_view(), name="jwt-blacklist"),
    path("", include("backend.apps.core.events")),
    path("star-event", views.EventActionAPIView.as_view())
]
