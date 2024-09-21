from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status


class UrlTests(APITestCase):
    def test_teacher_urls(self):
        list_url = reverse("teachers-list")
        detail_url = reverse("teachers-detail", args=[1])

        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_course_urls(self):
        list_url = reverse("courses-list")
        detail_url = reverse("courses-detail", args=[1])

        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_review_urls(self):
        list_url = reverse("reviews-list")
        detail_url = reverse("reviews-detail", args=[1])

        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_contact_message_urls(self):
        list_url = reverse("contact-messages-list")
        detail_url = reverse("contact-messages-detail", args=[1])

        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
