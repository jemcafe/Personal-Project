DELETE FROM Follows
WHERE user_id = $1 AND follower_id = $2;