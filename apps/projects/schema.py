from apps.projects.models import Project, ProjectMember
import graphene
from graphene_django.types import DjangoObjectType

class ProjectNode(DjangoObjectType):
    class Meta:
        model = Project

    @classmethod
    def get_node(cls, id, context, info):
        try:
            project = cls._meta.model.objects.filter(members=context.user).get(id=id)
        except cls._meta.model.DoesNotExist:
            return None

        return None


class Query(object):
    project = graphene.Field(ProjectNode, id=graphene.UUID())
    all_projects = graphene.List(ProjectNode)

    def resolve_all_projects(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            return Project.objects.none()
        else:
            return Project.objects.filter(members=info.context.user)

    def resolve_project(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Project.objects.get(pk=id)

        return None


class ProjectInput(graphene.InputObjectType):
    colour = graphene.String(required=True)
    abbreviation = graphene.String(required=True)
    name = graphene.String(required=True)
    company = graphene.String()
    status = graphene.Boolean()


class CreateProject(graphene.Mutation):
    class Arguments:
        input = ProjectInput(required=True)

    project = graphene.Field(ProjectNode)

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

    @staticmethod
    def mutate(self, info, input=None):
        project = Project.objects.filter(members=info.context.user).get(pk=input.get('id'))

        project.colour = input.get('colour', '#333333')
        project.abbreviation = input.get('abbreviation', '')
        project.name = input.get('name', '')
        project.company = input.get('company', '')
        project.status = input.get('status', False)
        project.save()

        return UpdateProject(project=project)
