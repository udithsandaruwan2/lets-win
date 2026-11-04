import pytest
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_health_ok() -> None:
    client = APIClient()
    response = client.get(reverse("health"))
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["database"] == "up"


@pytest.mark.django_db
def test_health_v1_ok() -> None:
    client = APIClient()
    response = client.get(reverse("health-v1"))
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
