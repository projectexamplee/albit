(async () => {
  const res = await fetch('components/ListValue2Regular/ListValue2Regular.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ListValue2Regular extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const title = this.getAttribute("title");
      const value1= this.getAttribute("input_value1");
      const value2 = this.getAttribute("input_value2");


      this.appendChild(templete);

      this.querySelector("#title").innerHTML= title;
      this.querySelector("#value1").innerHTML= value1;
      this.querySelector("#value2").innerHTML= value2;
      // const shadowRoot = this.attachShadow({ mode: 'open' });

      // // Clone the template and the cloned node to the shadowDOM's root.
      // const instance = HTMLTemplate.content.cloneNode(true);
      // shadowRoot.appendChild(instance);

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('list-value2-regular', ListValue2Regular);

})();
