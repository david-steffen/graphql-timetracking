from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib import messages
from apps.client.forms import RegisterForm

# Create your views here.
@login_required
@ensure_csrf_cookie
def index(request):
    return render(request, 'times/index.html')


# def login(request):
#     return render(request, 'account/login.html')

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        print("posted")
        if form.is_valid():
            print("valid")
            form.save()
            messages.success(request, 'Account created successfully')
            return redirect('login')
        else:
            print(form.errors)

    else:
        form = RegisterForm()

    return render(request, 'account/register.html', { 'form': form })
