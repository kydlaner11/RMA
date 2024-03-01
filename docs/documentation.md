## Documentation

### Theme Provider

To modify theme you can go to

```
  /src/constant/theme.js.
```

Ant Design also provide
theme generator [here](https://ant.design/theme-editor).

### PWA (Progressive Web App)

To turning on and off PWA you can go to

```
  /src/index.js.
```

Find this command and change to `.register()` to turning on PWA or change to `.unregister()` to turning off PWA

```
  serviceWorkerRegistration.register();
```

### Create New Page

To create a new page you can follow this step

- Open this file directory

```
  /src/constant/pageList.js
```

- Add your page to unauthenticatedPageList or authenticatedPageList according to your needs. Apps will automatically create a route, permission, and sidebar menu for you.

### Fetch Data From GraphQL

#### Get Data / Query (Called automatically)

To fetch data you can existing custom function called **useQueryGql()**, this function already handle the error so you don't need to show the error anymore.

#### Get Data / LazyQuery (Called by action)

To fetch data by action, like refresh button, pagination or else you can use **useLazyQuery()**, there is no custom function here so you need to defined it by yourself.

#### Modified Data / Mutation (Called by action)

To fetch data you can existing custom function called **useMutationGql()**, this function already handle the error and success so you don't need to show the response anymore.

### User Permission Manager (CASL)

To modify user permission you can go to

```
  /src/services/abilityService.js.
```

Use <b>\<Can . . . ></b> component from
`src/context/AbilityContext.js` then wrapped it to your component, follow this example :

```
  <Can I="read" a="book">
    {*/ your component here /}
  </Can>
```

You can call a function to check user ability using `accountAbility()` function. Below is the example to hide column by user permission :

```
  [
    {
      ...,
      hidden: accountAbility().can("update", "dashboard") ? false : true,
    },
  ].filter((item) => !item.hidden);
```

You can read the documentation [here](https://casl.js.org/v6/en)
