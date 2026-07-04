$(document).ready(function () {
  new WOW().init();

  action_page();

  $(window).scroll(function () {
    action_page();
  });

  $("a").on("click", function (e) {
    if ("" !== this.hash) {
      e.preventDefault();
      var i = this.hash;
      $("html, body").animate({ scrollTop: $(i).offset().top - 60 }, 1e3, function () {});
    }
  });
  
  $('.rd-menu__link').click(function () {

    $('.rd-menu').removeClass('active');
    $('.toggle__wrap .toggle').removeClass('active');
    
  });

  $("button.toggle").click(function (event) {
    console.log(true);
    $(this).toggleClass("active");
    $(".rd-menu").toggleClass("active", $(this).hasClass("active"));
  });
  $(".box_action.gotop").click(function () {
    var target = $(this).attr("data-target");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1500
    );
  });
  
  $('.popup .close').click(function () {
    $('.popup').removeClass("active");
  });
  
  // $(document).click(function (event) {
  //   const target = $(event.target);
  //   if (!target.closest(".popup-inner").length && !target.hasClass("popup-inner")) {
  //     $('.popup').removeClass("active");
  //   }
  // });

  $(".scroll-to-target").on("click", function () {
    var target = $(this).attr("data-target");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1500
    );
  });
  
  $(".popup-form .close").click(function () {
    $(".popup-contact").removeClass("active");
  });


});

function action_page() {
  // $top_height = $('.header').height();
  $("header").addClass("stick");
  $top_height = 95;
  if ($(window).scrollTop() > $top_height) {
    $("header.header").addClass("stick");
    $(".rd-panel").addClass("stick");
  } else {
    $("header.header").removeClass("stick");
    $(".rd-panel").removeClass("stick");
  }
  if ($(this).scrollTop() >= 200) {
    $(".scroll-to-target").addClass("active");
  } else {
    $(".scroll-to-target").removeClass("active");
  }
}

$("button.toggle").click(function (event) {
  $(this).toggleClass("active");
  $(".rd-menu").toggleClass("active", $(this).hasClass("active"));
});
function register(form, param) {
  const uri = `${url}/lien-he/send`;
  const emailRegex = /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  if (param.fullname === "") {
    $(`${form} input`).addClass("error");
    $(`${form} input[name="fullname"]`).focus();
    return false;
  } else {
    $(`${form} input[name="fullname"]`).removeClass("error");
  }

  if (param.phone === "") {
    $(`${form} input[name="phone"]`).addClass("error");
    $(`${form} input[name="phone"]`).focus();
    return false;
  } else if (!/^\d{10}$/.test(param.phone)) {
    $(`${form} input[name="phone"]`).addClass("error");
    $(`${form} input[name="phone"]`).focus();
    return false;
  } else {
    $(`${form} input[name="phone"]`).removeClass("error");
  }

  $('#loading').fadeIn("fast");

  $.post(uri, param, function (data) {
    $('#loading').fadeOut("fast");

    if (data.status && data.status === true) {
      if ($("#tracking").html() === "") {
        $("#tracking").html(data.content);
      }
      $('.popup__thank').addClass("active");

      clear_form(form);
    } else {
      alert('Đã xảy ra lỗi, vui lòng thử lại !');
    }
  }, "json");
}

function getOption(option) {
  $(".popup-form ").find("#service").val(option);
}
function popRegis() {
  setTimeout(() => {
    $(".popup-contact").addClass("active");
  }, 0);
}
function myFunction() {
  $("#myDropdown").toggle("show");
}
function newsletter(form, param) {
  var uri = url + "/gui";

  if (param.phone_number == "") {
    $(form + ' input[name="phone_number"]').addClass("error");
    $(form + ' input[name="phone_number"]').focus();
    return false;
  } else {
    $(form + ' input[name="phone_number"]').removeClass("error");
  }

  $(form + " #loading").fadeIn("fast");
  $.post(
    uri,
    param,
    function (data) {
      if (data.status && data.status === "true") {
        $(form + " #loading").fadeOut("fast");
        if ($("#tracking").html() == "") {
          $("#tracking").html(data.content);
        }
        $(form + " .notice.success").html("Gửi thành công");
        $(form + " .notice.success")
          .slideDown("slow")
          .delay(3000)
          .slideUp("slow");
        clear(form);
      } else {
        $(form + " #loading").fadeOut("fast");
        $(form + " .notice.error").html(data.content);
        $(form + " .notice.error")
          .slideDown("slow")
          .delay(3000)
          .slideUp("slow");
      }
    },
    "json"
  );
}
function clear(form = "") {
  $(form + ' input[name="phone_number"]').val("");
}
function clear_form(form = "") {
  $(form + " input").val("");
  $(form + " textarea").val("");
  $(form + " select option:selected").val("");
}
