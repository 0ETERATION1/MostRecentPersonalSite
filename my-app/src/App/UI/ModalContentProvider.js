export default class ModalContentProvider {
  constructor() {
      this.modalContents = {
          aboutMe: {
              title: 'About me',
              description: `
              <h3>I'm Alex Terskin</h3>
              <p>Currently I am a computer science student at the University of Maryland!</p>
              <p>
              Thank you for taking the time to check out my portfolio. 
              I really hope you enjoy exploring it as much as I enjoyed building it. 
              If you have any questions or comments, feel free to connect with me on 
              <a href="https://www.linkedin.com/in/alexanderterskin/" target="_blank">linkedin</a>
              or contact me directly by shooting me an email @ 
              <a href="mailto:terskinlalex@gmail.com" targer="_blank">terskinalex@gmail.com</a>
              </p>
              <h1>Looking for my resume?</h1>
              <p>Download it <a href="/resume/AlexTerskin.pdf" target="_blank">here!</a></p>
              `
          },
          projects: {
              title: 'Projects',
              description: `
              <p>Here are some of my notable projects:</p>
              <ul class="projects-list no-bullets">
                <li><a href="https://www.heisenbergai.us/" target="_blank">Heisenberg.ai</a> AI/ML Powered Drug Treatment Discovery Platform - UMBC Hackathon</li>
                <li><a href="https://www.youtube.com/watch?v=Hqsd523YFlc" target="_blank">Terptune</a> Music Database App - Terptune</li>
                <li><a href="https://github.com/0ETERATION1/Q-Learning-with-Gymnasium" target="_blank">Q-Learning with Gymnasium</a>Trained an Agent to Navigate an Environment Using Q-learning</li>
                <li><a href="https://github.com/0ETERATION1/Image-Classification-with-PyTorch" target="_blank">PyTorch Image Classifier</a>Built an Image Classification Model Using PyTorch on a Custom Dataset</li>
                <li><a href="https://github.com/0ETERATION1/LLM-Text-Generator" target="_blank">LLM Text Generator</a> LLM Summarizer</li>
              </ul>
              `
          },
          contactMe: {
              title: 'Contact Me',
              description: this.getContactMeDescription()
          }
      }
  }

  getContactMeDescription() {
      const mobileContent = `
        <p class='red'>Please Double Tap to Enter Your Info!</p>
        <p class='red'>or Press the Green Button Below if Double Tapping Does not Work</p>

      `;

      const baseDescription = `
          <form action='https://formspree.io/f/xzzpzbaq' method='POST'>
              <input type ='text' name='Name' placeholder='Name' autocomplete='off' required>
              <input type ='email' name='email' placeholder='Email Address' autocomplete='off' required>
              <textarea rows='5' cols='60' name='message' placeholder='Send a Message!' autocomplete='off' required></textarea>
              <button type='submit'>Lock in With Me!</button>
          </form>
      `;

      if (this.isMobileDevice()) {
          return mobileContent + baseDescription;
      }
      return baseDescription;
  }

  isMobileDevice() {
      return /Mobi|Android/i.test(navigator.userAgent);
  }

  getModalInfo(portalName) {
      return this.modalContents[portalName];
  }
}
