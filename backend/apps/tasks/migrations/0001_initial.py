# Generated by Django 2.0.1 on 2018-10-17 20:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('duration', models.DurationField()),
                ('description', models.TextField(blank=True)),
                ('date', models.DateTimeField()),
                ('logged', models.BooleanField()),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='projects.Project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='tasks', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('date',),
            },
        ),
    ]
