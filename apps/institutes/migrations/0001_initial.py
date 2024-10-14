# Generated by Django 5.0.7 on 2024-08-07 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Institutes',
            fields=[
                ('institute_id', models.AutoField(primary_key=True, serialize=False)),
                ('institute_name', models.CharField(max_length=255)),
                ('acronym', models.CharField(max_length=50)),
                ('institute_slug', models.SlugField(blank=True, max_length=255, unique=True)),
            ],
            options={
                'verbose_name': 'Institute',
                'verbose_name_plural': 'Institutes',
                'db_table': 'institutes',
            },
        ),
    ]