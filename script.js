
const students = {
    "30920": { password: "8th", name: "Shivam", formUrl: "https://www.youtube.com/" },
    "622829": { password: "728919", name: "Aayushr", formUrl: "" },
    "205592": { password: "9A", name: "Ashutosh Sir", formUrl: "https://v0-thank-you-page-wsxxnpzuujw-ni5xqca0p-quicktech89s-projects.vercel.app/" },
  
};


const loginSuccessSound = new Audio('login-sucesssoundeffect.mp3');
loginSuccessSound.volume = 0.85; 

const transitionSound = new Audio('transition-sound.mp3');
transitionSound.volume = 0.85; 


document.addEventListener('DOMContentLoaded', () => {
    transitionSound.play(); 
});


function setLoginStatus(rollNumber, status) {
    localStorage.setItem(`loggedIn_${rollNumber}`, status);
}


function getLoginStatus(rollNumber) {
    return localStorage.getItem(`loggedIn_${rollNumber}`) === 'true';
}


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const rollNumber = document.getElementById("rollNumber").value;
    const password = document.getElementById("password").value;

    
    if (students[rollNumber] && students[rollNumber].password === password) {
       
        if (getLoginStatus(rollNumber)) {
            document.getElementById("errorMessage").textContent = "You have already completed your exam.";
            document.getElementById("errorMessage").style.display = 'block'; 
        } else {
            const studentName = students[rollNumber].name;
            const formUrl = students[rollNumber].formUrl;
            setLoginStatus(rollNumber, true); 
            loginSuccessSound.play(); 
            transitionToTimerPage(studentName, formUrl); 
        }
    } else {
        document.getElementById("errorMessage").textContent = "Sorry, your credentials are incorrect.";
        document.getElementById("errorMessage").style.display = 'block'; 
    }
});


function transitionToTimerPage(name, formUrl) {
    gsap.to('.login-container', {opacity: 0, y: -50, duration: 1, ease: "power2.inOut", onComplete: showWelcomePage.bind(null, name, formUrl)});
}


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

  
    gsap.from('#welcomeText', { opacity: 0, y: -20, duration: 1.5, ease: "power2.out" }); 
    gsap.from('#timer', { opacity: 0, scale: 0.5, duration: 1, delay: 0.5, ease: "bounce.out" }); 

    let countdown = 5;
    const timerElement = document.getElementById("timer");

    const timer = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        gsap.to(timerElement, {scale: 1.1, duration: 0.3, ease: "power2.inOut"});
        if (countdown === 0) {
            clearInterval(timer);
          
            window.location.href = formUrl;
        }
    }, 1000);
}
