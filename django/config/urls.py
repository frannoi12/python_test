"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.urls import include, path, re_path
from accounts.views import login_page_views, google_login_callback_views, google_login_views, github_login_callback

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", login_page_views.LoginPage.as_view(), name="login"),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    re_path(r"^api/v1/auth/accounts/", include("allauth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/auth/google/", google_login_views.GoogleLogin.as_view(), name="google_login"),
    path("api/v1/auth/github/", github_login_callback.GitHubLogin.as_view(), name="github_login"),
    path(
        "api/v1/auth/google/callback/",
        google_login_callback_views.GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
]
