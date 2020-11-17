const TaskManager = require('./TaskManager');
const puppeteer = require('../../test/initialize').puppeteer
let page =require('../../test/initialize').page
let browser =require('../../test/initialize').browser
const playwright = require('../../test/initialize');

describe('TaskManager', () => {
  let taskManager;
  const URL = 'https://brimo.wtid.dev/registration?step=1&token=6aa10b3e9f1482e49b7eb716b8a1a174'
  
  beforeEach(()=> {
      taskManager = new TaskManager();

  })

  test('should have an empty array upon instantiation', async() => {
      expect(taskmanager.taskList).toEqual([]);
  },3600000)
})