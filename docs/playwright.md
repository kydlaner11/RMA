## Playwright

### VSCode and project Setup

Follow this instruction to setup playwright in vscode

- Install `Playwright Test For VSCode` extension in VSCode
  - Skip
- Press `ctrl + shift + p` (in linux) then find `Test: Install Playwright`
- Follow the instructions
- Try to run `npx playwright test`

## Generate test

Follow this instruction to record an end-to-end testing

- Go to `vite.config.js`
- Run `npm run start` first then run `npm run e2e:record`
- Do the test in popped up web window
- If done, find `Playwright Inspector` window (try `alt + tab`)
- Copy generated script (Using `copy icon` in top bar or `ctrl + c`, its up to you)
- Create a new file in folder `e2e` with suffix `.spec.js`
- Paste copied script to that file
- To run the test execute `npm run e2e` command

### Useful Commands

- `npx playwright codegen` : Auto generate tests with Codegen.
- `npx playwright test` : Runs the end-to-end tests.
- `npx playwright test --ui` : Starts the interactive UI mode.
- `npx playwright test example` : Runs the tests in a specific file.
- `npx playwright test --debug` : Runs the tests in debug mode.
