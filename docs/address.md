# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers:

- Authorization : Token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Country apa",
  "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Country apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error:

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint: PUT /api/contacts/:contactId/addresses/:addressId

Headers:

- Authorization : Token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Country apa",
  "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Country apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error:

```json
{
  "errors": "Country is required"
}
```

## Get Adress API

Endpoint: GET /api/contacts/:contactId/addresses/:addressId

Headers:

- Authorization : Token

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Country apa",
      "postal_code": "Kode pos"
    },
    {
      "id": 2,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Country apa",
      "postal_code": "Kode pos"
    }
  ]
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## List Adresses API

Endpoint: GET /api/contacts/:contactId/addresses

Headers:

- Authorization : Token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Country apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint: DELETE /api/contacts/:contactId/addresses/:addressId

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
  "errors": "Address is not found"
}
```
