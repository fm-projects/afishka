from .models import Event
from rest_framework import serializers, viewsets, routers
import django_filters
from django.db.models import Q


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
            # "thumbnail",
            "reg_needed",
            "participants",
            "verbose_address",
            "max_price"
        ]


class EventFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter(field_name="start")
    reg_needed = django_filters.BooleanFilter()
    accepted = django_filters.BooleanFilter()
    query = django_filters.CharFilter(method="search_filter")

    class Meta:
        model = Event
        fields = {
            "price": ["lte", "gte"],
            "participants": ["lte", "gte"],
            "id": ["in"],
        }

    def search_filter(self, queryset, name, value):
        return queryset.filter(
            Q(name__icontains=value) | Q(description__icontains=value)
        )


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventListSerializer
    ordering = ["start"]
    filterset_class = EventFilter


router = routers.SimpleRouter(trailing_slash=False)
router.register("events", EventViewSet)

urlpatterns = router.urls
