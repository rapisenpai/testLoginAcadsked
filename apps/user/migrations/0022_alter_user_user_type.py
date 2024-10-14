# Generated by Django 5.0.7 on 2024-08-07 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0021_alter_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.IntegerField(choices=[(1, 'registrar'), (2, 'vpaa'), (3, 'dean'), (4, 'progchair'), (5, 'faculty')], default=5),
        ),
    ]