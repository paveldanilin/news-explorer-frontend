!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=129)}([function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n(60))},function(t,e,n){var r=n(0),o=n(19),i=n(5),c=n(33),s=n(34),u=n(67),a=o("wks"),f=r.Symbol,l=u?f:c;t.exports=function(t){return i(a,t)||(s&&i(f,t)?a[t]=f[t]:a[t]=l("Symbol."+t)),a[t]}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(2);t.exports=!r((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(t,e,n){var r=n(3);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e,n){var r=n(6),o=n(13),i=n(32);t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(75),o=n(0),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},function(t,e,n){var r=n(0),o=n(61),i=n(62),c=n(8);for(var s in o){var u=r[s],a=u&&u.prototype;if(a&&a.forEach!==i)try{c(a,"forEach",i)}catch(t){a.forEach=i}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e,n){var r=n(6),o=n(29),i=n(7),c=n(31),s=Object.defineProperty;e.f=r?s:function(t,e,n){if(i(t),e=c(e,!0),i(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(0),o=n(21).f,i=n(8),c=n(23),s=n(20),u=n(73),a=n(41);t.exports=function(t,e){var n,f,l,d,p,h=t.target,v=t.global,m=t.stat;if(n=v?r:m?r[h]||s(h,{}):(r[h]||{}).prototype)for(f in e){if(d=e[f],l=t.noTargetGet?(p=o(n,f))&&p.value:n[f],!a(v?f:h+(m?".":"#")+f,t.forced)&&void 0!==l){if(typeof d==typeof l)continue;u(d,l)}(t.sham||l&&l.sham)&&i(d,"sham",!0),c(n,f,d,t)}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n(10),n(115);class r{constructor(){this.htmlElement=document.querySelector(".search-result"),this.gridHtmlElement=document.querySelector(".search-result__grid")}append(t){this.gridHtmlElement.appendChild(r.createCard(t))}update(t){this.gridHtmlElement&&(this.removeAll(),t.forEach(t=>{this.append(t)}),this.endLoading(),0===t.length&&(document.getElementById("noresult").style.display="flex",document.getElementById("loading").style.display="none",this.htmlElement.style.display="none"))}beginLoading(){document.getElementById("noresult").style.display="none",document.getElementById("loading").style.display="flex",this.htmlElement.style.display="none",this.removeAll()}endLoading(){document.getElementById("loading").style.display="none",this.htmlElement.style.display="block"}removeAll(){if(this.gridHtmlElement)for(;this.gridHtmlElement.firstChild;)this.gridHtmlElement.removeChild(this.gridHtmlElement.firstChild)}static createCard(t){const{imageLink:e,title:n,contentText:r,sourceLink:o,sourceLabel:i,cardId:c}=t,s=document.createElement("div");s.classList.add("card"),s.classList.add("card_dir_ver"),s.setAttribute("id",c);const u=document.createElement("img");u.src=e,u.classList.add("search-result__card-image"),u.classList.add("search-result__card-image_placeholder"),u.onload=()=>{u.classList.remove("search-result__card-image_placeholder")},s.appendChild(u);const a=document.createElement("h4");a.innerText=n,a.classList.add("search-result__card-title");const f=document.createElement("p");f.innerText=r,f.classList.add("search-result__card-text");const l=document.createElement("a");l.innerText=i,l.href=o,l.classList.add("search-result__card-source");const d=document.createElement("div");d.classList.add("card__body"),d.classList.add("search-result__card-body");const p=document.createElement("div");return p.classList.add("card__footer"),p.classList.add("search-result__card-footer"),p.appendChild(l),d.appendChild(a),d.appendChild(f),s.appendChild(d),s.appendChild(p),s}}const o=new r},function(t,e,n){var r=n(11);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(2),o=n(4),i="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,e,n){var r=n(27),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(28),o=n(66);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.4.5",mode:r?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var r=n(0),o=n(8);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},function(t,e,n){var r=n(6),o=n(35),i=n(32),c=n(22),s=n(31),u=n(5),a=n(29),f=Object.getOwnPropertyDescriptor;e.f=r?f:function(t,e){if(t=c(t),e=s(e,!0),a)try{return f(t,e)}catch(t){}if(u(t,e))return i(!o.f.call(t,e),t[e])}},function(t,e,n){var r=n(17),o=n(12);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(0),o=n(8),i=n(5),c=n(20),s=n(24),u=n(36),a=u.get,f=u.enforce,l=String(String).split("String");(t.exports=function(t,e,n,s){var u=!!s&&!!s.unsafe,a=!!s&&!!s.enumerable,d=!!s&&!!s.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||o(n,"name",e),f(n).source=l.join("string"==typeof e?e:"")),t!==r?(u?!d&&t[e]&&(a=!0):delete t[e],a?t[e]=n:o(t,e,n)):a?t[e]=n:c(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&a(this).source||s(this)}))},function(t,e,n){var r=n(19),o=Function.toString;t.exports=r("inspectSource",(function(t){return o.call(t)}))},function(t,e,n){"use strict";n(10),n(69),n(70),n(81),n(47),n(48);class r{static get METHOD_GET(){return"GET"}static get METHOD_POST(){return"POST"}static get METHOD_DELETE(){return"DELETE"}static get METHOD_PATCH(){return"PATCH"}static get METHOD_PUT(){return"PUT"}static get METHOD_HEAD(){return"HEAD"}static get METHOD_CONNECT(){return"CONNECT"}static get METHOD_OPTIONS(){return"OPTIONS"}static get METHOD_TRACE(){return"TRACE"}static get MODE_SAME_ORIGIN(){return"same-origin"}static get MODE_NO_CORS(){return"no-cors"}static get MODE_CORS(){return"cors"}static get CREDENTIALS_OMIT(){return"omit"}static get CREDENTIALS_SAME_ORIGIN(){return"same-origin"}static get CREDENTIALS_INCLUDE(){return"include"}static get CACHE_DEFAULT(){return"default"}static get CACHE_NO_STORE(){return"no-store"}static get CACHE_RELOAD(){return"reload"}static get CACHE_NO_CACHE(){return"no-cache"}static get CACHE_FORECE_CACHE(){return"force-cache"}static get CACHE_ONLY_IF_CACHED(){return"only-if-cached"}static get REDIRECT_FOLLOW(){return"follow"}static get REDIRECT_ERROR(){return"error"}static filterOptionMethod(t){let e=t||r.METHOD_GET;if("string"!=typeof e)throw new Error("`method` options must me string");if(0===e.trim().length)throw new Error("`method` option must be non empty string");e=e.toUpperCase();const n=[r.METHOD_GET,r.METHOD_CONNECT,r.METHOD_DELETE,r.METHOD_HEAD,r.METHOD_OPTIONS,r.METHOD_PATCH,r.METHOD_POST,r.METHOD_PUT,r.METHOD_TRACE];if(!n.includes(e))throw new Error("`method` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionMode(t){let e=t||r.MODE_SAME_ORIGIN;if("string"!=typeof e)throw new Error("`mode` options must me string");if(0===e.trim().length)throw new Error("`mode` option must be non empty string");e=e.toLowerCase();const n=[r.MODE_SAME_ORIGIN,r.MODE_CORS,r.MODE_NO_CORS];if(!n.includes(e))throw new Error("`mode` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionCredentials(t){let e=t||r.CREDENTIALS_OMIT;if("string"!=typeof e)throw new Error("`credentials` options must me string");if(0===e.trim().length)throw new Error("`credentials` option must be non empty string");e=e.toLowerCase();const n=[r.CREDENTIALS_OMIT,r.CREDENTIALS_INCLUDE,r.CREDENTIALS_SAME_ORIGIN];if(!n.includes(e))throw new Error("`credentials` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionCache(t){let e=t||r.CACHE_DEFAULT;if("string"!=typeof e)throw new Error("`cache` options must me string");if(0===e.trim().length)throw new Error("`cache` option must be non empty string");e=e.toLowerCase();const n=[r.CACHE_DEFAULT,r.CACHE_FORECE_CACHE,r.CACHE_NO_CACHE,r.CACHE_NO_STORE,r.CACHE_ONLY_IF_CACHED,r.CACHE_RELOAD];if(!n.includes(e))throw new Error("`cache` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionRedirect(t){let e=t||r.REDIRECT_FOLLOW;if("string"!=typeof e)throw new Error("`redirect` options must me string");if(0===e.trim().length)throw new Error("`redirect` option must be non empty string");e=e.toLowerCase();const n=[r.REDIRECT_FOLLOW,r.REDIRECT_ERROR];if(!n.includes(e))throw new Error("`redirect` option value must be on of [".concat(n.join(","),"]"));return e}}class o extends Error{constructor(t){super(),this.message=t}}class i extends o{constructor(t,e){super("[".concat(t.method,"] : ").concat(e.status," -> ").concat(t.url)),this.response=e,this.request=t}}class c{constructor(){let{baseUrl:t,headers:e,mode:n,cache:o,redirect:i,credentials:s,throwError:u,responseFormat:a}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.baseUrl=c.filterOptionBaseUrl(t||""),this.headers=e||{},this.mode=n||r.MODE_SAME_ORIGIN,this.cache=o||r.CACHE_DEFAULT,this.redirect=i||r.REDIRECT_FOLLOW,this.credentials=s||r.CREDENTIALS_SAME_ORIGIN,this.throwError=u||!0,this.responseFormat=c.filterOptionResponseFormat(a||void 0)}static get RESPONSE_JSON(){return"json"}static get RESPONSE_TEXT(){return"text"}static get RESPONSE_FORM_DATA(){return"form-data"}static get RESPONSE_BLOB(){return"blob"}static get RESPONSE_ARRAY_BUFFER(){return"array-buffer"}static get RESPONSE_RAW(){return"raw"}static create(t){return new c(t||{})}static getRequest(t,e){return c.create().fetch(t,e)}static postRequest(t,e){return c.create().post(t,e)}static patchRequest(t,e){return c.create().patch(t,e)}static deleteRequest(t,e){return c.create().delete(t,e)}fetch(t){let{headers:e,mode:n,cache:o,redirect:i,credentials:c,responseFormat:s}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_GET,e||void 0,void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0)}post(t){let{headers:e,body:n,mode:o,cache:i,redirect:c,credentials:s,responseFormat:u}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_POST,e||void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0,u||void 0)}patch(t){let{headers:e,body:n,mode:o,cache:i,redirect:c,credentials:s,responseFormat:u}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_PATCH,e||void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0,u||void 0)}put(t){let{headers:e,body:n,mode:o,cache:i,redirect:c,credentials:s,responseFormat:u}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_PUT,e||void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0,u||void 0)}delete(t){let{headers:e,mode:n,cache:o,redirect:i,credentials:c,responseFormat:s}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_DELETE,e||void 0,void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0)}async sendRequest(t,e,n,o,s,u,a,f,l){const d=Object.assign(this.headers,n||{}),p=s||this.mode,h=u||this.cache,v=a||this.redirect,m=f||this.credentials,E=c.filterOptionResponseFormat(l,this.responseFormat),g=this.baseUrl.length>0?this.baseUrl+t:t,y=new Request(g,{method:r.filterOptionMethod(e),body:o,headers:d,mode:r.filterOptionMode(p),cache:r.filterOptionCache(h),redirect:r.filterOptionRedirect(v),credentials:r.filterOptionCredentials(m)}),O=await fetch(y);if(!0===this.throwError&&!O.ok)throw new i(y,O);if(O.ok)switch(E){default:case c.RESPONSE_TEXT:return O.text();case c.RESPONSE_ARRAY_BUFFER:return O.arrayBuffer();case c.RESPONSE_BLOB:return O.blob();case c.RESPONSE_FORM_DATA:return O.formData();case c.RESPONSE_JSON:return O.json()}return O}static filterOptionResponseFormat(t,e){const n=(t||e||c.RESPONSE_RAW).toLowerCase(),r=[c.RESPONSE_RAW,c.RESPONSE_JSON,c.RESPONSE_FORM_DATA,c.RESPONSE_BLOB,c.RESPONSE_ARRAY_BUFFER,c.RESPONSE_TEXT];if(!r.includes(n))throw new o("`responseFormat` option must have value one of [".concat(r.join(","),"]"));return n}static filterOptionBaseUrl(t){if("string"!=typeof t)throw new o("`baseUrl` option must be non empty string");return t.trim()}}const s=c.create({responseFormat:c.RESPONSE_TEXT});function u(t){const e=document.getElementById(t);return e?e.classList.contains("dialog")?e:e.firstElementChild||null:null}n.d(e,"a",(function(){return a}));class a{static show(t){let e=t;"string"!=typeof e&&"number"!=typeof e||(e=u(e)),e&&(e.style.display="block")}static close(t){let e=t;"string"!=typeof e&&"number"!=typeof e||(e=u(e)),e&&(e.style.display="none",e.querySelectorAll("input").forEach(t=>{t.value=""}))}static toggle(t){const e=a.getActiveHTMLElement();e&&(a.close(e),a.show(t))}static getActiveHTMLElement(){const t=document.getElementsByClassName("dialog");for(let e=0;e<t.length;e+=1){const n=t[e];if("block"===n.style.display)return n}return null}}window.addEventListener("keydown",t=>{if("Escape"!==t.code)return;const e=a.getActiveHTMLElement();e&&e.parentNode&&a.close(e.parentNode.id)}),setTimeout(()=>{document.querySelectorAll("[data-dialog]").forEach(t=>{((t,e,n,r)=>{let o="",i=e?[e]:[];"string"==typeof e&&(i=document.querySelectorAll(e)),s.fetch(t).then(t=>{o="function"==typeof n?n(t):t,i.forEach(t=>{const e=t;e.innerHTML=o,"function"==typeof r&&r(e,o)})})})(t.getAttribute("data-dialog"),t,null,t=>{const e=t.getElementsByClassName("dialog__close");for(let t=0;t<e.length;t+=1){const n=e[t],r=n.closest(".dialog");r&&(n.onclick=()=>{r.style.display="none"})}})})},0)},function(t,e,n){var r=n(12);t.exports=function(t){return Object(r(t))}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=!1},function(t,e,n){var r=n(6),o=n(2),i=n(30);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,e,n){var r=n(0),o=n(3),i=r.document,c=o(i)&&o(i.createElement);t.exports=function(t){return c?i.createElement(t):{}}},function(t,e,n){var r=n(3);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},function(t,e,n){var r=n(2);t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!r.call({1:2},1);e.f=i?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},function(t,e,n){var r,o,i,c=n(71),s=n(0),u=n(3),a=n(8),f=n(5),l=n(72),d=n(37),p=s.WeakMap;if(c){var h=new p,v=h.get,m=h.has,E=h.set;r=function(t,e){return E.call(h,t,e),e},o=function(t){return v.call(h,t)||{}},i=function(t){return m.call(h,t)}}else{var g=l("state");d[g]=!0,r=function(t,e){return a(t,g,e),e},o=function(t){return f(t,g)?t[g]:{}},i=function(t){return f(t,g)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!u(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,e){t.exports={}},function(t,e,n){var r=n(5),o=n(22),i=n(77).indexOf,c=n(37);t.exports=function(t,e){var n,s=o(t),u=0,a=[];for(n in s)!r(c,n)&&r(s,n)&&a.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(a,n)||a.push(n));return a}},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(2),o=/#|\.prototype\./,i=function(t,e){var n=s[c(t)];return n==a||n!=u&&("function"==typeof e?r(e):!!e)},c=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},s=i.data={},u=i.NATIVE="N",a=i.POLYFILL="P";t.exports=i},function(t,e){t.exports={}},function(t,e,n){var r,o,i,c=n(0),s=n(2),u=n(4),a=n(16),f=n(95),l=n(30),d=n(44),p=c.location,h=c.setImmediate,v=c.clearImmediate,m=c.process,E=c.MessageChannel,g=c.Dispatch,y=0,O={},_=function(t){if(O.hasOwnProperty(t)){var e=O[t];delete O[t],e()}},b=function(t){return function(){_(t)}},S=function(t){_(t.data)},T=function(t){c.postMessage(t+"",p.protocol+"//"+p.host)};h&&v||(h=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return O[++y]=function(){("function"==typeof t?t:Function(t)).apply(void 0,e)},r(y),y},v=function(t){delete O[t]},"process"==u(m)?r=function(t){m.nextTick(b(t))}:g&&g.now?r=function(t){g.now(b(t))}:E&&!d?(i=(o=new E).port2,o.port1.onmessage=S,r=a(i.postMessage,i,1)):!c.addEventListener||"function"!=typeof postMessage||c.importScripts||s(T)?r="onreadystatechange"in l("script")?function(t){f.appendChild(l("script")).onreadystatechange=function(){f.removeChild(this),_(t)}}:function(t){setTimeout(b(t),0)}:(r=T,c.addEventListener("message",S,!1))),t.exports={set:h,clear:v}},function(t,e,n){var r=n(45);t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(r)},function(t,e,n){var r=n(9);t.exports=r("navigator","userAgent")||""},function(t,e,n){"use strict";var r=n(11),o=function(t){var e,n;this.promise=new t((function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r})),this.resolve=r(e),this.reject=r(n)};t.exports.f=function(t){return new o(t)}},function(t,e,n){"use strict";var r=n(14),o=n(101),i=n(12);r({target:"String",proto:!0,forced:!n(103)("includes")},{includes:function(t){return!!~String(i(this)).indexOf(o(t),arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){"use strict";var r=n(14),o=n(104).trim;r({target:"String",proto:!0,forced:n(105)("trim")},{trim:function(){return o(this)}})},function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,e,n){"use strict";var r=n(63).forEach,o=n(68);t.exports=o("forEach")?function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},function(t,e,n){var r=n(16),o=n(17),i=n(26),c=n(18),s=n(64),u=[].push,a=function(t){var e=1==t,n=2==t,a=3==t,f=4==t,l=6==t,d=5==t||l;return function(p,h,v,m){for(var E,g,y=i(p),O=o(y),_=r(h,v,3),b=c(O.length),S=0,T=m||s,x=e?T(p,b):n?T(p,0):void 0;b>S;S++)if((d||S in O)&&(g=_(E=O[S],S,y),t))if(e)x[S]=g;else if(g)switch(t){case 3:return!0;case 5:return E;case 6:return S;case 2:u.call(x,E)}else if(f)return!1;return l?-1:a||f?f:x}};t.exports={forEach:a(0),map:a(1),filter:a(2),some:a(3),every:a(4),find:a(5),findIndex:a(6)}},function(t,e,n){var r=n(3),o=n(65),i=n(1)("species");t.exports=function(t,e){var n;return o(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!o(n.prototype)?r(n)&&null===(n=n[i])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},function(t,e,n){var r=n(4);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(0),o=n(20),i=r["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=i},function(t,e,n){var r=n(34);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol()},function(t,e,n){"use strict";var r=n(2);t.exports=function(t,e){var n=[][t];return!n||!r((function(){n.call(null,e||function(){throw 1},1)}))}},function(t,e,n){},function(t,e,n){var r=n(14),o=n(79);r({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},function(t,e,n){var r=n(0),o=n(24),i=r.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},function(t,e,n){var r=n(19),o=n(33),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,e,n){var r=n(5),o=n(74),i=n(21),c=n(13);t.exports=function(t,e){for(var n=o(e),s=c.f,u=i.f,a=0;a<n.length;a++){var f=n[a];r(t,f)||s(t,f,u(e,f))}}},function(t,e,n){var r=n(9),o=n(76),i=n(40),c=n(7);t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(c(t)),n=i.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(0);t.exports=r},function(t,e,n){var r=n(38),o=n(39).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(22),o=n(18),i=n(78),c=function(t){return function(e,n,c){var s,u=r(e),a=o(u.length),f=i(c,a);if(t&&n!=n){for(;a>f;)if((s=u[f++])!=s)return!0}else for(;a>f;f++)if((t||f in u)&&u[f]===n)return t||f||0;return!t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)}},function(t,e,n){var r=n(27),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},function(t,e,n){"use strict";var r=n(6),o=n(2),i=n(80),c=n(40),s=n(35),u=n(26),a=n(17),f=Object.assign,l=Object.defineProperty;t.exports=!f||o((function(){if(r&&1!==f({b:1},f(l({},"a",{enumerable:!0,get:function(){l(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},e={},n=Symbol();return t[n]=7,"abcdefghijklmnopqrst".split("").forEach((function(t){e[t]=t})),7!=f({},t)[n]||"abcdefghijklmnopqrst"!=i(f({},e)).join("")}))?function(t,e){for(var n=u(t),o=arguments.length,f=1,l=c.f,d=s.f;o>f;)for(var p,h=a(arguments[f++]),v=l?i(h).concat(l(h)):i(h),m=v.length,E=0;m>E;)p=v[E++],r&&!d.call(h,p)||(n[p]=h[p]);return n}:f},function(t,e,n){var r=n(38),o=n(39);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){"use strict";var r,o,i,c,s=n(14),u=n(28),a=n(0),f=n(9),l=n(82),d=n(23),p=n(83),h=n(84),v=n(85),m=n(3),E=n(11),g=n(86),y=n(4),O=n(24),_=n(87),b=n(93),S=n(94),T=n(43).set,x=n(96),w=n(97),C=n(98),L=n(46),R=n(99),A=n(36),D=n(41),M=n(1),j=n(100),H=M("species"),N="Promise",P=A.get,I=A.set,k=A.getterFor(N),F=l,q=a.TypeError,U=a.document,G=a.process,B=f("fetch"),W=L.f,V=W,J="process"==y(G),K=!!(U&&U.createEvent&&a.dispatchEvent),Q=D(N,(function(){if(!(O(F)!==String(F))){if(66===j)return!0;if(!J&&"function"!=typeof PromiseRejectionEvent)return!0}if(u&&!F.prototype.finally)return!0;if(j>=51&&/native code/.test(F))return!1;var t=F.resolve(1),e=function(t){t((function(){}),(function(){}))};return(t.constructor={})[H]=e,!(t.then((function(){}))instanceof e)})),Y=Q||!b((function(t){F.all(t).catch((function(){}))})),z=function(t){var e;return!(!m(t)||"function"!=typeof(e=t.then))&&e},X=function(t,e,n){if(!e.notified){e.notified=!0;var r=e.reactions;x((function(){for(var o=e.value,i=1==e.state,c=0;r.length>c;){var s,u,a,f=r[c++],l=i?f.ok:f.fail,d=f.resolve,p=f.reject,h=f.domain;try{l?(i||(2===e.rejection&&et(t,e),e.rejection=1),!0===l?s=o:(h&&h.enter(),s=l(o),h&&(h.exit(),a=!0)),s===f.promise?p(q("Promise-chain cycle")):(u=z(s))?u.call(s,d,p):d(s)):p(o)}catch(t){h&&!a&&h.exit(),p(t)}}e.reactions=[],e.notified=!1,n&&!e.rejection&&$(t,e)}))}},Z=function(t,e,n){var r,o;K?((r=U.createEvent("Event")).promise=e,r.reason=n,r.initEvent(t,!1,!0),a.dispatchEvent(r)):r={promise:e,reason:n},(o=a["on"+t])?o(r):"unhandledrejection"===t&&C("Unhandled promise rejection",n)},$=function(t,e){T.call(a,(function(){var n,r=e.value;if(tt(e)&&(n=R((function(){J?G.emit("unhandledRejection",r,t):Z("unhandledrejection",t,r)})),e.rejection=J||tt(e)?2:1,n.error))throw n.value}))},tt=function(t){return 1!==t.rejection&&!t.parent},et=function(t,e){T.call(a,(function(){J?G.emit("rejectionHandled",t):Z("rejectionhandled",t,e.value)}))},nt=function(t,e,n,r){return function(o){t(e,n,o,r)}},rt=function(t,e,n,r){e.done||(e.done=!0,r&&(e=r),e.value=n,e.state=2,X(t,e,!0))},ot=function(t,e,n,r){if(!e.done){e.done=!0,r&&(e=r);try{if(t===n)throw q("Promise can't be resolved itself");var o=z(n);o?x((function(){var r={done:!1};try{o.call(n,nt(ot,t,r,e),nt(rt,t,r,e))}catch(n){rt(t,r,n,e)}})):(e.value=n,e.state=1,X(t,e,!1))}catch(n){rt(t,{done:!1},n,e)}}};Q&&(F=function(t){g(this,F,N),E(t),r.call(this);var e=P(this);try{t(nt(ot,this,e),nt(rt,this,e))}catch(t){rt(this,e,t)}},(r=function(t){I(this,{type:N,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=p(F.prototype,{then:function(t,e){var n=k(this),r=W(S(this,F));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=J?G.domain:void 0,n.parent=!0,n.reactions.push(r),0!=n.state&&X(this,n,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new r,e=P(t);this.promise=t,this.resolve=nt(ot,t,e),this.reject=nt(rt,t,e)},L.f=W=function(t){return t===F||t===i?new o(t):V(t)},u||"function"!=typeof l||(c=l.prototype.then,d(l.prototype,"then",(function(t,e){var n=this;return new F((function(t,e){c.call(n,t,e)})).then(t,e)}),{unsafe:!0}),"function"==typeof B&&s({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return w(F,B.apply(a,arguments))}}))),s({global:!0,wrap:!0,forced:Q},{Promise:F}),h(F,N,!1,!0),v(N),i=f(N),s({target:N,stat:!0,forced:Q},{reject:function(t){var e=W(this);return e.reject.call(void 0,t),e.promise}}),s({target:N,stat:!0,forced:u||Q},{resolve:function(t){return w(u&&this===i?F:this,t)}}),s({target:N,stat:!0,forced:Y},{all:function(t){var e=this,n=W(e),r=n.resolve,o=n.reject,i=R((function(){var n=E(e.resolve),i=[],c=0,s=1;_(t,(function(t){var u=c++,a=!1;i.push(void 0),s++,n.call(e,t).then((function(t){a||(a=!0,i[u]=t,--s||r(i))}),o)})),--s||r(i)}));return i.error&&o(i.value),n.promise},race:function(t){var e=this,n=W(e),r=n.reject,o=R((function(){var o=E(e.resolve);_(t,(function(t){o.call(e,t).then(n.resolve,r)}))}));return o.error&&r(o.value),n.promise}})},function(t,e,n){var r=n(0);t.exports=r.Promise},function(t,e,n){var r=n(23);t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},function(t,e,n){var r=n(13).f,o=n(5),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){"use strict";var r=n(9),o=n(13),i=n(1),c=n(6),s=i("species");t.exports=function(t){var e=r(t),n=o.f;c&&e&&!e[s]&&n(e,s,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},function(t,e,n){var r=n(7),o=n(88),i=n(18),c=n(16),s=n(89),u=n(92),a=function(t,e){this.stopped=t,this.result=e};(t.exports=function(t,e,n,f,l){var d,p,h,v,m,E,g,y=c(e,n,f?2:1);if(l)d=t;else{if("function"!=typeof(p=s(t)))throw TypeError("Target is not iterable");if(o(p)){for(h=0,v=i(t.length);v>h;h++)if((m=f?y(r(g=t[h])[0],g[1]):y(t[h]))&&m instanceof a)return m;return new a(!1)}d=p.call(t)}for(E=d.next;!(g=E.call(d)).done;)if("object"==typeof(m=u(d,y,g.value,f))&&m&&m instanceof a)return m;return new a(!1)}).stop=function(t){return new a(!0,t)}},function(t,e,n){var r=n(1),o=n(42),i=r("iterator"),c=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||c[i]===t)}},function(t,e,n){var r=n(90),o=n(42),i=n(1)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,e,n){var r=n(91),o=n(4),i=n(1)("toStringTag"),c="Arguments"==o(function(){return arguments}());t.exports=r?o:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:c?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){var r={};r[n(1)("toStringTag")]="z",t.exports="[object z]"===String(r)},function(t,e,n){var r=n(7);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(1)("iterator"),o=!1;try{var i=0,c={next:function(){return{done:!!i++}},return:function(){o=!0}};c[r]=function(){return this},Array.from(c,(function(){throw 2}))}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i={};i[r]=function(){return{next:function(){return{done:n=!0}}}},t(i)}catch(t){}return n}},function(t,e,n){var r=n(7),o=n(11),i=n(1)("species");t.exports=function(t,e){var n,c=r(t).constructor;return void 0===c||null==(n=r(c)[i])?e:o(n)}},function(t,e,n){var r=n(9);t.exports=r("document","documentElement")},function(t,e,n){var r,o,i,c,s,u,a,f,l=n(0),d=n(21).f,p=n(4),h=n(43).set,v=n(44),m=l.MutationObserver||l.WebKitMutationObserver,E=l.process,g=l.Promise,y="process"==p(E),O=d(l,"queueMicrotask"),_=O&&O.value;_||(r=function(){var t,e;for(y&&(t=E.domain)&&t.exit();o;){e=o.fn,o=o.next;try{e()}catch(t){throw o?c():i=void 0,t}}i=void 0,t&&t.enter()},y?c=function(){E.nextTick(r)}:m&&!v?(s=!0,u=document.createTextNode(""),new m(r).observe(u,{characterData:!0}),c=function(){u.data=s=!s}):g&&g.resolve?(a=g.resolve(void 0),f=a.then,c=function(){f.call(a,r)}):c=function(){h.call(l,r)}),t.exports=_||function(t){var e={fn:t,next:void 0};i&&(i.next=e),o||(o=e,c()),i=e}},function(t,e,n){var r=n(7),o=n(3),i=n(46);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var r=n(0);t.exports=function(t,e){var n=r.console;n&&n.error&&(1===arguments.length?n.error(t):n.error(t,e))}},function(t,e){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},function(t,e,n){var r,o,i=n(0),c=n(45),s=i.process,u=s&&s.versions,a=u&&u.v8;a?o=(r=a.split("."))[0]+r[1]:c&&(!(r=c.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=c.match(/Chrome\/(\d+)/))&&(o=r[1]),t.exports=o&&+o},function(t,e,n){var r=n(102);t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},function(t,e,n){var r=n(3),o=n(4),i=n(1)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},function(t,e,n){var r=n(1)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,"/./"[t](e)}catch(t){}}return!1}},function(t,e,n){var r=n(12),o="["+n(49)+"]",i=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),s=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(c,"")),n}};t.exports={start:s(1),end:s(2),trim:s(3)}},function(t,e,n){var r=n(2),o=n(49);t.exports=function(t){return r((function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t}))}},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";e.a=function(t){console.log(t.elements)}},function(t,e,n){"use strict";e.a=function(t){console.log(t.elements)}},function(t,e,n){"use strict";n(54),n(55),n(56),n(57),n(58),n(59),n(25),n(106),n(107),n(108);n(10),n(109);const r=document.querySelectorAll(".dropdown");Array.from(r).forEach(t=>{const e=t.querySelector(".dropdown__button"),n=t.querySelector(".dropdown__content");e.addEventListener("click",()=>{n.classList.toggle("dropdown__content_visible")})}),window.addEventListener("click",t=>{t.target.matches(".dropdown__button")||r.forEach(t=>{const e=t.querySelector(".dropdown__content");e.classList.contains("dropdown__content_visible")&&e.classList.remove("dropdown__content_visible")})});n(110),n(111),n(112),n(113),n(114),n(15),n(116),n(117),n(118),n(119),n(120),n(121),n(122),n(123)},,,function(t,e,n){"use strict";n.r(e);n(50),n(51),n(52),n(53),n(126);var r=n(25),o=n(124),i=n(125);const c=new class{constructor(){this.btnHtmlElement=document.querySelector(".search__button").querySelector("button")||null,this.inputHtmlElement=document.querySelector(".search__textbox").querySelector("input")||null,this.onSearchCallback=null,this.enterListener()}onSearch(t){this.btnHtmlElement&&this.inputHtmlElement&&(this.onSearchCallback=t,this.btnHtmlElement.addEventListener("click",()=>{const t=this.inputHtmlElement.value||null;this.onSearchCallback(t)}))}enterListener(){this.inputHtmlElement&&this.inputHtmlElement.addEventListener("keypress",t=>{if(13===t.keyCode&&this.onSearchCallback){const t=this.inputHtmlElement.value||null;this.onSearchCallback(t)}})}};var s=n(15);n.d(e,"onClickShowMoreNews",(function(){return u})),n.d(e,"Dialog",(function(){return r.a})),n.d(e,"login",(function(){return i.a})),n.d(e,"register",(function(){return o.a}));function u(){s.a.append({imageLink:"https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",createdAt:new Date,title:"«Первозданная тайга»: новый фотопроект Игоря Шпиленка",contentText:"Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",sourceLink:"http://source.com/1",sourceLabel:"РИА",cardId:Math.floor(Date.now()/1e3)})}c.onSearch(t=>{s.a.beginLoading(),setTimeout(()=>{if(null===t||0===t.length)s.a.update([]);else{const t=[{imageLink:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUjrHyXxWOTj8I-IpnDMSfliiMKI80o4i3-wkD7TSUjEygVuQggw&s",createdAt:new Date,title:"Национальное достояние – парки",contentText:"В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",sourceLink:"http://source.com/1",sourceLabel:"Лента.ру",cardId:10001},{imageLink:"https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",createdAt:new Date,title:"Лесные огоньки: история одной фотографии",contentText:"Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",sourceLink:"http://source.com/1",sourceLabel:"Медуза",cardId:10002},{imageLink:"https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",createdAt:new Date,title:"«Первозданная тайга»: новый фотопроект Игоря Шпиленка",contentText:"Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",sourceLink:"http://source.com/1",sourceLabel:"РИА",cardId:10003},{imageLink:"https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",createdAt:new Date,title:"«Первозданная тайга»: новый фотопроект Игоря Шпиленка",contentText:"Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",sourceLink:"http://source.com/1",sourceLabel:"РИА",cardId:10003}];s.a.update(t)}},2e3)})}])}));