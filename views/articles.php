<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Articles</title>
    <link rel="stylesheet" href="blog.css">
</head>
<body id="article-body">
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

    <div class="post-grid" id="blogs-container-a" style="width: 80%; margin: 0 auto;">
                                          
    </div>
    <div id="blogModal" class="modal">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <div id="modalLoading" class="modal-loading">
                    Loading blog details...
                    </div>
                    <div id="modalBody" class="modal-body" style="display: none;">
                    <!-- Blog details will be dynamically inserted here -->
                    </div>
                </div>
            </div>
    <script src="articles.js"></script>
    <script>
        // Simple mobile menu toggle
        document.getElementById('navToggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    </script>
</body>
</html>