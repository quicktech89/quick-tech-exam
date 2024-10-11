// Simple object to hold student credentials
const students = {
    "101": { password: "pass101", name: "John Doe", formUrl: "https://forms.gle/sampleForm1" },
    "102": { password: "pass102", name: "Jane Smith", formUrl: "https://forms.gle/sampleForm2" },
    "103": { password: "pass103", name: "Alice Johnson", formUrl: "https://forms.gle/sampleForm3" },
    "104": { password: "pass104", name: "Bob Brown", formUrl: "https://forms.gle/sampleForm4" },
    "105": { password: "pass105", name: "Charlie Davis", formUrl: "https://forms.gle/sampleForm5" },
    "106": { password: "pass106", name: "Eve White", formUrl: "https://forms.gle/sampleForm6" },
    "112": { password: "pass112", name: "Frank Green", formUrl: "https://forms.gle/sampleForm7" }
};

// Local storage key to track completed exams
const completedExamsKey = 'completedExams';

// Audio sound effect after successful login
const loginSuccessSound = new Audio('sounds/custom-sound.mp3'); // Change to your custom sound

// Maintenance Mode Flag
let isUnderMaintenance = true; // Change to true when updating credentials

// Function to check if the student has already completed the exam
function hasCompletedExam(rollNumber) {
    const completedExams = JSON.parse(localStorage.getItem(completedExamsKey)) || {};
    return completedExams[rollNumber] === true;
}

// Function to mark exam as completed
function markExamCompleted(rollNumber) {
    const completedExams = JSON.parse(localStorage.getItem(completedExamsKey)) || {};
    completedExams[rollNumber] = true; // Mark as completed
    localStorage.setItem(completedExamsKey, JSON.stringify(completedExams));
}

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    if (isUnderMaintenance) {
        alert("The site is under maintenance. Please check back later.");
        return;
    }

    const rollNumber = document.getElementById("rollNumber").value;
    const password = document.getElementById("password").value;

    // Check if the student has already completed the exam
    if (hasCompletedExam(rollNumber)) {
        document.getElementById("errorMessage").textContent = "You have already completed your exam.";
        document.getElementById("errorMessage").style.display = "block"; // Show error message
        return;
    }

    // Check if roll number and password are valid
    if (students[rollNumber] && students[rollNumber].password === password) {
        const studentName = students[rollNumber].name;
        const formUrl = students[rollNumber].formUrl;

        // Mark the exam as completed after successful login
        markExamCompleted(rollNumber);

        // Play sound and show the welcome page
        loginSuccessSound.play();
        showWelcomePage(studentName, formUrl);
    } else {
        // Display error message for wrong credentials
        document.getElementById("errorMessage").textContent = "Sorry, your credentials are wrong!";
        document.getElementById("errorMessage").style.display = "block"; // Show error message
    }
});

// Function to display the welcome page and start the countdown timer
function showWelcomePage(name, formUrl) {
    document.body.innerHTML = `
        <div style="text-align: center;">
            <h1 style="font-family: 'Montserrat', sans-serif; font-size: 24px;">Welcome, ${name}!</h1>
            <p class="message" style="font-family: 'Montserrat', sans-serif; font-size: 18px;">Your exam will start shortly.</p>
            <p id="timer" style="font-size: 48px; font-weight: bold; margin-top: 10px;">5</p>
            <div class="instructions" style="font-family: 'Montserrat', sans-serif; margin-top: 20px; color: red; font-weight: bold;">
                <p>Please follow these instructions:</p>
                <ul style="text-align: left; display: inline-block;">
                    <li>Do not use the internet to assist you during the exam.</li>
                    <li>Ensure your device has enough battery.</li>
                    <li>Contact your instructor for any questions.</li>
                </ul>
            </div>
        </div>
    `;

    let countdown = 5;
    const timerElement = document.getElementById("timer");

    // Countdown timer
    const timer = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        timerElement.style.transform = 'scale(1.1)'; // Slight scaling animation
        timerElement.style.transition = 'transform 0.3s ease'; // Smooth transition
        if (countdown === 0) {
            clearInterval(timer); // Stop the timer
            showBufferAnimation(formUrl); // Show buffer before redirect
        }
    }, 1000);
}

// Function to display the buffer animation with logo and border
function showBufferAnimation(formUrl) {
    document.body.innerHTML = `
        <div class="spinner-container">
            <div class="spinner-outline"></div>
            <img src="image/logo-quicktech.png" alt="Loading" class="spinner-logo">
        </div>
    `;

    gsap.to('.spinner-logo', {
        duration: 1.5,
        rotation: 360,
        repeat: -1,
        ease: "linear"
    });

    // Redirect after buffer animation (1-3 seconds)
    setTimeout(() => {
        window.location.href = formUrl; // Redirect to the student's Google Form
    }, 2000); // Buffer time of 2 seconds
}
