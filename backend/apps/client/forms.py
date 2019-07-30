from django import forms
from django_countries.fields import CountryField
from apps.accounts.models import User, Account

class RegisterForm(forms.Form):
    email = forms.EmailField()
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)
    first_name = forms.CharField(label='First name', max_length=100)
    last_name = forms.CharField(label='Last name',max_length=100)
    company_name = forms.CharField(label='Company name',max_length=100)
    country = CountryField().formfield()

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2
      
    def save(self):
        user = User.objects.create_user(
            email=self.cleaned_data.get("email"),
            password=self.cleaned_data.get("password1"),
            first_name=self.cleaned_data.get("first_name"),
            last_name=self.cleaned_data.get("last_name"),
            name=self.cleaned_data.get("company_name"),
            country=self.cleaned_data.get("country"),
            account_type=Account.FREE
        )

        return user