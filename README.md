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

We'll need to tell redux to apply our middleware, start by importing `applyMiddleware` from `redux` in `store/index.js`:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
```

Now we need to import `redux-thunk`:

```js
import thunk from 'redux-thunk'
```

Let's add redux thunk to our application, modify the `createStore` function:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import DepartmentReducer from './reducers/DepartmentReducer'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({
    departmentState: DepartmentReducer
  }),
  applyMiddleware(thunk)
)

export default store
```

Redux Thunk is now successfully integrated into our app!

## Making Asynchronous Calls In Redux

Now that redux thunk is integrated as middleware, we can start making requests to our api.

In the `DepartmentActions.js` let's create a new action called `getDepartments`:

```js
export const getDepartments = () => async (dispatch) => {}
```

Notice the different syntax here for our action, we're defining a function and then returning an `asynchronous` function with dispatch being passed as an argument. Remember `dispatch` comes from redux in order to execute our state update.

Let's add a `try/catch` block to this function:

```js
export const getDepartments = () => async (dispatch) => {
  try {
  } catch (error) {
    throw error
  }
}
```

Let's make a request to the api utilizing the `GetDepartments` function being imported for you:

```js
export const getDepartments = () => async (dispatch) => {
  try {
    const departments = await GetDepartments()
    console.log(departments)
  } catch (error) {
    throw error
  }
}
```

We won't be updating any state just yet, we still need to test our action to ensure it's working correctly. In the `Departments.js` file in `components`, import this `getDepartments` function:

```js
import { getDepartments } from '../store/actions/DepartmentActions'
```

Let's add it to `mapDispatchToProps`:

```js
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartments: () => dispatch(getDepartments())
  }
}
```

Now we have access to this function via `props`. Because this is an api request, we'll want to call this when ever our component mounts, let's import `useEffect` from `react`:

```js
import React, { useEffect } from 'react'
```

Now set up a `useEffect` that involes the `fetchDepartments` function:

```js
useEffect(() => {
  props.fetchDepartments()
}, [])
```

Refresh the browser and check your developer console, you should see an array of data being logged.

Let's get this information into state, in the `DepartmentActions.js` file, we'll dispatch a `type` with a `payload` to update our state, add the following below the `departments` variable:

```js
dispatch({
  type: GET_DEPARTMENTS,
  payload: departments
})
```

Here's the final function:

```js
export const getDepartments = () => async (dispatch) => {
  try {
    const departments = await GetDepartments()
    dispatch({
      type: GET_DEPARTMENTS,
      payload: departments
    })
  } catch (error) {
    throw error
  }
}
```

Now great, this works, but what if we forgot to set it up correctly initially?

Modify `getDepartments` to look like the following:

```js
export const getDepartments = async (dispatch) => {
  try {
    const departments = await GetDepartments()
    dispatch({
      type: GET_DEPARTMENTS,
      payload: departments
    })
  } catch (error) {
    throw error
  }
}
```

You should see the following error message:

**`Error: Actions must be plain objects. Use custom middleware for async actions.`**

The reason being for this is that Redux is looking for objects to be returned to update our state, however the minute we start doing asynchronous tasks, our function now returns a promise instead of an object, thats where `redux-thunk` comes in. It essentially pauses our state update momentarily while the promise is resolved. Once the promise resolves we `dispatch` the update to our reducer.

Revert your function back to the below:

```js
export const getDepartments = () => async (dispatch) => {
  try {
    const departments = await GetDepartments()
    dispatch({
      type: GET_DEPARTMENTS,
      payload: departments
    })
  } catch (error) {
    throw error
  }
}
```

As long as you are not performing asynchronous operations, you can use the normal Redux action syntax:

```js
const someAction = () => ({
  type: 'SOME_TYPE',
  payload: somePayload
})
```

## You Do

Now that we've covered redux actions and redux thunk, it's time to put it into practice:

- Create a new component called `Products`, this component should have access to our redux store. Replace the function in the `component` prop in the `Route` in app.js with your `Products` component.

- When this component mounts we want to get department by id and store its products in state.

- Create a Product Reducer, you should store an array of products in state. Make sure to create a type and have a default case for this reducer.

- Create a new department action that retrieves the department's products, a function has been imported for you.

- Make sure to `dispatch` the information into state.

- You'll want to add make sure the function is accessible as `props` in your `Products` component.

- You're able to access the department's id through the address bar utitilizing `props.match.params.id`.

- You'll want to `observe` the id in the address bar for changes, make sure to add it to the `useEffect` dependency array.

If everything was done correctly, you should see a new list of products every time you click on a new department.
