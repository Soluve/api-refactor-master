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

let userRole = document.getElementById("user-role")
function displayUserRole(data){
    userRole.innerText = `${data}`
}
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




// Function to handle image upload
// async function handleImageUpload(event) {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('uploader', file);

//     try {
//         const response = await fetch('http://localhost:8080/createblog.php', {
//             method: 'POST',
//             body: formData,
//             credentials: 'include'
//         });

//         const result = await response.json();
//         console.log(result)

//         if (result.status === 'Success') {
//             // // Store image info in cookie for later use
//             // document.cookie = `imgInfo=${JSON.stringify(result.data)}; path=/`;
//             console.log('Cookies:', document.cookie);
//         } else {
//             throw new Error(result.message);
//         }
//     } catch (error) {
//         console.error('Image upload error:', error);
//         alert('Failed to upload image');
//     }
// }
let getCategory = document.getElementById("getCategory");
getCategory.addEventListener('click', async (e) => {
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
        displayCategories(data);
        
        return data;
    } catch(error) {
        console.error("Unable to get data");
       
    }
});
//  
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


createPost.addEventListener('click', async (e) => {
    e.preventDefault();
    // const token = sessionStorage.getItem('token');
    const file = imageInput.files[0];

    // Create FormData to send both text and file
    const formData = new FormData();
    formData.append('json', JSON.stringify({
        title: title.value.trim(),
        content: content.value.trim(),
        category_id: category.value,
    }));
    formData.append('uploader', file); // Add the file

    try {
        const response = await fetch("http://localhost:8080/createblog.php", {
            method: "POST",
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData, // Use FormData instead of JSON
            credentials: 'include'
        });

        const responseText = await response.text(); // Get raw text response

    // Split the response into parts and parse them
        const [meta, message] = responseText.split('\n').map(JSON.parse);

    // Log the parts for debugging
        console.log('Meta:', meta);
        console.log('Message:', message);
        console.log('Message:', typeof(message));
        let JsonMessage = JSON.parse(message);
        console.log('Message:', JsonMessage.status);

    // Check status and provide feedback
        if (JsonMessage.status === 'Success') {
        alert('Blog created successfully');
         } else {
            alert(JsonMessage.message)
        }
    } catch (error) {
        alert('Blog creation error');
        alert("Please Retry...");
    }
});

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



