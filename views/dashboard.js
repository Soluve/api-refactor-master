let form = document.getElementById("login-form");
let formSection = document.getElementById("login-section");
let email = document.getElementById("email");
let password = document.getElementById("password");
let submit = document.getElementById("submit");

submit.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = {
        email: email.value.trim(),
        password: password.value.trim()
    };

    console.log("Form values:");
    console.log("Email:", email.value);
    console.log("Password length:", password.value.length);
    const jsonData = JSON.stringify(formData);
    console.log("Stringified data:", jsonData);

    try {
        const response = await fetch("http://localhost:8080/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        const responseData = await response.json();
        // console.log("Server response:", JSON.stringify(responseData));
        if (responseData[0].status === "Success") {
            // console.log("Attempting redirect...");
            const auth = responseData[0].data.id;
            sessionStorage.setItem('Authorisation', auth);  // This stores the token in sessionStorage
            window.token = auth; 
            // console.log(token);
            setSessionData(responseData[0].data);
            displayUserRole(responseData[0].data.role)
            
        } else {
            console.log("Status condition not met");
        }
        
    } catch (error) {
        console.error("Error:", error.message);
    }
    
});

// Display Admin user
let userRole = document.getElementById("user-role")
function displayUserRole(data){
    userRole.innerText = `${data}`
}

// function to get blogs
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
               
        
         
    } catch(error) {
        console.error("Error:");
         
    }
}




// Function to display blogs
function displayBlogs(blogs) {
    const blogsContainer = document.getElementById('blog-table-body');
    if (!blogs || !blogs.length) {
        blogsContainer.innerHTML = '<p>No blogs found</p>';
        return;
    }
//create an array of blog content converted to string
    blogsContainer.innerHTML = blogs.map(blog => `
        <tr class="blog-row">
            <td>${blog.title}</td>
            <td>${blog.category}</td>
            <td>${blog.username}</td>
            <td>${blog.created_at}</td>
            <td>
                <button style="background-color: red;" class="delete-blog">Delete</button><br><br>
                <button class="update-blog">Update</button>
            </td>     
            <td class="blog-id" hidden>${blog.id}</td>        
        </tr>
    `).join('');
}

// delete blog 
let deleteBlog = document.querySelector('.delete-blog');
// console.log(deleteBlog)
const token = sessionStorage.getItem('Authorisation');
document.addEventListener('click', async (e) => {
    if (e.target.matches('.delete-blog')) {
        e.preventDefault();
        const postCard = e.target.closest('.blog-row');
        const blogIdElement = postCard.querySelector('.blog-id');
        const blogId = blogIdElement ? blogIdElement.textContent.trim() : null;

        try {
             
            const url = new URL(`http://localhost:8080/deleteblog.php/blogs/${blogId}`);

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData.status);
            if(responseData.status === "Success"){
                alert(responseData.message)
            }

        } catch (error) {
            alert("Error: " + responseData.message);
        }
    }
});




const modal = document.getElementById('updateModal');
const modalClose = document.querySelector('.modal-close');
const modalLoading = document.getElementById('modalLoading');
const modalBody = document.getElementById('modalBody');

