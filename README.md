# Django GraphQL time tracking example

This is a simple time tracking app using Django for the backend and elm-lang lang for the single page app on the frontend.

I was interested in learning about GraphQL so built this example. There are still features and styling missing but will be added soon and will update this readme.

## Running locally

### Backend

Firstly clone this repo then create a virtual environment. I recommend  [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) as it makes setting up and working in different python environments easier.

Once that is done, install the requirements for python environments by typing in the command line

```
pip install -r requirements.txt
```

After that run

```
python manage.py migrate
```
to migrate your database 
> Don't forget to create a .env file from the .env.example with all your database settings in it!

Then after that just run
```
python manage.py runserver
```
to get your local development server running and point your browser to [localhost:8000](localhost:8000)

### Frontend

If you fancy playing around with [elm-lang](https://elm-lang.org/) on the frontend you will need to have Elm installed through npm

```
npm install -g elm
```
Once it is installed then you just have to run

```
elm make src/Main.elm --output static/build/main.js
```
every time you make a change and want to compile
