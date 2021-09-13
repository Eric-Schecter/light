import { Vector3 } from "three";
import { Tickable } from "../../shared";

export class Mouse implements Tickable {
  private _value = new Vector3();
  private _target = new Vector3();
  public tick = (delta: number) => {
    this._value.lerp(this._target, delta * 10.);
  }
  public get value() {
    return this._value;
  }
  public get target() {
    return this._target;
  }
}