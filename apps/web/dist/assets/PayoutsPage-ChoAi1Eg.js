import{d as y,s as x,L as xe,r as s,j as e,b as L,X,q as ue,C as G,t as J}from"./index-Nlhzqv5g.js";import{C as me}from"./chevron-down-BUJaDkTo.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]],Q=y("arrow-down-left",ve);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]],ge=y("arrow-right-left",fe);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],be=y("building-2",he);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],we=y("ellipsis",ye);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],Ne=y("history",je);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],ee=y("send",ke);async function E(){const{data:r,error:t}=await x.auth.getUser();if(t||!r.user)throw new Error("Debes iniciar sesión.");return r.user}async function I(r){const i=(await xe.getAll()||[]).reduce((l,d)=>l+(Number(d.earnings)||0),0),{data:c}=await x.from("bio_profiles").select("earnings").eq("user_id",r),k=(c==null?void 0:c.reduce((l,d)=>l+(Number(d.earnings)||0),0))||0,{data:u}=await x.from("profiles").select("referral_earnings").eq("id",r).single(),h=Number((u==null?void 0:u.referral_earnings)||0),w=i+k+h;try{const{data:l,error:d}=await x.from("transactions").select("amount, is_negative, type, status").eq("user_id",r).in("status",["pending","completed"]);if(d||!l)return console.warn("[PayoutService.getBalance] No se pudo leer transactions:",d),w;const S=l.reduce((n,v)=>{const f=Number(v.amount)||0,b=v.is_negative??(v.type==="withdrawal"||v.type==="transfer_out");return n+(b?-f:f)},0);return w+S}catch(l){return console.warn("[PayoutService.getBalance] Error leyendo movimientos:",l),w}}const C={async getBalance(){const r=await E(),t=await I(r.id);return t<0?0:t},async getHistory(){const r=await E();try{const{data:t,error:o}=await x.from("transactions").select("id, type, amount, status, is_negative, created_at").eq("user_id",r.id).order("created_at",{ascending:!1}).limit(40);return o||!t?(console.warn("[PayoutService.getHistory] error",o),[]):t.map(i=>{const c=i.type==="withdrawal"?"withdrawal":"transfer";return{id:i.id,type:c,amount:Number(i.amount)||0,status:i.status||"completed",is_negative:i.is_negative??(i.type==="withdrawal"||i.type==="transfer_out"),date:i.created_at?new Date(i.created_at).toLocaleString():""}})}catch(t){return console.warn("[PayoutService.getHistory] excepción",t),[]}},async requestPayout(r,t,o){if(!r||r<=0)throw new Error("Cantidad inválida.");if(!t||!o)throw new Error("Método o cuenta incompletos.");const i=await E(),c=await I(i.id);if(r>c)throw new Error("Saldo insuficiente.");if(r<(t==="PayPal"?5:t==="Bank"?10:5))throw t==="PayPal"?new Error("El retiro mínimo por PayPal es de €5.00"):t==="Bank"?new Error("El retiro mínimo por transferencia bancaria es de €10.00"):new Error("Cantidad inferior al mínimo disponible.");const{error:u}=await x.from("transactions").insert({user_id:i.id,type:"withdrawal",amount:r,is_negative:!0,status:"pending",meta:{method:t,account:o}});if(u)throw console.error("[PayoutService.requestPayout] error",u),new Error("No se pudo registrar el retiro.")},async sendMoney(r,t){if(!t||t<=0)throw new Error("Cantidad inválida.");if(!r)throw new Error("Email destino requerido.");const o=await E(),i=await I(o.id);if(t>i)throw new Error("Saldo insuficiente.");const{error:c}=await x.rpc("transfer_between_users",{target_email:r,amount_value:t});if(c)throw console.error("[PayoutService.sendMoney] error",c),new Error("No se pudo completar la transferencia.")}},$={isValidEmail:r=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r),isValidIBAN:r=>{const t=r.replace(/\s/g,"").toUpperCase();return t.length<15||t.length>34||!/^[A-Z]{2}/.test(t)?!1:/^[A-Z0-9]+$/.test(t)},isValidCrypto:r=>{const t=/^0x[a-fA-F0-9]{40}$/.test(r),o=/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(r);return t||o}};function ze(){const[r,t]=s.useState(0),[o,i]=s.useState([]),[c,k]=s.useState(!0),[u,h]=s.useState(!1),[w,l]=s.useState(!1),[d,S]=s.useState(""),[n,v]=s.useState("PayPal"),[f,b]=s.useState(""),[re,te]=s.useState(""),[q,g]=s.useState(""),[H,T]=s.useState(!1),[se,_]=s.useState(!1),[P,W]=s.useState(""),[M,D]=s.useState(""),[ie,R]=s.useState(""),[V,j]=s.useState(""),[F,U]=s.useState(!1),[ne,A]=s.useState(!1),[N,oe]=s.useState({paypal:"",bank:""}),O=5,K=10,Y=n==="PayPal"?O:K;s.useEffect(()=>{B()},[]),s.useEffect(()=>{n==="PayPal"&&N.paypal&&b(N.paypal),n==="Bank"&&N.bank&&b(N.bank)},[n,N]);const B=async()=>{try{const[a,p]=await Promise.all([C.getBalance(),C.getHistory()]);t(a),i(p);const{data:{user:z}}=await x.auth.getUser();if(z){const{data:m}=await x.from("profiles").select("paypal_email, bank_details").eq("id",z.id).single();m&&(oe({paypal:m.paypal_email||"",bank:m.bank_details||""}),m.paypal_email&&b(m.paypal_email))}}catch(a){console.error("[Finance] loadData error:",a)}finally{k(!1)}},le=async()=>{g(""),_(!1);const a=parseFloat(d);if(!d||isNaN(a)||a<=0)return g("Introduce una cantidad válida.");if(a>r)return g("Saldo insuficiente.");if(a<Y)return g(`Mínimo ${n==="PayPal"?"PayPal":"transferencia"}: €${Y}`);if(n==="PayPal"){if(!$.isValidEmail(f))return g("Introduce un email de PayPal válido.")}else if(!$.isValidIBAN(f))return g("Introduce un IBAN válido.");T(!0);try{await C.requestPayout(a,n,f),_(!0),S(""),B(),setTimeout(()=>{_(!1),h(!1)},2e3)}catch(p){g(p.message||"Error al procesar el retiro.")}finally{T(!1)}},ce=async()=>{j(""),A(!1);const a=parseFloat(M);if(!P||!$.isValidEmail(P))return j("Introduce un email válido.");if(!M||isNaN(a)||a<=0)return j("Introduce una cantidad válida.");if(a>r)return j("Saldo insuficiente.");U(!0);try{await C.sendMoney(P,a),A(!0),D(""),W(""),R(""),B(),setTimeout(()=>{A(!1),l(!1)},2e3)}catch(p){j(p.message||"Error al enviar.")}finally{U(!1)}};return c?e.jsxs("div",{className:"rev-shell",children:[e.jsx("style",{children:ae}),e.jsxs("div",{className:"rev-loading",children:[e.jsx(L,{className:"rev-spin",size:40}),e.jsx("span",{children:"Cargando..."})]})]}):e.jsxs("div",{className:"rev-shell",children:[e.jsx("style",{children:ae}),e.jsxs("div",{className:"rev-bg",children:[e.jsx("div",{className:"rev-bg-gradient"}),e.jsx("div",{className:"rev-bg-glow"})]}),e.jsxs("div",{className:"rev-container",children:[e.jsxs("section",{className:"rev-balance-section",children:[e.jsxs("div",{className:"rev-balance-card",children:[e.jsx("span",{className:"rev-balance-label",children:"LinkPay · EUR"}),e.jsxs("div",{className:"rev-balance-amount",children:[e.jsx("span",{className:"rev-amount-value",children:r.toFixed(2).split(".")[0]}),e.jsxs("span",{className:"rev-amount-decimal",children:[",",r.toFixed(2).split(".")[1]," €"]})]}),e.jsxs("button",{className:"rev-accounts-btn",children:[e.jsx("span",{children:"Billetera"}),e.jsx(me,{size:16})]})]}),e.jsxs("div",{className:"rev-dots",children:[e.jsx("span",{className:"rev-dot active"}),e.jsx("span",{className:"rev-dot"}),e.jsx("span",{className:"rev-dot"})]})]}),e.jsxs("section",{className:"rev-actions",children:[e.jsxs("button",{className:"rev-action-item",onClick:()=>h(!0),children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(Q,{size:22})}),e.jsx("span",{children:"Retirar"})]}),e.jsxs("button",{className:"rev-action-item",onClick:()=>l(!0),children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(ee,{size:22})}),e.jsx("span",{children:"Enviar"})]}),e.jsxs("button",{className:"rev-action-item",children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(ge,{size:22})}),e.jsx("span",{children:"Mover"})]}),e.jsxs("button",{className:"rev-action-item",children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(we,{size:22})}),e.jsx("span",{children:"Más"})]})]}),e.jsxs("section",{className:"rev-transactions",children:[e.jsx("h3",{className:"rev-section-title",children:"Actividad reciente"}),o.length===0?e.jsxs("div",{className:"rev-empty",children:[e.jsx(Ne,{size:32}),e.jsx("p",{children:"Sin movimientos aún"}),e.jsx("span",{children:"Tus transacciones aparecerán aquí"})]}):e.jsx("div",{className:"rev-tx-list",children:o.map(a=>{const p=a.is_negative,z=a.type==="withdrawal"?"Retiro":p?"Envío":"Recibido",m=["#22c55e","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899"],de=a.id.charCodeAt(0)%m.length,pe=m[de],Z=a.status==="pending"?"Pendiente":a.status==="failed"?"Rechazado":"";return e.jsxs("div",{className:"rev-tx-item",children:[e.jsxs("div",{className:"rev-tx-left",children:[e.jsx("div",{className:"rev-tx-avatar",style:{background:pe},children:a.type==="withdrawal"?e.jsx(Q,{size:18,color:"#fff"}):e.jsx(ee,{size:18,color:"#fff"})}),e.jsxs("div",{className:"rev-tx-info",children:[e.jsx("span",{className:"rev-tx-name",children:z}),e.jsx("span",{className:"rev-tx-date",children:a.date})]})]}),e.jsxs("div",{className:"rev-tx-right",children:[e.jsxs("span",{className:`rev-tx-amount ${p?"negative":"positive"}`,children:[p?"-":"+",Number(a.amount).toFixed(2)," €"]}),Z&&e.jsx("span",{className:`rev-tx-status ${a.status}`,children:Z})]})]},a.id)})})]})]}),u&&e.jsx("div",{className:"rev-modal-overlay",onClick:()=>h(!1),children:e.jsxs("div",{className:"rev-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"rev-modal-header",children:[e.jsx("h3",{children:"Retirar fondos"}),e.jsx("button",{className:"rev-modal-close",onClick:()=>h(!1),children:e.jsx(X,{size:24})})]}),e.jsxs("div",{className:"rev-modal-body",children:[e.jsxs("div",{className:"rev-field",children:[e.jsx("label",{children:"Cantidad"}),e.jsxs("div",{className:"rev-amount-input",children:[e.jsx("input",{type:"number",inputMode:"decimal",value:d,onChange:a=>S(a.target.value),placeholder:"0",className:"rev-big-input"}),e.jsx("span",{className:"rev-currency",children:"€"})]}),e.jsxs("p",{className:"rev-hint",children:["Mín. PayPal: €",O," · Transferencia: €",K]})]}),e.jsxs("div",{className:"rev-field",children:[e.jsx("label",{children:"Método"}),e.jsxs("div",{className:"rev-method-toggle",children:[e.jsxs("button",{className:`rev-method ${n==="PayPal"?"active":""}`,onClick:()=>v("PayPal"),children:[e.jsx(ue,{size:18}),"PayPal"]}),e.jsxs("button",{className:`rev-method ${n==="Bank"?"active":""}`,onClick:()=>v("Bank"),children:[e.jsx(be,{size:18}),"Banco"]})]})]}),e.jsxs("div",{className:"rev-field",children:[e.jsx("label",{children:n==="PayPal"?"Email PayPal":"IBAN"}),e.jsx("input",{type:n==="PayPal"?"email":"text",value:f,onChange:a=>b(a.target.value.toUpperCase()),placeholder:n==="PayPal"?"tu@email.com":"ES91...",className:"rev-input"})]}),n==="Bank"&&e.jsxs("div",{className:"rev-field",children:[e.jsx("label",{children:"Titular"}),e.jsx("input",{type:"text",value:re,onChange:a=>te(a.target.value),placeholder:"Nombre completo",className:"rev-input"})]}),q&&e.jsxs("div",{className:"rev-alert error",children:[e.jsx(G,{size:16}),q]}),se&&e.jsxs("div",{className:"rev-alert success",children:[e.jsx(J,{size:16}),"¡Retiro solicitado!"]})]}),e.jsx("button",{className:"rev-submit-btn",onClick:le,disabled:H,children:H?e.jsx(L,{className:"rev-spin",size:20}):"Confirmar retiro"})]})}),w&&e.jsx("div",{className:"rev-modal-overlay",onClick:()=>l(!1),children:e.jsxs("div",{className:"rev-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"rev-modal-header",children:[e.jsx("h3",{children:"Enviar dinero"}),e.jsx("button",{className:"rev-modal-close",onClick:()=>l(!1),children:e.jsx(X,{size:24})})]}),e.jsxs("div",{className:"rev-modal-body",children:[e.jsxs("div",{className:"rev-field",children:[e.jsx("label",{children:"Destinatario"}),e.jsx("input",{type:"email",value:P,onChange:a=>W(a.target.value),placeholder:"email@ejemplo.com",className:"rev-input"})]}),e.jsxs("div",{className:"rev-field",children:[e.jsx("label",{children:"Cantidad"}),e.jsxs("div",{className:"rev-amount-input",children:[e.jsx("input",{type:"number",inputMode:"decimal",value:M,onChange:a=>D(a.target.value),placeholder:"0",className:"rev-big-input"}),e.jsx("span",{className:"rev-currency",children:"€"})]})]}),e.jsxs("div",{className:"rev-field",children:[e.jsx("label",{children:"Nota (opcional)"}),e.jsx("input",{type:"text",value:ie,onChange:a=>R(a.target.value),placeholder:"¿Para qué es?",className:"rev-input"})]}),V&&e.jsxs("div",{className:"rev-alert error",children:[e.jsx(G,{size:16}),V]}),ne&&e.jsxs("div",{className:"rev-alert success",children:[e.jsx(J,{size:16}),"¡Envío completado!"]})]}),e.jsx("button",{className:"rev-submit-btn send",onClick:ce,disabled:F,children:F?e.jsx(L,{className:"rev-spin",size:20}):"Enviar"})]})})]})}const ae=`
  /* ─── ANIMATIONS ─────────────────────────────────────────────────────────── */
  .rev-spin { animation: rev-spin 1s linear infinite; }
  @keyframes rev-spin { 100% { transform: rotate(360deg); } }

  @keyframes rev-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes rev-scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  /* ─── SHELL ──────────────────────────────────────────────────────────────── */
  .rev-shell {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
    color: #fff;
  }

  @media (min-width: 769px) {
    .rev-shell { left: 260px; }
  }

  /* ─── BACKGROUND ─────────────────────────────────────────────────────────── */
  .rev-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: linear-gradient(180deg, 
      #0a1628 0%, 
      #0d1f3c 30%,
      #0f172a 100%
    );
  }

  .rev-bg-gradient {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6, 78, 125, 0.5) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 40% 10%, rgba(14, 116, 144, 0.3) 0%, transparent 40%);
    animation: rev-fade-up 1s ease-out;
  }

  .rev-bg-glow {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  .rev-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px 16px 100px;
    animation: rev-fade-up 0.5s ease-out;
  }

  .rev-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    gap: 16px;
    color: #94a3b8;
    font-size: 14px;
  }

  /* ─── BALANCE SECTION ────────────────────────────────────────────────────── */
  .rev-balance-section {
    padding: 40px 0 30px;
    text-align: center;
  }

  .rev-balance-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .rev-balance-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  .rev-balance-amount {
    display: flex;
    align-items: baseline;
    justify-content: center;
  }

  .rev-amount-value {
    font-size: 56px;
    font-weight: 300;
    letter-spacing: -2px;
    color: #fff;
  }

  .rev-amount-decimal {
    font-size: 32px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 2px;
  }

  .rev-accounts-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 999px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: background 0.2s;
  }

  .rev-accounts-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .rev-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 24px;
  }

  .rev-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: background 0.2s;
  }

  .rev-dot.active {
    background: #fff;
  }

  /* ─── QUICK ACTIONS ──────────────────────────────────────────────────────── */
  .rev-actions {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 20px 0 30px;
  }

  .rev-action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .rev-action-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .rev-action-item:hover .rev-action-circle {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .rev-action-item:active .rev-action-circle {
    transform: scale(0.95);
  }

  .rev-action-item span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  /* ─── TRANSACTIONS ───────────────────────────────────────────────────────── */
  .rev-transactions {
    background: rgba(15, 23, 42, 0.6);
    border-radius: 24px 24px 0 0;
    padding: 24px 20px;
    margin: 0 -16px;
    min-height: 300px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .rev-section-title {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 16px 4px;
  }

  .rev-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 50px 20px;
    color: rgba(255, 255, 255, 0.4);
  }

  .rev-empty p {
    margin: 16px 0 4px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
  }

  .rev-empty span {
    font-size: 13px;
  }

  .rev-tx-list {
    display: flex;
    flex-direction: column;
  }

  .rev-tx-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.15s;
    border-radius: 12px;
    margin: 0 -4px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .rev-tx-item:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .rev-tx-item:last-child {
    border-bottom: none;
  }

  .rev-tx-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .rev-tx-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rev-tx-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .rev-tx-name {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  }

  .rev-tx-date {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
  }

  .rev-tx-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .rev-tx-amount {
    font-size: 15px;
    font-weight: 600;
  }

  .rev-tx-amount.positive { color: #22c55e; }
  .rev-tx-amount.negative { color: #fff; }

  .rev-tx-status {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 999px;
  }

  .rev-tx-status.pending {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
  }

  .rev-tx-status.failed {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
  }

  /* ─── MODAL ──────────────────────────────────────────────────────────────── */
  .rev-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: rev-fade-up 0.2s ease-out;
  }

  @media (min-width: 769px) {
    .rev-modal-overlay {
      left: 260px;
      align-items: center;
    }
  }

  .rev-modal {
    width: 100%;
    max-width: 420px;
    background: #0f172a;
    border-radius: 24px 24px 0 0;
    padding: 0 0 34px;
    animation: rev-scale-in 0.25s ease-out;
    max-height: 90vh;
    overflow-y: auto;
  }

  @media (min-width: 769px) {
    .rev-modal {
      border-radius: 24px;
      margin-bottom: 0;
    }
  }

  .rev-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .rev-modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .rev-modal-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 4px;
    display: flex;
    transition: color 0.15s;
  }

  .rev-modal-close:hover {
    color: #fff;
  }

  .rev-modal-body {
    padding: 20px;
  }

  .rev-field {
    margin-bottom: 20px;
  }

  .rev-field label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 10px;
  }

  .rev-input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .rev-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .rev-input:focus {
    border-color: rgba(56, 189, 248, 0.5);
    background: rgba(255, 255, 255, 0.08);
  }

  .rev-amount-input {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px 0;
  }

  .rev-big-input {
    width: 120px;
    background: none;
    border: none;
    font-size: 48px;
    font-weight: 300;
    color: #fff;
    text-align: right;
    outline: none;
  }

  .rev-big-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .rev-currency {
    font-size: 32px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.6);
  }

  .rev-hint {
    margin: 8px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }

  .rev-method-toggle {
    display: flex;
    gap: 10px;
  }

  .rev-method {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rev-method:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .rev-method.active {
    background: rgba(56, 189, 248, 0.15);
    border-color: rgba(56, 189, 248, 0.4);
    color: #38bdf8;
  }

  .rev-alert {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .rev-alert.error {
    background: rgba(239, 68, 68, 0.12);
    color: #f87171;
  }

  .rev-alert.success {
    background: rgba(34, 197, 94, 0.12);
    color: #4ade80;
  }

  .rev-submit-btn {
    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rev-submit-btn:hover:not(:disabled) {
    opacity: 0.9;
  }

  .rev-submit-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .rev-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .rev-submit-btn.send {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  }

  /* ─── MOBILE ADJUSTMENTS ─────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .rev-shell { left: 0; }
    
    .rev-amount-value {
      font-size: 48px;
    }

    .rev-amount-decimal {
      font-size: 28px;
    }

    .rev-actions {
      gap: 20px;
    }

    .rev-action-circle {
      width: 52px;
      height: 52px;
    }
  }
`;export{ze as PayoutsPage};
