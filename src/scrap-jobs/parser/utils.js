import { XMLParser } from "fast-xml-parser";

export function parseXMLtoJson(xml) {
  const parser = new XMLParser();
  return parser.parse(xml);
}
