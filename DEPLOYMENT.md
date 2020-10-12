# Deployment Instructions with Docker

Docker has been used for deployment to simplify the build process and provide horizontal scalability. The ASP.NET server has been configured to serve the client SPA static files for simplicity.

## Prerequisites

1. Ensure docker is installed and on the system path

## Configuring MariaDB database

1. Ensure MariaDB 10.4 is installed, configured and running. [Guide for linux systems](https://wiki.archlinux.org/index.php/MariaDB#Installation)
1. Alternatively, configure a MariaDB instance with your preferred cloud provider.
1. Create a MariaDB database with name `capisso`.
1. Create a MariaDB user with username `<USERNAME>@<HOST>` and password `<PASSWORD>`.

```sql
CREATE DATABASE capisso;
CREATE USER '<USERNAME>'@'<HOST>' IDENTIFIED BY '<PASSWORD>';
GRANT ALL PRIVILEGES ON `capisso`.* TO '<USERNAME>'@'<HOST>';
```

> Note: If hosting the database and docker container on the same machine `<HOST>` should be `docker.host.internal` on Windows, or `172.17.0.1` on Linux.

## Configuring Google Authentication

1. Navigate to the Google Developer Console and create a new OAuth Consent screen
2. In the Developer Console proceed to create a WebApp Credential and store the `Client_ID` safely.
3. Update the `REACT_APP_GOOGLE_CLIENT_ID` field in the file `client/.env` file as mentioned in the 'Building the Docker Image'
4. Create a 32 character `JWT Secret` to be used to sign the JWT Bearer Tokens
5. Update the `JwtSecret` field in `appsettings.Production` in the docker image respectively

## Building the Docker image

1. Create the `client/.env` file with the following contents:

```
REACT_APP_API_BASE='api'
REACT_APP_GOOGLE_CLIENT_ID='<GOOGLE_CLIENT_ID>'
REACT_APP_GOOGLE_HOSTED_DOMAIN='aucklanduni.ac.nz'
```

2. Create the `server/src/Capisso/appsettings.Production.json` with the following contents:

```json
{
  "Database": {
    "ConnectionString": "Server=<HOST>;Database=capisso;User=<USERNAME>;Password=<PASSWORD>"
  },
  "JwtSecret": "<JWT_SECRET>"
}
```

3. Build the image using the command from the project root directory:

```
docker build -t <IMAGE_NAME> .
```

## Running the Docker container locally

1. Run the docker container locally using the command:

```
docker run -p 3000:80 <IMAGE_NAME>
```

## Deploying the Docker container

1. Host the docker container on your preferred cloud provider or virtual private server

2. Port 80 and 443 are exposable from the container. Note that Google Auth will NOT work with a non-secure HTTP deployment.

3. For convenience, we recommend using a reverse proxy that handles SSL. Let's Encrypt offers free certificates that can easily be configured with nginx, apache, etc.
