Ext.define('UIS.view.main.Tree', {
    extend: 'UIS.ux.TreeLiveSearch',

    xtype: 'mytree',
	alias: 'widget.leftTree',

	layout: 'fit',

	store: 'UIS.store.Tree',
	rootVisible: false,

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            ddGroup: 'uisDD',
            enableDrag: true,
            enableDrop: false
        },
        listeners: {
            drag: function() {
                console.log('draggin');
            },
            beforedrop: function(node, data) {
                data.records[0].set('leaf', true);
                data.records[0].set('checked', null);
                console && console.log(arguments);
            },
            drop: function(node, data, dropRec, dropPosition) {
                var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('text') : ' on empty view';
                Ext.example.msg("Drag from left to right", 'Dropped ' + data.records[0].get('text')  + dropOn);
                firstGrid.store.remove(data.records[0]);
            }
        }
    },
    listeners: {
        drag: function() {
                console.log('draggin');
            },
            beforedrop: function(node, data) {
                data.records[0].set('leaf', true);
                data.records[0].set('checked', null);
                console && console.log(arguments);
            },
            drop: function(node, data, dropRec, dropPosition) {
                var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('text') : ' on empty view';
                Ext.example.msg("Drag from left to right", 'Dropped ' + data.records[0].get('text')  + dropOn);
                firstGrid.store.remove(data.records[0]);
            }
    }
});
