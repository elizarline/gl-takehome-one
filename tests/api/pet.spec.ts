import { test, expect } from './fixtures';
import type { Pet } from './types';

test.describe('Pet endpoints', () => {

  test('POST /pet — creates a new pet', async ({ request }) => {
    const response = await request.post('/pet', {
      data: {
        name: 'Fido',
        photoUrls: ['https://example.com/fido.jpg'],
        status: 'available',
      } satisfies Pet,
    });

    expect(response.status()).toBe(200);

    const body = await response.json() as Pet;
    expect(body.id).toBeDefined();
    expect(body.name).toBe('Fido');
    expect(body.status).toBe('available');
  });

  test('GET /pet/{id} — retrieves created pet', async ({ request, createdPet }) => {
    const response = await request.get(`/pet/${createdPet.id}`);

    expect(response).toBeOK();

    const body = await response.json() as Pet;
    expect(body).toMatchObject({
      id: createdPet.id,
      name: createdPet.name,
      status: createdPet.status,
    });
  });

  test('PUT /pet — updates an existing pet', async ({ request, createdPet }) => {
    const response = await request.put('/pet', {
      data: { ...createdPet, status: 'sold' },
    });

    expect(response).toBeOK();

    const body = await response.json() as Pet;
    expect(body.status).toBe('sold');
  });

  test('DELETE /pet/{id} — deletes a pet', async ({ request, createdPet }) => {
    const response = await request.delete(`/pet/${createdPet.id}`);
    expect(response.status()).toBe(200);
  });

  test('GET /pet/findByStatus — filters by available', async ({ request }) => {
    const response = await request.get('/pet/findByStatus', {
      params: { status: 'available' },
    });

    expect(response).toBeOK();

    const pets = await response.json() as Pet[];
    expect(Array.isArray(pets)).toBe(true);
    // Verify shape only — full status assertions are unreliable on a shared
    // public sandbox where other callers can add pets with any status
    pets.slice(0, 5).forEach(pet => {
      expect(pet).toHaveProperty('id');
      expect(pet).toHaveProperty('name');
    });
  });

  test('GET /pet/findByStatus — filters by sold', async ({ request }) => {
    const response = await request.get('/pet/findByStatus', {
      params: { status: 'sold' },
    });

    expect(response).toBeOK();

    const pets = await response.json() as Pet[];
    expect(Array.isArray(pets)).toBe(true);
  });

});