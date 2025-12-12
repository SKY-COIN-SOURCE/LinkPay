import{d as Ba,r as p,j as m,e as _a,R as le,a as $a,f as Ha,Z as Xn,g as Ga,S as qa,h as Ua,M as Wa,C as Ya,b as Ka,A as Xa,L as Qa}from"./index-DOg_pv79.js";import{M as Ja,i as Za,u as _i,P as eo,a as to,b as ro,L as no,m as Yr}from"./proxy-mFWnWToT.js";import{C as io}from"./copy-BiHJgmav.js";import{C as ao}from"./chevron-down-DQPuVu_9.js";import{C as oo}from"./calendar-CO0QE5cs.js";import{E as so}from"./eye-off-ClW-pqlP.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],uo=Ba("check",co);function Qn(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}function lo(...t){return e=>{let r=!1;const n=t.map(i=>{const a=Qn(i,e);return!r&&typeof a=="function"&&(r=!0),a});if(r)return()=>{for(let i=0;i<n.length;i++){const a=n[i];typeof a=="function"?a():Qn(t[i],null)}}}}function fo(...t){return p.useCallback(lo(...t),t)}class ho extends p.Component{getSnapshotBeforeUpdate(e){const r=this.props.childRef.current;if(r&&e.isPresent&&!this.props.isPresent){const n=r.offsetParent,i=Za(n)&&n.offsetWidth||0,a=this.props.sizeRef.current;a.height=r.offsetHeight||0,a.width=r.offsetWidth||0,a.top=r.offsetTop,a.left=r.offsetLeft,a.right=i-a.width-a.left}return null}componentDidUpdate(){}render(){return this.props.children}}function po({children:t,isPresent:e,anchorX:r,root:n}){const i=p.useId(),a=p.useRef(null),o=p.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:s}=p.useContext(Ja),c=fo(a,t==null?void 0:t.ref);return p.useInsertionEffect(()=>{const{width:u,height:l,top:f,left:d,right:h}=o.current;if(e||!a.current||!u||!l)return;const b=r==="left"?`left: ${d}`:`right: ${h}`;a.current.dataset.motionPopId=i;const y=document.createElement("style");s&&(y.nonce=s);const R=n??document.head;return R.appendChild(y),y.sheet&&y.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${l}px !important;
            ${b}px !important;
            top: ${f}px !important;
          }
        `),()=>{R.contains(y)&&R.removeChild(y)}},[e]),m.jsx(ho,{isPresent:e,childRef:a,sizeRef:o,children:p.cloneElement(t,{ref:c})})}const vo=({children:t,initial:e,isPresent:r,onExitComplete:n,custom:i,presenceAffectsLayout:a,mode:o,anchorX:s,root:c})=>{const u=_i(go),l=p.useId();let f=!0,d=p.useMemo(()=>(f=!1,{id:l,initial:e,isPresent:r,custom:i,onExitComplete:h=>{u.set(h,!0);for(const b of u.values())if(!b)return;n&&n()},register:h=>(u.set(h,!1),()=>u.delete(h))}),[r,u,n]);return a&&f&&(d={...d}),p.useMemo(()=>{u.forEach((h,b)=>u.set(b,!1))},[r]),p.useEffect(()=>{!r&&!u.size&&n&&n()},[r]),o==="popLayout"&&(t=m.jsx(po,{isPresent:r,anchorX:s,root:c,children:t})),m.jsx(eo.Provider,{value:d,children:t})};function go(){return new Map}const tr=t=>t.key||"";function Jn(t){const e=[];return p.Children.forEach(t,r=>{p.isValidElement(r)&&e.push(r)}),e}const Zn=({children:t,custom:e,initial:r=!0,onExitComplete:n,presenceAffectsLayout:i=!0,mode:a="sync",propagate:o=!1,anchorX:s="left",root:c})=>{const[u,l]=to(o),f=p.useMemo(()=>Jn(t),[t]),d=o&&!u?[]:f.map(tr),h=p.useRef(!0),b=p.useRef(f),y=_i(()=>new Map),[R,S]=p.useState(f),[x,w]=p.useState(f);ro(()=>{h.current=!1,b.current=f;for(let g=0;g<x.length;g++){const v=tr(x[g]);d.includes(v)?y.delete(v):y.get(v)!==!0&&y.set(v,!1)}},[x,d.length,d.join("-")]);const j=[];if(f!==R){let g=[...f];for(let v=0;v<x.length;v++){const O=x[v],C=tr(O);d.includes(C)||(g.splice(v,0,O),j.push(O))}return a==="wait"&&j.length&&(g=j),w(Jn(g)),S(f),null}const{forceRender:N}=p.useContext(no);return m.jsx(m.Fragment,{children:x.map(g=>{const v=tr(g),O=o&&!u?!1:f===x||d.includes(v),C=()=>{if(y.has(v))y.set(v,!0);else return;let k=!0;y.forEach(T=>{T||(k=!1)}),k&&(N==null||N(),w(b.current),o&&(l==null||l()),n&&n())};return m.jsx(vo,{isPresent:O,initial:!h.current||r?void 0:!1,custom:e,presenceAffectsLayout:i,mode:a,root:c,onExitComplete:O?void 0:C,anchorX:s,children:g},v)})})};var mo=yo()?p.useLayoutEffect:p.useEffect;function yo(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function bo(){var t=p.useState(Object.create(null)),e=t[1];return p.useCallback(function(){e(Object.create(null))},[])}var xo=function(e){var r=e.children,n=e.type,i=n===void 0?"reach-portal":n,a=p.useRef(null),o=p.useRef(null),s=bo();return mo(function(){if(a.current){var c=a.current.ownerDocument;return o.current=c==null?void 0:c.createElement(i),c.body.appendChild(o.current),s(),function(){o.current&&o.current.ownerDocument&&o.current.ownerDocument.body.removeChild(o.current)}}},[i,s]),o.current?_a.createPortal(r,o.current):p.createElement("span",{ref:a})};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var P=function(){return P=Object.assign||function(e){for(var r,n=1,i=arguments.length;n<i;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},P.apply(this,arguments)};function En(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(r[n[i]]=t[n[i]]);return r}function F(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function $(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,a=[],o;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)a.push(i.value)}catch(s){o={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(o)throw o.error}}return a}function ee(t,e,r){if(arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))}var K;(function(t){t.Start="xstate.start",t.Stop="xstate.stop",t.Raise="xstate.raise",t.Send="xstate.send",t.Cancel="xstate.cancel",t.NullEvent="",t.Assign="xstate.assign",t.After="xstate.after",t.DoneState="done.state",t.DoneInvoke="done.invoke",t.Log="xstate.log",t.Init="xstate.init",t.Invoke="xstate.invoke",t.ErrorExecution="error.execution",t.ErrorCommunication="error.communication",t.ErrorPlatform="error.platform",t.ErrorCustom="xstate.error",t.Update="xstate.update",t.Pure="xstate.pure",t.Choose="xstate.choose"})(K||(K={}));var dt;(function(t){t.Parent="#_parent",t.Internal="#_internal"})(dt||(dt={}));var on=K.Start,On=K.Stop,qt=K.Raise,Vr=K.Send,$i=K.Cancel,wo=K.NullEvent,Rn=K.Assign;K.After;K.DoneState;var Hi=K.Log,So=K.Init,sn=K.Invoke;K.ErrorExecution;var ei=K.ErrorPlatform,Eo=K.ErrorCustom,Gi=K.Update,Oo=K.Choose,Ro=K.Pure,qi=".",ti={},cn="xstate.guard",To="",rr;function Tn(t,e,r){r===void 0&&(r=qi);var n=kt(t,r),i=kt(e,r);return Y(i)?Y(n)?i===n:!1:Y(n)?n in i:Object.keys(n).every(function(a){return a in i?Tn(n[a],i[a]):!1})}function Ui(t){try{return Y(t)||typeof t=="number"?"".concat(t):t.type}catch{throw new Error("Events must be strings or objects with a string event.type property.")}}function un(t,e){try{return vt(t)?t:t.toString().split(e)}catch{throw new Error("'".concat(t,"' is not a valid state path."))}}function Co(t){return typeof t=="object"&&"value"in t&&"context"in t&&"event"in t&&"_event"in t}function kt(t,e){if(Co(t))return t.value;if(vt(t))return Cr(t);if(typeof t!="string")return t;var r=un(t,e);return Cr(r)}function Cr(t){if(t.length===1)return t[0];for(var e={},r=e,n=0;n<t.length-1;n++)n===t.length-2?r[t[n]]=t[n+1]:(r[t[n]]={},r=r[t[n]]);return e}function Ct(t,e){for(var r={},n=Object.keys(t),i=0;i<n.length;i++){var a=n[i];r[a]=e(t[a],a,t,i)}return r}function ri(t,e,r){var n,i,a={};try{for(var o=F(Object.keys(t)),s=o.next();!s.done;s=o.next()){var c=s.value,u=t[c];r(u)&&(a[c]=e(u,c,t))}}catch(l){n={error:l}}finally{try{s&&!s.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}return a}var Po=function(t){return function(e){var r,n,i=e;try{for(var a=F(t),o=a.next();!o.done;o=a.next()){var s=o.value;i=i[s]}}catch(c){r={error:c}}finally{try{o&&!o.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}return i}};function No(t,e){return function(r){var n,i,a=r;try{for(var o=F(t),s=o.next();!s.done;s=o.next()){var c=s.value;a=a[e][c]}}catch(u){n={error:u}}finally{try{s&&!s.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}return a}}function br(t){if(!t)return[[]];if(Y(t))return[[t]];var e=ie(Object.keys(t).map(function(r){var n=t[r];return typeof n!="string"&&(!n||!Object.keys(n).length)?[[r]]:br(t[r]).map(function(i){return[r].concat(i)})}));return e}function ie(t){var e;return(e=[]).concat.apply(e,ee([],$(t),!1))}function Wi(t){return vt(t)?t:[t]}function Pe(t){return t===void 0?[]:Wi(t)}function Pr(t,e,r){var n,i;if(q(t))return t(e,r.data);var a={};try{for(var o=F(Object.keys(t)),s=o.next();!s.done;s=o.next()){var c=s.value,u=t[c];q(u)?a[c]=u(e,r.data):a[c]=u}}catch(l){n={error:l}}finally{try{s&&!s.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}return a}function jo(t){return/^(done|error)\./.test(t)}function ni(t){return!!(t instanceof Promise||t!==null&&(q(t)||typeof t=="object")&&q(t.then))}function ko(t){return t!==null&&typeof t=="object"&&"transition"in t&&typeof t.transition=="function"}function Ao(t,e){var r,n,i=$([[],[]],2),a=i[0],o=i[1];try{for(var s=F(t),c=s.next();!c.done;c=s.next()){var u=c.value;e(u)?a.push(u):o.push(u)}}catch(l){r={error:l}}finally{try{c&&!c.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}return[a,o]}function Yi(t,e){return Ct(t.states,function(r,n){if(r){var i=(Y(e)?void 0:e[n])||(r?r.current:void 0);if(i)return{current:i,states:Yi(r,i)}}})}function Do(t,e){return{current:e,states:Yi(t,e)}}function ii(t,e,r,n){var i=t&&r.reduce(function(a,o){var s,c,u=o.assignment,l={state:n,action:o,_event:e},f={};if(q(u))f=u(a,e.data,l);else try{for(var d=F(Object.keys(u)),h=d.next();!h.done;h=d.next()){var b=h.value,y=u[b];f[b]=q(y)?y(a,e.data,l):y}}catch(R){s={error:R}}finally{try{h&&!h.done&&(c=d.return)&&c.call(d)}finally{if(s)throw s.error}}return Object.assign({},a,f)},t);return i}var Io=function(){};function vt(t){return Array.isArray(t)}function q(t){return typeof t=="function"}function Y(t){return typeof t=="string"}function Ki(t,e){if(t)return Y(t)?{type:cn,name:t,predicate:e?e[t]:void 0}:q(t)?{type:cn,name:t.name,predicate:t}:t}function zo(t){try{return"subscribe"in t&&q(t.subscribe)}catch{return!1}}var Ve=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();rr={},rr[Ve]=function(){return this},rr[Symbol.observable]=function(){return this};function ht(t){return!!t&&"__xstatenode"in t}function Mo(t){return!!t&&typeof t.send=="function"}function Br(t,e){return Y(t)||typeof t=="number"?P({type:t},e):t}function de(t,e){if(!Y(t)&&"$$type"in t&&t.$$type==="scxml")return t;var r=Br(t);return P({name:r.type,data:r,$$type:"scxml",type:"external"},e)}function rt(t,e){var r=Wi(e).map(function(n){return typeof n>"u"||typeof n=="string"||ht(n)?{target:n,event:t}:P(P({},n),{event:t})});return r}function Lo(t){if(!(t===void 0||t===To))return Pe(t)}function Xi(t,e,r,n,i){var a=t.options.guards,o={state:i,cond:e,_event:n};if(e.type===cn)return((a==null?void 0:a[e.name])||e.predicate)(r,n.data,o);var s=a==null?void 0:a[e.type];if(!s)throw new Error("Guard '".concat(e.type,"' is not implemented on machine '").concat(t.id,"'."));return s(r,n.data,o)}function Qi(t){return typeof t=="string"?{type:t}:t}function xr(t,e,r){var n=function(){},i=typeof t=="object",a=i?t:null;return{next:((i?t.next:t)||n).bind(a),error:((i?t.error:e)||n).bind(a),complete:((i?t.complete:r)||n).bind(a)}}function nr(t,e){return"".concat(t,":invocation[").concat(e,"]")}function ln(t){return(t.type===qt||t.type===Vr&&t.to===dt.Internal)&&typeof t.delay!="number"}var ut=de({type:So});function fn(t,e){return e&&e[t]||void 0}function $t(t,e){var r;if(Y(t)||typeof t=="number"){var n=fn(t,e);q(n)?r={type:t,exec:n}:n?r=n:r={type:t,exec:void 0}}else if(q(t))r={type:t.name||t.toString(),exec:t};else{var n=fn(t.type,e);if(q(n))r=P(P({},t),{exec:n});else if(n){var i=n.type||t.type;r=P(P(P({},n),t),{type:i})}else r=t}return r}var Be=function(t,e){if(!t)return[];var r=vt(t)?t:[t];return r.map(function(n){return $t(n,e)})};function Cn(t){var e=$t(t);return P(P({id:Y(t)?t:e.id},e),{type:e.type})}function Fo(t,e){return{type:qt,event:typeof t=="function"?t:Br(t),delay:e?e.delay:void 0,id:e==null?void 0:e.id}}function Vo(t,e,r,n){var i={_event:r},a=de(q(t.event)?t.event(e,r.data,i):t.event),o;if(Y(t.delay)){var s=n&&n[t.delay];o=q(s)?s(e,r.data,i):s}else o=q(t.delay)?t.delay(e,r.data,i):t.delay;return P(P({},t),{type:qt,_event:a,delay:o})}function Bo(t,e){return{to:e?e.to:void 0,type:Vr,event:q(t)?t:Br(t),delay:e?e.delay:void 0,id:e&&e.id!==void 0?e.id:q(t)?t.name:Ui(t)}}function _o(t,e,r,n){var i={_event:r},a=de(q(t.event)?t.event(e,r.data,i):t.event),o;if(Y(t.delay)){var s=n&&n[t.delay];o=q(s)?s(e,r.data,i):s}else o=q(t.delay)?t.delay(e,r.data,i):t.delay;var c=q(t.to)?t.to(e,r.data,i):t.to;return P(P({},t),{to:c,_event:a,event:a.data,delay:o})}var $o=function(t,e,r){return P(P({},t),{value:Y(t.expr)?t.expr:t.expr(e,r.data,{_event:r})})},Ho=function(t){return{type:$i,sendId:t}};function Go(t){var e=Cn(t);return{type:K.Start,activity:e,exec:void 0}}function qo(t){var e=q(t)?t:Cn(t);return{type:K.Stop,activity:e,exec:void 0}}function Uo(t,e,r){var n=q(t.activity)?t.activity(e,r.data):t.activity,i=typeof n=="string"?{id:n}:n,a={type:K.Stop,activity:i};return a}var Wo=function(t){return{type:Rn,assignment:t}};function Yo(t,e){var r=e?"#".concat(e):"";return"".concat(K.After,"(").concat(t,")").concat(r)}function ir(t,e){var r="".concat(K.DoneState,".").concat(t),n={type:r,data:e};return n.toString=function(){return r},n}function wr(t,e){var r="".concat(K.DoneInvoke,".").concat(t),n={type:r,data:e};return n.toString=function(){return r},n}function Pt(t,e){var r="".concat(K.ErrorPlatform,".").concat(t),n={type:r,data:e};return n.toString=function(){return r},n}var Ko=function(t){var e,r,n=[];try{for(var i=F(t),a=i.next();!a.done;a=i.next())for(var o=a.value,s=0;s<o.actions.length;){if(o.actions[s].type===Rn){n.push(o.actions[s]),o.actions.splice(s,1);continue}s++}}catch(c){e={error:c}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return n};function Nr(t,e,r,n,i,a,o){o===void 0&&(o=!1);var s=o?[]:Ko(i),c=s.length?ii(r,n,s,e):r,u=o?[r]:void 0,l=[];function f(b,y){var R;switch(y.type){case qt:{var S=Vo(y,c,n,t.options.delays);return a&&typeof S.delay=="number"&&a(S,c,n),S}case Vr:var x=_o(y,c,n,t.options.delays);return a&&x.to!==dt.Internal&&(b==="entry"?l.push(x):a(x,c,n)),x;case Hi:{var w=$o(y,c,n);return a==null||a(w,c,n),w}case Oo:{var j=y,N=(R=j.conds.find(function(be){var oe=Ki(be.cond,t.options.guards);return!oe||Xi(t,oe,c,n,a?void 0:e)}))===null||R===void 0?void 0:R.actions;if(!N)return[];var g=$(Nr(t,e,c,n,[{type:b,actions:Be(Pe(N),t.options.actions)}],a,o),2),v=g[0],O=g[1];return c=O,u==null||u.push(c),v}case Ro:{var N=y.get(c,n.data);if(!N)return[];var C=$(Nr(t,e,c,n,[{type:b,actions:Be(Pe(N),t.options.actions)}],a,o),2),k=C[0],T=C[1];return c=T,u==null||u.push(c),k}case On:{var w=Uo(y,c,n);return a==null||a(w,r,n),w}case Rn:{c=ii(c,n,[y],a?void 0:e),u==null||u.push(c);break}default:var A=$t(y,t.options.actions),H=A.exec;if(a)a(A,c,n);else if(H&&u){var X=u.length-1,te=P(P({},A),{exec:function(be){for(var oe=[],Q=1;Q<arguments.length;Q++)oe[Q-1]=arguments[Q];H.apply(void 0,ee([u[X]],$(oe),!1))}});A=te}return A}}function d(b){var y,R,S=[];try{for(var x=F(b.actions),w=x.next();!w.done;w=x.next()){var j=w.value,N=f(b.type,j);N&&(S=S.concat(N))}}catch(g){y={error:g}}finally{try{w&&!w.done&&(R=x.return)&&R.call(x)}finally{if(y)throw y.error}}return l.forEach(function(g){a(g,c,n)}),l.length=0,S}var h=ie(i.map(d));return[h,c]}var st=function(t,e){var r=e(t);return r};function Ji(t){var e;return e={id:t,send:function(){},subscribe:function(){return{unsubscribe:function(){}}},getSnapshot:function(){},toJSON:function(){return{id:t}}},e[Ve]=function(){return this},e}function Xo(t,e,r,n){var i,a=Qi(t.src),o=(i=e==null?void 0:e.options.services)===null||i===void 0?void 0:i[a.type],s=t.data?Pr(t.data,r,n):void 0,c=o?Zi(o,t.id,s):Ji(t.id);return c.meta=t,c}function Zi(t,e,r){var n=Ji(e);if(n.deferred=!0,ht(t)){var i=n.state=st(void 0,function(){return(r?t.withContext(r):t).initialState});n.getSnapshot=function(){return i}}return n}function Qo(t){try{return typeof t.send=="function"}catch{return!1}}function Jo(t){return Qo(t)&&"id"in t}function Zo(t){var e;return P((e={subscribe:function(){return{unsubscribe:function(){}}},id:"anonymous",getSnapshot:function(){}},e[Ve]=function(){return this},e),t)}var jr=function(t){return t.type==="atomic"||t.type==="final"};function ea(t){return Object.keys(t.states).map(function(e){return t.states[e]})}function Ht(t){return ea(t).filter(function(e){return e.type!=="history"})}function ta(t){var e=[t];return jr(t)?e:e.concat(ie(Ht(t).map(ta)))}function Nt(t,e){var r,n,i,a,o,s,c,u,l=new Set(t),f=dn(l),d=new Set(e);try{for(var h=F(d),b=h.next();!b.done;b=h.next())for(var y=b.value,R=y.parent;R&&!d.has(R);)d.add(R),R=R.parent}catch(C){r={error:C}}finally{try{b&&!b.done&&(n=h.return)&&n.call(h)}finally{if(r)throw r.error}}var S=dn(d);try{for(var x=F(d),w=x.next();!w.done;w=x.next()){var y=w.value;if(y.type==="compound"&&(!S.get(y)||!S.get(y).length))f.get(y)?f.get(y).forEach(function(k){return d.add(k)}):y.initialStateNodes.forEach(function(k){return d.add(k)});else if(y.type==="parallel")try{for(var j=(o=void 0,F(Ht(y))),N=j.next();!N.done;N=j.next()){var g=N.value;d.has(g)||(d.add(g),f.get(g)?f.get(g).forEach(function(k){return d.add(k)}):g.initialStateNodes.forEach(function(k){return d.add(k)}))}}catch(k){o={error:k}}finally{try{N&&!N.done&&(s=j.return)&&s.call(j)}finally{if(o)throw o.error}}}}catch(C){i={error:C}}finally{try{w&&!w.done&&(a=x.return)&&a.call(x)}finally{if(i)throw i.error}}try{for(var v=F(d),O=v.next();!O.done;O=v.next())for(var y=O.value,R=y.parent;R&&!d.has(R);)d.add(R),R=R.parent}catch(C){c={error:C}}finally{try{O&&!O.done&&(u=v.return)&&u.call(v)}finally{if(c)throw c.error}}return d}function ra(t,e){var r=e.get(t);if(!r)return{};if(t.type==="compound"){var n=r[0];if(n){if(jr(n))return n.key}else return{}}var i={};return r.forEach(function(a){i[a.key]=ra(a,e)}),i}function dn(t){var e,r,n=new Map;try{for(var i=F(t),a=i.next();!a.done;a=i.next()){var o=a.value;n.has(o)||n.set(o,[]),o.parent&&(n.has(o.parent)||n.set(o.parent,[]),n.get(o.parent).push(o))}}catch(s){e={error:s}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return n}function es(t,e){var r=Nt([t],e);return ra(t,dn(r))}function jt(t,e){return Array.isArray(t)?t.some(function(r){return r===e}):t instanceof Set?t.has(e):!1}function ts(t){return ee([],$(new Set(ie(ee([],$(t.map(function(e){return e.ownEvents})),!1)))),!1)}function Sr(t,e){return e.type==="compound"?Ht(e).some(function(r){return r.type==="final"&&jt(t,r)}):e.type==="parallel"?Ht(e).every(function(r){return Sr(t,r)}):!1}function rs(t){return t===void 0&&(t=[]),t.reduce(function(e,r){return r.meta!==void 0&&(e[r.id]=r.meta),e},{})}function ai(t){return new Set(ie(t.map(function(e){return e.tags})))}function na(t,e){if(t===e)return!0;if(t===void 0||e===void 0)return!1;if(Y(t)||Y(e))return t===e;var r=Object.keys(t),n=Object.keys(e);return r.length===n.length&&r.every(function(i){return na(t[i],e[i])})}function ns(t){return typeof t!="object"||t===null?!1:"value"in t&&"_event"in t}function is(t,e){var r=t.exec,n=P(P({},t),{exec:r!==void 0?function(){return r(e.context,e.event,{action:t,state:e,_event:e._event})}:void 0});return n}var Oe=function(){function t(e){var r=this,n;this.actions=[],this.activities=ti,this.meta={},this.events=[],this.value=e.value,this.context=e.context,this._event=e._event,this._sessionid=e._sessionid,this.event=this._event.data,this.historyValue=e.historyValue,this.history=e.history,this.actions=e.actions||[],this.activities=e.activities||ti,this.meta=rs(e.configuration),this.events=e.events||[],this.matches=this.matches.bind(this),this.toStrings=this.toStrings.bind(this),this.configuration=e.configuration,this.transitions=e.transitions,this.children=e.children,this.done=!!e.done,this.tags=(n=Array.isArray(e.tags)?new Set(e.tags):e.tags)!==null&&n!==void 0?n:new Set,this.machine=e.machine,Object.defineProperty(this,"nextEvents",{get:function(){return ts(r.configuration)}})}return t.from=function(e,r){if(e instanceof t)return e.context!==r?new t({value:e.value,context:r,_event:e._event,_sessionid:null,historyValue:e.historyValue,history:e.history,actions:[],activities:e.activities,events:[],configuration:[],transitions:[],children:{}}):e;var n=ut;return new t({value:e,context:r,_event:n,_sessionid:null,historyValue:void 0,history:void 0,actions:[],activities:void 0,events:[],configuration:[],transitions:[],children:{}})},t.create=function(e){return new t(e)},t.inert=function(e,r){if(e instanceof t){if(!e.actions.length)return e;var n=ut;return new t({value:e.value,context:r,_event:n,_sessionid:null,historyValue:e.historyValue,history:e.history,activities:e.activities,configuration:e.configuration,transitions:[],children:{}})}return t.from(e,r)},t.prototype.toStrings=function(e,r){var n=this;if(e===void 0&&(e=this.value),r===void 0&&(r="."),Y(e))return[e];var i=Object.keys(e);return i.concat.apply(i,ee([],$(i.map(function(a){return n.toStrings(e[a],r).map(function(o){return a+r+o})})),!1))},t.prototype.toJSON=function(){var e=this;e.configuration,e.transitions;var r=e.tags;e.machine;var n=En(e,["configuration","transitions","tags","machine"]);return P(P({},n),{tags:Array.from(r)})},t.prototype.matches=function(e){return Tn(e,this.value)},t.prototype.hasTag=function(e){return this.tags.has(e)},t.prototype.can=function(e){var r;Io(!!this.machine);var n=(r=this.machine)===null||r===void 0?void 0:r.getTransitionData(this,e);return!!(n!=null&&n.transitions.length)&&n.transitions.some(function(i){return i.target!==void 0||i.actions.length})},t}(),as={deferEvents:!1},oi=function(){function t(e){this.processingEvent=!1,this.queue=[],this.initialized=!1,this.options=P(P({},as),e)}return t.prototype.initialize=function(e){if(this.initialized=!0,e){if(!this.options.deferEvents){this.schedule(e);return}this.process(e)}this.flushEvents()},t.prototype.schedule=function(e){if(!this.initialized||this.processingEvent){this.queue.push(e);return}if(this.queue.length!==0)throw new Error("Event queue should be empty when it is not processing events");this.process(e),this.flushEvents()},t.prototype.clear=function(){this.queue=[]},t.prototype.flushEvents=function(){for(var e=this.queue.shift();e;)this.process(e),e=this.queue.shift()},t.prototype.process=function(e){this.processingEvent=!0;try{e()}catch(r){throw this.clear(),r}finally{this.processingEvent=!1}},t}(),Kr=new Map,os=0,St={bookId:function(){return"x:".concat(os++)},register:function(t,e){return Kr.set(t,e),t},get:function(t){return Kr.get(t)},free:function(t){Kr.delete(t)}};function Pn(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global}function ss(){var t=Pn();if(t&&"__xstate__"in t)return t.__xstate__}function cs(t){if(Pn()){var e=ss();e&&e.register(t)}}function us(t,e){e===void 0&&(e={});var r=t.initialState,n=new Set,i=[],a=!1,o=function(){if(!a){for(a=!0;i.length>0;){var u=i.shift();r=t.transition(r,u,c),n.forEach(function(l){return l.next(r)})}a=!1}},s=Zo({id:e.id,send:function(u){i.push(u),o()},getSnapshot:function(){return r},subscribe:function(u,l,f){var d=xr(u,l,f);return n.add(d),d.next(r),{unsubscribe:function(){n.delete(d)}}}}),c={parent:e.parent,self:s,id:e.id||"anonymous",observers:n};return r=t.start?t.start(c):r,s}var ls={sync:!1,autoForward:!1},ue;(function(t){t[t.NotStarted=0]="NotStarted",t[t.Running=1]="Running",t[t.Stopped=2]="Stopped"})(ue||(ue={}));var fs=function(){function t(e,r){r===void 0&&(r=t.defaultOptions);var n=this;this.machine=e,this.delayedEventsMap={},this.listeners=new Set,this.contextListeners=new Set,this.stopListeners=new Set,this.doneListeners=new Set,this.eventListeners=new Set,this.sendListeners=new Set,this.initialized=!1,this.status=ue.NotStarted,this.children=new Map,this.forwardTo=new Set,this._outgoingQueue=[],this.init=this.start,this.send=function(l,f){if(vt(l))return n.batch(l),n.state;var d=de(Br(l,f));if(n.status===ue.Stopped)return n.state;if(n.status!==ue.Running&&!n.options.deferEvents)throw new Error('Event "'.concat(d.name,'" was sent to uninitialized service "').concat(n.machine.id,`". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.
