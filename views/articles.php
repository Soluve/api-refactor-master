<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Articles</title>
    <link rel="stylesheet" href="blog.css">
</head>
<body>
    <?php
    session_start();
    
    // Function to check if user is logged in
    function checkLogin() {
        if (!isset($_SESSION['user_id']) || !isset($_SESSION['token'])) {
            header("Location: login.php");
            exit();
        } 
    }
    checkLogin();
    ?>
    <!-- Header -->
    <header class="header">
        <nav class="nav-container">
            <div class="logo">
                <h1>Blog Title</h1>
            </div>
            <div class="nav-toggle" id="navToggle">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="nav-links">
                <li><a href="blog.php" class="active">Home</a></li>
                <li><a href="articles.php">Articles</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>

    <div class="post-grid" id="blogs-container">
                    <article class="post-card">
                        <div class="post-image">
                            <img src="/api/placeholder/400/300" alt="Post 1">
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
                                <span class="date">Nov 4, 2024</span>
                                <span class="category">Design</span>
                            </div>
                            <h3>Principles of Modern UI Design</h3>
                            <p>Understanding the key principles that make modern user interfaces effective...</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    </article>

                     
                </div>
    <script src="blog.js"></script>
    <script>
        // Simple mobile menu toggle
        document.getElementById('navToggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    </script>
</body>
</html>