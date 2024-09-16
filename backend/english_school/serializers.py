from rest_framework import serializers
from english_school.models import (
    Teacher,
    Course,
    Review,
    ContactMessage,
)


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"


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
        """Format the datetime to exclude milliseconds"""
        if value is None:
            return None
        return value.strftime("%Y-%m-%dT%H:%M:%S")


class ContactMessageSerializer(serializers.ModelSerializer):
    submitted_at = NoMillisecondsDateTimeField()

    class Meta:
        model = ContactMessage
        fields = "__all__"
