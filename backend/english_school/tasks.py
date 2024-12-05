from celery import shared_task
from django.core.mail import send_mail
from school_service import (
    settings,
)


@shared_task(bind=True)
def send_mail_func(self):
    mail_subject = "Test Email from View"
    message = "This fis a test email to check email settings."
    to_email = "comercaleuros@gmail.com"
    send_mail(
        subject=mail_subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[to_email],
        fail_silently=False,
    )
    return "Done"
