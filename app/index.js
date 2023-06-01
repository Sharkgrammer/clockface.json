import * as document from "document";
import * as clock from "./simple/clock";
import * as activity from "./simple/activity";
import * as hrm from "./simple/hrm";

/**
 * Datetime code
 */
const timeElem = document.getElementById("timeElem");
const timeComma = document.getElementById("timeComma");
const timeText = document.getElementById("timeText");

const dateElem = document.getElementById("dateElem");
const dateComma = document.getElementById("dateComma");
const dateText = document.getElementById("dateText");

const batteryElem = document.getElementById("batteryElem");

function clockCallback(data) {
    timeElem.text = `"${data.time}"`;
    dateElem.text = `"${data.date.toLowerCase()}"`;
    batteryElem.text = `"${data.power.battery}%"`;

    dateComma.x = dateText.getBBox().width + dateElem.getBBox().width + 10;
    timeComma.x = timeText.getBBox().width + timeElem.getBBox().width + 10;
}

clock.initialize("minutes", "shortDate", clockCallback);

const stepsElem = document.getElementById("stepsElem");
const stepsComma = document.getElementById("stepsComma");
const stepsText = document.getElementById("stepsText");

const distanceElem = document.getElementById("distanceElem");
const distanceComma = document.getElementById("distanceComma");
const distanceText = document.getElementById("distanceText");

const AZMElem = document.getElementById("AZMElem");
const AZMComma = document.getElementById("AZMComma");
const AZMText = document.getElementById("AZMText");

const floorsElem = document.getElementById("floorsElem");
const floorsComma = document.getElementById("floorsComma");
const floorsText = document.getElementById("floorsText");

const caloriesElem = document.getElementById("caloriesElem");

function activityCallback(data) {
    stepsElem.text = `"${data.steps.pretty}"`;
    stepsComma.x = stepsText.getBBox().width + stepsElem.getBBox().width + 10;

    distanceElem.text = `"${data.distance.pretty}"`;
    distanceComma.x = distanceText.getBBox().width + distanceElem.getBBox().width + 10;

    AZMElem.text = `"${data.activeMinutes.pretty}"`;
    AZMComma.x = AZMText.getBBox().width + AZMElem.getBBox().width + 10;

    floorsElem.text = `"${data.elevationGain.pretty}"`;
    floorsComma.x = floorsText.getBBox().width + floorsElem.getBBox().width + 10;

    caloriesElem.text = `"${data.calories.pretty}"`;
}

activity.initialize("seconds", activityCallback);

/**
 * Heart Rate code
 * Gets your current hr.
 */

const heartElem = document.getElementById("heartElem");
const heartComma = document.getElementById("heartComma");
const heartText = document.getElementById("heartText");
function hrmCallback(data) {
    let hr = data.bpm;
    if (hr === null) hr = "--";
    if (heartElem !== null) heartElem.text = `"${hr}"`;

    heartComma.x = heartText.getBBox().width + heartElem.getBBox().width + 10;
}

hrm.initialize(hrmCallback);