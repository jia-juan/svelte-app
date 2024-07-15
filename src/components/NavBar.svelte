<script>
    import {onMount} from 'svelte';
    import {isAuthenticated, logout} from "../utils/auth.js";

    let currentUser = '';

    onMount(async () => {
        if (isAuthenticated()) {
            const token = localStorage.getItem('access_token');
            const payload = JSON.parse(atob(token.split('.')[1]));
            currentUser = payload.username;
        }
    });

    const handleLogout = () => {
        logout();
    };
</script>

<nav>
    <ul>
        <li class="user-info">Logged in as: {currentUser}</li>
        <li>
            <button on:click={handleLogout}>Logout</button>
        </li>
    </ul>
</nav>

<style>
    nav {
        background-color: #000; /* Black background */
        padding: 1rem;
    }

    ul {
        list-style-type: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    li {
        margin: 0 1rem;
    }

    .user-info {
        margin-left: auto;
        margin-right: 1rem;
        color: #fff; /* White text */
    }

    button {
        background: none;
        border: none;
        color: #fff; /* White text */
        cursor: pointer;
    }

    button:hover {
        text-decoration: underline;
    }
</style>