from apps.tasks.models import Task
import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from apps.common.scalars import TimeDelta
from apps.projects.models import Project
from apps.projects.schema import ProjectNode


class TaskNode(ObjectType):
    id = graphene.UUID()
    project = graphene.Field(ProjectNode, id=graphene.UUID())
    duration = TimeDelta()
    description = graphene.String()
    date = graphene.types.datetime.Date()
    logged = graphene.Boolean()
    created = graphene.types.datetime.DateTime()

    @classmethod
    def get_node(cls, id, context, info):
        try:
            task = cls._meta.model.objects.get(id=id)
        except cls._meta.model.DoesNotExist:
            return None

        if task.user == context.user:
            return task
        return None


class Query(object):
    timelog = graphene.Field(TaskNode, id=graphene.UUID())
    all_timelogs = graphene.List(TaskNode)

    def resolve_all_timelogs(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            return Task.objects.none()
        else:
            return Task.objects.filter(user=info.context.user)


    def resolve_timelog(self, info, **kwargs):
        id = kwargs.get('id')

        if not info.context.user.is_authenticated:
            return Task.objects.none()
        elif id is not None:
            return Task.objects.filter(user=info.context.user).get(pk=id)
        else:
            return None


class TaskInput(graphene.InputObjectType):
    project = graphene.String(required=True)
    duration = TimeDelta(required=True)
    description = graphene.String(required=True, default_value='')
    date = graphene.types.datetime.DateTime(required=True)
    logged = graphene.Boolean(default_value=True)


class CreateTask(graphene.Mutation):
    class Arguments:
        input = TaskInput(required=True)

    task = graphene.Field(TaskNode)

    @staticmethod
    def mutate(self, info, input=None):
        project = Project.objects.get(pk=input.get('project', ''))
        task = Task(
            user = info.context.user,
            project = project,
            duration = input.get('duration'),
            description = input.get('description'),
            date = input.get('date'),
            logged = True
        )
        task.save()

        return CreateTask(task=task)


class UpdateTaskInput(TaskInput):
    id = graphene.String(required=True)


class UpdateTask(graphene.Mutation):
    class Arguments:
        input = UpdateTaskInput(required=True)

    task = graphene.Field(TaskNode)

    @staticmethod
    def mutate(self, info, input=None):
        user = info.context.user
        task = Task.objects.filter(user=user).get(pk=input.get('id'))
        project = Project.objects.filter(members=user).get(pk=input.get('project'))
        if task is not None:
            task.duration = input.get('duration')
            task.description = input.get('description')
            task.date = input.get('date')
            task.logged = input.get('logged')
            if project:
                task.project = project
            task.save()

        return UpdateTask(task=task)