import{a_ as M,j as m,a$ as N,p as _,b0 as E,M as v,k as R,aR as p,aZ as b,aY as x,aS as g,b1 as $,b2 as F,aU as C,b3 as j,aT as D,b4 as I,b5 as K,E as O,Q}from"./app-BaE3s2UZ.js";import{VideoProvider as P}from"./vidstack-video-BUh9H2Q0.js";import{R as H}from"./vidstack-Ccp8mxka-CDZloZYK.js";import"./vidstack-Dgd3Tj9x-CfNql2zs.js";function S(h){try{return new Intl.DisplayNames(navigator.languages,{type:"language"}).of(h)??null}catch{return null}}const G=h=>`dash-${Q(h)}`;class V{constructor(t,i){this.m=t,this.b=i,this.d=null,this.qb=null,this.rb={},this.sb=new Set,this.Kb=null,this.oe={},this.na=-1}get instance(){return this.d}setup(t){this.d=t().create();const i=this.Ii.bind(this);for(const e of Object.values(t.events))this.d.on(e,i);this.d.on(t.events.ERROR,this.Q.bind(this));for(const e of this.sb)e(this.d);this.b.player.dispatch("dash-instance",{detail:this.d}),this.d.initialize(this.m,void 0,!1),this.d.updateSettings({streaming:{text:{defaultEnabled:!1,dispatchForManualRendering:!0},buffer:{fastSwitchEnabled:!0}},...this.rb}),this.d.on(t.events.FRAGMENT_LOADING_STARTED,this.Ji.bind(this)),this.d.on(t.events.FRAGMENT_LOADING_COMPLETED,this.Ki.bind(this)),this.d.on(t.events.MANIFEST_LOADED,this.Li.bind(this)),this.d.on(t.events.QUALITY_CHANGE_RENDERED,this.Za.bind(this)),this.d.on(t.events.TEXT_TRACKS_ADDED,this.Mi.bind(this)),this.d.on(t.events.TRACK_CHANGE_RENDERED,this.pc.bind(this)),this.b.qualities[E.Ia]=this.je.bind(this),v(this.b.qualities,"change",this.ke.bind(this)),v(this.b.audioTracks,"change",this.le.bind(this)),this.qb=R(this.me.bind(this))}aa(t){return new p(G(t.type),{detail:t})}me(){if(!this.b.$state.live())return;const t=new H(this.ne.bind(this));return t.Xa(),t.$.bind(t)}ne(){if(!this.d)return;const t=this.d.duration()-this.d.time();this.b.$state.liveSyncPosition.set(isNaN(t)?1/0:t)}Ii(t){var i;(i=this.b.player)==null||i.dispatch(this.aa(t))}Ni(t){var n;const i=(n=this.Kb)==null?void 0:n[b._],e=(i==null?void 0:i.track).cues;if(!i||!e)return;const a=this.Kb.id,r=this.oe[a]??0,d=this.aa(t);for(let o=r;o<e.length;o++){const u=e[o];u.positionAlign||(u.positionAlign="auto"),this.Kb.addCue(u,d)}this.oe[a]=e.length}Mi(t){var r;if(!this.d)return;const i=t.tracks,e=[...this.m.textTracks].filter(d=>"manualMode"in d),a=this.aa(t);for(let d=0;d<e.length;d++){const n=i[d],o=e[d],u=`dash-${n.kind}-${d}`,c=new x({id:u,label:(n==null?void 0:n.label)??((r=n.labels.find(s=>s.text))==null?void 0:r.text)??((n==null?void 0:n.lang)&&S(n.lang))??(n==null?void 0:n.lang)??void 0,language:n.lang??void 0,kind:n.kind,default:n.defaultTrack});c[b._]={managed:!0,track:o},c[b.ma]=2,c[b.hb]=()=>{this.d&&(c.mode==="showing"?(this.d.setTextTrack(d),this.Kb=c):(this.d.setTextTrack(-1),this.Kb=null))},this.b.textTracks.add(c,a)}}pc(t){const{mediaType:i,newMediaInfo:e}=t;if(i==="audio"){const a=this.b.audioTracks.getById(`dash-audio-${e.index}`);if(a){const r=this.aa(t);this.b.audioTracks[g.ea](a,!0,r)}}}Za(t){if(t.mediaType!=="video")return;const i=this.b.qualities[t.newQuality];if(i){const e=this.aa(t);this.b.qualities[g.ea](i,!0,e)}}Li(t){if(this.b.$state.canPlay()||!this.d)return;const{type:i,mediaPresentationDuration:e}=t.data,a=this.aa(t);this.b.delegate.c("stream-type-change",i!=="static"?"live":"on-demand",a),this.b.delegate.c("duration-change",e,a),this.b.qualities[E.Wa](!0,a);const r=this.d.getVideoElement(),d=this.d.getTracksForTypeFromManifest("video",t.data),n=[...new Set(d.map(s=>s.mimeType))].find(s=>s&&$(r,s)),o=d.filter(s=>n===s.mimeType)[0];let u=this.d.getTracksForTypeFromManifest("audio",t.data);const c=[...new Set(u.map(s=>s.mimeType))].find(s=>s&&F(r,s));if(u=u.filter(s=>c===s.mimeType),o.bitrateList.forEach((s,f)=>{var l;const T={id:((l=s.id)==null?void 0:l.toString())??`dash-bitrate-${f}`,width:s.width??0,height:s.height??0,bitrate:s.bandwidth??0,codec:o.codec,index:f};this.b.qualities[g.da](T,a)}),C(o.index)){const s=this.b.qualities[o.index];s&&this.b.qualities[g.ea](s,!0,a)}u.forEach((s,f)=>{const l=s.labels.find(w=>navigator.languages.some(A=>w.lang&&A.toLowerCase().startsWith(w.lang.toLowerCase())))||s.labels[0],q={id:`dash-audio-${s==null?void 0:s.index}`,label:(l==null?void 0:l.text)??(s.lang&&S(s.lang))??s.lang??"",language:s.lang??"",kind:"main",mimeType:s.mimeType,codec:s.codec,index:f};this.b.audioTracks[g.da](q,a)}),r.dispatchEvent(new p("canplay",{trigger:a}))}Q(t){const{type:i,error:e}=t;switch(e.code){case 27:this.pe(e);break;default:this.qc(e);break}}Ji(){this.na>=0&&this._a()}Ki(t){t.mediaType==="text"&&requestAnimationFrame(this.Ni.bind(this,t))}pe(t){var i;this._a(),(i=this.d)==null||i.play(),this.na=window.setTimeout(()=>{this.na=-1,this.qc(t)},5e3)}_a(){clearTimeout(this.na),this.na=-1}qc(t){this.b.delegate.c("error",{message:t.message??"",code:1,error:t})}je(){var i;this.lg("video",!0);const{qualities:t}=this.b;(i=this.d)==null||i.setQualityFor("video",t.selectedIndex,!0)}lg(t,i){var e;(e=this.d)==null||e.updateSettings({streaming:{abr:{autoSwitchBitrate:{[t]:i}}}})}ke(){const{qualities:t}=this.b;!this.d||t.auto||!t.selected||(this.lg("video",!1),this.d.setQualityFor("video",t.selectedIndex,t.switch==="current"),j&&(this.m.currentTime=this.m.currentTime))}le(){if(!this.d)return;const{audioTracks:t}=this.b,i=this.d.getTracksFor("audio").find(e=>t.selected&&t.selected.id===`dash-audio-${e.index}`);i&&this.d.setCurrentTrack(i)}z(){this._a(),this.Kb=null,this.oe={}}loadSource(t){var i;this.z(),m(t.src)&&((i=this.d)==null||i.attachSource(t.src))}destroy(){var t,i;this.z(),(t=this.d)==null||t.destroy(),this.d=null,(i=this.qb)==null||i.call(this),this.qb=null}}class z{constructor(t,i,e){this.L=t,this.b=i,this.La=e,this.qe()}async qe(){const t={onLoadStart:this.Ma.bind(this),onLoaded:this.tb.bind(this),onLoadError:this.re.bind(this)};let i=await U(this.L,t);if(D(i)&&!m(this.L)&&(i=await J(this.L,t)),!i)return null;if(!window.dashjs.supportsMediaSource()){const e="[vidstack] `dash.js` is not supported in this environment";return this.b.player.dispatch(new p("dash-unsupported")),this.b.delegate.c("error",{message:e,code:4}),null}return i}Ma(){this.b.player.dispatch(new p("dash-lib-load-start"))}tb(t){this.b.player.dispatch(new p("dash-lib-loaded",{detail:t})),this.La(t)}re(t){const i=I(t);this.b.player.dispatch(new p("dash-lib-load-error",{detail:i})),this.b.delegate.c("error",{message:i.message,code:4,error:i})}}async function J(h,t={}){var i,e,a,r,d;if(!D(h)){if((i=t.onLoadStart)==null||i.call(t),h.prototype&&h.prototype!==Function)return(e=t.onLoaded)==null||e.call(t,h),h;try{const n=(a=await h())==null?void 0:a.default;if(n)(r=t.onLoaded)==null||r.call(t,n);else throw Error("");return n}catch(n){(d=t.onLoadError)==null||d.call(t,n)}}}async function U(h,t={}){var i,e,a;if(m(h)){(i=t.onLoadStart)==null||i.call(t);try{if(await K(h),!O(window.dashjs.MediaPlayer))throw Error("");const r=window.dashjs.MediaPlayer;return(e=t.onLoaded)==null||e.call(t,r),r}catch(r){(a=t.onLoadError)==null||a.call(t,r)}}}const Y="https://cdn.jsdelivr.net",y=class y extends P{constructor(){super(...arguments),this.$$PROVIDER_TYPE="DASH",this.rc=null,this.e=new V(this.video,this.b),this.oa=`${Y}/npm/dashjs@4.7.4/dist/dash.all.min.js`}get ctor(){return this.rc}get instance(){return this.e.instance}get type(){return"dash"}get canLiveSync(){return!0}get config(){return this.e.rb}set config(t){this.e.rb=t}get library(){return this.oa}set library(t){this.oa=t}preconnect(){m(this.oa)&&N(this.oa)}setup(){super.setup(),new z(this.oa,this.b,t=>{this.rc=t,this.e.setup(t),this.b.delegate.c("provider-setup",this);const i=_(this.b.$state.source);i&&this.loadSource(i)})}async loadSource(t,i){if(!m(t.src)){this.oc();return}this.a.preload=i||"",this.ge(t,"application/x-mpegurl"),this.e.loadSource(t),this.K=t}onInstance(t){const i=this.e.instance;return i&&t(i),this.e.sb.add(t),()=>this.e.sb.delete(t)}destroy(){this.e.destroy()}};y.supported=M();let L=y;export{L as DASHProvider};
