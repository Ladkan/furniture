<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";

    let messages;
    let contact;
    let unsubscribe: () => void;

    let firstname: string;
    let lastname: string;
    let created: string;
    let email: string;
    let mess: string;
    let seen: boolean;
    let id: any;

    let notif;

    onMount(async () => {
        //Total of unread messages
        const mesage = await pb.collection("contact").getFullList({
            filter: "seen = False",
        });
        messages = mesage.length;

        const record = await pb.collection("contact").getOne($page.params.slug);
        created = record.created;
        email = record.email;
        firstname = record.firstname;
        lastname = record.lastname;
        mess = record.message;
        seen = record.seen;
        id = record.id;

        notif = document.querySelector(".notifications");

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

    async function mark() {
        seen = true;
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            message: mess,
            seen: true,
        };

        const record = await pb.collection("contact").update(id, data);

        notif.classList.remove("close");

        setTimeout(() => {
            notif.classList.add("close");
        }, 4000);
    }

    onDestroy(() => {
        unsubscribe?.();
    });

    function signOut() {
        pb.authStore.clear();
    }
</script>

<title>Admin - Messages</title>

<div class="notifications close">
    <span
        >Message marked as seen <i
            class="bx bx-x-circle"
            on:click={() => notif.classList.add("close")}
        ></i></span
    >
</div>

<div class="wrapper">
    {#if $currentUser}
        <div class="sidebar">
            <a href="" class="logo">
                <i class="bx bx-code-alt"></i>
                <div class="logo-name"><span>Admin</span> Panel</div>
            </a>
            <ul class="side-menu">
                <li>
                    <a href="/admin/"
                        ><i class="bx bxs-dashboard"></i>Dashboard</a
                    >
                </li>
                <li>
                    <a href="/admin?id=products"
                        ><i class="bx bx-store-alt"></i>Products</a
                    >
                </li>
                <li>
                    <a href="/admin?id=orders"
                        ><i class="bx bx-receipt"></i>Orders</a
                    >
                </li>
                <li class="active">
                    <a href="/admin?id=messages"
                        ><i class="bx bx-message-square-dots"></i>Messages</a
                    >
                </li>
                <li>
                    <a href="/admin?id=newsletter"
                        ><i class="bx bx-envelope"></i>Newsletter</a
                    >
                </li>
                <li>
                    <a href="/admin?id=users"
                        ><i class="bx bx-group"></i>Users</a
                    >
                </li>
            </ul>
            <ul class="side-menu">
                <li>
                    <a href="/admin?id=login" on:click={signOut} class="logout"
                        ><i class="bx bx-log-out-circle"></i>Logout</a
                    >
                </li>
            </ul>
        </div>
    {/if}
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
                    <h1>Messages - {created}</h1>
                </div>
            </div>
            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <h3>{firstname} {lastname}</h3>
                    </div>
                    <p>{mess}</p>
                    <br />
                    {#if !seen}
                        <button class="btn fill" on:click={mark}
                            >Mark as Seen</button
                        >
                    {/if}
                </div>
            </div>
        </main>
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

    .notifications {
        position: fixed;
        top: 15px;
        right: 15px;
        z-index: 3000;
        color: var(--light);
        overflow-x: hidden;
        scrollbar-width: none;
        transition: all 0.3s ease;
        span {
            background: var(--warning);
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
        &.close {
            right: -300px;
            animation: none;
        }
    }

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
                        p {
                            font-size: 16px;
                            padding: 6px 16px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .status {
                            font-size: 12px;
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
            }
        }
    }
</style>
