# Generated by Django 2.1.2 on 2019-03-17 20:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20190315_1941'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='type',
            new_name='acc_type',
        ),
    ]
