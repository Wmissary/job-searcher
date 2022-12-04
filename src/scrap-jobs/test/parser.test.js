// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";

import parseResponse from "../parser/index.js";

test("parseResponse function", async () => {
  const response = {
    headers: {
      get: (header) => {
        if (header === "content-type") {
          return "application/rss";
        }
      },
    },
    text: () => "<xml>test</xml>",
  };
  const result = await parseResponse(response);
  console.log(response);
  console.log(result);
  assert.deepStrictEqual(result, {
    xml: "test",
  });
});
