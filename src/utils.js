import fs from "node:fs/promises";

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

export { fileExist, readJSONFile, writeJSONFile };
