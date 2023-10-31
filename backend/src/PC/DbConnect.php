<?php 
	/**
	* Database Connection
	*/
	include BASE_DIR . '/backend/config.php'; // Including config.php
	class DbConnect {
		private $server = DB_HOST;
		private $dbname = DB_NAME;
		private $user = DB_USER;
		private $pass = DB_PASS;

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
	}
 ?>