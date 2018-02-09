INSERT INTO Follows
(userId, followerId)
VALUES
($1, $2)
RETURNING *;