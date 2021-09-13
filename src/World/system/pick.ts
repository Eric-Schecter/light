import { PerspectiveCamera, Raycaster, Scene, Vector2 } from "three";
import { Mouse } from "./mouse";

export class Pick {
  private raycaster = new Raycaster();
  private pos = new Vector2();
  constructor(private camera: PerspectiveCamera, private canvas: HTMLCanvasElement,
    private scene: Scene, private mouse: Mouse) {
    this.initEvents();
  }
  private normalize = (px: number, py: number) => {
    const x = px / this.canvas.clientWidth * 2 - 1;
    const y = -(py / this.canvas.clientHeight) * 2 + 1;
    return [x, y];
  }
  private move = ({ clientX, clientY }: PointerEvent) => {
    const [x, y] = this.normalize(clientX, clientY);
    this.pos.set(x, y);
    this.raycaster.setFromCamera(this.pos, this.camera);
    const intersect = this.raycaster.intersectObjects(this.scene.children);
    if (intersect.length) {
      const [first] = intersect;
      this.mouse.target.copy(first.point);
    }
  }
  private initEvents = () => {
    this.canvas.addEventListener('pointermove', this.move);
  }
  public dispose = () => {
    this.canvas.removeEventListener('pointermove', this.move);
  }
}