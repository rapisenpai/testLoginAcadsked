# Generated by Django 5.0.8 on 2024-09-11 13:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('curriculum', '0033_alter_rooms_room_name'),
        ('institutes', '0002_alter_institutes_acronym_and_more'),
        ('user', '0030_usergroup_date_updated_usergroup_institute_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='usergroup',
            unique_together={('group_name', 'program', 'institute')},
        ),
    ]