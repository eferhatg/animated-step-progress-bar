$(document).ready(function() {
  $("input[name='shipment']").change(function(e) {
    animateProgress(parseInt($(this).val(), 10));
  });
});

function delivery(lastStep, color, faIcon, text) {
  this.lastStep = lastStep;
  this.color = color;
  this.faIcon = faIcon;
  this.text = text;
  return this;
}

function createDelivery(n) {
  switch (n) {
    case 0:
      return this.delivery(
        0,
        "#ff9900",
        "fa-truck-loading",
        "Gönderi Kabulu Yapıldı."
      );
    case 1:
      return this.delivery(
        1,
        "#F1C232",
        "fa-warehouse",
        "Teslim Bölgesine Sevk Edildi."
      );
    case 2:
      return this.delivery(
        2,
        "#FFFF00",
        "fa-shipping-fast",
        "Dağıtıma Çıkarıldı."
      );
    case 3:
      return this.delivery(
        3,
        "#4A86E8",
        "fa-comment-alt",
        "Not Ziyaret Girildi."
      );
    case 4:
      return this.delivery(3, "#6aa84f", "fa-smile-wink", "Teslim Edildi.");
    case 5:
      return this.delivery(3, "#CC0000", "fa-sync-alt", "İade İşlemi Yapıldı.");
    case 6:
      return this.delivery(
        3,
        "#434343",
        "fa-umbrella",
        "Hasar Kayıp İşlemi Yapıldı."
      );
    default:
      return;
  }
}

function animateProgress(n) {
  let delivery = this.createDelivery(n);

  $(".bar").attr("class", "bar");
  $(".circle").attr("class", "circle");
  $(".bar").attr("style", "");
  $(".circle").attr("style", "");
  $(".circle:nth-of-type(1)").addClass("done");
  $("#result-icon").attr("class", "fa fa-question-circle");
  $("#result-text").html("Son Durum");
  stepper(delivery, 0);
}

function finishStepper(delivery) {
  setTimeout(function() {
    $(".circle").removeClass("yellow");
    $(".bar").css(
      "background",
      "linear-gradient(to right, " +
        delivery.color +
        ", " +
        delivery.color +
        ")"
    );
    $(".done").css("background-color", delivery.color);
    $(".done").css("color", delivery.color);
    if (delivery.lastStep > 2) {
      $("#result-icon").attr("class", "fa " + delivery.faIcon);
      $("#result-text").html(delivery.text);
    }
  }, 600);
}

function stepper(delivery, counter) {
  if (counter === delivery.lastStep) {
    finishStepper(delivery);
    return;
  }

  counter++;

  if (counter > 3) counter = delivery.lastStep;
  setTimeout(function() {
    step(counter);
    stepper(delivery, counter);
  }, 600);
}

function step(n) {
  switch (n) {
    case 1:
      $(".bar").addClass("one-third");
      $(".bar").removeClass("full");
      $(".circle:nth-of-type(1)").addClass("yellow");
      $(".circle:nth-of-type(2)").addClass("done");
      break;
    case 2:
      $(".bar").addClass("two-third");
      $(".bar").removeClass("one-third");
      $(".circle:nth-of-type(2)").addClass("yellow");
      $(".circle:nth-of-type(3)").addClass("done");
      break;
    case 3:
      $(".bar").addClass("full");
      $(".bar").removeClass("two-third");
      $(".circle:nth-of-type(3)").addClass("yellow");
      $(".circle:nth-of-type(4)").addClass("done");
      break;
    default:
      break;
  }
}
