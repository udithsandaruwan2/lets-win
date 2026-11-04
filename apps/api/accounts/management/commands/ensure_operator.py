import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Ensure the single operator user exists (idempotent)."

    def handle(self, *args, **options) -> None:
        User = get_user_model()
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "operator")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "operator")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "operator@lets-win.local")

        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email, "is_staff": True, "is_superuser": True},
        )
        if created:
            user.set_password(password)
            user.save(update_fields=["password"])
            self.stdout.write(self.style.SUCCESS(f"Created operator '{username}'"))
            return

        # Keep password in sync with env for local/docker convenience.
        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()
        self.stdout.write(self.style.SUCCESS(f"Updated operator '{username}'"))
