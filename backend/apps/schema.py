from apps.accounts.schema import Query as AccountQuery
from apps.projects.schema import Query as ProjectQuery, CreateProject, UpdateProject, DeleteProject
from apps.tasks.schema import Query as TaskQuery, CreateTask, UpdateTask, DeleteTask
import graphene

from graphene_django.debug import DjangoDebug


class Query(AccountQuery, ProjectQuery, TaskQuery, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')


class Mutation(graphene.ObjectType):
    createTask = CreateTask.Field()
    createProject = CreateProject.Field()
    updateTask = UpdateTask.Field()
    updateProject = UpdateProject.Field()
    deleteTask = DeleteTask.Field()
    deleteProject = DeleteProject.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
