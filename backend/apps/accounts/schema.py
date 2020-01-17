from apps.accounts.models import User, Account
import graphene
from graphene_django.types import DjangoObjectType, ObjectType


class AccountNode(DjangoObjectType):
    class Meta:
        model = Account

    @classmethod
    def get_node(cls, id, context, info):
        if not context.user.is_authenticated:
            return None
        else:
            try:
                return cls._meta.model.objects.filter(user=context.user)
            except cls._meta.model.DoesNotExist:
                return None


class UserNode(ObjectType):
    id = graphene.String()
    email = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    account = graphene.Field(AccountNode, id=graphene.UUID())

    @classmethod
    def get_node(cls, id, context, info):
        try:
            return cls._meta.model.objects.filter(account=context.user.account)
        except cls._meta.model.DoesNotExist:
            return None


class Query(object):
    user = graphene.Field(UserNode, id=graphene.UUID())
    all_users = graphene.List(UserNode)
    profile = graphene.Field(UserNode)

    account = graphene.Field(AccountNode, id=graphene.UUID(), name=graphene.String())
    all_accounts = graphene.List(AccountNode)

    def resolve_all_users(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return User.objects.filter(account=info.context.user.account)
        else:
            return None

    def resolve_user(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return User.objects.get(pk=id)

        return None

    def resolve_profile(self, info, **kwargs):
        return info.context.user

    def resolve_all_accounts(self, info, **kwargs):
        if info.context.user.is_staff:
            return Account.objects.all()
        return None

    def resolve_account(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Account.objects.get(pk=id)

        if name is not None:
            return Account.objects.get(name=name)

        return None
