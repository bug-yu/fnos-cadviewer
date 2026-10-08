import{a2 as nr,a3 as ir,a4 as ye,a5 as or,a6 as ke,a7 as sr,D as lr,a8 as cr,T as ua,B as dr,a9 as ur,aa as mr,ab as pr}from"./three-renderer-DM2ej0i-.js";import{A as hr,d as fr,M as gr,e as Ft,y as br,s as wr,I as xr,r as Ae,V as G}from"./three-Dfiw4sMj.js";import{a as vr,$ as yr,aI as bt,u as v,v as nt,aF as T,aJ as kr,aK as Ar,aL as ze,aM as zr,aN as Fr,aO as Sr,aD as Mr}from"./cad-simple-viewer-Fq9btEWw.js";import{l as Ls,o as Es}from"./register-5hN4mCSk.js";import{ao as V,E as Pr,N as Dt,ag as Cr,r as Ir,$ as Lr,aL as Er,ah as Br,br as Dr,D as Ur,U as Nr,M as Jt,a7 as Or,S as Tr,as as Rr,aH as $r,X as jr,a6 as _r,aj as Vr,aB as Hr,aC as Yr,ay as Xr,aP as Gr,a2 as Kr,aQ as Wr,aM as Jr,a3 as qr,a_ as Zr,_ as Qr,a4 as tn,V as en,a5 as it,aa as ma,T as an,Q as qt,k as rn,W as nn,R as on,aI as sn}from"./data-model-Db44RVy_.js";import"./vite-preload-CAQj6dvO.js";const J=4;var R=Uint8Array,$=Uint16Array,Zt=Int32Array,Qt=new R([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),te=new R([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Fe=new R([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),pa=function(t,e){for(var a=new $(31),r=0;r<31;++r)a[r]=e+=1<<t[r-1];for(var n=new Zt(a[30]),r=1;r<30;++r)for(var i=a[r];i<a[r+1];++i)n[i]=i-a[r]<<5|r;return{b:a,r:n}},ha=pa(Qt,2),ln=ha.b,jt=ha.r;ln[28]=258,jt[258]=28;var cn=pa(te,0),Se=cn.r,_t=new $(32768);for(var y=0;y<32768;++y){var W=(y&43690)>>1|(y&21845)<<1;W=(W&52428)>>2|(W&13107)<<2,W=(W&61680)>>4|(W&3855)<<4,_t[y]=((W&65280)>>8|(W&255)<<8)>>1}var dt=(function(t,e,a){for(var r=t.length,n=0,i=new $(e);n<r;++n)t[n]&&++i[t[n]-1];var o=new $(e);for(n=1;n<e;++n)o[n]=o[n-1]+i[n-1]<<1;var s;if(a){s=new $(1<<e);var l=15-e;for(n=0;n<r;++n)if(t[n])for(var c=n<<4|t[n],d=e-t[n],u=o[t[n]-1]++<<d,m=u|(1<<d)-1;u<=m;++u)s[_t[u]>>l]=c}else for(s=new $(r),n=0;n<r;++n)t[n]&&(s[n]=_t[o[t[n]-1]++]>>15-t[n]);return s}),Q=new R(288);for(var y=0;y<144;++y)Q[y]=8;for(var y=144;y<256;++y)Q[y]=9;for(var y=256;y<280;++y)Q[y]=7;for(var y=280;y<288;++y)Q[y]=8;var xt=new R(32);for(var y=0;y<32;++y)xt[y]=5;var dn=dt(Q,9,0),un=dt(xt,5,0),fa=function(t){return(t+7)/8|0},ga=function(t,e,a){return(a==null||a>t.length)&&(a=t.length),new R(t.subarray(e,a))},mn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],St=function(t,e,a){var r=new Error(e||mn[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,St),!a)throw r;return r},K=function(t,e,a){a<<=e&7;var r=e/8|0;t[r]|=a,t[r+1]|=a>>8},st=function(t,e,a){a<<=e&7;var r=e/8|0;t[r]|=a,t[r+1]|=a>>8,t[r+2]|=a>>16},Ut=function(t,e){for(var a=[],r=0;r<t.length;++r)t[r]&&a.push({s:r,f:t[r]});var n=a.length,i=a.slice();if(!n)return{t:wa,l:0};if(n==1){var o=new R(a[0].s+1);return o[a[0].s]=1,{t:o,l:1}}a.sort(function(f,C){return f.f-C.f}),a.push({s:-1,f:25001});var s=a[0],l=a[1],c=0,d=1,u=2;for(a[0]={s:-1,f:s.f+l.f,l:s,r:l};d!=n-1;)s=a[a[c].f<a[u].f?c++:u++],l=a[c!=d&&a[c].f<a[u].f?c++:u++],a[d++]={s:-1,f:s.f+l.f,l:s,r:l};for(var m=i[0].s,r=1;r<n;++r)i[r].s>m&&(m=i[r].s);var p=new $(m+1),g=Vt(a[d-1],p,0);if(g>e){var r=0,h=0,w=g-e,A=1<<w;for(i.sort(function(C,S){return p[S.s]-p[C.s]||C.f-S.f});r<n;++r){var z=i[r].s;if(p[z]>e)h+=A-(1<<g-p[z]),p[z]=e;else break}for(h>>=w;h>0;){var L=i[r].s;p[L]<e?h-=1<<e-p[L]++-1:++r}for(;r>=0&&h;--r){var F=i[r].s;p[F]==e&&(--p[F],++h)}g=e}return{t:new R(p),l:g}},Vt=function(t,e,a){return t.s==-1?Math.max(Vt(t.l,e,a+1),Vt(t.r,e,a+1)):e[t.s]=a},Me=function(t){for(var e=t.length;e&&!t[--e];);for(var a=new $(++e),r=0,n=t[0],i=1,o=function(l){a[r++]=l},s=1;s<=e;++s)if(t[s]==n&&s!=e)++i;else{if(!n&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(n),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(n);i=1,n=t[s]}return{c:a.subarray(0,r),n:e}},lt=function(t,e){for(var a=0,r=0;r<e.length;++r)a+=t[r]*e[r];return a},ba=function(t,e,a){var r=a.length,n=fa(e+2);t[n]=r&255,t[n+1]=r>>8,t[n+2]=t[n]^255,t[n+3]=t[n+1]^255;for(var i=0;i<r;++i)t[n+i+4]=a[i];return(n+4+r)*8},Pe=function(t,e,a,r,n,i,o,s,l,c,d){K(e,d++,a),++n[256];for(var u=Ut(n,15),m=u.t,p=u.l,g=Ut(i,15),h=g.t,w=g.l,A=Me(m),z=A.c,L=A.n,F=Me(h),f=F.c,C=F.n,S=new $(19),x=0;x<z.length;++x)++S[z[x]&31];for(var x=0;x<f.length;++x)++S[f[x]&31];for(var b=Ut(S,7),B=b.t,H=b.l,M=19;M>4&&!B[Fe[M-1]];--M);var j=c+5<<3,E=lt(n,Q)+lt(i,xt)+o,D=lt(n,m)+lt(i,h)+o+14+3*M+lt(S,B)+2*S[16]+3*S[17]+7*S[18];if(l>=0&&j<=E&&j<=D)return ba(e,d,t.subarray(l,l+c));var U,k,N,_;if(K(e,d,1+(D<E)),d+=2,D<E){U=dt(m,p,0),k=m,N=dt(h,w,0),_=h;var It=dt(B,H,0);K(e,d,L-257),K(e,d+5,C-1),K(e,d+10,M-4),d+=14;for(var x=0;x<M;++x)K(e,d+3*x,B[Fe[x]]);d+=3*M;for(var Y=[z,f],ot=0;ot<2;++ot)for(var et=Y[ot],x=0;x<et.length;++x){var X=et[x]&31;K(e,d,It[X]),d+=B[X],X>15&&(K(e,d,et[x]>>5&127),d+=et[x]>>12)}}else U=dn,k=Q,N=un,_=xt;for(var x=0;x<s;++x){var O=r[x];if(O>255){var X=O>>18&31;st(e,d,U[X+257]),d+=k[X+257],X>7&&(K(e,d,O>>23&31),d+=Qt[X]);var at=O&31;st(e,d,N[at]),d+=_[at],at>3&&(st(e,d,O>>5&8191),d+=te[at])}else st(e,d,U[O]),d+=k[O]}return st(e,d,U[256]),d+k[256]},pn=new Zt([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),wa=new R(0),hn=function(t,e,a,r,n,i){var o=i.z||t.length,s=new R(r+o+5*(1+Math.ceil(o/7e3))+n),l=s.subarray(r,s.length-n),c=i.l,d=(i.r||0)&7;if(e){d&&(l[0]=i.r>>3);for(var u=pn[e-1],m=u>>13,p=u&8191,g=(1<<a)-1,h=i.p||new $(32768),w=i.h||new $(g+1),A=Math.ceil(a/3),z=2*A,L=function(Bt){return(t[Bt]^t[Bt+1]<<A^t[Bt+2]<<z)&g},F=new Zt(25e3),f=new $(288),C=new $(32),S=0,x=0,b=i.i||0,B=0,H=i.w||0,M=0;b+2<o;++b){var j=L(b),E=b&32767,D=w[j];if(h[E]=D,w[j]=E,H<=b){var U=o-b;if((S>7e3||B>24576)&&(U>423||!c)){d=Pe(t,l,0,F,f,C,x,B,M,b-M,d),B=S=x=0,M=b;for(var k=0;k<286;++k)f[k]=0;for(var k=0;k<30;++k)C[k]=0}var N=2,_=0,It=p,Y=E-D&32767;if(U>2&&j==L(b-Y))for(var ot=Math.min(m,U)-1,et=Math.min(32767,b),X=Math.min(258,U);Y<=et&&--It&&E!=D;){if(t[b+N]==t[b+N-Y]){for(var O=0;O<X&&t[b+O]==t[b+O-Y];++O);if(O>N){if(N=O,_=Y,O>ot)break;for(var at=Math.min(Y,O-2),be=0,k=0;k<at;++k){var Lt=b-Y+k&32767,rr=h[Lt],we=Lt-rr&32767;we>be&&(be=we,D=Lt)}}}E=D,D=h[E],Y+=E-D&32767}if(_){F[B++]=268435456|jt[N]<<18|Se[_];var xe=jt[N]&31,ve=Se[_]&31;x+=Qt[xe]+te[ve],++f[257+xe],++C[ve],H=b+N,++S}else F[B++]=t[b],++f[t[b]]}}for(b=Math.max(b,H);b<o;++b)F[B++]=t[b],++f[t[b]];d=Pe(t,l,c,F,f,C,x,B,M,b-M,d),c||(i.r=d&7|l[d/8|0]<<3,d-=7,i.h=w,i.p=h,i.i=b,i.w=H)}else{for(var b=i.w||0;b<o+c;b+=65535){var Et=b+65535;Et>=o&&(l[d/8|0]=c,Et=o),d=ba(l,d+1,t.subarray(b,Et))}i.i=o}return ga(s,0,r+fa(d)+n)},fn=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var a=e,r=9;--r;)a=(a&1&&-306674912)^a>>>1;t[e]=a}return t})(),xa=function(){var t=-1;return{p:function(e){for(var a=t,r=0;r<e.length;++r)a=fn[a&255^e[r]]^a>>>8;t=a},d:function(){return~t}}},va=function(t,e,a,r,n){if(!n&&(n={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new R(i.length+t.length);o.set(i),o.set(t,i.length),t=o,n.w=i.length}return hn(t,e.level==null?6:e.level,e.mem==null?n.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,a,r,n)},ya=function(t,e){var a={};for(var r in t)a[r]=t[r];for(var r in e)a[r]=e[r];return a},P=function(t,e,a){for(;a;++e)t[e]=a,a>>>=8},gn=function(t,e){var a=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&P(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),a){t[3]=8;for(var r=0;r<=a.length;++r)t[r+10]=a.charCodeAt(r)}},bn=function(t){return 10+(t.filename?t.filename.length+1:0)};function wn(t,e){return va(t,e||{},0,0)}function xn(t,e){e||(e={});var a=xa(),r=t.length;a.p(t);var n=va(t,e,bn(e),8),i=n.length;return gn(n,e),P(n,i-8,a.d()),P(n,i-4,r),n}var ka=function(t,e,a,r){for(var n in t){var i=t[n],o=e+n,s=r;Array.isArray(i)&&(s=ya(r,i[1]),i=i[0]),i instanceof R?a[o]=[i,s]:(a[o+="/"]=[new R(0),s],ka(i,o,a,r))}},Ce=typeof TextEncoder<"u"&&new TextEncoder,vn=typeof TextDecoder<"u"&&new TextDecoder,yn=0;try{vn.decode(wa,{stream:!0}),yn=1}catch{}function mt(t,e){var a;if(Ce)return Ce.encode(t);for(var r=t.length,n=new R(t.length+(t.length>>1)),i=0,o=function(d){n[i++]=d},a=0;a<r;++a){if(i+5>n.length){var s=new R(i+8+(r-a<<1));s.set(n),n=s}var l=t.charCodeAt(a);l<128||e?o(l):l<2048?(o(192|l>>6),o(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++a)&1023,o(240|l>>18),o(128|l>>12&63),o(128|l>>6&63),o(128|l&63)):(o(224|l>>12),o(128|l>>6&63),o(128|l&63))}return ga(n,0,i)}var Ht=function(t){var e=0;if(t)for(var a in t){var r=t[a].length;r>65535&&St(9),e+=r+4}return e},Ie=function(t,e,a,r,n,i,o,s){var l=r.length,c=a.extra,d=s&&s.length,u=Ht(c);P(t,e,o!=null?33639248:67324752),e+=4,o!=null&&(t[e++]=20,t[e++]=a.os),t[e]=20,e+=2,t[e++]=a.flag<<1|(i<0&&8),t[e++]=n&&8,t[e++]=a.compression&255,t[e++]=a.compression>>8;var m=new Date(a.mtime==null?Date.now():a.mtime),p=m.getFullYear()-1980;if((p<0||p>119)&&St(10),P(t,e,p<<25|m.getMonth()+1<<21|m.getDate()<<16|m.getHours()<<11|m.getMinutes()<<5|m.getSeconds()>>1),e+=4,i!=-1&&(P(t,e,a.crc),P(t,e+4,i<0?-i-2:i),P(t,e+8,a.size)),P(t,e+12,l),P(t,e+14,u),e+=16,o!=null&&(P(t,e,d),P(t,e+6,a.attrs),P(t,e+10,o),e+=14),t.set(r,e),e+=l,u)for(var g in c){var h=c[g],w=h.length;P(t,e,+g),P(t,e+2,w),t.set(h,e+4),e+=4+w}return d&&(t.set(s,e),e+=d),e},kn=function(t,e,a,r,n){P(t,e,101010256),P(t,e+8,a),P(t,e+10,a),P(t,e+12,r),P(t,e+16,n)};function An(t,e){e||(e={});var a={},r=[];ka(t,"",a,e);var n=0,i=0;for(var o in a){var s=a[o],l=s[0],c=s[1],d=c.level==0?0:8,u=mt(o),m=u.length,p=c.comment,g=p&&mt(p),h=g&&g.length,w=Ht(c.extra);m>65535&&St(11);var A=d?wn(l,c):l,z=A.length,L=xa();L.p(l),r.push(ya(c,{size:l.length,crc:L.d(),c:A,f:u,m:g,u:m!=o.length||g&&p.length!=h,o:n,compression:d})),n+=30+m+w+z,i+=76+2*(m+w)+(h||0)+z}for(var F=new R(i+22),f=n,C=i-n,S=0;S<r.length;++S){var u=r[S];Ie(F,u.o,u,u.f,u.u,u.c.length);var x=30+u.f.length+Ht(u.extra);F.set(u.c,u.o+x),Ie(F,n,u,u.f,u.u,u.c.length,u.o,u.m),n+=16+x+(u.m?u.m.length:0)}return kn(F,n,r.length,C,f),F}const zn="gzip";function ee(t){return{bytes:xn(t),compression:zn}}const Le=1,Ee=2,Be=4,De=8,Ue=16,Fn=32,Ne=1,Oe=2,Te=4,Re=8,$e=16,Sn=32,je=64,_e=128;function ae(t){let e=256+t.positions.byteLength;return t.indices&&(e+=t.indices.byteLength),t.lineDistances&&(e+=t.lineDistances.byteLength),t.linePattern&&(e+=64+t.linePattern.pattern.length*8),e}function re(t){let e=256+t.positions.byteLength;return t.indices&&(e+=t.indices.byteLength),t.gradientPositions&&(e+=t.gradientPositions.byteLength),t.uvs&&(e+=t.uvs.byteLength),t.texture&&(e+=t.texture.bytes.byteLength+64),t.hatchPattern&&(e+=128),t.gradientFill&&(e+=64),e}function Aa(t,e){t.writeString(e.layer),t.writeU32(e.color>>>0),t.writeF64(e.offset[0]),t.writeF64(e.offset[1]),t.writeF64(e.offset[2]),t.writeFloat32Array(e.positions);let a=0;e.indices&&e.indices.length>0&&(a|=Le),e.linePattern&&(a|=Ee),e.lineDistances&&e.lineDistances.length>0&&(a|=Be),e.lineWidth!=null&&e.lineWidth>0&&(a|=De),e.renderOrder!=null&&e.renderOrder!==0&&(a|=Ue),e.excludeFromOsnap&&(a|=Fn),t.writeU8(a),a&Le&&t.writeUint32Array(e.indices),a&Ee&&t.writeJson(e.linePattern),a&Be&&t.writeFloat32Array(e.lineDistances),a&De&&t.writeF32(e.lineWidth),a&Ue&&t.writeI32(e.renderOrder)}function za(t,e){t.writeString(e.layer),t.writeU32(e.color>>>0),t.writeF64(e.offset[0]),t.writeF64(e.offset[1]),t.writeF64(e.offset[2]),t.writeFloat32Array(e.positions);let a=0;e.indices&&e.indices.length>0&&(a|=Ne),e.hatchPattern&&(a|=Oe),e.gradientFill&&(a|=Te),e.gradientPositions&&e.gradientPositions.length>0&&(a|=Re),e.side!=null&&(a|=$e),e.points&&(a|=Sn),e.renderOrder!=null&&e.renderOrder!==0&&(a|=je),e.texture&&e.texture.bytes.length>0&&e.uvs&&e.uvs.length>=2&&(a|=_e),t.writeU8(a),a&Ne&&t.writeUint32Array(e.indices),a&Oe&&t.writeJson(e.hatchPattern),a&Te&&t.writeJson(e.gradientFill),a&Re&&t.writeFloat32Array(e.gradientPositions),a&$e&&t.writeU8(e.side),a&je&&t.writeI32(e.renderOrder),a&_e&&(t.writeFloat32Array(e.uvs),t.writeString(e.texture.mimeType||"image/png"),t.writeU32(e.texture.bytes.byteLength),t.writeBytes(e.texture.bytes))}class ne{constructor(){this.chunks=[],this.length=0}writeU8(e){const a=new Uint8Array(1);a[0]=e&255,this.chunks.push(a),this.length+=1}writeU32(e){const a=new Uint8Array(4);new DataView(a.buffer).setUint32(0,e>>>0,!0),this.chunks.push(a),this.length+=4}writeI32(e){const a=new Uint8Array(4);new DataView(a.buffer).setInt32(0,e|0,!0),this.chunks.push(a),this.length+=4}writeF32(e){const a=new Uint8Array(4);new DataView(a.buffer).setFloat32(0,e,!0),this.chunks.push(a),this.length+=4}writeF64(e){const a=new Uint8Array(8);new DataView(a.buffer).setFloat64(0,e,!0),this.chunks.push(a),this.length+=8}writeBytes(e){this.chunks.push(e),this.length+=e.length}writeString(e){const a=mt(e);this.writeU32(a.length),this.writeBytes(a)}writeJson(e){this.writeString(JSON.stringify(e))}writeFloat32Array(e){this.alignTo(4);const a=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);this.writeU32(a.length),this.writeBytes(a)}writeUint32Array(e){this.alignTo(4);const a=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);this.writeU32(a.length),this.writeBytes(a)}alignTo(e){const a=this.length%e;if(a===0)return;const r=e-a;for(let n=0;n<r;n++)this.writeU8(0)}toUint8Array(){const e=new Uint8Array(this.length);let a=0;for(const r of this.chunks)e.set(r,a),a+=r.length;return e}}const Mn=1329939265,Pn=1,Cn=1,In=2,Ln=3,En=4,Bn=5,Dn=6,Un=7;function Fa(t){var e;switch(t.kind){case"line":return 37;case"circle":return 30;case"arc":return 46;case"ellipse":return 71;case"point":return 21;case"path":return 10+t.vertices.length*8;case"spline":return 10+(t.controlPoints.length+t.knots.length+t.weights.length+(((e=t.fitPoints)==null?void 0:e.length)??0))*8+16;default:return t}}function Nn(t,e){if(t.length===0)return[];const a=[];let r=[],n=64;const i=()=>{r.length!==0&&(a.push(r),r=[],n=64)};for(const o of t){const s=Fa(o);r.length>0&&n+s>e&&i(),r.push(o),n+=s}return i(),a}function Sa(t){const e=new ne;e.writeU32(Mn),e.writeU8(Pn),e.writeU8(0),e.writeU8(0),e.writeU8(0);const a=[],r=new Map,n=i=>{const o=r.get(i);if(o!=null)return o;const s=a.length;return a.push(i),r.set(i,s),s};for(const i of t.primitives)n(i.layer);e.writeU32(a.length);for(const i of a)e.writeString(i);e.writeU32(t.primitives.length);for(const i of t.primitives)Tn(e,i,n(i.layer));return e.toUint8Array()}function On(t){const e=Sa(t),a=ee(e).bytes;return{uncompressed:e,compressed:a}}function Nt(t,e){t.writeU8(e<0?0:1)}function ct(t,e){t.writeU32(e.length);for(const a of e)t.writeF64(a)}function Tn(t,e,a){switch(e.kind){case"line":t.writeU8(Cn),t.writeU32(a),t.writeF64(e.x0),t.writeF64(e.y0),t.writeF64(e.x1),t.writeF64(e.y1);return;case"circle":t.writeU8(In),t.writeU32(a),t.writeF64(e.cx),t.writeF64(e.cy),t.writeF64(e.r),Nt(t,e.normalSign);return;case"arc":t.writeU8(Ln),t.writeU32(a),t.writeF64(e.cx),t.writeF64(e.cy),t.writeF64(e.r),t.writeF64(e.startAngle),t.writeF64(e.endAngle),Nt(t,e.normalSign);return;case"ellipse":t.writeU8(En),t.writeU32(a),t.writeF64(e.cx),t.writeF64(e.cy),t.writeF64(e.majorX),t.writeF64(e.majorY),t.writeF64(e.majorR),t.writeF64(e.minorR),t.writeF64(e.startAngle),t.writeF64(e.endAngle),t.writeU8(e.closed?1:0),Nt(t,e.normalSign??1);return;case"spline":t.writeU8(Bn),t.writeU32(a),ct(t,e.controlPoints),t.writeU32(e.degree),ct(t,e.knots),ct(t,e.weights),t.writeU8(e.closed?1:0),ct(t,e.fitPoints??[]);return;case"point":t.writeU8(Dn),t.writeU32(a),t.writeF64(e.x),t.writeF64(e.y);return;case"path":t.writeU8(Un),t.writeU32(a),t.writeU8(e.closed?1:0),ct(t,e.vertices);return;default:{const r=e;throw new Error(`Unsupported osnap primitive: ${String(r)}`)}}}const Rn=1480934209;function $n(t){if(t.version!==J)throw new Error(`Unsupported snapshot version: ${t.version}`);const e=new ne;e.writeU32(Rn),e.writeU8(J),e.writeU8(0),e.writeU8(0),e.writeU8(0),e.writeJson(jn(t)),e.writeJson(t.layers),e.writeString(t.activeLayoutBtrId),e.writeU32(t.layouts.length);for(const a of t.layouts)_n(e,a);return e.toUint8Array()}function jn(t){const e={...t.meta.savedViews??{}};for(const a of t.layouts)a.savedView&&(e[a.btrId]=a.savedView);if(Object.keys(e).length===0){if(t.meta.savedViews==null)return t.meta;const{savedViews:a,...r}=t.meta;return r}return{...t.meta,savedViews:e}}function _n(t,e){t.writeString(e.btrId),t.writeString(e.name),t.writeU8(e.isModelSpace?1:0),Vn(t,e.osnap),t.writeJson(e.viewports??null),t.writeU32(e.lineBatches.length);for(const a of e.lineBatches)Aa(t,a);t.writeU32(e.meshBatches.length);for(const a of e.meshBatches)za(t,a)}function Vn(t,e){if(!e||e.primitives.length===0){t.writeU32(0);return}const a=Sa(e);t.writeU32(a.length),t.writeBytes(a)}const Hn="application/vnd.mlightcad.acex-snapshot+binary";function Ma(t){if(t.version!==J)throw new Error(`Unsupported snapshot version: ${t.version}`);const e=$n(t),a=ee(e);return{payload:Xn(a.bytes),compression:a.compression}}function Yn(){return Hn}function Xn(t){let e="";for(let a=0;a<t.length;a++)e+=String.fromCharCode(t[a]);return btoa(e)}function tt(t,e,a){if(a<=0)return new Float32Array(0);const r=new Float32Array(a);for(let n=0;n<a;n++)r[n]=t[e+n];return r}function Gn(t,e,a){if(a<=0)return new Uint32Array(0);const r=new Uint32Array(a);for(let n=0;n<a;n++)r[n]=t[e+n];return r}function Pa(t,e){if(e.length===0)return{positions:t,indices:e};let a=0;for(let n=0;n<e.length;n++){const i=e[n];i>a&&(a=i)}const r=(a+1)*3;return r>=t.length?{positions:t,indices:e}:{positions:tt(t,0,r),indices:e}}function Ve(t,e){return t+e}const rt={x:0,y:0,z:0};function Kn(t){t.updateMatrixWorld(!0);const e=t.matrixWorld.elements;return rt.x=e[12],rt.y=e[13],rt.z=e[14],[rt.x,rt.y,rt.z]}function Wn(t,e){const a=e.elements,r=t.positions;if(r.length===0)return{positions:new Float32Array(0),indices:t.indices};const n=new Float32Array(r.length);for(let i=0;i<r.length;i+=3){const o=r[i],s=r[i+1],l=r[i+2];n[i]=a[0]*o+a[4]*s+a[8]*l+a[12],n[i+1]=a[1]*o+a[5]*s+a[9]*l+a[13],n[i+2]=a[2]*o+a[6]*s+a[10]*l+a[14]}return{positions:n,indices:t.indices?new Uint32Array(t.indices):void 0}}function Jn(t){const e=t.positions;if(e.length<3)return{slice:t,offset:[0,0,0]};let a=1/0,r=1/0,n=1/0,i=-1/0,o=-1/0,s=-1/0;for(let d=0;d<e.length;d+=3){const u=e[d],m=e[d+1],p=e[d+2];a=Math.min(a,u),r=Math.min(r,m),n=Math.min(n,p),i=Math.max(i,u),o=Math.max(o,m),s=Math.max(s,p)}const l=[(a+i)/2,(r+o)/2,(n+s)/2],c=new Float32Array(e.length);for(let d=0;d<e.length;d+=3)c[d]=e[d]-l[0],c[d+1]=e[d+1]-l[1],c[d+2]=e[d+2]-l[2];return{slice:{positions:c,indices:t.indices?new Uint32Array(t.indices):void 0},offset:l}}function qn(t,e,a={}){t.updateMatrixWorld(!0);const r=Wn(e,t.matrixWorld);return Jn(r)}function Zn(t){const e=t.image;if(!e||typeof document>"u")return;const a=document.createElement("canvas"),r=a.getContext("2d");if(!r)return;try{if(e instanceof ImageData)a.width=e.width,a.height=e.height,r.putImageData(e,0,0);else if(ti(e)){a.width=e.width,a.height=e.height;const l=ai(e.data,e.width*e.height),c=new ImageData(new Uint8ClampedArray(l),e.width,e.height);r.putImageData(c,0,0)}else if(Qn(e)){const l=ei(e);if(!l)return;a.width=l.width,a.height=l.height,r.drawImage(e,0,0)}else return}catch{return}const n=a.toDataURL("image/png"),i=n.indexOf(",");if(i<0)return;const o=atob(n.slice(i+1)),s=new Uint8Array(o.length);for(let l=0;l<o.length;l++)s[l]=o.charCodeAt(l);return{mimeType:"image/png",bytes:s}}function Qn(t){return t instanceof HTMLImageElement||t instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement}function ti(t){if(!t||typeof t!="object")return!1;const e=t;return e.data!=null&&typeof e.width=="number"&&typeof e.height=="number"&&e.width>=1&&e.height>=1}function ei(t){let e=Number(t.width),a=Number(t.height);if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,a=t.naturalHeight||t.height):typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement&&(e=t.videoWidth||t.width,a=t.videoHeight||t.height),!(!Number.isFinite(e)||!Number.isFinite(a)||e<1||a<1))return{width:e,height:a}}function ai(t,e){const a=e*4;if(t instanceof Uint8ClampedArray&&t.length>=a)return t.length===a?t:t.subarray(0,a);const r=new Uint8ClampedArray(a),n=Math.min(a,t.length);for(let i=0;i<n;i++)r[i]=t[i];if(t.length>=e*3&&t.length<a)for(let i=e-1;i>=0;i--){const o=i*3,s=i*4;r[s]=t[o],r[s+1]=t[o+1],r[s+2]=t[o+2],r[s+3]=255}return r}function ri(t,e){const a=t.getAttribute("uv");if(!a||a.count===0||a.itemSize<2)return;const r=Math.floor(e.length/3)*2;if(r<=0)return;const n=a.array;if(!(a.count*a.itemSize<r))return tt(n,0,r)}function ni(t){const e=t;return e.map?!1:e.transparent===!0&&typeof e.opacity=="number"&&e.opacity<.01}function ie(t){const e=t;if(e.isShaderMaterial===!0||t.type==="ShaderMaterial")return e}function ii(t){var e;const a=ie(t);if(!a)return;const r=a.uniforms.pattern,n=a.uniforms.patternLength;if(!r||!n)return;const i=r.value;if(!(!Array.isArray(i)||i.length===0))return{pattern:[...i],patternLength:Number(n.value),viewportScale:Number(((e=a.uniforms.u_viewportScale)==null?void 0:e.value)??1)}}function oi(t){var e;const a=ie(t);if(!a)return;const r=a.uniforms.u_patternLines;if(!r)return;const n=r.value;if(!(!Array.isArray(n)||n.length===0))return{patternAngle:Number(((e=a.uniforms.u_patternAngle)==null?void 0:e.value)??0),patternLines:n.map(li)}}function si(t){var e,a,r,n,i;const o=ie(t);if(!o||o.uniforms.u_patternLines)return;const s=(e=o.uniforms.u_startColor)==null?void 0:e.value,l=(a=o.uniforms.u_endColor)==null?void 0:a.value,c=o.uniforms.u_gradientType;if(!(!(s!=null&&s.getHex)||c==null))return{startColor:s.getHex(),endColor:((r=l==null?void 0:l.getHex)==null?void 0:r.call(l))??s.getHex(),angle:Number(((n=o.uniforms.u_angle)==null?void 0:n.value)??0),shift:Number(((i=o.uniforms.u_shift)==null?void 0:i.value)??0),gradientType:Number(c.value)}}function li(t){return{angle:t.angle,base:[t.base.x,t.base.y],offset:[t.offset.x,t.offset.y],dashLengths:[...t.dashLengths],patternLength:t.patternLength}}function Ca(t){const e=t.length/3;if(e<2)return new Float32Array(0);const a=new Float32Array(e);for(let r=0;r<e;r+=2){r===0?a[r]=0:a[r]=a[r-1];const n=t[r*3],i=t[r*3+1],o=t[r*3+2]??0,s=t[(r+1)*3],l=t[(r+1)*3+1],c=t[(r+1)*3+2]??0,d=s-n,u=l-i,m=c-o;a[r+1]=a[r]+Math.sqrt(d*d+u*u+m*m)}return a}function ci(t,e){const a=t.getAttribute(e);if(!a||a.count===0)return;const r=a.itemSize;if(t.getIndex()){const d=a.array;return tt(d,0,a.count*r)}const n=t.drawRange,i=a.count,o=Math.max(0,Math.min(Math.floor(n.start),i)),s=Math.max(0,i-o),l=!Number.isFinite(n.count)||n.count<=0?s:Math.min(Math.floor(n.count),s);if(l<=0)return;const c=a.array;return tt(c,o*r,l*r)}function He(t,e){const a=Math.atan2(e[1],e[0]),r=(i,o)=>[e[0]*i+e[4]*o+e[12],e[1]*i+e[5]*o+e[13]],n=(i,o)=>[e[0]*i+e[4]*o,e[1]*i+e[5]*o];return{patternAngle:t.patternAngle+a,patternLines:t.patternLines.map(i=>({angle:i.angle+a,base:r(i.base[0],i.base[1]),offset:n(i.offset[0],i.offset[1]),dashLengths:[...i.dashLengths],patternLength:i.patternLength}))}}function di(t,e){return{patternAngle:t.patternAngle,patternLines:t.patternLines.map(a=>{const r=new Ae(a.base[0]-e[0],a.base[1]-e[1]),n=new Ae(a.offset[0],a.offset[1]);return ur(r,n,a.angle,t.patternAngle,a.patternLength),{angle:a.angle,base:[r.x,r.y],offset:[a.offset[0],a.offset[1]],dashLengths:[...a.dashLengths],patternLength:a.patternLength}})}}function Yt(t,e){return!Number.isFinite(t)||t<0?0:Math.min(Math.floor(t),e)}function Xt(t,e,a){const r=Math.max(0,e-a);return!Number.isFinite(t)||t<=0?r:Math.min(Math.floor(t),r)}function Ye(t){const e=t.getAttribute("position");if(!e)return{positions:new Float32Array(0)};const a=t.drawRange,r=e.array,n=e.itemSize,i=t.getIndex();if(i){const l=tt(r,0,e.count*n),c=i.array,d=Yt(a.start,i.count),u=Xt(a.count,i.count,d),m=Gn(c,d,u);return Pa(l,m)}const o=Yt(a.start,e.count),s=Xt(a.count,e.count,o);return{positions:tt(r,o*n,s*n)}}function vt(t){return mr(t.flags)&&pr(t.flags)}function Ia(t){const{count:e}=t.mappingStats;for(let a=0;a<e;a++){let r;try{r=t.getGeometryRangeAt(a)}catch{continue}if(vt(r)&&r.bboxIntersectionCheck)return!0}return!1}function Xe(t){return dr(t).bboxIntersectionCheck===!0}function oe(t,e){const a=e.getAttribute("position");if(!a)return{positions:new Float32Array(0)};const r=a.itemSize,n=a.array,i=e.getIndex(),{count:o}=t.mappingStats;if(i){const l=tt(n,0,a.count*r),c=i.array,d=[];for(let u=0;u<o;u++){let m;try{m=t.getGeometryRangeAt(u)}catch{continue}const p=m.indexStart??0,g=m.indexCount??0;if(!(!vt(m)||g<=0))for(let h=0;h<g;h++)d.push(c[p+h])}return d.length===0?{positions:new Float32Array(0)}:Pa(l,new Uint32Array(d))}const s=[];for(let l=0;l<o;l++){let c;try{c=t.getGeometryRangeAt(l)}catch{continue}if(!vt(c)||c.vertexCount<=0)continue;const d=c.vertexStart*r,u=c.vertexCount*r;for(let m=0;m<u;m++)s.push(n[d+m])}return{positions:new Float32Array(s)}}function yt(t,e,a){t.push(e.getX(a),e.getY(a),e.getZ(a))}function ui(t,e){const a=e.getAttribute("instanceStart"),r=e.getAttribute("instanceEnd");if(!a||!r)return{positions:new Float32Array(0)};const{count:n}=t.mappingStats,i=[];for(let o=0;o<n;o++){let s;try{s=t.getGeometryRangeAt(o)}catch{continue}if(!vt(s)||s.vertexCount<=0)continue;const l=s.vertexStart,c=l+s.vertexCount;for(let d=l;d<c;d++)yt(i,a,d),yt(i,r,d)}return{positions:new Float32Array(i)}}function mi(t,e){const a=t.instanceCount;if(Number.isFinite(a)&&a>=0)return Math.min(Math.floor(a),e);const r=t.drawRange,n=Yt(r.start,e);return Xt(r.count,e,n)}function pi(t){const e=t.getAttribute("instanceStart"),a=t.getAttribute("instanceEnd");if(!e||!a||e.count===0)return{positions:new Float32Array(0)};const r=mi(t,e.count);if(r<=0)return{positions:new Float32Array(0)};const n=[];for(let i=0;i<r;i++)yt(n,e,i),yt(n,a,i);return{positions:new Float32Array(n)}}function Ot(t){return cr(t)}function La(t){if(t instanceof wr)return t.linewidth}function Tt(t){if("material"in t){const e=t.userData.originalMaterial??t.material;return Array.isArray(e)?e[0]:e}return t.material}function pt(t){var e;const a=ua(t),r=a.layer??"0",n=t;let i=n.color!=null?n.color.getHex():a.color??16777215;const o=ii(t),s=oi(t),l=si(t);if(t instanceof br||t.type==="ShaderMaterial"){const c=(e=t.uniforms.u_color)==null?void 0:e.value;c!=null&&c.getHex?i=c.getHex():l&&(i=l.startColor)}return{color:i,layer:r,linePattern:o,hatchPattern:s,gradientFill:l,side:s||l?t.side:void 0}}function hi(t,e){const a=ua(e).drawOrder??t.renderOrder;return a===0?void 0:a}function ht(t,e,a){const r=hi(e,a);r!=null&&(t.renderOrder=r)}function fi(t,e){if(!e)return;const a=t.userData.bakedWorldMatrix;return a&&a.length>=16?He(e,a):(t.updateMatrixWorld(!0),He(e,Array.from(t.matrixWorld.elements)))}function Mt(t){return Kn(t)}function Rt(t,e,a={}){const r=qn(t,e,a);return{...r.slice,offset:r.offset}}function se(t,e,a,r,n){const i=pt(e),o=fi(a,i.hatchPattern),s=o?di(o,n):void 0,l=i.gradientFill?ci(t,"gradientPosition"):void 0,c={layer:i.layer,color:i.color,offset:n,hatchPattern:s,gradientFill:i.gradientFill,gradientPositions:l,side:i.side,...r},d=e;if(d.map){const u=Zn(d.map),m=ri(t,r.positions);if(!u||!m)return;c.texture=u,c.uvs=m,c.color=16777215,c.side=xr}return ht(c,a,e),c}function gi(t){const e=ui(t,t.geometry);if(e.positions.length===0)return;const{color:a,layer:r}=pt(t.material),n=La(t.material),i={layer:r,color:a,offset:Mt(t),lineWidth:n,...e};return Ia(t)&&(i.excludeFromOsnap=!0),ht(i,t,t.material),i}function bi(t){const e=oe(t,t.geometry);if(e.positions.length===0)return;const{color:a,layer:r,linePattern:n}=pt(t.material),i=n?Ca(e.positions):void 0,o={layer:r,color:a,offset:Mt(t),linePattern:n,lineDistances:i,...e};return Ia(t)&&(o.excludeFromOsnap=!0),ht(o,t,t.material),o}function wi(t){const e=oe(t,t.geometry);if(e.positions.length!==0)return se(t.geometry,t.material,t,e,Mt(t))}function xi(t){const e=oe(t,t.geometry);if(e.positions.length===0)return;const a=se(t.geometry,t.material,t,e,Mt(t));if(a)return{points:!0,...a}}function vi(t){const e=[],a=[];return t.traverse(r=>{if(!(nr(r)||ir(r))){if(r instanceof ye){const n=bi(r);n&&e.push(n);return}if(r instanceof or){const n=gi(r);n&&e.push(n);return}if(r instanceof ke){const n=wi(r);n&&a.push(n);return}if(r instanceof sr){const n=xi(r);n&&a.push(n);return}if(r instanceof hr){if(!Ot(r))return;const n=pi(r.geometry);if(n.positions.length===0)return;const i=Tt(r),{color:o,layer:s}=pt(i),{offset:l,...c}=Rt(r,n),d={layer:s,color:o,offset:l,lineWidth:La(i),...c};Xe(r)&&(d.excludeFromOsnap=!0),ht(d,r,i),e.push(d)}else if(r instanceof fr&&!(r instanceof ye)){if(!Ot(r))return;const n=Ye(r.geometry);if(n.positions.length===0)return;const i=Tt(r),{color:o,layer:s,linePattern:l}=pt(i),{offset:c,...d}=Rt(r,n),u=l?Ca(d.positions):void 0,m={layer:s,color:o,offset:c,linePattern:l,lineDistances:u,...d};Xe(r)&&(m.excludeFromOsnap=!0),ht(m,r,i),e.push(m)}else if(r instanceof gr&&!(r instanceof ke)){if(!Ot(r))return;const n=Tt(r);if(ni(n))return;const i=Ye(r.geometry);if(i.positions.length===0)return;const{offset:o,...s}=Rt(r,i),l=se(r.geometry,n,r,s,o);l&&a.push(l)}}}),{lineBatches:e,meshBatches:a}}const Ge={size:8,colorCss:"#0080ff",hotColorCss:"#ff0000"};function Ke(t){const e=new Ir(Lr.ByACI,t);return e.cssColor??`rgb(${e.red}, ${e.green}, ${e.blue})`}function yi(t){try{const e=Pr.instance(),a=e.getVar(Dt.GRIPSIZE,t),r=e.getVar(Dt.GRIPCOLOR,t),n=e.getVar(Dt.GRIPHOT,t);return!(a>0)||!Number.isFinite(a)?Ge:{size:a,colorCss:Ke(r),hotColorCss:Ke(n)}}catch{return Ge}}function We(t,e){const a=t.extmin,r=t.extmax,n=yi(t);return{title:e==null?void 0:e.title,extents:{minX:a.x,minY:a.y,maxX:r.x,maxY:r.y},units:{insunits:t.insunits,lunits:t.lunits,luprec:t.luprec,aunits:t.aunits,auprec:t.auprec,measurement:t.measurement,ltscale:t.ltscale,angbase:t.angbase,angdir:t.angdir},grip:n,background:(e==null?void 0:e.background)??0}}function Je(t,e,a,r,n){return Math.atan2(r-e,n*(a-t))}function le(t){return t.z>=0?1:-1}function Ea(t,e,a){if(!(a.radius>0)||!Number.isFinite(a.radius))return;const r=a.clockwise?-1:1,n=a.center.x,i=a.center.y;t.push({kind:"arc",layer:e,cx:n,cy:i,r:a.radius,startAngle:Je(n,i,a.startPoint.x,a.startPoint.y,r),endAngle:Je(n,i,a.endPoint.x,a.endPoint.y,r),normalSign:r})}function I(t,e){const a=new G(e.x,e.y,e.z??0).applyMatrix4(t);return{x:a.x,y:a.y}}function ki(t){const e=t.elements;return new Ft(e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14],e[3],e[7],e[11],e[15])}function kt(t,e){return new Ft().multiplyMatrices(t,ki(e))}function Ba(t,e){const a=new G(e.x,e.y,e.z??0).transformDirection(t).normalize();return{x:a.x,y:a.y}}function Gt(t){const e=new G(t.elements[0],t.elements[1],t.elements[2]).length(),a=new G(t.elements[4],t.elements[5],t.elements[6]).length();return it.equal(e,a,ma*Math.max(e,a,1))}function Ai(t,e){const a=t.tables.blockTable.getIdAt(e);if(a)return a;for(const n of t.tables.blockTable.newIterator())if(n.objectId===e)return n;const r=t.tables.blockTable.modelSpace;if(r.objectId===e)return r}function zi(t){if(t instanceof en)return!0;const e=t;return(e.type==="LINE"||e.type==="Line")&&e.startPoint!=null&&e.endPoint!=null}function Fi(t,e,a,r){r.startPoint,r.endPoint}function Da(t,e){return t.blockTableRecord??(t.blockName?e.tables.blockTable.getAt(t.blockName):void 0)}function Si(t,e){const a=t.dimBlockId;return a?e.tables.blockTable.getAt(a):void 0}function Mi(t,e){const a=Da(t,e);if(a)return a;const r=t.owningBlockRecordId;return r?e.tables.blockTable.getAt(r):void 0}function Ua(t){return t.getFullInsertionTransform()}function Pi(t){for(const e of t.newIterator())return!0;return!1}function Ci(t){return typeof t.getFullInsertionTransform=="function"&&"blockTableRecord"in t}function q(t,e,a,r,n){if(r.length<2)return;const i=Gt(a),o=a.elements[0]*a.elements[5]-a.elements[4]*a.elements[1]<0?-1:1,s=[];for(const l of r){const c=I(a,l);let d=l.bulge??0;it.isPositive(Math.abs(d))&&(d=i?d*o:0),s.push(c.x,c.y,d)}t.push({kind:"path",layer:e,closed:n,vertices:s})}function Na(t,e){return it.equal(t.x,e.x)&&it.equal(t.y,e.y)}function Ii(t){return(t.clockwise?-1:1)*Math.tan(t.deltaAngle/4)}function qe(t,e,a,r){if(t.length===0){t.push({x:e.x,y:e.y,z:e.z??0,bulge:r}),t.push({x:a.x,y:a.y,z:a.z??0,bulge:0});return}const n=t[t.length-1];Na(n,e)?n.bulge=r:(n.bulge=0,t.push({x:e.x,y:e.y,z:e.z??0,bulge:r})),t.push({x:a.x,y:a.y,z:a.z??0,bulge:0})}function Ze(t){return t.length>=2&&Na(t[0],t[t.length-1])&&t.pop(),t}function ut(t,e,a,r,n){if(r.length<2)return;const i=n?r.length:r.length-1;for(let o=0;o<i;o++)r[o],r[(o+1)%r.length]}function Li(t,e,a,r){const n=[r.startPosition];for(const i of r.segments)n.push(i.position);ut(t,e,a,n,r.closed)}function Ei(t,e,a){if(a.vertices.length>=2)return a.vertices;if(a.vertices.length===0)return[];const r=a.vertices[0],n=e.lastLeaderLinePoint??e.landingPoint??t.landingPoint??t.contentBasePosition;if(!n)return a.vertices;const i=r.x-n.x,o=r.y-n.y,s=(r.z??0)-(n.z??0);return Math.hypot(i,o,s)<=ma?a.vertices:[r,n]}function Bi(t,e,a,r){var n,i;for(const s of r.leaders)for(const l of s.leaderLines){const c=Ei(r,s,l);ut(t,e,a,c,!1)}const o=s=>{if(!s)return;const l=I(a,s);t.push({kind:"point",layer:e,x:l.x,y:l.y})};o(r.contentBasePosition),o((n=r.mtextContent)==null?void 0:n.anchorPoint),o((i=r.blockContent)==null?void 0:i.position)}function Di(t,e,a,r){const n=r.numberOfVertices;if(n<2)return;const i=r.elevation,o=r.closed?n:n-1;for(let s=0;s<o;s++){const l=r.getPointAt(s),c=r.getPointAt((s+1)%n),d=r.getBulgeAt(s),u={x:l.x,y:l.y,z:i},m={x:c.x,y:c.y,z:i};if(it.isPositive(Math.abs(d))){const p=I(a,u),g=I(a,m);Ea(t,e,new qt(p,g,d))}}}function Ui(t,e,a,r,n,i){const o=I(a,r),s=new G(a.elements[0],a.elements[1],a.elements[2]).length(),l={kind:"circle",layer:e,cx:o.x,cy:o.y,r:n*s,normalSign:le(i)};t.push(l)}function Ni(t,e,a,r){const n=I(a,r.center),i=new G(a.elements[0],a.elements[1],a.elements[2]).length(),o={kind:"arc",layer:e,cx:n.x,cy:n.y,r:r.radius*i,startAngle:r.startAngle,endAngle:r.endAngle,normalSign:le(r.normal)};t.push(o)}function $t(t,e,a,r){const n=I(a,r.center),i=r._geo,o=(i==null?void 0:i.majorAxis)??{x:1,y:0,z:0},s=Ba(a,o),l=Math.hypot(s.x,s.y)||1,c=new G(a.elements[0],a.elements[1],a.elements[2]).length(),d=new G(a.elements[4],a.elements[5],a.elements[6]).length(),u={kind:"ellipse",layer:e,cx:n.x,cy:n.y,majorX:s.x/l,majorY:s.y/l,majorR:r.majorAxisRadius*c,minorR:r.minorAxisRadius*d,startAngle:r.startAngle,endAngle:r.endAngle,closed:r.closed,normalSign:le(r.normal)};t.push(u)}function Oi(t,e,a,r){var n,i;const o=r._geo;if(!((n=o==null?void 0:o.controlPoints)!=null&&n.length))return;const s=[];for(const c of o.controlPoints){const d=I(a,c);s.push(d.x,d.y)}const l={kind:"spline",layer:e,controlPoints:s,degree:o.degree??3,knots:[...o.knots??[]],weights:[...o.weights??[]],closed:o.closed??!1};if((i=o.fitPoints)!=null&&i.length){l.fitPoints=[];for(const c of o.fitPoints){const d=I(a,c);l.fitPoints.push(d.x,d.y)}}t.push(l)}const Qe=1e-6;function Ti(t){var e;const a=t.elevation,r=(e=t._geo)==null?void 0:e.vertices;return r&&r.length>1?r.map(n=>({x:n.x,y:n.y,z:a,bulge:n.bulge,startWidth:n.startWidth,endWidth:n.endWidth})):Array.from({length:t.numberOfVertices},(n,i)=>{const o=t.getPoint2dAt(i);return{x:o.x,y:o.y,z:a,bulge:0}})}function Ri(t){return t.some(e=>{const a=Math.max(0,e.startWidth??0),r=Math.max(0,e.endWidth??0);return a>Qe||r>Qe})}function $i(t,e,a,r){const n=Ti(r),i=n.length;if(i<2)return;if(Ri(n)){q(t,e,a,n,r.closed);return}const o=r.closed?i:i-1;for(let s=0;s<o;s++){const l=n[s],c=n[(s+1)%i],d=l.bulge??0;if(it.isPositive(Math.abs(d))){const u=I(a,l),m=I(a,c);Ea(t,e,new qt(u,m,d))}}}function ji(t,e,a,r,n){const i=I(a,{x:r.center.x,y:r.center.y,z:n}),o=Ba(a,{x:Math.cos(r.rotation),y:Math.sin(r.rotation),z:0}),s=Math.hypot(o.x,o.y)||1,l=new G(a.elements[0],a.elements[1],a.elements[2]).length(),c=new G(a.elements[4],a.elements[5],a.elements[6]).length();t.push({kind:"ellipse",layer:e,cx:i.x,cy:i.y,majorX:o.x/s,majorY:o.y/s,majorR:r.majorAxisRadius*l,minorR:r.minorAxisRadius*c,startAngle:r.startAngle,endAngle:r.endAngle,closed:!1,normalSign:r.clockwise?-1:1})}function _i(t,e,a,r,n){var i;const o=r.numberOfVertices;if(o<2)return;const s=[];for(let l=0;l<o;l++){const c=r.getPointAt(l);s.push({x:c.x,y:c.y,z:n,bulge:((i=r.vertices[l])==null?void 0:i.bulge)??0})}q(t,e,a,s,r.closed)}function Vi(t,e,a,r,n){if(r instanceof rn){_i(t,e,a,r,n);return}if(!(r instanceof nn))return;const i=[];let o=!1;const s=()=>{const c=Ze(i);c.length>=2&&q(t,e,a,c,!1),i.length=0};for(const c of r.curves)c instanceof on?qe(i,{x:c.startPoint.x,y:c.startPoint.y,z:n},{x:c.endPoint.x,y:c.endPoint.y,z:n},0):c instanceof qt?qe(i,{x:c.startPoint.x,y:c.startPoint.y,z:n},{x:c.endPoint.x,y:c.endPoint.y,z:n},Ii(c)):c instanceof sn&&(o=!0,s(),ji(t,e,a,c,n));const l=Ze(i);l.length>=2&&q(t,e,a,l,!o)}function Hi(t,e,a,r){var n;const i=(n=r._geo)==null?void 0:n.loops;if(!(i!=null&&i.length))return;const o=r.elevation;for(const s of i)Vi(t,e,a,s,o)}function Yi(t,e,a,r){kt(a,Ua(r));const n=[0];for(let o=0;o<r.numColumns;o++)n.push(n[o]+r.columnWidth(o));const i=[0];for(let o=0;o<r.numRows;o++)i.push(i[o]-r.rowHeight(o));n[n.length-1],i[i.length-1];for(const o of i);for(const o of n);}function Xi(t,e,a,r,n,i,o,s=!0){const l=Kt(t.layer,a);if(o&&!o(l))return;const c=Mi(t,i);if(c&&!n.has(c.objectId)&&Pi(c)){n.add(c.objectId);const u=kt(e,Ua(t));At(c,u,l,r,n,i,o,s),n.delete(c.objectId);return}Yi(r,l,e,t);const d=I(e,t.position);r.push({kind:"point",layer:l,x:d.x,y:d.y})}function Gi(t,e,a,r){let n=r.boundaryPath();if(n.length>1){const o=n[0],s=n[n.length-1];o.x===s.x&&o.y===s.y&&(o.z??0)===(s.z??0)&&(n=n.slice(0,-1))}n.length>=2&&q(t,e,a,n,!0);const i=I(a,r.position);t.push({kind:"point",layer:e,x:i.x,y:i.y})}function Ki(t,e,a,r){const n=r.position();q(t,e,a,[n.upperLeft,n.upperRight,n.lowerRight,n.lowerLeft],!0);const i=I(a,r.getLocation());t.push({kind:"point",layer:e,x:i.x,y:i.y})}function Wi(t){var e;const a=(e=t.attributeIterator)==null?void 0:e.call(t);return a?typeof a.toArray=="function"?a.toArray():[...a]:[]}function Kt(t,e){return t==="0"?e:t}function Oa(t,e,a,r,n,i,o,s=!0){if(!t.visibility)return;const l=Kt(t.layer,a);if(!(o&&!o(l))){if(t instanceof Er){Xi(t,e,a,r,n,i,o,s);return}if(Ci(t)){const c=Da(t,i);if(!c||n.has(c.objectId))return;n.add(c.objectId);const d=t.getFullInsertionTransform(),u=Math.max(1,t.columnCount??1),m=Math.max(1,t.rowCount??1),p=t.columnSpacing??0,g=t.rowSpacing??0,h=Kt(t.layer,a);for(let w=0;w<m;w++)for(let A=0;A<u;A++){const z=kt(e,d);(A!==0||w!==0)&&z.multiply(new Ft().makeTranslation(A*p,w*g,0));const L=I(z,{x:0,y:0,z:0});r.push({kind:"point",layer:h,x:L.x,y:L.y}),At(c,z,h,r,n,i,o,s)}for(const w of Wi(t))w instanceof Br,w.isInvisible||Oa(w,e,h,r,n,i,o,s);n.delete(c.objectId);return}if(t instanceof Dr){const c=t,d=Si(c,i);if(!d||n.has(d.objectId))return;n.add(d.objectId);const u=kt(e,c.getFullDimBlockTransform());At(d,u,l,r,n,i,o,!0),n.delete(d.objectId);return}if(zi(t)){Fi(r,l,e,t);return}if(t instanceof Ur){Gt(e)?Ui(r,l,e,t.center,t.radius,t.normal):$t(r,l,e,Ji(t));return}if(t instanceof Nr){Gt(e)?Ni(r,l,e,t):$t(r,l,e,qi(t));return}if(t instanceof Jt){$t(r,l,e,t);return}if(t instanceof Or){Oi(r,l,e,t);return}if(t instanceof Tr){$i(r,l,e,t);return}if(t instanceof Rr){Di(r,l,e,t);return}if(t instanceof $r){const c=[];for(let d=0;d<t.numberOfVertices;d++)c.push(t.getPointAt(d));ut(r,l,e,c,t.closed);return}if(t instanceof jr){s&&Hi(r,l,e,t);return}if(t instanceof _r){t.basePoint,t.unitDir;return}if(t instanceof Vr){t.basePoint,t.unitDir;return}if(t instanceof Hr){q(r,l,e,[t.getPointAt(0),t.getPointAt(1),t.getPointAt(3),t.getPointAt(2)],!0);return}if(t instanceof Yr){s&&q(r,l,e,[t.getPointAt(0),t.getPointAt(1),t.getPointAt(3),t.getPointAt(2)],!0);return}if(t instanceof Xr){const c=t.subGetGripPoints();c.length>=2&&ut(r,l,e,c,c.length>=3);return}if(t instanceof Gr){const c=t.vertices;c.length>=2&&ut(r,l,e,c,!1);return}if(t instanceof Kr){Li(r,l,e,t);return}if(t instanceof Wr){Bi(r,l,e,t);return}if(t instanceof Jr){const c=I(e,t.position);r.push({kind:"point",layer:l,x:c.x,y:c.y});return}if(t instanceof qr){const c=I(e,t.location);r.push({kind:"point",layer:l,x:c.x,y:c.y});return}if(t instanceof Zr){s&&Ki(r,l,e,t);return}if(t instanceof Qr){s&&Gi(r,l,e,t);return}if(t instanceof tn){const c=I(e,t.position);r.push({kind:"point",layer:l,x:c.x,y:c.y})}}}function At(t,e,a,r,n,i,o,s=!0){for(const l of t.newIterator())Oa(l,e,a,r,n,i,o,s)}function Ji(t){return new Jt(t.center,t.normal,{x:1,y:0,z:0},t.radius,t.radius,0,an)}function qi(t){return new Jt(t.center,t.normal,{x:1,y:0,z:0},t.radius,t.radius,t.startAngle,t.endAngle)}function Zi(t,e,a={}){const r=Ai(t,e);if(!r)return{primitives:[]};const n=[],i=new Ft;return At(r,i,"0",n,new Set,t,a.includeLayer),{primitives:n.filter(o=>o.kind!=="line"&&Qi(o))}}function Qi(t){switch(t.kind){case"line":return Number.isFinite(t.x0)&&Number.isFinite(t.y0)&&Number.isFinite(t.x1)&&Number.isFinite(t.y1);case"circle":return Number.isFinite(t.cx)&&Number.isFinite(t.cy)&&Number.isFinite(t.r);case"arc":return Number.isFinite(t.cx)&&Number.isFinite(t.cy)&&Number.isFinite(t.r)&&Number.isFinite(t.startAngle)&&Number.isFinite(t.endAngle);case"ellipse":return Number.isFinite(t.cx)&&Number.isFinite(t.cy)&&Number.isFinite(t.majorX)&&Number.isFinite(t.majorY)&&Number.isFinite(t.majorR)&&Number.isFinite(t.minorR)&&Number.isFinite(t.startAngle)&&Number.isFinite(t.endAngle);case"spline":return t.controlPoints.every(e=>Number.isFinite(e))&&t.knots.every(e=>Number.isFinite(e))&&t.weights.every(e=>Number.isFinite(e));case"point":return Number.isFinite(t.x)&&Number.isFinite(t.y);case"path":return t.vertices.length>=6&&t.vertices.length%3===0&&t.vertices.every(e=>Number.isFinite(e));default:return t}}const to=["en","zh","cs","tr","ar"];function ce(t){if(t==null||t==="")return null;const e=t.toLowerCase().replace("_","-");for(const a of to)if(e===a||e.startsWith(`${a}-`))return a;return null}const eo=1128612673;function ao(t){const e=new ne;e.writeU32(eo),e.writeU8(J),e.writeU8(0),e.writeU8(0),e.writeU8(0),e.writeString(t.layoutBtrId),e.writeU32(t.lineBatches.length);for(const a of t.lineBatches)Aa(e,a);e.writeU32(t.meshBatches.length);for(const a of t.meshBatches)za(e,a);return e.toUint8Array()}function ro(t){const e=ao(t),a=ee(e).bytes;return{uncompressed:e,compressed:a}}const no=1,io=2*1024*1024,Pt=2*1024*1024,oo=512*1024,so=8*1024*1024,ta=12*1024*1024,lo=2*1024*1024,Ct="drawing.acex.json",co=`./${Ct}`,Wt={layerOn:zr,layerOff:Fr,chevronDown:Mr},uo=[90,45,30,23,18,10,5];function mo(){return`<div id="mlcad-polar-angles" role="group" data-i18n-attr="aria-label" data-i18n-key="settings.polarAngles" aria-label="Polar tracking angles" hidden>
          ${uo.map(t=>`<button type="button" class="mlcad-tool-btn mlcad-settings-option-btn mlcad-polar-angle-btn" data-polar-ang="${t}" title="${t}°" aria-label="${t}°"><span class="mlcad-settings-option-indicator" aria-hidden="true"></span><span class="mlcad-settings-option-text">${t}°</span></button>`).join("")}
        </div>`}const po=600,ho=960,de=`
  :root {
    --mlcad-ui-bg: rgba(24, 26, 30, 0.94);
    --mlcad-ui-bg-elevated: rgba(32, 35, 40, 0.98);
    --mlcad-ui-border: rgba(255, 255, 255, 0.1);
    --mlcad-ui-text: #e8eaed;
    --mlcad-ui-muted: #9aa0a6;
    --mlcad-accent: #08e8de;
    --mlcad-accent-active: #1a8cff;
    /* Shared measure-tool SVGs read --el-color-primary (Element Plus in cad-viewer). */
    --el-color-primary: var(--mlcad-accent);
    --ml-ui-accent: var(--mlcad-accent);
    --ml-ui-bg: var(--mlcad-ui-bg);
    --ml-ui-bg-elevated: var(--mlcad-ui-bg-elevated);
    --ml-ui-border: var(--mlcad-ui-border);
    --ml-ui-text: var(--mlcad-ui-text);
    --ml-ui-muted: var(--mlcad-ui-muted);
    --mlcad-tool-btn-active-border: rgba(26, 140, 255, 0.55);
    --mlcad-tool-btn-active-bg: rgba(26, 140, 255, 0.22);
    --mlcad-measure-accent: #08e8de;
    --mlcad-measure-accent-border: rgba(8, 232, 222, 0.45);
    --mlcad-measure-accent-fill: rgba(8, 232, 222, 0.2);
    --mlcad-markup-accent: #e53935;
    --mlcad-markup-accent-border: rgba(229, 57, 53, 0.45);
    --mlcad-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
    --mlcad-toolbar-width: 44px;
    --mlcad-drawer-width: 220px;
    --mlcad-drawer-gap: 8px;
    --mlcad-ui-inset: 12px;
    --mlcad-review-max-height: calc(100vh - 2 * var(--mlcad-ui-inset) - 48px);
    --mlcad-z-chrome: 7;
    /* Drawing overlays stay under chrome, session panel, and modal dialogs. */
    --mlcad-z-measure: 1;
    --mlcad-z-markup: 2;
    --ml-ui-grip-size: 8px;
    --ml-ui-grip-normal: #0080ff;
    --ml-ui-grip-hot: #ff0000;
  }
  html, body {
    margin: 0; height: 100%; overflow: hidden;
    background: #121418;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    color: var(--mlcad-ui-text);
  }
  #mlcad-root { position: relative; width: 100%; height: 100%; }
  #mlcad-canvas-host {
    position: absolute;
    inset: 0;
    min-width: 0;
    min-height: 0;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
  #mlcad-canvas-host canvas,
  #mlcad-root > canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }

  .mlcad-snap-loupe {
    position: absolute;
    left: 8px;
    top: 8px;
    width: 128px;
    height: 128px;
    box-sizing: border-box;
    border: 2px solid var(--mlcad-measure-accent, #08e8de);
    border-radius: 2px;
    pointer-events: none;
    z-index: 8;
    overflow: hidden;
    box-shadow: var(--mlcad-shadow);
  }

  html[data-mlcad-theme="light"] {
    --mlcad-ui-bg: rgba(255, 255, 255, 0.94);
    --mlcad-ui-bg-elevated: rgba(248, 249, 250, 0.98);
    --mlcad-ui-border: rgba(0, 0, 0, 0.12);
    --mlcad-ui-text: #202124;
    --mlcad-ui-muted: #5f6368;
    --mlcad-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
  }
  html[data-mlcad-theme="light"],
  html[data-mlcad-theme="light"] body {
    background: #e8eaed;
    color: var(--mlcad-ui-text);
  }

  #mlcad-sidebar {
    position: absolute;
    left: var(--mlcad-ui-inset);
    top: 50%;
    z-index: var(--mlcad-z-chrome);
    transform: translateY(-50%);
    display: flex;
    align-items: flex-start;
    gap: var(--mlcad-drawer-gap);
    max-width: calc(100% - 2 * var(--mlcad-ui-inset));
    box-sizing: border-box;
    pointer-events: none;
  }
  #mlcad-sidebar > * { pointer-events: auto; }

  #mlcad-toolbar {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
  }
  /* AcUiToolbar chrome replaces the old .mlcad-tool-btn shell styles. */
  #mlcad-toolbar .ml-ex-ui-toolbar {
    position: relative !important;
    inset: auto !important;
    left: auto !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    transform: none !important;
    background: var(--mlcad-ui-bg);
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 8px;
    box-shadow: var(--mlcad-shadow);
    backdrop-filter: blur(12px);
    --ml-ex-ui-toolbar-btn-size: var(--mlcad-toolbar-width);
  }
  #mlcad-toolbar .ml-ex-ui-toolbar.is-left,
  #mlcad-toolbar .ml-ex-ui-toolbar.is-right {
    flex-direction: column;
  }
  #mlcad-toolbar .ml-ex-ui-toolbar.is-bottom,
  #mlcad-toolbar .ml-ex-ui-toolbar.is-top {
    flex-direction: row;
    width: 100%;
    box-sizing: border-box;
  }
  #mlcad-sidebar > #mlcad-toolbar.ml-ex-ui-toolbar-host {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  /* Phone strips mount on #mlcad-root so they can sit above the bottom bar. */
  #mlcad-root > .ml-ex-ui-subtoolbar {
    z-index: calc(var(--mlcad-z-chrome) + 1);
  }
  .mlcad-tool-btn {
    position: relative;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2px;
    width: var(--mlcad-toolbar-width); height: var(--mlcad-toolbar-width);
    margin: 0; padding: 0;
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    color: var(--mlcad-ui-text);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }
  .mlcad-tool-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--mlcad-ui-border);
  }
  .mlcad-tool-btn.active,
  .mlcad-tool-btn.is-menu-open {
    background: var(--mlcad-tool-btn-active-bg);
    border-color: var(--mlcad-tool-btn-active-border);
    color: #fff;
  }
  .mlcad-tool-btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  .mlcad-tool-btn-icon svg,
  .mlcad-tool-btn svg {
    width: 20px; height: 20px; display: block; flex-shrink: 0;
  }
  .mlcad-tool-btn-label {
    display: none;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    line-height: 1.2;
    text-align: center;
    pointer-events: none;
  }
  /* Settings is always on the bar (desktop/pad/phone); language lives under it. */
  /* Flyout mark: opaque corner triangle (cad-simple-ui-plugin is-left style). */
  .mlcad-tool-btn.has-children::after {
    content: '';
    position: absolute;
    right: 1px;
    bottom: 1px;
    width: 6px;
    height: 6px;
    background: currentColor;
    clip-path: polygon(100% 100%, 0 100%, 100% 0);
    pointer-events: none;
  }
  .mlcad-dropdown {
    position: fixed;
    z-index: 40;
    min-width: 180px;
    max-width: min(280px, calc(100vw - 24px));
    max-height: min(360px, calc(100vh - 24px));
    overflow-y: auto;
    padding: 4px;
    background: var(--mlcad-ui-bg-elevated);
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 8px;
    box-shadow: var(--mlcad-shadow);
    backdrop-filter: blur(12px);
  }
  .mlcad-dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 6px 8px;
    border: none;
    border-radius: 5px;
    background: transparent;
    color: var(--mlcad-ui-text);
    font-size: 12px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
  }
  .mlcad-dropdown-item:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .mlcad-dropdown-item.active,
  .mlcad-dropdown-item.is-toggled {
    background: rgba(26, 140, 255, 0.22);
    color: #fff;
  }
  .mlcad-dropdown-icon {
    display: inline-flex;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
  }
  .mlcad-dropdown-icon svg {
    width: 18px;
    height: 18px;
    display: block;
  }
  .mlcad-dropdown-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mlcad-dropdown-separator {
    height: 1px;
    margin: 4px 6px;
    background: var(--mlcad-ui-border);
  }
  #mlcad-toolbar-toggle {
    height: calc(var(--mlcad-toolbar-width) / 2);
    margin-top: -4px;
    margin-bottom: -4px;
    border-radius: 4px;
  }
  #mlcad-toolbar-toggle svg {
    width: calc(var(--mlcad-toolbar-width) / 2);
    height: calc(var(--mlcad-toolbar-width) / 2);
  }
  .mlcad-tool-separator {
    height: 1px;
    margin: 4px 8px;
    background: var(--mlcad-ui-border);
  }
  .mlcad-locale-option-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    user-select: none;
  }
  #mlcad-zoom-window-rect,
  #mlcad-selection-rect {
    position: fixed;
    z-index: 25;
    box-sizing: border-box;
    pointer-events: none;
    border: 1px dashed var(--mlcad-accent, #08e8de);
    background: rgba(8, 232, 222, 0.12);
  }
  #mlcad-zoom-window-rect[hidden],
  #mlcad-selection-rect[hidden] { display: none; }
  #mlcad-selection-rect[data-mode='window'] {
    border-style: solid;
    border-color: #00ff5a;
    background: rgba(64, 158, 255, 0.12);
  }
  #mlcad-selection-rect[data-mode='crossing'] {
    border-style: dashed;
    border-color: #00d1ff;
    background: rgba(64, 158, 255, 0.12);
  }

  #mlcad-layer-drawer,
  #mlcad-review-drawer,
  #mlcad-measure-drawer {
    flex-shrink: 1;
    min-width: 0;
    width: var(--mlcad-drawer-width);
    max-height: min(420px, var(--mlcad-review-max-height));
    display: flex; flex-direction: column;
    background: var(--mlcad-ui-bg-elevated);
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 8px;
    box-shadow: var(--mlcad-shadow);
    backdrop-filter: blur(12px);
    overflow: hidden;
    box-sizing: border-box;
  }
  #mlcad-markup-strip-wrap {
    position: relative;
  }
  #mlcad-review-drawer {
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: var(--mlcad-drawer-gap);
    width: min(320px, calc(100vw - 2 * var(--mlcad-ui-inset) - var(--mlcad-toolbar-width) - var(--mlcad-drawer-gap)));
    height: 100%;
    max-height: var(--mlcad-review-max-height);
  }
  #mlcad-layer-drawer[hidden],
  #mlcad-review-drawer[hidden],
  #mlcad-measure-drawer[hidden] { display: none; }

  .mlcad-drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    gap: 6px; padding: 8px 10px;
    border-bottom: 1px solid var(--mlcad-ui-border);
    font-size: 13px; font-weight: 600;
  }
  .mlcad-drawer-close {
    width: 28px; height: 28px; padding: 0;
    border: none; border-radius: 4px;
    background: transparent; color: var(--mlcad-ui-muted);
    cursor: pointer; font-size: 18px; line-height: 1;
  }
  .mlcad-drawer-close:hover {
    background: rgba(255, 255, 255, 0.08); color: var(--mlcad-ui-text);
  }

  .mlcad-drawer-sheet-chrome {
    display: none;
    position: relative;
  }
  .mlcad-drawer-grabber {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 20px;
    cursor: ns-resize;
    touch-action: none;
  }
  .mlcad-drawer-grabber::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 4px;
    border-radius: 2px;
    background: var(--mlcad-ui-muted);
    opacity: 0.75;
  }
  .mlcad-drawer-sheet-close {
    width: 36px; height: 28px; padding: 0;
    border: none; background: transparent;
    color: var(--mlcad-ui-muted); cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    flex: 0 0 auto;
    position: relative;
    z-index: 1;
  }
  .mlcad-drawer-sheet-close:hover { color: var(--mlcad-ui-text); }
  .mlcad-drawer-sheet-close svg { width: 18px; height: 18px; }

  .mlcad-layer-actions {
    display: flex; gap: 4px; padding: 6px 8px;
    border-bottom: 1px solid var(--mlcad-ui-border);
  }
  .mlcad-layer-action-btn {
    flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    min-height: 30px; padding: 4px 8px;
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.04);
    color: var(--mlcad-ui-text);
    font-size: 12px; cursor: pointer;
  }
  .mlcad-layer-action-btn:hover { background: rgba(255, 255, 255, 0.1); }
  .mlcad-layer-action-btn svg { width: 14px; height: 14px; flex-shrink: 0; }

  #mlcad-layer-list {
    flex: 1; overflow: auto; padding: 4px 0;
  }
  .mlcad-layer-item {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center; gap: 6px;
    padding: 5px 8px;
    font-size: 12px; cursor: pointer;
  }
  .mlcad-layer-item:hover { background: rgba(255, 255, 255, 0.05); }
  .mlcad-layer-item input { margin: 0; cursor: pointer; }
  .mlcad-layer-swatch {
    width: 12px; height: 12px; border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.28);
  }
  .mlcad-layer-name {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .mlcad-layer-zoom {
    display: flex; align-items: center; justify-content: center;
    width: 22px; height: 22px; padding: 0;
    border: 1px solid transparent; border-radius: 4px;
    background: transparent; color: var(--mlcad-ui-muted);
    cursor: pointer;
  }
  .mlcad-layer-zoom svg {
    width: 14px; height: 14px; display: block;
  }
  .mlcad-layer-zoom:hover:not(:disabled) {
    color: var(--mlcad-accent);
    border-color: var(--mlcad-ui-border);
    background: rgba(255, 255, 255, 0.06);
  }
  .mlcad-layer-zoom:disabled { opacity: 0.35; cursor: not-allowed; }

  .mlcad-review-toolbar {
    display: flex; gap: 6px; align-items: center;
    padding: 6px 8px;
    border-bottom: 1px solid var(--mlcad-ui-border);
  }
  .mlcad-review-search {
    flex: 1; min-width: 0;
    box-sizing: border-box;
    padding: 4px 8px;
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    color: var(--mlcad-ui-text);
    font-size: 12px;
  }
  .mlcad-review-clear,
  .mlcad-review-zoom,
  .mlcad-review-delete {
    flex: 0 0 auto;
    padding: 4px 8px;
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    color: var(--mlcad-ui-text);
    font-size: 12px; cursor: pointer;
  }
  .mlcad-review-clear:disabled { opacity: 0.5; cursor: default; }
  .mlcad-review-delete { color: #f56c6c; border-color: rgba(245, 108, 108, 0.55); }
  .mlcad-review-table-wrap { flex: 1 1 auto; min-height: 0; overflow: auto; }
  .mlcad-review-table {
    width: 100%; border-collapse: collapse; font-size: 12px;
  }
  .mlcad-review-table th,
  .mlcad-review-table td {
    padding: 4px 8px; text-align: left;
    border-bottom: 1px solid var(--mlcad-ui-border);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    max-width: 90px;
  }
  .mlcad-review-table tr.is-selected td {
    background: rgba(26, 140, 255, 0.22);
  }
  .mlcad-review-table tr { cursor: pointer; }
  .mlcad-review-empty td { text-align: center; color: var(--mlcad-ui-muted); cursor: default; }
  .mlcad-review-detail {
    flex: 0 1 auto;
    max-height: 52%;
    overflow: auto;
    border-top: 1px solid var(--mlcad-ui-border);
    padding: 8px 10px 14px;
    display: flex; flex-direction: column; gap: 6px;
    box-sizing: border-box;
  }
  .mlcad-review-detail[hidden] { display: none; }
  .mlcad-review-detail-header {
    display: flex; align-items: center; justify-content: space-between; gap: 4px;
  }
  .mlcad-review-detail-title { font-weight: 600; font-size: 12px; }
  .mlcad-review-detail-close {
    flex-shrink: 0;
    width: 24px; height: 24px; padding: 0;
    border: none; border-radius: 4px;
    background: transparent; color: var(--mlcad-ui-muted);
    cursor: pointer; font-size: 16px; line-height: 1;
  }
  .mlcad-review-detail-close:hover {
    background: rgba(255, 255, 255, 0.08); color: var(--mlcad-ui-text);
  }
  .mlcad-review-field { display: flex; flex-direction: column; gap: 2px; }
  .mlcad-review-field-label { font-size: 11px; color: var(--mlcad-ui-muted); }
  .mlcad-review-status,
  .mlcad-review-author,
  .mlcad-review-text,
  .mlcad-review-comment {
    box-sizing: border-box; width: 100%;
    padding: 4px 6px;
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    color: var(--mlcad-ui-text);
    font-size: 12px;
  }
  .mlcad-review-author:disabled { opacity: 0.7; }
  .mlcad-review-comment { min-height: 44px; resize: vertical; }
  .mlcad-review-detail-actions { display: flex; gap: 6px; margin-top: 2px; }

  .mlcad-measure-toolbar {
    display: flex; gap: 8px; align-items: center;
    padding: 8px 10px; border-bottom: 1px solid var(--mlcad-ui-border);
  }
  .mlcad-measure-filter {
    flex: 1 1 auto; min-width: 0;
    display: flex; overflow: hidden;
    border: 1px solid var(--mlcad-ui-border); border-radius: 4px;
  }
  .mlcad-measure-filter-btn {
    flex: 1 1 0; min-width: 0; padding: 4px 2px;
    border: none; border-right: 1px solid var(--mlcad-ui-border);
    background: transparent; color: var(--mlcad-ui-text);
    font: inherit; font-size: 11px; cursor: pointer;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .mlcad-measure-filter-btn:last-child { border-right: none; }
  .mlcad-measure-filter-btn:hover:not(.is-active) {
    background: rgba(255, 255, 255, 0.06);
  }
  .mlcad-measure-filter-btn.is-active {
    background: rgba(8, 232, 222, 0.18);
  }
  .mlcad-measure-clear,
  .mlcad-measure-row-delete {
    border: 1px solid var(--mlcad-ui-border); border-radius: 4px;
    background: rgba(255, 255, 255, 0.04); color: var(--mlcad-ui-text);
    padding: 4px 8px; font-size: 12px; cursor: pointer;
  }
  .mlcad-measure-clear:disabled { opacity: 0.5; cursor: default; }
  .mlcad-measure-row-delete { color: #f56c6c; border-color: rgba(245, 108, 108, 0.55); padding: 2px 6px; font-size: 11px; }
  .mlcad-measure-table-wrap { flex: 1 1 auto; min-height: 0; overflow: auto; }
  .mlcad-measure-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .mlcad-measure-table th,
  .mlcad-measure-table td {
    padding: 6px 8px; text-align: left; font-size: 12px;
    border-bottom: 1px solid var(--mlcad-ui-border);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .mlcad-measure-table tr.is-selected td {
    background: rgba(8, 232, 222, 0.12);
  }
  .mlcad-measure-table tr { cursor: pointer; }
  .mlcad-measure-empty td { text-align: center; color: var(--mlcad-ui-muted); cursor: default; }
  #mlcad-measure-strip-wrap { position: relative; }
  #mlcad-measure-drawer {
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: var(--mlcad-drawer-gap);
    width: min(320px, calc(100vw - 2 * var(--mlcad-ui-inset) - var(--mlcad-toolbar-width) - var(--mlcad-drawer-gap)));
    height: 100%;
    max-height: var(--mlcad-review-max-height);
  }

  /*
   * Top canvas chrome: message bar + expiry share one row. Shortcut toolbar
   * and snap loupe stack below (see AcExHtmlTopChrome / ShortCutToolbar /
   * SnapLoupeMath).
   */
  #mlcad-top-chrome {
    position: absolute;
    left: 12px;
    right: 12px;
    top: 10px;
    z-index: var(--mlcad-z-chrome);
    display: flex;
    align-items: flex-start;
    gap: 8px;
    box-sizing: border-box;
    pointer-events: none;
  }
  #mlcad-status-bar {
    position: relative;
    flex: 1 1 auto;
    min-width: 0;
    /* Block layout so text-overflow: ellipsis works on direct textContent. */
    display: block;
    min-height: 28px;
    line-height: 28px;
    padding: 0 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    background: var(--mlcad-accent);
    color: #0b1f1e;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(10px);
    pointer-events: none;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.18s ease, transform 0.18s ease;
    /* Shrink before the expiry badge; clip with an ellipsis when too narrow. */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #mlcad-status-bar:empty,
  #mlcad-status-bar[hidden] {
    display: none;
    opacity: 0;
    transform: translateY(-6px);
  }

  /* Session panel DOM/CSS comes from shared AcUiMobileSessionPanel. */
  #mlcad-root {
    --ml-mobile-cmd-collapsed-height: var(--mlcad-toolbar-phone-height, 56px);
  }
  .ml-mobile-cmd-panel {
    z-index: calc(var(--mlcad-z-chrome) + 3);
  }

  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-snap-strip-wrap,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-measure-strip-wrap,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-markup-strip-wrap,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-zoom-strip-wrap,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-settings-strip-wrap,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-locale-strip-wrap,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-layer-drawer,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-review-drawer,
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-measure-drawer {
    display: none !important;
  }
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-toolbar .mlcad-tool-btn:not(#mlcad-toolbar-toggle) {
    display: none;
  }
  #mlcad-sidebar.mlcad-sidebar--collapsed #mlcad-toolbar .mlcad-tool-separator {
    display: none;
  }

  #mlcad-snap-strip-wrap,
  #mlcad-measure-strip-wrap,
  #mlcad-markup-strip-wrap,
  #mlcad-zoom-strip-wrap,
  #mlcad-settings-strip-wrap,
  #mlcad-locale-strip-wrap {
    flex-shrink: 0;
    min-width: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--mlcad-drawer-gap);
  }
  #mlcad-snap-strip-wrap[hidden],
  #mlcad-measure-strip-wrap[hidden],
  #mlcad-markup-strip-wrap[hidden],
  #mlcad-zoom-strip-wrap[hidden],
  #mlcad-settings-strip-wrap[hidden],
  #mlcad-locale-strip-wrap[hidden] { display: none; }

  #mlcad-snap-strip,
  #mlcad-measure-strip,
  #mlcad-markup-strip,
  #mlcad-zoom-strip,
  #mlcad-settings-strip,
  #mlcad-locale-strip {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 6px;
    background: var(--mlcad-ui-bg);
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 8px;
    box-shadow: var(--mlcad-shadow);
    backdrop-filter: blur(12px);
  }
  /* Pad/desktop: same button size as the parent bar so a vertical strip
     matches its width and a horizontal strip matches its height. */
  #mlcad-snap-strip .mlcad-tool-btn,
  #mlcad-measure-strip .mlcad-tool-btn,
  #mlcad-markup-strip .mlcad-tool-btn,
  #mlcad-zoom-strip .mlcad-tool-btn,
  #mlcad-settings-strip .mlcad-tool-btn,
  #mlcad-locale-strip .mlcad-tool-btn {
    width: var(--mlcad-toolbar-width);
    height: var(--mlcad-toolbar-width);
  }
  #mlcad-measure-strip .mlcad-tool-separator,
  #mlcad-markup-strip .mlcad-tool-separator {
    margin: 2px 4px;
  }

  #mlcad-polar-angles {
    flex-shrink: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 6px;
    max-width: min(280px, calc(100vw - 2 * var(--mlcad-ui-inset) - 3 * var(--mlcad-toolbar-width) - 3 * var(--mlcad-drawer-gap)));
    background: var(--mlcad-ui-bg);
    border: 1px solid var(--mlcad-ui-border);
    border-radius: 8px;
    box-shadow: var(--mlcad-shadow);
    backdrop-filter: blur(12px);
  }
  #mlcad-polar-angles[hidden] { display: none; }

  .mlcad-color-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
  .mlcad-settings-option-btn {
    width: 100%;
    box-sizing: border-box;
    height: var(--mlcad-toolbar-width);
    justify-content: flex-start;
    gap: 8px;
    padding: 0 10px;
    font-size: 11px;
    font-weight: 500;
  }
  .mlcad-settings-option-indicator {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    border: 1px solid var(--mlcad-ui-muted);
    border-radius: 2px;
    box-sizing: border-box;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .mlcad-settings-option-btn.active .mlcad-settings-option-indicator {
    background: var(--mlcad-accent);
    border-color: var(--mlcad-accent);
  }
  .mlcad-settings-option-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    line-height: 1.2;
  }

  #mlcad-measure-overlays {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: var(--mlcad-z-measure);
    overflow: hidden;
  }
  .mlcad-measure-canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    pointer-events: none;
  }
  .mlcad-measure-dot {
    position: absolute;
    z-index: 3;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--mlcad-measure-accent);
    border: 2px solid rgba(255, 255, 255, 0.9);
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    visibility: hidden;
    pointer-events: none;
    cursor: grab;
  }
  .mlcad-measure-dot.mlcad-measure-selected {
    visibility: visible;
    pointer-events: auto;
    box-shadow:
      0 0 0 2px rgba(255, 213, 79, 0.75),
      0 0 10px rgba(255, 213, 79, 0.95),
      0 0 18px rgba(255, 213, 79, 0.55);
  }
  #mlcad-measure-overlays.mlcad-grip-dragging .mlcad-measure-dot {
    visibility: hidden !important;
    pointer-events: none !important;
  }
  .mlcad-measure-badge {
    position: absolute;
    z-index: 2;
    padding: 3px 10px;
    border-radius: 14px;
    background: var(--mlcad-ui-bg-elevated);
    border: 1px solid var(--mlcad-measure-accent-border);
    color: var(--mlcad-measure-accent);
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }
  .mlcad-measure-badge--coordinate {
    transform: translate(-50%, calc(-50% - 16px));
  }
  .mlcad-measure-badge.mlcad-measure-selected {
    outline: 2px solid rgba(255, 213, 79, 0.85);
    outline-offset: 1px;
    box-shadow:
      0 0 0 2px rgba(255, 213, 79, 0.4),
      0 0 12px rgba(255, 213, 79, 0.75),
      0 2px 8px rgba(0, 0, 0, 0.35);
  }
  .mlcad-measure-canvas.mlcad-measure-selected {
    filter:
      drop-shadow(0 0 1.5px #ffd54f)
      drop-shadow(0 0 4px rgba(255, 213, 79, 0.95))
      drop-shadow(0 0 8px rgba(255, 213, 79, 0.55));
  }

  #mlcad-markup-overlays {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: var(--mlcad-z-markup);
    overflow: hidden;
  }
  .mlcad-markup-canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    pointer-events: none;
  }
  .mlcad-markup-badge,
  .mlcad-markup-stamp {
    position: absolute;
    z-index: 2;
    padding: 3px 10px;
    border-radius: 14px;
    background: var(--mlcad-ui-bg-elevated);
    border: 1px solid var(--mlcad-markup-accent-border);
    color: var(--mlcad-markup-accent);
    font-size: 12px;
    font-weight: 600;
    white-space: pre-wrap;
    max-width: 240px;
    min-width: 80px;
    min-height: 1.75em;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
    pointer-events: auto;
    cursor: grab;
    touch-action: none;
    user-select: none;
  }
  .mlcad-markup-stamp {
    border-radius: 4px;
    border-width: 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 11px;
    white-space: nowrap;
    min-width: 0;
  }
  .mlcad-markup-preview-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--mlcad-markup-accent);
    border: 2px solid rgba(255, 255, 255, 0.9);
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .mlcad-markup-dot {
    position: absolute;
    z-index: 3;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--mlcad-markup-accent);
    border: 2px solid rgba(255, 255, 255, 0.9);
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    visibility: hidden;
    pointer-events: none;
    cursor: grab;
  }
  .mlcad-markup-dot.mlcad-markup-selected {
    visibility: visible;
    pointer-events: auto;
    box-shadow:
      0 0 0 2px rgba(255, 213, 79, 0.75),
      0 0 10px rgba(255, 213, 79, 0.95),
      0 0 18px rgba(255, 213, 79, 0.55);
  }
  #mlcad-markup-overlays.mlcad-grip-dragging .mlcad-markup-dot {
    visibility: hidden !important;
    pointer-events: none !important;
  }
  .mlcad-markup-badge.mlcad-markup-selected,
  .mlcad-markup-stamp.mlcad-markup-selected {
    outline: 2px solid rgba(255, 213, 79, 0.85);
    outline-offset: 1px;
    box-shadow:
      0 0 0 2px rgba(255, 213, 79, 0.4),
      0 0 12px rgba(255, 213, 79, 0.75),
      0 2px 8px rgba(0, 0, 0, 0.35);
  }
  .mlcad-markup-canvas.mlcad-markup-selected {
    filter:
      drop-shadow(0 0 1.5px #ffd54f)
      drop-shadow(0 0 4px rgba(255, 213, 79, 0.95))
      drop-shadow(0 0 8px rgba(255, 213, 79, 0.55));
  }

  #mlcad-loading {
    position: fixed; inset: 0; z-index: 100;
    display: flex; align-items: center; justify-content: center;
    background: #121418;
    transition: opacity 0.35s ease, visibility 0.35s ease;
  }
  #mlcad-loading.mlcad-loading--done {
    opacity: 0; visibility: hidden; pointer-events: none;
  }
  #mlcad-loading.mlcad-loading--gate .mlcad-loading-spinner {
    display: none;
  }
  .mlcad-loading-spinner {
    width: 48px; height: 48px; box-sizing: border-box;
    border: 3px solid rgba(255, 255, 255, 0.12);
    border-top-color: var(--mlcad-accent);
    border-radius: 50%;
    animation: mlcad-spin 0.85s linear infinite;
  }
  @keyframes mlcad-spin { to { transform: rotate(360deg); } }

  #mlcad-access-gate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 360px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  #mlcad-access-gate[hidden] {
    display: none !important;
  }
  .mlcad-access-card {
    width: 100%;
    padding: 24px 20px;
    border-radius: 10px;
    border: 1px solid var(--mlcad-ui-border);
    background: var(--mlcad-ui-bg-elevated);
    box-shadow: var(--mlcad-shadow);
    box-sizing: border-box;
  }
  .mlcad-access-title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--mlcad-ui-text);
    text-align: center;
  }
  .mlcad-access-hint {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--mlcad-ui-muted);
    text-align: center;
  }
  .mlcad-access-expiry {
    margin: -8px 0 16px;
    font-size: 12px;
    line-height: 1.4;
    color: var(--mlcad-ui-muted);
    text-align: center;
  }
  .mlcad-access-expiry[hidden] {
    display: none;
  }
  .mlcad-access-expiry.mlcad-expiry-countdown {
    width: fit-content;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 16px;
    padding: 6px 10px;
    border-radius: 6px;
    box-sizing: border-box;
  }
  .mlcad-access-field {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .mlcad-access-field input {
    flex: 1 1 auto;
    min-width: 0;
    height: 36px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid var(--mlcad-ui-border);
    background: rgba(0, 0, 0, 0.25);
    color: var(--mlcad-ui-text);
    font: inherit;
    box-sizing: border-box;
  }
  .mlcad-access-field input:focus {
    outline: none;
    border-color: rgba(26, 140, 255, 0.65);
    box-shadow: 0 0 0 2px rgba(26, 140, 255, 0.2);
  }
  .mlcad-access-submit {
    width: 100%;
    height: 36px;
    border: 1px solid rgba(26, 140, 255, 0.55);
    border-radius: 6px;
    background: rgba(26, 140, 255, 0.22);
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
  .mlcad-access-submit:hover {
    background: rgba(26, 140, 255, 0.32);
  }
  .mlcad-access-error {
    margin: 0;
    font-size: 12px;
    line-height: 1.4;
    color: #ff8a80;
    text-align: center;
  }
  .mlcad-access-error[hidden] {
    display: none;
  }
  .mlcad-access-gate--locked .mlcad-access-submit:disabled,
  .mlcad-access-gate--locked .mlcad-access-field input:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .mlcad-access-field[hidden],
  .mlcad-access-submit[hidden],
  .mlcad-access-gate--expired .mlcad-access-field,
  .mlcad-access-gate--expired .mlcad-access-submit,
  .mlcad-access-gate--expired #mlcad-access-expiry,
  .mlcad-access-gate--expired #mlcad-access-error {
    display: none !important;
  }
  .mlcad-expiry-badge {
    position: relative;
    flex: 0 0 auto;
    margin-left: auto;
    max-width: none;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid var(--mlcad-ui-border);
    background: var(--mlcad-ui-bg-elevated);
    box-shadow: var(--mlcad-shadow);
    color: var(--mlcad-ui-text);
    font-size: 12px;
    line-height: 1.4;
    white-space: nowrap;
    pointer-events: none;
    box-sizing: border-box;
  }
  .mlcad-expiry-badge[hidden] {
    display: none !important;
  }
  .mlcad-expiry-countdown {
    border-color: rgba(255, 152, 0, 0.55);
    background: rgba(255, 152, 0, 0.16);
    color: #ffcc80;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: ${po}px) {
    :root {
      --mlcad-drawer-width: min(280px, calc(100vw - 16px));
      --mlcad-ui-inset: 0px;
      --mlcad-toolbar-phone-height: 56px;
      /* Portrait min width (narrower than simple-ui's height - 4). */
      --mlcad-toolbar-phone-btn-size: max(
        24px,
        calc(var(--mlcad-toolbar-phone-height) - 16px)
      );
    }
    #mlcad-root {
      display: flex;
      flex-direction: column;
    }
    #mlcad-canvas-host {
      position: relative;
      flex: 1 1 auto;
      inset: auto;
      width: 100%;
      min-height: 0;
    }
    #mlcad-sidebar {
      position: relative;
      left: auto;
      top: auto;
      right: auto;
      transform: none;
      width: 100%;
      max-width: none;
      flex: 0 0 auto;
      flex-direction: column-reverse;
      align-items: stretch;
      gap: 0;
      overflow: visible;
    }
    #mlcad-toolbar {
      flex-direction: row;
      width: 100%;
      box-sizing: border-box;
      gap: 0;
      padding: 4px 0;
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-bottom: none;
    }
    #mlcad-toolbar .mlcad-tool-btn {
      flex: 1 1 0;
      width: auto;
      min-width: 0;
      height: auto;
      min-height: var(--mlcad-toolbar-phone-height);
      border-radius: 0;
      padding: 4px 2px;
    }
    #mlcad-toolbar .mlcad-tool-btn-label,
    #mlcad-zoom-strip .mlcad-tool-btn-label,
    #mlcad-measure-strip .mlcad-tool-btn-label,
    #mlcad-markup-strip .mlcad-tool-btn-label,
    #mlcad-settings-strip .mlcad-tool-btn-label,
    #mlcad-locale-strip .mlcad-tool-btn-label,
    #mlcad-snap-strip .mlcad-tool-btn-label {
      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Drop sticky :focus / touch :hover chrome after closing a strip. */
    #mlcad-toolbar .mlcad-tool-btn:focus,
    #mlcad-toolbar .mlcad-tool-btn:focus-visible {
      outline: none;
    }
    #mlcad-toolbar .mlcad-tool-btn:focus:not(.active):not(.is-menu-open),
    #mlcad-toolbar .mlcad-tool-btn:focus-visible:not(.active):not(.is-menu-open) {
      background: transparent;
      border-color: transparent;
    }
    @media (hover: none) {
      #mlcad-toolbar .mlcad-tool-btn:hover:not(.active):not(.is-menu-open) {
        background: transparent;
        border-color: transparent;
      }
    }
    .mlcad-tool-btn.has-children::after {
      display: none;
    }
    #mlcad-toolbar-toggle,
    #mlcad-toolbar .mlcad-tool-separator {
      display: none !important;
    }
    /* Float above the bottom bar so the wrap does not occupy an in-flow
       rectangle of page background around the rounded strip. */
    #mlcad-sidebar > #mlcad-snap-strip-wrap,
    #mlcad-sidebar > #mlcad-measure-strip-wrap,
    #mlcad-sidebar > #mlcad-markup-strip-wrap,
    #mlcad-sidebar > #mlcad-zoom-strip-wrap,
    #mlcad-sidebar > #mlcad-settings-strip-wrap,
    #mlcad-sidebar > #mlcad-locale-strip-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 100%;
      width: auto;
      flex-direction: column;
      align-items: stretch;
      background: none;
      box-shadow: none;
      backdrop-filter: none;
      overflow: visible;
      pointer-events: none;
      z-index: calc(var(--mlcad-z-chrome) + 1);
    }
    #mlcad-settings-strip-wrap:not([hidden]) {
      display: flex !important;
    }
    #mlcad-snap-strip,
    #mlcad-measure-strip,
    #mlcad-markup-strip,
    #mlcad-zoom-strip,
    #mlcad-settings-strip,
    #mlcad-locale-strip {
      display: grid;
      /* Fallback before wrap-pack JS: auto-fit stretches a short strip evenly.
         JS then sets an explicit column count so wrapped last rows stay narrow. */
      grid-template-columns: repeat(
        auto-fit,
        minmax(var(--mlcad-toolbar-phone-btn-size), 1fr)
      );
      justify-content: start;
      align-content: flex-start;
      width: auto;
      box-sizing: border-box;
      gap: 0;
      margin: 4px 8px 8px;
      padding: 4px 0;
      border-radius: 8px;
      /* Match active toolbar button outline. */
      border: 1px solid var(--mlcad-tool-btn-active-border);
      box-shadow: none;
      backdrop-filter: none;
      overflow: hidden;
      isolation: isolate;
      clip-path: inset(0 round 8px);
      pointer-events: auto;
    }
    #mlcad-snap-strip .mlcad-tool-btn,
    #mlcad-measure-strip .mlcad-tool-btn,
    #mlcad-markup-strip .mlcad-tool-btn,
    #mlcad-zoom-strip .mlcad-tool-btn,
    #mlcad-settings-strip .mlcad-tool-btn,
    #mlcad-locale-strip .mlcad-tool-btn {
      width: 100%;
      min-width: 0;
      height: auto;
      min-height: var(--mlcad-toolbar-phone-height);
      border-radius: 0;
      padding: 4px 2px;
      box-sizing: border-box;
    }
    #mlcad-measure-strip .mlcad-tool-separator,
    #mlcad-markup-strip .mlcad-tool-separator {
      display: none;
    }
    #mlcad-polar-angles {
      flex-direction: row;
      flex-wrap: wrap;
      max-width: none;
      width: 100%;
      box-sizing: border-box;
      border-radius: 0;
      pointer-events: auto;
    }
    #mlcad-layer-drawer,
    #mlcad-review-drawer,
    #mlcad-measure-drawer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: var(--mlcad-phone-drawer-bottom, var(--mlcad-toolbar-phone-height));
      top: auto;
      margin: 0;
      width: 100%;
      max-width: none;
      height: min(42vh, calc(100vh - var(--mlcad-phone-drawer-bottom, var(--mlcad-toolbar-phone-height)) - 12px));
      max-height: calc(100vh - var(--mlcad-phone-drawer-bottom, var(--mlcad-toolbar-phone-height)) - 12px);
      z-index: calc(var(--mlcad-z-chrome) + 1);
      border-radius: 12px 12px 0 0;
      pointer-events: auto;
    }
    #mlcad-layer-drawer .mlcad-drawer-sheet-chrome,
    #mlcad-review-drawer .mlcad-drawer-sheet-chrome,
    #mlcad-measure-drawer .mlcad-drawer-sheet-chrome {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      min-height: 28px;
    }
    #mlcad-layer-drawer .mlcad-drawer-header,
    #mlcad-review-drawer .mlcad-drawer-header,
    #mlcad-measure-drawer .mlcad-drawer-header {
      display: none;
    }
    .mlcad-layer-action-btn {
      min-height: 28px;
      padding: 3px 6px;
      font-size: 11px;
      gap: 4px;
    }
    .mlcad-layer-action-btn svg { width: 12px; height: 12px; }
    .mlcad-layer-zoom {
      width: 20px;
      height: 20px;
    }
    .mlcad-layer-zoom svg {
      width: 12px;
      height: 12px;
    }
    #mlcad-top-chrome {
      left: 8px;
      right: 8px;
      top: 8px;
    }

  }

  /* Pad / coarse pointer: same toolbar as desktop, minus select and pan. */
  @media (max-width: ${ho}px), (pointer: coarse) {
    #mlcad-toolbar [data-action="select"],
    #mlcad-toolbar [data-action="pan"] {
      display: none !important;
    }
  }

  /*
   * Hide toolbar chrome during measure / markup without changing canvas size.
   * On phone the sidebar is in the flex column; display:none would expand
   * #mlcad-canvas-host and shift the drawing. Session panel floats on top.
   */
  #mlcad-root.mlcad-session-active #mlcad-sidebar {
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;function ue(t,e="measure",a=!0){const r=e==="measure"?`${mo()}${go()}${fo()}`:"";return`
  <div id="mlcad-loading" aria-hidden="true" style="background:${t}">
    <div class="mlcad-loading-spinner"></div>
    <div id="mlcad-access-gate" hidden>
      <form id="mlcad-access-form" class="mlcad-access-card">
        <h2 class="mlcad-access-title" data-i18n-key="access.title" data-i18n-text>Protected drawing</h2>
        <p class="mlcad-access-hint" data-i18n-key="access.passwordPrompt" data-i18n-text>Enter the password to open this file.</p>
        <p id="mlcad-access-expiry" class="mlcad-access-expiry" hidden></p>
        <div class="mlcad-access-field">
          <input
            id="mlcad-access-password"
            type="password"
            autocomplete="off"
            data-i18n-key="access.passwordPlaceholder"
            data-i18n-attr="placeholder aria-label"
            placeholder="Password"
            aria-label="Password"
          />
        </div>
        <button type="submit" class="mlcad-access-submit" data-i18n-key="access.unlock" data-i18n-text>Unlock</button>
        <p id="mlcad-access-error" class="mlcad-access-error" hidden></p>
      </form>
    </div>
  </div>
  <div id="mlcad-root">
    <div id="mlcad-canvas-host">
      <div id="mlcad-top-chrome">
        <footer id="mlcad-status-bar" aria-live="polite" hidden></footer>
      </div>
    </div>
    <aside id="mlcad-sidebar">
      <nav id="mlcad-toolbar" data-i18n-attr="aria-label" data-i18n-key="toolbar.viewerTools" aria-label="Viewer tools"></nav>
      ${r}
      <div id="mlcad-layer-drawer" role="dialog" data-i18n-attr="aria-label" data-i18n-key="layers.title" aria-label="Layers" hidden>
        ${me("mlcad-layer-sheet-close","layers.close","Close layers")}
        <div class="mlcad-drawer-header">
          <span data-i18n-key="layers.title" data-i18n-text>Layers</span>
          <button type="button" class="mlcad-drawer-close" id="mlcad-layer-close" data-i18n-key="layers.close" data-i18n-attr="aria-label" aria-label="Close layers">×</button>
        </div>
        <div class="mlcad-layer-actions">
          <button type="button" class="mlcad-layer-action-btn" id="mlcad-layer-show-all">
            ${Wt.layerOn}<span data-i18n-key="layers.showAll" data-i18n-text>Show all</span>
          </button>
          <button type="button" class="mlcad-layer-action-btn" id="mlcad-layer-hide-all">
            ${Wt.layerOff}<span data-i18n-key="layers.hideAll" data-i18n-text>Hide all</span>
          </button>
        </div>
        <div id="mlcad-layer-list"></div>
      </div>
    </aside>
  </div>
