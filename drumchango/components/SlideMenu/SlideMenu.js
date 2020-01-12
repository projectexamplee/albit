(async () => {
  const res = await fetch('components/SlideMenu/SlideMenu.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class SlideMenu extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const isLoged = this.getAttribute('isLoged');
      this.appendChild(templete);

      console.log(isLoged);
      if(isLoged=='no'){
        $("#slide_loged").addClass("hide");
        $("#slide_logedout").removeClass("hide");
        $("#signout").addClass("hide");
      }
      else{
        $("#slide_loged").removeClass("hide");
        $("#slide_logedout").addClass("hide");
        $("#signout").removeClass("hide");
      }

      this.querySelector('#signup').addEventListener("click",function(event){
          event.stopPropagation();
          addModal("signup");
      });
      this.querySelector('#signin').addEventListener("click",function(event){
          event.stopPropagation();
          addModal("signin");
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

      // const shadowRoot = this.attachShadow({ mode: 'open' });

      // // Clone the template and the cloned node to the shadowDOM's root.
      // const instance = HTMLTemplate.content.cloneNode(true);
      // shadowRoot.appendChild(instance);

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('slide-menu', SlideMenu);

    const menuList =[
          {
            id: "accoustic",
            numb: "12345",
            title: "어쿠어스틱"
          },
          {
            id: "electronic",
            numb: "12345",
            title: "전자드럼"
          },
          {
            id: "snare",
            numb: "12345",
            title: "스네어"
          },
          {
            id: "cymbal",
            numb: "12345",
            title: "심벌"
          },
          {
            id: "hardware",
            numb: "12345",
            title: "하드웨어"
          },
          {
            id: "accessory",
            numb: "12345",
            title: "악세사리"
          },
          {
            id: "percussion",
            numb: "12345",
            title: "퍼커션"
          },
          {
            id: "percussion2",
            numb: "12345",
            title: "타악기"
          },
          {
            id: "keyboard",
            numb: "12345",
            title: "건반"
          }
          ,{
            id: "midi",
            numb: "12345",
            title: "미디"
          },{
            id: "etc",
            numb: "12345",
            title: "기타"
          },{
            id: "sound",
            numb: "12345",
            title: "음향"
          }
        ];
  $(document).ready(function(){
    $.map( menuList, function( item, i ) {
       $("#menu_list").append("<div class='flex_row padding_2x body border_bottom black600'>"
                            + "<img class='margin_r_1x' src='img/ic/ic_extend_black600.svg'>"
                           + "<span>" + item.title + "(" + item.numb + ") </span>"
                            + "</div>");
    });
    $(".ic_slide_close").on("click",function(){
       $(".slide_menu").removeClass("open");
       $("body").removeClass("scroll_disable");
    });
  });

})();
