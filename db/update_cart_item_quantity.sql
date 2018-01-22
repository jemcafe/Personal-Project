UPDATE Cart
SET quantity = $2
WHERE id = $1 AND customerId = $3
RETURNING *;