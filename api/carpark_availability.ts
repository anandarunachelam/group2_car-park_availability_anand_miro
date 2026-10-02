/**
 * Re-export carpark availability handler to support /api/carpark_availability.ts
 */
import carparkAvailabilityHandler from './carpark-availability.ts';

export * from './carpark-availability.ts';
export default carparkAvailabilityHandler;
