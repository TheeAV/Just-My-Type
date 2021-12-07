let sentences = [
  "alex is the most best big man fun time happy guy",
  "alex is the most best big man fun time happy guy",
  "one two three four five six seven eight nine ten",
  "one two three four five six seven eight nine ten",
  "this line is going to be totalled to twelve words got it",
];
let l = 0;
let s = 0;
let currentSentence = sentences[0];
let currentLetter = currentSentence[0];
let cLD = $("#target-letter");
let shift = false;
let mistakes = 0;
let start;
let ending;
$("#keyboard-upper-container").hide();

$(document).keydown(A);
$(document).keyup(A);

$("#sentence").text(currentSentence);
$("#target-letter").text(currentLetter);

function A(e) {
  if (e.shiftKey !== shift) {
    $("#keyboard-lower-container").toggle();
    $("#keyboard-upper-container").toggle();
    shift = e.shiftKey;
  }
}

$(document).on("keypress", function (e) {
  let HL = e.keyCode || e.which;
  $("#" + HL).css("background-color", "red");
  $(document).keyup(function () {
    $("#" + HL).css("background-color", "#f5f5f5");
  });
  let currentSentence = sentences[s];
  let currentLetter = currentSentence[l];
  if (start == undefined) {
    start = e.timeStamp;
  }
  $("#yellow-block").css("left", "+=17.5px");
  l++;
  let nextLetter = currentSentence[l];
  cLD.text(nextLetter);
  if (l < currentSentence.length - 1) {
    if (HL === currentLetter.charCodeAt()) {
      $("#feedback").append('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
    } else {
      $("#feedback").append('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
      mistakes++;
    }
  }
  if (l == currentSentence.length) {
    $("#sentence").empty();
    s++;
    currentSentence = sentences[s];
    $("#sentence").append(sentences[s]);
    l = 0;
    if (s < sentences.length - 1) {
      nextLetter = currentSentence[l];
    }
    cLD.text(nextLetter);
    $("#yellow-block").css({ left: 17 });
    $("#feedback").empty();
  }
  if (s > sentences.length - 1) {
    finish = e.timeStamp;
    let time = finish - start;
    time /= 60000;
    let wpm = Math.round(54 / time - 2 * mistakes);
    $("#target-letter").text("My granny types faster" + wpm + "words per minute");
    setTimeout(function () {
      let replay = confirm("Play again");
      if (replay == true) {
        window.location.reload();
      } else {
        return;
      }
    }, 4000);
  }
});
