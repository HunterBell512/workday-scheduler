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
var timeContainer = $("#time-container");

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

var createTimeBlocks = function () {
    for (var i = 0; i < 24; i++) {
        var timeRow = $("<div>").addClass("row");
        var timeHour = $("<div>").addClass("hour col-lg-1");
        var timeBlock = $("<div>").addClass("time-block col-lg-9");
        var blockEvent = $("<textarea>").css({"width": "100%", "border": "none"});
        var saveBtn = $("<button>").addClass("saveBtn col-lg-1");
        if (i < date.getHours()) {
            timeBlock.addClass("past");
        } else if (i == date.getHours()) {
            timeBlock.addClass("present");
            blockEvent.val("Current Time");
        } else {
            timeBlock.addClass("future");
        }
        var hourText = $("<p>");

        if (i == 0) {
            hourText.text("12AM");
        } else if (i < 12) {
            hourText.text(i + "AM");
        } else if (i == 12) {
            hourText.text(i + "PM");
        } else {
            hourText.text((i - 12) + "PM");
        }

        timeHour.append(hourText);
        timeBlock.append(blockEvent);
        timeRow.append(timeHour, timeBlock, saveBtn);
        timeContainer.append(timeRow);
    }

}

$(function() {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true
    });
  });

displayTime();
createTimeBlocks();