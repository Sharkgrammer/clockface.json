/*
  A simple clock which renders the current time and date in a digital format.
  Callback should be used to update your UI.
*/
import clock from "clock";
import { preferences } from "user-settings";

import { days, monthsShort } from "./locales/en.js";
import * as util from "./utils";
import { battery } from "power";

let dateFormat, clockCallback;

export function initialize(granularity, dateFormatString, callback) {
  dateFormat = dateFormatString;
  clock.granularity = granularity;
  clockCallback = callback;
  clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
  let today = evt.date;
  let dayName = days[today.getDay()];
  let monthNameShort = monthsShort[today.getMonth()];
  let dayNumber = util.zeroPad(today.getDate());

  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());

  let timeString = `${hours}:${mins}`;
  let dateString = `${dayName}, ${dayPostfix(dayNumber)} ${monthNameShort}`;

  // Use the power api to get battery level
  let batNum = Math.floor(battery.chargeLevel);
  let power = {battery: batNum};

  clockCallback({time: timeString, date: dateString, power: power});
}

function dayPostfix(day) {
  let tempDay = Number(day);
  let postFix;

  if (tempDay > 10 && tempDay < 20) {
    postFix = "th";
  } else {
    while (tempDay > 10) {
      tempDay -= 10;
    }

    switch (tempDay) {
      case 1:
        postFix = "st";
        break;
      case 2:
        postFix = "nd";
        break;
      case 3:
        postFix = "rd";
        break;
      default:
        postFix = "th";
        break;
    }
  }

  return `${Number(day)}${postFix}`
}
