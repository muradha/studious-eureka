# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers:

- Authorization : Token

Request Body:

```json
{
  "first_name": "Rizki",
  "last_name": "Adha",
  "email": "rizki@gmail.com",
  "phone": "3234424234"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Rizki",
    "last_name": "Adha",
    "email": "rizki@gmail.com",
    "phone": "3234424234"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint: PUT /api/contacts/:id

Headers:

- Authorization : Token

Request Body:

```json
{
  "first_name": "Rizki",
  "last_name": "Adha",
  "email": "rizki@gmail.com",
  "phone": "3234424234"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Rizki",
    "last_name": "Adha",
    "email": "rizki@gmail.com",
    "phone": "3234424234"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint: GET /api/contacts

Headers:

- Authorization : Token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "Rizki",
    "last_name": "Adha",
    "email": "rizki@gmail.com",
    "phone": "3234424234"
  }
}
```

Response Body Error:

```json
{
  "errors": "Contacts is not found"
}
```

## Search Contact API

Endpoint: GET /api/contacts

Headers:

- Authorization : Token

Query params:

- name : Search by first_name or last_name, using LIKE, optional
- email : Search by email using LIKE, optional
- phone : Search by phone using LIKE, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Rizki",
      "last_name": "Adha",
      "email": "rizki@gmail.com",
      "phone": "3234424234"
    },
    {
      "id": 2,
      "first_name": "Rizki",
      "last_name": "Adha",
      "email": "rizki@gmail.com",
      "phone": "3234424234"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_items": 30
  }
}
```

Response Body Error:

```json
{
  "errors": "Contacts is not found"
}
```

## Remove Contact API

Endpoint: DELETE /api/contacts/:id

Headers:

- Authorization : Token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
  "errors": "Unauthorized"
}
```
