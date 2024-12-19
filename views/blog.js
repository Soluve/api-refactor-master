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
        displayFeatured(data)
        
        
        return data;
    } catch(error) {
        console.error("Error:");
        // Optionally show error to user
        // showErrorMessage(error.message);
    }
}

// function to slice blog text
function sliceWords(text) {
    const numWords = 20;
    return text.split(" ").slice(0, numWords).join(" ");
}

function displayFeatured(blogs){
    const blogsContainer = document.getElementById('featured');
            
    const blogsHTML = blogs.slice(-3).map(blog => {
        const slicedBlogContent = (sliceWords(blog.content)) + "..."; // Call sliceWords inside the loop
        return `
            <article class="post-card">
                <div class="post-image">
                    <img src="${blog.imgPath_url}" alt="${blog.title}">
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="date">${blog.created_at}</span>
                        <span class="category">${blog.category}</span>
                        <span id="blog-id" hidden>${blog.id}</span>
                    </div>
                    <h2>${blog.title}</h2>
                    <h5>${blog.username}</h5>
                    <p>${slicedBlogContent}</p>
                    <a href="#" class="read-more">Read More</a>
                </div>    
            </article>
        `;
    }).join('');

    // Update the container with the generated HTML
    blogsContainer.innerHTML = blogsHTML;

}
// Function to display blogs
function displayBlogs(blogs) {
    const blogsContainer = document.getElementById('blogs-container');
    if (!blogs || !blogs.length) {
        blogsContainer.innerHTML = '<p>No blogs found</p>';
        return;
    }
    //create an array of blog content converted to string
    const blogsHTML = blogs.slice(0, 4).map(blog => {
        const slicedBlogContent = (sliceWords(blog.content)) + "..."; // Call sliceWords inside the loop
        return `
            <article class="post-card">
                <div class="post-image">
                    <img src="${blog.imgPath_url}" alt="${blog.title}">
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="date">${blog.created_at}</span>
                        <span class="category">${blog.category}</span>
                        <span id="blog-id" hidden>${blog.id}</span>
                    </div>
                    <h2>${blog.title}</h2>
                    <h5>${blog.username}</h5>
                    <p>${slicedBlogContent}</p>
                    <a href="#" class="read-more">Read More</a>
                </div>    
            </article>
        `;
    }).join('');

    // Update the container with the generated HTML
    blogsContainer.innerHTML = blogsHTML;
}

function displayArticleBlogs(blogs) {
    const blogsContainer = document.getElementById('blogs-container-a');
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
                <span id="blog-id" hidden>${blog.id}</span>
            </div>
            <h2>${blog.title}</h2>
            <h5>${blog.username}</h5>
            <p>${blog.content}</p>
            <a href="#" class="read-more">Read More</a>
        </div>    
        </article>
    `).join('');
}
function displaySingleBlog(blog){
    
}


// // Function to show error messages
// function showErrorMessage(message) {
//     const errorContainer = document.getElementById('error-container');
//     if (errorContainer) {
//         errorContainer.textContent = `Error: ${message}`;
//         errorContainer.style.display = 'block';
//     }
// }

 // Modal Elements
 const modal = document.getElementById('blogModal');
 const modalClose = document.querySelector('.modal-close');
 const modalLoading = document.getElementById('modalLoading');
 const modalBody = document.getElementById('modalBody');

 document.addEventListener('click', function (event) {
    if (event.target.classList.contains('read-more')) {
        event.preventDefault();
        
        // Traverse the DOM to find the blog ID
        const postCard = event.target.closest('.post-card'); // Find the closest article element
        const blogIdElement = postCard.querySelector('#blog-id'); // Select the hidden span with the ID
        const blogId = blogIdElement ? blogIdElement.textContent.trim() : null; // Get and clean up the ID

        if (blogId) {
            openBlogModal(blogId);
        } else {
            console.error('Blog ID not found!');
        }
    }
});


 // Close modal when close button is clicked
 modalClose.addEventListener('click', closeModal);

 // Close modal when clicking outside the modal
 window.addEventListener('click', function(event) {
     if (event.target === modal) {
         closeModal();
     }
 });

 // Function to open modal and fetch blog details
 async function openBlogModal(blogId) {
     // Show modal
     modal.style.display = 'block';
     document.body.classList.add('modal-open');

     // Reset modal content
     modalLoading.style.display = 'block';
     modalBody.style.display = 'none';
     modalBody.innerHTML = '';

     try {
         // Fetch blog details
         const response = await fetch(`http://localhost:8080/getblogs.php/blogs/${blogId}`);
         
         if (!response.ok) {
             throw new Error('Failed to fetch blog details');
         }

         const blogData = await response.json();
         const blog = blogData.blog

         // Populate modal with blog details
         modalBody.innerHTML = `
             <h2>${blog.title}</h2>
             <div class="blog-meta">
                 <span>Published on: ${blog.created_at}</span>
             </div>
             <div class="blog-content">
                 ${blog.content}
             </div>
         `;

         // Hide loading, show content
         modalLoading.style.display = 'none';
         modalBody.style.display = 'block';

     } catch (error) {
         console.error('Blog fetch error:', error);
         modalBody.innerHTML = `
             <p>Unable to load blog details. Please try again later.</p>
         `;
         modalLoading.style.display = 'none';
         modalBody.style.display = 'block';
     }
 }

 // Function to close modal
 function closeModal() {
     modal.style.display = 'none';
     document.body.classList.remove('modal-open');
 }

// Call the function when page loads
document.addEventListener('DOMContentLoaded', () => {
    getBlogs();
   
});

 
