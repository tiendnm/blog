import { Group, HemisphereLight, PointLight } from "three";
import type { CustomPointLight } from "./point-light";

export class CustomLightGroup extends Group {
  pointLight: CustomPointLight;
  hemiLight: HemisphereLight;
  constructor() {
    super();
    this.pointLight = new PointLight(0xffffff, 50, 0, 1.2);
    this.pointLight.castShadow = true;
    this.pointLight.shadow.mapSize.width = 1024; // default
    this.pointLight.shadow.mapSize.height = 1024; // default
    this.pointLight.position.set(20, 20, 10);
    this.add(this.pointLight);

    this.hemiLight = new HemisphereLight(0xffffff, 0xefefef, 1);
    this.add(this.hemiLight);
  }
}
