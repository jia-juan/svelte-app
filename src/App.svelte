<script>
  import Router from 'svelte-spa-router';
  import Home from './routes/index.svelte';
  import Orders from './routes/orders/index.svelte';
  import AddOrder from './routes/orders/add.svelte';
  import EditOrder from './routes/orders/edit.svelte';
  import Login from './routes/login.svelte';

  const routes = {
    '/': Home,
    '/orders': Orders,
    '/orders/add': AddOrder,
    '/orders/edit/:id': EditOrder,
    '/login': Login,
  };
</script>

<main>
  <Router {routes} />
</main>