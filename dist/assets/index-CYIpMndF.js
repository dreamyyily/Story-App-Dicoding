var O=t=>{throw TypeError(t)};var P=(t,e,n)=>e.has(t)||O("Cannot "+n);var u=(t,e,n)=>(P(t,e,"read from private field"),n?n.call(t):e.get(t)),h=(t,e,n)=>e.has(t)?O("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),k=(t,e,n,a)=>(P(t,e,"write to private field"),a?a.call(t,n):e.set(t,n),n),y=(t,e,n)=>(P(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const B={BASE_URL:"https://story-api.dicoding.dev/v1"};async function te(t,e){const n=await fetch(`${B.BASE_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),a=await n.json();if(!n.ok)throw new Error(a.message);return localStorage.setItem("token",a.loginResult.token),a}async function ne(t,e,n){const a=await fetch(`${B.BASE_URL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:n})}),i=await a.json();if(!a.ok)throw new Error(i.message);return i}async function j(){const t=localStorage.getItem("token"),n=await(await fetch(`${B.BASE_URL}/stories`,{headers:{Authorization:`Bearer ${t||""}`}})).json();if(n.error===!0)throw new Error(n.message||"Gagal mengambil data cerita");return Array.isArray(n.listStory)?n.listStory:[]}async function ae(t){const e=localStorage.getItem("token"),a=await(await fetch(`${B.BASE_URL}/stories`,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:t})).json();if(a.error===!0)throw new Error(a.message||"Gagal menambah cerita");return a}let D=null;function J(t,e){const n=document.getElementById(t);n._leaflet_id&&(n._leaflet_id=null,n.innerHTML="");const a=L.map(t).setView([-2.5,118],5),i=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}),r=L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg",{attribution:"&copy; Stadia Maps"});return i.addTo(a),L.control.layers({"Peta Jalan":i,Satelit:r}).addTo(a),a.on("click",s=>{D&&a.removeLayer(D),D=L.marker(s.latlng).addTo(a).bindPopup("Lokasi dipilih!<br>Klik lagi untuk ganti.").openPopup(),e(s.latlng)}),setTimeout(()=>a.invalidateSize(),200),{map:a}}const A=(t,e)=>e.some(n=>t instanceof n);let U,V;function ie(){return U||(U=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function re(){return V||(V=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const R=new WeakMap,C=new WeakMap,S=new WeakMap;function se(t){const e=new Promise((n,a)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",s)},r=()=>{n(p(t.result)),i()},s=()=>{a(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",s)});return S.set(e,t),e}function oe(t){if(R.has(t))return;const e=new Promise((n,a)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",s),t.removeEventListener("abort",s)},r=()=>{n(),i()},s=()=>{a(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",s),t.addEventListener("abort",s)});R.set(t,e)}let x={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return R.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Y(t){x=t(x)}function ce(t){return re().includes(t)?function(...e){return t.apply(T(this),e),p(this.request)}:function(...e){return p(t.apply(T(this),e))}}function le(t){return typeof t=="function"?ce(t):(t instanceof IDBTransaction&&oe(t),A(t,ie())?new Proxy(t,x):t)}function p(t){if(t instanceof IDBRequest)return se(t);if(C.has(t))return C.get(t);const e=le(t);return e!==t&&(C.set(t,e),S.set(e,t)),e}const T=t=>S.get(t);function de(t,e,{blocked:n,upgrade:a,blocking:i,terminated:r}={}){const s=indexedDB.open(t,e),o=p(s);return a&&s.addEventListener("upgradeneeded",c=>{a(p(s.result),c.oldVersion,c.newVersion,p(s.transaction),c)}),n&&s.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),o.then(c=>{r&&c.addEventListener("close",()=>r()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}const ue=["get","getKey","getAll","getAllKeys","count"],me=["put","add","delete","clear"],M=new Map;function H(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(M.get(e))return M.get(e);const n=e.replace(/FromIndex$/,""),a=e!==n,i=me.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!(i||ue.includes(n)))return;const r=async function(s,...o){const c=this.transaction(s,i?"readwrite":"readonly");let l=c.store;return a&&(l=l.index(o.shift())),(await Promise.all([l[n](...o),i&&c.done]))[0]};return M.set(e,r),r}Y(t=>({...t,get:(e,n,a)=>H(e,n)||t.get(e,n,a),has:(e,n)=>!!H(e,n)||t.has(e,n)}));const pe=["continue","continuePrimaryKey","advance"],W={},$=new WeakMap,Q=new WeakMap,ge={get(t,e){if(!pe.includes(e))return t[e];let n=W[e];return n||(n=W[e]=function(...a){$.set(this,Q.get(this)[e](...a))}),n}};async function*fe(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,ge);for(Q.set(n,e),S.set(n,T(e));e;)yield n,e=await($.get(n)||e.continue()),$.delete(n)}function _(t,e){return e===Symbol.asyncIterator&&A(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&A(t,[IDBIndex,IDBObjectStore])}Y(t=>({...t,get(e,n,a){return _(e,n)?fe:t.get(e,n,a)},has(e,n){return _(e,n)||t.has(e,n)}}));const he="stories-db",g="favorites",ye=1,E=de(he,ye,{upgrade(t){t.objectStoreNames.contains(g)||t.createObjectStore(g,{keyPath:"id"})}}),v={async getAll(){return(await E).getAll(g)},async get(t){return(await E).get(g,t)},async put(t){return(await E).put(g,t)},async delete(t){return(await E).delete(g,t)}};class ve{async render(){return this.loadHomeStyles(),`
      <section class="container home-page">
        <h1 class="page-title">Daftar Cerita</h1>
        <p class="page-subtitle">Daftar semua cerita pengguna</p>

        <label for="filter" class="visually-hidden">
          Cari cerita berdasarkan nama atau deskripsi
        </label>
        <input 
          type="text" 
          id="filter" 
          placeholder="Cari cerita..." 
          class="search-input"
          aria-label="Cari cerita berdasarkan nama atau deskripsi"
        />

        <div class="content-layout">
          <section class="stories-section" aria-labelledby="stories-heading">
            <h2 id="stories-heading" class="section-title">Daftar Cerita</h2>
            <div id="story-list" class="story-list"></div>
          </section>

          <section class="map-section" aria-labelledby="map-heading">
            <h2 id="map-heading" class="section-title">Peta Lokasi Cerita</h2>
            <div id="map" class="map-container"></div>
          </section>
        </div>
      </section>
    `}loadHomeStyles(){if(document.getElementById("home-styles"))return;const e=document.createElement("link");e.id="home-styles",e.rel="stylesheet",e.href="./styles/home-style.css",document.head.appendChild(e)}async afterRender(){try{const e=await j();await this.renderStories(e),this.initMap(e),this.initFilter(e)}catch(e){console.error("Error loading stories:",e),document.getElementById("story-list").innerHTML="<p>Gagal memuat cerita.</p>"}}async renderStories(e){const n=document.getElementById("story-list");if(!e||e.length===0){n.innerHTML='<p class="no-stories">Tidak ada cerita ditemukan.</p>';return}const i=(await v.getAll()).map(r=>r.id);n.innerHTML=e.map(r=>{const s=new Date(r.createdAt).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),o=i.includes(r.id);return`
        <article class="story-card" tabindex="0">
          <img 
            src="${r.photoUrl}" 
            alt="Foto cerita dari ${r.name}" 
            class="story-image"
            loading="lazy"
          />
          <div class="story-content">
            <h3 class="story-title">${r.name}</h3>
            <time class="story-date" datetime="${r.createdAt}">${s}</time>
            <p class="story-desc">${r.description}</p>
            <button class="btn-favorite" data-id="${r.id}">
              ${o?"Hapus dari Favorit":"Simpan ke Favorit"}
            </button>
          </div>
        </article>
      `}).join(""),this.initFavoriteButtons()}initFavoriteButtons(){document.querySelectorAll(".btn-favorite").forEach(n=>{n.addEventListener("click",async()=>{const a=n.dataset.id,i=await j().then(o=>o.find(c=>c.id===a));if(!i)return;(await v.getAll()).some(o=>o.id===a)?(await v.delete(a),n.textContent="Simpan ke Favorit",alert("Cerita dihapus dari favorit")):(await v.put(i),n.textContent="Hapus dari Favorit",alert("Cerita disimpan ke favorit"))})})}initMap(e){const{map:n}=J("map",()=>{});e.forEach(a=>{a.lat&&a.lon?L.marker([a.lat,a.lon]).addTo(n).bindPopup(`
          <div class="map-popup">
            <h4>${a.name}</h4>
            <p>${a.description}</p>
            ${a.photoUrl?`<img src="${a.photoUrl}" alt="${a.name}" style="max-width: 150px;" />`:""}
          </div>
        `):console.warn(`Cerita ${a.name} tidak memiliki lat/lon yang valid`)})}initFilter(e){document.getElementById("filter").addEventListener("input",a=>{const i=a.target.value.toLowerCase().trim(),r=e.filter(s=>s.name.toLowerCase().includes(i)||s.description.toLowerCase().includes(i));this.renderStories(r)})}}class K{constructor(e=!1){this.isRegister=e}async render(){return`
      <section class="container">
        <h1>${this.isRegister?"Daftar":"Masuk"}</h1>

        <form id="auth-form" aria-describedby="auth-desc">
          <p id="auth-desc" class="visually-hidden">
            Form untuk ${this.isRegister?"mendaftar akun baru":"masuk ke aplikasi"}.
          </p>

          <fieldset>
            <legend class="visually-hidden">
              ${this.isRegister?"Form pendaftaran":"Form login"}
            </legend>

            ${this.isRegister?`
              <div class="form-group">
                <label for="name">Nama</label>
                <input type="text" id="name" name="name" required autocomplete="name"/>
              </div>
            `:""}

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required autocomplete="email"/>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                autocomplete="${this.isRegister?"new-password":"current-password"}"
              />
            </div>
          </fieldset>

          <button 
            type="submit" 
            aria-label="${this.isRegister?"Daftar akun":"Masuk ke akun"}"
            class="btn-submit"
          >
            ${this.isRegister?"Daftar":"Masuk"}
          </button>
        </form>

        <p>
          ${this.isRegister?'Sudah punya akun? <a href="#/login">Masuk</a>':'Belum punya akun? <a href="#/register">Daftar</a>'}
        </p>
      </section>
    `}async afterRender(){document.getElementById("auth-form").addEventListener("submit",async e=>{e.preventDefault();const n=document.getElementById("email").value,a=document.getElementById("password").value,i=this.isRegister?document.getElementById("name").value:null;try{this.isRegister?await ne(i,n,a):await te(n,a),window.location.hash="/"}catch(r){alert(r.message)}})}}class we{async render(){return this.loadStoryFormPageStyles(),`
      <section class="container">
        <div class="form-header">
          <h1 class="form-title">Tambah Cerita Baru</h1>
          <h2 class="visually-hidden">Formulir untuk menambahkan cerita baru dengan foto dan lokasi</h2>
          <p class="form-subtitle">Bagikan pengalaman dan momen berharga Anda</p>
        </div>
        
        <form id="storyForm" class="story-form">
          <!-- Deskripsi Section -->
          <div class="form-section">
            <label for="desc" class="form-label">Cerita Anda</label>
            <textarea 
              id="desc" 
              class="form-textarea" 
              placeholder="Tuliskan cerita atau pengalaman Anda di sini..." 
              rows="5"
              required
            ></textarea>
          </div>

          <!-- Foto Section -->
          <div class="form-section">
            <label for="photo" class="form-label">Foto</label>
            <div class="photo-options">
              <div class="file-upload-wrapper">
                <input type="file" id="photo" accept="image/*" class="file-input" />
                <label for="photo" class="upload-btn">
                  <span class="btn-text">Unggah Foto</span>
                </label>
              </div>
              
              <button type="button" id="camera" class="camera-btn">
                <span class="btn-text">Ambil Foto</span>
              </button>
            </div>

            <!-- Camera Preview -->
            <div class="camera-section" id="cameraSection" hidden>
              <video id="cam" class="camera-preview" autoplay playsinline></video>
              <div class="camera-controls">
                <button type="button" id="captureBtn" class="capture-btn">Ambil Gambar</button>
                <button type="button" id="cancelCamera" class="cancel-btn">Batal</button>
              </div>
            </div>

            <!-- Image Preview -->
            <div class="preview-section" id="previewSection" hidden>
              <img id="preview" class="image-preview" />
              <button type="button" id="removePreview" class="remove-btn">Hapus</button>
            </div>
            
            <canvas id="canvas" hidden></canvas>
          </div>

          <!-- Lokasi Section -->
          <div class="form-section">
            <label class="form-label">Lokasi</label>
            
            <p id="map-desc" class="map-instruction">
              Klik peta untuk memilih lokasi cerita Anda
            </p>

            <div 
              id="map" 
              class="map-container"
              role="application"
              aria-label="Peta interaktif untuk memilih lokasi cerita"
              aria-describedby="map-desc"
            ></div>

            <!-- Koordinat -->
            <div class="coordinates">
              <div class="coordinate-item">
                <label for="latDisplay">Latitude:</label>
                <span id="latDisplay" aria-live="polite">-</span>
                <input type="hidden" id="lat" name="lat">
              </div>
              <div class="coordinate-item">
                <label for="lonDisplay">Longitude:</label>
                <span id="lonDisplay" aria-live="polite">-</span>
                <input type="hidden" id="lon" name="lon">
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn" aria-label="Kirim cerita">
              <span class="btn-text">Kirim Cerita</span>
              <span class="btn-loading" hidden>Loading...</span>
            </button>
          </div>
        </form>
      </section>
    `}loadStoryFormPageStyles(){if(document.getElementById("story-form-style"))return;const e=document.createElement("link");e.id="story-form-style",e.rel="stylesheet",e.href="./styles/story-form-style.css",document.head.appendChild(e)}async afterRender(){window.currentStoryMarker&&(window.currentStoryMarker.remove(),window.currentStoryMarker=null),document.getElementById("latDisplay").textContent="-",document.getElementById("lonDisplay").textContent="-",document.getElementById("lat").value="",document.getElementById("lon").value="",this.initCamera(),this.initMap(),this.setupEventListeners()}setupEventListeners(){const e=document.getElementById("storyForm"),n=document.getElementById("photo");document.getElementById("previewSection"),document.getElementById("preview");const a=document.getElementById("removePreview");n.addEventListener("change",i=>{const r=i.target.files[0];r&&this.showImagePreview(URL.createObjectURL(r))}),a.addEventListener("click",()=>{this.hideImagePreview(),n.value=""}),e.addEventListener("submit",async i=>{i.preventDefault(),await this.handleFormSubmit()})}initCamera(){const e=document.getElementById("camera"),n=document.getElementById("cancelCamera"),a=document.getElementById("captureBtn"),i=document.getElementById("cam"),r=document.getElementById("canvas"),s=document.getElementById("cameraSection");document.getElementById("previewSection");let o=null;e.addEventListener("click",async()=>{try{o=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),i.srcObject=o,s.hidden=!1,e.disabled=!0}catch(c){alert("Tidak dapat mengakses kamera: "+c.message)}}),n.addEventListener("click",()=>{this.stopCamera(o),s.hidden=!0,e.disabled=!1}),a.addEventListener("click",()=>{r.width=i.videoWidth,r.height=i.videoHeight,r.getContext("2d").drawImage(i,0,0),this.showImagePreview(r.toDataURL("image/jpeg")),this.stopCamera(o),s.hidden=!0,e.disabled=!1})}stopCamera(e){e&&e.getTracks().forEach(n=>n.stop())}showImagePreview(e){const n=document.getElementById("previewSection"),a=document.getElementById("preview");a.src=e,n.hidden=!1}hideImagePreview(){const e=document.getElementById("previewSection");e.hidden=!0}initMap(){const{map:e}=J("map",n=>{const a=n.lat.toFixed(6),i=n.lng.toFixed(6);document.getElementById("lat").value=a,document.getElementById("lon").value=i,document.getElementById("latDisplay").textContent=a,document.getElementById("lonDisplay").textContent=i,window.currentStoryMarker&&e.removeLayer(window.currentStoryMarker),window.currentStoryMarker=L.marker([a,i]).addTo(e).bindPopup("<strong>Lokasi cerita dipilih!</strong><br>Klik lagi untuk ganti lokasi.").openPopup(),e.setView([a,i],13)});e.setView([-2.5,118],5)}async handleFormSubmit(){const n=document.getElementById("storyForm").querySelector(".submit-btn"),a=n.querySelector(".btn-text"),i=n.querySelector(".btn-loading");n.disabled=!0,a.hidden=!0,i.hidden=!1;const r=new FormData;r.append("description",document.getElementById("desc").value.trim()),r.append("lat",document.getElementById("lat").value),r.append("lon",document.getElementById("lon").value);const s=document.getElementById("photo"),o=document.getElementById("preview");let c;if(s.files[0])c=s.files[0];else if(o.src&&o.src.startsWith("data:"))c=this.dataURLtoFile(o.src,"story_photo.jpg");else{alert("Silakan tambahkan foto terlebih dahulu"),this.resetSubmitButton(n,a,i);return}r.append("photo",c);try{const l=await ae(r);"serviceWorker"in navigator&&"PushManager"in window&&navigator.serviceWorker.ready.then(ee=>{ee.active.postMessage({type:"NEW_STORY",payload:{title:"Cerita Baru!",body:`"${document.getElementById("desc").value.trim().substring(0,50)}..."`,icon:"/icons/icon-192.png",url:"/"}})}),alert("Cerita berhasil ditambahkan!"),window.location.hash="/"}catch(l){alert("Gagal menambahkan cerita: "+l.message),this.resetSubmitButton(n,a,i)}}resetSubmitButton(e,n,a){e.disabled=!1,n.hidden=!1,a.hidden=!0}dataURLtoFile(e,n){const a=e.split(","),i=a[0].match(/:(.*?);/)[1],r=atob(a[1]);let s=r.length;const o=new Uint8Array(s);for(;s--;)o[s]=r.charCodeAt(s);return new File([o],n,{type:i})}}function q(){return location.hash.replace("#","")||"/"}class be{async render(){return this.loadProfileStyles(),`
      <section class="container" aria-labelledby="profile-heading">
        <h1 id="profile-heading">Profil Pengguna</h1>

        ${!!localStorage.getItem("token")?this.renderLoggedInView():this.renderLoggedOutView()}
      </section>
    `}loadProfileStyles(){if(document.getElementById("profile-styles"))return;const e=document.createElement("link");e.id="profile-styles",e.rel="stylesheet",e.href="./styles/profile-style.css",e.type="text/css",document.head.appendChild(e)}renderLoggedInView(){return`
      <div class="profile-info" role="region" aria-label="Status login pengguna">
        <p class="status-info">
          <strong>Status:</strong> 
          <span class="status-login" aria-live="polite">Login (terautentikasi)</span>
        </p>
        
        <button 
          id="logout-btn" 
          class="btn-logout" 
          type="button"
          aria-label="Keluar dari akun"
        >
          Logout
        </button>
      </div>
    `}renderLoggedOutView(){return`
      <div class="login-prompt" role="alert">
        <p>Kamu belum login.</p>
        <div class="auth-links">
          <a href="#/login" class="auth-link">Masuk</a>
          <span aria-hidden="true"> | </span>
          <a href="#/register" class="auth-link">Daftar</a>
        </div>
      </div>
    `}async afterRender(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",()=>{confirm("Yakin ingin logout?")&&(localStorage.removeItem("token"),alert("Berhasil logout!"),window.location.hash="/login")})}}class ke{async render(){return`
      <section class="container">
        <h1>Favoritku</h1>
        <div id="favorites-list"></div>
      </section>
    `}async afterRender(){const e=await v.getAll(),n=document.getElementById("favorites-list");if(!e||e.length===0){n.innerHTML="<p>Tidak ada cerita favorit.</p>";return}n.innerHTML=e.map(a=>`
      <article class="story-card">
        <img src="${a.photoUrl}" alt="${a.name}">
        <h3>${a.name}</h3>
        <p>${a.description}</p>
      </article>
    `).join("")}}const z={"/":()=>new ve,"/login":()=>new K(!1),"/register":()=>new K(!0),"/add":()=>new we,"/profile":()=>new be,"/favorites":()=>new ke};var b,f,m,d,X,N,Z;class Ee{constructor({navigationDrawer:e,drawerButton:n,content:a}){h(this,d);h(this,b,null);h(this,f,null);h(this,m,null);k(this,b,a),k(this,f,n),k(this,m,e),y(this,d,X).call(this),y(this,d,Z).call(this)}async renderPage(){const e=q(),a=(z[e]||z["/"])();u(this,b).innerHTML=await a.render(),await a.afterRender()}}b=new WeakMap,f=new WeakMap,m=new WeakMap,d=new WeakSet,X=function(){u(this,f).addEventListener("click",()=>{u(this,m).classList.toggle("open")}),document.body.addEventListener("click",e=>{!u(this,m).contains(e.target)&&!u(this,f).contains(e.target)&&u(this,m).classList.remove("open")})},N=function(){const e=localStorage.getItem("token"),n=q();return["/","/add","/profile"].includes(n)&&!e?(window.location.hash="/login",!1):e&&(n==="/login"||n==="/register")?(window.location.hash="/",!1):!0},Z=function(){window.addEventListener("hashchange",()=>{y(this,d,N).call(this)&&this.renderPage()}),window.addEventListener("load",()=>{y(this,d,N).call(this)&&this.renderPage()})};class w{static async requestPermission(){if(!("Notification"in window)){alert("Browser tidak mendukung notifikasi.");return}await Notification.requestPermission()==="granted"?this.showNotification("Notifikasi diaktifkan ✅"):alert("Izin notifikasi ditolak ❌")}static showNotification(e){Notification.permission==="granted"&&new Notification("MyApp",{body:e,icon:"/icons/icon-192.png"})}}new Ee({navigationDrawer:document.getElementById("navigation-drawer"),drawerButton:document.getElementById("drawer-button"),content:document.getElementById("main-content")});let I;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),I=t;const e=document.getElementById("btn-install");e&&(e.style.display="block",e.addEventListener("click",async()=>{I.prompt();const{outcome:n}=await I.userChoice;console.log("User response:",n),I=null,e.style.display="none"}))});const F=document.getElementById("push-toggle");F&&F.addEventListener("click",async()=>{F.checked?(await w.requestPermission(),w.showNotification("Notifikasi diaktifkan!")):w.showNotification("Notifikasi dimatikan ❌")});const G=document.getElementById("subscribe-btn");G&&G.addEventListener("click",async()=>{await w.requestPermission(),w.showNotification("Notifikasi berhasil diaktifkan!")});"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(t=>console.log("Service Worker registered:",t)).catch(t=>console.error("SW registration failed:",t));
