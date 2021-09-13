import { Cache, Object3D, Scene, WebGLRenderer } from 'three';
import { Loop, MyRenderer, MyScene, MyCamera, Resizer, MyControl, Pick, Mouse } from './system';
import { Ball } from './ball';
import { Block } from './block';
import { PickArea } from './pickarea';
import { Background } from './background';

export class World {
  private scene: Scene;
  private camera: MyCamera;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private resizer: Resizer;
  private control: MyControl;

  constructor(container: HTMLElement) {
    Cache.enabled = true;
    this.renderer = new MyRenderer(container);
    const canvas = this.renderer.domElement;
    const { clientWidth, clientHeight } = canvas;
    this.scene = new MyScene();
    this.camera = new MyCamera(45, clientWidth / clientHeight, 0.1, 10000);
    const mouse = new Mouse();
    const scenePick = new PickArea(this.camera);
    new Pick(this.camera, canvas, scenePick, mouse);
    const assets = this.createAssets(mouse);
    this.resizer = new Resizer(this.renderer, this.camera, container);
    // const stats = new MyStats(container);
    this.scene.add(...assets, this.camera);
    this.control = new MyControl(this.camera, canvas);
    const background = new Background(mouse, this.camera);
    this.loop = new Loop(this.renderer, this.scene, this.camera, scenePick, background, [this.control, mouse, background]);
    this.loop.start();
  }
  private createAssets = (mouse: Mouse) => {
    const ball = new Ball(mouse);
    const blocks = new Array(30).fill(0).map(() => new Block(mouse));
    return [ball, ...blocks];
  }
  public dispose = () => {
    Object.values(this).forEach(component => {
      if (component.hasOwnProperty('dispose')) {
        component.dispose();
      }
      if (component instanceof Object3D && component.type === 'Scene') {
        component.traverse(com => com.dispatchEvent({ type: 'dispose' }));
      }
    })
  }
}