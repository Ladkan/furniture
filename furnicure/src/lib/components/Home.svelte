<script lang="ts">
    import { currentUser, pb } from "../../lib/pocketbase";
    import { onMount, onDestroy } from "svelte";
    import why from "$lib/images/why-choose-us-img.jpg";

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
    let promos = [];
    let unsubscribe: () => void;

    onMount(async () => {
        const res = await pb.collection("products").getFullList({
            filter: "promote = true",
        });
        promos = res;
    });

    onDestroy(() => {
        unsubscribe?.();
    });
</script>

<main>
    <div class="shop">
        <div class="text">
            <h3>Crafted with excellent material.</h3>
            <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliqam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <button class="btn fill">Explore</button>
        </div>
        <div class="products">
            {#each promos as p}
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
    </div>
    <div class="choose">
        <div class="text">
            <h3>Why Choose Us</h3>
            <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <div class="whys">
                <div class="why">
                    <i class="bx bxs-truck"></i>
                    <strong>Fast & Free Shipping</strong>
                    <p>
                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                        aliquet velit. Aliquam vulputate.
                    </p>
                </div>
                <div class="why">
                    <i class="bx bxs-shopping-bag-alt"></i>
                    <strong>Easy to Shop</strong>
                    <p>
                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                        aliquet velit. Aliquam vulputate.
                    </p>
                </div>
                <div class="why">
                    <i class="bx bx-support"></i>
                    <strong>24/7 Support</strong>
                    <p>
                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                        aliquet velit. Aliquam vulputate.
                    </p>
                </div>
                <div class="why">
                    <i class="bx bx-refresh"></i>
                    <strong>Hassle Free Returns</strong>
                    <p>
                        Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                        aliquet velit. Aliquam vulputate.
                    </p>
                </div>
            </div>
        </div>
        <img src={why} alt="" />
    </div>
</main>

<style lang="scss">
    main {
        margin-top: 7rem;
        margin-bottom: 7rem;
        display: flex;
        flex-direction: column;
        .shop {
            display: flex;
            flex-direction: row;
            .text {
                flex-grow: 1;
                flex-basis: 500px;
                h3 {
                    font-weight: 500;
                    font-size: 32px;
                    line-height: 32px;
                }
                p {
                    margin: 1rem 0;
                    color: rgba(0, 0, 0, 0.5);
                }
                .btn {
                    padding: 12px 30px;
                    border-radius: 2rem;
                    border: none;
                    cursor: pointer;
                    line-height: 1.5;
                    font-weight: 600;
                    &.fill {
                        color: white;
                        background: #2f2f2f;
                    }
                }
            }
            .products {
                flex-grow: 1;
                flex-basis: auto;
                display: flex;
                flex-direction: row;
                gap: 12px;
                .product {
                    text-align: center;
                    text-decoration: none;
                    display: block;
                    position: relative;
                    padding-bottom: 50px;
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
        .choose {
            margin-top: 14rem;
            display: flex;
            flex-direction: row;
            img {
                width: 75%;
                border-radius: 2rem;
            }
            .text {
                h3 {
                    font-weight: 600;
                    font-size: 32px;
                    line-height: 32px;
                }
                p {
                    color: rgba(0, 0, 0, 0.5);
                    margin: 0.7rem 0;
                }
                .whys {
                    margin-top: 4rem;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    row-gap: 2rem;
                    .why {
                        width: 400px;
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
</style>
