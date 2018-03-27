SELECT follower_id, user_id, username, avatar, profile_url FROM Follows f
JOIN Users u ON f.user_id = u.id
WHERE follower_id = $1
ORDER BY f.id DESC;