SELECT p.id, p.name, description, date_posted, price, poster_category_id, product_category_id, product_category, user_id, p.image_url, username FROM Posters p
JOIN ProductCategories pc ON p.product_category_id = pc.id
JOIN Users u ON p.user_id = u.id
WHERE user_id = $1
ORDER BY p.id DESC;