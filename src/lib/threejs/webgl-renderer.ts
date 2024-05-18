import type { WebGLRendererParameters } from "three";
import { PCFSoftShadowMap, SRGBColorSpace, WebGLRenderer } from "three";

export class CustomWebGLRenderer extends WebGLRenderer {
  constructor(parameters?: WebGLRendererParameters) {
    super(parameters);
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;
    this.setSize(window.innerWidth, window.innerHeight);
    this.outputColorSpace = SRGBColorSpace;
  }
}
