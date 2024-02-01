<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";

    let messages = [];
    let unsubscribe: () => void;

    let del = null;

    onMount(async () => {
        //Total of unread messages
        const prod = await pb.collection("contact").getFullList({});
        messages = prod;

        unsubscribe = await pb
            .collection("products")
            .subscribe("*", async ({ action, record }) => {
                if (action === "create") {
                    messages = [...messages, record];
                }
                if (action === "delete") {
                    messages = messages.filter((m: any) => m.id !== record.id);
                }
            });
    });

    onDestroy(() => {
        unsubscribe?.();
    });
</script>

<div class="bottom-data">
    <div class="orders">
        <div class="header">
            <i class="bx bx-message-square-dots"></i>
            <h3>Messages</h3>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Seen</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
                {#each messages as m}
                    <tr>
                        <td>
                            <p>{m.firstname} {m.lastname}</p>
                        </td>
                        <td>{m.email}</td>
                        <td>{m.created}</td>
                        <td>
                            {#if m.seen}
                                <span class="green"></span>
                            {:else}
                                <span class="red"></span>
                            {/if}
                        </td>
                        <td
                            ><a href="/admin/messages/{m.id}"
                                ><i class="bx bx-right-top-arrow-circle"></i></a
                            ></td
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style lang="scss">
    :root {
        --light: #181a1e;
        --primary: #1976d2;
        --light-primary: #cfe8ff;
        --grey: #25252c;
        --dark-grey: #aaaaaa;
        --dark: #fbfbfb;
        --danger: #d32f2f;
        --light-danger: #fecdd3;
        --warning: #fbc02d;
        --light-warning: #fff2c6;
        --success: #388e3c;
        --light-success: #bbf7d0;
    }

    .bottom-data {
        display: flex;
        flex-wrap: wrap;
        grid-gap: 24px;
        margin-top: 24px;
        width: 100%;
        color: var(--dark);
        & > div {
            border-radius: 20px;
            background: var(--light);
            padding: 24px;
            overflow-x: auto;
        }
        .header {
            display: flex;
            align-items: center;
            grid-gap: 16px;
            margin-bottom: 24px;
            h3 {
                margin-right: auto;
                font-size: 24px;
                font-weight: 600;
            }
            .bx {
                cursor: pointer;
            }
        }
        .orders {
            flex-grow: 1;
            flex-basis: 500px;
            table {
                width: 100%;
                border-collapse: collapse;
                tbody {
                    tr {
                        transition: all 0.3s ease;
                        &:hover {
                            background: var(--grey);
                        }
                    }
                }
                tr {
                    td {
                        span {
                            border-radius: 50%;
                            display: block;
                            width: 25px;
                            height: 25px;
                            &.green {
                                background: var(--success);
                            }
                            &.red {
                                background: var(--danger);
                            }
                        }
                    }
                }
                th {
                    padding-bottom: 12px;
                    font-size: 13px;
                    text-align: left;
                    border-bottom: 1px solid var(--grey);
                }
                td {
                    &:first-child {
                        display: flex;
                        align-items: center;
                        grid-gap: 12px;
                        padding-left: 6px;
                    }
                    padding: 16px 0;
                    img {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                    .bx {
                        color: var(--dark);
                    }
                }
            }
        }
    }
</style>
