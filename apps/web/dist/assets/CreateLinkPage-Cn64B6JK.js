import{c as H,r as c,j as i,R as L,a as ae,A as q,d as ie,Z as ne,e as re,f as V,g as se,M as oe,C as le,h as ce,L as pe}from"./index-Dxh3r0nY.js";import{M as de,i as ue,u as K,P as xe,a as fe,b as he,L as ge,m as I}from"./proxy-k4Mbx_EL.js";import{C as me}from"./copy-C9V9IgkZ.js";import{S as be}from"./sparkles-B8MFeoH6.js";import{C as ve}from"./chevron-down-B9gRc_Zo.js";import{E as ye}from"./eye-off-CiKrOiv8.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],je=H("calendar",we);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],A=H("check",ke);function X(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function Ce(...e){return t=>{let r=!1;const n=e.map(a=>{const s=X(a,t);return!r&&typeof s=="function"&&(r=!0),s});if(r)return()=>{for(let a=0;a<n.length;a++){const s=n[a];typeof s=="function"?s():X(e[a],null)}}}}function Ne(...e){return c.useCallback(Ce(...e),e)}class Me extends c.Component{getSnapshotBeforeUpdate(t){const r=this.props.childRef.current;if(r&&t.isPresent&&!this.props.isPresent){const n=r.offsetParent,a=ue(n)&&n.offsetWidth||0,s=this.props.sizeRef.current;s.height=r.offsetHeight||0,s.width=r.offsetWidth||0,s.top=r.offsetTop,s.left=r.offsetLeft,s.right=a-s.width-s.left}return null}componentDidUpdate(){}render(){return this.props.children}}function Ie({children:e,isPresent:t,anchorX:r,root:n}){const a=c.useId(),s=c.useRef(null),o=c.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:l}=c.useContext(de),b=Ne(s,e==null?void 0:e.ref);return c.useInsertionEffect(()=>{const{width:d,height:f,top:p,left:h,right:g}=o.current;if(t||!s.current||!d||!f)return;const v=r==="left"?`left: ${h}`:`right: ${g}`;s.current.dataset.motionPopId=a;const u=document.createElement("style");l&&(u.nonce=l);const y=n??document.head;return y.appendChild(u),u.sheet&&u.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${f}px !important;
            ${v}px !important;
            top: ${p}px !important;
          }
        `),()=>{y.contains(u)&&y.removeChild(u)}},[t]),i.jsx(Me,{isPresent:t,childRef:s,sizeRef:o,children:c.cloneElement(e,{ref:b})})}const Se=({children:e,initial:t,isPresent:r,onExitComplete:n,custom:a,presenceAffectsLayout:s,mode:o,anchorX:l,root:b})=>{const d=K(ze),f=c.useId();let p=!0,h=c.useMemo(()=>(p=!1,{id:f,initial:t,isPresent:r,custom:a,onExitComplete:g=>{d.set(g,!0);for(const v of d.values())if(!v)return;n&&n()},register:g=>(d.set(g,!1),()=>d.delete(g))}),[r,d,n]);return s&&p&&(h={...h}),c.useMemo(()=>{d.forEach((g,v)=>d.set(v,!1))},[r]),c.useEffect(()=>{!r&&!d.size&&n&&n()},[r]),o==="popLayout"&&(e=i.jsx(Ie,{isPresent:r,anchorX:l,root:b,children:e})),i.jsx(xe.Provider,{value:h,children:e})};function ze(){return new Map}const T=e=>e.key||"";function Q(e){const t=[];return c.Children.forEach(e,r=>{c.isValidElement(r)&&t.push(r)}),t}const Pe=({children:e,custom:t,initial:r=!0,onExitComplete:n,presenceAffectsLayout:a=!0,mode:s="sync",propagate:o=!1,anchorX:l="left",root:b})=>{const[d,f]=fe(o),p=c.useMemo(()=>Q(e),[e]),h=o&&!d?[]:p.map(T),g=c.useRef(!0),v=c.useRef(p),u=K(()=>new Map),[y,C]=c.useState(p),[x,N]=c.useState(p);he(()=>{g.current=!1,v.current=p;for(let w=0;w<x.length;w++){const m=T(x[w]);h.includes(m)?u.delete(m):u.get(m)!==!0&&u.set(m,!1)}},[x,h.length,h.join("-")]);const P=[];if(p!==y){let w=[...p];for(let m=0;m<x.length;m++){const M=x[m],O=T(M);h.includes(O)||(w.splice(m,0,M),P.push(M))}return s==="wait"&&P.length&&(w=P),N(Q(w)),C(p),null}const{forceRender:E}=c.useContext(ge);return i.jsx(i.Fragment,{children:x.map(w=>{const m=T(w),M=o&&!d?!1:p===x||h.includes(m),O=()=>{if(u.has(m))u.set(m,!0);else return;let R=!0;u.forEach(B=>{B||(R=!1)}),R&&(E==null||E(),N(v.current),o&&(f==null||f()),n&&n())};return i.jsx(Se,{isPresent:M,initial:!g.current||r?void 0:!1,custom:t,presenceAffectsLayout:a,mode:s,root:b,onExitComplete:M?void 0:O,anchorX:l,children:w},m)})})};var D={linear:function(e,t,r,n){var a=r-t;return a*e/n+t},easeInQuad:function(e,t,r,n){var a=r-t;return a*(e/=n)*e+t},easeOutQuad:function(e,t,r,n){var a=r-t;return-a*(e/=n)*(e-2)+t},easeInOutQuad:function(e,t,r,n){var a=r-t;return(e/=n/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,r,n){var a=r-t;return a*(e/=n)*e*e+t},easeOutCubic:function(e,t,r,n){var a=r-t;return a*((e=e/n-1)*e*e+1)+t},easeInOutCubic:function(e,t,r,n){var a=r-t;return(e/=n/2)<1?a/2*e*e*e+t:a/2*((e-=2)*e*e+2)+t},easeInQuart:function(e,t,r,n){var a=r-t;return a*(e/=n)*e*e*e+t},easeOutQuart:function(e,t,r,n){var a=r-t;return-a*((e=e/n-1)*e*e*e-1)+t},easeInOutQuart:function(e,t,r,n){var a=r-t;return(e/=n/2)<1?a/2*e*e*e*e+t:-a/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(e,t,r,n){var a=r-t;return a*(e/=n)*e*e*e*e+t},easeOutQuint:function(e,t,r,n){var a=r-t;return a*((e=e/n-1)*e*e*e*e+1)+t},easeInOutQuint:function(e,t,r,n){var a=r-t;return(e/=n/2)<1?a/2*e*e*e*e*e+t:a/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(e,t,r,n){var a=r-t;return-a*Math.cos(e/n*(Math.PI/2))+a+t},easeOutSine:function(e,t,r,n){var a=r-t;return a*Math.sin(e/n*(Math.PI/2))+t},easeInOutSine:function(e,t,r,n){var a=r-t;return-a/2*(Math.cos(Math.PI*e/n)-1)+t},easeInExpo:function(e,t,r,n){var a=r-t;return e==0?t:a*Math.pow(2,10*(e/n-1))+t},easeOutExpo:function(e,t,r,n){var a=r-t;return e==n?t+a:a*(-Math.pow(2,-10*e/n)+1)+t},easeInOutExpo:function(e,t,r,n){var a=r-t;return e===0?t:e===n?t+a:(e/=n/2)<1?a/2*Math.pow(2,10*(e-1))+t:a/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(e,t,r,n){var a=r-t;return-a*(Math.sqrt(1-(e/=n)*e)-1)+t},easeOutCirc:function(e,t,r,n){var a=r-t;return a*Math.sqrt(1-(e=e/n-1)*e)+t},easeInOutCirc:function(e,t,r,n){var a=r-t;return(e/=n/2)<1?-a/2*(Math.sqrt(1-e*e)-1)+t:a/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(e,t,r,n){var a=r-t,s,o,l;return l=1.70158,o=0,s=a,e===0?t:(e/=n)===1?t+a:(o||(o=n*.3),s<Math.abs(a)?(s=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/s),-(s*Math.pow(2,10*(e-=1))*Math.sin((e*n-l)*(2*Math.PI)/o))+t)},easeOutElastic:function(e,t,r,n){var a=r-t,s,o,l;return l=1.70158,o=0,s=a,e===0?t:(e/=n)===1?t+a:(o||(o=n*.3),s<Math.abs(a)?(s=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/s),s*Math.pow(2,-10*e)*Math.sin((e*n-l)*(2*Math.PI)/o)+a+t)},easeInOutElastic:function(e,t,r,n){var a=r-t,s,o,l;return l=1.70158,o=0,s=a,e===0?t:(e/=n/2)===2?t+a:(o||(o=n*(.3*1.5)),s<Math.abs(a)?(s=a,l=o/4):l=o/(2*Math.PI)*Math.asin(a/s),e<1?-.5*(s*Math.pow(2,10*(e-=1))*Math.sin((e*n-l)*(2*Math.PI)/o))+t:s*Math.pow(2,-10*(e-=1))*Math.sin((e*n-l)*(2*Math.PI)/o)*.5+a+t)},easeInBack:function(e,t,r,n,a){var s=r-t;return a===void 0&&(a=1.70158),s*(e/=n)*e*((a+1)*e-a)+t},easeOutBack:function(e,t,r,n,a){var s=r-t;return a===void 0&&(a=1.70158),s*((e=e/n-1)*e*((a+1)*e+a)+1)+t},easeInOutBack:function(e,t,r,n,a){var s=r-t;return a===void 0&&(a=1.70158),(e/=n/2)<1?s/2*(e*e*(((a*=1.525)+1)*e-a))+t:s/2*((e-=2)*e*(((a*=1.525)+1)*e+a)+2)+t},easeInBounce:function(e,t,r,n){var a=r-t,s;return s=D.easeOutBounce(n-e,0,a,n),a-s+t},easeOutBounce:function(e,t,r,n){var a=r-t;return(e/=n)<1/2.75?a*(7.5625*e*e)+t:e<2/2.75?a*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?a*(7.5625*(e-=2.25/2.75)*e+.9375)+t:a*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(e,t,r,n){var a=r-t,s;return e<n/2?(s=D.easeInBounce(e*2,0,a,n),s*.5+t):(s=D.easeOutBounce(e*2-n,0,a,n),s*.5+a*.5+t)}},Oe=D;function Ee(e){return e*Math.PI/180}function k(e,t){return e+Math.random()*(t-e)}function Re(e,t){return Math.floor(e+Math.random()*(t-e+1))}var F;(function(e){e[e.Circle=0]="Circle",e[e.Square=1]="Square",e[e.Strip=2]="Strip"})(F||(F={}));var z;(function(e){e[e.Positive=1]="Positive",e[e.Negative=-1]="Negative"})(z||(z={}));const Ae=1e3/60;class Fe{constructor(t,r,n,a){this.getOptions=r;const{colors:s,initialVelocityX:o,initialVelocityY:l}=this.getOptions();this.context=t,this.x=n,this.y=a,this.w=k(5,20),this.h=k(5,20),this.radius=k(5,10),this.vx=typeof o=="number"?k(-o,o):k(o.min,o.max),this.vy=typeof l=="number"?k(-l,0):k(l.min,l.max),this.shape=Re(0,2),this.angle=Ee(k(0,360)),this.angularSpin=k(-.2,.2),this.color=s[Math.floor(Math.random()*s.length)],this.rotateY=k(0,1),this.rotationDirection=k(0,1)?z.Positive:z.Negative}update(t){const{gravity:r,wind:n,friction:a,opacity:s,drawShape:o}=this.getOptions(),l=t/Ae;this.x+=this.vx*l,this.y+=this.vy*l,this.vy+=r*l,this.vx+=n*l,this.vx*=a**l,this.vy*=a**l,this.rotateY>=1&&this.rotationDirection===z.Positive?this.rotationDirection=z.Negative:this.rotateY<=-1&&this.rotationDirection===z.Negative&&(this.rotationDirection=z.Positive);const b=.1*this.rotationDirection*l;if(this.rotateY+=b,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=s,this.context.lineCap="round",this.context.lineWidth=2,o&&typeof o=="function")o.call(this,this.context);else switch(this.shape){case F.Circle:{this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break}case F.Square:{this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break}case F.Strip:{this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h);break}}this.context.closePath(),this.context.restore()}}class Te{constructor(t,r){this.x=0,this.y=0,this.w=0,this.h=0,this.lastNumberOfPieces=0,this.tweenProgress=0,this.tweenFrom=0,this.particles=[],this.particlesGenerated=0,this.removeParticleAt=a=>{this.particles.splice(a,1)},this.getParticle=()=>{const a=k(this.x,this.w+this.x),s=k(this.y,this.h+this.y);return new Fe(this.context,this.getOptions,a,s)},this.animate=a=>{const{canvas:s,context:o,particlesGenerated:l,lastNumberOfPieces:b}=this,{run:d,recycle:f,numberOfPieces:p,debug:h,tweenFunction:g,tweenDuration:v}=this.getOptions();if(!d)return!1;const u=this.particles.length,y=f?u:l;if(y<p){b!==p&&(this.tweenProgress=0,this.tweenFrom=y,this.lastNumberOfPieces=p),this.tweenProgress=Math.min(v,Math.max(0,this.tweenProgress+a));const C=g(this.tweenProgress,this.tweenFrom,p,v),x=Math.round(C-y);for(let N=0;N<x;N++)this.particles.push(this.getParticle());this.particlesGenerated+=x}h&&(o.font="12px sans-serif",o.fillStyle="#333",o.textAlign="right",o.fillText(`Particles: ${u}`,s.width-10,s.height-20));for(let C=this.particles.length-1;C>=0;C--){const x=this.particles[C];x.update(a),(x.y>s.height||x.y<-100||x.x>s.width+100||x.x<-100)&&(f&&y<=p?this.particles[C]=this.getParticle():this.removeParticleAt(C))}return u>0||y<p},this.canvas=t;const n=this.canvas.getContext("2d");if(!n)throw new Error("Could not get canvas context");this.context=n,this.getOptions=r}}const Y={width:typeof window<"u"?window.innerWidth:300,height:typeof window<"u"?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:Oe.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0};class De{constructor(t,r){this.lastFrameTime=0,this.setOptionsWithDefaults=a=>{const s={confettiSource:{x:0,y:0,w:this.canvas.width,h:0}};this._options={...s,...Y,...a},Object.assign(this,a.confettiSource)},this.update=(a=0)=>{const{options:{run:s,onConfettiComplete:o,frameRate:l},canvas:b,context:d}=this,f=Math.min(a-this.lastFrameTime,50);if(l&&f<1e3/l){this.rafId=requestAnimationFrame(this.update);return}this.lastFrameTime=a-(l?f%l:0),s&&(d.fillStyle="white",d.clearRect(0,0,b.width,b.height)),this.generator.animate(f)?this.rafId=requestAnimationFrame(this.update):(o&&typeof o=="function"&&this.generator.particlesGenerated>0&&o.call(this,this),this._options.run=!1)},this.reset=()=>{this.generator&&this.generator.particlesGenerated>0&&(this.generator.particlesGenerated=0,this.generator.particles=[],this.generator.lastNumberOfPieces=0)},this.stop=()=>{this.options={run:!1},this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=void 0)},this.canvas=t;const n=this.canvas.getContext("2d");if(!n)throw new Error("Could not get canvas context");this.context=n,this.generator=new Te(this.canvas,()=>this.options),this.options=r,this.update()}get options(){return this._options}set options(t){var a,s;const r=(a=this._options)==null?void 0:a.run,n=(s=this._options)==null?void 0:s.recycle;this.setOptionsWithDefaults(t),this.generator&&(Object.assign(this.generator,this.options.confettiSource),typeof t.recycle=="boolean"&&t.recycle&&n===!1&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),typeof t.run=="boolean"&&t.run&&r===!1&&this.update()}}const Le=L.createRef();class G extends L.Component{constructor(t){super(t),this.canvas=L.createRef(),this.canvas=t.canvasRef||Le}componentDidMount(){if(this.canvas.current){const t=U(this.props)[0];this.confetti=new De(this.canvas.current,t)}}componentDidUpdate(){const t=U(this.props)[0];this.confetti&&(this.confetti.options=t)}componentWillUnmount(){this.confetti&&this.confetti.stop(),this.confetti=void 0}render(){const[t,r]=U(this.props),n={zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0,...r.style};return i.jsx("canvas",{width:t.width,height:t.height,ref:this.canvas,...r,style:n})}}G.defaultProps={...Y};G.displayName="ReactConfetti";function U(e){const t={},r={},n={},a=[...Object.keys(Y),"confettiSource","drawShape","onConfettiComplete","frameRate"],s=["canvasRef"];for(const o in e){const l=e[o];a.includes(o)?t[o]=l:s.includes(o)?s[o]=l:n[o]=l}return[t,n,r]}const Be=L.forwardRef((e,t)=>i.jsx(G,{canvasRef:t,...e}));function Ve(){const e=ae(),[t,r]=c.useState(""),[n,a]=c.useState(""),[s,o]=c.useState("standard"),[l,b]=c.useState(""),[d,f]=c.useState(""),[p,h]=c.useState(""),[g,v]=c.useState(!1),[u,y]=c.useState(!1),[C,x]=c.useState(""),[N,P]=c.useState(null),[E,w]=c.useState(!1),[m,M]=c.useState(!1),[O,R]=c.useState(!1);c.useEffect(()=>{if(N){w(!0);const j=setTimeout(()=>w(!1),4e3);return()=>clearTimeout(j)}},[N]);const B=async j=>{var _;if(j.preventDefault(),!!t){x(""),y(!0);try{let S=t.trim();/^https?:\/\//i.test(S)||(S="https://"+S);const ee=n.trim().toLowerCase(),$=await pe.create(S,ee||"",s,{password:l||void 0,expiresAt:d?new Date(d).toISOString():void 0,maxClicks:p?parseInt(p):void 0,isPrivate:g}),te=`${window.location.origin}/l/${$.slug}`;P({...$,short_url:te})}catch(S){console.error(S),x((_=S.message)!=null&&_.includes("alias")?"Alias ocupado":S.message||"Error")}finally{y(!1)}}},Z=()=>{N&&(navigator.clipboard.writeText(N.short_url),R(!0),setTimeout(()=>R(!1),2e3))},J=()=>{P(null),r(""),a(""),b(""),f(""),h(""),v(!1)};return N?i.jsxs("div",{className:"lp-create-shell",children:[i.jsx("style",{children:W}),E&&i.jsx("div",{className:"lp-confetti",children:i.jsx(Be,{numberOfPieces:200,recycle:!1})}),i.jsx("div",{className:"lp-create-inner",children:i.jsxs(I.div,{className:"lp-success-card",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},children:[i.jsx("div",{className:"lp-success-glow"}),i.jsx("div",{className:"lp-success-icon",children:i.jsx(A,{size:32})}),i.jsxs("div",{className:"lp-success-badge",children:[s==="turbo"?"🚀 TURBO":"⚡ SMART"," LINK"]}),i.jsx("h2",{children:"¡Link creado!"}),i.jsxs("div",{className:"lp-success-url-box",children:[i.jsx("input",{readOnly:!0,value:N.short_url}),i.jsx("button",{onClick:Z,className:O?"copied":"",children:O?i.jsx(A,{size:18}):i.jsx(me,{size:18})})]}),i.jsxs("div",{className:"lp-success-actions",children:[i.jsx("button",{onClick:J,className:"lp-btn-ghost",children:"Crear otro"}),i.jsxs("button",{onClick:()=>e("/app/links"),className:"lp-btn-primary",children:["Mis enlaces ",i.jsx(q,{size:16})]})]})]})})]}):i.jsxs("div",{className:"lp-create-shell",children:[i.jsx("style",{children:W}),i.jsx("div",{className:"lp-create-inner",children:i.jsxs("form",{className:"lp-create-form",onSubmit:B,children:[i.jsxs("div",{className:"lp-card-v2 lp-card-url",children:[i.jsx("div",{className:"lp-card-glow"}),i.jsxs("div",{className:"lp-input-group",children:[i.jsx("div",{className:"lp-input-icon",children:i.jsx(ie,{size:20})}),i.jsx("input",{type:"text",placeholder:"Pega tu URL aquí...",value:t,onChange:j=>r(j.target.value),required:!0})]})]}),i.jsxs("div",{className:"lp-card-v2 lp-card-alias",children:[i.jsx("div",{className:"lp-card-glow"}),i.jsxs("label",{className:"lp-alias-label",children:[i.jsx(be,{size:14}),"Alias personalizado"]}),i.jsxs("div",{className:"lp-alias-input",children:[i.jsx("span",{children:"linkpay.gg/"}),i.jsx("input",{type:"text",placeholder:"mi-link",value:n,onChange:j=>a(j.target.value)})]})]}),i.jsxs("div",{className:"lp-mode-section",children:[i.jsxs("button",{type:"button",className:`lp-mode-btn ${s==="standard"?"active":""}`,onClick:()=>o("standard"),children:[i.jsx("div",{className:"lp-mode-icon standard",children:i.jsx(ne,{size:22})}),i.jsxs("div",{className:"lp-mode-info",children:[i.jsx("span",{className:"lp-mode-name",children:"Estándar"}),i.jsx("span",{className:"lp-mode-desc",children:"Equilibrio perfecto"})]}),s==="standard"&&i.jsx("div",{className:"lp-mode-check",children:i.jsx(A,{size:16})})]}),i.jsxs("button",{type:"button",className:`lp-mode-btn ${s==="turbo"?"active":""}`,onClick:()=>o("turbo"),children:[i.jsx("div",{className:"lp-mode-icon turbo",children:i.jsx(re,{size:22})}),i.jsxs("div",{className:"lp-mode-info",children:[i.jsx("span",{className:"lp-mode-name",children:"Turbo"}),i.jsx("span",{className:"lp-mode-desc",children:"Máximo ingreso"})]}),s==="turbo"&&i.jsx("div",{className:"lp-mode-check",children:i.jsx(A,{size:16})})]})]}),i.jsxs("button",{type:"button",className:"lp-advanced-btn",onClick:()=>M(!0),children:[i.jsx(V,{size:16}),i.jsx("span",{children:"Opciones avanzadas"}),i.jsx(ve,{size:16})]}),i.jsx(Pe,{children:m&&i.jsxs(i.Fragment,{children:[i.jsx(I.div,{className:"lp-modal-backdrop",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>M(!1)}),i.jsxs(I.div,{className:"lp-modal",initial:{opacity:0,y:100,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:80,scale:.95},transition:{type:"spring",damping:25,stiffness:300},children:[i.jsx("div",{className:"lp-modal-glow"}),i.jsx("div",{className:"lp-modal-handle",children:i.jsx("div",{className:"lp-modal-handle-bar"})}),i.jsxs(I.div,{className:"lp-modal-header",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[i.jsx("div",{className:"lp-modal-icon",children:i.jsx(V,{size:20})}),i.jsxs("div",{children:[i.jsx("h3",{children:"Opciones Avanzadas"}),i.jsx("p",{children:"Protege y personaliza tu enlace"})]})]}),i.jsxs("div",{className:"lp-modal-fields",children:[i.jsxs(I.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.15},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(se,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Contraseña"}),i.jsx("input",{type:"text",value:l,onChange:j=>b(j.target.value),placeholder:"Sin contraseña"})]})]}),i.jsxs(I.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(je,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Fecha de expiración"}),i.jsx("input",{type:"datetime-local",value:d,onChange:j=>f(j.target.value)})]})]}),i.jsxs(I.div,{className:"lp-modal-field",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.25},children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(oe,{size:18})}),i.jsxs("div",{className:"lp-modal-field-content",children:[i.jsx("label",{children:"Límite de clics"}),i.jsx("input",{type:"number",value:p,onChange:j=>h(j.target.value),placeholder:"Sin límite"})]})]}),i.jsxs(I.div,{className:"lp-modal-toggle-row",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.3},onClick:()=>v(!g),children:[i.jsx("div",{className:"lp-modal-field-icon",children:i.jsx(ye,{size:18})}),i.jsxs("div",{className:"lp-modal-toggle-content",children:[i.jsx("span",{children:"Enlace privado"}),i.jsx("p",{children:"No aparece en tu lista pública"})]}),i.jsx("div",{className:`lp-modal-toggle ${g?"on":""}`,children:i.jsx("div",{className:"lp-modal-toggle-thumb"})})]})]}),i.jsxs(I.button,{className:"lp-modal-close-btn",onClick:()=>M(!1),initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.35},children:[i.jsx(A,{size:18}),"Aplicar"]})]})]})}),C&&i.jsxs("div",{className:"lp-error",children:[i.jsx(le,{size:16}),C]}),i.jsx("button",{type:"submit",disabled:u,className:"lp-submit",children:u?i.jsx(ce,{className:"lp-spin",size:20}):i.jsxs(i.Fragment,{children:["Crear link ",i.jsx(q,{size:18})]})})]})})]})}const W=`
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
`;export{Ve as CreateLinkPage};
