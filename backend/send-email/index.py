import json
import os
import smtplib
# redeploy
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с формы обратной связи на почту mail@s-mtk.ru"""

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    company = body.get('company', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Имя и email обязательны'}),
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ['SMTP_USER']
    smtp_pass = os.environ['SMTP_PASS']
    to_email = os.environ.get('MAIL_TO', 'mail@s-mtk.ru')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name} — {company or "не указана"}'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Reply-To'] = email

    html = f"""
    <h2>Новая заявка с сайта СМТК</h2>
    <table>
      <tr><td><b>Имя:</b></td><td>{name}</td></tr>
      <tr><td><b>Компания:</b></td><td>{company or '—'}</td></tr>
      <tr><td><b>Email:</b></td><td>{email}</td></tr>
      <tr><td><b>Сообщение:</b></td><td>{message or '—'}</td></tr>
    </table>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True}),
    }