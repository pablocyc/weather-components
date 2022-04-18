import { updateTask, getTask } from "../firebase.js";

class AlertSensor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        
      }

      .container {
        width: 100%;
        margin-bottom: 2.5rem;
        font-size: 1.2rem;
        font-weight: 300;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }

      .min-max {
        max-width: 40%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 1rem;
      }

      .min {
        justify-content: flex-end;
      }

      .min-max input {
        max-width: 3rem;
        font-size: 1.2rem;
        font-weight: 500;
      }

      .min-max input::-webkit-outer-spin-button,
      .min-max input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: textfield;
      }
      .min-max img {
        margin: 0 1rem;
        margin-top: 0.4rem;
        width: 24px;
      }

      .input-max {
        background-color: transparent;
        border: 0;
        color: var(--text-color);
        overflow: hidden;
        text-align: center;
      }

      input:invalid+span:before {
        content: '✖';
        margin: 0 10px;
        color: lightcoral;
      }
      input:valid+span:after {
        content: '✓';
        margin: 0 5px;
      }

      .validity {
        cursor: pointer;
        color: green;
      }

      .valid-min {
        order: -1;
        margin-right: 0.5rem;
      }
      .valid-max {
        margin-left: 0.5rem;
      }
    `;
  }

  connectedCallback() {
    this.render();
    const container = this.shadowRoot.querySelector(".container");
    container.addEventListener("click", e => this.sendData(e));
  }

  setProps(sensor, min, max, step) {
    this.sensor = sensor;
    this.min = min;
    this.max = max;
    this.step = step;
  }

  sendData(event) {
    const nodeName = event.target.nodeName;
    if (nodeName === "SPAN") {
      const value = event.target.parentElement.querySelector("input").value;
      const key = event.path[1].classList[0];
      updateTask(this.sensor, {
        [key]: value
      });
      this.setStyleDisable(event);
      const docSnap = getTask(this.sensor);
      console.log(docSnap.data());
    }
    if (nodeName === "INPUT") {
      this.setStyleEnable(event);
    }
  }

  setStyleDisable(event) {
    event.target.parentElement.querySelector("input").style = "background-color: #0003; border: 1px solid #999999; border-radius: 5px;";
    event.target.parentElement.querySelector("span").style = "color: var(--text-color);";
  }

  setStyleEnable(event) {
    event.target.style = "background-color: inherit; border: inherit";
    event.target.parentElement.querySelector("span").style = "color: green;";
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${AlertSensor.styles}</style>
    <div class="container">
      <div class="min min-max">
        <input type="number" class="input-max" placeholder="•" step="${this.step}" maxlength="2" max="${this.max}" min="${this.min}" required>
        <span class="validity valid-min"></span>
        <img src="icons/icon-min.svg" alt="icon min">
      </div>
      <img src="/icons/icon-${this.sensor}.svg" alt="icon sensor" class="icon">
      <div class="max min-max">
        <input type="number" class="input-max" placeholder="•" step="${this.step}" maxlength="2" max="${this.max}" min="${this.min}" required>
        <span class="validity valid-max"></span>
        <img src="icons/icon-max.svg" alt="icon max">
      </div>
    </div>`;
  }
}

customElements.define("alert-sensor", AlertSensor);
