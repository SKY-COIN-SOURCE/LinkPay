import{d as J,R as P,j as i,a as ee,e as te,r as c,m as b,C as S,A as _,c as ae,Z as ie,f as re,g as q,h as ne,i as se,M as oe,k as le,l as ce,n as pe}from"./index-BPCgxgQJ.js";import{C as de}from"./copy-DFD57Yez.js";import{S as xe}from"./sparkles-kt3UXCij.js";import{C as ge}from"./chevron-down-WwqoThNK.js";import{E as ue}from"./eye-off-Cmunedmd.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],fe=J("calendar",he);var z={linear:function(e,t,n,r){var a=n-t;return a*e/r+t},easeInQuad:function(e,t,n,r){var a=n-t;return a*(e/=r)*e+t},easeOutQuad:function(e,t,n,r){var a=n-t;return-a*(e/=r)*(e-2)+t},easeInOutQuad:function(e,t,n,r){var a=n-t;return(e/=r/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,n,r){var a=n-t;return a*(e/=r)*e*e+t},easeOutCubic:function(e,t,n,r){var a=n-t;return a*((e=e/r-1)*e*e+1)+t},easeInOutCubic:function(e,t,n,r){var a=n-t;return(e/=r/2)<1?a/2*e*e*e+t:a/2*((e-=2)*e*e+2)+t},easeInQuart:function(e,t,n,r){var a=n-t;return a*(e/=r)*e*e*e+t},easeOutQuart:function(e,t,n,r){var a=n-t;return-a*((e=e/r-1)*e*e*e-1)+t},easeInOutQuart:function(e,t,n,r){var a=n-t;return(e/=r/2)<1?a/2*e*e*e*e+t:-a/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(e,t,n,r){var a=n-t;return a*(e/=r)*e*e*e*e+t},easeOutQuint:function(e,t,n,r){var a=n-t;return a*((e=e/r-1)*e*e*e*e+1)+t},easeInOutQuint:function(e,t,n,r){var a=n-t;return(e/=r/2)<1?a/2*e*e*e*e*e+t:a/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(e,t,n,r){var a=n-t;return-a*Math.cos(e/r*(Math.PI/2))+a+t},easeOutSine:function(e,t,n,r){var a=n-t;return a*Math.sin(e/r*(Math.PI/2))+t},easeInOutSine:function(e,t,n,r){var a=n-t;return-a/2*(Math.cos(Math.PI*e/r)-1)+t},easeInExpo:function(e,t,n,r){var a=n-t;return e==0?t:a*Math.pow(2,10*(e/r-1))+t},easeOutExpo:function(e,t,n,r){var a=n-t;return e==r?t+a:a*(-Math.pow(2,-10*e/r)+1)+t},easeInOutExpo:function(e,t,n,r){var a=n-t;return e===0?t:e===r?t+a:(e/=r/2)<1?a/2*Math.pow(2,10*(e-1))+t:a/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(e,t,n,r){var a=n-t;return-a*(Math.sqrt(1-(e/=r)*e)-1)+t},easeOutCirc:function(e,t,n,r){var a=n-t;return a*Math.sqrt(1-(e=e/r-1)*e)+t},easeInOutCirc:function(e,t,n,r){var a=n-t;return(e/=r/2)<1?-a/2*(Math.sqrt(1-e*e)-1)+t:a/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(e,t,n,r){var a=n-t,s,o,l;return l=1.70158,o=0,s=a,e===0?t:(e/=r)===1?t+a:(o||(o=r*.3),s<Math.abs(a)?(s=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/s),-(s*Math.pow(2,10*(e-=1))*Math.sin((e*r-l)*(2*Math.PI)/o))+t)},easeOutElastic:function(e,t,n,r){var a=n-t,s,o,l;return l=1.70158,o=0,s=a,e===0?t:(e/=r)===1?t+a:(o||(o=r*.3),s<Math.abs(a)?(s=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/s),s*Math.pow(2,-10*e)*Math.sin((e*r-l)*(2*Math.PI)/o)+a+t)},easeInOutElastic:function(e,t,n,r){var a=n-t,s,o,l;return l=1.70158,o=0,s=a,e===0?t:(e/=r/2)===2?t+a:(o||(o=r*(.3*1.5)),s<Math.abs(a)?(s=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/s),e<1?-.5*(s*Math.pow(2,10*(e-=1))*Math.sin((e*r-l)*(2*Math.PI)/o))+t:s*Math.pow(2,-10*(e-=1))*Math.sin((e*r-l)*(2*Math.PI)/o)*.5+a+t)},easeInBack:function(e,t,n,r,a){var s=n-t;return a===void 0&&(a=1.70158),s*(e/=r)*e*((a+1)*e-a)+t},easeOutBack:function(e,t,n,r,a){var s=n-t;return a===void 0&&(a=1.70158),s*((e=e/r-1)*e*((a+1)*e+a)+1)+t},easeInOutBack:function(e,t,n,r,a){var s=n-t;return a===void 0&&(a=1.70158),(e/=r/2)<1?s/2*(e*e*(((a*=1.525)+1)*e-a))+t:s/2*((e-=2)*e*(((a*=1.525)+1)*e+a)+2)+t},easeInBounce:function(e,t,n,r){var a=n-t,s;return s=z.easeOutBounce(r-e,0,a,r),a-s+t},easeOutBounce:function(e,t,n,r){var a=n-t;return(e/=r)<1/2.75?a*(7.5625*e*e)+t:e<2/2.75?a*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?a*(7.5625*(e-=2.25/2.75)*e+.9375)+t:a*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(e,t,n,r){var a=n-t,s;return e<r/2?(s=z.easeInBounce(e*2,0,a,r),s*.5+t):(s=z.easeOutBounce(e*2-r,0,a,r),s*.5+a*.5+t)}},be=z;function me(e){return e*Math.PI/180}function d(e,t){return e+Math.random()*(t-e)}function ve(e,t){return Math.floor(e+Math.random()*(t-e+1))}var I;(function(e){e[e.Circle=0]="Circle",e[e.Square=1]="Square",e[e.Strip=2]="Strip"})(I||(I={}));var y;(function(e){e[e.Positive=1]="Positive",e[e.Negative=-1]="Negative"})(y||(y={}));const ye=1e3/60;class we{constructor(t,n,r,a){this.getOptions=n;const{colors:s,initialVelocityX:o,initialVelocityY:l}=this.getOptions();this.context=t,this.x=r,this.y=a,this.w=d(5,20),this.h=d(5,20),this.radius=d(5,10),this.vx=typeof o=="number"?d(-o,o):d(o.min,o.max),this.vy=typeof l=="number"?d(-l,0):d(l.min,l.max),this.shape=ve(0,2),this.angle=me(d(0,360)),this.angularSpin=d(-.2,.2),this.color=s[Math.floor(Math.random()*s.length)],this.rotateY=d(0,1),this.rotationDirection=d(0,1)?y.Positive:y.Negative}update(t){const{gravity:n,wind:r,friction:a,opacity:s,drawShape:o}=this.getOptions(),l=t/ye;this.x+=this.vx*l,this.y+=this.vy*l,this.vy+=n*l,this.vx+=r*l,this.vx*=a**l,this.vy*=a**l,this.rotateY>=1&&this.rotationDirection===y.Positive?this.rotationDirection=y.Negative:this.rotateY<=-1&&this.rotationDirection===y.Negative&&(this.rotationDirection=y.Positive);const h=.1*this.rotationDirection*l;if(this.rotateY+=h,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=s,this.context.lineCap="round",this.context.lineWidth=2,o&&typeof o=="function")o.call(this,this.context);else switch(this.shape){case I.Circle:{this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break}case I.Square:{this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break}case I.Strip:{this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h);break}}this.context.closePath(),this.context.restore()}}class je{constructor(t,n){this.x=0,this.y=0,this.w=0,this.h=0,this.lastNumberOfPieces=0,this.tweenProgress=0,this.tweenFrom=0,this.particles=[],this.particlesGenerated=0,this.removeParticleAt=a=>{this.particles.splice(a,1)},this.getParticle=()=>{const a=d(this.x,this.w+this.x),s=d(this.y,this.h+this.y);return new we(this.context,this.getOptions,a,s)},this.animate=a=>{const{canvas:s,context:o,particlesGenerated:l,lastNumberOfPieces:h}=this,{run:w,recycle:f,numberOfPieces:g,debug:O,tweenFunction:N,tweenDuration:C}=this.getOptions();if(!w)return!1;const j=this.particles.length,m=f?j:l;if(m<g){h!==g&&(this.tweenProgress=0,this.tweenFrom=m,this.lastNumberOfPieces=g),this.tweenProgress=Math.min(C,Math.max(0,this.tweenProgress+a));const u=N(this.tweenProgress,this.tweenFrom,g,C),x=Math.round(u-m);for(let M=0;M<x;M++)this.particles.push(this.getParticle());this.particlesGenerated+=x}O&&(o.font="12px sans-serif",o.fillStyle="#333",o.textAlign="right",o.fillText(`Particles: ${j}`,s.width-10,s.height-20));for(let u=this.particles.length-1;u>=0;u--){const x=this.particles[u];x.update(a),(x.y>s.height||x.y<-100||x.x>s.width+100||x.x<-100)&&(f&&m<=g?this.particles[u]=this.getParticle():this.removeParticleAt(u))}return j>0||m<g},this.canvas=t;const r=this.canvas.getContext("2d");if(!r)throw new Error("Could not get canvas context");this.context=r,this.getOptions=n}}const R={width:typeof window<"u"?window.innerWidth:300,height:typeof window<"u"?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:be.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0};class ke{constructor(t,n){this.lastFrameTime=0,this.setOptionsWithDefaults=a=>{const s={confettiSource:{x:0,y:0,w:this.canvas.width,h:0}};this._options={...s,...R,...a},Object.assign(this,a.confettiSource)},this.update=(a=0)=>{const{options:{run:s,onConfettiComplete:o,frameRate:l},canvas:h,context:w}=this,f=Math.min(a-this.lastFrameTime,50);if(l&&f<1e3/l){this.rafId=requestAnimationFrame(this.update);return}this.lastFrameTime=a-(l?f%l:0),s&&(w.fillStyle="white",w.clearRect(0,0,h.width,h.height)),this.generator.animate(f)?this.rafId=requestAnimationFrame(this.update):(o&&typeof o=="function"&&this.generator.particlesGenerated>0&&o.call(this,this),this._options.run=!1)},this.reset=()=>{this.generator&&this.generator.particlesGenerated>0&&(this.generator.particlesGenerated=0,this.generator.particles=[],this.generator.lastNumberOfPieces=0)},this.stop=()=>{this.options={run:!1},this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=void 0)},this.canvas=t;const r=this.canvas.getContext("2d");if(!r)throw new Error("Could not get canvas context");this.context=r,this.generator=new je(this.canvas,()=>this.options),this.options=n,this.update()}get options(){return this._options}set options(t){var a,s;const n=(a=this._options)==null?void 0:a.run,r=(s=this._options)==null?void 0:s.recycle;this.setOptionsWithDefaults(t),this.generator&&(Object.assign(this.generator,this.options.confettiSource),typeof t.recycle=="boolean"&&t.recycle&&r===!1&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),typeof t.run=="boolean"&&t.run&&n===!1&&this.update()}}const Ne=P.createRef();class F extends P.Component{constructor(t){super(t),this.canvas=P.createRef(),this.canvas=t.canvasRef||Ne}componentDidMount(){if(this.canvas.current){const t=E(this.props)[0];this.confetti=new ke(this.canvas.current,t)}}componentDidUpdate(){const t=E(this.props)[0];this.confetti&&(this.confetti.options=t)}componentWillUnmount(){this.confetti&&this.confetti.stop(),this.confetti=void 0}render(){const[t,n]=E(this.props),r={zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0,...n.style};return i.jsx("canvas",{width:t.width,height:t.height,ref:this.canvas,...n,style:r})}}F.defaultProps={...R};F.displayName="ReactConfetti";function E(e){const t={},n={},r={},a=[...Object.keys(R),"confettiSource","drawShape","onConfettiComplete","frameRate"],s=["canvasRef"];for(const o in e){const l=e[o];a.includes(o)?t[o]=l:s.includes(o)?s[o]=l:r[o]=l}return[t,r,n]}const Ce=P.forwardRef((e,t)=>i.jsx(F,{canvasRef:t,...e}));function Pe(){const e=ee(),{refreshLinks:t,refreshDashboard:n}=te(),[r,a]=c.useState(""),[s,o]=c.useState(""),[l,h]=c.useState("standard"),[w,f]=c.useState(""),[g,O]=c.useState(""),[N,C]=c.useState(""),[j,m]=c.useState(!1),[u,x]=c.useState(!1),[M,D]=c.useState(""),[k,T]=c.useState(null),[X,L]=c.useState(!1),[Q,A]=c.useState(!1),[B,U]=c.useState(!1);c.useEffect(()=>{if(k){L(!0);const p=setTimeout(()=>L(!1),4e3);return()=>clearTimeout(p)}},[k]);const W=async p=>{var Y;if(p.preventDefault(),!!r){D(""),x(!0);try{let v=r.trim();/^https?:\/\//i.test(v)||(v="https://"+v);const K=s.trim().toLowerCase(),G=await pe.create(v,K||"",l,{password:w||void 0,expiresAt:g?new Date(g).toISOString():void 0,maxClicks:N?parseInt(N):void 0,isPrivate:j}),Z=`${window.location.origin}/l/${G.slug}`;T({...G,short_url:Z}),t(),n()}catch(v){console.error(v),D((Y=v.message)!=null&&Y.includes("alias")?"Alias ocupado":v.message||"Error")}finally{x(!1)}}},H=()=>{k&&(navigator.clipboard.writeText(k.short_url),U(!0),setTimeout(()=>U(!1),2e3))},$=()=>{T(null),a(""),o(""),f(""),O(""),C(""),m(!1)};return k?i.jsxs("div",{className:"lp-create-shell",children:[i.jsx("style",{children:V}),X&&i.jsx("div",{className:"lp-confetti",children:i.jsx(Ce,{numberOfPieces:200,recycle:!1})}),i.jsx("div",{className:"lp-create-inner",children:i.jsxs(b.div,{className:"lp-success-card",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:[i.jsx("div",{className:"lp-success-glow"}),i.jsx("div",{className:"lp-success-icon",children:i.jsx(S,{size:32})}),i.jsxs("div",{className:"lp-success-badge",children:[l==="turbo"?"🚀 TURBO":"⚡ SMART"," LINK"]}),i.jsx("h2",{children:"¡Link creado!"}),i.jsxs("div",{className:"lp-success-url-box",children:[i.jsx("input",{readOnly:!0,value:k.short_url}),i.jsx("button",{onClick:H,className:B?"copied":"",children:B?i.jsx(S,{size:18}):i.jsx(de,{size:18})})]}),i.jsxs("div",{className:"lp-success-actions",children:[i.jsx("button",{onClick:$,className:"lp-btn-ghost",children:"Crear otro"}),i.jsxs("button",{onClick:()=>e("/app/links"),className:"lp-btn-primary",children:["Mis enlaces ",i.jsx(_,{size:16})]})]})]})})]}):i.jsxs("div",{className:"lp-create-shell",children:[i.jsx("style",{children:V}),i.jsx("div",{className:"lp-create-inner",children:i.jsxs("form",{className:"lp-create-form",onSubmit:W,children:[i.jsxs("div",{className:"lp-card-v2 lp-card-url",children:[i.jsx("div",{className:"lp-card-glow"}),i.jsxs("div",{className:"lp-input-group",children:[i.jsx("div",{className:"lp-input-icon",children:i.jsx(ae,{size:20})}),i.jsx("input",{type:"text",placeholder:"Pega tu URL aquí...",value:r,onChange:p=>a(p.target.value),required:!0})]})]}),i.jsxs("div",{className:"lp-card-v2 lp-card-alias",children:[i.jsx("div",{className:"lp-card-glow"}),i.jsxs("label",{className:"lp-alias-label",children:[i.jsx(xe,{size:14}),"Alias personalizado"]}),i.jsxs("div",{className:"lp-alias-input",children:[i.jsx("span",{children:"linkpay.gg/"}),i.jsx("input",{type:"text",placeholder:"mi-link",value:s,onChange:p=>o(p.target.value)})]})]}),i.jsxs("div",{className:"lp-mode-section",children:[i.jsxs("button",{type:"button",className:`lp-mode-btn ${l==="standard"?"active":""}`,onClick:()=>h("standard"),children:[i.jsx("div",{className:"lp-mode-icon standard",children:i.jsx(ie,{size:22})}),i.jsxs("div",{className:"lp-mode-info",children:[i.jsx("span",{className:"lp-mode-name",children:"Estándar"}),i.jsx("span",{className:"lp-mode-desc",children:"Equilibrio perfecto"})]}),l==="standard"&&i.jsx("div",{className:"lp-mode-check",children:i.jsx(S,{size:16})})]}),i.jsxs("button",{type:"button",className:`lp-mode-btn ${l==="turbo"?"active":""}`,onClick:()=>h("turbo"),children:[i.jsx("div",{className:"lp-mode-icon turbo",children:i.jsx(re,{size:22})}),i.jsxs("div",{className:"lp-mode-info",children:[i.jsx("span",{className:"lp-mode-name",children:"Turbo"}),i.jsx("span",{className:"lp-mode-desc",children:"Máximo ingreso"})]}),l==="turbo"&&i.jsx("div",{className:"lp-mode-check",children:i.jsx(S,{size:16})})]})]}),i.jsxs("button",{type:"button",className:"lp-advanced-btn",onClick:()=>A(!0),children:[i.jsx(q,{size:16}),i.jsx("span",{children:"Opciones avanzadas"}),i.jsx(ge,{size:16})]}),i.jsx(ne,{children:Q&&i.jsxs(i.Fragment,{children:[i.jsx(b.div,{className:"lp-modal-backdrop",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>A(!1)}),i.jsxs(b.div,{className:"lp-modal",initial:{opacity:0,y:100,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:80,scale:.95},transition:{type:"spring",damping:25,stiffness:300},children:[i.jsx("div",{className:"lp-modal-glow"}),i.jsx("div",{className:"lp-modal-handle",children:i.jsx("div",{className:"lp-modal-handle-bar"})}),i.jsxs(b.div,{className:"lp-modal-header",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[i.jsx("div",{className:"lp-modal-icon",children:i.jsx(q,{size:20})}),i.jsxs("div",{children:[i.jsx("h3",{children:"Opciones Avanzadas"}),i.jsx("p",{children:"Protege y personaliza tu enlace"})]})]}),i.jsxs("div",{className:"lp-modal-fields",children:[i.jsxs(b.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.15},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(se,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Contraseña"}),i.jsx("input",{type:"text",value:w,onChange:p=>f(p.target.value),placeholder:"Sin contraseña"})]})]}),i.jsxs(b.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(fe,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Fecha de expiración"}),i.jsx("input",{type:"datetime-local",value:g,onChange:p=>O(p.target.value)})]})]}),i.jsxs(b.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.25},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(oe,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Límite de clics"}),i.jsx("input",{type:"number",value:N,onChange:p=>C(p.target.value),placeholder:"Sin límite"})]})]}),i.jsxs(b.div,{className:"lp-modal-toggle-row",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.3},onClick:()=>m(!j),children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(ue,{size:18})}),i.jsxs("div",{className:"lp-modal-toggle-content",children:[i.jsx("span",{children:"Enlace privado"}),i.jsx("p",{children:"No aparece en tu lista pública"})]}),i.jsx("div",{className:`lp-modal-toggle ${j?"on":""}`,children:i.jsx("div",{className:"lp-modal-toggle-thumb"})})]})]}),i.jsxs(b.button,{className:"lp-modal-close-btn",onClick:()=>A(!1),initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.35},children:[i.jsx(S,{size:18}),"Aplicar"]})]})]})}),M&&i.jsxs("div",{className:"lp-error",children:[i.jsx(le,{size:16}),M]}),i.jsx("button",{type:"submit",disabled:u,className:"lp-submit",children:u?i.jsx(ce,{className:"lp-spin",size:20}):i.jsxs(i.Fragment,{children:["Crear link ",i.jsx(_,{size:18})]})})]})})]})}const V=`
  /* ═══════════════════════════════════════════════════════════════════════════
     ANIMATIONS - DASHBOARD GALAXY STYLE
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-spin { animation: lp-spin 1s linear infinite; }
  @keyframes lp-spin { 100% { transform: rotate(360deg); } }

  /* Floating orb animations */
  @keyframes lp-orb-float-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(60px, 40px) scale(1.1); }
    50% { transform: translate(30px, 80px) scale(0.95); }
    75% { transform: translate(-20px, 50px) scale(1.05); }
  }

  @keyframes lp-orb-float-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-50px, -40px) scale(1.08); }
    66% { transform: translate(-80px, 20px) scale(0.92); }
  }

  @keyframes lp-orb-float-3 {
    0%, 100% { transform: translateX(0) scale(1); }
    50% { transform: translateX(70px) scale(1.12); }
  }

  /* Card glow pulse */
  @keyframes lp-glow-pulse {
    0%, 100% { 
      opacity: 0.5;
      transform: scale(1);
    }
    50% { 
      opacity: 0.9;
      transform: scale(1.02);
    }
  }

  /* Ambient pulse */
  @keyframes lp-ambient-pulse {
    0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
  }

  /* Star particles drift */
  @keyframes lp-particles-drift {
    0% { transform: translateY(0); }
    100% { transform: translateY(-200px); }
  }

  /* Card hover lift */
  @keyframes lp-card-breathe {
    0%, 100% { 
      transform: translateY(-3px);
      box-shadow: 0 0 50px rgba(99, 102, 241, 0.12), 0 20px 40px -10px rgba(0, 0, 0, 0.6);
    }
    50% { 
      transform: translateY(-6px);
      box-shadow: 0 0 70px rgba(99, 102, 241, 0.18), 0 28px 55px -10px rgba(0, 0, 0, 0.7);
    }
  }

  /* Button glow */
  @keyframes lp-btn-glow {
    0%, 100% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.3), 0 12px 35px -8px rgba(59, 130, 246, 0.4); }
    50% { box-shadow: 0 0 60px rgba(139, 92, 246, 0.45), 0 18px 45px -8px rgba(59, 130, 246, 0.5); }
  }

  /* Float animation */
  @keyframes lp-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     SHELL - GALAXY BACKGROUND - VISUAL DRUG
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-shell {
    position: relative;
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #fff;
    isolation: isolate;
    overflow-x: hidden;
    max-width: 100vw;
  }

  /* Floating Orb 1 - INTENSE CYAN (Top-left) */
  .lp-create-shell::before {
    content: "";
    position: absolute;
    width: 700px;
    height: 700px;
    top: -200px;
    left: -250px;
    background: radial-gradient(circle, 
      rgba(34, 211, 238, 0.6) 0%, 
      rgba(34, 211, 238, 0.3) 25%,
      rgba(6, 182, 212, 0.15) 50%, 
      transparent 70%);
    filter: blur(40px);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
    animation: lp-orb-float-1 10s ease-in-out infinite;
    z-index: 0;
  }

  /* Floating Orb 2 - INTENSE PURPLE/MAGENTA (Bottom-right) */
  .lp-create-shell::after {
    content: "";
    position: absolute;
    width: 800px;
    height: 800px;
    bottom: -300px;
    right: -300px;
    background: radial-gradient(circle, 
      rgba(168, 85, 247, 0.55) 0%, 
      rgba(236, 72, 153, 0.3) 25%,
      rgba(139, 92, 246, 0.15) 50%, 
      transparent 70%);
    filter: blur(50px);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
    animation: lp-orb-float-2 13s ease-in-out infinite;
    z-index: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     INNER CONTAINER - AMBIENT EFFECTS
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-inner {
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 16px;
    z-index: 1;
  }

  /* Ambient pulse glow - INTENSIFIED */
  .lp-create-inner::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    background:
      radial-gradient(ellipse 60% 50% at 25% 15%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse 50% 60% at 75% 85%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 40%);
    filter: blur(30px);
    pointer-events: none;
    z-index: 0;
    animation: lp-ambient-pulse 6s ease-in-out infinite alternate;
  }

  /* Star particles - MORE VISIBLE */
  .lp-create-inner::after {
    content: "";
    position: absolute;
    inset: -150px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.8;
    background-image:
      radial-gradient(2px 2px at 15px 25px, rgba(255, 255, 255, 0.95), transparent),
      radial-gradient(1px 1px at 35px 65px, rgba(255, 255, 255, 0.7), transparent),
      radial-gradient(2px 2px at 75px 45px, rgba(34, 211, 238, 1), transparent),
      radial-gradient(3px 3px at 115px 75px, rgba(168, 85, 247, 0.9), transparent),
      radial-gradient(1px 1px at 165px 35px, rgba(255, 255, 255, 0.8), transparent),
      radial-gradient(2px 2px at 205px 95px, rgba(236, 72, 153, 0.85), transparent),
      radial-gradient(1px 1px at 55px 115px, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(2px 2px at 145px 15px, rgba(34, 197, 94, 0.8), transparent),
      radial-gradient(1px 1px at 255px 55px, rgba(255, 255, 255, 0.75), transparent),
      radial-gradient(3px 3px at 295px 85px, rgba(99, 102, 241, 0.9), transparent);
    background-size: 320px 140px;
    animation: lp-particles-drift 20s linear infinite;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     FORM
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    z-index: 2;
  }

  /* ─── CARDS - PREMIUM ANIMATED ────────────────────────────────────────────── */
  .lp-card-v2 {
    position: relative;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 60%),
      radial-gradient(ellipse at top left, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 20px;
    padding: 18px;
    backdrop-filter: blur(20px) saturate(1.3);
    -webkit-backdrop-filter: blur(20px) saturate(1.3);
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-2px);
    box-shadow:
      0 0 50px rgba(99, 102, 241, 0.1),
      0 0 20px rgba(99, 102, 241, 0.06),
      0 20px 45px -12px rgba(0, 0, 0, 0.65),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: lp-card-breathe 5s ease-in-out infinite;
  }

  .lp-card-v2:focus-within {
    border-color: rgba(139, 92, 246, 0.6);
    transform: translateY(-5px) scale(1.01);
    box-shadow:
      0 0 80px rgba(139, 92, 246, 0.2),
      0 0 35px rgba(139, 92, 246, 0.12),
      0 30px 60px -15px rgba(0, 0, 0, 0.75),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .lp-card-glow {
    position: absolute;
    inset: -80%;
    background: 
      radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 40%);
    pointer-events: none;
    animation: lp-glow-pulse 4s ease-in-out infinite;
  }

  /* URL Card - Blue/Cyan accent with dramatic glow */
  .lp-card-url {
    border-top: 3px solid rgba(34, 211, 238, 0.8);
    box-shadow:
      0 0 60px rgba(34, 211, 238, 0.12),
      0 0 25px rgba(59, 130, 246, 0.08),
      0 22px 50px -12px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 rgba(34, 211, 238, 0.15);
  }

  .lp-card-url .lp-card-glow {
    background: 
      radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.3) 0%, transparent 40%),
      radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 40%);
  }

  /* Alias Card - Purple/Violet accent with dramatic glow */
  .lp-card-alias {
    border-top: 3px solid rgba(168, 85, 247, 0.8);
    box-shadow:
      0 0 60px rgba(168, 85, 247, 0.12),
      0 0 25px rgba(139, 92, 246, 0.08),
      0 22px 50px -12px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 rgba(168, 85, 247, 0.15);
  }

  .lp-alias-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 10px;
  }

  .lp-alias-label svg {
    color: #8b5cf6;
  }

  /* ─── INPUT GROUP ────────────────────────────────────────────────────────── */
  .lp-input-group {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .lp-input-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%);
    color: #60a5fa;
    flex-shrink: 0;
  }

  .lp-input-group input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    padding: 12px 0;
  }

  .lp-input-group input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  /* ─── ALIAS INPUT ────────────────────────────────────────────────────────── */
  .lp-alias-input {
    display: flex;
    align-items: center;
    gap: 0;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 4px;
    position: relative;
    z-index: 1;
  }

  .lp-alias-input span {
    padding: 12px 4px 12px 14px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    font-family: ui-monospace, SFMono-Regular, monospace;
    white-space: nowrap;
  }

  .lp-alias-input input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    padding: 12px 14px 12px 0;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .lp-alias-input input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  /* ─── MODE SELECTOR ──────────────────────────────────────────────────────── */
  .lp-mode-section {
    display: flex;
    gap: 10px;
  }

  .lp-mode-btn {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
  }

  .lp-mode-btn:active {
    transform: scale(0.98);
  }

  .lp-mode-btn.active {
    border-color: rgba(139, 92, 246, 0.6);
    background: 
      linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%),
      rgba(15, 23, 42, 0.95);
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.15);
  }

  .lp-mode-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .lp-mode-icon.standard {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%);
    color: #4ade80;
  }

  .lp-mode-icon.turbo {
    background: linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(234, 88, 12, 0.2) 100%);
    color: #fb923c;
  }

  .lp-mode-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
  }

  .lp-mode-name {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .lp-mode-desc {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }

  .lp-mode-check {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  /* ─── ADVANCED BUTTON ────────────────────────────────────────────────────── */
  .lp-advanced-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-advanced-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.8);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     PREMIUM ADVANCED OPTIONS MODAL - DARK GLASS MORPHISM
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-modal-backdrop {
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px) saturate(1.2);
    -webkit-backdrop-filter: blur(12px) saturate(1.2);
    z-index: 1000;
  }

  .lp-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    background: 
      linear-gradient(180deg, 
        rgba(30, 41, 59, 0.98) 0%, 
        rgba(20, 30, 48, 0.99) 50%,
        rgba(15, 23, 42, 1) 100%);
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-bottom: none;
    padding: 12px 20px calc(100px + env(safe-area-inset-bottom, 20px));
    z-index: 1001;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow:
      0 -30px 120px rgba(139, 92, 246, 0.35),
      0 -15px 60px rgba(99, 102, 241, 0.2),
      0 -8px 30px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 0 80px rgba(139, 92, 246, 0.05);
  }

  /* Multiple glow orbs */
  .lp-modal-glow {
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 250px;
    background: 
      radial-gradient(ellipse at 50% 80%, rgba(139, 92, 246, 0.5) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
      radial-gradient(ellipse at 70% 60%, rgba(236, 72, 153, 0.25) 0%, transparent 40%);
    filter: blur(35px);
    pointer-events: none;
    animation: lp-modal-glow-pulse 3s ease-in-out infinite alternate;
  }

  @keyframes lp-modal-glow-pulse {
    0% { opacity: 0.7; transform: translateX(-50%) scale(1); }
    100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
  }

  /* Handle bar - Enhanced */
  .lp-modal-handle {
    display: flex;
    justify-content: center;
    padding: 8px 0 20px;
  }

  .lp-modal-handle-bar {
    width: 48px;
    height: 5px;
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.6));
    border-radius: 999px;
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
  }

  /* Header */
  .lp-modal-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .lp-modal-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%);
    border: 1px solid rgba(139, 92, 246, 0.4);
    color: #a5b4fc;
    box-shadow: 0 0 25px rgba(139, 92, 246, 0.3);
  }

  .lp-modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
  }

  .lp-modal-header p {
    margin: 4px 0 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Fields container */
  .lp-modal-fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  /* Individual field */
  .lp-modal-field {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 16px;
    transition: all 0.25s;
  }

  .lp-modal-field:focus-within {
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.15);
    background: rgba(30, 41, 59, 0.6);
  }

  .lp-modal-field-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(99, 102, 241, 0.15);
    color: #a5b4fc;
    flex-shrink: 0;
  }

  .lp-modal-field-content {
    flex: 1;
    min-width: 0;
  }

  .lp-modal-field-content label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 6px;
  }

  .lp-modal-field-content input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    padding: 0;
  }

  .lp-modal-field-content input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  /* Toggle row */
  .lp-modal-toggle-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.25s;
  }

  .lp-modal-toggle-row:active {
    transform: scale(0.98);
  }

  .lp-modal-toggle-content {
    flex: 1;
  }

  .lp-modal-toggle-content span {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .lp-modal-toggle-content p {
    margin: 2px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Premium toggle */
  .lp-modal-toggle {
    width: 52px;
    height: 30px;
    border-radius: 999px;
    background: rgba(100, 116, 139, 0.4);
    padding: 3px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }

  .lp-modal-toggle.on {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  }

  .lp-modal-toggle-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-modal-toggle.on .lp-modal-toggle-thumb {
    transform: translateX(22px);
  }

  /* Apply button */
  .lp-modal-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 20px;
    padding: 16px;
    background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow:
      0 0 40px rgba(34, 197, 94, 0.3),
      0 12px 30px -8px rgba(16, 185, 129, 0.4);
    position: relative;
    z-index: 1;
  }

  .lp-modal-close-btn:active {
    transform: scale(0.98);
  }

  /* ─── ERROR ──────────────────────────────────────────────────────────────── */
  .lp-error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    font-size: 13px;
    color: #f87171;
  }

  /* ─── SUBMIT BUTTON - ANIMATED GLOW ──────────────────────────────────────── */
  .lp-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 18px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%),
      linear-gradient(135deg, #8b5cf6 0%, #6366f1 40%, #3b82f6 100%);
    border: 1px solid rgba(139, 92, 246, 0.5);
    border-radius: 18px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 60px rgba(139, 92, 246, 0.35),
      0 0 25px rgba(99, 102, 241, 0.2),
      0 18px 45px -12px rgba(59, 130, 246, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    margin-top: 10px;
    animation: lp-btn-glow 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }

  /* Shimmer effect */
  .lp-submit::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s ease;
  }

  .lp-submit:hover::before {
    left: 100%;
  }

  .lp-submit:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow:
      0 0 100px rgba(139, 92, 246, 0.5),
      0 0 40px rgba(99, 102, 241, 0.3),
      0 25px 60px -15px rgba(59, 130, 246, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  .lp-submit:active {
    transform: scale(0.98);
    box-shadow:
      0 0 50px rgba(139, 92, 246, 0.3),
      0 0 20px rgba(99, 102, 241, 0.2),
      0 12px 30px -8px rgba(59, 130, 246, 0.4);
  }

  .lp-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }

  /* ─── SUCCESS VIEW ───────────────────────────────────────────────────────── */
  .lp-confetti {
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
  }

  .lp-success-card {
    position: relative;
    max-width: 400px;
    margin: 40px auto 0;
    padding: 32px 24px;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%),
      rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 28px;
    text-align: center;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 100px rgba(34, 197, 94, 0.2),
      0 30px 60px -15px rgba(0, 0, 0, 0.6);
    animation: lp-float 6s ease-in-out infinite;
  }

  .lp-success-glow {
    position: absolute;
    inset: -100px;
    background: radial-gradient(circle at 50% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%);
    pointer-events: none;
  }

  .lp-success-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: 0 0 40px rgba(34, 197, 94, 0.5);
    position: relative;
    z-index: 1;
  }

  .lp-success-badge {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(34, 197, 94, 0.2);
    border: 1px solid rgba(34, 197, 94, 0.4);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: #4ade80;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
    position: relative;
    z-index: 1;
  }

  .lp-success-card h2 {
    margin: 0 0 20px;
    font-size: 24px;
    font-weight: 700;
    color: #f1f5f9;
    position: relative;
    z-index: 1;
  }

  .lp-success-url-box {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .lp-success-url-box input {
    flex: 1;
    padding: 14px 16px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    font-size: 14px;
    font-family: ui-monospace, SFMono-Regular, monospace;
    color: #fff;
    outline: none;
  }

  .lp-success-url-box button {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .lp-success-url-box button.copied {
    background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
  }

  .lp-success-url-box button:active {
    transform: scale(0.95);
  }

  .lp-success-actions {
    display: flex;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .lp-btn-ghost {
    flex: 1;
    padding: 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: #f1f5f9;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .lp-btn-primary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 14px;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }

  .lp-btn-primary:active {
    transform: scale(0.98);
  }
`;export{Pe as CreateLinkPage};
