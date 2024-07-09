export default class ModalContentProvider {
    constructor() {
      this.modalContents = {
        aboutMe: {
          title: 'About me',
          description: 
          `<p>Hello, I am a software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. I am experienced in technology and writing code to create systems that are reliable and user-friendly.</p>
                    <p>You can find more about my work on my <a href="https://github.com/yourgithub" target="_blank">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/yourlinkedin" target="_blank">LinkedIn</a>.</p>
                    <p>Download my resume <a href="/resume/AlexTerskin.pdf" target="_blank">here</a>.</p>
          `
        },
        projects: {
          title: 'Projects',
          description: 'me',
        },
        contactMe: {
          title: 'Contact Me',
          description: 'me',
        },
      }
    }
  
    getModalInfo(portalName) {
      return this.modalContents[portalName];
    }
  }
  