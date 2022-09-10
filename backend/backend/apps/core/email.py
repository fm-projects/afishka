from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from djoser.conf import settings
from templated_mail.mail import BaseEmailMessage


class ActivationEmail(BaseEmailMessage):
    """Send an email to a user with a link to activate his account."""

    template_name = "email/account-activation.html"

    def get_context_data(self):
        """Get context data."""
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        return context
