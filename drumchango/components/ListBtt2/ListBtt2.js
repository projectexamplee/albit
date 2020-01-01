(async () => {
  const res = await fetch('components/ListBtt2/ListBtt2.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ListBtt2 extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const title = this.getAttribute("title");
      const placeholder = this.getAttribute("placeholder");
      const button1 = this.getAttribute("button1");
      const img1 = this.getAttribute("img1");
      const button2 = this.getAttribute("button2");
      const img2 = this.getAttribute("img2");

      this.appendChild(templete);
      this.querySelector("#img1").setAttribute("src",img1);
      this.querySelector("#img2").setAttribute("src",img2);
      this.querySelector("#title").innerHTML= title;
      this.querySelector("#button1").innerHTML= button1;
      
      this.querySelector("#button2").innerHTML= button2;
      

      // // Clone the template and the cloned node to the shadowDOM's root.
      // const instance = HTMLTemplate.content.cloneNode(true);
      // shadowRoot.appendChild(instance);

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('list-btt2', ListBtt2);

})();
