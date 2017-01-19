Ext.define('UIS.store.Tree', {
    extend: 'Ext.data.TreeStore',
	alias: 'store.treestore',

    root: {
        expanded: true,
        children: [{
            text: "Основные колонки",
            expanded: true,
            children: [{
                text: "Колонка 1",
                leaf: true,
                checked: false
            }, {
                text: "Колонка 2",
                leaf: true,
                checked: false
            }, {
                text: "Колонка 3",
                leaf: true,
                checked: false
            }]
        }, {
            text: "Источник",
            expanded: true,
            children: [{
                text: "Поисковая система",
                leaf: true,
                checked: false
            }, {
                text: "Поисковый запрос",
                leaf: true,
                checked: false
            }, {
                text: "Сайт",
                leaf: true,
                checked: false
            }]
        }, {
            text: "География",
            expanded: false,
            children: [{
                text: "Россия",
                leaf: true,
                checked: false
            }, {
                text: "Германия",
                leaf: true,
                checked: false
            }]
        }]
    }
});