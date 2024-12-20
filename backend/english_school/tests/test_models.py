import shutil
import tempfile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.core.files.storage import default_storage
from django.utils import timezone

from english_school.models import Teacher, Course, Review, ContactMessage


class TeacherModelTest(TestCase):
    def setUp(self):
        self.temp_media = tempfile.mkdtemp()
        self.addCleanup(lambda: shutil.rmtree(self.temp_media))

        self.override_settings = override_settings(MEDIA_ROOT=self.temp_media)
        self.override_settings.enable()

        self.photo = SimpleUploadedFile(
            "test_photo.jpg", b"file_content", content_type="image/jpeg"
        )
        self.teacher = Teacher.objects.create(
            name="Sofia",
            specialization="Master of practical classes",
            experience_years=5.0,
            teacher_level="C1",
            description="Uses authentic materials and resources",
            photo=self.photo,
        )

    def test_teacher_str(self):
        self.assertEqual(str(self.teacher), "Sofia")

    def test_teacher_fields(self):
        self.assertEqual(self.teacher.name, "Sofia")
        self.assertEqual(
            self.teacher.specialization, "Master of practical classes"
        )
        self.assertEqual(self.teacher.experience_years, 5.0)
        self.assertEqual(self.teacher.teacher_level, "C1")
        self.assertEqual(
            self.teacher.description, "Uses authentic materials and resources"
        )
        self.assertEqual(
            self.teacher.photo.name, "teacher_photos/test_photo.jpg"
        )


class CourseModelTest(TestCase):
    def setUp(self):
        self.course = Course.objects.create(
            title="SoloPro",
            course_type="Individual",
            lesson_duration="01:00:00",
            classes="2 per week",
            number_of_classes="8 per month",
            price=280.00,
            trial_info="A trial lesson - 199 UAH (duration 30 minutes)",
        )

    def test_course_str(self):
        self.assertEqual(str(self.course), "SoloPro")

    def test_course_fields(self):
        self.assertEqual(self.course.title, "SoloPro")
        self.assertEqual(self.course.course_type, "Individual")
        self.assertEqual(self.course.lesson_duration, "01:00:00")
        self.assertEqual(self.course.classes, "2 per week")
        self.assertEqual(self.course.number_of_classes, "8 per month")
        self.assertEqual(self.course.price, 280.00)
        self.assertEqual(
            self.course.trial_info,
            "A trial lesson - 199 UAH (duration 30 minutes)",
        )


class ReviewModelTest(TestCase):
    def setUp(self):
        self.temp_media = tempfile.mkdtemp()
        self.addCleanup(lambda: shutil.rmtree(self.temp_media))

        self.override_settings = override_settings(MEDIA_ROOT=self.temp_media)
        self.override_settings.enable()

        self.photo = SimpleUploadedFile(
            "test_photo.jpg", b"file_content", content_type="image/jpeg"
        )
        self.review = Review.objects.create(
            name="Olga",
            age=45,
            description="I am impressed with the progress, thank you!",
            photo=self.photo,
        )

    def tearDown(self):
        if default_storage.exists(self.review.photo.name):
            default_storage.delete(self.review.photo.name)

    def test_review_str(self):
        self.assertEqual(str(self.review), "Olga")

    def test_review_fields(self):
        self.assertEqual(self.review.name, "Olga")
        self.assertEqual(self.review.age, 45)
        self.assertEqual(
            self.review.description,
            "I am impressed with the progress, thank you!",
        )
        self.assertEqual(
            self.review.photo.name, "review_photos/test_photo.jpg"
        )


class ContactMessageModelTest(TestCase):
    def setUp(self):
        self.contact_message = ContactMessage.objects.create(
            username="Ivan",
            question="How to sign up for English language lessons?",
        )

    def test_contact_message_str(self):
        self.assertEqual(str(self.contact_message), "Ivan")

    def test_contact_message_fields(self):
        self.assertEqual(self.contact_message.username, "Ivan")
        self.assertEqual(
            self.contact_message.question,
            "How to sign up for English language lessons?",
        )
        self.assertIsNotNone(self.contact_message.submitted_at)
        self.assertEqual(
            self.contact_message.submitted_at.date(), timezone.now().date()
        )
