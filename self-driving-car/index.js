"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
class Car {
    constructor(props) {
        //
        this.isRunning = props.isRunning;
        // now can instantiate an instance of Car with an .isRunning arg, and the class Car can access this.isRunning
        // now setting steeringControl
        this.steeringControl = props.steeringControl;
    }
    // respond method
    respond(events) {
        const eventKeys = Object.keys(events).forEach(eventKey => {
            if (!eventKey) {
                return;
            }
            if (eventKey === 'ObstacleLeft') {
                this.steeringControl.turn("right");
            }
            else if (eventKey === 'ObstacleRight') {
                this.steeringControl.turn("left");
            }
        });
        if (this.isRunning === 'false') {
            return console.log("The car is off");
        }
    }
}
class SteeringControl {
    // ***
    // since we applied the Steering type to this SteeringControl class, we must give it both the .execute() and .turn() methods
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    turn(direction) {
        this.execute(`turning to the ${direction}`);
    }
}
const steering = new SteeringControl();
steering.turn("left");
const autonomousCar = new Car({ isRunning: true, steeringControl: steering });
autonomousCar.respond((0, computer_vision_1.getObstacleEvents)());
