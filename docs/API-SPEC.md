Base URL (development): `http://localhost:3000/api/v1`
Format: JSON. Authentication: `Authorization: Bearer <token>`.

## Required endpoints

| Method | Endpoint | Purpose | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | /api/v1/health | Checks that the API is running | 200 OK | none |
| POST | /api/v1/sessions | Logs in (creates a session) | 200 OK | 400, 401 |
| GET | /api/v1/users/me | Returns the logged-in user (needs token) | 200 OK | 401 |

### GET /api/v1/health

200 OK

```json
{ "status": "ok" }
```

### POST /api/v1/sessions

Request body:

```json
{ "email": "student@campusconnect.test", "password": "Campus26" }
```

200 OK:

```json
{
  "token": "<token text>",
  "user": { "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" }
}
```

400 Bad Request (email or password missing or badly formed):

```json
{ "error": "Email and password are required." }
```

401 (wrong password or unknown email, same message for both):

```json
{ "error": "Invalid email or password." }
```

### GET /api/v1/users/me

Header: `Authorization: Bearer <token>`

200 OK:

```json
{ "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" }
```

401 (token missing, wrong, or expired):

```json
{ "error": "Not logged in." }
```

### Other responses

| Situation | Status | Body |
| --- | --- | --- |
| Unknown address | 404 | `{ "error": "Not found." }` |
| Unexpected server error | 500 | `{ "error": "Something went wrong." }` |

## Events (design only, not built)

| Method | Endpoint | Purpose | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | /api/v1/events | List all events | 200 OK | |
| GET | /api/v1/events?month=11 | List events in November | 200 OK | 400 |
| GET | /api/v1/events/12 | Get one event | 200 OK | 404 |
| POST | /api/v1/events | Add an event | 201 Created | 400, 401 |
| PATCH | /api/v1/events/12 | Change some fields of event 12 | 200 OK | 400, 401, 404 |
| DELETE | /api/v1/events/12 | Remove event 12 | 204 No Content | 401, 404 |
