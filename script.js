// HOME PAGE
function startJourney() {
    window.location.href = "login.html";
}


// PROFILE / DASHBOARD DATA
const savedProfile = localStorage.getItem("acadxProfile");

if (savedProfile) {

    const profile = JSON.parse(savedProfile);

    const studentName = document.getElementById("studentName");
    const careerGoal = document.getElementById("careerGoal");

    if (studentName && profile.name) {
        studentName.textContent = profile.name;
    }

    if (careerGoal && profile.careerGoal) {
        careerGoal.textContent = profile.careerGoal;
    }
}


// GOOGLE BUTTON
function continueWithGoogle() {

    alert(
        "Google sign-in will be connected when authentication is integrated."
    );

}