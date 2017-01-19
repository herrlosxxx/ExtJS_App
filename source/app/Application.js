Ext.enableAriaPanels = false;
Ext.define('UIS.Application', {
    extend: 'Ext.app.Application',
    
    name: 'UIS',
	
	controllers: [
    	'UIS.controller.Main'
	],

	/**
	 * On application launch
	 */
	launch: function () {
		this.hideLoadingText();
    },

	/**
	 * Hide preload div
	 */
	hideLoadingText: function() {
		if(Ext.get('loadingText')) {
			Ext.get('loadingText').destroy();
		}
	},

	/**
	 * On application update action. Not in use
	 */
    onAppUpdate: function () {
        // Не востребовано
    }
});
