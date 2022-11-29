/* eslint-disable sonarjs/no-duplicate-string */
// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";

import {
  removeAlreadySavedJobs,
  removeExpiredJobs,
  filterJobsData,
} from "../src/jobs.js";

const kArrayJobs = [
  {
    id: "1",
    title: "title1",
    company: "company1",
    location: "location1",
    date: "date1",
    link: "link1",
  },
  {
    id: "2",
    title: "title2",
    company: "company2",
    location: "location2",
    date: "date2",
    link: "link2",
  },
];
const kArraySavedJobs = [
  {
    id: "1",
    title: "title1",
    company: "company1",
    location: "location1",
    date: "date1",
    link: "link1",
  },
  {
    id: "3",
    title: "title3",
    company: "company3",
    location: "location3",
    date: "date3",
    link: "link3",
  },
];

test("removeAlreadySavedJobs", async (t) => {
  await t.test("Should return an array with new jobs ", () => {
    const jobs = kArrayJobs;

    const savedJobs = kArraySavedJobs;

    const result = removeAlreadySavedJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, [kArrayJobs[1]]);
  });

  await t.test("Should return an empty array", () => {
    const jobs = [kArrayJobs[0]];

    const savedJobs = kArraySavedJobs;

    const result = removeAlreadySavedJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, []);
  });

  await t.test("Should return an array with new job", () => {
    const jobs = kArrayJobs;

    const savedJobs = [];

    const result = removeAlreadySavedJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, kArrayJobs);
  });

  await t.test("Should return an empty array", () => {
    const jobs = [];

    const savedJobs = kArraySavedJobs;

    const result = removeAlreadySavedJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, []);
  });

  await t.test("Should return an empty array", () => {
    const jobs = [];

    const savedJobs = [];

    const result = removeAlreadySavedJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, []);
  });
});

test("removeExpiredJobs", async (t) => {
  await t.test('Should return an array without "expired" saved jobs', () => {
    const jobs = kArrayJobs;

    const savedJobs = kArraySavedJobs;

    const result = removeExpiredJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, [kArraySavedJobs[0]]);
  });

  await t.test("Should return an empty savedjobs array", () => {
    const jobs = [];

    const savedJobs = kArraySavedJobs;

    const result = removeExpiredJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, []);
  });

  await t.test("Should return an array with empty saved jobs array", () => {
    const jobs = kArrayJobs;

    const savedJobs = [];

    const result = removeExpiredJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, []);
  });

  await t.test("Should return an array with empty saved jobs array", () => {
    const jobs = [];

    const savedJobs = [];

    const result = removeExpiredJobs(jobs, savedJobs);

    assert.deepStrictEqual(result, []);
  });
});

test("filterJobsData", async (t) => {
  await t.test('Should return an array with "filtered" jobs', () => {
    const jobs = kArrayJobs;

    const savedJobs = kArraySavedJobs;

    const result = filterJobsData(jobs, savedJobs);

    assert.deepStrictEqual(result, {
      newJobs: [kArrayJobs[1]],
      savedJobs: [kArraySavedJobs[0]],
    });
  });

  await t.test("Should return an empty array", () => {
    const jobs = [];

    const savedJobs = kArraySavedJobs;

    const result = filterJobsData(jobs, savedJobs);

    assert.deepStrictEqual(result, {
      newJobs: [],
      savedJobs: [],
    });
  });

  await t.test("Should return an array with empty saved jobs array", () => {
    const jobs = kArrayJobs;

    const savedJobs = [];

    const result = filterJobsData(jobs, savedJobs);

    assert.deepStrictEqual(result, {
      newJobs: kArrayJobs,
      savedJobs: [],
    });
  });

  await t.test("Should return an empty array", () => {
    const jobs = [];

    const savedJobs = [];

    const result = filterJobsData(jobs, savedJobs);

    assert.deepStrictEqual(result, {
      newJobs: [],
      savedJobs: [],
    });
  });
});
