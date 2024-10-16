import courses from "./courses";
import studyGroups from "./studyGroups";

type Course = {
  id: number;
  studyGroupId: number;
  title: string;
  keywords: string[];
  eventType: string;
};

type StudyGroup = {
  id: number;
  courseId: number;
  title: string;
  keywords: string[];
  eventType: string;
};

type SearchEventsOptions = {
  query: number | string;
  eventType: "courses" | "groups";
};

function searchEvents(options: SearchEventsOptions) {
  // let events : (Course | StudyGroup)[];
  // typescript infers return type correctly 
  const events: (Course | StudyGroup)[] =
    options.eventType === "courses" ? courses : studyGroups;
  // if (options.eventType === 'courses') {
  //   events = courses;
  // } else if (options.eventType === 'groups') {
  //   events = studyGroups;
  // }
  // const events = options.eventType === 'courses ? courses : studyGroups;
  // find the courses or study groups that match the .query property from options
  return events.filter((event: Course | StudyGroup) => {
    if (typeof options.query === "number") {
      return options.query === event.id;
    }
    if (typeof options.query === "string") {
      return event.keywords.includes(options.query);
    }
  });
}

let searchResults = searchEvents({ query: 'art', eventType: 'courses' })
console.log(searchResults)

let enrolledEvents : (Course | StudyGroup)[] = []

function enroll (event: Course | StudyGroup) {
  enrolledEvents.push(event)
}

enroll(searchResults[0])

console.log(enrolledEvents)