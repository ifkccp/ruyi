<?php

class User extends MY_Controller {
	public function login()
	{
		$this->load->view('user/login.php');
		// $this->show('user/login.php');
	}

	public function inf_login()
	{
		if('admin' == $_POST['user'] && 'admin' == $_POST['pass'])
		{
			$this->session->set_userdata('is_login', true);
			$this->ext_succ();
		}
		else
			$this->ext_fail();
	}
}
