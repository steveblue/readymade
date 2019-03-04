var app=function(t){"use strict";function e(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}class i{constructor(t,e){this.target=t,this.channels={default:new BroadcastChannel("default")},e&&this.setChannel(e),this.events={}}get(t){return this.events[t]}set(t,e){return this.events[t]=e,this.get(t)}emit(t){"string"==typeof t&&(t=this.events[t]),this.target.dispatchEvent(t)}broadcast(t,e){"string"==typeof t&&(t=this.events[t]),this.target.dispatchEvent(t);const i={bubbles:t.bubbles,cancelBubble:t.cancelBubble,cancelable:t.cancelable,defaultPrevented:t.defaultPrevented,detail:t.detail,timeStamp:t.timeStamp,type:t.type};e?this.channels[e].postMessage(i):this.channels.default.postMessage(i)}setChannel(t){this.channels[t]=new BroadcastChannel(t),this.channels[t].onmessage=(e=>{for(const i in this.target.elementMeta.eventMap)i.includes(t)&&i.includes(e.data.type)&&this.target[this.target.elementMeta.eventMap[i].handler](e.data)})}removeChannel(t){this.channels[t].close(),delete this.channels[t]}}const s=/\{\{(\s*)(.*?)(\s*)\}\}/g,n=" __state";class o{constructor(t){this.$flatMap={},this.$parent=t,this.$flatMap={},this.$parentId=function(){let t="";const e="abcdefghijklmnopqrstuvwxyz";for(;t.length<3;)t+=e[Math.floor(Math.random()*e.length)];return t}(),this.create()}setNode(t,e,i){const s=this.$parentId+"-"+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(24)}).slice(0,6),n=t.cloneNode(!0);t.setAttribute(s,""),n.setAttribute(s,""),this.$flatMap[s]||(this.$flatMap[s]={id:s,node:n},e&&i&&this.updateNode(t,e,i))}updateNode(t,e,i){const n=new RegExp(`{{(s*)(${e})(s*)}}`,"gi"),o=this.getElementByAttribute(t)[0].nodeName,a=this.$flatMap[o].node;let r;for(const e of a.attributes)(r=e.nodeName).includes("attr.")&&!a.getAttribute(e.nodeName.replace("attr.",""))&&(r=e.nodeName.replace("attr.",""),a.setAttribute(r,e.nodeValue.replace(s,"")),t.removeAttribute(e.nodeName)),e.nodeValue.match(n,"gi")&&t.setAttribute(r,e.nodeValue.replace(n,i)),e.nodeName.includes("attr.")&&t.removeAttribute(e.nodeName);a.textContent.match(n)&&(t.textContent=a.textContent.replace(n,i))}create(){const t=document.createTreeWalker(this.$parent,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>NodeFilter.FILTER_ACCEPT},!1);for(;t.nextNode();)this.setNode(t.currentNode)}getElementByAttribute(t){return Array.from(t.attributes).filter(t=>/[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(t.nodeName))}update(t,e){const i=document.createTreeWalker(this.$parent,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>NodeFilter.FILTER_ACCEPT},!1);for(;i.nextNode();)this.getElementByAttribute(i.currentNode).length>0?this.updateNode(i.currentNode,t,e):this.setNode(i.currentNode,t,e);return this.$parent}}class a{constructor(t){this.$parent=t,this.$tree=new o(this.$parent)}update(t,e){this.$tree.update(t,e),this.$parent.onUpdate&&this.$parent.onUpdate()}}class r{constructor(t){this.$parent=t}set(t,e,i){const s={[e]:{previousValue:t[e],newValue:i}};return t[e]=i,this.$parent.$state["node"+n].update(e,t[e]),t.onStateChange&&t.onStateChange(s),!0}}function l(t,e){this.state[t]=e}function d(){this.$state={},this.$state["handler"+n]=new r(this),this.$state["node"+n]=new a(this.shadowRoot?this.shadowRoot:this),this.state=new Proxy(this,this.$state["handler"+n])}const c=(...t)=>t,h=(...t)=>t;function p(t){if(t)return e=>(function(t,e){e.prototype.elementMeta=Object.assign(e.elementMeta?e.elementMeta:{},t),e.prototype.elementMeta.eventMap={},e.prototype.template=`<style>${t.style}</style>${t.template}`,e.prototype.bindTemplate=d,e.prototype.setState=l}(t,e),e);console.error("Component must include ElementMeta to compile")}function u(t,e,s){return function(n,o,a){const r=s||"default";let l="";n[l=t?"$emit"+r+t:"$emit"+r]||(n[l]=function(){(function(t,s){this.emitter||(this.emitter=new i(this,s)),t&&this.emitter.set(t,new CustomEvent(t,e||{})),s&&!this.emitter.channels[s]&&this.emitter.setChannel(s)}).call(this,t,s)}),n.bindEmitters=function(){(function(){for(const t in this)t.includes("$emit")&&this[t].call(this)}).call(this)}}}function m(t,e){return function(s,n,o){const a=Symbol(n);let r="";s[r=e?"$listen"+t+e:"$listen"+t]||(s[r]={},s[r].onListener=function(){(function(t,e){const s=this[a]=((...t)=>{o.value.apply(this,t)});this.emitter||(this.emitter=new i(this,e||null)),this.elementMeta.eventMap[r]={key:t,handler:n},this.addEventListener(t,s)}).call(this,t,e)},s[r].onDestroyListener=function(){(function(){this.removeEventListener(t,this[a])}).call(this,t,e)}),s.bindListeners=function(){(function(){for(const t in this)t.includes("$listen")&&this[t].onListener.call(this)}).call(this)}}}class g extends HTMLElement{constructor(){super(),function(t,e){const i=t.attachShadow(e||{}),s=document.createElement("template");s.innerHTML=t.template,i.appendChild(s.content.cloneNode(!0)),t.bindTemplate()}(this,{mode:"open"}),this.bindEmitters&&this.bindEmitters(),this.bindListeners&&this.bindListeners(),this.onInit&&this.onInit()}}return t.RMainNavComponent=class extends g{constructor(){super(),this.isNavOpen=!1}connectedCallback(){const t=this.shadowRoot.querySelector('[link="side-nav"]'),e=this.shadowRoot.querySelector('[link="resource"]');this.state.resourceLinkFillColor="#cfcfcf",this.state.size="44px",e.addEventListener("mouseenter",()=>{this.state.resourceLinkFillColor="#efefef"}),e.addEventListener("mouseleave",()=>{this.state.resourceLinkFillColor="#cfcfcf"}),t.addEventListener("click",()=>{t.classList.contains("is--dark")?(this.emitter.broadcast("close","sidenav"),t.classList.remove("is--dark")):(this.emitter.broadcast("open","sidenav"),t.classList.add("is--dark"))})}onClose(){this.shadowRoot.querySelector('[link="side-nav"]').classList.remove("is--dark")}},e([u("open",{},"sidenav"),u("close",{},"sidenav")],t.RMainNavComponent.prototype,"connectedCallback",null),e([m("close","sidenav")],t.RMainNavComponent.prototype,"onClose",null),t.RMainNavComponent=e([p({selector:"r-main-nav",style:h`:host{display:block;position:fixed;top:0;width:100%;height:60px;margin-right:40px;font-weight:700;z-index:9999;user-select:none}nav{width:100%}ul{margin-block-start:0;margin-block-end:0;padding-inline-start:0;padding:0;margin:0;list-style:none;-webkit-margin-start:0;-webkit-margin-end:0;-webkit-padding-start:0;-webkit-margin-before:0;-webkit-margin-after:0}ul li{display:inline-block;cursor:pointer;height:100%;padding:1em;width:44px;height:44px;cursor:pointer}ul.left{float:left}ul.left li{margin-right:0;padding:0;width:44px;height:44px;position:absolute;left:4px;top:4px}ul.left li.is--dark{color:#222}ul.left li.is--dark:hover{color:#000}ul.right{float:right;margin-right:2px}ul.right li{margin-left:0;padding-right:10px;text-align:right;transform:translateY(-10px)}`,template:c`<nav><ul class=left><li link=side-nav></li></ul><ul class=right><li link=resource><a href=https://github.com/readymade-ui/readymade target=_blank><svg width=25px height=25px viewBox="0 0 25 25"><defs></defs><g stroke=none stroke-width=1 fill=none fill-rule=evenodd><g transform="translate(3.000000, 2.000000)" fill={{resourceLinkFillColor}} fill-rule=nonzero><path d="M3.94399028,5.10104103 C2.92388422,5.10104103 2.04650906,5.44611145 1.3097658,6.134109 C0.545735749,6.87140233 0.161621741,7.79087569 0.161621741,8.89252909 C0.161621741,9.62767912 0.369421122,10.31782 0.789217852,10.9608083 C1.16493593,11.5587875 1.55534688,11.9424372 2.06959788,12.1096142 L2.06959788,12.1546234 C1.55534688,12.3689528 1.32655767,12.9047765 1.32655767,13.7620943 C1.32655767,14.4200857 1.55534688,14.9109002 2.06959788,15.2323944 L2.06959788,15.2774036 C0.650684932,15.7510716 0,16.634109 0,17.9200857 C0,19.0388855 0.476469289,19.857624 1.40841803,20.3784446 C2.14306231,20.7921004 3.08760495,21 4.22735307,21 C7.00220946,21 8.39383562,19.8126148 8.39383562,17.4378445 C8.39383562,15.9525413 7.32335395,15.0394979 5.17819266,14.7030006 C4.68283252,14.625842 4.30921343,14.4415187 4.05313743,14.1521739 C3.85793195,13.9528475 3.7613787,13.7535211 3.7613787,13.5541947 C3.7613787,12.988365 4.06153336,12.6582976 4.66184269,12.5661359 C5.57699956,12.4289651 6.32423774,11.9960196 6.90145824,11.2672994 C7.47867875,10.5385793 7.76833849,9.68554807 7.76833849,8.70606246 C7.76833849,8.39957134 7.67808219,8.06950398 7.55844012,7.71800367 C7.94885108,7.62584201 8.22171896,7.54225352 8.42741935,7.46509492 L8.42741935,5.10104103 C7.5227574,5.46968769 6.67896597,5.65186773 5.95901458,5.65186773 C5.32931949,5.28536436 4.67863456,5.10104103 3.94399028,5.10104103 Z M4.19167035,16.5698102 C5.45106054,16.5698102 6.08285462,16.9598898 6.08285462,17.7421923 C6.08285462,18.569504 5.50563411,18.9831598 4.34909412,18.9831598 C3.02883341,18.9831598 2.36765356,18.584507 2.36765356,17.7872015 C2.36765356,16.9748928 2.97635882,16.5698102 4.19167035,16.5698102 Z M4.03424658,10.5021433 C3.08970393,10.5021433 2.61533363,9.97274954 2.61533363,8.91610533 C2.61533363,7.78230251 3.08760495,7.21647275 4.03424658,7.21647275 C4.48342908,7.21647275 4.83605833,7.3922229 5.09213433,7.7458665 C5.3020327,8.06736069 5.40698188,8.45101041 5.40698188,8.89467238 C5.40698188,9.96631966 4.94940345,10.5021433 4.03424658,10.5021433 Z M10.8748343,0 C10.4403447,0 10.0688246,0.169320269 9.76027397,0.505817514 C9.45172338,0.842314758 9.29849757,1.24954072 9.29849757,1.72320882 C9.29849757,2.18187385 9.45172338,2.58052664 9.76027397,2.91916718 C10.0688246,3.25566442 10.4382457,3.42498469 10.8748343,3.42498469 C11.294631,3.42498469 11.6598542,3.25566442 11.9663058,2.91916718 C12.2748564,2.58266993 12.4280822,2.18401715 12.4280822,1.72320882 C12.4280822,1.24739743 12.2748564,0.842314758 11.9663058,0.505817514 C11.6598542,0.169320269 11.29673,0 10.8748343,0 Z M12.1363235,5.25107165 L9.59235528,5.25107165 C9.62174105,5.544703 9.57976138,5.99050827 9.57976138,6.71065524 L9.57976138,13.8585426 C9.57976138,14.5936926 9.62174105,15.1873852 9.59235528,15.418861 L12.1363235,15.418861 C12.1069377,15.0823637 12.0271763,14.5036742 12.0271763,13.7213717 L12.0271763,6.66350276 C12.0271763,5.99050827 12.1069377,5.544703 12.1363235,5.25107165 Z M17.7448078,13.2134109 C17.0836279,13.2134109 16.7582855,12.6990202 16.7582855,11.6745254 L16.7582855,7.43508879 L17.7595007,7.43508879 C17.9400133,7.43508879 18.101635,7.42437232 18.3052364,7.43937538 C18.5088378,7.45437844 18.5885992,7.44366197 18.6935484,7.44366197 L18.6935484,5.25107165 L16.7603844,5.25107165 L16.7603844,4.27372933 C16.7603844,3.90508267 16.817057,3.57072872 16.8611357,3.36068585 L14.25,3.36068585 C14.2940787,3.57072872 14.2898807,3.8922229 14.2898807,4.32088181 L14.2898807,5.25107165 L13.1585285,5.25107165 L13.1585285,7.44580527 C13.4670791,7.40079608 13.742046,7.37721984 13.9372514,7.37721984 L14.2898807,7.40079608 L14.2898807,7.41365585 L14.2898807,11.5609308 C14.2898807,12.8469075 14.4494034,13.7899571 14.764251,14.3879363 C15.1840477,15.1852419 15.920791,15.5838947 17.0164605,15.5838947 C17.7972824,15.5838947 18.485749,15.4317208 19,15.1252296 L19,12.8233313 C18.5906982,13.0826699 18.2107821,13.2134109 17.7448078,13.2134109 Z"></path></g></g></svg></a></li></ul></nav>`})],t.RMainNavComponent),customElements.define("r-main-nav",t.RMainNavComponent),t.RSideNavComponent=class extends g{constructor(){super(),this.direction="forwards",this.state.size="10000px",this.state.strokeColor="#cfcfcf",this.state.fillColor="#cfcfcf",this.state.shadowColor="#c0c0c0",this.state.triPoints="7,9 7,34 24,22",this.state.shadowPoints="7,34 22,32 24,22",this.points={tri:{a:34,b:24,c:22},shadow:{a:34,b:24,c:22,d:32}}}connectedCallback(){this.nav=this.shadowRoot.querySelector("nav"),this.background=this.shadowRoot.querySelector(".background"),this.shadow=this.shadowRoot.querySelector(".shadow"),Array.from(this.shadowRoot.querySelectorAll("a")).forEach(t=>{t.addEventListener("click",t=>{document.querySelector(t.target.getAttribute("data-link")).scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}),this.close()})})}close(){"is--inactive"!==this.status&&(this.status="is--inactive",this.direction="reverse",this.emitter.broadcast("close","sidenav"),this.player=this.animate([{x:0},{x:100}],{duration:150,fill:"forwards",easing:"cubic-bezier(0.42, 0, 0.88, 1)"}),setTimeout(()=>{this.classList.remove("is--active")},50),setTimeout(()=>{this.shadow.classList.remove("is--hidden")},100),setTimeout(()=>{this.nav.classList.remove("is--active")},50),this.player.play(),this.update())}open(t){"is--active"!==this.status&&(this.direction="forwards",this.status="is--active",this.player=this.animate([{x:100},{x:0}],{duration:1500,fill:"forwards",easing:"cubic-bezier(0.42, 0, 0.88, 1)"}),this.classList.add("is--active"),this.shadow.classList.add("is--hidden"),this.nav.classList.add("is--active"),this.player.play(),this.update())}scale(t,e,i,s,n){return(t-e)/(i-e)*(n-s)+s}update(){const t=this.player.currentTime;"forwards"===this.direction&&(this.points.tri.a=this.scale(t,0,350,34,3444),this.points.tri.b=this.scale(t,0,350,24,2444),this.points.tri.c=this.scale(t,0,350,22,2222),this.points.shadow.d=this.scale(t,0,350,32,3222)),"reverse"===this.direction&&(this.points.tri.a=this.scale(t,0,150,3444,34),this.points.tri.b=this.scale(t,0,150,2444,24),this.points.tri.c=this.scale(t,0,150,2222,22),this.points.shadow.d=this.scale(t,0,150,3222,32)),this.state.triPoints=`7,9 7,${this.points.tri.a} ${this.points.tri.b},${this.points.tri.c}`,this.state.shadowPoints=`7,${this.points.tri.a} ${this.points.tri.c},${this.points.shadow.d} ${this.points.tri.b},${this.points.tri.c}`,"running"!==this.player.playState&&"pending"!==this.player.playState||window.requestAnimationFrame(this.update.bind(this))}},e([u("close",{},"sidenav")],t.RSideNavComponent.prototype,"connectedCallback",null),e([m("close","sidenav")],t.RSideNavComponent.prototype,"close",null),e([m("open","sidenav")],t.RSideNavComponent.prototype,"open",null),t.RSideNavComponent=e([p({selector:"r-side-nav",style:h`:host{display:block;position:fixed;top:0;left:0;height:100%;width:0;max-width:320px;z-index:8888;color:#000;overflow:visible}:host.is--active{width:320px}.is--hidden{display:none}svg{overflow:visible;transform:translateX(0)}nav{display:block;position:relative;width:0%;height:100%;-webkit-clip-path:url(#c1);overflow:hidden}nav.is--active{width:1400px}ul{margin-block-start:0;margin-block-end:0;padding-inline-start:0;width:100%;display:block}ul li{display:block;cursor:pointer;width:100%;opacity:.8;cursor:pointer;padding-inline-start:0;width:100%;max-width:320px;font-weight:700}ul li>span{display:inline-block;position:relative;height:22px;width:calc(100% - 56px);margin-left:20px;padding-top:8px;padding-bottom:8px;padding-left:0;padding-right:0}ul li a:link,ul li a:visited{opacity:.8;color:#000;text-decoration:none}ul li:hover a:link,ul li:hover a:visited{opacity:1;color:#fff}ul.top{position:absolute;top:0;margin-top:240px}ul.bottom{position:absolute;bottom:0}ul.bottom li{margin-bottom:10px}`,template:c`<svg class=background width=54px height=60px><clipPath id=c1><polygon stroke-width=3 class=polygon attr.points={{triPoints}}></polygon></clipPath><g stroke=none fill=none fill-rule=evenodd><polygon fill={{shadowColor}} stroke-width=0 class=shadow attr.points={{shadowPoints}}></polygon><polygon fill={{fillColor}} stroke-width=0 class=polygon attr.points={{triPoints}}></polygon></g></svg><nav><ul class=top><li><span><a data-link=#intro>Intro</a></span></li><li><span><a data-link=#started>Getting Started</a></span></li><li><span><a data-link=#docs>Using Readymade</a></span></li><li><span><a data-link=#resources>Resources</a></span></li></ul></nav>`})],t.RSideNavComponent),customElements.define("r-side-nav",t.RSideNavComponent),t.RHeadlineComponent=class extends g{constructor(){super(),this.state.copy="",this.state.copySize=""}static get observedAttributes(){return["headline","size"]}attributeChangedCallback(t,e,i){switch(t){case"headline":this.setState("copy",i);break;case"size":this.setState("copySize",i)}}},t.RHeadlineComponent=e([p({selector:"r-headline",style:h`h1{font-family:'Major Mono Display',sans-serif;padding-left:1em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-margin-before:0;-webkit-margin-after:0}h1,span{font-size:1em;letter-spacing:-.04em;margin-block-start:0;margin-block-end:0}h1.is--small,span.is--small{font-size:12px}h1.is--medium,span.is--medium{font-size:6em}h1.is--large,span.is--large{font-size:12em;padding-left:0}`,template:c`<h1 class={{copySize}}>{{copy}}</h1>`})],t.RHeadlineComponent),customElements.define("r-headline",t.RHeadlineComponent),t.RLogoComponent=class extends g{constructor(){super(),this.sizes=["is--small","is--medium","is--large"],this.state.heading="R",this.state.heading2="readymade"}static get observedAttributes(){return["size"]}attributeChangedCallback(t,e,i){switch(t){case"size":this.setSize(i)}}setSize(t){this.sizes.includes(t)&&this.setState("size",t)}update(){this.state.heading=Math.round(100*Math.random()).toString(),this.state.heading2=Math.round(100*Math.random()).toString()}},t.RLogoComponent=e([p({selector:"r-logo",style:h`:host{display:block;user-select:none}`,template:c`<r-headline headline={{heading}} size={{size}}></r-headline><r-headline headline={{heading2}}></r-headline>`})],t.RLogoComponent),customElements.define("r-logo",t.RLogoComponent),t.RStatsComponent=class extends g{constructor(){super(),this.shadowRoot.querySelector("slot").addEventListener("slotchange",t=>this.onSlotChange(t))}onSlotChange(t){this.animateIn()}animateIn(){const t=this.shadowRoot.querySelector("slot").assignedNodes()[1];Array.from(t.children).forEach((t,e)=>{t.animate([{opacity:"0",color:"#000"},{opacity:"0",offset:.1*e},{opacity:"1",color:"#fff"}],{duration:2e3})})}},t.RStatsComponent=e([p({selector:"r-stats",style:h`:host{display:block}::slotted(ul){display:inline-block;position:relative;left:50%;transform:translateX(-50%);font-weight:300}`,template:c`<slot></slot>`})],t.RStatsComponent),customElements.define("r-stats",t.RStatsComponent),t.RCodeComponent=class extends g{constructor(){super()}connectedCallback(t){this.onSlotChange()}static get observedAttributes(){return["type"]}attributeChangedCallback(t,e,i){switch(t){case"type":this.setState("type",this.getAttribute("type"))}}onSlotChange(){const t=this.shadowRoot.querySelector("slot").assignedNodes()[1].textContent;this.shadowRoot.querySelector("code").innerHTML=Prism.highlight(t,Prism.languages[this.getAttribute("type")],this.getAttribute("type"))}},t.RCodeComponent=e([p({selector:"r-code",style:h`:host{display:block;padding-top:1em;padding-bottom:1em}code[class*=language-],pre[class*=language-]{-moz-tab-size:2;-o-tab-size:2;tab-size:2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;white-space:pre;white-space:pre-wrap;word-wrap:normal;font-family:'Source Code Pro','Courier New',monospace;font-size:14px;font-weight:500;color:#e0e2e4;text-shadow:none}::selection{background:#ff7de9}::-moz-selection{background:#ff7de9}:not(pre)>code[class*=language-],pre[class*=language-]{background:#0e1014}pre[class*=language-]{padding:15px;border-radius:4px;border:1px solid #0e1014;overflow:auto}pre[class*=language-]{position:relative}pre[class*=language-] code{white-space:pre;display:block}:not(pre)>code[class*=language-]{padding:.2em .2em;border-radius:.3em;border:.13em solid #7a6652;box-shadow:1px 1px .3em -.1em #000 inset}.token.namespace{opacity:.7}.token.function{color:rgba(117,191,255,1)}.token.class-name{color:#e0e2e4}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#208c9a}.token.boolean,.token.number,.token.operator{color:#ff7de9}.token.attr-name,.token.string{color:#e6d06c}.language-css .token.string,.style .token.string,.token.entity,.token.url{color:#bb9cf1}.token.inserted,.token.selector{color:#b6babf}.token.atrule,.token.attr-value,.token.deleted,.token.important,.token.keyword{color:#ff7de9}.token.regex,.token.statement{color:#ffe4a6}.token.placeholder,.token.variable{color:#ff7de9}.token.bold,.token.important,.token.statement{font-weight:700}.token.punctuation{color:#a9bacb}.token.entity{cursor:help}.token.italic{font-style:italic}code.language-markup{color:#b1b1b3}code.language-markup .token.tag{color:#75bfff}code.language-markup .token.attr-name{color:#ff97e9}code.language-markup .token.attr-value{color:#d7d7db}code.language-markup .token.script,code.language-markup .token.style{color:#75bfff99}code.language-markup .token.script .token.keyword{color:#9f9f9f}pre[class*=language-][data-line]{position:relative;padding:1em 0 1em 3em}pre[data-line] .line-highlight{position:absolute;left:0;right:0;padding:0;margin-top:1em;background:rgba(255,255,255,.08);pointer-events:none;line-height:inherit;white-space:pre}pre[data-line] .line-highlight:before,pre[data-line] .line-highlight[data-end]:after{content:attr(data-start);position:absolute;top:.4em;left:.6em;min-width:1em;padding:.2em .5em;background-color:rgba(255,255,255,.4);color:#000;font:bold 65%/1 sans-serif;height:1em;line-height:1em;text-align:center;border-radius:999px;text-shadow:none;box-shadow:0 1px 1px rgba(255,255,255,.7)}pre[data-line] .line-highlight[data-end]:after{content:attr(data-end);top:auto;bottom:.4em}`,template:c`<pre class=language-{{type}}><code class=language-{{type}}></code></pre><slot hidden></slot>`})],t.RCodeComponent),customElements.define("r-code",t.RCodeComponent),t}({});
