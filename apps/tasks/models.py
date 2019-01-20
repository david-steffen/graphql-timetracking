from django.db import models
from apps.common.models import BaseModel
from django.conf import settings


class Task(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='tasks')
    project = models.ForeignKey("projects.Project", on_delete=models.CASCADE)
    duration = models.DurationField()
    description = models.TextField(blank=True)
    date = models.DateField()
    logged = models.BooleanField()

    class Meta:
        ordering = ('date',)

    def __str__(self):
        return u'%s - %s' % (self.user, self.date)
