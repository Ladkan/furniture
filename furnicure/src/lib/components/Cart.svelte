<script lang="ts">
    import { items, clear, total } from "../../lib/stores/cart";

    function remove(id: number) {
        $items = $items.filter((item) => item.id !== id);
    }

    function minus(id: number) {
        $items.forEach((item) => {
            if (item.id === id) {
                item.qiantity--;
                if (item.qiantity <= 0) {
                    remove(id);
                }
            }
        });

        $items = $items;
    }

    function plus(id: number) {
        $items.forEach((item) => {
            if (item.id === id) {
                item.qiantity++;
            }
        });

        $items = $items;
    }
</script>

<main>
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {#each $items as item}
                <tr>
                    <td>
                        <img src={item.img} alt="" />
                    </td>
                    <td>
                        <p>{item.name}</p>
                    </td>
                    <td>
                        <p>${item.price}</p>
                    </td>
                    <td>
                        <i class="bx bx-minus" on:click={minus(item.id)}></i>
                        <input type="text" bind:value={item.qiantity} />
                        <i class="bx bx-plus" on:click={plus(item.id)}></i>
                    </td>
                    <td>
                        <p>${item.price * item.qiantity}</p>
                    </td>
                    <td>
                        <i class="bx bx-x" on:click={remove(item.id)}></i>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <div class="total">
        <h3>Cart totals</h3>
        <p>Subtotal: <span>${$total}</span></p>
        <p>Total: <span>${$total}</span></p>
    </div>
</main>

<style lang="scss">
    main {
        margin-top: 7rem;
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        table {
            width: 100%;
            border-collapse: collapse;
            tbody {
                tr {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgb(0, 0, 0, 0.1);
                    &:hover {
                        background: #dce4e4;
                    }
                }
            }
            th {
                padding-bottom: 12px;
                font-size: 13px;
                text-align: left;
                border-bottom: 1px solid rgb(0, 0, 0, 0.2);
            }
            td {
                input {
                    border: 1px solid rgba(0, 0, 0, 0.5);
                    border-radius: 10px;
                    padding: 0.375rem 0.75rem;
                    outline: none;
                    height: 50px;
                    max-width: 50px;
                    font-size: 1rem;
                    line-height: 1.5;
                    text-align: center;
                    &:active,
                    &:focus {
                        outline: none;
                        box-shadow: none;
                        border-color: var(--primary);
                        box-shadow: 0 1px 4px 0 rgba(var(--primary), 0.2);
                    }
                }

                &:first-child {
                    display: flex;
                    align-items: center;
                    grid-gap: 12px;
                    padding-left: 6px;
                }
                padding: 16px 0;
                img {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
        }
        .total {
            margin-top: 2rem;
            h3 {
                border-bottom: 1px solid rgb(0, 0, 0, 0.1);
                font-weight: 500;
                font-size: 2rem;
            }
            width: 250px;
            display: flex;
            flex-direction: column;
        }
    }
</style>
