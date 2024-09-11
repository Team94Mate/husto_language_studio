from django.db import models


class Teacher(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    experience = models.FloatField()
    teacher_level = models.CharField(max_length=100)
    description = models.TextField()
    photo = models.ImageField(upload_to="teacher_photos")

    def __str__(self):
        return self.name


class Course(models.Model):
    title = models.CharField(max_length=100)
    course_type = models.CharField(max_length=100)
    duration = models.TimeField()
    classes = models.CharField(max_length=100)
    number_of_classes = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    trial_info = models.TextField()

    def __str__(self):
        return self.title


class Review(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField()
    photo = models.ImageField(upload_to="review_photos")

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    username = models.CharField(max_length=100)
    question = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
