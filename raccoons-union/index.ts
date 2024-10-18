import {
  RaccoonMeadowsVolunteers,
  RaccoonMeadowsActivity,
  raccoonMeadowsVolunteers,
} from "./raccoon-meadows-log";

import {
  WolfPointVolunteers,
  WolfPointActivity,
  wolfPointVolunteers,
} from "./wolf-point-log";

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

// this type is a union type of RaccoonMeadowsActivty and WolfPointActivity.
// this is what we want our combined volunteer data to look like once we combine our volunteers into a single list
// creating types first ==> clear idea of what changes we need to make
type Volunteers = {
  id: number;
  name: string;
  activities: CombinedActivity[];
};

function combineVolunteers(
  volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
) {
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
function isVerified(verified: boolean | string) {
  if (typeof verified === 'string') {
    return verified === 'Yes'
  }
  // under type guard, we know that verified must be of type boolean
  return verified;
}

// declare function for getHours() with parameter of type CombinedActivity
function getHours(activity: CombinedActivity) {
  if ('hours' in activity) {
    return activity.hours;
  } else {
    return activity.time;
  }
}

function calculateHours(volunteers: Volunteers[]) {
  return volunteers.map((volunteer) => {
    let hours = 0;

    // inside of this forEach method's callback, we need to do two things to get a volunteer's total hours:
    // make sure activity is verified (boolean)
    // if verified, need to add their hours to hours variable
    volunteer.activities.forEach((activity) => {
      if (isVerified(activity.verified)) {
        //
        hours = hours + getHours(activity)
      }
    });
      
    return {
      id: volunteer.id,
      name: volunteer.name,
      hours: hours,
    };
  });
}

function byHours(a,b) {
  return b.hours - a.hours;
}

const combinedVolunteers = combineVolunteers(
  [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);

const result = calculateHours(combinedVolunteers)
console.log("result", result.sort(byHours))