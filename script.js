$(function () {
  let timeContainer = $('#time-container');
  let currentTime = new Date();
  for (let i = 0; i < 24; i++) {
    let timeStamp = $('<div>');
    let timeStampInfo = $('<div>');
    let task = $('<textarea>');
    let saveButton = $('<button>');
    let saveIcon = $('<i>');

    // set up the time stamp
    timeStamp.attr('id', `hour-${i}`);

    if (i < currentTime.getHours()) {
      timeStamp.addClass('row time-block past');
    } else if (i === currentTime.getHours()) {
      timeStamp.addClass('row time-block present');
    } else {
      timeStamp.addClass('row time-block future');
    }

    // set up time stamp info
    timeStampInfo.addClass('col-2 col-md-1 hour text-center py-3');
    if (i === 0) {
      timeStampInfo.text(`12AM`);
    } else if (i < 12) {
      timeStampInfo.text(`${i}AM`);
    } else if (i === 12) {
      timeStampInfo.text(`12PM`);
    } else {
      timeStampInfo.text(`${i - 12}PM`);
    }

    // set up the task element
    task.addClass('col-8 col-md-10 description');
    task.attr('rows', '3');

    if (i === currentTime.getHours()) {
      task.val('Current Time');
    }

    // set up the save button element
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');

    // set up the save icon
    saveIcon.addClass('fas fa-save');
    saveIcon.attr('aria-hidden', 'true');

    saveButton.append(saveIcon);
    timeStamp.append(timeStampInfo, task, saveButton);
    timeContainer.append(timeStamp);
  }
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
