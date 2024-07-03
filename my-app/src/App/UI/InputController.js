import { inputStore } from "../Utils/Store";
import nipplejs from 'nipplejs';

export default class InputController {
    constructor() {
        this.startListening();
        this.inputStore = inputStore;
        this.keyPressed = {};
        this.joystick = null; // Initialize joystick as null
        this.lastMoveEvent = 0; // Timestamp for throttling
    }

    startListening() {
        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        if (!this.keyPressed[event.code]) {
            switch (event.code) {
                case "KeyW":
                case "ArrowUp":
                    inputStore.setState({ forward: true });
                    break;
                case "KeyA":
                case "ArrowLeft":
                    inputStore.setState({ left: true });
                    break;
                case "KeyS":
                case "ArrowDown":
                    inputStore.setState({ backward: true });
                    break;
                case "KeyD":
                case "ArrowRight":
                    inputStore.setState({ right: true });
                    break;
            }
            this.keyPressed[event.code] = true;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case "KeyW":
            case "ArrowUp":
                inputStore.setState({ forward: false });
                break;
            case "KeyA":
            case "ArrowLeft":
                inputStore.setState({ left: false });
                break;
            case "KeyS":
            case "ArrowDown":
                inputStore.setState({ backward: false });
                break;
            case "KeyD":
            case "ArrowRight":
                inputStore.setState({ right: false });
                break;
        }
        this.keyPressed[event.code] = false;
    }

    initJoystick() {
        if (!isMobileDevice()) return; // Only initialize joystick on mobile devices

        this.joystick = nipplejs.create({
            zone: document.body,
            mode: 'static',
            position: { left: '20%', bottom: '20%' }, // Fixed position
            color: 'blue',
            size: 100,
        });

        this.joystick.on('move', (evt, data) => {
            const currentTime = Date.now();
            if (currentTime - this.lastMoveEvent > 25) { // Throttle event processing to every 25ms
                this.lastMoveEvent = currentTime;
                this.updateInputState(data);
            }
        });

        this.joystick.on('end', () => {
            inputStore.setState({ forward: false, backward: false, left: false, right: false });
        });
    }

    updateInputState(data) {
        const angle = data.angle.degree;
        if (angle >= 45 && angle < 135) {
            inputStore.setState({ forward: true, backward: false });
        } else if (angle >= 135 && angle < 225) {
            inputStore.setState({ left: true, right: false });
        } else if (angle >= 225 && angle < 315) {
            inputStore.setState({ backward: true, forward: false });
        } else {
            inputStore.setState({ right: true, left: false });
        }
    }
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
