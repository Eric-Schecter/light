import { CustomBlending, Mesh, OneFactor, ShaderMaterial, SphereBufferGeometry, TextureLoader, Vector3 } from "three";
import { Tickable } from "../../shared";
import * as vertexShader from './vertexShader.vert';
import * as fragmentShader from './fragmentShader.frag';
import { Mouse } from "../system";

export class Ball extends Mesh implements Tickable {
  constructor(private mouse: Mouse) {
    super(
      new SphereBufferGeometry(2, 32, 32),
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: null },
          uTime: { value: 0 },
          uMouse: { value: new Vector3() },
        },
        blending: CustomBlending,
        blendSrc: OneFactor
      }),
    );
    new TextureLoader()
      .load('textures/water.jpg', (texture) => (this.material as ShaderMaterial).uniforms.uTexture.value = texture);
  }
  public tick = (delta: number) => {
    (this.material as ShaderMaterial).uniforms.uTime.value += delta;
    (this.material as ShaderMaterial).uniforms.uMouse.value.copy(this.mouse.value);
    this.rotation.y += delta;
  }
}