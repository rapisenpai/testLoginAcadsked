# Generated by Django 4.2.11 on 2024-07-25 05:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('curriculum', '__first__'),
        ('user', '0003_remove_user_designation_alter_user_program'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='program',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='curriculum.programs'),
        ),
    ]
