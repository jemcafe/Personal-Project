SELECT * FROM Posters
WHERE id = $1 AND userId = $2
LIMIT 1;