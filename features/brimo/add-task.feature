Feature: Add Task
    In order to remember a Task
    As a user
    I want to be able to add a task to our task list 

    Scenario: Max wants to add a task
        Given Max has a task list
        When max adds the task "buy oat milk"
        Then "buy oat milk" should be in the task list