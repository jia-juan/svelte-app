<script>
    import { push } from 'svelte-spa-router';

    export let name = 'world';

    const viewLogin = () => {
        push('/login');
    }

    // const viewOrders = () => {
    //     push('/orders');
    // };
</script>

<main>
    <h1>Hello {name}!</h1>
    <button on:click={viewLogin}>Login</button>
<!--    <button on:click={viewOrders}>View Orders</button>-->
</main>