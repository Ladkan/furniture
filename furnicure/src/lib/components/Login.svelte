<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";

    let username: string;
    let password: string;

    async function login() {
        await pb.collection("users").authWithPassword(username, password);
    }

    function signOut() {
        pb.authStore.clear();
    }
</script>

{#if $currentUser}
    <p>Signed in as {$currentUser.username}</p>
    <button on:click={signOut}>Logout</button>
{:else}
    <form on:submit|preventDefault>
        <input type="text" bind:value={username} />
        <input type="password" bind:value={password} />
        <button on:click={login}>Login</button>
    </form>
{/if}
