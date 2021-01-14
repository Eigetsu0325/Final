$(function(){

        $("#flip").click(function(){
          $("#panel").slideToggle("slow");
        });

        
        /*$(".charbg .pic").each(function(){
            $(this).click(function(){
                $(this).find("img").fadeToggle(1000);
              });
        });*/

        $('.charbg .pic').each(function(){
          let slideImgs = $(this).find('img'),
              slideImgsCount = slideImgs.length,
              currentIndex = 0;
      
          slideImgs.eq(currentIndex).fadeIn(1000);
          $(this).click(function(){
          showNextSlide();
        })
      
          function showNextSlide(){
              let nextIndex = (currentIndex + 1) % slideImgsCount;
              slideImgs.eq(currentIndex).fadeOut(1000);
              slideImgs.eq(nextIndex).fadeIn(1000);
              currentIndex = nextIndex;
          }
      })
});

