"use client";

import {
  Box3,
  BufferGeometry,
  Camera,
  CameraHelper,
  Color,
  ColorRepresentation,
  Group,
  HemisphereLight,
  HemisphereLightHelper,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  Object3DEventMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
  WebGLRendererParameters,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type SphereMesh = Mesh<SphereGeometry, MeshPhysicalMaterial>;

const SPHERE_RADIUS: number = 6;
const MAX_SPACE: number = 20;
const MIN_SCALE: number = 0.8;
const MAX_SCALE: number = 1.8;

const LIGHT_COLOR_PALETTE: string[] = ["#cc9cdb", "#af9cdb"];
const DARK_COLOR_PALETTE: string[] = ["#00162e", "#04000d"];

const getRandomFromRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const getObjectSize = (mesh: SphereMesh): Vector3 => {
  const measure = new Vector3();
  const boundingBox = new Box3().setFromObject(mesh);
  const size = boundingBox.getSize(measure);
  return size;
};

const getRandomItemFromArray = (list: any[]): any => {
  return list[Math.floor(Math.random() * list.length)];
};

type CustomTreeJsRenderParameters = {
  sphereRadius: number;
  spheresCount: number;
  maxSpace: number;
  minScale: number;
  maxScale: number;
  helper: boolean;
  canvas: HTMLCanvasElement | null;
  darkMode?: boolean;
};

class CustomCamera extends PerspectiveCamera {
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

class CustomLightGroup extends Group {
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

class CustomPointLight extends PointLight {
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
class CustomOrbitControls extends OrbitControls {
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

class CustomWebGLRenderer extends WebGLRenderer {
  constructor(parameters?: WebGLRendererParameters) {
    super(parameters);
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;
    this.setSize(window.innerWidth, window.innerHeight);
    this.outputColorSpace = SRGBColorSpace;
  }
}

class CustomMeshPhysicalMaterial extends MeshPhysicalMaterial {
  constructor(parameters?: MeshPhysicalMaterialParameters | undefined) {
    super(parameters);
    this.reflectivity = 2;
    this.sheen = 1;
    this.roughness = 0;
    this.ior = 2.333;
    this.specularIntensity = 1;
  }
}

class CustomMesh<
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
export class CustomThreeJsRender {
  private _helper = false;
  private _requestFrameID = 0;
  private _spheres: SphereMesh[] = [];
  private _params: CustomTreeJsRenderParameters;
  private readonly _defaultParam: Partial<CustomTreeJsRenderParameters> = {
    helper: false,
    maxScale: 2,
    minScale: 0.8,
    maxSpace: 40,
    spheresCount: 4,
    sphereRadius: 6,
    darkMode: false,
  };
  scene: Scene;
  camera: CustomCamera;
  lightGroup: CustomLightGroup;
  webGLRenderer: CustomWebGLRenderer;
  orbitControls: CustomOrbitControls;
  geometry: SphereGeometry;
  animate() {}
  copyLight() {}
  resize() {}
  dispose() {}
  constructor(parameters: Partial<CustomTreeJsRenderParameters>) {
    this._params = {
      ...this._defaultParam,
      ...parameters,
    } as CustomTreeJsRenderParameters;
    this.geometry = new SphereGeometry(SPHERE_RADIUS, 64, 64);
    this.scene = new Scene();
    this.addSpheres();
    this.lightGroup = new CustomLightGroup();
    this.scene.add(this.lightGroup);
    this.camera = new CustomCamera();
    this.scene.add(this.camera);
    const canvas = !this._params?.canvas ? undefined : this._params.canvas;
    //
    this.webGLRenderer = new CustomWebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    this.orbitControls = new CustomOrbitControls(this.camera, canvas);

    this._helper = !!this._params?.helper;
    //helper
    if (this._helper) {
      this.addHelper();
    }
  }
  addSpheres() {
    for (let i = 0; i < this._params.spheresCount; i++) {
      if (this._spheres.length >= this._params.spheresCount) break;
      let foundSpace = false;

      // biến lưu trạng thái vật thể bị đè
      let overlapped = false;

      // chọn màu ngẫu nhiên
      const color = getRandomItemFromArray(
        this._params.darkMode ? DARK_COLOR_PALETTE : LIGHT_COLOR_PALETTE
      );

      // lọc ra những vật thể cũ;
      const oldMeshArray = this._spheres.filter((value, index) => index < i);

      // khi chưa tìm thấy khoảng trống, thực thi lệnh
      while (!foundSpace) {
        // mặc định các vật thể không bị đè
        overlapped = false;
        // sinh ra tỉ lệ ngẫu nhiên
        const randomScale = getRandomFromRange(MIN_SCALE, MAX_SCALE);
        // sinh ra vị trí ngẫu nhiên
        const randomX = getRandomFromRange(-MAX_SPACE, MAX_SPACE);
        const randomY = getRandomFromRange(-MAX_SPACE, MAX_SPACE);
        const randomZ = getRandomFromRange(-MAX_SPACE, MAX_SPACE);

        // kiếm tra nếu phát hiện có các vật thể cũ thì so sánh với vật thể hiện tại
        if (oldMeshArray.length > 0) {
          // so sánh thông số với các vật thể cũ, nếu đè lên nhau thì ngưng
          for (let k = 0; k < oldMeshArray.length; k++) {
            const oldMesh = oldMeshArray[k];

            // lấy thông số của vật thể cũ
            const oldMeshSize = getObjectSize(oldMesh);
            // đường kính vật thể cũ
            const oldMeshDiameter = oldMeshSize.x;

            // vị trí vật thể mới
            const newMeshPosition = new Vector3(randomX, randomY, randomZ);

            // đường kính vật thể mới
            const newMeshDiameter = SPHERE_RADIUS * 2 * randomScale;

            // khoảng cách từ vật thể cũ đến vật thể mới
            const meshesDistance = newMeshPosition.distanceTo(oldMesh.position);

            // nếu khoảng cách từ 2 tâm bé hơn đường kính của 2 vật thể thì 2 vật thể đang đè lên nhau
            if (meshesDistance <= newMeshDiameter + oldMeshDiameter) {
              overlapped = true;
              break;
            }
          }
        }
        // nếu chưa phát hiện trùng nhau thì đã tìm thấy khoảng trống
        if (!overlapped) {
          foundSpace = true;
        }
        // thực hiện thêm vật thể vào bối cảnh nếu như đã tìm thấy khoảng trống
        if (foundSpace) {
          const material = new CustomMeshPhysicalMaterial({
            emissive: new Color(color),
            color: new Color(color),
          });
          const mesh = new CustomMesh(this.geometry, material);
          mesh.scale.set(randomScale, randomScale, randomScale);
          mesh.position.set(randomX, randomY, randomZ);
          this._spheres.push(mesh);
          this.scene.add(mesh);
        }
      }
    }
  }
  addHelper() {
    this._helper = true;
    const pointLightHelper = new PointLightHelper(this.lightGroup.pointLight);
    this.scene.add(pointLightHelper);

    const hemiLighthelper = new HemisphereLightHelper(
      this.lightGroup.hemiLight,
      5
    );
    this.scene.add(hemiLighthelper);

    const helper = new CameraHelper(this.lightGroup.pointLight.shadow.camera);
    this.scene.add(helper);
  }
  changeTheme(darkMode: boolean) {
    for (let index = 0; index < this._spheres.length; index++) {
      const sphere = this._spheres[index];
      const color = getRandomItemFromArray(
        darkMode ? DARK_COLOR_PALETTE : LIGHT_COLOR_PALETTE
      );
      sphere.material.color.set(color);
      sphere.material.emissive.set(color);
    }
  }
  render() {
    this.webGLRenderer.render(this.scene, this.camera);
  }

  init() {
    const animate = () => {
      this._requestFrameID = requestAnimationFrame(animate);
      this.orbitControls.update();
      this.render();
    };
    const copyLight = () => {
      this.lightGroup.quaternion.copy(this.camera.quaternion);
    };
    const resize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    this.animate = animate;
    this.copyLight = copyLight;
    animate();
    copyLight();
    // window resize
    this.orbitControls.addEventListener("change", this.copyLight);
    const dispose = () => {
      cancelAnimationFrame(this._requestFrameID);
      // dispose webgl
      this.webGLRenderer.dispose();
      // remove event listener
      this.orbitControls.removeEventListener("change", copyLight);
      window.removeEventListener("resize", resize);
    };
    this.dispose = dispose;
  }
}
