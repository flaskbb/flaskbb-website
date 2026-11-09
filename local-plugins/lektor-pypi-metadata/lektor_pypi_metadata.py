import json
from functools import cache
from urllib.request import urlopen

from lektor.pluginsystem import Plugin
from packaging.requirements import Requirement


def flaskbb_requirement(requires_dist):
    for requirement in map(Requirement, requires_dist or []):
        if requirement.name.lower() == "flaskbb":
            specifiers = sorted(requirement.specifier, key=str, reverse=True)
            constraints = ", ".join(f"{s.operator} {s.version}" for s in specifiers)
            return f"FlaskBB {constraints}".strip()
    return None


@cache
def pypi_metadata(package):
    with urlopen(f"https://pypi.org/pypi/{package}/json", timeout=30) as response:
        info = json.load(response)["info"]
    return {
        "version": info["version"],
        "license": info["license_expression"],
        "requires": flaskbb_requirement(info["requires_dist"]),
    }


class PyPIMetadataPlugin(Plugin):
    name = "PyPI Metadata"
    description = "Reads the version, license and FlaskBB requirement of a package from PyPI."

    def on_setup_env(self, **extra):
        self.env.jinja_env.globals["pypi_metadata"] = pypi_metadata
