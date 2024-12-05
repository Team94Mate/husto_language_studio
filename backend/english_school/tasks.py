from celery import shared_task
from django.core.mail import send_mail
from school_service import (
    settings,
)


@shared_task(bind=True)
def send_mail_func(self, username, question, submitted_at):
    mail_subject = f"You have a new message from {username}"
    message = (
        f"Hello there!\n\n"
        f"You have received a new question submission:\n"
        f"Question Submitted At: {submitted_at}\n"
        f"User: {username}\n"
        f"Question: {question}\n\n"
        f"Happy learning,\n"
        f"The English School System"
    )
    to_email = "comercaleuros@gmail.com"

    send_mail(
        subject=mail_subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[to_email],
        fail_silently=False,
    )
    return "Email Sent"
