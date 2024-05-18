import type { MeshPhysicalMaterialParameters } from "three";
import { MeshPhysicalMaterial } from "three";

export class CustomMeshPhysicalMaterial extends MeshPhysicalMaterial {
  constructor(parameters?: MeshPhysicalMaterialParameters | undefined) {
    super(parameters);
    this.reflectivity = 2;
    this.sheen = 1;
    this.roughness = 0;
    this.ior = 2.333;
    this.specularIntensity = 1;
  }
}
