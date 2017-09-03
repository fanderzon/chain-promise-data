# Chain Promise Data
The purpose of this utility is to chain data from a chain of promises, into one custom object that looks the way you want it.

## The problem
When chaining promises you often want to use the resulting data from one promise in another function further down the chain.

This means you either have to pass that piece of data to several functions that do nothing with it but return it so it can be consumed later in the chain (or you have to assign it to a variable i the scope outside of your promise chain).

## A solution
Promise Data Chain wraps your promise functions that preserves the data object from the previous step, merges in the result from the current step and passed the merged object to the next step.

## Usage

`chainData(promiseFn, mapperFn)`

The first argument is a function that returns a promise, and the second argument is a mapper function which takes the result of the promise and returns a new object after doing whatever it wants to the result data.

Mapper functions are great for renaming props, or processing/formatting the data before it gets added to the chained object.

Alternatively, if you just want to cherry-pick a few properties off of a bigger object you can supply an array of keys in place of the mapper function.

Hopefully the example usage makes things a little more clear:

## Example
```
import chainData from 'chain-promise-data';
chainData(
  () => getPost(123), // returns { id: 123, body: 'Hello, world!', authorId: 321 }
  ({ id, body, authorId }) => ({ postId: id, authorId, body }) // Mapper function that can cherry-pick and rename props
)
  .then(
    chainData(
      ({ authorId }) => getUser(authorId), // returns { id: 321, fullName: 'Don Quijote', hobbies: 'Windmilling' }
      ['fullName'] // Pick out only the full name prop and add it to your data object
    )
  )
  .then(
    ({ postId }) => getComments(postId), // Returns [{ id: 12345, body: 'Hiiii!' }, {id: 12346: 'Yo' }],
    comments => ({ comments }) // Add response data as `comments` to your data object
  )
  .then(result => {
    // Do something with your result object here that now has the shape:
    {
      postId: 123,
      authorId: 321,
      body: 'Hello, world!',
      fullName: 'Don Quijote',
      comments: [
        { id: 12345, body: 'Hiiii!' },
        {id: 12346: 'Yo' }
      ]
    }
  })
```