`}function me(t,e,a){return`<div class="mlcad-drawer-sheet-chrome">
          <div class="mlcad-drawer-grabber" role="separator" aria-orientation="horizontal"></div>
          <button type="button" class="mlcad-drawer-sheet-close" id="${t}" data-i18n-key="${e}" data-i18n-attr="aria-label" aria-label="${a}">${Wt.chevronDown}</button>
        </div>`}function fo(){return`<div id="mlcad-review-drawer" role="dialog" data-i18n-attr="aria-label" data-i18n-key="review.title" aria-label="Review" hidden>
        ${me("mlcad-review-sheet-close","review.close","Close review")}
        <div class="mlcad-drawer-header">
          <span data-i18n-key="review.title" data-i18n-text>Review</span>
          <button type="button" class="mlcad-drawer-close" id="mlcad-review-close" data-i18n-key="review.close" data-i18n-attr="aria-label" aria-label="Close review">×</button>
        </div>
        <div class="mlcad-review-toolbar">
          <input type="search" class="mlcad-review-search" data-i18n-key="review.searchPlaceholder" data-i18n-attr="placeholder" placeholder="Search markups" />
          <button type="button" class="mlcad-review-clear" data-i18n-key="review.clear" data-i18n-text>Clear all</button>
        </div>
        <div class="mlcad-review-table-wrap">
          <table class="mlcad-review-table">
            <thead>
              <tr>
                <th data-review-col="type" data-i18n-key="review.type" data-i18n-text>Type</th>
                <th data-review-col="status" data-i18n-key="review.status" data-i18n-text>Status</th>
                <th data-review-col="author" data-i18n-key="review.author" data-i18n-text>Author</th>
                <th data-review-col="summary" data-i18n-key="review.summary" data-i18n-text>Summary</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div class="mlcad-review-detail" hidden>
          <div class="mlcad-review-detail-header">
            <div class="mlcad-review-detail-title" data-i18n-key="review.details" data-i18n-text>Details</div>
            <button type="button" class="mlcad-review-detail-close" data-i18n-key="review.closeDetails" data-i18n-attr="title aria-label" title="Close details" aria-label="Close details">×</button>
          </div>
          <div class="mlcad-review-field">
            <label class="mlcad-review-field-label" data-review-field="status" data-i18n-key="review.status" data-i18n-text>Status</label>
            <select class="mlcad-review-status"></select>
          </div>
          <div class="mlcad-review-field">
            <label class="mlcad-review-field-label" data-review-field="author" data-i18n-key="review.author" data-i18n-text>Author</label>
            <input type="text" class="mlcad-review-author" disabled />
          </div>
          <div class="mlcad-review-field">
            <label class="mlcad-review-field-label" data-review-field="label" data-i18n-key="review.label" data-i18n-text>Label</label>
            <input type="text" class="mlcad-review-text" />
          </div>
          <div class="mlcad-review-field">
            <label class="mlcad-review-field-label" data-review-field="comment" data-i18n-key="review.comment" data-i18n-text>Comment</label>
            <textarea class="mlcad-review-comment" rows="2"></textarea>
          </div>
          <div class="mlcad-review-detail-actions">
            <button type="button" class="mlcad-review-zoom" data-i18n-key="review.zoomTo" data-i18n-text>Zoom to</button>
            <button type="button" class="mlcad-review-delete" data-i18n-key="review.delete" data-i18n-text>Delete</button>
          </div>
        </div>
      </div>`}function go(){return`<div id="mlcad-measure-drawer" role="dialog" data-i18n-attr="aria-label" data-i18n-key="measurePanel.title" aria-label="Measurements" hidden>
        ${me("mlcad-measure-sheet-close","measurePanel.close","Close measurements")}
        <div class="mlcad-drawer-header">
          <span data-i18n-key="measurePanel.title" data-i18n-text>Measurements</span>
          <button type="button" class="mlcad-drawer-close" id="mlcad-measure-close" data-i18n-key="measurePanel.close" data-i18n-attr="aria-label" aria-label="Close measurements">×</button>
        </div>
        <div class="mlcad-measure-toolbar">
          <div class="mlcad-measure-filter" role="group" data-i18n-key="measurePanel.filterGroup" data-i18n-attr="aria-label" aria-label="Filter by type">
            <button type="button" class="mlcad-measure-filter-btn" data-measure-filter="distance" aria-pressed="false" data-i18n-key="measurePanel.filterDistance" data-i18n-text data-i18n-attr="title aria-label" title="Distance">Distance</button>
            <button type="button" class="mlcad-measure-filter-btn" data-measure-filter="arc" aria-pressed="false" data-i18n-key="measurePanel.filterArc" data-i18n-text data-i18n-attr="title aria-label" title="Arc">Arc</button>
            <button type="button" class="mlcad-measure-filter-btn" data-measure-filter="angle" aria-pressed="false" data-i18n-key="measurePanel.filterAngle" data-i18n-text data-i18n-attr="title aria-label" title="Angle">Angle</button>
            <button type="button" class="mlcad-measure-filter-btn" data-measure-filter="area" aria-pressed="false" data-i18n-key="measurePanel.filterArea" data-i18n-text data-i18n-attr="title aria-label" title="Area">Area</button>
          </div>
          <button type="button" class="mlcad-measure-clear" data-i18n-key="measurePanel.clear" data-i18n-text>Clear all</button>
        </div>
        <div class="mlcad-measure-table-wrap">
          <table class="mlcad-measure-table">
            <thead>
              <tr>
                <th data-measure-col="type" data-i18n-key="measurePanel.type" data-i18n-text>Type</th>
                <th data-measure-col="value" data-i18n-key="measurePanel.value" data-i18n-text>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>`}function bo(t,e){var a;const r=e.title??t.meta.title??"CAD Drawing",n=e.encoded??Ma(t),i=e.viewerRuntime,o=Yn(),s=n.compression,l=((a=e.accessManifest)==null?void 0:a.encrypted)===!0,c=`#${t.meta.background.toString(16).padStart(6,"0")}`,d=ce(t.meta.locale)??"en",u=t.meta.viewerMode??"measure",m=t.meta.exportLayouts!==!1,p=e.accessManifest?`  <script id="mlcad-access" type="application/json">${$a(JSON.stringify(e.accessManifest))}<\/script>
