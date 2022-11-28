import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { XMLParser } from "fast-xml-parser";

function parseXMLtoJson(xml) {
  const parser = new XMLParser();
  return parser.parse(xml);
}

async function fileExist(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function readJSONFile(path) {
  try {
    const data = await fs.readFile(path);
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error);
  }
}

async function writeJSONFile(data, path) {
  try {
    const json = JSON.stringify(data, undefined, 2);
    await fs.writeFile(path, json);
  } catch (error) {
    throw new Error("Error writing file", error);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export {
  parseXMLtoJson,
  writeJSONFile,
  readJSONFile,
  fileExist,
  __dirname,
  __filename,
};
