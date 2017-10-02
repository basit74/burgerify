;(function ($, window, document, undefined) {
	"use strict";

	var pluginName = "burgerify"
	,	body = $( document.body )
	,	defaults = {
			speed: 500
		}
	;
	// create constructor.
	function burgerify( element, options ) {

		this.element = $(element);

		if( !this.element.data("target")) {
			throw { 
					name: "TargetMissingException", 
					message: "The menu element must have a data-target attribute",
					toString: function() {
						return this.name + ":" + this.message + " \n Error occured on element " + this.element
					} 
				};
		}
		var target = $( this.element.data('target')).first();

		this.settings = $.extend( { width: target.width()}, defaults, options ); 
		this._defaults = defaults;
		this._name = pluginName;
		this.target = target;

		this.init();
	}

	$.extend( burgerify.prototype, {
		init: function() {

			this.target.css({
				'left': - this.settings.width + 'px',
				'width': this.settings.width + 'px',
				'height' : 100 + '%',
				'visibility': 'hidden'
			});

			// register events
			this.element.on("click", this.slideOpen.bind( this ));

			this.target.find(".close-button").on("click", this.slideClose.bind(this) )

		},

		slideOpen: function() {
			var overlay = $('<div class="body-cover">');
			this.target.css({'visibility': 'visible'}).animate({'left' : 0, opacity: 1}, this.settings.menuSpeed);
			$('body').append(overlay).css({ 'display': 'none' }).fadeIn( this.settings.menuSpeed );

			overlay.on("click", this.slideClose.bind(this));
		},

		slideClose: function() {
			this.target.animate({'left' : -this.settings.width, opacity: 0 }, this.settings.menuSpeed, function() { $(this).css({'visibility': 'hidden'})});

			$(".body-cover").fadeOut( this.settings.menuSpeed, function(){
				$( this ).remove();
			});
		}
	});

	$.fn[ pluginName ] = function( options ) {
		return this.each( function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new burgerify( this, options ) );
			}
		} );
	};

})(jQuery, window, document);