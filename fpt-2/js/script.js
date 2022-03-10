(function ($) {

  var txtTrans = {
    vi: {
      'Display language': 'Ngôn ngữ hiển thì',
      'Virtual Annual General Meetings': 'Đại hội đồng cổ đông trực tuyến',
      'Hotline:': 'Trợ giúp:',
      'Account type': 'Chọn loại đăng nhập',
      'Hanoi': 'Hà Nội',
      'Ho Chi Minh City': 'TP Hồ Chí Minh',
      'Shareholder': 'Cổ đông',
      'Guest': 'Khách mời',
      'Login for shareholders of the company': 'Đăng nhập dành cho quý cổ đông của công ty',
      'Login for corporate guests': 'Đăng nhập dành cho khách mời của công ty',
      '© Copyright FPT Telecom 2021': '© Bản quyền FPT Telecom 2021',
      'Login': 'Đăng nhập',
      'Shareholder\'s Code/Passport': 'Số ĐKSH, CMND/CCCD',
      'Enter shareholder\'s code/passport': 'Nhập số ĐKSH, CMND/CCCD',
      'Select verification method': 'Chọn phương thức xác thực',
      'Otp authentication': 'Xác thực qua OTP',
      'eKYC authentication': 'Xác thực qua eKYC',
      'Login for Journalists/Guests': 'Đăng nhập dành cho Nhà báo/Khách mời',
      'Username': 'Tên đăng nhập',
      'Enter username': 'Nhập tên đăng nhập',
      'Password': 'Mật khẩu',
      'Enter password': 'Nhập mật khẩu',
      'Back': 'Quay lại',
      'Hello': 'Xin chào',
      'Choose an authentication method': 'Chọn phương thức xác thực',
      'Authentication by OTP sent via SMS': 'Xác thực bằng OTP gửi qua SMS',
      'Authentication by OTP sent via Email': 'Xác thực bằng OTP gửi qua Email',
      'Send verification code': 'Gửi mã xác thực',
      'Verification codes': 'Mã xác thực',
      'We have sent 1 verification code to phone number {{phone}}, please check your message and enter the verification code in the box below.<br>If you haven\'t received the message yet, try sending it again after 180 seconds': 'Chúng tôi đã gửi 1 mã xác thực đến số điện thoại {{phone}}, vui lòng kiểm tra tin nhắn và nhập mã xác thực vào ô sau.<br />Nếu quý cổ đông chưa nhận được tin nhắn, thử gửi lại sau 180s',
      'Continue': 'Tiếp tục',
      'Customer identification': 'Định danh điện tử',
      'Front': 'Mặt trước CMND/CCCD',
      'Upload': 'Tải ảnh lên',
      'or': 'hoặc',
      'Open camera': 'Chụp hình',
      'Record Video': 'Qauy video khuôn mặt',
      'Vote': 'Biểu quyết',
      'Send': 'Gửi',
      'Ask question': 'Đặt câu hỏi',
      'Join meeting': 'Tham gia đại hội',
    },
  };
  
  $('.trans, .date-trans').each(function () {
    $(this).attr('data-text', $(this).html().trim());
  });
  $('.pl-trans').each(function () {
    $(this).attr('data-text', $(this).attr('placeholder'));
  });

  function changeLang() {
    var lang = localStorage.getItem('language') || 'vi';
    var title = document.title;
    if (typeof txtTrans[lang] !== 'undefined' && typeof txtTrans[lang][title] !== 'undefined') {
      title = txtTrans[lang][title];
    }
    document.title = title;

    $('.trans').each(function () {
      var text = $(this).attr('data-text').replace(/(\r\n|\n|\r)/gm, "");
      var params = $(this).data('params');
      if (typeof txtTrans[lang] !== 'undefined' && typeof txtTrans[lang][text] !== 'undefined') {
        text = txtTrans[lang][text];
      }
      if (typeof params !== 'undefined') {
        for (var f in params) {
          text = text.replace('{{'+ f +'}}', params[f]);
        }
      }
      $(this).html(text);
    });

    $('.pl-trans').each(function () {
      var text = $(this).attr('data-text');
      if (typeof txtTrans[lang] !== 'undefined' && typeof txtTrans[lang][text] !== 'undefined') {
        $(this).attr('placeholder', txtTrans[lang][text]);
      } else {
        $(this).attr('placeholder', text);
      }
    });

    $('.date-trans').each(function () {
      var dateStr = $(this).attr('data-text');
      if (dateStr) {
        var date = new Date(dateStr);
        var dateOpts = {year: 'numeric', month: 'long', day: '2-digit'};
        var dateLng = lang === 'vi' ? 'vi-VN' : 'en-US';
        $(this).text(date.toLocaleDateString(dateLng, dateOpts));
      }
    });

    $('.lang-group .dropdown-toggle').html('<img src="images/flags/'+ lang +'.svg" />');
    $('.language-list').each(function () {
      $(this).find('li').removeClass('current-lang');
      $(this).find('.lang-' + lang).addClass('current-lang');
    });
    $('.lang-group .language-list li a img.icon-checkmark').remove();
    $('.lang-group .language-list .lang-' + lang + ' a')
        .append('<img src="images/icons/icon-checkmark.svg" class="icon-checkmark" />');
  }
  
  changeLang();
  
  $('body').on('click', '.language-list a', function (e) {
    e.preventDefault();
    localStorage.setItem('language', $(this).data('lang') || 'vi');
    changeLang();
  });
  
  var headerNavbar = $('#header_navbar .navbar-content');
  if ($('#header .lang-group').length > 0) {
    headerNavbar.append($('#header .lang-group .language-list')[0].outerHTML);
    headerNavbar.append($('#header .header-right .text-hotline')[0].outerHTML);
    headerNavbar.find('.language-list .icon-checkmark').remove();
    headerNavbar.find('.language-list li a').prepend('<span class="radio-icon"></span>');
  }
  var iconHotline = headerNavbar.find('.text-hotline .icon-hotline');
  if (iconHotline) {
    iconHotline.insertBefore(headerNavbar.find('.text-hotline .value'));
  }
  
  if ($('#header .profile-group').length > 0) {
    headerNavbar.append($('#header .header-right').html());
  }
  
  $('#header .menu-icon-open').click(function () {
      $('#header_navbar').addClass('show');
  });
  $('#header .menu-icon-close').click(function () {
      $('#header_navbar').removeClass('show');
  });

  $('.back-btn').click(function (e) {
    e.preventDefault();
    history.back();
  });
  
  var KEY_LEFT = 8, KEY_BACKSPACE = 37;
  $('.input-otps .input-otp').on('keyup', function (e) {
    var _this = $(this);
    if (e.keyCode === KEY_LEFT || e.keyCode === KEY_BACKSPACE) {
      var prev = _this.prev('input');
      if (prev.length > 0) {
        prev.select();
      }
    } else {
      var next = _this.next('input');
      if (next.length > 0) {
        next.select();
      }
    }
  });
  
  $('.input-otps .input-otp').on('focus', function (e) {
    $(this).attr('placeholder', '_');
    $(this).select();
  });
  
  $('.input-otps .input-otp').on('blur', function (e) {
    $(this).removeAttr('placeholder');
  });
  
  $('.input-upload').click(function () {
    var uploadBox = $(this).closest('.upload-box');
    uploadBox.find('.preview-upload-img').removeClass('d-none');
    uploadBox.find('.preview-video').addClass('d-none');
    uploadBox.find('.recording-video').addClass('d-none');
    uploadBox.find('.video-desc').addClass('d-none');
  });

  $('.input-upload').change(function () {
    var file = $(this)[0].files[0];
    var url = URL.createObjectURL(file);
    var uploadBox = $(this).closest('.upload-box');
    uploadBox.find('.preview-upload-img').attr('src', url);
    uploadBox.find('.preview-img-info').html(file.name + ' ('+ (file.size/1024).toFixed(2) +' Kb)');
  });
  
  function gotoStep(targetContent, direct) {
    var stepsProgress = $('.step-progress[data-content="'+ targetContent +'"]');
    var currStep = stepsProgress.find('.step.active');
    var currIndex = currStep.index();
    var nextStep = currStep.next('.step');
    var prevStep = currStep.prev('.step');

    var stepsContent = $(targetContent);
    var currStepContent = stepsContent.find('.step-content').eq(currIndex);
    var nextStepContent = currStepContent.next('.step-content');
    var prevStepContent = currStepContent.prev('.step-content');

    if (direct === 'next') {
      if (nextStep.length > 0) {
        stepsProgress.find('.step').removeClass('active');
        nextStep.addClass('active');

        currStepContent.hide('slide', {direction: 'left'}, 100, function () {
          nextStepContent.show('slide', {direction: 'right'}, 200);
        });
      }
    }

    if (direct === 'back') {
      if (prevStep.length > 0) {
        stepsProgress.find('.step').removeClass('active');
        prevStep.addClass('active');

        currStepContent.hide('slide', {direction: 'right'}, 200, function () {
          prevStepContent.show('slide', {direction: 'left'}, 200);
        });
      } else {
        history.back();
      }
    }
  }
  
  $('.btn-step').click(function (e) {
    e.preventDefault();
    var targetContent = $(this).data('content');
    var direct = $(this).data('direct');

    gotoStep(targetContent, direct);
  });
  
  var identifyVideo = null;
  
  $('.open-camera-btn').click(function (e) {
    e.preventDefault();
    var uploadBox = $(this).closest('.upload-box');
    var elPreviewVideo = uploadBox.find('.preview-video');
    elPreviewVideo.removeClass('d-none');
    uploadBox.find('.preview-upload-img').addClass('d-none');
    var elRecording = uploadBox.find('.recording-video');
    elRecording.addClass('d-none');

    var previewVideo = elPreviewVideo[0];
    var recording = elRecording[0];
    var recordingTimeMS = 5000;
    
    identifyVideo = null;
    
    navigator.mediaDevices.getUserMedia({
      video: true,
    }).then(stream => {
      previewVideo.srcObject = stream;
      uploadBox.find('.video-desc').removeClass('d-none');

      previewVideo.captureStream = previewVideo.captureStream || previewVideo.mozCaptureStream;
      return new Promise(resolve => previewVideo.onplaying = resolve);
    })
    .then(() => startRecording(previewVideo.captureStream(), recordingTimeMS))
    .then (recordedChunks => {
      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      identifyVideo = recordedBlob;
      recording.src = URL.createObjectURL(recordedBlob);

      console.log("Successfully recorded " + recordedBlob.size + " bytes of " + recordedBlob.type + " media.");

      stopRecord(previewVideo.srcObject);
    })
    .catch(function (e) {
      console.log('error', e);
      alert('Device not support camera');
    });
  });
  
  function startRecording(stream, lengthInMS) {
    let recorder = new MediaRecorder(stream);
    let data = [];

    recorder.ondataavailable = event => data.push(event.data);
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = event => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(
      () => recorder.state == "recording" && recorder.stop()
    );

    return Promise.all([
      stopped,
      recorded
    ])
    .then(() => data);
  }
  
  function wait(delayInMS) {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
  }
  
  function stopRecord(stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  
  /*$('.identify-form').submit(function () {
    var form = $(this);
    var passportFile = form.find('input[name="passport_file"]')[0].files[0];
    var identifyImage = form.find('input[name="identify_image"]')[0].files[0];
    var identifyBlob = identifyVideo || null;

    var formData = new FormData();
    formData.append('passport_file', passportFile);
    formData.append('identify_image', identifyImage);
    formData.append('identify_video', identifyBlob);
    
    console.log('formData', formData);
    
    $.ajax({
      url: form.attr('action'),
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        console.log('success');
      },
      error: function (e) {
        console.log('error', e);
      },
      complete: function () {
        
      },
    });
    return false;
  });*/
  
  var elCountdown = $('.countdown');
  var cdMinute = elCountdown.find('.minute');
  var cdSecond = elCountdown.find('.second');
  var numCdMin = cdMinute.text() ? parseInt(cdMinute.text()) : 10;
  var numCdSec = cdSecond.text() ? parseInt(cdSecond.text()) : 0;
  var countdownInterval = setInterval(function () {
    if (numCdMin < 1 && numCdSec < 1) {
      clearInterval(countdownInterval);
    }

    if (numCdSec === 0) {
      numCdMin--;
      numCdSec = 60;
    }
    numCdSec--;
    
    cdMinute.text(numCdMin < 10 ? '0' + numCdMin : numCdMin);
    cdSecond.text(numCdSec < 10 ? '0' + numCdSec : numCdSec);
  }, 1000);
  
  $('.input-num-format').blur(function () {
    var value = $(this).val();
    if (value) {
      value = value.replace(/[^0-9]+/g, "");
      if (value) {
        value = Intl.NumberFormat('vi-VN').format(value);
      }
      $(this).val(value);
    }
  });

})(jQuery);


