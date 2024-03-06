import fs from 'fs'
import sharp from 'sharp'

export async function deleteFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export function statFile(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

export function compressImg2Webp(filePath: string, quality: number) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath)
    const data = []
    readStream.on('data', (chunk) => {
      data.push(chunk)
    })
    readStream.on('error', (err) => {
      reject(err)
    })
    readStream.on('end', () => {
      sharp(Buffer.concat(data), { animated: true })
        .webp({ effort: 6, quality })
        .toFile(`${filePath.split('.')[0]}.webp`)
        .then(() => {
          resolve(`${filePath.split('.')[0]}.webp`)
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}
