// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";

import parseResponse from "../parser/index.js";

test("parseResponse function", async (t) => {
  await t.test("Should parse xml/rss feed", async () => {
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
    assert.deepStrictEqual(result, {
      xml: "test",
    });
  });
  await t.test(
    'throws an error when "content-type" is not supported',
    async () => {
      const response = {
        headers: {
          get: (header) => {
            if (header === "content-type") {
              return "application/json";
            }
          },
        },
      };
      try {
        await parseResponse(response);
      } catch (error) {
        assert.deepStrictEqual(error.message, "Invalid content type");
      }
    }
  );
});
