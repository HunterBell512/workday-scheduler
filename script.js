var date = new Date();
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
var suffixes = [
    "st",
    "nd",
    "rd",
    "th"
]

var dateEl = $("#currentDay");

// this function displays the time at the top of the page
function displayTime () {
    var tag;
    if (date.getDate() < 2) {
        tag = suffixes[date.getDate()];
    } else if (date.getDate() >= 2) {
        tag = suffixes[3];
    }
    dateEl.text("Today is: " + months[date.getMonth()] + " " + date.getDate() + tag + ", " + date.getFullYear());
}

displayTime();