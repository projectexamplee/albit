(async () => {
  const res = await fetch('components/MenuHorPrdAll/MenuHorPrdAll.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class MenuHorPrdAll extends HTMLElement {
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

  customElements.define('menu-hor-prd-all', MenuHorPrdAll);

   const menuList =[
      {
        id: "accoustic",
        title: "어쿠어스틱"
      },
      {
        id: "electronic",
        title: "전자드럼"
      },
      {
        id: "snare",
        title: "스네어"
      },
      {
        id: "cymbal",
        title: "심벌"
      },
      {
        id: "hardware",
        title: "하드웨어"
      },
      {
        id: "accessory",
        title: "악세사리"
      },
      {
        id: "percussion",
        title: "퍼커션"
      },
      {
        id: "percussion2",
        title: "타악기"
      },
      {
        id: "keyboard",
        title: "건반"
      }
      ,{
        id: "midi",
        title: "미디"
      },{
        id: "etc",
        title: "기타"
      },{
        id: "sound",
        title: "음향"
      }
  ];
  $(document).ready(function(){
    $.map( menuList, function( item, i ) {
       $("#ctg_all_container").append("<div class='caption black600 button tab_small'>"+ item.title + "</div>");
    });
  });

})();
