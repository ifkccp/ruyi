<?php

class MY_Controller extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
		$this->_check_login();
		$this->_init();
	}

	protected function show($tpl, $curr_menu = 'plugin', $args = array())
	{
		$args['body'] = $this->load->view($tpl, $args, true);
		$args['user'] = $this->session->userdata('login_name');
		// $args['is_admin'] = check_permission();
		$args['is_admin'] = 1;

		$args['curr_menu'] = $curr_menu;
		$out = $this->load->view('public/page.html', $args);
	}

	private function _check_login()
	{
		$exclude_path = array('user/login', 'user/extinf_login');

		$current_path = $this->router->class . '/' . $this->router->method;
		if(!in_array($current_path, $exclude_path) &&
			!$this->session->userdata('is_login'))
		{
			header('Location: /user/login');
			die;
		}

	}

	private function _init()
	{
		// $this->load->database();
	}

	protected function ext_succ($data = array())
	{
		header('Content-type: application/json');
		$msg = array('success'=>true, 'data'=>$data);
		echo json_encode($msg);
	}

	protected function ext_fail($data = array())
	{
		header('Content-type: application/json');
		$msg = array('success'=>false, 'data'=>$data);
		echo json_encode($msg);
	}
}
