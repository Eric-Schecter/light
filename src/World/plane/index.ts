import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector3 } from "three";
import * as vertexShader from './vertexShader.vert';
import * as fragmentShader from './fragmentShader.frag';
import { Tickable } from "../../shared";
import { Mouse, MyCamera } from "../system";

export class Plane extends Mesh implements Tickable {
  constructor(private mouse: Mouse, private camera: MyCamera) {
    super(
      new PlaneBufferGeometry(100, 100),
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uMouse: { value: new Vector3() },
          uColor: { value: new Vector3(25, 200, 225).multiplyScalar(1 / 255) },
        },
        transparent: true,
        depthTest: false,
      }),
    );
    this.rotateZ(-Math.PI / 2);
    this.position.z = 1;
  }
  public tick = (delta: number) => {
    (this.material as ShaderMaterial).uniforms.uMouse.value.copy(this.mouse.value);
    this.rotation.setFromQuaternion(this.camera.quaternion);
  }
}