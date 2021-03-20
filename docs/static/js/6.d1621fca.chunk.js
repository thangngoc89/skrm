(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{111:function(e,t,n){"use strict";var r=n(0),a=n.n(r),i=n(1),o=n(498),l=n(72),c=n(497),u=n(7),f={center:"center",end:"right",start:"left"},s=Object(i.css)(["text-align:",";"],function(e){return f[e.textAlign]}),h=Object(i.css)(["color:",";"],function(e){return Object(l.c)(e.colorProp,e.theme)}),m=i.default.h1.withConfig({displayName:"StyledHeading",componentId:"sc-1rdh4aw-0"})([""," "," "," "," "," "," ",""],c.g,function(e){return function(e){var t=e.theme.heading.level[e.level].font;return t&&t.family?Object(i.css)(["font-family:",";"],t.family):e.theme.heading.font?Object(i.css)(["font-family:",";"],e.theme.heading.font.family):""}(e)},function(e){return function(e){var t=e.size||"medium",n=e.theme.heading,r=n.level[e.level];if(r){var a=r[t],l=[Object(i.css)(["font-size:",";line-height:",";max-width:",";font-weight:",";"],a.size,a.height,a.maxWidth,r.font.weight||n.weight)];if(e.responsive&&n.responsiveBreakpoint){var c=e.theme.global.breakpoints[n.responsiveBreakpoint];if(c){var u=n.level[Math.min(e.level+1,4)][t];l.push(Object(o.a)(c,"\n          font-size: "+u.size+";\n          line-height: "+u.height+";\n          max-width: "+u.maxWidth+";\n        "))}}return l}return console.warn("Heading level "+e.level+" is not defined in your theme."),""}(e)},function(e){return e.textAlign&&s},function(e){return e.truncate&&"\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"},function(e){return e.colorProp&&h},function(e){return e.theme.heading&&e.theme.heading.extend});function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}m.defaultProps={},Object.setPrototypeOf(m.defaultProps,u.a),n.d(t,"a",function(){return d});var v=function(e){var t=e.color,n=e.level,r=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["color","level"]);return a.a.createElement(m,p({as:"h"+n,colorProp:t,level:+n},r))};v.defaultProps={level:1,responsive:!0};var d=v},408:function(e,t,n){"use strict";var r=n(0),a=n.n(r),i=n(1),o=n(430);Object.assign,"function"===typeof Symbol&&Symbol.iterator;var l={global:{colors:{icon:"#666666"}},icon:{size:{small:"12px",medium:"24px",large:"48px",xlarge:"96px"}}},c={theme:l};n.d(t,"a",function(){return h});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};var f=Object(i.css)([""," ",' g{fill:inherit;stroke:inherit;}*:not([stroke]){&[fill="none"]{stroke-width:0;}}*[stroke*="#"],*[STROKE*="#"]{stroke:inherit;fill:none;}*[fill-rule],*[FILL-RULE],*[fill*="#"],*[FILL*="#"]{fill:inherit;stroke:none;}'],function(e){return Object(o.a)("fill",e.color||e.theme.global.colors.icon,e.theme)},function(e){return Object(o.a)("stroke",e.color||e.theme.global.colors.icon,e.theme)}),s=function(e){var t=e.a11yTitle,n=(e.color,e.size,e.theme,function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["a11yTitle","color","size","theme"]));return a.a.createElement("svg",u({"aria-label":t},n))};s.displayName="Icon";var h=Object(i.default)(s).withConfig({displayName:"StyledIcon",componentId:"ofa7kd-0"})(["display:inline-block;flex:0 0 auto;"," "," ",""],function(e){var t=e.size,n=void 0===t?"medium":t,r=e.theme;return"\n    width: "+(r.icon.size[n]||n)+";\n    height: "+(r.icon.size[n]||n)+";\n  "},function(e){return"plain"!==e.color&&f},function(e){var t=e.theme;return t&&t.icon.extend});h.defaultProps={},Object.setPrototypeOf(h.defaultProps,c)},574:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(450),o=n(581),l=n(111),c=n(39),u=n(408),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(e){return a.a.createElement(u.a,f({viewBox:"0 0 24 24",a11yTitle:"AddCircle"},e),a.a.createElement("path",{fill:"none",stroke:"#000",strokeWidth:"2",d:"M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,18 L12,6 M6,12 L18,12"}))},h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},m=function(e){return a.a.createElement(u.a,h({viewBox:"0 0 24 24",a11yTitle:"Database"},e),a.a.createElement("path",{fill:"none",stroke:"#000",strokeWidth:"2",d:"M1,2 L23,2 L23,9 L1,9 L1,2 Z M4,12 L5,12 L5,13 L4,13 L4,12 Z M4,5 L5,5 L5,6 L4,6 L4,5 Z M4,19 L5,19 L5,20 L4,20 L4,19 Z M1,16 L23,16 L23,23 L1,23 L1,16 Z M1,9 L23,9 L23,16 L1,16 L1,9 Z"}))},p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v=function(e){return a.a.createElement(u.a,p({viewBox:"0 0 24 24",a11yTitle:"Clock"},e),a.a.createElement("path",{fill:"none",stroke:"#000",strokeWidth:"2",d:"M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,5 L12,12 L17,12"}))},d=n(1);function g(){var e,t,n=(e=["\n  height: 4rem;\n  width: 100%;\n  font-size: 1.125rem;\n  font-weight: 700;\n  display: flex;\n  justify-content: center;\n  align-content: center;\n"],t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return g=function(){return n},n}n.d(t,"default",function(){return O});var b=Object(d.default)(i.a)(g());function O(){return a.a.createElement(o.a,{pad:"medium"},a.a.createElement(o.a,{margin:{vertical:"large"}},a.a.createElement(l.a,{level:1,textAlign:"center"},"VOSER - Qu\u1ea3n l\xed d\u1eef li\u1ec7u SKRM")),a.a.createElement(l.a,{level:2},"Ch\u1ecdn ch\u1ee9c n\u0103ng"),a.a.createElement(o.a,{gap:"large",direction:"row-responsive",margin:{vertical:"medium"}},a.a.createElement(b,{primary:!0,color:"accent-1",href:"/new",label:"Th\xeam ti\u1ec3u h\u1ecdc",icon:a.a.createElement(s,null),onClick:function(e){e.preventDefault(),Object(c.b)("/new")}}),a.a.createElement(b,{primary:!0,color:"accent-1",href:"/new/maugiao",label:"Th\xeam m\u1eabu gi\xe1o",icon:a.a.createElement(s,null),onClick:function(e){e.preventDefault(),Object(c.b)("/new/maugiao")}})),a.a.createElement(o.a,{gap:"large",direction:"row-responsive",margin:{vertical:"medium"}},a.a.createElement(b,{primary:!0,color:"accent-1",href:"/manage",label:"Qu\u1ea3n l\xed h\u1ed3 s\u01a1",icon:a.a.createElement(m,null),size:"large",onClick:function(e){e.preventDefault(),Object(c.b)("/manage")}})),a.a.createElement(o.a,{gap:"large",direction:"row-responsive",margin:{vertical:"medium"}},a.a.createElement(b,{primary:!0,color:"accent-3",href:"/stopwatch",label:"Stopwatch",icon:a.a.createElement(v,null),size:"large",onClick:function(e){e.preventDefault(),Object(c.b)("/stopwatch")}})))}}}]);
//# sourceMappingURL=6.d1621fca.chunk.js.map