SELECT * FROM Posts
WHERE id = $1 AND userId = $2
LIMIT 1;