# Generated by Django 2.1.2 on 2018-11-15 01:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_auto_20181104_1723'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projectmember',
            options={'ordering': ('created',)},
        ),
        migrations.RemoveField(
            model_name='projectmember',
            name='account',
        ),
        migrations.RemoveField(
            model_name='projectmember',
            name='owner',
        ),
    ]
