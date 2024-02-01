<script lang="ts">
    import { currentUser, pb } from "../lib/pocketbase";
    import { onMount, onDestroy } from "svelte";
    //Components
    import Home from "../lib/components/Home.svelte";
    import Shop from "$lib/components/Shop.svelte";
    import About from "$lib/components/About.svelte";
    import Services from "$lib/components/Services.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Cart from "$lib/components/Cart.svelte";
    import Checkout from "$lib/components/Checkout.svelte";
    //Headers
    import HomeH from "../lib/headers/Home-header.svelte";
    import ShopH from "../lib/headers/Shop-header.svelte";
    import AboutH from "../lib/headers/About-header.svelte";
    import ServicesH from "../lib/headers/Services-header.svelte";
    import ContactH from "../lib/headers/Contact-header.svelte";
    import CartH from "$lib/headers/Cart-header.svelte";
    import CheckoutH from "$lib/headers/Checkout-header.svelte";

    //Local storage
    import { items } from "../lib/stores/cart";

    let count = 0;
    items.subscribe((val) => (count = val.length));
    console.log(count);

    let unsubscribe: () => void;

    function Update(component, title, header) {
        selected = { component: component, title: title, header: header };
    }

    let selected = { component: Home, title: "Home", header: HomeH };

    let name: string;
    let email: string;

    async function newsletter() {
        const data = {
            name: name,
            email: email,
        };
        const createLine = await pb.collection("newsletter").create(data);

        name = null;
        email = null;
    }

    onMount(() => {
        const menuLinks = document.querySelectorAll("header .menu ul li p");
        menuLinks.forEach((item) => {
            const a = item;
            item.addEventListener("click", () => {
                menuLinks.forEach((i) => {
                    i.classList.remove("active");
                });
                a.classList.add("active");
            });
        });

        const topmenuLinks = document.querySelectorAll(
            "header .top-menu ul li p",
        );
        topmenuLinks.forEach((item) => {
            const a = item;
            item.addEventListener("click", () => {
                topmenuLinks.forEach((i) => {
                    i.classList.remove("active");
                });
                a.classList.add("active");
            });
        });

        const menuBar = document.querySelector(
            "header .wrapper .menu .bx.bx-menu",
        );
        const menuTop = document.querySelector("header .wrapper .top-menu");

        menuBar?.addEventListener("click", () => {
            menuTop?.classList.toggle("show");
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                menuTop?.classList.remove("show");
            }
        });
    });
    onDestroy(() => {
        unsubscribe?.();
    });
</script>

<title>Furnicure - {selected.title}</title>

