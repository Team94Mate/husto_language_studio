from decimal import Decimal
from django.db import migrations


def update_course_prices(apps, schema_editor):
    Course = apps.get_model("english_school", "Course")
    updates = {
        6: Decimal("6100.00"), 
        5: Decimal("5300.00"),  
        7: Decimal("4500.00"), 
    }
    for course_id, new_price in updates.items():
        Course.objects.filter(id=course_id).update(price=new_price)


def revert_course_prices(apps, schema_editor):
    Course = apps.get_model("english_school", "Course")
    old_prices = {
        6: Decimal("5600.00"),
        5: Decimal("4800.00"),
        7: Decimal("4000.00"),
    }
    for course_id, old_price in old_prices.items():
        Course.objects.filter(id=course_id).update(price=old_price)


class Migration(migrations.Migration):

    dependencies = [
        # НЕ змінюй цей рядок — залиш ту міграцію, яку згенерував makemigrations
        ("english_school", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(update_course_prices, revert_course_prices),
    ]