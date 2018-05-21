
let audio = new Audio()
let analyser;
let audioCtx, audioSrc;

audio.addEventListener('canplay', function() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioSrc = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
  analyser.connect(audioCtx.destination);
  // audio.play();
  console.log(analyser)
});


audio.crossOrigin = "anonymous";
audio.src = 'https://api.soundcloud.com/tracks/42328220/stream?client_id=b1495e39071bd7081a74093816f77ddb';

export {audio, analyser}