<header>
    <div class="wrapper">
        <div class="menu">
            <div class="logo">
                <i class="bx bx-chair"></i>
                <div class="logo-name">Furni<span>cure</span></div>
            </div>
            <ul>
                <li>
                    <p
                        class="active"
                        on:click={() => Update(Home, "Home", HomeH)}
                    >
                        Home
                    </p>
                </li>
                <li>
                    <p on:click={() => Update(Shop, "Shop", ShopH)}>Shop</p>
                </li>
                <li>
                    <p on:click={() => Update(About, "About Us", AboutH)}>
                        About Us
                    </p>
                </li>
                <li>
                    <p on:click={() => Update(Services, "Services", ServicesH)}>
                        Services
                    </p>
                </li>
                <li>
                    <p on:click={() => Update(Contact, "Contact Us", ContactH)}>
                        Contact Us
                    </p>
                </li>
            </ul>
            <i class="bx bx-menu"></i>
            <div class="cart">
                <i
                    class="bx bx-cart"
                    on:click={() => Update(Cart, "Cart", CartH)}
                >
                    {#if count > 0}
                        <span class="count">{count}</span>
                    {/if}
                </i>
            </div>
        </div>
        <div class="top-menu">
            <ul>
                <li>
                    <p
                        class="active"
                        on:click={() => Update(Home, "Home", HomeH)}
                    >
                        Home
                    </p>
                </li>
                <li>
                    <p on:click={() => Update(Shop, "Shop", ShopH)}>Shop</p>
                </li>
                <li>
                    <p on:click={() => Update(About, "About Us", AboutH)}>
                        About Us
                    </p>
                </li>
                <li>
                    <p on:click={() => Update(Services, "Services", ServicesH)}>
                        Services
                    </p>
                </li>
                <li>
                    <p on:click={() => Update(Contact, "Contact Us", ContactH)}>
                        Contact Us
                    </p>
                </li>
            </ul>
            <div class="cart">
                <i
                    class="bx bx-cart"
                    on:click={() => Update(Cart, "Cart", CartH)}
                >
                    {#if count > 0}
                        <span class="count">{count}</span>
                    {/if}
                </i>
            </div>
        </div>
        <svelte:component this={selected.header} />
    </div>
</header>

<div class="wrapper">
    <svelte:component this={selected.component} />
    {#if selected.component == Cart}
        <button
            class="btn2 fill"
            on:click={() => Update(Checkout, "Cart", CheckoutH)}
            >Proceed To Checkout</button
        >
    {/if}
</div>

<footer>
    <div class="wrapper">
        <div class="upper">
            <form on:submit|preventDefault={newsletter}>
                <label
                    ><i class="bx bx-envelope"></i> Subscribe to Newsletter</label
                >
                <div class="form-input">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        bind:value={name}
                    />
                    <input
                        type="text"
                        placeholder="Enter your email"
                        required
                        bind:value={email}
                    />
                    <button class="btn fill" type="submit"
                        ><i class="bx bxs-send"></i></button
                    >
                </div>
            </form>
        </div>
        <div class="middle">
            <div class="logo">
                <i class="bx bx-chair"></i>
                <div class="logo-name">Furni<span>cure</span></div>
            </div>
            <p>
                Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                vulputate velit imperdiet dolor tempor tristique. Pellentesque
                habitant
            </p>
        </div>
        <div class="bottom">
            <p>
                Copyright ©2024. All Rights Reserved. — Designed with love by
                Untree.co
            </p>
        </div>
    </div>
</footer>

<style lang="scss">
    :root {
        --primary: #3b5d4f;
        --dark: #363949;
        --secondery: #fab941;
        --light: #dce4e4;
    }

    .wrapper {
        max-width: 1320px;
        margin-inline: auto;
        .btn2 {
            padding: 12px 30px;
            border-radius: 2rem;
            border: none;
            cursor: pointer;
            line-height: 2;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 7rem;
            &.fill {
                color: white;
                background: #2f2f2f;
            }
        }
    }

    header {
        padding: 2rem;
        color: white;
        width: 100%;
        background: var(--primary);
        .menu {
            display: flex;
            justify-content: space-between;
            height: 56px;
            align-items: center;
            .logo {
                font-size: 24px;
                font-weight: 700;
                display: flex;
                align-items: center;
                box-sizing: content-box;
                .bx {
                    color: var(--secondery);
                }
                .logo-name {
                    span {
                        color: var(--secondery);
                    }
                }
            }
            ul {
                display: flex;
                flex-direction: row;
                grid-gap: 24px;
                li {
                    p {
                        cursor: pointer;
                        transition: all 0.3s ease;
                        color: rgb(255, 255, 255, 0.3);
                        &:hover {
                            text-decoration: underline;
                            text-decoration-color: var(--secondery);
                            text-decoration-thickness: 4px;
                            text-underline-offset: 10px;
                            color: white;
                        }
                        &.active {
                            color: white;
                            transition: all 0.3s ease;
                            text-decoration: underline;
                            text-decoration-color: var(--secondery);
                            text-decoration-thickness: 4px;
                            text-underline-offset: 10px;
                        }
                    }
                }
            }
            .bx-menu {
                display: none;
            }
            .cart {
                font-size: 12px;
                position: relative;
                cursor: pointer;
                .count {
                    position: absolute;
                    top: -6px;
                    width: 20px;
                    right: -6px;
                    height: 20px;
                    background: var(--secondery);
                    border-radius: 50%;
                    color: white;
                    border: 2px solid var(--primary);
                    font-weight: 700;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .top-menu:not(.show) {
            transition: all 0.3s ease;
            display: none;
        }
    }

    footer {
        background-color: white;
        width: 100%;
        padding: 2rem;
        .upper {
            margin-top: 4rem;
            display: flex;
            flex-direction: row;
            form {
                flex: 0 0 auto;
                flex-direction: column;
                width: 66.6%;
                label {
                    display: flex;
                    align-items: center;
                    border-radius: 48px;
                    font-size: 16px;
                    white-space: nowrap;
                    overflow-x: hidden;
                    color: var(--primary);
                    font-weight: 500;
                    font-size: 1.2rem;
                    .bx {
                        min-width: calc(60px - ((4px + 6px) * 2));
                        display: flex;
                        font-size: 1.6rem;
                        justify-content: center;
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
                .form-input {
                    align-items: center;
                    display: flex;
                    gap: 24px;
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
                }
                .btn {
                    padding: 12px 30px;
                    border-radius: 10px;
                    border: none;
                    cursor: pointer;
                    line-height: 1.5;
                    &.fill {
                        background: var(--primary);
                        color: white;
                    }
                }
            }
        }
        .middle {
            display: flex;
            margin-top: 4rem;
            flex-direction: column;
            width: 400px;
            .logo {
                font-size: 32px;
                font-weight: 700;
                display: flex;
                align-items: center;
                box-sizing: content-box;
                color: var(--primary);
                margin-bottom: 2rem;
                .bx {
                    color: var(--secondery);
                }
                .logo-name {
                    span {
                        color: var(--secondery);
                    }
                }
            }
            p {
                color: rgb(0, 0, 0, 0.5);
            }
        }
        .bottom {
            margin-top: 2rem;
            border-top: 1px solid #dee2e6 !important;
            font-size: 14px !important;
            p {
                margin-top: 0.5rem;
                color: #6a6a6a;
            }
        }
    }

    @media screen and (max-width: 1194px) {
        header {
            transition: all 0.3s ease;
            .menu {
                ul {
                    display: none;
                }
                .bx-menu {
                    display: block;
                }
                .cart {
                    display: none;
                }
            }
            .top-menu {
                transition: all 0.3s ease;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                ul {
                    li {
                        margin: 1rem 0;
                        p {
                            cursor: pointer;
                            transition: all 0.3s ease;
                            color: rgb(255, 255, 255, 0.3);
                            &:hover {
                                text-decoration: underline;
                                text-decoration-color: var(--secondery);
                                text-decoration-thickness: 4px;
                                text-underline-offset: 5px;
                                color: white;
                            }
                            &.active {
                                color: white;
                                transition: all 0.3s ease;
                                text-decoration: underline;
                                text-decoration-color: var(--secondery);
                                text-decoration-thickness: 4px;
                                text-underline-offset: 5px;
                            }
                        }
                    }
                }
                .cart {
                    margin-top: 0.5rem;
                    font-size: 12px;
                    position: relative;
                    cursor: pointer;
                    .count {
                        position: absolute;
                        top: -6px;
                        width: 20px;
                        right: -6px;
                        height: 20px;
                        background: var(--secondery);
                        border-radius: 50%;
                        color: white;
                        border: 2px solid var(--primary);
                        font-weight: 700;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
        footer {
            .upper {
                flex-direction: column;
                form {
                    .form-input {
                        display: block;
                    }
                }
            }
        }
    }
</style>
