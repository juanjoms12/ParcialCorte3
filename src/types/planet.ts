export type PlanetType = "rocky" | "gas" | "ice";

export interface Planet {
  id: string;
  name: string;
  type: PlanetType;
  color: string;
  /** Visual radius used by the 3D scene (not to scale) */
  size: number;
  /** Distance from the Sun in millions of km */
  distanceFromSun: number;
  moons: number;
  /** Length of one day in Earth hours */
  dayLengthHours: number;
  /** Average temperature in Celsius */
  temperatureC: number;
  hasRings: boolean;
  description: string;
  funFact: string;
}