`:"",g=l?`${o}+aes-gcm;base64`:`${o}+${s};base64`;return`<!DOCTYPE html>
<html lang="${d}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="generator" content="mlightcad-cad-html-plugin" />
  <title>${Ta(r)}</title>
  <style>${de}</style>
</head>
<body>
${ue(c,u,m)}
${p}  <script id="mlcad-snapshot" type="${g}">${n.payload}<\/script>
  <script>${Ra(i)}<\/script>
</body>
</html>`}function wo(t,e){var a;const r=e.title??t.meta.title??"CAD Drawing",n=e.viewerRuntime,i=`#${t.meta.background.toString(16).padStart(6,"0")}`,o=ce(t.meta.locale)??"en",s=t.meta.viewerMode??"measure",l=t.meta.exportLayouts!==!1,c=(a=e.manifestUrl)==null?void 0:a.trim(),d=JSON.stringify(c&&c!==co?{manifestUrl:c}:{});return`<!DOCTYPE html>
<html lang="${o}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="generator" content="mlightcad-cad-html-plugin" />
  <title>${Ta(r)}</title>
  <style>${de}</style>
</head>
<body>
${ue(i,s,l)}
  <script id="mlcad-package" type="application/json">${$a(d)}<\/script>
  <script>${Ra(n)}<\/script>
