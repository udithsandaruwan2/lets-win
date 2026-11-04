from rest_framework.authentication import SessionAuthentication


class SessionAuthentication401(SessionAuthentication):
    """Return 401 (not 403) when the session is missing."""

    def authenticate_header(self, request) -> str:
        return "Session"
