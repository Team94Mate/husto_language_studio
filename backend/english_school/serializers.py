from rest_framework import serializers
import pytz

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


class NoMillisecondsDateTimeField(serializers.DateTimeField):
    def to_representation(self, value):
        """Format the datetime to exclude milliseconds
        and convert to local timezone"""

        if value is None:
            return None
        local_tz = pytz.timezone("Europe/Kiev")
        value = value.astimezone(local_tz)
        return value.strftime("%Y-%m-%dT%H:%M:%S")


class ContactMessageSerializer(serializers.ModelSerializer):
    submitted_at = NoMillisecondsDateTimeField(required=False)

    class Meta:
        model = ContactMessage
        fields = ["id", "username", "question", "submitted_at"]
