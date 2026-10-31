// Turns a YouTube or Vimeo page link into its embed URL. Anything else returns null.
export function toEmbedUrl(link) {
  let url;
  try {
    url = new URL(link);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m)\./, '');
  const [first, second] = url.pathname.split('/').filter(Boolean);

  if (host === 'youtu.be' && first) return `https://www.youtube-nocookie.com/embed/${first}`;
  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const id = url.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(first) ? second : null);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === 'vimeo.com' && /^\d+$/.test(first ?? '')) {
    // Unlisted Vimeo links carry a privacy hash as a second path segment.
    return `https://player.vimeo.com/video/${first}${second ? `?h=${second}` : ''}`;
  }
  if (host === 'player.vimeo.com' && first === 'video' && second) return link;
  return null;
}
