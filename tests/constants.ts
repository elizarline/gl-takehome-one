export const BASE_URL = 'https://www.saucedemo.com';
export const VALID_PASSWORD = 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  locked_out: 'locked_out_user',
  problem: 'problem_user',
  performance_glitch: 'performance_glitch_user',
  error: 'error_user',
  visual: 'visual_user',
} as const;

export const PETSTORE_BASE_URL = 'https://petstore.swagger.io/v2';
export const PETSTORE_API_KEY = process.env.PETSTORE_API_KEY ?? 'special-key';