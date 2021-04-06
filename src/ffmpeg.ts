import ffmpeg from 'fluent-ffmpeg'
import ffmpeginstaller from '@ffmpeg-installer/ffmpeg'

ffmpeg.setFfmpegPath(ffmpeginstaller.path)

ffmpeg('../movies/Teen.Titans.Go!.To.The.Movies.2018.1080p.WEBRip.x264-[YTS.AM].mp4', {
  timeout: 432000,
})
  .addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls',
  ])
  .output('videos/teentitans.m3u8')
  .on('end', () => {
    console.log('end bitch')
  })
  .run()
