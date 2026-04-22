import { test, expect } from './fixtures';
import type { Order } from './types';

test.describe('Store endpoints', () => {

  test('GET /store/inventory — returns status-to-count map', async ({ request }) => {
    const response = await request.get('store/inventory');

    expect(response).toBeOK();

    const body = await response.json();
    // Response is a dynamic map of { [status: string]: number }
    // Can't assert exact values on a shared public server, so assert shape only
    expect(typeof body).toBe('object');
    Object.values(body).forEach(val => {
      expect(typeof val).toBe('number');
    });
  });

  test('POST /store/order — places an order for a pet', async ({ request, createdPet }) => {
    const response = await request.post('store/order', {
      data: {
        petId: createdPet.id!,
        quantity: 1,
        status: 'placed',
        complete: false,
      } satisfies Order,
    });

    expect(response.status()).toBe(200);

    const order = await response.json() as Order;
    expect(order.id).toBeDefined();
    expect(order.petId).toBe(createdPet.id);
    expect(order.status).toBe('placed');
    expect(order.complete).toBe(false);
  });

  test('GET /store/order/{id} — retrieves a placed order', async ({ request, createdPet }) => {
    // Create an order to retrieve
    const createRes = await request.post('store/order', {
      data: {
        petId: createdPet.id!,
        quantity: 1,
        status: 'placed',
        complete: false,
      },
    });
    const created = await createRes.json() as Order;

    const getRes = await request.get(`store/order/${created.id}`);
    expect(getRes).toBeOK();

    const order = await getRes.json() as Order;
    expect(order.id).toBe(created.id);
    expect(order.petId).toBe(createdPet.id);
  });

  test('DELETE /store/order/{id} — deletes an order', async ({ request, createdPet }) => {
    const createRes = await request.post('store/order', {
      data: { petId: createdPet.id!, quantity: 1, status: 'placed', complete: false },
    });
    const created = await createRes.json() as Order;

    const deleteRes = await request.delete(`store/order/${created.id}`);
    expect(deleteRes.status()).toBe(200);
  });

});
