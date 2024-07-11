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
        if (!startButton.contains(event.target) && this.joystickEnabled && !modal.contains(event.target)) {
            event.preventDefault();
        }
    }

    onKeyDown(event) {
        if (!this.inputsEnabled) return;
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
            this.checkMovementState();
        }
    }

    onKeyUp(event) {
        if (!this.inputsEnabled) return;
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
        this.checkMovementState();
    }

    initJoystick() {
        if (!isMobileDevice()) return;

        this.joystick = nipplejs.create({
            zone: document.body,
            mode: 'static',
            position: { left: '20%', bottom: '20%' },
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

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
