// =========================================
// ACADX LOGIN / SIGN UP
// Frontend MVP authentication
// =========================================


// SHOW SIGN UP

function showSignup() {

    document.getElementById("loginSection")
        .classList.add("hidden-auth");

    document.getElementById("signupSection")
        .classList.remove("hidden-auth");

}


// SHOW LOGIN

function showLogin() {

    document.getElementById("signupSection")
        .classList.add("hidden-auth");

    document.getElementById("loginSection")
        .classList.remove("hidden-auth");

}


// SIGN UP

document.getElementById("signupForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const message =
            document.getElementById("signupMessage");


        // Check existing account

        const existingUser =
            localStorage.getItem("acadxUser");


        if (existingUser) {

            const user =
                JSON.parse(existingUser);

            if (user.email === email) {

                message.textContent =
                    "An account with this email already exists. Please login.";

                return;
            }
        }


        // Save user

        const user = {
            name: name,
            email: email,
            password: password
        };


        localStorage.setItem(
            "acadxUser",
            JSON.stringify(user)
        );


        message.textContent =
            "Account created successfully! Please login.";

        message.style.color = "#263b70";


        // Clear form

        document.getElementById("signupForm").reset();


        // Switch to login

        setTimeout(function() {

            showLogin();

        }, 1000);

    });


// LOGIN

document.getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        // Get registered user

        const savedUser =
            localStorage.getItem("acadxUser");


        // No account

        if (!savedUser) {

            message.textContent =
                "Account not found. Please sign up first.";

            message.style.color = "#b45309";

            return;
        }


        const user =
            JSON.parse(savedUser);


        // Wrong email

        if (user.email !== email) {

            message.textContent =
                "Account not found. Please sign up first.";

            message.style.color = "#b45309";

            return;
        }


        // Wrong password

        if (user.password !== password) {

            message.textContent =
                "Incorrect password. Please try again.";

            message.style.color = "#b91c1c";

            return;
        }


        // Successful login

        localStorage.setItem(
            "acadxLoggedIn",
            "true"
        );


        localStorage.setItem(
            "acadxName",
            user.name
        );


        message.textContent =
            "Login successful!";

        message.style.color = "#263b70";


        // Go to dashboard

        setTimeout(function() {

            if (localStorage.getItem("profileCompleted") === "true") {

    window.location.href = "dashboard.html";

} else {

    window.location.href = "student-profile.html";

}
        }, 700);

    });

    function continueWithGoogle() {

    alert(
        "Google sign-in will be connected when authentication is integrated."
    );

}