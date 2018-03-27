UPDATE Cart
SET quantity = $2
WHERE id = $1 AND customer_id = $3
RETURNING *;