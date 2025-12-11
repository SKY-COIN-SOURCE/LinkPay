import{d as v,s as x,L as B,r as l,j as e,C as $,q as T,b as H}from"./index-CFKtuD05.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]],A=v("arrow-down-left",R);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]],F=v("banknote",D);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],O=v("history",I);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],q=v("send",U);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M17 14h.01",key:"7oqj8z"}],["path",{d:"M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",key:"u1rqew"}]],Y=v("wallet-minimal",V);async function z(){const{data:i,error:a}=await x.auth.getUser();if(a||!i.user)throw new Error("Debes iniciar sesión.");return i.user}async function S(i){const t=(await B.getAll()||[]).reduce((d,f)=>d+(Number(f.earnings)||0),0),{data:n}=await x.from("bio_profiles").select("earnings").eq("user_id",i),w=(n==null?void 0:n.reduce((d,f)=>d+(Number(f.earnings)||0),0))||0,{data:p}=await x.from("profiles").select("referral_earnings").eq("id",i).single(),j=Number((p==null?void 0:p.referral_earnings)||0),o=t+w+j;try{const{data:d,error:f}=await x.from("transactions").select("amount, is_negative, type, status").eq("user_id",i).in("status",["pending","completed"]);if(f||!d)return console.warn("[PayoutService.getBalance] No se pudo leer transactions:",f),o;const b=d.reduce((m,u)=>{const c=Number(u.amount)||0,_=u.is_negative??(u.type==="withdrawal"||u.type==="transfer_out");return m+(_?-c:c)},0);return o+b}catch(d){return console.warn("[PayoutService.getBalance] Error leyendo movimientos:",d),o}}const E={async getBalance(){const i=await z(),a=await S(i.id);return a<0?0:a},async getHistory(){const i=await z();try{const{data:a,error:s}=await x.from("transactions").select("id, type, amount, status, is_negative, created_at").eq("user_id",i.id).order("created_at",{ascending:!1}).limit(40);return s||!a?(console.warn("[PayoutService.getHistory] error",s),[]):a.map(t=>{const n=t.type==="withdrawal"?"withdrawal":"transfer";return{id:t.id,type:n,amount:Number(t.amount)||0,status:t.status||"completed",is_negative:t.is_negative??(t.type==="withdrawal"||t.type==="transfer_out"),date:t.created_at?new Date(t.created_at).toLocaleString():""}})}catch(a){return console.warn("[PayoutService.getHistory] excepción",a),[]}},async requestPayout(i,a,s){if(!i||i<=0)throw new Error("Cantidad inválida.");if(!a||!s)throw new Error("Método o cuenta incompletos.");const t=await z(),n=await S(t.id);if(i>n)throw new Error("Saldo insuficiente.");if(i<(a==="PayPal"?5:a==="Bank"?10:5))throw a==="PayPal"?new Error("El retiro mínimo por PayPal es de €5.00"):a==="Bank"?new Error("El retiro mínimo por transferencia bancaria es de €10.00"):new Error("Cantidad inferior al mínimo disponible.");const{error:p}=await x.from("transactions").insert({user_id:t.id,type:"withdrawal",amount:i,is_negative:!0,status:"pending",meta:{method:a,account:s}});if(p)throw console.error("[PayoutService.requestPayout] error",p),new Error("No se pudo registrar el retiro.")},async sendMoney(i,a){if(!a||a<=0)throw new Error("Cantidad inválida.");if(!i)throw new Error("Email destino requerido.");const s=await z(),t=await S(s.id);if(a>t)throw new Error("Saldo insuficiente.");const{error:n}=await x.rpc("transfer_between_users",{target_email:i,amount_value:a});if(n)throw console.error("[PayoutService.sendMoney] error",n),new Error("No se pudo completar la transferencia.")}},Z={isValidEmail:i=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i),isValidIBAN:i=>{const a=i.replace(/\s/g,"").toUpperCase();return a.length<15||a.length>34||!/^[A-Z]{2}/.test(a)?!1:/^[A-Z0-9]+$/.test(a)},isValidCrypto:i=>{const a=/^0x[a-fA-F0-9]{40}$/.test(i),s=/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(i);return a||s}};function J(){const[i,a]=l.useState(0),[s,t]=l.useState([]),[n,w]=l.useState("withdraw"),[p,j]=l.useState(""),[o,d]=l.useState("PayPal"),[f,b]=l.useState(""),[m,u]=l.useState(""),[c,_]=l.useState({paypal:"",bank:""}),[P,C]=l.useState(!1),[k,h]=l.useState({type:null,msg:""});l.useEffect(()=>{M()},[]),l.useEffect(()=>{o==="PayPal"&&c.paypal&&b(c.paypal),o==="Bank"&&c.bank&&b(c.bank)},[o,c]);const M=async()=>{try{const r=await E.getBalance();a(r);const y=await E.getHistory();t(y);const{data:{user:N}}=await x.auth.getUser();if(N){const{data:g}=await x.from("profiles").select("paypal_email, bank_details").eq("id",N.id).single();g&&(_({paypal:g.paypal_email||"",bank:g.bank_details||""}),g.paypal_email&&b(g.paypal_email))}}catch(r){console.error(r)}},L=async()=>{h({type:null,msg:""});const r=parseFloat(p);if(!p||r<=0)return h({type:"error",msg:"Cantidad inválida."});if(r>i)return h({type:"error",msg:"Saldo insuficiente."});C(!0);try{if(n==="withdraw")await E.requestPayout(r,o,f),h({type:"success",msg:"Retiro solicitado correctamente."});else{if(!Z.isValidEmail(m))throw new Error("Email inválido.");await E.sendMoney(m,r),h({type:"success",msg:`Has enviado €${p} a ${m}`})}j(""),M()}catch(y){h({type:"error",msg:y.message||"Error al procesar."})}finally{C(!1)}};return e.jsxs("div",{className:"lp-fin-shell lp-fin-bg",children:[e.jsx("style",{children:W}),e.jsxs("div",{className:"lp-fin-inner animate-enter",children:[e.jsxs("header",{className:"lp-fin-header",children:[e.jsxs("div",{className:"lp-fin-chip",children:[e.jsx("span",{className:"lp-fin-chip-dot"}),"CREATOR FINANCE"]}),e.jsx("p",{children:"Controla en tiempo real todo el dinero que entra y sale de tu universo LinkPay. Retiros, envíos y flujo de caja en un mismo lugar."})]}),e.jsxs("section",{className:"lp-fin-grid",children:[e.jsxs("div",{className:"lp-fin-left",children:[e.jsxs("div",{className:"lp-fin-card lp-fin-balance",children:[e.jsxs("div",{className:"lp-fin-badge-row",children:[e.jsxs("span",{className:"lp-fin-badge",children:[e.jsx(Y,{size:14}),"Billetera global"]}),e.jsxs("span",{className:"lp-fin-badge-soft",children:[e.jsx(F,{size:12}),"Listo para retirar"]})]}),e.jsxs("div",{className:"lp-fin-balance-main",children:[e.jsx("span",{className:"lp-fin-balance-label",children:"Saldo disponible"}),e.jsxs("div",{className:"lp-fin-balance-amount",children:[e.jsx("span",{className:"lp-fin-currency",children:"€"}),e.jsx("span",{className:"lp-fin-balance-number",children:i.toFixed(2)})]}),e.jsx("p",{className:"lp-fin-balance-sub",children:"Todo lo que has generado con tus Smart Links y Bio Page, listo para moverse donde quieras."})]}),e.jsxs("div",{className:"lp-fin-tabs",children:[e.jsxs("button",{type:"button",onClick:()=>w("withdraw"),className:`lp-fin-tab ${n==="withdraw"?"is-active":""}`,children:[e.jsx(A,{size:16}),"Retirar"]}),e.jsxs("button",{type:"button",onClick:()=>w("send"),className:`lp-fin-tab ${n==="send"?"is-active":""}`,children:[e.jsx(q,{size:16}),"Enviar"]})]})]}),e.jsxs("div",{className:"lp-fin-card lp-fin-form",children:[e.jsxs("div",{className:"lp-fin-form-header",children:[e.jsx("h3",{children:n==="withdraw"?"Solicitar retiro":"Enviar dinero"}),e.jsx("span",{className:"lp-fin-form-tag",children:n==="withdraw"?"Salida hacia tu cuenta":"Transferencia interna"})]}),e.jsxs("div",{className:"lp-fin-field",children:[e.jsx("label",{children:"CANTIDAD (€)"}),e.jsxs("div",{className:"lp-fin-input-wrapper",children:[e.jsx("span",{className:"lp-fin-input-prefix",children:"€"}),e.jsx("input",{type:"number",value:p,onChange:r=>j(r.target.value),placeholder:"0.00",className:"lp-fin-input lp-fin-input-amount"})]}),n==="withdraw"&&e.jsxs("p",{className:"lp-fin-hint",children:["Mínimo PayPal: ",e.jsx("strong",{children:"€5"})," · Transferencia bancaria: ",e.jsx("strong",{children:"€10"})]})]}),n==="withdraw"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"lp-fin-field",children:[e.jsx("label",{children:"MÉTODO"}),e.jsx("div",{className:"lp-fin-method-row",children:["PayPal","Bank"].map(r=>e.jsx("button",{type:"button",onClick:()=>d(r),className:`lp-fin-method ${o===r?"is-active":""}`,children:r==="PayPal"?"PayPal":"Bank Transfer"},r))})]}),e.jsxs("div",{className:"lp-fin-field",children:[e.jsx("label",{children:"CUENTA DESTINO"}),e.jsx("input",{value:f,onChange:r=>b(r.target.value),placeholder:o==="PayPal"?"tu@email.com":"ES91…",className:"lp-fin-input"}),(o==="PayPal"&&c.paypal||o==="Bank"&&c.bank)&&e.jsx("p",{className:"lp-fin-hint lp-fin-hint-success",children:"✓ Autocompletado desde Ajustes"})]})]}):e.jsxs("div",{className:"lp-fin-field",children:[e.jsx("label",{children:"EMAIL DEL USUARIO"}),e.jsx("input",{value:m,onChange:r=>u(r.target.value),placeholder:"amigo@linkpay.io",className:"lp-fin-input"}),e.jsx("p",{className:"lp-fin-hint",children:"Envía dinero a otro creador que use LinkPay. La operación queda registrada en tu historial."})]}),k.type&&e.jsxs("div",{className:`lp-fin-status ${k.type==="error"?"lp-fin-status-error":"lp-fin-status-ok"}`,children:[k.type==="error"?e.jsx($,{size:18}):e.jsx(T,{size:18}),e.jsx("span",{children:k.msg})]}),e.jsx("button",{type:"button",onClick:L,disabled:P,className:"lp-fin-main-btn",children:P?e.jsxs("span",{className:"lp-fin-btn-loading",children:[e.jsx(H,{className:"spin",size:18}),"Procesando…"]}):n==="withdraw"?"Confirmar retiro":"Enviar dinero"})]})]}),e.jsxs("div",{className:"lp-fin-card lp-fin-history",children:[e.jsxs("div",{className:"lp-fin-history-header",children:[e.jsx("div",{className:"lp-fin-history-icon",children:e.jsx(O,{size:18})}),e.jsxs("div",{children:[e.jsx("h3",{children:"Actividad financiera"}),e.jsx("p",{children:"Todos los retiros y envíos asociados a tu cuenta."})]})]}),s.length===0?e.jsxs("div",{className:"lp-fin-history-empty",children:[e.jsx("p",{className:"lp-fin-history-empty-title",children:"No hay movimientos todavía."}),e.jsx("p",{className:"lp-fin-history-empty-sub",children:"Cuando realices tu primer retiro o envío, aparecerá aquí una línea de tiempo completa."})]}):e.jsx("div",{className:"lp-fin-history-list",children:s.map(r=>{const y=r.is_negative,N=r.type==="withdrawal"?"Retiro":"Transferencia",g=r.status==="pending"?"lp-fin-status-pill-pending":"lp-fin-status-pill-ok";return e.jsxs("div",{className:"lp-fin-history-item",children:[e.jsxs("div",{className:"lp-fin-history-left",children:[e.jsx("div",{className:`lp-fin-history-avatar ${r.type==="transfer"?"is-transfer":"is-withdraw"}`,children:r.type==="transfer"?e.jsx(q,{size:16}):e.jsx(A,{size:16})}),e.jsxs("div",{className:"lp-fin-history-text",children:[e.jsx("span",{className:"lp-fin-history-title",children:N}),e.jsx("span",{className:"lp-fin-history-date",children:r.date})]})]}),e.jsxs("div",{className:"lp-fin-history-right",children:[e.jsxs("span",{className:`lp-fin-history-amount ${y?"is-out":"is-in"}`,children:[y?"-":"+","€",Number(r.amount).toFixed(2)]}),e.jsx("span",{className:`lp-fin-status-pill ${g}`,children:r.status})]})]},r.id)})})]})]})]})]})}const W=`
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  .lp-fin-bg {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 0% 0%, #1e3a8a 0, transparent 55%),
      radial-gradient(circle at 100% 100%, #020617 0, #000 65%);
    background-color: #020617;
    position: relative;
    overflow: hidden;
  }
  .lp-fin-bg::before,
  .lp-fin-bg::after {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(circle at 12% 0%, rgba(56,189,248,0.14), transparent 60%),
      radial-gradient(circle at 88% 100%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.9;
    filter: blur(20px); /* un poco menos blur para que vaya más fluido */
    pointer-events: none;
  }
  .lp-fin-bg::after {
    background:
      radial-gradient(circle at 0% 100%, rgba(34,197,94,0.2), transparent 55%),
      radial-gradient(circle at 100% 0%, rgba(79,70,229,0.18), transparent 55%);
    mix-blend-mode: screen;
    animation: lp-fin-orbit 30s linear infinite;
  }
  @keyframes lp-fin-orbit {
    0% { transform: rotate(0deg) scale(1.02); }
    100% { transform: rotate(360deg) scale(1.02); }
  }

  .lp-fin-shell {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: 1;
  }

  /* respetar sidebar en escritorio */
  @media (min-width: 769px) {
    .lp-fin-shell {
      left: 260px;
    }
  }

  .lp-fin-inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1080px;
    padding: 24px 16px 110px 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    color: #e5e7eb;
  }

  .lp-fin-header {
    text-align: center;
    margin-bottom: 22px;
  }

  .lp-fin-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    background: radial-gradient(circle at 0% 0%, rgba(37,99,235,0.9), rgba(15,23,42,0.98));
    border: 1px solid rgba(191,219,254,0.8);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #e5e7eb;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 0 24px rgba(79,70,229,0.9);
    margin: 0 auto 8px;
    animation: lp-fin-chip-glow 4.2s ease-in-out infinite;
  }

  .lp-fin-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.3);
  }

  @keyframes lp-fin-chip-glow {
    0%,100% {
      box-shadow:
        0 0 0 1px rgba(15,23,42,1),
        0 0 18px rgba(79,70,229,0.6);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(129,140,248,1),
        0 0 28px rgba(129,140,248,1);
    }
  }

  .lp-fin-header p {
    margin: 4px 0 0 0;
    font-size: 13px;
    color: #9ca3af;
  }

  .lp-fin-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.1fr);
    gap: 18px;
  }

  @media (max-width: 900px) {
    .lp-fin-inner {
      max-width: 520px;
      padding: 20px 12px 120px 12px;
    }
    .lp-fin-grid {
      grid-template-columns: minmax(0,1fr);
    }
  }

  .lp-fin-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .lp-fin-card {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(148,163,184,0.7);
    background: radial-gradient(circle at top, rgba(15,23,42,0.99), rgba(15,23,42,0.97));
    box-shadow:
      0 16px 40px rgba(0,0,0,0.9),
      0 0 0 1px rgba(15,23,42,0.9);
    padding: 18px 18px 20px;
    overflow: hidden;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition:
      transform 0.22s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.22s ease,
      border-color 0.22s ease;
  }

  .lp-fin-card::before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(circle at 0% 0%, rgba(59,130,246,0.28), transparent 55%),
      radial-gradient(circle at 120% 120%, rgba(129,140,248,0.18), transparent 55%);
    opacity: 0.75;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .lp-fin-card:hover {
    transform: translateY(-2px) scale(1.003);
    box-shadow:
      0 22px 55px rgba(0,0,0,1),
      0 0 0 1px rgba(191,219,254,0.75);
    border-color: rgba(191,219,254,0.8);
  }

  .lp-fin-balance {
    padding-bottom: 18px;
  }

  .lp-fin-balance-main {
    position: relative;
    z-index: 1;
    margin-top: 12px;
  }

  .lp-fin-badge-row {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lp-fin-badge,
  .lp-fin-badge-soft {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }

  .lp-fin-badge {
    background: rgba(15,23,42,0.96);
    border: 1px solid rgba(191,219,254,0.8);
    color: #e5e7eb;
  }

  .lp-fin-badge svg {
    color: #bfdbfe;
  }

  .lp-fin-badge-soft {
    background: rgba(22,163,74,0.16);
    border: 1px solid rgba(34,197,94,0.8);
    color: #bbf7d0;
  }

  .lp-fin-balance-label {
    display: block;
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 4px;
    margin-top: 8px;
  }

  .lp-fin-balance-amount {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .lp-fin-currency {
    font-size: 20px;
    color: #a5b4fc;
    font-weight: 600;
  }

  .lp-fin-balance-number {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #f9fafb;
    text-shadow: 0 0 32px rgba(79,70,229,0.7);
  }

  .lp-fin-balance-sub {
    margin: 6px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-fin-tabs {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  .lp-fin-tab {
    flex: 1;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.98);
    color: #e5e7eb;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 10px;
    cursor: pointer;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 12px 24px rgba(15,23,42,0.9);
    transition: all 0.18s ease-out;
  }

  .lp-fin-tab svg { color: #9ca3af; }

  .lp-fin-tab.is-active {
    background: radial-gradient(circle at 0% 0%, rgba(79,70,229,0.9), rgba(15,23,42,1));
    border-color: rgba(191,219,254,0.95);
    box-shadow:
      0 0 0 1px rgba(129,140,248,1),
      0 0 30px rgba(79,70,229,1);
  }

  .lp-fin-tab.is-active svg { color: #e5e7eb; }

  /* FORM */
  .lp-fin-form {
    margin-top: 4px;
  }

  .lp-fin-form-header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
    margin-bottom: 10px;
  }

  .lp-fin-form-header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-fin-form-tag {
    padding: 3px 8px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.7);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #cbd5f5;
    background: rgba(15,23,42,0.96);
  }

  .lp-fin-field {
    position: relative;
    z-index: 1;
    margin-top: 8px;
    margin-bottom: 10px;
  }

  .lp-fin-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #9ca3af;
    margin-bottom: 5px;
    letter-spacing: 0.06em;
  }

  .lp-fin-input-wrapper {
    position: relative;
  }

  .lp-fin-input-prefix {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #9ca3af;
    pointer-events: none;
  }

  .lp-fin-input-amount {
    padding-left: 26px !important;
    font-size: 18px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  /* ⚠️ Inputs: mínimo 16px para evitar zoom en iOS */
  .lp-fin-input {
    width: 100%;
    padding: 11px 11px;
    border-radius: 12px;
    border: 1px solid rgba(148,163,184,0.8);
    background: rgba(15,23,42,0.98);
    color: #e5e7eb;
    font-size: 16px;
    outline: none;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 10px 26px rgba(15,23,42,0.9);
  }

  .lp-fin-input::placeholder {
    color: #6b7280;
  }

  .lp-fin-input:focus {
    border-color: rgba(129,140,248,0.95);
    box-shadow:
      0 0 0 1px rgba(129,140,248,0.95),
      0 0 26px rgba(79,70,229,0.9);
  }

  .lp-fin-method-row {
    display: flex;
    gap: 8px;
  }

  .lp-fin-method {
    flex: 1;
    border-radius: 10px;
    border: 1px solid rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.96);
    color: #e5e7eb;
    padding: 9px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease-out;
  }

  .lp-fin-method.is-active {
    background: radial-gradient(circle at 0% 0%, rgba(56,189,248,0.85), rgba(15,23,42,1));
    border-color: rgba(191,219,254,0.95);
    color: #0f172a;
    box-shadow:
      0 0 0 1px rgba(191,219,254,1),
      0 0 24px rgba(56,189,248,0.9);
  }

  .lp-fin-hint {
    margin: 4px 0 0 0;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-fin-hint-success {
    color: #4ade80;
  }

  .lp-fin-status {
    margin-top: 8px;
    margin-bottom: 10px;
    padding: 9px 10px;
    border-radius: 10px;
    font-size: 12px;
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: 600;
  }

  .lp-fin-status svg { flex-shrink: 0; }

  .lp-fin-status-error {
    background: rgba(248,113,113,0.12);
    border: 1px solid rgba(248,113,113,0.9);
    color: #fecaca;
  }

  .lp-fin-status-ok {
    background: rgba(22,163,74,0.12);
    border: 1px solid rgba(34,197,94,0.9);
    color: #bbf7d0;
  }

  .lp-fin-main-btn {
    width: 100%;
    margin-top: 6px;
    border-radius: 999px;
    border: none;
    padding: 13px 14px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    background: radial-gradient(circle at 0% 0%, rgba(79,70,229,0.95), rgba(15,23,42,1));
    color: #f9fafb;
    box-shadow:
      0 0 0 1px rgba(191,219,254,0.9),
      0 18px 48px rgba(15,23,42,1);
    transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
  }

  .lp-fin-main-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .lp-fin-main-btn:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px rgba(221,239,254,1),
      0 24px 60px rgba(15,23,42,1);
  }

  .lp-fin-btn-loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
  }

  /* HISTORIAL */
  .lp-fin-history {
    min-height: 260px;
  }

  .lp-fin-history-header {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 14px;
  }

  .lp-fin-history-icon {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 30% 0, #6366f1, #1e293b);
    color: #e0e7ff;
    box-shadow:
      0 14px 30px rgba(15,23,42,0.95),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-fin-history-header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #f9fafb;
  }

  .lp-fin-history-header p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .lp-fin-history-empty {
    position: relative;
    z-index: 1;
    border-radius: 16px;
    border: 1px dashed rgba(148,163,184,0.7);
    background: rgba(15,23,42,0.98);
    padding: 20px 16px;
    text-align: center;
  }

  .lp-fin-history-empty-title {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .lp-fin-history-empty-sub {
    margin: 0;
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-fin-history-list {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 4px;
  }

  .lp-fin-history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px 8px;
    border-radius: 14px;
    border: 1px solid rgba(30,64,175,0.8);
    background: radial-gradient(circle at 0% 0%, rgba(30,64,175,0.7), rgba(15,23,42,0.96));
    box-shadow:
      0 18px 42px rgba(15,23,42,1),
      0 0 0 1px rgba(15,23,42,1);
  }

  .lp-fin-history-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .lp-fin-history-avatar {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(15,23,42,1),
      0 14px 30px rgba(15,23,42,0.95);
  }

  .lp-fin-history-avatar.is-transfer {
    background: rgba(59,130,246,0.18);
    border: 1px solid rgba(59,130,246,0.9);
    color: #bfdbfe;
  }

  .lp-fin-history-avatar.is-withdraw {
    background: rgba(148,163,184,0.16);
    border: 1px solid rgba(148,163,184,0.9);
    color: #e5e7eb;
  }

  .lp-fin-history-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lp-fin-history-title {
    font-size: 13px;
    font-weight: 700;
    color: #e5e7eb;
  }

  .lp-fin-history-date {
    font-size: 11px;
    color: #9ca3af;
  }

  .lp-fin-history-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
  }

  .lp-fin-history-amount {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    font-size: 13px;
    font-weight: 700;
  }

  .lp-fin-history-amount.is-out { color: #fca5a5; }
  .lp-fin-history-amount.is-in { color: #4ade80; }

  .lp-fin-status-pill {
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .lp-fin-status-pill-pending {
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.9);
    color: #fed7aa;
  }

  .lp-fin-status-pill-ok {
    background: rgba(22,163,74,0.12);
    border: 1px solid rgba(34,197,94,0.9);
    color: #bbf7d0;
  }

  @media (max-width: 768px) {
    .lp-fin-shell { left: 0; }
    .lp-fin-history-item {
      padding: 9px 8px;
    }
  }
`;export{J as PayoutsPage};
