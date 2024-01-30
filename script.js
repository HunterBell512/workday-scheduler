$(function () {
  // render the current time
  const currentTime = dayjs();
  let header = $('#currentDay');
  header.text(currentTime.format('dddd, MMMM D YYYY, h:mm:ss a'));
  header.addClass('lead');
  Clock();

  let taskData = {};
  let timeContainer = $('#time-container');

  // local storage declaration
  if (localStorage.getItem('tasks')) {
    taskData = JSON.parse(localStorage.getItem('tasks'));
  }

  for (let i = 0; i < 24; i++) {
    let timeStamp = $('<div>');
    let timeStampInfo = $('<div>');
    let task = $('<textarea>');
    let saveButton = $('<button>');
    let saveIcon = $('<i>');

    // set up the time stamp
    timeStamp.attr('id', `hour-${i}`);

    if (i < currentTime.hour()) {
      timeStamp.addClass('row time-block past');
    } else if (i === currentTime.hour()) {
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
    
    if (`hour-${i}` in taskData) {
      task.val(taskData[`hour-${i}`]);
    } else if (i === currentTime.hour()) {
      task.val('Current Time');
    }

    // set up the save button element
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
    saveButton.attr('data-number', i);

    // set up the save icon
    saveIcon.addClass('fas fa-save');
    saveIcon.attr('aria-hidden', 'true');
    saveIcon.attr('data-number', i);

    saveButton.append(saveIcon);
    timeStamp.append(timeStampInfo, task, saveButton);
    timeContainer.append(timeStamp);
  }

  function Clock () {
    setInterval(() => {
      let time = dayjs();
      let header = $('#currentDay');

      header.text(time.format('dddd, MMMM D YYYY, h:mm:ss a'));
      header.addClass('lead');
    }, 1000)
  }

  function SaveToStorage (taskKey, taskVal) {
    taskData[taskKey] = taskVal;
    localStorage.setItem('tasks', JSON.stringify(taskData));
  }

  function ClearStorage () {
    localStorage.removeItem('tasks');
    location.reload();
  }

  $('.saveBtn').on('click', (event) => {
    const target = $(event.target);
    SaveToStorage(`hour-${target.attr('data-number')}`,
                      $(`#hour-${target.attr('data-number')}`).find('textarea').val());
  });

  $('#clearBtn').on('click', ClearStorage);
});
