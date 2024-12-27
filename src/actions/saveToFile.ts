import { fileSaveConfig } from '../config.ts';
import fs from 'node:fs';
import path from 'node:path';

// HACK: to work on windows as well
function removeDuplicateDiskLetter(path: string): string {
	const regex = /^([A-Z]):\\([A-Z]):\\/i;
	return path.replace(regex, '$1:\\');
}

function getProjectRoot(importMetaUrl: string): string {
	const url = new URL(importMetaUrl);
	return removeDuplicateDiskLetter(
		path.resolve(path.dirname(url.pathname), '..', '..'),
	);
}

export async function createOutDir() {
	const rootDir = getProjectRoot(import.meta.url);
	const outDir = path.join(rootDir, fileSaveConfig.outDir);

	try {
		await fs.promises.access(outDir);
	} catch (error: any) {
		await fs.promises.mkdir(outDir, { recursive: true });
	}

	return outDir;
}

export async function saveToFile(content: any) {
	const dir = await createOutDir();
	const fileDir = path.join(dir, fileSaveConfig.fileName);

	await fs.promises.writeFile(fileDir, JSON.stringify(content, null, 2));
	console.log(`Content saved to ${fileDir}`);
}
