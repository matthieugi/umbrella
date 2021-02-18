# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="12-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Install Azure Function Core Tools
RUN curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add - \
    && sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs | cut -d'.' -f 1)/prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list' \
    && sudo apt-get update \
    && sudo apt-get install azure-functions-core-tools-3

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
USER node

WORKDIR /workspace/api
RUN npm install

#expose running port (React & Azure Function)
EXPOSE 3000 7071 5501