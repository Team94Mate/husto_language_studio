from django.db import migrations


def update_trial_info(apps, schema_editor):
    Course = apps.get_model("english_school", "Course")
    Course.objects.filter(id__in=[2, 3, 4, 5, 6, 7]).update(
        trial_info="Безкоштовний пробний урок*"
    )


class Migration(migrations.Migration):

    dependencies = [
        ("english_school", "0002_update_course_prices"),
    ]

    operations = [
        migrations.RunPython(update_trial_info),
    ]