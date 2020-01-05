(async () => {
  const res = await fetch('components/ListHorizonBrand/ListHorizonBrand.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ListHorizonBrand extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      this.appendChild(templete);
      const type = this.getAttribute("type");

      if(type!='my'){
        this.querySelector("#btt_add_brand").classList.add("hide");
      }

      this.querySelector('#btt_add_brand').addEventListener("click",function(event){
          event.stopPropagation();
          addModal("add_brand");
      });

      

      function addModal(type){
          $("body").append("<div class='modal_bg'></div>");

          if(type=="add_brand"){
            $(".modal_bg").append("<modal-regular-addbrand id='" + type + "'></modal-regular-addbrand>");
            $(".modal_regular").on("click",function(event){
              event.stopPropagation();
            });
          }

          $("body").on("click",function(){
            $(".modal_bg").remove();
          });
          $(".ic_close").on("click",function(){
            $(".modal_bg").remove();
          });

      }
      // const shadowRoot = this.attachShadow({ mode: 'open' });

      // // Clone the template and the cloned node to the shadowDOM's root.
      // const instance = HTMLTemplate.content.cloneNode(true);
      // shadowRoot.appendChild(instance);

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('list-horizon-brand', ListHorizonBrand);

})();
