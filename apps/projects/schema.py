from apps.projects.models import Project, ProjectMember
from apps.accounts.schema import UserNode, AccountNode
import graphene
from graphene_django.types import DjangoObjectType, ObjectType


class MemberNode(ObjectType):
    id = graphene.UUID()
    user = graphene.Field(UserNode)

    def resolve_user(self, info, **kwargs):
        return self


class ProjectNode(DjangoObjectType):
    members = graphene.List(MemberNode)

    class Meta:
        model = Project

    @classmethod
    def get_node(cls, id, context, info):
        try:
            return cls._meta.model.objects.filter(members=context.user).get(id=id)
        except cls._meta.model.DoesNotExist:
            return None

    def resolve_members(self, info, **kwargs):
        return self.members.all()


class ProjectMemberNode(ObjectType):
    id = graphene.UUID()
    project = graphene.Field(ProjectNode, id=graphene.UUID())
    user = graphene.Field(UserNode, id=graphene.UUID())
    account = graphene.Field(AccountNode, id=graphene.UUID())
    created = graphene.types.datetime.DateTime()

    @classmethod
    def get_node(cls, id, context, info):
        try:
            return cls._meta.model.objects.filter(project=id)
        except cls._meta.model.DoesNotExist:
            return None


class Query(object):
    project = graphene.Field(ProjectNode, id=graphene.String())
    all_projects = graphene.List(ProjectNode)

    def resolve_all_projects(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            return None
        else:
            return Project.objects.filter(account=info.context.user.account)

    def resolve_project(self, info, **kwargs):
        id = kwargs.get('id')
        if not info.context.user.is_authenticated:
            return None
        elif id is not None:
            return Project.objects.filter(account=info.context.user.account).get(id=id)
        return None


class ProjectInput(graphene.InputObjectType):
    colour = graphene.String(required=True)
    abbreviation = graphene.String(required=True)
    name = graphene.String(required=True)
    company = graphene.String()
    status = graphene.Boolean()
    members = graphene.List(graphene.String)


class CreateProject(graphene.Mutation):
    class Arguments:
        input = ProjectInput(required=True)

    project = graphene.Field(ProjectNode)
    project_members = graphene.Field(ProjectMemberNode)

    @staticmethod
    def mutate(self, info, input=None):
        project = Project(
            colour = input.get('colour', '#333333'),
            abbreviation = input.get('abbreviation', ''),
            name = input.get('name', ''),
            company = input.get('company', ''),
            status = input.get('status', False),
            account = info.context.user.account
        )
        project.save()
        project.refresh_from_db()
        if project is not None:
            ProjectMember.objects.create(
                account=info.context.user.account,
                project=project,
                user=info.context.user,
                owner=True)
        return CreateProject(project=project)


class UpdateProjectInput(ProjectInput):
    id = graphene.String(required=True)


class UpdateProject(graphene.Mutation):
    class Arguments:
        input = UpdateProjectInput(required=True)

    project = graphene.Field(ProjectNode)
    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, input=None):
        project = Project.objects.filter(members=info.context.user).get(pk=input.get('id'))
        ok = False
        if project is not None:
            project.colour = input.get('colour', '#333333')
            project.abbreviation = input.get('abbreviation', '')
            project.name = input.get('name', '')
            project.company = input.get('company', '')
            project.status = input.get('status', False)
            project.save()
            ok = True

        return UpdateProject(project=project, ok=ok)


class DeleteProjectInput(graphene.InputObjectType):
    id = graphene.String(required=True)


class DeleteProject(graphene.Mutation):
    class Arguments:
        input = DeleteProjectInput(required=True)

    projectId = graphene.String()
    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, input=None):
        projectId = input.get('id')
        project = Project.objects.filter(members=info.context.user).get(pk=projectId)
        ok = False
        if project is not None:
            project.delete()
            ok = True

        return DeleteProject(projectId=projectId, ok=ok)
