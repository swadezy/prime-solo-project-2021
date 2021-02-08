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
	"brand" VARCHAR(30) NOT NULL
);

CREATE TABLE "types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR(30) NOT NULL
);

CREATE TABLE "locks" (
	"id" SERIAL PRIMARY KEY,
	"nickname" VARCHAR(50) NOT NULL,
	"user_id" INT REFERENCES "users" NOT NULL,
	"brand_id" INT REFERENCES "brands",
	"type_id" INT REFERENCES "types",
	"num_pins" INT,
	"img_url" VARCHAR(255),
	"notes" VARCHAR(255)
);

CREATE TABLE "pickings" (
	"id" SERIAL PRIMARY KEY,
	"lock_id" INT REFERENCES "locks" NOT NULL,
	"success" BOOLEAN NOT NULL,
	"time_taken" INT,
	"date" DATE,
	"notes" VARCHAR(255)
);


--dummy data
INSERT INTO "brands" ("brand")
VALUES ('Master'), ('Schlage'), ('Medeco');

INSERT INTO "types" ("type")
VALUES ('pin-tumbler'), ('combination'), ('digital');

INSERT INTO "locks" ("nickname", "user_id", "brand_id", "type_id", "num_pins", "img_url", "notes")
VALUES ('lil minkus',1, 2, 1, 3, 'test url', 'testing notes'), ('big chungus',1, 3, 2, 5, 'test url 2', 'testing notes 2');

INSERT INTO "pickings" ("lock_id", "success", "time_taken", "date", "notes")
VALUES (1, true, 48, '2021-02-04', 'good picking'), (2, false, 90, '2021-02-08', 'failed');

SELECT "users".username, "locks".nickname FROM "pickings"
JOIN "locks" ON "pickings".lock_id = "locks".id
JOIN "brands" ON "locks".brand_id = "brands".id
JOIN "types" ON "locks".type_id = "types".id
JOIN "users" ON "locks".user_id = "users".id;


--drop tables for postico testing
DROP TABLE "users";
DROP TABLE "locks", "pickings";