import { inputStore } from "../Utils/Store";
import nipplejs from 'nipplejs';

export default class InputController {
    constructor() {
        this.startListening();
        this.inputStore = inputStore;
        this.keyPressed = {};
        this.joystick = null;
        this.joystickEnabled = true;
        this.inputsEnabled = true;
        this.runSound = document.getElementById('runSound'); // Add the run sound element
        this.isMoving = false; // Track if the user is moving
    }

    startListening() {
        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.onKeyUp(event));

        // Prevent default touch events that cause scrolling, except for the start button
        window.addEventListener("touchstart", (event) => this.preventScroll(event), { passive: false });
        window.addEventListener("touchmove", (event) => this.preventScroll(event), { passive: false });
        window.addEventListener("touchend", (event) => this.preventScroll(event), { passive: false });
    }

    preventScroll(event) {
        const startButton = document.querySelector('.start');
        const modal = document.getElementById("myModal");
        if (startButton && !startButton.contains(event.target) && this.joystickEnabled && modal && !modal.contains(event.target)) {
            event.preventDefault();
        }
    }

    onKeyDown(event) {
        if (!this.inputsEnabled) return;
        if (!this.keyPressed[event.code]) {
            switch (event.code) {
                // case "KeyW":
                case "ArrowUp":
                    inputStore.setState({ forward: true });
                    break;
                // case "KeyA":
                case "ArrowLeft":
                    inputStore.setState({ left: true });
                    break;
                // case "KeyS":
                case "ArrowDown":
                    inputStore.setState({ backward: true });
                    break;
                // case "KeyD":
                case "ArrowRight":
                    inputStore.setState({ right: true });
                    break;
            }
            this.keyPressed[event.code] = true;
            this.checkMovementState();
        }
    }

    onKeyUp(event) {
        if (!this.inputsEnabled) return;
        switch (event.code) {
            // case "KeyW":
            case "ArrowUp":
                inputStore.setState({ forward: false });
                break;
            // case "KeyA":
            case "ArrowLeft":
                inputStore.setState({ left: false });
                break;
            // case "KeyS":
            case "ArrowDown":
                inputStore.setState({ backward: false });
                break;
            // case "KeyD":
            case "ArrowRight":
                inputStore.setState({ right: false });
                break;
        }
        this.keyPressed[event.code] = false;
        this.checkMovementState();
    }

    initJoystick() {
        if (!isMobileDevice()) return;

        this.joystick = nipplejs.create({
            zone: document.body,
            mode: 'dynamic',
            color: 'blue',
            size: 100,
        });

        this.joystick.on('move', (evt, data) => {
            if (!this.inputsEnabled) return;
            this.updateInputState(data);
            this.checkMovementState();
        });

        this.joystick.on('end', () => {
            if (!this.inputsEnabled) return;
            inputStore.setState({ forward: false, backward: false, left: false, right: false });
            this.checkMovementState();
        });

        console.log('Joystick initialized');
    }

    destroyJoystick() {
        console.log("IN DESTROY")
        console.log(this.joystick);
        if (this.joystick) {
            this.joystick.destroy();
            this.joystick = null;
            console.log('Joystick destroyed');
        }
    }

    disableJoystick() {
        this.joystickEnabled = false;
        if (this.joystick) {
            this.joystick[0].ui.el.style.display = 'none';
        }
    }

    enableJoystick() {
        this.joystickEnabled = true;
        if (this.joystick) {
            this.joystick[0].ui.el.style.display = 'block';
        }
    }

    disableInputs() {
        this.inputsEnabled = false;
        this.disableJoystick();
    }

    enableInputs() {
        this.inputsEnabled = true;
        this.enableJoystick();
    }

    updateInputState(data) {
        const angle = data.angle.degree;
        const distance = data.distance;
        const threshold = 15; // Adjust this value to change sensitivity
    
        if (distance > threshold) {
            // For Diagonal and straight movements
            if (angle >= 22.5 && angle < 67.5) {
                inputStore.setState({ forward: true, backward: false, left: false, right: true }); // Forward-right
            } else if (angle >= 67.5 && angle < 112.5) {
                inputStore.setState({ forward: true, backward: false, left: false, right: false }); // Forward
            } else if (angle >= 112.5 && angle < 157.5) {
                inputStore.setState({ forward: true, backward: false, left: true, right: false }); // Forward-left
            } else if (angle >= 157.5 && angle < 202.5) {
                inputStore.setState({ forward: false, backward: false, left: true, right: false }); // Left
            } else if (angle >= 202.5 && angle < 247.5) {
                inputStore.setState({ forward: false, backward: true, left: true, right: false }); // Backward-left
            } else if (angle >= 247.5 && angle < 292.5) {
                inputStore.setState({ forward: false, backward: true, left: false, right: false }); // Backward
            } else if (angle >= 292.5 && angle < 337.5) {
                inputStore.setState({ forward: false, backward: true, left: false, right: true }); // Backward-right
            } else {
                inputStore.setState({ forward: false, backward: false, left: false, right: true }); // Right
            }
        } else {
            inputStore.setState({ forward: false, backward: false, left: false, right: false });
        }
    }

    checkMovementState() {
        const state = inputStore.getState();
        const isMoving = state.forward || state.backward || state.left || state.right;

        if (isMoving && !this.isMoving) {
            this.runSound.play().catch(error => console.error('Failed to play run sound:', error));
        } else if (!isMoving && this.isMoving) {
            this.runSound.pause();
            this.runSound.currentTime = 0;
        }

        this.isMoving = isMoving;
    }
}

// this makes it work for mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}