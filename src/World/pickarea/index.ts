import { Scene } from "three";
import { MyCamera } from "../system";
import { Plane } from "./plane";
import { Sphere } from "./sphere";

export class PickArea extends Scene {
  constructor(camera: MyCamera) {
    super();
    this.add(
      new Plane(camera),
      new Sphere(3),
    )
  }
}