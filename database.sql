-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (100) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE "brands" (
	"id" SERIAL PRIMARY KEY,
	"brand" VARCHAR(30) NOT NULL,
	"img_url" VARCHAR(255) NOT NULL
);

CREATE TABLE "types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR(30) NOT NULL
);

CREATE TABLE "locks" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users" ON DELETE CASCADE NOT NULL,
	"nickname" VARCHAR(50) NOT NULL,
	"brand_id" INT DEFAULT 13 REFERENCES "brands" ON DELETE SET DEFAULT,
	"type_id" INT DEFAULT 7 REFERENCES "types" ON DELETE SET DEFAULT,
	"num_pins" INT,
	"img_url" VARCHAR(255) NOT NULL DEFAULT 'no image',
	"notes" VARCHAR(255)
);

CREATE TABLE "pickings" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users" ON DELETE CASCADE NOT NULL,
	"lock_id" INT REFERENCES "locks" ON DELETE CASCADE NOT NULL,
	"success" BOOLEAN NOT NULL,
	"time_taken" INT,
	"date" DATE,
	"notes" VARCHAR(255)
);



--dummy data

--users to create in client
--sean / locksport
--joe / schmo
--jane / schmane

INSERT INTO "brands" ("brand", "img_url")
VALUES ('Abus', '../../images/Abus_Lock.jpg'), ('American', '../../images/American_Lock.jpg'), ('Brinks', '../../images/Brinks_Lock.jpg'), ('Commando', '../../images/Commando_Lock.jpg'), ('Kwikset', '../../images/Kwikset_Lock.jpg'), ('Master', '../../images/Master_Lock.jpg'), ('Sargent', '../../images/Sarget_Lock.jpg'), ('Schlage', '../../images/Schlage_Lock.jpg'), ('Tru-Bolt', '../../images/Tru-Bolt_Lock.jpg'), ('Weiser', '../../images/Weiser_Lock.jpg'), ('Yale', '../../images/Yale_Lock.jpg'), ('Other', '../../images/Other_Lock.jpg'), ('Unknown', '../../images/Other_Lock.jpg');

INSERT INTO "types" ("type")
VALUES ('Disc Detainer'), ('Lever'), ('Pin Cylinder'), ('Wafer'), ('Warded'), ('Other'), ('Unknown');

--dummy locks for user 1, admin
INSERT INTO "locks" ("user_id", "nickname", "brand_id", "type_id", "num_pins", "img_url", "notes")
VALUES
(1, 'Medium Speckled Padlock', 6, 3, 4, 'http', 'First challenging lock I picked, found at Home Depot'),
(1, 'Small Blue Padlock', 9, 3, 3, 'http', 'First lock I ever picked!'),
(1, '(solid) Gold Padlock', 9, 2, 4, 'http', 'My favorite looking lock'),
(1, 'Shiny Reddit Find', 2, 5, 5, 'http', 'Found on reddit, tricky security pins'),
(1, 'Practice Lock', 6, 3, 3, 'http', 'Good for showing people the beginnings of picking'),
(1, 'The Challenger', 8, 1, 6, 'http', 'The toughest lock I own - put this thing in the Pentagon');

INSERT INTO "locks" ("user_id", "nickname", "brand_id", "type_id", "num_pins", "notes")
VALUES
(1, 'Test for no img', 6, 3, 4, 'Test for no img notes');

--dummy locks for user 2, general user
INSERT INTO "locks" ("user_id", "nickname", "brand_id", "type_id", "num_pins", "img_url", "notes")
VALUES
(2, 'My First Lock', 1, 4, 3, 'http', 'Maybe starting with a wafer lock was a bad idea...'),
(2, 'Shed Padlock', 10, 2, 4, 'http', 'Maybe moving on to a lever lock was ill advised...'),
(2, 'Light Breeze', 6, 3, 2, 'http', 'More my speed, a light breeze could open this bad boy');

--dummy locks for user 3, general user
INSERT INTO "locks" ("user_id", "nickname", "brand_id", "type_id", "num_pins", "img_url", "notes")
VALUES
(3, 'LPLs Recommendation', 5, 4, 4, 'http', 'The master himself said this was a good starter lock'),
(3, 'Junkyard Find', 12, 6, 5, 'http', 'Who even knows what this is?');

