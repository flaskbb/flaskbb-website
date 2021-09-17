.PHONY: help run build
.DEFAULT_GOAL := help

help: ## Displays this help message.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

run: ## Runs the lektor server
	lektor server -f webpack

build: ## Creates a distribution package
	lektor build -O build -f webpack
