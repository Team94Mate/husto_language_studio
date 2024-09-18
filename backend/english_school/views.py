from rest_framework import viewsets
from rest_framework.permissions import BasePermission, IsAdminUser

from english_school.models import (
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


class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to only allow admins to edit or delete objects.
    """
    def has_permission(self, request, view):
        if request.method in ['GET']:
            return True
        return request.user and request.user.is_staff


class IsAdminOrCreateAndReadOnly(BasePermission):
    """
    Custom permission to allow all users to create and view,
    but only admins can update or delete.
    """
    def has_permission(self, request, view):
        if request.method in ['GET', 'POST']:
            return True
        return request.user and request.user.is_staff


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAdminOrReadOnly]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAdminOrReadOnly]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminOrCreateAndReadOnly]
