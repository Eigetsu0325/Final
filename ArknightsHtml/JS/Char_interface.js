$(function(){
    
    $('.char-btn').each(function(){
        let slideImgs = $(this).find('img'),
                slideImgsCount = slideImgs.length,
                currentIndex = 0;
            
        $(".stage0-btn-wrapper").on("click", function(){
            slideImgs.eq(0).fadeIn(0);
            slideImgs.eq(1).fadeOut(0);
            slideImgs.eq(2).fadeOut(0);
            slideImgs.eq(3).fadeOut(0);
            })
            $(".stage1-btn-wrapper").on("click", function(){
                slideImgs.eq(0).fadeOut(0);
                slideImgs.eq(1).fadeIn(0);
                slideImgs.eq(2).fadeOut(0);
                slideImgs.eq(3).fadeOut(0);
            })
                $(".stage2-btn-wrapper").on("click", function(){
                    slideImgs.eq(0).fadeOut(0);
                    slideImgs.eq(1).fadeOut(0);
                    slideImgs.eq(2).fadeIn(0);
                    slideImgs.eq(3).fadeOut(0);
    
                })
                $(".stage3-btn-wrapper").on("click", function(){
                    slideImgs.eq(0).fadeOut(0);
                    slideImgs.eq(1).fadeOut(0);
                    slideImgs.eq(2).fadeOut(0);
                    slideImgs.eq(3).fadeIn(0);
    
                })
        });
})

