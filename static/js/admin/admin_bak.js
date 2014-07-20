var layoutExamples = [];



var contentPanel = {
	 id: 'content-panel',
	 region: 'center', // this is what makes this panel into a region within the containing layout
	 layout: 'card',
	 margins: '2 5 5 0',
	 title: 'aa',
	 activeItem: 0,
	 border: false,
	 // items: layoutExamples
};

var store = Ext.create('Ext.data.TreeStore', {
	root: {
		expanded: true
	},
	proxy: {
		type: 'ajax',
		url: '/static/json/menu.json'
	}
});

var treePanel = Ext.create('Ext.tree.Panel', {
	region:'north',
	border: false,
	rootVisible: false,
	height: '100%',
	autoScroll: true,
	store: store
});

Ext.onReady(function(){
	Ext.create('Ext.Viewport', {
		layout: 'border',
		items: [{
			xtype: 'box',
			id: 'header',
			region: 'north',
			html: '<h1>如意后台管理系统</h1>',
			height: 30
		},{
			title: '菜单',
			layout: 'border',
			id: 'layout-browser',
			region:'west',
			border: false,
			split:true,
			margins: '5 0 5 5',
			collapsible: true,
			width: 190,
			minSize: 100,
			maxSize: 500,
			items: [treePanel]
		}, 
			contentPanel
		],
		renderTo: Ext.getBody()
	});
})