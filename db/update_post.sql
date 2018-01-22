UPDATE Posts 
SET title = $2, text = $3, imageURL = $5
WHERE id = $1 AND userId = $4
RETURNING *;