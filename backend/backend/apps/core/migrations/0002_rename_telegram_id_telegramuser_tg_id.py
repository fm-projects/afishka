# Generated by Django 4.1.1 on 2022-09-10 12:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='telegramuser',
            old_name='telegram_id',
            new_name='tg_id',
        ),
    ]