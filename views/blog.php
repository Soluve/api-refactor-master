<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog</title>
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
                <h1>Blog Title</h1>
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
                <div class="post-grid">
                    <article class="post-card featured">
                        <div class="post-image">
                            <img src="/api/placeholder/800/400" alt="Featured post">
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
                                <span class="date">Nov 5, 2024</span>
                                <span class="category">Technology</span>
                            </div>
                            <h3>The Future of Web Development</h3>
                            <p>Exploring the latest trends and technologies shaping the future of web development...</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    </article>
                </div>
            </section>

            <!-- Recent Posts -->
            <section class="recent-posts">
                <h2>Recent Posts</h2>
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

                    <article class="post-card">
                        <div class="post-image">
                            <img src="/api/placeholder/400/300" alt="Post 2">
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
                                <span class="date">Nov 3, 2024</span>
                                <span class="category">Productivity</span>
                            </div>
                            <h3>Maximizing Your Work Efficiency</h3>
                            <p>Tips and strategies for improving your productivity and work-life balance...</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    </article>

                    <article class="post-card">
                        <div class="post-image">
                            <img src="/api/placeholder/400/300" alt="Post 3">
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
                                <span class="date">Nov 2, 2024</span>
                                <span class="category">Health</span>
                            </div>
                            <h3>Staying Healthy While Working Remote</h3>
                            <p>Essential tips for maintaining physical and mental health while working from home...</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    </article>
                </div>
            </section>

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