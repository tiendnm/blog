import { Box3, Vector3 } from "three";
import type { SphereMesh } from "./type";

export const getRandomFromRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getObjectSize = (mesh: SphereMesh): Vector3 => {
  const measure = new Vector3();
  const boundingBox = new Box3().setFromObject(mesh);
  const size = boundingBox.getSize(measure);
  return size;
};

export const getRandomItemFromArray = (list: any[]): any => {
  return list[Math.floor(Math.random() * list.length)];
};