document.addEventListener('click', function (event) {
   if (event.target.classList.contains('update-blog')) {
       event.preventDefault();
       
       // Traverse the DOM to find the blog ID
       const postCard = event.target.closest('.blog-row'); // Find the closest article element
       const blogIdElement = postCard.querySelector('.blog-id'); // Select the hidden span with the ID
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
            throw new Error('Failed to fetch update form');
        }

        const blogData = await response.json();
        const blog = blogData.blog

        // Populate modal with blog details
        modalBody.innerHTML = `
            <form id="update-blog-form">
                    <div>
                        <label for="blog-title">Title:</label>
                        <input type="text" id="blog-title-u" name="title" required>
                    </div>
                     
                    <div>
                        <label for="blog-category">Category:</label>
                        <button type="menu" id="getCategory-u">Choose category</button>
                        <select id="blog-category-u" name="category-u" hidden>
                        <option value="" id="prompt" hidden>Select Category</option>
                        </select>
                    </div>
                    <div>
                        <label for="blog-content-u">Content:</label>
                        <textarea id="blog-content-u" name="content" required></textarea>
                    </div>
                    <button type="submit" id="updatePost">Update Post</button>
                </form>
        `
        initializeCKEditor()
        let getCategoryU = document.getElementById("getCategory-u");
    let categoryU = document.getElementById("blog-category-u")
     
    if(categoryU){
          // function to get categories for update blog

    getCategoryU.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        
        const url = new URL("http://localhost:8080/getcategories.php");

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const responseData = await response.json();
        console.log(responseData);        
        data = responseData.data;
        console.log(data);
        displayUCategories(data);
        
        return data;
    } catch(error) {
        console.error("Unable to get data");
       
    }
});



//  function to display categories
function displayUCategories(categories) {
    if (categories && categories.length > 0) {
         
        categoryU.style.display = 'block'; // Make visible
        getCategoryU.style.display = 'none'; // Hide the get category button

        // Clear existing options first
        categoryU.innerHTML = ''; 

        // Add a default/placeholder option
        const defaultOption = document.createElement('option');
        defaultOption.value = ''; // Empty value
        defaultOption.text = 'Select a category';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        categoryU.appendChild(defaultOption);

        // Add categories
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.text = cat.category;
            categoryU.appendChild(option);
        });
    } else {
        // Handle case when no categories are available
        categoryU.style.display = 'none';
        getCategoryU.style.display = 'block';
    }
}

    }else{
        console.log("can't get category yet...")
    }

        // Hide loading, show content
        modalLoading.style.display = 'none';
        modalBody.style.display = 'block';

    } catch (error) {
        console.error('Blog fetch error:', error);
        modalBody.innerHTML = `
            <p>Unable to load update form. Please try again later.</p>
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


// update blog
let updatePost = document.getElementById("updatePost");
const blogTitleU = document.getElementById('blog-title-u');
const blogCategoryU = document.getElementById('blog-category-u');
const blogContentU = document.getElementById('blog-content-u');


function initializeCKEditor() {
    let editorInstance;
    console.log(blogContentU)
    if (blogContentU) {
        ClassicEditor.create(blogContentU)
            .then(editor => {
                editorInstance = editor; // Assign the editor to the outer scope variable
                window.blogEditor = editor; // Keep this for global access if needed, but prefer editorInstance
            })
            .catch(error => console.error("CKEditor initialization failed:", error));
    }
    
    // Attach the listener to a parent element (e.g., document)
    document.addEventListener('click', async (e) => {
        if (e.target && e.target.id === 'updatePost') { // Check if the clicked element is updatePost
            e.preventDefault();
            console.log("it's working")
            if (!editorInstance) {
                console.error("CKEditor is not initialized yet.");
                return;
            }

            const editorContent = editorInstance.getData().trim();
            
            const formData = {
                title: blogTitleU.value.trim(),
                category_id: blogCategoryU.value.trim(),
                content: editorContent
            };
    
            try {
                const response = await fetch(`http://localhost:8080/updateblog.php/${blogId}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Important: Add Content-Type header
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                    credentials: 'include' // Usually not needed for same-origin requests
                });
    
                if (!response.ok) { // Check for HTTP errors
                    const errorData = await response.json(); // Try to get error details from the server
                    throw new Error(`HTTP error ${response.status}: ${errorData?.message || response.statusText}`);
                }
    
                const responseData = await response.json();
                console.log(responseData);
                 // Optionally redirect or show a success message here
                 window.location.href = "/admin.php"; // Example redirect
            } catch (error) {
                console.error("Error updating blog:", error);
                // Handle the error, e.g., display an error message to the user
                alert("An error occurred while updating the blog. Please check the console for details.");
            }
        }
    });
}


