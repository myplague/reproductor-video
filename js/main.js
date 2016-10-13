var video = $("video")[0];


function sizeControls() {
    var videoWidth = $("video").width();
    $("#video-controls").css("width", videoWidth + "px");
    console.log(videoWidth);
}

window.onload = sizeControls
window.onresize = sizeControls;
video.addEventListener("loaddata",function(){
  setTimeout(sizeControls,100);
});
loadState();



$("#backward").click(function() {

    if (!video.paused) {
        video.currentTime = Math.max(0, video.currentTime - 10);
    }
})

$("#forward").click(function() {

    if (!video.paused) {
        video.currentTime = Math.max(0, video.currentTime + 10);
    }
})
$("#slower").click(function() {
    video.playbackRate -= 0.25;

})
$("#faster").click(function() {
    video.playbackRate += 0.25;

})
$("#load-video").click(function(){
  if(!$("#next-video").val())
  return;
  video.src = $("#next-video").val();
});

function saveState(){
  localStorage.setItem("last-played",video.src);
  localStorage.setItem("last-location",video.currentTime);
}
setInterval(saveState,1000);

function loadState(){
  if(!localStorage.getItem("last-played")|| !localStorage.getItem("last-location"))
  return;
  video.src = localStorage.getItem("last-played");
  video.play()
  .then(()=>video.currentTime = localStorage.getItem("last-played"))
  .then(()=>video.pause());
}
