# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body: 

```json
{
    "username" : "rizki",
    "password": "rahasia",
    "name": "Rizki Adha"
}
```

Response Body Success:

```json
{
    "data": {
        "username": "rizki",
        "name": "Rizki Adha"
    }
}
```

Response Body Error:
```json
{
    "errors": "Username already taken"
}
```

## Login User API

Endpoint: POST /api/users/login

Request Body: 
```json
{
    "username": "rizki",
    "password": "rahasia"
}
```
Response Body Success:
```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error:
```json
{
    "errors": "Username or password wrong"
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers:
- Authorization : Token

Request Body: 
```json
{
    "name": "rizki", //optional
    "password": "new password" //optional 
}
```
Response Body Success:
```json
{
    "data": {
        "name": "rizki",
        "name": "rizki adha lagi"
    }
}
```

Response Body Error:
```json
{
    "errors": "Name length max 100"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers:
- Authorization : Token

Response Body Success:
```json
{
    "data": {
        "name": "rizki",
        "name": "rizki adha"
    }
}
```

Response Body Error:
```json
{
    "errors": "Unauthorized"
}
```


## Logout User API

Endpoint : DELETE /api/users/logout

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
