function getAnimation() {
  $(".animate").each(function() {
    if( $(this).offset().top <= $(document).scrollTop() + $(window).height() ) {
      $(this).addClass("active");
    }
  });
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).load(function() {
    $("body").removeClass("fixedLoad");
});

$(window).resize(function() {
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
});

$(document).scroll(function() {
    getAnimation();
});

$(document).ready(function() {
    getAnimation();
    $("body").addClass("fixedLoad");
    if( $(".goods_slider").length > 0 ) {
        $(".goods_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            responsive: [
                {
                  breakpoint: 920,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 560,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });
    }
    // ---------------
    $(".active_val").on("click", function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".dropdown_select");
        if(parentBlock.hasClass("active")) {
            parentBlock.removeClass("active");
        } else {
            $(".dropdown_select").removeClass("active");
            parentBlock.addClass("active");
        }        
    });
    $(".vals_list li").on("click", function(e) {
        e.preventDefault();
        value = $(this).html();
        parentBlock = $(this).closest(".dropdown_select");
        activeValue = parentBlock.find(".active_val");
        if(activeValue.find("input").length > 0) {
          value = value.replace(/^\s+/g,'').replace(/\s+$/g,'');
          parentBlock.find("input").attr("value", value);
        } else {
          activeValue.html(value);
        }
    });
    $(document).mouseup(function (e){
        hide_element = $(".dropdown_select");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            hide_element.removeClass("active");
        }
    });
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 ) {
            $(".dropdown_select").removeClass("active");
        }
    });
    // -----------------------
    // -- Tabs --
    $(".tabs").each(function() {
        $(this).find(".tab_link").each(function() {
            if( $(this).hasClass("active") ) {
                indexActiveTab = $(this).index(".tab_link");
                $(this).click();
                return false;
            } else {
                indexActiveTab = 0;
            }
        });
        attrForTabLink = $(this).find(".tab_link").eq(indexActiveTab).attr("for");
        activeTabRadio = $(this).find(".radio_tab[id = '"+ attrForTabLink +"']");
        activeTabRadio.prop("checked", true);
        $(this).find(".tab_link").eq(indexActiveTab).addClass("active");
        $(this).addClass("activated");
    });
    $(".tab_link").click(function (e) {
        if( $(this).hasClass("active") ) {
            e.preventDefault();
        } else {
            tabsParent = $(this).closest(".tabs");
            attrForTabLink = $(this).attr("for");
            activeTabRadio = tabsParent.find(".radio_tab[id = '"+ attrForTabLink +"']");
            activeTabRadio.prop("checked", true);
            tabsParent.find(".tab_link").each(function () {                
                if( $(this).hasClass("active") ) {
                    $(this).removeClass("active");
                }
            });
            $(this).addClass("active");
        }
    });
    // ----------
    $("input[type='tel']").mask("+7 (999) 999-99-99");
    // ----------
    $(".respmenubtn").click(function(e) {
        e.preventDefault();
        if( $("#resp_nav").is(":hidden") ) {
            $("#resp_nav").fadeIn(300);
            $(this).addClass("active");
        } else {
            $("#resp_nav").fadeOut(300);
            $(this).removeClass("active");
        }
    });
    $("#resp_nav .close_btn").on("click", function(e) {
        e.preventDefault();
        $("#resp_nav").fadeOut(300);
        $(".respmenubtn").removeClass("active");
    });
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") ) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });
    // ----------
    $(".scroll_down").click(function(e) {
        var topCoord;
        e.preventDefault();
        if(bodyWidth > 900) {
            topCoord = $(this).closest("section").next("section").offset().top;
        } else {
            topCoord = $(this).closest("section").next("section").offset().top - $(".header_site").height();
        }
        $("body, html").animate({
            scrollTop: topCoord
        }, 1000);
    });
});