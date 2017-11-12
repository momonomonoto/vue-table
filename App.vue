<template>
  <div id="app">
    <AppBar />
    <ProductTable />
  </div>
</template>

<script>
  import ProductTable from './components/ProductTable.vue';
  import AppBar from './components/AppBar.vue';

  export default {
    name: 'app',
    components: {
      ProductTable,
      AppBar,
    },
  };
</script>