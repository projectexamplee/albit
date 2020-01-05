(async () => {
  const res = await fetch('components/MenuHorPrdPop/MenuHorPrdPop.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class MenuHorPrdPop extends HTMLElement {
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

  customElements.define('menu-hor-prd-pop', MenuHorPrdPop);

   const menuList =[
      {
        id: "accoustic",
        img: "img/ctg/c1.jpg",
        title: "드럼스틱"
      },
      {
        id: "electronic",
        img: "img/ctg/c2.jpg",
        title: "브러쉬/말렛"
      },
      {
        id: "snare",
        img: "img/ctg/c3.jpg",
        title: "드럼헤드"
      },
      {
        id: "cymbal",
        img: "img/ctg/c4.jpg",
        title: "연습패드"
      },
      {
        id: "hardware",
        img: "img/ctg/c5.jpg",
        title: "페달"
      },
      {
        id: "accessory",
        img: "img/ctg/c6.jpg",
        title: "의자"
      },
      {
        id: "percussion",
        img: "img/ctg/c7.jpg",
        title: "T자스탠드"
      },
      {
        id: "percussion2",
        img: "img/ctg/c8.jpg",
        title: "1자스탠드"
      },
      {
        id: "keyboard",
        img: "img/ctg/c9.jpg",
        title: "스네어스탠드"
      }
      ,{
        id: "midi",
        img: "img/ctg/c10.jpg",
        title: "하이햇스탠드"
      },{
        id: "etc",
        img: "img/ctg/c11.jpg",
        title: "스틱가방"
      },{
        id: "sound",
        img: "img/ctg/c12.jpg",
        title: "케이스"
      }
      ,{
        id: "sound",
        img: "img/ctg/c13.jpg",
        title: "메트로놈"
      }
      ,{
        id: "sound",
        img: "img/ctg/c14.jpg",
        title: "드럼키"
      }
      ,{
        id: "sound",
        img: "img/ctg/c15.jpg",
        title: "튜닝기"
      }
      ,{
        id: "sound",
        img: "img/ctg/c16.jpg",
        title: "드럼마이크"
      }
      ,{
        id: "sound",
        img: "img/ctg/c17.jpg",
        title: "드럼쉴드"
      }
  ];
  $(document).ready(function(){
    /*MENU LIST DATA BINDING*/
    $.map( menuList, function( item, i ) {
       $("#ctg_pop_container").append("<div class='small black600 tab_icon menu_pop'>"
                                     + "<img src='" + item.img + "'>"
                                     + item.title
                                     + "</div>");
    });
    /*ADD HIDE BTT*/
    $("#ctg_pop_container").append("<div class='ic_hide caption black600 tab_icon menu_pop'>"
                                    + "<div class='border_radius black50_bg flex_col flex_center'>" 
                                    + "숨기기"
                                    + "</div>"
                                    + "</div>");
    /*THE MORE EVENT*/
    $(".ic_more").on("click",function(){
        $("#ctg_pop_container").addClass("height_auto");
    });
    /*HIDE EVENT*/
    /*THE MORE EVENT*/
    $(".ic_hide").on("click",function(){
        $("#ctg_pop_container").removeClass("height_auto");
    })
  });

})();
