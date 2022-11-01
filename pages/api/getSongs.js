import path from 'path'
import { promises as fs } from 'fs'

export default async function handler(req, res) {
  const { hymnno } = req.query
  const jsonDirectory = path.join(process.cwd(), 'data')
  const fileContents = await fs.readFile(
    jsonDirectory + '/hymnsdetails.json',
    'utf8'
  )
  const songs = await JSON.parse(fileContents)
  const song = songs.find((d) => d.hymnno == hymnno)
  res.status(200).json(song)
}
