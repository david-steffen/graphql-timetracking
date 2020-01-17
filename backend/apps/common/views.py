from django.contrib.auth.mixins import LoginRequiredMixin
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


class PrivateGraphQLView(LoginRequiredMixin, GraphQLView):
    pass


@method_decorator(csrf_exempt, name='dispatch')
class DebugGraphQLView(GraphQLView):
    pass
