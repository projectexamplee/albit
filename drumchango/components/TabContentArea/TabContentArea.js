(async () => {
  const res = await fetch('components/TabContentArea/TabContentArea.html');
  const textTemplate = await res.text();
   const categoryList =[
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
      }
  ];
  const brandList =[
      {
        id: "accoustic",
        title: "브랜드1"
      },
      {
        id: "electronic",
        title: "브랜드2"
      },
      {
        id: "snare",
        title: "브랜드3"
      },
      {
        id: "cymbal",
        title: "브랜드4"
      },
      {
        id: "hardware",
        title: "브랜드5"
      },
      {
        id: "accessory",
        title: "브랜드6"
      },
      {
        id: "percussion",
        title: "브랜드7"
      },
      {
        id: "percussion2",
        title: "브랜드8"
      },
      {
        id: "keyboard",
        title: "브랜드9"
      }
      ,{
        id: "midi",
        title: "브랜드10"
      },{
        id: "etc",
        title: "브랜드11"
      },{
        id: "sound",
        title: "브랜드12"
      }
  ];
  const videoList =[
      {
        id: "accoustic",
        title: "전체"
      },
      {
        id: "electronic",
        title: "연주"
      },
      {
        id: "snare",
        title: "레슨"
      },
      {
        id: "cymbal",
        title: "홍보"
      },
      {
        id: "hardware",
        title: "토크영상"
      },
      {
        id: "accessory",
        title: "사운드샘플"
      },
      {
        id: "percussion",
        title: "연주영상"
      }
  ];
  const photoList =[
      {
        id: "accoustic",
        title: "전체"
      },
      {
        id: "electronic",
        title: "악기갤러리"
      },
      {
        id: "electronic",
        title: "회원갤러리"
      }
  ];

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  let tabType;

  class TabContentArea extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const currentTabName = this.getAttribute('currentTab');
      const type = this.getAttribute('type');

      tabType = type;

      this.appendChild(templete);
      this.querySelector('.sub_tab_list').setAttribute("id", type);
      let currentTab = document.getElementById(currentTabName);
      addTabList();

      // currentTab.classList.add("selected");


      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('tab-contentarea', TabContentArea);


  function addTabList(){
    if(tabType=="category"){
        console.log(categoryList);
        $.map( categoryList, function( item, i ) {
          if(i==0){
            $("#category").append("<div class='tab_sub2 selected'>"+ item.title + "</div>");
          }
          else{
            $("#category").append("<div class='tab_sub2'>"+ item.title + "</div>");
          }
      });
    }
    else if(tabType=="brand"){
        console.log(brandList);
        $.map( brandList, function( item, i ) {
         if(i==0){
            $("#brand").append("<div class='tab_sub2 selected'>"
                                + "<div class='circle_small black100_bg w700 black300'>" + (i+1) +"</div>"
                                + item.title + "</div>");
          }
          else{
            $("#brand").append("<div class='tab_sub2'>"
                                + "<div class='circle_small black100_bg w700 black300'>" + (i+1) +"</div>"
                                + item.title + "</div>");
          }
      });
    }
    else if(tabType=="video"){
        console.log(brandList);
        $.map( videoList, function( item, i ) {
         if(i==0){
            $("#video").append("<div class='tab_sub2 selected'>"+ item.title + "</div>");
          }
          else{
            $("#video").append("<div class='tab_sub2'>"+ item.title + "</div>");
          }
      });
    }
    else if(tabType=="photo"){
        console.log(photoList);
        $.map( photoList, function( item, i ) {
         if(i==0){
            $("#photo").append("<div class='tab_sub2 selected'>"+ item.title + "</div>");
          }
          else{
            $("#photo").append("<div class='tab_sub2'>"+ item.title + "</div>");
          }
      });
    }
  }
  // $(document).ready(function(){
  //   console.log(tabType);
  //   if($("#category")){
  //       $.map( categoryList, function( item, i ) {
  //        $("#category").append("<div class='tab_sub2'>"+ item.title + "</div>");
  //     });
  //   }
  //   else if($("#brand")){
  //       $.map( brandList, function( item, i ) {
  //        $("#brand").append("<div class='tab_sub2'>"+ item.title + "</div>");
  //     });
  //   }
  // });

})();
