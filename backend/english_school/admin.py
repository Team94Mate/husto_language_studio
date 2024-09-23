from django.contrib import admin

from .models import Teacher, Course, Review, ContactMessage


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "specialization",
        "experience_years",
        "teacher_level",
    )
    search_fields = ("name", "specialization")


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "course_type", "duration", "price")
    search_fields = ("title", "course_type")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "age")
    search_fields = ("name",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("username", "submitted_at")
    search_fields = ("username",)
