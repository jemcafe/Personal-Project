INSERT INTO Posts 
(title, text, datePosted, userId, imageURL)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;