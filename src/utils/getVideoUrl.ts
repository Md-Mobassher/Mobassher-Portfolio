// Function to extract YouTube video ID from URL
export const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to extract Vimeo video ID from URL
export const getVimeoVideoId = (url: string) => {
  const regExp = /vimeo\.com\/([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// Function to get embed URL based on video platform
export const getEmbedUrl = (videoUrl: string) => {
  const youtubeId = getYouTubeVideoId(videoUrl);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  const vimeoId = getVimeoVideoId(videoUrl);
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}`;
  }

  return videoUrl; // Return original URL if not recognized
};
