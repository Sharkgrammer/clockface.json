import * as document from "document";
import * as clock from "./simple/clock";
import {FitFont} from "fitfont";

/**
 * Datetime code
 */

//const timeElem  = new FitFont({ id:'timeElem',  font:'Share_Tech_Mono_90',  halign: 'middle'})
//const dateElem  = new FitFont({ id:'dateElem',  font:'Share_Tech_Mono_30',  halign: 'middle'})

const timeElem = document.getElementById("timeElem");
const dateElem = document.getElementById("dateElem");
function clockCallback(data) {
    timeElem.text = data.time;
    dateElem.text = data.date;
}

clock.initialize("seconds", "shortDate", clockCallback);

function convertToKS(today) {
    const midnight = new Date(today);
    let msSinceMidnight = today - midnight.setHours(0, 0, 0, 0);

    return (msSinceMidnight / 1000000).toFixed(3) + "ks";
}