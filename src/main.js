import path from "node:path";
import { fileURLToPath } from "node:url";

import * as dotenv from "dotenv";
dotenv.config();

import updateJobsData from "./jobs.js";
import sendEmail from "./email.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kPathJobsData = path.join(__dirname, "..", "jobs.json");
const { newJobs } = await updateJobsData(kPathJobsData);

if (newJobs.length > 0) {
  const subject = `There are ${newJobs.length} new jobs posted`;
  const jobs = newJobs.map(
    (job) => `<ul>
                <li>Titre: ${job.title}</li>
                <li>Entreprise: ${job.company}</li>
                <li>Ville: ${job.location}</li>
                <li>Lien: ${job.url}</li>
              </ul>`
  );
  const message = `<h1>${subject}</h1>
                  <div> ${jobs.join("\n")} </div>`;

  sendEmail([process.env.EMAIL], subject, message);
}

const kNumber5minutes = 5 * 60 * 1000;

setInterval(async () => {
  const newJobs = await updateJobsData(kPathJobsData);
  if (newJobs.length > 0) {
    const subject = `There are ${newJobs.length} new jobs posted`;
    const jobs = newJobs.map(
      (job) => `<ul>
                <li>Titre: ${job.title}</li>
                <li>Entreprise: ${job.company}</li>
                <li>Ville: ${job.location}</li>
                <li>Lien: ${job.url}</li>
              </ul>`
    );
    const message = `<h1>${subject}</h1>
                  <div> ${jobs.join("\n")} </div>`;

    sendEmail([process.env.EMAIL], subject, message);
  }
}, kNumber5minutes);
