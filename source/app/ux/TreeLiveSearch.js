/**
 * New component - tree panel with live search
 */
Ext.define('UIS.ux.TreeLiveSearch', {
    extend: 'Ext.tree.Panel',
    xtype: 'livesearchtree',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Text'
    ],

    /**
     * @private
     * search value initialization
     */
    searchValue: null,

    /**
     * @private
     * The matched positions from the most recent search
     */
    matches: [],

    /**
     * @private
     * The current index matched.
     */
    currentIndex: null,

    /**
     * @private
     * Case sensitive mode.
     */
    caseSensitive: false,

    /**
     * @cfg {String} matchCls
     * The matched string css classe.
     */
    matchCls: 'x-livesearch-match',

    // detects html tag
    tagsRe: /<[^>]*>/gm,

    // DEL ASCII code
    tagsProtect: '\x0f',

    // Component initialization override: adds the top toolbar and setup headers renderer.
    initComponent: function() {
        var me = this;

        me.tbar = ['Поиск',{
            xtype: 'textfield',
            name: 'searchField',
            hideLabel: true,
            width: 200,
            listeners: {
                change: {
                    fn: me.onTextFieldChange,
                    scope: this,
                    buffer: 500
                }
            }
        }];

        me.callParent(arguments);
    },

    // afterRender override: it adds textfield and statusbar reference and start monitoring keydown events in textfield input
    afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.textField = me.down('textfield[name=searchField]');
    },


    /**
     * In normal mode it returns the value with protected regexp characters.
     * In regular expression mode it returns the raw value except if the regexp is invalid.
     * @return {String} The value to process or null if the textfield value is blank or invalid.
     * @private
     */
    getSearchValue: function() {
        var me = this,
            value = me.textField.getValue();

        if (value === '') {
            return null;
        }

        return value;
    },

    /**
     * Finds all strings that matches the searched value in each grid cells.
     * @private
     */
    onTextFieldChange: function() {
        var me = this,
            view = me.view,
            cellSelector = view.cellSelector,
            innerSelector = view.innerSelector;

        view.refresh();

        me.searchValue = me.getSearchValue();
        me.matches = [];
        me.currentIndex = null;

        if (me.searchValue !== null) {
            me.searchRegExp = new RegExp(me.getSearchValue(), 'g' + (me.caseSensitive ? '' : 'i'));

            me.store.each(function(record, idx) {

                var node = view.getNode(record);

                if (node) {

                    var cell = Ext.fly(node).down('.x-tree-node-text', true),
                        matches, cellHTML,
                        seen;

                    if (cell) {
                        matches = cell.innerHTML.match(me.tagsRe);
                        cellHTML = cell.innerHTML.replace(me.tagsRe, me.tagsProtect);

                        // populate indexes array, set currentIndex, and replace wrap matched string in a span
                        cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                            if (!seen) {
                                me.matches.push({
                                    record: record
                                });
                                seen = true;
                            }
                            return '<span class="' + me.matchCls + '">' + m + '</span>';
                        }, me);

                        // restore protected tags
                        Ext.each(matches, function(match) {
                            cellHTML = cellHTML.replace(me.tagsProtect, match);
                        });
                        // update tree node cell html
                        cell.innerHTML = cellHTML;
                    }


                }
            }, me);

        }

        // no results found
        if (me.currentIndex === null) {
            me.textField.focus();
        }
    }

});