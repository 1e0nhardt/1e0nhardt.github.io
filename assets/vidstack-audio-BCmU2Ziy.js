import{aJ as i}from"./app-BaE3s2UZ.js";import{H as r,a as s}from"./vidstack-Dgd3Tj9x-CfNql2zs.js";import"./vidstack-Ccp8mxka-CDZloZYK.js";class u extends r{constructor(t,e){super(t,e),this.$$PROVIDER_TYPE="AUDIO",i(()=>{this.airPlay=new s(this.media,e)},this.scope)}get type(){return"audio"}setup(){super.setup(),this.type==="audio"&&this.b.delegate.c("provider-setup",this)}get audio(){return this.a}}export{u as AudioProvider};
