const {Given,When,Then} = require ('cucumber');
const assert = require('assert');

 Given('Max has a task list', function () {
    // Write code here that turns the phrase above into concrete actions
    assert.deepStrictEqual(this.taskManager.taskList, [])
  });

  When('max adds the task {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('{string} should be in the task list', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });