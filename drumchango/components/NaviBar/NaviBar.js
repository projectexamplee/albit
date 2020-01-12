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
      const isLoged = this.getAttribute('isLoged');
      this.appendChild(templete);
      const slide_menu = this.querySelector('.slide_menu');
     

      if(keyword){
        $("#search_bar_input").attr("value",keyword);
      }
      
      if(isLoged!='no'){
        console.log("login");
        $(".logedout").addClass("hide");
      }
      else if(isLoged=='no'){
        console.log("logout");
        $("slide-menu").attr('isLoged','no');
        $(".loged").addClass("hide");
        $(".logedout").removeClass("hide");
        $("slide-menu").attr("isLoged",isLoged);
      }


      this.querySelector('#menu').addEventListener("click",function(){
        slide_menu.classList.toggle("open");
        $("body").addClass("scroll_disable");
        // this.classList.toggle("opacity_0");
      });
      this.querySelector('#signup').addEventListener("click",function(event){
          event.stopPropagation();
          addModal("signup");
      });
      this.querySelector('#signin').addEventListener("click",function(event){
          event.stopPropagation();
          addModal("signin");
      });

      var search_bar_input = this.querySelector("#search_bar_input");
      // Execute a function when the user releases a key on the keyboard
      search_bar_input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          window.location.href = 'search_results.html';
        }
      });

      

      function addModal(type){
          $("body").append("<div class='modal_bg'></div>");

          if(type=="signup"){
            $(".modal_bg").append("<modal-regular-signup id='" + type + "'></modal-regular-signup>");
            $(".modal_regular").on("click",function(event){
              event.stopPropagation();
            });
          }
          else if(type=="signin"){
            $(".modal_bg").append("<modal-regular-signin id='" + type + "'></modal-regular-signin>");
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

      function addModalBG(){
          $("body").append("<div class='modal_bg'></div>");
      }
      function addModalEventListener(){
        
        
      }
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
