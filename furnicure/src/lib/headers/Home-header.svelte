<script lang="ts">
    import couch from "$lib/images/couch.png";
</script>

<div class="content">
    <div class="text">
        <h3>Modern Interior</h3>
        <h3>Design Studio</h3>
        <p>
            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
            velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
        </p>
        <button class="btn fill">Shop now</button>
        <button class="btn outline">Explore</button>
    </div>
    <div class="img">
        <img src={couch} alt="" />
    </div>
</div>

<style lang="scss">
    $sm: 576px;
    $md: 768px;
    $lg: 992px;
    $xl: 1200px;
    $xxl: 1400px;

    .content {
        padding: calc(4rem - 30px) 0 0rem 0;
        @media (min-width: $md) {
            padding: calc(4rem - 30px) 0 4rem 0;
        }
        @media (min-width: $lg) {
            padding: calc(8rem - 30px) 0 8rem 0;
        }
        display: flex;
        flex-direction: row;
        .text {
            width: 400px;
            margin-top: auto;
            margin-bottom: auto;
            h3 {
                font-weight: 600;
                font-size: 48px;
                line-height: 48px;
            }
            p {
                margin-top: 2rem;
                color: rgb(255, 255, 255, 0.3);
                margin-bottom: 2rem;
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
                &.outline {
                    color: white;
                    border: 2px solid rgb(255, 255, 255, 0.3);
                    background-color: transparent;
                    &:hover {
                        transition: all 0.3s ease;
                        border-color: white;
                    }
                }
            }
        }
        .img {
            position: relative;
            img {
                position: relative;
                top: 0px;
                right: 0px;
                z-index: 2;
                max-width: 780px;
                left: -20px;
                @media (min-width: $md) {
                    right: 0px;
                    left: -100px;
                }
                @media (min-width: $lg) {
                    left: 0px;
                    top: -80px;
                    position: absolute;
                    right: -50px;
                }
                @media (min-width: $xl) {
                    left: 0px;
                    top: -80px;

                    right: -100px;
                }
            }
            &:after {
                content: "";
                position: absolute;
                width: 255px;
                height: 217px;
                background-image: url("http://i.ladkan.eu/dots-green.svg");
                background-size: contain;
                background-repeat: no-repeat;
                right: -800px;
                top: -0px;
                @media (min-width: $xl) {
                    top: -40px;
                }
            }
        }
    }

    @media screen and (max-width: 1194px) {
        .content {
            flex-direction: column;
            .text {
                width: 100%;
            }
            .img {
                display: none;
            }
        }
    }
</style>
