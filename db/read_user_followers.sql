SELECT user_id, follower_id, username, avatar, profile_url FROM Follows f
JOIN Users u ON f.follower_id = u.id
WHERE user_id = $1
ORDER BY f.id DESC;