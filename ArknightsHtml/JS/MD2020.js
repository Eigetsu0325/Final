$(function () {


  $(".progressbarTWInput").each(function () {
    let target = $(this).find('img')
    $(this).find('input').change(function () {
      readURL(this,target);
    })
  })





  function readURL(input,target) {

    if (input.files && input.files[0]) {

      var reader = new FileReader();

      reader.onload = function (e) {
        
        target.attr('src', e.target.result);

      }

      reader.readAsDataURL(input.files[0]);
    }

  }
})