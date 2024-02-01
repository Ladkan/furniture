<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount, onDestroy } from "svelte";
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";

    let messages;
    let id: string;
    let created: string;
    let country: string;
    let firstname: string;
    let lastname: string;
    let companyname: string;
    let address: string;
    let apartment: string;
    let state: string;
    let postal: string;
    let email: string;
    let phone: string;
    let notes: string;
    let items = [];
    let total: number;
    let shipping_status: string;
    let status: string;
    let unsubscribe: () => void;

    let notif;

    async function order_update() {
        const data = {
            country: country,
            firstname: firstname,
            lastname: lastname,
            companyname: companyname,
            address: address,
            apartment: apartment,
            state: state,
            postal: postal,
            email: email,
            phone: phone,
            notes: notes,
            total: total,
            status: status,
            shipping_status: shipping_status,
            items: JSON.stringify(items),
        };

        const record = await pb.collection("orders").update(id, data);
        notif.classList.remove("close");

        setTimeout(() => {
            notif.classList.add("close");
        }, 4000);
    }

    onMount(async () => {
        //Total of unread messages
        const mesage = await pb.collection("contact").getFullList({
            filter: "seen = False",
        });
        messages = mesage.length;

        const record = await pb.collection("orders").getOne($page.params.slug);
        country = record.country;
        address = record.address;
        apartment = record.apartment;
        created = record.created;
        email = record.email;
        firstname = record.firstname;
        lastname = record.lastname;
        notes = record.notes;
        phone = record.phone;
        postal = record.postal;
        shipping_status = record.shipping_status;
        state = record.state;
        status = record.status;
        total = record.total;
        companyname = record.companyname;
        id = record.id;

        record.items.forEach((i) => {
            items = [...items, i];
        });

        console.log(items);

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

    onDestroy(() => {
        unsubscribe?.();
    });

    function signOut() {
        pb.authStore.clear();
    }
</script>

<title>Admin - Order</title>

<div class="notifications close">
    <span
        >Order updated <i
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
                <li class="active">
                    <a href="/admin?id=orders"
                        ><i class="bx bx-receipt"></i>Orders</a
                    >
                </li>
                <li>
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
                    <h1>Order - {created}</h1>
                </div>
            </div>
            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <h3>{firstname} {lastname} - ${total}</h3>
                        <p>
                            Order: &#8203;<span class="status {status}"
                                >{status}</span
                            >
                        </p>
                        <p>
                            Shipping: &#8203;<span
                                class="status {shipping_status}"
                                >{shipping_status}</span
                            >
                        </p>
                    </div>
                    <form on:submit|preventDefault={order_update}>
                        <div class="row">
                            <div class="form-item">
                                <label>Firstname</label>
                                <input type="text" bind:value={firstname} />
                            </div>
                            <div class="form-item">
                                <label>Lastname</label>
                                <input type="text" bind:value={lastname} />
                            </div>
                            <div class="form-item">
                                <label>Email</label>
                                <input type="text" bind:value={email} />
                            </div>
                            <div class="form-item">
                                <label>Phone</label>
                                <input type="text" bind:value={phone} />
                            </div>
                            <div class="form-item">
                                <label>Address</label>
                                <input type="text" bind:value={address} />
                            </div>
                            <div class="form-item">
                                <label>Apartment</label>
                                <input type="text" bind:value={apartment} />
                            </div>
                            <div class="form-item">
                                <label>Postal</label>
                                <input type="text" bind:value={postal} />
                            </div>
                            <div class="form-item">
                                <label>State</label>
                                <input type="text" bind:value={state} />
                            </div>
                            <div class="form-item">
                                <label>Country</label>
                                <select bind:value={country}>
                                    <option value="Afghanistan"
                                        >Afghanistan</option
                                    >
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa"
                                        >American Samoa</option
                                    >
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antartica">Antarctica</option
                                    >
                                    <option value="Antigua and Barbuda"
                                        >Antigua and Barbuda</option
                                    >
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan"
                                        >Azerbaijan</option
                                    >
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh"
                                        >Bangladesh</option
                                    >
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegowina"
                                        >Bosnia and Herzegowina</option
                                    >
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island"
                                        >Bouvet Island</option
                                    >
                                    <option value="Brazil">Brazil</option>
                                    <option
                                        value="British Indian Ocean Territory"
                                        >British Indian Ocean Territory</option
                                    >
                                    <option value="Brunei Darussalam"
                                        >Brunei Darussalam</option
                                    >
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso"
                                        >Burkina Faso</option
                                    >
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde"
                                        >Cape Verde</option
                                    >
                                    <option value="Cayman Islands"
                                        >Cayman Islands</option
                                    >
                                    <option value="Central African Republic"
                                        >Central African Republic</option
                                    >
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island"
                                        >Christmas Island</option
                                    >
                                    <option value="Cocos Islands"
                                        >Cocos (Keeling) Islands</option
                                    >
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo"
                                        >Congo, the Democratic Republic of the</option
                                    >
                                    <option value="Cook Islands"
                                        >Cook Islands</option
                                    >
                                    <option value="Costa Rica"
                                        >Costa Rica</option
                                    >
                                    <option value="Cota D'Ivoire"
                                        >Cote d'Ivoire</option
                                    >
                                    <option value="Croatia"
                                        >Croatia (Hrvatska)</option
                                    >
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic"
                                        >Czech Republic</option
                                    >
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic"
                                        >Dominican Republic</option
                                    >
                                    <option value="East Timor"
                                        >East Timor</option
                                    >
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador"
                                        >El Salvador</option
                                    >
                                    <option value="Equatorial Guinea"
                                        >Equatorial Guinea</option
                                    >
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands"
                                        >Falkland Islands (Malvinas)</option
                                    >
                                    <option value="Faroe Islands"
                                        >Faroe Islands</option
                                    >
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="France Metropolitan"
                                        >France, Metropolitan</option
                                    >
                                    <option value="French Guiana"
                                        >French Guiana</option
                                    >
                                    <option value="French Polynesia"
                                        >French Polynesia</option
                                    >
                                    <option value="French Southern Territories"
                                        >French Southern Territories</option
                                    >
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe"
                                        >Guadeloupe</option
                                    >
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau"
                                        >Guinea-Bissau</option
                                    >
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard and McDonald Islands"
                                        >Heard and Mc Donald Islands</option
                                    >
                                    <option value="Holy See"
                                        >Holy See (Vatican City State)</option
                                    >
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran"
                                        >Iran (Islamic Republic of)</option
                                    >
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan"
                                        >Kazakhstan</option
                                    >
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option
                                        value="Democratic People's Republic of Korea"
                                        >Korea, Democratic People's Republic of</option
                                    >
                                    <option value="Korea"
                                        >Korea, Republic of</option
                                    >
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan"
                                        >Kyrgyzstan</option
                                    >
                                    <option value="Lao"
                                        >Lao People's Democratic Republic</option
                                    >
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya"
                                        >Libyan Arab Jamahiriya</option
                                    >
                                    <option value="Liechtenstein"
                                        >Liechtenstein</option
                                    >
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg"
                                        >Luxembourg</option
                                    >
                                    <option value="Macau">Macau</option>
                                    <option value="Macedonia"
                                        >Macedonia, The Former Yugoslav Republic
                                        of</option
                                    >
                                    <option value="Madagascar"
                                        >Madagascar</option
                                    >
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands"
                                        >Marshall Islands</option
                                    >
                                    <option value="Martinique"
                                        >Martinique</option
                                    >
                                    <option value="Mauritania"
                                        >Mauritania</option
                                    >
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia"
                                        >Micronesia, Federated States of</option
                                    >
                                    <option value="Moldova"
                                        >Moldova, Republic of</option
                                    >
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montserrat"
                                        >Montserrat</option
                                    >
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique"
                                        >Mozambique</option
                                    >
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands"
                                        >Netherlands</option
                                    >
                                    <option value="Netherlands Antilles"
                                        >Netherlands Antilles</option
                                    >
                                    <option value="New Caledonia"
                                        >New Caledonia</option
                                    >
                                    <option value="New Zealand"
                                        >New Zealand</option
                                    >
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island"
                                        >Norfolk Island</option
                                    >
                                    <option value="Northern Mariana Islands"
                                        >Northern Mariana Islands</option
                                    >
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea"
                                        >Papua New Guinea</option
                                    >
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines"
                                        >Philippines</option
                                    >
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico"
                                        >Puerto Rico</option
                                    >
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia"
                                        >Russian Federation</option
                                    >
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Kitts and Nevis"
                                        >Saint Kitts and Nevis</option
                                    >
                                    <option value="Saint LUCIA"
                                        >Saint LUCIA</option
                                    >
                                    <option value="Saint Vincent"
                                        >Saint Vincent and the Grenadines</option
                                    >
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino"
                                        >San Marino</option
                                    >
                                    <option value="Sao Tome and Principe"
                                        >Sao Tome and Principe</option
                                    >
                                    <option value="Saudi Arabia"
                                        >Saudi Arabia</option
                                    >
                                    <option value="Senegal">Senegal</option>
                                    <option value="Seychelles"
                                        >Seychelles</option
                                    >
                                    <option value="Sierra">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia"
                                        >Slovakia (Slovak Republic)</option
                                    >
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands"
                                        >Solomon Islands</option
                                    >
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa"
                                        >South Africa</option
                                    >
                                    <option value="South Georgia"
                                        >South Georgia and the South Sandwich
                                        Islands</option
                                    >
                                    <option value="Span">Spain</option>
                                    <option value="SriLanka">Sri Lanka</option>
                                    <option value="St. Helena"
                                        >St. Helena</option
                                    >
                                    <option value="St. Pierre and Miguelon"
                                        >St. Pierre and Miquelon</option
                                    >
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard"
                                        >Svalbard and Jan Mayen Islands</option
                                    >
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland"
                                        >Switzerland</option
                                    >
                                    <option value="Syria"
                                        >Syrian Arab Republic</option
                                    >
                                    <option value="Taiwan"
                                        >Taiwan, Province of China</option
                                    >
                                    <option value="Tajikistan"
                                        >Tajikistan</option
                                    >
                                    <option value="Tanzania"
                                        >Tanzania, United Republic of</option
                                    >
                                    <option value="Thailand">Thailand</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago"
                                        >Trinidad and Tobago</option
                                    >
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan"
                                        >Turkmenistan</option
                                    >
                                    <option value="Turks and Caicos"
                                        >Turks and Caicos Islands</option
                                    >
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates"
                                        >United Arab Emirates</option
                                    >
                                    <option value="United Kingdom"
                                        >United Kingdom</option
                                    >
                                    <option value="United States"
                                        >United States</option
                                    >
                                    <option
                                        value="United States Minor Outlying Islands"
                                        >United States Minor Outlying Islands</option
                                    >
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan"
                                        >Uzbekistan</option
                                    >
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Viet Nam</option>
                                    <option value="Virgin Islands (British)"
                                        >Virgin Islands (British)</option
                                    >
                                    <option value="Virgin Islands (U.S)"
                                        >Virgin Islands (U.S.)</option
                                    >
                                    <option value="Wallis and Futana Islands"
                                        >Wallis and Futuna Islands</option
                                    >
                                    <option value="Western Sahara"
                                        >Western Sahara</option
                                    >
                                    <option value="Yemen">Yemen</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                            <div class="form-item">
                                <label>Compnay name</label>
                                <input type="text" bind:value={companyname} />
                            </div>
                            <div class="form-item">
                                <label>Order status</label>
                                <select bind:value={status}>
                                    <option value="paid">Paid</option>
                                    <option value="processing"
                                        >Processing</option
                                    >
                                    <option value="canceled">Canceled</option>
                                    <option value="declined">Declined</option>
                                </select>
                            </div>
                            <div class="form-item">
                                <label>Shipping status</label>
                                <select bind:value={shipping_status}>
                                    <option value="shipping">Shipping</option>
                                    <option value="processing"
                                        >Processing</option
                                    >
                                    <option value="canceled">Canceled</option>
                                    <option value="deliverd">Deliverd</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>Order Notes</label>
                            <textarea bind:value={notes}></textarea>
                        </div>
                        <br />
                        <button class="btn fill">Update</button>
                    </form>
                </div>
            </div>
            <div class="products">
                {#each items as i}
                    <div class="product">
                        <img src={i.img} alt="" />
                        <h3>{i.name}</h3>
                        <p>Qiantity: {i.qiantity}</p>
                    </div>
                {/each}
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
            right: -200px;
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
                    form {
                        flex-grow: 1;
                        flex-basis: 500px;
                        .row {
                            display: flex;
                            gap: 24px;
                            flex-wrap: wrap;
                        }
                        .form-item {
                            display: flex;
                            flex-direction: column;
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
                                    box-shadow: 0 1px 4px 0
                                        rgba(var(--primary), 0.2);
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
                                    box-shadow: 0 1px 4px 0
                                        rgba(var(--primary), 0.2);
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
                                background: #fab941;
                            }
                        }
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
                        img {
                            max-width: 250px;
                        }
                    }
                }
            }
        }
    }
</style>
