from django.urls import path, include
from rest_framework.routers import DefaultRouter

from backend.english_school.views import (
    TeacherViewSet,
    CourseViewSet,
    ReviewViewSet,
    ContactMessageViewSet,
)


router = DefaultRouter()
router.register(r"teachers", TeacherViewSet)
router.register(r"courses", CourseViewSet)
router.register(r"reviews", ReviewViewSet)
router.register(r"contact-messages", ContactMessageViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
