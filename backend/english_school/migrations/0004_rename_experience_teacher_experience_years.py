# Generated by Django 5.1 on 2024-09-23 11:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("english_school", "0003_alter_teacher_experience"),
    ]

    operations = [
        migrations.RenameField(
            model_name="teacher",
            old_name="experience",
            new_name="experience_years",
        ),
    ]
