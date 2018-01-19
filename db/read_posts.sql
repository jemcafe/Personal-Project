SELECT Posts.id, Posts.title, Posts.text, Posts.imageUrl, Posts.datePosted, username FROM Posts
JOIN Users ON Posts.userId = Users.id
WHERE userId = $1 
ORDER BY Posts.id DESC;