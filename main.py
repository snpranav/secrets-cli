#!/usr/bin/env python3

import typer
from pangea.services import Vault
from pangea.services.vault.models.common import ItemVersionState
import os
from InquirerPy import inquirer
from typing import List
import logging

logging.basicConfig(level = logging.INFO)
app = typer.Typer()

DEFAULT_PANGEA_CREDENTIALS_PATH = f"{os.getenv('HOME')}/.pangea/credentials"

@app.command()
def setup():
    pangea_token: str = typer.prompt("Enter your Pangea Token")
    # Write the token to a ~/.pangea/credentials file
    print(f"✨ Setting up Pangea Secrets CLI")

    # Check if folder exists
    if not os.path.isdir(f"{os.getenv('HOME')}/.pangea"):
        # Create new directory
        os.mkdir(f"{os.getenv('HOME')}/.pangea")

    f = open(DEFAULT_PANGEA_CREDENTIALS_PATH, "w")
    # CHeck if file exists
    if (f == None):
        print("❌ Error opening file")
        raise typer.Exit(code=1)
    f.write(pangea_token)
    f.close()
    print(f"✅ Setup Complete. Credentials saved to ~/.pangea/credentials")

def _get_pangea_token() -> str:
    # Read the token from a ~/.pangea/credentials file
    f = open(DEFAULT_PANGEA_CREDENTIALS_PATH, "r")
    # Check if errors opening file
    if (f == None):
        print("Error opening file")
        raise typer.Exit(code=1)
    pangea_token = f.read()
    f.close()
    return pangea_token

def _list_secrets(folder_name, vault):
    return vault.list(
        filter={
            "folder": folder_name,
        }
    )

@app.command()
def select(folder_name: str = "/secrets"):
    pangea_token = _get_pangea_token()
    vault: Vault = Vault(token=pangea_token)

    print(f"List of secrets from {folder_name}")
    list_secrets = _list_secrets(folder_name, vault)
    for result in list_secrets.result.items:
        if result.type == "folder":
            print(f"📂 {result.type} {result.name}")
        elif result.type == "secret":
            print(f"🔐 {result.type} {result.id}")

    proceed = inquirer.confirm(message="Do you want to load these secrets for your app?", default=True).execute()

    if proceed:
        print("✨ Done loading secrets. Start your application with `pangea run -c app_name`")

# @app.command()
# def run(c: str = typer.Argument("", metavar="-c/--command", help="Command to run your application. Eg: `python main.py`")):
#     print(f"✨ Running {c}")


@app.command()
def run(
    command: List[str]
):
    # prepend environment secrets from pangea
    pangea_token = _get_pangea_token()
    vault: Vault = Vault(token=pangea_token)
    secret_list = _list_secrets("/secrets/project1", vault)
    secret_value_list = {}
    for result in secret_list.result.items:
        if result.type == "secret":
            secret = vault.get(result.id)
            print(f"🏗️ Loading secret {result.name}")
            secret = vault.get(
                id=result.id,
                version_state=ItemVersionState.ACTIVE,
                verbose=False,
            )
            secret_value_list[result.name] = secret.result.current_version.secret

    # Prepend secret_value_list to command list
    import subprocess

    # Execute the command
    process_env = os.environ.copy()
    process_env.update(secret_value_list)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=process_env)

    # Get the output and error
    stdout, stderr = process.communicate()

    # Print the output and error
    if len(stdout.decode('utf-8')) > 0: logging.info(stdout.decode('utf-8'))
    if len(stderr.decode('utf-8')) > 0: logging.error(stderr.decode('utf-8'))

if __name__ == "__main__":
    app()