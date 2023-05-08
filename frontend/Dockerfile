FROM python:3.8-slim-bullseye

# Install nodejs
RUN apt-get update && apt-get install -y --no-install-recommends curl && \
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
        apt-get install -y nodejs


#  Install pangea
RUN pip install secrets-cli

WORKDIR /app
COPY . .

ENTRYPOINT ["pangea", "run", "npm", "run", "dev"]
