import { Mesh, MeshStandardMaterial, SphereBufferGeometry, TextureLoader, Vector3 } from "three";
import { Tickable } from "../shared";
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise();

export class Ball extends Mesh implements Tickable {
  private time = 0;
  private radius = 2;
  constructor() {
    super(
      new SphereBufferGeometry(1, 32, 32),
      new MeshStandardMaterial({
        map:new TextureLoader().load('textures/water.jpg'),
      }),
    );
  }
  public tick = (delta: number) => {
    const position = this.geometry.getAttribute('position');
    const v = new Vector3();
    this.time += delta / 2;
    for (let i = 0; i < position.count; i++) {
      v.set(position.getX(i), position.getY(i), position.getZ(i)).normalize();
      const distance = simplex.noise3D(
        v.x + this.time,
        v.y + this.time,
        v.z + this.time,
      );
      v.multiplyScalar(this.radius + distance * 0.2);
      position.setXYZ(i, v.x, v.y, v.z);
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}