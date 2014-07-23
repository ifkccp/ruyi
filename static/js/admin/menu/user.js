Ext.define('My.model.user', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'ajax',
		reader: 'json'
	},
	fields: [
		'id', 'name', 'email'
	]
})

Ext.define('My.menu.user', {
	extend: 'Ext.grid.Panel',

	store: Ext.create('Ext.data.Store', {
		model: 'My.model.user',
		autoDestory: true,
		autoLoad: true,
		autoSync: true,
		remoteSort: true,
		pageSize: 10,

		proxy: {
			type: 'ajax',
			enablePaging: true,
			url: '/user/extinf_userlist',
			reader: {
				type: 'json',
				root: 'data'
			},
			writer: {
				type: 'json'
			}
		}
	}),

	selType: 'checkboxmodel',

	columns: [
		{
			header: 'Id',
			dataIndex: 'id',
			locked: true,
			width: 50
		}, {
			header: 'Name',
			dataIndex: 'name',
			locked: true,
			locked: 150
		}, {
			header: 'Email',
			dataIndex: 'email',
			flex: 1
		}, {
			menuDisabled: true,
			header: 'Admin',
			xtype: 'actioncolumn',
			width: 50,
			items: [
				{
					iconCls: 'sell-col',
					tooltip: 'tip',
					handler: function(grid, rowIndex, colIndex){
						var rec = grid.getStore().getAt(rowIndex)
						alert(rec.get('name'))
					}
				}
			]
		}
	],

	dockedItems: [
		{
			xtype: 'toolbar',
			items: [
				{
					text: 'Add',
					handler: this.onAddClick
				}, {
					text: 'Delete',
					disabled: true,
					itemId: 'delete',
					handler: function(a,b,c){
							console.log(a)
							console.log(b)
							console.log(c)
						
					}
				}
			]
		}, {
			xtype: 'toolbar',
			dock: 'bottom',
			items: [
				{
					xtype: 'tbtext',
					text: '<b>@cfg</b>'
				}
			]
		}
	],

	listeners: {
		selectionchange: function(selModel, selections){
			this.down('#delete').setDisabled(selections.length === 0)
		}
	}
})