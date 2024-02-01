<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";
    import { page, updated } from "$app/stores";
    import Dashboard from "$lib/components/Dashboard.svelte";
    import Login from "$lib/components/Login.svelte";
    import Orders from "$lib/components/Orders.svelte";
    import Products from "$lib/components/Products.svelte";
    import Messages from "$lib/components/Messages.svelte";
    import Newsletter from "$lib/components/Newsletter.svelte";
    import Users from "$lib/components/Users.svelte";
    let messages;
    let unsubscribe: () => void;
    let selected = { component: null, title: "" };
    onMount(async () => {
        if (!$currentUser) {
            Update(Login, "Login");
        } else {
            Update(Dashboard, "Dashboard");
        }

        const url = new URL(window.location.href);

        setActive(url.searchParams.get("id"));
        switch (url.searchParams.get("id")) {
            case "products":
                Update(Products, "Products");
            case "orders":
                Update(Orders, "Orders");
            case "messages":
                Update(Messages, "Messages");
            case "newsletter":
                Update(Newsletter, "Newsletter");
            case "users":
                Update(Users, "Users");
            case "login":
                Update(Login, "Login");
        }

        //Total of unread messages
        const mesage = await pb.collection("contact").getFullList({
            filter: "seen = False",
        });
        messages = mesage.length;

        const sideLinks = document.querySelectorAll(
            ".sidebar .side-menu li a:not(.logout)",
        );

        sideLinks.forEach((item) => {
            const li = item.parentElement;
            item.addEventListener("click", () => {
                sideLinks.forEach((i) => {
                    i.parentElement.classList.remove("active");
                });
                li.classList.add("active");
            });
        });

        unsubscribe = await pb
            .collection("contact")
            .subscribe("*", async ({ action, record }) => {
                if (action === "create") {
                    messages++;
                }
                if (action === "update") {
                    if (record.seen === true) {
                        messages--;
                    }
                    if (record.seen === false) {
                        messages++;
                    }
                }
            });
    });

    function Update(component, title) {
        selected = { component: component, title: title };
    }

    function setActive(id) {
        if (id != null) {
            document.getElementById("dashboard")?.classList.remove("active");
            document.getElementById(id)?.classList.add("active");
        } else {
            document.getElementById("dashboard")?.classList.add("active");
        }
    }
    function signOut() {
        pb.authStore.clear();
        Update(Login, "Login");
    }
    onDestroy(() => {
        unsubscribe?.();
    });
</script>

<title>Admin - {selected.title}</title>

