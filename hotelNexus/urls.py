"""hotelNexus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core import views
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('core/create',
        views.CreateUserAdminView.as_view(), name='create_user'),
    path('core/login',
        views.CreateTokenView.as_view(), name='login'),
    path('core/client',
        views.client_view.as_view(), name='client'),
    path('core/client/all',
        views.get_clients, name = 'clients'),  
    path('core/admin',
        views.admin_view.as_view(), name='admin'),
    path('core/receptionist',
        views.receptionist_view.as_view(), name='recep'),
    path('core/client/rooms',
         views.get_occupied_rooms, name = 'Crooms'),
    path('core/rooms/free',
         views.get_free_rooms, name = 'rooms')
]   
