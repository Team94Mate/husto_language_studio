from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status


class UrlTests(APITestCase):
    def test_teacher_urls(self):
        list_url = reverse("teachers-list")
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_course_urls(self):
        list_url = reverse("courses-list")

        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_review_urls(self):
        list_url = reverse("reviews-list")

        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_contact_message_urls(self):
        list_url = reverse("contact-messages-list")

        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
