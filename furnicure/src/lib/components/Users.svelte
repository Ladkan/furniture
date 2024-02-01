<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";

    let users = [];
    let unsubscribe: () => void;

    let del = null;
    let notif;

    onMount(async () => {
        //Total of unread messages
        const prod = await pb.collection("users").getFullList({});
        users = prod;

        unsubscribe = await pb
            .collection("newsletter")
            .subscribe("*", async ({ action, record }) => {
                if (action === "create") {
                    users = [...users, record];
                }
                if (action === "delete") {
                    users = users.filter((m: any) => m.id !== record.id);
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
            <i class="bx bx-envelope"></i>
            <h3>Users</h3>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Avatar</th>
                </tr>
            </thead>
            <tbody>
                {#each users as u}
                    <tr>
                        <td>
                            {u.name}
                        </td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td
                            ><img
                                src={pb.files.getUrl(u, u.avatar)}
                                alt=""
                            /></td
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

    .notifications {
        transition: all 0.3s ease;
        span {
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 3000;
            color: var(--light);
            overflow-x: hidden;
            scrollbar-width: none;
            background: var(--danger);
            padding: 0.5rem 1rem;
            display: flex;
            align-items: center;
            border-radius: 48px;
            font-size: 16px;
            transition: all 0.3s ease;
            &.close {
                right: -200px;
            }
            .bx {
                cursor: pointer;
                display: flex;
                font-size: 1.6rem;
                justify-content: center;
            }
        }
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
                        img {
                            width: 36px;
                            height: 36px;
                            object-fit: cover;
                            border-radius: 50%;
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
                    padding: 16px 0;
                    img {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                    .bx {
                        color: var(--dark);
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
