from django.db import models
from apps.common.models import BaseModel
from django.conf import settings


class ProjectMember(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    project = models.ForeignKey("projects.Project", on_delete=models.CASCADE)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return '{} - {}, {}'.format(self.project.name, self.user.last_name, self.user.first_name) 

class Project(BaseModel):
    colour = models.CharField(max_length=7)
    abbreviation = models.CharField(max_length=6)
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50, blank=True)
    account = models.ForeignKey("accounts.Account", on_delete=models.DO_NOTHING)
    status = models.BooleanField(default=False)
    work_day_hours = models.IntegerField(default=0)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, through=ProjectMember)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return self.name
