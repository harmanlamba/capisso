# build frontend
FROM node:14 AS build-frontend

ARG REACT_APP_API_BASE
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_GOOGLE_HOSTED_DOMAIN

WORKDIR /app
COPY client/package.json client/yarn.lock ./
RUN yarn
COPY client/ ./
RUN yarn build

# build backend
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-backend

WORKDIR /app
COPY server/src/Capisso/Capisso.csproj ./
RUN dotnet restore
COPY server/src/Capisso/ ./
RUN dotnet publish -c Release -o out

# run
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS run

WORKDIR /app
COPY --from=build-backend /app/out ./
COPY --from=build-frontend /app/build ./ClientApp/build
EXPOSE 80 443
ENTRYPOINT [ "dotnet", "Capisso.dll" ]
