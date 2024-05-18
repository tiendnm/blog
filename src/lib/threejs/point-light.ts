import { PointLight, type ColorRepresentation } from "three";

export class CustomPointLight extends PointLight {
  constructor(
    color?: ColorRepresentation | undefined,
    intensity?: number | undefined,
    distance?: number | undefined,
    decay?: number | undefined
  ) {
    super(color, intensity, distance, decay);
    this.castShadow = true;
    this.shadow.mapSize.width = 1024; // default
    this.shadow.mapSize.height = 1024; // default
    this.position.set(20, 20, 10);
  }
}
