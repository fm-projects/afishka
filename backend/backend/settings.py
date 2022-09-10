import datetime
import toml
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

config = toml.load(BASE_DIR / "config.toml")

DEBUG = True

SECRET_KEY = config["Django"]["SECRET_KEY"]

DEBUG = config["Django"]["DEBUG"]

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "backend.apps.core",
    # Rest
    "corsheaders",
    "rest_framework",
    "django_filters",
    "sorl_thumbnail_serializer",
    "sorl.thumbnail",
    "rest_framework_simplejwt.token_blacklist",
    # Auth
    "djoser",
]

SITE_ID = 1

SOCIALACCOUNT_PROVIDERS = {"telegram": {"TOKEN": "your tokken"}}


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTH_USER_MODEL = "core.User"

LANGUAGE_CODE = "ru"

TIME_ZONE = "Europe/Moscow"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

MEDIA_URL = "/media/"
MEDIA_ROOT = "media"

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "dist" / "static"
STATICFILES_DIRS = []

REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

JWT_AUTH = {
    "TOKEN_TYPE_CLAIM": "rest_framework_simplejwt.tokens.AccessToken",
    "ACCESS_TOKEN_LIFETIME": datetime.timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": datetime.timedelta(days=14),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": True,
    "AUTH_HEADER_TYPES": ("JWT",),
}

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

DJOSER = {
    # "SEND_ACTIVATION_EMAIL": True,
    # "ACTIVATION_URL": "api/auth/activate/{uid}/{token}",
    # "EMAIL": {
    #     "activation": "backend.apps.core.email.ActivationEmail",
    # },
    "PERMISSIONS": {
        "activation": ["rest_framework.permissions.AllowAny"],
        "password_reset": ["rest_framework.permissions.AllowAny"],
        "password_reset_confirm": ["rest_framework.permissions.AllowAny"],
        "set_password": ["backend.permissions.CurrentUserOrAdmin"],
        "username_reset": ["rest_framework.permissions.AllowAny"],
        "username_reset_confirm": ["rest_framework.permissions.AllowAny"],
        "set_username": ["backend.permissions.CurrentUserOrAdmin"],
        "user_create": ["rest_framework.permissions.AllowAny"],
        "user_delete": ["backend.permissions.CurrentUserOrAdmin"],
        "user": ["backend.permissions.CurrentUserOrAdmin"],
        "user_list": ["backend.permissions.CurrentUserOrAdmin"],
        "token_create": ["rest_framework.permissions.AllowAny"],
        "token_destroy": ["rest_framework.permissions.IsAuthenticated"],
    }
}


# Email
DEFAULT_FROM_EMAIL = config["Email"]["DEFAULT_FROM_EMAIL"]
EMAIL_HOST = config["Email"]["EMAIL_HOST"]
EMAIL_PORT = config["Email"]["EMAIL_PORT"]
EMAIL_HOST_USER = config["Email"]["EMAIL_HOST_USER"]
EMAIL_HOST_PASSWORD = config["Email"]["EMAIL_HOST_PASSWORD"]
EMAIL_USE_TLS = config["Email"]["EMAIL_USE_TLS"]
