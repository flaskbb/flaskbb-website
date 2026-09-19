.PHONY: help run build changelog
.DEFAULT_GOAL := help

FLASKBB_CHANGES ?= ../flaskbb/CHANGES.md

help: ## Displays this help message.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

run: ## Runs the lektor server
	uv run lektor server -f webpack

build: ## Creates a distribution package
	uv run lektor build -O build -f webpack

changelog: ## Syncs content/releases from FLASKBB_CHANGES (default: ../flaskbb/CHANGES.md)
	{ printf '_model: page\n---\ntitle: Releases\n---\nbody:\n\n# Releases\n\n----\n'; tail -n +2 $(FLASKBB_CHANGES); } > content/releases/contents.lr
