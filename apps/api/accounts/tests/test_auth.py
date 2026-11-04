import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.fixture
def operator(db):
    User = get_user_model()
    return User.objects.create_user(username="operator", password="operator")


@pytest.mark.django_db
def test_unauthenticated_ping_is_401() -> None:
    client = APIClient()
    response = client.get(reverse("operator-ping"))
    assert response.status_code == 401


@pytest.mark.django_db
def test_login_me_and_ping(operator) -> None:
    client = APIClient()
    csrf = client.get(reverse("auth-csrf"))
    assert csrf.status_code == 200
    assert "csrfToken" in csrf.json()

    login = client.post(
        reverse("auth-login"),
        {"username": "operator", "password": "operator"},
        format="json",
    )
    assert login.status_code == 200
    assert login.json()["username"] == "operator"

    me = client.get(reverse("auth-me"))
    assert me.status_code == 200
    assert me.json()["username"] == "operator"

    ping = client.get(reverse("operator-ping"))
    assert ping.status_code == 200
    assert ping.json()["pong"] is True


@pytest.mark.django_db
def test_bad_login_rejected(operator) -> None:
    client = APIClient()
    response = client.post(
        reverse("auth-login"),
        {"username": "operator", "password": "wrong"},
        format="json",
    )
    assert response.status_code == 400
