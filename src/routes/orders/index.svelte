<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { isAuthenticated, logout, getAuthHeaders } from "../../utils/auth.js";

    let orders = [];

    const goToAddOrder = () => {
        push('/orders/add');
    };

    const goToEditOrder = (id) => {
        push(`/orders/edit/${id}`);
    };

    onMount(async () => {
        if (!isAuthenticated()) {
            push('/login');
            return;
        }

        const response = await fetch('http://localhost:8000/api/orders/', {
            headers: getAuthHeaders(),
        });

        if (response.ok) {
            orders = await response.json();
        } else {
            logout();
        }
    });

    const deleteOrder = async (id) => {
        const response = await fetch(`http://localhost:8000/api/orders/${id}/`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (response.ok) {
            orders = orders.filter(order => order.id !== id);
        } else {
            logout();
        }
    };
</script>

<main>
    <h1>Orders</h1>
    <button on:click={goToAddOrder}>Add Order</button>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each orders as order}
            <tr>
                <td>{order.id}</td>
                <td>{order.customer_username}</td>
                <td>{order.total_amount}</td>
                <td>{order.status}</td>
                <td>
                    <button on:click={() => goToEditOrder(order.id)}>Edit</button>
                    <button on:click={() => deleteOrder(order.id)}>Delete</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</main>