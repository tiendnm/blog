import type { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class CustomOrbitControls extends OrbitControls {
  constructor(object: Camera, domElement?: HTMLElement) {
    super(object, domElement);
    this.enableRotate = true;
    this.autoRotate = true;
    this.enableZoom = false;
    this.autoRotateSpeed = 1;
    this.enablePan = false;
    this.enableDamping = true;
    this.dampingFactor = 0.05;
  }
}
