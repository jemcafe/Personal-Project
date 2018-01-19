DROP TABLE IF EXISTS GamePlatforms;
DROP TABLE IF EXISTS BookSubjects;
DROP TABLE IF EXISTS PosterCategories;
-- DROP TABLE IF EXISTS Posters;
-- DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Posts;
-- DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    auth_id TEXT,
    name TEXT,
    imageURL TEXT
);
INSERT INTO Users (username, password, auth_id, name, imageURL) VALUES
('a', 'b', null, 'A', null);


CREATE TABLE GamePlatforms (
    id SERIAL PRIMARY KEY,
    gbId INTEGER,
    platform TEXT
);
INSERT INTO GamePlatforms (gbId, platform) VALUES
(117, 'Nintendo 3Ds'),
(157, 'Nintendo Switch'),
(94,  'PC'),
(22,  'Playstation'),
(19,  'Playstation 2'),
(35,  'Playstation 3'),
(146, 'Playstation 4'),
(129, 'Playstation Vita'),
(36,  'Wii'),
(139, 'Wii U'),
(32,  'Xbox'),
(20,  'Xbox 360'),
(145,  'Xbox One');


CREATE TABLE BookSubjects (
    id SERIAL PRIMARY KEY,
    subject TEXT
);
INSERT INTO BookSubjects (subject) VALUES
('Art'),
('Anthropomorphism'),
('Biography & Autobiography'),
('Body, Mind & Spirit'),
('Business & Economics'),
('Botany'),
('British'),
('Computers'),
('Cosmic physics'),
('Education'),
('Family & Relationships'),
('Fiction'),
('Foreign Language Study'),
('Gardening'),
('History'),
('Inventions'),
('Juvenile Nonfiction'),
('Language Arts & Disciplines'),
('Law'),
('Literary Criticism'),
('Love'),
('Mathematics'),
('Medical'),
('Nature'),
('Philosophy'),
('Political Science'),
('Religion'),
('Science'),
('Social Science'),
('Technology & Engineering'),
('Young Adult Fiction');


CREATE TABLE PosterCategories (
    id SERIAL PRIMARY KEY,
    category TEXT
);
INSERT INTO PosterCategories (category) VALUES
('Digital Art'),
('Traditional Art'),
('Photography');


-- CREATE TABLE Posters (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     imageURL TEXT,
--     description TEXT,
--     categoryId INTEGER REFERENCES PosterCategories (id),
--     price DECIMAL,
--     datePosted TEXT,
--     userId INTEGER REFERENCES Users (id)
-- );

-- CREATE TABLE Games (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     imageURL TEXT,
--     description TEXT,
--     platformId INTEGER REFERENCES GamePlatforms (id),
--     price DECIMAL,
--     releaseDate TEXT,
--     userId INTEGER REFERENCES Users (id)
-- );

-- CREATE TABLE Books (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     imageURL TEXT,
--     description TEXT,
--     subjectId INTEGER REFERENCES BookSubjects (id),
--     price DECIMAL,
--     publishedDate TEXT,
--     userId INTEGER REFERENCES Users (id)
-- );

-- CREATE TABLE Cart (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     price DECIMAL,
--     imageURL TEXT,
--     quantity INTEGER,
--     userId INTEGER REFERENCES Users (id)
-- );

CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    imageURL TEXT,
    datePosted TEXT,
    userId INTEGER REFERENCES Users (id)
);

-- CREATE TABLE Comments (
--     id SERIAL PRIMARY KEY,
--     text TEXT,
--     datePosted TEXT,
--     postId INTEGER REFERENCES Posts (id),
--     userId INTEGER REFERENCES Users (id)
-- );