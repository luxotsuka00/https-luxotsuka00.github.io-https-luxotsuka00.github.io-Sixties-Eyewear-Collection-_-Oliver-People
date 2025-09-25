"use strict";var __awaiter=this&&this.__awaiter||function(t,n,e,i){function a(r){return r instanceof e?r:new e(function(s){s(r)})}return new(e||(e=Promise))(function(r,s){function d(o){try{u(i.next(o))}catch(c){s(c)}}function l(o){try{u(i.throw(o))}catch(c){s(c)}}function u(o){o.done?r(o.value):a(o.value).then(d,l)}u((i=i.apply(t,n||[])).next())})};function main(){const t=Configuration.getInstance();t.jsonLdDisabled||requestJsonLd(t.webPageUrl),listenForHotKey(t.sidebarUrl,t.webPageUrl,t.targetOrigin),listenForMessage({"close-sidebar-request":{callback:handleCloseSidebarRequest},"html-request":{callback:handleHtmlRequest,sourceOrigin:t.sidebarUrl}}),reopenSidebarIfOpen(t.sidebarUrl,t.webPageUrl,t.targetOrigin)}function requestJsonLd(t){const n=Configuration.getInstance(),e=t.match("^(https?):\\/\\/(.*?)(\\?.*)?$");if(e===null)return;const i=e[1],a=e[2],r=new URLSearchParams(e[3]||""),s=detectLanguage(),d=n.dataFormatter;s!==void 0&&r.set("__wl_lang",s),d!==void 0&&r.set("__wl_data_formatter",d);const l=`https://api.wordlift.io/data/${i}/${a}?${r}`.replace(/\?$/,"");__awaiter(this,void 0,void 0,function*(){for(let o=1;o<=3;o++)try{const c=yield fetch(l,{headers:{Accept:"application/ld+json"}});if(!c.ok)throw new Error("Network response was not ok");const m=yield c.text(),g=document.createElement("script");g.id="wl-json-ld",g.type="application/ld+json",g.innerText=m,document.head.appendChild(g);break}catch(c){o===3?console.error("Fetch failed after maximum retries:",{error:c,dataUrl:l}):console.warn(`Fetch attempt ${o} failed. Retrying...`)}})}function detectLanguage(){var t,n,e;return((e=document.documentElement.lang||((t=document.querySelector('meta[http-equiv="Content-Language"]'))===null||t===void 0?void 0:t.getAttribute("content"))||((n=document.querySelector('meta[name="language"]'))===null||n===void 0?void 0:n.getAttribute("content")))===null||e===void 0?void 0:e.trim())||void 0}function listenForHotKey(t,n,e){window.addEventListener("keyup",function(i){if(!(!i.ctrlKey||!i.altKey||i.code!=="KeyW")){if(document.getElementById("wl-frame-sidebar")!==null){handleCloseSidebarRequest();return}openSidebar(t,n,e)}})}function openSidebar(t,n,e){addStyle();const i=300,a=document.body,r=getComputedStyle(a).width;sessionStorage.setItem("wlOriginalWidth",r);const s=`calc(${r} - ${i}px)`;a.style.transition="width 0.3s ease",a.style.width=s;const d=document.createElement("iframe");d.id="wl-frame-sidebar",d.src=`${t}?u=${encodeURIComponent(n)}&t=${encodeURIComponent(e)}`,document.body.appendChild(d),sessionStorage.setItem("wlIsSidebarOpen","true")}function addStyle(){const t=document.createElement("style");t.innerText=`
    /* Frame Sidebar */
    #wl-frame-sidebar {
      position: fixed;
      padding: 0;
      margin: 0;
      right: 0;
      z-index: 999999;
      top: 0;
      bottom: 0;
      width: 300px;
      height: 100%;
      border: 0;
      background: #fff;
      box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.15);
    }

    /* Mouse Over */
    .wl-element-mouse-over:hover {
      background: rgba(46, 146, 255, 0.2);
      outline: 1px solid rgba(46, 146, 255, 0.8);
    }

    /* Body */
    body.wl-selecting-element {
      cursor: pointer !important;
    }

    mark[data-markjs='true'] {
      background: initial;
    }
  `,document.head.appendChild(t)}function handleHtmlRequest(t,n){n.source&&n.source.postMessage({type:"html-response",content:document.body.outerHTML},t)}function handleCloseSidebarRequest(){const t=document.getElementById("wl-frame-sidebar");t&&document.body.removeChild(t);const n=document.body,e=sessionStorage.getItem("wlOriginalWidth");e&&(n.style.width=e),setTimeout(()=>{n.style.transition=""},300),sessionStorage.removeItem("wlIsSidebarOpen"),sessionStorage.removeItem("wlOriginalWidth")}function listenForMessage(t){window.addEventListener("message",n=>{const e=t[n.data.type];if(!e)return;(!e.sourceOrigin||e.sourceOrigin.startsWith(n.origin))&&e.callback(n.origin,n)})}function reopenSidebarIfOpen(t,n,e){sessionStorage.getItem("wlIsSidebarOpen")==="true"&&openSidebar(t,n,e)}class Configuration{constructor(){this.jsonLdDisabled=this.getSetting("data-disable-jsonld","disableJsonLd","false")==="true",this.sidebarUrl=this.getSetting("data-sidebar-url","sidebarUrl","https://cloud-sidebar.wordlift.io"),this.webPageUrl=this.getSetting("data-web-page-url","webPageUrl",window.location.href),this.targetOrigin=this.getSetting("data-target-origin","targetOrigin",this.webPageUrl),this.dataFormatter=this.getSetting("data-data-formatter","dataFormatter")}getSetting(n,e,i){if(document.currentScript&&document.currentScript.hasAttribute(n)){const a=document.currentScript.getAttribute(n);if(a!==null)return a}return window._wlCloudSettings&&window._wlCloudSettings[e]?window._wlCloudSettings[e]:i}static getInstance(){return Configuration.instance||(Configuration.instance=new Configuration),Configuration.instance}}main();
