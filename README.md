![.github/workflows/dotnetcore.yml](https://github.com/harmanlamba/capisso/workflows/.NET%20Server%20Build%20Workflow/badge.svg)
![Node.js CI](https://github.com/harmanlamba/capisso/workflows/React%20Client%20Build%20Workflow/badge.svg)
# Capisso
Capisso is organisation management tool that tracks student projects.

## Demo

You can access Capisso at https://capisso.jedrobertson.com to test the application. You will need to login with a aucklanduni.ac.nz account that has been whitelisted, contact the maintainers if you should be, but are not, whitelisted. 

## Environment Setup
1. Ensure Node.js v12 and Yarn v1.2.x are installed and on the system path.
1. Ensure ASP.NET Core 3.1.x is installed on on the system path.
1. Ensure MariaDB 10.4 is installed, configured and running. [Guide for linux systems](https://wiki.archlinux.org/index.php/MariaDB#Installation)
1. Create a MariaDB database with name `capisso`.
1. Create a MariaDB user with username `efcoreuser@localhost` and password `password`.
```sql
CREATE DATABASE capisso;
CREATE USER 'efcoreuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `capisso`.* TO 'efcoreuser'@'localhost';
```

## Run the Application
1. In the server directory, run `dotnet run`.
1. In the client directory, run `yarn` followed by `yarn start`

## Test the Application
1. In the server directory, run `dotnet test`.
1. In the client directory, run `yarn test`

## Creating Migrations
1. Modify Entity classes or database context
1. Run `dotnet ef migrations add <MigrationName>`  
OR in the Package Manager console: `PM> Add-Migration <MigrationName>`
1. Restart the server or manually apply the migration using: `dotnet ef database update`  
OR in the Package Manager console: `PM> Update-Database`

## Deploy the Application
1. See [here](./DEPLOYMENT.md) for instructions
