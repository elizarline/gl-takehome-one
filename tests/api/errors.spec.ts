import { test, expect } from './fixtures';

test.describe('Error cases', () => {

  test('GET /pet/{id} — 404 for non-existent pet', async ({ request }) => {
    const response = await request.get('/pet/999999999');
    expect(response.status()).toBe(404);
  });

  test('GET /store/order/{id} — error for ID above 1000', async ({ request }) => {
    // Petstore spec documents: IDs > 1000 deliberately trigger server errors
    const response = await request.get('/store/order/1001');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('GET /pet/findByStatus — invalid status value does not 5xx', async ({ request }) => {
    const response = await request.get('/pet/findByStatus', {
      params: { status: 'not-a-valid-status' },
    });
    // Should return an empty array or 400, never a 500
    expect(response.status()).toBeLessThan(500);
  });

  // POST /pet input validation is not tested: the Petstore demo API does not
  // enforce schema constraints and returns 200 for incomplete payloads.

  test('DELETE /pet/{id} — 404 when deleting an already-deleted pet', async ({ request, createdPet }) => {
    // First delete — should succeed (fixture teardown will also attempt this,
    // but we handle the 404 gracefully there)
    await request.delete(`/pet/${createdPet.id}`);

    // Second delete — should 404
    const second = await request.delete(`/pet/${createdPet.id}`);
    expect(second.status()).toBe(404);
  });

  test('GET /store/order/{id} — 404 for non-existent order', async ({ request }) => {
    const response = await request.get('/store/order/0');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

});