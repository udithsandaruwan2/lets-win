from typing import ClassVar

from django.db import connection
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    """Liveness/readiness: process up + database reachable."""

    permission_classes: ClassVar[list] = [AllowAny]
    authentication_classes: ClassVar[list] = []

    def get(self, request: Request) -> Response:
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except Exception as exc:  # noqa: BLE001 — surface readiness failure
            return Response(
                {"status": "error", "database": "down", "detail": str(exc)},
                status=503,
            )
        return Response({"status": "ok", "database": "up"})
