import * as document from "document";
import * as clock from "./simple/clock";
import * as activity from "./simple/activity";
import * as hrm from "./simple/hrm";

const TPaneText = document.getElementById("TPaneText");
TPaneText.text = "clockface.json";

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

    if (showSoloTime) {
        handleSTime(`"${data.time}"`, `"${data.date.toLowerCase()}"`, `"${data.power.battery}%"`)
    } else {
        timeElem.text = `"${data.time}"`;
        dateElem.text = `"${data.date.toLowerCase()}"`;
        batteryElem.text = `"${data.power.battery}%"`;

        dateComma.x = dateText.getBBox().width + dateElem.getBBox().width + 10;
        timeComma.x = timeText.getBBox().width + timeElem.getBBox().width + 10;
    }
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

const screen = document.getElementById("screen");
const clickable = document.getElementById("clickable");

let showSoloTime = false;

clickable.addEventListener("click", (evt) => {
    if (showSoloTime) {
        screen.animate("disable");
        TPaneText.text = "clockface.json";

    } else {
        screen.animate("enable");
        TPaneText.text = "clockonly.json";

        handleSTime(timeElem.text, dateElem.text, batteryElem.text)
    }

    showSoloTime = !showSoloTime;
});

const sTimeSplit1 = document.getElementById("sTimeSplit1");
const sTime1Comma = document.getElementById("sTime1Comma");
const sTime1Text = document.getElementById("sTime1Text");

const sTimeSplit2 = document.getElementById("sTimeSplit2");
const sTime2Comma = document.getElementById("sTime2Comma");
const sTime2Text = document.getElementById("sTime2Text");

const sTimeDate = document.getElementById("sTimeDate");
const sTimeDateComma = document.getElementById("sTimeDateComma");
const sTimeDateText = document.getElementById("sTimeDateText");

const sTimeBattery = document.getElementById("sTimeBattery");

function handleSTime(time, date, batt) {
    // Its easier apparently to remove each end of the strings
    // rather than try and replace the " with nothing.
    let sTime = time.slice(1, -1).split(":");

    // Set Time/Date/Battery
    sTimeSplit1.text = `"${sTime[0]}"`;
    sTimeSplit2.text = `"${sTime[1]}"`;
    sTimeDate.text = '"' + date.split(",")[1].slice(1);
    sTimeBattery.text = batt;

    // Set Commas X pos
    sTime1Comma.x = sTime1Text.getBBox().width + sTimeSplit1.getBBox().width + 12;
    sTime2Comma.x = sTime2Text.getBBox().width + sTimeSplit2.getBBox().width + 12;
    sTimeDateComma.x = sTimeDateText.getBBox().width + sTimeDate.getBBox().width + 12;
}








