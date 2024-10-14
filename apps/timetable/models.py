from datetime import timezone
from django.db import models

from apps.curriculum.models import Programs
from apps.institutes.models import Institutes
from apps.user.models import User

class Periods(models.Model):
    period_id = models.AutoField(primary_key=True)
    start_time = models.TimeField()
    end_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.start_time.strftime('%I:%M %p')} - {self.end_time.strftime('%I:%M %p')}"

    class Meta:  
        db_table = "periods"
        verbose_name = 'period'
        verbose_name_plural = 'periods'

class Weekday(models.Model):
    day_id = models.AutoField(primary_key=True)
    day_name = models.CharField(max_length=9, unique=True)
    
    def __str__(self):
        return self.day_name

class FinalSchedulerData(models.Model):
    final_data_id = models.AutoField(primary_key=True)
    final_data_json_file = models.FileField(upload_to='scheduler_data/')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
      db_table = "final_scheduler_data"
      verbose_name = 'Final Scheduler Data'
      verbose_name_plural = 'Final Scheduler Data'

class InitialSchedulerData(models.Model):
    STATUS_CHOICES = (
      (1, 'Inactive'),
      (2, 'Pending'),
      (3, 'Processing'),
      (4, 'Completed'),
      (5, 'Error'),
      (6, 'Cancelled'),
    )

    scheduler_id = models.AutoField(primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    academic_year = models.CharField(max_length=10, null=True, blank=True)
    semester = models.CharField(max_length=10)
    program = models.ForeignKey(Programs, on_delete=models.CASCADE)
    institute = models.ForeignKey(Institutes, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField(default=0)
    status = models.IntegerField(choices=STATUS_CHOICES, default=2)
    initial_data_json_file = models.FileField(upload_to='scheduler_data/', null=True, blank=True)
    final_data_json_file = models.ForeignKey(FinalSchedulerData, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
          db_table = "initial_scheduler_data"
          verbose_name = 'Initial Scheduler Data'
          verbose_name_plural = 'Initial Scheduler Data'
          constraints = [
              models.UniqueConstraint(
                  fields=['institute', 'program', 'semester'],
                  condition=models.Q(status__in=[2, 3]),
                  name='unique_active_processing_per_institute_program_semester'
              )
          ]

class GeneratedSchedule(models.Model):
    json_file = models.FileField(upload_to='generated_schedule/')
    academic_year = models.CharField(max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    institute = models.ForeignKey(Institutes, on_delete=models.CASCADE)

    class Meta:
        db_table = "generated_schedule"
        verbose_name = 'Generated Schedule'
        verbose_name_plural = 'Generated Schedules'

