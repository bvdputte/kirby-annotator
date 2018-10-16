!function a(o,n,c){function d(e,t){if(!n[e]){if(!o[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(h)return h(e,!0);var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}var i=n[e]={exports:{}};o[e][0].call(i.exports,function(t){return d(o[e][1][t]||t)},i,i.exports,a,o,n,c)}return n[e].exports}for(var h="function"==typeof require&&require,t=0;t<c.length;t++)d(c[t]);return d}({1:[function(n,t,c){!function(){"use strict";Object.defineProperty(c,"__esModule",{value:!0});var t=o(n(3)),e=o(n(4)),r=o(n(2)),s=o(n(6)),i=o(n(7)),a=o(n(5));function o(t){return t&&t.__esModule?t:{default:t}}c.default={components:{markerPin:s.default,markerRect:i.default,markerCircle:a.default,iconPin:t.default,iconRect:e.default,iconCircle:r.default},data:function(){return{showSelector:!1,currentTool:"",manualColor:"",storedColor:"",rotate:0,src:"",coords:{x:0,y:0,xabs:0,yabs:0},drag:{index:Number,type:String,isDragging:!1,isResizing:!1,handle:String,xref:Number,yref:Number,wref:Number,href:Number,maxRadius:Number},markers:[]}},props:{tools:Array,colors:Array,storage:Object,theme:String,parent:String,name:String,debug:Boolean,image:String},computed:{currentColor:function(){return""!=this.storedColor?this.storedColor:this.manualColor}},created:function(){var e=this;document.addEventListener("mouseup",this.stopDragging),this.$api.get(this.parent+"/sections/"+this.name).then(function(t){e.tools=t.tools,e.colors=t.colors,e.theme=t.theme,e.debug=t.debug,e.storage=t.storage,t.image&&(e.src=t.image),e.currentTool=e.tools[0],e.manualColor=e.colors[0],e.$annotator.registerAnnotator(e)})},destroyed:function(){this.$annotator.unregisterAnnotator(this),document.removeEventListener("mouseup",this.stopDragging)},methods:{toggleSelector:function(){this.showSelector=!this.showSelector},setColor:function(t){this.storage.color?this.$annotator.updateFields("color",this.storage.color,t):this.manualColor=t,this.showSelector=!1},setTool:function(t){this.currentTool=t},updateCoords:function(t){var e=this.$refs.markers,r=e.getBoundingClientRect(),s=e.clientWidth,i=e.clientHeight,a=t.clientX-r.left,o=t.clientY-r.top,n=a/s,c=o/i;n=Math.max(0,Math.min(1,n.toFixed(4))),c=Math.max(0,Math.min(1,c.toFixed(4))),this.coords.x=n,this.coords.y=c,this.coords.xabs=a,this.coords.yabs=o,this.drag.isDragging&&this.dragMarker(t),this.drag.isResizing&&this.resizeMarker(t)},addMarker:function(t){t.target;if(t.target!=this.$refs.markers)return!1;if(1!=t.which)return t.preventDefault(),!1;var e={type:this.currentTool,x:this.coords.x,y:this.coords.y,w:0,h:0};this.markers.push(e),this.drag.index=this.markers.length-1,this.drag.isResizing=!0,this.drag.type=this.currentTool,this.drag.handle="bottom-right",this.drag.xref=this.coords.x,this.drag.yref=this.coords.y,this.drag.maxRadius=this.getClosestSide(this.coords.xabs,this.coords.yabs)},getClosestSide:function(t,e){var r=this.$refs.markers,s=r.clientWidth,i=e,a=r.clientHeight-e,o=t,n=s-t;return Math.min(i,a,o,n)},dragMarker:function(t){var e=this.markers[this.drag.index];if("pin"==this.drag.type&&(e.x=this.coords.x,e.y=this.coords.y),"circle"==this.drag.type){this.$refs.markers;var r=e.w/2,s=1-r,i=e.h/2,a=1-i,o=Math.min(s,Math.max(r,this.coords.x)),n=Math.min(a,Math.max(i,this.coords.y));e.x=o,e.y=n}},resizeMarker:function(t){var e=this.markers[this.drag.index];if("rect"==this.drag.type){var r=parseFloat(e.x),s=parseFloat(e.y),i=parseFloat(e.w),a=parseFloat(e.h),o=parseFloat(this.drag.xref),n=parseFloat(this.drag.yref),c=parseFloat(this.drag.wref),d=parseFloat(this.drag.href);"bottom-right"==this.drag.handle?(i=this.coords.x-o,a=this.coords.y-n):"top-left"==this.drag.handle?(i=c+(o-(r=Math.min(o+c,this.coords.x))),a=d+(n-(s=Math.min(n+d,this.coords.y)))):"top-right"==this.drag.handle?(s=Math.min(n+d,this.coords.y),i=c+(this.coords.x-(o+c)),a=d+(n-s)):"bottom-left"==this.drag.handle&&(i=c+(o-(r=Math.min(o+c,this.coords.x))),a=this.coords.y-n),e.x=Math.max(0,Math.min(1,r.toFixed(4))),e.y=Math.max(0,Math.min(1,s.toFixed(4))),e.w=Math.max(0,Math.min(1,i.toFixed(4))),e.h=Math.max(0,Math.min(1,a.toFixed(4)))}else if("circle"==this.drag.type){var h=this.$refs.markers,l=h.clientWidth,u=h.clientHeight,f=this.coords.xabs-this.drag.xref*l,g=this.coords.yabs-this.drag.yref*u,p=Math.sqrt(Math.pow(f,2)+Math.pow(g,2));p=Math.min(this.drag.maxRadius,p),g=(f=2*(p/=l))*l/u,e.w=f.toFixed(4),e.h=g.toFixed(4);var m=180*Math.atan2(this.coords.yabs-this.drag.yref*u,this.coords.xabs-this.drag.xref*l)/Math.PI;this.rotate=m.toFixed(4)}},initDragResize:function(t){if(this.drag.index=t.index,this.drag.isDragging=t.drag,this.drag.isResizing=t.resize,this.drag.type=t.type,t.resize){var e=this.$refs.markers,r=this.markers[this.drag.index];"circle"==t.type&&(this.drag.xref=r.x,this.drag.yref=r.y,this.drag.maxRadius=this.getClosestSide(r.x*e.clientWidth,r.y*e.clientHeight)),"rect"==t.type&&(this.drag.handle=t.handle,this.drag.xref=r.x,this.drag.yref=r.y,this.drag.wref=r.w,this.drag.href=r.h)}},stopDragging:function(t){if(!this.drag.isDragging&&!this.drag.isResizing)return!1;this.updateStructure(),this.drag.index=Number,this.drag.isDragging=!1,this.drag.isResizing=!1,this.drag.type=String,this.drag.handle=String,this.drag.maxRadius=Number,this.rotate=0},setValue:function(t,e){try{for(var r in this.storage)if(this.storage[r]===t)switch(r){case"src":Array.isArray(e)?e.length?this.src=e[0].url:this.src="":this.src=e;break;case"color":this.storedColor=e;break;case"markers":if(!Array.isArray(e)){console.warn("could not adapt field to markers datapoint, not an array: ",e);break}this.markers=e.map(function(t){return{type:t.type,x:t.x,y:t.y,w:t.w,h:t.h}});break;default:this[r]=e}}catch(t){console.warn(t)}},updateStructure:function(){this.storage.markers&&this.$annotator.updateFields("markers",this.storage.markers,this.markers)}}}}(),t.exports.__esModule&&(t.exports=t.exports.default);var e="function"==typeof t.exports?t.exports.options:t.exports;e.render=function(){var r=this,t=r.$createElement,s=r._self._c||t;return s("div",{staticClass:"annotator",attrs:{"data-theme":r.theme,"data-color":r.currentColor}},[s("div",{staticClass:"annotator-background"}),r._v(" "),r.src?r._e():s("div",{staticClass:"annotator-placeholder"},[s("div",{staticClass:"annotator-placeholder-ctn"},[r._v("\n\t\t\tPlease select an image\n\t\t")])]),r._v(" "),r.src?s("div",{staticClass:"annotator-toolbar"},[s("div",{staticClass:"annotator-toolbar-inner"},[r._l(r.tools,function(e){return s("div",{class:["tool",e,{selected:r.currentTool==e}],on:{click:function(t){r.setTool(e)}}},[s("icon-"+e,{tag:"component"})],1)}),r._v(" "),s("div",{staticClass:"color"},[s("div",{staticClass:"color-selected blue",on:{click:r.toggleSelector}},[s("div",{staticClass:"circle"}),r._v(" "),s("svg",{attrs:{viewBox:"0 0 16 16"}},[s("use",{attrs:{"xlink:href":"#icon-angle-down"}})])]),r._v(" "),r.showSelector?s("div",{staticClass:"color-selector"},[s("ul",{staticClass:"colors"},r._l(r.colors,function(e){return s("li",{class:["color-entry",e],on:{click:function(t){r.setColor(e)}}},[s("div",{staticClass:"circle"})])}))]):r._e()])],2),r._v(" "),r.debug?s("div",{staticClass:"annotator-toolbar-debug"},[s("div",{staticClass:"coord x"},[r._v(r._s(r.coords.x))]),r._v(" "),s("div",{staticClass:"coord y"},[r._v(r._s(r.coords.y))])]):r._e()]):r._e(),r._v(" "),r.src?s("div",{staticClass:"annotator-ctn",on:{mousemove:r.updateCoords}},[s("div",{staticClass:"image"},[s("div",{staticClass:"image-ctn"},[s("div",{ref:"markers",staticClass:"markers",on:{mousemove:r.updateCoords,mousedown:r.addMarker}},r._l(r.markers,function(t,e){return s("marker-"+t.type,{key:e,tag:"component",attrs:{index:e,current:e==r.drag.index,marker:t,rotate:r.rotate},on:{initDragResize:r.initDragResize}})})),r._v(" "),s("img",{attrs:{src:r.src,alt:""}})])])]):r._e()])},e.staticRenderFns=[]},{2:2,3:3,4:4,5:5,6:6,7:7}],2:[function(t,e,r){var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 500 500"}},[e("path",{staticClass:"faded",attrs:{d:"M374,198.11a54.07,54.07,0,0,1-58.88-3.72L276.91,232.6A31.46,31.46,0,1,1,266.31,222l38.15-38.15a54.08,54.08,0,0,1-4.24-59.17,134.32,134.32,0,0,0-145,29.48,134,134,0,1,0,218.76,44Z"}}),this._v(" "),e("path",{staticClass:"vibrant",attrs:{d:"M355.37,354.27a149,149,0,1,1-45.69-241.9c-.16.14-.32.3-.48.46a52.45,52.45,0,0,0-4.75,5.43,53.73,53.73,0,0,0-4.23,6.41,134.32,134.32,0,0,0-145,29.48,134,134,0,1,0,218.76,44,52.49,52.49,0,0,0,6.39-4.25,54.84,54.84,0,0,0,5.23-4.6l.64-.66A149.27,149.27,0,0,1,355.37,354.27Zm24.8-177.92a41.9,41.9,0,0,1-3.49,4c-.62.62-1.25,1.21-1.9,1.78a40.46,40.46,0,0,1-6.14,4.48,41.47,41.47,0,0,1-44.44-1.25,40.66,40.66,0,0,1-6-5h0a40.68,40.68,0,0,1-4.63-5.52A41.51,41.51,0,0,1,311.78,130a41,41,0,0,1,4.46-6.16c.6-.69,1.24-1.38,1.9-2a42.93,42.93,0,0,1,3.81-3.37,41.39,41.39,0,0,1,58.22,57.94Zm-14.09-44a26.41,26.41,0,0,0-30-5.14,25.77,25.77,0,0,0-6.63,4.51q-.33.3-.66.63a26.37,26.37,0,0,0-4.37,31.54,25.93,25.93,0,0,0,4.37,5.79,26.19,26.19,0,0,0,6.36,4.69,26.49,26.49,0,0,0,25.82-.68,26.09,26.09,0,0,0,5.15-4c.25-.25.49-.5.71-.75a25.76,25.76,0,0,0,4.49-6.66A26.42,26.42,0,0,0,366.08,132.38ZM276.91,232.6A31.46,31.46,0,1,1,266.31,222l38.15-38.15a52.24,52.24,0,0,0,4.74,5.42,53.8,53.8,0,0,0,5.93,5.13Zm-11.24,11.25a16.46,16.46,0,1,0-4,16.7A16.33,16.33,0,0,0,265.67,243.85Z"}})])},s.staticRenderFns=[]},{}],3:[function(t,e,r){var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 500 500"}},[e("rect",{staticClass:"faded",attrs:{x:"139.61",y:"138.52",width:"220.78",height:"220.78",rx:"18",ry:"18"}}),this._v(" "),e("path",{staticClass:"vibrant",attrs:{d:"M115.39,189.74a7.5,7.5,0,0,1-7.5-7.5v-43a32.54,32.54,0,0,1,32.5-32.5h43a7.5,7.5,0,0,1,0,15h-43a17.52,17.52,0,0,0-17.5,17.5v43A7.5,7.5,0,0,1,115.39,189.74Zm276.72-7.5v-43a32.54,32.54,0,0,0-32.5-32.5h-43a7.5,7.5,0,0,0,0,15h43a17.52,17.52,0,0,1,17.5,17.5v43a7.5,7.5,0,1,0,15,0Zm0,176.27v-43a7.5,7.5,0,1,0-15,0v43a17.52,17.52,0,0,1-17.5,17.5h-43a7.5,7.5,0,0,0,0,15h43A32.54,32.54,0,0,0,392.11,358.52Zm-201.27,25a7.5,7.5,0,0,0-7.5-7.5h-43a17.52,17.52,0,0,1-17.5-17.5v-43a7.5,7.5,0,0,0-15,0v43a32.54,32.54,0,0,0,32.5,32.5h43A7.5,7.5,0,0,0,190.84,383.52ZM287,241H257V211.9a7.5,7.5,0,0,0-15,0V241H213a7.5,7.5,0,0,0,0,15h29v29.9a7.5,7.5,0,0,0,15,0V256h30a7.5,7.5,0,0,0,0-15Z"}})])},s.staticRenderFns=[]},{}],4:[function(t,e,r){var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 500 500"}},[e("path",{staticClass:"faded",attrs:{d:"M371,178.55v142.9A56.41,56.41,0,0,0,322.34,370H179.42A56.43,56.43,0,0,0,131,321.46V178.55A56.44,56.44,0,0,0,179.43,130H322.35a46.59,46.59,0,0,1-.46-5.79c.08,1.85.32,4.11.58,6.11A56.53,56.53,0,0,0,371,178.55Z"}}),this._v(" "),e("path",{staticClass:"vibrant",attrs:{d:"M179.39,385a56.42,56.42,0,0,0,.51-7.63c0-.12,0-.25,0-.37a55.73,55.73,0,0,0-.47-7H322c0,2.29-.29,4.62-.3,7,0,.12.07.25.07.37a56.37,56.37,0,0,0,.6,7.63ZM378.5,179H378a50.1,50.1,0,0,1-7-.48v142.9a55.85,55.85,0,0,1,7-.45h.26a54.89,54.89,0,0,1,7.74.52v-143A65,65,0,0,1,378.5,179Zm-56.62-55c0-.19,0-.38,0-.56s0-.65,0-1a63,63,0,0,1,.5-7.5h-143a55.06,55.06,0,0,1,.62,7.64V123a55.69,55.69,0,0,1-.57,7H322.35a46.59,46.59,0,0,1-.46-5.79A1.09,1.09,0,0,1,321.88,124ZM123.5,179H123a55.72,55.72,0,0,1-7-.48V321.46a55.72,55.72,0,0,1,7-.48h.5a58.09,58.09,0,0,1,7.5.49V178.55A58.08,58.08,0,0,1,123.5,179ZM392.31,83.61c-.52-.19-1-.61-1.56-.61h0a16.8,16.8,0,0,1-3.41-.84s0,0,0,0c-1-.21-1.91-.37-2.89-.52s-2-.24-3-.32l-1-.07c-.71,0-1.42,0-2.13,0-.92,0-1.84,0-2.75.1A41.48,41.48,0,0,0,337.63,115s0,.09,0,.14a41.19,41.19,0,0,0-.62,7.5v.6a37.61,37.61,0,0,0,.69,6.76s0,.09,0,.14a41.46,41.46,0,0,0,24.69,30.66l1.24.5c.89.34,1.8.65,2.72.93s2,.58,3.1.81c.52.12,1,.22,1.58.32v0c.85.16,1.71.28,2.58.38h0c.85.09,1.72.15,2.59.19.59,0,1.18,0,1.78,0h.26a41.19,41.19,0,0,0,7.5-.66l.24,0a41.45,41.45,0,0,0,6.31-79.69ZM386,147.87l-.24.08a26.16,26.16,0,0,1-7.5,1.09H378a25.69,25.69,0,0,1-7-1l-.24-.07A26.48,26.48,0,0,1,353,130.14c0-.05,0-.09,0-.14a26,26,0,0,1-1-7c0-.12,0-.24,0-.36a26.16,26.16,0,0,1,1.09-7.5c0-.05,0-.09,0-.14a26.39,26.39,0,1,1,33,32.87ZM164.27,115.14a.85.85,0,0,0-.06-.14A41.4,41.4,0,1,0,116,163.36a40.31,40.31,0,0,0,7,.67h.5a41.37,41.37,0,0,0,40.72-33.9c0-.05.07-.09.07-.14a38.45,38.45,0,0,0,.71-7v-.36A41.19,41.19,0,0,0,164.27,115.14ZM148.85,130s0,.09,0,.14A26.47,26.47,0,0,1,131,148a26.11,26.11,0,0,1-7.5,1.09H123a26.11,26.11,0,0,1-7-1.08,26.39,26.39,0,1,1,32.77-33s0,.09,0,.14a26.16,26.16,0,0,1,1.09,7.5c0,.12,0,.24,0,.36A26,26,0,0,1,148.85,130ZM386,336.7l-.24,0a42.1,42.1,0,0,0-7.5-.66H378a40.32,40.32,0,0,0-7,.62l-.24,0a41.5,41.5,0,0,0-33.21,33.21s0,.09,0,.13a37.59,37.59,0,0,0-.6,7v.37a41.2,41.2,0,0,0,.61,7.5s0,.09,0,.13A41.38,41.38,0,1,0,386,336.7Zm-7.74,67.06A26.44,26.44,0,0,1,353,385l0-.13a26.21,26.21,0,0,1-1.09-7.5c0-.12,0-.25,0-.37a26,26,0,0,1,1-7l0-.13a26.48,26.48,0,0,1,17.8-17.81L371,352a25.69,25.69,0,0,1,7-1h.26a26.16,26.16,0,0,1,7.5,1.09l.24.08a26.39,26.39,0,0,1-7.74,51.62ZM164.29,370h0s0,0,0,0,0,0,0,0A41.21,41.21,0,0,0,131,337h0c-2.43-1-4.93-.86-7.49-.86-.17,0-.34-.08-.51-.07a40.31,40.31,0,0,0-7,.62A41.38,41.38,0,1,0,164.19,385h0s.06-.09.07-.13a41.19,41.19,0,0,0,.73-7.5V377A38.45,38.45,0,0,0,164.29,370Zm-14.39,7.37a26.21,26.21,0,0,1-1.09,7.5l0,.13A26.39,26.39,0,1,1,116,352.06a26.11,26.11,0,0,1,7-1.08h.5a26.11,26.11,0,0,1,7.5,1.09,26.47,26.47,0,0,1,17.81,17.81l0,.13a26,26,0,0,1,1,7C149.9,377.12,149.9,377.25,149.9,377.37Z"}})])},s.staticRenderFns=[]},{}],5:[function(t,e,r){!function(){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default={data:function(){return{}},props:{marker:Object,current:Boolean,index:Number,rotate:Number},computed:{computedRotate:function(){return 1*this.rotate+90},top:function(){return 100*this.marker.y+"%"},left:function(){return 100*this.marker.x+"%"},width:function(){return 100*this.marker.w+"%"},height:function(){return 100*this.marker.h+"%"}},methods:{initCircleResize:function(){this.$emit("initDragResize",{index:this.index,type:this.marker.type,drag:!1,resize:!0})},initCircleDrag:function(){this.$emit("initDragResize",{index:this.index,type:this.marker.type,drag:!0,resize:!1})}}}}(),e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:["marker marker-circle",{dragging:t.current}],style:"top:"+t.top+";left:"+t.left+";width:"+t.width+";height:"+t.height+";"},[r("div",{staticClass:"count"},[t._v(t._s(t.index+1))]),t._v(" "),r("div",{staticClass:"resize-helpers",style:"transform: rotate("+t.computedRotate+"deg);"},[r("div",{staticClass:"handle top",on:{mousedown:t.initCircleResize}}),t._v(" "),r("div",{staticClass:"handle center",on:{mousedown:t.initCircleDrag}})])])},s.staticRenderFns=[]},{}],6:[function(t,e,r){!function(){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default={data:function(){return{}},props:{marker:Object,current:Boolean,index:Number},computed:{top:function(){return 100*this.marker.y+"%"},left:function(){return 100*this.marker.x+"%"}},methods:{initPinDrag:function(){this.$emit("initDragResize",{index:this.index,type:this.marker.type,drag:!0,resize:!1})}}}}(),e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:["marker marker-pin",{dragging:t.current}],style:"top:"+t.top+";left:"+t.left+";",on:{mousedown:t.initPinDrag}},[r("div",{staticClass:"count"},[t._v(t._s(t.index+1))])])},s.staticRenderFns=[]},{}],7:[function(t,e,r){!function(){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default={data:function(){return{}},props:{marker:Object,current:Boolean,index:Number},computed:{top:function(){return 100*this.marker.y+"%"},left:function(){return 100*this.marker.x+"%"},width:function(){return 100*this.marker.w+"%"},height:function(){return 100*this.marker.h+"%"}},methods:{initResize:function(t){this.$emit("initDragResize",{index:this.index,type:this.marker.type,drag:!1,resize:!0,handle:t})}}}}(),e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options:e.exports;s.render=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:["marker marker-rect",{dragging:e.current}],style:"top:"+e.top+";left:"+e.left+";width:"+e.width+";height:"+e.height+";"},[r("div",{staticClass:"count"},[e._v(e._s(e.index+1))]),e._v(" "),r("div",{staticClass:"resize-helpers"},[r("div",{staticClass:"handle top-left",on:{mousedown:function(t){e.initResize("top-left")}}}),e._v(" "),r("div",{staticClass:"handle top-right",on:{mousedown:function(t){e.initResize("top-right")}}}),e._v(" "),r("div",{staticClass:"handle bottom-left",on:{mousedown:function(t){e.initResize("bottom-left")}}}),e._v(" "),r("div",{staticClass:"handle bottom-right",on:{mousedown:function(t){e.initResize("bottom-right")}}})])])},s.staticRenderFns=[]},{}],8:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(r){r.prototype.$annotator=new r({data:function(){return{fields:[],annotators:[],updatingAnnotators:!1,updatingFields:!1}},methods:{getAcceptedType:function(t){var e=r.options.components["k-"+t.type+"-field"];return e?e.options.props.value.type:(console.warn('Annotator could not update form: Unknown field type "'+t.type+'"'),null)},updateFields:function(r,s,i){var a=this;this.updatingAnnotators||(this.updatingFields=!0,this.fields.forEach(function(t){if(s in t.fields){if(!a.getAcceptedType(t.fields[s]))return;switch(r){case"markers":var e=t.fields[s].fields;t.values[s]=e?i.map(function(t){return t=Object.assign({},t)}):i;break;default:t.values[s]=i}t.input(t.values)}}),this.$nextTick(function(){return a.updatingFields=!1}))},updateAnnotators:function(s){var t=this;this.updatingFields||(this.updatingAnnotators=!0,this.annotators.forEach(function(t){for(var e in s){var r=s[e];t.setValue(e,r)}}),this.$nextTick(function(){return t.updatingAnnotators=!1}))},registerAnnotator:function(t){this.annotators.push(t)},unregisterAnnotator:function(t){var e=this.fields.indexOf(t);-1!==e&&this.annotators.splice(e,1)},registerFields:function(t){this.fields.push(t)},unregisterFields:function(t){var e=this.fields.indexOf(t);-1!==e&&this.fields.splice(e,1)}}});var e=r.options.components["k-fields-section"];r.component("k-fields-section",{extends:e,created:function(){this.$annotator.registerFields(this)},destroyed:function(){this.$annotator.unregisterFields(this)},methods:{input:function(t){this.values=t,e.options.methods.input.call(this,t),this.$annotator.updateAnnotators(t)}},watch:{values:function(t){this.$annotator.updateAnnotators(t)}}})}},{}],9:[function(t,e,r){"use strict";var s=a(t(1)),i=a(t(8));function a(t){return t&&t.__esModule?t:{default:t}}panel.plugin("sylvainjule/annotator",{use:[i.default],sections:{annotator:s.default}})},{1:1,8:8}]},{},[9]);
