import { readFileSync, writeFileSync } from 'fs'
import { resolve as getFullPath, join } from 'path'
import fg from "fast-glob"

const baseFolder = getFullPath('files')
const contentFile = "songlist.json"

const files = await fg(["**/*.crd"], {
	onlyFiles: true,
	cwd: baseFolder
})

const getTitle = file => {
	const content = readFileSync(join(baseFolder, file)).toString()
	console.log("testing", file)

	const [, title = file.slice(file.indexOf("/") + 1)] = content.match(/.*\{Title:\s*(?<title>.*)\}/i) ?? []

	console.log("found", title)

	return title
}

const output = files.map(file => {
	const title = getTitle(file)

	return {
		filename: file,
		title: title
	}
})

writeFileSync(join(baseFolder, contentFile), JSON.stringify(output, undefined, 2))