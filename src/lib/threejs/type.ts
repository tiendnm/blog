import type { Mesh, MeshPhysicalMaterial, SphereGeometry } from "three";

export type SphereMesh = Mesh<SphereGeometry, MeshPhysicalMaterial>;
export type CustomTreeJsRenderParameters = {
  sphereRadius: number;
  spheresCount: number;
  maxSpace: number;
  minScale: number;
  maxScale: number;
  helper: boolean;
  canvas: HTMLCanvasElement | null;
  darkMode?: boolean;
};
