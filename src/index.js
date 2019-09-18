import Vue from 'vue';
import EarthComp from './EarthComp.vue';

function startup() {
    let app = new Vue({
        el: '#vueApp',
        components: {
            EarthComp,
        },
    });
}

// 1 XE.ready()会加载Cesium.js等其他资源，注意ready()返回一个Promise对象。
XE.ready().then(startup);      
