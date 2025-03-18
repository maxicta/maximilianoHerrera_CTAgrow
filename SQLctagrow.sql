-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ctagrow
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ctagrow
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ctagrow` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ctagrow` ;

-- -----------------------------------------------------
-- Table `ctagrow`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`rols` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ctagrow`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `surname` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `validate` TINYINT(1) NULL DEFAULT NULL,
  `lock` TINYINT(1) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `rolId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `rolId` (`rolId` ASC) VISIBLE,
  CONSTRAINT `users_ibfk_1`
    FOREIGN KEY (`rolId`)
    REFERENCES `ctagrow`.`rols` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ctagrow`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `province` INT NULL DEFAULT NULL,
  `city` INT NULL DEFAULT NULL,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `height` INT NULL DEFAULT NULL,
  `userId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `addresses_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `ctagrow`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ctagrow`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ctagrow`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ctagrow`.`ordershops`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`ordershops` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` INT NULL DEFAULT NULL,
  `userId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `ordershops_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `ctagrow`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ctagrow`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `price` DECIMAL(10,0) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `stock` INT NULL DEFAULT NULL,
  `categorieId` INT NULL DEFAULT NULL,
  `brandId` INT NULL DEFAULT NULL,
  `ordershopId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `categorieId` (`categorieId` ASC) VISIBLE,
  INDEX `brandId` (`brandId` ASC) VISIBLE,
  INDEX `ordershopId` (`ordershopId` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`categorieId`)
    REFERENCES `ctagrow`.`categories` (`id`),
  CONSTRAINT `products_ibfk_2`
    FOREIGN KEY (`brandId`)
    REFERENCES `ctagrow`.`brands` (`id`),
  CONSTRAINT `products_ibfk_3`
    FOREIGN KEY (`ordershopId`)
    REFERENCES `ctagrow`.`ordershops` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ctagrow`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`sequelizemeta` (
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ctagrow`.`shopcars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ctagrow`.`shopcars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL DEFAULT NULL,
  `ordershopId` INT NULL DEFAULT NULL,
  `productId` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ordershopId` (`ordershopId` ASC) VISIBLE,
  INDEX `productId` (`productId` ASC) VISIBLE,
  CONSTRAINT `shopcars_ibfk_1`
    FOREIGN KEY (`ordershopId`)
    REFERENCES `ctagrow`.`ordershops` (`id`),
  CONSTRAINT `shopcars_ibfk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `ctagrow`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
