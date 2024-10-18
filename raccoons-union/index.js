"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raccoon_meadows_log_1 = require("./raccoon-meadows-log");
const wolf_point_log_1 = require("./wolf-point-log");
function combineVolunteers(volunteers) {
    return volunteers.map((volunteer) => {
        let id = volunteer.id;
        if (typeof id === "string") {
            // transform string into a number
            id = parseInt(id, 10);
        }
        return {
            // spread operator WOULD be useful if we had many more properties
            // ...volunteer,
            id: id,
            name: volunteer.name,
            activities: volunteer.activities,
        };
    });
}
// new function to check if volunteer hours are verified
function isVerified(verified) {
    if (typeof verified === 'string') {
        return verified === 'Yes';
    }
    // under type guard, we know that verified must be of type boolean
    return verified;
}
// declare function for getHours() with parameter of type CombinedActivity
function getHours(activity) {
    if ('hours' in activity) {
        return activity.hours;
    }
    else {
        return activity.time;
    }
}
function calculateHours(volunteers) {
    return volunteers.map((volunteer) => {
        let hours = 0;
        // inside of this forEach method's callback, we need to do two things to get a volunteer's total hours:
        // make sure activity is verified (boolean)
        // if verified, need to add their hours to hours variable
        volunteer.activities.forEach((activity) => {
            if (isVerified(activity.verified)) {
                //
                hours = hours + getHours(activity);
            }
        });
        return {
            id: volunteer.id,
            name: volunteer.name,
            hours: hours,
        };
    });
}
function byHours(a, b) {
    return b.hours - a.hours;
}
const combinedVolunteers = combineVolunteers([].concat(wolf_point_log_1.wolfPointVolunteers, raccoon_meadows_log_1.raccoonMeadowsVolunteers));
const result = calculateHours(combinedVolunteers);
console.log("result", result.sort(byHours));
