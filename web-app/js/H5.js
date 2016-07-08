/* 内容管理对象 */
var H5 = function() {
	this.id = ('h5_' + Math.random()).replace('.', '_');
	this.el = $('<div class="h5" id="' + this.id + '">').hide();
	this.page = [];
	$('body').append(this.el);

	/*新增一个页*/
	this.addPage = function(name, text) {
		var $page = $('<div class="h5_page section">');
		if (undefined !== name) {
			$page.addClass('h5_page_' + name);
		}

		if (undefined !== text) {
			$page.text(text);
		}
		this.el.append($page);
		this.page.push($page);

		return this;
	};

	this.addComponent = function(name, cfg) {
		cfg = cfg || {};
		cfg = $.extend({
			type: 'base'
		}, cfg);

		var $page = this.page.slice(-1)[0];
		var $component = {};
		switch (cfg.type) {
			case 'base':
				$component = new H5ComponentBase(name, cfg);
				break;
			default:
				break;
		}
		$page.append($component);

		return this;
	};

	this.loader = function() {
		this.el.show().fullpage({
			onLeave: function(index, nextIndex, direction) {
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(achorLink, index) {
				$(this).find('.h5_component').trigger('onLoad');
			}
		});

		this.page[0].find('.h5_component').trigger('onLoad');
	};

	return this;
};