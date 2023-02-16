import "./style.scss";
import "./parts.scss";

/****************************************
 * スライドショー
 ****************************************/
$('.slider').slick({
  autoplay: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: '<div class="slick-prev"></div>',
  nextArrow: '<div class="slick-next"></div>',
  dots: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
});


/****************************************
 * loading 画面遷移
 ****************************************/
$(window).on('load', function() {
  $('#splash_logo').delay(1200).fadeOut('slow');
  $('#splash').delay(1500).fadeOut('slow', function() {
    $('body').addClass('appear');
  });

  let bar = new ProgressBar.Line(splash_text, {
    easing: 'easeInOut',
    duration: 1000,
    strokeWidth: 0.4,
    color: '#bbb',
    trailWidth: 0.4,
    trailColor: '#fff',
    text: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        padding: '0',
        margin: '-30px 0 0 0',
        transform: 'translate(-50%, -50%)',
        'font-size': '2.5rem',
        color: '#fff',
      },
      autoStyleContainer: false
    },
    step: function(state, bar) {
      bar.setText(Math.round(bar.value() * 100) + '%');
    }
  });

  bar.animate(1.0, function() {
    $('#splash').delay(500).fadeOut(800);
  });
});


// $(window).on('load', function() {
// })

/****************************************
 * ナビゲーション
 ****************************************/
$('#open_btn').click(function() {
  $(this).toggleClass('active');
  $('#g-nav').toggleClass('panel');
});
$('#g-nav a').click(function() {
  $(this).removeClass('active');
  $('#g-nav').removeClass('panel');
});


/****************************************
 * ふわっと拡大アニメーション
 ****************************************/
function fadeAnime() {
  $('.fadeInTrigger').each(function() {
    let elem = $(this).offset().top-50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elem - windowH) {
      $(this).addClass('fadeIn');
    } else {
      $(this).removeClass('fadeIn');
    }
  });

  $('.zoomOutTrigger').each(function() {
    let elem = $(this).offset().top;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elem - windowH) {
      $(this).addClass('zoomOut');
    } else {
      $(this).removeClass('zoomOut');
    }
  });
}


/****************************************
 *ページトップリンク
 ****************************************/
function setFadeElement() {
  let windowH = $(window).height();
  let scroll = $(window).scrollTop();

  // 出現範囲の指定
  let contentsTop = Math.round($('#blog').offset().top);
  let contentsH = $('#blog').outerHeight(true);

  // 2つ目の出現範囲指定
  let contentsTop2 = Math.round($('#footer').offset().top);
  let contentsH2 = $('#footer').outerHeight(true);

  // 出現範囲に入ったかどうかチェック
  if(scroll + windowH >= contentsTop && scroll + windowH <= contentsTop + contentsH) {
    $('#page_top').addClass('UpMove');
    $('#page_top').removeClass('DownMove');
    $('.hide-btn').addClass('hide-btn');
  } else if(scroll + windowH >= contentsTop2 && scroll + windowH <= contentsTop2 + contentsH2) {
    $('#page_top').addClass('UpMove');
    $('#page_top').removeClass('DownMove');
  } else {
    if(!$('.hide-btn').length) {
      $('#page_top').addClass('UpMove');
      $('#page_top').removeClass('DownMove');
    }
  }
}

$('#page_top').click(function() {
  $('body, html').animate({
    scrollTop: 0
  }, 500);
  return false;
})


/****************************************
 *スライドテキストアニメーション
 ****************************************/
function slideAnime() {
  $('.leftAnime').each(function() {
    let elem = $(this).offset().top-50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elem - windowH) {
      $(this).addClass('slideAnimeLeftRight');
      $(this).children('.leftAnimeInner').addClass('slideAnimeRightLeft');
    } else {
      $(this).removeClass('slideAnimeLeftRight');
      $(this).children('.leftAnimeInner').removeClass('slideAnimeRightLeft');
    }
  });
}

$(window).scroll(function() {
  slideAnime();
});

$(window).on('load', function() {
  slideAnime();
});


/****************************************
 *ヘッダー画像拡大
 ****************************************/
$(window).scroll(function() {
  let scroll = $(window).scrollTop();
  $('.header-img').css({
    transform: 'scale(' + (100 + scroll/10) /100 +')',
    top: - (scroll / 50) + '%',
  });
});


/****************************************
 *テキストが光りながら出現
 ****************************************/
function GlowAnimeControl() {
  $('.glowAnime').each(function() {
    let elem = $(this).offset().top - 50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elem - windowH) {
      $(this).addClass('glow');
    } else {
      $(this).removeClass('glow');
    }
  });
}

$(window).scroll(function() {
  GlowAnimeControl();
});

$(window).on('load', function() {
  let element = $('.glowAnime');

  element.each(function() {
    let text = $(this).text();
    let text_box = '';
    text.split('').forEach(function(t, i) {
      if(t !== '') {
        if(i < 10) {
          text_box += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
        } else {
          let n = i / 10;
          text_box += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
        }
      } else {
        text_box += t;
      }
    });
    $(this).html(text_box);
  });
  GlowAnimeControl();
})
/****************************************
 *テキストがじわっと出現
 ****************************************/
function BlurTextAnimeControl() {
  $('.blurTrigger').each(function() {
    let elem = $(this).offset().top - 50;
    let scroll = $(window).scrollTop();
    let windowH = $(window).height();

    if(scroll >= elem - windowH) {
      $(this).addClass('blur');
    } else {
      $(this).removeClass('blur');
    }
  });
}

$(window).scroll(function() {
  BlurTextAnimeControl();
});

$(window).on('load', function() {
  BlurTextAnimeControl();
})
