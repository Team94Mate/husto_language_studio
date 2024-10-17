from rest_framework import serializers

from english_school.models import (
    Teacher,
    Course,
    Review,
    ContactMessage,
)


class TeacherSerializer(serializers.ModelSerializer):
    description_lines = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = [
            "id",
            "name",
            "specialization",
            "experience_years",
            "teacher_level",
            "description",
            "description_lines",
            "photo",
        ]

    @staticmethod
    def get_description_lines(obj):
        """Return a list of description lines"""
        return [
            line.strip()
            for line in obj.description.splitlines()
            if line.strip()
        ]


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "username", "question"]
