export class Service {
  constructor(id, name, description, tasks = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tasks = tasks;
  }
}
