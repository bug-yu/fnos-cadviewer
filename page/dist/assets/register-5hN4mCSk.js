import{_ as D}from"./vite-preload-CAQj6dvO.js";import{u as f,t as $e,C as oe,y as O,v as m,H as ye,x as je,l as z,a as x,c as re,V as ge,_ as Ye,d as ie,$ as F,b as E,e as Ze,f as qe,I as xe,g as ke,h as we,i as Pe,Z as le,q as A,k as Xe,m as w,Y as Qe,D as Je,T as et,z as tt,Q as at,B as se,N as ot,F as rt,O as it,n as lt,o as st,p as nt,r as Ce,w as dt,A as ct,G as ut,J as ht,K as mt,L as pt,M as bt,P as vt,S as ft,U as Me,W as yt,X as ne,a0 as gt,a1 as xt,a2 as kt,a3 as wt,a4 as Pt,a5 as Ct,a6 as Mt,a7 as Et,a8 as Tt,a9 as St,aa as Lt,ab as Ee,ac as Te,ad as It,ae as Ot,af as Se,ag as Le,ah as Dt,ai as zt,aj as At,ak as Rt,al as Nt,am as Bt,an as Vt,ao as _t,ap as Ut,aq as Ht,ar as Ft,as as Gt,at as Kt,au as Wt,av as $t,aw as de,ax as jt,ay as Yt,az as Zt,aA as ce,aB as qt,aC as Xt,aD as Qt,E as Jt,R as Ie,s as ea,j as v}from"./cad-simple-viewer-Fq9btEWw.js";import{N as V,E as L,r as I,$ as ta,I as aa}from"./data-model-Db44RVy_.js";const oa="HtmlPlugin",ra=["-chtml","chtml"];let R={};function ia(r,e){e&&(R={...R,...e});const t={...R};r.registerLazyPlugin({name:oa,triggers:[...ra],loader:async()=>{const{createHtmlPlugin:a}=await D(async()=>{const{createHtmlPlugin:o}=await import("./cad-html-plugin-CnABibFH.js");return{createHtmlPlugin:o}},[],import.meta.url);return a(t)}})}const la="PdfPlugin",sa=["-cpdf","cpdf","ipdf"];function na(r,e={}){const t=e.disableExport===!0,a=t?["ipdf"]:[...sa];r.registerLazyPlugin({name:la,triggers:[...a],loader:async()=>{const{createPdfPlugin:o}=await D(async()=>{const{createPdfPlugin:i}=await import("./cad-pdf-plugin-CTTZCK38.js");return{createPdfPlugin:i}},[],import.meta.url);return o({disableExport:t})}})}async function Oe(r,e={}){const{acuiCreateSimpleUiPlugin:t}=await D(async()=>{const{acuiCreateSimpleUiPlugin:a}=await Promise.resolve().then(()=>oo);return{acuiCreateSimpleUiPlugin:a}},void 0,import.meta.url);await r.loadPlugin(t(e))}const da="1.7.3",ca={version:da};class ue{constructor(e,t="layers"){this.dockPanel=e,this.layersTabId=t,this.handleCloseLayerManager=()=>{this.hide()},le.on("close-layer-manager",this.handleCloseLayerManager)}toggleFromCommand(){this.dockPanel.hasTab(this.layersTabId)&&this.dockPanel.open(this.layersTabId)}hide(){this.dockPanel.close()}refreshLocale(){this.dockPanel.refreshLocale()}destroy(){le.off("close-layer-manager",this.handleCloseLayerManager)}}class ua{toggleFromCommand(){var e;(e=this.current)==null||e.toggleFromCommand()}hide(){var e;(e=this.current)==null||e.hide()}refreshLocale(){var e;(e=this.current)==null||e.refreshLocale()}}class ha extends F{constructor(e){super(),this.actions=e}async execute(e){this.actions.prepare(),this.actions.toggle()}}class ma extends F{constructor(e){super(),this.actions=e}async execute(e){this.actions.prepare(),this.actions.toggle()}}class pa extends F{constructor(e){super(),this.actions=e}async execute(e){this.actions.prepare(),this.actions.toggle()}}function _(r,e){return[e,{type:"separator",id:"toolbar-layout-switcher-separator"},...r]}const ba=["select","pan"];function va(r){if(r==="phone")return{enabled:!0,placement:"bottom",items:"default",collapsible:!1,defaultCollapsed:!1,edgeOffset:0,sideOffset:0,showLabels:!0,size:"stretch",overflow:"menu",showBorder:!0,showButtonBorder:!1,showSeparators:!0,showChildrenIndicator:!1,subToolbar:{showLabels:!0,showSeparators:!1,size:"stretch",overflow:"wrap",replaceOnNested:!0}};const e={enabled:!0,placement:"right",items:"default",collapsible:!1,defaultCollapsed:!1,edgeOffset:8,sideOffset:0,showLabels:!1,size:"auto",overflow:"menu",showBorder:!0,showButtonBorder:!1,showSeparators:!0,showChildrenIndicator:!0,subToolbar:{replaceOnNested:!1}};return r==="pad"?{...e,excludeItems:[...ba]}:e}const fa=["mountTarget","enabled","inCanvasParent","showButtonBorder"];function De(r,e,t){const a=va(r),o={};if(e)if(r==="phone")for(const i of fa)e[i]!==void 0&&(o[i]=e[i]);else Object.assign(o,e);return{...a,...o,...t}}function ya(r={}){var e,t,a,o,i,l,s,n,c,d,u,b,h,p,y,S,Y,Z,q,X,Q,J,ee,te;const ae=((e=r.dockPanel)==null?void 0:e.enabled)===!0;return{host:r.host,layout:r.layout??"auto",layouts:r.layouts??{},dockPanel:{enabled:ae,defaultOpen:((t=r.dockPanel)==null?void 0:t.defaultOpen)??!1,defaultSide:((a=r.dockPanel)==null?void 0:a.defaultSide)??"left",defaultHeight:((o=r.dockPanel)==null?void 0:o.defaultHeight)??240,defaultWidth:((i=r.dockPanel)==null?void 0:i.defaultWidth)??280},toolbar:{enabled:((l=r.toolbar)==null?void 0:l.enabled)===!1?!1:((s=r.toolbar)==null?void 0:s.enabled)??!0,placement:((n=r.toolbar)==null?void 0:n.placement)??"right",items:((c=r.toolbar)==null?void 0:c.items)??"default",...r.toolbar&&"excludeItems"in r.toolbar?{excludeItems:r.toolbar.excludeItems}:{},appendItems:(d=r.toolbar)==null?void 0:d.appendItems,appendItemsAfter:(u=r.toolbar)==null?void 0:u.appendItemsAfter,appendItemsBefore:(b=r.toolbar)==null?void 0:b.appendItemsBefore,collapsible:((h=r.toolbar)==null?void 0:h.collapsible)??!1,defaultCollapsed:((p=r.toolbar)==null?void 0:p.defaultCollapsed)??!1,edgeOffset:((y=r.toolbar)==null?void 0:y.edgeOffset)??8,sideOffset:((S=r.toolbar)==null?void 0:S.sideOffset)??0,showLabels:(Y=r.toolbar)==null?void 0:Y.showLabels,size:(Z=r.toolbar)==null?void 0:Z.size,overflow:(q=r.toolbar)==null?void 0:q.overflow,showBorder:((X=r.toolbar)==null?void 0:X.showBorder)??!0,showButtonBorder:((Q=r.toolbar)==null?void 0:Q.showButtonBorder)??!1,showSeparators:((J=r.toolbar)==null?void 0:J.showSeparators)??!0,inCanvasParent:((ee=r.toolbar)==null?void 0:ee.inCanvasParent)===!0,subToolbar:(te=r.toolbar)==null?void 0:te.subToolbar},shouldCreateDockPanel:ae}}const ga=["ml-ex-ui-dock-main","ml-ex-ui-toolbar-main"];function ze(r,e,t=ga){let a=r;for(;a!==e&&a.parentElement&&t.some(o=>{var i;return((i=a.classList)==null?void 0:i.contains(o))===!0});)a=a.parentElement;return a}function N(r,e){var t;if(e)return e;const a=(t=m.instance.curView)==null?void 0:t.container,o=a==null?void 0:a.parentElement;return o&&(o===r||r.contains(o))?ze(o,r):r}function xa(){var r,e;const t=(r=m.instance.curDocument)==null?void 0:r.database,a=(e=t==null?void 0:t.objects)==null?void 0:e.layout;if(!t||!(a!=null&&a.newIterator))return[];const o=[];for(const i of t.objects.layout.newIterator())o.push({name:i.layoutName,tabOrder:i.tabOrder,blockTableRecordId:i.blockTableRecordId,isActive:i.blockTableRecordId===t.currentSpaceId});return o.sort((i,l)=>i.tabOrder-l.tabOrder),o}function ka(r){aa().layoutManager.setCurrentLayoutBtrId(r)}function wa(){return xa().map(r=>({id:`layout-${r.blockTableRecordId}`,label:r.name,action:()=>ka(r.blockTableRecordId),toggle:{getValue:()=>{var e;const t=(e=m.instance.curDocument)==null?void 0:e.database;return(t==null?void 0:t.currentSpaceId)===r.blockTableRecordId},on:{},off:{}}}))}function Ae(){return kt({id:"layout",label:"toolbar.layout",icon:wt,requiresDocument:!0,childrenUi:"menu",children:[]},wa)}const Pa=["top","bottom","left","right"],Ca={top:xe,bottom:ke,left:we,right:Pe},Ma={top:"toolbar.placementTop",bottom:"toolbar.placementBottom",left:"toolbar.placementLeft",right:"toolbar.placementRight"};function Ea(r){return{id:"toolbar-placement",label:"toolbar.placement",icon:jt,requiresDocument:!1,childrenUi:"toolbar",childIcon:"selected",selectedChildId:`placement-${(r==null?void 0:r.getPlacement())??"right"}`,children:Pa.map(e=>({id:`placement-${e}`,label:Ma[e],icon:Ca[e],requiresDocument:!1,action:()=>r==null?void 0:r.setPlacement(e)}))}}const Ta=["en","zh","cs","tr","ar"],Sa={en:"EN",zh:"中",cs:"CS",tr:"TR",ar:"AR"},La={en:"toolbar.localeEn",zh:"toolbar.localeZh",cs:"toolbar.localeCs",tr:"toolbar.localeTr",ar:"toolbar.localeAr"};function Ia(r){return`<span class="ml-ex-ui-locale-badge">${r}</span>`}function Oa(r){const e=(r==null?void 0:r.getLocale())??"en";return{id:"locale",label:"toolbar.locale",icon:qt,requiresDocument:!1,childrenUi:"toolbar",childIcon:"selected",selectedChildId:`locale-${e}`,children:Ta.map(t=>({id:`locale-${t}`,label:La[t],icon:Ia(Sa[t]),requiresDocument:!1,action:()=>r==null?void 0:r.setLocale(t)}))}}function Da(r){const e=()=>(r==null?void 0:r.getTheme())??"light",t=()=>{const a=e()==="dark"?"light":"dark";r==null||r.setTheme(a)};return{id:"theme",requiresDocument:!1,toggle:{getValue:()=>e()==="light",on:{label:"toolbar.themeLight",icon:Zt,action:t},off:{label:"toolbar.themeDark",icon:Yt,action:t}}}}function za(){const r=()=>O.instance.toggle("useSimulatedMouseOnTouch");return{id:"simulated-mouse",requiresDocument:!1,toggle:{getValue:()=>!!O.instance.get("useSimulatedMouseOnTouch"),on:{label:"toolbar.simulatedMouseOn",icon:de,action:r},off:{label:"toolbar.simulatedMouseOff",icon:de,action:r}}}}function Re(){try{return m.instance.isReadingModeEnabled()}catch{return!1}}function Aa(){return{id:"reading-mode",requiresDocument:!0,toggle:{getValue:Re,on:{label:"toolbar.readingMode",icon:ce,command:"readingmode"},off:{label:"toolbar.readingMode",icon:ce,command:"readingmode"}}}}function Ne(){return{id:"measure",label:"toolbar.measure",icon:Dt,childrenUi:"toolbar",children:[{id:"measure-distance",label:"toolbar.measureDistance",icon:Pt,command:"measuredistance"},{id:"measure-continuous",label:"toolbar.measureContinuous",icon:Ct,command:"measurecontinuous"},{id:"measure-angle",label:"toolbar.measureAngle",icon:Mt,command:"measureangle"},{id:"measure-area",label:"toolbar.measureArea",icon:Et,command:"measurearea"},{id:"measure-arc",label:"toolbar.measureArc",icon:Tt,command:"measurearc"},{id:"measure-point",label:"toolbar.measurePoint",icon:St,command:"measurepoint"},{id:"measurement-panel",label:"toolbar.measurementPanel",icon:Lt,command:"measurementpanel"},{id:"measurement-vis",toggle:{getValue:It,on:{label:"toolbar.showMeasurements",icon:Te,command:"measurementvis"},off:{label:"toolbar.hideMeasurements",icon:Ee,command:"measurementvis"}}},{id:"clear-measurements",label:"toolbar.clearMeasurements",icon:Ot,command:"clearmeasurements"},{type:"separator",id:"sep-measure-import-export"},{id:"measurement-import",label:"toolbar.measurementImport",icon:Se,command:"measurementimport"},{id:"measurement-export",label:"toolbar.measurementExport",icon:Le,command:"measurementexport"}]}}function Be(){return{id:"annotation",label:"toolbar.annotation",icon:Kt,minOpenMode:Gt.Review,childrenUi:"toolbar",children:[{id:"markup-cloud",label:"toolbar.markupCloud",icon:zt,command:"markupcloud"},{id:"markup-callout",label:"toolbar.markupCallout",icon:At,command:"markupcallout"},{id:"markup-text",label:"toolbar.markupText",icon:Rt,command:"markuptext"},{id:"markup-rect",label:"toolbar.markupRect",icon:Nt,command:"markuprect"},{id:"markup-circle",label:"toolbar.markupCircle",icon:Bt,command:"markupcircle"},{id:"markup-arrow",label:"toolbar.markupArrow",icon:Vt,command:"markuparrow"},{id:"markup-stamp",label:"toolbar.markupStamp",icon:_t,command:"markupstamp"},{id:"markup-panel",label:"toolbar.markupPanel",icon:Ut,command:"markuppanel"},{id:"markup-vis",toggle:{getValue:Ht,on:{label:"toolbar.showMarkup",icon:Te,command:"markupvis"},off:{label:"toolbar.hideMarkup",icon:Ee,command:"markupvis"}}},{id:"clear-markups",label:"toolbar.clearMarkups",icon:Ft,command:"clearmarkups"},{type:"separator",id:"sep-markup-import-export"},{id:"markup-import",label:"toolbar.markupImport",icon:Se,command:"markupimport"},{id:"markup-export",label:"toolbar.markupExport",icon:Le,command:"markupexport"}]}}function G(){return{id:"zoom",label:"toolbar.zoom",icon:ne,childrenUi:"toolbar",childIcon:"selected",selectedChildId:"zoom-extent",children:[{id:"zoom-saved",label:"toolbar.zoomSaved",icon:yt,command:`zoom
saved`},{id:"zoom-extent",label:"toolbar.zoomExtent",icon:ne,command:`zoom
all`},{id:"zoom-smart-extents",label:"toolbar.zoomSmartExtents",icon:gt,command:`zoom
smart`},{id:"zoom-window",label:"toolbar.zoomWindow",icon:xt,command:`zoom
window`}]}}function K(r){return{id:"settings",label:"toolbar.settings",icon:$t,requiresDocument:!1,childrenUi:"toolbar",children:[za(),Ea(r),Da(r),{id:"switch-bg",label:"toolbar.switchBg",icon:Wt,command:"switchbg",disabled:Re},Aa(),Oa(r)]}}function W(r){return[{id:"select",label:"toolbar.select",icon:st,command:"select"},{id:"pan",label:"toolbar.pan",icon:nt,command:"pan"},G(),{id:"layer",label:"toolbar.layer",icon:Ce,command:"layer"},Ae(),Ne(),Be(),{id:"export",label:"toolbar.export",icon:ht,childrenUi:"toolbar",children:[{id:"export-html",label:"toolbar.exportHtml",icon:dt,command:"chtml"},{id:"export-pdf",label:"toolbar.exportPdf",icon:ct,command:"cpdf"},{id:"export-svg",label:"toolbar.exportSvg",icon:ut,command:"csvg"}]},{type:"separator",id:"sep-settings"},K(r)]}function $(r){return[G(),Ne(),{...Be(),label:"toolbar.annotationShort"},{id:"layer",label:"toolbar.layerShort",icon:Ce,command:"layer"},Ae(),K(r)]}function Ve(r,e){var t;for(const a of r)mt(a)||(e.has(a.id)||e.set(a.id,a),!pt(a)&&(t=a.children)!=null&&t.length&&Ve(a.children,e))}function j(r,e="desktop"){const t=new Map;re(W(r),t);const a=$(r);return e==="phone"?re(a,t):Ve(a,t),t}function Ra(r,e,t){if(!e.length)return r;const a=(t==null?void 0:t.before)??(t==null?void 0:t.after);if(!a)return[...r,...e];const o=r.findIndex(l=>l.id===a);if(o===-1)return[...r,...e];const i=t!=null&&t.before?o:o+1;return[...r.slice(0,i),...e,...r.slice(i)]}function U(r,e,t="desktop"){var a,o;const i=r??{},l=j(e,t);let s;if(i.items==="default"||i.items==null?s=t==="phone"?$(e):W(e):s=ie(i.items,l),(a=i.appendItems)!=null&&a.length&&(s=Ra(s,ie(i.appendItems,l),{after:i.appendItemsAfter,before:i.appendItemsBefore})),(o=i.excludeItems)!=null&&o.length){const n=new Set(i.excludeItems);s=s.filter(c=>!c.id||!n.has(c.id))}return s}function Na(r,e){var t;if(e)return e;const a=(t=m.instance.curView)==null?void 0:t.container,o=a==null?void 0:a.parentElement;return o&&(o===r||r.contains(o))?ze(o,r,["ml-ex-ui-toolbar-main"]):a&&(a===r||r.contains(a))?a:r}const _e="SimpleUiPlugin",Ba={"toolbar.select":"تحديد","toolbar.pan":"تحريك العرض","toolbar.zoom":"تكبير","toolbar.zoomExtent":"ملاءمة","toolbar.zoomSmartExtents":"ملاءمة ذكية","toolbar.zoomWindow":"نافذة","toolbar.zoomSaved":"محفوظ","toolbar.zoomOriginal":"محفوظ","toolbar.layer":"مدير الطبقات","toolbar.layerShort":"الطبقات","toolbar.layout":"المخطط","toolbar.settings":"الإعدادات","toolbar.simulatedMouseOn":"ماوس","toolbar.simulatedMouseOff":"عدسة","toolbar.measure":"القياس","toolbar.measureDistance":"مسافة","toolbar.measureContinuous":"مستمر","toolbar.measureAngle":"زاوية","toolbar.measureArea":"مساحة","toolbar.measureArc":"قوس","toolbar.measurePoint":"XY","toolbar.showMeasurements":"إظهار","toolbar.hideMeasurements":"إخفاء","toolbar.measurementImport":"استيراد","toolbar.measurementExport":"تصدير","toolbar.clearMeasurements":"مسح","toolbar.measurementPanel":"نتائج","toolbar.switchBg":"خلفية","toolbar.readingMode":"قراءة","toolbar.annotation":"أدوات المراجعة","toolbar.annotationShort":"مراجعة","toolbar.markupCloud":"سحابة","toolbar.markupCallout":"وسيلة شرح","toolbar.markupText":"نص","toolbar.markupRect":"مستطيل","toolbar.markupCircle":"دائرة","toolbar.markupArrow":"سهم","toolbar.markupStamp":"ختم","toolbar.markupPanel":"نتائج","toolbar.markupImport":"استيراد","toolbar.markupExport":"تصدير","toolbar.clearMarkups":"مسح","toolbar.showMarkup":"إظهار","toolbar.hideMarkup":"إخفاء","toolbar.export":"تصدير","toolbar.exportHtml":"تصدير HTML","toolbar.exportPdf":"تصدير PDF","toolbar.exportSvg":"تصدير SVG","toolbar.placement":"موضع شريط الأدوات","toolbar.placementTop":"أعلى","toolbar.placementBottom":"أسفل","toolbar.placementLeft":"يسار","toolbar.placementRight":"يمين","toolbar.themeLight":"فاتح","toolbar.themeDark":"داكن","toolbar.locale":"اللغة","toolbar.localeEn":"English","toolbar.localeZh":"中文","toolbar.localeCs":"Čeština","toolbar.localeTr":"Türkçe","toolbar.localeAr":"العربية","toolbar.collapse":"طي شريط الأدوات","toolbar.moreOverflow":"المزيد من الأدوات","toolbar.expand":"توسيع شريط الأدوات","layerManager.title":"مدير الطبقات","layerManager.name":"الاسم","layerManager.on":"تشغيل","layerManager.color":"اللون","layerManager.currentLayer":"الطبقة الحالية","layerManager.zoomToLayer":"تم التكبير إلى الطبقة: {layer}","layerManager.sortByNameAsc":"ترتيب حسب الاسم تصاعديًا","layerManager.sortByNameDesc":"ترتيب حسب الاسم تنازليًا","layerManager.sortByNameNone":"إلغاء ترتيب الاسم","colorPicker.title":"تحديد اللون","colorPicker.index":"فهرس اللون: ","colorPicker.rgb":"RGB: ","colorPicker.input":"اللون","colorPicker.inputPlaceholder":"1-255 أو #RRGGBB","colorPicker.ok":"موافق","colorPicker.cancel":"إلغاء","dockPanel.close":"إغلاق اللوحة","dockPanel.dockSide":"جهة الإرساء","dockPanel.dockTop":"إرساء بالأعلى","dockPanel.dockBottom":"إرساء بالأسفل","dockPanel.dockLeft":"إرساء باليسار","dockPanel.dockRight":"إرساء باليمين","dockPanel.moreTabs":"المزيد من علامات التبويب","dockPanel.tab.layers":"الطبقات","dockPanel.tab.review":"المراجعة","dockPanel.tab.measurements":"القياسات","dockPanel.resize":"تغيير ارتفاع اللوحة","reviewPalette.searchPlaceholder":"البحث في علامات المراجعة","reviewPalette.empty":"لا توجد علامات مراجعة حتى الآن","reviewPalette.type":"النوع","reviewPalette.status":"الحالة","reviewPalette.author":"المؤلف","reviewPalette.summary":"الملخص","reviewPalette.details":"التفاصيل","reviewPalette.closeDetails":"إغلاق التفاصيل","reviewPalette.label":"التسمية","reviewPalette.comment":"التعليق","reviewPalette.zoomTo":"تكبير إلى","reviewPalette.delete":"حذف","reviewPalette.clear":"مسح الكل","reviewPalette.statusValues.open":"مفتوح","reviewPalette.statusValues.question":"سؤال","reviewPalette.statusValues.answered":"تمت الإجابة","reviewPalette.statusValues.closed":"مغلق","reviewPalette.typeValues.cloud":"سحابة","reviewPalette.typeValues.callout":"وسيلة شرح","reviewPalette.typeValues.text":"نص","reviewPalette.typeValues.rect":"مستطيل","reviewPalette.typeValues.circle":"دائرة","reviewPalette.typeValues.arrow":"سهم","reviewPalette.typeValues.stamp":"ختم","reviewPalette.typeValues.line":"خط","reviewPalette.typeValues.highlight":"تمييز","reviewPalette.typeValues.symbol":"رمز","measurePalette.filterGroup":"التصفية حسب النوع","measurePalette.empty":"لا توجد قياسات حتى الآن","measurePalette.type":"النوع","measurePalette.value":"القيمة","measurePalette.delete":"حذف","measurePalette.clear":"مسح الكل","measurePalette.typeValues.distance":"مسافة","measurePalette.typeValues.angle":"زاوية","measurePalette.typeValues.area":"مساحة","measurePalette.typeValues.arc":"قوس","measurePalette.typeValues.point":"XY"},Va={ACAD:{layer:{description:"فتح أو إغلاق لوحة مدير الطبقات"},markuppanel:{description:"فتح لوحة المراجعة"},measurementpanel:{description:"فتح لوحة قائمة القياسات"}}},_a={ACAD:{layer:{description:"Otevře nebo zavře dokovací panel správce hladin"},markuppanel:{description:"Otevře dokovací panel kontroly"},measurementpanel:{description:"Otevře dokovací panel seznamu měření"}}},Ua={ACAD:{layer:{description:"Opens or closes the layer manager dock panel"},markuppanel:{description:"Opens the review palette dock panel"},measurementpanel:{description:"Opens the measurement list dock panel"}}},Ha={ACAD:{layer:{description:"Katman yöneticisi yerleştirme panelini açar veya kapatır"},markuppanel:{description:"İnceleme paleti yerleştirme panelini açar"},measurementpanel:{description:"Ölçüm listesi yerleştirme panelini açar"}}},Fa={ACAD:{layer:{description:"打开或关闭图层管理器停靠面板"},markuppanel:{description:"打开批注面板停靠页"},measurementpanel:{description:"打开测量列表面板"}}},Ga={"toolbar.select":"Výběr","toolbar.pan":"Posun","toolbar.zoom":"Zoom","toolbar.zoomExtent":"Rozsah","toolbar.zoomSmartExtents":"Chytrý rozsah","toolbar.zoomWindow":"Okno","toolbar.zoomSaved":"Uložený","toolbar.zoomOriginal":"Uložený","toolbar.layer":"Správce hladin","toolbar.layerShort":"Hladiny","toolbar.layout":"Rozvržení","toolbar.settings":"Nastavení","toolbar.simulatedMouseOn":"Myš","toolbar.simulatedMouseOff":"Lupa","toolbar.measure":"Měření","toolbar.measureDistance":"Vzdálenost","toolbar.measureContinuous":"Spojité","toolbar.measureAngle":"Úhel","toolbar.measureArea":"Plocha","toolbar.measureArc":"Oblouk","toolbar.measurePoint":"XY","toolbar.showMeasurements":"Zobrazit","toolbar.hideMeasurements":"Skrýt","toolbar.measurementImport":"Importovat","toolbar.measurementExport":"Exportovat","toolbar.clearMeasurements":"Vymazat","toolbar.measurementPanel":"Výsledky","toolbar.switchBg":"Pozadí","toolbar.readingMode":"Čtení","toolbar.annotation":"Nástroje kontroly","toolbar.annotationShort":"Kontrola","toolbar.markupCloud":"Obláček","toolbar.markupCallout":"Odkaz","toolbar.markupText":"Text","toolbar.markupRect":"Obdélník","toolbar.markupCircle":"Kružnice","toolbar.markupArrow":"Šipka","toolbar.markupStamp":"Razítko","toolbar.markupPanel":"Výsledky","toolbar.markupImport":"Importovat","toolbar.markupExport":"Exportovat","toolbar.clearMarkups":"Vymazat","toolbar.showMarkup":"Zobrazit","toolbar.hideMarkup":"Skrýt","toolbar.export":"Export","toolbar.exportHtml":"Exportovat HTML","toolbar.exportPdf":"Exportovat PDF","toolbar.exportSvg":"Exportovat SVG","toolbar.placement":"Pozice panelu nástrojů","toolbar.placementTop":"Nahoře","toolbar.placementBottom":"Dole","toolbar.placementLeft":"Vlevo","toolbar.placementRight":"Vpravo","toolbar.themeLight":"Světlý","toolbar.themeDark":"Tmavý","toolbar.locale":"Jazyk","toolbar.localeEn":"English","toolbar.localeZh":"中文","toolbar.localeCs":"Čeština","toolbar.localeTr":"Türkçe","toolbar.localeAr":"العربية","toolbar.collapse":"Sbalit panel nástrojů","toolbar.moreOverflow":"Další nástroje","toolbar.expand":"Rozbalit panel nástrojů","layerManager.title":"Správce hladin","layerManager.name":"Název","layerManager.on":"Zapnuto","layerManager.color":"Barva","layerManager.currentLayer":"Aktuální hladina","layerManager.zoomToLayer":"Přiblíženo na hladinu: {layer}","layerManager.sortByNameAsc":"Řadit podle názvu vzestupně","layerManager.sortByNameDesc":"Řadit podle názvu sestupně","layerManager.sortByNameNone":"Zrušit řazení podle názvu","colorPicker.title":"Vybrat barvu","colorPicker.index":"Index barvy: ","colorPicker.rgb":"RGB: ","colorPicker.input":"Barva","colorPicker.inputPlaceholder":"1-255 nebo #RRGGBB","colorPicker.ok":"OK","colorPicker.cancel":"Zrušit","dockPanel.close":"Zavřít panel","dockPanel.dockSide":"Strana ukotvení","dockPanel.dockTop":"Ukotvit nahoře","dockPanel.dockBottom":"Ukotvit dole","dockPanel.dockLeft":"Ukotvit vlevo","dockPanel.dockRight":"Ukotvit vpravo","dockPanel.moreTabs":"Další karty","dockPanel.tab.layers":"Hladiny","dockPanel.tab.review":"Kontrola","dockPanel.tab.measurements":"Měření","dockPanel.resize":"Změnit velikost panelu","reviewPalette.searchPlaceholder":"Hledat poznámky","reviewPalette.empty":"Zatím žádné poznámky","reviewPalette.type":"Typ","reviewPalette.status":"Stav","reviewPalette.author":"Autor","reviewPalette.summary":"Souhrn","reviewPalette.details":"Podrobnosti","reviewPalette.closeDetails":"Zavřít podrobnosti","reviewPalette.label":"Popisek","reviewPalette.comment":"Komentář","reviewPalette.zoomTo":"Přiblížit na","reviewPalette.delete":"Odstranit","reviewPalette.clear":"Vymazat vše","reviewPalette.statusValues.open":"Otevřeno","reviewPalette.statusValues.question":"Otázka","reviewPalette.statusValues.answered":"Zodpovězeno","reviewPalette.statusValues.closed":"Uzavřeno","reviewPalette.typeValues.cloud":"Oblak","reviewPalette.typeValues.callout":"Odnož","reviewPalette.typeValues.text":"Text","reviewPalette.typeValues.rect":"Obdélník","reviewPalette.typeValues.circle":"Kružnice","reviewPalette.typeValues.arrow":"Šipka","reviewPalette.typeValues.stamp":"Razítko","reviewPalette.typeValues.line":"Čára","reviewPalette.typeValues.highlight":"Zvýraznění","reviewPalette.typeValues.symbol":"Symbol","measurePalette.filterGroup":"Filtrovat podle typu","measurePalette.empty":"Zatím žádná měření","measurePalette.type":"Typ","measurePalette.value":"Hodnota","measurePalette.delete":"Odstranit","measurePalette.clear":"Vymazat vše","measurePalette.typeValues.distance":"Vzdálenost","measurePalette.typeValues.angle":"Úhel","measurePalette.typeValues.area":"Plocha","measurePalette.typeValues.arc":"Oblouk","measurePalette.typeValues.point":"XY"},Ka={"toolbar.select":"Select","toolbar.pan":"Pan","toolbar.zoom":"Zoom","toolbar.zoomExtent":"Extents","toolbar.zoomSmartExtents":"Smart extents","toolbar.zoomWindow":"Window","toolbar.zoomSaved":"Saved","toolbar.zoomOriginal":"Saved","toolbar.layer":"Layer Manager","toolbar.layerShort":"Layers","toolbar.layout":"Layout","toolbar.settings":"Settings","toolbar.simulatedMouseOn":"Mouse","toolbar.simulatedMouseOff":"Loupe","toolbar.measure":"Measure","toolbar.measureDistance":"Distance","toolbar.measureContinuous":"Continuous","toolbar.measureAngle":"Angle","toolbar.measureArea":"Area","toolbar.measureArc":"Arc","toolbar.measurePoint":"XY","toolbar.showMeasurements":"Show","toolbar.hideMeasurements":"Hide","toolbar.measurementImport":"Import","toolbar.measurementExport":"Export","toolbar.clearMeasurements":"Clear","toolbar.measurementPanel":"Results","toolbar.switchBg":"Background","toolbar.readingMode":"Reading","toolbar.annotation":"Review tools","toolbar.annotationShort":"Review","toolbar.markupCloud":"Cloud","toolbar.markupCallout":"Callout","toolbar.markupText":"Text","toolbar.markupRect":"Rect","toolbar.markupCircle":"Circle","toolbar.markupArrow":"Arrow","toolbar.markupStamp":"Stamp","toolbar.markupPanel":"Results","toolbar.markupImport":"Import","toolbar.markupExport":"Export","toolbar.clearMarkups":"Clear","toolbar.showMarkup":"Show","toolbar.hideMarkup":"Hide","toolbar.export":"Export","toolbar.exportHtml":"Export HTML","toolbar.exportPdf":"Export PDF","toolbar.exportSvg":"Export SVG","toolbar.placement":"Toolbar Position","toolbar.placementTop":"Top","toolbar.placementBottom":"Bottom","toolbar.placementLeft":"Left","toolbar.placementRight":"Right","toolbar.themeLight":"Light","toolbar.themeDark":"Dark","toolbar.locale":"Language","toolbar.localeEn":"English","toolbar.localeZh":"中文","toolbar.localeCs":"Čeština","toolbar.localeTr":"Türkçe","toolbar.localeAr":"العربية","toolbar.collapse":"Collapse toolbar","toolbar.moreOverflow":"More tools","toolbar.expand":"Expand toolbar","layerManager.title":"Layer Manager","layerManager.name":"Name","layerManager.on":"On","layerManager.color":"Color","layerManager.currentLayer":"Current layer","layerManager.zoomToLayer":"Zoomed to layer: {layer}","layerManager.sortByNameAsc":"Sort by name ascending","layerManager.sortByNameDesc":"Sort by name descending","layerManager.sortByNameNone":"Clear name sort","colorPicker.title":"Select Color","colorPicker.index":"Color Index: ","colorPicker.rgb":"RGB: ","colorPicker.input":"Color","colorPicker.inputPlaceholder":"1-255 or #RRGGBB","colorPicker.ok":"OK","colorPicker.cancel":"Cancel","dockPanel.close":"Close panel","dockPanel.dockSide":"Dock side","dockPanel.dockTop":"Dock to top","dockPanel.dockBottom":"Dock to bottom","dockPanel.dockLeft":"Dock to left","dockPanel.dockRight":"Dock to right","dockPanel.moreTabs":"More tabs","dockPanel.tab.layers":"Layers","dockPanel.tab.review":"Review","dockPanel.tab.measurements":"Measurements","dockPanel.resize":"Resize panel","reviewPalette.searchPlaceholder":"Search markups","reviewPalette.empty":"No markups yet","reviewPalette.type":"Type","reviewPalette.status":"Status","reviewPalette.author":"Author","reviewPalette.summary":"Summary","reviewPalette.details":"Details","reviewPalette.closeDetails":"Close details","reviewPalette.label":"Label","reviewPalette.comment":"Comment","reviewPalette.zoomTo":"Zoom to","reviewPalette.delete":"Delete","reviewPalette.clear":"Clear all","reviewPalette.statusValues.open":"Open","reviewPalette.statusValues.question":"Question","reviewPalette.statusValues.answered":"Answered","reviewPalette.statusValues.closed":"Closed","reviewPalette.typeValues.cloud":"Cloud","reviewPalette.typeValues.callout":"Callout","reviewPalette.typeValues.text":"Text","reviewPalette.typeValues.rect":"Rectangle","reviewPalette.typeValues.circle":"Circle","reviewPalette.typeValues.arrow":"Arrow","reviewPalette.typeValues.stamp":"Stamp","reviewPalette.typeValues.line":"Line","reviewPalette.typeValues.highlight":"Highlight","reviewPalette.typeValues.symbol":"Symbol","measurePalette.filterGroup":"Filter by type","measurePalette.empty":"No measurements yet","measurePalette.type":"Type","measurePalette.value":"Value","measurePalette.delete":"Delete","measurePalette.clear":"Clear all","measurePalette.typeValues.distance":"Distance","measurePalette.typeValues.angle":"Angle","measurePalette.typeValues.area":"Area","measurePalette.typeValues.arc":"Arc","measurePalette.typeValues.point":"XY"},Wa={"toolbar.select":"Seç","toolbar.pan":"Kaydır","toolbar.zoom":"Yakınlaştır","toolbar.zoomExtent":"Sınırlar","toolbar.zoomSmartExtents":"Akıllı sınırlar","toolbar.zoomWindow":"Pencere","toolbar.zoomSaved":"Kayıtlı","toolbar.zoomOriginal":"Kayıtlı","toolbar.layer":"Katman Yöneticisi","toolbar.layerShort":"Katman","toolbar.layout":"Düzen","toolbar.settings":"Ayarlar","toolbar.simulatedMouseOn":"Fare","toolbar.simulatedMouseOff":"Büyüteç","toolbar.measure":"Ölçüm","toolbar.measureDistance":"Mesafe","toolbar.measureContinuous":"Sürekli","toolbar.measureAngle":"Açı","toolbar.measureArea":"Alan","toolbar.measureArc":"Yay","toolbar.measurePoint":"XY","toolbar.showMeasurements":"Göster","toolbar.hideMeasurements":"Gizle","toolbar.measurementImport":"İçe Aktar","toolbar.measurementExport":"Dışa Aktar","toolbar.clearMeasurements":"Temizle","toolbar.measurementPanel":"Sonuç","toolbar.switchBg":"Arka Plan","toolbar.readingMode":"Okuma","toolbar.annotation":"İnceleme araçları","toolbar.annotationShort":"İnceleme","toolbar.markupCloud":"Bulut","toolbar.markupCallout":"Çağrı","toolbar.markupText":"Metin","toolbar.markupRect":"Dikdörtgen","toolbar.markupCircle":"Daire","toolbar.markupArrow":"Ok","toolbar.markupStamp":"Damga","toolbar.markupPanel":"Sonuç","toolbar.markupImport":"İçe Aktar","toolbar.markupExport":"Dışa Aktar","toolbar.clearMarkups":"Temizle","toolbar.showMarkup":"Göster","toolbar.hideMarkup":"Gizle","toolbar.export":"Dışa Aktar","toolbar.exportHtml":"HTML Dışa Aktar","toolbar.exportPdf":"PDF Dışa Aktar","toolbar.exportSvg":"SVG Dışa Aktar","toolbar.placement":"Araç Çubuğu Konumu","toolbar.placementTop":"Üst","toolbar.placementBottom":"Alt","toolbar.placementLeft":"Sol","toolbar.placementRight":"Sağ","toolbar.themeLight":"Açık","toolbar.themeDark":"Koyu","toolbar.locale":"Dil","toolbar.localeEn":"English","toolbar.localeZh":"中文","toolbar.localeCs":"Čeština","toolbar.localeTr":"Türkçe","toolbar.localeAr":"العربية","toolbar.collapse":"Araç çubuğunu daralt","toolbar.moreOverflow":"Diğer araçlar","toolbar.expand":"Araç çubuğunu genişlet","layerManager.title":"Katman Yöneticisi","layerManager.name":"Ad","layerManager.on":"Açık","layerManager.color":"Renk","layerManager.currentLayer":"Geçerli katman","layerManager.zoomToLayer":"Katmana yakınlaştırıldı: {layer}","layerManager.sortByNameAsc":"Ada göre artan sırala","layerManager.sortByNameDesc":"Ada göre azalan sırala","layerManager.sortByNameNone":"Ad sıralamasını temizle","colorPicker.title":"Renk Seç","colorPicker.index":"Renk İndeksi: ","colorPicker.rgb":"RGB: ","colorPicker.input":"Renk","colorPicker.inputPlaceholder":"1-255 veya #RRGGBB","colorPicker.ok":"Tamam","colorPicker.cancel":"İptal","dockPanel.close":"Paneli kapat","dockPanel.dockSide":"Yerleşim kenarı","dockPanel.dockTop":"Üste yerleştir","dockPanel.dockBottom":"Alta yerleştir","dockPanel.dockLeft":"Sola yerleştir","dockPanel.dockRight":"Sağa yerleştir","dockPanel.moreTabs":"Diğer sekmeler","dockPanel.tab.layers":"Katmanlar","dockPanel.tab.review":"İnceleme","dockPanel.tab.measurements":"Ölçümler","dockPanel.resize":"Panel boyutunu ayarla","reviewPalette.searchPlaceholder":"İşaretlerde ara","reviewPalette.empty":"Henüz işaret yok","reviewPalette.type":"Tür","reviewPalette.status":"Durum","reviewPalette.author":"Yazar","reviewPalette.summary":"Özet","reviewPalette.details":"Ayrıntılar","reviewPalette.closeDetails":"Ayrıntıları kapat","reviewPalette.label":"Etiket","reviewPalette.comment":"Yorum","reviewPalette.zoomTo":"Yakınlaştır","reviewPalette.delete":"Sil","reviewPalette.clear":"Tümünü temizle","reviewPalette.statusValues.open":"Açık","reviewPalette.statusValues.question":"Soru","reviewPalette.statusValues.answered":"Yanıtlandı","reviewPalette.statusValues.closed":"Kapalı","reviewPalette.typeValues.cloud":"Bulut","reviewPalette.typeValues.callout":"Çağrı","reviewPalette.typeValues.text":"Metin","reviewPalette.typeValues.rect":"Dikdörtgen","reviewPalette.typeValues.circle":"Daire","reviewPalette.typeValues.arrow":"Ok","reviewPalette.typeValues.stamp":"Damga","reviewPalette.typeValues.line":"Çizgi","reviewPalette.typeValues.highlight":"Vurgu","reviewPalette.typeValues.symbol":"Sembol","measurePalette.filterGroup":"Türe göre filtrele","measurePalette.empty":"Henüz ölçüm yok","measurePalette.type":"Tür","measurePalette.value":"Değer","measurePalette.delete":"Sil","measurePalette.clear":"Tümünü temizle","measurePalette.typeValues.distance":"Mesafe","measurePalette.typeValues.angle":"Açı","measurePalette.typeValues.area":"Alan","measurePalette.typeValues.arc":"Yay","measurePalette.typeValues.point":"XY"},$a={"toolbar.select":"选择","toolbar.pan":"平移","toolbar.zoom":"缩放","toolbar.zoomExtent":"范围","toolbar.zoomSmartExtents":"智能范围","toolbar.zoomWindow":"窗口","toolbar.zoomSaved":"保存的视图","toolbar.zoomOriginal":"保存的视图","toolbar.layer":"图层管理器","toolbar.layerShort":"图层","toolbar.layout":"布局","toolbar.settings":"设置","toolbar.simulatedMouseOn":"鼠标","toolbar.simulatedMouseOff":"放大","toolbar.measure":"测量","toolbar.measureDistance":"测距离","toolbar.measureContinuous":"连续测","toolbar.measureAngle":"测角度","toolbar.measureArea":"测面积","toolbar.measureArc":"测弧长","toolbar.measurePoint":"测坐标","toolbar.showMeasurements":"显示","toolbar.hideMeasurements":"隐藏","toolbar.measurementImport":"导入","toolbar.measurementExport":"导出","toolbar.clearMeasurements":"清除","toolbar.measurementPanel":"看结果","toolbar.switchBg":"背景","toolbar.readingMode":"阅读","toolbar.annotation":"审阅工具","toolbar.annotationShort":"批注","toolbar.markupCloud":"云线","toolbar.markupCallout":"标注","toolbar.markupText":"文字","toolbar.markupRect":"矩形","toolbar.markupCircle":"圆","toolbar.markupArrow":"箭头","toolbar.markupStamp":"图章","toolbar.markupPanel":"看结果","toolbar.markupImport":"导入","toolbar.markupExport":"导出","toolbar.clearMarkups":"清除","toolbar.showMarkup":"显示","toolbar.hideMarkup":"隐藏","toolbar.export":"导出","toolbar.exportHtml":"导出 HTML","toolbar.exportPdf":"导出 PDF","toolbar.exportSvg":"导出 SVG","toolbar.placement":"工具栏位置","toolbar.placementTop":"上方","toolbar.placementBottom":"下方","toolbar.placementLeft":"左侧","toolbar.placementRight":"右侧","toolbar.themeLight":"浅色","toolbar.themeDark":"深色","toolbar.locale":"语言","toolbar.localeEn":"English","toolbar.localeZh":"中文","toolbar.localeCs":"Čeština","toolbar.localeTr":"Türkçe","toolbar.localeAr":"العربية","toolbar.collapse":"收起工具栏","toolbar.moreOverflow":"更多工具","toolbar.expand":"展开工具栏","layerManager.title":"图层管理器","layerManager.name":"名称","layerManager.on":"开","layerManager.color":"颜色","layerManager.currentLayer":"当前图层","layerManager.zoomToLayer":"已缩放至图层：{layer}","layerManager.sortByNameAsc":"按名称升序排序","layerManager.sortByNameDesc":"按名称降序排序","layerManager.sortByNameNone":"取消名称排序","colorPicker.title":"选择颜色","colorPicker.index":"颜色索引：","colorPicker.rgb":"RGB：","colorPicker.input":"颜色","colorPicker.inputPlaceholder":"1-255 或 #RRGGBB","colorPicker.ok":"确定","colorPicker.cancel":"取消","dockPanel.close":"关闭面板","dockPanel.dockSide":"停靠位置","dockPanel.dockTop":"停靠在顶部","dockPanel.dockBottom":"停靠在底部","dockPanel.dockLeft":"停靠在左侧","dockPanel.dockRight":"停靠在右侧","dockPanel.moreTabs":"更多标签页","dockPanel.tab.layers":"图层","dockPanel.tab.review":"批注","dockPanel.tab.measurements":"测量","dockPanel.resize":"调整面板高度","reviewPalette.searchPlaceholder":"搜索批注","reviewPalette.empty":"暂无批注","reviewPalette.type":"类型","reviewPalette.status":"状态","reviewPalette.author":"作者","reviewPalette.summary":"摘要","reviewPalette.details":"详情","reviewPalette.closeDetails":"关闭详情","reviewPalette.label":"标签","reviewPalette.comment":"评论","reviewPalette.zoomTo":"缩放到","reviewPalette.delete":"删除","reviewPalette.clear":"全部清除","reviewPalette.statusValues.open":"打开","reviewPalette.statusValues.question":"疑问","reviewPalette.statusValues.answered":"已答复","reviewPalette.statusValues.closed":"已关闭","reviewPalette.typeValues.cloud":"云线","reviewPalette.typeValues.callout":"标注","reviewPalette.typeValues.text":"文字","reviewPalette.typeValues.rect":"矩形","reviewPalette.typeValues.circle":"圆","reviewPalette.typeValues.arrow":"箭头","reviewPalette.typeValues.stamp":"图章","reviewPalette.typeValues.line":"直线","reviewPalette.typeValues.highlight":"高亮","reviewPalette.typeValues.symbol":"符号","measurePalette.filterGroup":"按类型筛选","measurePalette.empty":"暂无测量","measurePalette.type":"类型","measurePalette.value":"数值","measurePalette.delete":"删除","measurePalette.clear":"全部清除","measurePalette.typeValues.distance":"距离","measurePalette.typeValues.angle":"角度","measurePalette.typeValues.area":"面积","measurePalette.typeValues.arc":"弧长","measurePalette.typeValues.point":"坐标"},k="simpleUi";let he=!1;function P(r){const e={};for(const[t,a]of Object.entries(r)){const o=t.split(".");let i=e;for(let l=0;l<o.length-1;l++){const s=o[l],n=i[s];(!n||typeof n=="string")&&(i[s]={}),i=i[s]}i[o[o.length-1]]=a}return e}function Ue(){he||(f.mergeLocaleMessage("en",{command:Ua,[k]:P(Ka)}),f.mergeLocaleMessage("zh",{command:Fa,[k]:P($a)}),f.mergeLocaleMessage("cs",{command:_a,[k]:P(Ga)}),f.mergeLocaleMessage("tr",{command:Ha,[k]:P(Wa)}),f.mergeLocaleMessage("ar",{command:Va,[k]:P(Ba)}),he=!0)}class He{t(e,t){const a=`${k}.${e}`,o=f.t(a,{fallback:e});return t?Object.keys(t).reduce((i,l)=>i.replace(`{${l}}`,t[l]),o):o}}function me(r){const e=r.getAttribute("data-ml-ui-theme");if(e==="light"||e==="dark")return e}function pe(r){const e=L.instance().getVar(V.COLORTHEME,r);return ge(e)?"light":"dark"}class ja{constructor(e,t){this.host=e,this.onThemeChanged=t,this.handleSysVarChanged=a=>{var o;const i=(o=m.instance.curDocument)==null?void 0:o.database;!i||a.database!==i||a.name.toLowerCase()===V.COLORTHEME.toLowerCase()&&this.applyTheme(ge(a.newVal)?"light":"dark")},this.handleDocumentActivated=a=>{this.applyTheme(pe(a.doc.database))}}start(){this.syncFromCurrentSource(),L.instance().events.sysVarChanged.addEventListener(this.handleSysVarChanged),m.instance.events.documentActivated.addEventListener(this.handleDocumentActivated)}stop(){L.instance().events.sysVarChanged.removeEventListener(this.handleSysVarChanged),m.instance.events.documentActivated.removeEventListener(this.handleDocumentActivated)}getTheme(){return me(this.host)??"dark"}setTheme(e){var t;const a=(t=m.instance.curDocument)==null?void 0:t.database;if(a){L.instance().setVar(V.COLORTHEME,e==="light"?1:0,a);return}this.applyTheme(e)}syncFromCurrentSource(){var e;const t=(e=m.instance.curDocument)==null?void 0:e.database;if(t){this.applyTheme(pe(t));return}me(this.host)}applyTheme(e){var t;Ye(e,this.host),(t=this.onThemeChanged)==null||t.call(this)}}const H="ml-ex-ui-styles";function T(){if(bt(),document.getElementById(H))return;const r=document.createElement("style");r.id=H,r.textContent=`
    .ml-ex-ui-layer-manager {
      position: absolute;
      z-index: 100;
      width: min(280px, calc(100% - 16px));
      max-width: calc(100% - 16px);
      min-height: 120px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background: var(--ml-ui-bg, #ffffff);
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      box-shadow: var(--ml-ui-shadow, 0 6px 18px rgba(0, 0, 0, 0.35));
      border-radius: 8px;
      overflow: hidden;
      color: var(--ml-ui-text, #303133);
      font-size: 12px;
    }

    .ml-ex-ui-layer-manager.is-compact {
      width: calc(100% - 16px);
      max-width: none;
      border-radius: 12px 12px 8px 8px;
    }

    .ml-ex-ui-layer-manager.is-compact .ml-ex-ui-layer-table th:first-child,
    .ml-ex-ui-layer-manager.is-compact .ml-ex-ui-layer-table td:first-child {
      width: 100%;
      max-width: 0;
    }

    .ml-ex-ui-layer-manager.is-compact .ml-ex-ui-layer-name {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ml-ex-ui-layer-manager.is-hidden {
      display: none;
    }

    .ml-ex-ui-layer-manager .ml-ex-ui-layer-list {
      flex: 1;
      min-height: 0;
    }

    .ml-ex-ui-layer-manager-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-bottom: 1px solid var(--ml-ui-border, #dcdfe6);
      user-select: none;
      font-weight: 600;
      flex: 0 0 auto;
    }

    .ml-ex-ui-layer-table-wrap {
      overflow: auto;
      flex: 1;
    }

    .ml-ex-ui-layer-table {
      width: 100%;
      border-collapse: collapse;
    }

    .ml-ex-ui-layer-table th,
    .ml-ex-ui-layer-table td {
      padding: 4px 8px;
      border-bottom: 1px solid var(--ml-ui-border, #dcdfe6);
      text-align: left;
    }

    .ml-ex-ui-layer-table th {
      position: sticky;
      top: 0;
      background: var(--ml-ui-bg, #ffffff);
      z-index: 1;
    }

    .ml-ex-ui-layer-table td.center,
    .ml-ex-ui-layer-table th.center {
      text-align: center;
      vertical-align: middle;
    }

    .ml-ex-ui-layer-name-header.is-sortable {
      padding: 0;
    }

    .ml-ex-ui-layer-name-sort {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      width: 100%;
      margin: 0;
      padding: 4px 8px;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }

    .ml-ex-ui-layer-name-sort:hover {
      color: var(--ml-ui-accent, #409eff);
    }

    .ml-ex-ui-layer-name-header.is-sorted-asc .ml-ex-ui-layer-name-sort,
    .ml-ex-ui-layer-name-header.is-sorted-desc .ml-ex-ui-layer-name-sort {
      color: var(--ml-ui-accent, #409eff);
    }

    .ml-ex-ui-layer-sort-indicator {
      display: inline-block;
      min-width: 0.75em;
      font-size: 10px;
      line-height: 1;
      opacity: 0.85;
    }

    .ml-ex-ui-layer-header-on {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .ml-ex-ui-layer-header-on span {
      line-height: 1;
    }

    .ml-ex-ui-layer-header-on input[type='checkbox'] {
      margin: 0;
    }

    .ml-ex-ui-layer-name {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }

    .ml-ex-ui-layer-current-marker {
      color: var(--ml-ui-accent, #409eff);
      font-weight: 600;
    }

    .ml-ex-ui-layer-color {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 3px;
      cursor: pointer;
    }

    .ml-ex-ui-color-dialog-backdrop {
      position: fixed;
      inset: 0;
      z-index: 120;
      background: var(--ml-ui-overlay, rgba(0, 0, 0, 0.18));
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ml-ex-ui-color-dialog {
      width: fit-content;
      max-width: calc(100vw - 24px);
      background: var(--ml-ui-bg, #ffffff);
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 8px;
      box-shadow: var(--ml-ui-shadow, 0 6px 18px rgba(0, 0, 0, 0.35));
      padding: 12px;
      color: var(--ml-ui-text, #303133);
      font-family: Arial, sans-serif;
      font-size: 12px;
    }

    .ml-ex-ui-color-dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .ml-ex-ui-color-dialog-title {
      font-weight: 600;
    }

    .ml-ex-ui-color-dialog-close {
      border: none;
      background: transparent;
      color: var(--ml-ui-text-muted, #606266);
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 2px 6px;
    }

    .ml-ex-ui-dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }

    .ml-ex-ui-btn {
      padding: 4px 12px;
      border-radius: 4px;
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      background: var(--ml-ui-bg, #ffffff);
      color: var(--ml-ui-text, #303133);
      cursor: pointer;
      font-size: 12px;
    }

    .ml-ex-ui-btn-primary {
      border-color: var(--ml-ui-accent, #409eff);
      background: var(--ml-ui-accent, #409eff);
      color: #fff;
    }

    .ml-ex-ui-toast {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      padding: 8px 14px;
      border-radius: 6px;
      background: var(--ml-ui-bg, #ffffff);
      color: var(--ml-ui-text, #303133);
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      box-shadow: var(--ml-ui-shadow, 0 2px 6px rgba(0, 0, 0, 0.12));
    }

    .ml-ex-ui-layer-list {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ml-ex-ui-review-palette {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      gap: 8px;
      padding: 8px;
      box-sizing: border-box;
      color: var(--ml-ui-text, #303133);
      font-size: 12px;
    }

    .ml-ex-ui-review-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
      flex: 0 0 auto;
    }

    .ml-ex-ui-review-search,
    .ml-ex-ui-review-input,
    .ml-ex-ui-review-select,
    .ml-ex-ui-review-textarea {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 4px;
      background: var(--ml-ui-bg, #ffffff);
      color: var(--ml-ui-text, #303133);
      font: inherit;
      padding: 4px 8px;
    }

    .ml-ex-ui-review-search {
      flex: 1;
      min-width: 0;
    }

    .ml-ex-ui-review-textarea {
      resize: vertical;
      min-height: 44px;
    }

    .ml-ex-ui-review-btn {
      flex: 0 0 auto;
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 4px;
      background: var(--ml-ui-bg, #ffffff);
      color: var(--ml-ui-text, #303133);
      font: inherit;
      padding: 4px 8px;
      cursor: pointer;
    }

    .ml-ex-ui-review-btn:hover:not(:disabled) {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
    }

    .ml-ex-ui-review-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .ml-ex-ui-review-btn-danger {
      color: var(--ml-ui-danger, #f56c6c);
      border-color: var(--ml-ui-danger, #f56c6c);
    }

    .ml-ex-ui-review-table-wrap {
      flex: 1;
      min-height: 120px;
      overflow: auto;
    }

    .ml-ex-ui-review-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .ml-ex-ui-review-table th,
    .ml-ex-ui-review-table td {
      padding: 4px 6px;
      text-align: left;
      border-bottom: 1px solid var(--ml-ui-border, #dcdfe6);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ml-ex-ui-review-table th {
      font-weight: 600;
      position: sticky;
      top: 0;
      background: var(--ml-ui-bg, #ffffff);
    }

    .ml-ex-ui-review-table th:nth-child(1),
    .ml-ex-ui-review-table td:nth-child(1) {
      width: 88px;
    }

    .ml-ex-ui-review-table th:nth-child(2),
    .ml-ex-ui-review-table td:nth-child(2) {
      width: 96px;
    }

    .ml-ex-ui-review-row {
      cursor: pointer;
    }

    .ml-ex-ui-review-row:hover {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
    }

    .ml-ex-ui-review-row.is-selected {
      background: var(--ml-ui-accent-soft, rgba(64, 158, 255, 0.12));
    }

    .ml-ex-ui-review-empty-row td {
      text-align: center;
      color: var(--ml-ui-muted, #909399);
      white-space: normal;
      padding: 16px 8px;
    }

    .ml-ex-ui-review-detail {
      border-top: 1px solid var(--ml-ui-border, #dcdfe6);
      padding-top: 6px;
      max-height: 46%;
      overflow: auto;
      flex: 0 0 auto;
    }

    .ml-ex-ui-review-detail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
      margin-bottom: 4px;
    }

    .ml-ex-ui-review-detail-title {
      font-weight: 600;
    }

    .ml-ex-ui-review-detail-close {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-left: auto;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--ml-ui-text, #303133);
      cursor: pointer;
      padding: 0;
    }

    .ml-ex-ui-review-detail-close:hover {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
    }

    .ml-ex-ui-review-field {
      margin-bottom: 4px;
    }

    .ml-ex-ui-review-field-label {
      display: block;
      margin-bottom: 2px;
      line-height: 1.2;
    }

    .ml-ex-ui-review-detail-actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }

    .ml-ex-ui-review-detail-actions .ml-ex-ui-review-btn {
      flex: 0 0 auto;
      width: auto;
    }

    .ml-ex-ui-measure-palette {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      gap: 8px;
      padding: 8px;
      box-sizing: border-box;
      color: var(--ml-ui-text, #303133);
      font-size: 12px;
    }

    .ml-ex-ui-measure-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
      flex: 0 0 auto;
    }

    .ml-ex-ui-measure-filter {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      overflow: hidden;
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 4px;
    }

    .ml-ex-ui-measure-filter-btn {
      flex: 1 1 0;
      min-width: 0;
      border: none;
      border-right: 1px solid var(--ml-ui-border, #dcdfe6);
      background: var(--ml-ui-bg, #ffffff);
      color: var(--ml-ui-text, #303133);
      font: inherit;
      font-size: 11px;
      padding: 4px 2px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ml-ex-ui-measure-filter-btn:last-child {
      border-right: none;
    }

    .ml-ex-ui-measure-filter-btn:hover:not(.is-active) {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
    }

    .ml-ex-ui-measure-filter-btn.is-active {
      background: var(--ml-ui-accent-soft, rgba(64, 158, 255, 0.16));
      color: var(--ml-ui-accent, #409eff);
    }

    .ml-ex-ui-measure-btn {
      flex: 0 0 auto;
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 4px;
      background: var(--ml-ui-bg, #ffffff);
      color: var(--ml-ui-text, #303133);
      font: inherit;
      padding: 4px 8px;
      cursor: pointer;
    }

    .ml-ex-ui-measure-btn:hover:not(:disabled) {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
    }

    .ml-ex-ui-measure-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .ml-ex-ui-measure-btn-danger {
      color: #f56c6c;
      border-color: rgba(245, 108, 108, 0.55);
    }

    .ml-ex-ui-measure-table-wrap {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
    }

    .ml-ex-ui-measure-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .ml-ex-ui-measure-table th,
    .ml-ex-ui-measure-table td {
      padding: 6px 8px;
      text-align: left;
      border-bottom: 1px solid var(--ml-ui-border, #dcdfe6);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ml-ex-ui-measure-table th {
      font-weight: 600;
      color: var(--ml-ui-text-muted, #606266);
    }

    .ml-ex-ui-measure-table th:nth-child(1),
    .ml-ex-ui-measure-table td:nth-child(1) {
      width: 28%;
    }

    .ml-ex-ui-measure-actions-col {
      width: 72px;
      text-align: right;
    }

    .ml-ex-ui-measure-row {
      cursor: pointer;
    }

    .ml-ex-ui-measure-row:hover {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.04));
    }

    .ml-ex-ui-measure-row.is-selected {
      background: var(--ml-ui-accent-soft, rgba(64, 158, 255, 0.12));
    }

    .ml-ex-ui-measure-empty-row td {
      text-align: center;
      color: var(--ml-ui-text-muted, #606266);
      cursor: default;
    }

    .ml-ex-ui-measure-row-delete {
      padding: 2px 6px;
      font-size: 11px;
    }

    .ml-ex-ui-layer-list .ml-ex-ui-layer-table-wrap {
      flex: 1;
      min-height: 0;
    }

    .ml-ex-ui-host-dock {
      min-height: 0;
      min-width: 0;
    }

    .ml-ex-ui-host-dock:not([class*='ml-ex-ui-host-dock-']) {
      display: flex;
      flex-direction: column;
    }

    .ml-ex-ui-host-dock-top,
    .ml-ex-ui-host-dock-bottom,
    .ml-ex-ui-host-dock-sheet {
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .ml-ex-ui-host-dock-left,
    .ml-ex-ui-host-dock-right {
      display: flex;
      flex-direction: row;
      min-width: 0;
      min-height: 0;
    }

    .ml-ex-ui-dock-main {
      flex: 1 1 auto;
      min-height: 0;
      min-width: 0;
      position: relative;
      overflow: hidden;
    }

    .ml-ex-ui-dock-panel {
      --ml-ex-ui-dock-size: 240px;
      display: flex;
      flex-direction: column;
      flex: 0 0 auto;
      background: var(--ml-ui-bg, #ffffff);
      color: var(--ml-ui-text, #303133);
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      font-size: 12px;
      z-index: 25;
      min-height: 0;
      min-width: 0;
      overflow: hidden;
    }

    .ml-ex-ui-dock-panel[data-open='false'] {
      display: none;
    }

    .ml-ex-ui-dock-panel[data-side='bottom'],
    .ml-ex-ui-dock-panel[data-side='top'] {
      width: 100%;
      height: var(--ml-ex-ui-dock-size);
      border-left: none;
      border-right: none;
    }

    .ml-ex-ui-dock-panel[data-side='bottom'] {
      border-bottom: none;
      border-top: none;
    }

    .ml-ex-ui-dock-panel[data-side='top'] {
      border-top: none;
      border-bottom: none;
    }

    .ml-ex-ui-dock-panel[data-side='left'],
    .ml-ex-ui-dock-panel[data-side='right'] {
      flex-direction: row;
      height: 100%;
      width: var(--ml-ex-ui-dock-size);
      border-top: none;
      border-bottom: none;
    }

    .ml-ex-ui-dock-content {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      min-height: 0;
      min-width: 0;
      overflow: hidden;
    }

    .ml-ex-ui-dock-panel[data-side='left'] {
      border-left: none;
      border-right: none;
    }

    .ml-ex-ui-dock-panel[data-side='right'] {
      border-right: none;
      border-left: none;
    }

    .ml-ex-ui-dock-resize-handle {
      flex: 0 0 auto;
      background: transparent;
      touch-action: none;
      z-index: 1;
    }

    .ml-ex-ui-dock-resize-handle:hover,
    .ml-ex-ui-dock-resize-handle:active {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.08));
    }

    .ml-ex-ui-dock-panel[data-side='bottom'] .ml-ex-ui-dock-resize-handle {
      order: -1;
      width: 100%;
      height: 6px;
      cursor: ns-resize;
      border-top: 1px solid var(--ml-ui-border, #dcdfe6);
    }

    .ml-ex-ui-dock-panel[data-side='top'] .ml-ex-ui-dock-resize-handle {
      order: 2;
      width: 100%;
      height: 6px;
      cursor: ns-resize;
      border-bottom: 1px solid var(--ml-ui-border, #dcdfe6);
    }

    .ml-ex-ui-dock-panel[data-side='left'] .ml-ex-ui-dock-resize-handle {
      order: 2;
      align-self: stretch;
      width: 6px;
      cursor: ew-resize;
      border-right: 1px solid var(--ml-ui-border, #dcdfe6);
    }

    .ml-ex-ui-dock-panel[data-side='right'] .ml-ex-ui-dock-resize-handle {
      order: -1;
      align-self: stretch;
      width: 6px;
      cursor: ew-resize;
      border-left: 1px solid var(--ml-ui-border, #dcdfe6);
    }

    .ml-ex-ui-dock-sheet-chrome {
      display: none;
      position: relative;
    }

    .ml-ex-ui-dock-sheet-grabber {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 20px;
      cursor: ns-resize;
      touch-action: none;
    }

    .ml-ex-ui-dock-sheet-grabber::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 36px;
      height: 4px;
      border-radius: 2px;
      background: var(--ml-ui-text-muted, #909399);
      opacity: 0.7;
    }

    .ml-ex-ui-dock-sheet-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 28px;
      border: none;
      background: transparent;
      color: var(--ml-ui-text-muted, #606266);
      cursor: pointer;
      flex: 0 0 auto;
      position: relative;
      z-index: 1;
    }

    .ml-ex-ui-dock-sheet-close:hover {
      color: var(--ml-ui-text, #303133);
    }

    .ml-ex-ui-dock-header {
      display: flex;
      align-items: stretch;
      flex: 0 0 auto;
      border-bottom: 1px solid var(--ml-ui-border, #dcdfe6);
      background: var(--ml-ui-bg, #ffffff);
      min-height: 28px;
    }

    .ml-ex-ui-dock-tabs-wrap {
      display: flex;
      align-items: stretch;
      flex: 1 1 auto;
      min-width: 0;
    }

    .ml-ex-ui-dock-tabs {
      display: flex;
      align-items: stretch;
      flex: 1 1 auto;
      min-width: 0;
      overflow: hidden;
    }

    .ml-ex-ui-dock-tab-overflow-btn {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      border: none;
      border-bottom: 2px solid transparent;
      background: transparent;
      color: var(--ml-ui-text-muted, #606266);
      font-size: 14px;
      line-height: 1;
      cursor: pointer;
    }

    .ml-ex-ui-dock-tab-overflow-btn[hidden] {
      display: none !important;
    }

    .ml-ex-ui-dock-tab-overflow-btn:hover,
    .ml-ex-ui-dock-tab-overflow-btn.is-active {
      color: var(--ml-ui-text, #303133);
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.04));
    }

    .ml-ex-ui-dock-tab-overflow-btn.is-active {
      border-bottom-color: var(--ml-ui-accent, #409eff);
    }

    .ml-ex-ui-dock-tab[hidden] {
      display: none;
    }

    .ml-ex-ui-dock-tab {
      flex: 0 0 auto;
      border: none;
      border-bottom: 2px solid transparent;
      background: transparent;
      color: var(--ml-ui-text-muted, #606266);
      padding: 6px 12px;
      font-size: 12px;
      cursor: pointer;
      white-space: nowrap;
    }

    .ml-ex-ui-dock-tab:hover {
      color: var(--ml-ui-text, #303133);
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.04));
    }

    .ml-ex-ui-dock-tab.is-active {
      color: var(--ml-ui-text, #303133);
      border-bottom-color: var(--ml-ui-accent, #409eff);
    }

    .ml-ex-ui-dock-actions {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      gap: 2px;
      padding: 0 4px;
    }

    .ml-ex-ui-dock-action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--ml-ui-text-muted, #606266);
      cursor: pointer;
    }

    .ml-ex-ui-dock-action-btn:hover {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
      color: var(--ml-ui-text, #303133);
    }

    .ml-ex-ui-dock-body {
      flex: 1 1 auto;
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;
    }

    .ml-ex-ui-dock-tab-panel {
      position: absolute;
      inset: 0;
      overflow: auto;
    }

    .ml-ex-ui-dock-tab-panel:has(> .ml-ex-ui-review-palette),
    .ml-ex-ui-dock-tab-panel:has(> .ml-ex-ui-measure-palette),
    .ml-ex-ui-dock-tab-panel:has(> .ml-ex-ui-layer-list) {
      overflow: hidden;
    }

    .ml-ex-ui-dock-tab-panel[hidden] {
      display: none;
    }

    .ml-ex-ui-dock-side-menu {
      position: fixed;
      z-index: 110;
      min-width: 160px;
      padding: 4px 0;
      background: var(--ml-ui-bg, #ffffff);
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 6px;
      box-shadow: var(--ml-ui-shadow, 0 6px 18px rgba(0, 0, 0, 0.35));
    }

    .ml-ex-ui-dock-side-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      border: none;
      background: transparent;
      color: var(--ml-ui-text, #303133);
      padding: 6px 12px;
      font-size: 12px;
      cursor: pointer;
      text-align: left;
    }

    .ml-ex-ui-dock-side-menu-item:hover {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
    }

    .ml-ex-ui-dock-side-menu-item.is-selected {
      color: var(--ml-ui-accent, #409eff);
    }

    .ml-ex-ui-dock-tab-overflow-menu {
      position: fixed;
      z-index: 110;
      min-width: 160px;
      padding: 4px 0;
      background: var(--ml-ui-bg, #ffffff);
      border: 1px solid var(--ml-ui-border, #dcdfe6);
      border-radius: 6px;
      box-shadow: var(--ml-ui-shadow, 0 6px 18px rgba(0, 0, 0, 0.35));
    }

    .ml-ex-ui-dock-tab-overflow-menu-item {
      display: block;
      width: 100%;
      border: none;
      background: transparent;
      color: var(--ml-ui-text, #303133);
      padding: 6px 12px;
      font-size: 12px;
      cursor: pointer;
      text-align: left;
      white-space: nowrap;
    }

    .ml-ex-ui-dock-tab-overflow-menu-item:hover {
      background: var(--ml-ui-border, rgba(0, 0, 0, 0.06));
    }

    .ml-ex-ui-dock-tab-overflow-menu-item.is-selected {
      color: var(--ml-ui-accent, #409eff);
    }

    @media (max-width: ${vt}px) {
      .ml-ex-ui-dock-panel[data-open='true'][data-phone-sheet='true'] {
        position: absolute;
        left: 0;
        right: 0;
        top: auto;
        bottom: var(--ml-ex-ui-phone-sheet-inset, 0px);
        width: 100%;
        height: var(--ml-ex-ui-dock-size);
        max-height: calc(100% - var(--ml-ex-ui-phone-sheet-inset, 0px));
        flex: none;
        flex-direction: column;
        z-index: 35;
        border: none;
        border-top: 1px solid var(--ml-ui-border, #dcdfe6);
        border-radius: 12px 12px 0 0;
        box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.18);
      }

      .ml-ex-ui-dock-panel[data-phone-sheet='true'] .ml-ex-ui-dock-resize-handle {
        display: none;
      }

      .ml-ex-ui-dock-panel[data-phone-sheet='true'] .ml-ex-ui-dock-sheet-chrome {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        min-height: 28px;
      }

      .ml-ex-ui-dock-panel[data-phone-sheet='true'] .ml-ex-ui-dock-header {
        display: none;
      }

      .ml-ex-ui-host-dock-sheet .ml-ex-ui-dock-main {
        flex: 1 1 auto;
      }
    }
  `,document.head.appendChild(r)}function Ya(){var r;lt(),!document.querySelector(".ml-ex-ui-layer-manager, .ml-ex-ui-dock-panel, .ml-ex-ui-review-palette, .ml-ex-ui-measure-palette")&&((r=document.getElementById(H))==null||r.remove())}const B=120,be=.75,Za=28;class qa{constructor(e){this.tabs=new Map,this.overflowTabIds=[],this.resizeStartPos=0,this.resizeStartSize=0,this.handleResizePointerDown=o=>{if(o.button!==0||!this.isPanelOpen)return;o.preventDefault(),this.resizePointerId=o.pointerId,this.resizeStartPos=this.usesVerticalResize()?o.clientY:o.clientX,this.resizeStartSize=this.size;const i=o.currentTarget instanceof HTMLElement?o.currentTarget:this.resizeHandle;this.resizeCaptureTarget=i,i.setPointerCapture(o.pointerId),document.addEventListener("pointermove",this.handleResizePointerMove),document.addEventListener("pointerup",this.handleResizePointerUp),document.addEventListener("pointercancel",this.handleResizePointerUp)},this.handleResizePointerMove=o=>{if(this.resizePointerId!==o.pointerId)return;o.preventDefault();const i=this.usesPhoneSheet()?this.resizeStartPos-o.clientY:this.side==="bottom"?this.resizeStartPos-o.clientY:this.side==="top"?o.clientY-this.resizeStartPos:this.side==="right"?this.resizeStartPos-o.clientX:o.clientX-this.resizeStartPos;this.setSize(this.resizeStartSize+i)},this.handleResizePointerUp=o=>{if(this.resizePointerId!==o.pointerId)return;this.resizePointerId=void 0;const i=this.resizeCaptureTarget??this.resizeHandle;i.hasPointerCapture(o.pointerId)&&i.releasePointerCapture(o.pointerId),this.resizeCaptureTarget=void 0,document.removeEventListener("pointermove",this.handleResizePointerMove),document.removeEventListener("pointerup",this.handleResizePointerUp),document.removeEventListener("pointercancel",this.handleResizePointerUp)},this.handleDocumentPointerDown=o=>{o.target instanceof Node&&(this.sideMenuRoot&&!this.sideMenuRoot.contains(o.target)&&!this.sideMenuButton.contains(o.target)&&this.closeSideMenu(),this.overflowMenuRoot&&!this.overflowMenuRoot.contains(o.target)&&!this.overflowButton.contains(o.target)&&this.closeOverflowMenu())},this.handleMobileMediaChange=()=>{this.usesPhoneSheet()&&this.side!=="bottom"&&this.side!=="top"&&(this.size=this.defaultHeight),this.applyLayoutState()},this.host=e.host,this.i18n=e.i18n,this.side=e.defaultSide??"left",this.isPanelOpen=e.defaultOpen??!1,this.defaultHeight=e.defaultHeight??240,this.defaultWidth=e.defaultWidth??280,this.onOpen=e.onOpen,this.size=this.side==="bottom"||this.side==="top"?this.defaultHeight:this.defaultWidth,T(),this.ensureHostLayout(),this.root=document.createElement("div"),this.root.className="ml-ex-ui-dock-panel",this.root.dataset.side=this.side,this.root.dataset.open=String(this.isPanelOpen),this.resizeHandle=document.createElement("div"),this.resizeHandle.className="ml-ex-ui-dock-resize-handle",this.resizeHandle.addEventListener("pointerdown",this.handleResizePointerDown),this.contentEl=document.createElement("div"),this.contentEl.className="ml-ex-ui-dock-content";const t=document.createElement("div");t.className="ml-ex-ui-dock-header",this.tabsWrap=document.createElement("div"),this.tabsWrap.className="ml-ex-ui-dock-tabs-wrap",this.tabsEl=document.createElement("div"),this.tabsEl.className="ml-ex-ui-dock-tabs",this.tabsEl.setAttribute("role","tablist"),this.overflowButton=document.createElement("button"),this.overflowButton.type="button",this.overflowButton.className="ml-ex-ui-dock-tab-overflow-btn",this.overflowButton.hidden=!0,this.overflowButton.textContent="»",this.overflowButton.title=this.i18n.t("dockPanel.moreTabs"),this.overflowButton.setAttribute("aria-label",this.i18n.t("dockPanel.moreTabs")),this.overflowButton.addEventListener("click",o=>{o.stopPropagation(),this.toggleOverflowMenu()}),this.tabsWrap.appendChild(this.tabsEl),this.tabsWrap.appendChild(this.overflowButton),this.tabOverflowObserver=new ResizeObserver(()=>{this.scheduleUpdateTabOverflow()}),this.tabOverflowObserver.observe(this.tabsWrap);const a=document.createElement("div");a.className="ml-ex-ui-dock-actions",this.sideMenuButton=document.createElement("button"),this.sideMenuButton.type="button",this.sideMenuButton.className="ml-ex-ui-dock-action-btn",this.sideMenuButton.title=this.i18n.t("dockPanel.dockSide"),this.sideMenuButton.setAttribute("aria-label",this.i18n.t("dockPanel.dockSide")),this.sideMenuButton.appendChild(E(Xt)),this.sideMenuButton.addEventListener("click",o=>{o.stopPropagation(),this.toggleSideMenu()}),this.closeButton=document.createElement("button"),this.closeButton.type="button",this.closeButton.className="ml-ex-ui-dock-action-btn",this.closeButton.title=this.i18n.t("dockPanel.close"),this.closeButton.setAttribute("aria-label",this.i18n.t("dockPanel.close")),this.closeButton.appendChild(E(Me)),this.closeButton.addEventListener("click",()=>this.close()),a.appendChild(this.sideMenuButton),a.appendChild(this.closeButton),t.appendChild(this.tabsWrap),t.appendChild(a),this.bodyEl=document.createElement("div"),this.bodyEl.className="ml-ex-ui-dock-body",this.contentEl.appendChild(t),this.contentEl.appendChild(this.bodyEl),this.sheetChrome=document.createElement("div"),this.sheetChrome.className="ml-ex-ui-dock-sheet-chrome",this.sheetGrabber=document.createElement("div"),this.sheetGrabber.className="ml-ex-ui-dock-sheet-grabber",this.sheetGrabber.setAttribute("role","separator"),this.sheetGrabber.setAttribute("aria-orientation","horizontal"),this.sheetGrabber.title=this.i18n.t("dockPanel.resize"),this.sheetGrabber.setAttribute("aria-label",this.i18n.t("dockPanel.resize")),this.sheetGrabber.addEventListener("pointerdown",this.handleResizePointerDown),this.sheetCloseButton=document.createElement("button"),this.sheetCloseButton.type="button",this.sheetCloseButton.className="ml-ex-ui-dock-sheet-close",this.sheetCloseButton.title=this.i18n.t("dockPanel.close"),this.sheetCloseButton.setAttribute("aria-label",this.i18n.t("dockPanel.close")),this.sheetCloseButton.appendChild(E(Qt)),this.sheetCloseButton.addEventListener("click",()=>this.close()),this.sheetChrome.append(this.sheetGrabber,this.sheetCloseButton),this.root.appendChild(this.sheetChrome),this.root.appendChild(this.contentEl),this.root.appendChild(this.resizeHandle),this.ensureDockMainWrapper(),this.mountToHost(),this.bindMobileMediaQuery(),this.applyLayoutState()}hasTab(e){return this.tabs.has(e)}addTab(e){if(this.tabs.has(e.id)||!e.labelKey&&!e.label)return!1;const t=`ml-ex-ui-dock-tab-${e.id}`,a=`ml-ex-ui-dock-tabpanel-${e.id}`,o=document.createElement("button");o.type="button",o.className="ml-ex-ui-dock-tab",o.id=t,o.setAttribute("role","tab"),o.setAttribute("aria-controls",a),o.dataset.tabId=e.id,o.textContent=this.getTabLabel(e),o.addEventListener("click",()=>{this.openPanel(e.id)});const i=document.createElement("div");return i.className="ml-ex-ui-dock-tab-panel",i.id=a,i.setAttribute("role","tabpanel"),i.setAttribute("aria-labelledby",t),i.dataset.tabId=e.id,i.hidden=!0,i.tabIndex=-1,i.appendChild(e.content),this.tabs.set(e.id,{id:e.id,labelKey:e.labelKey,label:e.label,tabButton:o,panel:i}),this.tabsEl.appendChild(o),this.bodyEl.appendChild(i),this.activeTabId||this.setActiveTab(e.id),this.scheduleUpdateTabOverflow(),!0}reparentTo(e){if(this.host===e){this.ensureMounted(),this.applyLayoutState();return}const t=this.isPanelOpen,a=this.activeTabId;this.closeSideMenu(),this.closeOverflowMenu(),this.releaseDockMainWrapper(),this.root.remove(),this.clearHostLayoutClasses(),this.host=e,this.ensureHostLayout(),this.ensureDockMainWrapper(),this.mountToHost(),this.isPanelOpen=t,a&&this.tabs.has(a)&&this.setActiveTab(a),this.ensureMounted(),this.applyLayoutState()}ensureMounted(){this.root.isConnected||this.mountToHost()}removeTab(e){const t=this.tabs.get(e);if(t){if(t.tabButton.remove(),t.panel.remove(),this.tabs.delete(e),this.activeTabId===e){const a=this.tabs.keys().next().value;this.activeTabId=void 0,a&&this.setActiveTab(a)}this.scheduleUpdateTabOverflow()}}get hasTabs(){return this.tabs.size>0}open(e){var t;(t=this.onOpen)==null||t.call(this),e?this.setActiveTab(e):this.activeTabId?this.setActiveTab(this.activeTabId):this.tabs.size>0&&this.setActiveTab(this.tabs.keys().next().value),this.isPanelOpen=!0,this.ensureMounted(),this.applyLayoutState()}close(){this.isPanelOpen=!1,this.closeSideMenu(),this.closeOverflowMenu(),this.applyLayoutState()}toggle(e){if(this.isPanelOpen&&(!e||this.activeTabId===e)){this.close();return}this.open(e)}setSide(e){if(this.side===e)return;const t=this.side;this.side=e,(t==="left"||t==="right")&&(e==="left"||e==="right")||(t==="top"||t==="bottom")&&(e==="top"||e==="bottom")||(this.size=e==="bottom"||e==="top"?this.defaultHeight:this.defaultWidth),this.closeSideMenu(),this.closeOverflowMenu(),this.mountToHost(),this.applyLayoutState(),this.scheduleUpdateTabOverflow()}getMountHost(){return this.host}get isOpen(){return this.isPanelOpen}getSide(){return this.side}getSize(){return this.size}setPanelSize(e){this.setSize(e)}get activeTab(){return this.activeTabId}refreshLocale(){for(const e of this.tabs.values())e.tabButton.textContent=this.getTabLabel(e);this.sideMenuButton.title=this.i18n.t("dockPanel.dockSide"),this.sideMenuButton.setAttribute("aria-label",this.i18n.t("dockPanel.dockSide")),this.closeButton.title=this.i18n.t("dockPanel.close"),this.closeButton.setAttribute("aria-label",this.i18n.t("dockPanel.close")),this.overflowButton.title=this.i18n.t("dockPanel.moreTabs"),this.overflowButton.setAttribute("aria-label",this.i18n.t("dockPanel.moreTabs")),this.sheetGrabber.title=this.i18n.t("dockPanel.resize"),this.sheetGrabber.setAttribute("aria-label",this.i18n.t("dockPanel.resize")),this.sheetCloseButton.title=this.i18n.t("dockPanel.close"),this.sheetCloseButton.setAttribute("aria-label",this.i18n.t("dockPanel.close")),this.sideMenuRoot&&this.renderSideMenuItems(),this.overflowMenuRoot&&this.renderOverflowMenuItems(),this.scheduleUpdateTabOverflow()}destroy(){var e;document.removeEventListener("pointerdown",this.handleDocumentPointerDown,!0),document.removeEventListener("pointermove",this.handleResizePointerMove),document.removeEventListener("pointerup",this.handleResizePointerUp),document.removeEventListener("pointercancel",this.handleResizePointerUp),this.tabOverflowFrame!==void 0&&(cancelAnimationFrame(this.tabOverflowFrame),this.tabOverflowFrame=void 0),(e=this.tabOverflowObserver)==null||e.disconnect(),this.tabOverflowObserver=void 0,this.unbindMobileMediaQuery(),this.closeSideMenu(),this.closeOverflowMenu(),this.releaseDockMainWrapper(),this.clearHostLayoutClasses(),this.root.remove()}openPanel(e){this.setActiveTab(e),this.isPanelOpen=!0,this.applyLayoutState()}setActiveTab(e){if(this.tabs.has(e)){this.activeTabId=e;for(const t of this.tabs.values()){const a=t.id===e;t.tabButton.classList.toggle("is-active",a),t.tabButton.setAttribute("aria-selected",String(a)),t.tabButton.tabIndex=a?0:-1,t.panel.hidden=!a,a?t.panel.removeAttribute("aria-hidden"):t.panel.setAttribute("aria-hidden","true")}this.scheduleUpdateTabOverflow()}}ensureHostLayout(){getComputedStyle(this.host).position==="static"&&(this.host.style.position="relative"),this.host.classList.contains("ml-ex-ui-host-dock")||this.host.classList.add("ml-ex-ui-host-dock")}ensureDockMainWrapper(){var e;if((e=this.dockMainWrapper)!=null&&e.isConnected)return;const t=[];if(Array.from(this.host.childNodes).forEach(o=>{o instanceof HTMLElement&&o.classList.contains("ml-ex-ui-dock-panel")||t.push(o)}),t.length===0)return;const a=document.createElement("div");a.className="ml-ex-ui-dock-main",t.forEach(o=>a.appendChild(o)),this.host.appendChild(a),this.dockMainWrapper=a}releaseDockMainWrapper(){var e;if(!((e=this.dockMainWrapper)!=null&&e.isConnected)){this.dockMainWrapper=void 0;return}for(;this.dockMainWrapper.firstChild;)this.host.insertBefore(this.dockMainWrapper.firstChild,this.dockMainWrapper);this.dockMainWrapper.remove(),this.dockMainWrapper=void 0}clearHostLayoutClasses(){this.host.classList.remove("ml-ex-ui-host-dock","ml-ex-ui-host-dock-top","ml-ex-ui-host-dock-bottom","ml-ex-ui-host-dock-left","ml-ex-ui-host-dock-right","ml-ex-ui-host-dock-sheet")}mountToHost(){if(this.ensureDockMainWrapper(),this.root.isConnected&&this.root.remove(),this.side==="left"||this.side==="top"){this.host.insertBefore(this.root,this.host.firstChild);return}this.host.appendChild(this.root)}applyLayoutState(){const e=this.usesPhoneSheet();this.root.dataset.side=this.side,this.root.dataset.open=String(this.isPanelOpen),this.root.dataset.phoneSheet=String(e),this.host.classList.remove("ml-ex-ui-host-dock-top","ml-ex-ui-host-dock-bottom","ml-ex-ui-host-dock-left","ml-ex-ui-host-dock-right","ml-ex-ui-host-dock-sheet"),this.isPanelOpen&&this.host.classList.add(e?"ml-ex-ui-host-dock-sheet":`ml-ex-ui-host-dock-${this.side}`),e?this.syncPhoneSheetInset():this.root.style.removeProperty("--ml-ex-ui-phone-sheet-inset"),this.root.style.setProperty("--ml-ex-ui-dock-size",`${this.size}px`),this.scheduleUpdateTabOverflow()}setSize(e){const t=this.getMaxSize();this.size=Math.max(B,Math.min(t,e)),this.root.style.setProperty("--ml-ex-ui-dock-size",`${this.size}px`),this.scheduleUpdateTabOverflow()}getMaxSize(){if(this.usesPhoneSheet()||this.side==="bottom"||this.side==="top"){const e=this.usesPhoneSheet()?this.host.clientHeight-this.getPhoneChromeInset():this.host.clientHeight;return Math.max(B,e*be)}return Math.max(B,this.host.clientWidth*be)}usesPhoneSheet(){return Ze()}usesVerticalResize(){return this.usesPhoneSheet()||this.side==="bottom"||this.side==="top"}bindMobileMediaQuery(){typeof window.matchMedia=="function"&&(this.mobileMediaQuery=window.matchMedia(qe),this.mobileMediaQuery.addEventListener("change",this.handleMobileMediaChange))}unbindMobileMediaQuery(){var e;(e=this.mobileMediaQuery)==null||e.removeEventListener("change",this.handleMobileMediaChange),this.mobileMediaQuery=void 0}syncPhoneSheetInset(){this.root.style.setProperty("--ml-ex-ui-phone-sheet-inset",`${this.getPhoneChromeInset()}px`)}getPhoneChromeInset(){let e=0;const t=this.host.querySelector(".ml-ex-ui-toolbar");return t instanceof HTMLElement&&this.isElementVisible(t)&&(e+=t.offsetHeight),this.host.querySelectorAll(".ml-ex-ui-subtoolbar").forEach(a=>{a instanceof HTMLElement&&this.isElementVisible(a)&&(e+=a.offsetHeight)}),e}isElementVisible(e){return e.hidden?!1:e.offsetParent!==null||e.getClientRects().length>0}toggleSideMenu(){if(this.sideMenuRoot){this.closeSideMenu();return}this.closeOverflowMenu(),this.openSideMenu()}openSideMenu(){this.sideMenuRoot=document.createElement("div"),this.sideMenuRoot.className="ml-ex-ui-dock-side-menu",this.sideMenuRoot.setAttribute("role","menu"),this.renderSideMenuItems();const e=this.sideMenuButton.getBoundingClientRect();this.host.appendChild(this.sideMenuRoot),this.sideMenuRoot.style.top=`${e.bottom+4}px`,this.sideMenuRoot.style.left=`${Math.max(8,e.right-160)}px`,this.syncOutsidePointerListener()}renderSideMenuItems(){this.sideMenuRoot&&(this.sideMenuRoot.replaceChildren(),[{side:"top",labelKey:"dockPanel.dockTop",icon:xe},{side:"bottom",labelKey:"dockPanel.dockBottom",icon:ke},{side:"left",labelKey:"dockPanel.dockLeft",icon:we},{side:"right",labelKey:"dockPanel.dockRight",icon:Pe}].forEach(e=>{const t=document.createElement("button");t.type="button",t.className="ml-ex-ui-dock-side-menu-item",t.setAttribute("role","menuitem"),e.side===this.side&&t.classList.add("is-selected"),t.appendChild(E(e.icon));const a=document.createElement("span");a.textContent=this.i18n.t(e.labelKey),t.appendChild(a),t.addEventListener("click",o=>{o.stopPropagation(),this.setSide(e.side),this.closeSideMenu()}),this.sideMenuRoot.appendChild(t)}))}closeSideMenu(){var e;(e=this.sideMenuRoot)==null||e.remove(),this.sideMenuRoot=void 0,this.syncOutsidePointerListener()}syncOutsidePointerListener(){document.removeEventListener("pointerdown",this.handleDocumentPointerDown,!0),(this.sideMenuRoot||this.overflowMenuRoot)&&document.addEventListener("pointerdown",this.handleDocumentPointerDown,!0)}scheduleUpdateTabOverflow(){this.tabOverflowFrame===void 0&&(this.tabOverflowFrame=requestAnimationFrame(()=>{this.tabOverflowFrame=void 0,this.updateTabOverflow()}))}updateTabOverflow(){const e=Array.from(this.tabs.values());if(e.length===0){this.overflowButton.hidden=!0,this.overflowTabIds=[];return}this.overflowButton.hidden=!0,e.forEach(n=>{n.tabButton.hidden=!1});const t=this.tabsWrap.clientWidth;if(t<=0)return;if(e.reduce((n,c)=>n+c.tabButton.offsetWidth,0)<=t){this.overflowTabIds=[],this.overflowButton.hidden=!0,this.overflowButton.classList.remove("is-active"),this.overflowMenuRoot&&this.closeOverflowMenu();return}const a=this.activeTabId??e[0].id,o=t-Za,i=new Set(e.map(n=>n.id)),l=new Set,s=()=>e.filter(n=>i.has(n.id)).reduce((n,c)=>n+c.tabButton.offsetWidth,0);for(;i.size>1&&s()>o;){let n;for(let c=e.length-1;c>=0;c-=1){const d=e[c].id;if(!(d===a||!i.has(d))){n=d;break}}if(!n)break;i.delete(n),l.add(n)}if(!i.has(a))for(l.delete(a),i.add(a);i.size>1&&s()>o;){let n;for(let c=e.length-1;c>=0;c-=1){const d=e[c].id;if(!(d===a||!i.has(d))){n=d;break}}if(!n)break;i.delete(n),l.add(n)}e.forEach(n=>{n.tabButton.hidden=l.has(n.id)}),this.overflowTabIds=e.filter(n=>l.has(n.id)).map(n=>n.id),this.overflowButton.hidden=this.overflowTabIds.length===0,this.overflowButton.classList.toggle("is-active",this.overflowTabIds.includes(a)),this.overflowMenuRoot&&this.overflowTabIds.length===0?this.closeOverflowMenu():this.overflowMenuRoot&&this.renderOverflowMenuItems()}getTabLabel(e){return e.label?e.label:e.labelKey?this.i18n.t(e.labelKey):""}toggleOverflowMenu(){if(this.overflowMenuRoot){this.closeOverflowMenu();return}this.closeSideMenu(),this.openOverflowMenu()}openOverflowMenu(){if(this.overflowTabIds.length===0)return;this.overflowMenuRoot=document.createElement("div"),this.overflowMenuRoot.className="ml-ex-ui-dock-tab-overflow-menu",this.overflowMenuRoot.setAttribute("role","menu"),this.renderOverflowMenuItems();const e=this.overflowButton.getBoundingClientRect();this.host.appendChild(this.overflowMenuRoot),this.overflowMenuRoot.style.top=`${e.bottom+4}px`,this.overflowMenuRoot.style.left=`${Math.max(8,e.right-180)}px`,this.syncOutsidePointerListener()}renderOverflowMenuItems(){this.overflowMenuRoot&&(this.overflowMenuRoot.replaceChildren(),this.overflowTabIds.forEach(e=>{const t=this.tabs.get(e);if(!t)return;const a=document.createElement("button");a.type="button",a.className="ml-ex-ui-dock-tab-overflow-menu-item",a.setAttribute("role","menuitem"),e===this.activeTabId&&a.classList.add("is-selected"),a.textContent=this.getTabLabel(t),a.addEventListener("click",o=>{o.stopPropagation(),this.openPanel(e),this.closeOverflowMenu()}),this.overflowMenuRoot.appendChild(a)}))}closeOverflowMenu(){var e;(e=this.overflowMenuRoot)==null||e.remove(),this.overflowMenuRoot=void 0,this.syncOutsidePointerListener()}}class Xa{constructor(e,t,a){this.i18n=e,T(),this.backdrop=document.createElement("div"),this.backdrop.className="ml-ex-ui-color-dialog-backdrop",this.backdrop.addEventListener("mousedown",u=>{u.target===this.backdrop&&this.finish(null)});const o=document.createElement("div");o.className="ml-ex-ui-color-dialog",o.addEventListener("mousedown",u=>u.stopPropagation());const i=document.createElement("div");i.className="ml-ex-ui-color-dialog-header";const l=document.createElement("div");l.className="ml-ex-ui-color-dialog-title",l.textContent=this.i18n.t("colorPicker.title");const s=document.createElement("button");s.type="button",s.className="ml-ex-ui-color-dialog-close",s.setAttribute("aria-label","Close"),s.textContent="×",s.addEventListener("click",()=>this.finish(null)),i.appendChild(l),i.appendChild(s),o.appendChild(i),this.picker=ft({labels:{index:this.i18n.t("colorPicker.index"),rgb:this.i18n.t("colorPicker.rgb"),input:this.i18n.t("colorPicker.input"),inputPlaceholder:this.i18n.t("colorPicker.inputPlaceholder")},initialIndex:this.toColorIndex(a)}),o.appendChild(this.picker.root);const n=document.createElement("div");n.className="ml-ex-ui-dialog-actions";const c=document.createElement("button");c.type="button",c.className="ml-ex-ui-btn",c.textContent=this.i18n.t("colorPicker.cancel"),c.addEventListener("click",()=>this.finish(null));const d=document.createElement("button");d.type="button",d.className="ml-ex-ui-btn ml-ex-ui-btn-primary",d.textContent=this.i18n.t("colorPicker.ok"),d.addEventListener("click",()=>this.finish(this.toSelectedColor())),n.appendChild(c),n.appendChild(d),o.appendChild(n),this.backdrop.appendChild(o),t.appendChild(this.backdrop)}open(){return new Promise(e=>{this.resolve=e})}finish(e){var t;this.picker.dispose(),this.backdrop.remove(),(t=this.resolve)==null||t.call(this,e),this.resolve=void 0}toColorIndex(e){return e?e.isByLayer?256:e.isByBlock?0:e.isByACI&&e.colorIndex!=null?e.colorIndex:null:null}toSelectedColor(){const e=this.picker.getIndex();if(e==null)return null;if(e===256){const t=new I;return t.setByLayer(),t}if(e===0){const t=new I;return t.setByBlock(),t}return new I(ta.ByACI,e)}}class Qa{constructor(e){if(this.nameSortOrder="none",this.handleDocumentActivated=()=>{this.bindToActiveDocument(),this.renderRows()},this.handleLayersChanged=()=>{this.renderRows()},this.editor=e.editor,this.i18n=e.i18n,this.host=e.host,this.showHeader=e.showHeader??!1,T(),this.element=document.createElement("div"),this.element.className="ml-ex-ui-layer-list",this.showHeader){const p=document.createElement("div");p.className="ml-ex-ui-layer-manager-header";const y=document.createElement("span");this.titleEl=y,y.textContent=e.i18n.t("layerManager.title"),p.appendChild(y),this.element.appendChild(p)}const t=document.createElement("div");t.className="ml-ex-ui-layer-table-wrap";const a=document.createElement("table");a.className="ml-ex-ui-layer-table";const o=document.createElement("thead"),i=document.createElement("tr"),l=document.createElement("th");this.nameHeaderEl=l,l.className="ml-ex-ui-layer-name-header is-sortable",l.setAttribute("role","columnheader"),l.setAttribute("aria-sort","none");const s=document.createElement("button");s.type="button",s.className="ml-ex-ui-layer-name-sort";const n=document.createElement("span");this.nameHeaderLabelEl=n,n.textContent=e.i18n.t("layerManager.name");const c=document.createElement("span");this.nameSortIndicatorEl=c,c.className="ml-ex-ui-layer-sort-indicator",c.setAttribute("aria-hidden","true"),s.appendChild(n),s.appendChild(c),s.addEventListener("click",()=>{this.cycleNameSortOrder()}),l.appendChild(s),this.updateNameSortHeader();const d=document.createElement("th");d.className="center";const u=document.createElement("div");u.className="ml-ex-ui-layer-header-on";const b=document.createElement("span");this.onLabelEl=b,b.textContent=e.i18n.t("layerManager.on"),this.masterCheckbox=document.createElement("input"),this.masterCheckbox.type="checkbox",this.masterCheckbox.addEventListener("change",()=>{const p=this.activeLayerStore;p&&(this.masterCheckbox.checked?p.setAllLayersOn():p.setAllLayersOffExceptCurrent())}),u.appendChild(b),u.appendChild(this.masterCheckbox),d.appendChild(u);const h=document.createElement("th");h.className="center",this.colorHeaderEl=h,h.textContent=e.i18n.t("layerManager.color"),i.appendChild(l),i.appendChild(d),i.appendChild(h),o.appendChild(i),this.tbody=document.createElement("tbody"),a.appendChild(o),a.appendChild(this.tbody),t.appendChild(a),this.element.appendChild(t),this.editor.events.documentActivated.addEventListener(this.handleDocumentActivated),this.bindToActiveDocument(),this.renderRows()}get activeLayerStore(){var e;return(e=this.editor.curDocument)==null?void 0:e.layerStore}bindToActiveDocument(){this.subscribedLayerStore&&this.subscribedLayerStore.events.changed.removeEventListener(this.handleLayersChanged),this.subscribedLayerStore=this.activeLayerStore,this.subscribedLayerStore&&this.subscribedLayerStore.events.changed.addEventListener(this.handleLayersChanged)}refreshLocale(){this.titleEl&&(this.titleEl.textContent=this.i18n.t("layerManager.title")),this.nameHeaderLabelEl.textContent=this.i18n.t("layerManager.name"),this.onLabelEl.textContent=this.i18n.t("layerManager.on"),this.colorHeaderEl.textContent=this.i18n.t("layerManager.color"),this.updateNameSortHeader()}cycleNameSortOrder(){this.nameSortOrder==="none"?this.nameSortOrder="asc":this.nameSortOrder==="asc"?this.nameSortOrder="desc":this.nameSortOrder="none",this.updateNameSortHeader(),this.renderRows()}updateNameSortHeader(){var e;const t=this.nameSortOrder==="asc"?"layerManager.sortByNameDesc":this.nameSortOrder==="desc"?"layerManager.sortByNameNone":"layerManager.sortByNameAsc",a=this.i18n.t(t);this.nameHeaderEl.title=a,(e=this.nameHeaderEl.querySelector("button"))==null||e.setAttribute("aria-label",a),this.nameHeaderEl.setAttribute("aria-sort",this.nameSortOrder==="asc"?"ascending":this.nameSortOrder==="desc"?"descending":"none"),this.nameHeaderEl.classList.toggle("is-sorted-asc",this.nameSortOrder==="asc"),this.nameHeaderEl.classList.toggle("is-sorted-desc",this.nameSortOrder==="desc"),this.nameSortIndicatorEl.textContent=this.nameSortOrder==="asc"?"▲":this.nameSortOrder==="desc"?"▼":""}getSortedLayers(e){if(this.nameSortOrder==="none")return e;const t=this.nameSortOrder==="asc"?1:-1;return[...e].sort((a,o)=>t*a.name.localeCompare(o.name,void 0,{numeric:!0,sensitivity:"base"}))}destroy(){this.editor.events.documentActivated.removeEventListener(this.handleDocumentActivated),this.subscribedLayerStore&&this.subscribedLayerStore.events.changed.removeEventListener(this.handleLayersChanged)}renderRows(){const e=this.activeLayerStore;if(this.tbody.replaceChildren(),!e){this.masterCheckbox.checked=!1,this.masterCheckbox.indeterminate=!1;return}const t=this.getSortedLayers(e.getLayers()),a=e.getCurrentLayerName();t.forEach(l=>{this.tbody.appendChild(this.createRow(l,a))});const o=t.length>0&&t.every(l=>l.isOn),i=t.some(l=>l.isOn);this.masterCheckbox.checked=o,this.masterCheckbox.indeterminate=i&&!o}createRow(e,t){const a=document.createElement("tr");a.addEventListener("dblclick",()=>{var d;(d=m.instance.curView)!=null&&d.zoomToFitLayer(e.name)&&this.showToast(this.i18n.t("layerManager.zoomToLayer",{layer:e.name}))});const o=document.createElement("td"),i=document.createElement("span");if(i.className="ml-ex-ui-layer-name",i.textContent=e.name,e.name===t){const d=document.createElement("span");d.className="ml-ex-ui-layer-current-marker",d.textContent="*",d.title=this.i18n.t("layerManager.currentLayer"),d.setAttribute("aria-hidden","true"),i.appendChild(d)}o.appendChild(i);const l=document.createElement("td");l.className="center";const s=document.createElement("input");s.type="checkbox",s.checked=e.isOn,s.addEventListener("change",()=>{var d;(d=this.activeLayerStore)==null||d.setLayerOn(e.name,s.checked)}),l.appendChild(s);const n=document.createElement("td");n.className="center";const c=document.createElement("span");return c.className="ml-ex-ui-layer-color",c.style.background=e.cssColor,c.addEventListener("click",async()=>{var d;const u=I.fromString(e.color),b=await new Xa(this.i18n,this.host,u??void 0).open();b&&((d=this.activeLayerStore)==null||d.setLayerColor(e.name,b))}),n.appendChild(c),a.appendChild(o),a.appendChild(l),a.appendChild(n),a}showToast(e){const t=document.createElement("div");t.className="ml-ex-ui-toast",t.textContent=e,document.body.appendChild(t),window.setTimeout(()=>t.remove(),1500)}}const Ja=["distance","arc","angle","area"];class eo{constructor(e){this.filterButtons=new Map,this.measurements=[],this.tableContentKey="",this.editor=e.editor,this.i18n=e.i18n,T(),this.element=document.createElement("div"),this.element.className="ml-ex-ui-measure-palette",this.buildDom(),this.refreshLocale(),this.unsubscribeList=Je(()=>this.syncFromStore()),this.unsubscribeSelection=et(()=>this.syncFromStore()),this.syncFromStore()}refreshLocale(){this.filterGroup.setAttribute("aria-label",this.i18n.t("measurePalette.filterGroup"));for(const[e,t]of this.filterButtons){const a=this.i18n.t(`measurePalette.typeValues.${e}`);t.textContent=a,t.title=a,t.setAttribute("aria-label",a)}this.clearButton.textContent=this.i18n.t("measurePalette.clear"),this.typeHeaderEl.textContent=this.i18n.t("measurePalette.type"),this.valueHeaderEl.textContent=this.i18n.t("measurePalette.value"),this.renderTable()}destroy(){var e,t;(e=this.unsubscribeList)==null||e.call(this),this.unsubscribeList=void 0,(t=this.unsubscribeSelection)==null||t.call(this),this.unsubscribeSelection=void 0}buildDom(){const e=document.createElement("div");e.className="ml-ex-ui-measure-toolbar",this.filterGroup=document.createElement("div"),this.filterGroup.className="ml-ex-ui-measure-filter",this.filterGroup.setAttribute("role","group");for(const l of Ja){const s=document.createElement("button");s.type="button",s.className="ml-ex-ui-measure-filter-btn",s.dataset.measureFilter=l,s.setAttribute("aria-pressed","false"),s.addEventListener("click",()=>this.toggleFilter(l)),this.filterButtons.set(l,s),this.filterGroup.appendChild(s)}e.appendChild(this.filterGroup),this.clearButton=document.createElement("button"),this.clearButton.type="button",this.clearButton.className="ml-ex-ui-measure-btn",this.clearButton.addEventListener("click",()=>this.clearAll()),e.appendChild(this.clearButton),this.element.appendChild(e);const t=document.createElement("div");t.className="ml-ex-ui-measure-table-wrap";const a=document.createElement("table");a.className="ml-ex-ui-measure-table";const o=document.createElement("thead"),i=document.createElement("tr");this.typeHeaderEl=document.createElement("th"),this.valueHeaderEl=document.createElement("th"),this.actionsHeaderEl=document.createElement("th"),this.actionsHeaderEl.className="ml-ex-ui-measure-actions-col",i.append(this.typeHeaderEl,this.valueHeaderEl,this.actionsHeaderEl),o.appendChild(i),a.appendChild(o),this.tbody=document.createElement("tbody"),this.tbody.addEventListener("click",l=>{const s=l.target;if(!(s instanceof Element))return;const n=s.closest("button[data-measure-delete]");if(n instanceof HTMLElement&&this.tbody.contains(n)){l.stopPropagation();const d=n.dataset.measureDelete;d&&this.removeOne(d);return}const c=this.rowMeasurementId(l);c&&this.handleRowClick(c)}),a.appendChild(this.tbody),t.appendChild(a),this.element.appendChild(t)}syncFromStore(){const e=this.editor.curView;this.measurements=e?tt(e):[],this.selectedId=at(),this.clearButton.disabled=this.measurements.length===0,this.refreshTable()}rowMeasurementId(e){const t=e.target;if(!(t instanceof Element))return;const a=t.closest("tr[data-measure-id]");if(!(!a||!this.tbody.contains(a)))return a instanceof HTMLElement?a.dataset.measureId:void 0}refreshTable(){var e;const t=(e=this.editor.curDocument)==null?void 0:e.database,a=this.measurements.map(o=>`${o.id}	${o.type}	${se(o.id,t)}`).join(`
`);if(a===this.tableContentKey&&this.tbody.querySelector("tr[data-measure-id], .ml-ex-ui-measure-empty-row")){this.syncRowSelection();return}this.tableContentKey=a,this.renderTable()}syncRowSelection(){this.tbody.querySelectorAll("tr[data-measure-id]").forEach(e=>{e.classList.toggle("is-selected",e.dataset.measureId===this.selectedId)})}renderTable(){var e;const t=this.filteredMeasurements(),a=(e=this.editor.curDocument)==null?void 0:e.database;if(this.tbody.replaceChildren(),t.length===0){const i=document.createElement("tr");i.className="ml-ex-ui-measure-empty-row";const l=document.createElement("td");l.colSpan=3,l.textContent=this.i18n.t("measurePalette.empty"),i.appendChild(l),this.tbody.appendChild(i);return}const o=this.i18n.t("measurePalette.delete");for(const i of t){const l=document.createElement("tr");l.className="ml-ex-ui-measure-row",l.dataset.measureId=i.id,i.id===this.selectedId&&l.classList.add("is-selected");const s=document.createElement("td");s.textContent=this.typeLabel(i.type);const n=document.createElement("td"),c=se(i.id,a)||"—";n.textContent=c,n.title=c;const d=document.createElement("td");d.className="ml-ex-ui-measure-actions-col";const u=document.createElement("button");u.type="button",u.className="ml-ex-ui-measure-btn ml-ex-ui-measure-btn-danger ml-ex-ui-measure-row-delete",u.dataset.measureDelete=i.id,u.textContent=o,u.title=o,u.setAttribute("aria-label",o),d.appendChild(u),l.append(s,n,d),this.tbody.appendChild(l)}}filteredMeasurements(){return this.activeFilter?this.measurements.filter(e=>e.type===this.activeFilter):this.measurements}toggleFilter(e){this.activeFilter=this.activeFilter===e?void 0:e;for(const[t,a]of this.filterButtons){const o=this.activeFilter===t;a.classList.toggle("is-active",o),a.setAttribute("aria-pressed",String(o))}this.renderTable()}handleRowClick(e){const t=this.measurements.find(o=>o.id===e),a=this.editor.curView;!t||!a||ot(a,t)}removeOne(e){const t=this.editor.curView;t&&rt(t,e)}clearAll(){const e=this.editor.curView;e&&it(e)}typeLabel(e){const t=`measurePalette.typeValues.${e}`,a=this.i18n.t(t);return a===t?e:a}}class to{constructor(e){this.markups=[],this.tableContentKey="",this.detailsOpen=!0,this.editor=e.editor,this.i18n=e.i18n,T(),this.element=document.createElement("div"),this.element.className="ml-ex-ui-review-palette",this.buildDom(),this.refreshLocale(),this.unsubscribeStore=A().subscribe(()=>{this.syncFromStore()}),this.syncFromStore()}refreshLocale(){this.searchInput.placeholder=this.i18n.t("reviewPalette.searchPlaceholder"),this.clearButton.textContent=this.i18n.t("reviewPalette.clear"),this.typeHeaderEl.textContent=this.i18n.t("reviewPalette.type"),this.statusHeaderEl.textContent=this.i18n.t("reviewPalette.status"),this.authorHeaderEl.textContent=this.i18n.t("reviewPalette.author"),this.summaryHeaderEl.textContent=this.i18n.t("reviewPalette.summary"),this.detailTitleEl.textContent=this.i18n.t("reviewPalette.details");const e=this.i18n.t("reviewPalette.closeDetails");this.closeDetailsButton.title=e,this.closeDetailsButton.setAttribute("aria-label",e),this.statusFieldLabelEl.textContent=this.i18n.t("reviewPalette.status"),this.authorFieldLabelEl.textContent=this.i18n.t("reviewPalette.author"),this.textFieldLabelEl.textContent=this.i18n.t("reviewPalette.label"),this.commentFieldLabelEl.textContent=this.i18n.t("reviewPalette.comment"),this.zoomButton.textContent=this.i18n.t("reviewPalette.zoomTo"),this.deleteButton.textContent=this.i18n.t("reviewPalette.delete"),this.rebuildStatusOptions(),this.renderTable(),this.updateDetailFields({preserveDrafts:!0})}destroy(){var e;(e=this.unsubscribeStore)==null||e.call(this),this.unsubscribeStore=void 0}buildDom(){const e=document.createElement("div");e.className="ml-ex-ui-review-toolbar",this.searchInput=document.createElement("input"),this.searchInput.type="search",this.searchInput.className="ml-ex-ui-review-search",this.searchInput.addEventListener("input",()=>this.renderTable()),e.appendChild(this.searchInput),this.clearButton=document.createElement("button"),this.clearButton.type="button",this.clearButton.className="ml-ex-ui-review-btn",this.clearButton.addEventListener("click",()=>this.clearAll()),e.appendChild(this.clearButton),this.element.appendChild(e);const t=document.createElement("div");t.className="ml-ex-ui-review-table-wrap";const a=document.createElement("table");a.className="ml-ex-ui-review-table";const o=document.createElement("thead"),i=document.createElement("tr");this.typeHeaderEl=document.createElement("th"),this.statusHeaderEl=document.createElement("th"),this.authorHeaderEl=document.createElement("th"),this.summaryHeaderEl=document.createElement("th"),i.append(this.typeHeaderEl,this.statusHeaderEl,this.authorHeaderEl,this.summaryHeaderEl),o.appendChild(i),a.appendChild(o),this.tbody=document.createElement("tbody"),this.tbody.addEventListener("click",h=>{const p=this.rowMarkupId(h);p&&this.handleRowClick(p)}),this.tbody.addEventListener("dblclick",h=>{const p=this.rowMarkupId(h);if(!p)return;const y=this.markups.find(S=>S.id===p);y&&this.handleRowDblClick(y)}),a.appendChild(this.tbody),t.appendChild(a),this.element.appendChild(t),this.detailEl=document.createElement("div"),this.detailEl.className="ml-ex-ui-review-detail",this.detailEl.hidden=!0;const l=document.createElement("div");l.className="ml-ex-ui-review-detail-header",this.detailTitleEl=document.createElement("div"),this.detailTitleEl.className="ml-ex-ui-review-detail-title",this.closeDetailsButton=document.createElement("button"),this.closeDetailsButton.type="button",this.closeDetailsButton.className="ml-ex-ui-review-detail-close",this.closeDetailsButton.appendChild(E(Me)),this.closeDetailsButton.addEventListener("click",()=>this.closeDetails()),l.append(this.detailTitleEl,this.closeDetailsButton),this.detailEl.appendChild(l);const s=document.createElement("div");s.className="ml-ex-ui-review-detail-form";const n=this.createField();this.statusFieldLabelEl=n.label,this.statusSelect=document.createElement("select"),this.statusSelect.className="ml-ex-ui-review-select",this.statusSelect.addEventListener("change",()=>{const h=this.selectedMarkup();h&&this.updateMeta(h.id,{status:this.statusSelect.value})}),n.body.appendChild(this.statusSelect),s.appendChild(n.root);const c=this.createField();this.authorFieldLabelEl=c.label,this.authorInput=document.createElement("input"),this.authorInput.type="text",this.authorInput.className="ml-ex-ui-review-input",this.authorInput.disabled=!0,c.body.appendChild(this.authorInput),s.appendChild(c.root);const d=this.createField();this.textFieldLabelEl=d.label,this.textInput=document.createElement("input"),this.textInput.type="text",this.textInput.className="ml-ex-ui-review-input",this.textInput.addEventListener("blur",()=>this.commitText()),this.textInput.addEventListener("keydown",h=>{h.key!=="Enter"||h.isComposing||h.keyCode===229||(h.preventDefault(),this.commitText(),this.textInput.blur())}),d.body.appendChild(this.textInput),s.appendChild(d.root);const u=this.createField();this.commentFieldLabelEl=u.label,this.commentInput=document.createElement("textarea"),this.commentInput.className="ml-ex-ui-review-textarea",this.commentInput.rows=2,this.commentInput.addEventListener("blur",()=>this.commitComment()),u.body.appendChild(this.commentInput),s.appendChild(u.root);const b=document.createElement("div");b.className="ml-ex-ui-review-detail-actions",this.zoomButton=document.createElement("button"),this.zoomButton.type="button",this.zoomButton.className="ml-ex-ui-review-btn",this.zoomButton.addEventListener("click",()=>{const h=this.selectedMarkup();h&&this.focusMarkup(h)}),this.deleteButton=document.createElement("button"),this.deleteButton.type="button",this.deleteButton.className="ml-ex-ui-review-btn ml-ex-ui-review-btn-danger",this.deleteButton.addEventListener("click",()=>{const h=this.selectedMarkup();h&&this.removeMarkup(h.id)}),b.append(this.zoomButton,this.deleteButton),s.appendChild(b),this.detailEl.appendChild(s),this.element.appendChild(this.detailEl)}createField(){const e=document.createElement("div");e.className="ml-ex-ui-review-field";const t=document.createElement("label");t.className="ml-ex-ui-review-field-label";const a=document.createElement("div");return a.className="ml-ex-ui-review-field-body",e.append(t,a),{root:e,label:t,body:a}}rebuildStatusOptions(){const e=this.statusSelect.value;this.statusSelect.replaceChildren();for(const t of Xe){const a=document.createElement("option");a.value=t,a.textContent=this.statusLabel(t),this.statusSelect.appendChild(a)}e&&(this.statusSelect.value=e)}syncFromStore(){const e=A(),t=this.lastSelectedId;this.markups=e.list(),this.selectedId=e.selectedId,t&&t!==this.selectedId&&this.commitDraftsFor(t),this.selectedId&&this.selectedId!==t&&(this.loadDrafts(),this.detailsOpen=!0),this.selectedId||(this.detailsOpen=!1),this.lastSelectedId=this.selectedId,this.clearButton.disabled=this.markups.length===0,this.refreshTable(),this.updateDetailFields({preserveDrafts:this.selectedId===t})}rowMarkupId(e){const t=e.target;if(!(t instanceof Element))return;const a=t.closest("tr[data-markup-id]");if(!(!a||!this.tbody.contains(a)))return a instanceof HTMLElement?a.dataset.markupId:void 0}refreshTable(){const e=this.markups.map(t=>`${t.id}	${t.type}	${t.status}	${t.author}	${t.text??""}	${t.comment}`).join(`
`);if(e===this.tableContentKey&&this.tbody.querySelector("tr[data-markup-id], .ml-ex-ui-review-empty-row")){this.syncRowSelection();return}this.tableContentKey=e,this.renderTable()}syncRowSelection(){this.tbody.querySelectorAll("tr[data-markup-id]").forEach(e=>{e.classList.toggle("is-selected",e.dataset.markupId===this.selectedId)})}renderTable(){const e=this.filteredMarkups();if(this.tbody.replaceChildren(),e.length===0){const t=document.createElement("tr");t.className="ml-ex-ui-review-empty-row";const a=document.createElement("td");a.colSpan=4,a.textContent=this.i18n.t("reviewPalette.empty"),t.appendChild(a),this.tbody.appendChild(t);return}for(const t of e){const a=document.createElement("tr");a.className="ml-ex-ui-review-row",a.dataset.markupId=t.id,t.id===this.selectedId&&a.classList.add("is-selected");const o=document.createElement("td");o.textContent=this.typeLabel(t.type);const i=document.createElement("td");i.textContent=this.statusLabel(t.status);const l=document.createElement("td");l.textContent=t.author,l.title=t.author;const s=document.createElement("td"),n=t.text||t.comment||"—";s.textContent=n,s.title=n,a.append(o,i,l,s),this.tbody.appendChild(a)}}updateDetailFields(e){const t=this.selectedMarkup(),a=!!(t&&this.detailsOpen);if(this.detailEl.hidden=!a,!(!t||!a)){if(this.statusSelect.value=t.status,this.authorInput.value=t.author,e.preserveDrafts){const o=document.activeElement;o!==this.textInput&&(this.textInput.value=t.text??""),o!==this.commentInput&&(this.commentInput.value=t.comment??"");return}this.loadDrafts()}}loadDrafts(){const e=this.selectedMarkup();this.textInput.value=(e==null?void 0:e.text)??"",this.commentInput.value=(e==null?void 0:e.comment)??"",this.authorInput.value=(e==null?void 0:e.author)??"",e&&(this.statusSelect.value=e.status)}filteredMarkups(){const e=this.searchInput.value.trim().toLowerCase();return e?this.markups.filter(t=>`${t.type} ${t.status} ${t.author} ${t.text??""} ${t.comment}`.toLowerCase().includes(e)):this.markups}selectedMarkup(){return this.markups.find(e=>e.id===this.selectedId)}handleRowClick(e){this.detailsOpen=!0;const t=this.editor.curView;t&&w().select(t,e),this.updateDetailFields({preserveDrafts:!0})}handleRowDblClick(e){this.handleRowClick(e.id),this.focusMarkup(e)}closeDetails(){this.commitText(),this.commitComment(),this.detailsOpen=!1,this.detailEl.hidden=!0}commitText(){const e=this.selectedId;if(!e)return;const t=this.markups.find(i=>i.id===e),a=this.textInput.value,o=(t==null?void 0:t.text)??"";a!==o&&this.updateMeta(e,{text:a})}commitComment(){const e=this.selectedId;if(!e)return;const t=this.markups.find(i=>i.id===e),a=this.commentInput.value,o=(t==null?void 0:t.comment)??"";a!==o&&this.updateMeta(e,{comment:a})}commitDraftsFor(e){const t=this.markups.find(l=>l.id===e);if(!t)return;const a=this.textInput.value,o=this.commentInput.value,i={};a!==(t.text??"")&&(i.text=a),o!==(t.comment??"")&&(i.comment=o),Object.keys(i).length!==0&&this.updateMeta(e,i)}updateMeta(e,t){const a=this.editor.curView;a&&Qe(a,"Edit Markup",()=>{const o=A().updateMeta(e,t);o&&(t.text!==void 0||t.comment!==void 0)&&w().publish(a,o)})}focusMarkup(e){const t=this.editor.curView;t&&w().focus(t,e)}removeMarkup(e){const t=this.editor.curView;t&&w().unpublish(t,e)}clearAll(){const e=this.editor.curView;e&&w().clearVisuals(e,{clearStore:!0})}statusLabel(e){return this.i18n.t(`reviewPalette.statusValues.${e}`)}typeLabel(e){const t=`reviewPalette.typeValues.${e}`,a=this.i18n.t(t);return a===t?e:a}}const g="layers",C="review",M="measurements";class Fe{constructor(e={}){this.options=e,this.name=_e,this.version=ca.version,this.description="Framework-agnostic toolbar, layer manager, and review palette UI",this.layerUiControllerHolder=new ua,this.baseToolbarItems=[],this.toolbarItemsInput="default",this.toolbarItemsOverridden=!1,this.hasLayerToolbarItem=!1,this.hasMarkupPanelToolbarItem=!1,this.hasMeasurementPanelToolbarItem=!1,this.dockPanelExplicitlyEnabled=!1,this.toolbarPlacement="right",this.toolbarCollapsible=!1,this.toolbarEdgeOffset=8,this.toolbarSideOffset=0,this.toolbarInCanvasParent=!1,this.toolbarShowLabels=!1,this.toolbarShowChildrenIndicator=!0,this.toolbarShowBorder=!0,this.toolbarShowButtonBorder=!1,this.toolbarShowSeparators=!0,this.toolbarSize="auto",this.toolbarOverflow="menu",this.layoutMode="auto",this.activeLayoutKind="desktop",this.registeredCommands=[],this.handleLocaleChanged=()=>{var t,a,o,i,l;this.rebuildToolbarItems(this.activeLayoutKind),(t=this.toolbar)==null||t.setSelectedChild("locale",`locale-${f.currentLocale}`),(a=this.layerListView)==null||a.refreshLocale(),(o=this.reviewPaletteView)==null||o.refreshLocale(),(i=this.measurementPaletteView)==null||i.refreshLocale(),(l=this.dockPanel)==null||l.refreshLocale(),this.toolbar&&(this.toolbar.updateItems(this.baseToolbarItems),this.toolbar.refreshLocale())},this.handleDocumentActivatedForDock=()=>{var t,a;this.hasLayerToolbarItem&&this.mountLayerDockUi(),this.hasMarkupPanelToolbarItem&&this.mountReviewDockUi(),this.hasMeasurementPanelToolbarItem&&this.mountMeasurementDockUi(),this.tryUpgradeDockMountTarget(),(t=this.dockPanel)==null||t.ensureMounted(),this.ensureViewerToolbar(),this.tryUpgradeToolbarMountTarget(),(a=this.toolbar)==null||a.syncInParentLayout()}}addDockPanelTab(e){return!e.labelKey&&!e.label||(this.ensureDockReady(),!this.dockPanel)||!this.dockPanel.addTab(e)?!1:(this.dockPanel.open(e.id),!0)}isDockPanelOpen(){var e;return((e=this.dockPanel)==null?void 0:e.isOpen)??!1}hasDockPanelTab(e){var t;return((t=this.dockPanel)==null?void 0:t.hasTab(e))??!1}toggleDockPanelTab(e){var t;return!((t=this.dockPanel)!=null&&t.hasTab(e))||(this.ensureDockReady(),!this.dockPanel)?!1:(this.dockPanel.toggle(e),!0)}setDockPanelOpen(e){return e?(this.ensureDockReady(),this.dockPanel?(this.dockPanel.open(),!0):(console.warn("[SimpleUiPlugin] setDockPanelOpen skipped: dock panel is unavailable."),!1)):(this.dockPanel&&this.dockPanel.close(),!0)}getDockPanelSide(){var e;return(e=this.dockPanel)==null?void 0:e.getSide()}getDockPanelSize(){var e;return(e=this.dockPanel)==null?void 0:e.getSize()}setDockPanelSize(e){return this.ensureDockReady(),this.dockPanel?(this.dockPanel.setPanelSize(e),!0):(console.warn("[SimpleUiPlugin] setDockPanelSize skipped: dock panel is unavailable."),!1)}getToolbarItems(){return this.toolbarItemsInput}setToolbarItems(e,t){if(!this.toolbar)return;this.toolbarItemsOverridden=!0,this.toolbarLayoutSwitcher=t,this.toolbarItemsInput=e;const a=this.resolveBaseToolbarItems(e);this.baseToolbarItems=t?_(a,t):a,this.syncLayerToolbarItem(),this.syncReviewToolbarItem(),this.syncMeasurementToolbarItem(),this.renderToolbarItems()}getToolbarPlacement(){return this.toolbarPlacement}setToolbarPlacement(e){return this.toolbar?(this.applyToolbarPlacement(e),!0):(console.warn("[SimpleUiPlugin] setToolbarPlacement skipped: toolbar is unavailable."),!1)}isToolbarVisible(){var e;return((e=this.toolbar)==null?void 0:e.isVisible)??!1}setToolbarVisible(e){var t;return this.toolbar?(this.toolbar.setVisible(e),e||(t=this.dockPanel)==null||t.close(),!0):(console.warn("[SimpleUiPlugin] setToolbarVisible skipped: toolbar is unavailable."),!1)}isToolbarCollapsed(){var e;return((e=this.toolbar)==null?void 0:e.isCollapsed)??!1}setToolbarCollapsed(e){return this.toolbar?this.toolbarCollapsible?(this.toolbar.setCollapsed(e),!0):(console.warn("[SimpleUiPlugin] setToolbarCollapsed skipped: toolbar is not collapsible."),!1):(console.warn("[SimpleUiPlugin] setToolbarCollapsed skipped: toolbar is unavailable."),!1)}getToolbarEdgeOffset(){var e;return((e=this.toolbar)==null?void 0:e.getEdgeOffset())??this.toolbarEdgeOffset}getLayout(){return this.activeLayoutKind}setLayout(e){var t;return!this.toolbar&&e!==this.layoutMode?(this.layoutMode=e,!0):this.toolbar?(this.layoutMode=e,(t=this.unsubscribeLayout)==null||t.call(this),this.unsubscribeLayout=void 0,e==="auto"?(this.unsubscribeLayout=$e(a=>{a!==this.activeLayoutKind&&this.applyLayoutKind(a)}),this.applyLayoutKind(oe())):this.applyLayoutKind(e),!0):!1}setToolbarEdgeOffset(e){return this.toolbar?(this.toolbarEdgeOffset=Math.max(0,e),this.toolbar.setEdgeOffset(this.toolbarEdgeOffset),!0):(console.warn("[SimpleUiPlugin] setToolbarEdgeOffset skipped: toolbar is unavailable."),!1)}onLoad(e,t){var a,o,i;Ue(),this.commandManager=t,O.instance.set("isShowRibbon",!1,{persist:!1});const l=ya(this.options),s=l.host??((a=m.instance.curView)==null?void 0:a.container)??document.body;this.hostEl=s,this.dockPanelMountTargetOption=(o=this.options.dockPanel)==null?void 0:o.mountTarget,this.toolbarMountTargetOption=(i=this.options.toolbar)==null?void 0:i.mountTarget,this.layoutMode=l.layout,this.dockPanelExplicitlyEnabled=l.dockPanel.enabled===!0,this.dockPanelDefaults={defaultOpen:l.dockPanel.defaultOpen??!1,defaultSide:l.dockPanel.defaultSide??"left",defaultHeight:l.dockPanel.defaultHeight??240,defaultWidth:l.dockPanel.defaultWidth??280},this.themeSync=new ja(s,()=>{var d;return(d=this.toolbar)==null?void 0:d.refresh()}),this.themeSync.start(),this.i18n=new He,f.events.localeChanged.addEventListener(this.handleLocaleChanged),m.instance.events.documentActivated.addEventListener(this.handleDocumentActivatedForDock);const n=this.layoutMode==="auto"?oe():this.layoutMode,c=this.isViewerToolbarEnabled();this.applyLayoutKind(n,{skipToolbarApply:!c}),l.shouldCreateDockPanel&&this.ensureDockPanel(),this.hasLayerToolbarItem&&(this.mountLayerDockUi(),this.ensureLayerCommandRegistered()),this.hasMarkupPanelToolbarItem&&(this.mountReviewDockUi(),this.ensureMarkupPanelCommandRegistered()),this.hasMeasurementPanelToolbarItem&&(this.mountMeasurementDockUi(),this.ensureMeasurementPanelCommandRegistered()),this.ensureViewerToolbar(s)}isViewerToolbarEnabled(){var e;return((e=this.options.toolbar)==null?void 0:e.enabled)!==!1}ensureViewerToolbar(e){var t;if(!this.isViewerToolbarEnabled())return;if(this.toolbar){if(this.toolbar.isRootConnected())return;(t=this.toolbarDocUnbind)==null||t.call(this),this.toolbarDocUnbind=void 0,this.toolbar.destroy(),this.toolbar=void 0,this.toolbarMountEl=void 0}const a=e??this.hostEl;if(!a||!this.i18n)return;const o=this.getToolbarMountEl()??a;this.toolbarMountEl=o;const i=this.getMergedToolbarOptions(this.activeLayoutKind);try{this.toolbar=new ye({host:o,themeHost:a,placement:this.toolbarPlacement,edgeOffset:this.toolbarEdgeOffset,sideOffset:this.toolbarSideOffset,items:this.baseToolbarItems,i18n:this.i18n,collapsible:this.toolbarCollapsible,defaultCollapsed:i.defaultCollapsed,showLabels:this.toolbarShowLabels,showChildrenIndicator:this.toolbarShowChildrenIndicator,size:this.toolbarSize,overflow:this.toolbarOverflow,showBorder:this.toolbarShowBorder,showButtonBorder:this.toolbarShowButtonBorder,showSeparators:this.toolbarShowSeparators,inCanvasParent:this.toolbarInCanvasParent,subToolbar:this.toolbarSubToolbar,onCollapse:()=>{var l;(l=this.dockPanel)==null||l.close()},onExclusiveOpen:()=>this.dismissDockForExclusiveChrome(),onCommand:l=>{m.instance.sendStringToExecute(l)}}),this.toolbarDocUnbind=je(this.toolbar)}catch(l){console.error("[SimpleUiPlugin] Failed to create viewer toolbar:",l);return}try{this.setLayout(this.layoutMode)}catch(l){console.warn("[SimpleUiPlugin] setLayout failed during toolbar setup:",l)}}getToolbarMountEl(){if(this.hostEl)return this.toolbarInCanvasParent?N(this.hostEl,this.toolbarMountTargetOption):Na(this.hostEl,this.toolbarMountTargetOption)}tryUpgradeToolbarMountTarget(){var e;if(this.toolbarMountTargetOption||!this.hostEl||!this.toolbar)return;const t=this.getToolbarMountEl();if(!t||t===this.toolbarMountEl)return;const a=(e=m.instance.curView)==null?void 0:e.container,o=a==null?void 0:a.parentElement;this.toolbarMountEl!==this.hostEl&&this.toolbarMountEl!==a&&this.toolbarMountEl!==o||(this.toolbar.reparentTo(t),this.toolbarMountEl=t,this.toolbar.syncInParentLayout())}getMergedToolbarOptions(e){var t,a;return De(e,this.options.toolbar,(a=(t=this.options.layouts)==null?void 0:t[e])==null?void 0:a.toolbar)}applyLayoutKind(e,t){this.activeLayoutKind=e;const a=this.getMergedToolbarOptions(e);this.toolbarPlacement=a.placement??"right",this.toolbarCollapsible=a.collapsible??!1,this.toolbarEdgeOffset=a.edgeOffset??8,this.toolbarSideOffset=a.sideOffset??0,this.toolbarShowLabels=a.showLabels??!1,this.toolbarShowChildrenIndicator=a.showChildrenIndicator??!0,this.toolbarShowBorder=a.showBorder??!0,this.toolbarShowButtonBorder=a.showButtonBorder??!1,this.toolbarShowSeparators=a.showSeparators??!0,this.toolbarSize=a.size??"auto",this.toolbarOverflow=a.overflow??"menu",this.toolbarSubToolbar=a.subToolbar;const o=a.inCanvasParent===!0,i=o!==this.toolbarInCanvasParent;if(this.toolbarInCanvasParent=o,this.rebuildToolbarItems(e,a),this.syncLayerToolbarItem(),this.syncReviewToolbarItem(),this.syncMeasurementToolbarItem(),!(t!=null&&t.skipToolbarApply||!this.toolbar)){if(this.toolbar.applyViewOptions({placement:this.toolbarPlacement,edgeOffset:this.toolbarEdgeOffset,sideOffset:this.toolbarSideOffset,collapsible:this.toolbarCollapsible,defaultCollapsed:a.defaultCollapsed,showLabels:this.toolbarShowLabels,showChildrenIndicator:this.toolbarShowChildrenIndicator,size:this.toolbarSize,overflow:this.toolbarOverflow,showBorder:this.toolbarShowBorder,showButtonBorder:this.toolbarShowButtonBorder,showSeparators:this.toolbarShowSeparators,subToolbar:this.toolbarSubToolbar,inCanvasParent:this.toolbarInCanvasParent,items:this.baseToolbarItems}),i||!this.toolbar.isRootConnected()){const l=this.getToolbarMountEl();l&&(this.toolbar.reparentTo(l),this.toolbarMountEl=l)}this.toolbar.syncInParentLayout()}}getToolbarContext(){return{getTheme:()=>{var e;return((e=this.themeSync)==null?void 0:e.getTheme())??"dark"},setTheme:e=>{var t;return(t=this.themeSync)==null?void 0:t.setTheme(e)},getLocale:()=>f.currentLocale,setLocale:e=>this.setLocale(e),getPlacement:()=>this.toolbarPlacement,setPlacement:e=>{this.applyToolbarPlacement(e)}}}rebuildToolbarItems(e,t){if(this.toolbarItemsOverridden){const o=this.resolveBaseToolbarItems(this.toolbarItemsInput);this.baseToolbarItems=this.toolbarLayoutSwitcher?_(o,this.toolbarLayoutSwitcher):o;return}const a=t??this.getMergedToolbarOptions(e);this.toolbarItemsInput=a.items??"default",this.baseToolbarItems=U(a,this.getToolbarContext(),e)}resolveBaseToolbarItems(e){return U({items:e,appendItems:void 0},this.getToolbarContext(),this.activeLayoutKind)}renderToolbarItems(){var e;(e=this.toolbar)==null||e.updateItems(this.baseToolbarItems)}syncLayerToolbarItem(){const e=this.hasLayerToolbarItem,t=z(this.baseToolbarItems,"layer");this.hasLayerToolbarItem=t,t&&!e?(this.ensureLayerCommandRegistered(),this.mountLayerDockUi()):!t&&e&&(this.teardownLayerUi(),this.unregisterLayerCommand())}syncReviewToolbarItem(){const e=this.hasMarkupPanelToolbarItem,t=z(this.baseToolbarItems,"markup-panel");this.hasMarkupPanelToolbarItem=t,t&&!e?(this.ensureMarkupPanelCommandRegistered(),this.mountReviewDockUi()):!t&&e&&(this.teardownReviewUi(),this.unregisterMarkupPanelCommand())}syncMeasurementToolbarItem(){const e=this.hasMeasurementPanelToolbarItem,t=z(this.baseToolbarItems,"measurement-panel");this.hasMeasurementPanelToolbarItem=t,t&&!e?(this.ensureMeasurementPanelCommandRegistered(),this.mountMeasurementDockUi()):!t&&e&&(this.teardownMeasurementUi(),this.unregisterMeasurementPanelCommand())}unregisterLayerCommand(){if(!this.commandManager)return;const e=x.SYSTEMT_COMMAND_GROUP_NAME,t=this.registeredCommands.findIndex(a=>a.name==="layer");t!==-1&&(this.commandManager.removeCmd(e,"layer"),this.registeredCommands.splice(t,1))}ensureLayerCommandRegistered(){this.commandManager&&(this.registeredCommands.some(e=>e.name==="layer")||this.registerLayerCommand(this.commandManager))}unregisterMarkupPanelCommand(){if(!this.commandManager)return;const e=x.SYSTEMT_COMMAND_GROUP_NAME,t=this.registeredCommands.findIndex(a=>a.name==="markuppanel");t!==-1&&(this.commandManager.removeCmd(e,"markuppanel"),this.registeredCommands.splice(t,1))}ensureMarkupPanelCommandRegistered(){this.commandManager&&(this.registeredCommands.some(e=>e.name==="markuppanel")||this.registerMarkupPanelCommand(this.commandManager))}unregisterMeasurementPanelCommand(){if(!this.commandManager)return;const e=x.SYSTEMT_COMMAND_GROUP_NAME,t=this.registeredCommands.findIndex(a=>a.name==="measurementpanel");t!==-1&&(this.commandManager.removeCmd(e,"measurementpanel"),this.registeredCommands.splice(t,1))}ensureMeasurementPanelCommandRegistered(){this.commandManager&&(this.registeredCommands.some(e=>e.name==="measurementpanel")||this.registerMeasurementPanelCommand(this.commandManager))}registerLayerCommand(e){if(this.registeredCommands.some(a=>a.name==="layer"))return;const t=x.SYSTEMT_COMMAND_GROUP_NAME;e.addCommand(t,"layer","layer",this.createLayerCommand()),this.registeredCommands.push({group:t,name:"layer"})}createLayerCommand(){return new ha({prepare:()=>this.prepareLayerDockForCommand(),toggle:()=>this.layerUiControllerHolder.toggleFromCommand()})}prepareLayerDockForCommand(){this.mountLayerDockUi(),this.tryUpgradeDockMountTarget()}registerMarkupPanelCommand(e){if(this.registeredCommands.some(a=>a.name==="markuppanel"))return;const t=x.SYSTEMT_COMMAND_GROUP_NAME;e.addCommand(t,"markuppanel","markuppanel",this.createMarkupPanelCommand()),this.registeredCommands.push({group:t,name:"markuppanel"})}createMarkupPanelCommand(){return new ma({prepare:()=>this.prepareReviewDockForCommand(),toggle:()=>{var e;return(e=this.dockPanel)==null?void 0:e.open(C)}})}prepareReviewDockForCommand(){this.mountReviewDockUi(),this.tryUpgradeDockMountTarget()}registerMeasurementPanelCommand(e){if(this.registeredCommands.some(a=>a.name==="measurementpanel"))return;const t=x.SYSTEMT_COMMAND_GROUP_NAME;e.addCommand(t,"measurementpanel","measurementpanel",this.createMeasurementPanelCommand()),this.registeredCommands.push({group:t,name:"measurementpanel"})}createMeasurementPanelCommand(){return new pa({prepare:()=>this.prepareMeasurementDockForCommand(),toggle:()=>{var e;return(e=this.dockPanel)==null?void 0:e.open(M)}})}prepareMeasurementDockForCommand(){this.mountMeasurementDockUi(),this.tryUpgradeDockMountTarget()}ensureDockReady(){var e;if(!this.dockPanel){this.prepareDockPanel();return}this.hasLayerToolbarItem&&!this.dockPanel.hasTab(g)&&this.mountLayerDockUi(),this.hasMarkupPanelToolbarItem&&!this.dockPanel.hasTab(C)&&this.mountReviewDockUi(),this.hasMeasurementPanelToolbarItem&&!this.dockPanel.hasTab(M)&&this.mountMeasurementDockUi(),this.tryUpgradeDockMountTarget(),this.dockPanel.ensureMounted(),(e=this.toolbar)==null||e.syncInParentLayout()}prepareDockPanel(){this.hasLayerToolbarItem&&this.mountLayerDockUi(),this.hasMarkupPanelToolbarItem&&this.mountReviewDockUi(),this.hasMeasurementPanelToolbarItem&&this.mountMeasurementDockUi(),this.dockPanel||this.ensureDockPanel(),this.tryUpgradeDockMountTarget()}dismissStripsForDockPanel(){var e;(e=this.toolbar)!=null&&e.replaceOnNested&&this.toolbar.dismissOpenChildren()}dismissDockForExclusiveChrome(){var e,t;(e=this.toolbar)!=null&&e.replaceOnNested&&((t=this.dockPanel)==null||t.close())}ensureDockPanel(){const e=this.getDockMountEl();!e||!this.i18n||!this.dockPanelDefaults||this.dockPanel||(this.dockPanel=new qa({host:e,i18n:this.i18n,defaultSide:this.dockPanelDefaults.defaultSide,defaultOpen:this.dockPanelDefaults.defaultOpen,defaultHeight:this.dockPanelDefaults.defaultHeight,defaultWidth:this.dockPanelDefaults.defaultWidth,onOpen:()=>this.dismissStripsForDockPanel()}),this.syncToolbarMountAfterDockChange())}getDockMountEl(){if(this.hostEl)return N(this.hostEl,this.dockPanelMountTargetOption)}tryUpgradeDockMountTarget(){if(this.dockPanelMountTargetOption||!this.hostEl||!this.dockPanel)return;const e=N(this.hostEl),t=this.dockPanel.getMountHost();t!==e&&(t!==this.hostEl||e===this.hostEl||(this.dockPanel.reparentTo(e),this.refreshLayerDockController(),this.syncToolbarMountAfterDockChange()))}refreshLayerDockController(){var e,t;(e=this.dockPanel)!=null&&e.hasTab(g)&&((t=this.layerDockController)==null||t.destroy(),this.layerDockController=new ue(this.dockPanel,g),this.layerUiControllerHolder.current=this.layerDockController)}mountLayerDockUi(){if(!(!this.hostEl||!this.i18n||(this.ensureDockPanel(),!this.dockPanel))){if(this.dockPanel.hasTab(g)){this.refreshLayerDockController();return}if(this.layerListView=new Qa({editor:m.instance,i18n:this.i18n,host:this.hostEl,showHeader:!1}),!this.dockPanel.addTab({id:g,labelKey:"dockPanel.tab.layers",content:this.layerListView.element})){this.layerListView.destroy(),this.layerListView=void 0;return}this.layerDockController=new ue(this.dockPanel,g),this.layerUiControllerHolder.current=this.layerDockController}}teardownLayerUi(){var e,t,a;(e=this.dockPanel)==null||e.removeTab(g),(t=this.layerListView)==null||t.destroy(),this.layerListView=void 0,(a=this.layerDockController)==null||a.destroy(),this.layerDockController=void 0,this.layerUiControllerHolder.current=void 0,this.destroyDockIfUnused()}mountReviewDockUi(){!this.hostEl||!this.i18n||(this.ensureDockPanel(),!this.dockPanel)||this.dockPanel.hasTab(C)||(this.reviewPaletteView=new to({editor:m.instance,i18n:this.i18n}),this.dockPanel.addTab({id:C,labelKey:"dockPanel.tab.review",content:this.reviewPaletteView.element})||(this.reviewPaletteView.destroy(),this.reviewPaletteView=void 0))}teardownReviewUi(){var e,t;(e=this.dockPanel)==null||e.removeTab(C),(t=this.reviewPaletteView)==null||t.destroy(),this.reviewPaletteView=void 0,this.destroyDockIfUnused()}mountMeasurementDockUi(){!this.hostEl||!this.i18n||(this.ensureDockPanel(),!this.dockPanel)||this.dockPanel.hasTab(M)||(this.measurementPaletteView=new eo({editor:m.instance,i18n:this.i18n}),this.dockPanel.addTab({id:M,labelKey:"dockPanel.tab.measurements",content:this.measurementPaletteView.element})||(this.measurementPaletteView.destroy(),this.measurementPaletteView=void 0))}teardownMeasurementUi(){var e,t;(e=this.dockPanel)==null||e.removeTab(M),(t=this.measurementPaletteView)==null||t.destroy(),this.measurementPaletteView=void 0,this.destroyDockIfUnused()}destroyDockIfUnused(){this.dockPanel&&(this.dockPanel.hasTabs||(this.dockPanel.close(),!this.dockPanelExplicitlyEnabled&&(this.dockPanel.destroy(),this.dockPanel=void 0,this.syncToolbarMountAfterDockChange())))}syncToolbarMountAfterDockChange(){if(!this.toolbar||!this.hostEl)return;const e=this.getToolbarMountEl();e&&((e!==this.toolbarMountEl||!this.toolbar.isRootConnected())&&(this.toolbar.reparentTo(e),this.toolbarMountEl=e),this.toolbar.syncInParentLayout())}applyToolbarPlacement(e){var t;this.toolbarPlacement=e,(t=this.toolbar)==null||t.setPlacement(e)}onUnload(e,t){var a,o,i,l,s;(a=this.unsubscribeLayout)==null||a.call(this),this.unsubscribeLayout=void 0,f.events.localeChanged.removeEventListener(this.handleLocaleChanged),m.instance.events.documentActivated.removeEventListener(this.handleDocumentActivatedForDock);for(const n of this.registeredCommands)t.removeCmd(n.group,n.name);this.registeredCommands=[],this.teardownLayerUi(),this.teardownReviewUi(),this.teardownMeasurementUi(),(o=this.toolbarDocUnbind)==null||o.call(this),this.toolbarDocUnbind=void 0,(i=this.toolbar)==null||i.destroy(),(l=this.dockPanel)==null||l.destroy(),this.toolbar=void 0,this.toolbarMountEl=void 0,this.toolbarMountTargetOption=void 0,this.dockPanel=void 0,this.hostEl=void 0,this.dockPanelMountTargetOption=void 0,this.baseToolbarItems=[],this.toolbarItemsInput="default",this.toolbarItemsOverridden=!1,this.toolbarLayoutSwitcher=void 0,this.hasLayerToolbarItem=!1,this.hasMarkupPanelToolbarItem=!1,this.hasMeasurementPanelToolbarItem=!1,this.commandManager=void 0,this.i18n=void 0,(s=this.themeSync)==null||s.stop(),this.themeSync=void 0,O.instance.clearSessionOverride("isShowRibbon"),Ya()}setLocale(e){f.setCurrentLocale(e)}}function ao(r={}){return new Fe(r)}const oo=Object.freeze(Object.defineProperty({__proto__:null,AcApLayerStore:Jt,AcApSimpleUiPlugin:Fe,AcUiI18n:He,AcUiToolbar:ye,SIMPLE_UI_PLUGIN_NAME:_e,acuiCreateDefaultToolbarItems:W,acuiCreateDefaultToolbarPresetMap:j,acuiCreatePhoneToolbarItems:$,acuiCreateSettingsToolbarItem:K,acuiCreateSimpleUiPlugin:ao,acuiCreateToolbarSeparator:Ie,acuiCreateZoomToolbarItem:G,acuiMergeToolbarOptionsForLayout:De,acuiPrependToolbarLayoutSwitcher:_,acuiRegisterSimpleUiI18n:Ue,acuiRegisterSimpleUiPlugin:Oe,acuiResolveToolbarChrome:ea,acuiResolveToolbarItems:U,acuiToolbarPreset:v},Symbol.toStringTag,{value:"Module"})),ro="SvgPlugin",io=["csvg"];function lo(r){r.registerLazyPlugin({name:ro,triggers:[...io],loader:async()=>{const{createSvgPlugin:e}=await D(async()=>{const{createSvgPlugin:t}=await import("./cad-svg-plugin-B5dJ5vdp.js");return{createSvgPlugin:t}},[],import.meta.url);return e()}})}const Ge="./assets/viewer-runtime.iife.js",so=["chtml","","","","",""].join(`
`),no=["cpdf","","",""].join(`
`),co={getTheme:()=>"dark",setTheme:()=>{},getLocale:()=>"en",setLocale:()=>{},getPlacement:()=>"right",setPlacement:()=>{}};function uo(){const r=j(co).get("export");if(r!=null&&r.children)return{...r,children:r.children.map(e=>e.id==="export-html"?{...e,command:so}:e.id==="export-pdf"?{...e,command:no}:e)}}function ho(){const r=uo();return[v("select"),v("pan"),v("zoom-extent"),v("zoom-window"),v("layer"),v("layout"),v("measure"),v("annotation"),...r?[r]:[v("export")],Ie("sep-settings"),v("settings")]}let ve=!1,fe=!1;const Ke=()=>{if(ve)return;const r=m.instance.pluginManager,e=m.instance.disableExport;na(r,{disableExport:e}),e||(ia(r,{viewerRuntimeUrl:Ge}),lo(r)),ve=!0},We=async r=>{if(fe)return;const e=m.instance.disableExport;await Oe(m.instance.pluginManager,{host:r,dockPanel:{defaultOpen:!1,defaultSide:"left",defaultHeight:240,defaultWidth:280},toolbar:{placement:"right",items:e?"default":ho(),collapsible:!0,...e?{excludeItems:["export"]}:{}}}),fe=!0},mo=async r=>{Ke(),await We(r)},fo=Object.freeze(Object.defineProperty({__proto__:null,HTML_VIEWER_RUNTIME_URL:Ge,registerLazyPlugins:Ke,registerPlugins:mo,registerSimpleUi:We},Symbol.toStringTag,{value:"Module"}));export{sa as a,fo as b,oa as l,ra as o,ro as r,la as s,io as t};