</body>
</html>`}function Ta(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ra(t){return t.replace(/<\/script/gi,"<\\/script")}function $a(t){return t.replace(/</g,"\\u003c")}const xo=1,vo=1e5,yo=16,ko=12;function Ao(t,e=Date.now(),a){return t==="never"?null:t==="custom"?a??null:e+t*24*60*60*1e3}function ja(t){var e;const a=!!((e=t.password)!=null&&e.trim());return t.expiresAt!=null||a}function zt(t){var e;if(!ja(t))return;const a=!!((e=t.password)!=null&&e.trim());return{v:xo,expiresAt:t.expiresAt,encrypted:a,...a&&t.salt?{salt:t.salt}:{}}}async function _a(t,e){const a=crypto.getRandomValues(new Uint8Array(yo));return{key:await So(t,a),salt:fe(a)}}async function pe(t,e){const a=crypto.getRandomValues(new Uint8Array(ko)),r=new Uint8Array(e),n=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv:a},t,r)),i=new Uint8Array(a.length+n.length);return i.set(a,0),i.set(n,a.length),i}async function zo(t,e){const{key:a,salt:r}=await _a(t),n=new Uint8Array(Mo(e)),i=await pe(a,n);return{encryptedPayload:fe(i),salt:r}}function he(t){return fe(t)}async function Fo(t,e){var a;if(!ja(e))return{encoded:t};const r=(a=e.password)==null?void 0:a.trim();if(r){const{encryptedPayload:n,salt:i}=await zo(r,t.payload);return{encoded:{payload:n,compression:t.compression},manifest:zt({expiresAt:e.expiresAt,password:r,salt:i})}}return{encoded:t,manifest:zt({expiresAt:e.expiresAt})}}async function So(t,e){const a=new TextEncoder,r=await crypto.subtle.importKey("raw",a.encode(t),"PBKDF2",!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:new Uint8Array(e),iterations:vo,hash:"SHA-256"},r,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}function fe(t){let e="";for(let a=0;a<t.length;a++)e+=String.fromCharCode(t[a]);return btoa(e)}function Mo(t){const e=atob(t.trim()),a=new Uint8Array(e.length);for(let r=0;r<e.length;r++)a[r]=e.charCodeAt(r);return a}const Po=256;function Co(t,e=Pt){return!(e>0)||ae(t)<=e?[t]:t.indices&&t.indices.length>=2?Eo(t,e):Lo(t,e)}function Io(t,e=Pt){return t.texture?[t]:!(e>0)||re(t)<=e?[t]:t.points?Do(t,e):!t.indices||t.indices.length<3?Ha(t,e):No(t,e)}function Va(t){return t.linePattern?64+t.linePattern.pattern.length*8:0}function ge(t){return(t.hatchPattern?128:0)+(t.gradientFill?64:0)}function gt(t,e,a){const r=t-Po-e;return r<a?1:Math.max(1,Math.floor(r/a))}function Lo(t,e){var a;const r=(((a=t.lineDistances)==null?void 0:a.length)??0)>=2,n=24+(r?8:0),i=gt(e,Va(t),n),o=t.positions.length/6|0;if(o<=1)return[t];const s=[];for(let l=0;l<o;l+=i){const c=Math.min(i,o-l),d=l*6,u={layer:t.layer,color:t.color,offset:t.offset,positions:t.positions.slice(d,d+c*6)};if(Ga(t,u),r&&t.lineDistances){const m=l*2;u.lineDistances=t.lineDistances.slice(m,m+c*2)}s.push(u)}return s.length>0?s:[t]}function Eo(t,e){var a;const r=t.indices,n=32+((((a=t.lineDistances)==null?void 0:a.length)??0)>0?8:0),i=gt(e,Va(t),n),o=[];for(let s=0;s+1<r.length;){const l=Math.min(i*2,r.length-s),c=l-l%2;if(c<2)break;o.push(Bo(t,s,c)),s+=c}return o.length>0?o:[t]}function Bo(t,e,a){const r=Xa(t.positions,t.indices.subarray(e,e+a),t.lineDistances?[t.lineDistances]:[],[1]),n={layer:t.layer,color:t.color,offset:t.offset,positions:r.positions,indices:r.indices};return Ga(t,n),r.attributes[0]&&r.attributes[0].length>0&&(n.lineDistances=r.attributes[0]),n}function Do(t,e){return t.indices&&t.indices.length>0?Uo(t,e):Ha(t,e)}function Uo(t,e){const a=t.indices,r=16+(t.uvs?8:0)+(t.gradientPositions?8:0),n=gt(e,ge(t),r),i=[];for(let o=0;o<a.length;){const s=Math.min(n,a.length-o);if(s<1)break;i.push(Ya(t,o,s)),o+=s}return i.length>0?i:[t]}function Ha(t,e){const a=t.positions.length/3|0;if(a<=1)return[t];const r=12+(t.uvs?8:0)+(t.gradientPositions?8:0),n=gt(e,ge(t),r),i=t.points?1:3,o=Math.max(i,n-n%i),s=[];for(let l=0;l<a;l+=o){const c=Math.min(o,a-l),d=c-c%i;if(d<i)break;s.push(Oo(t,l,d))}return s.length>0?s:[t]}function No(t,e){const a=t.indices,r=48+(t.uvs?24:0)+(t.gradientPositions?24:0),n=gt(e,ge(t),r),i=[];for(let o=0;o+2<a.length;){const s=Math.min(n*3,a.length-o),l=s-s%3;if(l<3)break;i.push(Ya(t,o,l)),o+=l}return i.length>0?i:[t]}function Oo(t,e,a){const r=e*3,n={layer:t.layer,color:t.color,offset:t.offset,positions:t.positions.slice(r,r+a*3)};return Ka(t,n),t.uvs&&(n.uvs=t.uvs.slice(e*2,(e+a)*2)),t.gradientPositions&&(n.gradientPositions=t.gradientPositions.slice(e*2,(e+a)*2)),n}function Ya(t,e,a){const r=[],n=[];t.uvs&&(r.push(t.uvs),n.push(2)),t.gradientPositions&&(r.push(t.gradientPositions),n.push(2));const i=Xa(t.positions,t.indices.subarray(e,e+a),r,n),o={layer:t.layer,color:t.color,offset:t.offset,positions:i.positions,indices:i.indices};Ka(t,o);let s=0;return t.uvs&&(o.uvs=i.attributes[s++]),t.gradientPositions&&(o.gradientPositions=i.attributes[s]),o}function Xa(t,e,a,r){const n=new Map,i=[],o=new Uint32Array(e.length),s=a.map(()=>[]);for(let l=0;l<e.length;l++){const c=e[l];let d=n.get(c);if(d==null){d=n.size,n.set(c,d);const u=c*3;i.push(t[u]??0,t[u+1]??0,t[u+2]??0);for(let m=0;m<a.length;m++){const p=r[m],g=a[m],h=c*p;for(let w=0;w<p;w++)s[m].push(g[h+w]??0)}}o[l]=d}return{positions:Float32Array.from(i),indices:o,attributes:s.map(l=>Float32Array.from(l))}}function Ga(t,e){t.linePattern&&(e.linePattern=t.linePattern),t.lineWidth!=null&&(e.lineWidth=t.lineWidth),t.renderOrder!=null&&(e.renderOrder=t.renderOrder),t.excludeFromOsnap&&(e.excludeFromOsnap=!0)}function Ka(t,e){t.hatchPattern&&(e.hatchPattern=t.hatchPattern),t.gradientFill&&(e.gradientFill=t.gradientFill),t.side!=null&&(e.side=t.side),t.renderOrder!=null&&(e.renderOrder=t.renderOrder),t.points&&(e.points=!0)}function To(t,e,a=Pt){const r=[];let n={lineBatches:[],meshBatches:[],estimatedBytes:64};const i=()=>{n.lineBatches.length===0&&n.meshBatches.length===0&&r.length>0||(r.push(n),n={lineBatches:[],meshBatches:[],estimatedBytes:64})},o=c=>{const d=ae(c);n.estimatedBytes+d>e&&(n.lineBatches.length>0||n.meshBatches.length>0)&&i(),n.lineBatches.push(c),n.estimatedBytes+=d},s=c=>{const d=re(c);n.estimatedBytes+d>e&&(n.lineBatches.length>0||n.meshBatches.length>0)&&i(),n.meshBatches.push(c),n.estimatedBytes+=d},l=Math.min(e,a);for(const c of t.lineBatches)for(const d of Co(c,l))o(d);for(const c of t.meshBatches)for(const d of Io(c,l))s(d);return(r.length===0||n.lineBatches.length>0||n.meshBatches.length>0)&&i(),r.length===0&&r.push({lineBatches:[],meshBatches:[],estimatedBytes:64}),r}function Wa(t,e={}){var a,r;if(t.version!==J)throw new Error(`Unsupported snapshot version: ${t.version}`);const n=e.maxChunkBytes??io,i=e.maxBatchBytes??Pt,o=e.maxOsnapChunkBytes??oo,s=Ct,l=$o(t.layouts,t.activeLayoutBtrId),c=[],d=[],u=[],m=[],p=new Map;l.forEach((f,C)=>{var S;p.set(f.btrId,C);const x=To(f,n,i),b=[];x.forEach((M,j)=>{const E=`L${C}-${String(j).padStart(3,"0")}`,D=`chunks/${E}.acex.gz`,U={layoutBtrId:f.btrId,lineBatches:M.lineBatches,meshBatches:M.meshBatches},{uncompressed:k,compressed:N}=ro(U);b.push(E),c.push({id:E,href:D,layoutBtrId:f.btrId,byteLength:k.byteLength,compressedByteLength:N.byteLength,lineBatchCount:M.lineBatches.length,meshBatchCount:M.meshBatches.length}),m.push({path:D,bytes:N})});const B={btrId:f.btrId,name:f.name,isModelSpace:f.isModelSpace,viewports:f.viewports,...f.savedView?{savedView:f.savedView}:{},chunkIds:b},H=(S=f.osnap)==null?void 0:S.primitives;if(H&&H.length>0){const M=Nn(H,o),j=[];M.forEach((E,D)=>{const U=`L${C}-osnap-${String(D).padStart(3,"0")}`,k=`chunks/${U}.osnap.gz`,{uncompressed:N,compressed:_}=On({primitives:E});j.push(U),d.push({id:U,href:k,layoutBtrId:f.btrId,byteLength:N.byteLength,compressedByteLength:_.byteLength,primitiveCount:E.length}),m.push({path:k,bytes:_})}),B.osnapChunkIds=j}u.push(B)});const g=t.layouts.map(f=>{const C=p.get(f.btrId);return u[C]}),h=new Set(((a=g.find(f=>f.btrId===t.activeLayoutBtrId))==null?void 0:a.chunkIds)??[]),w=[...c.filter(f=>h.has(f.id)),...c.filter(f=>!h.has(f.id))],A=new Set(((r=g.find(f=>f.btrId===t.activeLayoutBtrId))==null?void 0:r.osnapChunkIds)??[]),z=[...d.filter(f=>A.has(f.id)),...d.filter(f=>!A.has(f.id))],L={format:"acex-package",packageVersion:no,snapshotVersion:J,meta:t.meta,layers:t.layers,activeLayoutBtrId:t.activeLayoutBtrId,layouts:g,chunks:w,...z.length>0?{osnapChunks:z}:{}},F=`${JSON.stringify(L)}
`;return m.unshift({path:s,bytes:mt(F)}),{manifest:L,manifestFileName:s,files:m}}function Ro(t,e){const a=Wa(t,e),r=wo(t,{title:t.meta.title,viewerRuntime:e.viewerRuntime,...e.manifestUrl?{manifestUrl:e.manifestUrl}:{}});return{html:r,manifest:a.manifest,manifestFileName:a.manifestFileName,files:[{path:"viewer.html",bytes:mt(r)},...a.files]}}function $o(t,e){const a=t.find(n=>n.btrId===e),r=t.filter(n=>n.btrId!==e);return a?[a,...r]:[...t]}const jo="application/vnd.mlightcad.acex-chunk;base64",_o="application/vnd.mlightcad.acex-chunk+aes-gcm;base64",Ja="data-acex-href";function Vo(t){var e;let a=0;for(const r of t.layouts){for(const i of r.lineBatches)a+=ae(i);for(const i of r.meshBatches)a+=re(i);const n=(e=r.osnap)==null?void 0:e.primitives;if(n)for(const i of n)a+=Fa(i)}return a}function Ho(t,e=so){return Vo(t)>=e}async function Yo(t,e){var a;const r=e.title??t.meta.title??"CAD Drawing",n=e.viewerRuntime,i=`#${t.meta.background.toString(16).padStart(6,"0")}`,o=ce(t.meta.locale)??"en",s=t.meta.viewerMode??"measure",l=t.meta.exportLayouts!==!1,c=e.expiresAt??null,d=((a=e.password)==null?void 0:a.trim())||void 0,u={maxChunkBytes:e.maxChunkBytes??ta,maxBatchBytes:e.maxBatchBytes??e.maxChunkBytes??ta,maxOsnapChunkBytes:e.maxOsnapChunkBytes??lo},m=Wa(t,u);let p,g,h;if(d){const{key:A,salt:z}=await _a(d);p=zt({expiresAt:c,password:d,salt:z});const L=new TextEncoder().encode(`${JSON.stringify(m.manifest)}
`),F=await pe(A,L);g={mode:"embedded",encrypted:!0,encryptedManifest:he(F)},h=await Go(m.files,A)}else p=zt({expiresAt:c}),g={mode:"embedded",manifest:m.manifest},h=Xo(m.files);const w=p?`  <script id="mlcad-access" type="application/json">${ea(JSON.stringify(p))}<\/script>
`:"";return`<!DOCTYPE html>
<html lang="${o}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="generator" content="mlightcad-cad-html-plugin" />
  <title>${qa(r)}</title>
  <style>${de}</style>
