/* 基本图文组件对象 */
var H5ComponentBase = function(ctg) {
	"use strict";
	var id = ('h5_component_base_' + Math.random()).replace('.', '_');
	var $component = $('<div class="h5_component_base"></div>');

	ctg.text && $component.text(ctg.text);
	ctg.width && $component.width(ctg.width / 2);
	ctg.height && $component.height(ctg.height / 2);

	return $component;
};