// function initializeCKEditor() {
//     let editorInstance; // Declare editorInstance in the outer scope

//     if (blogContentU) {
//         ClassicEditor.create(blogContentU)
//             .then(editor => {
//                 editorInstance = editor; // Assign the editor to the outer scope variable
//                 window.blogEditor = editor; // Keep this for global access if needed, but prefer editorInstance
//             })
//             .catch(error => console.error("CKEditor initialization failed:", error));
//     }
//     console.log(updatePost)
//     updatePost.addEventListener('click', async (e) => {
//         e.preventDefault();

//         if (!editorInstance) { // Check if CKEditor is initialized
//             console.error("CKEditor is not initialized yet.");
//             return; // Stop execution if not initialized
//         }

//         const editorContent = editorInstance.getData().trim(); // Use editorInstance here

//         const formData = {
//             title: blogTitleU.value.trim(),
//             category_id: blogCategoryU.value.trim(),
//             content: editorContent
//         };

//         try {
//             const response = await fetch(`http://localhost:8080/updateblog.php/${blogId}`, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json', // Important: Add Content-Type header
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(formData),
//                 credentials: 'include' // Usually not needed for same-origin requests
//             });

//             if (!response.ok) { // Check for HTTP errors
//                 const errorData = await response.json(); // Try to get error details from the server
//                 throw new Error(`HTTP error ${response.status}: ${errorData?.message || response.statusText}`);
//             }

//             const responseData = await response.json();
//             console.log(responseData);
//              // Optionally redirect or show a success message here
//              window.location.href = "/admin.php"; // Example redirect
//         } catch (error) {
//             console.error("Error updating blog:", error);
//             // Handle the error, e.g., display an error message to the user
//             alert("An error occurred while updating the blog. Please check the console for details.");
//         }
//     });
// }

initializeCKEditor();
 
// async function renderAndSubmitUpdate(){
//     ClassicEditor
//                 .create(document.querySelector('#blog-content-u'))
//                 .then(editor => {
//                     // Store the editor instance globally if needed
//                     window.blogEditor = editor;
            
//                     updatePost.addEventListener('click', async (e) =>{
//                         e.preventDefault();
//                         // Get the content from CKEditor
//                         const editorContent = editor.getData().trim();
//                         const formData = {
//                             title: blogTitleU.value.trim(),
//                             category_id: blogCategoryU.value.trim(),
//                             content: editorContent
//                         }
//                         try{
//                             const response = await fetch(`http://localhost:8080/updateblog.php/${blogId}`, {
//                                 method: "POST",
//                                 headers: {
                                     
//                                     'Authorization': `Bearer ${token}`
//                                 },
//                                 body: JSON.stringify(formData),
//                                 credentials: 'include'
//                             });
//                             const responseData = await response.json()
//                             console.log(responseData)
//                         }catch(error){
            
//                         }
//                     })
//                 })
// }
// document.addEventListener('DOMContentLoaded', () =>{
//     renderAndSubmitUpdate()             
// })
         



let dashboard = document.getElementById("dashboard");
function setSessionData(userData) {
    // const Usetoken = sessionStorage.getItem('token');
    fetch('/set_session.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        if(userData.role === "Super-admin" || userData.role === "Editor-Admin" ){
            dashboard.removeAttribute("hidden");
            formSection.setAttribute("hidden", "");
        }else{
            alert("User not Authorised");
        }
      } else {
        // Display error message
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

// Get category button
let getCategory = document.getElementById("getCategory");
getCategory.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        
        const url = new URL("http://localhost:8080/getcategories.php");

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const responseData = await response.json();
        
        console.log(responseData);        
        data = responseData.data;
        window.categoryData = data;
        console.log(data);
        displayCategories(data);
        
        return data;
    } catch(error) {
        console.error("Unable to get data");
       
    }
});



