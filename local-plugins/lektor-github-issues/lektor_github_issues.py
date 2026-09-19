from lektor.pluginsystem import Plugin

ISSUE_PATTERN = r"(?<![\w&/])#(\d+)\b"


class GitHubIssuesPlugin(Plugin):
    name = "GitHub Issues"
    description = "Links #123 references in markdown to GitHub issues and pull requests."

    def on_markdown_config(self, config, **extra):
        # GitHub redirects /issues/<n> to /pull/<n> for pull requests
        base_url = f"https://github.com/{self.get_config()['repo']}/issues/"

        def parse_issue(inline, m, state):
            if state.get("_in_link"):
                return "text", m.group(0)
            return "link", base_url + m.group(1), m.group(0)

        def plugin_issues(md):
            md.inline.register_rule("github_issue", ISSUE_PATTERN, parse_issue)
            md.inline.rules.append("github_issue")

        config.parser_options["plugins"].append(plugin_issues)
