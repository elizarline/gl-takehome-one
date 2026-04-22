import { test as base } from '@playwright/test';
import type { Pet } from './types';

type ApiFixtures = {
  createdPet: Pet;
};

/**
 * Extends the base Playwright test with a `createdPet` fixture.
 * Creates a pet before each test and deletes it after — even on failure.
 * Import `test` and `expect` from this file instead of @playwright/test
 * in any spec that needs a pre-existing pet.
 */
export const test = base.extend<ApiFixtures>({
  createdPet: async ({ request }, use) => {
    const response = await request.post('pet', {
      data: {
        name: 'Fixture Pet',
        photoUrls: ['https://example.com/pet.jpg'],
        status: 'available',
      } satisfies Pet,
    });

    if (!response.ok()) {
      throw new Error(`Fixture setup failed: POST pet returned ${response.status()} — ${await response.text()}`);
    }

    const pet = await response.json() as Pet;

    await use(pet);

    // Teardown — best effort; 404 means the test already deleted the pet
    const deleteRes = await request.delete(`pet/${pet.id}`);
    if (!deleteRes.ok() && deleteRes.status() !== 404) {
      console.warn(`Fixture teardown warning: DELETE pet/${pet.id} returned ${deleteRes.status()}`);
    }
  },
});

export { expect } from '@playwright/test';