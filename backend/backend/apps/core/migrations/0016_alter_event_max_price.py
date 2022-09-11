# Generated by Django 4.1.1 on 2022-09-11 04:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0015_event_max_price"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="max_price",
            field=models.IntegerField(
                blank=True, default=None, null=True, verbose_name="Максимальная цена"
            ),
        ),
    ]