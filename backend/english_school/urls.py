from django.urls import path, include
from rest_framework.routers import DefaultRouter

from english_school.views import (
    TeacherViewSet,
    CourseViewSet,
    ReviewViewSet,
    ContactMessageViewSet,
)


router = DefaultRouter()
router.register(r"teachers", TeacherViewSet, basename="teachers")
router.register(r"courses", CourseViewSet, basename="courses")
router.register(r"reviews", ReviewViewSet, basename="reviews")
router.register(
    r"contact-messages",
    ContactMessageViewSet,
    basename="contact-messages"
)

urlpatterns = [
    path("", include(router.urls)),
]
