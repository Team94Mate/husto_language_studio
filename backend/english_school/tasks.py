from celery import shared_task
from django.core.mail import send_mail
from school_service import (
    settings,
)


MESSAGE = """\
Hello there!

You have received a new question submission:

User: {username}
Question: {question}
Time: {submitted_at}


Happy teaching,
The English School System
"""


@shared_task(bind=True)
def send_mail_func(self, username, question, submitted_at):
    mail_subject = f"You have a new message from: {username}"
    message = MESSAGE.format(
        submitted_at=submitted_at, username=username, question=question
    )

    send_mail(
        subject=mail_subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[settings.EMAIL_RECEIVER],
        fail_silently=False,
    )
    return "Email Sent"
