from django.urls import path
from .import views
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

app_name = 'timetable'

urlpatterns = [
    path('scheduler/', views.scheduler, name='scheduler'),
    path('rooms/', views.classrooms, name='rooms'),
    path('instructors/', views.instructors, name='instructors'),
    path('periods/', views.periods, name='periods'),
    path('my-schedule/', views.my_schedule, name='my-schedule'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

