INSERT INTO Cart
(productId, name, price, productCategoryId, quantity, customerId, imageURL)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING *;