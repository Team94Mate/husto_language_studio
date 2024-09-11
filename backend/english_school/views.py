from rest_framework import viewsets

from backend.english_school.models import (
    Teacher,
    Course,
    Review,
    ContactMessage,
)
from backend.english_school.serializers import (
    TeacherSerializer,
    CourseSerializer,
    ReviewSerializer,
    ContactMessageSerializer,
)


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
