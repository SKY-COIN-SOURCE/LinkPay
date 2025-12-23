import{d as h,b as me,r,j as e,X as Z,B as d,D as ge,k as G,l as J,F as K,P as Q}from"./index-D-0HiMVS.js";import{P as be}from"./PremiumLoader-DeyQUAuK.js";/* empty css                          */import{C as fe}from"./chevron-down-BQ4tECBt.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]],E=h("arrow-down-left",ue);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],ve=h("building-2",he);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],we=h("history",ye);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],u=h("send",je),C={isValidEmail:i=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i),isValidIBAN:i=>{const n=i.replace(/\s/g,"").toUpperCase();return n.length<15||n.length>34||!/^[A-Z]{2}/.test(n)?!1:/^[A-Z0-9]+$/.test(n)},isValidCrypto:i=>{const n=/^0x[a-fA-F0-9]{40}$/.test(i),v=/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(i);return n||v}};function Ce(){const{balance:i,history:n,loading:v,refresh:A}=me(),[ee,x]=r.useState(!1),[ae,m]=r.useState(!1),[y,P]=r.useState(""),[t,M]=r.useState("PayPal"),[g,b]=r.useState(""),[re,te]=r.useState(""),[T,s]=r.useState(""),[O,I]=r.useState(!1),[w,j]=r.useState(!1),[L,R]=r.useState(""),[f,D]=r.useState(""),[N,B]=r.useState(""),[ie,F]=r.useState(""),[U,p]=r.useState(""),[_,V]=r.useState(!1),[k,z]=r.useState(!1),[c,ne]=r.useState({paypal:"",bank:""}),[S,oe]=r.useState(30),Y=30,W=5,$=10,H=t==="PayPal"?W:$;r.useEffect(()=>{(async()=>{const{data:{user:o}}=await K.auth.getUser();if(o){const{data:l}=await K.from("profiles").select("paypal_email, bank_details").eq("id",o.id).single();l&&(ne({paypal:l.paypal_email||"",bank:l.bank_details||""}),l.paypal_email&&b(l.paypal_email))}})()},[]),r.useEffect(()=>{t==="PayPal"&&c.paypal&&b(c.paypal),t==="Bank"&&c.bank&&b(c.bank)},[t,c]);const se=async()=>{s(""),j(!1);const a=parseFloat(y);if(!y||isNaN(a)||a<=0)return s("Introduce una cantidad válida.");if(a>i)return s("Saldo insuficiente.");if(a<H)return s(`Mínimo ${t==="PayPal"?"PayPal":"transferencia"}: €${H}`);if(t==="PayPal"){if(!C.isValidEmail(g))return s("Introduce un email de PayPal válido.")}else if(!C.isValidIBAN(g))return s("Introduce un IBAN válido.");I(!0);try{await Q.requestPayout(a,t,g),j(!0),R("¡Listo! Tu solicitud está en proceso."),P(""),A(),setTimeout(()=>{j(!1),x(!1),R("")},2400)}catch(o){s(o.message||"Error al procesar el retiro.")}finally{I(!1)}},le=async()=>{p(""),z(!1);const a=parseFloat(N);if(!f||!C.isValidEmail(f))return p("Introduce un email válido.");if(!N||isNaN(a)||a<=0)return p("Introduce una cantidad válida.");if(a>i)return p("Saldo insuficiente.");V(!0);try{await Q.sendMoney(f,a),z(!0),B(""),D(""),F(""),A(),setTimeout(()=>{z(!1),m(!1)},2e3)}catch(o){p(o.message||"Error al enviar.")}finally{V(!1)}};if(v)return e.jsx(be,{size:"medium",text:"FINANZAS",subtext:"Cargando tu billetera..."});const de=Math.max(n.length-S,0),pe=Math.min(Y,de);return e.jsxs("div",{className:"rev-shell",children:[e.jsx("style",{children:Ne}),e.jsxs("div",{className:"rev-bg",children:[e.jsx("div",{className:"rev-bg-gradient"}),e.jsx("div",{className:"rev-bg-glow"})]}),e.jsxs("div",{className:"rev-content",children:[e.jsxs("div",{className:"rev-hero-zone",children:[e.jsxs("div",{className:"rev-balance-card",children:[e.jsx("span",{className:"rev-balance-label",children:"Personal · EUR"}),e.jsxs("div",{className:"rev-balance-amount",children:[e.jsx("span",{className:"rev-amount-value",children:i.toFixed(2).split(".")[0]}),e.jsxs("span",{className:"rev-amount-decimal",children:[",",i.toFixed(2).split(".")[1]," €"]})]})]}),e.jsxs("div",{className:"rev-actions",children:[e.jsxs("button",{className:"rev-action-item",onClick:()=>x(!0),children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(E,{size:22})}),e.jsxs("span",{children:["Solicitar",e.jsx("br",{}),"retiro"]})]}),e.jsxs("button",{className:"rev-action-item",onClick:()=>m(!0),children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(u,{size:22})}),e.jsxs("span",{children:["Enviar",e.jsx("br",{}),"interno"]})]})]})]}),e.jsxs("section",{className:"rev-transactions",children:[e.jsx("h3",{className:"rev-section-title",children:"Actividad reciente"}),n.length===0?e.jsxs("div",{className:"rev-empty",children:[e.jsx(we,{size:32}),e.jsx("p",{children:"Sin movimientos aún"}),e.jsx("span",{children:"Tus transacciones aparecerán aquí"})]}):e.jsxs("div",{className:"rev-tx-list",children:[n.slice(0,S).map(a=>{const o=a.is_negative,l=a.type==="withdrawal"?"Retiro":o?"Envío":"Recibido",q=["#22c55e","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899"],ce=a.id.charCodeAt(0)%q.length,xe=q[ce],X=a.status==="pending"?"Pendiente":a.status==="failed"?"Rechazado":"";return e.jsxs("div",{className:"rev-tx-item",children:[e.jsxs("div",{className:"rev-tx-left",children:[e.jsx("div",{className:"rev-tx-avatar",style:{background:xe},children:a.type==="withdrawal"?e.jsx(E,{size:18,color:"#fff"}):e.jsx(u,{size:18,color:"#fff"})}),e.jsxs("div",{className:"rev-tx-info",children:[e.jsx("span",{className:"rev-tx-name",children:l}),e.jsx("span",{className:"rev-tx-date",children:a.date})]})]}),e.jsxs("div",{className:"rev-tx-right",children:[e.jsxs("span",{className:`rev-tx-amount ${o?"negative":"positive"}`,children:[o?"-":"+",Number(a.amount).toFixed(2)," €"]}),X&&e.jsx("span",{className:`rev-tx-status ${a.status}`,children:X})]})]},a.id)}),S<n.length&&e.jsxs("button",{type:"button",className:"rev-tx-more",onClick:()=>oe(a=>Math.min(a+Y,n.length)),children:["Mostrar ",pe," más",e.jsx(fe,{size:16})]})]})]})]}),ee&&e.jsx("div",{className:"lp-modal-overlay",onClick:()=>x(!1),children:e.jsxs("div",{className:"lp-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"lp-modal-header",children:[e.jsx("button",{className:"lp-modal-close",onClick:()=>x(!1),children:e.jsx(Z,{size:22})}),e.jsx("div",{className:"lp-modal-icon withdraw",children:e.jsx(E,{size:28})}),e.jsx("h2",{children:"Retirar fondos"}),e.jsx("p",{className:"lp-modal-subtitle",children:"Recibe tu dinero en PayPal o cuenta bancaria"})]}),e.jsxs("div",{className:"lp-modal-body",children:[e.jsxs("div",{className:"lp-amount-hero",children:[e.jsxs("div",{className:"lp-amount-row",children:[e.jsx("input",{type:"number",inputMode:"decimal",value:y,onChange:a=>P(a.target.value),placeholder:"0",className:"lp-amount-input"}),e.jsx("span",{className:"lp-amount-currency",children:"EUR"})]}),e.jsxs("div",{className:"lp-amount-available",children:["Disponible: ",e.jsxs("strong",{children:[i.toFixed(2)," €"]})]})]}),L&&e.jsxs("div",{className:"lp-success-banner",children:[e.jsx(d,{size:20}),e.jsx("span",{children:L})]}),e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:"Método de pago"}),e.jsxs("div",{className:"lp-method-grid",children:[e.jsxs("button",{className:`lp-method-card ${t==="PayPal"?"active":""}`,onClick:()=>M("PayPal"),children:[e.jsx("div",{className:"lp-method-icon paypal",children:e.jsx(ge,{size:20})}),e.jsxs("div",{className:"lp-method-info",children:[e.jsx("span",{className:"lp-method-name",children:"PayPal"}),e.jsxs("span",{className:"lp-method-min",children:["Mín. ",W,"€"]})]}),t==="PayPal"&&e.jsx(d,{size:18,className:"lp-method-check"})]}),e.jsxs("button",{className:`lp-method-card ${t==="Bank"?"active":""}`,onClick:()=>M("Bank"),children:[e.jsx("div",{className:"lp-method-icon bank",children:e.jsx(ve,{size:20})}),e.jsxs("div",{className:"lp-method-info",children:[e.jsx("span",{className:"lp-method-name",children:"Transferencia"}),e.jsxs("span",{className:"lp-method-min",children:["Mín. ",$,"€"]})]}),t==="Bank"&&e.jsx(d,{size:18,className:"lp-method-check"})]})]})]}),e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:t==="PayPal"?"Email de PayPal":"Número IBAN"}),e.jsx("input",{type:t==="PayPal"?"email":"text",value:g,onChange:a=>b(t==="Bank"?a.target.value.toUpperCase():a.target.value),placeholder:t==="PayPal"?"tu@email.com":"ES00 0000 0000 0000 0000 0000",className:"lp-input"})]}),t==="Bank"&&e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:"Titular de la cuenta"}),e.jsx("input",{type:"text",value:re,onChange:a=>te(a.target.value),placeholder:"Nombre y apellidos",className:"lp-input"})]}),T&&e.jsxs("div",{className:"lp-error-banner",children:[e.jsx(G,{size:18}),e.jsx("span",{children:T})]}),w&&e.jsxs("div",{className:"lp-success-banner",children:[e.jsx(d,{size:18}),e.jsx("span",{children:"¡Solicitud enviada correctamente!"})]})]}),e.jsx("div",{className:"lp-modal-footer",children:e.jsx("button",{className:"lp-btn-primary",onClick:se,disabled:O||w,children:O?e.jsx(J,{className:"lp-spin",size:20}):w?e.jsxs(e.Fragment,{children:[e.jsx(d,{size:20})," Enviado"]}):e.jsx(e.Fragment,{children:"Solicitar retiro"})})})]})}),ae&&e.jsx("div",{className:"lp-modal-overlay",onClick:()=>m(!1),children:e.jsxs("div",{className:"lp-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"lp-modal-header",children:[e.jsx("button",{className:"lp-modal-close",onClick:()=>m(!1),children:e.jsx(Z,{size:22})}),e.jsx("div",{className:"lp-modal-icon send",children:e.jsx(u,{size:28})}),e.jsx("h2",{children:"Enviar dinero"}),e.jsx("p",{className:"lp-modal-subtitle",children:"Transfiere fondos a otro usuario de LinkPay"})]}),e.jsxs("div",{className:"lp-modal-body",children:[e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:"Destinatario"}),e.jsxs("div",{className:"lp-input-icon-wrapper",children:[e.jsx("input",{type:"email",value:f,onChange:a=>D(a.target.value),placeholder:"email@ejemplo.com",className:"lp-input with-icon"}),e.jsx(u,{size:18,className:"lp-input-icon"})]})]}),e.jsxs("div",{className:"lp-amount-hero",children:[e.jsxs("div",{className:"lp-amount-row",children:[e.jsx("input",{type:"number",inputMode:"decimal",value:N,onChange:a=>B(a.target.value),placeholder:"0",className:"lp-amount-input"}),e.jsx("span",{className:"lp-amount-currency",children:"EUR"})]}),e.jsxs("div",{className:"lp-amount-available",children:["Disponible: ",e.jsxs("strong",{children:[i.toFixed(2)," €"]})]})]}),e.jsxs("div",{className:"lp-field",children:[e.jsxs("label",{children:["Nota ",e.jsx("span",{className:"lp-optional",children:"(opcional)"})]}),e.jsx("input",{type:"text",value:ie,onChange:a=>F(a.target.value),placeholder:"Ej: Pago por colaboración",className:"lp-input"})]}),U&&e.jsxs("div",{className:"lp-error-banner",children:[e.jsx(G,{size:18}),e.jsx("span",{children:U})]}),k&&e.jsxs("div",{className:"lp-success-banner",children:[e.jsx(d,{size:18}),e.jsx("span",{children:"¡Dinero enviado correctamente!"})]})]}),e.jsx("div",{className:"lp-modal-footer",children:e.jsx("button",{className:"lp-btn-primary blue",onClick:le,disabled:_||k,children:_?e.jsx(J,{className:"lp-spin",size:20}):k?e.jsxs(e.Fragment,{children:[e.jsx(d,{size:20})," Enviado"]}):e.jsx(e.Fragment,{children:"Enviar ahora"})})})]})})]})}const Ne=`
  /* ─── ANIMATIONS ─────────────────────────────────────────────────────────── */
  .rev-spin, .lp-spin { animation: rev-spin 1s linear infinite; }
  @keyframes rev-spin { 100% { transform: rotate(360deg); } }

  @keyframes rev-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes rev-scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes lp-slide-up {
    from { opacity: 0; transform: translateY(100%); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes lp-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes lp-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     PREMIUM MODALS - MOBILE FIRST
  ═══════════════════════════════════════════════════════════════════════════ */
  .lp-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: lp-fade-in 0.2s ease-out;
    padding: 0;
  }

  @media (min-width: 769px) {
    .lp-modal-overlay {
      left: 260px;
      align-items: center;
      padding: 20px;
    }
  }

  .lp-modal {
    width: 100%;
    max-width: 100%;
    background: linear-gradient(180deg, #1a1f2e 0%, #0f1319 100%);
    border-radius: 28px 28px 0 0;
    animation: lp-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: 95vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 769px) {
    .lp-modal {
      max-width: 440px;
      border-radius: 24px;
      max-height: 90vh;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
    }
  }

  /* ─── MODAL HEADER ─────────────────────────────────────────────────────────── */
  .lp-modal-header {
    position: relative;
    text-align: center;
    padding: 28px 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .lp-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-modal-close:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  .lp-modal-icon {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: #fff;
  }

  .lp-modal-icon.withdraw {
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
  }

  .lp-modal-icon.send {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
  }

  .lp-modal-header h2 {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .lp-modal-subtitle {
    margin: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
  }

  /* ─── MODAL BODY ──────────────────────────────────────────────────────────── */
  .lp-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px 20px;
  }

  @media (min-width: 769px) {
    .lp-modal-body {
      padding: 24px;
    }
  }

  /* ─── AMOUNT HERO ──────────────────────────────────────────────────────────── */
  .lp-amount-hero {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
    text-align: center;
  }

  .lp-amount-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .lp-amount-input {
    background: transparent;
    border: none;
    font-size: 48px;
    font-weight: 300;
    color: #fff;
    width: 140px;
    text-align: right;
    outline: none;
    font-family: inherit;
    letter-spacing: -2px;
  }

  .lp-amount-input::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  .lp-amount-input::-webkit-outer-spin-button,
  .lp-amount-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .lp-amount-currency {
    font-size: 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.05em;
  }

  .lp-amount-available {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  .lp-amount-available strong {
    color: #22c55e;
    font-weight: 600;
  }

  /* ─── FIELDS ──────────────────────────────────────────────────────────────── */
  .lp-field {
    margin-bottom: 20px;
  }

  .lp-field label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .lp-optional {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.35);
    text-transform: none;
    letter-spacing: 0;
  }

  .lp-input {
    width: 100%;
    padding: 16px 18px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 16px;
    font-family: inherit;
    outline: none;
    transition: all 0.2s;
  }

  .lp-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .lp-input:focus {
    border-color: rgba(139, 92, 246, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }

  .lp-input-icon-wrapper {
    position: relative;
  }

  .lp-input.with-icon {
    padding-right: 48px;
  }

  .lp-input-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.3);
  }

  /* ─── METHOD GRID ──────────────────────────────────────────────────────────── */
  .lp-method-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .lp-method-card {
    position: relative;
    background: rgba(255, 255, 255, 0.04);
    border: 2px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .lp-method-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .lp-method-card.active {
    background: rgba(139, 92, 246, 0.15);
    border-color: #8b5cf6;
  }

  .lp-method-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .lp-method-icon.paypal {
    background: linear-gradient(135deg, #0070ba 0%, #003087 100%);
  }

  .lp-method-icon.bank {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  }

  .lp-method-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lp-method-name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  .lp-method-min {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
  }

  .lp-method-check {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #8b5cf6;
  }

  /* ─── BANNERS ──────────────────────────────────────────────────────────────── */
  .lp-success-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 14px;
    color: #4ade80;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    animation: lp-pulse 0.4s ease-out;
  }

  .lp-error-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 14px;
    color: #fca5a5;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  /* ─── MODAL FOOTER ─────────────────────────────────────────────────────────── */
  .lp-modal-footer {
    padding: 16px 20px 28px;
    padding-bottom: calc(28px + env(safe-area-inset-bottom, 0px));
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  @media (min-width: 769px) {
    .lp-modal-footer {
      padding: 20px 24px 24px;
    }
  }

  .lp-btn-primary {
    width: 100%;
    padding: 18px 24px;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.2s;
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.35);
  }

  .lp-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.45);
  }

  .lp-btn-primary:active:not(:disabled) {
    transform: translateY(0);
  }

  .lp-btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .lp-btn-primary.blue {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.35);
  }

  .lp-btn-primary.blue:hover:not(:disabled) {
    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.45);
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

  /* Mobile: start below header */
  @media (max-width: 768px) {
    .rev-shell {
      top: calc(48px + env(safe-area-inset-top, 0px));
    }
  }

  /* Desktop: sidebar offset */
  @media (min-width: 769px) {
    .rev-shell { 
      left: 260px; 
      top: 0;
    }
  }

  /* ─── BACKGROUND - STUNNING UNDERWATER EFFECT ────────────────────────────── */
  .rev-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: linear-gradient(180deg, 
      #001a2c 0%, 
      #003352 25%,
      #004d7a 50%,
      #003352 75%,
      #001a2c 100%
    );
    overflow: hidden;
  }

  .rev-bg-gradient {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 120% 60% at 50% -10%, rgba(0, 180, 216, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse 100% 50% at 20% 20%, rgba(0, 119, 182, 0.35) 0%, transparent 45%),
      radial-gradient(ellipse 80% 60% at 80% 30%, rgba(72, 202, 228, 0.25) 0%, transparent 40%),
      radial-gradient(ellipse 60% 40% at 50% 80%, rgba(0, 150, 199, 0.2) 0%, transparent 50%);
    animation: rev-fade-up 1.2s ease-out;
  }

  .rev-bg-glow {
    position: absolute;
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(72, 202, 228, 0.35) 0%, rgba(0, 180, 216, 0.15) 30%, transparent 60%);
    pointer-events: none;
    animation: rev-glow-pulse 4s ease-in-out infinite alternate;
  }

  /* Floating particles effect */
  .rev-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.7;
    background-image:
      radial-gradient(1px 1px at 15% 20%, rgba(255, 255, 255, 0.7), transparent),
      radial-gradient(1px 1px at 25% 35%, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(2px 2px at 40% 15%, rgba(72, 202, 228, 0.9), transparent),
      radial-gradient(1px 1px at 55% 45%, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(1px 1px at 70% 25%, rgba(255, 255, 255, 0.4), transparent),
      radial-gradient(2px 2px at 85% 50%, rgba(0, 180, 216, 0.8), transparent),
      radial-gradient(1px 1px at 10% 70%, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(1px 1px at 30% 80%, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(2px 2px at 60% 75%, rgba(144, 224, 239, 0.7), transparent),
      radial-gradient(1px 1px at 80% 85%, rgba(255, 255, 255, 0.4), transparent);
    background-size: 350px 250px;
    animation: rev-particles-float 20s linear infinite;
  }

  /* Secondary floating orb */
  .rev-bg::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    bottom: 10%;
    right: -100px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.25) 0%, rgba(72, 202, 228, 0.1) 40%, transparent 60%);
    border-radius: 50%;
    filter: blur(40px);
    animation: rev-orb-float 15s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes rev-glow-pulse {
    0% { opacity: 0.8; transform: translateX(-50%) scale(1); }
    100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
  }

  @keyframes rev-particles-float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-250px); }
  }

  @keyframes rev-orb-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-30px, -50px) scale(1.05); }
    66% { transform: translate(-60px, 20px) scale(0.95); }
  }

  /* ─── CONTENT CONTAINER ─────────────────────────────────────────────────── */
  .rev-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 24px 16px 100px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .rev-content {
      padding: 12px 12px calc(90px + env(safe-area-inset-bottom, 20px)) 12px;
      max-width: 100%;
    }
  }

  /* ─── HERO ZONE - BALANCE JUSTO DEBAJO DEL HEADER ──────────────────── */
  .rev-hero-zone {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 0 0 auto;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  @media (max-width: 768px) {
    .rev-hero-zone {
      padding-top: 32px;
      padding-bottom: 36px;
    }
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

  /* ─── BALANCE SECTION - CENTRADO ─────────────────────────────────────── */
  .rev-balance-section {
    padding: 40px 0 24px;
    text-align: center;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .rev-balance-section {
      padding: 28px 0 20px;
    }
  }

  .rev-balance-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .rev-balance-card {
      margin-bottom: 12px;
    }
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
    flex-wrap: nowrap;
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

  /* ─── CUENTAS BUTTON (REVOLUT STYLE) ──────────────────────────────────── */
  .rev-cuentas-btn {
    margin-top: 12px;
    padding: 10px 24px;
    border-radius: 999px;
    border: none;
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .rev-cuentas-btn:hover {
    background: rgba(56, 189, 248, 0.3);
    transform: scale(1.02);
  }

  .rev-cuentas-btn:active {
    transform: scale(0.98);
  }

  /* ─── DOTS INDICATOR (REVOLUT STYLE) ─────────────────────────────────── */
  .rev-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 20px 0 28px;
  }

  .rev-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
  }

  .rev-dot.active {
    width: 8px;
    height: 8px;
    background: #fff;
  }

  /* ─── QUICK ACTIONS - COMPACTO ─────────────────────────────────────────── */
  .rev-actions {
    display: flex;
    justify-content: center;
    gap: 28px;
    padding: 8px 0 0;
    flex-wrap: wrap;
  }

  @media (min-width: 769px) {
    .rev-actions {
      justify-content: center;
    }
  }

  .rev-action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    min-width: 80px;
  }

  .rev-action-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  .rev-action-item:hover .rev-action-circle {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .rev-action-item:active .rev-action-circle {
    transform: scale(0.96);
  }

  .rev-action-item span {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  /* ─── BUTTONS & ALERTS ─────────────────────────────────────────────────── */
  .rev-primary {
    background: linear-gradient(90deg, #6366f1, #22d3ee);
    border: none;
    color: #fff;
    border-radius: 12px;
    padding: 10px 16px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  }

  .rev-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  .rev-alert {
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid transparent;
  }

  .rev-alert.error {
    background: rgba(239, 68, 68, 0.1);
    color: #fecdd3;
    border: 1px solid rgba(239, 68, 68, 0.25);
  }

  .rev-alert.info {
    background: rgba(59, 130, 246, 0.12);
    color: #bfdbfe;
    border-color: rgba(59, 130, 246, 0.35);
  }

  .rev-requirements {
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px dashed rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.04);
    color: #e2e8f0;
    font-size: 12px;
  }

  /* ─── TRANSACTIONS - PANEL INFERIOR EXPANDIDO ───────────────────────────── */
  .rev-transactions {
    background: rgba(0, 30, 50, 0.4);
    border-radius: 24px 24px 0 0;
    padding: 20px 16px 30px;
    margin: 0 -12px;
    flex: 1;
    min-height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    .rev-transactions {
      flex: 1;
      min-height: 280px;
      padding: 20px 16px 120px;
      display: flex;
      flex-direction: column;
    }
  }

  .rev-tx-loading {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    color: rgba(255, 255, 255, 0.5);
  }

  .rev-tx-more {
    width: 100%;
    margin: 10px 0 0;
    padding: 10px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(15, 23, 42, 0.45);
    color: rgba(255, 255, 255, 0.85);
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .rev-tx-more:hover {
    background: rgba(30, 41, 59, 0.7);
    border-color: rgba(255, 255, 255, 0.28);
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
    flex: 1;
    min-height: 180px;
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
    flex: 1;
    min-height: 0;
  }

  .rev-tx-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.15s;
    border-radius: 12px;
    margin: 0 -2px;
    padding-left: 10px;
    padding-right: 10px;
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
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
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
    width: min(520px, calc(100% - 24px));
    margin: 0 12px;
    background: linear-gradient(180deg, #0b1222 0%, #0c152a 100%);
    border-radius: 20px 20px 0 0;
    padding: 0 0 34px;
    animation: rev-scale-in 0.25s ease-out;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.4);
  }

  @media (min-width: 769px) {
    .rev-modal {
      border-radius: 20px;
      margin-bottom: 0;
      width: 520px;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .rev-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 768px) {
    .rev-modal-header { padding: 16px 18px 12px; }
    .rev-modal-body { padding: 16px; gap: 14px; }
  }

  .rev-field {
    margin-bottom: 12px;
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
    gap: 10px;
    padding: 18px 0;
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

  /* ─── MOBILE ADJUSTMENTS - REVOLUT PERFECT ─────────────────────────────── */
  @media (max-width: 768px) {
    .rev-shell { left: 0; }
    
    .rev-hero-zone {
      padding-top: 8px;
      padding-bottom: 0;
    }
    
    .rev-amount-value {
      font-size: 48px;
    }

    .rev-amount-decimal {
      font-size: 28px;
    }

    .rev-cuentas-btn {
      margin-top: 8px;
      padding: 8px 20px;
      font-size: 13px;
    }

    .rev-dots {
      margin: 16px 0 20px;
    }

    .rev-actions {
      gap: 32px;
      margin-top: 0;
      padding: 0;
      justify-content: center;
      width: 100%;
    }

    .rev-action-item {
      min-width: 60px;
      padding: 4px;
    }

    .rev-action-circle {
      width: 52px;
      height: 52px;
    }

    .rev-action-item span {
      font-size: 10px;
      text-align: center;
      line-height: 1.2;
      margin-top: 4px;
    }

    .rev-transactions {
      margin-top: 32px;
    }
  }
`;export{Ce as PayoutsPage};
