/* 散点图表组件对象 */
var H5ComponentPoint = function(name, cfg) {
    "use strict";
    
    var $component = new H5ComponentBase(name, cfg);
    var base = cfg.data[0][1];

    $.each(cfg.data, function(index, el) {
        console.log(el);
    });     

    return $component;
};
