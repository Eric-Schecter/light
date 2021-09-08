import { Cache, Object3D, Scene, WebGLRenderer } from 'three';
import { Loop, MyRenderer, MyScene, MyCamera, Resizer, Lights, MyControl } from './system';
import { Ball } from './ball';
import { Block } from './block';


export class World {
  private scene: Scene;
  private camera: MyCamera;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private resizer: Resizer;
  private lights: Lights;
  private control: MyControl;
  private getProgress = () => '0/0';

  constructor(container: HTMLElement) {
    Cache.enabled = true;
    this.renderer = new MyRenderer(container);
    const canvas = this.renderer.domElement;
    const { clientWidth, clientHeight } = canvas;
    this.scene = new MyScene();
    const assets = this.createAssets();
    this.camera = new MyCamera(45, clientWidth / clientHeight, 0.1, 10000);
    this.resizer = new Resizer(this.renderer, this.camera, container);
    this.lights = new Lights();
    this.scene.add(...assets, ...this.lights.instance, this.camera);
    this.control = new MyControl(this.camera, canvas);
    this.loop = new Loop(this.renderer, this.scene, this.camera, this.control);
    this.loop.start();
  }
  private createAssets = () => {
    const ball = new Ball();
    const blocks = new Array(10).fill(0).map(() => new Block());
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
  public get progress() {
    return this.getProgress
  }
}