(async () => {
  const res = await fetch('components/ModalRegularAddbrand/ModalRegularAddbrand.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ModalRegularAddbrand extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      this.appendChild(templete);

      $("#id_cancel").on("click",function(){
          $(".modal_bg").remove();
        });
      $("#id_confirm").on("click",function(){
          $(".modal_bg").remove();
        });
    }
  }

  customElements.define('modal-regular-addbrand', ModalRegularAddbrand);
})();
