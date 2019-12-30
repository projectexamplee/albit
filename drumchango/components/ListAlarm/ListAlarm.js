(async () => {
  const res = await fetch('components/ListAlarm/ListAlarm.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ListAlarm extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const type = this.getAttribute('type');
      const msg = this.getAttribute('msg');
      const isRead = this.getAttribute('isRead');

      this.appendChild(templete);
      this.querySelector('.ic_alarm').setAttribute("src","img/ic/ic_alarm_" + type + ".svg");
      this.querySelector('#msg').innerHTML = msg;
      if(isRead=='no'){
        this.querySelector('.list').className += " black50_bg";
      }
    }
  }

  customElements.define('list-alarm', ListAlarm);

})();
