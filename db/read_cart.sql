SELECT c.id, product_id, c.name, price, product_category_id, product_category, quantity, customer_id, c.image_url FROM Cart c
JOIN ProductCategories pc ON c.product_category_id = pc.id
JOIN Users u ON c.customer_id = u.id
WHERE customer_id = $1
ORDER BY c.id;