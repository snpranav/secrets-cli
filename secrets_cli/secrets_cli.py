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
DEFAULT_PANGEA_CACHE_PATH = f"{os.getenv('HOME')}/.pangea/path_cache.json"

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
    if (not os.getenv('PANGEA_TOKEN')):
        # Read the token from a ~/.pangea/credentials file
        f = open(DEFAULT_PANGEA_CREDENTIALS_PATH, "r")
        # Check if errors opening file
        if (f == None):
            print("Error opening file")
            raise typer.Exit(code=1)
        pangea_token = f.read()
        f.close()
    else:
        pangea_token = os.getenv('PANGEA_TOKEN')

    return pangea_token

def _set_local_secrets_path(path: str, secrets_dir: str):
    # Write the directory to load secrets from
    # Open ~/.pangea/path_cache.json
    # Check if file exists
    if not os.path.isfile(DEFAULT_PANGEA_CACHE_PATH):
        # Create new file
        f = open(DEFAULT_PANGEA_CACHE_PATH, "w")
        f.write("{}")
        f.close()
    
    # Read the file
    f = open(DEFAULT_PANGEA_CACHE_PATH, "r")
    # Check if errors opening file
    if (f == None):
        print("Error opening file")
        raise typer.Exit(code=1)
    path_cache = f.read()
    f.close()
    # Load the json
    import json
    path_cache_json = json.loads(path_cache)
    # Set the path
    path_cache_json[path] = secrets_dir
    # Write the file
    f = open(DEFAULT_PANGEA_CACHE_PATH, "w")
    f.write(json.dumps(path_cache_json))
    f.close()

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
    list_secrets = _list_secrets(f"/secrets/{folder_name}", vault)
    for result in list_secrets.result.items:
        if result.type == "folder":
            print(f"📂 {result.type} {result.name}")
        elif result.type == "secret":
            print(f"🔐 {result.type} {result.name}")

    proceed = inquirer.confirm(message="Do you want to load these secrets for your app?", default=True).execute()

    if proceed:
        # Get current directory
        current_dir = os.getcwd()
        _set_local_secrets_path(current_dir, f"/secrets/{folder_name}")
        print("✨ Done loading secrets. Start your application with `pangea run app_name`")

# @app.command()
# def run(c: str = typer.Argument("", metavar="-c/--command", help="Command to run your application. Eg: `python main.py`")):
#     print(f"✨ Running {c}")

def _get_secrets_dir_from_cache():
    if (not os.getenv('PANGEA_SECRETS_DIR')):
        current_dir = os.getcwd()
        # Check if current directory is in cache
        if not os.path.isfile(DEFAULT_PANGEA_CACHE_PATH):
            logging.info("❌ No secrets loaded. Run `pangea select` to load secrets")
            raise typer.Exit(code=1)
        
        # Read the file
        f = open(DEFAULT_PANGEA_CACHE_PATH, "r")
        # Check if errors opening file
        if (f == None):
            print("Error opening file")
            raise typer.Exit(code=1)
        path_cache = f.read()
        f.close()
        # Load the json
        import json
        path_cache_json = json.loads(path_cache)
        # Set the path
        if current_dir not in path_cache_json:
            logging.info("❌ No secrets loaded. Run `pangea select` to load secrets")
            raise typer.Exit(code=1)

        return path_cache_json[current_dir]
    else:
        return f"/secrets/{os.getenv('PANGEA_SECRETS_DIR')}"

@app.command()
def run(
    command: List[str]
):
    # prepend environment secrets from pangea
    pangea_token = _get_pangea_token()
    vault: Vault = Vault(token=pangea_token)
    secrets_dir = _get_secrets_dir_from_cache()
    secret_list = _list_secrets(secrets_dir, vault)
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
    import subprocess, sys

    # Execute the command
    process_env = os.environ.copy()
    process_env.update(secret_value_list)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=process_env)

    # Relay output and error back to host process
    for line in iter(process.stdout.readline, b''):
        sys.stdout.write(line.decode('utf-8'))
    for line in iter(process.stderr.readline, b''):
        sys.stderr.write(line.decode('utf-8'))

    # Wait for the subprocess to finish
    process.wait()
