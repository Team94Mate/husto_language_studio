from io import BytesIO
from PIL import Image
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.core.files.storage import default_storage
from django.contrib.auth.models import User

from english_school.models import (
    Teacher,
    Course,
    Review,
    ContactMessage,
)


def create_image_file(name):
    image = Image.new("RGB", (100, 100), color="red")
    file = BytesIO()
    image.save(file, format="JPEG")
    file.seek(0)
    return SimpleUploadedFile(name, file.read(), content_type="image/jpeg")


class PublicTeacherViewSetTests(APITestCase):
    @override_settings(
        DEFAULT_FILE_STORAGE="django.core.files.storage.InMemoryStorage"
    )
    def setUp(self):
        self.photo = SimpleUploadedFile(
            "test_photo.jpg", b"file_content", content_type="image/jpeg"
        )
        self.teacher = Teacher.objects.create(
            name="Sofia",
            specialization="Master of practical classes",
            experience=5.0,
            teacher_level="C1",
            description="Uses authentic materials and resources",
            photo=self.photo,
        )
        self.list_url = reverse("teachers-list")
        self.detail_url = reverse("teachers-detail", args=[self.teacher.id])

    def tearDown(self):
        if default_storage.exists(self.teacher.photo.name):
            default_storage.delete(self.teacher.photo.name)

    def test_get_teachers_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_teacher_detail(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Sofia")


class PrivateTeacherViewSetTests(APITestCase):
    @override_settings(
        DEFAULT_FILE_STORAGE="django.core.files.storage.InMemoryStorage"
    )
    def setUp(self):
        self.user = User.objects.create_superuser(
            username="admin", password="password", email="admin@example.com"
        )
        self.client.login(username="admin", password="password")

        self.photo = create_image_file("test_photo.jpg")
        self.teacher = Teacher.objects.create(
            name="Sofia",
            specialization="Master of practical classes",
            experience=5.0,
            teacher_level="C1",
            description="Uses authentic materials and resources",
            photo=self.photo,
        )
        self.list_url = reverse("teachers-list")
        self.detail_url = reverse("teachers-detail", args=[self.teacher.id])

    def tearDown(self):
        if default_storage.exists(self.teacher.photo.name):
            default_storage.delete(self.teacher.photo.name)

    def test_create_teacher(self):
        data = {
            "name": "Jane Smith",
            "specialization": "English",
            "experience": 3.0,
            "teacher_level": "Junior",
            "description": "New English teacher.",
            "photo": create_image_file(
                "new_photo.jpg"
            ),  # Use the function here
        }
        response = self.client.post(self.list_url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Jane Smith")

    def test_update_teacher(self):
        data = {
            "name": "Sofia Updated",
            "specialization": "Science",
            "experience": 6.0,
            "teacher_level": "Lead",
            "description": "Updated description.",
            "photo": create_image_file(
                "updated_photo.jpg"
            ),  # Use the function here
        }
        response = self.client.put(self.detail_url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Sofia Updated")

    def test_delete_teacher(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PublicCourseViewSetTests(APITestCase):
    @override_settings(
        DEFAULT_FILE_STORAGE="django.core.files.storage.InMemoryStorage"
    )
    def setUp(self):
        self.course = Course.objects.create(
            title="SoloPro",
            course_type="Individual",
            duration="01:00:00",
            classes="2 per week",
            number_of_classes="8 per month",
            price=280.00,
            trial_info="A trial lesson - 199 UAH (duration 30 minutes)",
        )
        self.list_url = reverse("courses-list")
        self.detail_url = reverse("courses-detail", args=[self.course.id])

    def test_get_courses_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_course_detail(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "SoloPro")


class PrivateCourseViewSetTests(APITestCase):
    @override_settings(
        DEFAULT_FILE_STORAGE="django.core.files.storage.InMemoryStorage"
    )
    def setUp(self):
        self.user = User.objects.create_superuser(
            username="admin", password="password", email="admin@example.com"
        )
        self.client.login(username="admin", password="password")

        self.course = Course.objects.create(
            title="SoloPro",
            course_type="Individual",
            duration="01:00:00",
            classes="2 per week",
            number_of_classes="8 per month",
            price=280.00,
            trial_info="A trial lesson - 199 UAH (duration 30 minutes)",
        )
        self.list_url = reverse("courses-list")
        self.detail_url = reverse("courses-detail", args=[self.course.id])

    def test_create_course(self):
        data = {
            "title": "New Course",
            "course_type": "Group",
            "duration": "02:00:00",
            "classes": "3 per week",
            "number_of_classes": "12 per month",
            "price": 350.00,
            "trial_info": "A trial lesson - 250 UAH (duration 45 minutes)",
        }
        response = self.client.post(self.list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "New Course")

    def test_update_course(self):
        data = {
            "title": "Updated Course",
            "course_type": "Individual",
            "duration": "03:00:00",
            "classes": "4 per week",
            "number_of_classes": "16 per month",
            "price": 400.00,
            "trial_info": "Updated trial lesson info.",
        }
        response = self.client.put(self.detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Updated Course")

    def test_delete_course(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PublicReviewViewSetTests(APITestCase):
    @override_settings(
        DEFAULT_FILE_STORAGE="django.core.files.storage.InMemoryStorage"
    )
    def setUp(self):
        self.photo = create_image_file("test_photo.jpg")
        self.review = Review.objects.create(
            name="John Doe",
            age=30,
            description="Great course, highly recommend!",
            photo=self.photo,
        )
        self.list_url = reverse("reviews-list")
        self.detail_url = reverse("reviews-detail", args=[self.review.id])

    def test_get_reviews_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_review_detail(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "John Doe")


class PrivateReviewViewSetTests(APITestCase):
    @override_settings(
        DEFAULT_FILE_STORAGE="django.core.files.storage.InMemoryStorage"
    )
    def setUp(self):
        self.user = User.objects.create_superuser(
            username="admin", password="password", email="admin@example.com"
        )
        self.client.login(username="admin", password="password")

        self.photo = create_image_file("test_photo.jpg")
        self.review = Review.objects.create(
            name="John Doe",
            age=30,
            description="Great course, highly recommend!",
            photo=self.photo,
        )
        self.list_url = reverse("reviews-list")
        self.detail_url = reverse("reviews-detail", args=[self.review.id])

    def test_create_review(self):
        data = {
            "name": "Jane Smith",
            "age": 25,
            "description": "Excellent teacher with valuable insights.",
            "photo": create_image_file("new_photo.jpg"),
        }
        response = self.client.post(self.list_url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Jane Smith")

    def test_update_review(self):
        data = {
            "name": "John Doe Updated",
            "age": 31,
            "description": "Updated review description.",
            "photo": create_image_file("updated_photo.jpg"),
        }
        response = self.client.put(self.detail_url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "John Doe Updated")

    def test_delete_review(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PublicContactMessageViewSetTests(APITestCase):
    def setUp(self):
        self.contact_message = ContactMessage.objects.create(
            username="user1",
            question="What are your operating hours?",
        )
        self.list_url = reverse("contact-messages-list")
        self.detail_url = reverse(
            "contact-messages-detail", args=[self.contact_message.id]
        )

    def test_get_contactmessage_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_contactmessage_detail(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "user1")


class PrivateContactMessageViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(
            username="admin", password="password", email="admin@example.com"
        )
        self.client.login(username="admin", password="password")

        self.contact_message = ContactMessage.objects.create(
            username="user1",
            question="What are your operating hours?",
        )
        self.list_url = reverse("contact-messages-list")
        self.detail_url = reverse(
            "contact-messages-detail", args=[self.contact_message.id]
        )

    def test_create_contactmessage(self):
        data = {
            "username": "user2",
            "question": "Do you offer online classes?",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], "user2")

    def test_update_contactmessage(self):
        data = {
            "username": "user1_updated",
            "question": "Updated question?",
        }
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "user1_updated")

    def test_delete_contactmessage(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
