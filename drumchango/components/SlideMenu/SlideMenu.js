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
      this.appendChild(templete);

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
       $("#menu_list").append("<div class='flex_row padding_1x caption black600'>"
                            + "<img class='margin_r_1x' src='img/ic/ic_extend_black600.svg'>"
                           + "<span>" + item.title + "(" + item.numb + ") </span>"
                            + "</div>");
    });
    $(".ic_close").on("click",function(){
       $(".slide_menu").removeClass("open");
    });
  });

})();
