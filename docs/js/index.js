!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r,i,o=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),l=function(t,e){this.x=t,this.y=e};!function(t){t.DEAD="DEAD",t.ALIVE="ALIVE"}(i||(i={}));var u,s=function(){function t(){}return t.prototype.matches=function(t,e){return e>3},t.prototype.getStatus=function(){return i.DEAD},t}(),c=function(){function t(){}return t.prototype.matches=function(t,e){return t==i.DEAD&&3==e},t.prototype.getStatus=function(){return i.ALIVE},t}(),a=function(){function t(){}return t.prototype.matches=function(t,e){return t==i.ALIVE&&(2==e||3==e)},t.prototype.getStatus=function(){return i.ALIVE},t}(),f=function(){function t(){}return t.prototype.matches=function(t,e){return t==i.DEAD||e<2},t.prototype.getStatus=function(){return i.DEAD},t}(),h=function(){function t(){this.rules=[new c,new a,new f,new s]}return t.prototype.calculateStatus=function(t,e){for(var n=0,r=this.rules;n<r.length;n++){var i=r[n];if(i.matches(t,e))return i.getStatus()}throw Error("Could not find a matching rulue")},t}(),p=function(){function t(t,e){this.width=t,this.height=e,this.statusCalculator=new h,this.livingCells=[],this.newLivingCells=[]}return t.prototype.executeCycle=function(){this.calculateNextStatusOfCells(i.ALIVE,this.livingCells);var t=this.determineDeadNeighbourCells();this.calculateNextStatusOfCells(i.DEAD,t),this.updateLivingCells()},t.prototype.calculateNextStatusOfCells=function(t,e){var n=this;e.forEach((function(e){var r=n.determineLivingNeighbourCells(e);n.statusCalculator.calculateStatus(t,r.length)==i.ALIVE&&n.newLivingCells.push(e)}))},t.prototype.determineLivingNeighbourCells=function(t){for(var e=[],n=0,r=this.getNeighbours(t);n<r.length;n++){var i=r[n];this.cellIsAlive(i)&&e.push(i)}return e},t.prototype.determineDeadNeighbourCells=function(){for(var t=[],e=0,n=this.livingCells;e<n.length;e++)for(var r=n[e],i=0,o=this.getNeighbours(r);i<o.length;i++){var l=o[i];this.cellIsAlive(l)||this.cellIsInArray(t,l)||t.push(l)}return t},t.prototype.cellIsInArray=function(t,e){for(var n=0,r=t;n<r.length;n++){var i=r[n];if(i.x==e.x&&i.y==e.y)return!0}return!1},t.prototype.updateLivingCells=function(){this.livingCells.splice(0,this.livingCells.length),this.livingCells=this.livingCells.concat(this.newLivingCells),this.newLivingCells.splice(0,this.newLivingCells.length)},t.prototype.cellIsAlive=function(t){for(var e=0,n=this.livingCells;e<n.length;e++){var r=n[e];if(r.x==t.x&&r.y==t.y)return!0}return!1},t.prototype.coordinateIsAliveCell=function(t,e){return this.cellIsAlive(new l(t,e))},t.prototype.addCell=function(t,e){this.livingCells.push(new l(t,e))},t.prototype.indexOfCell=function(t){for(var e=0;e<this.livingCells.length;e++){var n=this.livingCells[e];if(n.x==t.x&&n.y==t.y)return e}return-1},t.prototype.removeCell=function(t,e){var n=this.indexOfCell(new l(t,e));n>-1&&this.livingCells.splice(n,1)},t.prototype.clear=function(){this.livingCells.splice(0,this.livingCells.length)},t.prototype.getLivingCells=function(){return this.livingCells},t}(),d=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.width=e,r.height=n,r}return o(e,t),e.prototype.getNeighbours=function(t){for(var e=[],n=t.x-1;n<=t.x+1;n++)for(var r=t.y-1;r<=t.y+1;r++)!this.pointIsInBound(n,r)||n==t.x&&r==t.y||e.push(new l(n,r));return e},e.prototype.pointIsInBound=function(t,e){return t>=0&&t<this.width&&e>=0&&e<this.height},e}(p),v=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.width=e,r.height=n,r}return o(e,t),e.prototype.getNeighbours=function(t){for(var e=[],n=t.x-1;n<=t.x+1;n++)for(var r=t.y-1;r<=t.y+1;r++)n==t.x&&r==t.y||e.push(new l(this.translateX(n),this.translateY(r)));return e},e.prototype.translateX=function(t){return t<0?this.width-1:t>=this.width?0:t},e.prototype.translateY=function(t){return t<0?this.height-1:t>=this.height?0:t},e}(p),g=function(){function t(t,e,n){this.tableId=t,this.width=e,this.height=n,this.table=document.getElementById(t),this.table.innerHTML=this.buildBoard(e,n)}return t.prototype.buildBoard=function(t,e){var n="";n+="<tbody>";for(var r=0;r<e;r++){n+="<tr>";for(var i=0;i<t;i++)n+='<td id="cell-'+i+"-"+r+'"></td>';n+="</tr>"}return n+="</tbody>"},t.prototype.getCell=function(t,e){return document.getElementById("cell-"+t+"-"+e)},t.prototype.setAlive=function(t,e){this.getCell(t,e).classList.add("alive")},t.prototype.setDead=function(t,e){this.getCell(t,e).classList.remove("alive")},t.prototype.setAllDead=function(t,e){for(var n=0;n<e;n++)for(var r=0;r<t;r++)this.setDead(r,n)},t.prototype.apply=function(t){this.setAllDead(t.width,t.height);for(var e=0,n=t.getLivingCells();e<n.length;e++){var r=n[e];this.setAlive(r.x,r.y)}},t.prototype.addEventListener=function(t,e,n){this.table.addEventListener(t,e,n)},t}();function y(){var t=document.getElementById("emInPixel");return t.style.height="1em",t.offsetHeight}"serviceWorker"in navigator&&navigator.serviceWorker.register("service-worker.js").then((function(t){return console.log("Service Worker registration complete, scope: '"+t.scope+"'")})).catch((function(t){return console.log("Service Worker registration failed with error: '"+t+"'")})),function(t){t.TORUS="TORUS",t.FIXED="FIXED"}(u||(u={}));var C,m=(C=y(),Math.floor(document.getElementsByClassName("main")[0].clientWidth/C)-4),I=function(){var t=y();return Math.floor(document.getElementsByClassName("main")[0].clientHeight/t)-4}(),E=u.TORUS;function b(t){return t==u.TORUS?new v(m,I):new d(m,I)}var w=new g("boardTable",m,I),x=b(E);function L(){x.addCell(1,0),x.addCell(2,1),x.addCell(0,2),x.addCell(1,2),x.addCell(2,2),w.apply(x)}w.addEventListener("click",(function(t){var e,n,r=t.target.id;if(0==r.lastIndexOf("cell-",0)){var i=r.match(/(?<=\-)\d+(?=(\-))/)[0],o=r.match(/(?<=\-)\d+$/)[0];e=parseInt(i),n=parseInt(o),x.coordinateIsAliveCell(e,n)?x.removeCell(e,n):x.addCell(e,n),w.apply(x)}})),L();var A=-1;function D(){return-1!=A}function S(){x.executeCycle(),w.apply(x)}function O(){D()&&(clearInterval(A),A=-1)}function B(){O(),x.clear(),w.apply(x)}document.getElementById("nextStepBtn").addEventListener("click",S),document.getElementById("playBtn").addEventListener("click",(function(){D()||(A=setInterval((function(){S()}),200))})),document.getElementById("pauseBtn").addEventListener("click",O),document.getElementById("clearBtn").addEventListener("click",B),document.getElementById("boardType").addEventListener("change",(function(){var t=this.value;E!=t&&(O(),B(),x=b(E=t)),L()}))}]);