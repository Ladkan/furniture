<script lang="ts">
    import { currentUser, pb } from "../../lib/pocketbase";
    import { items, total } from "../../lib/stores/cart";

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

    async function order() {
        if ($total != 0) {
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
                total: $total,
                status: "processing",
                shipping_status: "processing",
                items: JSON.stringify($items),
            };
            const createLine = await pb.collection("orders").create(data);
            reload();
        }
    }

    function reload() {
        items.set([]);
        country = null;
        firstname = null;
        lastname = null;
        companyname = null;
        address = null;
        apartment = null;
        state = null;
        postal = null;
        email = null;
        phone = null;
        notes = null;
    }
</script>

<main>
    <div class="billing">
        <h3>Biling Details</h3>
        <form on:submit|preventDefault={order}>
            <div class="form-item">
                <label>Country <span>*</span></label>
                <select required bind:value={country}>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda"
                        >Antigua and Barbuda</option
                    >
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
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
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory"
                        >British Indian Ocean Territory</option
                    >
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic"
                        >Central African Republic</option
                    >
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Islands"
                        >Cocos (Keeling) Islands</option
                    >
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo"
                        >Congo, the Democratic Republic of the</option
                    >
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia (Hrvatska)</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic" selected
                        >Czech Republic</option
                    >
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic"
                        >Dominican Republic</option
                    >
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands"
                        >Falkland Islands (Malvinas)</option
                    >
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="France Metropolitan"
                        >France, Metropolitan</option
                    >
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
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
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
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
                    <option value="Iran">Iran (Islamic Republic of)</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People's Republic of Korea"
                        >Korea, Democratic People's Republic of</option
                    >
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">Lao People's Democratic Republic</option
                    >
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya"
                        >Libyan Arab Jamahiriya</option
                    >
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia"
                        >Macedonia, The Former Yugoslav Republic of</option
                    >
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia"
                        >Micronesia, Federated States of</option
                    >
                    <option value="Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles"
                        >Netherlands Antilles</option
                    >
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands"
                        >Northern Mariana Islands</option
                    >
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis"
                        >Saint Kitts and Nevis</option
                    >
                    <option value="Saint LUCIA">Saint LUCIA</option>
                    <option value="Saint Vincent"
                        >Saint Vincent and the Grenadines</option
                    >
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe"
                        >Sao Tome and Principe</option
                    >
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia"
                        >South Georgia and the South Sandwich Islands</option
                    >
                    <option value="Span">Spain</option>
                    <option value="SriLanka">Sri Lanka</option>
                    <option value="St. Helena">St. Helena</option>
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
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
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
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos"
                        >Turks and Caicos Islands</option
                    >
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates"
                        >United Arab Emirates</option
                    >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands"
                        >United States Minor Outlying Islands</option
                    >
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
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
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                </select>
            </div>
            <div class="row">
                <div class="form-item">
                    <label>First Name <span>*</span></label>
                    <input type="text" required bind:value={firstname} />
                </div>
                <div class="form-item">
                    <label>Last Name <span>*</span></label>
                    <input type="text" required bind:value={lastname} />
                </div>
            </div>
            <div class="form-item">
                <label>Company Name</label>
                <input type="text" bind:value={companyname} />
            </div>
            <div class="form-item">
                <label>Address <span>*</span></label>
                <input type="text" required bind:value={address} />
            </div>
            <div class="form-item">
                <label>&puncsp;</label>
                <input
                    bind:value={apartment}
                    type="text"
                    placeholder="Apartment, suite, unit etc. (optinal)"
                />
            </div>
            <div class="row">
                <div class="form-item">
                    <label>State / Country<span>*</span></label>
                    <input type="text" required bind:value={state} />
                </div>
                <div class="form-item">
                    <label>Postal / Zip <span>*</span></label>
                    <input type="text" required bind:value={postal} />
                </div>
            </div>
            <div class="row">
                <div class="form-item">
                    <label>Email Address<span>*</span></label>
                    <input type="text" required bind:value={email} />
                </div>
                <div class="form-item">
                    <label>Phone <span>*</span></label>
                    <input type="text" required bind:value={phone} />
                </div>
            </div>
            <div class="form-item">
                <label>Order Notes</label>
                <textarea required bind:value={notes}></textarea>
            </div>
            <button type="submit" class="fill">Place Order</button>
        </form>
    </div>
    <div class="order">
        <h3>Your Order</h3>
        <div class="content">
            <table>
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $items as item}
                        <tr>
                            <td
                                ><p>
                                    {item.name} x {item.qiantity}
                                </p></td
                            >
                            <td><p>${item.price * item.qiantity}</p></td>
                        </tr>
                    {/each}
                    <tr>
                        <td><strong>Cart Subotal</strong></td>
                        <td><p>${$total}</p></td>
                    </tr>
                    <tr>
                        <td><strong>Order Total</strong></td>
                        <td><strong>${$total}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        margin: 7rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .billing {
            h3 {
                font-weight: 500;
                line-height: 1.2;
                font-size: 1.75rem;
                margin-bottom: 1rem;
            }
            form {
                border: 1px solid #dee2e6 !important;
                background-color: white;
                padding: 3rem;
                .row {
                    display: flex;
                    gap: 24px;
                }
                .form-item {
                    display: flex;
                    flex-direction: column;
                    label {
                        span {
                            color: red;
                        }
                    }
                    select {
                        border: 1px solid rgba(0, 0, 0, 0.5);
                        border-radius: 10px;
                        padding: 0.375rem 0.75rem;
                        outline: none;
                        height: 50px;
                        font-size: 1rem;
                        background: none;
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
        .order {
            h3 {
                font-weight: 500;
                line-height: 1.2;
                font-size: 1.75rem;
                margin-bottom: 1rem;
            }
            .content {
                border: 1px solid #dee2e6 !important;
                padding: 3rem;
                background-color: white;
                table {
                    width: 250px;
                    border-collapse: collapse;
                    tbody {
                        tr {
                            transition: all 0.3s ease;
                            border-bottom: 1px solid rgb(0, 0, 0, 0.1);
                        }
                    }
                    th {
                        padding-bottom: 12px;
                        font-size: 13px;
                        text-align: left;
                        border-bottom: 1px solid rgb(0, 0, 0, 0.2);
                    }
                    td {
                        padding: 16px 0;
                    }
                }
            }
        }
    }
</style>
