<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";

    let unsubscribe: () => void;

    let orders = [];

    onMount(async () => {
        const order = await pb.collection("orders").getFullList({
            sort: "-created",
        });
        orders = order;

        unsubscribe = await pb
            .collection("orders")
            .subscribe("*", async ({ action, record }) => {
                if (action === "create") {
                    orders = [...orders, record];
                }
                if (action === "update") {
                    orders = orders.forEach((item) => {
                        if (item.id == record.id) {
                            item = record;
                        }
                    });
                }
                if (action === "delete") {
                    orders = orders.filter((m: any) => m.id !== record.id);
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
            <i class="bx bx-receipt"></i>
            <h3>Orders</h3>
        </div>
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Shipping</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
                {#each orders as r}
                    <tr>
                        <td>
                            <p>{r.firstname} {r.lastname}</p>
                        </td>
                        <td>{r.created}</td>
                        <td
                            ><span class="status {r.status}">{r.status}</span
                            ></td
                        >
                        <td>
                            <span class="status {r.shipping_status}"
                                >{r.shipping_status}</span
                            >
                        </td>
                        <td
                            ><a href="/admin/order/{r.id}"
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
                        .status {
                            font-size: 10px;
                            padding: 6px 16px;
                            color: var(--light);
                            border-radius: 20px;
                            font-weight: 700;
                            &.paid {
                                background: var(--success);
                            }
                            &.processing {
                                background: var(--primary);
                            }
                            &.declined {
                                background: var(--warning);
                            }
                            &.canceled {
                                background: var(--danger);
                            }
                            &.shipping {
                                background: var(--warning);
                            }
                            &.deliverd {
                                background: var(--success);
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
