(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,638135,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return o}});let o=e=>{}},56101,961462,e=>{"use strict";var t=e.i(806615),r=e.i(153527);class o extends r.BaseError{constructor(){super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",{docsPath:"/docs/clients/intro",name:"UrlRequiredError"})}}var a=e.i(451065);function n(e,{errorInstance:t=Error("timed out"),timeout:r,signal:o}){return new Promise((a,n)=>{(async()=>{let s;try{let i=new AbortController;r>0&&(s=setTimeout(()=>{o?i.abort():n(t)},r)),a(await e({signal:i?.signal||null}))}catch(e){e?.name==="AbortError"&&n(t),n(e)}finally{clearTimeout(s)}})()})}e.s(["withTimeout",()=>n],961462);var s=e.i(28587);let i={current:0,take(){return this.current++},reset(){this.current=0}};var c=e.i(262095);function l(e,r={}){let{batch:p,fetchFn:u,fetchOptions:d,key:h="http",methods:f,name:m="HTTP JSON-RPC",onFetchRequest:b,onFetchResponse:y,retryDelay:w,raw:g}=r;return({chain:l,retryCount:x,timeout:k})=>{let{batchSize:v=1e3,wait:E=0}="object"==typeof p?p:{},W=r.retryCount??x,C=k??r.timeout??1e4,R=e||l?.rpcUrls.default.http[0];if(!R)throw new o;let P=function(e,r={}){return{async request(o){let{body:a,fetchFn:c=r.fetchFn??fetch,onRequest:l=r.onRequest,onResponse:p=r.onResponse,timeout:u=r.timeout??1e4}=o,d={...r.fetchOptions??{},...o.fetchOptions??{}},{headers:h,method:f,signal:m}=d;try{let r,o=await n(async({signal:t})=>{let r={...d,body:Array.isArray(a)?(0,s.stringify)(a.map(e=>({jsonrpc:"2.0",id:e.id??i.take(),...e}))):(0,s.stringify)({jsonrpc:"2.0",id:a.id??i.take(),...a}),headers:{"Content-Type":"application/json",...h},method:f||"POST",signal:m||(u>0?t:null)},o=new Request(e,r),n=await l?.(o,r)??{...r,url:e};return await c(n.url??e,n)},{errorInstance:new t.TimeoutError({body:a,url:e}),timeout:u,signal:!0});if(p&&await p(o),o.headers.get("Content-Type")?.startsWith("application/json"))r=await o.json();else{r=await o.text();try{r=JSON.parse(r||"{}")}catch(e){if(o.ok)throw e;r={error:r}}}if(!o.ok)throw new t.HttpRequestError({body:a,details:(0,s.stringify)(r.error)||o.statusText,headers:o.headers,status:o.status,url:e});return r}catch(r){if(r instanceof t.HttpRequestError||r instanceof t.TimeoutError)throw r;throw new t.HttpRequestError({body:a,cause:r,url:e})}}}}(R,{fetchFn:u,fetchOptions:d,onRequest:b,onResponse:y,timeout:C});return(0,c.createTransport)({key:h,methods:f,name:m,async request({method:e,params:r}){let o={method:e,params:r},{schedule:n}=(0,a.createBatchScheduler)({id:R,wait:E,shouldSplitBatch:e=>e.length>v,fn:e=>P.request({body:e}),sort:(e,t)=>e.id-t.id}),s=async e=>p?n(e):[await P.request({body:e})],[{error:i,result:c}]=await s(o);if(g)return{error:i,result:c};if(i)throw new t.RpcRequestError({body:o,error:i,url:R});return c},retryCount:W,retryDelay:w,timeout:C,type:"http"},{fetchOptions:d,url:R})}}e.s(["http",()=>l],56101)},536560,268193,e=>{"use strict";var t=e.i(698804),r=e.i(645170),o=e.i(673891),a=e.i(782051);function n(e,n){let s,i;return(0,t.keccak256)((s="string"==typeof e?(0,a.stringToHex)(e):"string"==typeof e.raw?e.raw:(0,a.bytesToHex)(e.raw),i=(0,a.stringToHex)(`\x19Ethereum Signed Message:
${(0,o.size)(s)}`),(0,r.concat)([i,s])),n)}e.s(["hashMessage",()=>n],536560),e.s(["hashDomain",()=>y,"hashTypedData",()=>b],268193);var s=e.i(147105),i=e.i(703371),c=e.i(56328),l=e.i(28587),p=e.i(153527);class u extends p.BaseError{constructor({domain:e}){super(`Invalid domain "${(0,l.stringify)(e)}".`,{metaMessages:["Must be a valid EIP-712 domain."]})}}class d extends p.BaseError{constructor({primaryType:e,types:t}){super(`Invalid primary type \`${e}\` must be one of \`${JSON.stringify(Object.keys(t))}\`.`,{docsPath:"/api/glossary/Errors#typeddatainvalidprimarytypeerror",metaMessages:["Check that the primary type is a key in `types`."]})}}class h extends p.BaseError{constructor({type:e}){super(`Struct type "${e}" is invalid.`,{metaMessages:["Struct type must not be a Solidity type."],name:"InvalidStructTypeError"})}}var f=e.i(692090),m=e.i(282189);function b(e){let{domain:n={},message:s,primaryType:l}=e,p={EIP712Domain:function({domain:e}){return["string"==typeof e?.name&&{name:"name",type:"string"},e?.version&&{name:"version",type:"string"},("number"==typeof e?.chainId||"bigint"==typeof e?.chainId)&&{name:"chainId",type:"uint256"},e?.verifyingContract&&{name:"verifyingContract",type:"address"},e?.salt&&{name:"salt",type:"bytes32"}].filter(Boolean)}({domain:n}),...e.types};!function(e){let{domain:t,message:r,primaryType:n,types:s}=e,l=(e,t)=>{for(let r of e){let{name:e,type:n}=r,p=t[e],u=n.match(m.integerRegex);if(u&&("number"==typeof p||"bigint"==typeof p)){let[e,t,r]=u;(0,a.numberToHex)(p,{signed:"int"===t,size:Number.parseInt(r,10)/8})}if("address"===n&&"string"==typeof p&&!(0,f.isAddress)(p))throw new c.InvalidAddressError({address:p});let d=n.match(m.bytesRegex);if(d){let[e,t]=d;if(t&&(0,o.size)(p)!==Number.parseInt(t,10))throw new i.BytesSizeMismatchError({expectedSize:Number.parseInt(t,10),givenSize:(0,o.size)(p)})}let b=s[n];b&&(function(e){if("address"===e||"bool"===e||"string"===e||e.startsWith("bytes")||e.startsWith("uint")||e.startsWith("int"))throw new h({type:e})}(n),l(b,p))}};if(s.EIP712Domain&&t){if("object"!=typeof t)throw new u({domain:t});l(s.EIP712Domain,t)}if("EIP712Domain"!==n)if(s[n])l(s[n],r);else throw new d({primaryType:n,types:s})}({domain:n,message:s,primaryType:l,types:p});let b=["0x1901"];return n&&b.push(y({domain:n,types:p})),"EIP712Domain"!==l&&b.push(w({data:s,primaryType:l,types:p})),(0,t.keccak256)((0,r.concat)(b))}function y({domain:e,types:t}){return w({data:e,primaryType:"EIP712Domain",types:t})}function w({data:e,primaryType:r,types:o}){let n=function e({data:r,primaryType:o,types:n}){let i=[{type:"bytes32"}],c=[function({primaryType:e,types:r}){let o=(0,a.toHex)(function({primaryType:e,types:t}){let r="",o=function e({primaryType:t,types:r},o=new Set){let a=t.match(/^\w*/u),n=a?.[0];if(o.has(n)||void 0===r[n])return o;for(let t of(o.add(n),r[n]))e({primaryType:t.type,types:r},o);return o}({primaryType:e,types:t});for(let a of(o.delete(e),[e,...Array.from(o).sort()]))r+=`${a}(${t[a].map(({name:e,type:t})=>`${t} ${e}`).join(",")})`;return r}({primaryType:e,types:r}));return(0,t.keccak256)(o)}({primaryType:o,types:n})];for(let l of n[o]){let[o,p]=function r({types:o,name:n,type:i,value:c}){if(void 0!==o[i])return[{type:"bytes32"},(0,t.keccak256)(e({data:c,primaryType:i,types:o}))];if("bytes"===i){let e=c.length%2?"0":"";return c=`0x${e+c.slice(2)}`,[{type:"bytes32"},(0,t.keccak256)(c)]}if("string"===i)return[{type:"bytes32"},(0,t.keccak256)((0,a.toHex)(c))];if(i.lastIndexOf("]")===i.length-1){let e=i.slice(0,i.lastIndexOf("[")),a=c.map(t=>r({name:n,type:e,types:o,value:t}));return[{type:"bytes32"},(0,t.keccak256)((0,s.encodeAbiParameters)(a.map(([e])=>e),a.map(([,e])=>e)))]}return[{type:i},c]}({types:n,name:l.name,type:l.type,value:r[l.name]});i.push(o),c.push(p)}return(0,s.encodeAbiParameters)(i,c)}({data:e,primaryType:r,types:o});return(0,t.keccak256)(n)}},739823,e=>{"use strict";async function t(e){return new Promise(t=>setTimeout(t,e))}e.s(["wait",()=>t])},550886,e=>{"use strict";var t=e.i(739823);function r(e,{delay:o=100,retryCount:a=2,shouldRetry:n=()=>!0}={}){return new Promise((r,s)=>{let i=async({count:c=0}={})=>{let l=async({error:e})=>{let r="function"==typeof o?o({count:c,error:e}):o;r&&await (0,t.wait)(r),i({count:c+1})};try{let t=await e();r(t)}catch(e){if(c<a&&await n({count:c,error:e}))return l({error:e});s(e)}};i()})}e.s(["withRetry",()=>r])},44788,e=>{"use strict";let t,r=256;function o(e=11){if(!t||r+e>512){t="",r=0;for(let e=0;e<256;e++)t+=(256+256*Math.random()|0).toString(16).substring(1)}return t.substring(r,r+++e)}e.s(["uid",()=>o])},670880,e=>{"use strict";let t=new(e.i(76766)).LruMap(8192);function r(e,{enabled:r=!0,id:o}){if(!r||!o)return e();if(t.get(o))return t.get(o);let a=e().finally(()=>t.delete(o));return t.set(o,a),a}e.s(["withDedupe",()=>r])},211976,e=>{"use strict";var t=e.i(153527),r=e.i(806615),o=e.i(710900),a=e.i(782051),n=e.i(670880),s=e.i(550886),i=e.i(28587);function c(e,l={}){return async(c,p={})=>{let{dedupe:u=!1,methods:d,retryDelay:h=150,retryCount:f=3,uid:m}={...l,...p},{method:b}=c;if(d?.exclude?.includes(b)||d?.include&&!d.include.includes(b))throw new o.MethodNotSupportedRpcError(Error("method not supported"),{method:b});let y=u?(0,a.stringToHex)(`${m}.${(0,i.stringify)(c)}`):void 0;return(0,n.withDedupe)(()=>(0,s.withRetry)(async()=>{try{return await e(c)}catch(e){switch(e.code){case o.ParseRpcError.code:throw new o.ParseRpcError(e);case o.InvalidRequestRpcError.code:throw new o.InvalidRequestRpcError(e);case o.MethodNotFoundRpcError.code:throw new o.MethodNotFoundRpcError(e,{method:c.method});case o.InvalidParamsRpcError.code:throw new o.InvalidParamsRpcError(e);case o.InternalRpcError.code:throw new o.InternalRpcError(e);case o.InvalidInputRpcError.code:throw new o.InvalidInputRpcError(e);case o.ResourceNotFoundRpcError.code:throw new o.ResourceNotFoundRpcError(e);case o.ResourceUnavailableRpcError.code:throw new o.ResourceUnavailableRpcError(e);case o.TransactionRejectedRpcError.code:throw new o.TransactionRejectedRpcError(e);case o.MethodNotSupportedRpcError.code:throw new o.MethodNotSupportedRpcError(e,{method:c.method});case o.LimitExceededRpcError.code:throw new o.LimitExceededRpcError(e);case o.JsonRpcVersionUnsupportedError.code:throw new o.JsonRpcVersionUnsupportedError(e);case o.UserRejectedRequestError.code:throw new o.UserRejectedRequestError(e);case o.UnauthorizedProviderError.code:throw new o.UnauthorizedProviderError(e);case o.UnsupportedProviderMethodError.code:throw new o.UnsupportedProviderMethodError(e);case o.ProviderDisconnectedError.code:throw new o.ProviderDisconnectedError(e);case o.ChainDisconnectedError.code:throw new o.ChainDisconnectedError(e);case o.SwitchChainError.code:throw new o.SwitchChainError(e);case o.UnsupportedNonOptionalCapabilityError.code:throw new o.UnsupportedNonOptionalCapabilityError(e);case o.UnsupportedChainIdError.code:throw new o.UnsupportedChainIdError(e);case o.DuplicateIdError.code:throw new o.DuplicateIdError(e);case o.UnknownBundleIdError.code:throw new o.UnknownBundleIdError(e);case o.BundleTooLargeError.code:throw new o.BundleTooLargeError(e);case o.AtomicReadyWalletRejectedUpgradeError.code:throw new o.AtomicReadyWalletRejectedUpgradeError(e);case o.AtomicityNotSupportedError.code:throw new o.AtomicityNotSupportedError(e);case 5e3:throw new o.UserRejectedRequestError(e);default:if(e instanceof t.BaseError)throw e;throw new o.UnknownRpcError(e)}}},{delay:({count:e,error:t})=>{if(t&&t instanceof r.HttpRequestError){let e=t?.headers?.get("Retry-After");if(e?.match(/\d/))return 1e3*Number.parseInt(e,10)}return~~(1<<e)*h},retryCount:f,shouldRetry:({error:e})=>{var t;return"code"in(t=e)&&"number"==typeof t.code?-1===t.code||t.code===o.LimitExceededRpcError.code||t.code===o.InternalRpcError.code:!(t instanceof r.HttpRequestError)||!t.status||403===t.status||408===t.status||413===t.status||429===t.status||500===t.status||502===t.status||503===t.status||504===t.status||!1}}),{enabled:u,id:y})}}e.s(["buildRequest",()=>c])},262095,e=>{"use strict";var t=e.i(211976),r=e.i(44788);function o({key:e,methods:o,name:a,request:n,retryCount:s=3,retryDelay:i=150,timeout:c,type:l},p){let u=(0,r.uid)();return{config:{key:e,methods:o,name:a,request:n,retryCount:s,retryDelay:i,timeout:c,type:l},request:(0,t.buildRequest)(n,{methods:o,retryCount:s,retryDelay:i,uid:u}),value:p}}e.s(["createTransport",()=>o])},837474,853197,e=>{"use strict";var t=e.i(944445);function r(e,t,r){return e&t^~e&r}function o(e,t,r){return e&t^e&r^t&r}class a extends t.Hash{constructor(e,r,o,a){super(),this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.blockLen=e,this.outputLen=r,this.padOffset=o,this.isLE=a,this.buffer=new Uint8Array(e),this.view=(0,t.createView)(this.buffer)}update(e){(0,t.aexists)(this),e=(0,t.toBytes)(e),(0,t.abytes)(e);let{view:r,buffer:o,blockLen:a}=this,n=e.length;for(let s=0;s<n;){let i=Math.min(a-this.pos,n-s);if(i===a){let r=(0,t.createView)(e);for(;a<=n-s;s+=a)this.process(r,s);continue}o.set(e.subarray(s,s+i),this.pos),this.pos+=i,s+=i,this.pos===a&&(this.process(r,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){(0,t.aexists)(this),(0,t.aoutput)(e,this),this.finished=!0;let{buffer:r,view:o,blockLen:a,isLE:n}=this,{pos:s}=this;r[s++]=128,(0,t.clean)(this.buffer.subarray(s)),this.padOffset>a-s&&(this.process(o,0),s=0);for(let e=s;e<a;e++)r[e]=0;!function(e,t,r,o){if("function"==typeof e.setBigUint64)return e.setBigUint64(t,r,o);let a=BigInt(32),n=BigInt(0xffffffff),s=Number(r>>a&n),i=Number(r&n),c=4*!!o,l=4*!o;e.setUint32(t+c,s,o),e.setUint32(t+l,i,o)}(o,a-8,BigInt(8*this.length),n),this.process(o,0);let i=(0,t.createView)(e),c=this.outputLen;if(c%4)throw Error("_sha2: outputLen should be aligned to 32bit");let l=c/4,p=this.get();if(l>p.length)throw Error("_sha2: outputLen bigger than state");for(let e=0;e<l;e++)i.setUint32(4*e,p[e],n)}digest(){let{buffer:e,outputLen:t}=this;this.digestInto(e);let r=e.slice(0,t);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:t,buffer:r,length:o,finished:a,destroyed:n,pos:s}=this;return e.destroyed=n,e.finished=a,e.length=o,e.pos=s,o%t&&e.buffer.set(r),e}clone(){return this._cloneInto()}}let n=Uint32Array.from([0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]),s=Uint32Array.from([0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4]),i=Uint32Array.from([0xcbbb9d5d,0xc1059ed8,0x629a292a,0x367cd507,0x9159015a,0x3070dd17,0x152fecd8,0xf70e5939,0x67332667,0xffc00b31,0x8eb44a87,0x68581511,0xdb0c2e0d,0x64f98fa7,0x47b5481d,0xbefa4fa4]),c=Uint32Array.from([0x6a09e667,0xf3bcc908,0xbb67ae85,0x84caa73b,0x3c6ef372,0xfe94f82b,0xa54ff53a,0x5f1d36f1,0x510e527f,0xade682d1,0x9b05688c,0x2b3e6c1f,0x1f83d9ab,0xfb41bd6b,0x5be0cd19,0x137e2179]);e.s(["Chi",()=>r,"HashMD",()=>a,"Maj",()=>o,"SHA224_IV",0,s,"SHA256_IV",0,n,"SHA384_IV",0,i,"SHA512_IV",0,c],853197);var l=e.i(882469);let p=Uint32Array.from([0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0xfc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x6ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2]),u=new Uint32Array(64);class d extends a{constructor(e=32){super(64,e,8,!1),this.A=0|n[0],this.B=0|n[1],this.C=0|n[2],this.D=0|n[3],this.E=0|n[4],this.F=0|n[5],this.G=0|n[6],this.H=0|n[7]}get(){let{A:e,B:t,C:r,D:o,E:a,F:n,G:s,H:i}=this;return[e,t,r,o,a,n,s,i]}set(e,t,r,o,a,n,s,i){this.A=0|e,this.B=0|t,this.C=0|r,this.D=0|o,this.E=0|a,this.F=0|n,this.G=0|s,this.H=0|i}process(e,r){for(let t=0;t<16;t++,r+=4)u[t]=e.getUint32(r,!1);for(let e=16;e<64;e++){let r=u[e-15],o=u[e-2],a=(0,t.rotr)(r,7)^(0,t.rotr)(r,18)^r>>>3,n=(0,t.rotr)(o,17)^(0,t.rotr)(o,19)^o>>>10;u[e]=n+u[e-7]+a+u[e-16]|0}let{A:a,B:n,C:s,D:i,E:c,F:l,G:d,H:h}=this;for(let e=0;e<64;e++){var f;let r=h+((0,t.rotr)(c,6)^(0,t.rotr)(c,11)^(0,t.rotr)(c,25))+((f=c)&l^~f&d)+p[e]+u[e]|0,m=((0,t.rotr)(a,2)^(0,t.rotr)(a,13)^(0,t.rotr)(a,22))+o(a,n,s)|0;h=d,d=l,l=c,c=i+r|0,i=s,s=n,n=a,a=r+m|0}a=a+this.A|0,n=n+this.B|0,s=s+this.C|0,i=i+this.D|0,c=c+this.E|0,l=l+this.F|0,d=d+this.G|0,h=h+this.H|0,this.set(a,n,s,i,c,l,d,h)}roundClean(){(0,t.clean)(u)}destroy(){this.set(0,0,0,0,0,0,0,0),(0,t.clean)(this.buffer)}}class h extends d{constructor(){super(28),this.A=0|s[0],this.B=0|s[1],this.C=0|s[2],this.D=0|s[3],this.E=0|s[4],this.F=0|s[5],this.G=0|s[6],this.H=0|s[7]}}let f=l.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),m=f[0],b=f[1],y=new Uint32Array(80),w=new Uint32Array(80);class g extends a{constructor(e=64){super(128,e,16,!1),this.Ah=0|c[0],this.Al=0|c[1],this.Bh=0|c[2],this.Bl=0|c[3],this.Ch=0|c[4],this.Cl=0|c[5],this.Dh=0|c[6],this.Dl=0|c[7],this.Eh=0|c[8],this.El=0|c[9],this.Fh=0|c[10],this.Fl=0|c[11],this.Gh=0|c[12],this.Gl=0|c[13],this.Hh=0|c[14],this.Hl=0|c[15]}get(){let{Ah:e,Al:t,Bh:r,Bl:o,Ch:a,Cl:n,Dh:s,Dl:i,Eh:c,El:l,Fh:p,Fl:u,Gh:d,Gl:h,Hh:f,Hl:m}=this;return[e,t,r,o,a,n,s,i,c,l,p,u,d,h,f,m]}set(e,t,r,o,a,n,s,i,c,l,p,u,d,h,f,m){this.Ah=0|e,this.Al=0|t,this.Bh=0|r,this.Bl=0|o,this.Ch=0|a,this.Cl=0|n,this.Dh=0|s,this.Dl=0|i,this.Eh=0|c,this.El=0|l,this.Fh=0|p,this.Fl=0|u,this.Gh=0|d,this.Gl=0|h,this.Hh=0|f,this.Hl=0|m}process(e,t){for(let r=0;r<16;r++,t+=4)y[r]=e.getUint32(t),w[r]=e.getUint32(t+=4);for(let e=16;e<80;e++){let t=0|y[e-15],r=0|w[e-15],o=l.rotrSH(t,r,1)^l.rotrSH(t,r,8)^l.shrSH(t,r,7),a=l.rotrSL(t,r,1)^l.rotrSL(t,r,8)^l.shrSL(t,r,7),n=0|y[e-2],s=0|w[e-2],i=l.rotrSH(n,s,19)^l.rotrBH(n,s,61)^l.shrSH(n,s,6),c=l.rotrSL(n,s,19)^l.rotrBL(n,s,61)^l.shrSL(n,s,6),p=l.add4L(a,c,w[e-7],w[e-16]),u=l.add4H(p,o,i,y[e-7],y[e-16]);y[e]=0|u,w[e]=0|p}let{Ah:r,Al:o,Bh:a,Bl:n,Ch:s,Cl:i,Dh:c,Dl:p,Eh:u,El:d,Fh:h,Fl:f,Gh:g,Gl:x,Hh:k,Hl:v}=this;for(let e=0;e<80;e++){let t=l.rotrSH(u,d,14)^l.rotrSH(u,d,18)^l.rotrBH(u,d,41),E=l.rotrSL(u,d,14)^l.rotrSL(u,d,18)^l.rotrBL(u,d,41),W=u&h^~u&g,C=d&f^~d&x,R=l.add5L(v,E,C,b[e],w[e]),P=l.add5H(R,k,t,W,m[e],y[e]),I=0|R,O=l.rotrSH(r,o,28)^l.rotrBH(r,o,34)^l.rotrBH(r,o,39),T=l.rotrSL(r,o,28)^l.rotrBL(r,o,34)^l.rotrBL(r,o,39),j=r&a^r&s^a&s,A=o&n^o&i^n&i;k=0|g,v=0|x,g=0|h,x=0|f,h=0|u,f=0|d,({h:u,l:d}=l.add(0|c,0|p,0|P,0|I)),c=0|s,p=0|i,s=0|a,i=0|n,a=0|r,n=0|o;let B=l.add3L(I,T,A);r=l.add3H(B,P,O,j),o=0|B}({h:r,l:o}=l.add(0|this.Ah,0|this.Al,0|r,0|o)),({h:a,l:n}=l.add(0|this.Bh,0|this.Bl,0|a,0|n)),({h:s,l:i}=l.add(0|this.Ch,0|this.Cl,0|s,0|i)),({h:c,l:p}=l.add(0|this.Dh,0|this.Dl,0|c,0|p)),({h:u,l:d}=l.add(0|this.Eh,0|this.El,0|u,0|d)),({h:h,l:f}=l.add(0|this.Fh,0|this.Fl,0|h,0|f)),({h:g,l:x}=l.add(0|this.Gh,0|this.Gl,0|g,0|x)),({h:k,l:v}=l.add(0|this.Hh,0|this.Hl,0|k,0|v)),this.set(r,o,a,n,s,i,c,p,u,d,h,f,g,x,k,v)}roundClean(){(0,t.clean)(y,w)}destroy(){(0,t.clean)(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}class x extends g{constructor(){super(48),this.Ah=0|i[0],this.Al=0|i[1],this.Bh=0|i[2],this.Bl=0|i[3],this.Ch=0|i[4],this.Cl=0|i[5],this.Dh=0|i[6],this.Dl=0|i[7],this.Eh=0|i[8],this.El=0|i[9],this.Fh=0|i[10],this.Fl=0|i[11],this.Gh=0|i[12],this.Gl=0|i[13],this.Hh=0|i[14],this.Hl=0|i[15]}}let k=(0,t.createHasher)(()=>new d),v=(0,t.createHasher)(()=>new h),E=(0,t.createHasher)(()=>new g),W=(0,t.createHasher)(()=>new x);e.s(["SHA224",()=>h,"SHA256",()=>d,"sha224",0,v,"sha256",0,k,"sha384",0,W,"sha512",0,E],837474)},211916,e=>{"use strict";let t=BigInt(0),r=BigInt(1);function o(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&"Uint8Array"===e.constructor.name}function a(e){if(!o(e))throw Error("Uint8Array expected")}function n(e,t){if("boolean"!=typeof t)throw Error(e+" boolean expected, got "+t)}function s(e){let t=e.toString(16);return 1&t.length?"0"+t:t}function i(e){if("string"!=typeof e)throw Error("hex string expected, got "+typeof e);return""===e?t:BigInt("0x"+e)}let c="function"==typeof Uint8Array.from([]).toHex&&"function"==typeof Uint8Array.fromHex,l=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function p(e){if(a(e),c)return e.toHex();let t="";for(let r=0;r<e.length;r++)t+=l[e[r]];return t}function u(e){return e>=48&&e<=57?e-48:e>=65&&e<=70?e-55:e>=97&&e<=102?e-87:void 0}function d(e){if("string"!=typeof e)throw Error("hex string expected, got "+typeof e);if(c)return Uint8Array.fromHex(e);let t=e.length,r=t/2;if(t%2)throw Error("hex string expected, got unpadded hex of length "+t);let o=new Uint8Array(r);for(let t=0,a=0;t<r;t++,a+=2){let r=u(e.charCodeAt(a)),n=u(e.charCodeAt(a+1));if(void 0===r||void 0===n)throw Error('hex string expected, got non-hex character "'+(e[a]+e[a+1])+'" at index '+a);o[t]=16*r+n}return o}function h(e){return i(p(e))}function f(e){return a(e),i(p(Uint8Array.from(e).reverse()))}function m(e,t){return d(e.toString(16).padStart(2*t,"0"))}function b(e,t){return m(e,t).reverse()}function y(e,t,r){let a;if("string"==typeof t)try{a=d(t)}catch(t){throw Error(e+" must be hex string or Uint8Array, cause: "+t)}else if(o(t))a=Uint8Array.from(t);else throw Error(e+" must be hex string or Uint8Array");let n=a.length;if("number"==typeof r&&n!==r)throw Error(e+" of length "+r+" expected, got "+n);return a}function w(...e){let t=0;for(let r=0;r<e.length;r++){let o=e[r];a(o),t+=o.length}let r=new Uint8Array(t);for(let t=0,o=0;t<e.length;t++){let a=e[t];r.set(a,o),o+=a.length}return r}function g(e,t){if(e.length!==t.length)return!1;let r=0;for(let o=0;o<e.length;o++)r|=e[o]^t[o];return 0===r}function x(e){if("string"!=typeof e)throw Error("string expected");return new Uint8Array(new TextEncoder().encode(e))}let k=e=>"bigint"==typeof e&&t<=e;function v(e,t,r){return k(e)&&k(t)&&k(r)&&t<=e&&e<r}function E(e,t,r,o){if(!v(t,r,o))throw Error("expected valid "+e+": "+r+" <= n < "+o+", got "+t)}function W(e){let o;for(o=0;e>t;e>>=r,o+=1);return o}let C=e=>new Uint8Array(e);function R(e,t,r){if("number"!=typeof e||e<2)throw Error("hashLen must be a number");if("number"!=typeof t||t<2)throw Error("qByteLen must be a number");if("function"!=typeof r)throw Error("hmacFn must be a function");let o=C(e),a=C(e),n=0,s=()=>{o.fill(1),a.fill(0),n=0},i=(...e)=>r(a,o,...e),c=(e=C(0))=>{let t;if(a=i((t=[0],Uint8Array.from(t)),e),o=i(),0!==e.length){let t;a=i((t=[1],Uint8Array.from(t)),e),o=i()}},l=()=>{if(n++>=1e3)throw Error("drbg: tried 1000 values");let e=0,r=[];for(;e<t;){let t=(o=i()).slice();r.push(t),e+=o.length}return w(...r)};return(e,t)=>{let r;for(s(),c(e);!(r=t(l()));)c();return s(),r}}let P={bigint:e=>"bigint"==typeof e,function:e=>"function"==typeof e,boolean:e=>"boolean"==typeof e,string:e=>"string"==typeof e,stringOrUint8Array:e=>"string"==typeof e||o(e),isSafeInteger:e=>Number.isSafeInteger(e),array:e=>Array.isArray(e),field:(e,t)=>t.Fp.isValid(e),hash:e=>"function"==typeof e&&Number.isSafeInteger(e.outputLen)};function I(e,t,r={}){let o=(t,r,o)=>{let a=P[r];if("function"!=typeof a)throw Error("invalid validator function");let n=e[t];if((!o||void 0!==n)&&!a(n,e))throw Error("param "+String(t)+" is invalid. Expected "+r+", got "+n)};for(let[e,r]of Object.entries(t))o(e,r,!1);for(let[e,t]of Object.entries(r))o(e,t,!0);return e}function O(e){let t=new WeakMap;return(r,...o)=>{let a=t.get(r);if(void 0!==a)return a;let n=e(r,...o);return t.set(r,n),n}}e.s(["aInRange",()=>E,"abool",()=>n,"abytes",()=>a,"bitLen",()=>W,"bitMask",0,e=>(r<<BigInt(e))-r,"bytesToHex",()=>p,"bytesToNumberBE",()=>h,"bytesToNumberLE",()=>f,"concatBytes",()=>w,"createHmacDrbg",()=>R,"ensureBytes",()=>y,"equalBytes",()=>g,"hexToBytes",()=>d,"inRange",()=>v,"isBytes",()=>o,"memoized",()=>O,"numberToBytesBE",()=>m,"numberToBytesLE",()=>b,"numberToHexUnpadded",()=>s,"utf8ToBytes",()=>x,"validateObject",()=>I])},976837,e=>{"use strict";function t(e,t){let r=e.toString(),o=r.startsWith("-");o&&(r=r.slice(1));let[a,n]=[(r=r.padStart(t,"0")).slice(0,r.length-t),r.slice(r.length-t)];return n=n.replace(/(0+)$/,""),`${o?"-":""}${a||"0"}${n?`.${n}`:""}`}e.s(["formatUnits",()=>t])},568984,710159,e=>{"use strict";let t={ether:-9,wei:9};e.s(["etherUnits",0,{gwei:9,wei:18},"gweiUnits",0,t,"weiUnits",0,{ether:-18,gwei:-9}],710159);var r=e.i(976837);function o(e,a="wei"){return(0,r.formatUnits)(e,t[a])}e.s(["formatGwei",()=>o],568984)},677851,e=>{"use strict";e.s(["getContractAddress",0,e=>e,"getUrl",0,e=>e])},710900,806615,e=>{"use strict";var t=e.i(153527),r=e.i(28587),o=t,a=e.i(677851);class n extends o.BaseError{constructor({body:e,cause:t,details:o,headers:n,status:s,url:i}){super("HTTP request failed.",{cause:t,details:o,metaMessages:[s&&`Status: ${s}`,`URL: ${(0,a.getUrl)(i)}`,e&&`Request body: ${(0,r.stringify)(e)}`].filter(Boolean),name:"HttpRequestError"}),Object.defineProperty(this,"body",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"headers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"status",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.body=e,this.headers=n,this.status=s,this.url=i}}o.BaseError;class s extends o.BaseError{constructor({body:e,error:t,url:o}){super("RPC Request failed.",{cause:t,details:t.message,metaMessages:[`URL: ${(0,a.getUrl)(o)}`,`Request body: ${(0,r.stringify)(e)}`],name:"RpcRequestError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.code=t.code,this.data=t.data}}o.BaseError;class i extends o.BaseError{constructor({body:e,url:t}){super("The request took too long to respond.",{details:"The request timed out.",metaMessages:[`URL: ${(0,a.getUrl)(t)}`,`Request body: ${(0,r.stringify)(e)}`],name:"TimeoutError"})}}e.s(["HttpRequestError",()=>n,"RpcRequestError",()=>s,"TimeoutError",()=>i],806615);class c extends t.BaseError{constructor(e,{code:t,docsPath:r,metaMessages:o,name:a,shortMessage:n}){super(n,{cause:e,docsPath:r,metaMessages:o||e?.metaMessages,name:a||"RpcError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name=a||e.name,this.code=e instanceof s?e.code:t??-1}}class l extends c{constructor(e,t){super(e,t),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=t.data}}class p extends c{constructor(e){super(e,{code:p.code,name:"ParseRpcError",shortMessage:"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."})}}Object.defineProperty(p,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32700});class u extends c{constructor(e){super(e,{code:u.code,name:"InvalidRequestRpcError",shortMessage:"JSON is not a valid request object."})}}Object.defineProperty(u,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32600});class d extends c{constructor(e,{method:t}={}){super(e,{code:d.code,name:"MethodNotFoundRpcError",shortMessage:`The method${t?` "${t}"`:""} does not exist / is not available.`})}}Object.defineProperty(d,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32601});class h extends c{constructor(e){super(e,{code:h.code,name:"InvalidParamsRpcError",shortMessage:"Invalid parameters were provided to the RPC method.\nDouble check you have provided the correct parameters."})}}Object.defineProperty(h,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32602});class f extends c{constructor(e){super(e,{code:f.code,name:"InternalRpcError",shortMessage:"An internal error was received."})}}Object.defineProperty(f,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32603});class m extends c{constructor(e){super(e,{code:m.code,name:"InvalidInputRpcError",shortMessage:"Missing or invalid parameters.\nDouble check you have provided the correct parameters."})}}Object.defineProperty(m,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32e3});class b extends c{constructor(e){super(e,{code:b.code,name:"ResourceNotFoundRpcError",shortMessage:"Requested resource not found."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ResourceNotFoundRpcError"})}}Object.defineProperty(b,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32001});class y extends c{constructor(e){super(e,{code:y.code,name:"ResourceUnavailableRpcError",shortMessage:"Requested resource not available."})}}Object.defineProperty(y,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32002});class w extends c{constructor(e){super(e,{code:w.code,name:"TransactionRejectedRpcError",shortMessage:"Transaction creation failed."})}}Object.defineProperty(w,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32003});class g extends c{constructor(e,{method:t}={}){super(e,{code:g.code,name:"MethodNotSupportedRpcError",shortMessage:`Method${t?` "${t}"`:""} is not supported.`})}}Object.defineProperty(g,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32004});class x extends c{constructor(e){super(e,{code:x.code,name:"LimitExceededRpcError",shortMessage:"Request exceeds defined limit."})}}Object.defineProperty(x,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32005});class k extends c{constructor(e){super(e,{code:k.code,name:"JsonRpcVersionUnsupportedError",shortMessage:"Version of JSON-RPC protocol is not supported."})}}Object.defineProperty(k,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32006});class v extends l{constructor(e){super(e,{code:v.code,name:"UserRejectedRequestError",shortMessage:"User rejected the request."})}}Object.defineProperty(v,"code",{enumerable:!0,configurable:!0,writable:!0,value:4001});class E extends l{constructor(e){super(e,{code:E.code,name:"UnauthorizedProviderError",shortMessage:"The requested method and/or account has not been authorized by the user."})}}Object.defineProperty(E,"code",{enumerable:!0,configurable:!0,writable:!0,value:4100});class W extends l{constructor(e,{method:t}={}){super(e,{code:W.code,name:"UnsupportedProviderMethodError",shortMessage:`The Provider does not support the requested method${t?` " ${t}"`:""}.`})}}Object.defineProperty(W,"code",{enumerable:!0,configurable:!0,writable:!0,value:4200});class C extends l{constructor(e){super(e,{code:C.code,name:"ProviderDisconnectedError",shortMessage:"The Provider is disconnected from all chains."})}}Object.defineProperty(C,"code",{enumerable:!0,configurable:!0,writable:!0,value:4900});class R extends l{constructor(e){super(e,{code:R.code,name:"ChainDisconnectedError",shortMessage:"The Provider is not connected to the requested chain."})}}Object.defineProperty(R,"code",{enumerable:!0,configurable:!0,writable:!0,value:4901});class P extends l{constructor(e){super(e,{code:P.code,name:"SwitchChainError",shortMessage:"An error occurred when attempting to switch chain."})}}Object.defineProperty(P,"code",{enumerable:!0,configurable:!0,writable:!0,value:4902});class I extends l{constructor(e){super(e,{code:I.code,name:"UnsupportedNonOptionalCapabilityError",shortMessage:"This Wallet does not support a capability that was not marked as optional."})}}Object.defineProperty(I,"code",{enumerable:!0,configurable:!0,writable:!0,value:5700});class O extends l{constructor(e){super(e,{code:O.code,name:"UnsupportedChainIdError",shortMessage:"This Wallet does not support the requested chain ID."})}}Object.defineProperty(O,"code",{enumerable:!0,configurable:!0,writable:!0,value:5710});class T extends l{constructor(e){super(e,{code:T.code,name:"DuplicateIdError",shortMessage:"There is already a bundle submitted with this ID."})}}Object.defineProperty(T,"code",{enumerable:!0,configurable:!0,writable:!0,value:5720});class j extends l{constructor(e){super(e,{code:j.code,name:"UnknownBundleIdError",shortMessage:"This bundle id is unknown / has not been submitted"})}}Object.defineProperty(j,"code",{enumerable:!0,configurable:!0,writable:!0,value:5730});class A extends l{constructor(e){super(e,{code:A.code,name:"BundleTooLargeError",shortMessage:"The call bundle is too large for the Wallet to process."})}}Object.defineProperty(A,"code",{enumerable:!0,configurable:!0,writable:!0,value:5740});class B extends l{constructor(e){super(e,{code:B.code,name:"AtomicReadyWalletRejectedUpgradeError",shortMessage:"The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."})}}Object.defineProperty(B,"code",{enumerable:!0,configurable:!0,writable:!0,value:5750});class q extends l{constructor(e){super(e,{code:q.code,name:"AtomicityNotSupportedError",shortMessage:"The wallet does not support atomic execution but the request requires it."})}}Object.defineProperty(q,"code",{enumerable:!0,configurable:!0,writable:!0,value:5760});class N extends c{constructor(e){super(e,{name:"UnknownRpcError",shortMessage:"An unknown RPC error occurred."})}}e.s(["AtomicReadyWalletRejectedUpgradeError",()=>B,"AtomicityNotSupportedError",()=>q,"BundleTooLargeError",()=>A,"ChainDisconnectedError",()=>R,"DuplicateIdError",()=>T,"InternalRpcError",()=>f,"InvalidInputRpcError",()=>m,"InvalidParamsRpcError",()=>h,"InvalidRequestRpcError",()=>u,"JsonRpcVersionUnsupportedError",()=>k,"LimitExceededRpcError",()=>x,"MethodNotFoundRpcError",()=>d,"MethodNotSupportedRpcError",()=>g,"ParseRpcError",()=>p,"ProviderDisconnectedError",()=>C,"ResourceNotFoundRpcError",()=>b,"ResourceUnavailableRpcError",()=>y,"SwitchChainError",()=>P,"TransactionRejectedRpcError",()=>w,"UnauthorizedProviderError",()=>E,"UnknownBundleIdError",()=>j,"UnknownRpcError",()=>N,"UnsupportedChainIdError",()=>O,"UnsupportedNonOptionalCapabilityError",()=>I,"UnsupportedProviderMethodError",()=>W,"UserRejectedRequestError",()=>v],710900)},205260,e=>{"use strict";var t=e.i(568984),r=e.i(153527);class o extends r.BaseError{constructor({cause:e,message:t}={}){const r=t?.replace("execution reverted: ","")?.replace("execution reverted","");super(`Execution reverted ${r?`with reason: ${r}`:"for an unknown reason"}.`,{cause:e,name:"ExecutionRevertedError"})}}Object.defineProperty(o,"code",{enumerable:!0,configurable:!0,writable:!0,value:3}),Object.defineProperty(o,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/execution reverted/});class a extends r.BaseError{constructor({cause:e,maxFeePerGas:r}={}){super(`The fee cap (\`maxFeePerGas\`${r?` = ${(0,t.formatGwei)(r)} gwei`:""}) cannot be higher than the maximum allowed value (2^256-1).`,{cause:e,name:"FeeCapTooHighError"})}}Object.defineProperty(a,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/});class n extends r.BaseError{constructor({cause:e,maxFeePerGas:r}={}){super(`The fee cap (\`maxFeePerGas\`${r?` = ${(0,t.formatGwei)(r)}`:""} gwei) cannot be lower than the block base fee.`,{cause:e,name:"FeeCapTooLowError"})}}Object.defineProperty(n,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/});class s extends r.BaseError{constructor({cause:e,nonce:t}={}){super(`Nonce provided for the transaction ${t?`(${t}) `:""}is higher than the next one expected.`,{cause:e,name:"NonceTooHighError"})}}Object.defineProperty(s,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/nonce too high/});class i extends r.BaseError{constructor({cause:e,nonce:t}={}){super(`Nonce provided for the transaction ${t?`(${t}) `:""}is lower than the current nonce of the account.
Try increasing the nonce or find the latest nonce with \`getTransactionCount\`.`,{cause:e,name:"NonceTooLowError"})}}Object.defineProperty(i,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/nonce too low|transaction already imported|already known/});class c extends r.BaseError{constructor({cause:e,nonce:t}={}){super(`Nonce provided for the transaction ${t?`(${t}) `:""}exceeds the maximum allowed nonce.`,{cause:e,name:"NonceMaxValueError"})}}Object.defineProperty(c,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/nonce has max value/});class l extends r.BaseError{constructor({cause:e}={}){super("The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.",{cause:e,metaMessages:["This error could arise when the account does not have enough funds to:"," - pay for the total gas fee,"," - pay for the value to send."," ","The cost of the transaction is calculated as `gas * gas fee + value`, where:"," - `gas` is the amount of gas needed for transaction to execute,"," - `gas fee` is the gas fee,"," - `value` is the amount of ether to send to the recipient."],name:"InsufficientFundsError"})}}Object.defineProperty(l,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/insufficient funds|exceeds transaction sender account balance/});class p extends r.BaseError{constructor({cause:e,gas:t}={}){super(`The amount of gas ${t?`(${t}) `:""}provided for the transaction exceeds the limit allowed for the block.`,{cause:e,name:"IntrinsicGasTooHighError"})}}Object.defineProperty(p,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/intrinsic gas too high|gas limit reached/});class u extends r.BaseError{constructor({cause:e,gas:t}={}){super(`The amount of gas ${t?`(${t}) `:""}provided for the transaction is too low.`,{cause:e,name:"IntrinsicGasTooLowError"})}}Object.defineProperty(u,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/intrinsic gas too low/});class d extends r.BaseError{constructor({cause:e}){super("The transaction type is not supported for this chain.",{cause:e,name:"TransactionTypeNotSupportedError"})}}Object.defineProperty(d,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/transaction type not valid/});class h extends r.BaseError{constructor({cause:e,maxPriorityFeePerGas:r,maxFeePerGas:o}={}){super(`The provided tip (\`maxPriorityFeePerGas\`${r?` = ${(0,t.formatGwei)(r)} gwei`:""}) cannot be higher than the fee cap (\`maxFeePerGas\`${o?` = ${(0,t.formatGwei)(o)} gwei`:""}).`,{cause:e,name:"TipAboveFeeCapError"})}}Object.defineProperty(h,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max priority fee per gas higher than max fee per gas|tip higher than fee cap/});class f extends r.BaseError{constructor({cause:e}){super(`An error occurred while executing: ${e?.shortMessage}`,{cause:e,name:"UnknownNodeError"})}}e.s(["ExecutionRevertedError",()=>o,"FeeCapTooHighError",()=>a,"FeeCapTooLowError",()=>n,"InsufficientFundsError",()=>l,"IntrinsicGasTooHighError",()=>p,"IntrinsicGasTooLowError",()=>u,"NonceMaxValueError",()=>c,"NonceTooHighError",()=>s,"NonceTooLowError",()=>i,"TipAboveFeeCapError",()=>h,"TransactionTypeNotSupportedError",()=>d,"UnknownNodeError",()=>f])},451065,135635,e=>{"use strict";function t(){let e=()=>void 0,t=()=>void 0;return{promise:new Promise((r,o)=>{e=r,t=o}),resolve:e,reject:t}}e.s(["withResolvers",()=>t],135635);let r=new Map;function o({fn:e,id:o,shouldSplitBatch:a,wait:n=0,sort:s}){let i=async()=>{let t=l();c();let r=t.map(({args:e})=>e);0!==r.length&&e(r).then(e=>{s&&Array.isArray(e)&&e.sort(s);for(let r=0;r<t.length;r++){let{resolve:o}=t[r];o?.([e[r],e])}}).catch(e=>{for(let r=0;r<t.length;r++){let{reject:o}=t[r];o?.(e)}})},c=()=>r.delete(o),l=()=>r.get(o)||[],p=e=>r.set(o,[...l(),e]);return{flush:c,async schedule(e){let{promise:r,resolve:o,reject:s}=t();return(a?.([...l().map(({args:e})=>e),e])&&i(),l().length>0)?p({args:e,resolve:o,reject:s}):(p({args:e,resolve:o,reject:s}),setTimeout(i,n)),r}}}e.s(["createBatchScheduler",()=>o],451065)},948804,73121,e=>{"use strict";var t=e.i(453900),r=e.i(671359),o=e.i(703371),a=e.i(483327),n=e.i(533612),s=e.i(428921),i=e.i(157102);function c(e){let{abi:t,data:r}=e,c=(0,a.slice)(r,0,4),l=t.find(e=>"function"===e.type&&c===(0,n.toFunctionSelector)((0,i.formatAbiItem)(e)));if(!l)throw new o.AbiFunctionSignatureNotFoundError(c,{docsPath:"/docs/contract/decodeFunctionData"});return{functionName:l.name,args:"inputs"in l&&l.inputs&&l.inputs.length>0?(0,s.decodeAbiParameters)(l.inputs,(0,a.slice)(r,4)):void 0}}e.s(["decodeFunctionData",()=>c],73121);var l=e.i(645170),p=e.i(147105),u=e.i(479671);let d="/docs/contract/encodeErrorResult";function h(e){let{abi:t,errorName:r,args:a}=e,s=t[0];if(r){let e=(0,u.getAbiItem)({abi:t,args:a,name:r});if(!e)throw new o.AbiErrorNotFoundError(r,{docsPath:d});s=e}if("error"!==s.type)throw new o.AbiErrorNotFoundError(void 0,{docsPath:d});let c=(0,i.formatAbiItem)(s),h=(0,n.toFunctionSelector)(c),f="0x";if(a&&a.length>0){if(!s.inputs)throw new o.AbiErrorInputsNotFoundError(s.name,{docsPath:d});f=(0,p.encodeAbiParameters)(s.inputs,a)}return(0,l.concatHex)([h,f])}let f="/docs/contract/encodeFunctionResult",m="x-batch-gateway:true";async function b(e){let{data:a,ccipRequest:n}=e,{args:[s]}=c({abi:t.batchGatewayAbi,data:a}),i=[],l=[];return await Promise.all(s.map(async(e,o)=>{try{l[o]=e.urls.includes(m)?await b({data:e.data,ccipRequest:n}):await n(e),i[o]=!1}catch(e){var a;i[o]=!0,l[o]="HttpRequestError"===(a=e).name&&a.status?h({abi:t.batchGatewayAbi,errorName:"HttpError",args:[a.status,a.shortMessage]}):h({abi:[r.solidityError],errorName:"Error",args:["shortMessage"in a?a.shortMessage:a.message]})}})),function(e){let{abi:t,functionName:r,result:a}=e,n=t[0];if(r){let e=(0,u.getAbiItem)({abi:t,name:r});if(!e)throw new o.AbiFunctionNotFoundError(r,{docsPath:f});n=e}if("function"!==n.type)throw new o.AbiFunctionNotFoundError(void 0,{docsPath:f});if(!n.outputs)throw new o.AbiFunctionOutputsNotFoundError(n.name,{docsPath:f});let s=(()=>{if(0===n.outputs.length)return[];if(1===n.outputs.length)return[a];if(Array.isArray(a))return a;throw new o.InvalidArrayError(a)})();return(0,p.encodeAbiParameters)(n.outputs,s)}({abi:t.batchGatewayAbi,functionName:"query",result:[i,l]})}e.s(["localBatchGatewayRequest",()=>b,"localBatchGatewayUrl",0,m],948804)},477756,e=>{"use strict";var t=e.i(56328),r=e.i(692090);function o(e,o){if(!(0,r.isAddress)(e,{strict:!1}))throw new t.InvalidAddressError({address:e});if(!(0,r.isAddress)(o,{strict:!1}))throw new t.InvalidAddressError({address:o});return e.toLowerCase()===o.toLowerCase()}e.s(["isAddressEqual",()=>o])},663222,e=>{"use strict";var t=`{
  "connect_wallet": {
    "label": "Connect Wallet",
    "wrong_network": {
      "label": "Wrong network"
    }
  },

  "intro": {
    "title": "What is a Wallet?",
    "description": "A wallet is used to send, receive, store, and display digital assets. It's also a new way to log in, without needing to create new accounts and passwords on every website.",
    "digital_asset": {
      "title": "A Home for your Digital Assets",
      "description": "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."
    },
    "login": {
      "title": "A New Way to Log In",
      "description": "Instead of creating new accounts and passwords on every website, just connect your wallet."
    },
    "get": {
      "label": "Get a Wallet"
    },
    "learn_more": {
      "label": "Learn More"
    }
  },

  "sign_in": {
    "label": "Verify your account",
    "description": "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.",
    "message": {
      "send": "Sign message",
      "preparing": "Preparing message...",
      "cancel": "Cancel",
      "preparing_error": "Error preparing message, please retry!"
    },
    "signature": {
      "waiting": "Waiting for signature...",
      "verifying": "Verifying signature...",
      "signing_error": "Error signing message, please retry!",
      "verifying_error": "Error verifying signature, please retry!",
      "oops_error": "Oops, something went wrong!"
    }
  },

  "connect": {
    "label": "Connect",
    "title": "Connect a Wallet",
    "new_to_ethereum": {
      "description": "New to Ethereum wallets?",
      "learn_more": {
        "label": "Learn More"
      }
    },
    "learn_more": {
      "label": "Learn more"
    },
    "recent": "Recent",
    "status": {
      "opening": "Opening %{wallet}...",
      "connecting": "Connecting",
      "connect_mobile": "Continue in %{wallet}",
      "not_installed": "%{wallet} is not installed",
      "not_available": "%{wallet} is not available",
      "confirm": "Confirm connection in the extension",
      "confirm_mobile": "Accept connection request in the wallet"
    },
    "secondary_action": {
      "get": {
        "description": "Don't have %{wallet}?",
        "label": "GET"
      },
      "install": {
        "label": "INSTALL"
      },
      "retry": {
        "label": "RETRY"
      }
    },
    "walletconnect": {
      "description": {
        "full": "Need the official WalletConnect modal?",
        "compact": "Need the WalletConnect modal?"
      },
      "open": {
        "label": "OPEN"
      }
    }
  },

  "connect_scan": {
    "title": "Scan with %{wallet}",
    "fallback_title": "Scan with your phone"
  },

  "connector_group": {
    "installed": "Installed",
    "recommended": "Recommended",
    "other": "Other",
    "popular": "Popular",
    "more": "More",
    "others": "Others"
  },

  "get": {
    "title": "Get a Wallet",
    "action": {
      "label": "GET"
    },
    "mobile": {
      "description": "Mobile Wallet"
    },
    "extension": {
      "description": "Browser Extension"
    },
    "mobile_and_extension": {
      "description": "Mobile Wallet and Extension"
    },
    "mobile_and_desktop": {
      "description": "Mobile and Desktop Wallet"
    },
    "looking_for": {
      "title": "Not what you're looking for?",
      "mobile": {
        "description": "Select a wallet on the main screen to get started with a different wallet provider."
      },
      "desktop": {
        "compact_description": "Select a wallet on the main screen to get started with a different wallet provider.",
        "wide_description": "Select a wallet on the left to get started with a different wallet provider."
      }
    }
  },

  "get_options": {
    "title": "Get started with %{wallet}",
    "short_title": "Get %{wallet}",
    "mobile": {
      "title": "%{wallet} for Mobile",
      "description": "Use the mobile wallet to explore the world of Ethereum.",
      "download": {
        "label": "Get the app"
      }
    },
    "extension": {
      "title": "%{wallet} for %{browser}",
      "description": "Access your wallet right from your favorite web browser.",
      "download": {
        "label": "Add to %{browser}"
      }
    },
    "desktop": {
      "title": "%{wallet} for %{platform}",
      "description": "Access your wallet natively from your powerful desktop.",
      "download": {
        "label": "Add to %{platform}"
      }
    }
  },

  "get_mobile": {
    "title": "Install %{wallet}",
    "description": "Scan with your phone to download on iOS or Android",
    "continue": {
      "label": "Continue"
    }
  },

  "get_instructions": {
    "mobile": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "extension": {
      "refresh": {
        "label": "Refresh"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "desktop": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    }
  },

  "chains": {
    "title": "Switch Networks",
    "wrong_network": "Wrong network detected, switch or disconnect to continue.",
    "confirm": "Confirm in Wallet",
    "switching_not_supported": "Your wallet does not support switching networks from %{appName}. Try switching networks from within your wallet instead.",
    "switching_not_supported_fallback": "Your wallet does not support switching networks from this app. Try switching networks from within your wallet instead.",
    "disconnect": "Disconnect",
    "connected": "Connected"
  },

  "profile": {
    "disconnect": {
      "label": "Disconnect"
    },
    "copy_address": {
      "label": "Copy Address",
      "copied": "Copied!"
    },
    "explorer": {
      "label": "View more on explorer"
    },
    "transactions": {
      "description": "%{appName} transactions will appear here...",
      "description_fallback": "Your transactions will appear here...",
      "recent": {
        "title": "Recent Transactions"
      },
      "clear": {
        "label": "Clear All"
      }
    }
  },

  "wallet_connectors": {
    "argent": {
      "qr_code": {
        "step1": {
          "description": "Put Argent on your home screen for faster access to your wallet.",
          "title": "Open the Argent app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "berasig": {
      "extension": {
        "step1": {
          "title": "Install the BeraSig extension",
          "description": "We recommend pinning BeraSig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "best": {
      "qr_code": {
        "step1": {
          "title": "Open the Best Wallet app",
          "description": "Add Best Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bifrost": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bifrost Wallet on your home screen for quicker access.",
          "title": "Open the Bifrost Wallet app"
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "bitget": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bitget Wallet on your home screen for quicker access.",
          "title": "Open the Bitget Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Bitget Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitget Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitski": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Bitski to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitski extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitverse": {
      "qr_code": {
        "step1": {
          "title": "Open the Bitverse Wallet app",
          "description": "Add Bitverse Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bloom": {
      "desktop": {
        "step1": {
          "title": "Open the Bloom Wallet app",
          "description": "We recommend putting Bloom Wallet on your home screen for quicker access."
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you have a wallet, click on Connect to connect via Bloom. A connection prompt in the app will appear for you to confirm the connection.",
          "title": "Click on Connect"
        }
      }
    },

    "bybit": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bybit on your home screen for faster access to your wallet.",
          "title": "Open the Bybit app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Bybit Wallet for easy access.",
          "title": "Install the Bybit Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Bybit Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "binance": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Binance on your home screen for faster access to your wallet.",
          "title": "Open the Binance app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Binance Wallet extension",
          "description": "We recommend pinning Binance Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "coin98": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.",
          "title": "Open the Coin98 Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Coin98 Wallet for easy access.",
          "title": "Install the Coin98 Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "coinbase": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coinbase Wallet on your home screen for quicker access.",
          "title": "Open the Coinbase Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Coinbase Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "compass": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Compass Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Compass Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "core": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Core on your home screen for faster access to your wallet.",
          "title": "Open the Core app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Core to your taskbar for quicker access to your wallet.",
          "title": "Install the Core extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "fox": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting FoxWallet on your home screen for quicker access.",
          "title": "Open the FoxWallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "frontier": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Frontier Wallet on your home screen for quicker access.",
          "title": "Open the Frontier Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Frontier Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "im_token": {
      "qr_code": {
        "step1": {
          "title": "Open the imToken app",
          "description": "Put imToken app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "iopay": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting ioPay on your home screen for faster access to your wallet.",
          "title": "Open the ioPay app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      }
    },

    "kaikas": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaikas to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaikas extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaikas app",
          "description": "Put Kaikas app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kaia": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaia to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaia extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaia app",
          "description": "Put Kaia app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kraken": {
      "qr_code": {
        "step1": {
          "title": "Open the Kraken Wallet app",
          "description": "Add Kraken Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "kresus": {
      "qr_code": {
        "step1": {
          "title": "Open the Kresus Wallet app",
          "description": "Add Kresus Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "magicEden": {
      "extension": {
        "step1": {
          "title": "Install the Magic Eden extension",
          "description": "We recommend pinning Magic Eden to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "metamask": {
      "qr_code": {
        "step1": {
          "title": "Open the MetaMask app",
          "description": "We recommend putting MetaMask on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the MetaMask extension",
          "description": "We recommend pinning MetaMask to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "nestwallet": {
      "extension": {
        "step1": {
          "title": "Install the NestWallet extension",
          "description": "We recommend pinning NestWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "okx": {
      "qr_code": {
        "step1": {
          "title": "Open the OKX Wallet app",
          "description": "We recommend putting OKX Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the OKX Wallet extension",
          "description": "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "omni": {
      "qr_code": {
        "step1": {
          "title": "Open the Omni app",
          "description": "Add Omni to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your home screen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "1inch": {
      "qr_code": {
        "step1": {
          "description": "Put 1inch Wallet on your home screen for faster access to your wallet.",
          "title": "Open the 1inch Wallet app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "token_pocket": {
      "qr_code": {
        "step1": {
          "title": "Open the TokenPocket app",
          "description": "We recommend putting TokenPocket on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the TokenPocket extension",
          "description": "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "trust": {
      "qr_code": {
        "step1": {
          "title": "Open the Trust Wallet app",
          "description": "Put Trust Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Trust Wallet extension",
          "description": "Click at the top right of your browser and pin Trust Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up Trust Wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "uniswap": {
      "qr_code": {
        "step1": {
          "title": "Open the Uniswap app",
          "description": "Add Uniswap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "zerion": {
      "qr_code": {
        "step1": {
          "title": "Open the Zerion app",
          "description": "We recommend putting Zerion on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Zerion extension",
          "description": "We recommend pinning Zerion to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rainbow": {
      "qr_code": {
        "step1": {
          "title": "Open the Rainbow app",
          "description": "We recommend putting Rainbow on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "You can easily backup your wallet using our backup feature on your phone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "enkrypt": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Enkrypt Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "frame": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Frame to your taskbar for quicker access to your wallet.",
          "title": "Install Frame & the companion extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "one_key": {
      "extension": {
        "step1": {
          "title": "Install the OneKey Wallet extension",
          "description": "We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "paraswap": {
      "qr_code": {
        "step1": {
          "title": "Open the ParaSwap app",
          "description": "Add ParaSwap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "phantom": {
      "extension": {
        "step1": {
          "title": "Install the Phantom extension",
          "description": "We recommend pinning Phantom to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rabby": {
      "extension": {
        "step1": {
          "title": "Install the Rabby extension",
          "description": "We recommend pinning Rabby to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ronin": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Ronin Wallet on your home screen for quicker access.",
          "title": "Open the Ronin Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Ronin Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Ronin Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "ramper": {
      "extension": {
        "step1": {
          "title": "Install the Ramper extension",
          "description": "We recommend pinning Ramper to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safeheron": {
      "extension": {
        "step1": {
          "title": "Install the Core extension",
          "description": "We recommend pinning Safeheron to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "taho": {
      "extension": {
        "step1": {
          "title": "Install the Taho extension",
          "description": "We recommend pinning Taho to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "wigwam": {
      "extension": {
        "step1": {
          "title": "Install the Wigwam extension",
          "description": "We recommend pinning Wigwam to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "talisman": {
      "extension": {
        "step1": {
          "title": "Install the Talisman extension",
          "description": "We recommend pinning Talisman to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import an Ethereum Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "xdefi": {
      "extension": {
        "step1": {
          "title": "Install the XDEFI Wallet extension",
          "description": "We recommend pinning XDEFI Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "zeal": {
      "qr_code": {
        "step1": {
          "title": "Open the Zeal app",
          "description": "Add Zeal Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Zeal extension",
          "description": "We recommend pinning Zeal to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safepal": {
      "extension": {
        "step1": {
          "title": "Install the SafePal Wallet extension",
          "description": "Click at the top right of your browser and pin SafePal Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up SafePal Wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SafePal Wallet app",
          "description": "Put SafePal Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "desig": {
      "extension": {
        "step1": {
          "title": "Install the Desig extension",
          "description": "We recommend pinning Desig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "subwallet": {
      "extension": {
        "step1": {
          "title": "Install the SubWallet extension",
          "description": "We recommend pinning SubWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SubWallet app",
          "description": "We recommend putting SubWallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "clv": {
      "extension": {
        "step1": {
          "title": "Install the CLV Wallet extension",
          "description": "We recommend pinning CLV Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the CLV Wallet app",
          "description": "We recommend putting CLV Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "okto": {
      "qr_code": {
        "step1": {
          "title": "Open the Okto app",
          "description": "Add Okto to your home screen for quick access"
        },
        "step2": {
          "title": "Create an MPC Wallet",
          "description": "Create an account and generate a wallet"
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Tap the Scan QR icon at the top right and confirm the prompt to connect."
        }
      }
    },

    "ledger": {
      "desktop": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "Set up a new Ledger or connect to an existing one."
        },
        "step3": {
          "title": "Connect",
          "description": "A connection prompt will appear for you to connect your wallet."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "You can either sync with the desktop app or connect your Ledger."
        },
        "step3": {
          "title": "Scan the code",
          "description": "Tap WalletConnect then Switch to Scanner. After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "valora": {
      "qr_code": {
        "step1": {
          "title": "Open the Valora app",
          "description": "We recommend putting Valora on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "gate": {
      "qr_code": {
        "step1": {
          "title": "Open the Gate app",
          "description": "We recommend putting Gate on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Gate extension",
          "description": "We recommend pinning Gate to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "gemini": {
      "qr_code": {
        "step1": {
          "title": "Open keys.gemini.com",
          "description": "Visit keys.gemini.com on your mobile browser - no app download required."
        },
        "step2": {
          "title": "Create Your Wallet Instantly",
          "description": "Set up your smart wallet in seconds using your device's built-in authentication."
        },
        "step3": {
          "title": "Scan to Connect",
          "description": "Scan the QR code to instantly connect your wallet - it just works."
        }
      },
      "extension": {
        "step1": {
          "title": "Go to keys.gemini.com",
          "description": "No extensions or downloads needed - your wallet lives securely in the browser."
        },
        "step2": {
          "title": "One-Click Setup",
          "description": "Create your smart wallet instantly with passkey authentication - easier than any wallet out there."
        },
        "step3": {
          "title": "Connect and Go",
          "description": "Approve the connection and you're ready - the unopinionated wallet that just works."
        }
      }
    },

    "xportal": {
      "qr_code": {
        "step1": {
          "description": "Put xPortal on your home screen for faster access to your wallet.",
          "title": "Open the xPortal app"
        },
        "step2": {
          "description": "Create a wallet or import an existing one.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "mew": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting MEW Wallet on your home screen for quicker access.",
          "title": "Open the MEW Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "zilpay": {
      "qr_code": {
        "step1": {
          "title": "Open the ZilPay app",
          "description": "Add ZilPay to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "nova": {
      "qr_code": {
        "step1": {
          "title": "Open the Nova Wallet app",
          "description": "Add Nova Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    }
  }
}
`;e.s(["en_US_default",()=>t])},78911,e=>{e.v(t=>Promise.all(["static/chunks/aad8f741104b8b6f.js"].map(t=>e.l(t))).then(()=>t(615092)))},313886,e=>{e.v(e=>Promise.resolve().then(()=>e(300059)))},562992,e=>{e.v(t=>Promise.all(["static/chunks/2e56d4596c59f90b.js","static/chunks/577b1481b2318af3.js","static/chunks/323936db530d3e0a.js","static/chunks/70157d24ddc890a9.js"].map(t=>e.l(t))).then(()=>t(243636)))},83008,e=>{e.v(t=>Promise.all(["static/chunks/072591d872cf2576.js","static/chunks/eb2379432ada0492.js"].map(t=>e.l(t))).then(()=>t(653487)))},544016,e=>{e.v(t=>Promise.all(["static/chunks/01c4e4f67d5f4c0a.js"].map(t=>e.l(t))).then(()=>t(624448)))},613536,e=>{e.v(t=>Promise.all(["static/chunks/410a52a771e7db3f.js"].map(t=>e.l(t))).then(()=>t(388732)))},86827,e=>{e.v(t=>Promise.all(["static/chunks/8b2e8100adbb69ca.js","static/chunks/04048a0a5d0d3f19.js"].map(t=>e.l(t))).then(()=>t(299881)))},564951,e=>{e.v(t=>Promise.all(["static/chunks/d570c0b519fc75d3.js"].map(t=>e.l(t))).then(()=>t(760102)))},453239,e=>{e.v(t=>Promise.all(["static/chunks/dba4c36e19125d01.js"].map(t=>e.l(t))).then(()=>t(778433)))},841078,e=>{e.v(t=>Promise.all(["static/chunks/efeece1eeace4283.js"].map(t=>e.l(t))).then(()=>t(647818)))},42751,e=>{e.v(t=>Promise.all(["static/chunks/3703b2fd08dc48c8.js"].map(t=>e.l(t))).then(()=>t(486666)))},864351,e=>{e.v(t=>Promise.all(["static/chunks/84e43da91a5eb61c.js"].map(t=>e.l(t))).then(()=>t(758790)))},294360,e=>{e.v(t=>Promise.all(["static/chunks/ea78cccb5e395ea8.js"].map(t=>e.l(t))).then(()=>t(523254)))},615829,e=>{e.v(t=>Promise.all(["static/chunks/984781d843cec097.js"].map(t=>e.l(t))).then(()=>t(661580)))},622150,e=>{e.v(t=>Promise.all(["static/chunks/795b2b7253bb709d.js"].map(t=>e.l(t))).then(()=>t(703680)))},648723,e=>{e.v(t=>Promise.all(["static/chunks/88dbd9225b15fa9c.js"].map(t=>e.l(t))).then(()=>t(653036)))},36979,e=>{e.v(t=>Promise.all(["static/chunks/4571db90e5c979f0.js"].map(t=>e.l(t))).then(()=>t(995966)))},705616,e=>{e.v(t=>Promise.all(["static/chunks/ff491b8a89debbc3.js"].map(t=>e.l(t))).then(()=>t(813404)))},147017,e=>{e.v(t=>Promise.all(["static/chunks/de085f8b3b557cfa.js"].map(t=>e.l(t))).then(()=>t(59832)))},764465,e=>{e.v(t=>Promise.all(["static/chunks/5c0ec681b5c42e50.js"].map(t=>e.l(t))).then(()=>t(539722)))},120514,e=>{e.v(t=>Promise.all(["static/chunks/783558069ebd0d94.js"].map(t=>e.l(t))).then(()=>t(12919)))},466579,e=>{e.v(t=>Promise.all(["static/chunks/e88c73d5a181c296.js"].map(t=>e.l(t))).then(()=>t(407556)))},536715,e=>{e.v(t=>Promise.all(["static/chunks/99ba2b6b26c65e8e.js"].map(t=>e.l(t))).then(()=>t(965717)))},345631,e=>{e.v(t=>Promise.all(["static/chunks/c2302877da243fee.js"].map(t=>e.l(t))).then(()=>t(295594)))},82045,e=>{e.v(t=>Promise.all(["static/chunks/2a1cd9415c5834fe.js"].map(t=>e.l(t))).then(()=>t(947425)))},563386,e=>{e.v(t=>Promise.all(["static/chunks/5733c2620a9789fd.js"].map(t=>e.l(t))).then(()=>t(282153)))},814105,e=>{e.v(t=>Promise.all(["static/chunks/25624f9d1441e34f.js"].map(t=>e.l(t))).then(()=>t(916334)))},790196,e=>{e.v(t=>Promise.all(["static/chunks/9b20692d21f72d56.js"].map(t=>e.l(t))).then(()=>t(524022)))},615140,e=>{e.v(t=>Promise.all(["static/chunks/7ffe9011a340ba5e.js"].map(t=>e.l(t))).then(()=>t(439236)))},370802,e=>{e.v(t=>Promise.all(["static/chunks/9bad5d449b7afc92.js"].map(t=>e.l(t))).then(()=>t(948270)))},879766,e=>{e.v(t=>Promise.all(["static/chunks/20b90adf86e00d7a.js"].map(t=>e.l(t))).then(()=>t(338074)))},168856,e=>{e.v(t=>Promise.all(["static/chunks/8b1c5003d1b0c400.js"].map(t=>e.l(t))).then(()=>t(26141)))},933811,e=>{e.v(t=>Promise.all(["static/chunks/1ffd6d9c88f0e57f.js"].map(t=>e.l(t))).then(()=>t(29143)))},360504,e=>{e.v(t=>Promise.all(["static/chunks/ab091b2ddcc34f9c.js"].map(t=>e.l(t))).then(()=>t(166645)))},954591,e=>{e.v(t=>Promise.all(["static/chunks/e731b78e17a9a64d.js"].map(t=>e.l(t))).then(()=>t(490818)))},652723,e=>{e.v(t=>Promise.all(["static/chunks/3146aee9edc499f4.js"].map(t=>e.l(t))).then(()=>t(447905)))},156846,e=>{e.v(t=>Promise.all(["static/chunks/255f4109e5cd73e1.js"].map(t=>e.l(t))).then(()=>t(875618)))},871247,e=>{e.v(t=>Promise.all(["static/chunks/df9b006c9e82dcab.js"].map(t=>e.l(t))).then(()=>t(375086)))},426159,e=>{e.v(t=>Promise.all(["static/chunks/fcebf553210a71a1.js"].map(t=>e.l(t))).then(()=>t(309433)))},73954,e=>{e.v(t=>Promise.all(["static/chunks/d47a0769b9fc1cbd.js"].map(t=>e.l(t))).then(()=>t(627143)))},301055,e=>{e.v(t=>Promise.all(["static/chunks/022c1c078a8aa1e2.js"].map(t=>e.l(t))).then(()=>t(88726)))},659640,e=>{e.v(t=>Promise.all(["static/chunks/69f9f41d41653eab.js"].map(t=>e.l(t))).then(()=>t(118064)))},860067,e=>{e.v(t=>Promise.all(["static/chunks/1cda653bafce91c0.js"].map(t=>e.l(t))).then(()=>t(267023)))},63999,e=>{e.v(t=>Promise.all(["static/chunks/b720617a9e6f319b.js"].map(t=>e.l(t))).then(()=>t(646774)))},270357,e=>{e.v(t=>Promise.all(["static/chunks/cae0046d5f085de9.js"].map(t=>e.l(t))).then(()=>t(859282)))},132215,e=>{e.v(t=>Promise.all(["static/chunks/821d0c6234552200.js"].map(t=>e.l(t))).then(()=>t(157668)))},524604,e=>{e.v(t=>Promise.all(["static/chunks/fb4726633f8f760c.js"].map(t=>e.l(t))).then(()=>t(340058)))},813542,e=>{e.v(t=>Promise.all(["static/chunks/0f510167b9e8c795.js"].map(t=>e.l(t))).then(()=>t(835964)))},546356,e=>{e.v(t=>Promise.all(["static/chunks/0659880a7d363cb5.js"].map(t=>e.l(t))).then(()=>t(777371)))},964317,e=>{e.v(t=>Promise.all(["static/chunks/d0c9fb258d332f1a.js"].map(t=>e.l(t))).then(()=>t(121358)))},600904,e=>{e.v(t=>Promise.all(["static/chunks/c4b685ef63430dc8.js"].map(t=>e.l(t))).then(()=>t(118315)))},502157,e=>{e.v(t=>Promise.all(["static/chunks/2fc61f0309507643.js"].map(t=>e.l(t))).then(()=>t(535781)))},448018,e=>{e.v(t=>Promise.all(["static/chunks/7031c68d88bde470.js"].map(t=>e.l(t))).then(()=>t(668183)))},824e3,e=>{e.v(t=>Promise.all(["static/chunks/3b8d613fbd0c799d.js"].map(t=>e.l(t))).then(()=>t(302886)))},46108,e=>{e.v(t=>Promise.all(["static/chunks/ab79e3f4ec287da6.js"].map(t=>e.l(t))).then(()=>t(255632)))},48700,e=>{e.v(t=>Promise.all(["static/chunks/413bc31b9b34959a.js"].map(t=>e.l(t))).then(()=>t(23520)))},754838,e=>{e.v(t=>Promise.all(["static/chunks/f24ca40ab63667d6.js"].map(t=>e.l(t))).then(()=>t(274618)))},600293,e=>{e.v(t=>Promise.all(["static/chunks/9a56d09b2db4001e.js"].map(t=>e.l(t))).then(()=>t(604169)))},150954,e=>{e.v(t=>Promise.all(["static/chunks/86f23b7f0d1805e4.js"].map(t=>e.l(t))).then(()=>t(330691)))},153441,e=>{e.v(t=>Promise.all(["static/chunks/9793bc0e2c8885c6.js"].map(t=>e.l(t))).then(()=>t(736614)))},281452,e=>{e.v(t=>Promise.all(["static/chunks/bfa1acd65b748efd.js"].map(t=>e.l(t))).then(()=>t(139978)))},83586,e=>{e.v(t=>Promise.all(["static/chunks/8a18ec8b31e22e04.js"].map(t=>e.l(t))).then(()=>t(149751)))},340852,e=>{e.v(t=>Promise.all(["static/chunks/9e7dac213dc7e615.js"].map(t=>e.l(t))).then(()=>t(553986)))},323762,e=>{e.v(t=>Promise.all(["static/chunks/3801ca29175aee16.js"].map(t=>e.l(t))).then(()=>t(325740)))},463267,e=>{e.v(t=>Promise.all(["static/chunks/9ea6515e44798257.js"].map(t=>e.l(t))).then(()=>t(116006)))},807078,e=>{e.v(t=>Promise.all(["static/chunks/1b4d31582470a77c.js"].map(t=>e.l(t))).then(()=>t(164331)))},479533,e=>{e.v(t=>Promise.all(["static/chunks/b42d6145465456f9.js"].map(t=>e.l(t))).then(()=>t(619329)))},667363,e=>{e.v(t=>Promise.all(["static/chunks/63ba70aef78f39de.js"].map(t=>e.l(t))).then(()=>t(643551)))},127486,e=>{e.v(t=>Promise.all(["static/chunks/dde421fc406437d3.js"].map(t=>e.l(t))).then(()=>t(554134)))},451273,e=>{e.v(t=>Promise.all(["static/chunks/ad838e35bc91d90c.js"].map(t=>e.l(t))).then(()=>t(824731)))},339176,e=>{e.v(t=>Promise.all(["static/chunks/d0b4bca13efeb9c9.js"].map(t=>e.l(t))).then(()=>t(976719)))},253278,e=>{e.v(t=>Promise.all(["static/chunks/9bd391218267fc9e.js"].map(t=>e.l(t))).then(()=>t(11764)))},11805,e=>{e.v(t=>Promise.all(["static/chunks/38c94ab387f7827e.js"].map(t=>e.l(t))).then(()=>t(720900)))},809294,e=>{e.v(t=>Promise.all(["static/chunks/72abf3d99f7fc041.js"].map(t=>e.l(t))).then(()=>t(116733)))},927514,e=>{e.v(t=>Promise.all(["static/chunks/d70ee6213e7e1bee.js"].map(t=>e.l(t))).then(()=>t(277656)))},225040,e=>{e.v(t=>Promise.all(["static/chunks/aedcae334fc040a2.js"].map(t=>e.l(t))).then(()=>t(705816)))},398051,e=>{e.v(t=>Promise.all(["static/chunks/afa9337da63410cc.js"].map(t=>e.l(t))).then(()=>t(108670)))},7613,e=>{e.v(t=>Promise.all(["static/chunks/ff0e6cf721872cb7.js"].map(t=>e.l(t))).then(()=>t(61285)))},952176,e=>{e.v(t=>Promise.all(["static/chunks/2f146f7ecd423922.js"].map(t=>e.l(t))).then(()=>t(514786)))},560031,e=>{e.v(t=>Promise.all(["static/chunks/f50f3d0442be36f4.js"].map(t=>e.l(t))).then(()=>t(699040)))},108471,e=>{e.v(t=>Promise.all(["static/chunks/aa49a40227b46db1.js"].map(t=>e.l(t))).then(()=>t(461455)))},933883,e=>{e.v(t=>Promise.all(["static/chunks/57df687d56e447d9.js"].map(t=>e.l(t))).then(()=>t(475152)))}]);