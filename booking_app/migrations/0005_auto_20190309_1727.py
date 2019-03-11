# Generated by Django 2.1.7 on 2019-03-09 17:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking_app', '0004_auto_20190309_1625'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='dateFrom',
            field=models.DateField(default=datetime.date.today, verbose_name='Booking date from'),
        ),
        migrations.AddField(
            model_name='booking',
            name='dateTo',
            field=models.DateField(default=datetime.date.today, verbose_name='Booking date to'),
        ),
    ]