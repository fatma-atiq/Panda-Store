<?php

		$username = $_POST["username"];
		$phone = $_POST['phone'];
		$email = $_POST["email"];
		$message = $_POST['message'];
		$mysqli = new mysqli("localhost", "root", "", "myform",3307);
		if ($mysqli->connect_errno) {
			echo "Failed to connect to MySQL: " . $mysqli->connect_error;
			exit();
		} else {
			$sql = "INSERT INTO `information`( `id`,`name`, `phone`, `email`,`message`)
			 VALUES ('','$username','$phone','$email','$message')";
			if ($mysqli->query($sql) === TRUE) {
				echo "New record created successfully";
			} else {
				echo "Error: " . $sql . "<br>" . $mysqli->error;
			}
		}
?>