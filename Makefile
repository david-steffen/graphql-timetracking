server-dev:
	cd backend; python manage.py runserver

server-build:
	cd frontend; elm make src/Main.elm --output=../backend/apps/client/static/client/main.js --optimize
	java -jar ../../closure-compiler/compiler.jar --js backend/apps/client/static/client/main.js --js_output_file backend/apps/client/static/client/main.min.js
	mv backend/apps/client/static/client/main.min.js backend/apps/client/static/client/main.js
	cd backend; python manage.py collectstatic

elm-dev:
	cd frontend; elm make src/Main.elm --output=../backend/apps/client/static/client/main.js

sass-dev:
	sassc frontend/scss/main.scss > backend/apps/client/static/client/main.css

