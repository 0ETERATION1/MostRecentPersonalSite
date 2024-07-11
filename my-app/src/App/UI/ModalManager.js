import App from "../App";

export default class ModalManager {
    constructor() {
        this.modal = document.getElementById("myModal");
        this.close = document.getElementsByClassName("close")[0];
        this.inputController = new App().inputController; // Access existing input controller

        this.close.onclick = () => {
            this.closeModal();
        };
    }

    openModal(title, description) {
        document.getElementById("modalTitle").innerHTML = title;
        document.getElementById("modalDescription").innerHTML = description;
        this.modal.style.display = "block";
        this.modal.classList.remove('fadeOut');
        this.modal.classList.add('fadeIn');
        this.inputController.disableInputs(); // Disable inputs when modal opens
    }

    closeModal() {
        this.modal.classList.remove('fadeIn');
        this.modal.classList.add('fadeOut');
        setTimeout(() => {
            this.modal.style.display = "none";
            //this.inputController.enableInputs(); // Enable inputs when modal closes
        }, 600);
    }
}
