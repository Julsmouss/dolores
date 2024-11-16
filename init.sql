CREATE DATABASE IF NOT EXISTS doloresapp_db;
CREATE USER IF NOT EXISTS 'nest'@'%' IDENTIFIED WITH mysql_native_password BY 'app';
GRANT ALL PRIVILEGES ON doloresapp_db.* TO 'nest'@'%';
FLUSH PRIVILEGES;