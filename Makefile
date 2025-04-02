DOCKER = docker
DOCKER_COMPOSE = docker compose
DOCKER_APP_EXEC = ${DOCKER_COMPOSE} exec boris-app
DOCKER_VENDOR_EXEC = ${DOCKER_COMPOSE} exec vendor-publish

help: ## Prints help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

pint: ## Runs the pint command
	${DOCKER_APP_EXEC} vendor/bin/pint

install: ## Sets up the project
ifeq (,$(wildcard .env))
	cp .env.example .env
endif
	${DOCKER_COMPOSE} run --rm vendor-publish
	${DOCKER_COMPOSE} run --rm node-modules-publish
	make start
	${DOCKER} stop vendor-publish && ${DOCKER} rm vendor-publish
	${DOCKER} stop node-modules-publish && ${DOCKER} rm node-modules-publish
	${DOCKER_APP_EXEC} php artisan ziggy:generate
	${DOCKER_APP_EXEC} npm run build-storybook
	${DOCKER_APP_EXEC} mkdir -p public/storybook
	${DOCKER_APP_EXEC} cp -r storybook-static/* public/storybook/

start: ## Starts the application containers
	${DOCKER_COMPOSE} up -d --wait

storybook-spawn: ## Starts the application containers
	${DOCKER_APP_EXEC} npm run build-storybook
	${DOCKER_APP_EXEC} mkdir -p public/storybook
	${DOCKER_APP_EXEC} scp -r storybook-static/* public/storybook/

dev: ## Run application for development.
	${DOCKER_APP_EXEC} npm run dev

start-ssr: ## Run application with SSR mode on.
	${DOCKER_APP_EXEC} php artisan inertia:start-ssr