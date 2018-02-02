INSERT INTO Posts 
(title, text, datePosted, userId, imageUrl)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;