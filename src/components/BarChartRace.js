import { createBar, DEFAULT_TOTAL_BARS, DEFAULT_HEIGHT_BAR } from "@/modules/createBar.js";
import { precalculateInfo } from "@/modules/precalculateInfo.js";

const currentDay = "2024-08-21";

class BarChartRace extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.usernames = [];
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        display: inline-block;
        background: #222;
        min-width: 800px;
        min-height: 400px;
        position: relative;
        overflow: hidden;
      }

      .bar {
        background: var(--color, gold);
        height: ${DEFAULT_HEIGHT_BAR}px;
        margin: 0.25rem 0;
        font-family: Jost, sans-serif;
        font-weight: 700;
        border-radius: 4px;
        color: #fff;
        display: flex;
        justify-content: end;
        align-items: center;
        padding-right: 10px;
        box-sizing: border-box;
        position: absolute;
        transform: translateY(var(--y, 0));
        transition: transform 1s ease, width 1s ease;

        & .count {
          background: #000;
          padding: 0 4px;
          border-radius: 4px;
        }

        &::after {
          font-family: "Victor Mono", monospace;
          content: attr(data-username);
          color: #fff;
          position: absolute;
          right: calc(var(--width) * -1ch - 15px);
        }
      }
    `;
  }

  get today() {
    return this.data[currentDay];
  }

  getUserData(nick) {
    return this.today.find(item => item.username === nick)?.count ?? 0;
  }

  connectedCallback() {
    this.bars = this.getAttribute("bars") ?? DEFAULT_TOTAL_BARS;
    this.render();
    this.usernames = [...this.today];
    this.renderBars();
  }

  renderBars() {
    const container = this.shadowRoot.querySelector(".container");
    const ranking = this.usernames.slice(0, this.bars);
    ranking.forEach((item, index) => {
      const bar = createBar(item, this.info, index);
      container.append(bar);
    });
  }

  setData(data) {
    this.data = data;
    this.info = precalculateInfo(data);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BarChartRace.styles}</style>
    <div class="container"></div>`;
  }
}

customElements.define("bar-chart-race", BarChartRace);
