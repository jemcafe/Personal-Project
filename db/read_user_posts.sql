SELECT p.id, p.title, p.text, p.image_url, p.date_posted, u.username FROM Posts p
JOIN Users u ON p.user_id = u.id
WHERE user_id = $1 
ORDER BY p.id DESC;