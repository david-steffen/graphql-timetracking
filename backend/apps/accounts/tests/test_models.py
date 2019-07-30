from django.test import TestCase
from applications.accounts.models import User
from django.contrib.auth import authenticate

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        self.normal_user_email = "normal@email.com"
        self.super_user_email = "super@email.com"
        self.password = "45G&h(wE2!fg"
        self.normal_user = User.objects.create_user(self.normal_user_email, self.password)
        self.super_user = User.objects.create_superuser(self.super_user_email, self.password)

    def test_normal_user_creation(self):
        user = self.normal_user
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.__str__(), user.email)

    def test_super_user_creation(self):
        user = self.super_user
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.__str__(), user.email)

    def test_normal_user_is_not_staff(self):
        user = self.normal_user
        self.assertFalse(user.is_staff)

    def test_normal_user_is_not_super_user(self):
        user = self.normal_user
        self.assertFalse(user.is_superuser)

    def test_super_user_is_staff(self):
        user = self.super_user
        self.assertTrue(user.is_staff)

    def test_super_user_is_super_user(self):
        user = self.super_user
        self.assertTrue(user.is_superuser)

    def test_email_authentication(self):
        user = authenticate(username=self.normal_user_email, password=self.password)
        self.assertTrue(isinstance(user, User))