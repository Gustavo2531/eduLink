from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.UserProfile)
admin.site.register(models.ProfileFeedItem)
admin.site.register(models.ProfileScholarshipItem)
admin.site.register(models.FileUpload)
