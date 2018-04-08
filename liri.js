const logic = require("./helpers/logic");

const liri = {
  state: {},
  printObjectProps:(obj)=>{
    Object.keys(obj)
      .forEach(key=>console.log(`${key}: ${obj[key]}`))
  },
  print:function(data){
    if(data.length) return data.forEach(obj=>this.printObjectProps(obj))
    this.printObjectProps(data);
  },
  setQuery: function (query){ this.state.query = query },
  setCommand: function (command) { this.state.command = command },
  captureInput: function () {
    [node, script, command, ...query] = process.argv
    this.setCommand(command);
    this.setQuery(query.join(" "))
  },
  makeCall: function (command, query) {
    logic.executeCommand(command, query)
      .then(data => this.print(data))
      .catch(error => this.print(error))
  },
  start: function () {
    this.captureInput();
    if(!logic.validateCommands(this.state.command,logic.validCommands)){
      return this.print("invalid command")
    } else this.makeCall(this.state.command, this.state.query)
  }
}
liri.start();