UPDATE Posts 
SET title = $3, text = $4, imageURL = $5
WHERE id = $1 AND userId = $2;