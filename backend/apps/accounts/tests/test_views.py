from django.test import Client, TestCase
from applications.accounts.models import User
from django.core import mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, force_bytes

class AccountsViewsTest(TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()
        self.username = 'test@email.com'
        self.password = "45G&h(wE2!fg"
        self.user = User.objects.create_user(self.username, self.password)

    def test_login_template(self):
        response = self.client.get('/accounts/login/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.template_name[0], 'account/login.html')

    def test_logout_template(self):
        response = self.client.get('/accounts/logout/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.template_name[0], 'account/logout.html')

    def test_can_send_mail(self):
        mail.send_mail(
            'Subject here', 'Here is the message.',
            'from@example.com', ['to@example.com'],
            fail_silently=False,
        )
        # Test that one message has been sent.
        self.assertEqual(len(mail.outbox), 1)
        # Verify that the subject of the first message is correct.
        self.assertEqual(mail.outbox[0].subject, 'Subject here')

    def test_password_reset_template(self):
        response = self.client.get('/accounts/password-reset/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.template_name[0], 'account/password_reset.html')

    def test_password_reset_view(self):
        response = self.client.post('/accounts/password-reset/', {'username': self.username})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.template_name[0], 'account/password_reset.html')
        
    def test_password_reset_confirm_view(self):
        uidb64 = urlsafe_base64_encode(force_bytes(self.user.pk)).decode()
        token = default_token_generator.make_token(self.user)
        response = self.client.get('/accounts/password-reset-confirm/{}/{}/'.format(uidb64, token))
        self.assertRedirects(response, '/accounts/password-reset-confirm/{}/set-password/'.format(uidb64), status_code=302)
        new_password = '8974hgy%w)1*'
        response = self.client.post('/accounts/password-reset-confirm/{}/set-password/'.format(uidb64), {'new_password1': new_password, 'new_password2': new_password })
        self.assertRedirects(response, '/accounts/password-reset-complete/', status_code=302)


