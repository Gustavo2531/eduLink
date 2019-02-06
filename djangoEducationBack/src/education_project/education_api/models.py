from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from rest_framework import serializers
import uuid

# Create your models here.
class UserProfileManager(BaseUserManager):
    """Helps Django Wirh our custom user model"""

    def create_user(self, email, name, last_name, is_company, password=None):
        """Creates a new user profile Object"""

        if not email:
            raise ValueError("User must have an email address")



        if not name:
            raise ValueError("User must have a Name")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, last_name=last_name, is_company=is_company)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, last_name, password):
        """Create and saves a new superuser with given details"""
        user = self.create_user(email, name, last_name,password)
        user.is_superuser = True
        user.is_staff=True

        user.save(using=self._db)

        return user

    def create_Company(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_staff = True
        user.is_company = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Represents a "user profile" inside our system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, unique=False)
    last_name=models.CharField(max_length=255, unique=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    objects = UserProfileManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'last_name','is_company']

    def get_full_name(self):
        """Used to get a users full name"""

        return self.name + self.lastName

    def get_short_name(self):
        """Used to get the user short name"""

        return self.name

    def __str__(self):
        """Django uses this when it need to convert the object for a string"""

        return self.email

class ProfileFeedItem(models.Model):
    """Profile status update"""
    user_profile = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    status_text = models.CharField(max_length = 255)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """Return the model as a string"""

        return self.status_text


class ProfileScholarshipItem(models.Model):
    """Profile status update"""
    user_profile = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    name = models.CharField(max_length = 255)
    detail = models.CharField(max_length = 255)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    price = models.CharField(max_length = 255)
    url = models.URLField(max_length=255)
    tag1 = models.CharField(max_length=255)
    tag2 = models.CharField(max_length=255)
    tag3 = models.CharField(max_length=255)
    tag4 = models.CharField(max_length=255, blank=True)
    tag5 = models.CharField(max_length=255, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)


class FileUpload(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    datafile = models.FileField()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)