// =========================================
// ACADX LOGIN / SIGN UP
// Frontend MVP authentication
// =========================================


// =========================================
// SHOW SIGN UP
// =========================================

function showSignup() {

    document.getElementById("loginSection")
        .classList.add("hidden-auth");

    document.getElementById("signupSection")
        .classList.remove("hidden-auth");

}


// =========================================
// SHOW LOGIN
// =========================================

function showLogin() {

    document.getElementById("signupSection")
        .classList.add("hidden-auth");

    document.getElementById("loginSection")
        .classList.remove("hidden-auth");

}


// =========================================
// SIGN UP
// =========================================

document.getElementById("signupForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName")
                .value
                .trim();

        const email =
            document.getElementById("signupEmail")
                .value
                .trim();

        const password =
            document.getElementById("signupPassword")
                .value;

        const message =
            document.getElementById("signupMessage");


        // =====================================
        // CHECK EXISTING ACCOUNT
        // =====================================

        const existingUser =
            localStorage.getItem("acadxUser");


        if (existingUser) {

            const user =
                JSON.parse(existingUser);


            if (user.email === email) {

                message.textContent =
                    "An account with this email already exists. Please login.";

                message.style.color = "#b45309";

                return;
            }

        }


        // =====================================
        // SAVE USER
        // =====================================

        const user = {

            name: name,
            email: email,
            password: password

        };


        localStorage.setItem(
            "acadxUser",
            JSON.stringify(user)
        );


        // =====================================
        // SAVE STUDENT NAME
        // =====================================

        localStorage.setItem(
            "acadxName",
            name
        );


        // =====================================
        // NEW USER = PROFILE NOT COMPLETED
        // =====================================

        localStorage.removeItem(
            "profileCompleted"
        );


        // =====================================
        // MARK USER AS LOGGED IN
        // =====================================

        localStorage.setItem(
            "acadxLoggedIn",
            "true"
        );


        message.textContent =
            "Account created successfully!";

        message.style.color =
            "#263b70";


        // Clear form

        document.getElementById(
            "signupForm"
        ).reset();


        // =====================================
        // NEW USER GOES TO PROFILE
        // =====================================

        setTimeout(function() {

            window.location.href =
                "student-profile.html";

        }, 700);

    });


// =========================================
// LOGIN
// =========================================

document.getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail")
                .value
                .trim();

        const password =
            document.getElementById("loginPassword")
                .value;

        const message =
            document.getElementById("loginMessage");


        // =====================================
        // GET REGISTERED USER
        // =====================================

        const savedUser =
            localStorage.getItem("acadxUser");


        // =====================================
        // NO ACCOUNT
        // =====================================

        if (!savedUser) {

            message.textContent =
                "Account not found. Please sign up first.";

            message.style.color =
                "#b45309";

            return;
        }


        const user =
            JSON.parse(savedUser);


        // =====================================
        // WRONG EMAIL
        // =====================================

        if (user.email !== email) {

            message.textContent =
                "Account not found. Please sign up first.";

            message.style.color =
                "#b45309";

            return;
        }


        // =====================================
        // WRONG PASSWORD
        // =====================================

        if (user.password !== password) {

            message.textContent =
                "Incorrect password. Please try again.";

            message.style.color =
                "#b91c1c";

            return;
        }


        // =====================================
        // SUCCESSFUL LOGIN
        // =====================================

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

        message.style.color =
            "#263b70";


        // =====================================
        // CHECK PROFILE
        // =====================================

        setTimeout(function() {

            const profileCompleted =
                localStorage.getItem(
                    "profileCompleted"
                );


            if (profileCompleted === "true") {

                // Returning student
                window.location.href =
                    "dashboard.html";

            } else {

                // New / incomplete student
                window.location.href =
                    "student-profile.html";

            }

        }, 700);

    });


// =========================================
// GOOGLE LOGIN
// =========================================

function continueWithGoogle() {

    alert(
        "Google sign-in will be connected when authentication is integrated."
    );

}