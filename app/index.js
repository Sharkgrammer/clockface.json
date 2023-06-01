import * as document from "document";
import * as clock from "./simple/clock";
import * as activity from "./simple/activity";
import * as hrm from "./simple/hrm";

/**
 * Datetime code
 */

//const timeElem  = new FitFont({ id:'timeElem',  font:'Share_Tech_Mono_90',  halign: 'middle'})
//const dateElem  = new FitFont({ id:'dateElem',  font:'Share_Tech_Mono_30',  halign: 'middle'})

const timeElem = document.getElementById("timeElem");
const dateElem = document.getElementById("dateElem");
const timeComma = document.getElementById("timeComma");
const dateComma = document.getElementById("dateComma");
const screen = document.getElementById('screen');
const batteryText = document.getElementById("batteryText");

function clockCallback(data) {
    timeElem.text = `"${data.time}"`;
    //  timeElem.width = (data.time.length + 2) * 10;

    dateElem.text = `"${data.date.toLowerCase()}"`;
    batteryText.text = `"${data.power.battery}%"`;
    // dateElem.width = (data.date.length + 2) * 10;

    // Sigh
    //   dateComma.x = (screen.width * 0.10) + dateElem.width;
    // timeComma.x = (screen.width * 0.16) + timeElem.width;
}

clock.initialize("minutes", "shortDate", clockCallback);

const stepsText = document.getElementById("stepsText");
const distanceText = document.getElementById("distanceText");
const AZMText = document.getElementById("AZMText");
const caloriesText = document.getElementById("caloriesText");
const floorsText = document.getElementById("floorsText");

function activityCallback(data) {
    stepsText.text = `"${data.steps.pretty}"`;
    distanceText.text = `"${data.distance.pretty}"`;
    AZMText.text = `"${data.activeMinutes.pretty}"`;
    caloriesText.text = `"${data.calories.pretty}"`;
    floorsText.text = `"${data.elevationGain.pretty}"`;
}

activity.initialize("seconds", activityCallback);

/**
 * Heart Rate code
 * Gets your current hr.
 */

const heartText = document.getElementById("heartText");

function hrmCallback(data) {
    let hr = data.bpm;
    if (hr === null) hr = "--";
    if (heartText !== null) heartText.text = `"${hr}"`;
}

hrm.initialize(hrmCallback);