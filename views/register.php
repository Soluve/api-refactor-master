<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form action="" method="POST" id="form">
        <div class="input-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
        </div>
        <div class="input-group">
            <label for="lname">Last name</label>
            <input type="text" name="lname" id="lname">
        </div>
        <div class="input-group">
            <label for="fname">First name</label>
            <input type="text" name="fname" id="fname">
        </div>
        <div class="input-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <div class="input-group">
            <label for="cpassword">Confirm Password</label>
            <input type="password" name="cpassword" id="cpassword">
        </div>
        <input type="submit" value="Register" class="submit_btn">
        <p>Already have an account? <a href="login.php">Login</a></p>
    </form> 
    <script src="register.js"></script>
</body>
</html>