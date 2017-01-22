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
        }
    }
});
