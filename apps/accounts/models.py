from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from apps.common.models import BaseModel
from django_countries.fields import CountryField
import uuid


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, name, country, account_type, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        extra_fields.setdefault('is_admin', False)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        if user is not None:
            account = Account.objects.create(name=name,country=country,type=account_type)
            user.account = account
            user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_staff', True)
        user = self.create_user(
            email,
            password=password,
            name="apps",
            country="GB",
            account_type="CO",
            **extra_fields
        )
        return user

class User(PermissionsMixin, AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    account = models.ForeignKey("accounts.Account", on_delete=models.DO_NOTHING, null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Account(BaseModel):
    FREE = 'FR'
    BASIC = 'BA'
    CORPORATE = 'CO'
    ACCOUNT_TYPE_CHOICES = (
        (FREE, 'Free'),
        (BASIC, 'Basic'),
        (CORPORATE, 'Corporate'),
    )
    name = models.CharField(max_length=50, blank=True)
    acc_type = models.CharField(
        max_length=2,
        choices=ACCOUNT_TYPE_CHOICES,
        default=FREE,
    )
    country = CountryField()
    global_work_day_hours = models.IntegerField(default=8)

    def __str__(self):
        return self.name