</head>
<body>
${ue(i,s,l)}
${w}  <script id="mlcad-package" type="application/json">${ea(JSON.stringify(g))}<\/script>
${h}  <script>${Ko(n)}<\/script>
</body>
</html>`}function Xo(t){const e=[];for(const a of t)a.path!==Ct&&e.push(`  <script type="${jo}" ${Ja}="${Za(a.path)}">${he(a.bytes)}<\/script>
`);return e.join("")}async function Go(t,e){const a=[];for(const r of t){if(r.path===Ct)continue;const n=await pe(e,r.bytes);a.push(`  <script type="${_o}" ${Ja}="${Za(r.path)}">${he(n)}<\/script>
`)}return a.join("")}function qa(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Za(t){return qa(t).replace(/'/g,"&#39;")}function Ko(t){return t.replace(/<\/script/gi,"<\\/script")}function ea(t){return t.replace(/</g,"\\u003c")}function Wo(t){return!t||t.startsWith("/")||t.includes("\\")||t.includes("\0")?!1:t.split("/").every(e=>e.length>0&&e!=="."&&e!==".."&&/^[A-Za-z0-9._-]+$/.test(e))}function Jo(t){const e={};for(const a of t.files){if(!Wo(a.path))throw new Error(`Unsafe package path: ${a.path}`);e[a.path]=a.bytes}return An(e,{level:6})}const qo=400;function Z(t={}){var e;const a=t.exportFormat==="multi"?"multi":"single";return{exportFormat:a,exportInvisibleLayers:t.exportInvisibleLayers!==!1,exportLayouts:t.exportLayouts!==!1,initialView:t.initialView??"fit",viewerMode:t.viewerMode??"measure",expiryDays:a==="multi"?"never":t.expiryDays??"never",expiresAt:a==="multi"?null:t.expiresAt??null,password:a==="multi"?"":((e=t.password)==null?void 0:e.trim())??""}}function Zo(t){const e=t.activeLayoutView,a=e.center,r=e.trCamera.zoom,n=Math.max(e.height,1),i=r*(2*qo)/n;return{centerX:a.x,centerY:a.y,zoom:i}}const Qo="./viewer-runtime.iife.js";let ft={};function ts(t){ft={...ft,...t}}function es(){return{...ft}}function as(t){return t!=null?String(t):ft.viewerRuntimeUrl!=null?String(ft.viewerRuntimeUrl):Qo}const Qa="https://mlightcad.com/cad-viewer/docs/";let tr=er(Qa);function rs(){return tr}function ns(t){tr=er(t)}function er(t){const e=t.trim();return e?e.replace(/\/+$/,""):Qa.replace(/\/+$/,"")}function is(){return{minX:0,minY:0,maxX:0,maxY:0,valid:!1}}function os(t,e,a){if(e.length<3)return;const r=a[0],n=a[1];for(let i=0;i+2<e.length;i+=3){const o=Ve(e[i],r),s=Ve(e[i+1],n);t.valid?(o<t.minX&&(t.minX=o),o>t.maxX&&(t.maxX=o),s<t.minY&&(t.minY=s),s>t.maxY&&(t.maxY=s)):(t.minX=t.maxX=o,t.minY=t.maxY=s,t.valid=!0)}}function aa(t,e){os(t,e.positions,e.offset)}function ss(t){return t.valid?{minX:t.minX,minY:t.minY,maxX:t.maxX,maxY:t.maxY}:null}function ls(t,e){const a=is();for(const r of t)aa(a,r);for(const r of e)aa(a,r);return ss(a)}function ar(t,e){return t?e?{minX:Math.min(t.minX,e.minX),minY:Math.min(t.minY,e.minY),maxX:Math.max(t.maxX,e.maxX),maxY:Math.max(t.maxY,e.maxY)}:t:e??null}function cs(t){if(!t||t.length===0)return null;let e=null;for(const a of t)e=ar(e,a.paper);return e}function ds(t){return ar(ls(t.lineBatches,t.meshBatches),cs(t.viewports))}function us(t,e,a){if(a)return;const r=ms(t,e);if(!(r!=null&&r.newIterator))return;const n=[];for(const i of r.newIterator()){if(!(i instanceof Cr)||lr.isDefaultPaperSpaceViewport(i)||typeof i.toGiViewport!="function")continue;const o=i.toGiViewport(),s=o.box,l=o.viewBox,c=ra(s),d=ra(l);if(!c||!d)continue;const u=Number.isFinite(o.viewTwistAngle)?o.viewTwistAngle:i.viewTwistAngle;n.push(Number.isFinite(u)&&Math.abs(u)>1e-12?{paper:c,model:d,twist:u}:{paper:c,model:d})}return n.length>0?n:void 0}function ra(t){if(typeof t.isEmpty=="function"&&t.isEmpty())return;const e=t.min.x,a=t.min.y,r=t.max.x,n=t.max.y;if(!(!Number.isFinite(e)||!Number.isFinite(a)||!Number.isFinite(r)||!Number.isFinite(n)||r-e<=0||n-a<=0))return{minX:e,minY:a,maxX:r,maxY:n}}function ms(t,e){var a;const r=(a=t.tables)==null?void 0:a.blockTable;if(!r)return;const n=typeof r.getIdAt=="function"?r.getIdAt(e):void 0;if(n)return n;if(typeof r.newIterator=="function"){for(const o of r.newIterator())if(o.objectId===e)return o}const i=r.modelSpace;if((i==null?void 0:i.objectId)===e)return i}const na=16/9;function ps(t,e,a,r=na){var n,i,o,s;const l=Number.isFinite(r)&&r>0?r:na;if(a){const d=(o=(i=(n=t.tables)==null?void 0:n.viewportTable)==null?void 0:i.getActiveVportBox)==null?void 0:o.call(i,l);return ia(d)}const c=(s=t.objects)==null?void 0:s.layout;if(c!=null&&c.newIterator){for(const d of c.newIterator())if(d.blockTableRecordId===e)return ia(d.limits)}}function ia(t){if(!t||typeof t.isEmpty=="function"&&t.isEmpty())return;const e=t.min.x,a=t.min.y,r=t.max.x,n=t.max.y;if(!(!Number.isFinite(e)||!Number.isFinite(a)||!Number.isFinite(r)||!Number.isFinite(n)||r-e<=0||n-a<=0))return{minX:e,minY:a,maxX:r,maxY:n}}class hs{build(e,a,r={}){return this.buildSync(e,a,r)}async buildAsync(e,a,r={}){await V();const n=r.exportInvisibleLayers!==!1,i=r.exportLayouts!==!1,o=n?void 0:p=>wt(e,p,n),s=We(a,{title:r.title,background:r.background}),l=[];e.layers.forEach(p=>{wt(e,p.name,n)&&l.push({name:p.name,color:p.color.RGB??16777215,visible:!p.isOff&&!p.isFrozen})});const c=sa(a),d=new Map(c.map(p=>[p.blockTableRecordId,p.name])),u=ca(e,i),m=[];for(const p of la(e,c,i))m.push(da(e,a,p,d,r,o)),await V();return{version:J,meta:oa(s,r,m,u),layers:l,layouts:m,activeLayoutBtrId:u}}buildSync(e,a,r){const n=r.exportInvisibleLayers!==!1,i=r.exportLayouts!==!1,o=n?void 0:p=>wt(e,p,n),s=We(a,{title:r.title,background:r.background}),l=[];e.layers.forEach(p=>{wt(e,p.name,n)&&l.push({name:p.name,color:p.color.RGB??16777215,visible:!p.isOff&&!p.isFrozen})});const c=sa(a),d=new Map(c.map(p=>[p.blockTableRecordId,p.name])),u=ca(e,i),m=[];for(const p of la(e,c,i))m.push(da(e,a,p,d,r,o));return{version:J,meta:oa(s,r,m,u),layers:l,layouts:m,activeLayoutBtrId:u}}}function oa(t,e,a,r){const n=a.find(s=>s.btrId===r)??a[0],i=n?ds(n):null,o=e.initialView??"fit";return{title:t.title,createdAt:new Date().toISOString(),extents:t.extents,viewExtents:i??void 0,units:t.units,grip:t.grip,background:t.background,locale:e.locale??v.currentLocale,initialView:o,viewState:o==="current"?e.viewState:void 0,viewerMode:e.viewerMode??"measure",exportLayouts:e.exportLayouts!==!1,docsBaseUrl:fs()}}function fs(){try{ns(Sr())}catch{}return rs()}function gs(t){return(t.viewerMode??"measure")==="measure"}function wt(t,e,a){if(a)return!0;const r=t.layers.get(e);return r?!r.isOff&&!r.isFrozen:!0}function sa(t){var e;const a=(e=t.objects)==null?void 0:e.layout;if(!(a!=null&&a.newIterator))return[];const r=[];for(const n of a.newIterator()){const i=n.blockTableRecordId;i&&r.push({name:n.layoutName||i,tabOrder:n.tabOrder??0,blockTableRecordId:i})}return r.sort((n,i)=>n.tabOrder-i.tabOrder),r}function la(t,e,a){if(!a)return t.modelSpaceBtrId?[t.modelSpaceBtrId]:[];const r=new Set,n=[];for(const i of e)r.has(i.blockTableRecordId)||(r.add(i.blockTableRecordId),n.push(i.blockTableRecordId));for(const i of t.layouts.keys())r.has(i)||(r.add(i),n.push(i));return n}function ca(t,e){return e&&t.activeLayoutBtrId||t.modelSpaceBtrId}function da(t,e,a,r,n,i){const o=[],s=[],l=t.layouts.get(a);if(l)for(const[,u]of l.layers){if(i&&!i(u.name))continue;const m=vi(u.internalObject);o.push(...m.lineBatches),s.push(...m.meshBatches)}const c=a===t.modelSpaceBtrId,d=ps(e,a,c,n.canvasAspectRatio);return{btrId:a,name:r.get(a)??bs(e,a),isModelSpace:c,lineBatches:o,meshBatches:s,osnap:gs(n)?Zi(e,a,{includeLayer:i}):void 0,viewports:us(e,a,c),...d?{savedView:d}:{}}}function bs(t,e){var a;const r=(a=t.tables)==null?void 0:a.blockTable;if(r!=null&&r.newIterator){for(const n of r.newIterator())if(n.objectId===e)return n.name}return e}class ws{constructor(e={}){this.options=e,this._snapshotBuilder=new hs}async prepareAcTrView2dForHtmlExport(e,a={}){if(!e||!("cadScene"in e)||!e.cadScene)throw new Error("CAD scene is not available. Open a drawing before exporting to HTML.");if(!(e instanceof kr))throw new Error("HTML export requires a 2D CAD view. Open a drawing before exporting.");const r=Z(a),n={includeInvisibleLayers:r.exportInvisibleLayers,includeLayouts:r.exportLayouts};return await e.ensureEntitiesConvertedForExport(n),await V(),e}async convert(e,a={},r){const n=nt.instance,i=Z(a);await n.withBusyIndicator(async()=>{await V();const o=n.curDocument,s=await this.prepareAcTrView2dForHtmlExport(r??n.curView,i),l=e||o.fileName||o.docTitle,c=Ar(l),d=await this._snapshotBuilder.buildAsync(s.cadScene,o.database,{title:c,background:s.backgroundColor,exportInvisibleLayers:i.exportInvisibleLayers,exportLayouts:i.exportLayouts,initialView:i.initialView,viewerMode:i.viewerMode,viewState:i.initialView==="current"&&(i.exportLayouts||s.activeLayoutBtrId===s.modelSpaceBtrId)?Zo(s):void 0,canvasAspectRatio:s.width/Math.max(s.height,1)});await V();const u=await this.loadViewerRuntime();if(await V(),i.exportFormat==="multi"){const g=Ro(d,{viewerRuntime:u}),h=Jo(g);await V(),this.downloadBytes(h,ze(l,"zip"),"application/zip");return}const m=Ao(i.expiryDays,Date.now(),i.expiresAt),p=await this.packSelfContainedHtml(d,u,{expiresAt:m,password:i.password||void 0});await V(),this.downloadHtml(p,ze(l,"html"))})}async packSnapshot(e,a){await nt.instance.withBusyIndicator(async()=>{await V();const r=await this.loadViewerRuntime();await V();const n=await this.packSelfContainedHtml(e,r,{expiresAt:null});await V(),this.downloadHtml(n,a)})}async packSelfContainedHtml(e,a,r){if(Ho(e))return Yo(e,{title:e.meta.title,viewerRuntime:a,expiresAt:r.expiresAt,password:r.password});const n=await Fo(Ma(e),{expiresAt:r.expiresAt,password:r.password});return bo(e,{title:e.meta.title,viewerRuntime:a,encoded:n.encoded,accessManifest:n.manifest})}async loadViewerRuntime(){const e=as(this.options.viewerRuntimeUrl),a=await fetch(e);if(!a.ok)throw new Error(`Failed to load HTML viewer runtime from "${e}" (${a.status}). Install @mlightcad/cad-html-plugin, copy viewer-runtime.iife.js to your app assets, and set viewerRuntimeUrl on registerLazyHtmlPlugin / createHtmlPlugin / AcApHtmlConvertor.`);return a.text()}downloadHtml(e,a){this.downloadBytes(new TextEncoder().encode(e),a,"text/html;charset=utf-8")}downloadBytes(e,a,r){const n=new Uint8Array(e.byteLength);n.set(e);const i=new Blob([n],{type:r}),o=URL.createObjectURL(i),s=document.createElement("a");s.href=o,s.download=a,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.setTimeout(()=>URL.revokeObjectURL(o),6e4)}}class xs extends yr{constructor(e={}){super(),this.pluginOptions=e}async execute(e){const a=await this.promptOptions();a&&await new ws(this.pluginOptions).convert(e.doc.fileName||e.doc.docTitle,a,e.view)}async promptOptions(){const e=Z(),a=await this.promptExportFormat();if(a===void 0)return;const r=await this.promptYesNo("jig.chtml.exportInvisibleLayers",e.exportInvisibleLayers);if(r===void 0)return;const n=await this.promptYesNo("jig.chtml.exportLayouts",e.exportLayouts);if(n===void 0)return;const i=await this.promptInitialView();if(i===void 0)return;const o=await this.promptViewerMode();if(o!==void 0)return Z({exportFormat:a,exportInvisibleLayers:r,exportLayouts:n,initialView:i,viewerMode:o})}async promptExportFormat(){const e=Z(),a=new bt(v.t("jig.chtml.exportFormat"));a.allowNone=!0;const r=a.keywords.add(v.t("jig.chtml.keywords.single.display"),v.t("jig.chtml.keywords.single.global"),v.t("jig.chtml.keywords.single.local")),n=a.keywords.add(v.t("jig.chtml.keywords.multi.display"),v.t("jig.chtml.keywords.multi.global"),v.t("jig.chtml.keywords.multi.local"));a.keywords.default=e.exportFormat==="multi"?n:r;const i=await nt.instance.editor.getKeywords(a);if(i.status!==T.Cancel){if(i.status===T.None)return e.exportFormat;if(i.status===T.OK||i.status===T.Keyword)return i.stringResult?i.stringResult==="Multi"?"multi":"single":e.exportFormat}}async promptYesNo(e,a){const r=new bt(v.t(e));r.allowNone=!0;const n=r.keywords.add(v.t("jig.chtml.keywords.yes.display"),v.t("jig.chtml.keywords.yes.global"),v.t("jig.chtml.keywords.yes.local")),i=r.keywords.add(v.t("jig.chtml.keywords.no.display"),v.t("jig.chtml.keywords.no.global"),v.t("jig.chtml.keywords.no.local"));r.keywords.default=a?n:i;const o=await nt.instance.editor.getKeywords(r);if(o.status!==T.Cancel){if(o.status===T.None)return a;if(o.status===T.OK||o.status===T.Keyword)return o.stringResult?o.stringResult==="Yes":a}}async promptInitialView(){const e=Z(),a=new bt(v.t("jig.chtml.initialView"));a.allowNone=!0;const r=a.keywords.add(v.t("jig.chtml.keywords.extents.display"),v.t("jig.chtml.keywords.extents.global"),v.t("jig.chtml.keywords.extents.local")),n=a.keywords.add(v.t("jig.chtml.keywords.current.display"),v.t("jig.chtml.keywords.current.global"),v.t("jig.chtml.keywords.current.local"));a.keywords.default=e.initialView==="current"?n:r;const i=await nt.instance.editor.getKeywords(a);if(i.status!==T.Cancel){if(i.status===T.None)return e.initialView;if(i.status===T.OK||i.status===T.Keyword)return i.stringResult?i.stringResult==="Current"?"current":"fit":e.initialView}}async promptViewerMode(){const e=Z(),a=new bt(v.t("jig.chtml.viewerMode"));a.allowNone=!0;const r=a.keywords.add(v.t("jig.chtml.keywords.view.display"),v.t("jig.chtml.keywords.view.global"),v.t("jig.chtml.keywords.view.local")),n=a.keywords.add(v.t("jig.chtml.keywords.measure.display"),v.t("jig.chtml.keywords.measure.global"),v.t("jig.chtml.keywords.measure.local"));a.keywords.default=e.viewerMode==="view"?r:n;const i=await nt.instance.editor.getKeywords(a);if(i.status!==T.Cancel){if(i.status===T.None)return e.viewerMode;if(i.status===T.OK||i.status===T.Keyword)return i.stringResult?i.stringResult==="View"?"view":"measure":e.viewerMode}}}const vs="1.7.3",ys={version:vs};class ks{constructor(e={}){this.options=e,this.name="HtmlPlugin",this.version=ys.version,this.description="HTML export (-chtml) command",this.registeredCommands=[]}onLoad(e,a){const r=vr.SYSTEMT_COMMAND_GROUP_NAME,n=new xs(this.options);a.addCommand(r,"-chtml","-chtml",n),this.registeredCommands.push({group:r,name:"-chtml"}),a.lookupGlobalCmd("chtml")||(a.addCommand(r,"chtml","chtml",n),this.registeredCommands.push({group:r,name:"chtml"}))}onUnload(e,a){for(const r of this.registeredCommands)a.removeCmd(r.group,r.name);this.registeredCommands=[]}}async function Ps(t={}){return t.viewerRuntimeUrl!=null&&ts(t),new ks(es())}export{eo as ACEC_CHUNK_MAGIC,Mn as ACEO_OSNAP_MAGIC,Pn as ACEO_OSNAP_VERSION,io as ACEX_DEFAULT_CHUNK_MAX_BYTES,Ct as ACEX_DEFAULT_MANIFEST_FILE,co as ACEX_DEFAULT_MANIFEST_HREF,oo as ACEX_DEFAULT_OSNAP_CHUNK_MAX_BYTES,_o as ACEX_EMBEDDED_CHUNK_ENCRYPTED_MIME,Ja as ACEX_EMBEDDED_CHUNK_HREF_ATTR,ta as ACEX_EMBEDDED_CHUNK_MAX_BYTES,jo as ACEX_EMBEDDED_CHUNK_MIME,so as ACEX_EMBEDDED_CHUNK_THRESHOLD_BYTES,lo as ACEX_EMBEDDED_OSNAP_CHUNK_MAX_BYTES,Pt as ACEX_MAX_GEOMETRY_BATCH_BYTES,no as ACEX_PACKAGE_VERSION,zn as ACEX_SNAPSHOT_COMPRESSION,J as ACEX_SNAPSHOT_VERSION,xs as AcApExportHtmlCmd,ws as AcApHtmlConvertor,hs as AcApHtmlSnapshotBuilder,Qo as DEFAULT_HTML_VIEWER_RUNTIME_URL,Ls as HTML_PLUGIN_NAME,Es as HTML_PLUGIN_TRIGGERS,he as acExHtmlBytesToBase64,zt as buildAcExHtmlAccessManifest,Ro as buildAcExPackage,Wa as buildAcExPackageData,Zi as buildOsnapCatalog,We as buildViewerMetadata,Zo as captureAcApHtmlViewState,vi as collectBatchesFromObject3D,ee as compressSnapshotBinary,ts as configureHtmlPlugin,_a as createAcExHtmlAccessKey,Ps as createHtmlPlugin,ao as encodeChunkBinary,ro as encodeChunkGzip,Sa as encodeOsnapCatalogBinary,On as encodeOsnapCatalogGzip,Ma as encodeSnapshot,$n as encodeSnapshotBinary,pe as encryptAcExHtmlBytes,zo as encryptAcExHtmlSnapshotPayload,Vo as estimateAcExSnapshotGeometryBytes,Fa as estimateOsnapPrimitiveBytes,ui as exportActiveBatchedLine2Slice,oe as exportActiveBatchedSlice,Ye as exportBufferGeometrySlice,es as getHtmlPluginOptions,sa as listDatabaseLayouts,ja as needsAcExHtmlAccessControl,bo as packHtml,Yo as packHtmlEmbeddedPackage,wo as packHtmlPackage,Fo as protectAcExHtmlEncodedSnapshot,Ao as resolveAcApHtmlExpiresAt,Z as resolveAcApHtmlExportOptions,ce as resolveAcExHtmlLocale,as as resolveViewerRuntimeUrl,Ho as shouldEmbedAcExChunks,Yn as snapshotMimeType,To as splitLayoutIntoSlices,Nn as splitOsnapPrimitives,Jo as zipAcExPackageFiles};
