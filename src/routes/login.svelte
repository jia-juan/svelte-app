<script>
    import { login, error } from '../utils/auth';
    import { push } from 'svelte-spa-router';

    let username = '';
    let password = '';
</script>

<main>
    <h1>Login</h1>
    {#if $error}
        <p style="color: red;">{$error}</p>
    {/if}
    <form on:submit|preventDefault={() => login(username, password)}>
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" bind:value={username} />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} />
        </div>
        <button type="submit">Login</button>
    </form>
</main>