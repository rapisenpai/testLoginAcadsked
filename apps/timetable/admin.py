from django.contrib import admin
from apps.timetable.models import FinalSchedulerData, Periods, InitialSchedulerData, Weekday

class PeriodsAdmin(admin.ModelAdmin):
    list_display = ('period_id', 'start_time', 'end_time', 'created_at', 'updated_at')
    list_display_links = ('period_id', 'start_time', 'end_time', 'created_at', 'updated_at')
    search_fields = ('period_id', 'start_time', 'end_time', 'created_at', 'updated_at')

class WeekdayAdmin(admin.ModelAdmin):
    list_display = ('day_id', 'day_name',)
    search_fields = ('day_name',)

class InitialSchedulerDataAdmin(admin.ModelAdmin):
    list_display = ('scheduler_id', 'created_by', 'academic_year', 'semester', 'program', 'institute', 'created_at', 'progress', 'status', 'initial_data_json_file', 'final_data_json_file')
    search_fields = ('scheduler_id', 'created_by', 'academic_year', 'semester', 'program', 'institute', 'created_at', 'progress', 'status', 'initial_data_json_file', 'final_data_json_file')
    list_display_links = ('scheduler_id', 'created_by', 'academic_year', 'semester', 'program', 'institute', 'created_at', 'progress', 'status', 'initial_data_json_file', 'final_data_json_file')

class FinalSchedulerDataAdmin(admin.ModelAdmin):
    list_display = ('final_data_id', 'final_data_json_file', 'created_at')
    search_fields = ('final_data_id', 'final_data_json_file', 'created_at')
    list_display_links = ('final_data_id', 'final_data_json_file', 'created_at')

admin.site.register(Periods, PeriodsAdmin)
admin.site.register(Weekday, WeekdayAdmin)
admin.site.register(InitialSchedulerData, InitialSchedulerDataAdmin)
admin.site.register(FinalSchedulerData, FinalSchedulerDataAdmin)
