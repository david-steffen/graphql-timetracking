import datetime
import pytimeparse
from graphene.types import Scalar
from graphql.language import ast

class TimeDelta(Scalar):
    '''TimeDelta Scalar Description'''

    @staticmethod
    def serialize(td):
        assert isinstance(td, (datetime.timedelta)), (
            'Received not compatible timedelta "{}"'.format(repr(td))
        )
        return str(td)

    @classmethod
    def parse_literal(cls, node):
        if isinstance(node, ast.StringValue):
            return cls.parse_value(node.value)

    @staticmethod
    def parse_value(value):
        seconds = pytimeparse.parse(value)
        return datetime.timedelta(seconds=seconds)
