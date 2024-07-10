import App from '../App';

export default class ModalManager {
    constructor() {
        this.modal = document.getElementById("myModal");
        this.close = document.getElementsByClassName("close")[0];
        this.close.onclick = () => {
            this.closeModal();
        };
        this.inputController = new App().inputController; // Use the existing inputController instance
    }

    openModal(title, description) {
        document.getElementById("modalTitle").innerHTML = title;
        document.getElementById("modalDescription").innerHTML = description;
        this.modal.style.display = "block";
        this.modal.classList.remove('fadeOut');
        this.modal.classList.add('fadeIn');
        this.inputController.disableJoystick(); // Hide joystick when modal is opened
    }

    closeModal() {
        this.modal.classList.remove('fadeIn');
        this.modal.classList.add('fadeOut');
        setTimeout(() => {
            this.modal.style.display = "none";
            this.inputController.enableJoystick(); // Show joystick when modal is closed
        }, 600);
    }
}
