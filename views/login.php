<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    
    <form action="" method="POST" id="form">
        <div class="input-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
        </div>
        <div class="input-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <input type="submit" value="Login" class="submit_btn">
        <p>Not Registered? <a href="register.php">Register</a></p>
    </form>
     
    <script src="login.js"></script>
</body>
</html>