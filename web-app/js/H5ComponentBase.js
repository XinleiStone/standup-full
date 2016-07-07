/* 基本图文组件对象 */
var H5ComponentBase = function(name, cfg) {
	"use strict";
	var className = "h5_component_name_" + name;
	var id = ('h5_component_base_' + Math.random()).replace('.', '_');
	var $component = $('<div class="h5_component_base '+ className +'"></div>');

	cfg.text && $component.text(cfg.text);
	cfg.width && $component.width(cfg.width / 2);
	cfg.height && $component.height(cfg.height / 2);
	cfg.css && $component.css(cfg.css);
	cfg.bg && $component.css('backgroundImage', 'url('+ cfg.bg +')');

	if (cfg.center === true) {
		$component.css({
			marginLeft: cfg.width/4 * -1 + 'px',
			left: '50%'
		});
	}

	$component.on("onLoad", function() {
		//$(this).fadeIn();
		$component.addClass(className + '_load').removeClass(className + '_leave');
		cfg.animateIn && $component.animate(cfg.animateIn);
		return false;
	});

	$component.on("onLeave", function() {
		//$(this).fadeOut();
		$component.addClass(className + '_leave').removeClass(className + '_load');
		cfg.animateOut && $component.animate(cfg.animateOut);
		return false;
	});

	var leave = false;
	$('body').click(function() {
		leave = !leave;
		$('.h5_component_base').trigger(leave ? 'onLoad': 'onLeave');
	});

	return $component;
};
