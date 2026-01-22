CREATE TABLE `productReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`userId` int NOT NULL,
	`rating` int NOT NULL,
	`title` varchar(255),
	`comment` text NOT NULL,
	`isVerifiedPurchase` boolean DEFAULT false,
	`helpfulCount` int DEFAULT 0,
	`isApproved` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `productReviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviewImages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reviewId` int NOT NULL,
	`imageUrl` text NOT NULL,
	`imageKey` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviewImages_id` PRIMARY KEY(`id`)
);
