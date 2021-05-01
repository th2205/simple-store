# rsup-simple-data-store

A rsup-simple-data-store to manage your data

# installation

```javascript
npm i rsup-simple-data-store

or

<script src="https://unpkg.com/rsup-simple-data-store@1.0.2/dist/simple-store.js"></script>
```

# Useage

```javascript
const store = new Store({
  list: [],
  isLoading: false,
  // ...
});

store.on("list", () => {
  //...something to do after your data changed
});

store.set({
  list: [//...new list],
});
```
