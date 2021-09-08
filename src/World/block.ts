import { IcosahedronBufferGeometry, Mesh, MeshStandardMaterial, TextureLoader } from "three";
import { random, Tickable } from "../shared";

export class Block extends Mesh implements Tickable {
  constructor() {
    super(
      new IcosahedronBufferGeometry(0.1),
      new MeshStandardMaterial({
        map: new TextureLoader().load('textures/water.jpg'),
      }),
    );
    const range = 5;
    this.position.set(random(-range, range), random(-range, range), random(-range, range));
  }
  public tick = (delta: number) => {
    this.position.y = (this.position.y + 5 + delta) % 20 - 5;
    this.rotateX(0.1);
  }
}