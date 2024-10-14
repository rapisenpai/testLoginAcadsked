# Generated by Django 5.0.7 on 2024-08-07 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('curriculum', '0008_populate_program_slugs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programs',
            name='program_slug',
            field=models.SlugField(blank=True, max_length=255, unique=True),
        ),
    ]
