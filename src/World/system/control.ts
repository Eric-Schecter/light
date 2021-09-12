import { EventDispatcher, PerspectiveCamera, Spherical, Vector3 } from 'three';
import { Tickable } from '../../shared';

export class MyControl extends EventDispatcher implements Tickable {
  private spherical = new Spherical();
  private focus = new Vector3();
  private target = new Vector3();
  private ratio = 0.2;
  constructor(private camera: PerspectiveCamera, private canvas: HTMLCanvasElement) {
    super();
    this.initEvents();
    this.spherical.radius = camera.position.z;
    this.target.copy(this.camera.position);
  }
  private move = ({ clientX, clientY }: MouseEvent) => {
    const { clientWidth, clientHeight } = this.canvas;
    const x = (clientX - clientWidth / 2) / clientWidth * 2;
    const y = (clientY - clientHeight / 2) / clientHeight * 2;
    this.spherical.phi = -Math.PI / 2 + y * Math.PI / 2 * this.ratio;
    this.spherical.theta = Math.PI - x * Math.PI / 2 * this.ratio;
    this.target.setFromSpherical(this.spherical);
  }
  public tick = (delta: number) => {
    this.camera.position.lerp(this.target, 0.1);
    this.camera.lookAt(this.focus);
  }
  private initEvents = () => {
    this.canvas.addEventListener('pointermove', this.move);
  }
  public dispose = () => {
    this.canvas.removeEventListener('pointermove', this.move);
  }
}