<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { isAuthenticated, logout, getAuthHeaders } from "../../utils/auth.js";

    export let params; // 接受路由参数
    let order = {};

    onMount(async () => {
        if (!isAuthenticated()) {
            push('/login');
            return;
        }

        const response = await fetch(`http://localhost:8000/api/orders/${params.id}/`, {
            headers: getAuthHeaders(),
        });

        if (response.ok) {
            order = await response.json();
        } else {
            logout();
        }
    });

    const updateOrder = async () => {
        const response = await fetch(`http://localhost:8000/api/orders/${params.id}/`, {
            method: 'PUT',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            push('/orders');
        } else {
            const errorData = await response.json();
            console.error('Failed to update order:', errorData);
            // 处理更新失败的逻辑
        }
    };
</script>

<main>
    <h1>Edit Order</h1>
    <form on:submit|preventDefault={updateOrder}>
        <label for="customer">Customer</label>
        <input id="customer" type="text" bind:value={order.customer_username} />

        <label for="total_amount">Total Amount</label>
        <input id="total_amount" type="number" bind:value={order.total_amount} />

        <label for="status">Status</label>
        <input id="status" type="text" bind:value={order.status} />

        <button type="submit">Save</button>
    </form>
</main>