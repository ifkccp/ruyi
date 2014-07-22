Ext.Loader.setConfig({
	// enabled: true,
	paths: {
		'My': '/static/js/admin'
	}
});

var TABITEMS = {}

var tabPanel = Ext.create('Ext.tab.Panel', {
	layout: 'card',
	border: false,
	defaults: {
		closable: true,
		border: false,
		bodyPadding: 10
	}
})

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

treePanel.on({
	'itemclick': function(view, rcd, item, idx, event, eOpts){
		if(rcd.raw.leaf)
		{
			var id = rcd.get('id'),
				_tab = tabPanel.getComponent('tab.' + id)

			if(!_tab)
			{
				var _cls = 'My.' + id
				Ext.require(_cls, function(){
					_tab = tabPanel.add(Ext.create('My.' + id, {
						id: 'tab.' + id,
						title: rcd.raw.text,
						closable: true,
						html: 'xxxj'
					}))
					tabPanel.setActiveTab(_tab)
				});
			} else {
				tabPanel.setActiveTab(_tab)
			}

			location.hash = id
		}
	}
})

Ext.onReady(function(){
	Ext.create('Ext.Viewport', {
		layout: 'border',
		items: [{
				xtype: 'box',
				id: 'header',
				region: 'north',
				html: '<h1>如意后台管理系统</h1>',
				height: 30
			}, {
				title: '菜单',
				layout: 'border',
				id: 'layout-browser',
				region:'west',
				split:true,
				margins: '5 0 5 5',
				collapsible: true,
				width: 190,
				minSize: 100,
				maxSize: 500,
				items: [treePanel]
			},{
				region: 'center', // this is what makes this panel into a region within the containing layout
				layout: 'card',
				margins: '5 5 5 0',
				items: [tabPanel]
			}
		]
	});

	(function(){
		var default_id = 'menu.user',
			hash = location.hash.substr('1')

		if(!hash) hash = default_id

		var	view = treePanel.getView(),
			node = view.getNodeById(hash)
		
		if(!node)
			node = view.getNodeById(default_id)

		node.click()
	})()
	
})
