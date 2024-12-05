# To start the backend

```bash
node index.js
```

# To put a user (update)
```bash
curl -X PUT http://localhost:3000/users/user10 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Alice Smith",
    "email": "alice.smith@example.com",
    "password": "Al1ceS!2024",
    "historico": ["historico_1", "historico_2"]
  }'

```

# To get all users
```bash
curl http://localhost:3000/users
```

# To get a user
```bash
curl http://localhost:3000/users/user1
```

# To add a user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "user6",
    "nome": "Frank Moore",
    "email": "frank.moore@example.com",
    "password": "Fr@nkM2024",
    "historico": ["historico_16", "historico_17"]
  }'
```

# To remove a user
```bash
curl -X DELETE http://localhost:3000/users/user6
```