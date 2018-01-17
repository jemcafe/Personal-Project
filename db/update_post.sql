UPDATE Posts 
SET title = $2, text = $3, imageURL = $4
WHERE id = $1 AND userId = $5;