// Simple object to hold student credentials and track login status
const students = {
    "206921": { password: "369256", name: "Satvik Singh", formUrl: "https://forms.office.com/r/3Maxvpq0N3" },
    "567289": { password: "256916", name: "Shatyam Singh", formUrl: "https://forms.office.com/r/3Maxvpq0N3" },
    "672882": { password: "253973", name: "Aradhya Singh", formUrl: "https://forms.office.com/r/3Maxvpq0N3" },
    // Add more students as required
};

// Audio sound effects
const loginSuccessSound = new Audio('login-sucesssoundeffect.mp3');
loginSuccessSound.volume = 0.85; // Set volume to 85%

const transitionSound = new Audio('transition-sound.mp3');
transitionSound.volume = 0.85; // Set volume to 85%

// Play transition sound on page load
document.addEventListener('DOMContentLoaded', () => {
    transitionSound.play(); // Play sound every time the page loads or refreshes
});

// Function to set login status in localStorage
function setLoginStatus(rollNumber, status) {
    localStorage.setItem(`loggedIn_${rollNumber}`, status);
}

// Function to get login status from localStorage
function getLoginStatus(rollNumber) {
    return localStorage.getItem(`loggedIn_${rollNumber}`) === 'true';
}

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const rollNumber = document.getElementById("rollNumber").value;
    const password = document.getElementById("password").value;

    // Check if the student exists and password matches
    if (students[rollNumber] && students[rollNumber].password === password) {
        // Check if the student has already logged in
        if (getLoginStatus(rollNumber)) {
            document.getElementById("errorMessage").textContent = "You have already completed your exam.";
            document.getElementById("errorMessage").style.display = 'block'; // Show message for second login attempt
        } else {
            const studentName = students[rollNumber].name;
            const formUrl = students[rollNumber].formUrl;
            setLoginStatus(rollNumber, true); // Save login status in localStorage
            loginSuccessSound.play(); // Play the success sound
            transitionToTimerPage(studentName, formUrl); // Move to the timer page
        }
    } else {
        document.getElementById("errorMessage").textContent = "Sorry, your credentials are incorrect.";
        document.getElementById("errorMessage").style.display = 'block'; // Show message for incorrect credentials
    }
});

// Transition to timer page with a smooth fade effect
function transitionToTimerPage(name, formUrl) {
    gsap.to('.login-container', {opacity: 0, y: -50, duration: 1, ease: "power2.inOut", onComplete: showWelcomePage.bind(null, name, formUrl)});
}

// Function to display welcome page and countdown timer
function showWelcomePage(name, formUrl) {
    document.body.innerHTML = `
        <div style="text-align: center;">
            <h1 id="welcomeText" style="font-family: 'Montserrat', sans-serif; font-size: 24px; color: blue;">Welcome, ${name}!</h1>
            <p class="message" style="font-family: 'Montserrat', sans-serif; font-size: 18px;">Your exam will start shortly.</p>
            <p id="timer" style="font-size: 48px; font-weight: bold; margin-top: 10px;">5</p>
            <!-- General Guidelines -->
            <div class="instructions" style="font-family: 'Montserrat', sans-serif; margin-top: 20px; color: #ff4444; background: rgba(0, 0, 0, 0.7); padding: 15px; border-radius: 5px; animation: fadeInGuidelines 1.5s ease;">
                <p>Please follow these instructions:</p>
                <ul style="text-align: left; display: inline-block; padding: 10px;">
                    <li>Do not use the internet to assist you during the exam.</li>
                    <li>Ensure your device has enough battery.</li>
                    <li>Contact your instructor for any questions.</li>
                </ul>
            </div>
        </div>
    `;

    // Animations for welcome text and timer
    gsap.from('#welcomeText', { opacity: 0, y: -20, duration: 1.5, ease: "power2.out" }); // Slide in the name
    gsap.from('#timer', { opacity: 0, scale: 0.5, duration: 1, delay: 0.5, ease: "bounce.out" }); // Bounce effect for timer

    let countdown = 5;
    const timerElement = document.getElementById("timer");

    // Countdown timer
    const timer = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        gsap.to(timerElement, {scale: 1.1, duration: 0.3, ease: "power2.inOut"});
        if (countdown === 0) {
            clearInterval(timer);
            // Redirect immediately without buffering page
            window.location.href = formUrl;
        }
    }, 1000);
}
