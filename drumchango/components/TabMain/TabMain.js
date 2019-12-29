(async () => {
  const res = await fetch('components/TabMain/TabMain.html');
  const textTemplate = await res.text();
  const centerTabList = [
                          {
                           id: "entire",
                           title: "전체",
                           url:"index.htm"
                          },
                          {
                           id: "news",
                           title: "뉴스",
                           url:"news_page.html"
                          },
                          {
                           id: "video",
                           title: "드럼영상",
                           url:"videos_page.html"
                          },
                          {
                           id: "photo",
                           title: "사진갤러리",
                           url:"photo_page.html"
                          },
                          {
                           id: "secondprd",
                           title: "중고장터",
                           url:"second_sell_page.html"
                          },
                          {
                           id: "sellreview",
                           title: "출고후기",
                           url:"second_sell_review_page.html"
                          },
                          {
                           id: "prdreview",
                           title: "상품후기",
                           url:"reviews_page.html"
                          },
                          {
                           id: "artist",
                           title: "아티스트",
                           url:"artist_page.html"
                          },
                          {
                           id: "freeboard",
                           title: "자유게시판",
                           url:"freeboard.html"
                          }
                        ];

  const communityTabList = [
                          {
                           id: "entire",
                           title: "전체",
                           url:"community.html"
                          },
                          {
                           id: "video",
                           title: "드럼영상",
                           url:"videos_page.html"
                          },
                          {
                           id: "photo",
                           title: "사진갤러리",
                           url:"photo_page.html"
                          },
                          {
                           id: "secondprd",
                           title: "중고장터",
                           url:"second_sell_page.html"
                          },
                          {
                           id: "qna",
                           title: "QnA",
                           url:"qna_page.html"
                          },
                          {
                           id: "counselling",
                           title: "고민상담",
                           url:"counselling_page.html"
                          },
                          {
                           id: "promotion",
                           title: "홍보",
                           url:"promotion_page.html"
                          },
                          {
                           id: "prdreview",
                           title: "상품후기",
                           url:"reviews_page.html"
                          }
                        ];

  const shopTabList = [
                          {
                           id: "entire",
                           title: "전체",
                           url:"shop.html"
                          },
                          {
                           id: "category",
                           title: "카테고리 랭킹",
                           url: "ranked_category.html"
                          },
                          {
                           id: "brand",
                           title: "브랜드 랭킹",
                           url: "ranked_brand.html"
                          },
                          {
                           id: "prdreview",
                           title: "상품후기",
                           url: "reviews_page.html"
                          },
                          // {
                          //  id: "recent",
                          //  title: "최근판매상품"
                          // },
                          {
                           id: "sellreview",
                           title: "출고후기",
                           url: "second_sell_review_page.html"
                          },
                          {
                           id: "secondprd",
                           title: "중고장터",
                           url:"second_sell_page.html"
                          }
                        ];

  const searchList = [
                        {
                          id: "product",
                          title: "제품"
                        },
                        {
                          id: "second_product",
                          title: "중고장터"
                        },
                        {
                          id: "product",
                          title: "게시물"
                        },
                    ];

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  let tabType;

  class TabMain extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const currentTabName = this.getAttribute('currentTab');
      tabType = currentTabName;
      this.appendChild(templete);

      let currentTab = document.getElementById(currentTabName);

      if(currentTab){
        currentTab.classList.add("selected");
      }
      else{
        $('#main_tab').css("display","none");
      }

      if(tabType=='search'){
        $('.sub_tab_list').addClass("col1");
      }
    
      addTabList();


      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('tab-main', TabMain);

  function addTabList(){
    if(tabType=="center"){
        $.map(centerTabList, function( item, i ) {
          if(i==0){
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub selected'>"+ item.title + "</a>");
          }
          else{
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub'>"+ item.title + "</a>");
          }
      });
    }
    else if(tabType=="community"){
        $.map(communityTabList, function( item, i ) {
         if(i==0){
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub selected'>"+ item.title + "</a>");
          }
          else{
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub'>"+ item.title + "</a>");
          }
      });
    }
    else if(tabType=="shop"){
        $.map(shopTabList, function( item, i ) {
         if(i==0){
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub selected'>"+ item.title + "</a>");
          }
          else{
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub'>"+ item.title + "</access>");
          }
      });
    }
    else if(tabType=="search"){
        $.map(searchList, function( item, i ) {
         if(i==0){
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub3 selected'>"+ item.title + "</a>");
          }
          else{
            $("#main_sub_tab_list").append("<a href='" + item.url  + "' class='tab_sub3'>"+ item.title + "</access>");
          }
      });
    }
  }

})();
