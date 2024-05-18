import type { BufferGeometry, Material, Object3DEventMap } from "three";
import { Mesh } from "three";

export class CustomMesh<
  TGeometry extends BufferGeometry = BufferGeometry,
  TMaterial extends Material | Material[] = Material | Material[],
  TEventMap extends Object3DEventMap = Object3DEventMap
> extends Mesh<TGeometry, TMaterial, TEventMap> {
  constructor(geometry?: TGeometry, material?: TMaterial) {
    super(geometry, material);
    this.castShadow = true;
    this.receiveShadow = true;
  }
}
