// src/routes/orders/edit.svelte
<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { getAuthHeaders, isAuthenticated, logout } from "../../utils/auth.js";
    import { getContext } from 'svelte';

    let orderId;
    let orderData = {
        customer: '',
        // products: [],
        order_date: '',
        total_amount: 0,
        status: '',
    };

    const { params } = getContext('routified');
    orderId = params.id;

    onMount(async () => {
        if (!isAuthenticated()) {
            push('/login');
            return;
        }

        const res = await fetch(`http://localhost:8000/api/orders/${orderId}/`, {
            headers: getAuthHeaders(),
        });
        if (res.ok) {
            orderData = await res.json();
        } else {
            logout();
        }
    });

    const updateOrder = async () => {
        const res = await fetch(`http://localhost:8000/api/orders/${orderId}/`, {
            method: 'PUT',
            headers: {
                ...getAuthHeaders(),
            },
            body: JSON.stringify(orderData),
        });
        if (res.ok) {
            push('/orders');
        } else {
            logout();
        }
    };
</script>

<main>
    <h1>Edit Order</h1>
    <form on:submit|preventDefault={updateOrder}>
        <div>
            <label for="customer">Customer:</label>
            <input type="text" id="customer" bind:value={orderData.customer} />
        </div>
<!--        <div>-->
<!--            <label for="products">Products:</label>-->
<!--            <input type="text" id="products" bind:value={orderData.products} />-->
<!--        </div>-->
        <div>
            <label for="order_date">Order Date:</label>
            <input type="text" id="order_date" bind:value={orderData.order_date} />
        </div>
        <div>
            <label for="total_amount">Total Amount:</label>
            <input type="number" id="total_amount" bind:value={orderData.total_amount} />
        </div>
        <div>
            <label for="status">Status:</label>
            <input type="text" id="status" bind:value={orderData.status} />
        </div>
        <button type="submit">Update Order</button>
    </form>
</main>