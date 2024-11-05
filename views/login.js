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
        if (responseData["status"] === "Success") {
            console.log("Attempting redirect..."); 
            window.location.href = './blog.php';
            console.log("After redirect line"); 
        } else {
            console.log("Status condition not met");
        }
        
    } catch (error) {
        console.error("Error:", error.message);
    }
    
});
