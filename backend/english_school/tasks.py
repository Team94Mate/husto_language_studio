import re
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.utils.html import escape
from school_service import settings


MESSAGE = """\
Нова заявка з сайту Husto Language Studio

Ім'я: {username}
Деталі: {question}
Час: {submitted_at}
"""


def _parse_contact_payload(username: str, question: str) -> dict:
    raw_user = (username or "").strip()
    raw_question = (question or "").strip()

    name = raw_user
    email = ""
    phone = ""
    comment = ""

    if "|" in raw_question and ":" in raw_question:
        extra_parts = []
        for chunk in raw_question.split("|"):
            if ":" in chunk:
                key, val = chunk.split(":", 1)
                k = key.strip().lower()
                v = val.strip()
                if k in ("ім'я", "імя", "name"):
                    if not name:
                        name = v
                elif k in ("email", "e-mail", "пошта"):
                    email = v
                elif k in ("телефон", "номер телефону", "phone", "tel"):
                    phone = v
                elif k in ("коментар", "comment", "питання", "запитання", "question", "повідомлення", "message"):
                    comment = v
                elif v:
                    extra_parts.append(chunk.strip())
            elif chunk.strip():
                extra_parts.append(chunk.strip())

        if extra_parts and not comment:
            comment = "\n".join(extra_parts)
    else:
        combined = f"{raw_user}\n{raw_question}"
        email_match = re.search(
            r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", combined
        )
        email = email_match.group(0) if email_match else ""

        phone_match = re.search(r"(?:\+?\d[\d\s\-()]{7,}\d)", combined)
        phone = phone_match.group(0).strip() if phone_match else ""

        remainder = raw_question
        for item in (email, phone):
            if item:
                remainder = remainder.replace(item, "")
        comment = remainder.strip(" ,;|-")

    if not name:
        name = "Не вказано"

    digits = re.sub(r"\D", "", phone)
    if len(digits) == 10 and digits.startswith("0"):
        digits = "38" + digits
    wa_url = f"https://wa.me/{digits}" if len(digits) >= 11 else ""
    tel_href = f"+{digits}" if digits else re.sub(r"[^\d+]", "", phone)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "comment": comment,
        "wa_url": wa_url,
        "tel_href": tel_href,
    }


@shared_task(bind=True)
def send_mail_func(self, username="", question="", submitted_at=""):
    parsed = _parse_contact_payload(username, question)

    mail_subject = f"Нова заявка Husto — {parsed['name']}"
    text_message = MESSAGE.format(
        submitted_at=submitted_at,
        username=username,
        question=question,
    )

    safe_name = escape(parsed["name"])
    safe_email = escape(parsed["email"])
    safe_phone = escape(parsed["phone"])
    safe_time = escape(submitted_at or "")
    safe_comment = escape(parsed["comment"]).replace("\n", "<br>")

    email_row = ""
    if safe_email:
        email_row = f"""
          <tr>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 13px; color: #6b7280; width: 120px;">
              Email:
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 15px;">
              <a href="mailto:{safe_email}" style="color: #2A857E; font-weight: bold; text-decoration: none;">
                {safe_email}
              </a>
            </td>
          </tr>
        """

    phone_row = ""
    if safe_phone:
        phone_row = f"""
          <tr>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 13px; color: #6b7280; width: 120px;">
              Телефон:
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 15px;">
              <a href="tel:{escape(parsed['tel_href'])}" style="color: #111827; font-weight: bold; text-decoration: none;">
                {safe_phone}
              </a>
            </td>
          </tr>
        """

    comment_block = ""
    if safe_comment:
        comment_block = f"""
          <div style="margin-top: 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">
              Коментар / деталі:
            </p>
            <div style="background-color: #f8fafa; border-left: 4px solid #2A857E; padding: 14px 16px; border-radius: 6px; font-size: 15px; line-height: 1.5; color: #1f2937;">
              {safe_comment}
            </div>
          </div>
        """

    action_buttons = ""
    if parsed["wa_url"] or safe_email:
        wa_btn = (
            f'<a href="{escape(parsed["wa_url"])}" style="display: inline-block; background-color: #2A857E; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: bold; padding: 10px 18px; border-radius: 8px; margin-right: 8px;">Написати у WhatsApp</a>'
            if parsed["wa_url"]
            else ""
        )
        mail_btn = (
            f'<a href="mailto:{safe_email}" style="display: inline-block; background-color: #eef6f5; color: #2A857E; text-decoration: none; font-size: 14px; font-weight: bold; padding: 10px 18px; border-radius: 8px;">Відповісти на Email</a>'
            if safe_email
            else ""
        )
        action_buttons = f"""
          <div style="margin-top: 24px;">
            {wa_btn}
            {mail_btn}
          </div>
        """

    html_message = f"""\
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f3f6f6; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
    <tr>
      <td style="background-color: #2A857E; padding: 24px 28px;">
        <p style="margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #c7f9cc; font-weight: bold;">
          Husto Language Studio
        </p>
        <h1 style="margin: 6px 0 0; font-size: 20px; line-height: 1.3; color: #ffffff;">
          Нова заявка з сайту
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 28px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          <tr>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 13px; color: #6b7280; width: 120px;">
              Ім'я:
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 15px; font-weight: bold; color: #111827;">
              {safe_name}
            </td>
          </tr>
          {email_row}
          {phone_row}
          <tr>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 13px; color: #6b7280;">
              Час заявки:
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eef2f2; font-size: 14px; color: #374151;">
              {safe_time}
            </td>
          </tr>
        </table>
        {comment_block}
        {action_buttons}
      </td>
    </tr>
    <tr>
      <td style="background-color: #f9fafb; padding: 14px 28px; border-top: 1px solid #eef2f2; font-size: 12px; color: #9ca3af; text-align: center;">
        Husto Language Studio • Форма зворотного зв'язку
      </td>
    </tr>
  </table>
</body>
</html>
"""

    email = EmailMultiAlternatives(
        subject=mail_subject,
        body=text_message,
        from_email=settings.EMAIL_HOST_USER,
        to=[settings.EMAIL_RECEIVER],
    )
    email.attach_alternative(html_message, "text/html")
    email.send(fail_silently=False)

    return "Email Sent"