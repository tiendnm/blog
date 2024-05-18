import { PerspectiveCamera } from "three";

export class CustomCamera extends PerspectiveCamera {
  constructor(
    fov: number = 2,
    aspect: number = window.innerWidth / window.innerHeight,
    near: number = 1,
    far: number = 10000
  ) {
    super(fov, aspect, near, far);
    this.position.set(0, 500, -1000);
  }
}
