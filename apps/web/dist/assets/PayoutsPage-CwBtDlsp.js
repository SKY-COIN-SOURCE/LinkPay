import{d as g,s as u,L as ue,r as s,j as e,b as B,q as ge,t as J,v as he,C as Q,w as X,k as me}from"./index-BcV6dUao.js";import{T as be}from"./trending-up-DrjNRZJL.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]],I=g("arrow-down-left",ye);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],je=g("arrow-up-right",we);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]],Ne=g("banknote",ve);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],ee=g("building-2",ke);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],ze=g("history",Se);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Pe=g("message-square",Ee);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],T=g("send",_e);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"M17 14h.01",key:"7oqj8z"}],["path",{d:"M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",key:"u1rqew"}]],Ce=g("wallet-minimal",Me);async function z(){const{data:i,error:n}=await u.auth.getUser();if(n||!i.user)throw new Error("Debes iniciar sesión.");return i.user}async function R(i){const r=(await ue.getAll()||[]).reduce((c,d)=>c+(Number(d.earnings)||0),0),{data:l}=await u.from("bio_profiles").select("earnings").eq("user_id",i),v=(l==null?void 0:l.reduce((c,d)=>c+(Number(d.earnings)||0),0))||0,{data:p}=await u.from("profiles").select("referral_earnings").eq("id",i).single(),N=Number((p==null?void 0:p.referral_earnings)||0),t=r+v+N;try{const{data:c,error:d}=await u.from("transactions").select("amount, is_negative, type, status").eq("user_id",i).in("status",["pending","completed"]);if(d||!c)return console.warn("[PayoutService.getBalance] No se pudo leer transactions:",d),t;const h=c.reduce((P,y)=>{const w=Number(y.amount)||0,f=y.is_negative??(y.type==="withdrawal"||y.type==="transfer_out");return P+(f?-w:w)},0);return t+h}catch(c){return console.warn("[PayoutService.getBalance] Error leyendo movimientos:",c),t}}const E={async getBalance(){const i=await z(),n=await R(i.id);return n<0?0:n},async getHistory(){const i=await z();try{const{data:n,error:o}=await u.from("transactions").select("id, type, amount, status, is_negative, created_at").eq("user_id",i.id).order("created_at",{ascending:!1}).limit(40);return o||!n?(console.warn("[PayoutService.getHistory] error",o),[]):n.map(r=>{const l=r.type==="withdrawal"?"withdrawal":"transfer";return{id:r.id,type:l,amount:Number(r.amount)||0,status:r.status||"completed",is_negative:r.is_negative??(r.type==="withdrawal"||r.type==="transfer_out"),date:r.created_at?new Date(r.created_at).toLocaleString():""}})}catch(n){return console.warn("[PayoutService.getHistory] excepción",n),[]}},async requestPayout(i,n,o){if(!i||i<=0)throw new Error("Cantidad inválida.");if(!n||!o)throw new Error("Método o cuenta incompletos.");const r=await z(),l=await R(r.id);if(i>l)throw new Error("Saldo insuficiente.");if(i<(n==="PayPal"?5:n==="Bank"?10:5))throw n==="PayPal"?new Error("El retiro mínimo por PayPal es de €5.00"):n==="Bank"?new Error("El retiro mínimo por transferencia bancaria es de €10.00"):new Error("Cantidad inferior al mínimo disponible.");const{error:p}=await u.from("transactions").insert({user_id:r.id,type:"withdrawal",amount:i,is_negative:!0,status:"pending",meta:{method:n,account:o}});if(p)throw console.error("[PayoutService.requestPayout] error",p),new Error("No se pudo registrar el retiro.")},async sendMoney(i,n){if(!n||n<=0)throw new Error("Cantidad inválida.");if(!i)throw new Error("Email destino requerido.");const o=await z(),r=await R(o.id);if(n>r)throw new Error("Saldo insuficiente.");const{error:l}=await u.rpc("transfer_between_users",{target_email:i,amount_value:n});if(l)throw console.error("[PayoutService.sendMoney] error",l),new Error("No se pudo completar la transferencia.")}},$={isValidEmail:i=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i),isValidIBAN:i=>{const n=i.replace(/\s/g,"").toUpperCase();return n.length<15||n.length>34||!/^[A-Z]{2}/.test(n)?!1:/^[A-Z0-9]+$/.test(n)},isValidCrypto:i=>{const n=/^0x[a-fA-F0-9]{40}$/.test(i),o=/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(i);return n||o}};function Be(){const[i,n]=s.useState(0),[o,r]=s.useState([]),[l,v]=s.useState(!0),[p,N]=s.useState(""),[t,c]=s.useState("PayPal"),[d,h]=s.useState(""),[P,y]=s.useState(""),[w,f]=s.useState(""),[q,H]=s.useState(!1),[ie,_]=s.useState(!1),[k,V]=s.useState(""),[M,F]=s.useState(""),[ne,W]=s.useState(""),[U,j]=s.useState(""),[D,O]=s.useState(!1),[se,C]=s.useState(!1),[m,re]=s.useState({paypal:"",bank:""}),Y=s.useRef(null),G=s.useRef(null),A=5,Z=10,K=t==="PayPal"?A:Z,te=i>=A;s.useEffect(()=>{L()},[]),s.useEffect(()=>{t==="PayPal"&&m.paypal&&h(m.paypal),t==="Bank"&&m.bank&&h(m.bank)},[t,m]);const L=async()=>{try{const[a,x]=await Promise.all([E.getBalance(),E.getHistory()]);n(a),r(x);const{data:{user:S}}=await u.auth.getUser();if(S){const{data:b}=await u.from("profiles").select("paypal_email, bank_details").eq("id",S.id).single();b&&(re({paypal:b.paypal_email||"",bank:b.bank_details||""}),b.paypal_email&&h(b.paypal_email))}}catch(a){console.error("[Finance] loadData error:",a)}finally{v(!1)}},oe=()=>{var a;(a=Y.current)==null||a.scrollIntoView({behavior:"smooth",block:"center"})},le=()=>{var a;(a=G.current)==null||a.scrollIntoView({behavior:"smooth",block:"center"})},de=async()=>{f(""),_(!1);const a=parseFloat(p);if(!p||isNaN(a)||a<=0)return f("Introduce una cantidad válida.");if(a>i)return f("Saldo insuficiente.");if(a<K)return f(`Mínimo ${t==="PayPal"?"PayPal":"transferencia"}: €${K}`);if(t==="PayPal"){if(!$.isValidEmail(d))return f("Introduce un email de PayPal válido.")}else if(!$.isValidIBAN(d))return f("Introduce un IBAN válido.");H(!0);try{await E.requestPayout(a,t,d),_(!0),N(""),L(),setTimeout(()=>_(!1),4e3)}catch(x){f(x.message||"Error al procesar el retiro.")}finally{H(!1)}},ce=async()=>{j(""),C(!1);const a=parseFloat(M);if(!k||!$.isValidEmail(k))return j("Introduce un email válido.");if(!M||isNaN(a)||a<=0)return j("Introduce una cantidad válida.");if(a>i)return j("Saldo insuficiente.");O(!0);try{await E.sendMoney(k,a),C(!0),F(""),V(""),W(""),L(),setTimeout(()=>C(!1),4e3)}catch(x){j(x.message||"Error al enviar.")}finally{O(!1)}};return l?e.jsxs("div",{className:"fin-shell fin-bg",children:[e.jsx("style",{children:ae}),e.jsxs("div",{className:"fin-loading",children:[e.jsx(B,{className:"fin-spin",size:40}),e.jsx("span",{children:"Cargando finanzas..."})]})]}):e.jsxs("div",{className:"fin-shell fin-bg",children:[e.jsx("style",{children:ae}),e.jsxs("div",{className:"fin-container",children:[e.jsxs("section",{className:"fin-hero",children:[e.jsx("div",{className:"fin-hero-glow"}),e.jsxs("div",{className:"fin-hero-badges",children:[e.jsxs("span",{className:"fin-badge fin-badge-primary",children:[e.jsx(Ce,{size:14}),"Billetera global"]}),te&&e.jsxs("span",{className:"fin-badge fin-badge-success",children:[e.jsx(Ne,{size:12}),"Listo para retirar"]})]}),e.jsxs("div",{className:"fin-hero-balance",children:[e.jsx("span",{className:"fin-balance-label",children:"Saldo disponible"}),e.jsxs("div",{className:"fin-balance-row",children:[e.jsx("span",{className:"fin-balance-currency",children:"€"}),e.jsx("span",{className:"fin-balance-amount",children:i.toFixed(2)})]}),e.jsx("p",{className:"fin-balance-sub",children:"Todo lo que has generado con Smart Links y Bio Page, listo para moverse."})]}),e.jsxs("div",{className:"fin-hero-actions",children:[e.jsxs("button",{type:"button",className:"fin-action-btn fin-action-withdraw",onClick:oe,children:[e.jsx(I,{size:18}),"Retirar"]}),e.jsxs("button",{type:"button",className:"fin-action-btn fin-action-send",onClick:le,children:[e.jsx(T,{size:18}),"Enviar"]})]})]}),e.jsxs("div",{className:"fin-grid",children:[e.jsxs("div",{className:"fin-forms",children:[e.jsxs("section",{ref:Y,className:"fin-card fin-card-form",children:[e.jsxs("div",{className:"fin-card-header",children:[e.jsx("div",{className:"fin-card-icon fin-icon-withdraw",children:e.jsx(I,{size:20})}),e.jsxs("div",{children:[e.jsx("h3",{children:"Solicitar retiro"}),e.jsx("span",{className:"fin-card-tag",children:"Salida hacia tu cuenta"})]})]}),e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"Cantidad"}),e.jsxs("div",{className:"fin-input-wrap",children:[e.jsx("span",{className:"fin-input-prefix",children:"€"}),e.jsx("input",{type:"number",inputMode:"decimal",value:p,onChange:a=>N(a.target.value),placeholder:"0.00",className:"fin-input fin-input-amount"})]}),e.jsxs("p",{className:"fin-hint",children:["Mínimo PayPal: ",e.jsxs("strong",{children:["€",A]})," · Transferencia: ",e.jsxs("strong",{children:["€",Z]})]})]}),e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"Método de retiro"}),e.jsxs("div",{className:"fin-toggle-group",children:[e.jsxs("button",{type:"button",className:`fin-toggle ${t==="PayPal"?"is-active":""}`,onClick:()=>c("PayPal"),children:[e.jsx(ge,{size:16}),"PayPal"]}),e.jsxs("button",{type:"button",className:`fin-toggle ${t==="Bank"?"is-active":""}`,onClick:()=>c("Bank"),children:[e.jsx(ee,{size:16}),"Transferencia"]})]})]}),t==="PayPal"?e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"Email de PayPal"}),e.jsxs("div",{className:"fin-input-wrap",children:[e.jsx("span",{className:"fin-input-prefix",children:e.jsx(J,{size:16})}),e.jsx("input",{type:"email",value:d,onChange:a=>h(a.target.value),placeholder:"tu@email.com",className:"fin-input fin-input-icon"})]}),m.paypal&&e.jsx("p",{className:"fin-hint fin-hint-ok",children:"✓ Autocompletado desde Ajustes"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"IBAN"}),e.jsxs("div",{className:"fin-input-wrap",children:[e.jsx("span",{className:"fin-input-prefix",children:e.jsx(ee,{size:16})}),e.jsx("input",{type:"text",value:d,onChange:a=>h(a.target.value.toUpperCase()),placeholder:"ES91 2100 0418 4502 0005 1332",className:"fin-input fin-input-icon"})]}),m.bank&&e.jsx("p",{className:"fin-hint fin-hint-ok",children:"✓ Autocompletado desde Ajustes"})]}),e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"Titular de la cuenta"}),e.jsxs("div",{className:"fin-input-wrap",children:[e.jsx("span",{className:"fin-input-prefix",children:e.jsx(he,{size:16})}),e.jsx("input",{type:"text",value:P,onChange:a=>y(a.target.value),placeholder:"Nombre completo",className:"fin-input fin-input-icon"})]})]})]}),w&&e.jsxs("div",{className:"fin-alert fin-alert-error",children:[e.jsx(Q,{size:16}),w]}),ie&&e.jsxs("div",{className:"fin-alert fin-alert-success",children:[e.jsx(X,{size:16}),"¡Retiro solicitado correctamente!"]}),e.jsx("button",{type:"button",onClick:de,disabled:q,className:"fin-btn-primary",children:q?e.jsxs(e.Fragment,{children:[e.jsx(B,{className:"fin-spin",size:18})," Procesando..."]}):"Confirmar retiro"})]}),e.jsxs("section",{ref:G,className:"fin-card fin-card-form",children:[e.jsxs("div",{className:"fin-card-header",children:[e.jsx("div",{className:"fin-card-icon fin-icon-send",children:e.jsx(T,{size:20})}),e.jsxs("div",{children:[e.jsx("h3",{children:"Enviar a otro usuario"}),e.jsx("span",{className:"fin-card-tag",children:"Transferencia interna"})]})]}),e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"Email del destinatario"}),e.jsxs("div",{className:"fin-input-wrap",children:[e.jsx("span",{className:"fin-input-prefix",children:e.jsx(J,{size:16})}),e.jsx("input",{type:"email",value:k,onChange:a=>V(a.target.value),placeholder:"amigo@linkpay.io",className:"fin-input fin-input-icon"})]})]}),e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"Cantidad"}),e.jsxs("div",{className:"fin-input-wrap",children:[e.jsx("span",{className:"fin-input-prefix",children:"€"}),e.jsx("input",{type:"number",inputMode:"decimal",value:M,onChange:a=>F(a.target.value),placeholder:"0.00",className:"fin-input fin-input-amount"})]})]}),e.jsxs("div",{className:"fin-field",children:[e.jsx("label",{children:"Nota (opcional)"}),e.jsxs("div",{className:"fin-input-wrap",children:[e.jsx("span",{className:"fin-input-prefix",children:e.jsx(Pe,{size:16})}),e.jsx("input",{type:"text",value:ne,onChange:a=>W(a.target.value),placeholder:"¡Gracias por tu ayuda!",className:"fin-input fin-input-icon"})]})]}),U&&e.jsxs("div",{className:"fin-alert fin-alert-error",children:[e.jsx(Q,{size:16}),U]}),se&&e.jsxs("div",{className:"fin-alert fin-alert-success",children:[e.jsx(X,{size:16}),"¡Envío completado!"]}),e.jsx("button",{type:"button",onClick:ce,disabled:D,className:"fin-btn-primary fin-btn-send",children:D?e.jsxs(e.Fragment,{children:[e.jsx(B,{className:"fin-spin",size:18})," Enviando..."]}):e.jsxs(e.Fragment,{children:[e.jsx(T,{size:16}),"Enviar dinero"]})})]})]}),e.jsxs("section",{className:"fin-card fin-card-activity",children:[e.jsxs("div",{className:"fin-card-header",children:[e.jsx("div",{className:"fin-card-icon fin-icon-history",children:e.jsx(ze,{size:20})}),e.jsxs("div",{children:[e.jsx("h3",{children:"Actividad financiera"}),e.jsx("span",{className:"fin-card-tag",children:"Historial de movimientos"})]})]}),o.length===0?e.jsxs("div",{className:"fin-empty",children:[e.jsx(be,{size:32,className:"fin-empty-icon"}),e.jsx("p",{className:"fin-empty-title",children:"Sin movimientos aún"}),e.jsx("p",{className:"fin-empty-sub",children:"Cuando realices tu primer retiro o envío, aparecerá aquí."})]}):e.jsx("div",{className:"fin-timeline",children:o.map(a=>{const x=a.is_negative,S=a.type==="transfer"?"fin-tx-send":"fin-tx-withdraw",b=a.type==="transfer"?je:I,pe=a.type==="withdrawal"?"Retiro":x?"Envío":"Recibido",fe=a.status==="pending"?"fin-status-pending":a.status==="failed"?"fin-status-failed":"fin-status-ok",xe=a.status==="pending"?"Pendiente":a.status==="failed"?"Rechazado":"Completado";return e.jsxs("div",{className:"fin-tx-item",children:[e.jsxs("div",{className:"fin-tx-left",children:[e.jsx("div",{className:`fin-tx-avatar ${S}`,children:e.jsx(b,{size:16})}),e.jsxs("div",{className:"fin-tx-info",children:[e.jsx("span",{className:"fin-tx-label",children:pe}),e.jsxs("span",{className:"fin-tx-date",children:[e.jsx(me,{size:10})," ",a.date]})]})]}),e.jsxs("div",{className:"fin-tx-right",children:[e.jsxs("span",{className:`fin-tx-amount ${x?"is-out":"is-in"}`,children:[x?"-":"+","€",Number(a.amount).toFixed(2)]}),e.jsx("span",{className:`fin-status-pill ${fe}`,children:xe})]})]},a.id)})})]})]})]})]})}const ae=`
  /* ─── ANIMATIONS ─────────────────────────────────────────────────────────── */
  .fin-spin { animation: fin-spin 1s linear infinite; }
  @keyframes fin-spin { 100% { transform: rotate(360deg); } }

  @keyframes fin-glow-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }

  @keyframes fin-fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ─── SHELL & BACKGROUND ─────────────────────────────────────────────────── */
  .fin-bg {
    min-height: 100dvh;
    background: 
      radial-gradient(ellipse at 0% 0%, rgba(30, 58, 138, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 100%, rgba(79, 70, 229, 0.15) 0%, transparent 50%),
      #020617;
    position: relative;
  }

  .fin-shell {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    z-index: 1;
  }

  @media (min-width: 769px) {
    .fin-shell { left: 260px; }
  }

  .fin-container {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 16px 100px;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
    color: #e5e7eb;
    animation: fin-fade-in 0.4s ease-out;
  }

  .fin-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 16px;
    color: #818cf8;
    font-size: 14px;
    font-weight: 500;
  }

  /* ─── HERO WALLET CARD ───────────────────────────────────────────────────── */
  .fin-hero {
    position: relative;
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.6) 0%, rgba(15, 23, 42, 0.95) 100%);
    border: 1px solid rgba(129, 140, 248, 0.3);
    border-radius: 24px;
    padding: 28px 24px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 
      0 20px 50px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .fin-hero-glow {
    position: absolute;
    top: -50%;
    right: -30%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%);
    pointer-events: none;
    animation: fin-glow-pulse 6s ease-in-out infinite;
  }

  .fin-hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  .fin-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .fin-badge-primary {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(129, 140, 248, 0.5);
    color: #c7d2fe;
  }

  .fin-badge-success {
    background: rgba(22, 163, 74, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.5);
    color: #86efac;
  }

  .fin-hero-balance {
    position: relative;
    z-index: 1;
  }

  .fin-balance-label {
    display: block;
    font-size: 13px;
    color: #94a3b8;
    margin-bottom: 4px;
  }

  .fin-balance-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .fin-balance-currency {
    font-size: 28px;
    font-weight: 600;
    color: #a5b4fc;
  }

  .fin-balance-amount {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #f9fafb;
    text-shadow: 0 0 40px rgba(129, 140, 248, 0.3);
  }

  .fin-balance-sub {
    margin: 8px 0 0;
    font-size: 13px;
    color: #94a3b8;
    max-width: 320px;
  }

  .fin-hero-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    position: relative;
    z-index: 1;
  }

  .fin-action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 20px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  .fin-action-withdraw {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%);
    color: #fff;
    box-shadow: 0 8px 24px rgba(79, 70, 229, 0.4);
  }

  .fin-action-withdraw:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(79, 70, 229, 0.5);
  }

  .fin-action-send {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(129, 140, 248, 0.4);
    color: #c7d2fe;
  }

  .fin-action-send:hover {
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(129, 140, 248, 0.6);
    transform: translateY(-2px);
  }

  /* ─── GRID LAYOUT ────────────────────────────────────────────────────────── */
  .fin-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .fin-forms {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (min-width: 900px) {
    .fin-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 24px;
    }
  }

  /* ─── CARDS ──────────────────────────────────────────────────────────────── */
  .fin-card {
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(100, 116, 139, 0.25);
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .fin-card:hover {
    border-color: rgba(129, 140, 248, 0.3);
  }

  .fin-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .fin-card-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #f1f5f9;
  }

  .fin-card-tag {
    display: block;
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
  }

  .fin-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .fin-icon-withdraw {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%);
    color: #a5b4fc;
    border: 1px solid rgba(129, 140, 248, 0.3);
  }

  .fin-icon-send {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(96, 165, 250, 0.2) 100%);
    color: #93c5fd;
    border: 1px solid rgba(96, 165, 250, 0.3);
  }

  .fin-icon-history {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(192, 132, 252, 0.2) 100%);
    color: #d8b4fe;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  /* ─── FORM FIELDS ────────────────────────────────────────────────────────── */
  .fin-field {
    margin-bottom: 16px;
  }

  .fin-field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .fin-input-wrap {
    position: relative;
  }

  .fin-input-prefix {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #64748b;
    pointer-events: none;
  }

  .fin-input {
    width: 100%;
    padding: 14px 14px 14px 14px;
    border-radius: 12px;
    border: 1px solid rgba(100, 116, 139, 0.3);
    background: rgba(2, 6, 23, 0.6);
    color: #e5e7eb;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .fin-input-amount {
    padding-left: 32px;
    font-size: 20px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .fin-input-icon {
    padding-left: 44px;
  }

  .fin-input::placeholder {
    color: #475569;
  }

  .fin-input:focus {
    border-color: rgba(129, 140, 248, 0.6);
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.15);
  }

  .fin-hint {
    margin: 6px 0 0;
    font-size: 12px;
    color: #64748b;
  }

  .fin-hint-ok {
    color: #4ade80;
  }

  /* ─── TOGGLE GROUP ───────────────────────────────────────────────────────── */
  .fin-toggle-group {
    display: flex;
    gap: 8px;
  }

  .fin-toggle {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(100, 116, 139, 0.3);
    background: rgba(2, 6, 23, 0.6);
    color: #94a3b8;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .fin-toggle:hover {
    background: rgba(79, 70, 229, 0.1);
    border-color: rgba(129, 140, 248, 0.4);
  }

  .fin-toggle.is-active {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%);
    border-color: rgba(129, 140, 248, 0.6);
    color: #e0e7ff;
    box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.3);
  }

  /* ─── ALERTS ─────────────────────────────────────────────────────────────── */
  .fin-alert {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 16px;
    animation: fin-fade-in 0.3s ease-out;
  }

  .fin-alert-error {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #fca5a5;
  }

  .fin-alert-success {
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.4);
    color: #86efac;
  }

  /* ─── BUTTONS ────────────────────────────────────────────────────────────── */
  .fin-btn-primary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 24px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 
      0 8px 24px rgba(79, 70, 229, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;
  }

  .fin-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 32px rgba(79, 70, 229, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .fin-btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .fin-btn-send {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    box-shadow: 
      0 8px 24px rgba(59, 130, 246, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .fin-btn-send:hover:not(:disabled) {
    box-shadow: 
      0 12px 32px rgba(59, 130, 246, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* ─── ACTIVITY TIMELINE ──────────────────────────────────────────────────── */
  .fin-card-activity {
    min-height: 300px;
  }

  .fin-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
    border: 1px dashed rgba(100, 116, 139, 0.3);
    border-radius: 16px;
    background: rgba(2, 6, 23, 0.4);
  }

  .fin-empty-icon {
    color: #475569;
    margin-bottom: 12px;
  }

  .fin-empty-title {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 600;
    color: #94a3b8;
  }

  .fin-empty-sub {
    margin: 0;
    font-size: 12px;
    color: #64748b;
  }

  .fin-timeline {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .fin-tx-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 12px;
    border-radius: 14px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(51, 65, 85, 0.4);
    transition: background 0.2s, border-color 0.2s;
  }

  .fin-tx-item:hover {
    background: rgba(51, 65, 85, 0.4);
    border-color: rgba(100, 116, 139, 0.4);
  }

  .fin-tx-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .fin-tx-avatar {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .fin-tx-withdraw {
    background: rgba(100, 116, 139, 0.2);
    border: 1px solid rgba(148, 163, 184, 0.3);
    color: #cbd5e1;
  }

  .fin-tx-send {
    background: rgba(59, 130, 246, 0.15);
    border: 1px solid rgba(96, 165, 250, 0.3);
    color: #93c5fd;
  }

  .fin-tx-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .fin-tx-label {
    font-size: 14px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .fin-tx-date {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #64748b;
  }

  .fin-tx-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .fin-tx-amount {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 15px;
    font-weight: 700;
  }

  .fin-tx-amount.is-out { color: #f87171; }
  .fin-tx-amount.is-in { color: #4ade80; }

  .fin-status-pill {
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .fin-status-pending {
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.4);
    color: #fbbf24;
  }

  .fin-status-ok {
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.4);
    color: #4ade80;
  }

  .fin-status-failed {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #f87171;
  }

  /* ─── MOBILE ADJUSTMENTS ─────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .fin-shell { left: 0; }
    
    .fin-container {
      padding: 16px 12px 100px;
    }

    .fin-hero {
      padding: 24px 20px;
      border-radius: 20px;
    }

    .fin-balance-amount {
      font-size: 42px;
    }

    .fin-hero-actions {
      flex-direction: column;
    }

    .fin-action-btn {
      padding: 16px 20px;
    }

    .fin-card {
      padding: 20px 16px;
      border-radius: 16px;
    }

    .fin-tx-item {
      padding: 12px 10px;
    }
  }
`;export{Be as PayoutsPage};
