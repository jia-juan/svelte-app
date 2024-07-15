// src/routes/orders/add.svelte
<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { getAuthHeaders, isAuthenticated, logout } from "../../utils/auth.js";

    let orderData = {
        customer: '',
        order_date: '',
        total_amount: 0,
        status: '',
    };

    let customers = [];
    let statusOptions = [];

    const fetchCustomers = async () => {
        const response = await fetch('http://localhost:8000/api/customer/', {
            headers: getAuthHeaders(),
        });
        if (response.ok) {
            customers = await response.json();
        } else {
            logout();
        }
    };

    const fetchStatusOptions = async () => {
        const response = await fetch('http://localhost:8000/api/order-status/', {
            headers: getAuthHeaders(),
        });
        if (response.ok) {
            statusOptions = await response.json();
        } else {
            logout();
        }
    };

    onMount(() => {
        if (!isAuthenticated()) {
            push('/login');
            return;
        }
        fetchCustomers();
        // fetchProducts();
        fetchStatusOptions();
    });

    const selectCustomer = (customerId) => {
        orderData.customer = customerId;
    };

    const setTodayDate = () => {
        const today = new Date().toISOString().split('T')[0];
        orderData.order_date = today;
    };

    const addOrder = async () => {
        const res = await fetch('http://localhost:8000/api/orders/', {
            method: 'POST',
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
    <h1>Add Order</h1>
    <form on:submit|preventDefault={addOrder}>
        <div>
            <label for="customer">Customer:</label>
            <select id="customer" bind:value={orderData.customer}>
                {#each customers as customer}
                    <option value={customer.id} on:click={() => selectCustomer(customer.id)}>
                        {customer.username}
                    </option>
                {/each}
            </select>
        </div>
        <div>
            <label for="order_date">Order Date:</label>
            <input type="date" id="order_date" bind:value={orderData.order_date} />
            <button type="button" on:click={setTodayDate}>Today</button>
        </div>
        <div>
            <label for="total_amount">Total Amount:</label>
            <input type="number" id="total_amount" bind:value={orderData.total_amount} />
        </div>
        <div>
            <label for="status">Status:</label>
            <select id="status" bind:value={orderData.status}>
                {#each statusOptions as option}
                    <option value={option.value}>
                        {option.display_name}
                    </option>
                {/each}
            </select>
        </div>
        <button type="submit">Add Order</button>
    </form>
</main>