from apps.accounts.models import User, Account
import graphene
from graphene_django.types import DjangoObjectType, ObjectType


class UserNode(ObjectType):
    id = graphene.String()
    email = graphene.String()
    first_name = graphene.String(name='first_name')
    last_name = graphene.String(name='last_name')

    @classmethod
    def get_node(cls, id, context, info):
        try:
            user = cls._meta.model.objects.get(id=id)
        except cls._meta.model.DoesNotExist:
            return None

        if context.user.is_staff or context.user == user:
            return user

        return None

class AccountNode(DjangoObjectType):
    class Meta:
        model = Account

    @classmethod
    def get_node(cls, id, context, info):
        try:
            account = cls._meta.model.objects.get(id=id)
        except cls._meta.model.DoesNotExist:
            return None
        user = account.user_set.filter(id=context.user.id)
        if context.user.is_staff or context.user == user:
            return user

        return None


class Query(object):
    user = graphene.Field(UserNode, id=graphene.UUID())
    all_users = graphene.List(UserNode)

    account = graphene.Field(AccountNode, id=graphene.UUID(), name=graphene.String())
    all_accounts = graphene.List(AccountNode)

    def resolve_all_users(self, info, **kwargs):
        if info.context.user.is_staff:
            return User.objects.all()

        return None

    def resolve_user(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return User.objects.get(pk=id)

        return None

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
