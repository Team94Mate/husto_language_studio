from rest_framework import viewsets
from rest_framework.permissions import BasePermission
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from django.http import HttpResponse


from english_school.models import (
    Teacher,
    Course,
    Review,
    ContactMessage,
)
from english_school.serializers import (
    TeacherSerializer,
    CourseSerializer,
    ReviewSerializer,
    ContactMessageSerializer,
)
from english_school.tasks import send_mail_func


class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to only allow admins to create, edit or delete objects.
    """

    def has_permission(self, request, view):
        if request.method in ["GET"]:
            return True
        return request.user and request.user.is_staff


class IsAdminOrCreateOnly(BasePermission):
    """
    Custom permission to allow all users to create,
    but only admins can view, update or delete.
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return request.user and request.user.is_staff


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAdminOrReadOnly]

    @extend_schema(
        operation_id="List Teachers",
        responses={200: TeacherSerializer(many=True)},
        description="List all teachers",
    )
    def list(self, request, *args, **kwargs):
        """List all teachers"""
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]

    @extend_schema(
        operation_id="List Courses",
        responses={200: CourseSerializer(many=True)},
        description="List all courses",
    )
    def list(self, request, *args, **kwargs):
        """List all courses"""
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAdminOrReadOnly]

    @extend_schema(
        operation_id="List Reviews",
        responses={200: ReviewSerializer(many=True)},
        description="List all reviews",
    )
    def list(self, request, *args, **kwargs):
        """List all reviews"""
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminOrCreateOnly]

    @extend_schema(
        operation_id="List Contact Messages",
        responses={200: ContactMessageSerializer(many=True)},
        description="List all contact messages",
    )
    def list(self, request, *args, **kwargs):
        """List all contact messages"""
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """Create a new contact message and send an email"""
        username = request.data.get("username")
        question = request.data.get("question")
        submitted_at = request.data.get("submitted_at")

        send_mail_func(
            username=username, question=question, submitted_at=submitted_at
        )

        response = super().create(request, *args, **kwargs)
        return response


def send_mail_to_all(request):
    send_mail_func()
    return HttpResponse("Sent Email Successfully...Check your mail please")
