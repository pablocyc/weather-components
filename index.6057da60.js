import{initializeApp as p}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";import{getFirestore as u,getDoc as g,doc as d,onSnapshot as f,collection as x,updateDoc as y}from"https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";const b=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}};b();const v={firebasePath:"station-home",firebaseConfig:{apiKey:"AIzaSyCTVRTgXZTk5WjAMGRtxvFog0R0nElrSUk",authDomain:"weather-station-8e973.firebaseapp.com",databaseURL:"https://weather-station-8e973-default-rtdb.firebaseio.com",projectId:"weather-station-8e973",storageBucket:"weather-station-8e973.appspot.com",messagingSenderId:"270171452446",appId:"1:270171452446:web:1f42aab361155f98336a0f",measurementId:"G-3SLBPRH8D3"}},w=p(v.firebaseConfig),r=u(w),l="sensors",S=a=>g(d(r,l,a)),R=a=>f(x(r,l),a),k=(a,t)=>{y(d(r,l,a),t)};class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.minRange="",this.maxRange="",this.min="",this.max="",this.minOld="",this.maxOld=""}static get styles(){return`
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

      .input-max,
      .input-min {
        background-color: transparent;
        border: 0;
        color: var(--text-color);
        overflow: hidden;
        text-align: center;
      }

      input:invalid+span:before {
        content: '\u2716';
        margin: 0 10px;
        color: lightcoral;
        border: none;
        box-shadow: none;
      }
      input:valid+span:after {
        content: '\u2713';
        margin: 0 5px;
        padding: 4px;
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
    `}connectedCallback(){this.render(),this.init(),this.shadowRoot.querySelector(".container").addEventListener("click",n=>this.sendData(n))}init(){S(this.sensor).then(t=>{if(t.exists()){const{min:n,max:s}=t.data();this.min=n,this.max=s,this.minOld=n,this.maxOld=s;const e=this.shadowRoot.querySelector(".input-min"),i=this.shadowRoot.querySelector(".input-max"),o=this.shadowRoot.querySelector(".valid-min"),h=this.shadowRoot.querySelector(".valid-max");e.value=n,i.value=s,this.setStyleDisable(e,o),this.setStyleDisable(i,h)}})}setProps(t,n,s,e){this.sensor=t,this.minRange=n,this.maxRange=s,this.step=e}sendData(t){const n=t.target.nodeName;if(n==="SPAN"){const s=t.target.parentElement.querySelector("span"),e=t.target.parentElement.querySelector("input"),i=e.value,o=t.path[1].classList[0];(i!==this.minOld||i!==this.maxOld)&&(this.minOld=i,this.maxOld=i,this.setStyleDisable(e,s),k(this.sensor,{[o]:i}))}n==="INPUT"&&this.setStyleEnable(t)}setStyleDisable(t,n){t.style="background-color: #0003; border: 1px solid #999999; border-radius: 5px;",n.style="color: var(--text-color); border: none; box-shadow: none;"}setStyleEnable(t){t.target.style="background-color: inherit; border: inherit",t.target.parentElement.querySelector("span").style="color: green; border: 1px solid #0005; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); border-radius: 5px;"}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
    <div class="container">
      <div class="min min-max">
        <input type="number" class="input-min" placeholder="\u2022" step="${this.step}" maxlength="2" max="${this.maxRange}" min="${this.minRange}" required>
        <span class="validity valid-min"></span>
        <img src="icons/icon-min.svg" alt="icon min">
      </div>
      <img src="icons/icon-${this.sensor}.svg" alt="icon sensor" class="icon">
      <div class="max min-max">
        <input type="number" class="input-max" placeholder="\u2022" step="${this.step}" maxlength="2" max="${this.maxRange}" min="${this.minRange}" required>
        <span class="validity valid-max"></span>
        <img src="icons/icon-max.svg" alt="icon max">
      </div>
    </div>`}}customElements.define("alert-sensor",c);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.attr=this.getAttributeNames(),this.attr.forEach(t=>{this.attr[t]=this.getAttribute(t)}),this.value="0"}static get styles(){return`
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
    `}toPascalCase(t){return t.split(" ").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join("")}connectedCallback(){R(t=>{t.forEach(n=>{n.id===this.attr.sensor&&(this.value=n.data().value,this.render(),this.renderAlert())})})}renderAlert(){const t=document.createElement("alert-sensor");t.setProps(this.attr.sensor,this.attr.min,this.attr.max,this.attr.step),this.shadowRoot.querySelector(".container").appendChild(t)}render(){this.shadowRoot.innerHTML=`
    <style>${m.styles}</style>
    <div class="container">
      <h1 class="title">${this.toPascalCase(this.attr.sensor)}</h1>
      <p class="value">${this.value}${this.attr.unit}</p>
    </div>`}}customElements.define("sensor-card",m);const E=document.querySelector(".today-text"),L=new Date,T={weekday:"long",month:"long",day:"numeric"};E.innerHTML=new Intl.DateTimeFormat("es-US",T).format(L);
