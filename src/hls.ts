import express from 'express'
import path from 'path'
// import HLSServer from 'hls-server'
const port = 8000
const app = express()

app.use('/', express.static(path.join(process.cwd(), './html')))

app.use('/videos', express.static(path.join(process.cwd(), './videos')))
app.use('/movies', express.static(path.join(process.cwd(), './movies')))

app.listen(port, () => {
  console.log(`started at port ${port}`)
})