Event: `).concat(JSON.stringify(d.data)));return n.scheduler.schedule(function(){n.forward(d);var h=n._nextState(d);n.update(h,d)}),n._state},this.sendTo=function(l,f,d){var h=n.parent&&(f===dt.Parent||n.parent.id===f),b=h?n.parent:Y(f)?f===dt.Internal?n:n.children.get(f)||St.get(f):Mo(f)?f:void 0;if(!b){if(!h)throw new Error("Unable to send event to child '".concat(f,"' from service '").concat(n.id,"'."));return}if("machine"in b){if(n.status!==ue.Stopped||n.parent!==b||n.state.done){var y=P(P({},l),{name:l.name===Eo?"".concat(Pt(n.id)):l.name,origin:n.sessionId});!d&&n.machine.config.predictableActionArguments?n._outgoingQueue.push([b,y]):b.send(y)}}else!d&&n.machine.config.predictableActionArguments?n._outgoingQueue.push([b,l.data]):b.send(l.data)},this._exec=function(l,f,d,h){h===void 0&&(h=n.machine.options.actions);var b=l.exec||fn(l.type,h),y=q(b)?b:b?b.exec:l.exec;if(y)try{return y(f,d.data,n.machine.config.predictableActionArguments?{action:l,_event:d}:{action:l,state:n.state,_event:d})}catch(X){throw n.parent&&n.parent.send({type:"xstate.error",data:X}),X}switch(l.type){case qt:{var R=l;n.defer(R);break}case Vr:var S=l;if(typeof S.delay=="number"){n.defer(S);return}else S.to?n.sendTo(S._event,S.to,d===ut):n.send(S._event);break;case $i:n.cancel(l.sendId);break;case on:{if(n.status!==ue.Running)return;var x=l.activity;if(!n.machine.config.predictableActionArguments&&!n.state.activities[x.id||x.type])break;if(x.type===K.Invoke){var w=Qi(x.src),j=n.machine.options.services?n.machine.options.services[w.type]:void 0,N=x.id,g=x.data,v="autoForward"in x?x.autoForward:!!x.forward;if(!j)return;var O=g?Pr(g,f,d):void 0;if(typeof j=="string")return;var C=q(j)?j(f,d.data,{data:O,src:w,meta:x.meta}):j;if(!C)return;var k=void 0;ht(C)&&(C=O?C.withContext(O):C,k={autoForward:v}),n.spawn(C,N,k)}else n.spawnActivity(x);break}case On:{n.stopChild(l.activity.id);break}case Hi:var T=l,A=T.label,H=T.value;A?n.logger(A,H):n.logger(H);break}};var i=P(P({},t.defaultOptions),r),a=i.clock,o=i.logger,s=i.parent,c=i.id,u=c!==void 0?c:e.id;this.id=u,this.logger=o,this.clock=a,this.parent=s,this.options=i,this.scheduler=new oi({deferEvents:this.options.deferEvents}),this.sessionId=St.bookId()}return Object.defineProperty(t.prototype,"initialState",{get:function(){var e=this;return this._initialState?this._initialState:st(this,function(){return e._initialState=e.machine.initialState,e._initialState})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this._state},enumerable:!1,configurable:!0}),t.prototype.execute=function(e,r){var n,i;try{for(var a=F(e.actions),o=a.next();!o.done;o=a.next()){var s=o.value;this.exec(s,e,r)}}catch(c){n={error:c}}finally{try{o&&!o.done&&(i=a.return)&&i.call(a)}finally{if(n)throw n.error}}},t.prototype.update=function(e,r){var n,i,a,o,s,c,u,l,f=this;if(e._sessionid=this.sessionId,this._state=e,(!this.machine.config.predictableActionArguments||r===ut)&&this.options.execute)this.execute(this.state);else for(var d=void 0;d=this._outgoingQueue.shift();)d[0].send(d[1]);if(this.children.forEach(function(C){f.state.children[C.id]=C}),this.devTools&&this.devTools.send(r.data,e),e.event)try{for(var h=F(this.eventListeners),b=h.next();!b.done;b=h.next()){var y=b.value;y(e.event)}}catch(C){n={error:C}}finally{try{b&&!b.done&&(i=h.return)&&i.call(h)}finally{if(n)throw n.error}}try{for(var R=F(this.listeners),S=R.next();!S.done;S=R.next()){var y=S.value;y(e,e.event)}}catch(C){a={error:C}}finally{try{S&&!S.done&&(o=R.return)&&o.call(R)}finally{if(a)throw a.error}}try{for(var x=F(this.contextListeners),w=x.next();!w.done;w=x.next()){var j=w.value;j(this.state.context,this.state.history?this.state.history.context:void 0)}}catch(C){s={error:C}}finally{try{w&&!w.done&&(c=x.return)&&c.call(x)}finally{if(s)throw s.error}}if(this.state.done){var N=e.configuration.find(function(C){return C.type==="final"&&C.parent===f.machine}),g=N&&N.doneData?Pr(N.doneData,e.context,r):void 0;this._doneEvent=wr(this.id,g);try{for(var v=F(this.doneListeners),O=v.next();!O.done;O=v.next()){var y=O.value;y(this._doneEvent)}}catch(C){u={error:C}}finally{try{O&&!O.done&&(l=v.return)&&l.call(v)}finally{if(u)throw u.error}}this._stop(),this._stopChildren(),St.free(this.sessionId)}},t.prototype.onTransition=function(e){return this.listeners.add(e),this.status===ue.Running&&e(this.state,this.state.event),this},t.prototype.subscribe=function(e,r,n){var i=this,a=xr(e,r,n);this.listeners.add(a.next),this.status!==ue.NotStarted&&a.next(this.state);var o=function(){i.doneListeners.delete(o),i.stopListeners.delete(o),a.complete()};return this.status===ue.Stopped?a.complete():(this.onDone(o),this.onStop(o)),{unsubscribe:function(){i.listeners.delete(a.next),i.doneListeners.delete(o),i.stopListeners.delete(o)}}},t.prototype.onEvent=function(e){return this.eventListeners.add(e),this},t.prototype.onSend=function(e){return this.sendListeners.add(e),this},t.prototype.onChange=function(e){return this.contextListeners.add(e),this},t.prototype.onStop=function(e){return this.stopListeners.add(e),this},t.prototype.onDone=function(e){return this.status===ue.Stopped&&this._doneEvent?e(this._doneEvent):this.doneListeners.add(e),this},t.prototype.off=function(e){return this.listeners.delete(e),this.eventListeners.delete(e),this.sendListeners.delete(e),this.stopListeners.delete(e),this.doneListeners.delete(e),this.contextListeners.delete(e),this},t.prototype.start=function(e){var r=this;if(this.status===ue.Running)return this;this.machine._init(),St.register(this.sessionId,this),this.initialized=!0,this.status=ue.Running;var n=e===void 0?this.initialState:st(this,function(){return ns(e)?r.machine.resolveState(e):r.machine.resolveState(Oe.from(e,r.machine.context))});return this.options.devTools&&this.attachDev(),this.scheduler.initialize(function(){r.update(n,ut)}),this},t.prototype._stopChildren=function(){this.children.forEach(function(e){q(e.stop)&&e.stop()}),this.children.clear()},t.prototype._stop=function(){var e,r,n,i,a,o,s,c,u,l;try{for(var f=F(this.listeners),d=f.next();!d.done;d=f.next()){var h=d.value;this.listeners.delete(h)}}catch(v){e={error:v}}finally{try{d&&!d.done&&(r=f.return)&&r.call(f)}finally{if(e)throw e.error}}try{for(var b=F(this.stopListeners),y=b.next();!y.done;y=b.next()){var h=y.value;h(),this.stopListeners.delete(h)}}catch(v){n={error:v}}finally{try{y&&!y.done&&(i=b.return)&&i.call(b)}finally{if(n)throw n.error}}try{for(var R=F(this.contextListeners),S=R.next();!S.done;S=R.next()){var h=S.value;this.contextListeners.delete(h)}}catch(v){a={error:v}}finally{try{S&&!S.done&&(o=R.return)&&o.call(R)}finally{if(a)throw a.error}}try{for(var x=F(this.doneListeners),w=x.next();!w.done;w=x.next()){var h=w.value;this.doneListeners.delete(h)}}catch(v){s={error:v}}finally{try{w&&!w.done&&(c=x.return)&&c.call(x)}finally{if(s)throw s.error}}if(!this.initialized)return this;this.initialized=!1,this.status=ue.Stopped,this._initialState=void 0;try{for(var j=F(Object.keys(this.delayedEventsMap)),N=j.next();!N.done;N=j.next()){var g=N.value;this.clock.clearTimeout(this.delayedEventsMap[g])}}catch(v){u={error:v}}finally{try{N&&!N.done&&(l=j.return)&&l.call(j)}finally{if(u)throw u.error}}this.scheduler.clear(),this.scheduler=new oi({deferEvents:this.options.deferEvents})},t.prototype.stop=function(){var e=this,r=this.scheduler;return this._stop(),r.schedule(function(){var n;if(!(!((n=e._state)===null||n===void 0)&&n.done)){var i=de({type:"xstate.stop"}),a=st(e,function(){var o=ie(ee([],$(e.state.configuration),!1).sort(function(f,d){return d.order-f.order}).map(function(f){return Be(f.onExit,e.machine.options.actions)})),s=$(Nr(e.machine,e.state,e.state.context,i,[{type:"exit",actions:o}],e.machine.config.predictableActionArguments?e._exec:void 0,e.machine.config.predictableActionArguments||e.machine.config.preserveActionOrder),2),c=s[0],u=s[1],l=new Oe({value:e.state.value,context:u,_event:i,_sessionid:e.sessionId,historyValue:void 0,history:e.state,actions:c.filter(function(f){return!ln(f)}),activities:{},events:[],configuration:[],transitions:[],children:{},done:e.state.done,tags:e.state.tags,machine:e.machine});return l.changed=!0,l});e.update(a,i),e._stopChildren(),St.free(e.sessionId)}}),this},t.prototype.batch=function(e){var r=this;if(!(this.status===ue.NotStarted&&this.options.deferEvents)){if(this.status!==ue.Running)throw new Error("".concat(e.length,' event(s) were sent to uninitialized service "').concat(this.machine.id,'". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.'))}if(e.length){var n=!!this.machine.config.predictableActionArguments&&this._exec;this.scheduler.schedule(function(){var i,a,o=r.state,s=!1,c=[],u=function(h){var b=de(h);r.forward(b),o=st(r,function(){return r.machine.transition(o,b,void 0,n||void 0)}),c.push.apply(c,ee([],$(r.machine.config.predictableActionArguments?o.actions:o.actions.map(function(y){return is(y,o)})),!1)),s=s||!!o.changed};try{for(var l=F(e),f=l.next();!f.done;f=l.next()){var d=f.value;u(d)}}catch(h){i={error:h}}finally{try{f&&!f.done&&(a=l.return)&&a.call(l)}finally{if(i)throw i.error}}o.changed=s,o.actions=c,r.update(o,de(e[e.length-1]))})}},t.prototype.sender=function(e){return this.send.bind(this,e)},t.prototype._nextState=function(e,r){var n=this;r===void 0&&(r=!!this.machine.config.predictableActionArguments&&this._exec);var i=de(e);if(i.name.indexOf(ei)===0&&!this.state.nextEvents.some(function(o){return o.indexOf(ei)===0}))throw i.data.data;var a=st(this,function(){return n.machine.transition(n.state,i,void 0,r||void 0)});return a},t.prototype.nextState=function(e){return this._nextState(e,!1)},t.prototype.forward=function(e){var r,n;try{for(var i=F(this.forwardTo),a=i.next();!a.done;a=i.next()){var o=a.value,s=this.children.get(o);if(!s)throw new Error("Unable to forward event '".concat(e,"' from interpreter '").concat(this.id,"' to nonexistant child '").concat(o,"'."));s.send(e)}}catch(c){r={error:c}}finally{try{a&&!a.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}},t.prototype.defer=function(e){var r=this,n=this.clock.setTimeout(function(){"to"in e&&e.to?r.sendTo(e._event,e.to,!0):r.send(e._event)},e.delay);e.id&&(this.delayedEventsMap[e.id]=n)},t.prototype.cancel=function(e){this.clock.clearTimeout(this.delayedEventsMap[e]),delete this.delayedEventsMap[e]},t.prototype.exec=function(e,r,n){n===void 0&&(n=this.machine.options.actions),this._exec(e,r.context,r._event,n)},t.prototype.removeChild=function(e){var r;this.children.delete(e),this.forwardTo.delete(e),(r=this.state)===null||r===void 0||delete r.children[e]},t.prototype.stopChild=function(e){var r=this.children.get(e);r&&(this.removeChild(e),q(r.stop)&&r.stop())},t.prototype.spawn=function(e,r,n){if(this.status!==ue.Running)return Zi(e,r);if(ni(e))return this.spawnPromise(Promise.resolve(e),r);if(q(e))return this.spawnCallback(e,r);if(Jo(e))return this.spawnActor(e,r);if(zo(e))return this.spawnObservable(e,r);if(ht(e))return this.spawnMachine(e,P(P({},n),{id:r}));if(ko(e))return this.spawnBehavior(e,r);throw new Error('Unable to spawn entity "'.concat(r,'" of type "').concat(typeof e,'".'))},t.prototype.spawnMachine=function(e,r){var n=this;r===void 0&&(r={});var i=new t(e,P(P({},this.options),{parent:this,id:r.id||e.id})),a=P(P({},ls),r);a.sync&&i.onTransition(function(s){n.send(Gi,{state:s,id:i.id})});var o=i;return this.children.set(i.id,o),a.autoForward&&this.forwardTo.add(i.id),i.onDone(function(s){n.removeChild(i.id),n.send(de(s,{origin:i.id}))}).start(),o},t.prototype.spawnBehavior=function(e,r){var n=us(e,{id:r,parent:this});return this.children.set(r,n),n},t.prototype.spawnPromise=function(e,r){var n,i=this,a=!1,o;e.then(function(c){a||(o=c,i.removeChild(r),i.send(de(wr(r,c),{origin:r})))},function(c){if(!a){i.removeChild(r);var u=Pt(r,c);try{i.send(de(u,{origin:r}))}catch{i.devTools&&i.devTools.send(u,i.state),i.machine.strict&&i.stop()}}});var s=(n={id:r,send:function(){},subscribe:function(c,u,l){var f=xr(c,u,l),d=!1;return e.then(function(h){d||(f.next(h),!d&&f.complete())},function(h){d||f.error(h)}),{unsubscribe:function(){return d=!0}}},stop:function(){a=!0},toJSON:function(){return{id:r}},getSnapshot:function(){return o}},n[Ve]=function(){return this},n);return this.children.set(r,s),s},t.prototype.spawnCallback=function(e,r){var n,i=this,a=!1,o=new Set,s=new Set,c,u=function(d){c=d,s.forEach(function(h){return h(d)}),!a&&i.send(de(d,{origin:r}))},l;try{l=e(u,function(d){o.add(d)})}catch(d){this.send(Pt(r,d))}if(ni(l))return this.spawnPromise(l,r);var f=(n={id:r,send:function(d){return o.forEach(function(h){return h(d)})},subscribe:function(d){var h=xr(d);return s.add(h.next),{unsubscribe:function(){s.delete(h.next)}}},stop:function(){a=!0,q(l)&&l()},toJSON:function(){return{id:r}},getSnapshot:function(){return c}},n[Ve]=function(){return this},n);return this.children.set(r,f),f},t.prototype.spawnObservable=function(e,r){var n,i=this,a,o=e.subscribe(function(c){a=c,i.send(de(c,{origin:r}))},function(c){i.removeChild(r),i.send(de(Pt(r,c),{origin:r}))},function(){i.removeChild(r),i.send(de(wr(r),{origin:r}))}),s=(n={id:r,send:function(){},subscribe:function(c,u,l){return e.subscribe(c,u,l)},stop:function(){return o.unsubscribe()},getSnapshot:function(){return a},toJSON:function(){return{id:r}}},n[Ve]=function(){return this},n);return this.children.set(r,s),s},t.prototype.spawnActor=function(e,r){return this.children.set(r,e),e},t.prototype.spawnActivity=function(e){var r=this.machine.options&&this.machine.options.activities?this.machine.options.activities[e.type]:void 0;if(r){var n=r(this.state.context,e);this.spawnEffect(e.id,n)}},t.prototype.spawnEffect=function(e,r){var n;this.children.set(e,(n={id:e,send:function(){},subscribe:function(){return{unsubscribe:function(){}}},stop:r||void 0,getSnapshot:function(){},toJSON:function(){return{id:e}}},n[Ve]=function(){return this},n))},t.prototype.attachDev=function(){var e=Pn();if(this.options.devTools&&e){if(e.__REDUX_DEVTOOLS_EXTENSION__){var r=typeof this.options.devTools=="object"?this.options.devTools:void 0;this.devTools=e.__REDUX_DEVTOOLS_EXTENSION__.connect(P(P({name:this.id,autoPause:!0,stateSanitizer:function(n){return{value:n.value,context:n.context,actions:n.actions}}},r),{features:P({jump:!1,skip:!1},r?r.features:void 0)}),this.machine),this.devTools.init(this.state)}cs(this)}},t.prototype.toJSON=function(){return{id:this.id}},t.prototype[Ve]=function(){return this},t.prototype.getSnapshot=function(){return this.status===ue.NotStarted?this.initialState:this._state},t.defaultOptions={execute:!0,deferEvents:!0,clock:{setTimeout:function(e,r){return setTimeout(e,r)},clearTimeout:function(e){return clearTimeout(e)}},logger:console.log.bind(console),devTools:!1},t.interpret=ia,t}();function ia(t,e){var r=new fs(t,e);return r}function ds(t){if(typeof t=="string"){var e={type:t};return e.toString=function(){return t},e}return t}function ar(t){return P(P({type:sn},t),{toJSON:function(){t.onDone,t.onError;var e=En(t,["onDone","onError"]);return P(P({},e),{type:sn,src:ds(t.src)})}})}var or="",hn="#",Xr="*",nt={},it=function(t){return t[0]===hn},hs=function(){return{actions:{},guards:{},services:{},activities:{},delays:{}}},ps=function(){function t(e,r,n,i){n===void 0&&(n="context"in e?e.context:void 0);var a=this,o;this.config=e,this._context=n,this.order=-1,this.__xstatenode=!0,this.__cache={events:void 0,relativeValue:new Map,initialStateValue:void 0,initialState:void 0,on:void 0,transitions:void 0,candidates:{},delayedTransitions:void 0},this.idMap={},this.tags=[],this.options=Object.assign(hs(),r),this.parent=i==null?void 0:i.parent,this.key=this.config.key||(i==null?void 0:i.key)||this.config.id||"(machine)",this.machine=this.parent?this.parent.machine:this,this.path=this.parent?this.parent.path.concat(this.key):[],this.delimiter=this.config.delimiter||(this.parent?this.parent.delimiter:qi),this.id=this.config.id||ee([this.machine.key],$(this.path),!1).join(this.delimiter),this.version=this.parent?this.parent.version:this.config.version,this.type=this.config.type||(this.config.parallel?"parallel":this.config.states&&Object.keys(this.config.states).length?"compound":this.config.history?"history":"atomic"),this.schema=this.parent?this.machine.schema:(o=this.config.schema)!==null&&o!==void 0?o:{},this.description=this.config.description,this.initial=this.config.initial,this.states=this.config.states?Ct(this.config.states,function(u,l){var f,d=new t(u,{},void 0,{parent:a,key:l});return Object.assign(a.idMap,P((f={},f[d.id]=d,f),d.idMap)),d}):nt;var s=0;function c(u){var l,f;u.order=s++;try{for(var d=F(ea(u)),h=d.next();!h.done;h=d.next()){var b=h.value;c(b)}}catch(y){l={error:y}}finally{try{h&&!h.done&&(f=d.return)&&f.call(d)}finally{if(l)throw l.error}}}c(this),this.history=this.config.history===!0?"shallow":this.config.history||!1,this._transient=!!this.config.always||(this.config.on?Array.isArray(this.config.on)?this.config.on.some(function(u){var l=u.event;return l===or}):or in this.config.on:!1),this.strict=!!this.config.strict,this.onEntry=Pe(this.config.entry||this.config.onEntry).map(function(u){return $t(u)}),this.onExit=Pe(this.config.exit||this.config.onExit).map(function(u){return $t(u)}),this.meta=this.config.meta,this.doneData=this.type==="final"?this.config.data:void 0,this.invoke=Pe(this.config.invoke).map(function(u,l){var f,d;if(ht(u)){var h=nr(a.id,l);return a.machine.options.services=P((f={},f[h]=u,f),a.machine.options.services),ar({src:h,id:h})}else if(Y(u.src)){var h=u.id||nr(a.id,l);return ar(P(P({},u),{id:h,src:u.src}))}else if(ht(u.src)||q(u.src)){var h=u.id||nr(a.id,l);return a.machine.options.services=P((d={},d[h]=u.src,d),a.machine.options.services),ar(P(P({id:h},u),{src:h}))}else{var b=u.src;return ar(P(P({id:nr(a.id,l)},u),{src:b}))}}),this.activities=Pe(this.config.activities).concat(this.invoke).map(function(u){return Cn(u)}),this.transition=this.transition.bind(this),this.tags=Pe(this.config.tags)}return t.prototype._init=function(){this.__cache.transitions||ta(this).forEach(function(e){return e.on})},t.prototype.withConfig=function(e,r){var n=this.options,i=n.actions,a=n.activities,o=n.guards,s=n.services,c=n.delays;return new t(this.config,{actions:P(P({},i),e.actions),activities:P(P({},a),e.activities),guards:P(P({},o),e.guards),services:P(P({},s),e.services),delays:P(P({},c),e.delays)},r??this.context)},t.prototype.withContext=function(e){return new t(this.config,this.options,e)},Object.defineProperty(t.prototype,"context",{get:function(){return q(this._context)?this._context():this._context},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"definition",{get:function(){return{id:this.id,key:this.key,version:this.version,context:this.context,type:this.type,initial:this.initial,history:this.history,states:Ct(this.states,function(e){return e.definition}),on:this.on,transitions:this.transitions,entry:this.onEntry,exit:this.onExit,activities:this.activities||[],meta:this.meta,order:this.order||-1,data:this.doneData,invoke:this.invoke,description:this.description,tags:this.tags}},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return this.definition},Object.defineProperty(t.prototype,"on",{get:function(){if(this.__cache.on)return this.__cache.on;var e=this.transitions;return this.__cache.on=e.reduce(function(r,n){return r[n.eventType]=r[n.eventType]||[],r[n.eventType].push(n),r},{})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"after",{get:function(){return this.__cache.delayedTransitions||(this.__cache.delayedTransitions=this.getDelayedTransitions(),this.__cache.delayedTransitions)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"transitions",{get:function(){return this.__cache.transitions||(this.__cache.transitions=this.formatTransitions(),this.__cache.transitions)},enumerable:!1,configurable:!0}),t.prototype.getCandidates=function(e){if(this.__cache.candidates[e])return this.__cache.candidates[e];var r=e===or,n=this.transitions.filter(function(i){var a=i.eventType===e;return r?a:a||i.eventType===Xr});return this.__cache.candidates[e]=n,n},t.prototype.getDelayedTransitions=function(){var e=this,r=this.config.after;if(!r)return[];var n=function(a,o){var s=q(a)?"".concat(e.id,":delay[").concat(o,"]"):a,c=Yo(s,e.id);return e.onEntry.push(Bo(c,{delay:a})),e.onExit.push(Ho(c)),c},i=vt(r)?r.map(function(a,o){var s=n(a.delay,o);return P(P({},a),{event:s})}):ie(Object.keys(r).map(function(a,o){var s=r[a],c=Y(s)?{target:s}:s,u=isNaN(+a)?a:+a,l=n(u,o);return Pe(c).map(function(f){return P(P({},f),{event:l,delay:u})})}));return i.map(function(a){var o=a.delay;return P(P({},e.formatTransition(a)),{delay:o})})},t.prototype.getStateNodes=function(e){var r,n=this;if(!e)return[];var i=e instanceof Oe?e.value:kt(e,this.delimiter);if(Y(i)){var a=this.getStateNode(i).initial;return a!==void 0?this.getStateNodes((r={},r[i]=a,r)):[this,this.states[i]]}var o=Object.keys(i),s=[this];return s.push.apply(s,ee([],$(ie(o.map(function(c){return n.getStateNode(c).getStateNodes(i[c])}))),!1)),s},t.prototype.handles=function(e){var r=Ui(e);return this.events.includes(r)},t.prototype.resolveState=function(e){var r=e instanceof Oe?e:Oe.create(e),n=Array.from(Nt([],this.getStateNodes(r.value)));return new Oe(P(P({},r),{value:this.resolve(r.value),configuration:n,done:Sr(n,this),tags:ai(n),machine:this.machine}))},t.prototype.transitionLeafNode=function(e,r,n){var i=this.getStateNode(e),a=i.next(r,n);return!a||!a.transitions.length?this.next(r,n):a},t.prototype.transitionCompoundNode=function(e,r,n){var i=Object.keys(e),a=this.getStateNode(i[0]),o=a._transition(e[i[0]],r,n);return!o||!o.transitions.length?this.next(r,n):o},t.prototype.transitionParallelNode=function(e,r,n){var i,a,o={};try{for(var s=F(Object.keys(e)),c=s.next();!c.done;c=s.next()){var u=c.value,l=e[u];if(l){var f=this.getStateNode(u),d=f._transition(l,r,n);d&&(o[u]=d)}}}catch(S){i={error:S}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(i)throw i.error}}var h=Object.keys(o).map(function(S){return o[S]}),b=ie(h.map(function(S){return S.transitions})),y=h.some(function(S){return S.transitions.length>0});if(!y)return this.next(r,n);var R=ie(Object.keys(o).map(function(S){return o[S].configuration}));return{transitions:b,exitSet:ie(h.map(function(S){return S.exitSet})),configuration:R,source:r,actions:ie(Object.keys(o).map(function(S){return o[S].actions}))}},t.prototype._transition=function(e,r,n){return Y(e)?this.transitionLeafNode(e,r,n):Object.keys(e).length===1?this.transitionCompoundNode(e,r,n):this.transitionParallelNode(e,r,n)},t.prototype.getTransitionData=function(e,r){return this._transition(e.value,e,de(r))},t.prototype.next=function(e,r){var n,i,a=this,o=r.name,s=[],c=[],u;try{for(var l=F(this.getCandidates(o)),f=l.next();!f.done;f=l.next()){var d=f.value,h=d.cond,b=d.in,y=e.context,R=b?Y(b)&&it(b)?e.matches(kt(this.getStateNodeById(b).path,this.delimiter)):Tn(kt(b,this.delimiter),Po(this.path.slice(0,-2))(e.value)):!0,S=!1;try{S=!h||Xi(this.machine,h,y,r,e)}catch(j){throw new Error("Unable to evaluate guard '".concat(h.name||h.type,"' in transition for event '").concat(o,"' in state node '").concat(this.id,`':
`).concat(j.message))}if(S&&R){d.target!==void 0&&(c=d.target),s.push.apply(s,ee([],$(d.actions),!1)),u=d;break}}}catch(j){n={error:j}}finally{try{f&&!f.done&&(i=l.return)&&i.call(l)}finally{if(n)throw n.error}}if(u){if(!c.length)return{transitions:[u],exitSet:[],configuration:e.value?[this]:[],source:e,actions:s};var x=ie(c.map(function(j){return a.getRelativeStateNodes(j,e.historyValue)})),w=!!u.internal;return{transitions:[u],exitSet:w?[]:ie(c.map(function(j){return a.getPotentiallyReenteringNodes(j)})),configuration:x,source:e,actions:s}}},t.prototype.getPotentiallyReenteringNodes=function(e){if(this.order<e.order)return[this];for(var r=[],n=this,i=e;n&&n!==i;)r.push(n),n=n.parent;return n!==i?[]:(r.push(i),r)},t.prototype.getActions=function(e,r,n,i,a,o,s){var c,u,l,f,d=this,h=o?Nt([],this.getStateNodes(o.value)):[],b=new Set;try{for(var y=F(Array.from(e).sort(function(T,A){return T.order-A.order})),R=y.next();!R.done;R=y.next()){var S=R.value;(!jt(h,S)||jt(n.exitSet,S)||S.parent&&b.has(S.parent))&&b.add(S)}}catch(T){c={error:T}}finally{try{R&&!R.done&&(u=y.return)&&u.call(y)}finally{if(c)throw c.error}}try{for(var x=F(h),w=x.next();!w.done;w=x.next()){var S=w.value;(!jt(e,S)||jt(n.exitSet,S.parent))&&n.exitSet.push(S)}}catch(T){l={error:T}}finally{try{w&&!w.done&&(f=x.return)&&f.call(x)}finally{if(l)throw l.error}}n.exitSet.sort(function(T,A){return A.order-T.order});var j=Array.from(b).sort(function(T,A){return T.order-A.order}),N=new Set(n.exitSet),g=ie(j.map(function(T){var A=[];if(T.type!=="final")return A;var H=T.parent;if(!H.parent)return A;A.push(ir(T.id,T.doneData),ir(H.id,T.doneData?Pr(T.doneData,i,a):void 0));var X=H.parent;return X.type==="parallel"&&Ht(X).every(function(te){return Sr(n.configuration,te)})&&A.push(ir(X.id)),A})),v=j.map(function(T){var A=T.onEntry,H=T.activities.map(function(X){return Go(X)});return{type:"entry",actions:Be(s?ee(ee([],$(A),!1),$(H),!1):ee(ee([],$(H),!1),$(A),!1),d.machine.options.actions)}}).concat({type:"state_done",actions:g.map(function(T){return Fo(T)})}),O=Array.from(N).map(function(T){return{type:"exit",actions:Be(ee(ee([],$(T.onExit),!1),$(T.activities.map(function(A){return qo(A)})),!1),d.machine.options.actions)}}),C=O.concat({type:"transition",actions:Be(n.actions,this.machine.options.actions)}).concat(v);if(r){var k=Be(ie(ee([],$(e),!1).sort(function(T,A){return A.order-T.order}).map(function(T){return T.onExit})),this.machine.options.actions).filter(function(T){return!ln(T)});return C.concat({type:"stop",actions:k})}return C},t.prototype.transition=function(e,r,n,i){e===void 0&&(e=this.initialState);var a=de(r),o;if(e instanceof Oe)o=n===void 0?e:this.resolveState(Oe.from(e,n));else{var s=Y(e)?this.resolve(Cr(this.getResolvedPath(e))):this.resolve(e),c=n??this.machine.context;o=this.resolveState(Oe.from(s,c))}if(this.strict&&!this.events.includes(a.name)&&!jo(a.name))throw new Error("Machine '".concat(this.id,"' does not accept event '").concat(a.name,"'"));var u=this._transition(o.value,o,a)||{transitions:[],configuration:[],exitSet:[],source:o,actions:[]},l=Nt([],this.getStateNodes(o.value)),f=u.configuration.length?Nt(l,u.configuration):l;return u.configuration=ee([],$(f),!1),this.resolveTransition(u,o,o.context,i,a)},t.prototype.resolveRaisedTransition=function(e,r,n,i){var a,o=e.actions;return e=this.transition(e,r,void 0,i),e._event=n,e.event=n.data,(a=e.actions).unshift.apply(a,ee([],$(o),!1)),e},t.prototype.resolveTransition=function(e,r,n,i,a){var o,s,c,u,l=this;a===void 0&&(a=ut);var f=e.configuration,d=!r||e.transitions.length>0,h=d?e.configuration:r?r.configuration:[],b=Sr(h,this),y=d?es(this.machine,f):void 0,R=r?r.historyValue?r.historyValue:e.source?this.machine.historyValue(r.value):void 0:void 0,S=this.getActions(new Set(h),b,e,n,a,r,i),x=r?P({},r.activities):{};try{for(var w=F(S),j=w.next();!j.done;j=w.next()){var N=j.value;try{for(var g=(c=void 0,F(N.actions)),v=g.next();!v.done;v=g.next()){var O=v.value;O.type===on?x[O.activity.id||O.activity.type]=O:O.type===On&&(x[O.activity.id||O.activity.type]=!1)}}catch(ce){c={error:ce}}finally{try{v&&!v.done&&(u=g.return)&&u.call(g)}finally{if(c)throw c.error}}}}catch(ce){o={error:ce}}finally{try{j&&!j.done&&(s=w.return)&&s.call(w)}finally{if(o)throw o.error}}var C=$(Nr(this,r,n,a,S,i,this.machine.config.predictableActionArguments||this.machine.config.preserveActionOrder),2),k=C[0],T=C[1],A=$(Ao(k,ln),2),H=A[0],X=A[1],te=k.filter(function(ce){var we;return ce.type===on&&((we=ce.activity)===null||we===void 0?void 0:we.type)===sn}),be=te.reduce(function(ce,we){return ce[we.activity.id]=Xo(we.activity,l.machine,T,a),ce},r?P({},r.children):{}),oe=new Oe({value:y||r.value,context:T,_event:a,_sessionid:r?r._sessionid:null,historyValue:y?R?Do(R,y):void 0:r?r.historyValue:void 0,history:!y||e.source?r:void 0,actions:y?X:[],activities:y?x:r?r.activities:{},events:[],configuration:h,transitions:e.transitions,children:be,done:b,tags:ai(h),machine:this}),Q=n!==T;oe.changed=a.name===Gi||Q;var z=oe.history;z&&delete z.history;var G=!b&&(this._transient||f.some(function(ce){return ce._transient}));if(!d&&(!G||a.name===or))return oe;var V=oe;if(!b)for(G&&(V=this.resolveRaisedTransition(V,{type:wo},a,i));H.length;){var _=H.shift();V=this.resolveRaisedTransition(V,_._event,a,i)}var xe=V.changed||(z?!!V.actions.length||Q||typeof z.value!=typeof V.value||!na(V.value,z.value):void 0);return V.changed=xe,V.history=z,V},t.prototype.getStateNode=function(e){if(it(e))return this.machine.getStateNodeById(e);if(!this.states)throw new Error("Unable to retrieve child state '".concat(e,"' from '").concat(this.id,"'; no child states exist."));var r=this.states[e];if(!r)throw new Error("Child state '".concat(e,"' does not exist on '").concat(this.id,"'"));return r},t.prototype.getStateNodeById=function(e){var r=it(e)?e.slice(hn.length):e;if(r===this.id)return this;var n=this.machine.idMap[r];if(!n)throw new Error("Child state node '#".concat(r,"' does not exist on machine '").concat(this.id,"'"));return n},t.prototype.getStateNodeByPath=function(e){if(typeof e=="string"&&it(e))try{return this.getStateNodeById(e.slice(1))}catch{}for(var r=un(e,this.delimiter).slice(),n=this;r.length;){var i=r.shift();if(!i.length)break;n=n.getStateNode(i)}return n},t.prototype.resolve=function(e){var r,n=this;if(!e)return this.initialStateValue||nt;switch(this.type){case"parallel":return Ct(this.initialStateValue,function(a,o){return a?n.getStateNode(o).resolve(e[o]||a):nt});case"compound":if(Y(e)){var i=this.getStateNode(e);return i.type==="parallel"||i.type==="compound"?(r={},r[e]=i.initialStateValue,r):e}return Object.keys(e).length?Ct(e,function(a,o){return a?n.getStateNode(o).resolve(a):nt}):this.initialStateValue||{};default:return e||nt}},t.prototype.getResolvedPath=function(e){if(it(e)){var r=this.machine.idMap[e.slice(hn.length)];if(!r)throw new Error("Unable to find state node '".concat(e,"'"));return r.path}return un(e,this.delimiter)},Object.defineProperty(t.prototype,"initialStateValue",{get:function(){var e;if(this.__cache.initialStateValue)return this.__cache.initialStateValue;var r;if(this.type==="parallel")r=ri(this.states,function(n){return n.initialStateValue||nt},function(n){return n.type!=="history"});else if(this.initial!==void 0){if(!this.states[this.initial])throw new Error("Initial state '".concat(this.initial,"' not found on '").concat(this.key,"'"));r=jr(this.states[this.initial])?this.initial:(e={},e[this.initial]=this.states[this.initial].initialStateValue,e)}else r={};return this.__cache.initialStateValue=r,this.__cache.initialStateValue},enumerable:!1,configurable:!0}),t.prototype.getInitialState=function(e,r){this._init();var n=this.getStateNodes(e);return this.resolveTransition({configuration:n,exitSet:[],transitions:[],source:void 0,actions:[]},void 0,r??this.machine.context,void 0)},Object.defineProperty(t.prototype,"initialState",{get:function(){var e=this.initialStateValue;if(!e)throw new Error("Cannot retrieve initial state from simple state '".concat(this.id,"'."));return this.getInitialState(e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"target",{get:function(){var e;if(this.type==="history"){var r=this.config;Y(r.target)?e=it(r.target)?Cr(this.machine.getStateNodeById(r.target).path.slice(this.path.length-1)):r.target:e=r.target}return e},enumerable:!1,configurable:!0}),t.prototype.getRelativeStateNodes=function(e,r,n){return n===void 0&&(n=!0),n?e.type==="history"?e.resolveHistory(r):e.initialStateNodes:[e]},Object.defineProperty(t.prototype,"initialStateNodes",{get:function(){var e=this;if(jr(this))return[this];if(this.type==="compound"&&!this.initial)return[this];var r=br(this.initialStateValue);return ie(r.map(function(n){return e.getFromRelativePath(n)}))},enumerable:!1,configurable:!0}),t.prototype.getFromRelativePath=function(e){if(!e.length)return[this];var r=$(e),n=r[0],i=r.slice(1);if(!this.states)throw new Error("Cannot retrieve subPath '".concat(n,"' from node with no states"));var a=this.getStateNode(n);if(a.type==="history")return a.resolveHistory();if(!this.states[n])throw new Error("Child state '".concat(n,"' does not exist on '").concat(this.id,"'"));return this.states[n].getFromRelativePath(i)},t.prototype.historyValue=function(e){if(Object.keys(this.states).length)return{current:e||this.initialStateValue,states:ri(this.states,function(r,n){if(!e)return r.historyValue();var i=Y(e)?void 0:e[n];return r.historyValue(i||r.initialStateValue)},function(r){return!r.history})}},t.prototype.resolveHistory=function(e){var r=this;if(this.type!=="history")return[this];var n=this.parent;if(!e){var i=this.target;return i?ie(br(i).map(function(o){return n.getFromRelativePath(o)})):n.initialStateNodes}var a=No(n.path,"states")(e).current;return Y(a)?[n.getStateNode(a)]:ie(br(a).map(function(o){return r.history==="deep"?n.getFromRelativePath(o):[n.states[o[0]]]}))},Object.defineProperty(t.prototype,"stateIds",{get:function(){var e=this,r=ie(Object.keys(this.states).map(function(n){return e.states[n].stateIds}));return[this.id].concat(r)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"events",{get:function(){var e,r,n,i;if(this.__cache.events)return this.__cache.events;var a=this.states,o=new Set(this.ownEvents);if(a)try{for(var s=F(Object.keys(a)),c=s.next();!c.done;c=s.next()){var u=c.value,l=a[u];if(l.states)try{for(var f=(n=void 0,F(l.events)),d=f.next();!d.done;d=f.next()){var h=d.value;o.add("".concat(h))}}catch(b){n={error:b}}finally{try{d&&!d.done&&(i=f.return)&&i.call(f)}finally{if(n)throw n.error}}}}catch(b){e={error:b}}finally{try{c&&!c.done&&(r=s.return)&&r.call(s)}finally{if(e)throw e.error}}return this.__cache.events=Array.from(o)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ownEvents",{get:function(){var e=new Set(this.transitions.filter(function(r){return!(!r.target&&!r.actions.length&&r.internal)}).map(function(r){return r.eventType}));return Array.from(e)},enumerable:!1,configurable:!0}),t.prototype.resolveTarget=function(e){var r=this;if(e!==void 0)return e.map(function(n){if(!Y(n))return n;var i=n[0]===r.delimiter;if(i&&!r.parent)return r.getStateNodeByPath(n.slice(1));var a=i?r.key+n:n;if(r.parent)try{var o=r.parent.getStateNodeByPath(a);return o}catch(s){throw new Error("Invalid transition definition for state node '".concat(r.id,`':
`).concat(s.message))}else return r.getStateNodeByPath(a)})},t.prototype.formatTransition=function(e){var r=this,n=Lo(e.target),i="internal"in e?e.internal:n?n.some(function(c){return Y(c)&&c[0]===r.delimiter}):!0,a=this.machine.options.guards,o=this.resolveTarget(n),s=P(P({},e),{actions:Be(Pe(e.actions)),cond:Ki(e.cond,a),target:o,source:this,internal:i,eventType:e.event,toJSON:function(){return P(P({},s),{target:s.target?s.target.map(function(c){return"#".concat(c.id)}):void 0,source:"#".concat(r.id)})}});return s},t.prototype.formatTransitions=function(){var e,r,n=this,i;if(!this.config.on)i=[];else if(Array.isArray(this.config.on))i=this.config.on;else{var a=this.config.on,o=Xr,s=a[o],c=s===void 0?[]:s,u=En(a,[typeof o=="symbol"?o:o+""]);i=ie(Object.keys(u).map(function(x){var w=rt(x,u[x]);return w}).concat(rt(Xr,c)))}var l=this.config.always?rt("",this.config.always):[],f=this.config.onDone?rt(String(ir(this.id)),this.config.onDone):[],d=ie(this.invoke.map(function(x){var w=[];return x.onDone&&w.push.apply(w,ee([],$(rt(String(wr(x.id)),x.onDone)),!1)),x.onError&&w.push.apply(w,ee([],$(rt(String(Pt(x.id)),x.onError)),!1)),w})),h=this.after,b=ie(ee(ee(ee(ee([],$(f),!1),$(d),!1),$(i),!1),$(l),!1).map(function(x){return Pe(x).map(function(w){return n.formatTransition(w)})}));try{for(var y=F(h),R=y.next();!R.done;R=y.next()){var S=R.value;b.push(S)}}catch(x){e={error:x}}finally{try{R&&!R.done&&(r=y.return)&&r.call(y)}finally{if(e)throw e.error}}return b},t}();function vs(t,e,r){return r===void 0&&(r=t.context),new ps(t,e,r)}var gs=Wo,pn;(function(t){t[t.Effect=1]="Effect",t[t.LayoutEffect=2]="LayoutEffect"})(pn||(pn={}));var At=p.useLayoutEffect;function si(t){var e=p.useRef();return e.current||(e.current={v:t()}),e.current.v}var ms=function(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,a=[],o;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)a.push(i.value)}catch(s){o={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(o)throw o.error}}return a},ys=function(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};function bs(t,e){var r,n,i=ms([[],[]],2),a=i[0],o=i[1];try{for(var s=ys(t),c=s.next();!c.done;c=s.next()){var u=c.value;e(u)?a.push(u):o.push(u)}}catch(l){r={error:l}}finally{try{c&&!c.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}return[a,o]}var Et=function(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,a=[],o;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)a.push(i.value)}catch(s){o={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(o)throw o.error}}return a},ci=function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};function ui(t,e){var r=t.exec,n=r(e.context,e._event.data,{action:t,state:e,_event:e._event});n()}function xs(t){var e=p.useRef([]),r=p.useRef([]);At(function(){var n=t.subscribe(function(i){var a,o;if(i.actions.length){var s=i.actions.filter(function(f){return typeof f.exec=="function"&&"__effect"in f.exec}),c=Et(bs(s,function(f){return f.exec.__effect===pn.Effect}),2),u=c[0],l=c[1];(a=e.current).push.apply(a,ci([],Et(u.map(function(f){return[f,i]})),!1)),(o=r.current).push.apply(o,ci([],Et(l.map(function(f){return[f,i]})),!1))}});return function(){n.unsubscribe()}},[]),At(function(){for(;r.current.length;){var n=Et(r.current.shift(),2),i=n[0],a=n[1];ui(i,a)}}),p.useEffect(function(){for(;e.current.length;){var n=Et(e.current.shift(),2),i=n[0],a=n[1];ui(i,a)}})}var Dt=function(){return Dt=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Dt.apply(this,arguments)},ws=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(r[n[i]]=t[n[i]]);return r};function Ss(t,e,r){if(typeof t=="object")return t;var n=function(){};return{next:t,error:e||n,complete:r||n}}function Es(t,e,r){e===void 0&&(e={});var n=si(function(){return typeof t=="function"?t():t}),i=e.context,a=e.guards,o=e.actions,s=e.activities,c=e.services,u=e.delays,l=e.state,f=ws(e,["context","guards","actions","activities","services","delays","state"]),d=si(function(){var h={context:i,guards:a,actions:o,activities:s,services:c,delays:u},b=n.withConfig(h,function(){return Dt(Dt({},n.context),i)});return ia(b,Dt({deferEvents:!0},f))});return At(function(){var h;return r&&(h=d.subscribe(Ss(r))),function(){h==null||h.unsubscribe()}},[r]),At(function(){return d.start(l?Oe.create(l):void 0),function(){d.stop()}},[]),At(function(){Object.assign(d.machine.options.actions,o),Object.assign(d.machine.options.guards,a),Object.assign(d.machine.options.activities,s),Object.assign(d.machine.options.services,c),Object.assign(d.machine.options.delays,u)},[o,a,s,c,u]),xs(d),d}var Os=function(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,a=[],o;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)a.push(i.value)}catch(s){o={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(o)throw o.error}}return a};function Rs(t,e){e===void 0&&(e={});var r=p.useCallback(function(s){var c=s.changed===void 0&&Object.keys(s.children).length;(s.changed||c)&&o(s)},[]),n=Es(t,e,r),i=Os(p.useState(function(){var s=n.machine.initialState;return e.state?Oe.create(e.state):s}),2),a=i[0],o=i[1];return[a,n.send,n]}function ae(){return ae=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)({}).hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},ae.apply(null,arguments)}function lt(t,e){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(e.indexOf(n)!==-1)continue;r[n]=t[n]}return r}const L={arr:Array.isArray,obj:t=>Object.prototype.toString.call(t)==="[object Object]",fun:t=>typeof t=="function",str:t=>typeof t=="string",num:t=>typeof t=="number",und:t=>t===void 0,nul:t=>t===null,set:t=>t instanceof Set,map:t=>t instanceof Map,equ(t,e){if(typeof t!=typeof e)return!1;if(L.str(t)||L.num(t))return t===e;if(L.obj(t)&&L.obj(e)&&Object.keys(t).length+Object.keys(e).length===0)return!0;let r;for(r in t)if(!(r in e))return!1;for(r in e)if(t[r]!==e[r])return!1;return L.und(r)?t===e:!0}};function Ts(t,e){return r=>(L.arr(r)?r:Object.keys(r)).reduce((n,i)=>{const a=i;return n[a]=t(a),n},t)}function Cs(){const t=p.useState(!1),e=t[1];return p.useCallback(()=>e(n=>!n),[])}function Ge(t,e){return L.und(t)||L.nul(t)?e:t}function sr(t){return L.und(t)?[]:L.arr(t)?t:[t]}function ct(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return L.fun(t)?t(...r):t}function Ps(t){return t.to,t.from,t.config,t.onStart,t.onRest,t.onFrame,t.children,t.reset,t.reverse,t.force,t.immediate,t.delay,t.attach,t.destroyed,t.interpolateTo,t.ref,t.lazy,lt(t,["to","from","config","onStart","onRest","onFrame","children","reset","reverse","force","immediate","delay","attach","destroyed","interpolateTo","ref","lazy"])}function Qr(t){const e=Ps(t);if(L.und(e))return ae({to:e},t);const r=Object.keys(t).reduce((n,i)=>L.und(e[i])?ae({},n,{[i]:t[i]}):n,{});return ae({to:e},r)}function Ns(t,e){return e&&(L.fun(e)?e(t):L.obj(e)&&(e.current=t)),t}class Ne{constructor(){this.payload=void 0,this.children=[]}getAnimatedValue(){return this.getValue()}getPayload(){return this.payload||this}attach(){}detach(){}getChildren(){return this.children}addChild(e){this.children.length===0&&this.attach(),this.children.push(e)}removeChild(e){const r=this.children.indexOf(e);this.children.splice(r,1),this.children.length===0&&this.detach()}}class vn extends Ne{constructor(){super(...arguments),this.payload=[],this.attach=()=>this.payload.forEach(e=>e instanceof Ne&&e.addChild(this)),this.detach=()=>this.payload.forEach(e=>e instanceof Ne&&e.removeChild(this))}}class aa extends Ne{constructor(){super(...arguments),this.payload={},this.attach=()=>Object.values(this.payload).forEach(e=>e instanceof Ne&&e.addChild(this)),this.detach=()=>Object.values(this.payload).forEach(e=>e instanceof Ne&&e.removeChild(this))}getValue(e){e===void 0&&(e=!1);const r={};for(const n in this.payload){const i=this.payload[n];e&&!(i instanceof Ne)||(r[n]=i instanceof Ne?i[e?"getAnimatedValue":"getValue"]():i)}return r}getAnimatedValue(){return this.getValue(!0)}}let Nn;function js(t,e){Nn={fn:t,transform:e}}let oa;function ks(t){oa=t}let sa=t=>typeof window<"u"?window.requestAnimationFrame(t):-1,kr;function As(t){kr=t}let ca=()=>Date.now(),Ds=t=>t.current,ua;function Is(t){ua=t}class zs extends aa{constructor(e,r){super(),this.update=void 0,this.payload=e.style?ae({},e,{style:ua(e.style)}):e,this.update=r,this.attach()}}const Ms=t=>L.fun(t)&&!(t.prototype instanceof le.Component),Ls=t=>p.forwardRef((r,n)=>{const i=Cs(),a=p.useRef(!0),o=p.useRef(null),s=p.useRef(null),c=p.useCallback(d=>{const h=o.current,b=()=>{let y=!1;s.current&&(y=Nn.fn(s.current,o.current.getAnimatedValue())),(!s.current||y===!1)&&i()};o.current=new zs(d,b),h&&h.detach()},[]);p.useEffect(()=>()=>{a.current=!1,o.current&&o.current.detach()},[]),p.useImperativeHandle(n,()=>Ds(s)),c(r);const u=o.current.getValue();u.scrollTop,u.scrollLeft;const l=lt(u,["scrollTop","scrollLeft"]),f=Ms(t)?void 0:d=>s.current=Ns(d,n);return le.createElement(t,ae({},l,{ref:f}))});let It=!1;const Ue=new Set,la=()=>{if(!It)return!1;let t=ca();for(let e of Ue){let r=!1;for(let n=0;n<e.configs.length;n++){let i=e.configs[n],a,o;for(let s=0;s<i.animatedValues.length;s++){let c=i.animatedValues[s];if(c.done)continue;let u=i.fromValues[s],l=i.toValues[s],f=c.lastPosition,d=l instanceof Ne,h=Array.isArray(i.initialVelocity)?i.initialVelocity[s]:i.initialVelocity;if(d&&(l=l.getValue()),i.immediate){c.setValue(l),c.done=!0;continue}if(typeof u=="string"||typeof l=="string"){c.setValue(l),c.done=!0;continue}if(i.duration!==void 0)f=u+i.easing((t-c.startTime)/i.duration)*(l-u),a=t>=c.startTime+i.duration;else if(i.decay)f=u+h/(1-.998)*(1-Math.exp(-.0020000000000000018*(t-c.startTime))),a=Math.abs(c.lastPosition-f)<.1,a&&(l=f);else{o=c.lastTime!==void 0?c.lastTime:t,h=c.lastVelocity!==void 0?c.lastVelocity:i.initialVelocity,t>o+64&&(o=t);let b=Math.floor(t-o);for(let x=0;x<b;++x){let w=-i.tension*(f-l),j=-i.friction*h,N=(w+j)/i.mass;h=h+N*1/1e3,f=f+h*1/1e3}let y=i.clamp&&i.tension!==0?u<l?f>l:f<l:!1,R=Math.abs(h)<=i.precision,S=i.tension!==0?Math.abs(l-f)<=i.precision:!0;a=y||R&&S,c.lastVelocity=h,c.lastTime=t}d&&!i.toValues[s].done&&(a=!1),a?(c.value!==l&&(f=l),c.done=!0):r=!0,c.setValue(f),c.lastPosition=f}e.props.onFrame&&(e.values[i.name]=i.interpolation.getValue())}e.props.onFrame&&e.props.onFrame(e.values),r||(Ue.delete(e),e.stop(!0))}return Ue.size?sa(la):It=!1,It},Fs=t=>{Ue.has(t)||Ue.add(t),It||(It=!0,sa(la))},Vs=t=>{Ue.has(t)&&Ue.delete(t)};function Ar(t,e,r){if(typeof t=="function")return t;if(Array.isArray(t))return Ar({range:t,output:e,extrapolate:r});if(kr&&typeof t.output[0]=="string")return kr(t);const n=t,i=n.output,a=n.range||[0,1],o=n.extrapolateLeft||n.extrapolate||"extend",s=n.extrapolateRight||n.extrapolate||"extend",c=n.easing||(u=>u);return u=>{const l=_s(u,a);return Bs(u,a[l],a[l+1],i[l],i[l+1],c,o,s,n.map)}}function Bs(t,e,r,n,i,a,o,s,c){let u=c?c(t):t;if(u<e){if(o==="identity")return u;o==="clamp"&&(u=e)}if(u>r){if(s==="identity")return u;s==="clamp"&&(u=r)}return n===i?n:e===r?t<=e?n:i:(e===-1/0?u=-u:r===1/0?u=u-e:u=(u-e)/(r-e),u=a(u),n===-1/0?u=-u:i===1/0?u=u+n:u=u*(i-n)+n,u)}function _s(t,e){for(var r=1;r<e.length-1&&!(e[r]>=t);++r);return r-1}class pt extends vn{constructor(e,r,n,i){super(),this.calc=void 0,this.payload=e instanceof vn&&!(e instanceof pt)?e.getPayload():Array.isArray(e)?e:[e],this.calc=Ar(r,n,i)}getValue(){return this.calc(...this.payload.map(e=>e.getValue()))}updateConfig(e,r,n){this.calc=Ar(e,r,n)}interpolate(e,r,n){return new pt(this,e,r,n)}}const at=(t,e,r)=>t&&new pt(t,e,r),$s={default:{tension:170,friction:26}};function fa(t,e){"update"in t?e.add(t):t.getChildren().forEach(r=>fa(r,e))}class gn extends Ne{constructor(e){var r;super(),r=this,this.animatedStyles=new Set,this.value=void 0,this.startPosition=void 0,this.lastPosition=void 0,this.lastVelocity=void 0,this.startTime=void 0,this.lastTime=void 0,this.done=!1,this.setValue=function(n,i){i===void 0&&(i=!0),r.value=n,i&&r.flush()},this.value=e,this.startPosition=e,this.lastPosition=e}flush(){this.animatedStyles.size===0&&fa(this,this.animatedStyles),this.animatedStyles.forEach(e=>e.update())}clearStyles(){this.animatedStyles.clear()}getValue(){return this.value}interpolate(e,r,n){return new pt(this,e,r,n)}}class Hs extends vn{constructor(e){super(),this.payload=e.map(r=>new gn(r))}setValue(e,r){r===void 0&&(r=!0),Array.isArray(e)?e.length===this.payload.length&&e.forEach((n,i)=>this.payload[i].setValue(n,r)):this.payload.forEach(n=>n.setValue(e,r))}getValue(){return this.payload.map(e=>e.getValue())}interpolate(e,r){return new pt(this,e,r)}}let Gs=0,qs=class{constructor(){this.id=void 0,this.idle=!0,this.hasChanged=!1,this.guid=0,this.local=0,this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.listeners=[],this.queue=[],this.localQueue=void 0,this.getValues=()=>this.interpolations,this.id=Gs++}update(e){if(!e)return this;const r=Qr(e),n=r.delay,i=n===void 0?0:n,a=r.to,o=lt(r,["delay","to"]);if(L.arr(a)||L.fun(a))this.queue.push(ae({},o,{delay:i,to:a}));else if(a){let s={};Object.entries(a).forEach(c=>{let u=c[0],l=c[1];const f=ae({to:{[u]:l},delay:ct(i,u)},o),d=s[f.delay]&&s[f.delay].to;s[f.delay]=ae({},s[f.delay],f,{to:ae({},d,f.to)})}),this.queue=Object.values(s)}return this.queue=this.queue.sort((s,c)=>s.delay-c.delay),this.diff(o),this}start(e){if(this.queue.length){this.idle=!1,this.localQueue&&this.localQueue.forEach(i=>{let a=i.from,o=a===void 0?{}:a,s=i.to,c=s===void 0?{}:s;L.obj(o)&&(this.merged=ae({},o,this.merged)),L.obj(c)&&(this.merged=ae({},this.merged,c))});const r=this.local=++this.guid,n=this.localQueue=this.queue;this.queue=[],n.forEach((i,a)=>{let o=i.delay,s=lt(i,["delay"]);const c=l=>{a===n.length-1&&r===this.guid&&l&&(this.idle=!0,this.props.onRest&&this.props.onRest(this.merged)),e&&e()};let u=L.arr(s.to)||L.fun(s.to);o?setTimeout(()=>{r===this.guid&&(u?this.runAsync(s,c):this.diff(s).start(c))},o):u?this.runAsync(s,c):this.diff(s).start(c)})}else L.fun(e)&&this.listeners.push(e),this.props.onStart&&this.props.onStart(),Fs(this);return this}stop(e){return this.listeners.forEach(r=>r(e)),this.listeners=[],this}pause(e){return this.stop(!0),e&&Vs(this),this}runAsync(e,r){var n=this;e.delay;let i=lt(e,["delay"]);const a=this.local;let o=Promise.resolve(void 0);if(L.arr(i.to))for(let s=0;s<i.to.length;s++){const c=s,u=ae({},i,Qr(i.to[c]));L.arr(u.config)&&(u.config=u.config[c]),o=o.then(()=>{if(a===this.guid)return new Promise(l=>this.diff(u).start(l))})}else if(L.fun(i.to)){let s=0,c;o=o.then(()=>i.to(u=>{const l=ae({},i,Qr(u));if(L.arr(l.config)&&(l.config=l.config[s]),s++,a===this.guid)return c=new Promise(f=>this.diff(l).start(f))},function(u){return u===void 0&&(u=!0),n.stop(u)}).then(()=>c))}o.then(r)}diff(e){this.props=ae({},this.props,e);let r=this.props,n=r.from,i=n===void 0?{}:n,a=r.to,o=a===void 0?{}:a,s=r.config,c=s===void 0?{}:s,u=r.reverse,l=r.attach,f=r.reset,d=r.immediate;if(u){var h=[o,i];i=h[0],o=h[1]}this.merged=ae({},i,this.merged,o),this.hasChanged=!1;let b=l&&l(this);if(this.animations=Object.entries(this.merged).reduce((y,R)=>{let S=R[0],x=R[1],w=y[S]||{};const j=L.num(x),N=L.str(x)&&!x.startsWith("#")&&!/\d/.test(x)&&!oa[x],g=L.arr(x),v=!j&&!g&&!N;let O=L.und(i[S])?x:i[S],C=j||g||N?x:1,k=ct(c,S);b&&(C=b.animations[S].parent);let T=w.parent,A=w.interpolation,H=sr(b?C.getPayload():C),X,te=x;v&&(te=kr({range:[0,1],output:[x,x]})(1));let be=A&&A.getValue();const Q=!L.und(T)&&w.animatedValues.some(_=>!_.done),z=!L.equ(te,be),G=!L.equ(te,w.previous),V=!L.equ(k,w.config);if(f||G&&z||V){if(j||N)T=A=w.parent||new gn(O);else if(g)T=A=w.parent||new Hs(O);else if(v){let _=w.interpolation&&w.interpolation.calc(w.parent.value);_=_!==void 0&&!f?_:O,w.parent?(T=w.parent,T.setValue(0,!1)):T=new gn(0);const xe={output:[_,x]};w.interpolation?(A=w.interpolation,w.interpolation.updateConfig(xe)):A=T.interpolate(xe)}return H=sr(b?C.getPayload():C),X=sr(T.getPayload()),f&&!v&&T.setValue(O,!1),this.hasChanged=!0,X.forEach(_=>{_.startPosition=_.value,_.lastPosition=_.value,_.lastVelocity=Q?_.lastVelocity:void 0,_.lastTime=Q?_.lastTime:void 0,_.startTime=ca(),_.done=!1,_.animatedStyles.clear()}),ct(d,S)&&T.setValue(v?C:x,!1),ae({},y,{[S]:ae({},w,{name:S,parent:T,interpolation:A,animatedValues:X,toValues:H,previous:te,config:k,fromValues:sr(T.getValue()),immediate:ct(d,S),initialVelocity:Ge(k.velocity,0),clamp:Ge(k.clamp,!1),precision:Ge(k.precision,.01),tension:Ge(k.tension,170),friction:Ge(k.friction,26),mass:Ge(k.mass,1),duration:k.duration,easing:Ge(k.easing,_=>_),decay:k.decay})})}else return z?y:(v&&(T.setValue(1,!1),A.updateConfig({output:[te,te]})),T.done=!0,this.hasChanged=!0,ae({},y,{[S]:ae({},y[S],{previous:te})}))},this.animations),this.hasChanged){this.configs=Object.values(this.animations),this.values={},this.interpolations={};for(let y in this.animations)this.interpolations[y]=this.animations[y].interpolation,this.values[y]=this.animations[y].interpolation.getValue()}return this}destroy(){this.stop(),this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.local=0}};const Us=(t,e)=>{const r=p.useRef(!1),n=p.useRef(),i=L.fun(e),a=p.useMemo(()=>{n.current&&(n.current.map(f=>f.destroy()),n.current=void 0);let l;return[new Array(t).fill().map((f,d)=>{const h=new qs,b=i?ct(e,d,h):e[d];return d===0&&(l=b.ref),h.update(b),l||h.start(),h}),l]},[t]),o=a[0],s=a[1];n.current=o,p.useImperativeHandle(s,()=>({start:()=>Promise.all(n.current.map(l=>new Promise(f=>l.start(f)))),stop:l=>n.current.forEach(f=>f.stop(l)),get controllers(){return n.current}}));const c=p.useMemo(()=>l=>n.current.map((f,d)=>{f.update(i?ct(l,d,f):l[d]),s||f.start()}),[t]);p.useEffect(()=>{r.current?i||c(e):s||n.current.forEach(l=>l.start())}),p.useEffect(()=>(r.current=!0,()=>n.current.forEach(l=>l.destroy())),[]);const u=n.current.map(l=>l.getValues());return i?[u,c,l=>n.current.forEach(f=>f.pause(l))]:u},Ws=t=>{const e=L.fun(t),r=Us(1,e?t:[t]),n=r[0],i=r[1],a=r[2];return e?[n[0],i,a]:n};class Ys extends aa{constructor(e){e===void 0&&(e={}),super(),e.transform&&!(e.transform instanceof Ne)&&(e=Nn.transform(e)),this.payload=e}}const Dr={transparent:0,aliceblue:4042850303,antiquewhite:4209760255,aqua:16777215,aquamarine:2147472639,azure:4043309055,beige:4126530815,bisque:4293182719,black:255,blanchedalmond:4293643775,blue:65535,blueviolet:2318131967,brown:2771004159,burlywood:3736635391,burntsienna:3934150143,cadetblue:1604231423,chartreuse:2147418367,chocolate:3530104575,coral:4286533887,cornflowerblue:1687547391,cornsilk:4294499583,crimson:3692313855,cyan:16777215,darkblue:35839,darkcyan:9145343,darkgoldenrod:3095792639,darkgray:2846468607,darkgreen:6553855,darkgrey:2846468607,darkkhaki:3182914559,darkmagenta:2332068863,darkolivegreen:1433087999,darkorange:4287365375,darkorchid:2570243327,darkred:2332033279,darksalmon:3918953215,darkseagreen:2411499519,darkslateblue:1211993087,darkslategray:793726975,darkslategrey:793726975,darkturquoise:13554175,darkviolet:2483082239,deeppink:4279538687,deepskyblue:12582911,dimgray:1768516095,dimgrey:1768516095,dodgerblue:512819199,firebrick:2988581631,floralwhite:4294635775,forestgreen:579543807,fuchsia:4278255615,gainsboro:3705462015,ghostwhite:4177068031,gold:4292280575,goldenrod:3668254975,gray:2155905279,green:8388863,greenyellow:2919182335,grey:2155905279,honeydew:4043305215,hotpink:4285117695,indianred:3445382399,indigo:1258324735,ivory:4294963455,khaki:4041641215,lavender:3873897215,lavenderblush:4293981695,lawngreen:2096890111,lemonchiffon:4294626815,lightblue:2916673279,lightcoral:4034953471,lightcyan:3774873599,lightgoldenrodyellow:4210742015,lightgray:3553874943,lightgreen:2431553791,lightgrey:3553874943,lightpink:4290167295,lightsalmon:4288707327,lightseagreen:548580095,lightskyblue:2278488831,lightslategray:2005441023,lightslategrey:2005441023,lightsteelblue:2965692159,lightyellow:4294959359,lime:16711935,limegreen:852308735,linen:4210091775,magenta:4278255615,maroon:2147483903,mediumaquamarine:1724754687,mediumblue:52735,mediumorchid:3126187007,mediumpurple:2473647103,mediumseagreen:1018393087,mediumslateblue:2070474495,mediumspringgreen:16423679,mediumturquoise:1221709055,mediumvioletred:3340076543,midnightblue:421097727,mintcream:4127193855,mistyrose:4293190143,moccasin:4293178879,navajowhite:4292783615,navy:33023,oldlace:4260751103,olive:2155872511,olivedrab:1804477439,orange:4289003775,orangered:4282712319,orchid:3664828159,palegoldenrod:4008225535,palegreen:2566625535,paleturquoise:2951671551,palevioletred:3681588223,papayawhip:4293907967,peachpuff:4292524543,peru:3448061951,pink:4290825215,plum:3718307327,powderblue:2967529215,purple:2147516671,rebeccapurple:1714657791,red:4278190335,rosybrown:3163525119,royalblue:1097458175,saddlebrown:2336560127,salmon:4202722047,sandybrown:4104413439,seagreen:780883967,seashell:4294307583,sienna:2689740287,silver:3233857791,skyblue:2278484991,slateblue:1784335871,slategray:1887473919,slategrey:1887473919,snow:4294638335,springgreen:16744447,steelblue:1182971135,tan:3535047935,teal:8421631,thistle:3636451583,tomato:4284696575,turquoise:1088475391,violet:4001558271,wheat:4125012991,white:4294967295,whitesmoke:4126537215,yellow:4294902015,yellowgreen:2597139199},je="[-+]?\\d*\\.?\\d+",Ir=je+"%";function _r(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return"\\(\\s*("+e.join(")\\s*,\\s*(")+")\\s*\\)"}const Ks=new RegExp("rgb"+_r(je,je,je)),Xs=new RegExp("rgba"+_r(je,je,je,je)),Qs=new RegExp("hsl"+_r(je,Ir,Ir)),Js=new RegExp("hsla"+_r(je,Ir,Ir,je)),Zs=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,ec=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,tc=/^#([0-9a-fA-F]{6})$/,rc=/^#([0-9a-fA-F]{8})$/;function nc(t){let e;return typeof t=="number"?t>>>0===t&&t>=0&&t<=4294967295?t:null:(e=tc.exec(t))?parseInt(e[1]+"ff",16)>>>0:Dr.hasOwnProperty(t)?Dr[t]:(e=Ks.exec(t))?(ot(e[1])<<24|ot(e[2])<<16|ot(e[3])<<8|255)>>>0:(e=Xs.exec(t))?(ot(e[1])<<24|ot(e[2])<<16|ot(e[3])<<8|di(e[4]))>>>0:(e=Zs.exec(t))?parseInt(e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+"ff",16)>>>0:(e=rc.exec(t))?parseInt(e[1],16)>>>0:(e=ec.exec(t))?parseInt(e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4],16)>>>0:(e=Qs.exec(t))?(li(fi(e[1]),cr(e[2]),cr(e[3]))|255)>>>0:(e=Js.exec(t))?(li(fi(e[1]),cr(e[2]),cr(e[3]))|di(e[4]))>>>0:null}function Jr(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+(e-t)*6*r:r<1/2?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function li(t,e,r){const n=r<.5?r*(1+e):r+e-r*e,i=2*r-n,a=Jr(i,n,t+1/3),o=Jr(i,n,t),s=Jr(i,n,t-1/3);return Math.round(a*255)<<24|Math.round(o*255)<<16|Math.round(s*255)<<8}function ot(t){const e=parseInt(t,10);return e<0?0:e>255?255:e}function fi(t){return(parseFloat(t)%360+360)%360/360}function di(t){const e=parseFloat(t);return e<0?0:e>1?255:Math.round(e*255)}function cr(t){const e=parseFloat(t);return e<0?0:e>100?1:e/100}function hi(t){let e=nc(t);if(e===null)return t;e=e||0;let r=(e&4278190080)>>>24,n=(e&16711680)>>>16,i=(e&65280)>>>8,a=(e&255)/255;return`rgba(${r}, ${n}, ${i}, ${a})`}const ur=/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,ic=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,ac=new RegExp(`(${Object.keys(Dr).join("|")})`,"g"),oc=t=>{const e=t.output.map(i=>i.replace(ic,hi)).map(i=>i.replace(ac,hi)),r=e[0].match(ur).map(()=>[]);e.forEach(i=>{i.match(ur).forEach((a,o)=>r[o].push(+a))});const n=e[0].match(ur).map((i,a)=>Ar(ae({},t,{output:r[a]})));return i=>{let a=0;return e[0].replace(ur,()=>n[a++](i)).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,(o,s,c,u,l)=>`rgba(${Math.round(s)}, ${Math.round(c)}, ${Math.round(u)}, ${l})`)}};let zt={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};const sc=(t,e)=>t+e.charAt(0).toUpperCase()+e.substring(1),cc=["Webkit","Ms","Moz","O"];zt=Object.keys(zt).reduce((t,e)=>(cc.forEach(r=>t[sc(r,e)]=t[e]),t),zt);function uc(t,e,r){return e==null||typeof e=="boolean"||e===""?"":!r&&typeof e=="number"&&e!==0&&!(zt.hasOwnProperty(t)&&zt[t])?e+"px":(""+e).trim()}const pi={};Is(t=>new Ys(t));As(oc);ks(Dr);js((t,e)=>{if(t.nodeType&&t.setAttribute!==void 0){const i=e.style,a=e.children,o=e.scrollTop,s=e.scrollLeft,c=lt(e,["style","children","scrollTop","scrollLeft"]),u=t.nodeName==="filter"||t.parentNode&&t.parentNode.nodeName==="filter";o!==void 0&&(t.scrollTop=o),s!==void 0&&(t.scrollLeft=s),a!==void 0&&(t.textContent=a);for(let l in i)if(i.hasOwnProperty(l)){var r=l.indexOf("--")===0,n=uc(l,i[l],r);l==="float"&&(l="cssFloat"),r?t.style.setProperty(l,n):t.style[l]=n}for(let l in c){const f=u?l:pi[l]||(pi[l]=l.replace(/([A-Z])/g,d=>"-"+d.toLowerCase()));typeof t.getAttribute(f)<"u"&&t.setAttribute(f,c[l])}return}else return!1},t=>t);const lc=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],fc=Ts(Ls),dc=fc(lc);function vi(t,e){return t.map(function(r,n){return r+e[n]})}function da(t,e){return t.map(function(r,n){return r-e[n]})}function mn(t){return Math.hypot.apply(Math,t)}function hc(t,e,r){var n=mn(e),i=n===0?0:1/n,a=r===0?0:1/r,o=a*n,s=e.map(function(l){return a*l}),c=e.map(function(l){return i*l}),u=mn(t);return{velocities:s,velocity:o,distance:u,direction:c}}function yn(t){return Math.sign?Math.sign(t):+(t>0)-+(t<0)||+t}function pc(t,e,r){return Math.max(e,Math.min(t,r))}function vc(t,e){return Math.pow(t,e*5)}function gi(t,e,r){return e===0||Math.abs(e)===1/0?vc(t,r):t*e*r/(e+r*t)}function Mt(t,e,r,n){return n===void 0&&(n=.15),n===0?pc(t,e,r):t<e?-gi(e-t,r-e,n)+e:t>r?+gi(t-r,r-e,n)+r:t}function gc(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function mc(t,e,r){return e&&gc(t.prototype,e),t}function me(){return me=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},me.apply(this,arguments)}function ha(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function yc(t,e){if(t==null)return{};var r={},n=Object.keys(t),i,a;for(a=0;a<n.length;a++)i=n[a],!(e.indexOf(i)>=0)&&(r[i]=t[i]);return r}function lr(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function bc(t,e){if(t){if(typeof t=="string")return mi(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return mi(t,e)}}function mi(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function $r(t,e){var r;if(typeof Symbol>"u"||t[Symbol.iterator]==null){if(Array.isArray(t)||(r=bc(t))||e){r&&(t=r);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}return r=t[Symbol.iterator](),r.next.bind(r)}function pa(){}function va(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return e.length===0?pa:e.length===1?e[0]:function(){for(var n,i=$r(e),a;!(a=i()).done;){var o=a.value;n=o.apply(this,arguments)||n}return n}}function _e(t,e){if(t===void 0){if(e===void 0)throw new Error("Must define fallback value if undefined is expected");t=e}return Array.isArray(t)?t:[t,t]}function fr(t){if(typeof t=="function"){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return t.apply(void 0,r)}else return t}function jn(t,e){t===void 0&&(t={});for(var r={},n=0,i=Object.entries(e);n<i.length;n++){var a=i[n],o=a[0],s=a[1];switch(typeof s){case"function":r[o]=s.call(r,t[o],o,t);break;case"object":r[o]=jn(t[o],s);break;case"boolean":s&&(r[o]=t[o]);break}}return r}var xc=180,wc=.15,Sc=.5,Ec=60,Oc={threshold:function(e){return e===void 0&&(e=0),_e(e)},rubberband:function(e){switch(e===void 0&&(e=0),e){case!0:return _e(wc);case!1:return _e(0);default:return _e(e)}},enabled:function(e){return e===void 0&&(e=!0),e},triggerAllEvents:function(e){return e===void 0&&(e=!1),e},initial:function(e){return e===void 0&&(e=0),typeof e=="function"?e:_e(e)}},ga=me({},Oc,{axis:!0,lockDirection:function(e){return e===void 0&&(e=!1),e},bounds:function(e){if(e===void 0&&(e={}),typeof e=="function")return function(f){return ga.bounds(e(f))};var r=e,n=r.left,i=n===void 0?-1/0:n,a=r.right,o=a===void 0?1/0:a,s=r.top,c=s===void 0?-1/0:s,u=r.bottom,l=u===void 0?1/0:u;return[[i,o],[c,l]]}}),Rc=typeof window<"u"&&window.document&&window.document.createElement,Tc={enabled:function(e){return e===void 0&&(e=!0),e},domTarget:!0,window:function(t){function e(r){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return t===void 0&&(t=Rc?window:void 0),t}),eventOptions:function(e){var r=e===void 0?{}:e,n=r.passive,i=n===void 0?!0:n,a=r.capture,o=a===void 0?!1:a;return{passive:i,capture:o}}},Cc=me({},ga,{threshold:function(e,r,n){var i=n.filterTaps,a=i===void 0?!1:i,o=n.lockDirection,s=o===void 0?!1:o,c=n.axis,u=c===void 0?void 0:c,l=_e(e,a?3:s||u?1:0);return this.filterTaps=a||l[0]+l[1]>0,l},swipeVelocity:function(e){return e===void 0&&(e=Sc),_e(e)},swipeDistance:function(e){return e===void 0&&(e=Ec),_e(e)},delay:function(e){switch(e===void 0&&(e=0),e){case!0:return xc;case!1:return 0;default:return e}}});function Pc(t){return t===void 0&&(t={}),jn(t,Tc)}function Nc(t){return t===void 0&&(t={}),jn(t,Cc)}function jc(t){var e=t.domTarget,r=t.eventOptions,n=t.window,i=t.enabled,a=yc(t,["domTarget","eventOptions","window","enabled"]),o=Pc({domTarget:e,eventOptions:r,window:n,enabled:i});return o.drag=Nc(a),o}function Ot(t){return me({_active:!1,_blocked:!1,_intentional:[!1,!1],_movement:[0,0],_initial:[0,0],_bounds:[[-1/0,1/0],[-1/0,1/0]],_lastEventType:void 0,event:void 0,intentional:!1,values:[0,0],velocities:[0,0],delta:[0,0],movement:[0,0],offset:[0,0],lastOffset:[0,0],direction:[0,0],initial:[0,0],previous:[0,0],first:!1,last:!1,active:!1,timeStamp:0,startTime:0,elapsedTime:0,cancel:pa,canceled:!1,memo:void 0,args:void 0},t)}function ma(){var t={hovering:!1,scrolling:!1,wheeling:!1,dragging:!1,moving:!1,pinching:!1,touches:0,buttons:0,down:!1,shiftKey:!1,altKey:!1,metaKey:!1,ctrlKey:!1},e=Ot({axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0,_isTap:!0,_delayedEvent:!1,_pointerId:void 0,tap:!1,swipe:[0,0]}),r=Ot({da:[0,0],vdva:[0,0],origin:void 0,turns:0}),n=Ot({axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0}),i=Ot({axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0}),a=Ot({axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0});return{shared:t,drag:e,pinch:r,wheel:n,move:i,scroll:a}}var qe=new Map,kc=function(){function t(r,n){var i=this;n===void 0&&(n=[]),this.controller=r,this.args=n,this.debounced=!0,this.setTimeout=function(a,o){var s;o===void 0&&(o=140),clearTimeout(i.controller.timeouts[i.stateKey]);for(var c=arguments.length,u=new Array(c>2?c-2:0),l=2;l<c;l++)u[l-2]=arguments[l];i.controller.timeouts[i.stateKey]=(s=window).setTimeout.apply(s,[a,o].concat(u))},this.clearTimeout=function(){clearTimeout(i.controller.timeouts[i.stateKey])},this.fireGestureHandler=function(a){if(a===void 0&&(a=!1),i.state._blocked)return i.debounced||(i.state._active=!1,i.clean()),null;if(!a&&!i.state.intentional&&!i.config.triggerAllEvents)return null;if(i.state.intentional){var o=i.state.active,s=i.state._active;i.state.active=s,i.state.first=s&&!o,i.state.last=o&&!s,i.controller.state.shared[i.ingKey]=s}var c=me({},i.controller.state.shared,i.state,i.mapStateValues(i.state)),u=i.handler(c);return i.state.memo=u!==void 0?u:i.state.memo,i.state._active||i.clean(),c}}var e=t.prototype;return e.updateSharedState=function(n){Object.assign(this.controller.state.shared,n)},e.updateGestureState=function(n){Object.assign(this.state,n)},e.checkIntentionality=function(n,i){return{_intentional:n,_blocked:!1}},e.getMovement=function(n){var i=this.config,a=i.initial,o=i.bounds,s=i.rubberband,c=i.threshold,u=this.state,l=u._bounds,f=u._initial,d=u._active,h=u._intentional,b=u.lastOffset,y=u.movement,R=this.getInternalMovement(n,this.state),S=h[0]===!1?yi(R[0],c[0]):h[0],x=h[1]===!1?yi(R[1],c[1]):h[1],w=this.checkIntentionality([S,x],R);if(w._blocked)return me({},w,{_movement:R,delta:[0,0]});var j=w._intentional,N=R,g,v;if(j[0]!==!1&&h[0]===!1&&(v=fr(a,this.state),g=fr(o,this.state),f[0]=v[0],l[0]=g[0]),j[1]!==!1&&h[1]===!1){var O,C;v=(O=v)!=null?O:fr(a,this.state),g=(C=g)!=null?C:fr(o,this.state),f[1]=v[1],l[1]=g[1]}var k=[j[0]!==!1?R[0]-j[0]:f[0],j[1]!==!1?R[1]-j[1]:f[1]],T=vi(k,b),A=d?s:[0,0];return k=bi(l,vi(k,f),A),me({},w,{intentional:j[0]!==!1||j[1]!==!1,_initial:f,_movement:N,movement:k,values:n,offset:bi(l,T,A),delta:da(k,y)})},e.clean=function(){this.clearTimeout()},mc(t,[{key:"config",get:function(){return this.controller.config[this.stateKey]}},{key:"enabled",get:function(){return this.controller.config.enabled&&this.config.enabled}},{key:"state",get:function(){return this.controller.state[this.stateKey]}},{key:"handler",get:function(){return this.controller.handlers[this.stateKey]}}]),t}();function yi(t,e){return Math.abs(t)>=e?yn(t)*e:!1}function bi(t,e,r){var n=e[0],i=e[1],a=r[0],o=r[1],s=t[0],c=s[0],u=s[1],l=t[1],f=l[0],d=l[1];return[Mt(n,c,u,a),Mt(i,f,d,o)]}function Zr(t,e,r){var n=t.state,i=t.args,a=e.timeStamp,o=e.type,s=n.values,c=r?0:a-n.startTime;return{_lastEventType:o,event:e,timeStamp:a,elapsedTime:c,args:i,previous:s}}function Ac(t,e,r){var n=t.state.offset,i=r.timeStamp;return me({},ma()[t.stateKey],{_active:!0,values:e,initial:e,offset:n,lastOffset:n,startTime:i})}function Dc(t,e){return function(r){for(var n=arguments.length,i=new Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];return t.call.apply(t,[this,me({},e,{event:r})].concat(i))}}var Ic=function(e){var r=this;this.classes=e,this.bind=function(){for(var n={},i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];for(var s=$r(r.classes),c;!(c=s()).done;){var u=c.value;new u(r,a).addBindings(n)}for(var l=0,f=Object.entries(r.nativeRefs);l<f.length;l++){var d=f[l],h=d[0],b=d[1];bn(n,h,Dc(b,me({},r.state.shared,{args:a})))}return r.config.domTarget?Fc(r,n):Vc(r,n)},this.effect=function(){return r.config.domTarget&&r.bind(),r.clean},this.clean=function(){var n=ba(r.config),i=r.config.eventOptions;n&&Ut(n,ya(r.domListeners),i),Object.values(r.timeouts).forEach(clearTimeout),zc(r)},this.state=ma(),this.timeouts={},this.domListeners=[],this.windowListeners={}};function zc(t){var e=t.config,r=e.window,n=e.eventOptions,i=t.windowListeners;if(r){for(var a in i){var o=i[a];Ut(r,o,n)}t.windowListeners={}}}function Mc(t,e){var r=t.config,n=t.windowListeners;r.window&&(Ut(r.window,n[e],r.eventOptions),delete n[e])}function Lc(t,e,r){var n=t.config,i=t.windowListeners;r===void 0&&(r=[]),n.window&&(Ut(n.window,i[e],n.eventOptions),xa(n.window,i[e]=r,n.eventOptions))}function Fc(t,e){var r=t.config,n=t.domListeners,i=ba(r);if(!i)throw new Error("domTarget must be defined");var a=r.eventOptions;Ut(i,ya(n),a);for(var o=0,s=Object.entries(e);o<s.length;o++){var c=s[o],u=c[0],l=c[1],f=u.slice(2).toLowerCase();n.push([f,va.apply(void 0,l)])}xa(i,n,a)}function Vc(t,e){for(var r=t.config,n={},i=r.eventOptions.capture?"Capture":"",a=0,o=Object.entries(e);a<o.length;a++){var s=o[a],c=s[0],u=s[1],l=Array.isArray(u)?u:[u],f=c+i;n[f]=va.apply(void 0,l)}return n}function ya(t){return t===void 0&&(t=[]),t.splice(0,t.length)}function ba(t){var e=t.domTarget;return e&&"current"in e?e.current:e}function bn(t,e,r){t[e]||(t[e]=[]),t[e].push(r)}function xa(t,e,r){e===void 0&&(e=[]),r===void 0&&(r={});for(var n=$r(e),i;!(i=n()).done;){var a=i.value,o=a[0],s=a[1];t.addEventListener(o,s,r)}}function Ut(t,e,r){e===void 0&&(e=[]),r===void 0&&(r={});for(var n=$r(e),i;!(i=n()).done;){var a=i.value,o=a[0],s=a[1];t.removeEventListener(o,s,r)}}function Bc(t,e,r){r===void 0&&(r={});var n=$c(t),i=le.useMemo(function(){return new Ic(n)},[]);return i.config=e,i.handlers=t,i.nativeRefs=r,le.useEffect(i.effect,[]),i.config.domTarget?_c:i.bind}function _c(){}function $c(t){var e=new Set;return t.drag&&e.add(qe.get("drag")),t.wheel&&e.add(qe.get("wheel")),t.scroll&&e.add(qe.get("scroll")),t.move&&e.add(qe.get("move")),t.pinch&&e.add(qe.get("pinch")),t.hover&&e.add(qe.get("hover")),e}var Hc=function(t){ha(e,t);function e(){return t.apply(this,arguments)||this}var r=e.prototype;return r.getInternalMovement=function(i,a){return da(i,a.initial)},r.checkIntentionality=function(i,a){if(i[0]===!1&&i[1]===!1)return{_intentional:i,axis:this.state.axis};var o=a.map(Math.abs),s=o[0],c=o[1],u=this.state.axis||(s>c?"x":s<c?"y":void 0);return!this.config.axis&&!this.config.lockDirection?{_intentional:i,_blocked:!1,axis:u}:u?this.config.axis&&u!==this.config.axis?{_intentional:i,_blocked:!0,axis:u}:(i[u==="x"?1:0]=!1,{_intentional:i,_blocked:!1,axis:u}):{_intentional:[!1,!1],_blocked:!1,axis:u}},r.getKinematics=function(i,a){var o=this.getMovement(i);if(!o._blocked){var s=a.timeStamp-this.state.timeStamp;Object.assign(o,hc(o.movement,o.delta,s))}return o},r.mapStateValues=function(i){return{xy:i.values,vxvy:i.velocities}},e}(kc);function wa(t){if("touches"in t){var e=t.targetTouches,r=t.changedTouches;return e.length>0?e:r}return null}function xi(t){var e="buttons"in t?t.buttons:0,r=wa(t),n=r&&r.length||0,i=n>0||e>0,a=t.shiftKey,o=t.altKey,s=t.metaKey,c=t.ctrlKey;return{touches:n,down:i,buttons:e,shiftKey:a,altKey:o,metaKey:s,ctrlKey:c}}function wi(t){var e=wa(t),r=e?e[0]:t,n=r.clientX,i=r.clientY;return[n,i]}var Gc=3,qc=220,Uc=function(t){ha(e,t);function e(){var n;return n=t.apply(this,arguments)||this,n.ingKey="dragging",n.stateKey="drag",n.onDragStart=function(i){!n.enabled||n.state._active||(Lc(n.controller,n.stateKey,[["pointermove",n.onDragChange],["pointerup",n.onDragEnd],["pointercancel",n.onDragEnd]]),n.updateGestureState({_pointerId:i.pointerId}),n.config.delay>0?(n.state._delayedEvent=!0,"persist"in i&&typeof i.persist=="function"&&i.persist(),n.setTimeout(n.startDrag.bind(lr(n)),n.config.delay,i)):n.startDrag(i))},n.onDragChange=function(i){if(!n.state.canceled&&i.pointerId===n.state._pointerId){if(!n.state._active){n.state._delayedEvent&&(n.clearTimeout(),n.startDrag(i));return}var a=xi(i);if(!a.down){n.onDragEnd(i);return}n.updateSharedState(a);var o=wi(i),s=n.getKinematics(o,i),c=Zr(lr(n),i),u=n.state._isTap,l=mn(s._movement);u&&l>=Gc&&(u=!1),n.updateGestureState(me({},c,s,{_isTap:u})),n.fireGestureHandler()}},n.onDragEnd=function(i){if(i.pointerId===n.state._pointerId){n.state._active=!1,n.updateSharedState({down:!1,buttons:0,touches:0});var a=n.state._isTap,o=n.state.velocities,s=o[0],c=o[1],u=n.state.movement,l=u[0],f=u[1],d=n.state._intentional,h=d[0],b=d[1],y=n.config.swipeVelocity,R=y[0],S=y[1],x=n.config.swipeDistance,w=x[0],j=x[1],N=me({},Zr(lr(n),i),n.getMovement(n.state.values)),g=[0,0];N.elapsedTime<qc&&(h!==!1&&Math.abs(s)>R&&Math.abs(l)>w&&(g[0]=yn(s)),b!==!1&&Math.abs(c)>S&&Math.abs(f)>j&&(g[1]=yn(c))),n.updateGestureState(me({},N,{tap:a,swipe:g})),n.fireGestureHandler(a===!0)}},n.clean=function(){t.prototype.clean.call(lr(n)),n.state._delayedEvent=!1,Mc(n.controller,n.stateKey)},n.onCancel=function(){n.state.canceled||(n.updateGestureState({canceled:!0}),n.state._active=!1,n.updateSharedState({down:!1,buttons:0,touches:0}),requestAnimationFrame(function(){return n.fireGestureHandler()}))},n.onClick=function(i){n.state._isTap||i.stopPropagation()},n}var r=e.prototype;return r.startDrag=function(i){var a=wi(i);this.updateSharedState(xi(i)),this.updateGestureState(me({},Ac(this,a,i),Zr(this,i,!0),{_pointerId:i.pointerId,cancel:this.onCancel})),this.updateGestureState(this.getMovement(a)),this.fireGestureHandler()},r.addBindings=function(i){if(bn(i,"onPointerDown",this.onDragStart),this.config.filterTaps){var a=this.controller.config.eventOptions.capture?"onClick":"onClickCapture";bn(i,a,this.onClick)}},e}(Hc);function Wc(t,e){var r,n=[],i,a=!1;function o(){for(var s=arguments.length,c=new Array(s),u=0;u<s;u++)c[u]=arguments[u];return a&&r===this&&e(c,n)||(i=t.apply(this,c),a=!0,r=this,n=c),i}return o}function Er(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(t.constructor!==e.constructor)return!1;var r,n,i;if(Array.isArray(t)){if(r=t.length,r!==e.length)return!1;for(n=r;n--!==0;)if(!Er(t[n],e[n]))return!1;return!0}var a;if(typeof Map=="function"&&t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(a=t.entries();!(n=a.next()).done;)if(!e.has(n.value[0]))return!1;for(a=t.entries();!(n=a.next()).done;)if(!Er(n.value[1],e.get(n.value[0])))return!1;return!0}if(typeof Set=="function"&&t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(a=t.entries();!(n=a.next()).done;)if(!e.has(n.value[0]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if(i=Object.keys(t),r=i.length,r!==Object.keys(e).length)return!1;for(n=r;n--!==0;)if(!Object.prototype.hasOwnProperty.call(e,i[n]))return!1;if(typeof Element<"u"&&t instanceof Element)return!1;for(n=r;n--!==0;)if(!(i[n]==="_owner"&&t.$$typeof)&&!Er(t[i[n]],e[i[n]]))return!1;return!0}return t!==t&&e!==e}function Yc(t,e){try{return Er(t,e)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}function Kc(t,e){e===void 0&&(e={}),qe.set("drag",Uc);var r=p.useRef();return r.current||(r.current=Wc(jc,Yc)),Bc({drag:t},r.current(e))}/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var Sa=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],zr=Sa.join(","),Ea=typeof Element>"u",Ke=Ea?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,xn=!Ea&&Element.prototype.getRootNode?function(t){return t.getRootNode()}:function(t){return t.ownerDocument},Oa=function(e,r,n){var i=Array.prototype.slice.apply(e.querySelectorAll(zr));return r&&Ke.call(e,zr)&&i.unshift(e),i=i.filter(n),i},Ra=function t(e,r,n){for(var i=[],a=Array.from(e);a.length;){var o=a.shift();if(o.tagName==="SLOT"){var s=o.assignedElements(),c=s.length?s:o.children,u=t(c,!0,n);n.flatten?i.push.apply(i,u):i.push({scope:o,candidates:u})}else{var l=Ke.call(o,zr);l&&n.filter(o)&&(r||!e.includes(o))&&i.push(o);var f=o.shadowRoot||typeof n.getShadowRoot=="function"&&n.getShadowRoot(o),d=!n.shadowRootFilter||n.shadowRootFilter(o);if(f&&d){var h=t(f===!0?o.children:f.children,!0,n);n.flatten?i.push.apply(i,h):i.push({scope:o,candidates:h})}else a.unshift.apply(a,o.children)}}return i},Ta=function(e,r){return e.tabIndex<0&&(r||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},Xc=function(e,r){return e.tabIndex===r.tabIndex?e.documentOrder-r.documentOrder:e.tabIndex-r.tabIndex},Ca=function(e){return e.tagName==="INPUT"},Qc=function(e){return Ca(e)&&e.type==="hidden"},Jc=function(e){var r=e.tagName==="DETAILS"&&Array.prototype.slice.apply(e.children).some(function(n){return n.tagName==="SUMMARY"});return r},Zc=function(e,r){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===r)return e[n]},eu=function(e){if(!e.name)return!0;var r=e.form||xn(e),n=function(s){return r.querySelectorAll('input[type="radio"][name="'+s+'"]')},i;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")i=n(window.CSS.escape(e.name));else try{i=n(e.name)}catch(o){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",o.message),!1}var a=Zc(i,e.form);return!a||a===e},tu=function(e){return Ca(e)&&e.type==="radio"},ru=function(e){return tu(e)&&!eu(e)},Si=function(e){var r=e.getBoundingClientRect(),n=r.width,i=r.height;return n===0&&i===0},nu=function(e,r){var n=r.displayCheck,i=r.getShadowRoot;if(getComputedStyle(e).visibility==="hidden")return!0;var a=Ke.call(e,"details>summary:first-of-type"),o=a?e.parentElement:e;if(Ke.call(o,"details:not([open]) *"))return!0;var s=xn(e).host,c=(s==null?void 0:s.ownerDocument.contains(s))||e.ownerDocument.contains(e);if(!n||n==="full"){if(typeof i=="function"){for(var u=e;e;){var l=e.parentElement,f=xn(e);if(l&&!l.shadowRoot&&i(l)===!0)return Si(e);e.assignedSlot?e=e.assignedSlot:!l&&f!==e.ownerDocument?e=f.host:e=l}e=u}if(c)return!e.getClientRects().length}else if(n==="non-zero-area")return Si(e);return!1},iu=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var r=e.parentElement;r;){if(r.tagName==="FIELDSET"&&r.disabled){for(var n=0;n<r.children.length;n++){var i=r.children.item(n);if(i.tagName==="LEGEND")return Ke.call(r,"fieldset[disabled] *")?!0:!i.contains(e)}return!0}r=r.parentElement}return!1},Mr=function(e,r){return!(r.disabled||Qc(r)||nu(r,e)||Jc(r)||iu(r))},wn=function(e,r){return!(ru(r)||Ta(r)<0||!Mr(e,r))},au=function(e){var r=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(r)||r>=0)},ou=function t(e){var r=[],n=[];return e.forEach(function(i,a){var o=!!i.scope,s=o?i.scope:i,c=Ta(s,o),u=o?t(i.candidates):s;c===0?o?r.push.apply(r,u):r.push(s):n.push({documentOrder:a,tabIndex:c,item:i,isScope:o,content:u})}),n.sort(Xc).reduce(function(i,a){return a.isScope?i.push.apply(i,a.content):i.push(a.content),i},[]).concat(r)},su=function(e,r){r=r||{};var n;return r.getShadowRoot?n=Ra([e],r.includeContainer,{filter:wn.bind(null,r),flatten:!1,getShadowRoot:r.getShadowRoot,shadowRootFilter:au}):n=Oa(e,r.includeContainer,wn.bind(null,r)),ou(n)},cu=function(e,r){r=r||{};var n;return r.getShadowRoot?n=Ra([e],r.includeContainer,{filter:Mr.bind(null,r),flatten:!0,getShadowRoot:r.getShadowRoot}):n=Oa(e,r.includeContainer,Mr.bind(null,r)),n},dr=function(e,r){if(r=r||{},!e)throw new Error("No node provided");return Ke.call(e,zr)===!1?!1:wn(r,e)},uu=Sa.concat("iframe").join(","),en=function(e,r){if(r=r||{},!e)throw new Error("No node provided");return Ke.call(e,uu)===!1?!1:Mr(r,e)};/*!
* focus-trap 6.9.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/function Ei(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,n)}return r}function Oi(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Ei(Object(r),!0).forEach(function(n){lu(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ei(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function lu(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var Ri=function(){var t=[];return{activateTrap:function(r){if(t.length>0){var n=t[t.length-1];n!==r&&n.pause()}var i=t.indexOf(r);i===-1||t.splice(i,1),t.push(r)},deactivateTrap:function(r){var n=t.indexOf(r);n!==-1&&t.splice(n,1),t.length>0&&t[t.length-1].unpause()}}}(),fu=function(e){return e.tagName&&e.tagName.toLowerCase()==="input"&&typeof e.select=="function"},du=function(e){return e.key==="Escape"||e.key==="Esc"||e.keyCode===27},hu=function(e){return e.key==="Tab"||e.keyCode===9},Ti=function(e){return setTimeout(e,0)},Ci=function(e,r){var n=-1;return e.every(function(i,a){return r(i)?(n=a,!1):!0}),n},Rt=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];return typeof e=="function"?e.apply(void 0,n):e},hr=function(e){return e.target.shadowRoot&&typeof e.composedPath=="function"?e.composedPath()[0]:e.target},pu=function(e,r){var n=(r==null?void 0:r.document)||document,i=Oi({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0},r),a={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0},o,s=function(g,v,O){return g&&g[v]!==void 0?g[v]:i[O||v]},c=function(g){return a.containerGroups.findIndex(function(v){var O=v.container,C=v.tabbableNodes;return O.contains(g)||C.find(function(k){return k===g})})},u=function(g){var v=i[g];if(typeof v=="function"){for(var O=arguments.length,C=new Array(O>1?O-1:0),k=1;k<O;k++)C[k-1]=arguments[k];v=v.apply(void 0,C)}if(v===!0&&(v=void 0),!v){if(v===void 0||v===!1)return v;throw new Error("`".concat(g,"` was specified but was not a node, or did not return a node"))}var T=v;if(typeof v=="string"&&(T=n.querySelector(v),!T))throw new Error("`".concat(g,"` as selector refers to no known node"));return T},l=function(){var g=u("initialFocus");if(g===!1)return!1;if(g===void 0)if(c(n.activeElement)>=0)g=n.activeElement;else{var v=a.tabbableGroups[0],O=v&&v.firstTabbableNode;g=O||u("fallbackFocus")}if(!g)throw new Error("Your focus-trap needs to have at least one focusable element");return g},f=function(){if(a.containerGroups=a.containers.map(function(g){var v=su(g,i.tabbableOptions),O=cu(g,i.tabbableOptions);return{container:g,tabbableNodes:v,focusableNodes:O,firstTabbableNode:v.length>0?v[0]:null,lastTabbableNode:v.length>0?v[v.length-1]:null,nextTabbableNode:function(k){var T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,A=O.findIndex(function(H){return H===k});if(!(A<0))return T?O.slice(A+1).find(function(H){return dr(H,i.tabbableOptions)}):O.slice(0,A).reverse().find(function(H){return dr(H,i.tabbableOptions)})}}}),a.tabbableGroups=a.containerGroups.filter(function(g){return g.tabbableNodes.length>0}),a.tabbableGroups.length<=0&&!u("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times")},d=function N(g){if(g!==!1&&g!==n.activeElement){if(!g||!g.focus){N(l());return}g.focus({preventScroll:!!i.preventScroll}),a.mostRecentlyFocusedNode=g,fu(g)&&g.select()}},h=function(g){var v=u("setReturnFocus",g);return v||(v===!1?!1:g)},b=function(g){var v=hr(g);if(!(c(v)>=0)){if(Rt(i.clickOutsideDeactivates,g)){o.deactivate({returnFocus:i.returnFocusOnDeactivate&&!en(v,i.tabbableOptions)});return}Rt(i.allowOutsideClick,g)||g.preventDefault()}},y=function(g){var v=hr(g),O=c(v)>=0;O||v instanceof Document?O&&(a.mostRecentlyFocusedNode=v):(g.stopImmediatePropagation(),d(a.mostRecentlyFocusedNode||l()))},R=function(g){var v=hr(g);f();var O=null;if(a.tabbableGroups.length>0){var C=c(v),k=C>=0?a.containerGroups[C]:void 0;if(C<0)g.shiftKey?O=a.tabbableGroups[a.tabbableGroups.length-1].lastTabbableNode:O=a.tabbableGroups[0].firstTabbableNode;else if(g.shiftKey){var T=Ci(a.tabbableGroups,function(oe){var Q=oe.firstTabbableNode;return v===Q});if(T<0&&(k.container===v||en(v,i.tabbableOptions)&&!dr(v,i.tabbableOptions)&&!k.nextTabbableNode(v,!1))&&(T=C),T>=0){var A=T===0?a.tabbableGroups.length-1:T-1,H=a.tabbableGroups[A];O=H.lastTabbableNode}}else{var X=Ci(a.tabbableGroups,function(oe){var Q=oe.lastTabbableNode;return v===Q});if(X<0&&(k.container===v||en(v,i.tabbableOptions)&&!dr(v,i.tabbableOptions)&&!k.nextTabbableNode(v))&&(X=C),X>=0){var te=X===a.tabbableGroups.length-1?0:X+1,be=a.tabbableGroups[te];O=be.firstTabbableNode}}}else O=u("fallbackFocus");O&&(g.preventDefault(),d(O))},S=function(g){if(du(g)&&Rt(i.escapeDeactivates,g)!==!1){g.preventDefault(),o.deactivate();return}if(hu(g)){R(g);return}},x=function(g){var v=hr(g);c(v)>=0||Rt(i.clickOutsideDeactivates,g)||Rt(i.allowOutsideClick,g)||(g.preventDefault(),g.stopImmediatePropagation())},w=function(){if(a.active)return Ri.activateTrap(o),a.delayInitialFocusTimer=i.delayInitialFocus?Ti(function(){d(l())}):d(l()),n.addEventListener("focusin",y,!0),n.addEventListener("mousedown",b,{capture:!0,passive:!1}),n.addEventListener("touchstart",b,{capture:!0,passive:!1}),n.addEventListener("click",x,{capture:!0,passive:!1}),n.addEventListener("keydown",S,{capture:!0,passive:!1}),o},j=function(){if(a.active)return n.removeEventListener("focusin",y,!0),n.removeEventListener("mousedown",b,!0),n.removeEventListener("touchstart",b,!0),n.removeEventListener("click",x,!0),n.removeEventListener("keydown",S,!0),o};return o={get active(){return a.active},get paused(){return a.paused},activate:function(g){if(a.active)return this;var v=s(g,"onActivate"),O=s(g,"onPostActivate"),C=s(g,"checkCanFocusTrap");C||f(),a.active=!0,a.paused=!1,a.nodeFocusedBeforeActivation=n.activeElement,v&&v();var k=function(){C&&f(),w(),O&&O()};return C?(C(a.containers.concat()).then(k,k),this):(k(),this)},deactivate:function(g){if(!a.active)return this;var v=Oi({onDeactivate:i.onDeactivate,onPostDeactivate:i.onPostDeactivate,checkCanReturnFocus:i.checkCanReturnFocus},g);clearTimeout(a.delayInitialFocusTimer),a.delayInitialFocusTimer=void 0,j(),a.active=!1,a.paused=!1,Ri.deactivateTrap(o);var O=s(v,"onDeactivate"),C=s(v,"onPostDeactivate"),k=s(v,"checkCanReturnFocus"),T=s(v,"returnFocus","returnFocusOnDeactivate");O&&O();var A=function(){Ti(function(){T&&d(h(a.nodeFocusedBeforeActivation)),C&&C()})};return T&&k?(k(h(a.nodeFocusedBeforeActivation)).then(A,A),this):(A(),this)},pause:function(){return a.paused||!a.active?this:(a.paused=!0,j(),this)},unpause:function(){return!a.paused||!a.active?this:(a.paused=!1,f(),w(),this)},updateContainerElements:function(g){var v=[].concat(g).filter(Boolean);return a.containers=v.map(function(O){return typeof O=="string"?n.querySelector(O):O}),a.active&&f(),this}},o.updateContainerElements(e),o};function vu(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}else return Array.from(t)}var kn=!1;if(typeof window<"u"){var Pi={get passive(){kn=!0}};window.addEventListener("testPassive",null,Pi),window.removeEventListener("testPassive",null,Pi)}var Pa=typeof window<"u"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1),$e=[],Lr=!1,Na=-1,Lt=void 0,Ft=void 0,ja=function(e){return $e.some(function(r){return!!(r.options.allowTouchMove&&r.options.allowTouchMove(e))})},Fr=function(e){var r=e||window.event;return ja(r.target)||r.touches.length>1?!0:(r.preventDefault&&r.preventDefault(),!1)},gu=function(e){if(Ft===void 0){var r=!!e&&e.reserveScrollBarGap===!0,n=window.innerWidth-document.documentElement.clientWidth;r&&n>0&&(Ft=document.body.style.paddingRight,document.body.style.paddingRight=n+"px")}Lt===void 0&&(Lt=document.body.style.overflow,document.body.style.overflow="hidden")},mu=function(){Ft!==void 0&&(document.body.style.paddingRight=Ft,Ft=void 0),Lt!==void 0&&(document.body.style.overflow=Lt,Lt=void 0)},yu=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},bu=function(e,r){var n=e.targetTouches[0].clientY-Na;return ja(e.target)?!1:r&&r.scrollTop===0&&n>0||yu(r)&&n<0?Fr(e):(e.stopPropagation(),!0)},xu=function(e,r){if(!e){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(!$e.some(function(i){return i.targetElement===e})){var n={targetElement:e,options:r||{}};$e=[].concat(vu($e),[n]),Pa?(e.ontouchstart=function(i){i.targetTouches.length===1&&(Na=i.targetTouches[0].clientY)},e.ontouchmove=function(i){i.targetTouches.length===1&&bu(i,e)},Lr||(document.addEventListener("touchmove",Fr,kn?{passive:!1}:void 0),Lr=!0)):gu(r)}},wu=function(e){if(!e){console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");return}$e=$e.filter(function(r){return r.targetElement!==e}),Pa?(e.ontouchstart=null,e.ontouchmove=null,Lr&&$e.length===0&&(document.removeEventListener("touchmove",Fr,kn?{passive:!1}:void 0),Lr=!1)):$e.length||mu()},We=[],Su=function(){return We.some(function(t){return t.activeTargets.length>0})},Eu=function(){return We.some(function(t){return t.skippedTargets.length>0})},Ni="ResizeObserver loop completed with undelivered notifications.",Ou=function(){var t;typeof ErrorEvent=="function"?t=new ErrorEvent("error",{message:Ni}):(t=document.createEvent("Event"),t.initEvent("error",!1,!1),t.message=Ni),window.dispatchEvent(t)},Gt;(function(t){t.BORDER_BOX="border-box",t.CONTENT_BOX="content-box",t.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"})(Gt||(Gt={}));var Ye=function(t){return Object.freeze(t)},Ru=function(){function t(e,r){this.inlineSize=e,this.blockSize=r,Ye(this)}return t}(),ka=function(){function t(e,r,n,i){return this.x=e,this.y=r,this.width=n,this.height=i,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,Ye(this)}return t.prototype.toJSON=function(){var e=this,r=e.x,n=e.y,i=e.top,a=e.right,o=e.bottom,s=e.left,c=e.width,u=e.height;return{x:r,y:n,top:i,right:a,bottom:o,left:s,width:c,height:u}},t.fromRect=function(e){return new t(e.x,e.y,e.width,e.height)},t}(),An=function(t){return t instanceof SVGElement&&"getBBox"in t},Aa=function(t){if(An(t)){var e=t.getBBox(),r=e.width,n=e.height;return!r&&!n}var i=t,a=i.offsetWidth,o=i.offsetHeight;return!(a||o||t.getClientRects().length)},ji=function(t){var e;if(t instanceof Element)return!0;var r=(e=t==null?void 0:t.ownerDocument)===null||e===void 0?void 0:e.defaultView;return!!(r&&t instanceof r.Element)},Tu=function(t){switch(t.tagName){case"INPUT":if(t.type!=="image")break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1},Vt=typeof window<"u"?window:{},pr=new WeakMap,ki=/auto|scroll/,Cu=/^tb|vertical/,Pu=/msie|trident/i.test(Vt.navigator&&Vt.navigator.userAgent),Ae=function(t){return parseFloat(t||"0")},ft=function(t,e,r){return t===void 0&&(t=0),e===void 0&&(e=0),r===void 0&&(r=!1),new Ru((r?e:t)||0,(r?t:e)||0)},Ai=Ye({devicePixelContentBoxSize:ft(),borderBoxSize:ft(),contentBoxSize:ft(),contentRect:new ka(0,0,0,0)}),Da=function(t,e){if(e===void 0&&(e=!1),pr.has(t)&&!e)return pr.get(t);if(Aa(t))return pr.set(t,Ai),Ai;var r=getComputedStyle(t),n=An(t)&&t.ownerSVGElement&&t.getBBox(),i=!Pu&&r.boxSizing==="border-box",a=Cu.test(r.writingMode||""),o=!n&&ki.test(r.overflowY||""),s=!n&&ki.test(r.overflowX||""),c=n?0:Ae(r.paddingTop),u=n?0:Ae(r.paddingRight),l=n?0:Ae(r.paddingBottom),f=n?0:Ae(r.paddingLeft),d=n?0:Ae(r.borderTopWidth),h=n?0:Ae(r.borderRightWidth),b=n?0:Ae(r.borderBottomWidth),y=n?0:Ae(r.borderLeftWidth),R=f+u,S=c+l,x=y+h,w=d+b,j=s?t.offsetHeight-w-t.clientHeight:0,N=o?t.offsetWidth-x-t.clientWidth:0,g=i?R+x:0,v=i?S+w:0,O=n?n.width:Ae(r.width)-g-N,C=n?n.height:Ae(r.height)-v-j,k=O+R+N+x,T=C+S+j+w,A=Ye({devicePixelContentBoxSize:ft(Math.round(O*devicePixelRatio),Math.round(C*devicePixelRatio),a),borderBoxSize:ft(k,T,a),contentBoxSize:ft(O,C,a),contentRect:new ka(f,c,O,C)});return pr.set(t,A),A},Ia=function(t,e,r){var n=Da(t,r),i=n.borderBoxSize,a=n.contentBoxSize,o=n.devicePixelContentBoxSize;switch(e){case Gt.DEVICE_PIXEL_CONTENT_BOX:return o;case Gt.BORDER_BOX:return i;default:return a}},Nu=function(){function t(e){var r=Da(e);this.target=e,this.contentRect=r.contentRect,this.borderBoxSize=Ye([r.borderBoxSize]),this.contentBoxSize=Ye([r.contentBoxSize]),this.devicePixelContentBoxSize=Ye([r.devicePixelContentBoxSize])}return t}(),za=function(t){if(Aa(t))return 1/0;for(var e=0,r=t.parentNode;r;)e+=1,r=r.parentNode;return e},ju=function(){var t=1/0,e=[];We.forEach(function(o){if(o.activeTargets.length!==0){var s=[];o.activeTargets.forEach(function(u){var l=new Nu(u.target),f=za(u.target);s.push(l),u.lastReportedSize=Ia(u.target,u.observedBox),f<t&&(t=f)}),e.push(function(){o.callback.call(o.observer,s,o.observer)}),o.activeTargets.splice(0,o.activeTargets.length)}});for(var r=0,n=e;r<n.length;r++){var i=n[r];i()}return t},Di=function(t){We.forEach(function(r){r.activeTargets.splice(0,r.activeTargets.length),r.skippedTargets.splice(0,r.skippedTargets.length),r.observationTargets.forEach(function(i){i.isActive()&&(za(i.target)>t?r.activeTargets.push(i):r.skippedTargets.push(i))})})},ku=function(){var t=0;for(Di(t);Su();)t=ju(),Di(t);return Eu()&&Ou(),t>0},tn,Ma=[],Au=function(){return Ma.splice(0).forEach(function(t){return t()})},Du=function(t){if(!tn){var e=0,r=document.createTextNode(""),n={characterData:!0};new MutationObserver(function(){return Au()}).observe(r,n),tn=function(){r.textContent="".concat(e?e--:e++)}}Ma.push(t),tn()},Iu=function(t){Du(function(){requestAnimationFrame(t)})},Or=0,zu=function(){return!!Or},Mu=250,Lu={attributes:!0,characterData:!0,childList:!0,subtree:!0},Ii=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],zi=function(t){return t===void 0&&(t=0),Date.now()+t},rn=!1,Fu=function(){function t(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return t.prototype.run=function(e){var r=this;if(e===void 0&&(e=Mu),!rn){rn=!0;var n=zi(e);Iu(function(){var i=!1;try{i=ku()}finally{if(rn=!1,e=n-zi(),!zu())return;i?r.run(1e3):e>0?r.run(e):r.start()}})}},t.prototype.schedule=function(){this.stop(),this.run()},t.prototype.observe=function(){var e=this,r=function(){return e.observer&&e.observer.observe(document.body,Lu)};document.body?r():Vt.addEventListener("DOMContentLoaded",r)},t.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),Ii.forEach(function(r){return Vt.addEventListener(r,e.listener,!0)}))},t.prototype.stop=function(){var e=this;this.stopped||(this.observer&&this.observer.disconnect(),Ii.forEach(function(r){return Vt.removeEventListener(r,e.listener,!0)}),this.stopped=!0)},t}(),Sn=new Fu,Mi=function(t){!Or&&t>0&&Sn.start(),Or+=t,!Or&&Sn.stop()},Vu=function(t){return!An(t)&&!Tu(t)&&getComputedStyle(t).display==="inline"},Bu=function(){function t(e,r){this.target=e,this.observedBox=r||Gt.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return t.prototype.isActive=function(){var e=Ia(this.target,this.observedBox,!0);return Vu(this.target)&&(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},t}(),_u=function(){function t(e,r){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=r}return t}(),vr=new WeakMap,Li=function(t,e){for(var r=0;r<t.length;r+=1)if(t[r].target===e)return r;return-1},gr=function(){function t(){}return t.connect=function(e,r){var n=new _u(e,r);vr.set(e,n)},t.observe=function(e,r,n){var i=vr.get(e),a=i.observationTargets.length===0;Li(i.observationTargets,r)<0&&(a&&We.push(i),i.observationTargets.push(new Bu(r,n&&n.box)),Mi(1),Sn.schedule())},t.unobserve=function(e,r){var n=vr.get(e),i=Li(n.observationTargets,r),a=n.observationTargets.length===1;i>=0&&(a&&We.splice(We.indexOf(n),1),n.observationTargets.splice(i,1),Mi(-1))},t.disconnect=function(e){var r=this,n=vr.get(e);n.observationTargets.slice().forEach(function(i){return r.unobserve(e,i.target)}),n.activeTargets.splice(0,n.activeTargets.length)},t}(),$u=function(){function t(e){if(arguments.length===0)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if(typeof e!="function")throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");gr.connect(this,e)}return t.prototype.observe=function(e,r){if(arguments.length===0)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!ji(e))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");gr.observe(this,e,r)},t.prototype.unobserve=function(e){if(arguments.length===0)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!ji(e))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");gr.unobserve(this,e)},t.prototype.disconnect=function(){gr.disconnect(this)},t.toString=function(){return"function ResizeObserver () { [polyfill code] }"},t}();function pe(){return pe=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},pe.apply(this,arguments)}function Rr(t,e){if(t==null)return{};var r,n,i={},a=Object.keys(t);for(n=0;n<a.length;n++)e.indexOf(r=a[n])>=0||(i[r]=t[r]);return i}var Bt=typeof window<"u"?p.useLayoutEffect:p.useEffect;function Tt(t,e,r){return e=(e=+e)==e?e:0,r=(r=+r)==r?r:0,(t=+t)==t&&(t=(t=t<=r?t:r)>=e?t:e),t}function mr(t){var e=Math.round(t);if(Number.isNaN(t))throw new TypeError("Found a NaN! Check your snapPoints / defaultSnap / snapTo ");return e}var Hu={box:"border-box"};function nn(t,e){var r=e.label,n=e.enabled,i=e.resizeSourceRef,a=p.useState(0),o=a[0],s=a[1];p.useDebugValue(r+": "+o);var c=p.useCallback(function(u){s(u[0].borderBoxSize[0].blockSize),i.current="element"},[i]);return Bt(function(){if(t.current&&n){var u=new $u(c);return u.observe(t.current,Hu),function(){u.disconnect()}}},[t,c,n]),n?o:0}function he(t){return t===void 0&&(t=1e3),new Promise(function(e){return setTimeout(e,t)})}var Fi={DRAG:{target:"#overlay.dragging",actions:"onOpenEnd"}},Vi={RESIZE:{target:"#overlay.resizing",actions:"onOpenEnd"}},Gu=vs({id:"overlay",initial:"closed",context:{initialState:"CLOSED"},states:{closed:{on:{OPEN:"opening",CLOSE:void 0}},opening:{initial:"start",states:{start:{invoke:{src:"onOpenStart",onDone:"transition"}},transition:{always:[{target:"immediately",cond:"initiallyOpen"},{target:"smoothly",cond:"initiallyClosed"}]},immediately:{initial:"open",states:{open:{invoke:{src:"openImmediately",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"#overlay.opening.end"},on:pe({},Fi,Vi)}}},smoothly:{initial:"visuallyHidden",states:{visuallyHidden:{invoke:{src:"renderVisuallyHidden",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"open"}},open:{invoke:{src:"openSmoothly",onDone:"#overlay.opening.end"},on:pe({},Fi,Vi)}}},end:{invoke:{src:"onOpenEnd",onDone:"done"},on:{CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:pe({},{CLOSE:{target:"#overlay.closing",actions:"onOpenCancel"}}),onDone:"open"},open:{on:{DRAG:"#overlay.dragging",SNAP:"snapping",RESIZE:"resizing"}},dragging:{on:{SNAP:"snapping"}},snapping:{initial:"start",states:{start:{invoke:{src:"onSnapStart",onDone:"snappingSmoothly"},entry:[gs({y:function(t,e){return e.payload.y},velocity:function(t,e){return e.payload.velocity},snapSource:function(t,e){var r=e.payload.source;return r===void 0?"custom":r}})]},snappingSmoothly:{invoke:{src:"snapSmoothly",onDone:"end"}},end:{invoke:{src:"onSnapEnd",onDone:"done"},on:{RESIZE:"#overlay.resizing",SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{SNAP:{target:"snapping",actions:"onSnapEnd"},RESIZE:{target:"#overlay.resizing",actions:"onSnapCancel"},DRAG:{target:"#overlay.dragging",actions:"onSnapCancel"},CLOSE:{target:"#overlay.closing",actions:"onSnapCancel"}},onDone:"open"},resizing:{initial:"start",states:{start:{invoke:{src:"onResizeStart",onDone:"resizingSmoothly"}},resizingSmoothly:{invoke:{src:"resizeSmoothly",onDone:"end"}},end:{invoke:{src:"onResizeEnd",onDone:"done"},on:{SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{RESIZE:{target:"resizing",actions:"onResizeEnd"},SNAP:{target:"snapping",actions:"onResizeCancel"},DRAG:{target:"#overlay.dragging",actions:"onResizeCancel"},CLOSE:{target:"#overlay.closing",actions:"onResizeCancel"}},onDone:"open"},closing:{initial:"start",states:{start:{invoke:{src:"onCloseStart",onDone:"deactivating"},on:{OPEN:{target:"#overlay.open",actions:"onCloseCancel"}}},deactivating:{invoke:{src:"deactivate",onDone:"closingSmoothly"}},closingSmoothly:{invoke:{src:"closeSmoothly",onDone:"end"}},end:{invoke:{src:"onCloseEnd",onDone:"done"},on:{OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}}},done:{type:"final"}},on:{CLOSE:void 0,OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}},onDone:"closed"}},on:{CLOSE:"closing"}},{actions:{onOpenCancel:function(t,e){},onSnapCancel:function(t,e){},onResizeCancel:function(t,e){},onCloseCancel:function(t,e){},onOpenEnd:function(t,e){},onSnapEnd:function(t,e){},onRezizeEnd:function(t,e){}},services:{onSnapStart:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},onOpenStart:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},onCloseStart:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},onResizeStart:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},onSnapEnd:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},onOpenEnd:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},onCloseEnd:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},onResizeEnd:function(){try{return Promise.resolve(he()).then(function(){})}catch(t){return Promise.reject(t)}},renderVisuallyHidden:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}},activate:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}},deactivate:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}},openSmoothly:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}},openImmediately:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}},snapSmoothly:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}},resizeSmoothly:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}},closeSmoothly:function(t,e){try{return Promise.resolve(he()).then(function(){})}catch(r){return Promise.reject(r)}}},guards:{initiallyClosed:function(t){return t.initialState==="CLOSED"},initiallyOpen:function(t){return t.initialState==="OPEN"}}}),qu=["children","sibling","className","footer","header","open","initialState","lastSnapRef","initialFocusRef","onDismiss","maxHeight","defaultSnap","snapPoints","blocking","scrollLocking","style","onSpringStart","onSpringCancel","onSpringEnd","reserveScrollBarGap","expandOnContentDrag"],Uu=["velocity"],Wu=["onRest","config"],La=$s.default,Yu=La.tension,yr=La.friction,Ku=le.forwardRef(function(t,e){var r=t.children,n=t.sibling,i=t.className,a=t.footer,o=t.header,s=t.open,c=t.initialState,u=t.lastSnapRef,l=t.initialFocusRef,f=t.onDismiss,d=t.maxHeight,h=t.defaultSnap,b=h===void 0?Qu:h,y=t.snapPoints,R=y===void 0?Ju:y,S=t.blocking,x=S===void 0||S,w=t.scrollLocking,j=w===void 0||w,N=t.style,g=t.onSpringStart,v=t.onSpringCancel,O=t.onSpringEnd,C=t.reserveScrollBarGap,k=C===void 0?x:C,T=t.expandOnContentDrag,A=T!==void 0&&T,H=Rr(t,qu),X=function(){var E=p.useState(!1),I=E[0],D=E[1],B=p.useState({}),re=B[0],U=B[1],J=p.useCallback(function(Z){return U(function(ne){var M;return pe({},ne,((M={})[Z]=!1,M))}),function(){U(function(ne){var M;return pe({},ne,((M={})[Z]=!0,M))})}},[]);return p.useEffect(function(){var Z=Object.values(re);Z.length!==0&&Z.every(Boolean)&&D(!0)},[re]),{ready:I,registerReady:J}}(),te=X.ready,be=X.registerReady,oe=p.useRef(!1),Q=p.useRef(g),z=p.useRef(v),G=p.useRef(O);p.useEffect(function(){Q.current=g,z.current=v,G.current=O},[v,g,O]);var V,_,xe=Ws(function(){return{y:0,ready:0,maxHeight:0,minSnap:0,maxSnap:0}}),ce=xe[0],we=xe[1],Hr=p.useRef(null),gt=p.useRef(null),zn=p.useRef(null),Mn=p.useRef(null),Ln=p.useRef(null),Fn=p.useRef(null),De=p.useRef(0),Xe=p.useRef(),Gr=p.useRef(!1),Me=(V=p.useMemo(function(){return typeof window<"u"?window.matchMedia("(prefers-reduced-motion: reduce)"):null},[]),_=p.useRef(V==null?void 0:V.matches),p.useDebugValue(_.current?"reduce":"no-preference"),p.useEffect(function(){var E=function(I){_.current=I.matches};return V==null||V.addListener(E),function(){return V==null?void 0:V.removeListener(E)}},[V]),_),Qe=function(E){var I=E.targetRef,D=E.enabled,B=E.reserveScrollBarGap,re=p.useRef({activate:function(){throw new TypeError("Tried to activate scroll lock too early")},deactivate:function(){}});return p.useDebugValue(D?"Enabled":"Disabled"),p.useEffect(function(){if(!D)return re.current.deactivate(),void(re.current={activate:function(){},deactivate:function(){}});var U=I.current,J=!1;re.current={activate:function(){J||(J=!0,xu(U,{allowTouchMove:function(Z){return Z.closest("[data-body-scroll-lock-ignore]")},reserveScrollBarGap:B}))},deactivate:function(){J&&(J=!1,wu(U))}}},[D,I,B]),re}({targetRef:gt,enabled:te&&j,reserveScrollBarGap:k}),Je=function(E){var I=E.targetRef,D=E.enabled,B=p.useRef({activate:function(){throw new TypeError("Tried to activate aria hider too early")},deactivate:function(){}});return p.useDebugValue(D?"Enabled":"Disabled"),p.useEffect(function(){if(!D)return B.current.deactivate(),void(B.current={activate:function(){},deactivate:function(){}});var re=I.current,U=!1,J=[],Z=[];B.current={activate:function(){if(!U){U=!0;var ne=re.parentNode;document.querySelectorAll("body > *").forEach(function(M){if(M!==ne){var W=M.getAttribute("aria-hidden");W!==null&&W!=="false"||(J.push(W),Z.push(M),M.setAttribute("aria-hidden","true"))}})}},deactivate:function(){U&&(U=!1,Z.forEach(function(ne,M){var W=J[M];W===null?ne.removeAttribute("aria-hidden"):ne.setAttribute("aria-hidden",W)}),J=[],Z=[])}}},[I,D]),B}({targetRef:Hr,enabled:te&&x}),Ze=function(E){var I=E.targetRef,D=E.fallbackRef,B=E.initialFocusRef,re=E.enabled,U=p.useRef({activate:function(){throw new TypeError("Tried to activate focus trap too early")},deactivate:function(){}});return p.useDebugValue(re?"Enabled":"Disabled"),p.useEffect(function(){if(!re)return U.current.deactivate(),void(U.current={activate:function(){},deactivate:function(){}});var J=D.current,Z=pu(I.current,{onActivate:void 0,initialFocus:B?function(){return(B==null?void 0:B.current)||J}:void 0,fallbackFocus:J,escapeDeactivates:!1,clickOutsideDeactivates:!1}),ne=!1;U.current={activate:function(){try{return ne?Promise.resolve():(ne=!0,Promise.resolve(Z.activate()).then(function(){return Promise.resolve(new Promise(function(M){return setTimeout(function(){return M(void 0)},0)})).then(function(){})}))}catch(M){return Promise.reject(M)}},deactivate:function(){ne&&(ne=!1,Z.deactivate())}}},[re,D,B,I]),U}({targetRef:Hr,fallbackRef:Fn,initialFocusRef:l||void 0,enabled:te&&x&&l!==!1}),Wt=function(E){var I=E.getSnapPoints,D=E.heightRef,B=E.lastSnapRef,re=E.ready,U=function(fe){var Te=fe.contentRef,ze=fe.controlledMaxHeight,ge=fe.footerEnabled,He=fe.footerRef,tt=fe.headerEnabled,Ce=fe.headerRef,xt=fe.registerReady,Qt=fe.resizeSourceRef,Bn=p.useMemo(function(){return xt("contentHeight")},[xt]),_n=function(wt,qn,Jt){var Zt=p.useMemo(function(){return qn("maxHeight")},[qn]),Un=p.useState(function(){return mr(wt)||typeof window<"u"?window.innerHeight:0}),Wn=Un[0],Wr=Un[1],Yn=Wn>0,er=p.useRef(0);return p.useDebugValue(wt?"controlled":"auto"),p.useEffect(function(){Yn&&Zt()},[Yn,Zt]),Bt(function(){if(wt)return Wr(mr(wt)),void(Jt.current="maxheightprop");var Kn=function(){er.current||(er.current=requestAnimationFrame(function(){Wr(window.innerHeight),Jt.current="window",er.current=0}))};return window.addEventListener("resize",Kn),Wr(window.innerHeight),Jt.current="window",Zt(),function(){window.removeEventListener("resize",Kn),cancelAnimationFrame(er.current)}},[wt,Zt,Jt]),Wn}(ze,xt,Qt),qr=nn(Ce,{label:"headerHeight",enabled:tt,resizeSourceRef:Qt}),$n=nn(Te,{label:"contentHeight",enabled:!0,resizeSourceRef:Qt}),Ur=nn(He,{label:"footerHeight",enabled:ge,resizeSourceRef:Qt}),Hn=Math.min(_n-qr-Ur,$n)+qr+Ur;p.useDebugValue("minHeight: "+Hn);var Gn=$n>0;return p.useEffect(function(){Gn&&Bn()},[Gn,Bn]),{maxHeight:_n,minHeight:Hn,headerHeight:qr,footerHeight:Ur}}({contentRef:E.contentRef,controlledMaxHeight:E.controlledMaxHeight,footerEnabled:E.footerEnabled,footerRef:E.footerRef,headerEnabled:E.headerEnabled,headerRef:E.headerRef,registerReady:E.registerReady,resizeSourceRef:E.resizeSourceRef}),J=U.maxHeight,Z=U.minHeight,ne=U.headerHeight,M=U.footerHeight,W=function(fe,Te){var ze=[].concat(fe).map(mr).reduce(function(Ce,xt){return Ce.add(Tt(xt,0,Te)),Ce},new Set),ge=Array.from(ze),He=Math.min.apply(Math,ge);if(Number.isNaN(He))throw new TypeError("minSnap is NaN");var tt=Math.max.apply(Math,ge);if(Number.isNaN(tt))throw new TypeError("maxSnap is NaN");return{snapPoints:ge,minSnap:He,maxSnap:tt}}(re?I({height:D.current,footerHeight:M,headerHeight:ne,minHeight:Z,maxHeight:J}):[0],J),Ee=W.snapPoints,et=W.minSnap,Re=W.maxSnap;return p.useDebugValue("minSnap: "+et+", maxSnap:"+Re),{minSnap:et,maxSnap:Re,findSnap:function(fe){var Te=mr(typeof fe=="function"?fe({footerHeight:M,headerHeight:ne,height:D.current,minHeight:Z,maxHeight:J,snapPoints:Ee,lastSnap:B.current}):fe);return Ee.reduce(function(ze,ge){return Math.abs(ge-Te)<Math.abs(ze-Te)?ge:ze},et)},maxHeight:J}}({contentRef:zn,controlledMaxHeight:d,footerEnabled:!!a,footerRef:Ln,getSnapPoints:R,headerEnabled:o!==!1,headerRef:Mn,heightRef:De,lastSnapRef:u,ready:te,registerReady:be,resizeSourceRef:Xe}),mt=Wt.minSnap,yt=Wt.maxSnap,bt=Wt.maxHeight,Yt=Wt.findSnap,Ie=p.useRef(bt),Se=p.useRef(mt),se=p.useRef(yt),Kt=p.useRef(Yt),ke=p.useRef(0);Bt(function(){Ie.current=bt,se.current=yt,Se.current=mt,Kt.current=Yt,ke.current=Yt(b)},[Yt,b,bt,yt,mt]);var ve=p.useCallback(function(E){var I=E.onRest,D=E.config,B=(D=D===void 0?{}:D).velocity,re=B===void 0?1:B,U=Rr(D,Uu),J=Rr(E,Wu);return new Promise(function(Z){return we(pe({},J,{config:pe({velocity:re},U,{mass:1,tension:Yu,friction:Math.max(yr,yr+(yr-yr*re))}),onRest:function(){var ne=[].slice.call(arguments);Z.apply(void 0,ne),I==null||I.apply(void 0,ne)}}))})},[we]),Vn=Rs(Gu,{devTools:!1,actions:{onOpenCancel:p.useCallback(function(){return z.current==null?void 0:z.current({type:"OPEN"})},[]),onSnapCancel:p.useCallback(function(E){return z.current==null?void 0:z.current({type:"SNAP",source:E.snapSource})},[]),onCloseCancel:p.useCallback(function(){return z.current==null?void 0:z.current({type:"CLOSE"})},[]),onResizeCancel:p.useCallback(function(){return z.current==null?void 0:z.current({type:"RESIZE",source:Xe.current})},[]),onOpenEnd:p.useCallback(function(){return G.current==null?void 0:G.current({type:"OPEN"})},[]),onSnapEnd:p.useCallback(function(E,I){return G.current==null?void 0:G.current({type:"SNAP",source:E.snapSource})},[]),onResizeEnd:p.useCallback(function(){return G.current==null?void 0:G.current({type:"RESIZE",source:Xe.current})},[])},context:{initialState:c},services:{onSnapStart:p.useCallback(function(E,I){try{return Promise.resolve(Q.current==null?void 0:Q.current({type:"SNAP",source:I.payload.source||"custom"}))}catch(D){return Promise.reject(D)}},[]),onOpenStart:p.useCallback(function(){try{return Promise.resolve(Q.current==null?void 0:Q.current({type:"OPEN"}))}catch(E){return Promise.reject(E)}},[]),onCloseStart:p.useCallback(function(){try{return Promise.resolve(Q.current==null?void 0:Q.current({type:"CLOSE"}))}catch(E){return Promise.reject(E)}},[]),onResizeStart:p.useCallback(function(){try{return Promise.resolve(Q.current==null?void 0:Q.current({type:"RESIZE",source:Xe.current}))}catch(E){return Promise.reject(E)}},[]),onSnapEnd:p.useCallback(function(E,I){try{return Promise.resolve(G.current==null?void 0:G.current({type:"SNAP",source:E.snapSource}))}catch(D){return Promise.reject(D)}},[]),onOpenEnd:p.useCallback(function(){try{return Promise.resolve(G.current==null?void 0:G.current({type:"OPEN"}))}catch(E){return Promise.reject(E)}},[]),onCloseEnd:p.useCallback(function(){try{return Promise.resolve(G.current==null?void 0:G.current({type:"CLOSE"}))}catch(E){return Promise.reject(E)}},[]),onResizeEnd:p.useCallback(function(){try{return Promise.resolve(G.current==null?void 0:G.current({type:"RESIZE",source:Xe.current}))}catch(E){return Promise.reject(E)}},[]),renderVisuallyHidden:p.useCallback(function(E,I){try{return Promise.resolve(ve({y:ke.current,ready:0,maxHeight:Ie.current,maxSnap:se.current,minSnap:ke.current,immediate:!0})).then(function(){})}catch(D){return Promise.reject(D)}},[ve]),activate:p.useCallback(function(E,I){try{return oe.current=!0,Promise.resolve(Promise.all([Qe.current.activate(),Ze.current.activate(),Je.current.activate()])).then(function(){})}catch(D){return Promise.reject(D)}},[Je,Ze,Qe]),deactivate:p.useCallback(function(){try{return Qe.current.deactivate(),Ze.current.deactivate(),Je.current.deactivate(),oe.current=!1,Promise.resolve()}catch(E){return Promise.reject(E)}},[Je,Ze,Qe]),openImmediately:p.useCallback(function(){try{return De.current=ke.current,Promise.resolve(ve({y:ke.current,ready:1,maxHeight:Ie.current,maxSnap:se.current,minSnap:ke.current,immediate:!0})).then(function(){})}catch(E){return Promise.reject(E)}},[ve]),openSmoothly:p.useCallback(function(){try{return Promise.resolve(ve({y:0,ready:1,maxHeight:Ie.current,maxSnap:se.current,minSnap:ke.current,immediate:!0})).then(function(){return De.current=ke.current,Promise.resolve(ve({y:ke.current,ready:1,maxHeight:Ie.current,maxSnap:se.current,minSnap:ke.current,immediate:Me.current})).then(function(){})})}catch(E){return Promise.reject(E)}},[ve,Me]),snapSmoothly:p.useCallback(function(E,I){try{var D=Kt.current(E.y);return De.current=D,u.current=D,Promise.resolve(ve({y:D,ready:1,maxHeight:Ie.current,maxSnap:se.current,minSnap:Se.current,immediate:Me.current,config:{velocity:E.velocity}})).then(function(){})}catch(B){return Promise.reject(B)}},[ve,u,Me]),resizeSmoothly:p.useCallback(function(){try{var E=Kt.current(De.current);return De.current=E,u.current=E,Promise.resolve(ve({y:E,ready:1,maxHeight:Ie.current,maxSnap:se.current,minSnap:Se.current,immediate:Xe.current!=="element"||Me.current})).then(function(){})}catch(I){return Promise.reject(I)}},[ve,u,Me]),closeSmoothly:p.useCallback(function(E,I){try{return ve({minSnap:De.current,immediate:!0}),De.current=0,Promise.resolve(ve({y:0,maxHeight:Ie.current,maxSnap:se.current,immediate:Me.current})).then(function(){return Promise.resolve(ve({ready:0,immediate:!0})).then(function(){})})}catch(D){return Promise.reject(D)}},[ve,Me])}}),Fa=Vn[0],Le=Vn[1];p.useEffect(function(){te&&Le(s?"OPEN":"CLOSE")},[s,Le,te]),Bt(function(){(bt||yt||mt)&&Le("RESIZE")},[bt,yt,mt,Le]),p.useEffect(function(){return function(){Qe.current.deactivate(),Ze.current.deactivate(),Je.current.deactivate()}},[Je,Ze,Qe]),p.useImperativeHandle(e,function(){return{snapTo:function(E,I){var D=I===void 0?{}:I,B=D.velocity,re=B===void 0?1:B,U=D.source,J=U===void 0?"custom":U;Le("SNAP",{payload:{y:Kt.current(E),velocity:re,source:J}})},get height(){return De.current}}},[Le]),p.useEffect(function(){var E=gt.current,I=function(B){Gr.current&&B.preventDefault()},D=function(B){E.scrollTop<0&&(requestAnimationFrame(function(){E.style.overflow="hidden",E.scrollTop=0,E.style.removeProperty("overflow")}),B.preventDefault())};return A&&(E.addEventListener("scroll",I),E.addEventListener("touchmove",I),E.addEventListener("touchstart",D)),function(){E.removeEventListener("scroll",I),E.removeEventListener("touchmove",I),E.removeEventListener("touchstart",D)}},[A,gt]);var Xt=Kc(function(E){var I=E.args,D=(I=I===void 0?[]:I)[0],B=(D=D===void 0?{}:D).closeOnTap,re=B!==void 0&&B,U=D.isContentDragging,J=U!==void 0&&U,Z=E.cancel,ne=E.direction[1],M=E.down,W=E.first,Ee=E.last,et=E.memo,Re=et===void 0?ce.y.getValue():et,fe=E.tap,Te=E.velocity,ze=-1*E.movement[1];if(!oe.current)return Z(),Re;if(f&&re&&fe)return Z(),setTimeout(function(){return f()},0),Re;if(fe)return Re;var ge=Re+ze,He=ze*Te,tt=Math.max(Se.current,Math.min(se.current,ge+2*He));if(!M&&f&&ne>0&&ge+He<Se.current/2)return Z(),f(),Re;var Ce=M?f||Se.current!==se.current?Mt(ge,f?0:Se.current,se.current,.55):ge<Se.current?Mt(ge,Se.current,2*se.current,.55):Mt(ge,Se.current/2,se.current,.55):tt;return A&&J?(Ce>=se.current&&(Ce=se.current),Re===se.current&&gt.current.scrollTop>0&&(Ce=se.current),Gr.current=Ce<se.current):Gr.current=!1,W&&Le("DRAG"),Ee?(Le("SNAP",{payload:{y:Ce,velocity:Te>.05?Te:1,source:"dragging"}}),Re):(we({y:Ce,ready:1,maxHeight:Ie.current,maxSnap:se.current,minSnap:Se.current,immediate:!0,config:{velocity:Te}}),Re)},{filterTaps:!0});if(Number.isNaN(se.current))throw new TypeError("maxSnapRef is NaN!!");if(Number.isNaN(Se.current))throw new TypeError("minSnapRef is NaN!!");var Va=function(E){var I,D=E.spring,B=at([D.y,D.maxHeight],function(M,W){return Math.round(Tt(W-M,0,16))+"px"}),re=at([D.y,D.minSnap,D.maxSnap],function(M,W,Ee){return Tt(M,W,Ee)+"px"}),U=at([D.y,D.minSnap,D.maxSnap],function(M,W,Ee){return M<W?W-M+"px":M>Ee?Ee-M+"px":"0px"}),J=at([D.y,D.maxSnap],function(M,W){return M>=W?Math.ceil(M-W):0}),Z=at([D.y,D.minSnap],function(M,W){if(!W)return 0;var Ee=Math.max(W/2-45,0);return Tt((M-Ee)*(1/(Math.min(W/2+45,W)-Ee)+0),0,1)}),ne=at([D.y,D.minSnap],function(M,W){return W?Tt(M/W,0,1):0});return(I={})["--rsbs-content-opacity"]=Z,I["--rsbs-backdrop-opacity"]=ne,I["--rsbs-antigap-scale-y"]=J,I["--rsbs-overlay-translate-y"]=U,I["--rsbs-overlay-rounded"]=B,I["--rsbs-overlay-h"]=re,I}({spring:ce});return le.createElement(dc.div,pe({},H,{"data-rsbs-root":!0,"data-rsbs-state":Xu.find(Fa.matches),"data-rsbs-is-blocking":x,"data-rsbs-is-dismissable":!!f,"data-rsbs-has-header":!!o,"data-rsbs-has-footer":!!a,className:i,ref:Hr,style:pe({},Va,N,{opacity:ce.ready})}),n,x&&le.createElement("div",pe({key:"backdrop","data-rsbs-backdrop":!0},Xt({closeOnTap:!0}))),le.createElement("div",{key:"overlay","aria-modal":"true",role:"dialog","data-rsbs-overlay":!0,tabIndex:-1,ref:Fn,onKeyDown:function(E){E.key==="Escape"&&(E.stopPropagation(),f&&f())}},o!==!1&&le.createElement("div",pe({key:"header","data-rsbs-header":!0,ref:Mn},Xt()),o),le.createElement("div",pe({key:"scroll","data-rsbs-scroll":!0,ref:gt},A?Xt({isContentDragging:!0}):{}),le.createElement("div",{"data-rsbs-content":!0,ref:zn},r)),a&&le.createElement("div",pe({key:"footer",ref:Ln,"data-rsbs-footer":!0},Xt()),a)))}),Xu=["closed","opening","open","closing","dragging","snapping","resizing"];function Qu(t){var e=t.lastSnap;return e??Math.min.apply(Math,t.snapPoints)}function Ju(t){return t.minHeight}var Zu=["onSpringStart","onSpringEnd","skipInitialTransition"],el=p.forwardRef(function(t,e){var r=t.onSpringStart,n=t.onSpringEnd,i=t.skipInitialTransition,a=Rr(t,Zu),o=p.useState(!1),s=o[0],c=o[1],u=p.useRef(),l=p.useRef(null),f=p.useRef(i&&a.open?"OPEN":"CLOSED");Bt(function(){if(a.open)return cancelAnimationFrame(u.current),c(!0),function(){f.current="CLOSED"}},[a.open]);var d=p.useCallback(function(b){return Promise.resolve(r==null?void 0:r(b)).then(function(){b.type==="OPEN"&&cancelAnimationFrame(u.current)})},[r]),h=p.useCallback(function(b){return Promise.resolve(n==null?void 0:n(b)).then(function(){b.type==="CLOSE"&&(u.current=requestAnimationFrame(function(){return c(!1)}))})},[n]);return s?le.createElement(xo,{"data-rsbs-portal":!0},le.createElement(Ku,pe({},a,{lastSnapRef:l,ref:e,initialState:f.current,onSpringStart:d,onSpringEnd:h}))):null}),Tr={linear:function(t,e,r,n){var i=r-e;return i*t/n+e},easeInQuad:function(t,e,r,n){var i=r-e;return i*(t/=n)*t+e},easeOutQuad:function(t,e,r,n){var i=r-e;return-i*(t/=n)*(t-2)+e},easeInOutQuad:function(t,e,r,n){var i=r-e;return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,r,n){var i=r-e;return i*(t/=n)*t*t+e},easeOutCubic:function(t,e,r,n){var i=r-e;return i*((t=t/n-1)*t*t+1)+e},easeInOutCubic:function(t,e,r,n){var i=r-e;return(t/=n/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,r,n){var i=r-e;return i*(t/=n)*t*t*t+e},easeOutQuart:function(t,e,r,n){var i=r-e;return-i*((t=t/n-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,r,n){var i=r-e;return(t/=n/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,r,n){var i=r-e;return i*(t/=n)*t*t*t*t+e},easeOutQuint:function(t,e,r,n){var i=r-e;return i*((t=t/n-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,r,n){var i=r-e;return(t/=n/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,r,n){var i=r-e;return-i*Math.cos(t/n*(Math.PI/2))+i+e},easeOutSine:function(t,e,r,n){var i=r-e;return i*Math.sin(t/n*(Math.PI/2))+e},easeInOutSine:function(t,e,r,n){var i=r-e;return-i/2*(Math.cos(Math.PI*t/n)-1)+e},easeInExpo:function(t,e,r,n){var i=r-e;return t==0?e:i*Math.pow(2,10*(t/n-1))+e},easeOutExpo:function(t,e,r,n){var i=r-e;return t==n?e+i:i*(-Math.pow(2,-10*t/n)+1)+e},easeInOutExpo:function(t,e,r,n){var i=r-e;return t===0?e:t===n?e+i:(t/=n/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(-Math.pow(2,-10*--t)+2)+e},easeInCirc:function(t,e,r,n){var i=r-e;return-i*(Math.sqrt(1-(t/=n)*t)-1)+e},easeOutCirc:function(t,e,r,n){var i=r-e;return i*Math.sqrt(1-(t=t/n-1)*t)+e},easeInOutCirc:function(t,e,r,n){var i=r-e;return(t/=n/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,r,n){var i=r-e,a,o,s;return s=1.70158,o=0,a=i,t===0?e:(t/=n)===1?e+i:(o||(o=n*.3),a<Math.abs(i)?(a=i,s=o/4):s=o/(2*Math.PI)*Math.asin(i/a),-(a*Math.pow(2,10*(t-=1))*Math.sin((t*n-s)*(2*Math.PI)/o))+e)},easeOutElastic:function(t,e,r,n){var i=r-e,a,o,s;return s=1.70158,o=0,a=i,t===0?e:(t/=n)===1?e+i:(o||(o=n*.3),a<Math.abs(i)?(a=i,s=o/4):s=o/(2*Math.PI)*Math.asin(i/a),a*Math.pow(2,-10*t)*Math.sin((t*n-s)*(2*Math.PI)/o)+i+e)},easeInOutElastic:function(t,e,r,n){var i=r-e,a,o,s;return s=1.70158,o=0,a=i,t===0?e:(t/=n/2)===2?e+i:(o||(o=n*(.3*1.5)),a<Math.abs(i)?(a=i,s=o/4):s=o/(2*Math.PI)*Math.asin(i/a),t<1?-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*n-s)*(2*Math.PI)/o))+e:a*Math.pow(2,-10*(t-=1))*Math.sin((t*n-s)*(2*Math.PI)/o)*.5+i+e)},easeInBack:function(t,e,r,n,i){var a=r-e;return i===void 0&&(i=1.70158),a*(t/=n)*t*((i+1)*t-i)+e},easeOutBack:function(t,e,r,n,i){var a=r-e;return i===void 0&&(i=1.70158),a*((t=t/n-1)*t*((i+1)*t+i)+1)+e},easeInOutBack:function(t,e,r,n,i){var a=r-e;return i===void 0&&(i=1.70158),(t/=n/2)<1?a/2*(t*t*(((i*=1.525)+1)*t-i))+e:a/2*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)+e},easeInBounce:function(t,e,r,n){var i=r-e,a;return a=Tr.easeOutBounce(n-t,0,i,n),i-a+e},easeOutBounce:function(t,e,r,n){var i=r-e;return(t/=n)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,r,n){var i=r-e,a;return t<n/2?(a=Tr.easeInBounce(t*2,0,i,n),a*.5+e):(a=Tr.easeOutBounce(t*2-n,0,i,n),a*.5+i*.5+e)}},tl=Tr;function rl(t){return t*Math.PI/180}function ye(t,e){return t+Math.random()*(e-t)}function nl(t,e){return Math.floor(t+Math.random()*(e-t+1))}var _t;(function(t){t[t.Circle=0]="Circle",t[t.Square=1]="Square",t[t.Strip=2]="Strip"})(_t||(_t={}));var Fe;(function(t){t[t.Positive=1]="Positive",t[t.Negative=-1]="Negative"})(Fe||(Fe={}));const il=1e3/60;class al{constructor(e,r,n,i){this.getOptions=r;const{colors:a,initialVelocityX:o,initialVelocityY:s}=this.getOptions();this.context=e,this.x=n,this.y=i,this.w=ye(5,20),this.h=ye(5,20),this.radius=ye(5,10),this.vx=typeof o=="number"?ye(-o,o):ye(o.min,o.max),this.vy=typeof s=="number"?ye(-s,0):ye(s.min,s.max),this.shape=nl(0,2),this.angle=rl(ye(0,360)),this.angularSpin=ye(-.2,.2),this.color=a[Math.floor(Math.random()*a.length)],this.rotateY=ye(0,1),this.rotationDirection=ye(0,1)?Fe.Positive:Fe.Negative}update(e){const{gravity:r,wind:n,friction:i,opacity:a,drawShape:o}=this.getOptions(),s=e/il;this.x+=this.vx*s,this.y+=this.vy*s,this.vy+=r*s,this.vx+=n*s,this.vx*=i**s,this.vy*=i**s,this.rotateY>=1&&this.rotationDirection===Fe.Positive?this.rotationDirection=Fe.Negative:this.rotateY<=-1&&this.rotationDirection===Fe.Negative&&(this.rotationDirection=Fe.Positive);const c=.1*this.rotationDirection*s;if(this.rotateY+=c,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=a,this.context.lineCap="round",this.context.lineWidth=2,o&&typeof o=="function")o.call(this,this.context);else switch(this.shape){case _t.Circle:{this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break}case _t.Square:{this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break}case _t.Strip:{this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h);break}}this.context.closePath(),this.context.restore()}}class ol{constructor(e,r){this.x=0,this.y=0,this.w=0,this.h=0,this.lastNumberOfPieces=0,this.tweenProgress=0,this.tweenFrom=0,this.particles=[],this.particlesGenerated=0,this.removeParticleAt=i=>{this.particles.splice(i,1)},this.getParticle=()=>{const i=ye(this.x,this.w+this.x),a=ye(this.y,this.h+this.y);return new al(this.context,this.getOptions,i,a)},this.animate=i=>{const{canvas:a,context:o,particlesGenerated:s,lastNumberOfPieces:c}=this,{run:u,recycle:l,numberOfPieces:f,debug:d,tweenFunction:h,tweenDuration:b}=this.getOptions();if(!u)return!1;const y=this.particles.length,R=l?y:s;if(R<f){c!==f&&(this.tweenProgress=0,this.tweenFrom=R,this.lastNumberOfPieces=f),this.tweenProgress=Math.min(b,Math.max(0,this.tweenProgress+i));const S=h(this.tweenProgress,this.tweenFrom,f,b),x=Math.round(S-R);for(let w=0;w<x;w++)this.particles.push(this.getParticle());this.particlesGenerated+=x}d&&(o.font="12px sans-serif",o.fillStyle="#333",o.textAlign="right",o.fillText(`Particles: ${y}`,a.width-10,a.height-20));for(let S=this.particles.length-1;S>=0;S--){const x=this.particles[S];x.update(i),(x.y>a.height||x.y<-100||x.x>a.width+100||x.x<-100)&&(l&&R<=f?this.particles[S]=this.getParticle():this.removeParticleAt(S))}return y>0||R<f},this.canvas=e;const n=this.canvas.getContext("2d");if(!n)throw new Error("Could not get canvas context");this.context=n,this.getOptions=r}}const Dn={width:typeof window<"u"?window.innerWidth:300,height:typeof window<"u"?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:tl.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0};class sl{constructor(e,r){this.lastFrameTime=0,this.setOptionsWithDefaults=i=>{const a={confettiSource:{x:0,y:0,w:this.canvas.width,h:0}};this._options={...a,...Dn,...i},Object.assign(this,i.confettiSource)},this.update=(i=0)=>{const{options:{run:a,onConfettiComplete:o,frameRate:s},canvas:c,context:u}=this,l=Math.min(i-this.lastFrameTime,50);if(s&&l<1e3/s){this.rafId=requestAnimationFrame(this.update);return}this.lastFrameTime=i-(s?l%s:0),a&&(u.fillStyle="white",u.clearRect(0,0,c.width,c.height)),this.generator.animate(l)?this.rafId=requestAnimationFrame(this.update):(o&&typeof o=="function"&&this.generator.particlesGenerated>0&&o.call(this,this),this._options.run=!1)},this.reset=()=>{this.generator&&this.generator.particlesGenerated>0&&(this.generator.particlesGenerated=0,this.generator.particles=[],this.generator.lastNumberOfPieces=0)},this.stop=()=>{this.options={run:!1},this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=void 0)},this.canvas=e;const n=this.canvas.getContext("2d");if(!n)throw new Error("Could not get canvas context");this.context=n,this.generator=new ol(this.canvas,()=>this.options),this.options=r,this.update()}get options(){return this._options}set options(e){var i,a;const r=(i=this._options)==null?void 0:i.run,n=(a=this._options)==null?void 0:a.recycle;this.setOptionsWithDefaults(e),this.generator&&(Object.assign(this.generator,this.options.confettiSource),typeof e.recycle=="boolean"&&e.recycle&&n===!1&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),typeof e.run=="boolean"&&e.run&&r===!1&&this.update()}}const cl=le.createRef();class In extends le.Component{constructor(e){super(e),this.canvas=le.createRef(),this.canvas=e.canvasRef||cl}componentDidMount(){if(this.canvas.current){const e=an(this.props)[0];this.confetti=new sl(this.canvas.current,e)}}componentDidUpdate(){const e=an(this.props)[0];this.confetti&&(this.confetti.options=e)}componentWillUnmount(){this.confetti&&this.confetti.stop(),this.confetti=void 0}render(){const[e,r]=an(this.props),n={zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0,...r.style};return m.jsx("canvas",{width:e.width,height:e.height,ref:this.canvas,...r,style:n})}}In.defaultProps={...Dn};In.displayName="ReactConfetti";function an(t){const e={},r={},n={},i=[...Object.keys(Dn),"confettiSource","drawShape","onConfettiComplete","frameRate"],a=["canvasRef"];for(const o in t){const s=t[o];i.includes(o)?e[o]=s:a.includes(o)?a[o]=s:n[o]=s}return[e,n,r]}const ul=le.forwardRef((t,e)=>m.jsx(In,{canvasRef:e,...t}));function ml(){const t=$a(),[e,r]=p.useState(""),[n,i]=p.useState(""),[a,o]=p.useState("standard"),[s,c]=p.useState(""),[u,l]=p.useState(""),[f,d]=p.useState(""),[h,b]=p.useState(!1),[y,R]=p.useState(!1),[S,x]=p.useState(""),[w,j]=p.useState(null),[N,g]=p.useState(!1),[v,O]=p.useState(!1),[C,k]=p.useState(!0),T=p.useRef(null),[A,H]=p.useState(null);p.useEffect(()=>{if(w){g(!0);const z=setTimeout(()=>g(!1),4e3);return()=>clearTimeout(z)}else g(!1)},[w]);const X=async z=>{if(z.preventDefault(),!!e){x(""),R(!0);try{let G=e.trim();/^https?:\/\//i.test(G)||(G="https://"+G);const V=n.trim(),_=V?V.toLowerCase():"",xe=await Qa.create(G,_,a,{password:s||void 0,expiresAt:u?new Date(u).toISOString():void 0,maxClicks:f?parseInt(f):void 0,isPrivate:h}),ce=`${window.location.origin}/l/${xe.slug}`;j({...xe,short_url:ce})}catch(G){console.error(G),G.message&&G.message.includes("alias")?x("Este alias ya está ocupado. Prueba otro."):x(G.message||"Error al crear el enlace.")}finally{R(!1)}}},te=()=>{w&&(navigator.clipboard.writeText(w.short_url),alert("¡Copiado!"))},be=()=>{const z=typeof window<"u";if(!(z&&window.innerWidth<=800)){k(V=>!V);return}if(!z){k(V=>!V);return}if(C){const V=A;k(!1),setTimeout(()=>{if(V!=null)window.scrollTo({top:V,behavior:"smooth"});else if(T.current){const _=T.current.getBoundingClientRect().top+window.scrollY-40;window.scrollTo({top:_,behavior:"smooth"})}},80)}else{const V=window.scrollY||window.pageYOffset;H(V),k(!0),setTimeout(()=>{if(T.current){const xe=T.current.getBoundingClientRect().bottom+window.scrollY,ce=window.innerHeight||document.documentElement.clientHeight,we=Math.max(0,xe-ce+220);window.scrollTo({top:we,behavior:"smooth"})}},60)}},oe=()=>{var z;return w?m.jsxs(Yr.div,{className:"lp-create-shell lp-bg",initial:{opacity:0,scale:.96},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.98},transition:{duration:.22},children:[m.jsx("style",{children:Bi}),N&&m.jsx("div",{className:"lp-confetti-layer",children:m.jsx(ul,{numberOfPieces:200,recycle:!1})}),m.jsx("div",{className:"lp-create-inner lp-success-v2",children:m.jsxs("div",{className:"lp-success-card-v2",children:[m.jsx("div",{className:"lp-success-badge",children:"SMART LINK CREADO"}),m.jsx("div",{className:"lp-success-icon-v2",children:m.jsx(uo,{size:30})}),m.jsx("h2",{children:"¡Tu Smart Link está activo!"}),m.jsxs("p",{className:"lp-success-sub",children:["Modo:"," ",m.jsx("strong",{className:"lp-success-mode",children:(z=w.monetization_mode)==null?void 0:z.toUpperCase()})]}),m.jsxs("div",{className:"lp-success-url",children:[m.jsx("input",{readOnly:!0,value:w.short_url}),m.jsx("button",{type:"button",onClick:te,children:m.jsx(io,{size:18})})]}),m.jsxs("div",{className:"lp-success-actions",children:[m.jsx("button",{type:"button",className:"lp-btn-ghost",onClick:()=>{j(null),r(""),i(""),c(""),l(""),d(""),b(!1)},children:"Crear otro"}),m.jsx("button",{type:"button",className:"lp-btn-primary lp-btn-primary-gradient",onClick:()=>t("/app/links"),children:"Ir a mis enlaces"})]}),m.jsx("p",{className:"lp-success-foot",children:"Tip: pega este Smart Link en tu bio de TikTok, Instagram o descripción de vídeo."})]})})]},"success"):null},Q=()=>m.jsxs(Yr.div,{className:"lp-create-shell lp-bg",initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.2},children:[m.jsx("style",{children:Bi}),m.jsxs("div",{className:"lp-create-inner",children:[m.jsx("header",{className:"lp-header-v2",children:m.jsxs("div",{className:"lp-header-left",children:[m.jsxs("div",{className:"lp-chip",children:[m.jsx("span",{className:"lp-chip-dot"}),"SMART LINK"]}),m.jsx("div",{className:"lp-title-row"}),m.jsx("p",{children:"Pega tu enlace, añade nuestra tecnología y gana dinero con cada clic."})]})}),m.jsxs("form",{className:"lp-flow",onSubmit:X,children:[m.jsxs("div",{className:"lp-card-v2 lp-card-main lp-card-animate lp-card-url",children:[m.jsx("label",{className:"lp-label-v2",children:"URL de destino"}),m.jsx("p",{className:"lp-label-sub",children:"Cualquier enlace público: vídeos, tiendas, redes, lo que quieras."}),m.jsxs("div",{className:"lp-input-icon-wrapper",children:[m.jsx("span",{className:"lp-input-icon",children:m.jsx(Ha,{size:18})}),m.jsx("input",{type:"text",placeholder:"https://tuvideo.com/...",value:e,onChange:z=>r(z.target.value),className:"lp-input-v2 lp-input-with-icon",required:!0})]})]}),m.jsxs("div",{className:"lp-card-v2 lp-card-main lp-card-animate lp-card-alias",children:[m.jsxs("div",{className:"lp-section-title",children:[m.jsx("span",{className:"lp-section-icon",children:m.jsx(Xn,{size:16})}),m.jsxs("div",{children:[m.jsx("div",{className:"lp-section-label",children:"Nombre del enlace (alias)"}),m.jsx("div",{className:"lp-section-caption",children:"Para que se vea bonito y fácil de recordar."})]})]}),m.jsxs("div",{className:"lp-field-v2",children:[m.jsx("label",{className:"lp-label-v2",children:"Alias (opcional)"}),m.jsxs("div",{className:"lp-alias-row-v2",children:[m.jsx("span",{className:"lp-alias-prefix-v2",children:"linkpay.gg/"}),m.jsx("input",{type:"text",value:n,onChange:z=>i(z.target.value),placeholder:"mi-enlace",className:"lp-input-v2 lp-alias-input-v2"})]}),m.jsx("p",{className:"lp-help-v2",children:"Si lo dejas vacío, creamos uno automático."})]})]}),m.jsxs("div",{ref:T,className:`lp-engine-card ${C?"open":"closed"}`,children:[m.jsxs("button",{type:"button",className:"lp-engine-header-click",onClick:be,children:[m.jsxs("div",{className:"lp-engine-top",children:[m.jsxs("div",{className:"lp-engine-chip",children:["MODO ",a==="standard"?"ESTÁNDAR":"TURBO"]}),m.jsx("div",{className:"lp-engine-title",children:"Motor de ingresos"}),m.jsx("p",{className:"lp-engine-sub",children:"Ajusta cómo mostramos anuncios y protege tu enlace (opcional)."})]}),m.jsx(ao,{size:18,className:`lp-engine-chevron ${C?"open":""}`})]}),m.jsx(Zn,{initial:!1,children:C&&m.jsxs(Yr.div,{className:"lp-engine-body",initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.18},children:[m.jsxs("div",{className:"lp-mode-row-v2",children:[m.jsxs("button",{type:"button",className:`lp-mode-pill-v2 ${a==="standard"?"active":""}`,onClick:()=>o("standard"),children:[m.jsx("span",{className:"lp-mode-pill-icon standard",children:m.jsx(Xn,{size:16})}),m.jsxs("div",{className:"lp-mode-pill-texts",children:[m.jsx("span",{className:"main",children:"Estándar"}),m.jsx("span",{className:"sub",children:"      Equilibrio entre experiencia y dinero."})]})]}),m.jsxs("button",{type:"button",className:`lp-mode-pill-v2 ${a==="turbo"?"active":""}`,onClick:()=>o("turbo"),children:[m.jsx("span",{className:"lp-mode-pill-icon turbo",children:m.jsx(Ga,{size:16})}),m.jsxs("div",{className:"lp-mode-pill-texts",children:[m.jsx("span",{className:"main",children:"Turbo"}),m.jsx("span",{className:"sub",children:"      Máximo dinero, más impacto publicitario."})]})]})]}),m.jsx("div",{className:"lp-advanced-toggle-v2",children:m.jsxs("button",{type:"button",onClick:()=>O(!0),children:[m.jsx(qa,{size:15}),"Opciones avanzadas (contraseña, fecha, clicks…)"]})}),m.jsxs(el,{open:v,onDismiss:()=>O(!1),snapPoints:({maxHeight:z})=>[Math.min(z*.6,480),Math.min(z*.9,640)],children:[m.jsxs("div",{className:"lp-advanced-sheet-header",children:[m.jsx("h3",{children:"Opciones avanzadas"}),m.jsx("p",{children:"Solo si quieres controlar quién entra y hasta cuándo."})]}),m.jsxs("div",{className:"lp-advanced-grid-v2 lp-advanced-grid-sheet",children:[m.jsxs("div",{className:"lp-field-v2",children:[m.jsx("label",{className:"lp-label-v2",children:"Contraseña"}),m.jsxs("div",{className:"lp-input-icon-wrapper",children:[m.jsx("span",{className:"lp-input-icon",children:m.jsx(Ua,{size:15})}),m.jsx("input",{type:"text",value:s,onChange:z=>c(z.target.value),placeholder:"Opcional",className:"lp-input-v2 lp-input-with-icon"})]})]}),m.jsxs("div",{className:"lp-field-v2",children:[m.jsx("label",{className:"lp-label-v2",children:"Fecha de expiración"}),m.jsxs("div",{className:"lp-input-icon-wrapper",children:[m.jsx("span",{className:"lp-input-icon",children:m.jsx(oo,{size:15})}),m.jsx("input",{type:"datetime-local",value:u,onChange:z=>l(z.target.value),className:"lp-input-v2 lp-input-with-icon"})]})]}),m.jsxs("div",{className:"lp-field-v2",children:[m.jsx("label",{className:"lp-label-v2",children:"Límite de clics"}),m.jsxs("div",{className:"lp-input-icon-wrapper",children:[m.jsx("span",{className:"lp-input-icon",children:m.jsx(Wa,{size:15})}),m.jsx("input",{type:"number",value:f,onChange:z=>d(z.target.value),placeholder:"Ej: 100",className:"lp-input-v2 lp-input-with-icon"})]})]}),m.jsxs("div",{className:"lp-field-v2 lp-private-row-v2",children:[m.jsx("div",{className:`lp-switch-v2 ${h?"on":""}`,onClick:()=>b(!h),children:m.jsx("div",{className:"lp-switch-thumb-v2"})}),m.jsxs("div",{className:"lp-private-label-v2",children:[m.jsx(so,{size:15}),m.jsx("span",{children:"Enlace privado (no aparece en tu lista pública)"})]})]})]})]}),m.jsxs("div",{className:"lp-engine-footer",children:[m.jsxs("div",{className:"lp-engine-stat",children:[m.jsx("span",{className:"label",children:"Alias"}),m.jsx("span",{className:"value",children:n?`linkpay.gg/${n}`:"Se generará automáticamente"})]}),m.jsxs("div",{className:"lp-engine-stat",children:[m.jsx("span",{className:"label",children:"Seguridad"}),m.jsx("span",{className:"value",children:s||u||f||h?"Reglas avanzadas activas":"Modo simple · sin restricciones"})]})]})]})})]}),m.jsxs("div",{className:"lp-footer-row",children:[S&&m.jsxs("div",{className:"lp-error-v2",children:[m.jsx(Ya,{size:18}),m.jsx("span",{children:S})]}),m.jsx("button",{type:"submit",disabled:y,className:"lp-btn-primary lp-btn-primary-gradient lp-btn-submit-v2",children:y?m.jsx(Ka,{className:"spin",size:18}):m.jsxs(m.Fragment,{children:["Crear enlace ",m.jsx(Xa,{size:18})]})})]})]})]})]},"form");return m.jsx(Zn,{mode:"wait",initial:!1,children:w?oe():Q()})}const Bi=`
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  /* ===== GLOBAL: fondo full-screen y sin bordes blancos ===== */
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    background: #020617;
    touch-action: pan-y; /* solo scroll vertical */
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    overscroll-behavior-y: none;
  }

  /* Todos los inputs a 16px para que iOS NO haga zoom */
  .lp-create-shell input,
  .lp-create-shell select,
  .lp-create-shell textarea {
    font-size: 16px;
  }

  /* Fondo general: "galaxia" azul animada */
  .lp-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #0f172a 0, #020617 55%, #000 100%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }

  .lp-bg::before,
  .lp-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.15), transparent 60%),
      radial-gradient(circle at 80% 100%, rgba(129, 140, 248, 0.16), transparent 55%);
    opacity: 0.9;
    filter: blur(32px);
    pointer-events: none;
    animation: lp-nebula 20s ease-in-out infinite alternate;
  }

  .lp-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34, 197, 94, 0.18), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.16), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-orbit 30s linear infinite;
  }

  @keyframes lp-nebula {
    0% { transform: translate3d(-10px, -10px, 0) scale(1); opacity: 0.85; }
    100% { transform: translate3d(20px, 10px, 0) scale(1.1); opacity: 1; }
  }

  @keyframes lp-orbit {
    0% { transform: rotate(0deg) scale(1.05); }
    100% { transform: rotate(360deg) scale(1.05); }
  }

  .lp-create-shell {
    position: fixed;
    inset: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 100dvh;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    overflow-y: auto;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    -webkit-overflow-scrolling: touch;
  }

  .lp-create-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 32px 16px 72px 16px; /* más padding abajo para ver el botón */
    margin: 0 auto;
  }

  /* HEADER */
  .lp-header-v2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }

  .lp-header-left {
    text-align: center;
    max-width: 520px;
    margin: 0 auto;
  }

  .lp-header-left h1 {
    margin: 0 0 4px 0;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #f9fafb;
    font-size: 28px;
  }

  .lp-header-left p {
    margin: 0 auto;
    color: #9ca3af;
    font-size: 13px;
    max-width: 520px;
  }

  .lp-title-row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lp-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(30, 64, 175, 0.75);
    color: #e5e7eb;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    border: 1px solid rgba(148, 163, 184, 0.65);
    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8),
      0 0 18px rgba(59, 130, 246, 0.45);
    animation: lp-chip-glow 4s ease-in-out infinite;
  }

  @keyframes lp-chip-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8), 0 0 10px rgba(59, 130, 246, 0.35); }
    50% { box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.9), 0 0 22px rgba(96, 165, 250, 0.8); }
  }

  .lp-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35);
  }

  /* FLOW base (móvil / tablet) */
  .lp-flow {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* CARDS */
  .lp-card-v2 {
    background: rgba(15, 23, 42, 0.94);
    border-radius: 20px;
    border: 1px solid rgba(30, 64, 175, 0.55);
    box-shadow: 0 14px 40px rgba(15, 23, 42, 0.85);
    padding: 16px 16px 18px 16px;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    transition:
      transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.25s ease,
      border-color 0.25s ease,
      background 0.25s ease;
  }

  .lp-card-main {
    background: radial-gradient(circle at top, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  }

  .lp-card-v2:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 55px rgba(15, 23, 42, 0.95);
    border-color: rgba(129, 140, 248, 0.8);
  }

  .lp-card-animate {
    animation: lp-card-enter 0.45s ease-out;
  }

  @keyframes lp-card-enter {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .lp-label-v2 {
    font-size: 12px;
    font-weight: 700;
    color: #e5e7eb;
    margin-bottom: 4px;
  }

  .lp-label-sub {
    font-size: 11px;
    color: #9ca3af;
    margin: 0 0 10px 0;
  }

  .lp-input-icon-wrapper {
    position: relative;
  }

  .lp-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-input-v2 {
    width: 100%;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    padding: 11px 12px;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    color: #f9fafb;
    background: rgba(15, 23, 42, 0.92);
    transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, transform 0.18s ease;
  }

  .lp-input-v2::placeholder {
    color: #6b7280;
  }

  .lp-input-with-icon {
    padding-left: 42px;
  }

  .lp-input-v2:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4), 0 0 32px rgba(79, 70, 229, 0.5);
    background: rgba(15, 23, 42, 0.98);
    transform: translateY(-1px);
  }

  .lp-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .lp-section-icon {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: radial-gradient(circle at top, #facc15, #f97316);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0f172a;
    box-shadow: 0 12px 30px rgba(249, 115, 22, 0.55);
  }

  .lp-section-label {
    font-size: 13px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-section-caption {
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-field-v2 {
    margin-top: 10px;
  }

  /* Alias */
  .lp-alias-row-v2 {
    display: flex;
    align-items: stretch;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: rgba(15, 23, 42, 0.9);
  }

  .lp-alias-prefix-v2 {
    padding: 10px 10px;
    font-size: 11px;
    background: rgba(15, 23, 42, 0.96);
    color: #9ca3af;
    border-right: 1px solid rgba(51, 65, 85, 0.95);
    font-family: monospace;
    min-width: 104px;
    display: flex;
    align-items: center;
  }

  .lp-alias-input-v2 {
    border: none;
    background: transparent;
    padding: 9px 10px;
    font-size: 16px;
    color: #f9fafb;
    outline: none;
    flex: 1;
  }

  .lp-help-v2 {
    margin: 4px 0 0 0;
    font-size: 11px;
    color: #9ca3af;
  }

  /* ENGINE PANEL */
  .lp-engine-card {
    background: radial-gradient(circle at top left, #111827, #020617);
    border-radius: 24px;
    border: 1px solid rgba(148, 163, 184, 0.65);
    box-shadow: 0 22px 65px rgba(0, 0, 0, 0.9);
    padding: 10px 14px 12px 14px;
    color: #e5e7eb;
    width: 100%;
    position: relative;
    overflow: hidden;
    animation: lp-engine-float 8s ease-in-out infinite;
  }

  @keyframes lp-engine-float {
    0%, 100% { transform: translateY(-2px); }
    50% { transform: translateY(2px); }
  }

  .lp-engine-card::before {
    content: "";
    position: absolute;
    inset: -80px;
    background:
      radial-gradient(circle at top right, rgba(79, 70, 229, 0.35), transparent 55%);
    opacity: 0.9;
    pointer-events: none;
  }

  .lp-engine-card.open {
    padding-bottom: 14px;
  }

  .lp-engine-card.closed {
    padding-bottom: 8px;
  }

  .lp-engine-header-click {
    position: relative;
    z-index: 1;
    border: none;
    background: transparent;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 4px 0;
    cursor: pointer;
  }

  .lp-engine-top {
    text-align: left;
  }

  .lp-engine-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(22, 163, 74, 0.16);
    border: 1px solid rgba(34, 197, 94, 0.7);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #bbf7d0;
    margin-bottom: 8px;
  }

  .lp-engine-title {
    font-size: 16px;
    font-weight: 800;
    color: #f9fafb;
    margin-bottom: 2px;
  }

  .lp-engine-sub {
    font-size: 12px;
    color: #9ca3af;
    margin: 0 0 4px 0;
  }

  .lp-engine-chevron {
    flex-shrink: 0;
    color: #9ca3af;
    transition: transform 0.18s ease;
  }

  .lp-engine-chevron.open {
    transform: rotate(180deg);
  }

  .lp-engine-body {
    position: relative;
    z-index: 1;
    margin-top: 8px;
  }

  /* Mode pills v2 */
  .lp-mode-row-v2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .lp-mode-pill-v2 {
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.55);
    background: rgba(15, 23, 42, 0.95);
    padding: 8px 10px;
    display: flex;
    gap: 10px;
    cursor: pointer;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .lp-mode-pill-v2:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.9);
  }

  .lp-mode-pill-v2:active {
    transform: scale(0.97);
  }

  .lp-mode-pill-v2.active {
    border-color: #6366f1;
    background: radial-gradient(circle at top left, rgba(79, 70, 229, 0.45), #020617);
    box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.6),
      0 18px 40px rgba(79, 70, 229, 0.5);
  }

  .lp-mode-pill-icon {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .lp-mode-pill-icon.standard {
    background: rgba(59, 130, 246, 0.22);
    color: #bfdbfe;
  }

  .lp-mode-pill-icon.turbo {
    background: rgba(249, 115, 22, 0.22);
    color: #fed7aa;
  }

  .lp-mode-pill-texts .main {
    font-size: 13px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-mode-pill-texts .sub {
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-advanced-toggle-v2 {
    margin-top: 10px;
    position: relative;
    z-index: 1;
  }

  .lp-advanced-toggle-v2 button {
    border: none;
    background: transparent;
    color: #a5b4fc;
    font-weight: 600;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .lp-advanced-grid-v2 {
    margin-top: 10px;
    display: grid;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .lp-private-row-v2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }

  .lp-switch-v2 {
    width: 42px;
    height: 22px;
    background: #e5e7eb;
    border-radius: 999px;
    position: relative;
    padding: 2px;
    cursor: pointer;
    transition: background 0.18s;
  }

  .lp-switch-v2.on {
    background: #22c55e;
  }

  .lp-switch-thumb-v2 {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 999px;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.25);
    transition: left 0.18s;
  }

  .lp-switch-v2.on .lp-switch-thumb-v2 {
    left: 22px;
  }

  .lp-private-label-v2 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #e5e7eb;
    font-weight: 500;
  }

  /* HUD resumen */
  .lp-engine-footer {
    position: relative;
    z-index: 1;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(148, 163, 184, 0.45);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .lp-engine-stat {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-engine-stat .label {
    text-transform: uppercase;
    letter-spacing: 0.09em;
    font-weight: 700;
    color: #6b7280;
  }

  .lp-engine-stat .value {
    font-weight: 600;
    color: #e5e7eb;
    text-align: right;
  }

  /* Footer CTA (botón final) */
  .lp-footer-row {
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lp-error-v2 {
    background: rgba(248, 113, 113, 0.12);
    border-radius: 999px;
    padding: 8px 12px;
    border: 1px solid rgba(248, 113, 113, 0.75);
    font-size: 12px;
    color: #fecaca;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .lp-btn-primary {
    border: none;
    color: white;
    border-radius: 999px;
    padding: 13px 18px;
    font-size: 15px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  }

  .lp-btn-primary-gradient {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #22c55e 100%);
    box-shadow:
      0 20px 60px rgba(15, 23, 42, 0.9),
      0 0 0 1px rgba(248, 250, 252, 0.06);
    animation: lp-btn-glow 6s ease-in-out infinite;
  }

  @keyframes lp-btn-glow {
    0%, 100% { filter: saturate(1); box-shadow: 0 20px 60px rgba(15, 23, 42, 0.9), 0 0 0 1px rgba(248, 250, 252, 0.06); }
    50% { filter: saturate(1.15); box-shadow: 0 28px 80px rgba(15, 23, 42, 1), 0 0 0 1px rgba(191, 219, 254, 0.4); }
  }

  .lp-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px) scale(1.01);
    box-shadow:
      0 24px 72px rgba(15, 23, 42, 0.95),
      0 0 0 1px rgba(248, 250, 252, 0.08);
    filter: saturate(1.1);
  }

  .lp-btn-primary:active:not(:disabled) {
    transform: scale(0.97);
  }

  .lp-btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }

  .lp-btn-submit-v2 {
    width: 100%;
  }

  /* ÉXITO V2 */
  .lp-success-v2 {
    padding-top: 40px;
  }

  .lp-success-card-v2 {
    max-width: 520px;
    margin: 0 auto;
    background: radial-gradient(circle at top, #111827, #020617);
    border-radius: 26px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    padding: 26px 20px 22px 20px;
    text-align: center;
    box-shadow: 0 28px 72px rgba(0, 0, 0, 0.96);
    color: #e5e7eb;
    position: relative;
    overflow: hidden;
  }

  .lp-success-card-v2::before {
    content: "";
    position: absolute;
    inset: -80px;
    background:
      radial-gradient(circle at top right, rgba(34, 197, 94, 0.4), transparent 55%);
    opacity: 0.9;
    pointer-events: none;
  }

  .lp-success-badge {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.14);
    border: 1px solid rgba(74, 222, 128, 0.8);
    color: #bbf7d0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .lp-success-icon-v2 {
    position: relative;
    z-index: 1;
    width: 68px;
    height: 68px;
    border-radius: 999px;
    margin: 0 auto 14px auto;
    background: radial-gradient(circle at top, #22c55e, #16a34a);
    color: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 18px 40px rgba(22, 163, 74, 0.8);
  }

  .lp-success-card-v2 h2 {
    position: relative;
    z-index: 1;
    margin: 0 0 4px 0;
    font-size: 22px;
    font-weight: 900;
    color: #f9fafb;
  }

  .lp-success-sub {
    position: relative;
    z-index: 1;
    margin: 0 0 18px 0;
    font-size: 13px;
    color: #cbd5f5;
  }

  .lp-success-mode {
    color: #a5b4fc;
  }

  .lp-success-url {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: stretch;
    gap: 8px;
    margin-bottom: 18px;
  }

  .lp-success-url input {
    flex: 1;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.75);
    padding: 10px 12px;
    font-size: 16px;
    font-weight: 600;
    color: #e5e7eb;
    font-family: monospace;
    outline: none;
    background: rgba(15, 23, 42, 0.9);
  }

  .lp-success-url button {
    border-radius: 14px;
    border: none;
    padding: 8px 10px;
    background: #0f172a;
    color: white;
    cursor: pointer;
  }

  .lp-success-actions {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .lp-btn-ghost {
    border: none;
    background: transparent;
    color: #cbd5f5;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }

  .lp-success-foot {
    position: relative;
    z-index: 1;
    font-size: 11px;
    color: #9ca3af;
    margin: 0;
  }

  .lp-confetti-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 40;
  }

  /* BottomSheet */
  .rsbs-root {
    --rsbs-bg: rgba(15, 23, 42, 0.98);
    --rsbs-backdrop-bg: rgba(15, 23, 42, 0.7);
    --rsbs-handle-bg: #4b5563;
    color: #e5e7eb;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

  .lp-advanced-sheet-header {
    padding: 4px 12px 10px;
  }

  .lp-advanced-sheet-header h3 {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-advanced-sheet-header p {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-advanced-grid-sheet {
    padding: 0 12px 12px;
  }

  /* ===== LAYOUT ESCRITORIO ===== */
  @media (min-width: 1024px) {
    /* *** AJUSTE: que el contenido se alinee con el área derecha (no centrado bajo el sidebar) */
    .lp-create-shell {
      justify-content: flex-start;
    }

    /* desplazamos todo a la derecha, dejando hueco para el sidebar (~260px) */
    .lp-create-inner {
      margin: 0 40px 0 260px;
    }

    .lp-flow {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      grid-auto-rows: auto;
      column-gap: 18px;
      row-gap: 14px;
      grid-template-areas:
        "url engine"
        "alias engine"
        "footer footer";
      align-items: flex-start;
    }

    .lp-card-url {
      grid-area: url;
    }

    .lp-card-alias {
      grid-area: alias;
    }

    .lp-engine-card {
      grid-area: engine;
      align-self: stretch;
    }

    .lp-footer-row {
      grid-area: footer;
      max-width: 520px;
      justify-self: center;
    }
  }

  /* RESPONSIVE MÓVIL / TABLET */
  @media (max-width: 800px) {
    .lp-create-inner {
      max-width: 480px;
      margin: 0 auto;
      padding: 20px 16px 140px 16px;
    }

    .lp-header-v2 {
      flex-direction: column;
      gap: 10px;
    }

    .lp-header-left p {
      font-size: 12px;
      max-width: none;
    }

    .lp-card-v2 {
      padding: 12px 12px 14px 12px;
      border-radius: 18px;
    }

    .lp-label-sub,
    .lp-help-v2 {
      font-size: 10px;
    }

    .lp-engine-card {
      border-radius: 22px;
      animation-duration: 10s;
    }

    .lp-card-v2:hover {
      transform: none;
      box-shadow: 0 14px 40px rgba(15, 23, 42, 0.75);
    }
  }
`;export{ml as CreateLinkPage};