--dummy pickings for user 1, admin
INSERT INTO "pickings" ("user_id", "lock_id", "success", "time_taken", "date", "notes")
VALUES
(1, 1, false, 300, '2021-01-13', 'Tried using small hook to single pin pick, got a couple pins I think'),
(1, 1, false, 300, '2021-01-14', 'Tried using small hook again then got frustrated and raked a bunch'),
(1, 1, true, 274, '2021-01-19', 'Got it!! Turns out taking a few days off pays off, I guess'),
(1, 1, true, 185, '2021-01-20', 'Piece of cake now that I got it once'),
(1, 2, true, 48, '2021-01-11', 'Always nice to start out with the easy one'),
(1, 2, true, 67, '2021-01-26', 'Literally can do this blind (had my eyes closed the whole time)'),
(1, 2, true, 17, '2021-02-05', 'World record raking seems like hehe'),
(1, 3, false, 300, '2021-01-04', 'Looks cooler than it is easy to pick'),
(1, 3, false, 300, '2021-01-08', 'Maybe this is just for decoration...'),
(1, 3, false, 300, '2021-01-26', 'Starting to wonder if this thing actually works, or if it works TOO well'),
(1, 3, false, 300, '2021-01-27', 'Maybe I can sell it.'),
(1, 4, false, 300, '2021-02-05', 'This security pin is a spooky one. I will get you next time'),
(1, 4, false, 300, '2021-02-06', 'I did not get it next time.'),
(1, 4, true, 184, '2021-02-10', 'AYYYY'),
(1, 5, true, 133, '2021-01-27', 'Showed Jon how lockpicking works - he was into it!'),
(1, 5, true, 44, '2021-01-28', 'Showed him just how fast you can pick once you get the hang of it'),
(1, 6, false, 300, '2021-02-10', 'Today is the day. You are going down, Mr. Schlage'),
(1, 6, false, 300, '2021-02-10', 'I am pretty sure I got 4 pins... It goes 4, 3, 6, 1 - I think...?'),
(1, 6, false, 300, '2021-02-10', 'Nope - 4, 5, 3, 6... Maybe?'),
(1, 6, false, 300, '2021-02-10', 'I swear the pins in this thing randomize every time I try it.'),
(1, 6, false, 300, '2021-02-10', 'I think I am gonna sleep on it at this point'),
(1, 6, false, 300, '2021-02-10', 'Need a new hobby.');

--dummy pickings for user 2, general user
INSERT INTO "pickings" ("user_id", "lock_id", "success", "time_taken", "date", "notes")
VALUES
(2, 7, false, 600, '2021-02-01', 'Is it supposed to be this hard?'),
(2, 7, false, 600, '2021-02-01', 'Oh. Apparently wafer locks are not exactly for beginners.'),
(2, 8, false, 600, '2021-02-04', 'Found a new lock, this should be better...  I hope'),
(2, 8, false, 600, '2021-02-05', 'Apparently lever locks are not for newbies either. Just my luck'),
(2, 8, false, 600, '2021-02-11', 'I am gonna crack this someday'),
(2, 9, false, 600, '2021-02-07', 'Did not quite get it but fairly certain this one is doable'),
(2, 9, true, 428, '2021-02-07', 'Got it!!! My first successful picking!'),
(2, 9, true, 298, '2021-02-08', 'Gets so much easier after the first time, wow'),
(2, 9, true, 185, '2021-02-10', 'I think I can go back to the tougher ones now!');


--dummy pickings for user 3, general user
INSERT INTO "pickings" ("user_id", "lock_id", "success", "time_taken", "date", "notes")
VALUES
(3, 10, false, 180, '2021-01-20', 'Followed along with LPLs video, this should be fun!'),
(3, 10, false, 180, '2021-01-21', 'Had The Good Place on in the background'),
(3, 10, false, 180, '2021-01-21', 'Watched Parks & Rec on this time, great show'),
(3, 10, false, 180, '2021-01-22', 'Tried The Sopranos, seems slow but good. Maybe I should focus on the lockpicking?'),
(3, 10, true, 87, '2021-01-22', 'Turns out I just had to pay attention to the actual picking'),
(3, 11, false, 180, '2021-02-01', 'Literally found this on the ground. Looks straight out of LotR, pins feel weird'),
(3, 11, false, 180, '2021-02-03', 'Something fell out of the cylinder? Seems shady, could not even tell if the pins were setting'),
(3, 11, false, 180, '2021-02-04', 'When I set one of the pins, a strange purple glow briefly enveloped the lock and I could hear a distant unearthly keening. Had The Office on in the background, love this show!');

--drop tables for postico testing
DROP TABLE "users";
DROP TABLE "locks", "pickings";
DROP TABLE "brands", "types";

--scratch data