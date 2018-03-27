INSERT INTO Follows
(user_id, follower_id)
VALUES
($1, $2)
RETURNING *;