SELECT pc.id, pc.text, pc.date_posted, pc.post_id, pc.user_id, u.avatar, u.username FROM PostComments pc
JOIN Users u ON pc.user_id = u.id
WHERE post_id = $1
ORDER BY pc.id ASC;