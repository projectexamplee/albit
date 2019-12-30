(async () => {
  const res = await fetch('components/ListMsgBubble/ListMsgBubble.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ListMsgBubble extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const imgSrc = this.getAttribute('imgSrc');
      const msg = this.getAttribute('msg');
      const isRead = this.getAttribute('isRead');

      this.appendChild(templete);
      this.querySelector('.profile_s').style.backgroundImage =  "url(" + imgSrc + ")";
      this.querySelector('#msg').innerHTML = msg;
      if(isRead=='no'){
        this.querySelector('.list').className += " black50_bg";
      }
    }
  }

  customElements.define('list-msg-bubble', ListMsgBubble);

})();
