from django.db import models
from apps.common.models import BaseModel
from django.conf import settings


class ProjectMember(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    project = models.ForeignKey("projects.Project", on_delete=models.CASCADE)
    owner = models.BooleanField()
    account = models.ForeignKey("accounts.Account", on_delete=models.DO_NOTHING)


class Project(BaseModel):
    colour = models.CharField(max_length=7)
    abbreviation = models.CharField(max_length=6)
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50, blank=True)
    account = models.ForeignKey("accounts.Account", on_delete=models.DO_NOTHING)
    status = models.BooleanField(default=False)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, through=ProjectMember)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return self.name
