import { onGetTasks } from "../firebase.js";

class SensorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.title = this.getAttribute("sensor");
    this.unit = this.getAttribute("unit");
    this.value = "0";
    this.min = "0";
    this.max = "0";
  }

  static get styles() {
    return /* css */`
      :host {
        margin-bottom: 2rem;
      }

      .container {
        width: 270px;
        background-color: var(--card-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
        border-radius: 9px;
        font-family: Roboto;
      }

      .title {
        font-family: Montserrat;
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 28px;
        margin-top: 2rem;
      }

      .value {
        color: var(--primary-color);
        font-size: 3rem;
        font-weight: 500;
        margin: 1rem 0;
      }

      .history {
        width: 100%;
        margin-bottom: 2.5rem;
        font-size: 1.2rem;
        font-weight: 300;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }

      .min span {
        margin-left: 0.3rem;
      }
    `;
  }

  toPascalCase(str) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  connectedCallback() {
    onGetTasks(snapshot => {
      snapshot.forEach(doc => {
        if (doc.id === this.title) {
          this.value = doc.data().value;
          this.min = doc.data().min;
          this.max = doc.data().max;
        }
      });
      this.render();
    });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SensorCard.styles}</style>
    <div class="container">
      <h1 class="title">${this.toPascalCase(this.title)}</h1>
      <p class="value">${this.value}${this.unit}</p>
      <div class="history">
        <div class="min">
          <img src="icons/icon-min.svg" alt="icon min">
          <span>${this.min}${this.unit}</span>
        </div>
        <img src="icons/icon-${this.title}.svg" alt="icon sensor" class="icon">
        <div class="max">
          <span>${this.max}${this.unit}</span>
          <img src="icons/icon-max.svg" alt="icon max">
        </div>
      </div>
    </div>`;
  }
}

customElements.define("sensor-card", SensorCard);
