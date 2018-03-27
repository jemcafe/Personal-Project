DELETE FROM Cart 
WHERE id = $1 AND customer_id = $2;