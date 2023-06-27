const formatAmPm = (d) => {
  var hh = d.getHours();
  var m = d.getMinutes();
  //var s = d.getSeconds();
  var dd = 'AM';
  var h = hh;
  if (h >= 12) {
    h = hh - 12;
    dd = 'PM';
  }
  if (h === 0) {
    h = 12;
  }
  m = m < 10 ? '0' + m : m;

  //s = s<10?"0"+s:s;

  h = h < 10 ? '0' + h : h;

  return h + ':' + m + ' ' + dd;
};

const getMonth = (d) => {
  var month = [];
  month[0] = 'Jan';
  month[1] = 'Feb';
  month[2] = 'Mar';
  month[3] = 'Apr';
  month[4] = 'May';
  month[5] = 'Jun';
  month[6] = 'Jul';
  month[7] = 'Aug';
  month[8] = 'Sep';
  month[9] = 'Oct';
  month[10] = 'Nov';
  month[11] = 'Dec';
  return month[d.getMonth()];
};

const formatDateTime = (d) => {
  var time = formatAmPm(d);
  var date = d.getDate();
  var month = getMonth(d);
  var year = d.getFullYear();

  return date + ' ' + month + ' ' + year + ', ' + time;
};

const formatDate = (d) => {
  var date = d.getDate();
  var month = getMonth(d);

  return date + ' ' + month + ' ';
};

const minutesFromMilliseconds = (milliseconds) => {
  if (milliseconds < 0) {
    return -Math.round(Math.abs(milliseconds) / (1000 * 60));
  }
  return Math.round(milliseconds / (1000 * 60));
};

const hourMinutesFromMilliseconds = (milliseconds) => {
  if (milliseconds < 0) {
    return -Math.round(Math.abs(milliseconds) / (1000 * 60));
  }
  var minutes = Math.round(milliseconds / (1000 * 60));
  var hours = parseInt(minutes / 60);
  var minutesLeft = parseInt(minutes % 60);
  if (hours > 0) {
    var timeString = hours + 'hr ' + minutesLeft + 'min';
  } else {
    timeString = minutesLeft + 'min';
  }

  return timeString;
};

const formatETA = (dateObj) => {
  var hours = dateObj.getHours();
  var minutes = dateObj.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;

  var today = new Date().getDate();
  var slotDate = dateObj.getDate();
  // Since only tomorrow is possible here, finer distinguishing is not needed at the moment
  if (slotDate !== today) {
    return strTime + ' (tomorrow)';
  } else {
    return strTime;
  }
};

const formatTimeStringToMillisec = (val) => {
  let time = val.split(':');

  let hrs = time[0] * 3600 * 1000;
  let min = time[1] * 60 * 1000;

  return hrs + min;
};

const formatDay = (dateObj) => {
  let currentDay = new Date().getDate();
  let dateObjDate = dateObj.getDate();
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (currentDay === dateObjDate) {
    return 'Today';
  } else if (currentDay + 1 === dateObjDate) {
    return 'Tomorrow';
  } else {
    var day = days[dateObj.getDay()];
    return day;
  }
};

const DateTimeUtil = {
  formatAmPm: formatAmPm,
  formatDateTime: formatDateTime,
  formatDate,
  minutesFromMilliseconds: minutesFromMilliseconds,
  formatETA: formatETA,
  formatTimeStringToMillisec: formatTimeStringToMillisec,
  hourMinutesFromMilliseconds: hourMinutesFromMilliseconds,
  formatDay: formatDay,
};

export default DateTimeUtil;