<div class="wrapper">
    <div class="sidebar">
        <a href="" class="logo">
            <i class="bx bx-code-alt"></i>
            <div class="logo-name"><span>Admin</span> Panel</div>
        </a>
        {#if $currentUser}
            <ul class="side-menu">
                <li id="dashboard" class="active">
                    <a on:click={() => Update(Dashboard, "Dashboard")}
                        ><i class="bx bxs-dashboard"></i>Dashboard</a
                    >
                </li>
                <li on:click={() => Update(Products, "Products")}>
                    <a href="#"><i class="bx bx-store-alt"></i>Products</a>
                </li>
                <li id="orders">
                    <a on:click={() => Update(Orders, "Orders")}
                        ><i class="bx bx-receipt"></i>Orders</a
                    >
                </li>
                <li id="messages">
                    <a on:click={() => Update(Messages, "Messages")}
                        ><i class="bx bx-message-square-dots"></i>Messages</a
                    >
                </li>
                <li id="newsletter">
                    <a on:click={() => Update(Newsletter, "Newsletter")}
                        ><i class="bx bx-envelope"></i>Newsletter</a
                    >
                </li>
                <li id="users">
                    <a on:click={() => Update(Users, "Users")}
                        ><i class="bx bx-group"></i>Users</a
                    >
                </li>
            </ul>
            <ul class="side-menu">
                <li>
                    <a on:click={signOut} class="logout"
                        ><i class="bx bx-log-out-circle"></i>Logout</a
                    >
                </li>
            </ul>
        {/if}
    </div>
    <div class="content">
        <nav>
            {#if $currentUser}
                <a class="profile">
                    <img
                        src={pb.files.getUrl($currentUser, $currentUser.avatar)}
                        alt=""
                    />
                </a>
                <a class="notif">
                    <i class="bx bx-bell">
                        <span class="count">{messages}</span>
                    </i>
                </a>
            {/if}
        </nav>
        <main>
            <div class="header">
                <div class="left">
                    <h1>{selected.title}</h1>
                </div>
            </div>
            <svelte:component this={selected.component} />
        </main>
    </div>
</div>

<style lang="scss">
    .wrapper {
        background: #25252c;
        overflow-x: hidden;
        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            background: #181a1e;
            width: 230px;
            height: 100%;
            z-index: 2000;
            overflow-x: hidden;
            scrollbar-width: none;
            .logo {
                font-size: 24px;
                font-weight: 700;
                height: 56px;
                display: flex;
                align-items: center;
                color: #1976d2;
                z-index: 500;
                padding-bottom: 20px;
                box-sizing: content-box;
                .logo-name {
                    span {
                        color: #fbfbfb;
                    }
                }
                .bx {
                    min-width: 60px;
                    display: flex;
                    justify-content: center;
                    font-size: 2.2rem;
                }
            }
            .side-menu {
                width: 100%;
                margin-top: 40px;
                li {
                    height: 48px;
                    background: transparent;
                    margin-left: 6px;
                    border-radius: 48px 0 0 48px;
                    padding: 4px;
                    cursor: pointer;
                    &.active {
                        background: #25252c;
                        position: relative;
                        &::before {
                            content: "";
                            position: absolute;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            top: -40px;
                            right: 0;
                            box-shadow: 20px 20px 0 #25252c;
                            z-index: -1;
                        }
                        &::after {
                            content: "";
                            position: absolute;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            bottom: -40px;
                            right: 0;
                            box-shadow: 20px -20px 0 #25252c;
                            z-index: -1;
                        }
                        a {
                            color: #388e3c;
                        }
                    }
                    a {
                        width: 100%;
                        height: 100%;
                        background: #181a1e;
                        display: flex;
                        align-items: center;
                        border-radius: 48px;
                        font-size: 16px;
                        color: #fbfbfb;
                        white-space: nowrap;
                        overflow-x: hidden;
                        transition: all 0.3s ease;
                        .bx {
                            min-width: calc(60px - ((4px + 6px) * 2));
                            display: flex;
                            font-size: 1.6rem;
                            justify-content: center;
                        }
                        &.logout {
                            color: #d32f2f;
                        }
                    }
                }
            }
        }

        .content {
            position: relative;
            width: calc(100% - 230px);
            left: 230px;
            height: 100vh;
            nav {
                color: white;
                height: 56px;
                background: #181a1e;
                padding: 0 24px 0 0;
                display: flex;
                align-items: center;
                grid-gap: 24px;
                position: sticky;
                top: 0;
                left: 0;
                z-index: 1000;
                flex-direction: row-reverse;
                .notif {
                    font-size: 12px;
                    position: relative;
                    color: white;
                    cursor: pointer;
                    .count {
                        position: absolute;
                        top: -6px;
                        width: 20px;
                        right: -6px;
                        height: 20px;
                        background: #d32f2f;
                        border-radius: 50%;
                        color: #181a1e;
                        border: 2px solid #181a1e;
                        font-weight: 700;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
                .profile {
                    img {
                        width: 36px;
                        height: 36px;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
                &::before {
                    content: "";
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    bottom: -40px;
                    left: 0;
                    border-radius: 50%;
                    box-shadow: -20px -20px 0 #181a1e;
                }
                a {
                    color: #181a1e;
                }
            }
            main {
                width: 100%;
                padding: 36px 24px;
                max-height: calc(100vh - 56px);
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    grid-gap: 16px;
                    flex-wrap: wrap;
                    .left {
                        h1 {
                            font-size: 36px;
                            font-weight: 600;
                            margin-bottom: 10px;
                            color: #fbfbfb;
                        }
                    }
                }
            }
        }
    }
</style>
