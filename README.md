# DOCKERSETUP INSTRUCTIONS
The following are the instructions for the docker setup.  What this will do is set up a Node.js web application with a MySQL database within a Docker container.

This was tested on  Ubuntu 16.04 in Digital Ocean.

## THE FOLLOWING IS A RESET PROCEDURE INCASE THE INSTALLATION FAILS USING DOCKER

What this procedure does is remove the image and containers that were created with your intial setup.

1. **Shutdown all running contianers**: "docker stop $(docker ps -q)"
2. **Remove all containers**: "sudo docker rm $(docker ps -a -q)", OR **Remove related containers only**: "sudo docker rm dockersetup\_mysql\_1 dockersetup\_web_1
3. **Remove all images**: "sudo docker rmi $(docker images -q)", OR **Remove related containers only**: "sudo docker rmi dockersetup"
4. **Remove all files within mysql\_storage**: "sudo rm -R *" (must be inside the mysql_storage folder)

## INITIAL START UP PROCEDURE USING DOCKER
All commands are in double quotes.  Do not include the double quotes

1. **Upload the files**: Upload all the files to a folder in your Digital Ocean or Ubuntu 16.04 vm with docker installed.
2. **Create the image**: "docker build -t nodesqlbuildv1.0 ." (you must include the "." at the end).  May get some notices and warnings that is fine.
3. **Create containers**: "docker-compose up -d" must be in folder where docker-compose.yml file is
4. **Get the instance id of the mysql instance**:  Enter "docker ps" then look for the one that has the image name of 'mysql'.
5. **"Get the IP address for MySQL instance"**: "docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' INSTANCE ID OR NAME".  You got the INSTANCE ID from the previous instruction.
6. **Change/check IP address**:  Change or check the ip address on the model/db.js file (NOTE: The IP address may already be the same, if so leave it.)
7. **Stop all docker containers**: "docker stop $(docker ps -q)"
8. **Reset Permissions on mysql\_storage files**: "sudo chmod -R 777 mysql_storage" (enter this code from the parent folder)
9. **Recreate containers**: "docker-compose up -d"
10. **Add sql file to create database and tables**:  "docker exec -i 'mysql instance name or id for mysql instance'  mysql -uroot -ppassword < sql/dockersetup.sql"  You will get a warning that reads  'mysql: [Warning] Using a password on the command line interface can be insecure.'  That is fine for our circumstance.
11. **Check Web Application**: Open a web browser, go to your ip address using port number 3500 (example: http://45.55.170.248:3500/), and click enter the website should be displayed.  If it does not work follow the reset procedure and try again.

## IF YOU DON'T WANT TO USE DOCKER
NOTE: This is a standard procedure that should work fine.  That being said I have not personally tested it as I recommend using Docker.

Assuming you are using a Unbuntu 16.04 vm and have Node and MySQL installed.

1. **Change the db.js file**:  Open the file located in "model/db.js" and change the database configuration to what you set up. 

2. **Upload the files**: Upload all the files to a folder in your Digital Ocean or Ubuntu 16.04 vm with node, npm and MySQL installed.  You can omit the "Dockerfile" and the "docker-compose.yml" files.

3. **Run npm install**: Go into the root directory of your application and enter "npm install" that will install all the required packages in your package.json file.

4. **Check Web Application**: Open a web browser, go to your ip address using port number 3500 (example: http://45.55.170.248:3500/), and click enter the website should be displayed.






