import path from 'path'
import express from 'express'
import fs from 'fs'
const app = express()

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/html/video.html')
})

app.use('/static', express.static(path.join(process.cwd(), './html')))
app.use('/videos', express.static(path.join(process.cwd(), './videos')))
app.get('/video', (req, res) => {
  const range = req.headers.range
  if (!range) {
    res.status(400).send('Requires Range Header')
  }
  console.log(range)
  const videoPath = '../movies/Teen.Titans.Go!.To.The.Movies.2018.1080p.WEBRip.x264-[YTS.AM].mp4'
  const videoSize = fs.statSync(videoPath).size

  const CHUNK_SIZE = 10 ** 6
  const start = Number(range?.split('-')[0].split('=')[1])
  //   const start = Number(range?.replace(/\D/g, ''))

  //accomodate apple 100bytes iniital download
  let end = Math.min(start + CHUNK_SIZE, videoSize - 1)
  if (range?.split('-')[1]) {
    end = Number(range?.split('-')[1])
    if (end > videoSize) {
      end = videoSize - 1
    }
  }

  console.log('start', start, 'end', end)
  const contentLength = end - start + 1

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  }
  res.writeHead(206, headers)

  const videoStream = fs.createReadStream(videoPath, { start, end })
  videoStream.pipe(res)
})

app.listen(8000, () => {
  console.log('Server start at port 8000')
})
