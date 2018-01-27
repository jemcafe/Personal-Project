SELECT * FROM Users 
WHERE username = $1
LIMIT 1;