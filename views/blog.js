// If you need to pass parameters, use URL parameters
async function getBlogs() {
    try {
        const url = new URL("http://localhost:8080/getblogs.php/blogs");

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        data = responseData.data;
        console.log(data);
        displayBlogs(data);
        
        return data;
    } catch(error) {
        console.error("Error:");
        // Optionally show error to user
        // showErrorMessage(error.message);
    }
}

// Function to display blogs
function displayBlogs(blogs) {
    const blogsContainer = document.getElementById('blogs-container');
    if (!blogs || !blogs.length) {
        blogsContainer.innerHTML = '<p>No blogs found</p>';
        return;
    }
    //create an array of blog content converted to string
    blogsContainer.innerHTML = blogs.map(blog => `
        <article class="post-card">
        <div class="post-image">
            <img src="${blog.imgPath_url}">
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="date">${blog.created_at}</span>
                <span class="category">${blog.category}</span>
            </div>
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
            <a href="#" class="read-more">Read More</a>
        </div>    
        </article>
    `).join('');
}
function displaySingleBlog(blog){
    
}
// Function to show error messages
function showErrorMessage(message) {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.textContent = `Error: ${message}`;
        errorContainer.style.display = 'block';
    }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', () => {
    getBlogs();
});
