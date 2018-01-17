SELECT * FROM Users 
WHERE username = $1 AND password = $2 
LIMIT 1;