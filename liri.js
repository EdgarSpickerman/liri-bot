const logic = require("./helpers/logic");
const validCommands = require("./data/commands")

const liri = {
  state: {},
  print: (data) => console.log(data),
  setQuery: function (query) {
    this.state.query = query
  },
  setCommand: function (command) {
    this.state.command = command;
  },
  captureInput: function () {
    [node, script, command, ...query] = process.argv
    this.setCommand(command);
    this.setQuery(query.join(" "))
  },
  makeCall: function (command, query) {
    logic.executeCommand(command, query)
      .then(data => logic.transformData(data, command))
      .then(data => this.print(data))
      .catch(error => this.print(error))
  },
  start: function () {
    this.captureInput()
    if (logic.validateCommands(this.state.command, validCommands)) {
      return this.makeCall(this.state.command, this.state.query)
    } else return this.print("invalid command")
  }
}
liri.start();