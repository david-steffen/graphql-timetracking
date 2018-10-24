from django.contrib import admin
from apps.tasks.models import Task


class TaskAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['user', 'project', 'duration', 'description', 'logged']}),
        ('Date information', {'fields': ['date']}),
    ]


admin.site.register(Task, TaskAdmin)
