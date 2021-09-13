import { Camera, Clock, Object3D, Scene, WebGLRenderer } from "three";
import { Tickable } from "../../shared/types";
import { Background } from "../background";

export class Loop {
  private clock = new Clock();
  constructor(private renderer: WebGLRenderer, private scene: Scene, private camera: Camera,
    private scenePick: Scene, private background: Background, private tickables: Tickable[]) {
    this.renderer.autoClear = false;
  }
  public start = () => {
    this.renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta();
      this.tick(delta);
      this.render();
    });
  }
  private tick = (delta: number) => {
    this.tickables.forEach(tickable => tickable.tick(delta));
    this.scene.traverse((obj: Tickable | Object3D) => 'tick' in obj && obj.tick(delta));
    this.scenePick.traverse((obj: Tickable | Object3D) => 'tick' in obj && obj.tick(delta));
  }
  private render = () => {
    this.renderer.clear();
    this.renderer.render(this.scenePick, this.camera);
    this.renderer.clear();
    this.renderer.render(this.background, this.camera);
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  }
  public stop = () => {
    this.renderer.setAnimationLoop(null);
  }
}
