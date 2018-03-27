INSERT INTO Cart
(product_id, name, price, product_category_id, quantity, image_url, customer_id)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING *;