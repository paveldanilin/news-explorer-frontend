!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=136)}([function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n(63))},function(t,e,n){var r=n(0),o=n(26),i=n(5),c=n(37),s=n(46),a=n(80),u=o("wks"),l=r.Symbol,f=a?l:c;t.exports=function(t){return i(u,t)||(s&&i(l,t)?u[t]=l[t]:u[t]=f("Symbol."+t)),u[t]}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(2);t.exports=!r((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(t,e,n){var r=n(3);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e,n){var r=n(6),o=n(15),i=n(31);t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(69),o=n(0),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},function(t,e,n){var r=n(0),o=n(75),i=n(76),c=n(8);for(var s in o){var a=r[s],u=a&&a.prototype;if(u&&u.forEach!==i)try{c(u,"forEach",i)}catch(t){u.forEach=i}}},function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return l})),n.d(e,"a",(function(){return f}));n(115);var r=n(12),o=n(29);const i=document.querySelector("[data-main-menu]"),c=document.querySelector("[data-mobile-menu]");let s=!1,a=!1;const u=()=>{r.a.show("dialog_signin")},l=t=>{const e=i.querySelector(".logo"),n=i.querySelector(".header__mobile-toggle").querySelector(".icon");a=!0===t,o.a.toggle(c),i.classList.toggle("header__desktop-menu_bg-color_dark"),s=!s,!0===t?i.classList.contains("header__desktop-menu_bg-color_dark")?(i.classList.remove("header__desktop-menu_separator_dark"),i.classList.add("header__desktop-menu_separator_light"),e&&(e.classList.remove("nav__item_style_dark"),e.classList.add("nav__item_style_light")),n.classList.contains("icon_menu_black")&&(n.classList.remove("icon_menu_black"),n.classList.add("icon_close_white"))):(i.classList.remove("header__desktop-menu_separator_light"),i.classList.add("header__desktop-menu_separator_dark"),e&&(e.classList.add("nav__item_style_dark"),e.classList.remove("nav__item_style_light")),n.classList.contains("icon_close_white")&&(n.classList.add("icon_menu_black"),n.classList.remove("icon_close_white"))):s?(n.classList.add("icon_close_white"),n.classList.remove("icon_menu_white")):(n.classList.add("icon_menu_white"),n.classList.remove("icon_close_white"))},f=t=>{u(),l(t)};window.addEventListener("resize",()=>{window.innerWidth>768&&s&&l(a)})},function(t,e,n){"use strict";n(10),n(83),n(84),n(87),n(52),n(19);class r{static get METHOD_GET(){return"GET"}static get METHOD_POST(){return"POST"}static get METHOD_DELETE(){return"DELETE"}static get METHOD_PATCH(){return"PATCH"}static get METHOD_PUT(){return"PUT"}static get METHOD_HEAD(){return"HEAD"}static get METHOD_CONNECT(){return"CONNECT"}static get METHOD_OPTIONS(){return"OPTIONS"}static get METHOD_TRACE(){return"TRACE"}static get MODE_SAME_ORIGIN(){return"same-origin"}static get MODE_NO_CORS(){return"no-cors"}static get MODE_CORS(){return"cors"}static get CREDENTIALS_OMIT(){return"omit"}static get CREDENTIALS_SAME_ORIGIN(){return"same-origin"}static get CREDENTIALS_INCLUDE(){return"include"}static get CACHE_DEFAULT(){return"default"}static get CACHE_NO_STORE(){return"no-store"}static get CACHE_RELOAD(){return"reload"}static get CACHE_NO_CACHE(){return"no-cache"}static get CACHE_FORECE_CACHE(){return"force-cache"}static get CACHE_ONLY_IF_CACHED(){return"only-if-cached"}static get REDIRECT_FOLLOW(){return"follow"}static get REDIRECT_ERROR(){return"error"}static filterOptionMethod(t){let e=t||r.METHOD_GET;if("string"!=typeof e)throw new Error("`method` options must me string");if(0===e.trim().length)throw new Error("`method` option must be non empty string");e=e.toUpperCase();const n=[r.METHOD_GET,r.METHOD_CONNECT,r.METHOD_DELETE,r.METHOD_HEAD,r.METHOD_OPTIONS,r.METHOD_PATCH,r.METHOD_POST,r.METHOD_PUT,r.METHOD_TRACE];if(!n.includes(e))throw new Error("`method` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionMode(t){let e=t||r.MODE_SAME_ORIGIN;if("string"!=typeof e)throw new Error("`mode` options must me string");if(0===e.trim().length)throw new Error("`mode` option must be non empty string");e=e.toLowerCase();const n=[r.MODE_SAME_ORIGIN,r.MODE_CORS,r.MODE_NO_CORS];if(!n.includes(e))throw new Error("`mode` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionCredentials(t){let e=t||r.CREDENTIALS_OMIT;if("string"!=typeof e)throw new Error("`credentials` options must me string");if(0===e.trim().length)throw new Error("`credentials` option must be non empty string");e=e.toLowerCase();const n=[r.CREDENTIALS_OMIT,r.CREDENTIALS_INCLUDE,r.CREDENTIALS_SAME_ORIGIN];if(!n.includes(e))throw new Error("`credentials` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionCache(t){let e=t||r.CACHE_DEFAULT;if("string"!=typeof e)throw new Error("`cache` options must me string");if(0===e.trim().length)throw new Error("`cache` option must be non empty string");e=e.toLowerCase();const n=[r.CACHE_DEFAULT,r.CACHE_FORECE_CACHE,r.CACHE_NO_CACHE,r.CACHE_NO_STORE,r.CACHE_ONLY_IF_CACHED,r.CACHE_RELOAD];if(!n.includes(e))throw new Error("`cache` option value must be on of [".concat(n.join(","),"]"));return e}static filterOptionRedirect(t){let e=t||r.REDIRECT_FOLLOW;if("string"!=typeof e)throw new Error("`redirect` options must me string");if(0===e.trim().length)throw new Error("`redirect` option must be non empty string");e=e.toLowerCase();const n=[r.REDIRECT_FOLLOW,r.REDIRECT_ERROR];if(!n.includes(e))throw new Error("`redirect` option value must be on of [".concat(n.join(","),"]"));return e}}class o extends Error{constructor(t){super(),this.message=t}}class i extends o{constructor(t,e){super("[".concat(t.method,"] : ").concat(e.status," -> ").concat(t.url)),this.response=e,this.request=t}}class c{constructor(){let{baseUrl:t,headers:e,mode:n,cache:o,redirect:i,credentials:s,throwError:a,responseFormat:u}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.baseUrl=c.filterOptionBaseUrl(t||""),this.headers=e||{},this.mode=n||r.MODE_SAME_ORIGIN,this.cache=o||r.CACHE_DEFAULT,this.redirect=i||r.REDIRECT_FOLLOW,this.credentials=s||r.CREDENTIALS_SAME_ORIGIN,this.throwError=a||!0,this.responseFormat=c.filterOptionResponseFormat(u||void 0)}static get RESPONSE_JSON(){return"json"}static get RESPONSE_TEXT(){return"text"}static get RESPONSE_FORM_DATA(){return"form-data"}static get RESPONSE_BLOB(){return"blob"}static get RESPONSE_ARRAY_BUFFER(){return"array-buffer"}static get RESPONSE_RAW(){return"raw"}static create(t){return new c(t||{})}static getRequest(t,e){return c.create().fetch(t,e)}static postRequest(t,e){return c.create().post(t,e)}static patchRequest(t,e){return c.create().patch(t,e)}static deleteRequest(t,e){return c.create().delete(t,e)}fetch(t){let{headers:e,mode:n,cache:o,redirect:i,credentials:c,responseFormat:s}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_GET,e||void 0,void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0)}post(t){let{headers:e,body:n,mode:o,cache:i,redirect:c,credentials:s,responseFormat:a}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_POST,e||void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0,a||void 0)}patch(t){let{headers:e,body:n,mode:o,cache:i,redirect:c,credentials:s,responseFormat:a}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_PATCH,e||void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0,a||void 0)}put(t){let{headers:e,body:n,mode:o,cache:i,redirect:c,credentials:s,responseFormat:a}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_PUT,e||void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0,a||void 0)}delete(t){let{headers:e,mode:n,cache:o,redirect:i,credentials:c,responseFormat:s}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.sendRequest(t,r.METHOD_DELETE,e||void 0,void 0,n||void 0,o||void 0,i||void 0,c||void 0,s||void 0)}async sendRequest(t,e,n,o,s,a,u,l,f){const d=Object.assign(this.headers,n||{}),p=s||this.mode,h=a||this.cache,v=u||this.redirect,m=l||this.credentials,E=c.filterOptionResponseFormat(f,this.responseFormat),g=this.baseUrl.length>0?this.baseUrl+t:t,_=new Request(g,{method:r.filterOptionMethod(e),body:o,headers:d,mode:r.filterOptionMode(p),cache:r.filterOptionCache(h),redirect:r.filterOptionRedirect(v),credentials:r.filterOptionCredentials(m)}),y=await fetch(_);if(!0===this.throwError&&!y.ok)throw new i(_,y);if(y.ok)switch(E){default:case c.RESPONSE_TEXT:return y.text();case c.RESPONSE_ARRAY_BUFFER:return y.arrayBuffer();case c.RESPONSE_BLOB:return y.blob();case c.RESPONSE_FORM_DATA:return y.formData();case c.RESPONSE_JSON:return y.json()}return y}static filterOptionResponseFormat(t,e){const n=(t||e||c.RESPONSE_RAW).toLowerCase(),r=[c.RESPONSE_RAW,c.RESPONSE_JSON,c.RESPONSE_FORM_DATA,c.RESPONSE_BLOB,c.RESPONSE_ARRAY_BUFFER,c.RESPONSE_TEXT];if(!r.includes(n))throw new o("`responseFormat` option must have value one of [".concat(r.join(","),"]"));return n}static filterOptionBaseUrl(t){if("string"!=typeof t)throw new o("`baseUrl` option must be non empty string");return t.trim()}}const s=c.create({responseFormat:c.RESPONSE_TEXT});function a(t){const e=document.getElementById(t);return e?e.classList.contains("dialog")?e:e.firstElementChild||null:null}function u(t){const e=t.getElementsByClassName("dialog__close");for(let t=0;t<e.length;t+=1){const n=e[t],r=n.closest(".dialog");r&&(n.onclick=()=>{r.style.display="none"})}}n.d(e,"a",(function(){return l}));class l{static show(t){let e=t;"string"!=typeof e&&"number"!=typeof e||(e=a(e)),e&&(e.style.display="block")}static close(t){let e=t;"string"!=typeof e&&"number"!=typeof e||(e=a(e)),e&&(e.style.display="none",e.querySelectorAll("input").forEach(t=>{t.value=""}))}static toggle(t){const e=l.getActiveHTMLElement();e&&(l.close(e),l.show(t))}static getActiveHTMLElement(){const t=document.getElementsByClassName("dialog");for(let e=0;e<t.length;e+=1){const n=t[e];if("block"===n.style.display)return n}return null}}window.addEventListener("keydown",t=>{if("Escape"!==t.code)return;const e=l.getActiveHTMLElement();e&&e.parentNode&&l.close(e.parentNode.id)}),setTimeout(()=>{document.querySelectorAll("[data-dialog]").forEach(t=>{t.getAttribute("data-dialog").length>0?((t,e,n,r)=>{let o="",i=e?[e]:[];"string"==typeof e&&(i=document.querySelectorAll(e)),s.fetch(t).then(t=>{o="function"==typeof n?n(t):t,i.forEach(t=>{const e=t;e.innerHTML=o,"function"==typeof r&&r(e,o)})})})(t.getAttribute("data-dialog"),t,null,t=>{u(t)}):u(t)})},0)},function(t,e,n){var r=n(0),o=n(20).f,i=n(8),c=n(23),s=n(24),a=n(67),u=n(43);t.exports=function(t,e){var n,l,f,d,p,h=t.target,v=t.global,m=t.stat;if(n=v?r:m?r[h]||s(h,{}):(r[h]||{}).prototype)for(l in e){if(d=e[l],f=t.noTargetGet?(p=o(n,l))&&p.value:n[l],!u(v?l:h+(m?".":"#")+l,t.forced)&&void 0!==f){if(typeof d==typeof f)continue;a(d,f)}(t.sham||f&&f.sham)&&i(d,"sham",!0),c(n,l,d,t)}}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e,n){var r=n(6),o=n(33),i=n(7),c=n(32),s=Object.defineProperty;e.f=r?s:function(t,e,n){if(i(t),e=c(e,!0),i(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n(10),n(119);class r{constructor(){this.htmlElement=document.querySelector(".search-result"),this.gridHtmlElement=document.querySelector(".search-result__grid")}append(t){this.gridHtmlElement.appendChild(r.createCard(t))}update(t){this.gridHtmlElement&&(this.removeAll(),t.forEach(t=>{this.append(t)}),this.endLoading(),0===t.length&&(document.getElementById("noresult").style.display="flex",document.getElementById("loading").style.display="none",this.htmlElement.style.display="none"))}beginLoading(){document.getElementById("noresult").style.display="none",document.getElementById("loading").style.display="flex",this.htmlElement.style.display="none",this.removeAll()}endLoading(){document.getElementById("loading").style.display="none",this.htmlElement.style.display="block"}removeAll(){if(this.gridHtmlElement)for(;this.gridHtmlElement.firstChild;)this.gridHtmlElement.removeChild(this.gridHtmlElement.firstChild)}static createCard(t){const{imageLink:e,title:n,contentText:r,sourceLink:o,sourceLabel:i,cardId:c}=t,s=document.createElement("div");s.classList.add("card"),s.classList.add("card_dir_ver"),s.setAttribute("id",c);const a=document.createElement("img");a.src=e,a.classList.add("search-result__card-image"),a.classList.add("search-result__card-image_placeholder"),a.onload=()=>{a.classList.remove("search-result__card-image_placeholder")},s.appendChild(a);const u=document.createElement("h4");u.innerText=n,u.classList.add("search-result__card-title");const l=document.createElement("p");l.innerText=r,l.classList.add("search-result__card-text");const f=document.createElement("a");f.innerText=i,f.href=o,f.classList.add("search-result__card-source");const d=document.createElement("div");d.classList.add("card__body"),d.classList.add("search-result__card-body");const p=document.createElement("div");return p.classList.add("card__footer"),p.classList.add("search-result__card-footer"),p.appendChild(f),d.appendChild(u),d.appendChild(l),s.appendChild(d),s.appendChild(p),s}}const o=new r},function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n(19),n(10),n(82);const r=[],o=t=>{const e=t.htmlElement.querySelector('button[type="submit"]');e&&(e.disabled=!0)};function i(){r.forEach(t=>{t.htmlElement.reset(),o(t),t.htmlElement.querySelectorAll("[data-invalid-message]").forEach(t=>{t.classList.add("form__invalid-message_visibility_hidden"),t.classList.remove("form__invalid-message_visibility_shown")})})}setTimeout(()=>{document.querySelectorAll("form").forEach(t=>{r.push({htmlElement:t,inputElements:[]})}),r.forEach(t=>{t.htmlElement.querySelectorAll("[data-invalid-message]").forEach(e=>{const n=e.getAttribute("data-invalid-message"),r=document.getElementById(n);r&&(t.inputElements.push(r),r.addEventListener("invalid",t=>{t.preventDefault(),e.classList.remove("form__invalid-message_visibility_hidden"),e.classList.add("form__invalid-message_visibility_shown")}),r.addEventListener("input",()=>{e.classList.add("form__invalid-message_visibility_hidden"),e.classList.remove("form__invalid-message_visibility_shown"),(t=>{let e=!0;return t.inputElements.forEach(t=>{0===t.value.trim().length&&(e=!1)}),e})(t)?(t=>{const e=t.htmlElement.querySelector('button[type="submit"]');e&&(e.disabled=!1)})(t):o(t)}))})})},0)},function(t,e,n){"use strict";var r=n(13),o=n(73).trim;r({target:"String",proto:!0,forced:n(74)("trim")},{trim:function(){return o(this)}})},function(t,e,n){var r=n(6),o=n(30),i=n(31),c=n(21),s=n(32),a=n(5),u=n(33),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=c(t),e=s(e,!0),u)try{return l(t,e)}catch(t){}if(a(t,e))return i(!o.f.call(t,e),t[e])}},function(t,e,n){var r=n(22),o=n(14);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(2),o=n(4),i="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,e,n){var r=n(0),o=n(8),i=n(5),c=n(24),s=n(25),a=n(36),u=a.get,l=a.enforce,f=String(String).split("String");(t.exports=function(t,e,n,s){var a=!!s&&!!s.unsafe,u=!!s&&!!s.enumerable,d=!!s&&!!s.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||o(n,"name",e),l(n).source=f.join("string"==typeof e?e:"")),t!==r?(a?!d&&t[e]&&(u=!0):delete t[e],u?t[e]=n:o(t,e,n)):u?t[e]=n:c(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&u(this).source||s(this)}))},function(t,e,n){var r=n(0),o=n(8);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},function(t,e,n){var r=n(26),o=Function.toString;t.exports=r("inspectSource",(function(t){return o.call(t)}))},function(t,e,n){var r=n(35),o=n(64);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.4.5",mode:r?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var r=n(40),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(16);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n(61);class r{static toggle(t){let e=null;"string"==typeof t?e=document.getElementById(t):t instanceof HTMLElement&&(e=t),e&&e.classList.toggle("nav_visible_false")}}},function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!r.call({1:2},1);e.f=i?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(3);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(6),o=n(2),i=n(34);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,e,n){var r=n(0),o=n(3),i=r.document,c=o(i)&&o(i.createElement);t.exports=function(t){return c?i.createElement(t):{}}},function(t,e){t.exports=!1},function(t,e,n){var r,o,i,c=n(65),s=n(0),a=n(3),u=n(8),l=n(5),f=n(66),d=n(38),p=s.WeakMap;if(c){var h=new p,v=h.get,m=h.has,E=h.set;r=function(t,e){return E.call(h,t,e),e},o=function(t){return v.call(h,t)||{}},i=function(t){return m.call(h,t)}}else{var g=f("state");d[g]=!0,r=function(t,e){return u(t,g,e),e},o=function(t){return l(t,g)?t[g]:{}},i=function(t){return l(t,g)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!a(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},function(t,e){t.exports={}},function(t,e,n){var r=n(5),o=n(21),i=n(71).indexOf,c=n(38);t.exports=function(t,e){var n,s=o(t),a=0,u=[];for(n in s)!r(c,n)&&r(s,n)&&u.push(n);for(;e.length>a;)r(s,n=e[a++])&&(~i(u,n)||u.push(n));return u}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(2),o=/#|\.prototype\./,i=function(t,e){var n=s[c(t)];return n==u||n!=a&&("function"==typeof e?r(e):!!e)},c=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},s=i.data={},a=i.NATIVE="N",u=i.POLYFILL="P";t.exports=i},function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(t,e,n){var r=n(14);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(2);t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},function(t,e){t.exports={}},function(t,e,n){var r,o,i,c=n(0),s=n(2),a=n(4),u=n(28),l=n(101),f=n(34),d=n(49),p=c.location,h=c.setImmediate,v=c.clearImmediate,m=c.process,E=c.MessageChannel,g=c.Dispatch,_=0,y={},b=function(t){if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},O=function(t){return function(){b(t)}},S=function(t){b(t.data)},w=function(t){c.postMessage(t+"",p.protocol+"//"+p.host)};h&&v||(h=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++_]=function(){("function"==typeof t?t:Function(t)).apply(void 0,e)},r(_),_},v=function(t){delete y[t]},"process"==a(m)?r=function(t){m.nextTick(O(t))}:g&&g.now?r=function(t){g.now(O(t))}:E&&!d?(i=(o=new E).port2,o.port1.onmessage=S,r=u(i.postMessage,i,1)):!c.addEventListener||"function"!=typeof postMessage||c.importScripts||s(w)?r="onreadystatechange"in f("script")?function(t){l.appendChild(f("script")).onreadystatechange=function(){l.removeChild(this),b(t)}}:function(t){setTimeout(O(t),0)}:(r=w,c.addEventListener("message",S,!1))),t.exports={set:h,clear:v}},function(t,e,n){var r=n(50);t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(r)},function(t,e,n){var r=n(9);t.exports=r("navigator","userAgent")||""},function(t,e,n){"use strict";var r=n(16),o=function(t){var e,n;this.promise=new t((function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r})),this.resolve=r(e),this.reject=r(n)};t.exports.f=function(t){return new o(t)}},function(t,e,n){"use strict";var r=n(13),o=n(107),i=n(14);r({target:"String",proto:!0,forced:!n(109)("includes")},{includes:function(t){return!!~String(i(this)).indexOf(o(t),arguments.length>1?arguments[1]:void 0)}})},function(t,e){t.exports="../images/favicon.png"},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var r=n(0),o=n(24),i=r["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=i},function(t,e,n){var r=n(0),o=n(25),i=r.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},function(t,e,n){var r=n(26),o=n(37),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,e,n){var r=n(5),o=n(68),i=n(20),c=n(15);t.exports=function(t,e){for(var n=o(e),s=c.f,a=i.f,u=0;u<n.length;u++){var l=n[u];r(t,l)||s(t,l,a(e,l))}}},function(t,e,n){var r=n(9),o=n(70),i=n(42),c=n(7);t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(c(t)),n=i.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(0);t.exports=r},function(t,e,n){var r=n(39),o=n(41).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(21),o=n(27),i=n(72),c=function(t){return function(e,n,c){var s,a=r(e),u=o(a.length),l=i(c,u);if(t&&n!=n){for(;u>l;)if((s=a[l++])!=s)return!0}else for(;u>l;l++)if((t||l in a)&&a[l]===n)return t||l||0;return!t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)}},function(t,e,n){var r=n(40),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},function(t,e,n){var r=n(14),o="["+n(44)+"]",i=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),s=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(c,"")),n}};t.exports={start:s(1),end:s(2),trim:s(3)}},function(t,e,n){var r=n(2),o=n(44);t.exports=function(t){return r((function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t}))}},function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,e,n){"use strict";var r=n(77).forEach,o=n(81);t.exports=o("forEach")?function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},function(t,e,n){var r=n(28),o=n(22),i=n(45),c=n(27),s=n(78),a=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,l=4==t,f=6==t,d=5==t||f;return function(p,h,v,m){for(var E,g,_=i(p),y=o(_),b=r(h,v,3),O=c(y.length),S=0,w=m||s,L=e?w(p,O):n?w(p,0):void 0;O>S;S++)if((d||S in y)&&(g=b(E=y[S],S,_),t))if(e)L[S]=g;else if(g)switch(t){case 3:return!0;case 5:return E;case 6:return S;case 2:a.call(L,E)}else if(l)return!1;return f?-1:u||l?l:L}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},function(t,e,n){var r=n(3),o=n(79),i=n(1)("species");t.exports=function(t,e){var n;return o(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!o(n.prototype)?r(n)&&null===(n=n[i])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},function(t,e,n){var r=n(4);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(46);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol()},function(t,e,n){"use strict";var r=n(2);t.exports=function(t,e){var n=[][t];return!n||!r((function(){n.call(null,e||function(){throw 1},1)}))}},function(t,e,n){},function(t,e,n){},function(t,e,n){var r=n(13),o=n(85);r({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},function(t,e,n){"use strict";var r=n(6),o=n(2),i=n(86),c=n(42),s=n(30),a=n(45),u=n(22),l=Object.assign,f=Object.defineProperty;t.exports=!l||o((function(){if(r&&1!==l({b:1},l(f({},"a",{enumerable:!0,get:function(){f(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},e={},n=Symbol();return t[n]=7,"abcdefghijklmnopqrst".split("").forEach((function(t){e[t]=t})),7!=l({},t)[n]||"abcdefghijklmnopqrst"!=i(l({},e)).join("")}))?function(t,e){for(var n=a(t),o=arguments.length,l=1,f=c.f,d=s.f;o>l;)for(var p,h=u(arguments[l++]),v=f?i(h).concat(f(h)):i(h),m=v.length,E=0;m>E;)p=v[E++],r&&!d.call(h,p)||(n[p]=h[p]);return n}:l},function(t,e,n){var r=n(39),o=n(41);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){"use strict";var r,o,i,c,s=n(13),a=n(35),u=n(0),l=n(9),f=n(88),d=n(23),p=n(89),h=n(90),v=n(91),m=n(3),E=n(16),g=n(92),_=n(4),y=n(25),b=n(93),O=n(99),S=n(100),w=n(48).set,L=n(102),T=n(103),x=n(104),C=n(51),R=n(105),A=n(36),M=n(43),D=n(1),j=n(106),N=D("species"),H="Promise",P=A.get,I=A.set,k=A.getterFor(H),F=f,q=u.TypeError,U=u.document,B=u.process,G=l("fetch"),W=C.f,V=W,J="process"==_(B),K=!!(U&&U.createEvent&&u.dispatchEvent),z=M(H,(function(){if(!(y(F)!==String(F))){if(66===j)return!0;if(!J&&"function"!=typeof PromiseRejectionEvent)return!0}if(a&&!F.prototype.finally)return!0;if(j>=51&&/native code/.test(F))return!1;var t=F.resolve(1),e=function(t){t((function(){}),(function(){}))};return(t.constructor={})[N]=e,!(t.then((function(){}))instanceof e)})),Y=z||!O((function(t){F.all(t).catch((function(){}))})),Q=function(t){var e;return!(!m(t)||"function"!=typeof(e=t.then))&&e},X=function(t,e,n){if(!e.notified){e.notified=!0;var r=e.reactions;L((function(){for(var o=e.value,i=1==e.state,c=0;r.length>c;){var s,a,u,l=r[c++],f=i?l.ok:l.fail,d=l.resolve,p=l.reject,h=l.domain;try{f?(i||(2===e.rejection&&et(t,e),e.rejection=1),!0===f?s=o:(h&&h.enter(),s=f(o),h&&(h.exit(),u=!0)),s===l.promise?p(q("Promise-chain cycle")):(a=Q(s))?a.call(s,d,p):d(s)):p(o)}catch(t){h&&!u&&h.exit(),p(t)}}e.reactions=[],e.notified=!1,n&&!e.rejection&&$(t,e)}))}},Z=function(t,e,n){var r,o;K?((r=U.createEvent("Event")).promise=e,r.reason=n,r.initEvent(t,!1,!0),u.dispatchEvent(r)):r={promise:e,reason:n},(o=u["on"+t])?o(r):"unhandledrejection"===t&&x("Unhandled promise rejection",n)},$=function(t,e){w.call(u,(function(){var n,r=e.value;if(tt(e)&&(n=R((function(){J?B.emit("unhandledRejection",r,t):Z("unhandledrejection",t,r)})),e.rejection=J||tt(e)?2:1,n.error))throw n.value}))},tt=function(t){return 1!==t.rejection&&!t.parent},et=function(t,e){w.call(u,(function(){J?B.emit("rejectionHandled",t):Z("rejectionhandled",t,e.value)}))},nt=function(t,e,n,r){return function(o){t(e,n,o,r)}},rt=function(t,e,n,r){e.done||(e.done=!0,r&&(e=r),e.value=n,e.state=2,X(t,e,!0))},ot=function(t,e,n,r){if(!e.done){e.done=!0,r&&(e=r);try{if(t===n)throw q("Promise can't be resolved itself");var o=Q(n);o?L((function(){var r={done:!1};try{o.call(n,nt(ot,t,r,e),nt(rt,t,r,e))}catch(n){rt(t,r,n,e)}})):(e.value=n,e.state=1,X(t,e,!1))}catch(n){rt(t,{done:!1},n,e)}}};z&&(F=function(t){g(this,F,H),E(t),r.call(this);var e=P(this);try{t(nt(ot,this,e),nt(rt,this,e))}catch(t){rt(this,e,t)}},(r=function(t){I(this,{type:H,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=p(F.prototype,{then:function(t,e){var n=k(this),r=W(S(this,F));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=J?B.domain:void 0,n.parent=!0,n.reactions.push(r),0!=n.state&&X(this,n,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new r,e=P(t);this.promise=t,this.resolve=nt(ot,t,e),this.reject=nt(rt,t,e)},C.f=W=function(t){return t===F||t===i?new o(t):V(t)},a||"function"!=typeof f||(c=f.prototype.then,d(f.prototype,"then",(function(t,e){var n=this;return new F((function(t,e){c.call(n,t,e)})).then(t,e)}),{unsafe:!0}),"function"==typeof G&&s({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return T(F,G.apply(u,arguments))}}))),s({global:!0,wrap:!0,forced:z},{Promise:F}),h(F,H,!1,!0),v(H),i=l(H),s({target:H,stat:!0,forced:z},{reject:function(t){var e=W(this);return e.reject.call(void 0,t),e.promise}}),s({target:H,stat:!0,forced:a||z},{resolve:function(t){return T(a&&this===i?F:this,t)}}),s({target:H,stat:!0,forced:Y},{all:function(t){var e=this,n=W(e),r=n.resolve,o=n.reject,i=R((function(){var n=E(e.resolve),i=[],c=0,s=1;b(t,(function(t){var a=c++,u=!1;i.push(void 0),s++,n.call(e,t).then((function(t){u||(u=!0,i[a]=t,--s||r(i))}),o)})),--s||r(i)}));return i.error&&o(i.value),n.promise},race:function(t){var e=this,n=W(e),r=n.reject,o=R((function(){var o=E(e.resolve);b(t,(function(t){o.call(e,t).then(n.resolve,r)}))}));return o.error&&r(o.value),n.promise}})},function(t,e,n){var r=n(0);t.exports=r.Promise},function(t,e,n){var r=n(23);t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},function(t,e,n){var r=n(15).f,o=n(5),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){"use strict";var r=n(9),o=n(15),i=n(1),c=n(6),s=i("species");t.exports=function(t){var e=r(t),n=o.f;c&&e&&!e[s]&&n(e,s,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},function(t,e,n){var r=n(7),o=n(94),i=n(27),c=n(28),s=n(95),a=n(98),u=function(t,e){this.stopped=t,this.result=e};(t.exports=function(t,e,n,l,f){var d,p,h,v,m,E,g,_=c(e,n,l?2:1);if(f)d=t;else{if("function"!=typeof(p=s(t)))throw TypeError("Target is not iterable");if(o(p)){for(h=0,v=i(t.length);v>h;h++)if((m=l?_(r(g=t[h])[0],g[1]):_(t[h]))&&m instanceof u)return m;return new u(!1)}d=p.call(t)}for(E=d.next;!(g=E.call(d)).done;)if("object"==typeof(m=a(d,_,g.value,l))&&m&&m instanceof u)return m;return new u(!1)}).stop=function(t){return new u(!0,t)}},function(t,e,n){var r=n(1),o=n(47),i=r("iterator"),c=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||c[i]===t)}},function(t,e,n){var r=n(96),o=n(47),i=n(1)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,e,n){var r=n(97),o=n(4),i=n(1)("toStringTag"),c="Arguments"==o(function(){return arguments}());t.exports=r?o:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:c?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){var r={};r[n(1)("toStringTag")]="z",t.exports="[object z]"===String(r)},function(t,e,n){var r=n(7);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(1)("iterator"),o=!1;try{var i=0,c={next:function(){return{done:!!i++}},return:function(){o=!0}};c[r]=function(){return this},Array.from(c,(function(){throw 2}))}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i={};i[r]=function(){return{next:function(){return{done:n=!0}}}},t(i)}catch(t){}return n}},function(t,e,n){var r=n(7),o=n(16),i=n(1)("species");t.exports=function(t,e){var n,c=r(t).constructor;return void 0===c||null==(n=r(c)[i])?e:o(n)}},function(t,e,n){var r=n(9);t.exports=r("document","documentElement")},function(t,e,n){var r,o,i,c,s,a,u,l,f=n(0),d=n(20).f,p=n(4),h=n(48).set,v=n(49),m=f.MutationObserver||f.WebKitMutationObserver,E=f.process,g=f.Promise,_="process"==p(E),y=d(f,"queueMicrotask"),b=y&&y.value;b||(r=function(){var t,e;for(_&&(t=E.domain)&&t.exit();o;){e=o.fn,o=o.next;try{e()}catch(t){throw o?c():i=void 0,t}}i=void 0,t&&t.enter()},_?c=function(){E.nextTick(r)}:m&&!v?(s=!0,a=document.createTextNode(""),new m(r).observe(a,{characterData:!0}),c=function(){a.data=s=!s}):g&&g.resolve?(u=g.resolve(void 0),l=u.then,c=function(){l.call(u,r)}):c=function(){h.call(f,r)}),t.exports=b||function(t){var e={fn:t,next:void 0};i&&(i.next=e),o||(o=e,c()),i=e}},function(t,e,n){var r=n(7),o=n(3),i=n(51);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var r=n(0);t.exports=function(t,e){var n=r.console;n&&n.error&&(1===arguments.length?n.error(t):n.error(t,e))}},function(t,e){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},function(t,e,n){var r,o,i=n(0),c=n(50),s=i.process,a=s&&s.versions,u=a&&a.v8;u?o=(r=u.split("."))[0]+r[1]:c&&(!(r=c.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=c.match(/Chrome\/(\d+)/))&&(o=r[1]),t.exports=o&&+o},function(t,e,n){var r=n(108);t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},function(t,e,n){var r=n(3),o=n(4),i=n(1)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},function(t,e,n){var r=n(1)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,"/./"[t](e)}catch(t){}}return!1}},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},,,function(t,e,n){"use strict";n(58),n(59),n(60),n(29),n(62),n(18),n(12),n(110),n(111),n(112);n(10),n(113);const r=document.querySelectorAll(".dropdown");Array.from(r).forEach(t=>{const e=t.querySelector(".dropdown__button"),n=t.querySelector(".dropdown__content");e.addEventListener("click",()=>{n.classList.toggle("dropdown__content_visible")})}),window.addEventListener("click",t=>{t.target.matches(".dropdown__button")||r.forEach(t=>{const e=t.querySelector(".dropdown__content");e.classList.contains("dropdown__content_visible")&&e.classList.remove("dropdown__content_visible")})});n(114),n(11),n(116),n(117),n(118),n(17),n(120),n(121),n(122),n(123),n(124),n(125),n(126),n(127),n(128),n(129)},,,,function(t,e,n){"use strict";n.r(e);n(53),n(54),n(55),n(56),n(57),n(132);var r=n(18),o=n(11),i=n(12),c=n(17);var s=function(){};n.d(e,"resetForms",(function(){return r.a})),n.d(e,"showSigninDialog",(function(){return o.b})),n.d(e,"onSigninHandler",(function(){return o.a})),n.d(e,"toggleMobileMenu",(function(){return o.c})),n.d(e,"Dialog",(function(){return i.a})),n.d(e,"logout",(function(){return s})),c.a.beginLoading();const a=[{imageLink:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUjrHyXxWOTj8I-IpnDMSfliiMKI80o4i3-wkD7TSUjEygVuQggw&s",createdAt:new Date,title:"Национальное достояние – парки",contentText:"В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",sourceLink:"http://source.com/1",sourceLabel:"Лента.ру",cardId:10001},{imageLink:"https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",createdAt:new Date,title:"Лесные огоньки: история одной фотографии",contentText:"Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",sourceLink:"http://source.com/1",sourceLabel:"Медуза",cardId:10002},{imageLink:"https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",createdAt:new Date,title:"«Первозданная тайга»: новый фотопроект Игоря Шпиленка",contentText:"Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",sourceLink:"http://source.com/1",sourceLabel:"РИА",cardId:10003},{imageLink:"https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",createdAt:new Date,title:"«Первозданная тайга»: новый фотопроект Игоря Шпиленка",contentText:"Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",sourceLink:"http://source.com/1",sourceLabel:"РИА",cardId:10003}];c.a.update(a)}])}));