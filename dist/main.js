var app=function(t){"use strict";function e(t,e,n,o){var s,i=arguments.length,l=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,n,o);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(l=(i<3?s(l):i>3?s(e,n,l):s(e,n))||l);return i>3&&l&&Object.defineProperty(e,n,l),l}class n{constructor(t){this.target=t,this.channels={default:new BroadcastChannel("default")},this.events={}}get(t){return this.events[t]}set(t,e){return this.events[t]=e,this.get(t)}emit(t){"string"==typeof t&&(t=this.events[t]),this.target.dispatchEvent(t)}broadcast(t,e){"string"==typeof t&&(t=this.events[t]),this.target.dispatchEvent(t),null===(t={type:t.type,detail:t.detail}).detail&&delete t.detail,e?this.channels[e].postMessage(t):this.channels.default.postMessage(t)}setChannel(t){this.channels[t]=new BroadcastChannel(t)}removeChannel(t){this.channels[t].close(),delete this.channels[t]}}function o(t,e){const n=`${t.elementMeta.selector}`;if(!document.getElementById(`${n}-x`)){const e=document.createElement("style");e.setAttribute("id",`${n}-x`),e.innerText=t.elementMeta.style,e.innerText=e.innerText.replace(/:host/gi,`[is=${n}]`),document.head.appendChild(e)}}function s(){const t=function t(e,n=[],o=[]){e.children.length||o.push(n.concat(e));for(const s of e.children)t(s,n.concat(s),o);return o}(this,[]).reduce((t,e)=>t.concat(e),[]);return t.filter((e,n)=>t.indexOf(e)>=n)}function i(t,e){return e||(e=[]),Array.from(function(t){return t.parentNode}(t).children).filter(t=>"TEXT"!==t.tagName&&"STYLE"!==t.tagName)}function l(t){return i(t).indexOf(t)}const r=/\{\{(\s*)(.*?)(\s*)\}\}/g,a=" __state";Object.byString=function(t,e){if(!e)return t;for(var n=(e=(e=e.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),o=0,s=n.length;o<s;++o){var i=n[o];if(!(i in t))return;t=t[i]}return t};class c{constructor(t){this.template=t.innerHTML,this.node=t}update(t){let e=this.template.slice(0);this.node.innerHTML=e.replace(r,(e,n)=>Object.byString(t,/\{\{(\s*)(.*?)(\s*)\}\}/.exec(e)[2])||"")}}class u{constructor(t){this.model=t}set(t,e,n){return t[e]=n,this.model.elementMeta.boundState["node"+a].update(this.model),!0}}function h(){this.elementMeta||(this.elementMeta={}),this.elementMeta.templateRegex=r,this.elementMeta.boundState={["node"+a]:new c(this),["handler"+a]:new u(this)},this.state=new Proxy(this,this.elementMeta.boundState["handler"+a])}function m(){this.elementMeta||(this.elementMeta={}),this.elementMeta.boundNodes=this.getChildNodes().map(t=>(t.elementMeta||(t.elementMeta={}),t.elementMeta.templateRegex=r,t.elementMeta.boundState={["node"+a]:new c(t),["handler"+a]:new u(t)},t.state=new Proxy(t,t.elementMeta.boundState["handler"+a]),t))}const d=(...t)=>t,p=(...t)=>t,y=()=>{};function f(t){if(t)return e=>(function(t,e){e.prototype.elementMeta=Object.assign({},t),e.prototype.elementMeta.eventMap={},e.prototype.template=document.createElement("template"),e.prototype.template=`<style>${t.style}</style>${t.template}`,e.prototype.getChildNodes=s,e.prototype.bindTemplateNodes=m,e.prototype.bindTemplate=h}(t,e),e);console.error("Component must include ElementMeta to compile")}function b(t,e){return function(o,s,i){const{onInit:l=y,onDestroy:r=y}=o,a=Symbol(s);o.onInit=function(){l.call(this),function(){const o=this[a]=((...t)=>{i.value.apply(this,t)});this.emitter||(this.emitter=new n(this),e&&(this.elementMeta.eventMap[t]={key:t,handler:s},this.emitter.channels[e].onmessage=(e=>{this[this.elementMeta.eventMap[t].handler](e.data)}))),this.addEventListener(t,o)}.call(this)},o.onDestroy=function(){r.call(this),function(){this.removeEventListener(t,this[a])}.call(this)}}}class M extends HTMLElement{constructor(){super(),function(t,e){const n=t.attachShadow(e||{}),o=document.createElement("template");o.innerHTML=t.template,n.appendChild(o.content.cloneNode(!0)),t.bindTemplate()}(this,{mode:"open"}),this.onInit&&this.onInit()}}class g extends HTMLButtonElement{constructor(){super(),function(t,e){const n=document.createElement("template");n.innerHTML=t.elementMeta.template,t.appendChild(n.content.cloneNode(!0)),t.bindTemplate()}(this),o(this),this.onInit&&this.onInit()}}class x extends HTMLInputElement{constructor(){super(),o(this),this.onInit&&this.onInit()}}var C,E;return t.MyButtonComponent=class extends g{constructor(){super(),this.state.model="Click"}onClick(t){this.emitter.broadcast("bang")}onKeyUp(t){"Enter"===t.key&&this.emitter.broadcast("bang")}},e([(C="bang",E={bubbles:!0,composed:!0},function(t,e,o){const{onInit:s=y}=t;t.onInit=function(){s.call(this),function(){this.emitter||(this.emitter=new n(this)),this.emitter.set(C,new CustomEvent(C,E||{}))}.call(this)}}),b("click")],t.MyButtonComponent.prototype,"onClick",null),e([b("keyup")],t.MyButtonComponent.prototype,"onKeyUp",null),t.MyButtonComponent=e([f({selector:"my-button",template:d`{{model}}`,style:p`:host{background:#181818;cursor:pointer;color:#fff;font-weight:400}`})],t.MyButtonComponent),customElements.define("my-button",t.MyButtonComponent,{extends:"button"}),t.MyInputComponent=class extends x{constructor(){super()}onFocus(t){this.value="input"}},e([b("focus")],t.MyInputComponent.prototype,"onFocus",null),t.MyInputComponent=e([f({selector:"my-input",style:p`:host{background:#181818;border:0;color:#fff}`})],t.MyInputComponent),customElements.define("my-input",t.MyInputComponent,{extends:"input"}),t.MyListComponent=class extends M{constructor(){super(),this.currentIndex=0}deactivateElement(t){t.setAttribute("tabindex","-1"),t.querySelector("my-item").setAttribute("state","")}activateElement(t){t.setAttribute("tabindex","0"),t.querySelector("my-item").setAttribute("state","--selected")}connectedCallback(){this.setAttribute("tabindex","0")}onFocus(t){for(const t of this.children[0].children)t===this.children[0].children[this.currentIndex]?this.activateElement(t):this.deactivateElement(t),t.addEventListener("click",e=>{i(t).forEach(t=>{this.deactivateElement(t)}),this.activateElement(t),this.onSubmit(e)})}onKeydown(t){const e=this.querySelector('[tabindex]:not([tabindex="-1"])'),n=i(e);this.currentIndex=l(e),13===t.keyCode&&this.onSubmit(t),38===t.keyCode&&(0===this.currentIndex?this.currentIndex=n.length-1:this.currentIndex-=1,n.forEach(t=>{l(t)===this.currentIndex?this.activateElement(t):this.deactivateElement(t)})),40===t.keyCode&&(this.currentIndex===n.length-1?this.currentIndex=0:this.currentIndex+=1,n.forEach(t=>{l(t)===this.currentIndex?this.activateElement(t):this.deactivateElement(t)}))}onSubmit(t){}},e([b("focus")],t.MyListComponent.prototype,"onFocus",null),e([b("keydown")],t.MyListComponent.prototype,"onKeydown",null),t.MyListComponent=e([f({selector:"my-list",template:d`<slot name=menu></slot>`,style:p`:host{display:block;background:#181818;width:200px;height:200px;color:#fff;padding:1em;border-radius:8px}`})],t.MyListComponent),customElements.define("my-list",t.MyListComponent),t.MyItemComponent=class extends M{constructor(){super()}onBang(t){"--selected"===this.getAttribute("state")?this.setAttribute("state",""):this.setAttribute("state","--selected")}},e([b("bang","default")],t.MyItemComponent.prototype,"onBang",null),t.MyItemComponent=e([f({selector:"my-item",template:d`<p><span><slot name=msg>item</slot></span></p>`,style:p`:host{display:block;cursor:pointer}:host([state='--selected']){background:#ff69b4;color:#000;font-weight:700}`})],t.MyItemComponent),customElements.define("my-item",t.MyItemComponent),t}({});
//# sourceMappingURL=main.js.map