import { Color, IcosahedronBufferGeometry, Mesh, ShaderMaterial, Vector3 } from "three";
import { random, Tickable } from "../../shared";
import * as vertexShader from './vertexShader.vert';
import * as fragmentShader from './fragmentShader.frag';
import { Mouse } from "../system";

export class Block extends Mesh implements Tickable {
  constructor(private mouse: Mouse) {
    super(
      new IcosahedronBufferGeometry(0.1),
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uMouse: { value: new Vector3() },
          uColor: { value: new Color('rgb(25,200,225)') },
        }
      })
    );
    const range = 5;
    this.position.set(random(-range, range), random(-range, range), random(-range * 2, range * 2));
  }
  public tick = (delta: number) => {
    this.position.y = (this.position.y + 5 + delta) % 20 - 5;
    this.rotateX(0.02);
    (this.material as ShaderMaterial).uniforms.uMouse.value.copy(this.mouse.value);
  }
}