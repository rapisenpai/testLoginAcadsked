from django.urls import path
from .import views
from django.conf.urls.static import static
from django.conf import settings

app_name = 'user'

urlpatterns = [
    path('profile/<int:user_id>/', views.profile, name='profile'),
    path('notification/<str:username>/', views.notification, name='notification'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

