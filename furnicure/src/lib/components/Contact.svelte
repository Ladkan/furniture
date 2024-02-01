<script lang="ts">
    import { currentUser, pb } from "../../lib/pocketbase";

    let firstname: string;
    let lastname: string;
    let email: string;
    let message: string;

    async function contact() {
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            message: message,
        };
        const createLine = await pb.collection("contact").create(data);

        firstname = null;
        lastname = null;
        email = null;
        message = null;
    }
</script>

<main>
    <form on:submit|preventDefault={contact}>
        <div class="row">
            <div class="form-item">
                <label>First name</label>
                <input type="text" required bind:value={firstname} />
            </div>
            <div class="form-item">
                <label>Last name</label>
                <input type="text" required bind:value={lastname} />
            </div>
        </div>
        <div class="form-item">
            <label>Email address</label>
            <input type="text" required bind:value={email} />
        </div>
        <div class="form-item">
            <label>Message</label>
            <textarea required bind:value={message}></textarea>
        </div>
        <button type="submit" class="fill">Send message</button>
    </form>
</main>

<style lang="scss">
    main {
        margin-top: 7rem;
        margin-bottom: 7rem;
        display: flex;
        flex-direction: column;
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
        form {
            display: flex;
            flex-direction: column;
            .row {
                display: flex;
                justify-content: space-between;
                flex-direction: row;
            }
            .form-item {
                display: flex;
                flex-direction: column;
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
                textarea {
                    border: 1px solid rgba(0, 0, 0, 0.5);
                    border-radius: 10px;
                    padding: 0.375rem 0.75rem;
                    outline: none;
                    height: 150px;
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
            button {
                margin-top: 1rem;
                padding: 12px 30px;
                border-radius: 10px;
                border: none;
                cursor: pointer;
                line-height: 1.5;
                &.fill {
                    background: #2f2f2f;
                    color: white;
                }
            }
        }
    }
</style>
