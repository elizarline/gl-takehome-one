import { test as base } from '@playwright/test';
import { PETSTORE_BASE_URL } from '../constants';
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
    const response = await request.post(`${{PETSTORE_BASE_URL}}/pet`, {
      data: {
        name: 'Fixture Pet',
        photoUrls: ['https://example.com/pet.jpg'],
        status: 'available',
      } satisfies Pet,
    });

    const pet = await response.json() as Pet;

    await use(pet);

    // Teardown — always runs, even if the test failed
    await request.delete(`${PETSTORE_BASE_URL}/pet/${pet.id}`);
  },
});

export { expect } from '@playwright/test';