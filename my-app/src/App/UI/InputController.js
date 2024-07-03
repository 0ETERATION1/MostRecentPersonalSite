import { inputStore } from "../Utils/Store";

export default class InputController {
  constructor() {
    this.startListening();
    this.inputStore = inputStore;
    this.keyPressed = {};
    this.touchStartX = 0;
    this.touchStartY = 0;
  }

  startListening() {
    window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event));
    window.addEventListener("touchstart", (event) => this.onTouchStart(event));
    window.addEventListener("touchmove", (event) => this.onTouchMove(event));
  }

  onKeyDown(event) {
    if (!this.keyPressed[event.code]) {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          console.log("forward");
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

  onTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchMove(event) {
    if (event.touches.length > 1) return; // Ignore multi-touch

    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let diffX = touchEndX - this.touchStartX;
    let diffY = touchEndY - this.touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        inputStore.setState({ right: true });
        inputStore.setState({ left: false });
      } else {
        inputStore.setState({ left: true });
        inputStore.setState({ right: false });
      }
    } else {
      if (diffY > 0) {
        inputStore.setState({ backward: true });
        inputStore.setState({ forward: false });
      } else {
        inputStore.setState({ forward: true });
        inputStore.setState({ backward: false });
      }
    }

    this.touchStartX = touchEndX;
    this.touchStartY = touchEndY;
  }
}
