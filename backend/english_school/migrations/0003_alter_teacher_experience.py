# Generated by Django 5.1 on 2024-09-23 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("english_school", "0002_rename_type_course_course_type_course_duration"),
    ]

    operations = [
        migrations.AlterField(
            model_name="teacher",
            name="experience",
            field=models.FloatField(
                help_text="Experience in years (can be a decimal value)."
            ),
        ),
    ]