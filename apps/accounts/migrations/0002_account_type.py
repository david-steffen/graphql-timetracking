# Generated by Django 2.0.1 on 2018-10-17 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='type',
            field=models.CharField(choices=[('FR', 'Free'), ('BA', 'Basic'), ('CO', 'Corporate')], default='FR', max_length=2),
        ),
    ]
