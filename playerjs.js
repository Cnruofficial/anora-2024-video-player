document.addEventListener('DOMContentLoaded', () => {
  const player = new Plyr('#player', {
    fullscreen: {
      enabled: true,
      fallback: true,
      iosNative: false
    },
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'fullscreen'
    ],
    keyboard: {
      focused: true,
      global: true
    }
  });

  const video = document.querySelector('#player');
  video.addEventListener('click', () => {
    if (!player.paused) {
      player.pause();
    } else {
      player.play();
    }
  });

  let lastTap = 0;
  video.addEventListener('dblclick', (e) => {
    const now = new Date().getTime();
    const timeSinceLastTap = now - lastTap;

    if (timeSinceLastTap < 600 && timeSinceLastTap > 0) {
      const rect = video.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const halfWidth = rect.width / 2;

      if (clickX < halfWidth) {
        player.currentTime = Math.max(0, player.currentTime - 5);
      } else {
        player.currentTime = player.currentTime + 5;
      }
    }
    lastTap = now;
  });

  player.on('enterfullscreen', () => {
    document.querySelector('.video-container').style.borderRadius = '0';
  });

  player.on('exitfullscreen', () => {
    document.querySelector('.video-container').style.borderRadius = '10px';
  });
});
