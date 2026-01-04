import{d as te,R as z,j as i,u as ae,e as ie,f as se,r as c,m as b,C as M,g as Q,c as re,Z as ne,h as oe,i as W,A as le,k as ce,M as pe,l as de,n as xe,o as ue}from"./index-W6PFq6so.js";import{C as he}from"./copy-qCZGZcM8.js";import{S as fe}from"./sparkles-DcLNGQTH.js";import{C as ge}from"./chevron-down-Cw1MCczY.js";import{E as me}from"./eye-off-DGfDbf37.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],ve=te("calendar",be);var A={linear:function(e,t,r,s){var a=r-t;return a*e/s+t},easeInQuad:function(e,t,r,s){var a=r-t;return a*(e/=s)*e+t},easeOutQuad:function(e,t,r,s){var a=r-t;return-a*(e/=s)*(e-2)+t},easeInOutQuad:function(e,t,r,s){var a=r-t;return(e/=s/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,r,s){var a=r-t;return a*(e/=s)*e*e+t},easeOutCubic:function(e,t,r,s){var a=r-t;return a*((e=e/s-1)*e*e+1)+t},easeInOutCubic:function(e,t,r,s){var a=r-t;return(e/=s/2)<1?a/2*e*e*e+t:a/2*((e-=2)*e*e+2)+t},easeInQuart:function(e,t,r,s){var a=r-t;return a*(e/=s)*e*e*e+t},easeOutQuart:function(e,t,r,s){var a=r-t;return-a*((e=e/s-1)*e*e*e-1)+t},easeInOutQuart:function(e,t,r,s){var a=r-t;return(e/=s/2)<1?a/2*e*e*e*e+t:-a/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(e,t,r,s){var a=r-t;return a*(e/=s)*e*e*e*e+t},easeOutQuint:function(e,t,r,s){var a=r-t;return a*((e=e/s-1)*e*e*e*e+1)+t},easeInOutQuint:function(e,t,r,s){var a=r-t;return(e/=s/2)<1?a/2*e*e*e*e*e+t:a/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(e,t,r,s){var a=r-t;return-a*Math.cos(e/s*(Math.PI/2))+a+t},easeOutSine:function(e,t,r,s){var a=r-t;return a*Math.sin(e/s*(Math.PI/2))+t},easeInOutSine:function(e,t,r,s){var a=r-t;return-a/2*(Math.cos(Math.PI*e/s)-1)+t},easeInExpo:function(e,t,r,s){var a=r-t;return e==0?t:a*Math.pow(2,10*(e/s-1))+t},easeOutExpo:function(e,t,r,s){var a=r-t;return e==s?t+a:a*(-Math.pow(2,-10*e/s)+1)+t},easeInOutExpo:function(e,t,r,s){var a=r-t;return e===0?t:e===s?t+a:(e/=s/2)<1?a/2*Math.pow(2,10*(e-1))+t:a/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(e,t,r,s){var a=r-t;return-a*(Math.sqrt(1-(e/=s)*e)-1)+t},easeOutCirc:function(e,t,r,s){var a=r-t;return a*Math.sqrt(1-(e=e/s-1)*e)+t},easeInOutCirc:function(e,t,r,s){var a=r-t;return(e/=s/2)<1?-a/2*(Math.sqrt(1-e*e)-1)+t:a/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(e,t,r,s){var a=r-t,n,o,l;return l=1.70158,o=0,n=a,e===0?t:(e/=s)===1?t+a:(o||(o=s*.3),n<Math.abs(a)?(n=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/n),-(n*Math.pow(2,10*(e-=1))*Math.sin((e*s-l)*(2*Math.PI)/o))+t)},easeOutElastic:function(e,t,r,s){var a=r-t,n,o,l;return l=1.70158,o=0,n=a,e===0?t:(e/=s)===1?t+a:(o||(o=s*.3),n<Math.abs(a)?(n=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/n),n*Math.pow(2,-10*e)*Math.sin((e*s-l)*(2*Math.PI)/o)+a+t)},easeInOutElastic:function(e,t,r,s){var a=r-t,n,o,l;return l=1.70158,o=0,n=a,e===0?t:(e/=s/2)===2?t+a:(o||(o=s*(.3*1.5)),n<Math.abs(a)?(n=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/n),e<1?-.5*(n*Math.pow(2,10*(e-=1))*Math.sin((e*s-l)*(2*Math.PI)/o))+t:n*Math.pow(2,-10*(e-=1))*Math.sin((e*s-l)*(2*Math.PI)/o)*.5+a+t)},easeInBack:function(e,t,r,s,a){var n=r-t;return a===void 0&&(a=1.70158),n*(e/=s)*e*((a+1)*e-a)+t},easeOutBack:function(e,t,r,s,a){var n=r-t;return a===void 0&&(a=1.70158),n*((e=e/s-1)*e*((a+1)*e+a)+1)+t},easeInOutBack:function(e,t,r,s,a){var n=r-t;return a===void 0&&(a=1.70158),(e/=s/2)<1?n/2*(e*e*(((a*=1.525)+1)*e-a))+t:n/2*((e-=2)*e*(((a*=1.525)+1)*e+a)+2)+t},easeInBounce:function(e,t,r,s){var a=r-t,n;return n=A.easeOutBounce(s-e,0,a,s),a-n+t},easeOutBounce:function(e,t,r,s){var a=r-t;return(e/=s)<1/2.75?a*(7.5625*e*e)+t:e<2/2.75?a*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?a*(7.5625*(e-=2.25/2.75)*e+.9375)+t:a*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(e,t,r,s){var a=r-t,n;return e<s/2?(n=A.easeInBounce(e*2,0,a,s),n*.5+t):(n=A.easeOutBounce(e*2-s,0,a,s),n*.5+a*.5+t)}},ye=A;function we(e){return e*Math.PI/180}function d(e,t){return e+Math.random()*(t-e)}function ke(e,t){return Math.floor(e+Math.random()*(t-e+1))}var S;(function(e){e[e.Circle=0]="Circle",e[e.Square=1]="Square",e[e.Strip=2]="Strip"})(S||(S={}));var w;(function(e){e[e.Positive=1]="Positive",e[e.Negative=-1]="Negative"})(w||(w={}));const je=1e3/60;class Ne{constructor(t,r,s,a){this.getOptions=r;const{colors:n,initialVelocityX:o,initialVelocityY:l}=this.getOptions();this.context=t,this.x=s,this.y=a,this.w=d(5,20),this.h=d(5,20),this.radius=d(5,10),this.vx=typeof o=="number"?d(-o,o):d(o.min,o.max),this.vy=typeof l=="number"?d(-l,0):d(l.min,l.max),this.shape=ke(0,2),this.angle=we(d(0,360)),this.angularSpin=d(-.2,.2),this.color=n[Math.floor(Math.random()*n.length)],this.rotateY=d(0,1),this.rotationDirection=d(0,1)?w.Positive:w.Negative}update(t){const{gravity:r,wind:s,friction:a,opacity:n,drawShape:o}=this.getOptions(),l=t/je;this.x+=this.vx*l,this.y+=this.vy*l,this.vy+=r*l,this.vx+=s*l,this.vx*=a**l,this.vy*=a**l,this.rotateY>=1&&this.rotationDirection===w.Positive?this.rotationDirection=w.Negative:this.rotateY<=-1&&this.rotationDirection===w.Negative&&(this.rotationDirection=w.Positive);const f=.1*this.rotationDirection*l;if(this.rotateY+=f,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=n,this.context.lineCap="round",this.context.lineWidth=2,o&&typeof o=="function")o.call(this,this.context);else switch(this.shape){case S.Circle:{this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break}case S.Square:{this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break}case S.Strip:{this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h);break}}this.context.closePath(),this.context.restore()}}class Ce{constructor(t,r){this.x=0,this.y=0,this.w=0,this.h=0,this.lastNumberOfPieces=0,this.tweenProgress=0,this.tweenFrom=0,this.particles=[],this.particlesGenerated=0,this.removeParticleAt=a=>{this.particles.splice(a,1)},this.getParticle=()=>{const a=d(this.x,this.w+this.x),n=d(this.y,this.h+this.y);return new Ne(this.context,this.getOptions,a,n)},this.animate=a=>{const{canvas:n,context:o,particlesGenerated:l,lastNumberOfPieces:f}=this,{run:x,recycle:g,numberOfPieces:m,debug:P,tweenFunction:N,tweenDuration:C}=this.getOptions();if(!x)return!1;const k=this.particles.length,v=g?k:l;if(v<m){f!==m&&(this.tweenProgress=0,this.tweenFrom=v,this.lastNumberOfPieces=m),this.tweenProgress=Math.min(C,Math.max(0,this.tweenProgress+a));const u=N(this.tweenProgress,this.tweenFrom,m,C),h=Math.round(u-v);for(let O=0;O<h;O++)this.particles.push(this.getParticle());this.particlesGenerated+=h}P&&(o.font="12px sans-serif",o.fillStyle="#333",o.textAlign="right",o.fillText(`Particles: ${k}`,n.width-10,n.height-20));for(let u=this.particles.length-1;u>=0;u--){const h=this.particles[u];h.update(a),(h.y>n.height||h.y<-100||h.x>n.width+100||h.x<-100)&&(g&&v<=m?this.particles[u]=this.getParticle():this.removeParticleAt(u))}return k>0||v<m},this.canvas=t;const s=this.canvas.getContext("2d");if(!s)throw new Error("Could not get canvas context");this.context=s,this.getOptions=r}}const T={width:typeof window<"u"?window.innerWidth:300,height:typeof window<"u"?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:ye.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0};class Oe{constructor(t,r){this.lastFrameTime=0,this.setOptionsWithDefaults=a=>{const n={confettiSource:{x:0,y:0,w:this.canvas.width,h:0}};this._options={...n,...T,...a},Object.assign(this,a.confettiSource)},this.update=(a=0)=>{const{options:{run:n,onConfettiComplete:o,frameRate:l},canvas:f,context:x}=this,g=Math.min(a-this.lastFrameTime,50);if(l&&g<1e3/l){this.rafId=requestAnimationFrame(this.update);return}this.lastFrameTime=a-(l?g%l:0),n&&(x.fillStyle="white",x.clearRect(0,0,f.width,f.height)),this.generator.animate(g)?this.rafId=requestAnimationFrame(this.update):(o&&typeof o=="function"&&this.generator.particlesGenerated>0&&o.call(this,this),this._options.run=!1)},this.reset=()=>{this.generator&&this.generator.particlesGenerated>0&&(this.generator.particlesGenerated=0,this.generator.particles=[],this.generator.lastNumberOfPieces=0)},this.stop=()=>{this.options={run:!1},this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=void 0)},this.canvas=t;const s=this.canvas.getContext("2d");if(!s)throw new Error("Could not get canvas context");this.context=s,this.generator=new Ce(this.canvas,()=>this.options),this.options=r,this.update()}get options(){return this._options}set options(t){var a,n;const r=(a=this._options)==null?void 0:a.run,s=(n=this._options)==null?void 0:n.recycle;this.setOptionsWithDefaults(t),this.generator&&(Object.assign(this.generator,this.options.confettiSource),typeof t.recycle=="boolean"&&t.recycle&&s===!1&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),typeof t.run=="boolean"&&t.run&&r===!1&&this.update()}}const Me=z.createRef();class F extends z.Component{constructor(t){super(t),this.canvas=z.createRef(),this.canvas=t.canvasRef||Me}componentDidMount(){if(this.canvas.current){const t=E(this.props)[0];this.confetti=new Oe(this.canvas.current,t)}}componentDidUpdate(){const t=E(this.props)[0];this.confetti&&(this.confetti.options=t)}componentWillUnmount(){this.confetti&&this.confetti.stop(),this.confetti=void 0}render(){const[t,r]=E(this.props),s={zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0,...r.style};return i.jsx("canvas",{width:t.width,height:t.height,ref:this.canvas,...r,style:s})}}F.defaultProps={...T};F.displayName="ReactConfetti";function E(e){const t={},r={},s={},a=[...Object.keys(T),"confettiSource","drawShape","onConfettiComplete","frameRate"],n=["canvasRef"];for(const o in e){const l=e[o];a.includes(o)?t[o]=l:n.includes(o)?n[o]=l:s[o]=l}return[t,s,r]}const Se=z.forwardRef((e,t)=>i.jsx(F,{canvasRef:t,...e}));function Ee({onSwitchToList:e}){const t=ae(),{refreshLinks:r,refreshDashboard:s}=ie(),a=se(),[n,o]=c.useState(""),[l,f]=c.useState(""),[x,g]=c.useState("standard"),[m,P]=c.useState(""),[N,C]=c.useState(""),[k,v]=c.useState(""),[u,h]=c.useState(!1),[O,D]=c.useState(!1),[L,B]=c.useState(""),[j,Y]=c.useState(null),[X,U]=c.useState(!1),[$,R]=c.useState(!1),[G,_]=c.useState(!1);c.useEffect(()=>{if(j){U(!0);const p=setTimeout(()=>U(!1),4e3);return()=>clearTimeout(p)}},[j]);const K=async p=>{var q;if(p.preventDefault(),!!n){B(""),D(!0);try{let y=n.trim();/^https?:\/\//i.test(y)||(y="https://"+y);const I=l.trim().toLowerCase(),H=await ue.create(y,I||"",x,{password:m||void 0,expiresAt:N?new Date(N).toISOString():void 0,maxClicks:k?parseInt(k):void 0,isPrivate:u}),ee=`${window.location.origin}/l/${H.slug}`;Y({...H,short_url:ee}),r(),s(),a.success("¡Link creado exitosamente!")}catch(y){console.error(y);const I=(q=y.message)!=null&&q.includes("alias")?"Alias ocupado":y.message||"Error";B(I),a.error(I)}finally{D(!1)}}},Z=()=>{j&&(navigator.clipboard.writeText(j.short_url),_(!0),a.success("¡Enlace copiado al portapapeles!"),setTimeout(()=>_(!1),2e3))},J=()=>{Y(null),o(""),f(""),P(""),C(""),v(""),h(!1)};return j?i.jsxs("div",{className:"lp-create-shell",children:[i.jsx("style",{children:V}),X&&i.jsx("div",{className:"lp-confetti",children:i.jsx(Se,{numberOfPieces:100,recycle:!1})}),i.jsx("div",{className:"lp-create-inner",children:i.jsxs(b.div,{className:"lp-success-card",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:[i.jsx("div",{className:"lp-success-glow"}),i.jsx("div",{className:"lp-success-icon",children:i.jsx(M,{size:32})}),i.jsxs("div",{className:"lp-success-badge",children:[x==="turbo"?"🚀 TURBO":"⚡ SMART"," LINK"]}),i.jsx("h2",{children:"¡Link creado!"}),i.jsxs("div",{className:"lp-success-url-box",children:[i.jsx("input",{readOnly:!0,value:j.short_url}),i.jsx("button",{onClick:Z,className:G?"copied":"",children:G?i.jsx(M,{size:18}):i.jsx(he,{size:18})})]}),i.jsxs("div",{className:"lp-success-actions",children:[i.jsx("button",{onClick:J,className:"lp-btn-ghost",children:"Crear otro"}),i.jsxs("button",{onClick:()=>{e?e():t("/app/links")},className:"lp-btn-primary",children:["Mis enlaces ",i.jsx(Q,{size:16})]})]})]})})]}):i.jsxs("div",{className:"lp-create-shell",children:[i.jsx("style",{children:V}),i.jsx("div",{className:"lp-create-inner",children:i.jsxs("form",{className:"lp-create-form",onSubmit:K,children:[i.jsxs("div",{className:"lp-card-v2 lp-card-url",children:[i.jsx("div",{className:"lp-card-glow"}),i.jsxs("div",{className:"lp-input-group",children:[i.jsx("div",{className:"lp-input-icon",children:i.jsx(re,{size:20})}),i.jsx("input",{type:"text",placeholder:"Pega tu URL aquí...",value:n,onChange:p=>o(p.target.value),required:!0})]})]}),i.jsxs("div",{className:"lp-card-v2 lp-card-alias",children:[i.jsx("div",{className:"lp-card-glow"}),i.jsxs("label",{className:"lp-alias-label",children:[i.jsx(fe,{size:14}),"Alias personalizado"]}),i.jsxs("div",{className:"lp-alias-input",children:[i.jsx("span",{children:"linkpay.gg/"}),i.jsx("input",{type:"text",placeholder:"mi-link",value:l,onChange:p=>f(p.target.value)})]})]}),i.jsxs("div",{className:"lp-mode-section",children:[i.jsxs("button",{type:"button",className:`lp-mode-btn ${x==="standard"?"active":""}`,onClick:()=>g("standard"),children:[i.jsx("div",{className:"lp-mode-icon standard",children:i.jsx(ne,{size:22})}),i.jsxs("div",{className:"lp-mode-info",children:[i.jsx("span",{className:"lp-mode-name",children:"Estándar"}),i.jsx("span",{className:"lp-mode-desc",children:"Equilibrio perfecto"})]}),x==="standard"&&i.jsx("div",{className:"lp-mode-check",children:i.jsx(M,{size:16})})]}),i.jsxs("button",{type:"button",className:`lp-mode-btn ${x==="turbo"?"active":""}`,onClick:()=>g("turbo"),children:[i.jsx("div",{className:"lp-mode-icon turbo",children:i.jsx(oe,{size:22})}),i.jsxs("div",{className:"lp-mode-info",children:[i.jsx("span",{className:"lp-mode-name",children:"Turbo"}),i.jsx("span",{className:"lp-mode-desc",children:"Máximo ingreso"})]}),x==="turbo"&&i.jsx("div",{className:"lp-mode-check",children:i.jsx(M,{size:16})})]})]}),i.jsxs("button",{type:"button",className:"lp-advanced-btn",onClick:()=>R(!0),children:[i.jsx(W,{size:16}),i.jsx("span",{children:"Opciones avanzadas"}),i.jsx(ge,{size:16})]}),i.jsx(le,{children:$&&i.jsxs(i.Fragment,{children:[i.jsx(b.div,{className:"lp-modal-backdrop",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>R(!1)}),i.jsxs(b.div,{className:"lp-modal",initial:{opacity:0,y:100,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:80,scale:.95},transition:{type:"spring",damping:25,stiffness:300},children:[i.jsx("div",{className:"lp-modal-glow"}),i.jsx("div",{className:"lp-modal-handle",children:i.jsx("div",{className:"lp-modal-handle-bar"})}),i.jsxs(b.div,{className:"lp-modal-header",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[i.jsx("div",{className:"lp-modal-icon",children:i.jsx(W,{size:20})}),i.jsxs("div",{children:[i.jsx("h3",{children:"Opciones Avanzadas"}),i.jsx("p",{children:"Protege y personaliza tu enlace"})]})]}),i.jsxs("div",{className:"lp-modal-fields",children:[i.jsxs(b.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.15},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(ce,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Contraseña"}),i.jsx("input",{type:"text",value:m,onChange:p=>P(p.target.value),placeholder:"Sin contraseña"})]})]}),i.jsxs(b.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(ve,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Fecha de expiración"}),i.jsx("input",{type:"datetime-local",value:N,onChange:p=>C(p.target.value)})]})]}),i.jsxs(b.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.25},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(pe,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Límite de clics"}),i.jsx("input",{type:"number",min:"1",value:k,onChange:p=>v(p.target.value),placeholder:"Sin límite"})]})]}),i.jsxs(b.div,{className:"lp-modal-toggle-row",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.3},onClick:()=>h(!u),children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(me,{size:18})}),i.jsxs("div",{className:"lp-modal-toggle-content",children:[i.jsx("span",{children:"Enlace privado"}),i.jsx("p",{children:"No aparece en tu lista pública"})]}),i.jsx("div",{className:`lp-modal-toggle ${u?"on":""}`,children:i.jsx("div",{className:"lp-modal-toggle-thumb"})})]})]}),i.jsxs(b.button,{className:"lp-modal-close-btn",onClick:()=>R(!1),initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.35},children:[i.jsx(M,{size:18}),"Aplicar"]})]})]})}),L&&i.jsxs("div",{className:"lp-error",children:[i.jsx(de,{size:16}),L]}),i.jsx("button",{type:"submit",disabled:O,className:"lp-submit",children:O?i.jsx(xe,{className:"lp-spin",size:20}):i.jsxs(i.Fragment,{children:["Crear link ",i.jsx(Q,{size:18})]})})]})})]})}const V=`
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
     SHELL - Transparente (hereda fondo de LinksHub)
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-shell {
    position: relative;
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #fff;
    overflow-x: hidden;
    max-width: 100vw;
    /* TRANSPARENTE - hereda el fondo vibrante de LinksHub */
    background: transparent;
  }

  /* SIN ORBS NI EFECTOS PROPIOS - LinksHub provee el fondo */

  /* ═══════════════════════════════════════════════════════════════════════════
     INNER CONTAINER - Transparente, sin efectos propios
     ═══════════════════════════════════════════════════════════════════════════ */
  
  .lp-create-inner {
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 14px;
    z-index: 1;
    /* TRANSPARENTE - el fondo viene de LinksHub */
    background: transparent;
  }

  /* SIN ::before ni ::after - LinksHub provee TODOS los efectos */

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

  /* ─── CARDS - WARM CORAL/PINK/ORANGE PALETTE ─────────────────────────────── */
  .lp-card-v2 {
    position: relative;
    background: 
      linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%),
      rgba(30, 20, 28, 0.85);
    border: 1px solid rgba(251, 113, 133, 0.25);
    border-radius: 18px;
    padding: 16px;
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 40px rgba(251, 113, 133, 0.08),
      0 16px 40px -12px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .lp-card-v2:focus-within {
    border-color: rgba(251, 113, 133, 0.5);
    transform: translateY(-3px);
    box-shadow:
      0 0 60px rgba(251, 113, 133, 0.15),
      0 0 30px rgba(244, 114, 182, 0.1),
      0 24px 50px -15px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .lp-card-glow {
    position: absolute;
    inset: -80%;
    background: 
      radial-gradient(circle at 50% 0%, rgba(251, 113, 133, 0.2) 0%, transparent 40%),
      radial-gradient(circle at 0% 100%, rgba(251, 146, 60, 0.12) 0%, transparent 40%);
    pointer-events: none;
    animation: lp-glow-pulse 4s ease-in-out infinite;
  }

  /* URL Card - CORAL accent */
  .lp-card-url {
    border-top: 3px solid rgba(251, 113, 133, 0.8);
    box-shadow:
      0 0 50px rgba(251, 113, 133, 0.12),
      0 0 20px rgba(244, 114, 182, 0.08),
      0 18px 45px -12px rgba(0, 0, 0, 0.55),
      inset 0 1px 0 rgba(251, 113, 133, 0.12);
  }

  .lp-card-url .lp-card-glow {
    background: 
      radial-gradient(circle at 50% 0%, rgba(251, 113, 133, 0.25) 0%, transparent 40%),
      radial-gradient(circle at 100% 100%, rgba(244, 114, 182, 0.15) 0%, transparent 40%);
  }

  /* Alias Card - ORANGE accent - TRULY TRANSPARENT glassmorphism */
  .lp-card-v2.lp-card-alias {
    border-top: 3px solid rgba(251, 146, 60, 0.8);
    /* Complete override for transparency */
    background: none !important;
    background-color: rgba(30, 20, 28, 0.35) !important;
    background-image: none !important;
    box-shadow:
      0 0 25px rgba(251, 146, 60, 0.06),
      0 10px 30px -8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
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
    color: #fb923c;
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
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Coral/Pink gradient */
    background: linear-gradient(135deg, rgba(251, 113, 133, 0.35) 0%, rgba(244, 114, 182, 0.25) 100%);
    color: #fda4af;
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

  /* ─── MODE SELECTOR - WARM PALETTE ──────────────────────────────────────── */
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
    /* TRANSPARENT glassmorphism */
    background: rgba(30, 20, 28, 0.35);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
  }

  .lp-mode-btn:active {
    transform: scale(0.98);
  }

  .lp-mode-btn.active {
    border-color: rgba(251, 113, 133, 0.4);
    background: rgba(251, 113, 133, 0.15);
    box-shadow: 0 0 25px rgba(251, 113, 133, 0.12);
  }

  .lp-mode-icon {
    width: 42px;
    height: 42px;
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
    background: linear-gradient(135deg, rgba(251, 146, 60, 0.35) 0%, rgba(253, 186, 116, 0.25) 100%);
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
    width: 22px;
    height: 22px;
    border-radius: 50%;
    /* Coral check badge */
    background: linear-gradient(135deg, #fb7185 0%, #f472b6 100%);
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
     ADVANCED OPTIONS MODAL - Transparent Glassmorphism (Friendly)
     ═══════════════════════════════════════════════════════════════════════════ */

  .lp-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1000;
  }

  /* Mobile: Full width bottom sheet */
  .lp-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    /* Transparent glassmorphism - see background through */
    background: rgba(30, 20, 28, 0.92);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: none;
    padding: 16px 20px calc(100px + env(safe-area-inset-bottom, 20px));
    z-index: 1001;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Desktop: Centered in CONTENT AREA (right of sidebar) */
  @media (min-width: 769px) {
    .lp-modal {
      /* Reset mobile */
      bottom: auto;
      right: auto;
      /* Align with content cards - centered */
      top: 27%;
      left: calc(192px + (100vw - 192px - 440px) / 2 + 30px);
      transform: translateY(-50%);
      /* Fixed size */
      width: 440px;
      height: fit-content;
      max-height: 75vh;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 24px;
      box-shadow:
        0 25px 80px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
  }

  /* Remove glow - keep it clean */
  .lp-modal-glow {
    display: none;
  }

  /* Handle bar - Mobile only */
  .lp-modal-handle {
    display: flex;
    justify-content: center;
    padding: 0 0 16px;
  }

  .lp-modal-handle-bar {
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 999px;
  }

  @media (min-width: 769px) {
    .lp-modal-handle {
      display: none;
    }
  }

  /* Header */
  .lp-modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .lp-modal-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(251, 113, 133, 0.15);
    color: #fda4af;
  }

  .lp-modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }

  .lp-modal-header p {
    margin: 2px 0 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Fields container */
  .lp-modal-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Individual field - More transparent */
  .lp-modal-field {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    transition: all 0.2s ease;
  }

  .lp-modal-field:focus-within {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(251, 113, 133, 0.3);
  }

  .lp-modal-field-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(251, 113, 133, 0.12);
    color: #fda4af;
    flex-shrink: 0;
  }

  .lp-modal-field-content {
    flex: 1;
    min-width: 0;
  }

  .lp-modal-field-content label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 3px;
  }

  .lp-modal-field-content input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
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
    gap: 12px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
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
    color: #fff;
  }

  .lp-modal-toggle-content p {
    margin: 2px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
  }

  /* Toggle switch */
  .lp-modal-toggle {
    width: 48px;
    height: 26px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
    padding: 2px;
    cursor: pointer;
    transition: all 0.25s ease;
    flex-shrink: 0;
  }

  .lp-modal-toggle.on {
    background: #fb7185;
  }

  .lp-modal-toggle-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.25s ease;
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
    margin-top: 16px;
    padding: 14px;
    background: #fb7185;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lp-modal-close-btn:hover {
    background: #f472b6;
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
`;export{Ee as CreateLinkPage};
