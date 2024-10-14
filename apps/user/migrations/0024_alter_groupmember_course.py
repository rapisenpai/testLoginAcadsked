# Generated by Django 5.0.8 on 2024-09-06 12:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('curriculum', '0030_alter_programs_program_slug_and_more'),
        ('user', '0023_usergroup_groupmember'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupmember',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='curriculum.courses'),
        ),
    ]
