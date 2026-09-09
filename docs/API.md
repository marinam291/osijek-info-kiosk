# API Documentation

## Base URL

When running locally with Docker Compose:

```text
http://localhost:5000
```

## Endpoints

### GET /

Returns a simple welcome message.

Example response:

```json
"Info Kiosk Server sa Sequelize-om je spreman!"
```

---

### GET /api/health

Checks whether the server is running.

Example response:

```json
{
  "status": "online",
  "timestamp": "2026-09-09T12:00:00.000Z"
}
```

---

### GET /api/items

Returns all content items from the database along with related models such as galleries and public transport lines with departures.

Example response structure:

```json
[
  {
    "id": 1,
    "categoryKey": "turizam",
    "subCategory": "znamenitosti",
    "nazivHr": "Tvrđa",
    "nazivEn": "Fortress",
    "opisHr": "Opis na hrvatskom",
    "opisEn": "Description in English",
    "ItemGalleries": [
      {
        "imagePath": "/images/sample.jpg"
      }
    ],
    "GppLines": [
      {
        "id": "1",
        "naziv": "Mali grad",
        "vrsta": "linija",
        "GppDepartures": [
          {
            "departureTime": "08:15"
          }
        ]
      }
    ]
  }
]
```

Status codes:

- `200 OK`
- `500 Internal Server Error`

---

### GET /api/locations

Returns all map locations stored in the database.

Example response:

```json
[
  {
    "id": 1,
    "name": "Trg Europskih prvaka",
    "lat": 45.554,
    "lng": 18.695
  }
]
```

Status codes:

- `200 OK`
- `500 Internal Server Error`

---

### POST /api/send-email

Sends a message submitted from the kiosk contact form.

Request body:

```json
{
  "lang": "hr",
  "isAnonymous": false,
  "senderName": "Ana Anić",
  "senderEmail": "ana@example.com",
  "messageBody": "Poštovani, želim postaviti pitanje..."
}
```

Validation:

- `lang` may be `hr` or `en`
- `senderName` is required when `isAnonymous` is false
- `senderEmail` must be valid if not anonymous
- `messageBody` must not be empty

Example success response:

```json
{
  "message": "Mail uspješno poslan!"
}
```

Example validation error response:

```json
{
  "error": "Poruka je obavezna."
}
```

Example rate-limit response:

```json
{
  "error": "Previše poslanih poruka s ovog uređaja. Molimo pokušajte ponovno kasnije."
}
```

Status codes:

- `200 OK`
- `400 Bad Request`
- `429 Too Many Requests`
- `500 Internal Server Error`

---

## Notes

- Email delivery uses Nodemailer with Gmail SMTP configuration.
- The route is protected by a 15-minute rate limiter allowing only a small number of submissions per device.
- Input validation is enforced using Zod schemas.
