# DOCKERSETUP INSTRUCTIONS
The following are the instructions for the docker setup.  What this will do is set up a Node.js web application with a MySQL database within a Docker container.

## THE FOLLOWING IS A RESET PROCEDURE INCASE THE INSTALLATION FAILS
The following is assumed you are on a Ubuntu 16.04 or greater OS on Digital Ocean

1. **Shutdown all running contianers**: "docker stop $(docker ps -q)"
1. **Remove all containers**: "sudo docker rm $(docker ps -a -q)"
2. **Remove all images**: "sudo docker rmi $(docker images -q)"
3. **Remove all files within mysql\_storage**: "sudo rm -R *" (must be inside the mysql_storage folder)

## INTIAL START UP PROCEDURE
All commands are in double quotes.  Do not include the double quotes

1. **Create the image**: "docker build -t nodesqlbuildv1.0 ." (you must include the "." at the end).  May get some notices and warnings that is fine.
2. **Create containers**: "docker-compose up -d" must be in folder where docker-compose.yml file is
3. **Get the instance id of the mysql instance**:  Enter "docker ps" then look for the one that has the image name of 'mysql'.
4. **"Get the IP address for MySQL instance"**: "docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' INSTANCE ID OR NAME".  You got the INSTANCE ID from the previous instruction.
5. **Change/check IP address**:  Change or check the ip address on the model/db.js file (NOTE: The IP address may already be the same, if so leave it.)
6. **Stop all docker containers**: "docker stop $(docker ps -q)"
7. **Reset Permissions on mysql\_storage files**: "sudo chmod -R 777 mysql_storage" (enter this code from the parent folder)
8. **Recreate containers**: "docker-compose up -d"
9. **Add sql file to create database and tables**:  "docker exec -i 'mysql instance name or id for mysql instance'  mysql -uroot -ppassword < sql/dockersetup.sql"  You will get a warning that reads  'mysql: [Warning] Using a password on the command line interface can be insecure.'  That is fine for our circumstance.
10. **Check web page**.

