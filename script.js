var date = new Date();
var scheduleObj;
var storageItem;
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
];
var suffixes = [
    "st",
    "nd",
    "rd",
    "th"
];

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

var initialLoad = function () {
    if (localStorage.getItem((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear())) {
        storageItem = localStorage.getItem((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear())
        console.log("item found");
        scheduleObj = JSON.parse(storageItem);
    } else {
        scheduleObj = {
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
    }

    for (var i = 0; i < 24; i++) {
        var timeRow = $("<div>").addClass("row");
        var timeHour = $("<div>").addClass("hour col-lg-1");
        var timeBlock = $("<div>").addClass("time-block col-lg-10").attr("data-hour-div", i);
        var blockEvent = $("<textarea>").css({"width": "100%", "border": "none"}).attr('data-hour', i);
        var saveBtn = $("<button>").addClass("saveBtn col-lg-1").attr({"data-save": i, "title": "Save"});
        if (i < date.getHours()) {
            timeBlock.addClass("past");
        } else if (i == date.getHours()) {
            timeBlock.addClass("present");
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

        if (scheduleObj["hour" + i]) {
            blockEvent.text(scheduleObj["hour" + i]);
        } else {
            blockEvent.text("");
        }

        saveBtn.text("💾")

        timeHour.append(hourText);
        timeBlock.append(blockEvent);
        timeRow.append(timeHour, timeBlock, saveBtn);
        timeContainer.append(timeRow);
    }

    $(".saveBtn").on("click", function () {
        scheduleObj["hour" + $(this).data("save")] = $('[data-hour~=' + $(this).data("save") + ']').val();
        localStorage.setItem(scheduleObj["month"] + "/" + scheduleObj["date"] + "/" + scheduleObj["year"], JSON.stringify(scheduleObj));
    })

    // $(".time-block").on("click", "textarea", function () {
    //     $(this).trigger("focus");
    // })

    // $(".time-block").on("blur", "textarea", function () {
    //     scheduleObj["hour" + $(this).data("hour")] = $(this).val().trim();
    //     saveToStorage(scheduleObj["month"], scheduleObj["date"], scheduleObj["year"]);
    // })
}

var loadTimes = function () {
    var loadedDate = $("#datepicker").val();
    loadedDate = loadedDate.split("/");
    for (var i in loadedDate) {
        loadedDate[i] = loadedDate[i].replace(/^0+/, '')
    }
    
    if (localStorage.getItem(loadedDate.join("/"))) {
        clearObject(scheduleObj);
        storageItem = localStorage.getItem(loadedDate.join("/"))
        console.log("item found");
        scheduleObj = JSON.parse(storageItem);
    } else {
        clearObject(scheduleObj);
        scheduleObj["month"] = loadedDate[0];
        scheduleObj["date"] = loadedDate[1];
        scheduleObj["year"] = loadedDate[2];
    }
    console.log(scheduleObj);
    updateTimes(scheduleObj);
}

var updateTimes = function (obj) {
    for (var i = 0; i < 24; i++) {
        var timeBlock = $('[data-hour-div~=' + i + ']');
        var timeBlockText = $('[data-hour~=' + i + ']');
        var text = obj["hour" + i];
        console.log(text);

        timeBlock.removeClass("past present future");

        if (obj.year > date.getFullYear()) {
            timeBlock.addClass("future");
        } else if (obj.year == date.getFullYear()) {
            if (obj.month > (date.getMonth() + 1)) {
                timeBlock.addClass("future");
            } else if (obj.month == (date.getMonth() + 1)) {
                if (obj.date > date.getDate()) {
                    timeBlock.addClass("future");
                } else if (obj.date == date.getDate()) {
                    if (i > date.getHours()) {
                        timeBlock.addClass("future");
                    } else if (i == date.getHours()) {
                        timeBlock.addClass("present");
                    } else {
                        timeBlock.addClass("past");
                    }
                } else {
                    timeBlock.addClass("past");
                }
            } else {
                timeBlock.addClass("past");
            }
        } else {
            timeBlock.addClass("past");
        }

        if (obj["hour" + i]) {
            timeBlockText.val(obj["hour" + i]);
        } else {
            timeBlockText.val("");
        }
    }
}

var clearObject = function (obj) {
    for (const key in obj) {
        delete obj[key];
      }
      console.log(obj);
}

$(".load-btn").on("click", function() {
    loadTimes();
})

$(function() {
    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true
    });
});

initialLoad();
displayTime();