from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@login_required
@ensure_csrf_cookie
def index(request):
    return render(request, 'times/index.html')


def login(request):
    return render(request, 'accounts/login.html')
