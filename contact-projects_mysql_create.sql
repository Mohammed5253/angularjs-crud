CREATE TABLE `user` (
	`ID` int NOT NULL,
	`firstname` varchar(20) NOT NULL,
	`lastname` varchar(20) NOT NULL,
	`email` varchar(40) NOT NULL,
	`password` varchar(40) NOT NULL,
	`phone` int(10) NOT NULL,
	`is_admin` enum NOT NULL,
	`date_time` TIMESTAMP NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `contacts` (
	`ID` int NOT NULL,
	`firstname` varchar(20) NOT NULL,
	`lastname` varchar(20) NOT NULL,
	`email` varchar(20) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`address1` varchar(20) NOT NULL,
	`address2` varchar(20) NOT NULL,
	`city` INT(20) NOT NULL,
	`pin_code` int NOT NULL,
	`country` int NOT NULL,
	`longitude` int NOT NULL,
	`latitude` int NOT NULL,
	`company` varchar(20) NOT NULL,
	`source` varchar(20) NOT NULL,
	`created_by` int NOT NULL,
	`date_time` TIMESTAMP NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `tags` (
	`ID` int NOT NULL,
	`name` varchar(20) NOT NULL,
	`created_by` int NOT NULL,
	`date_time` TIMESTAMP NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `contact_tag` (
	`ID` int NOT NULL,
	`tag_id` int NOT NULL,
	`contact_id` int NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `popular_tags` (
	`ID` int NOT NULL,
	`user_id` int NOT NULL AUTO_INCREMENT,
	`tag_id` int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `contacts` ADD CONSTRAINT `contacts_fk0` FOREIGN KEY (`created_by`) REFERENCES `user`(`ID`);

ALTER TABLE `tags` ADD CONSTRAINT `tags_fk0` FOREIGN KEY (`date_time`) REFERENCES `user`(`ID`);

ALTER TABLE `contact_tag` ADD CONSTRAINT `contact_tag_fk0` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`ID`);

ALTER TABLE `contact_tag` ADD CONSTRAINT `contact_tag_fk1` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`ID`);

ALTER TABLE `popular_tags` ADD CONSTRAINT `popular_tags_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`ID`);

ALTER TABLE `popular_tags` ADD CONSTRAINT `popular_tags_fk1` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`ID`);

