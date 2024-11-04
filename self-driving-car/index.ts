import { getObstacleEvents } from './computer-vision';

// typing for the props argument
interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering;
}

class Car implements AutonomousCar {
  // 
  isRunning;
  // need to declare a variable within the Car class that will hold our steeringControl value and attach it to "this"
  steeringControl;
  constructor(props: AutonomousCarProps) {
    //
    this.isRunning = props.isRunning;
    // now can instantiate an instance of Car with an .isRunning arg, and the class Car can access this.isRunning
    // now setting steeringControl
    this.steeringControl = props.steeringControl;
  }
  // respond method
  respond(events: Events) {
    const eventKeys = Object.keys(events).forEach(eventKey => {
      if (!eventKey) {
        return
      } 
      if (eventKey === 'ObstacleLeft') {
        this.steeringControl.turn("right")
      } else if (eventKey === 'ObstacleRight') {
        this.steeringControl.turn("left")
      }
    });

    if (this.isRunning === 'false') {
      return console.log("The car is off")
    }
  }
}

interface AutonomousCar {
  isRunning?: boolean;
  respond: (events: Events) => void; // function returning void // type member with a function value
}

interface Events {
  [event: string]: boolean;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

class SteeringControl implements Steering {
  // ***
  // since we applied the Steering type to this SteeringControl class, we must give it both the .execute() and .turn() methods
  execute(command: string) {
    console.log(`Executing: ${command}`)
  }
  turn(direction: string) {
    this.execute(`turning to the ${direction}`)
  }
}

const steering = new SteeringControl()
steering.turn("left")

const autonomousCar = new Car({isRunning: true, steeringControl: steering})

autonomousCar.respond(getObstacleEvents())