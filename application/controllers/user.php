<?php

class User extends MY_Controller {
	public function login()
	{
		$this->load->view('user/login.php');
		// $this->show('user/login.php');
	}

	public function extinf_login()
	{
		if('admin' == $_POST['user'] && 'admin' == $_POST['pass'])
		{
			$this->session->set_userdata('is_login', true);
			$this->ext_succ();
		}
		else
			$this->ext_fail();
	}

	public function extinf_userlist()
	{
		$data = array(
			array(
				'id' => 1,
				'name' => 'xiaojing',
				'email' => 'xiaojing@xj.com'
			),
			array(
				'id' => 2,
				'name' => 'ifkccp',
				'email' => 'ifkccp@163.com'
			)
		);

		$this->ext_succ($data);
	}
}
