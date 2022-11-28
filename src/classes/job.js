export default class Job {
  constructor({ id, title, description, location, company, url, date }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.company = company;
    this.url = url;
    this.date = date;
  }
}
