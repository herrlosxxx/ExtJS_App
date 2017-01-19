Ext.define('UIS.controller.Main', {

    extend: 'Ext.app.Controller',
	alias: 'controller.main',
	
	views: [
        'UIS.view.main.Tree',
        'UIS.view.main.Panel'
	],
	stores: [
		'UIS.store.Tree'
	],

	refs: [{
		ref: 'leftTree',
		selector: 'leftTree'
	}, {
		ref: 'rightPanel',
		selector: 'rightPanel'
	}],

    control: {
        'leftTree': {
            checkchange: 'onTreeNodeChangeState'
		},
        'rightPanel': {
		    render: 'createDropZone',
            itemclick: 'panelItemClick'
        }
	},

    panelItemClick: function(view, record, item, index, e, eOpts) {
        var clickedEl = Ext.get(e.target);
        if(clickedEl.getAttribute('rec-id')) {
            view.store.remove(record);
            var id = clickedEl.getAttribute('rec-id'),
                record = this.getLeftTree().getRootNode().findChild('id',id,true);
            record.set('checked', false);
            this.changeParentNodeTitle(record.parentNode);
        }
    },


	/** @description Add selected records to right side panel.  
 	* @param {object} selected node 
 	* @param {boolean} selected node
	*/  
	onTreeNodeChangeState: function(node, state) {
        // add or remove childnodes counter
        this.changeParentNodeTitle(node.parentNode);

		var record = [{'id': node.data.id, 'name': node.data.text}],
			store = this.getRightPanel().getStore();

		if(state) {
			store.add(record);
		} else {
			var idx = store.find('id', node.data.id);
			if(idx >= 0) {
				store.removeAt(idx);
			}
		}
	},

	/** @description Adding count of total and selected leafs to parent node title 
 	* @param {object} parent element of selected node 
	*/ 
	changeParentNodeTitle: function(node) {
        var nodeHtml = this.getLeftTree().getView().getNode(node),
            nodeCell = Ext.fly(nodeHtml).down('.x-grid-cell-inner-treecolumn', true);
        // count objects
        var checked = this.countSelectedChilds(node),
            leafCount = this.countNodeChilds(node);
        // prepair new element
        var nodeId = node.getId(),
            titleText = "(выбрано " + checked + " из "+ leafCount+ ")",
            nodeTitle = " <span class='node-counter' id='" + nodeId + "'>" + titleText + "</span>";

        // Remove new span if it is already exist
        if(Ext.get(nodeId)) {
            Ext.get(nodeId).destroy();
        }
        // Add new span if checked leafs are exist
        if(parseInt(checked) > 0) {
            Ext.DomHelper.insertHtml('beforeEnd', nodeCell, nodeTitle);
        }
	},

	/** @description Count all selected leafs in node
 	* @param {object} parent node for selected leaf
 	* @return {number}
	*/ 
    countSelectedChilds: function(node) {
        var checked = 0;
        node.cascadeBy(function(node){
            if(node.data.checked) {
                checked++;
            }
        });
        return checked;
    },

    /** @description Count all leafs in node
 	* @param {object} parent node for selected leaf
 	* @return {number}
	*/ 
    countNodeChilds: function(node) {
        var leafCount = 0;
        node.cascadeBy(function(node){
            if(node.isLeaf()) {
                leafCount++;
            }
        });
        return leafCount;
    },

    /** @description Check all selected childNodes after it's successful Drag and Drop
     * @param {object} right panel view object
     * @param {object} selected tree records data
     */
    processRows: function(view, data) {
        Ext.each(data, function(record) {
            if(record.isLeaf()) {
                // setup correct record for rightPanel
                var rec = [{'id': record.data.id, 'name': record.data.text}];
                view.getStore().add(rec);
                // Set leafs checked and count checked objects
                record.set('checked', true);
                this.changeParentNodeTitle(record.parentNode);
            } else {
                this.processRows(view, record.childNodes);
            }
        }, this);
    },

    /** @description Add dropZone to right panel on it Render
     * @param {object} right panel view object
     */
    createDropZone: function(view) {
        var me = this;
        this.dropPanel = new Ext.dd.DropTarget(view.getEl(), {
            ddGroup: 'uisDD',
            notifyDrop: function (tree, e, data) {
                var selectedRecords = tree.dragData.records;
                me.processRows(view, selectedRecords);
                return true;
            }
        });
    }


});