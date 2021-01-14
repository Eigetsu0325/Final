$(function(){
    $(".Logotag")
    .prop("style", "display:none");
    $("#descript")
    .prop("style", "display:none");
    $(".Logo").fadeOut(3000);
    $(".Logotag").fadeIn(4000);
    
    $("#character").on("click", function(){
        $("#descript").fadeIn(1000);
        //播放聲音
        let audio = $("#characterAudio")[0];

        audio.play();

    })

});

