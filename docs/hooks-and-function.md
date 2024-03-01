## Hooks and function

There are several replacement hooks and function in this project. Replacement used to improve speed and this app build time.

### @preact/signals-react

#### Use `signal` to replace `useState`

- Use `<variable>.value` to get or set a variable
- Signal variable can be export or access globally, and automatically implement useMemo and useCallback
- Init the variable above component function

```bash
// Initialize here
const loading = signal(false);

const Dashboard = () => {
    // ! Don't initialize here
    ...
}

```

#### Use `computed`

digunakkan untuk mengolah data dari signal()

#### Use `effect` to replace `useEffect`

useEffect(() => {},[]) -> effect(() => {})
effect dapat otomatis mendeteksi tanpa perlu memasukkan dependency

### million.js

#### Use `block` to wrap Component

wrap a custom component using this function
click [here](https://million.dev/docs/block) to see documentation

#### Use `<For></For>` to replace `forEach()`

use <For> as a replacement for forEach function
click [here](https://million.dev/docs/for) to see documentation
