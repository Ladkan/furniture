<script lang="ts">
    import { currentUser, pb } from "../../lib/pocketbase";
    import { onMount, onDestroy } from "svelte";

    //Local storage
    import { items } from "../../lib/stores/cart";
    function addItem(name: string, id: number, price: number, img: string) {
        let add = false;

        $items.forEach((item) => {
            if (item.id === id) {
                item.qiantity++;
                add = true;
            }
        });

        if (add === false) {
            $items = [
                ...$items,
                { name: name, id: id, price: price, img: img, qiantity: 1 },
            ];
        }
    }

    let products = [];
    let unsubscribe: () => void;

    onMount(async () => {
        const res = await pb.collection("products").getFullList({
            sort: "-created",
        });
        products = res;
    });

    onDestroy(() => {
        unsubscribe?.();
    });
</script>

<main>
    <div class="products">
        {#each products as p}
            <div
                class="product"
                on:click={addItem(p.name, p.id, p.price, p.image)}
            >
                <img src={p.image} alt="" />
                <h3>{p.name}</h3>
                <strong>${p.price}</strong>
                <i class="bx bxs-plus-circle"></i>
            </div>
        {/each}
    </div>
</main>

<style lang="scss">
    main {
        margin: 7rem 0;
        display: flex;
        flex-direction: column;
        .products {
            flex-grow: 1;
            flex-basis: auto;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 12px;
            .product {
                margin-bottom: 2rem;
                text-align: center;
                text-decoration: none;
                display: block;
                position: relative;
                padding-bottom: 50px;
                width: 250px;
                cursor: pointer;
                img {
                    margin-bottom: 30px;
                    position: relative;
                    top: 0;
                    transition: 0.3s all ease;
                    width: 75%;
                }
                h3 {
                    font-weight: 600;
                    font-size: 16px;
                }
                strong {
                    font-weight: 800 !important;
                    font-size: 18px !important;
                }
                .bx {
                    font-size: 36px;
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    display: inline-block;
                    bottom: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: -17.5px;
                    border-radius: 50%;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.3s all ease;
                }
                &:before {
                    bottom: 0;
                    left: 0;
                    right: 0;
                    position: absolute;
                    content: "";
                    background: #dce4e4;
                    height: 0%;
                    z-index: -1;
                    border-radius: 10px;
                    transition: 0.3s all ease;
                }
                &:hover {
                    img {
                        top: -25px;
                    }
                    .bx {
                        bottom: 0;
                        opacity: 1;
                        visibility: visible;
                    }
                    &:before {
                        height: 80%;
                    }
                }
            }
        }
    }
</style>
