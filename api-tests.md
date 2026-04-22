# API Tests

## Tools / Frameworks

- **Playwright Test** (`@playwright/test`) — same framework as the UI suite; API calls use the built-in `request` fixture (no browser required)
- **TypeScript** — shared `types.ts` defines `Pet`, `Order`, `User`, and `ApiResponse` interfaces
- Target: [Swagger Petstore v2](https://petstore.swagger.io/#/) (`https://petstore.swagger.io/v2`)

---

## How to run

```bash
# All API tests only
npx playwright test --project=api

# All tests (UI + API)
npx playwright test

# View HTML report
npx playwright show-report
```

---

## What's covered

### Pet endpoints (`tests/api/pet.spec.ts`)

| Endpoint | Test | What it asserts |
|---|---|---|
| `POST /pet` | Add new pet — success | 200, body contains `id`, `name`, `status` |
| `POST /pet` | Add pet — invalid body | 4xx response |
| `GET /pet/{petId}` | Get by id — success | 200, correct `id` and `name` returned |
| `GET /pet/{petId}` | Get by id — not found | 404 |
| `PUT /pet` | Update name + status | 200, updated fields reflected in response |
| `GET /pet/findByStatus` | Status = available | 200, array returned, each item carries correct status |
| `GET /pet/findByStatus` | Status = pending | 200, array returned |
| `GET /pet/findByStatus` | Invalid status | 400 |
| `DELETE /pet/{petId}` | Delete + confirm gone | 200 on delete, 404 on re-fetch |
| `DELETE /pet/{petId}` | Delete non-existent | 404 |

### Store endpoints (`tests/api/store.spec.ts`)

| Endpoint | Test | What it asserts |
|---|---|---|
| `GET /store/inventory` | Fetch inventory | 200, object with numeric values per status key |
| `POST /store/order` | Place order — success | 200, body contains `id`, `petId`, `status` |
| `GET /store/order/{orderId}` | Get order by id | 200, correct `id` and `petId` |
| `GET /store/order/{orderId}` | Get order — not found | 404 |
| `DELETE /store/order/{orderId}` | Delete + confirm gone | 200 on delete, 404 on re-fetch |

---

## Decisions / notes

- **Scope**: P1 coverage only — CRUD happy paths plus the most common error case (404 / 400) for each resource. Auth-gated User endpoints are out of scope for this phase.
- **Test isolation**: Each test that reads or deletes data first creates its own pet/order, so tests are independent and order-agnostic.
- **findByStatus validation**: Only the first 10 results are spot-checked to keep runtime reasonable on a live shared API.
- **Petstore reliability**: The public Petstore is a shared sandbox — IDs can be clobbered by other callers. Tests use unique names and fresh IDs per run rather than fixed seeds.
