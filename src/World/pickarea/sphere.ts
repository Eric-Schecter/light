import { Mesh, MeshBasicMaterial, SphereBufferGeometry } from "three";

export class Sphere extends Mesh {
  constructor(radius: number) {
    super(
      new SphereBufferGeometry(radius, 20, 20),
      new MeshBasicMaterial(),
    )
  }
}