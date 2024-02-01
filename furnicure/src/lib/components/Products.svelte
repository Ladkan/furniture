<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";

    let products = [];
    let unsubscribe: () => void;

    let notif_add;
    let notif_delte;
    let del_view;
    let add_view;

    let name;
    let price;
    let img;
    let promote;

    let del = null;

    onMount(async () => {
        //Total of unread messages
        const prod = await pb.collection("products").getFullList({});
        products = prod;

        notif_add = document.querySelector(".notifications .add");
        notif_delte = document.querySelector(".notifications .delete");
        del_view = document.querySelector(".delete_view");
        add_view = document.querySelector(".add_view");

        unsubscribe = await pb
            .collection("products")
            .subscribe("*", async ({ action, record }) => {
                if (action === "create") {
                    products = [...products, record];
                }
                if (action === "delete") {
                    products = products.filter((m: any) => m.id !== record.id);
                }
            });
    });

    function prod_delete_open(id: any) {
        del = id;
        del_view.classList.remove("close");
    }

    async function prod_add() {
        const data = {
            name: name,
            image: img,
            price: price,
            promote: promote,
        };
        const record = await pb.collection("products").create(data);

        add_view.classList.add("close");

        notif_add.classList.remove("close");
        setTimeout(() => {
            notif_add.classList.add("close");
        }, 4000);
    }

    async function prod_delete(id: any) {
        await pb.collection("products").delete(id);
        del_view.classList.add("close");
        notif_delte.classList.remove("close");

        setTimeout(() => {
            notif_delte.classList.add("close");
        }, 4000);
    }

    onDestroy(() => {
        unsubscribe?.();
    });
</script>

<div class="notifications">
    <span class="add close"
        >Product added <i
            class="bx bx-x-circle"
            on:click={() => notif_add.classList.add("close")}
        ></i></span
    >
    <span class="delete close"
        >Product deleted <i
            class="bx bx-x-circle"
            on:click={() => notif_delte.classList.add("close")}
        ></i></span
    >
</div>

<div class="delete_view close">
    <div class="content">
        <h3>Delete product?</h3>
        <button
            class="btn success"
            on:click={() => del_view.classList.add("close")}>Close</button
        >
        <button class="btn danger" on:click={prod_delete(del.id)}>Delete</button
        >
    </div>
</div>

<div class="add_view close">
    <div class="content">
        <h3>Add products</h3>
        <form on:submit|preventDefault={prod_add}>
            <div class="form-item">
                <label>Name</label>
                <input type="text" required bind:value={name} />
            </div>
            <div class="form-item">
                <label>Image</label>
                <input type="text" required bind:value={img} />
            </div>
            <div class="form-item">
                <label>Price</label>
                <input type="text" required bind:value={price} />
            </div>
            <div class="form-item">
                <label>Promote</label>
                <input type="checkbox" bind:value={promote} />
            </div>
            <div class="form-item">
                <button type="submit" class="btn success">Add</button>
                <button
                    type="reset"
                    class="btn danger"
                    on:click={() => add_view.classList.add("close")}
                    >Close</button
                >
            </div>
        </form>
    </div>
</div>

<button class="btn fill" on:click={() => add_view.classList.remove("close")}
    >Add</button
>
<div class="products">
    {#each products as i}
        <div class="product">
            <i class="bx bx-x-circle" on:click={prod_delete_open(i)}></i>
            <img src={i.image} alt="" />
            <h3>{i.name}</h3>
            <p>${i.price}</p>
        </div>
    {/each}
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

    .delete_view {
        z-index: 4000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        scrollbar-width: none;
        transition: all 0.3s ease;
        color: var(--dark);
        background: rgb(0, 0, 0, 0.5);
        &.close {
            display: none;
        }
        .content {
            padding: 2rem;
            border-radius: 10px;
            background: var(--light);
            gap: 24px;
            display: flex;
            margin-left: auto;
            margin-right: auto;
            margin-top: 25%;
            width: 500px;
            justify-content: center;
            align-items: center;
        }
    }

    .add_view {
        z-index: 4000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        scrollbar-width: none;
        transition: all 0.3s ease;
        color: var(--dark);
        background: rgb(0, 0, 0, 0.5);
        &.close {
            display: none;
        }
        .content {
            padding: 2rem;
            border-radius: 10px;
            background: var(--light);
            gap: 24px;
            display: flex;
            margin-left: auto;
            margin-right: auto;
            margin-top: 15%;
            width: 500px;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            form {
                .row {
                    display: flex;
                    gap: 24px;
                    flex-wrap: wrap;
                }
                .form-item {
                    display: flex;
                    flex-direction: column;

                    &:last-child {
                        flex-direction: row;
                        justify-content: center;
                        gap: 24px;
                    }

                    select {
                        border: 1px solid rgba(0, 0, 0, 0.5);
                        border-radius: 10px;
                        padding: 0.375rem 0.75rem;
                        outline: none;
                        height: 50px;
                        font-size: 1rem;
                        line-height: 1.5;
                        scrollbar-width: thin;
                    }
                    input {
                        border: 1px solid rgba(0, 0, 0, 0.5);
                        border-radius: 10px;
                        padding: 0.375rem 0.75rem;
                        outline: none;
                        height: 50px;
                        font-size: 1rem;
                        line-height: 1.5;
                        &:active,
                        &:focus {
                            outline: none;
                            box-shadow: none;
                            border-color: var(--primary);
                            box-shadow: 0 1px 4px 0 rgba(var(--primary), 0.2);
                        }
                    }
                    input[type="checkbox"] {
                        padding: 0;
                        height: 20px;
                        line-height: normal;
                        font-size: medium;
                    }
                }
                .btn {
                    padding: 12px 30px;
                    border-radius: 2rem;
                    border: none;
                    cursor: pointer;
                    line-height: 1.5;
                    &.fill {
                        background: #fab941;
                    }
                }
            }
        }
    }

    .notifications {
        transition: all 0.3s ease;
        span {
            &.close {
                right: -200px;
            }
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 3000;
            color: var(--light);
            overflow-x: hidden;
            scrollbar-width: none;
            &.add {
                background: var(--success);
            }
            &.delete {
                background: var(--danger);
            }
            padding: 0.5rem 1rem;
            display: flex;
            align-items: center;
            border-radius: 48px;
            font-size: 16px;
            transition: all 0.3s ease;
            .bx {
                cursor: pointer;
                display: flex;
                font-size: 1.6rem;
                justify-content: center;
            }
        }
    }

    .btn {
        padding: 12px 30px;
        border-radius: 2rem;
        border: none;
        cursor: pointer;
        line-height: 1.5;
        &.fill {
            background: var(--success);
        }
        &.danger {
            background: var(--danger);
        }
        &.success {
            background: var(--success);
        }
    }

    .products {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 24px;
        margin-bottom: 24px;
        .product {
            padding: 24px;
            border-radius: 20px;
            color: var(--dark);
            background: var(--light);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &.promote {
                border: 1px solid --success;
            }
            img {
                max-width: 250px;
            }
            .bx {
                &:hover {
                    color: var(--danger);
                }
            }
        }
    }
</style>
