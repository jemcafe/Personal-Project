SELECT p.id, p.name, p.image_url, description, date_posted, price, PosterCategories.category, product_category_id, ProductCategories.product_category, likes, user_id, username FROM Posters p
JOIN PosterCategories ON p.poster_category_id = PosterCategories.id
JOIN ProductCategories ON p.product_category_id = ProductCategories.id
JOIN Users u ON p.user_id = u.id
ORDER BY p.id DESC
LIMIT $1 OFFSET $2;