//  function to display categories
function displayCategories(categories) {
    if (categories && categories.length > 0) {
         
        category.style.display = 'block'; // Make visible
        getCategory.style.display = 'none'; // Hide the get category button

        // Clear existing options first
        category.innerHTML = ''; 

        // Add a default/placeholder option
        const defaultOption = document.createElement('option');
        defaultOption.value = ''; // Empty value
        defaultOption.text = 'Select a category';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        category.appendChild(defaultOption);

        // Add categories
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.text = cat.category;
            category.appendChild(option);
        });
    } else {
        // Handle case when no categories are available
        category.style.display = 'none';
        getCategory.style.display = 'block';
    }
}


const createPost = document.getElementById("createPost");
let title = document.getElementById("blog-title");
let content = document.getElementById("blog-content");
let category = document.getElementById("blog-category");
const imageInput = document.getElementById("imageFile");
const createBlogForm = document.getElementById("create-blog-form")



// // Display Role Table
// let roleTable = document.getElementById("roles-table-body")
// async function ge() {
//     try {
//         const url = new URL("http://localhost:8080/getblogs.php/blogs");

//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const responseData = await response.json();
//         data = responseData.data;
//         console.log(data);
//         displayBlogs(data);
        
//         return data;
//     } catch(error) {
//         console.error("Error:");
//         // Optionally show error to user
//         // showErrorMessage(error.message);
//     }
// }

// get users
const getUsers = document.getElementById("get-user-id");
const users = document.getElementById("user-id");
getUsers.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        
        const url = new URL("http://localhost:8080/getusers.php");

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });


        const responseData = await response.json();
        
        console.log(responseData);        
        data = responseData.data;
        console.log(data);
        displayUsers(data);
        
        return data;
    } catch(error) {
        console.error("Unable to get data");
       
    }
});



//  function to display categories
function displayUsers(usersData) {
    if (usersData && usersData.length > 0) {
         
        users.style.display = 'block'; // Make visible
        getUsers.style.display = 'none'; // Hide the get category button

        // Clear existing options first
        users.innerHTML = ''; 

        // Add a default/placeholder option
        const defaultOption = document.createElement('option');
        defaultOption.value = ''; // Empty value
        defaultOption.text = 'Select a user';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        users.appendChild(defaultOption);

        // Add categories
        usersData.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.text = (user.lname) + ' ' + (user.fname);
            users.appendChild(option);
        });
    } else {
        // Handle case when no categories are available
        users.style.display = 'none';
        getUsers.style.display = 'block';
    }
}



let addRole = document.getElementById("addRole");
let userID = document.getElementById("user-id")
let roleName = document.getElementById("role-name")
let roleForm = document.getElementById("add-role-form")
// let roleName = document.getElementById("role-name")
addRole.addEventListener("click", async(e) =>{
    e.preventDefault();            
    // Collect selected policies
    const policiesCheckboxes = document.querySelectorAll('input[name="permissions"]:checked');
    const policies = Array.from(policiesCheckboxes).map(cb => cb.value);

    // Validate policies
    if (policies.length === 0) {
        showMessage('Policies must be assigned to user', 'error');
        return;
    }

    // Prepare data for submission
    const data = {
        user_id: userID.value.trim(),
        name: roleName.value.trim(),
        policies: policies
    };

    // Send POST request
    fetch('http://localhost:8080/addrole.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        // Handle successful response
        alert(result.message, 'success');
        
        //reset form
        roleForm.reset();
    })
    .catch(error => {
        // Handle errors
        console.log('Error creating role: ' + error.message, 'error');
    });
});

