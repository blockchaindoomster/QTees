$(function () {
  "use strict";
  var e = $(window);
  $.scrollIt({
    upKey: 38,
    downKey: 40,
    easing: "swing",
    scrollTime: 600,
    activeClass: "active",
    onPageChange: null,
    topOffset: -70
  }), e.on("scroll", function () {
    var a = e.scrollTop(),
      t = $(".navbar"),
      n = $(".navbar .logo> img");
    a > 100 ? (t.addClass("nav-scroll"), n.attr("src", "img/logo.png")) : (t.removeClass("nav-scroll"), n.attr("src", "img/logo.png"))
  }), $(".navbar-nav .dropdown-item a").on("click", function () {
    $(".navbar-collapse").removeClass("show")
  });
  var a = $(".bg-img, section");
  a.each(function (e) {
    $(this).attr("data-background") && $(this).css("background-image", "url(" + $(this).data("background") + ")")
  }), $(".bauen-project-items").imagesLoaded(function () {
    $(".bauen-project-filter li").on("click", function () {
      $(".bauen-project-filter li").removeClass("active"), $(this).addClass("active");
      var e = $(this).attr("data-filter");
      return $(".bauen-project-items").isotope({
        filter: e,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: !1
        }
      }), !1
    }), $(".bauen-project-items").isotope({
      itemSelector: ".single-item",
      layoutMode: "masonry"
    })
  });
  var t = function () {
    $(".animate-box").waypoint(function (e) {
      "down" !== e || $(this.element).hasClass("animated") || (0, $(this.element).addClass("item-animate"), setTimeout(function () {
        $("body .animate-box.item-animate").each(function (e) {
          var a = $(this);
          setTimeout(function () {
            var e = a.data("animate-effect");
            "fadeIn" === e ? a.addClass("fadeIn animated") : "fadeInLeft" === e ? a.addClass("fadeInLeft animated") : "fadeInRight" === e ? a.addClass("fadeInRight animated") : a.addClass("fadeInUp animated"), a.removeClass("item-animate")
          }, 200 * e, "easeInOutExpo")
        })
      }, 100))
    }, {
      offset: "85%"
    })
  };
  $(function () {
    t()
  }), $("a.vid").YouTubePopUp(), $(".testimonials .owl-carousel").owlCarousel({
    loop: !0,
    margin: 30,
    mouseDrag: !0,
    autoplay: !1,
    dots: !0,
    nav: !1,
    navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
    responsiveClass: !0,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  }), $(".projects .owl-carousel").owlCarousel({
    loop: !0,
    margin: 30,
    mouseDrag: !0,
    autoplay: !1,
    dots: !0,
    autoplayHoverPause: !0,
    responsiveClass: !0,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 2
      }
    }
  }), $(".img-zoom").magnificPopup({
    type: "image",
    closeOnContentClick: !0,
    mainClass: "mfp-fade",
    gallery: {
      enabled: !0,
      navigateByImgClick: !0,
      preload: [0, 1]
    }
  }), $(".magnific-youtube, .magnific-vimeo, .magnific-custom").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 300,
    preloader: !1,
    fixedContentPos: !1
  });
  var n = document.querySelector(".progress-wrap path"),
    o = n.getTotalLength();
  n.style.transition = n.style.WebkitTransition = "none", n.style.strokeDasharray = o + " " + o, n.style.strokeDashoffset = o, n.getBoundingClientRect(), n.style.transition = n.style.WebkitTransition = "stroke-dashoffset 10ms linear";
  var i = function () {
    var e = $(window).scrollTop(),
      a = $(document).height() - $(window).height(),
      t = o - e * o / a;
    n.style.strokeDashoffset = t
  };
  i(), $(window).scroll(i);
  var s = 150,
    l = 550;
  jQuery(window).on("scroll", function () {
    jQuery(this).scrollTop() > s ? jQuery(".progress-wrap").addClass("active-progress") : jQuery(".progress-wrap").removeClass("active-progress")
  }), jQuery(".progress-wrap").on("click", function (e) {
    return e.preventDefault(), jQuery("html, body").animate({
      scrollTop: 0
    }, l), !1
  })
}), $(document).ready(function () {
  var e = $(".header .owl-carousel");
  $(".slider .owl-carousel").owlCarousel({
    items: 1,
    loop: !0,
    dots: !1,
    margin: 0,
    autoplay: !0,
    smartSpeed: 500,
    nav: !0,
    navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
  }), $(".slider-fade .owl-carousel").owlCarousel({
    items: 1,
    loop: !0,
    dots: !1,
    margin: 0,
    autoplay: !0,
    smartSpeed: 500,
    animateOut: "fadeOut",
    nav: !0,
    navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
  }), e.on("changed.owl.carousel", function (e) {
    var a = e.item.index - 2;
    $("h4").removeClass("animated fadeInUp"), $("h1").removeClass("animated fadeInUp"), $("p").removeClass("animated fadeInUp"), $(".butn-light").removeClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(a).find("h4").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(a).find("h1").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(a).find("p").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(a).find(".butn-light").addClass("animated fadeInUp")
  })
}), $(".accordion-box").length && $(".accordion-box").on("click", ".acc-btn", function () {
  var e = $(this).parents(".accordion-box"),
    a = $(this).parents(".accordion");
  $(this).next(".acc-content").is(":visible") ? ($(this).removeClass("active"), $(this).next(".acc-content").slideUp(300), $(e).children(".accordion").removeClass("active-block")) : ($(e).find(".accordion .acc-btn").removeClass("active"), $(this).addClass("active"), $(e).children(".accordion").removeClass("active-block"), $(e).find(".accordion").children(".acc-content").slideUp(300), a.addClass("active-block"), $(this).next(".acc-content").slideDown(300))
}), paceOptions = {
  ajax: !0,
  document: !0,
  eventLag: !1
}, Pace.on("done", function () {
  $("#preloader").delay(500).fadeOut(800)
}), jQuery;