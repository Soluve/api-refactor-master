<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soluve's Tech Corner</title>
    <link rel="stylesheet" href="style.css">
    <!-- Font Awesome for icons -->
     <link rel="stylesheet" href="blog.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
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
                <h1>Soluve's Tech Corner</h1>
            </div>
            <div class="nav-toggle" id="navToggle">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="nav-links">
                <li><a href="#" class="active">Home</a></li>
                <li><a href="articles.php">Articles</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="dashboard.php">Dashboard</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to My Blog</h1>
            <p>Exploring ideas, sharing stories, and creating connections</p>
        </div>
    </section>
 
    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <!-- Featured Posts -->
            <section class="featured-posts">
                <h2>Featured Posts</h2>
                <div class="post-grid" id="featured">
                    
                </div>
            </section>

            <!-- Recent Posts -->
            <section class="recent-posts">
                <h2>Recent Posts</h2>
                <div class="post-grid" id="blogs-container">
                     
                </div>
            </section>

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

            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="sidebar-widget">
                    <h3>About Me</h3>
                    <p>A passionate writer sharing insights about technology, design, and productivity.</p>
                </div>

                <div class="sidebar-widget">
                    <h3>Categories</h3>
                    <ul class="category-list">
                        <li><a href="#">Technology (12)</a></li>
                        <li><a href="#">Design (8)</a></li>
                        <li><a href="#">Productivity (6)</a></li>
                        <li><a href="#">Health (4)</a></li>
                    </ul>
                </div>

                <div class="sidebar-widget">
                    <h3>Popular Tags</h3>
                    <div class="tag-cloud">
                        <a href="#" class="tag">Web Dev</a>
                        <a href="#" class="tag">UI/UX</a>
                        <a href="#" class="tag">JavaScript</a>
                        <a href="#" class="tag">Lifestyle</a>
                        <a href="#" class="tag">Remote Work</a>
                    </div>
                </div>
            </aside>
        </div>
    </main>

    <!-- Newsletter Section -->
    <section class="newsletter">
        <div class="container">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest posts delivered straight to your inbox.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Enter your email address">
                <button type="submit">Subscribe</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About The Blog</h3>
                    <p>A platform dedicated to sharing knowledge and insights about technology, design, and personal growth.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Connect</h3>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Blog Name. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Simple mobile menu toggle
        document.getElementById('navToggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    </script>
    <script src="blog.js"></script>
</body>
</html>