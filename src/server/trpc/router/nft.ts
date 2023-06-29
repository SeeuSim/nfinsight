const rankTableQuery = `
SELECT c.image, c.name, c.floor, c.address
FROM ranking as r
INNER JOIN collection as c
    ON r.collection = c.address
WHERE r.duration = ?
  AND r.rank = ?;
`;

const searchCollectionQuery = `
SELECT image, address, name, floor
FROM collection
WHERE to_tsvector('english', name) @@ to_tsquery('english', ?)
`

const describeCollectionQuery = `
SELECT *
FROM collection
WHERE address = ?
`
