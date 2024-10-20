import { parseBuffer } from 'music-metadata'
import { readdir } from "node:fs/promises";
import { join } from 'node:path';

async function listFiles(directory: string) {
  const fileNames:string[] = await readdir(directory)
  const filePaths = fileNames.map((fileName) => join(directory, fileName))
  return filePaths
}

async function loadSounds() {
  const filePaths = await listFiles('./public/sounds')

  const sounds = filePaths.map(async (filePath: string) => {
    const file = Bun.file(filePath);
    const arrbuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrbuf);
    const tags = await parseBuffer(buffer)!

    const path = filePath.replace('public/', '')
    const title = tags.common.title ?? ''
    const subtitle = tags.common.artist ?? ''

    return { path, title, subtitle }
  })

  return await Promise.all(sounds)
}

async function generateSoundJSON() {
  const sounds = (await loadSounds())
    .sort((a, b) => a.subtitle.localeCompare(b.subtitle))

  await Bun.write('sounds.json', JSON.stringify(sounds, null, 2));
}

generateSoundJSON()
