<div class="content">
    <div class="text">
        <h3>Shop</h3>
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
        }
    }
</style>
