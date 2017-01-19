Ext.define('UIS.view.Main', {
    extend: 'Ext.Panel',
    alias: 'widget.mainPanel',

	config: {
		border: true,
		padding: 5
	},

    requires: [
        'Ext.plugin.Viewport',
        'UIS.ux.TreeLiveSearch'
    ],

    layout: 'border',

    title: 'UIS :: Тестовое задание [ExtJS Developer]',

    items: [{
        xtype: 'mytree',
        split: true,
        region: 'west',
        width: 350,
        minWidth: 300
    }, {
        xtype: 'mypanel',
        region: 'center',
        flex: 1
    }]
});
