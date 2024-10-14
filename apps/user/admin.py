from django.contrib import admin
from apps.user.models import GroupMember, Notification, User, UserGroup

class ListOfUsers(admin.ModelAdmin):
    list_display = ('username', 'first_name','middle_name','last_name','suffix', 'gender','email', 'user_type','employment_status','institute_name', 'program_name', 'position','is_active','last_login','date_joined',)
    list_display_links = ('username','first_name','middle_name','last_name','suffix', 'gender','email', 'user_type','employment_status', 'institute_name', 'program_name', 'position','is_active','last_login','date_joined',)

    def program_name(self, obj):
        return obj.program.program_name
    
    def institute_name(self, obj):
        return obj.institute.institute_name
    
admin.site.register(User, ListOfUsers)

class UserGroupAdmin(admin.ModelAdmin):
    list_display = ('group_id', 'group_name', 'semester', 'program', 'institute', 'curriculum', 'date_created','date_updated', )
    list_display_links =  ('group_id', 'group_name', 'semester', 'program', 'institute', 'curriculum', 'date_created','date_updated', )
    search_fields = ('group_name',)
    readonly_fields = ('date_created',)

admin.site.register(UserGroup, UserGroupAdmin)

class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ('member_id', 'group', 'user', 'program', 'institute', 'display_courses', 'date_assigned', 'date_added')
    list_display_links = ('member_id', 'group', 'user')
    search_fields = ('user__first_name', 'user__last_name', 'group__group_name')
    list_filter = ('group', 'program', 'institute')
    readonly_fields = ('date_assigned', 'date_added')

    def display_courses(self, obj):
        return ", ".join([course.course_code for course in obj.courses.all()])
    display_courses.short_description = 'Courses'

admin.site.register(GroupMember, GroupMemberAdmin)

class notificationAdmin(admin.ModelAdmin):
    list_display = ('notification_id', 'message', 'status', 'date_time', 'created_at', 'recipient', 'sender')
    list_display_links = ('notification_id', 'message', 'status', 'date_time', 'created_at', 'recipient', 'sender')
    search_fields = ('message',)
    list_filter = ('status', 'date_time', 'created_at')
    readonly_fields = ('created_at',)

admin.site.register(Notification, notificationAdmin)