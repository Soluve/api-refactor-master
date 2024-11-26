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
                <span id="user-name">User Name</span>
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
                        <select id="blog-category" name="category" required>
                            <option value="">Select Category</option>
                            <option value="1">Front end Development</option>
                            <option value="2">Back end Development</option>
                            <option value="3">Full Stack Development</option>
                            <option value="4">UI/UX</option>
                            <option value="5">Data Analytics</option>
                            <option value="6">Cyber Security</option>
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

        <!-- Categories Section -->
        <section id="categories-section">
            <h2>Categories</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="categories-table-body">
                    <!-- Categories will be inserted here -->
                </tbody>
            </table>
        </section>

        <!-- Users Section -->
        <section id="users-section">
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="users-table-body">
                    <!-- Users will be inserted here -->
                </tbody>
            </table>
        </section>

        <!-- Roles Section -->
        <section id="roles-section">
            <h2>Role Management</h2>
            <!-- Add Role Form -->
            <div id="add-role">
                <h3>Add New Role</h3>
                <form id="add-role-form">
                    <div>
                        <label for="role-name">Role Name:</label>
                        <input type="text" id="role-name" name="roleName" required>
                    </div>
                    <div>
                        <label for="role-description">Description:</label>
                        <textarea id="role-description" name="description"></textarea>
                    </div>
                    <div>
                        <h4>Permissions:</h4>
                        <input type="checkbox" id="perm-create" name="permissions" value="create">
                        <label for="perm-create">Create</label>
                        <input type="checkbox" id="perm-read" name="permissions" value="read">
                        <label for="perm-read">Read</label>
                        <input type="checkbox" id="perm-update" name="permissions" value="update">
                        <label for="perm-update">Update</label>
                        <input type="checkbox" id="perm-delete" name="permissions" value="delete">
                        <label for="perm-delete">Delete</label>
                    </div>
                    <button type="submit">Add Role</button>
                </form>
            </div>

            <!-- Roles List -->
            <table>
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Description</th>
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