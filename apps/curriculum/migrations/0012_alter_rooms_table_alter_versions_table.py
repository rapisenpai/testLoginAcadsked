# Generated by Django 5.0.7 on 2024-08-08 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('curriculum', '0011_populate_program_slugs'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='rooms',
            table='rooms',
        ),
        migrations.AlterModelTable(
            name='versions',
            table='versions',
        ),
    ]