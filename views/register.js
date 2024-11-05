let form = document.getElementById("form");
let email = document.getElementById("email");
let lname = document.getElementById("lname");
let fname = document.getElementById("fname");
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        email: email.value.trim(),
        lname: lname.value.trim(),
        fname: fname.value.trim(),
        password: password.value.trim(),
        cpassword: cpassword.value.trim()
    };

    console.log("Form values:");
    console.log("Email:", email.value);
    console.log("Last Name:", lname.value);
    console.log("First Name:", fname.value);
    console.log("Password length:", password.value.length);
    
    const jsonData = JSON.stringify(formData);
    console.log("Stringified data:", jsonData);

    try {
        const response = await fetch("http://localhost:8080/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        const responseData = await response.json();
        console.log("Server response:", responseData);
        if (responseData["status"] === "Success") {
            console.log("Attempting redirect..."); 
            window.location.href = './login.php';
            console.log("After redirect line"); 
        } else {
            console.log("Status condition not met");
        }
    } catch (error) {
        console.error("Error:", JSON.parse(error));
    }
    
});
