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

<!--TODO -->

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
