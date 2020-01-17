"""projects URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.urls import path, re_path
from apps.common.views import PrivateGraphQLView, DebugGraphQLView
from django.contrib.auth import views as auth_views
from django.contrib import admin
from apps.client import views
from django.conf import settings


urlpatterns = [
    path('admin', admin.site.urls),
    path('graphql', PrivateGraphQLView.as_view(graphiql=True)),
    path('accounts/login/', auth_views.LoginView.as_view(template_name='account/login.html'),name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(template_name='account/logout.html'), name='logout'),
    path('accounts/register/', views.register, name='register'),
    path('accounts/password-reset/', auth_views.PasswordResetView.as_view(template_name='account/password_reset.html'), name='password_reset'),
    path('accounts/password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='account/password_reset_confirm.html'), name='password_reset_confirm'),
    path('accounts/password-reset-done/', auth_views.PasswordResetDoneView.as_view(template_name='account/password_reset_done.html'), name='password_reset_done'),
    path('accounts/password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='account/password_reset_complete.html'), name='password_reset_complete'),
]

if settings.DEBUG:
    urlpatterns += [
        path('graphql_debug', DebugGraphQLView.as_view(graphiql=True)),
    ]

urlpatterns += [
    re_path(r'^.*$', views.index, name='index'),
]
