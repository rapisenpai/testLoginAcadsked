from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static 
from django.conf import settings
from apps.user.views import signup, verify_account
from config.views import CourseListAPIView, NotificationListView, ProtectedMediaView,  SchedulerDataAPIView, UserCoursesView, check_unique, home_redirect
from django.contrib.auth.decorators import login_required

admin.site.site_title = 'administrator'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/signup/', signup, name='signup'),
    path('accounts/verify-account/', verify_account, name='verify-account'),
    path('accounts/', include('allauth.urls')),
    path('', home_redirect, name="home_redirect"),
    path('__reload__/', include('django_browser_reload.urls')), #remove this during production
    path('dashboard/', include('apps.dashboard.urls', namespace='dashboard')),
    path('curriculum/', include('apps.curriculum.urls', namespace='curriculum')),
    path('timetable/', include('apps.timetable.urls', namespace='schedules')),
    path('user/', include('apps.user.urls', namespace='user')),
    path('institute/', include('apps.institutes.urls', namespace='institutes')),
    path('program/', include('apps.programs.urls', namespace="programs")),
    path('faculty-and-staff/', include('apps.faculty.urls', namespace="faculty")),
    path("__debug__/", include("debug_toolbar.urls")), #remove this during production
    path('check-unique/', check_unique, name='check_unique'),

    #Django Rest Framework
    path('api/courses/', CourseListAPIView.as_view(), name='course_list_api'),
    path('api/courses/<int:member_id>', UserCoursesView.as_view(), name='instructor_assigned_courses'),
    path('api/prepare-ga-data/<int:user_group_id>/', SchedulerDataAPIView.as_view(), name='prepare-ga-data'),
    path('api/notifications/', NotificationListView.as_view(), name='notification-list'),

    #Protected Media
    path('media/<path:path>', login_required(ProtectedMediaView.as_view()), name='protected_media'),
]   
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
