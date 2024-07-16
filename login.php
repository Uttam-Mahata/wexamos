<?php
require 'validate.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login Page</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/icofont/1.0.1/css/icofont.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
	 <!-- Bootstrap core CSS -->
	 <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
   <!-- Google Font  -->
   <link
      href="https://fonts.googleapis.com/css?family=Dosis:300,400,500,600,700,800|Roboto:300,400,400i,500,500i,700,700i,900,900i"
      rel="stylesheet">
 
   <!-- Include jQuery -->

   <!-- Responsive  CSS -->
   <style>
		body {
			background: linear-gradient(135deg, #6e8efb, #a777e3);
			font-family: 'Arial', sans-serif;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.login-box {
			background: #fff;
			padding: 40px;
			border-radius: 10px;
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
			text-align: center;
		}

		.login-box img {
			border-radius: 50%;
			margin-bottom: 20px;
		}

		.textbox {
			position: relative;
			margin-bottom: 20px;
		}

		.textbox i {
			position: absolute;
			left: 10px;
			top: 50%;
			transform: translateY(-50%);
			color: #6c757d;
		}

		.textbox input {
			width: 100%;
			padding: 10px 10px 10px 40px;
			border: 1px solid #ced4da;
			border-radius: 5px;
			outline: none;
			transition: border-color 0.3s;
		}

		.textbox input:focus {
			border-color: #80bdff;
		}

		.btn-primary {
			background: #6e8efb;
			border-color: #6e8efb;
			transition: background-color 0.3s, transform 0.3s;
		}

		.btn-primary:hover {
			background: #5a73db;
			transform: translateY(-3px);
		}
	</style>
</head>

<body>
<form id="loginForm" action="validate.php" method="post">
			<div class="login-box animate__animated animate__fadeIn">
				<img src="icon.svg" width="200" height="200" alt="User Icon">
				<div class="textbox">
					<i class="icofont-ui-user"></i>
					<input type="text" placeholder="Adminname" name="adminname" required>
				</div>
				<div class="textbox">
					<i class="icofont-lock"></i>
					<input type="password" placeholder="Password" name="password" required>
				</div>
				<input class="btn btn-primary btn-block" type="submit" name="login" value="Log In">
			</div>
		</form>


		<!-- Toast Notification -->
		<div class="toast" id="successToast" style="position: absolute; top: 20px; right: 20px;" data-delay="3000">
			<div class="toast-header">
				<strong class="mr-auto text-success">Success</strong>
				<button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
			</div>
			<div class="toast-body">
				Login successful. Redirecting...
			</div>
		</div>

		<!-- Modal Notification -->
		<div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="errorModalLabel">Login Error</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						Invalid username or password. Please try again.
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	<script>
		$(document).ready(function () {
			$('#loginForm').on('submit', function (event) {
				event.preventDefault();
				$.ajax({
					type: 'POST',
					url: 'validate.php',
					data: $(this).serialize(),
					dataType: 'json',
					success: function (response) {
						if (response.success) {
							$('#successToast').toast('show');
							setTimeout(function () {
								window.location.href = 'create-scoreboard.html';
							}, 3000);
						} else {
							$('#errorModal').modal('show');
						}
					}
				});
			});
		});
	</script>
</body>

</html>
