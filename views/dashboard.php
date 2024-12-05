<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Administration Dashboard</title>
    <link rel="stylesheet" href="dashboard.css">
    
</head>
<body>
    <!-- Login Section -->
    <section id="login-section">
        <h2>Login to Dashboard</h2>
        <form id="login-form">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" id="submit">Login</button>
        </form>
    </section>
    

    <!-- Main Dashboard -->
    <main id="dashboard"  hidden>
        <!-- Navigation -->
        <nav>
            <ul>
                <li><a href="#blogs">Blogs</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#users">Users</a></li>
                <li><a href="#roles">Roles</a></li>
            </ul>
            <div>
                <span id="user-role">User Name</span>
                <button id="logout-btn">Logout</button>
            </div>
        </nav>

        <!-- Blog Management Section -->
        <section id="blog-section">
            <h2>Blog Management</h2>
            <!-- Create Blog Form -->
            <div id="create-blog">
                <h3>Create New Blog Post</h3>
                <form id="create-blog-form">
                    <div>
                        <label for="blog-title">Title:</label>
                        <input type="text" id="blog-title" name="title" required>
                    </div>
                    <div>
                        <label for="blog-title">Add image:</label>
                        <input type="file" id="imageFile" name="uploader" required>
                    </div>
                    <div>
                        <label for="blog-category">Category:</label>
                        <button type="menu" id="getCategory">Choose category</button>
                        <select id="blog-category" name="category" required hidden>
                        <option value="" id="prompt" hidden>Select Category</option>
                        </select>
                    </div>
                    <div>
                        <label for="blog-content">Content:</label>
                        <textarea id="blog-content" name="content" required></textarea>
                    </div>
                    <button type="submit" id="createPost">Create Post</button>
                </form>
            </div>

            <!-- Blog List -->
            <div id="blog-list">
                <h3>All Blog Posts</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="blog-table-body">
                        <!-- Blog entries will be inserted here -->
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Roles Section -->
        <section id="roles-section">
            <h2>Role Management</h2>
            <!-- Add Role Form -->
            <div id="add-role">
                <h3>Add New Role</h3>
                <form id="add-role-form">
                    <div>
                        <label for="user-id">User ID:</label>
                        <input type="text" id="user-id" name="userID" required>
                    </div>
                    <div>
                        <label for="role-name">Role Name:</label>
                        <input type="text" id="role-name" name="roleName" required>
                    </div>
                    <div>
                        <h4>Permissions:</h4>
                        <input type="checkbox" id="perm-update-blog" name="permissions" value="can-update-blog">
                        <label for="perm-create">Update blog</label>
                        <input type="checkbox" id="perm-delete-blog" name="permissions" value="can-delete-blog">
                        <label for="perm-read">Delete blog</label>
                        <input type="checkbox" id="perm-create-admin" name="permissions" value="can-create-admin">
                        <label for="perm-update">Create Admin</label>
                        <input type="checkbox" id="perm--user" name="permissions" value="can-delete-user">
                        <label for="perm-delete">Delete User</label>
                    </div>
                    <button type="submit" id="addRole">Add Role</button>
                </form>
            </div>

            <!-- Roles List -->
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Role Name</th>
                        <th>Permissions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="roles-table-body">
                    <!-- Roles will be inserted here -->
                    
                </tbody>
            </table>
        </section>
    </main>

    <!-- Update Blog Modal -->
    <dialog id="update-blog-modal">
        <h3>Update Blog Post</h3>
        <form id="update-blog-form">
            <div>
                <label for="update-blog-title">Title:</label>
                <input type="text" id="update-blog-title" name="title" required>
            </div>
            <div>
                <label for="update-blog-category">Category:</label>
                <select id="update-blog-category" name="category" required>
                    <option value="">Select Category</option>
                </select>
            </div>
            <div>
                <label for="update-blog-content">Content:</label>
                <textarea id="update-blog-content" name="content" required></textarea>
            </div>
            <button type="submit">Update Post</button>
            <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
        </form>
    </dialog>
    <script src="dashboard.js"></script>
</body>
</html>