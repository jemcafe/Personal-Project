CREATE TABLE Users (
    id SERIAL,
    username VARCHAR UNIQUE,
    password VARCHAR,
    auth_id TEXT,
    pictureURL TEXT,
    email TEXT,
    name TEXT
);
INSERT INTO Users (username, password, auth_id, pictureURL, email, name)
VALUES
('a', 'b', null, null, email@email.com, 'A')


CREATE TABLE GamePlatforms (
    id SERIAL,
    gbId INTEGER,
    platform TEXT,
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
    id SERIAL,
    subject TEXT,
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
('Comics & Graphic Novels'),
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
    id SERIAL,
    category TEXT,
);
INSERT INTO PosterCategories (category) VALUES
('Digital Art'),
('Traditional Art'),
('Photography');


CREATE TABLE Posters (
    id SERIAL,
    name TEXT,
    imageURL TEXT,
    description TEXT,
    categoryId INTEGER REFERENCES poster_categories (id),
    price DECIMAL,
    userId INTEGER REFERENCES users (id)
);

CREATE TABLE Posts (
    id SERIAL,
    title TEXT,
    text TEXT,
    imageURL TEXT,
    datePosted TEXT,
    userId INTEGER REFERENCES users (id)
);

CREATE TABLE Comments (
    id SERIAL,
    text TEXT,
    datePosted TEXT,
    postId INTEGER REFERENCES posts (id),
    userId INTEGER REFERENCES users (id)
)

CREATE TABLE Cart (
    id SERIAL,
    userId INTEGER REFERENCES users (id)
)