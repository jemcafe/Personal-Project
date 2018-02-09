DELETE FROM Follows
WHERE userId = $1 AND followerId = $2;