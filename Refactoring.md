# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The reason behind the refactor is due to high [cognitive complexity](https://docs.codeclimate.com/docs/cognitive-complexity). The maximum number of cognivtive complexity in a function should not be more than 5 but the number of cognitive complexity in the function was 11 which more than 2 times an easily maintainable function should have. After reducing the cognitive complexity to 5, I notice JSON.stringify and the same methods of crypto module were called in multiple places so it is best to use DRY (Don't Repeat Yourself) principle for easy maintenance.
