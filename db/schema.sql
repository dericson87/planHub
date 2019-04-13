DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;

--USE users_db

-- CREATE TABLE `Rewards` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `item` varchar(255) DEFAULT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   `UserUuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
--   PRIMARY KEY (`id`),
--   KEY `UserUuid` (`UserUuid`),
--   CONSTRAINT `rewards_ibfk_1` FOREIGN KEY (`UserUuid`) REFERENCES `users` (`uuid`) ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- CREATE TABLE `ToDos` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `task` varchar(255) NOT NULL,
--   `completed` tinyint(1) DEFAULT '0',
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   `ownerUuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
--   `UserUuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `ownerUuid` (`ownerUuid`),
--   KEY `UserUuid` (`UserUuid`),
--   CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`ownerUuid`) REFERENCES `users` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE,
--   CONSTRAINT `todos_ibfk_2` FOREIGN KEY (`UserUuid`) REFERENCES `users` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- CREATE TABLE `Users` (
--   `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
--   `username` varchar(255) NOT NULL,
--   `email` varchar(255) NOT NULL,
--   `password` varchar(255) DEFAULT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   PRIMARY KEY (`uuid`),
--   UNIQUE KEY `username` (`username`),
--   UNIQUE KEY `email` (`email`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


