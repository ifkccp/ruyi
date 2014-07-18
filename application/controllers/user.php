<?php

class User extends MY_Controller {
	public function login()
	{
		$this->load->view('user/login.php');
		// $this->show('user/login.php');
	}
}
