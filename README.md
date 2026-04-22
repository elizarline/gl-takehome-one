# gl-takehome summary
This repo stores UI and API tests for the noted test site and endpoints linked below

**Contents**
[Running UI Tests](#running-ui-tests)
[Running API Tests](#running-api-tests)
[Purpose of Repo](#What-needs-are-met-in-this-repository)

------------------
# Running UI Tests
E2E UI tests utilize Playwright

**Prerequisites** 
— `npm install` and `npx playwright install` (note: Chromium is the default)

**Run the tests**
- Running all tests - `npx playwright test`
- Running a specific spec file — one command per spec (login, menu, inventory-item, cart)
- Viewing the HTML report — `npx playwright show-report`

**Useful Playwright docs**
- [Running & debugging tests](https://playwright.dev/docs/running-tests)
- [Test configuration](https://playwright.dev/docs/test-configuration)
- [CLI](https://playwright.dev/agent-cli/installation)

--------------------
# Running API Tests
See [api-tests.md](https://github.com/elizarline/gl-takehome-one/edit/main/api-tests.md)

--------------------
# What needs are met in this repository

**Use Case One**
- Target Application: Swag Labs ([https://www.saucedemo.com/](https://www.saucedemo.com/))  
- Objective: Using Playwright, design and implement an automated UI test suite for the application. JavaScript or TypeScript is preferred, but you may use another language supported by Playwright if you're more experienced with it. Your goal is to identify and validate the user-facing behaviors you consider most critical based on your analysis of the system.  
- Deliverables:  
  - A Git repository containing your automation project  
  - A short document (flows.txt or flows.xlsx) with the automated test scenarios you selected, located at the repository root  
  - Clear instructions on how to run the tests (e.g., via a README or equivalent)

**Use Case Two**
- Target API: Swagger Petstore ([https://petstore.swagger.io/#/](https://petstore.swagger.io/#/))  
- Objective: Using any API testing framework (e.g., Jest or Playwright excluding tools like Postman), preferably with JavaScript or TypeScript, design and implement automated API tests for the Pet endpoints from Petstore. You may use another programming language if you're more comfortable with it. You are expected to analyze the API and decide which scenarios to automate, how much coverage is appropriate, and how to structure your solution. Focus on demonstrating your testing approach and decision-making rather than covering every possible case.  
- Deliverables:  
  - Add an api/ folder in the same repo as the UI tests  
  - Automated API tests  
  - api-tests.md (or .txt) including: tools/frameworks used, how to run (1-2 commands), and what you covered (endpoints + tests)


