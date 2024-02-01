<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { redirect } from "@sveltejs/kit";
    import { onMount, onDestroy } from "svelte";

    let unsubscribe: () => void;

    let orders;
    let messages;
    let total = 0;
    let recent = [];
    let products;

    onMount(async () => {
        //Total of paid orders
        const order = await pb.collection("orders").getFullList({
            filter: 'status = "paid"',
        });
        orders = order.length;
        //Total of messages
        const mesage = await pb.collection("contact").getFullList({});
        messages = mesage.length;
        //Total earnings
        order.forEach((item) => {
            total = total + item.total;
        });

        //Total products

        const product = await pb.collection("products").getFullList({});
        products = product.length;

        //Recent orders
        const rec = await pb
            .collection("orders")
            .getList(1, 5, { sort: "-created" });
        recent = rec.items;
    });

    onDestroy(() => {
        unsubscribe?.();
    });
</script>

<ul class="insights">
    <li>
        <i class="bx bx-calendar-check"></i>
        <span class="info">
            <h3>{orders}</h3>
            <p>Paid Orders</p>
        </span>
    </li>
    <li>
        <i class="bx bx-message-dots"></i>
        <span class="info">
            <h3>{messages}</h3>
            <p>Total Messages</p>
        </span>
    </li>
    <li>
        <i class="bx bxs-shopping-bag-alt"></i>
        <span class="info">
            <h3>{products}</h3>
            <p>Total Products</p>
        </span>
    </li>
    <li>
        <i class="bx bx-dollar-circle"></i>
        <span class="info">
            <h3>${total}</h3>
            <p>Total Sales</p>
        </span>
    </li>
</ul>

<div class="bottom-data">
    <div class="orders">
        <div class="header">
            <i class="bx bx-receipt"></i>
            <h3>Recent Orders</h3>
        </div>
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
                {#each recent as r}
                    <tr>
                        <td>
                            <p>{r.firstname} {r.lastname}</p>
                        </td>
                        <td>{r.created}</td>
                        <td
                            ><span class="status {r.status}">{r.status}</span
                            ></td
                        >
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

    .insights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        grid-gap: 24px;
        margin-top: 36px;
        li {
            padding: 24px;
            background: var(--light);
            border-radius: 20px;
            display: flex;
            align-items: center;
            grid-gap: 24px;
            cursor: pointer;
            .info {
                h3 {
                    font-size: 24px;
                    font-weight: 600;
                    color: var(--dark);
                }
                p {
                    color: var(--dark);
                }
            }
            .bx {
                width: 80px;
                height: 80px;
                border-radius: 10px;
                font-size: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            &:nth-child(1) .bx {
                background: var(--light-primary);
                color: var(--primary);
            }
            &:nth-child(2) .bx {
                background: var(--light-warning);
                color: var(--warning);
            }
            &:nth-child(3) .bx {
                background: var(--light-success);
                color: var(--success);
            }
            &:nth-child(4) .bx {
                background: var(--light-danger);
                color: var(--danger);
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
        .reminders {
            flex-grow: 1;
            flex-basis: 300px;
            .task-list {
                width: 100%;
                li {
                    width: 100%;
                    margin-bottom: 16px;
                    background: var(--grey);
                    padding: 14px 10px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .bx {
                        cursor: pointer;
                    }
                    &.completed {
                        border-left: 10px solid var(--success);
                    }
                    &.not-completed {
                        border-left: 10px solid var(--danger);
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .task-title {
                        display: flex;
                        align-items: center;
                        p {
                            margin-left: 6px;
                        }
                    }
                }
            }
        }
    }
</style>
