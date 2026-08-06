console.log("DevTrack Loaded");

const greetingElement = document.getElementById("greeting");

const today = new Date();
const currentHour = today.getHours();
const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}
const formattedDate = today.toLocaleDateString('en-GB', options);

document.getElementById('date-display').textContent = formattedDate;


if (currentHour < 11) {
    greetingElement.textContent = "Good morning";
} else if (currentHour < 16) {
    greetingElement.textContent = "Good afternoon";
} else {
    greetingElement.textContent = "Good evening";
}
