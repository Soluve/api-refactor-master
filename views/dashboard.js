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
            setSessionData(responseData[0].data) 
            
        } else {
            console.log("Status condition not met");
        }
        
    } catch (error) {
        console.error("Error:", error.message);
    }
    
});

let dashboard = document.getElementById("dashboard");
function setSessionData(userData) {
    const Usetoken = sessionStorage.getItem('token');
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
async function handleImageUpload(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('uploader', file);

    try {
        const response = await fetch('http://localhost:8080/createblog.php', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const result = await response.json();
        console.log(result)

        if (result.status === 'Success') {
            // Store image info in cookie for later use
            document.cookie = `imgInfo=${JSON.stringify(result.data)}; path=/`;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Image upload error:', error);
        alert('Failed to upload image');
    }
}

const createPost = document.getElementById("createPost");
let title = document.getElementById("blog-title");
let content = document.getElementById("blog-content");
let category = document.getElementById("blog-category");



createPost.addEventListener('click',  async (e) =>{
    e.preventDefault();
    const Usetoken = sessionStorage.getItem('token');
    const formData = {
        title: title.value.trim(),
        content: content.value.trim(),
        category_id: category.value
    }
    try {
        const response = await fetch("http://localhost:8080/createblog.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        console.log(responseData);
        
        if (responseData.status === 'Success') {
            alert('Blog created successfully');
        } else {
            throw new Error(responseData.message);
        }
    }catch (error) {
        console.error('Blog creation error:', error);
        alert(error.message);
    }
})


