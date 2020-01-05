(async () => {
  const res = await fetch('components/GridArtistSelect/GridArtistSelect.html');
  const textTemplate = await res.text();
  const brandList = [
                          {
                           id: "a1",
                           title: "아티스트명"
                          },
                          {
                           id: "a2",
                           title: "아티스트명"
                          },
                          {
                           id: "a3",
                           title: "아티스트명"
                          },
                          {
                           id: "a4",
                           title: "아티스트명"
                          },
                          {
                           id: "a5",
                           title: "아티스트명"
                          },
                          {
                           id: "a6",
                           title: "아티스트명"
                          },
                          {
                           id: "a7",
                           title: "아티스트명"
                          },
                          {
                           id: "a8",
                           title: "아티스트명"
                          },
                          {
                           id: "a10",
                           title: "아티스트명"
                          },
                          {
                           id: "a11",
                           title: "아티스트명"
                          },
                          {
                           id: "a12",
                           title: "아티스트명"
                          },
                          {
                           id: "a13",
                           title: "아티스트명"
                          },
                          {
                           id: "a14",
                           title: "아티스트명"
                          },
                          {
                           id: "a15",
                           title: "아티스트명"
                          },
                          {
                           id: "a16",
                           title: "아티스트명"
                          },
                          {
                           id: "a17",
                           title: "아티스트명"
                          },
                          {
                           id: "a18",
                           title: "아티스트명"
                          },
                          {
                           id: "a19",
                           title: "아티스트명"
                          }
                        ];

  const allBrandObj = [];
  const selectedBrandObj = [];
  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class GridArtistSelect extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      this.appendChild(templete);
      addBrandList();
    }
  }

  customElements.define('grid-artist-select', GridArtistSelect);

  function addBrandList(){

    $.map(brandList, function(item, i) {
         $("#GridBrand").append("<div class='artist_5_fix brand" + i + "'><div id='"
                                + item.id + "' class='profile_m border_black50 margin_b_1x'>"
                                + "</div>"
                                + "<p class='caption black600 w400'>"
                                + item.title 
                                + "</p></div>");

         $("#" + item.id).on("click",function(){
          console.log(this);
          $(this).toggleClass("primary_border border_bold");
         });
         // $(".brand" + i).on("click",function(){
         //    if(!selectedBrandObj.includes(item)){
         //      selectedBrandObj.push(item);
         //      $("#selectedBrand").append("<div class='artist_5_fix selected_brand brand" + i + "'><div id='"
         //                        + item.id + "' class='profile_s border_black50 margin_b_1x'>"
         //                        + "</div>"
         //                        + "<p class='caption black600 w400'>"
         //                        + item.title 
         //                        + "</p></div>");

         //      $(".selected_brand").on("click",function(){
         //        this.remove();
         //      })
         //    }
         // });  
      });
  }

})();