async function assemblePolicies() {
    try {
        // Fetch roles and policies
        const [rolesResponse, policiesResponse] = await Promise.all([
            fetch("http://localhost:8080/getRoles.php", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }),
            fetch("http://localhost:8080/getPolicies.php", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        ]);

        // Check if responses are ok
        if (!rolesResponse.ok || !policiesResponse.ok) {
            throw new Error('One or more API calls failed');
        }

        // Parse responses
        const rolesData = await rolesResponse.json();
        const policiesData = await policiesResponse.json();

        // Create a map of policy IDs to their descriptions
        const policiesMap = {};
        policiesData.data.forEach(policy => {
            policiesMap[policy.id] = policy.privileges;
        });

        // Enrich roles with full policy descriptions
        const enrichedRoles = rolesData.data.map(role => {
            // Parse the policies string into an array
            const policyIds = JSON.parse(role.policies);
            
            // Map policy IDs to their descriptions
            const policyDescriptions = policyIds.map(id => 
                policiesMap[id] || 'Unknown Policy'
            );

            return {
                ...role,
                policyDescriptions: policyDescriptions
            };
        });

        // Optional: Display the enriched roles (uncomment displayRoles if needed)
        console.log(enrichedRoles);
        let test = enrichedRoles[0].policyDescriptions
        console.log(test);
        displayRoles(enrichedRoles);

        return enrichedRoles;
    } catch (error) {
        console.error("Error assembling policies:", error);
        throw error;
    }
}


// Updated displayRoles function
function displayRoles(roles) {
    const rolesContainer = document.getElementById("roles-table-body");
    
    if (!roles || !roles.length) {
        rolesContainer.innerHTML = '<p>No roles found</p>';
        return;
    }
    
    rolesContainer.innerHTML = roles.map(role => `
        <tr class="role-row">
            <td>${role.name}</td>
            <td>${role.policyDescriptions.join(`<br>`)}</td>
            <td>
                <button style="background-color: red;" class="delete-role">Delete</button>
            </td>
            <td class="role-id" hidden>${role.user_id}</td>
        </tr>
    `).join('');
}

// Call the function
assemblePolicies()
    .then(roles => {
    
    })
    .catch(error => {
        console.error("Failed to assemble policies:", error);
    });

// Call the function when page loads
document.addEventListener('DOMContentLoaded', () => {
    getBlogs();
   
});

document.addEventListener('DOMContentLoaded', () => {
    ClassicEditor
    .create(document.querySelector('#blog-content'))
    .then(editor => {
        // Store the editor instance globally if needed
        window.blogEditor = editor;

        createPost.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Get the content from CKEditor
            const editorContent = editor.getData().trim();
            
            // Validate inputs
            if (!title.value.trim()) {
                alert('Please enter a title');
                return;
            }
            
            if (!editorContent) {
                alert('Please enter blog content');
                return;
            }
            
            const file = imageInput.files[0];
            
            // Create FormData to send both text and file
            const formData = new FormData();
            
            // Create a JSON object for metadata
            const blogData = {
                title: title.value.trim(),
                content: editorContent,
                category_id: category.value,
            };
            
            // Append JSON data as a string
            formData.append('json', JSON.stringify(blogData));
            
            // Append file if exists
            if (file) {
                formData.append('uploader', file);
            }
        
            try {
                const response = await fetch("http://localhost:8080/createblog.php", {
                    method: "POST",
                    headers: {
                         
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                    credentials: 'include'
                });
        
                const responseText = await response.text();
        
                // Split the response into parts and parse them
                const [meta, message] = responseText.split('\n').map(JSON.parse);
        
                // Log the parts for debugging
                console.log('Meta:', meta);
                console.log('Message:', message);
        
                let JsonMessage = JSON.parse(message);
                console.log('Message:', JsonMessage.status);
        
                // Check status and provide feedback
                if (JsonMessage.status === 'Success') {
                    createBlogForm.reset();
                    alert('Blog created successfully');
                    // Optional: reset form or redirect
                    
                } else {
                    alert(JsonMessage.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Blog creation error. Please retry.');
            }
        });
    });
   
});

// document.addEventListener('DOMContentLoaded', () => {
//     getRoles();
// });
// document.addEventListener('DOMContentLoaded', () => {
//     getPolicies();
// });
