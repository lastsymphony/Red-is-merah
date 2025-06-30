import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    res.status(200).json({
      title: info.videoDetails.title,
      url: format.url,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
}
