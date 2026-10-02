/**
 * Re-export carpark availability handler to support path with space: /api/carpark availability.ts
 */
import carparkAvailabilityHandler from './carpark-availability.ts';

export * from './carpark-availability.ts';
export default carparkAvailabilityHandler;
