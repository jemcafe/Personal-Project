INSERT INTO Posts 
(title, text, image_url, date_posted, user_id)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;