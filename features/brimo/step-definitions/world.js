const {setWorldConstructor} = require('cucumber');
const TaskManager = require ('../../../src/core/TaskManager');

class World {
    constructor() {
        this.taskManager = new TaskManager;
    }
}

setWorldConstructor(World)