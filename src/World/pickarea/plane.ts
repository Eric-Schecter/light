import { Mesh, MeshBasicMaterial, PlaneBufferGeometry } from "three";
import { Tickable } from "../../shared";
import { MyCamera } from "../system";

export class Plane extends Mesh implements Tickable {
  constructor(private camera: MyCamera) {
    super(
      new PlaneBufferGeometry(100, 100),
      new MeshBasicMaterial(),
    );
    this.rotateZ(-Math.PI / 2);
  }
  public tick = (delta: number) => {
    this.rotation.setFromQuaternion(this.camera.quaternion);
  }
}