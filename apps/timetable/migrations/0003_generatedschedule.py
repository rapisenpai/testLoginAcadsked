# Generated by Django 5.0.8 on 2024-10-12 17:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institutes', '0002_alter_institutes_acronym_and_more'),
        ('timetable', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GeneratedSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('json_file', models.FileField(upload_to='generated_schedule/')),
                ('academic_year', models.CharField(blank=True, max_length=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('institute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='institutes.institutes')),
            ],
            options={
                'verbose_name': 'Generated Schedule',
                'verbose_name_plural': 'Generated Schedules',
                'db_table': 'generated_schedule',
            },
        ),
    ]