import { onGetTasks } from "../firebase.js";
import "./AlertSensor.js";

class SensorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.attr = this.getAttributeNames();
    this.attr.forEach(name => {
      this.attr[name] = this.getAttribute(name);
    });
    this.value = "0";
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
        if (doc.id === this.attr.sensor) {
          this.value = doc.data().value;
          this.render();
          this.renderAlert();
        }
      });
    });
  }

  renderAlert() {
    const sensorCard = document.createElement("alert-sensor");
    sensorCard.setProps(this.attr.sensor, this.attr.min, this.attr.max, this.attr.step);
    this.shadowRoot.querySelector(".container").appendChild(sensorCard);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SensorCard.styles}</style>
    <div class="container">
      <h1 class="title">${this.toPascalCase(this.attr.sensor)}</h1>
      <p class="value">${this.value}${this.attr.unit}</p>
    </div>`;
  }
}

customElements.define("sensor-card", SensorCard);
