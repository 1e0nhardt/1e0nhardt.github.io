import{L as h,aI as m,k as i,q as s}from"./app-BaE3s2UZ.js";const t=class t extends h(HTMLElement,m){constructor(){super(...arguments),this.Wm=document.createElement("img")}onSetup(){this.$state.img.set(this.Wm)}onConnect(){const{src:r,alt:o,crossOrigin:a}=this.$state;this.Wm.parentNode!==this&&this.prepend(this.Wm),i(()=>{s(this.Wm,"alt",o()),s(this.Wm,"crossorigin",a()),s(this.Wm,"src",r()||"")}),i(()=>{const{loading:n,hidden:c}=this.$state;this.Wm.style.display=n()||c()?"none":""})}};t.tagName="media-poster",t.attrs={crossOrigin:"crossorigin"};let e=t;export{e as MediaPosterElement};
