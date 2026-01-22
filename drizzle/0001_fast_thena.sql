CREATE TABLE `cartItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cartItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`namePt` varchar(255) NOT NULL,
	`descriptionEn` text,
	`descriptionPt` text,
	`parentId` int,
	`imageUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`isActive` boolean DEFAULT true,
	CONSTRAINT `newsletterSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSubscriptions_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`namePt` varchar(255) NOT NULL,
	`descriptionEn` text,
	`descriptionPt` text,
	`brand` varchar(100),
	`categoryId` int NOT NULL,
	`priceExclVat` decimal(10,2) NOT NULL,
	`priceInclVat` decimal(10,2) NOT NULL,
	`imageUrl` text,
	`imageUrls` text,
	`isNew` boolean DEFAULT false,
	`isBestSeller` boolean DEFAULT false,
	`inStock` boolean DEFAULT true,
	`stockQuantity` int DEFAULT 0,
	`specifications` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`namePt` varchar(255) NOT NULL,
	`role` varchar(255),
	`commentEn` text NOT NULL,
	`commentPt` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`avatarUrl` text,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
