import { Camera, Clock, Object3D, Scene, WebGLRenderer } from "three";
import { Tickable } from "../../shared/types";
import { MyControl } from "./control";

export class Loop {
  private pre = false;
  private clock = new Clock();
  constructor(private renderer: WebGLRenderer, private scene: Scene, private camera: Camera, private control: MyControl,
    private scenePick: Scene, private tickables: Tickable[]) { }
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
    this.renderer.autoClear = true;
    this.renderer.render(this.scenePick, this.camera);
    this.renderer.autoClear = false;
    this.renderer.render(this.scene, this.camera);
    
  }
  public stop = () => {
    this.renderer.setAnimationLoop(null);
  }
}
