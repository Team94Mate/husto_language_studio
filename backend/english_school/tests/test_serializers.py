import shutil
import tempfile
from datetime import timedelta
from freezegun import freeze_time
from django.test import override_settings
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase

from english_school.models import Teacher, Course, Review, ContactMessage
from english_school.serializers import (
    TeacherSerializer,
    CourseSerializer,
    ReviewSerializer,
    ContactMessageSerializer,
)


class BaseSerializerTestCase(APITestCase):
    def assert_serialized_equal(self, serializer, instance, expected_data):
        """Helper method to test serialization"""

        serializer_instance = serializer(instance)
        self.assertEqual(serializer_instance.data, expected_data)


class TeacherSerializerTest(BaseSerializerTestCase):
    def setUp(self):
        self.temp_media = tempfile.mkdtemp()
        self.addCleanup(lambda: shutil.rmtree(self.temp_media))

        self.override_settings = override_settings(MEDIA_ROOT=self.temp_media)
        self.override_settings.enable()

        self.photo = SimpleUploadedFile(
            "test_photo.jpg", b"file_content", content_type="image/jpeg"
        )
        self.teacher = Teacher.objects.create(
            name="John Doe",
            specialization="Master of practical classes",
            experience_years=10.5,
            teacher_level="Senior",
            description="Experienced teacher.",
            photo=self.photo,
        )

    def test_teacher_serializer(self):
        expected_data = {
            "id": self.teacher.id,
            "name": "John Doe",
            "specialization": "Master of practical classes",
            "experience_years": 10.5,
            "teacher_level": "Senior",
            "description": "Experienced teacher.",
            "description_lines": ["Experienced teacher."],
            "photo": self.teacher.photo.url,
        }
        self.assert_serialized_equal(
            TeacherSerializer, self.teacher, expected_data
        )


class CourseSerializerTest(BaseSerializerTestCase):
    def setUp(self):
        self.course = Course.objects.create(
            title="SoloPro",
            course_type="Online",
            lesson_duration=timedelta(hours=1, minutes=30),
            classes="Weekdays",
            number_of_classes="12",
            price=150.00,
            trial_info="Free trial available.",
        )

    def test_course_serializer(self):
        expected_data = {
            "id": self.course.id,
            "title": "SoloPro",
            "course_type": "Online",
            "lesson_duration": "01:30:00",
            "classes": "Weekdays",
            "number_of_classes": "12",
            "price": "150.00",
            "trial_info": "Free trial available.",
        }
        self.assert_serialized_equal(
            CourseSerializer, self.course, expected_data
        )


class ReviewSerializerTest(BaseSerializerTestCase):
    def setUp(self):
        self.temp_media = tempfile.mkdtemp()
        self.addCleanup(lambda: shutil.rmtree(self.temp_media))

        self.override_settings = override_settings(MEDIA_ROOT=self.temp_media)
        self.override_settings.enable()

        self.photo = SimpleUploadedFile(
            "test_photo.jpg", b"file_content", content_type="image/jpeg"
        )
        self.review = Review.objects.create(
            name="Jane Smith",
            age=30,
            description="Great course!",
            photo=self.photo,
        )

    def test_review_serializer(self):
        expected_data = {
            "id": self.review.id,
            "name": "Jane Smith",
            "age": 30,
            "description": "Great course!",
            "photo": self.review.photo.url,
        }
        self.assert_serialized_equal(
            ReviewSerializer, self.review, expected_data
        )


class ContactMessageSerializerTest(BaseSerializerTestCase):

    @freeze_time("2024-10-22 07:13:58")
    def setUp(self):
        self.contact_message = ContactMessage.objects.create(
            username="user123",
            question="How can I enroll?",
        )

    def test_contact_message_serializer(self):
        # Expected submitted_at in Kiev timezone
        expected_submitted_at = "2024-10-22T10:13:58"

        expected_data = {
            "id": self.contact_message.id,
            "username": "user123",
            "question": "How can I enroll?",
            "submitted_at": expected_submitted_at,
        }
        self.assert_serialized_equal(
            ContactMessageSerializer, self.contact_message, expected_data
        )
