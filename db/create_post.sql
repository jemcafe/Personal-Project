INSERT INTO Posts 
(title, text, imageURL, datePosted, userId)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;