// Simple object to hold student credentials
const students = {
    "101": {
        password: "pass101",
        name: "John Doe",
        formUrl: "https://forms.gle/sampleForm1"
    },
    "102": {
        password: "pass102",
        name: "Jane Smith",
        formUrl: "https://forms.gle/sampleForm2"
    }
};

// Maintenance Mode Flag
let isUnderMaintenance = false; // Change to true when updating credentials

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    if (isUnderMaintenance) {
        alert("The site is under maintenance. Please check back later.");
        return;
    }

    const rollNumber = document.getElementById("rollNumber").value;
    const password = document.getElementById("password").value;

    // Check if roll number and password are valid
    if (students[rollNumber] && students[rollNumber].password === password) {
        const studentName = students[rollNumber].name;
        const formUrl = students[rollNumber].formUrl;

        // Display welcome message and timer
        showWelcomePage(studentName, formUrl);
    } else {
        // Display error message for wrong credentials
        document.getElementById("errorMessage").textContent = "Sorry, your credentials are wrong!";
    }
});

// Function to display the welcome page and start the countdown timer
function showWelcomePage(name, formUrl) {
    document.body.innerHTML = `
        <div style="text-align: center;">
            <h1>Hello, ${name}!</h1>
            <p class="message">Your exam will start soon.</p>
            <p id="timer">5</p>
        </div>
    `;

    let countdown = 5;
    const timerElement = document.getElementById("timer");

    // Countdown timer
    const timer = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(timer); // Stop the timer
            window.location.href = formUrl; // Redirect to the student's Google Form
        }
    }, 1000);
}
