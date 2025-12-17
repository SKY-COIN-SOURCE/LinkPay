import{c as V,R as A,j as e,E as Se,u as ns,w as ls,x as rs,r as E,s as I,v as os,U as ce,W as ze,B as de,g as pe,y as Ne,z as cs,h as J,p as ds,G as ps,X as ye,D as hs,F as us,Z as ms,T as Ce,H as ne,I as le,J as gs}from"./index-Dxh3r0nY.js";import{E as Pe,P as he,a as fs}from"./plus-Bo51firE.js";import{P as xs}from"./PremiumLoader-BOk8w8vh.js";/* empty css                          */import{S as Re}from"./shield-8O9fNG3u.js";import{C as ke}from"./copy-C9V9IgkZ.js";import{D as vs}from"./dollar-sign-CEDKOsjp.js";import{K as bs}from"./key-C2UGKjX7.js";import{T as re}from"./trash-2-sbawX-tY.js";import"./proxy-k4Mbx_EL.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],_e=V("circle-question-mark",js);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=[["path",{d:"M10 18v-7",key:"wt116b"}],["path",{d:"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",key:"1m329m"}],["path",{d:"M14 18v-7",key:"vav6t3"}],["path",{d:"M18 18v-7",key:"aexdmj"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M6 18v-7",key:"1ivflk"}]],Ns=V("landmark",ws);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],Cs=V("moon",ys);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ks=[["path",{d:"M12 22v-5",key:"1ega77"}],["path",{d:"M9 8V2",key:"14iosj"}],["path",{d:"M15 8V2",key:"18g5xt"}],["path",{d:"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z",key:"osxo6l"}]],Ie=V("plug",ks);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],Ee=V("save",Es);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Ms=V("sun",As);var Ss=Object.defineProperty,ie=Object.getOwnPropertySymbols,Le=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable,Ae=(d,l,r)=>l in d?Ss(d,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):d[l]=r,ue=(d,l)=>{for(var r in l||(l={}))Le.call(l,r)&&Ae(d,r,l[r]);if(ie)for(var r of ie(l))Te.call(l,r)&&Ae(d,r,l[r]);return d},me=(d,l)=>{var r={};for(var h in d)Le.call(d,h)&&l.indexOf(h)<0&&(r[h]=d[h]);if(d!=null&&ie)for(var h of ie(d))l.indexOf(h)<0&&Te.call(d,h)&&(r[h]=d[h]);return r};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var B;(d=>{const l=class j{constructor(s,t,a,n){if(this.version=s,this.errorCorrectionLevel=t,this.modules=[],this.isFunction=[],s<j.MIN_VERSION||s>j.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=s*4+17;let i=[];for(let c=0;c<this.size;c++)i.push(!1);for(let c=0;c<this.size;c++)this.modules.push(i.slice()),this.isFunction.push(i.slice());this.drawFunctionPatterns();const p=this.addEccAndInterleave(a);if(this.drawCodewords(p),n==-1){let c=1e9;for(let v=0;v<8;v++){this.applyMask(v),this.drawFormatBits(v);const f=this.getPenaltyScore();f<c&&(n=v,c=f),this.applyMask(v)}}g(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(s,t){const a=d.QrSegment.makeSegments(s);return j.encodeSegments(a,t)}static encodeBinary(s,t){const a=d.QrSegment.makeBytes(s);return j.encodeSegments([a],t)}static encodeSegments(s,t,a=1,n=40,i=-1,p=!0){if(!(j.MIN_VERSION<=a&&a<=n&&n<=j.MAX_VERSION)||i<-1||i>7)throw new RangeError("Invalid value");let c,v;for(c=a;;c++){const x=j.getNumDataCodewords(c,t)*8,N=m.getTotalBits(s,c);if(N<=x){v=N;break}if(c>=n)throw new RangeError("Data too long")}for(const x of[j.Ecc.MEDIUM,j.Ecc.QUARTILE,j.Ecc.HIGH])p&&v<=j.getNumDataCodewords(c,x)*8&&(t=x);let f=[];for(const x of s){r(x.mode.modeBits,4,f),r(x.numChars,x.mode.numCharCountBits(c),f);for(const N of x.getData())f.push(N)}g(f.length==v);const S=j.getNumDataCodewords(c,t)*8;g(f.length<=S),r(0,Math.min(4,S-f.length),f),r(0,(8-f.length%8)%8,f),g(f.length%8==0);for(let x=236;f.length<S;x^=253)r(x,8,f);let k=[];for(;k.length*8<f.length;)k.push(0);return f.forEach((x,N)=>k[N>>>3]|=x<<7-(N&7)),new j(c,t,k,i)}getModule(s,t){return 0<=s&&s<this.size&&0<=t&&t<this.size&&this.modules[t][s]}getModules(){return this.modules}drawFunctionPatterns(){for(let a=0;a<this.size;a++)this.setFunctionModule(6,a,a%2==0),this.setFunctionModule(a,6,a%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const s=this.getAlignmentPatternPositions(),t=s.length;for(let a=0;a<t;a++)for(let n=0;n<t;n++)a==0&&n==0||a==0&&n==t-1||a==t-1&&n==0||this.drawAlignmentPattern(s[a],s[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(s){const t=this.errorCorrectionLevel.formatBits<<3|s;let a=t;for(let i=0;i<10;i++)a=a<<1^(a>>>9)*1335;const n=(t<<10|a)^21522;g(n>>>15==0);for(let i=0;i<=5;i++)this.setFunctionModule(8,i,h(n,i));this.setFunctionModule(8,7,h(n,6)),this.setFunctionModule(8,8,h(n,7)),this.setFunctionModule(7,8,h(n,8));for(let i=9;i<15;i++)this.setFunctionModule(14-i,8,h(n,i));for(let i=0;i<8;i++)this.setFunctionModule(this.size-1-i,8,h(n,i));for(let i=8;i<15;i++)this.setFunctionModule(8,this.size-15+i,h(n,i));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let s=this.version;for(let a=0;a<12;a++)s=s<<1^(s>>>11)*7973;const t=this.version<<12|s;g(t>>>18==0);for(let a=0;a<18;a++){const n=h(t,a),i=this.size-11+a%3,p=Math.floor(a/3);this.setFunctionModule(i,p,n),this.setFunctionModule(p,i,n)}}drawFinderPattern(s,t){for(let a=-4;a<=4;a++)for(let n=-4;n<=4;n++){const i=Math.max(Math.abs(n),Math.abs(a)),p=s+n,c=t+a;0<=p&&p<this.size&&0<=c&&c<this.size&&this.setFunctionModule(p,c,i!=2&&i!=4)}}drawAlignmentPattern(s,t){for(let a=-2;a<=2;a++)for(let n=-2;n<=2;n++)this.setFunctionModule(s+n,t+a,Math.max(Math.abs(n),Math.abs(a))!=1)}setFunctionModule(s,t,a){this.modules[t][s]=a,this.isFunction[t][s]=!0}addEccAndInterleave(s){const t=this.version,a=this.errorCorrectionLevel;if(s.length!=j.getNumDataCodewords(t,a))throw new RangeError("Invalid argument");const n=j.NUM_ERROR_CORRECTION_BLOCKS[a.ordinal][t],i=j.ECC_CODEWORDS_PER_BLOCK[a.ordinal][t],p=Math.floor(j.getNumRawDataModules(t)/8),c=n-p%n,v=Math.floor(p/n);let f=[];const S=j.reedSolomonComputeDivisor(i);for(let x=0,N=0;x<n;x++){let M=s.slice(N,N+v-i+(x<c?0:1));N+=M.length;const T=j.reedSolomonComputeRemainder(M,S);x<c&&M.push(0),f.push(M.concat(T))}let k=[];for(let x=0;x<f[0].length;x++)f.forEach((N,M)=>{(x!=v-i||M>=c)&&k.push(N[x])});return g(k.length==p),k}drawCodewords(s){if(s.length!=Math.floor(j.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let t=0;for(let a=this.size-1;a>=1;a-=2){a==6&&(a=5);for(let n=0;n<this.size;n++)for(let i=0;i<2;i++){const p=a-i,v=(a+1&2)==0?this.size-1-n:n;!this.isFunction[v][p]&&t<s.length*8&&(this.modules[v][p]=h(s[t>>>3],7-(t&7)),t++)}}g(t==s.length*8)}applyMask(s){if(s<0||s>7)throw new RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let a=0;a<this.size;a++){let n;switch(s){case 0:n=(a+t)%2==0;break;case 1:n=t%2==0;break;case 2:n=a%3==0;break;case 3:n=(a+t)%3==0;break;case 4:n=(Math.floor(a/3)+Math.floor(t/2))%2==0;break;case 5:n=a*t%2+a*t%3==0;break;case 6:n=(a*t%2+a*t%3)%2==0;break;case 7:n=((a+t)%2+a*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][a]&&n&&(this.modules[t][a]=!this.modules[t][a])}}getPenaltyScore(){let s=0;for(let i=0;i<this.size;i++){let p=!1,c=0,v=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[i][f]==p?(c++,c==5?s+=j.PENALTY_N1:c>5&&s++):(this.finderPenaltyAddHistory(c,v),p||(s+=this.finderPenaltyCountPatterns(v)*j.PENALTY_N3),p=this.modules[i][f],c=1);s+=this.finderPenaltyTerminateAndCount(p,c,v)*j.PENALTY_N3}for(let i=0;i<this.size;i++){let p=!1,c=0,v=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[f][i]==p?(c++,c==5?s+=j.PENALTY_N1:c>5&&s++):(this.finderPenaltyAddHistory(c,v),p||(s+=this.finderPenaltyCountPatterns(v)*j.PENALTY_N3),p=this.modules[f][i],c=1);s+=this.finderPenaltyTerminateAndCount(p,c,v)*j.PENALTY_N3}for(let i=0;i<this.size-1;i++)for(let p=0;p<this.size-1;p++){const c=this.modules[i][p];c==this.modules[i][p+1]&&c==this.modules[i+1][p]&&c==this.modules[i+1][p+1]&&(s+=j.PENALTY_N2)}let t=0;for(const i of this.modules)t=i.reduce((p,c)=>p+(c?1:0),t);const a=this.size*this.size,n=Math.ceil(Math.abs(t*20-a*10)/a)-1;return g(0<=n&&n<=9),s+=n*j.PENALTY_N4,g(0<=s&&s<=2568888),s}getAlignmentPatternPositions(){if(this.version==1)return[];{const s=Math.floor(this.version/7)+2,t=this.version==32?26:Math.ceil((this.version*4+4)/(s*2-2))*2;let a=[6];for(let n=this.size-7;a.length<s;n-=t)a.splice(1,0,n);return a}}static getNumRawDataModules(s){if(s<j.MIN_VERSION||s>j.MAX_VERSION)throw new RangeError("Version number out of range");let t=(16*s+128)*s+64;if(s>=2){const a=Math.floor(s/7)+2;t-=(25*a-10)*a-55,s>=7&&(t-=36)}return g(208<=t&&t<=29648),t}static getNumDataCodewords(s,t){return Math.floor(j.getNumRawDataModules(s)/8)-j.ECC_CODEWORDS_PER_BLOCK[t.ordinal][s]*j.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][s]}static reedSolomonComputeDivisor(s){if(s<1||s>255)throw new RangeError("Degree out of range");let t=[];for(let n=0;n<s-1;n++)t.push(0);t.push(1);let a=1;for(let n=0;n<s;n++){for(let i=0;i<t.length;i++)t[i]=j.reedSolomonMultiply(t[i],a),i+1<t.length&&(t[i]^=t[i+1]);a=j.reedSolomonMultiply(a,2)}return t}static reedSolomonComputeRemainder(s,t){let a=t.map(n=>0);for(const n of s){const i=n^a.shift();a.push(0),t.forEach((p,c)=>a[c]^=j.reedSolomonMultiply(p,i))}return a}static reedSolomonMultiply(s,t){if(s>>>8||t>>>8)throw new RangeError("Byte out of range");let a=0;for(let n=7;n>=0;n--)a=a<<1^(a>>>7)*285,a^=(t>>>n&1)*s;return g(a>>>8==0),a}finderPenaltyCountPatterns(s){const t=s[1];g(t<=this.size*3);const a=t>0&&s[2]==t&&s[3]==t*3&&s[4]==t&&s[5]==t;return(a&&s[0]>=t*4&&s[6]>=t?1:0)+(a&&s[6]>=t*4&&s[0]>=t?1:0)}finderPenaltyTerminateAndCount(s,t,a){return s&&(this.finderPenaltyAddHistory(t,a),t=0),t+=this.size,this.finderPenaltyAddHistory(t,a),this.finderPenaltyCountPatterns(a)}finderPenaltyAddHistory(s,t){t[0]==0&&(s+=this.size),t.pop(),t.unshift(s)}};l.MIN_VERSION=1,l.MAX_VERSION=40,l.PENALTY_N1=3,l.PENALTY_N2=3,l.PENALTY_N3=40,l.PENALTY_N4=10,l.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],l.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],d.QrCode=l;function r(b,s,t){if(s<0||s>31||b>>>s)throw new RangeError("Value out of range");for(let a=s-1;a>=0;a--)t.push(b>>>a&1)}function h(b,s){return(b>>>s&1)!=0}function g(b){if(!b)throw new Error("Assertion error")}const u=class C{constructor(s,t,a){if(this.mode=s,this.numChars=t,this.bitData=a,t<0)throw new RangeError("Invalid argument");this.bitData=a.slice()}static makeBytes(s){let t=[];for(const a of s)r(a,8,t);return new C(C.Mode.BYTE,s.length,t)}static makeNumeric(s){if(!C.isNumeric(s))throw new RangeError("String contains non-numeric characters");let t=[];for(let a=0;a<s.length;){const n=Math.min(s.length-a,3);r(parseInt(s.substring(a,a+n),10),n*3+1,t),a+=n}return new C(C.Mode.NUMERIC,s.length,t)}static makeAlphanumeric(s){if(!C.isAlphanumeric(s))throw new RangeError("String contains unencodable characters in alphanumeric mode");let t=[],a;for(a=0;a+2<=s.length;a+=2){let n=C.ALPHANUMERIC_CHARSET.indexOf(s.charAt(a))*45;n+=C.ALPHANUMERIC_CHARSET.indexOf(s.charAt(a+1)),r(n,11,t)}return a<s.length&&r(C.ALPHANUMERIC_CHARSET.indexOf(s.charAt(a)),6,t),new C(C.Mode.ALPHANUMERIC,s.length,t)}static makeSegments(s){return s==""?[]:C.isNumeric(s)?[C.makeNumeric(s)]:C.isAlphanumeric(s)?[C.makeAlphanumeric(s)]:[C.makeBytes(C.toUtf8ByteArray(s))]}static makeEci(s){let t=[];if(s<0)throw new RangeError("ECI assignment value out of range");if(s<128)r(s,8,t);else if(s<16384)r(2,2,t),r(s,14,t);else if(s<1e6)r(6,3,t),r(s,21,t);else throw new RangeError("ECI assignment value out of range");return new C(C.Mode.ECI,0,t)}static isNumeric(s){return C.NUMERIC_REGEX.test(s)}static isAlphanumeric(s){return C.ALPHANUMERIC_REGEX.test(s)}getData(){return this.bitData.slice()}static getTotalBits(s,t){let a=0;for(const n of s){const i=n.mode.numCharCountBits(t);if(n.numChars>=1<<i)return 1/0;a+=4+i+n.bitData.length}return a}static toUtf8ByteArray(s){s=encodeURI(s);let t=[];for(let a=0;a<s.length;a++)s.charAt(a)!="%"?t.push(s.charCodeAt(a)):(t.push(parseInt(s.substring(a+1,a+3),16)),a+=2);return t}};u.NUMERIC_REGEX=/^[0-9]*$/,u.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,u.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let m=u;d.QrSegment=u})(B||(B={}));(d=>{(l=>{const r=class{constructor(g,u){this.ordinal=g,this.formatBits=u}};r.LOW=new r(0,1),r.MEDIUM=new r(1,0),r.QUARTILE=new r(2,3),r.HIGH=new r(3,2),l.Ecc=r})(d.QrCode||(d.QrCode={}))})(B||(B={}));(d=>{(l=>{const r=class{constructor(g,u){this.modeBits=g,this.numBitsCharCount=u}numCharCountBits(g){return this.numBitsCharCount[Math.floor((g+7)/17)]}};r.NUMERIC=new r(1,[10,12,14]),r.ALPHANUMERIC=new r(2,[9,11,13]),r.BYTE=new r(4,[8,16,16]),r.KANJI=new r(8,[8,10,12]),r.ECI=new r(7,[0,0,0]),l.Mode=r})(d.QrSegment||(d.QrSegment={}))})(B||(B={}));var H=B;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var zs={L:H.QrCode.Ecc.LOW,M:H.QrCode.Ecc.MEDIUM,Q:H.QrCode.Ecc.QUARTILE,H:H.QrCode.Ecc.HIGH},Oe=128,Fe="L",De="#FFFFFF",Ue="#000000",Be=!1,$e=1,Ps=4,Rs=0,_s=.1;function Qe(d,l=0){const r=[];return d.forEach(function(h,g){let u=null;h.forEach(function(m,b){if(!m&&u!==null){r.push(`M${u+l} ${g+l}h${b-u}v1H${u+l}z`),u=null;return}if(b===h.length-1){if(!m)return;u===null?r.push(`M${b+l},${g+l} h1v1H${b+l}z`):r.push(`M${u+l},${g+l} h${b+1-u}v1H${u+l}z`);return}m&&u===null&&(u=b)})}),r.join("")}function Ke(d,l){return d.slice().map((r,h)=>h<l.y||h>=l.y+l.h?r:r.map((g,u)=>u<l.x||u>=l.x+l.w?g:!1))}function Is(d,l,r,h){if(h==null)return null;const g=d.length+r*2,u=Math.floor(l*_s),m=g/l,b=(h.width||u)*m,s=(h.height||u)*m,t=h.x==null?d.length/2-b/2:h.x*m,a=h.y==null?d.length/2-s/2:h.y*m,n=h.opacity==null?1:h.opacity;let i=null;if(h.excavate){let c=Math.floor(t),v=Math.floor(a),f=Math.ceil(b+t-c),S=Math.ceil(s+a-v);i={x:c,y:v,w:f,h:S}}const p=h.crossOrigin;return{x:t,y:a,h:s,w:b,excavation:i,opacity:n,crossOrigin:p}}function Ls(d,l){return l!=null?Math.max(Math.floor(l),0):d?Ps:Rs}function Ge({value:d,level:l,minVersion:r,includeMargin:h,marginSize:g,imageSettings:u,size:m,boostLevel:b}){let s=A.useMemo(()=>{const c=(Array.isArray(d)?d:[d]).reduce((v,f)=>(v.push(...H.QrSegment.makeSegments(f)),v),[]);return H.QrCode.encodeSegments(c,zs[l],r,void 0,void 0,b)},[d,l,r,b]);const{cells:t,margin:a,numCells:n,calculatedImageSettings:i}=A.useMemo(()=>{let p=s.getModules();const c=Ls(h,g),v=p.length+c*2,f=Is(p,m,c,u);return{cells:p,margin:c,numCells:v,calculatedImageSettings:f}},[s,m,u,h,g]);return{qrcode:s,margin:a,cells:t,numCells:n,calculatedImageSettings:i}}var Ts=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Os=A.forwardRef(function(l,r){const h=l,{value:g,size:u=Oe,level:m=Fe,bgColor:b=De,fgColor:s=Ue,includeMargin:t=Be,minVersion:a=$e,boostLevel:n,marginSize:i,imageSettings:p}=h,v=me(h,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:f}=v,S=me(v,["style"]),k=p==null?void 0:p.src,x=A.useRef(null),N=A.useRef(null),M=A.useCallback(R=>{x.current=R,typeof r=="function"?r(R):r&&(r.current=R)},[r]),[T,$]=A.useState(!1),{margin:O,cells:Y,numCells:Q,calculatedImageSettings:z}=Ge({value:g,level:m,minVersion:a,boostLevel:n,includeMargin:t,marginSize:i,imageSettings:p,size:u});A.useEffect(()=>{if(x.current!=null){const R=x.current,P=R.getContext("2d");if(!P)return;let X=Y;const F=N.current,W=z!=null&&F!==null&&F.complete&&F.naturalHeight!==0&&F.naturalWidth!==0;W&&z.excavation!=null&&(X=Ke(Y,z.excavation));const K=window.devicePixelRatio||1;R.height=R.width=u*K;const q=u/Q*K;P.scale(q,q),P.fillStyle=b,P.fillRect(0,0,Q,Q),P.fillStyle=s,Ts?P.fill(new Path2D(Qe(X,O))):Y.forEach(function(Z,te){Z.forEach(function(D,U){D&&P.fillRect(U+O,te+O,1,1)})}),z&&(P.globalAlpha=z.opacity),W&&P.drawImage(F,z.x+O,z.y+O,z.w,z.h)}}),A.useEffect(()=>{$(!1)},[k]);const ee=ue({height:u,width:u},f);let se=null;return k!=null&&(se=A.createElement("img",{src:k,key:k,style:{display:"none"},onLoad:()=>{$(!0)},ref:N,crossOrigin:z==null?void 0:z.crossOrigin})),A.createElement(A.Fragment,null,A.createElement("canvas",ue({style:ee,height:u,width:u,ref:M,role:"img"},S)),se)});Os.displayName="QRCodeCanvas";var He=A.forwardRef(function(l,r){const h=l,{value:g,size:u=Oe,level:m=Fe,bgColor:b=De,fgColor:s=Ue,includeMargin:t=Be,minVersion:a=$e,boostLevel:n,title:i,marginSize:p,imageSettings:c}=h,v=me(h,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:f,cells:S,numCells:k,calculatedImageSettings:x}=Ge({value:g,level:m,minVersion:a,boostLevel:n,includeMargin:t,marginSize:p,imageSettings:c,size:u});let N=S,M=null;c!=null&&x!=null&&(x.excavation!=null&&(N=Ke(S,x.excavation)),M=A.createElement("image",{href:c.src,height:x.h,width:x.w,x:x.x+f,y:x.y+f,preserveAspectRatio:"none",opacity:x.opacity,crossOrigin:x.crossOrigin}));const T=Qe(N,f);return A.createElement("svg",ue({height:u,width:u,viewBox:`0 0 ${k} ${k}`,ref:r,role:"img"},v),!!i&&A.createElement("title",null,i),A.createElement("path",{fill:b,d:`M0,0 h${k}v${k}H0z`,shapeRendering:"crispEdges"}),A.createElement("path",{fill:s,d:T,shapeRendering:"crispEdges"}),M)});He.displayName="QRCodeSVG";function ae({checked:d,onChange:l,disabled:r=!1,size:h="md",color:g="blue",label:u,description:m}){const b={sm:{track:{width:36,height:20},thumb:14,translate:16},md:{track:{width:44,height:24},thumb:18,translate:20},lg:{track:{width:52,height:28},thumb:22,translate:24}},s={blue:{active:"#3b82f6",glow:"rgba(59, 130, 246, 0.5)"},green:{active:"#22c55e",glow:"rgba(34, 197, 94, 0.5)"},purple:{active:"#8b5cf6",glow:"rgba(139, 92, 246, 0.5)"},orange:{active:"#f97316",glow:"rgba(249, 115, 22, 0.5)"},pink:{active:"#ec4899",glow:"rgba(236, 72, 153, 0.5)"},cyan:{active:"#06b6d4",glow:"rgba(6, 182, 212, 0.5)"}},t=b[h],a=s[g];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Fs}),e.jsxs("div",{className:`lp-toggle-wrapper ${r?"disabled":""}`,children:[(u||m)&&e.jsxs("div",{className:"lp-toggle-content",children:[u&&e.jsx("span",{className:"lp-toggle-label",children:u}),m&&e.jsx("span",{className:"lp-toggle-description",children:m})]}),e.jsx("button",{type:"button",role:"switch","aria-checked":d,disabled:r,onClick:()=>!r&&l(!d),className:`lp-toggle-track ${d?"active":""}`,style:{width:t.track.width,height:t.track.height,"--toggle-active-color":a.active,"--toggle-glow":a.glow,"--toggle-translate":`${t.translate}px`,"--toggle-thumb-size":`${t.thumb}px`},children:e.jsx("span",{className:"lp-toggle-thumb"})})]})]})}const Fs=`
  .lp-toggle-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .lp-toggle-wrapper.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .lp-toggle-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .lp-toggle-label {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .lp-toggle-description {
    font-size: 12px;
    color: #64748b;
    line-height: 1.4;
  }

  .lp-toggle-track {
    position: relative;
    border-radius: 999px;
    border: none;
    background: rgba(71, 85, 105, 0.5);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }

  .lp-toggle-track:hover {
    background: rgba(71, 85, 105, 0.7);
  }

  .lp-toggle-track:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  .lp-toggle-track.active {
    background: var(--toggle-active-color);
    box-shadow: 0 0 20px var(--toggle-glow);
  }

  .lp-toggle-thumb {
    position: absolute;
    top: 50%;
    left: 3px;
    width: var(--toggle-thumb-size);
    height: var(--toggle-thumb-size);
    border-radius: 50%;
    background: white;
    transform: translateY(-50%);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .lp-toggle-track.active .lp-toggle-thumb {
    transform: translateY(-50%) translateX(var(--toggle-translate));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Hover effect on thumb */
  .lp-toggle-track:hover .lp-toggle-thumb {
    transform: translateY(-50%) scale(1.05);
  }

  .lp-toggle-track.active:hover .lp-toggle-thumb {
    transform: translateY(-50%) translateX(var(--toggle-translate)) scale(1.05);
  }
`;function L({icon:d,title:l,description:r,children:h,accentColor:g="blue",badge:u,collapsible:m=!1,defaultOpen:b=!0}){const[s,t]=A.useState(b),n={blue:{border:"rgba(59, 130, 246, 0.3)",glow:"rgba(59, 130, 246, 0.15)",icon:"#60a5fa"},green:{border:"rgba(34, 197, 94, 0.3)",glow:"rgba(34, 197, 94, 0.15)",icon:"#4ade80"},purple:{border:"rgba(139, 92, 246, 0.3)",glow:"rgba(139, 92, 246, 0.15)",icon:"#a78bfa"},orange:{border:"rgba(249, 115, 22, 0.3)",glow:"rgba(249, 115, 22, 0.15)",icon:"#fb923c"},pink:{border:"rgba(236, 72, 153, 0.3)",glow:"rgba(236, 72, 153, 0.15)",icon:"#f472b6"},cyan:{border:"rgba(34, 211, 238, 0.3)",glow:"rgba(34, 211, 238, 0.15)",icon:"#22d3ee"}}[g];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ds}),e.jsxs("section",{className:"lp-settings-section",style:{"--section-border":n.border,"--section-glow":n.glow,"--section-icon":n.icon},children:[e.jsxs("header",{className:`lp-section-header ${m?"collapsible":""}`,onClick:()=>m&&t(!s),children:[e.jsx("div",{className:"lp-section-icon-wrap",children:e.jsx(d,{size:20})}),e.jsxs("div",{className:"lp-section-title-block",children:[e.jsx("h3",{className:"lp-section-title",children:l}),r&&e.jsx("p",{className:"lp-section-desc",children:r})]}),u&&e.jsx("span",{className:"lp-section-badge",children:u}),m&&e.jsx("div",{className:`lp-section-chevron ${s?"open":""}`,children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M3 4.5L6 7.5L9 4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e.jsx("div",{className:`lp-section-content ${s?"open":""}`,children:h})]})]})}function y({children:d,noPadding:l=!1,border:r=!0}){return e.jsx("div",{className:`lp-settings-item ${l?"no-padding":""} ${r?"with-border":""}`,children:d})}function oe({label:d,value:l,onChange:r,placeholder:h,type:g="text",helper:u,disabled:m=!1,icon:b}){return e.jsxs("div",{className:"lp-settings-input-group",children:[e.jsx("label",{className:"lp-settings-input-label",children:d}),e.jsxs("div",{className:"lp-settings-input-wrap",children:[b&&e.jsx("div",{className:"lp-settings-input-icon",children:e.jsx(b,{size:16})}),e.jsx("input",{type:g,value:l,onChange:s=>r(s.target.value),placeholder:h,disabled:m,className:`lp-settings-input ${b?"with-icon":""}`})]}),u&&e.jsx("p",{className:"lp-settings-input-helper",children:u})]})}const Ds=`
  .lp-settings-section {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid var(--section-border);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 
      0 4px 24px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  .lp-settings-section:hover {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 24px var(--section-glow),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    border-color: var(--section-border);
  }

  .lp-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }

  .lp-section-header.collapsible {
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .lp-section-header.collapsible:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .lp-section-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid var(--section-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--section-icon);
    flex-shrink: 0;
    box-shadow: 0 0 16px var(--section-glow);
  }

  .lp-section-title-block {
    flex: 1;
    min-width: 0;
  }

  .lp-section-title {
    font-size: 16px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0;
  }

  .lp-section-desc {
    font-size: 13px;
    color: #64748b;
    margin: 4px 0 0 0;
  }

  .lp-section-badge {
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--section-glow);
    border: 1px solid var(--section-border);
    font-size: 11px;
    font-weight: 700;
    color: var(--section-icon);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .lp-section-chevron {
    color: #64748b;
    transition: transform 0.3s ease;
  }

  .lp-section-chevron.open {
    transform: rotate(180deg);
  }

  .lp-section-content {
    padding: 0 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .lp-section-content:not(.open) {
    display: none;
  }

  /* Settings Item */
  .lp-settings-item {
    padding: 16px 0;
  }

  .lp-settings-item.with-border:not(:last-child) {
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }

  .lp-settings-item.no-padding {
    padding: 0;
  }

  /* Settings Input */
  .lp-settings-input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lp-settings-input-label {
    font-size: 12px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .lp-settings-input-wrap {
    position: relative;
  }

  .lp-settings-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    pointer-events: none;
  }

  .lp-settings-input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(2, 6, 23, 0.5);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 12px;
    color: #f8fafc;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition: all 0.2s ease;
  }

  .lp-settings-input.with-icon {
    padding-left: 44px;
  }

  .lp-settings-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15), 0 0 20px rgba(59, 130, 246, 0.1);
    background: rgba(2, 6, 23, 0.8);
  }

  .lp-settings-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lp-settings-input::placeholder {
    color: #475569;
  }

  .lp-settings-input-helper {
    font-size: 12px;
    color: #64748b;
    margin: 0;
    line-height: 1.4;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .lp-section-header {
      padding: 16px 18px;
    }

    .lp-section-content {
      padding: 0 18px 18px;
    }

    .lp-section-icon-wrap {
      width: 36px;
      height: 36px;
    }

    .lp-section-title {
      font-size: 15px;
    }
  }
`;function Us({profile:d,bioProfile:l}){var b;const r=(l==null?void 0:l.username)||d.username,h=d.display_name||d.full_name||"Usuario",g=((b=l==null?void 0:l.links)==null?void 0:b.length)||0,m=(()=>{const s=(l==null?void 0:l.theme)||"dark",t={light:{bg:"#f8fafc",text:"#0f172a",muted:"#64748b"},dark:{bg:"linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",text:"#f8fafc",muted:"#94a3b8"},blue:{bg:"linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)",text:"#ffffff",muted:"#bfdbfe"},gradient:{bg:"linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",text:"#ffffff",muted:"#e9d5ff"},neon:{bg:"#0a0a0a",text:"#22d3ee",muted:"#67e8f9"},pastel:{bg:"linear-gradient(135deg, #fce7f3 0%, #ddd6fe 100%)",text:"#1e1b4b",muted:"#6b7280"},brutalist:{bg:"#fef3c7",text:"#1c1917",muted:"#78716c"}};return t[s]||t.dark})();return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Bs}),e.jsxs("div",{className:"lp-profile-preview",children:[e.jsxs("div",{className:"lp-preview-header",children:[e.jsx(Pe,{size:14}),e.jsx("span",{children:"Vista previa de tu página"})]}),e.jsxs("div",{className:"lp-preview-phone",style:{background:m.bg},children:[e.jsx("div",{className:"lp-preview-notch"}),e.jsxs("div",{className:"lp-preview-content",children:[e.jsx("div",{className:"lp-preview-avatar",children:d.avatar_url?e.jsx("img",{src:d.avatar_url,alt:""}):e.jsx("span",{style:{color:m.text},children:h[0]})}),e.jsx("h4",{className:"lp-preview-name",style:{color:m.text},children:h}),r&&e.jsxs("p",{className:"lp-preview-username",style:{color:m.muted},children:["@",r]}),d.description&&e.jsx("p",{className:"lp-preview-bio",style:{color:m.muted},children:d.description.length>60?d.description.slice(0,60)+"...":d.description}),e.jsxs("div",{className:"lp-preview-links",children:[[...Array(Math.min(g,3))].map((s,t)=>e.jsx("div",{className:"lp-preview-link-placeholder",style:{background:`rgba(${m.text==="#ffffff"||m.text==="#f8fafc"?"255,255,255":"0,0,0"}, 0.1)`,borderColor:`rgba(${m.text==="#ffffff"||m.text==="#f8fafc"?"255,255,255":"0,0,0"}, 0.2)`}},t)),g===0&&e.jsx("p",{className:"lp-preview-empty",style:{color:m.muted},children:"Sin enlaces aún"})]})]})]}),r&&e.jsxs("a",{href:`/@${r}`,target:"_blank",rel:"noopener",className:"lp-preview-link",children:[e.jsx(Se,{size:14}),"Ver página completa"]})]})]})}const Bs=`
  .lp-profile-preview {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lp-preview-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .lp-preview-phone {
    position: relative;
    width: 200px;
    height: 360px;
    border-radius: 28px;
    border: 3px solid rgba(148, 163, 184, 0.2);
    overflow: hidden;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    margin: 0 auto;
  }

  .lp-preview-notch {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 20px;
    background: #000;
    border-radius: 12px;
  }

  .lp-preview-content {
    padding: 48px 16px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .lp-preview-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(148, 163, 184, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .lp-preview-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lp-preview-name {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 2px 0;
  }

  .lp-preview-username {
    font-size: 11px;
    margin: 0 0 8px 0;
  }

  .lp-preview-bio {
    font-size: 10px;
    line-height: 1.4;
    margin: 0 0 16px 0;
    max-width: 160px;
  }

  .lp-preview-links {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lp-preview-link-placeholder {
    height: 32px;
    border-radius: 8px;
    border: 1px solid;
  }

  .lp-preview-empty {
    font-size: 10px;
    margin: 0;
  }

  .lp-preview-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 10px;
    color: #60a5fa;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .lp-preview-link:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .lp-preview-phone {
      width: 160px;
      height: 280px;
    }
    
    .lp-preview-avatar {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }
    
    .lp-preview-name {
      font-size: 12px;
    }
  }
`,Me=[{id:"profile",icon:ce,label:"Perfil",color:"blue"},{id:"security",icon:Re,label:"Seguridad",color:"green"},{id:"visual",icon:he,label:"Apariencia",color:"purple"},{id:"monetization",icon:ze,label:"Finanzas",color:"orange"},{id:"notifications",icon:de,label:"Alertas",color:"pink"},{id:"privacy",icon:pe,label:"Privacidad",color:"cyan"},{id:"integrations",icon:Ie,label:"Integraciones",color:"purple"},{id:"account",icon:_e,label:"Cuenta",color:"blue"}];function et(){var ve,be,je;const{t:d}=ns(),l=ls(),{theme:r,accentColor:h,setTheme:g,setAccentColor:u}=rs(),[m,b]=E.useState("profile"),[s,t]=E.useState(!0),[a,n]=E.useState(!1),[i,p]=E.useState({id:"",username:"",full_name:"",email:"",bio:"",avatar_url:"",two_factor_enabled:!1,is_verified:!1,paypal_email:"",bank_details:""}),[c,v]=E.useState(null),[f,S]=E.useState(!1),[k,x]=E.useState(!1),N=E.useRef(null),[M,T]=E.useState([]),[$,O]=E.useState([]),[Y,Q]=E.useState(!1),[z,ee]=E.useState(!1),[se,R]=E.useState(!1),[P,X]=E.useState(""),[F,W]=E.useState(!1),[K,q]=E.useState(""),[Z,te]=E.useState(null),[D,U]=E.useState({notificationsEnabled:!0,weeklyReport:!0,bioPublic:!0,hidePublicStats:!1});E.useEffect(()=>{Ve();const o=localStorage.getItem("lp_preferences");if(o)try{U(w=>({...w,...JSON.parse(o)}))}catch{}},[]),E.useEffect(()=>{localStorage.setItem("lp_preferences",JSON.stringify(D))},[D]);const Ve=async()=>{try{const{data:{user:o}}=await I.auth.getUser();if(o){const{data:w}=await I.from("profiles").select("*").eq("id",o.id).single();p({...w,email:o.email,paypal_email:(w==null?void 0:w.paypal_email)||"",bank_details:(w==null?void 0:w.bank_details)||""});const{data:_}=await I.from("bio_profiles").select("*").eq("user_id",o.id).maybeSingle();_&&v(_)}}catch(o){console.error(o)}finally{t(!1)}},Ye=async o=>{var w;if((w=o.target.files)!=null&&w.length){n(!0);try{const _=o.target.files[0],G=`${i.id}/${Date.now()}.png`;await I.storage.from("avatars").upload(G,_,{upsert:!0});const{data:we}=I.storage.from("avatars").getPublicUrl(G);p({...i,avatar_url:we.publicUrl}),await I.from("profiles").update({avatar_url:we.publicUrl}).eq("id",i.id),l.success("Avatar actualizado correctamente")}catch{l.error("Error al subir imagen")}finally{n(!1)}}},ge=async()=>{n(!0);try{await I.from("profiles").update({full_name:i.full_name,username:i.username,bio:i.bio,paypal_email:i.paypal_email,bank_details:i.bank_details}).eq("id",i.id),l.success("Cambios guardados correctamente")}catch{l.error("Error al guardar cambios")}finally{setTimeout(()=>n(!1),500)}},Xe=async()=>{i.two_factor_enabled?confirm("¿Desactivar autenticación 2FA?")&&(p({...i,two_factor_enabled:!1}),await I.from("profiles").update({two_factor_enabled:!1}).eq("id",i.id),l.info("2FA desactivado")):S(!0)},We=async()=>{p({...i,two_factor_enabled:!0}),await I.from("profiles").update({two_factor_enabled:!0}).eq("id",i.id),S(!1),l.success("2FA activado correctamente")},fe=async()=>{await I.auth.signOut(),window.location.href="/login"},qe=()=>{c!=null&&c.username&&(navigator.clipboard.writeText(`${window.location.origin}/@${c.username}`),l.success("URL copiada al portapapeles"))},Ze=()=>({lite:.1,standard:.5,turbo:1.5})[c==null?void 0:c.monetization_mode]||.1,Je=async()=>{Q(!0);try{const o=await ne.getActive();T(o)}catch(o){console.error("Error loading sessions:",o)}finally{Q(!1)}},es=async o=>{await ne.revoke(o)?(T(_=>_.filter(G=>G.id!==o)),l.success("Sesión cerrada correctamente")):l.error("Error al cerrar sesión")},ss=async()=>{await ne.revokeAll()?(T(w=>w.filter(_=>_.is_current)),l.success("Todas las otras sesiones han sido cerradas")):l.error("Error al cerrar sesiones")},xe=async()=>{ee(!0);try{const o=await le.getAll();O(o)}catch(o){console.error("Error loading API keys:",o)}finally{ee(!1)}},ts=async()=>{if(!K.trim()){l.warning("Ingresa un nombre para la API key");return}const o=await le.create(K.trim());o?(te(o.key),q(""),await xe(),l.success("API Key creada correctamente")):l.error("Error al crear API Key")},as=async o=>{if(!confirm("¿Eliminar esta API Key? Esta acción no se puede deshacer."))return;await le.delete(o)?(O(_=>_.filter(G=>G.id!==o)),l.success("API Key eliminada")):l.error("Error al eliminar API Key")},is=async()=>{if(P!=="ELIMINAR"){l.warning('Escribe "ELIMINAR" para confirmar');return}W(!0);try{await gs.deleteAccount()?window.location.href="/":l.error("Error al eliminar cuenta. Contacta a soporte.")}catch{l.error("Error al eliminar cuenta")}finally{W(!1)}};return E.useEffect(()=>{m==="security"&&M.length===0&&Je(),m==="integrations"&&$.length===0&&xe()},[m]),s?e.jsx(xs,{size:"medium",text:"AJUSTES",subtext:"Cargando configuración..."}):e.jsxs("div",{className:"lp-settings-shell-v2 lp-premium-bg",children:[e.jsxs("div",{className:"lp-settings-container-v2",children:[e.jsxs("header",{className:"lp-settings-header-v2",children:[e.jsxs("div",{className:"lp-settings-title-block-v2",children:[e.jsx("h1",{children:"Ajustes"}),e.jsx("p",{children:"Personaliza tu experiencia LinkPay"})]}),i.is_verified&&e.jsxs("div",{className:"lp-verified-badge-v2",children:[e.jsx(os,{size:14}),"VERIFICADO"]})]}),e.jsxs("button",{className:"lp-settings-mobile-toggle",onClick:()=>x(!k),children:[e.jsx("span",{children:(ve=Me.find(o=>o.id===m))==null?void 0:ve.label}),e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M3 4.5L6 7.5L9 4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})]}),e.jsxs("div",{className:"lp-settings-layout-v2",children:[e.jsxs("nav",{className:`lp-settings-nav-v2 ${k?"open":""}`,children:[Me.map(o=>{const w=o.icon;return e.jsxs("button",{onClick:()=>{b(o.id),x(!1)},className:`lp-settings-nav-item ${m===o.id?"active":""}`,"data-color":o.color,children:[e.jsx("div",{className:"lp-settings-nav-icon",children:e.jsx(w,{size:18})}),e.jsx("span",{children:o.label})]},o.id)}),e.jsx("div",{className:"lp-settings-nav-divider"}),e.jsxs("button",{onClick:fe,className:"lp-settings-nav-item logout",children:[e.jsx("div",{className:"lp-settings-nav-icon",children:e.jsx(Ne,{size:18})}),e.jsx("span",{children:"Cerrar sesión"})]})]}),e.jsxs("main",{className:"lp-settings-content-v2",children:[m==="profile"&&e.jsxs("div",{className:"lp-settings-section-stack",children:[e.jsxs(L,{icon:ce,title:"Perfil e Identidad",description:"Tu información pública",accentColor:"blue",children:[e.jsxs("div",{className:"lp-profile-header-v2",children:[e.jsxs("div",{className:"lp-avatar-upload-v2",onClick:()=>{var o;return(o=N.current)==null?void 0:o.click()},children:[i.avatar_url?e.jsx("img",{src:i.avatar_url,alt:"Avatar"}):e.jsx("span",{className:"lp-avatar-initial",children:((be=i.full_name)==null?void 0:be[0])||"?"}),e.jsx("div",{className:"lp-avatar-overlay-v2",children:e.jsx(cs,{size:20})}),e.jsx("input",{type:"file",ref:N,hidden:!0,accept:"image/*",onChange:Ye})]}),e.jsxs("div",{className:"lp-profile-info-v2",children:[e.jsx("h3",{children:i.full_name||"Usuario"}),e.jsx("p",{className:"lp-profile-email",children:i.email}),(c==null?void 0:c.username)&&e.jsxs("div",{className:"lp-profile-url-row",children:[e.jsxs("span",{className:"lp-profile-url",children:["@",c.username]}),e.jsx("button",{className:"lp-icon-btn",onClick:qe,title:"Copiar URL",children:e.jsx(ke,{size:14})}),e.jsx("a",{href:`/@${c.username}`,target:"_blank",rel:"noopener",className:"lp-icon-btn",title:"Ver página pública",children:e.jsx(Se,{size:14})})]})]})]}),e.jsx(y,{children:e.jsx(oe,{label:"Nombre completo",value:i.full_name||"",onChange:o=>p({...i,full_name:o}),placeholder:"Tu nombre",icon:ce})}),e.jsx(y,{children:e.jsxs("div",{className:"lp-settings-input-group",children:[e.jsx("label",{className:"lp-settings-input-label",children:"Bio"}),e.jsx("textarea",{className:"lp-settings-textarea",value:i.bio||"",onChange:o=>p({...i,bio:o.target.value}),placeholder:"Cuéntanos sobre ti...",rows:3})]})}),e.jsx("div",{className:"lp-settings-actions",children:e.jsx("button",{onClick:ge,disabled:a,className:"lp-btn-save",children:a?e.jsx(J,{className:"spin",size:18}):e.jsxs(e.Fragment,{children:[e.jsx(Ee,{size:18})," Guardar cambios"]})})})]}),c&&e.jsx(L,{icon:Pe,title:"Vista Previa",description:"Así se ve tu página pública",accentColor:"cyan",children:e.jsx(Us,{profile:{avatar_url:i.avatar_url,full_name:i.full_name,description:i.bio,username:c.username},bioProfile:{username:c.username,theme:c.theme,links:c.links||[]}})})]}),m==="security"&&e.jsx("div",{className:"lp-settings-section-stack",children:e.jsxs(L,{icon:Re,title:"Seguridad",description:"Protege tu cuenta",accentColor:"green",children:[e.jsx(y,{children:e.jsxs("div",{className:"lp-security-row",children:[e.jsxs("div",{className:"lp-security-info",children:[e.jsx("h4",{children:"Autenticación en dos pasos (2FA)"}),e.jsx("p",{children:i.two_factor_enabled?"Activado - Tu cuenta está protegida":"Desactivado - Añade una capa extra de seguridad"})]}),e.jsx("button",{onClick:Xe,className:`lp-btn-outline ${i.two_factor_enabled?"danger":"success"}`,children:i.two_factor_enabled?"Desactivar":"Activar"})]})}),f&&e.jsxs("div",{className:"lp-2fa-setup",children:[e.jsx("p",{className:"lp-2fa-instruction",children:"Escanea este código con Google Authenticator o similar:"}),e.jsx("div",{className:"lp-2fa-qr-wrap",children:e.jsx(He,{value:`otpauth://totp/LinkPay:${i.email}?secret=DEMO123&issuer=LinkPay`,size:160})}),e.jsxs("p",{className:"lp-2fa-note",children:[e.jsx("strong",{children:"Nota:"})," Esta es una demostración. La implementación completa de 2FA requiere configuración adicional del backend."]}),e.jsx("button",{onClick:We,className:"lp-btn-save",children:"Confirmar configuración"})]}),e.jsx(y,{children:e.jsxs("div",{className:"lp-security-row",children:[e.jsxs("div",{className:"lp-security-info",children:[e.jsx("h4",{children:"Cambiar contraseña"}),e.jsx("p",{children:"Actualiza tu contraseña de acceso"})]}),e.jsx("button",{onClick:()=>{window.location.href="/forgot-password"},className:"lp-btn-outline",children:"Cambiar"})]})}),e.jsx(y,{border:!1,children:e.jsxs("div",{className:"lp-sessions-section",children:[e.jsxs("div",{className:"lp-sessions-header",children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Sesiones activas"}),e.jsx("p",{children:"Dispositivos conectados a tu cuenta"})]}),M.length>1&&e.jsx("button",{onClick:ss,className:"lp-btn-outline danger",children:"Cerrar otras"})]}),Y?e.jsxs("div",{className:"lp-sessions-loading",children:[e.jsx(J,{className:"spin",size:20}),e.jsx("span",{children:"Cargando sesiones..."})]}):M.length>0?e.jsx("div",{className:"lp-sessions-list",children:M.map(o=>e.jsxs("div",{className:`lp-session-item ${o.is_current?"current":""}`,children:[e.jsx("div",{className:"lp-session-icon",children:o.device_type==="mobile"?e.jsx(ds,{size:18}):e.jsx(ps,{size:18})}),e.jsxs("div",{className:"lp-session-info",children:[e.jsxs("span",{className:"lp-session-device",children:[o.device_name||o.browser||"Dispositivo desconocido",o.is_current&&e.jsx("span",{className:"lp-current-badge",children:"Este dispositivo"})]}),e.jsxs("span",{className:"lp-session-details",children:[o.os," • ",o.location||"Ubicación desconocida"]})]}),!o.is_current&&e.jsx("button",{onClick:()=>es(o.id),className:"lp-session-revoke",title:"Cerrar sesión",children:e.jsx(ye,{size:16})})]},o.id))}):e.jsx("div",{className:"lp-sessions-empty",children:e.jsx("p",{children:"Ejecuta el SQL en Supabase para habilitar sesiones activas."})})]})})]})}),m==="visual"&&e.jsx("div",{className:"lp-settings-section-stack",children:e.jsxs(L,{icon:he,title:"Preferencias Visuales",description:"Personaliza tu experiencia",accentColor:"purple",children:[e.jsx(y,{children:e.jsxs("div",{className:"lp-theme-selector",children:[e.jsxs("div",{className:"lp-theme-info",children:[e.jsx("h4",{children:"Tema de la aplicación"}),e.jsx("p",{children:"Elige entre modo claro u oscuro"})]}),e.jsxs("div",{className:"lp-theme-options",children:[e.jsxs("button",{className:`lp-theme-btn ${r==="light"?"active":""}`,onClick:()=>g("light"),children:[e.jsx(Ms,{size:18}),"Claro"]}),e.jsxs("button",{className:`lp-theme-btn ${r==="dark"?"active":""}`,onClick:()=>g("dark"),children:[e.jsx(Cs,{size:18}),"Oscuro"]})]})]})}),e.jsx(y,{children:e.jsxs("div",{className:"lp-accent-selector",children:[e.jsxs("div",{className:"lp-accent-info",children:[e.jsx("h4",{children:"Color de acento"}),e.jsx("p",{children:"Personaliza el color principal de tu interfaz"})]}),e.jsx("div",{className:"lp-accent-options",children:hs.map(({name:o,value:w})=>e.jsx("button",{className:`lp-accent-btn ${h===w?"active":""}`,style:{"--accent":w},onClick:()=>u(w),title:o},w))})]})}),e.jsxs("div",{className:"lp-settings-note",children:[e.jsx(he,{size:16}),e.jsx("span",{children:"El tema y color de acento se aplican a toda la aplicación y se guardan automáticamente."})]})]})}),m==="monetization"&&e.jsx("div",{className:"lp-settings-section-stack",children:e.jsxs(L,{icon:ze,title:"Monetización y Finanzas",description:"Gestiona tus ingresos",accentColor:"orange",children:[c&&e.jsx(y,{children:e.jsxs("div",{className:"lp-monetization-status",children:[e.jsxs("div",{className:"lp-monetization-info",children:[e.jsx("h4",{children:"Estado de monetización"}),e.jsxs("p",{children:["Modo actual: ",e.jsx("strong",{className:"lp-mode-badge",children:(je=c.monetization_mode)==null?void 0:je.toUpperCase()})]})]}),e.jsxs("div",{className:"lp-cpm-display",children:[e.jsx(vs,{size:16}),e.jsxs("span",{children:["CPM: €",Ze().toFixed(2)]})]})]})}),e.jsx(y,{children:e.jsxs("div",{className:"lp-payment-card-v2",children:[e.jsxs("div",{className:"lp-payment-header-v2",children:[e.jsx("div",{className:"lp-payment-icon-v2",style:{background:"rgba(59, 130, 246, 0.15)"},children:e.jsx(us,{size:18,color:"#60a5fa"})}),e.jsx("span",{children:"PayPal"})]}),e.jsx(oe,{label:"Email de PayPal",value:i.paypal_email||"",onChange:o=>p({...i,paypal_email:o}),placeholder:"tu@paypal.com",type:"email",helper:"Se usará para pagos automáticos mensuales"})]})}),e.jsx(y,{children:e.jsxs("div",{className:"lp-payment-card-v2",children:[e.jsxs("div",{className:"lp-payment-header-v2",children:[e.jsx("div",{className:"lp-payment-icon-v2",style:{background:"rgba(139, 92, 246, 0.15)"},children:e.jsx(Ns,{size:18,color:"#a78bfa"})}),e.jsx("span",{children:"Transferencia Bancaria"})]}),e.jsx(oe,{label:"IBAN / Cuenta",value:i.bank_details||"",onChange:o=>p({...i,bank_details:o}),placeholder:"ES91 0000 0000 0000 0000",helper:"Solo para retiros superiores a €500"})]})}),e.jsx("div",{className:"lp-settings-actions",children:e.jsx("button",{onClick:ge,disabled:a,className:"lp-btn-save",children:a?e.jsx(J,{className:"spin",size:18}):e.jsxs(e.Fragment,{children:[e.jsx(Ee,{size:18})," Guardar métodos de pago"]})})})]})}),m==="notifications"&&e.jsx("div",{className:"lp-settings-section-stack",children:e.jsxs(L,{icon:de,title:"Notificaciones",description:"Controla tus alertas",accentColor:"pink",children:[e.jsx(y,{children:e.jsx(ae,{checked:D.notificationsEnabled,onChange:o=>U(w=>({...w,notificationsEnabled:o})),label:"Notificaciones de actividad",description:"Recibe alertas de clics e ingresos importantes",color:"pink"})}),e.jsx(y,{children:e.jsx(ae,{checked:D.weeklyReport,onChange:o=>U(w=>({...w,weeklyReport:o})),label:"Resumen semanal",description:"Recibe un email con el rendimiento de la semana",color:"pink"})}),e.jsx(y,{border:!1,children:e.jsxs("div",{className:"lp-coming-soon-block",children:[e.jsx(ms,{size:20}),e.jsxs("div",{children:[e.jsx("h4",{children:"Alertas de viralidad"}),e.jsx("p",{children:"Notificaciones cuando un link supere umbrales de visitas"})]}),e.jsx("span",{className:"lp-badge-soon",children:"Próximamente"})]})}),e.jsxs("div",{className:"lp-settings-note",children:[e.jsx(de,{size:16}),e.jsx("span",{children:"Nota: Las preferencias de notificaciones se guardan localmente. La funcionalidad de emails requiere configuración adicional del servidor."})]})]})}),m==="privacy"&&e.jsx("div",{className:"lp-settings-section-stack",children:e.jsxs(L,{icon:pe,title:"Privacidad y Control",description:"Gestiona tu visibilidad",accentColor:"cyan",children:[e.jsx(y,{children:e.jsx(ae,{checked:D.bioPublic,onChange:o=>U(w=>({...w,bioPublic:o})),label:"Página Bio pública",description:"Tu página de enlaces es visible para todos",color:"blue"})}),e.jsx(y,{children:e.jsx(ae,{checked:D.hidePublicStats,onChange:o=>U(w=>({...w,hidePublicStats:o})),label:"Ocultar estadísticas públicas",description:"No mostrar contadores de visitas en tu página",color:"blue"})}),e.jsxs("div",{className:"lp-settings-note",children:[e.jsx(pe,{size:16}),e.jsx("span",{children:"Nota: Estas preferencias se implementarán completamente cuando se añadan las columnas correspondientes a la base de datos."})]})]})}),m==="integrations"&&e.jsx("div",{className:"lp-settings-section-stack",children:e.jsxs(L,{icon:Ie,title:"Integraciones",description:"Conecta servicios externos",accentColor:"purple",children:[e.jsx(y,{children:e.jsxs("div",{className:"lp-coming-soon-block",children:[e.jsx("div",{className:"lp-integration-icon",children:"🔗"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Redes Sociales"}),e.jsx("p",{children:"Conecta Instagram, TikTok, YouTube y más"})]}),e.jsx("span",{className:"lp-badge-soon",children:"Próximamente"})]})}),e.jsx(y,{children:e.jsxs("div",{className:"lp-api-keys-section",children:[e.jsx("div",{className:"lp-api-keys-header",children:e.jsxs("div",{children:[e.jsx("h4",{children:"API Keys"}),e.jsx("p",{children:"Genera claves para integrar LinkPay en tu app"})]})}),e.jsxs("div",{className:"lp-api-key-create",children:[e.jsx("input",{type:"text",value:K,onChange:o=>q(o.target.value),placeholder:"Nombre de la API key (ej: Mi App)",className:"lp-settings-input"}),e.jsxs("button",{onClick:ts,className:"lp-btn-save",children:[e.jsx(fs,{size:16}),"Crear"]})]}),Z&&e.jsxs("div",{className:"lp-api-key-created",children:[e.jsx(Ce,{size:16}),e.jsxs("div",{children:[e.jsx("strong",{children:"Guarda esta key - no se mostrará de nuevo:"}),e.jsx("code",{children:Z})]}),e.jsx("button",{onClick:()=>{navigator.clipboard.writeText(Z),l.success("Key copiada")},children:e.jsx(ke,{size:14})}),e.jsx("button",{onClick:()=>te(null),children:e.jsx(ye,{size:14})})]}),z?e.jsxs("div",{className:"lp-sessions-loading",children:[e.jsx(J,{className:"spin",size:20}),e.jsx("span",{children:"Cargando API keys..."})]}):$.length>0?e.jsx("div",{className:"lp-api-keys-list",children:$.map(o=>e.jsxs("div",{className:"lp-api-key-item",children:[e.jsx("div",{className:"lp-api-key-icon",children:e.jsx(bs,{size:16})}),e.jsxs("div",{className:"lp-api-key-info",children:[e.jsx("span",{className:"lp-api-key-name",children:o.name}),e.jsxs("span",{className:"lp-api-key-prefix",children:[o.key_prefix,"•••••••"]})]}),e.jsx("span",{className:`lp-api-key-status ${o.is_active?"active":"inactive"}`,children:o.is_active?"Activa":"Inactiva"}),e.jsx("button",{onClick:()=>as(o.id),className:"lp-api-key-delete",title:"Eliminar",children:e.jsx(re,{size:14})})]},o.id))}):e.jsx("div",{className:"lp-sessions-empty",children:e.jsx("p",{children:"No tienes API keys. Crea una para empezar."})})]})}),e.jsx(y,{border:!1,children:e.jsxs("div",{className:"lp-coming-soon-block",children:[e.jsx("div",{className:"lp-integration-icon",children:"📊"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Analytics Avanzados"}),e.jsx("p",{children:"Conecta Google Analytics, Facebook Pixel, UTMs"})]}),e.jsx("span",{className:"lp-badge-soon",children:"Próximamente"})]})})]})}),m==="account"&&e.jsx("div",{className:"lp-settings-section-stack",children:e.jsxs(L,{icon:_e,title:"Cuenta y Soporte",description:"Ayuda y opciones de cuenta",accentColor:"blue",children:[e.jsx(y,{children:e.jsxs("div",{className:"lp-support-row",children:[e.jsxs("div",{className:"lp-support-info",children:[e.jsx("h4",{children:"Centro de ayuda"}),e.jsx("p",{children:"Preguntas frecuentes y tutoriales"})]}),e.jsx("a",{href:"/help",className:"lp-btn-outline",children:"Ver FAQ"})]})}),e.jsx(y,{children:e.jsxs("div",{className:"lp-support-row",children:[e.jsxs("div",{className:"lp-support-info",children:[e.jsx("h4",{children:"Contactar soporte"}),e.jsx("p",{children:"¿Necesitas ayuda? Escríbenos"})]}),e.jsx("a",{href:"mailto:support@linkpay.io",className:"lp-btn-outline",children:"Enviar email"})]})}),e.jsx(y,{children:e.jsxs("div",{className:"lp-danger-zone",children:[e.jsxs("div",{className:"lp-danger-info",children:[e.jsx("h4",{children:"Cerrar sesión"}),e.jsx("p",{children:"Salir de tu cuenta en este dispositivo"})]}),e.jsxs("button",{onClick:fe,className:"lp-btn-outline danger",children:[e.jsx(Ne,{size:16}),"Cerrar sesión"]})]})}),e.jsx(y,{border:!1,children:e.jsxs("div",{className:"lp-danger-zone critical",children:[e.jsxs("div",{className:"lp-danger-info",children:[e.jsx("h4",{children:"Eliminar cuenta"}),e.jsx("p",{children:"Eliminar permanentemente tu cuenta y todos los datos"})]}),e.jsxs("button",{className:"lp-btn-outline danger",onClick:()=>R(!0),children:[e.jsx(re,{size:16}),"Eliminar cuenta"]})]})})]})})]})]})]}),se&&e.jsx("div",{className:"lp-modal-overlay",onClick:()=>R(!1),children:e.jsxs("div",{className:"lp-modal-content",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"lp-modal-header",children:[e.jsx(Ce,{size:24,color:"#ef4444"}),e.jsx("h3",{children:"Eliminar cuenta permanentemente"})]}),e.jsxs("div",{className:"lp-modal-body",children:[e.jsxs("p",{className:"lp-modal-warning",children:["Esta acción es ",e.jsx("strong",{children:"irreversible"}),". Se eliminarán:"]}),e.jsxs("ul",{className:"lp-delete-list",children:[e.jsx("li",{children:"Tu perfil y datos personales"}),e.jsx("li",{children:"Todos tus links y BioPages"}),e.jsx("li",{children:"Historial de ganancias y clics"}),e.jsx("li",{children:"API Keys y webhooks"}),e.jsx("li",{children:"Todas las sesiones activas"})]}),e.jsxs("p",{className:"lp-modal-confirm-text",children:["Escribe ",e.jsx("strong",{children:"ELIMINAR"})," para confirmar:"]}),e.jsx("input",{type:"text",value:P,onChange:o=>X(o.target.value.toUpperCase()),placeholder:"ELIMINAR",className:"lp-settings-input"})]}),e.jsxs("div",{className:"lp-modal-actions",children:[e.jsx("button",{className:"lp-btn-outline",onClick:()=>{R(!1),X("")},children:"Cancelar"}),e.jsxs("button",{className:"lp-btn-danger",onClick:is,disabled:F||P!=="ELIMINAR",children:[F?e.jsx(J,{className:"spin",size:16}):e.jsx(re,{size:16}),"Eliminar cuenta"]})]})]})})]})}export{et as SettingsPage};
