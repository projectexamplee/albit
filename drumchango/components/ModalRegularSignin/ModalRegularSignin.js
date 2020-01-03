(async () => {
  const res = await fetch('components/ModalRegularSignin/ModalRegularSignin.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ModalRegularSignin extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      this.appendChild(templete);
      const login = this.querySelector('#login');
      const login_social = this.querySelector('#login_social');
      const find_pw = this.querySelector('#find_pw');

      this.querySelector('#btt_find').addEventListener("click",function(){
        login.classList.add("hide");
        login_social.classList.add("hide");
        find_pw.classList.remove("hide");
      });

      this.querySelector('#go_signup').addEventListener("click",function(event){
        console.log("go singup");
        event.stopPropagation();
        $(".modal_bg").remove();
        addModal("signup")
      });


      function addModal(type){
        console.log("add Modal" + type)
        $("body").append("<div class='modal_bg'></div>");

        if(type=="signup"){
          $(".modal_bg").append("<modal-regular-signup></modal-regular-signup>");
          $(".modal_regular").on("click",function(event){
            event.stopPropagation();
          });
        }
        else if(type=="signin"){
          $(".modal_bg").append("<modal-regular-signin></modal-regular-signin>");
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
    }
  }

  customElements.define('modal-regular-signin', ModalRegularSignin);
})();
