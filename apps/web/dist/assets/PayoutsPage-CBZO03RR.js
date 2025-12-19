import{d as v,B as ce,r as t,j as e,l as A,X as G,D as d,F as xe,k as K,G as X,P as J}from"./index-BPCgxgQJ.js";import{P as me}from"./PremiumLoader-DioTVARH.js";/* empty css                          *//**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]],P=v("arrow-down-left",ge);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],be=v("building-2",fe);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],ue=v("history",he);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],u=v("send",ve),C={isValidEmail:n=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n),isValidIBAN:n=>{const o=n.replace(/\s/g,"").toUpperCase();return o.length<15||o.length>34||!/^[A-Z]{2}/.test(o)?!1:/^[A-Z0-9]+$/.test(o)},isValidCrypto:n=>{const o=/^0x[a-fA-F0-9]{40}$/.test(n),y=/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(n);return o||y}};function ke(){const{balance:n,history:o,loading:y,refresh:M}=ce(),[Q,x]=t.useState(!1),[ee,m]=t.useState(!1),[w,I]=t.useState(""),[r,O]=t.useState("PayPal"),[g,f]=t.useState(""),[ae,te]=t.useState(""),[L,l]=t.useState(""),[T,B]=t.useState(!1),[j,N]=t.useState(!1),[R,D]=t.useState(""),[b,F]=t.useState(""),[k,_]=t.useState(""),[re,U]=t.useState(""),[W,p]=t.useState(""),[$,H]=t.useState(!1),[z,S]=t.useState(!1),[c,ie]=t.useState({paypal:"",bank:""}),[E,ne]=t.useState(10),oe=10,V=5,Y=10,q=r==="PayPal"?V:Y;t.useEffect(()=>{(async()=>{const{data:{user:i}}=await X.auth.getUser();if(i){const{data:s}=await X.from("profiles").select("paypal_email, bank_details").eq("id",i.id).single();s&&(ie({paypal:s.paypal_email||"",bank:s.bank_details||""}),s.paypal_email&&f(s.paypal_email))}})()},[]),t.useEffect(()=>{r==="PayPal"&&c.paypal&&f(c.paypal),r==="Bank"&&c.bank&&f(c.bank)},[r,c]);const se=async()=>{l(""),N(!1);const a=parseFloat(w);if(!w||isNaN(a)||a<=0)return l("Introduce una cantidad válida.");if(a>n)return l("Saldo insuficiente.");if(a<q)return l(`Mínimo ${r==="PayPal"?"PayPal":"transferencia"}: €${q}`);if(r==="PayPal"){if(!C.isValidEmail(g))return l("Introduce un email de PayPal válido.")}else if(!C.isValidIBAN(g))return l("Introduce un IBAN válido.");B(!0);try{await J.requestPayout(a,r,g),N(!0),D("¡Listo! Tu solicitud está en proceso."),I(""),M(),setTimeout(()=>{N(!1),x(!1),D("")},2400)}catch(i){l(i.message||"Error al procesar el retiro.")}finally{B(!1)}},le=async()=>{p(""),S(!1);const a=parseFloat(k);if(!b||!C.isValidEmail(b))return p("Introduce un email válido.");if(!k||isNaN(a)||a<=0)return p("Introduce una cantidad válida.");if(a>n)return p("Saldo insuficiente.");H(!0);try{await J.sendMoney(b,a),S(!0),_(""),F(""),U(""),M(),setTimeout(()=>{S(!1),m(!1)},2e3)}catch(i){p(i.message||"Error al enviar.")}finally{H(!1)}};return y?e.jsx(me,{size:"medium",text:"FINANZAS",subtext:"Cargando tu billetera..."}):e.jsxs("div",{className:"rev-shell",children:[e.jsx("style",{children:ye}),e.jsxs("div",{className:"rev-bg",children:[e.jsx("div",{className:"rev-bg-gradient"}),e.jsx("div",{className:"rev-bg-glow"})]}),e.jsxs("div",{className:"rev-content",children:[e.jsxs("div",{className:"rev-hero-zone",children:[e.jsxs("div",{className:"rev-balance-card",children:[e.jsx("span",{className:"rev-balance-label",children:"Wallet"}),e.jsxs("div",{className:"rev-balance-amount",children:[e.jsx("span",{className:"rev-amount-value",children:n.toFixed(2).split(".")[0]}),e.jsxs("span",{className:"rev-amount-decimal",children:[",",n.toFixed(2).split(".")[1]," €"]})]})]}),e.jsxs("div",{className:"rev-actions",children:[e.jsxs("button",{className:"rev-action-item",onClick:()=>x(!0),children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(P,{size:18})}),e.jsx("span",{children:"Solicitar retiro"})]}),e.jsxs("button",{className:"rev-action-item",onClick:()=>m(!0),children:[e.jsx("div",{className:"rev-action-circle",children:e.jsx(u,{size:18})}),e.jsx("span",{children:"Enviar interno"})]})]})]}),e.jsxs("section",{className:"rev-transactions",onScroll:a=>{const i=a.target;i.scrollHeight-i.scrollTop-i.clientHeight<100&&E<o.length&&ne(h=>Math.min(h+oe,o.length))},children:[e.jsx("h3",{className:"rev-section-title",children:"Actividad reciente"}),o.length===0?e.jsxs("div",{className:"rev-empty",children:[e.jsx(ue,{size:32}),e.jsx("p",{children:"Sin movimientos aún"}),e.jsx("span",{children:"Tus transacciones aparecerán aquí"})]}):e.jsxs("div",{className:"rev-tx-list",children:[o.slice(0,E).map(a=>{const i=a.is_negative,s=a.type==="withdrawal"?"Retiro":i?"Envío":"Recibido",h=["#22c55e","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899"],de=a.id.charCodeAt(0)%h.length,pe=h[de],Z=a.status==="pending"?"Pendiente":a.status==="failed"?"Rechazado":"";return e.jsxs("div",{className:"rev-tx-item",children:[e.jsxs("div",{className:"rev-tx-left",children:[e.jsx("div",{className:"rev-tx-avatar",style:{background:pe},children:a.type==="withdrawal"?e.jsx(P,{size:18,color:"#fff"}):e.jsx(u,{size:18,color:"#fff"})}),e.jsxs("div",{className:"rev-tx-info",children:[e.jsx("span",{className:"rev-tx-name",children:s}),e.jsx("span",{className:"rev-tx-date",children:a.date})]})]}),e.jsxs("div",{className:"rev-tx-right",children:[e.jsxs("span",{className:`rev-tx-amount ${i?"negative":"positive"}`,children:[i?"-":"+",Number(a.amount).toFixed(2)," €"]}),Z&&e.jsx("span",{className:`rev-tx-status ${a.status}`,children:Z})]})]},a.id)}),E<o.length&&e.jsx("div",{className:"rev-tx-loading",children:e.jsx(A,{size:20,className:"rev-spin"})})]})]})]}),Q&&e.jsx("div",{className:"lp-modal-overlay",onClick:()=>x(!1),children:e.jsxs("div",{className:"lp-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"lp-modal-header",children:[e.jsx("button",{className:"lp-modal-close",onClick:()=>x(!1),children:e.jsx(G,{size:22})}),e.jsx("div",{className:"lp-modal-icon withdraw",children:e.jsx(P,{size:28})}),e.jsx("h2",{children:"Retirar fondos"}),e.jsx("p",{className:"lp-modal-subtitle",children:"Recibe tu dinero en PayPal o cuenta bancaria"})]}),e.jsxs("div",{className:"lp-modal-body",children:[e.jsxs("div",{className:"lp-amount-hero",children:[e.jsxs("div",{className:"lp-amount-row",children:[e.jsx("input",{type:"number",inputMode:"decimal",value:w,onChange:a=>I(a.target.value),placeholder:"0",className:"lp-amount-input"}),e.jsx("span",{className:"lp-amount-currency",children:"EUR"})]}),e.jsxs("div",{className:"lp-amount-available",children:["Disponible: ",e.jsxs("strong",{children:[n.toFixed(2)," €"]})]})]}),R&&e.jsxs("div",{className:"lp-success-banner",children:[e.jsx(d,{size:20}),e.jsx("span",{children:R})]}),e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:"Método de pago"}),e.jsxs("div",{className:"lp-method-grid",children:[e.jsxs("button",{className:`lp-method-card ${r==="PayPal"?"active":""}`,onClick:()=>O("PayPal"),children:[e.jsx("div",{className:"lp-method-icon paypal",children:e.jsx(xe,{size:20})}),e.jsxs("div",{className:"lp-method-info",children:[e.jsx("span",{className:"lp-method-name",children:"PayPal"}),e.jsxs("span",{className:"lp-method-min",children:["Mín. ",V,"€"]})]}),r==="PayPal"&&e.jsx(d,{size:18,className:"lp-method-check"})]}),e.jsxs("button",{className:`lp-method-card ${r==="Bank"?"active":""}`,onClick:()=>O("Bank"),children:[e.jsx("div",{className:"lp-method-icon bank",children:e.jsx(be,{size:20})}),e.jsxs("div",{className:"lp-method-info",children:[e.jsx("span",{className:"lp-method-name",children:"Transferencia"}),e.jsxs("span",{className:"lp-method-min",children:["Mín. ",Y,"€"]})]}),r==="Bank"&&e.jsx(d,{size:18,className:"lp-method-check"})]})]})]}),e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:r==="PayPal"?"Email de PayPal":"Número IBAN"}),e.jsx("input",{type:r==="PayPal"?"email":"text",value:g,onChange:a=>f(r==="Bank"?a.target.value.toUpperCase():a.target.value),placeholder:r==="PayPal"?"tu@email.com":"ES00 0000 0000 0000 0000 0000",className:"lp-input"})]}),r==="Bank"&&e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:"Titular de la cuenta"}),e.jsx("input",{type:"text",value:ae,onChange:a=>te(a.target.value),placeholder:"Nombre y apellidos",className:"lp-input"})]}),L&&e.jsxs("div",{className:"lp-error-banner",children:[e.jsx(K,{size:18}),e.jsx("span",{children:L})]}),j&&e.jsxs("div",{className:"lp-success-banner",children:[e.jsx(d,{size:18}),e.jsx("span",{children:"¡Solicitud enviada correctamente!"})]})]}),e.jsx("div",{className:"lp-modal-footer",children:e.jsx("button",{className:"lp-btn-primary",onClick:se,disabled:T||j,children:T?e.jsx(A,{className:"lp-spin",size:20}):j?e.jsxs(e.Fragment,{children:[e.jsx(d,{size:20})," Enviado"]}):e.jsx(e.Fragment,{children:"Solicitar retiro"})})})]})}),ee&&e.jsx("div",{className:"lp-modal-overlay",onClick:()=>m(!1),children:e.jsxs("div",{className:"lp-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"lp-modal-header",children:[e.jsx("button",{className:"lp-modal-close",onClick:()=>m(!1),children:e.jsx(G,{size:22})}),e.jsx("div",{className:"lp-modal-icon send",children:e.jsx(u,{size:28})}),e.jsx("h2",{children:"Enviar dinero"}),e.jsx("p",{className:"lp-modal-subtitle",children:"Transfiere fondos a otro usuario de LinkPay"})]}),e.jsxs("div",{className:"lp-modal-body",children:[e.jsxs("div",{className:"lp-field",children:[e.jsx("label",{children:"Destinatario"}),e.jsxs("div",{className:"lp-input-icon-wrapper",children:[e.jsx("input",{type:"email",value:b,onChange:a=>F(a.target.value),placeholder:"email@ejemplo.com",className:"lp-input with-icon"}),e.jsx(u,{size:18,className:"lp-input-icon"})]})]}),e.jsxs("div",{className:"lp-amount-hero",children:[e.jsxs("div",{className:"lp-amount-row",children:[e.jsx("input",{type:"number",inputMode:"decimal",value:k,onChange:a=>_(a.target.value),placeholder:"0",className:"lp-amount-input"}),e.jsx("span",{className:"lp-amount-currency",children:"EUR"})]}),e.jsxs("div",{className:"lp-amount-available",children:["Disponible: ",e.jsxs("strong",{children:[n.toFixed(2)," €"]})]})]}),e.jsxs("div",{className:"lp-field",children:[e.jsxs("label",{children:["Nota ",e.jsx("span",{className:"lp-optional",children:"(opcional)"})]}),e.jsx("input",{type:"text",value:re,onChange:a=>U(a.target.value),placeholder:"Ej: Pago por colaboración",className:"lp-input"})]}),W&&e.jsxs("div",{className:"lp-error-banner",children:[e.jsx(K,{size:18}),e.jsx("span",{children:W})]}),z&&e.jsxs("div",{className:"lp-success-banner",children:[e.jsx(d,{size:18}),e.jsx("span",{children:"¡Dinero enviado correctamente!"})]})]}),e.jsx("div",{className:"lp-modal-footer",children:e.jsx("button",{className:"lp-btn-primary blue",onClick:le,disabled:$||z,children:$?e.jsx(A,{className:"lp-spin",size:20}):z?e.jsxs(e.Fragment,{children:[e.jsx(d,{size:20})," Enviado"]}):e.jsx(e.Fragment,{children:"Enviar ahora"})})})]})})]})}const ye=`
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
      padding: calc(48px + env(safe-area-inset-top, 12px) + 16px) 12px calc(90px + env(safe-area-inset-bottom, 20px)) 12px;
      max-width: 100%;
    }
  }

  /* ─── HERO ZONE - BALANCE MUY ARRIBA (ESTILO BANCO) ─────────────────── */
  .rev-hero-zone {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 0 0 auto;
    padding-top: 50px;
    padding-bottom: 20px;
  }

  @media (max-width: 768px) {
    .rev-hero-zone {
      padding-top: 40px;
      padding-bottom: 14px;
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
    gap: 6px;
    text-align: center;
    margin-bottom: 12px;
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

  /* Removed wallet selector/dots */

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
    background: rgba(15, 23, 42, 0.9);
    border-radius: 24px 24px 0 0;
    padding: 20px 16px 30px;
    margin: 0 -12px;
    flex: 1;
    min-height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    .rev-transactions {
      min-height: 180px;
      padding: 18px 14px 100px;
    }
  }

  .rev-tx-loading {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    color: rgba(255, 255, 255, 0.5);
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
`;export{ke as PayoutsPage};
