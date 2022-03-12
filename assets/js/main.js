$(function () {
  var OPTIONS = {};
  main(OPTIONS);



  $(".get-promo__form").submit(function (e) {
      e.preventDefault();

      if ($(".smsss").length) return;

      var phone = $("[name=phone]").val();
      var iss = $(".checkinput__control").prop('checked');

      if (!phone) $("[name=phone]").addClass("red");
      if (!iss) $(".checkinput__control").addClass("red");

      if (!phone || !iss) return;

      $("[name=phone]").removeClass("red");
      $(".checkinput__control").removeClass("red");



      $.get('/api/customer', {'phone': phone}, function(response) {
        $(".get-promo__title").html(response.message);
        $(".btn[type=submit]").addClass("smsss").data("phone", phone).data("code", response.code).text("Отправить SMS");
     
        $(".smsss").click(function () {

            $.get('/api/customer_sms', {'phone': $(".smsss").data('phone'), 'code': $(".smsss").data('code')}, function(response) {
              $(".get-promo__title").text("SMS с кодом отправлено!");
              $(".smsss").removeClass("smsss").text("Получить промокод");
              $("[name=phone]").val("");
            });
          
        });
     });
  });


  
});

function main(opts) {
  mobMenu();
  maskInput();
  // sendForms();
  scrollLink();
}

function scrollLink() {

  $('.js-scroll').on("click", function(e){
    e.preventDefault();
    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) { 
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); 
    }
    return false; 
  });
    
}

function mobMenu() {
  $(".menu-btn").on("click", function(e) {
    e.preventDefault();
    $(".header__nav").fadeToggle();
    $(this).toggleClass("close-menu");
  });

  $(".header__nav a").on("click", function(e) {
    $(".menu-btn").removeClass("close-menu");
    $(".header__nav").fadeOut();
  });
}

function maskInput() {
  $(function($){
    $("[type=\"tel\"]").mask("+7 (999) 999-99-99");
 });
}

function sendForms() {
  $(".get-promo__form").on("submit", function(e){
    e.preventDefault();

    var self = $(this);
    var phone = self.find('input[name="phone"]').val()
    var checkStatus = self.find('input[type="checkbox"]').prop("checked");

    console.log(checkStatus);
    if(phone.trim().length && checkStatus) {

      data = new FormData();
      data.append('phone', phone);

      $.ajax({
        method: "POST",
        // url: "./back.php",
        url: "/api/receipt",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        dataType:"json"
      })
      .done(function(data) {
        console.log("succses");
      })
      .fail(function() {
        console.log("error");
      });
    } else {
      // show error
    }

    if (!phone.trim().length) {
      self.find('input[name="phone"]').addClass("form-elem-error");
    } else {
      self.find('input[name="phone"]').removeClass("form-elem-error");
    }

    if (!checkStatus) {
      self.find('input[type="checkbox"]').addClass("form-elem-error");
    } else {
      self.find('input[type="checkbox"]').removeClass("form-elem-error");
    }

  });
}