CREATE DATABASE polling_system;
USE polling_system;

CREATE TABLE IF NOT EXISTS poll (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    published_date INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS answer (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255) NOT NULL,
    poll_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vote (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    poll_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS voteAnswer (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    answer_id INTEGER NOT NULL,
    vote_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `polling_system`.`poll` (`title`, `type`, `published_date`) VALUES ('Is bitcoin worth the time and money that mining requires?', 'Single', '1516605447');
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Yes', 1);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('No', 1);

INSERT INTO `polling_system`.`poll` (`title`, `type`, `published_date`) VALUES ('Should chatbots replace humans in customer service jobs?', 'Single', '1516000647');
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Yes', 2);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('No', 2);

INSERT INTO `polling_system`.`poll` (`title`, `type`, `published_date`) VALUES ('How are we feeling about 2018?', 'Single', '1515568647');
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Hopeful', 3);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Doubtful', 3);

INSERT INTO `polling_system`.`poll` (`title`, `type`, `published_date`) VALUES ('Which country/region have you ever visited? (Select all that applies)', 'Multi', '1515482247');
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Hong Kong', 4);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('China', 4);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Australia', 4);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Thailand', 4);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Korea', 4);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Japan', 4);

INSERT INTO `polling_system`.`poll` (`title`, `type`, `published_date`) VALUES ('Will new benefits encourage you to study or work in mainland?', 'Single', '1515309447');
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('Yes', 5);
INSERT INTO `polling_system`.`answer` (`label`, `poll_id`) VALUES ('No', 5);

