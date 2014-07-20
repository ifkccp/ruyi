Ext.onReady(function(){
	Ext.create('Ext.form.Panel', {
		title: '如意后台',
		renderTo: Ext.getBody(),
		bodyPadding: 10,
		xtype: 'toolbar',
		frame: true,
		width: 230,
		defaults: {
			labelWidth: 50
		},

		url: '/user/inf_login',

		defaultType: 'textfield',
		items: [
			{
				fieldLabel: '账号',
				name: 'user',
				allowBlank: false,
				emptyText: '登陆账号',
				defaultFocus: true
			},
			{
				fieldLabel: '密码',
				name: 'pass',
				inputType: 'password',
				allowBlank: false,
				emptyText: '登陆密码'
			},
			{
				xtype: 'checkbox',
				fieldLabel: '记住我',
				name: 'rem'
			}
		],

		defaultFocus: 'yes',

		buttons: [
			{
				text: '登录',
				handler: function(){
					var form = this.up('form').getForm()
					if(form.isValid()){
						form.submit({
							waitMsg: '验证中...',
							success: function(form, action){
								Ext.Msg.wait('登录成功，页面跳转中...')
								window.location = '/admin';
							},
							failure: function(form, action){
								Ext.Msg.alert('登录失败', '账号或密码错误！')
								form.reset()
							}
						})
					}
				}
			}
		]
	}).center()

})