(async () => {
  const res = await fetch('components/NaviBar/NaviBar.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class NaviBar extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const keyword = this.getAttribute('keyword');
      this.appendChild(templete);
      const slide_menu = this.querySelector('.slide_menu');

      if(keyword){
        $("#search_bar_input").attr("value",keyword);
      }

      console.log(slide_menu);

      this.querySelector('#menu').addEventListener("click",function(){
        slide_menu.classList.toggle("open");
        this.classList.toggle("opacity_0");
      });

      // const shadowRoot = this.attachShadow({ mode: 'open' });

      // // Clone the template and the cloned node to the shadowDOM's root.
      // const instance = HTMLTemplate.content.cloneNode(true);
      // shadowRoot.appendChild(instance);

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('navi-bar', NaviBar);

})();
