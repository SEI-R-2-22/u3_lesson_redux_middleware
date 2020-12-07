# Redux Middleware

## Getting Started

- Fork and Clone

- npm install

- npm run setup

- npm run dev

- open a new terminal and cd into the client directory

- npm install

- npm start

## What is Middleware In Redux

With redux, every operation we perform must be `synchronous` which means that we must execute things inline. Take `async` promises for example, the function runs and `awaits` for a response, this is an antipattern in Redux and will give you an error. However, utilizing middleware we can break these rules and perform asynchronous tasks in our actions. To do this we'll utilize a package called `redux-thunk`.

> By default, Redux’s actions are dispatched synchronously, which is a problem for any non-trivial app that needs to communicate with an external API or perform side effects. Redux also allows for middleware that sits between an action being dispatched and the action reaching the reducers.

> Thunk is a programming concept where a function is used to delay the evaluation/calculation of an operation.

> Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store’s dispatch method, which is then used to dispatch regular synchronous actions inside the function’s body once the asynchronous operations have been completed.

## Applying Middleware to our Applications

Start by installing Redux Thunk in the client directory:

```sh
npm install redux-thunk
```
