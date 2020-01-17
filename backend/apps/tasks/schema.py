from apps.tasks.models import Task
import graphene
from graphene_django.types import ObjectType
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
    timelog = graphene.Field(TaskNode, id=graphene.UUID(required=True))
    all_timelogs = graphene.List(TaskNode)
    timelogs_by_range = graphene.List(TaskNode, start=graphene.types.datetime.Date(required=True), end=graphene.types.datetime.Date(required=True))

    def resolve_all_timelogs(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            return Task.objects.none()
        else:
            return Task.objects.filter(user=info.context.user)

    def resolve_timelogs_by_range(self, info, **kwargs):
        start = kwargs.get('start')
        end = kwargs.get('end')
        if not info.context.user.is_authenticated:
            return Task.objects.none()
        else:
            return (
                Task.objects.filter(user=info.context.user)
                .filter(date__gte=start)
                .filter(date__lte=end)
            )

    def resolve_timelog(self, info, **kwargs):
        id = kwargs.get('id')

        if not info.context.user.is_authenticated:
            return Task.objects.none()
        else:
            return Task.objects.filter(user=info.context.user).get(pk=id)


class TaskInput(graphene.InputObjectType):
    project = graphene.String(required=True)
    duration = TimeDelta(required=True)
    description = graphene.String(required=True, default_value='')
    date = graphene.types.datetime.Date(required=True)
    logged = graphene.Boolean(default_value=True)


class CreateTask(graphene.Mutation):
    class Arguments:
        input = TaskInput(required=True)

    task = graphene.Field(TaskNode)
    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, input=None):
        project = Project.objects.get(pk=input.get('project'))
        ok = False
        if project is not None:
            task = Task(
                user = info.context.user,
                project = project,
                duration = input.get('duration'),
                description = input.get('description'),
                date = input.get('date'),
                logged = True
            )
            task.save()
            ok = True

        return CreateTask(task=task, ok=ok)


class UpdateTaskInput(TaskInput):
    id = graphene.String(required=True)


class UpdateTask(graphene.Mutation):
    class Arguments:
        input = UpdateTaskInput(required=True)

    task = graphene.Field(TaskNode)
    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, input=None):
        user = info.context.user
        task = Task.objects.filter(user=user).get(pk=input.get('id'))
        project = Project.objects.filter(members=user).get(pk=input.get('project'))
        ok = False
        if task is not None and project is not None:
            task.duration = input.get('duration')
            task.description = input.get('description')
            task.date = input.get('date')
            task.logged = input.get('logged')
            task.project = project
            task.save()
            ok = True

        return UpdateTask(task=task, ok=ok)


class DeleteTaskInput(graphene.InputObjectType):
    id = graphene.UUID(required=True)


class DeleteTask(graphene.Mutation):
    class Arguments:
        input = DeleteTaskInput(required=True)

    taskId = graphene.UUID()
    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, input=None):
        user = info.context.user
        taskId = input.get('id')
        task = Task.objects.filter(user=user).get(pk=input.get('id'))
        ok = False
        if task is not None:
            task.delete()
            ok = True

        return DeleteTask(taskId=taskId, ok=ok)
