import { DirectionalLight, Light, PointLight, Vector3 } from "three";

export class Lights {
  private _instance: Light[] = [];
  constructor() {
    const directLights = this.createDirectLights();
    this._instance = [...directLights];
  }
  private createDirectLights = () => {
    const directionalLight = new DirectionalLight('white', 1);
    directionalLight.position.set(500, 200, 500);
    const pointLight = new PointLight('white');
    pointLight.position.set(0, 0, 100);
    pointLight.lookAt(new Vector3(0, 0, 0));
    return [directionalLight, pointLight];
  }
  public setPower = (value: number) => {
    this._instance.forEach(light => light.intensity = value);
  }
  public get instance() {
    return this._instance;
  }
}