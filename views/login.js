let form = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");

form.addEventListener("submit", async (e) => {
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
        alert("Unable to login, please retry...")
    }
    
});
function setSessionData(userData) {
    const Usetoken = sessionStorage.getItem('auth');
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
        // Redirect to dashboard
        window.location.href = './blog.php';
      } else {
        // Display error message
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }