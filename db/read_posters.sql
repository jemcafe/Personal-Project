SELECT p.id, p.name, description, date_posted, price, PosterCategories.category, product_category_id, ProductCategories.product_category, user_id, username, p.image_url  FROM Posters p
JOIN PosterCategories ON p.poster_category_id = PosterCategories.id
JOIN ProductCategories ON p.product_category_id = ProductCategories.id
JOIN Users u ON p.user_id = u.id
ORDER BY p.id DESC;