# Redux Middleware

![Cersei](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FFMQ1jRXFeoMco%2Fgiphy.gif&f=1&nofb=1)

## Getting Started

- `fork` and `clone`
- `npm install` to install our dependencies
- `npm run setup` to create and migrate our database
- `npm run dev` to spin up our backend
- In a new terminal, `cd` into the client directory
- `npm install` to install our dependencies
- `npm start` to spin up our frontend

## What is Middleware In Redux?

With Redux, every operation we perform must be `synchronous`, which means that each function must return somethnig right away _(No Waiting!)_. Take `async` promises for example, the function runs and `awaits` for a response, this is an anti-pattern in Redux and will give you an error. However, utilizing middleware, we can break these rules and perform asynchronous tasks in our actions. To do this we'll utilize a package called `redux-thunk`.

> By default, Redux’s actions are dispatched synchronously, which is a problem for any non-trivial app that needs to communicate with an external API or perform side effects. Redux also allows for middleware that sits between an action being dispatched and the action reaching the reducers.

> Thunk is a programming concept where a function is used to delay the evaluation/calculation of an operation.

> Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store’s dispatch method, which is then used to dispatch regular synchronous actions inside the function’s body once the asynchronous operations have been completed.

![Tyrion](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcopyhackers.com%2Fwp-content%2Fuploads%2F2016%2F11%2FGame-of-Thrones-Tyrion-Pour-Wine.gif&f=1&nofb=1)

## Services

On the frontend, inside our `src` directory, we have a directory called `services`. A "Service" is a file that contains a group of functions that handle the axios call for a particular endpoint. You should typically group and name service files by the endpoint they interact with. We are creating a Client in our services/index.js file, and importing into here to use

In this example, we have a file called `DepartmentService`. Its job is to handle all of our axios calls for our departments endpoint. Take a look:

```javascript
import Client from './'

export const GetDepartments = async () => {
  try {
    const res = await Client.get('/departments')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetDepartmentProducts = async (departmentId) => {
  try {
    const res = await Client.get(`/departments/${departmentId}`)
    return res.data.Products
  } catch (error) {
    throw error
  }
}
```

A "Service" creates a copy of axios and configures it for our particular need. Then we use that copy to make different requests. This prevents us from having to repeatedly make similar axios calls locally all throughout our app. We let our Service do it for us. Take a look at the diagram below:

![Services](https://i.imgur.com/7qIwymz.png)

## Applying Middleware to our Applications

Start by installing Redux Thunk in the client directory:

```sh
npm install redux-thunk redux-devtools-extension
```

We'll need to tell redux to apply our middleware, start by importing `applyMiddleware` from `redux` in `store/index.js`:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
```

Now we need to import `redux-thunk`:

```js
import thunk from 'redux-thunk'
```


## Why Do We Need This?

With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extends the store's abilities, and lets you write async logic that interacts with the store.

Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.

ComposeWithDevTools and ApplyMiddleWare are doing exactly what their names imply: taking control of our DOM and state management, using a premade set of instructions to maintain our multiple state-changing functions.

Let's add Redux Thunk to our application, modify the `createStore` function:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import DepartmentReducer from './reducers/DepartmentReducer'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({
    departmentState: DepartmentReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
```



Redux Thunk is now successfully integrated into our app!

![Hodor](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FzeJG0HbeWZCSs%2Fgiphy.gif&f=1&nofb=1)

## Making Asynchronous Calls In Redux

Now that Redux Thunk is integrated as middleware, we can start making requests to our API.

In the `DepartmentActions.js` of our Store, let's create a new action called `LoadDepartments`:

```js
export const LoadDepartments = () => {
  return async (dispatch) => {}
}
```

Notice the different syntax here for our action: we're defining a function and then returning an `asynchronous` function with dispatch being passed as an argument. Remember, `dispatch` comes from Redux in order to execute our state update.

Let's add a `try/catch` block to this function:

```js
export const LoadDepartments = () => {
  return async (dispatch) => {
    try {
    } catch (error) {
      throw error
    }
  }
}
```

Let's make a request to the API utilizing the `GetDepartments` function being imported for you:

```js
export const LoadDepartments = () => {
  return async (dispatch) => {
    try {
      const departments = await GetDepartments()
      console.log(departments)
    } catch (error) {
      throw error
    }
  }
}
```

We won't be updating any state just yet, we still need to test our action to ensure it's working correctly. In the `Departments.js` file in `components`, import this `getDepartments` function:

```js
import { LoadDepartments } from '../store/actions/DepartmentActions'
```

Let's add it to `mapDispatchToProps`:

```js
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartments: () => dispatch(LoadDepartments())
  }
}
```

Now we have access to this function via `props`. Because this is an API request, we'll want to call this whenever our component mounts, let's import `useEffect` from `react`:

```js
import React, { useEffect } from 'react'
```

Now set up a `useEffect` that involves the `fetchDepartments` function:

```js
useEffect(() => {
  props.fetchDepartments()
}, [])
```

Refresh the browser and check your developer console, you should see an array of data being logged.

Let's get this information into state. In the `DepartmentActions.js` file, we'll dispatch a `type` with a `payload` to update our state. Add the following below the `departments` variable:

```js
dispatch({
  type: GET_DEPARTMENTS,
  payload: departments
})
```

Here's the final function:

```js
export const LoadDepartments = () => {
  return async (dispatch) => {
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
}
```

![Night King](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fperezhilton.com%2Fwp-content%2Fuploads%2F2016%2F05%2Fgame-of-thrones-nights-king.gif&f=1&nofb=1)

Great! This works, but what if we forgot to set it up correctly initially?

Modify `LoadDepartments` to look like the following:

```js
export const LoadDepartments = async (dispatch) => {
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

The reason being for this is that Redux is looking for objects to be returned to update our state. However, the minute we start doing asynchronous tasks, our function now returns a promise instead of an object, thats where `redux-thunk` comes in. It essentially pauses our state update momentarily while the promise is resolved. Once the promise resolves, we `dispatch` the update to our reducer.

Revert your function back to the below:

```js
export const LoadDepartments = () => {
  return async (dispatch) => {
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
}
```

As long as you are not performing asynchronous operations, you can use the normal Redux action syntax:

```js
const someAction = () => ({
  type: 'SOME_TYPE',
  payload: somePayload
})
```

![Hot Pie](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.pastemagazine.com%2Fwww%2Farticles%2Fgot-game-of-thrones-30908892-500-281.gif&f=1&nofb=1)

## You Do

Now that we've covered Redux actions and Redux Thunk, it's time to put it into practice:

- Create a new component called `Products`. This component should have access to our Redux store. Replace the function in the `component` prop in the `Route` in **App.js** with your `Products` component.
  - When this component mounts, we want to get department by id and store its products in state.
- Create a Product Reducer. You should store an array of products in state. Make sure to create a type and have a default case for this reducer. Don't forget to add it to your store!
- Create a new department action that retrieves the department's products. A function has been imported for you.
  - Make sure to `dispatch` the information into state.
  - You'll want to add make sure the function is accessible as `props` in your `Products` component.
- You're able to access the department's id through the address bar utitilizing `props.match.params.id`. HINT: You're going to want to use this id and pass it to your action, which will in turn be passed to the `GetDepartmentProducts` as an argument.
- You'll want to `observe` the id in the address bar for changes. Make sure to add it to the `useEffect` dependency array.

If everything was done correctly, you should see a new list of products every time you click on a new department.

![Tormund](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnerdist.com%2Fwp-content%2Fuploads%2F2016%2F05%2Ftumblr_o7lap4DOU31vuvjq6o4_500.gif&f=1&nofb=1)

## Recap

In this lesson, we learned about Redux Thunk and how we can use this middleware to break up Redux's default synchronous behavior. We created a department store where we could view each department and it's related products.
