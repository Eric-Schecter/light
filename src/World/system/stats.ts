import Stats from 'stats.js';
import { Tickable } from '../../shared';

export class MyStats implements Tickable {
  private stats: Stats;
  constructor(container: HTMLElement) {
    this.stats = new Stats();
    this.stats.showPanel(0);
    container.appendChild(this.stats.dom);
  }
  public tick = () => {
    this.stats.update();
  }
}