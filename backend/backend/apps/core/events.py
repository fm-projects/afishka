from .models import Event
from rest_framework import serializers, viewsets, routers
import django_filters


class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "description",
            "start",
            "end",
            "price",
            "address",
            "organizer",
            "accepted",
            "thumbnail",
            "reg_needed",
            "participants",
            "verbose_address",
        ]


class EventFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter(field_name="start")
    reg_needed = django_filters.BooleanFilter()
    accepted = django_filters.BooleanFilter()

    class Meta:
        model = Event
        fields = {
            "price": ["lte", "gte"],
            "participants": ["lte", "gte"],
            "id": ["in"],
        }


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventListSerializer
    ordering = ["start"]
    filterset_class = EventFilter


router = routers.SimpleRouter(trailing_slash=False)
router.register("events", EventViewSet)

urlpatterns = router.urls
