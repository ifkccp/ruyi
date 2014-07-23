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
	columns: [
		{
			xtype: 'checkcolumn',
			// dataIndex: 'id',
			width: 50,
			locked: true
		}, {
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

	bbar: {
		pageSize: 10,
		store: this.store,
		displayInfo: true,
		plugins: Ext.create('Ext.ux.ProgressBarPager')
	}
	
	// initComponent: function(){
	// 	// this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
	// 	// 	clicksToEdit: 1
	// 	// })

	// 	Ext.apply(this, {
	// 		// plugins: [this.cellEditing],
	// 		store: Ext.create('Ext.data.Store', {
	// 			autoDestory: true,
	// 			proxy: {
	// 				type: 'ajax',
	// 				url: '/user/extinf_userlist',
	// 				reader: {
	// 					type: 'json',
	// 					record: 'plant'
	// 				}
	// 			}
	// 		}),
	// 		columns: [
	// 			{
	// 				header: 'Name',
	// 				dataIndex: 'name',
	// 				flex: 1,
	// 				editor: {
	// 					allowBlank: false
	// 				}
	// 			},{
	// 				header: 'Email',
	// 				dataIndex: 'email',
	// 				editor: {
	// 					allowBlank: false
	// 				}
	// 			}
	// 		]
	// 	});

	// 	this.callParent();

	// 	this.on('afterLayout', this.loadStore, this, {
	// 		delay: 1,
	// 		single: true
	// 	})
	// },


	// loadStore: function(){
	// 	this.getStore().load({
	// 		callback: this.onStoreLoad
	// 	})
	// },

	// onStoreLoad: function(){
	// 	Ext.Msg.show({
	// 		title: 'Succ',
	// 		msg: 'success',
	// 		icon: Ext.Msg.INFO,
	// 		buttons: Ext.Msg.OK
	// 	})
	// }
})