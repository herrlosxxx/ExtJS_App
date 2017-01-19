Ext.define('UIS.view.main.Panel', {
    extend: 'Ext.view.View',
    xtype: 'mypanel',
	alias: 'widget.rightPanel',
	store: {
        fields: [{name: 'id', type: 'string'}, { name: 'name', type: 'string' }],
        data: []
    },
    itemSelector: '.dWrap',
	trackOver: true,
    tpl: [
        '<tpl for=".">',
            '<div class="dWrap" id="{id}"><div>{name} <div rec-id="{id}" class="fa fa-close"></div></div></div>',
        '</tpl>'
    ]

});
