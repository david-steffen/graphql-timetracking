# Generated by Django 2.1.2 on 2019-03-11 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20181115_0148'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='hours_in_day',
            field=models.IntegerField(default=0),
        ),
    ]
