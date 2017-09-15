<template>

    <div class="page page-current payment-container">
        <!-- 标题栏 -->
        <header class="bar bar-nav">
            <a class="page-back pull-left" @click="pageBack">
                <i class="iconfont icon-callback"></i>
            </a>
            <h1 class="title">付款</h1>

        </header>
        <div class="content">
            <div class="address-box">
                <div class="address-box-top"></div>
                <div class="address-box-content">
                    <template v-if="address != null">
                        <div class="address-info-container">
                            <div class="detail-container">
                                <div class="detail-row">
                                    <div class="detail-item">
                                        <span class="item-icon iconfont icon-touxiang"></span><span
                                        class="item-content">{{address.consignee}}</span></div>
                                    <div class="detail-item">
                                        <span class="item-icon iconfont icon-dianhua"></span><span
                                        class="item-content">{{address.mobile}}</span></div>
                                </div>
                                <div class="detail-row">
                                    <div class="detail-item">
                                        <span class="item-icon iconfont icon-dizhi"></span>
                                        <span
                                            class="item-content">{{address.province}}{{address.city}}{{address.country}}{{address.address}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="address-box-bottom"></div>
            </div>
            <div v-if="address!=null" class="real-payment">
                实付款：+CNY {{address.amountPaid}}
            </div>
            <div class="payment-type">
                <div class="payment-type-title">选择支付方式</div>

                <div class="payment-type-row" v-for="item in selector.list">
                    <div class="payment-type-info">
                        <div v-bind:class="'payment-type-image payment-icon-'+item.name"></div>
                        <div class="payment-type-text">{{item.text}}<label v-if="!item.enable"
                                                                           style="color: #a0a0a0;">（暂不支持）</label></div>
                    </div>

                    <div @click="onSelect(item)">
                        <template v-if="item.name == selector.selected">
                            <div class="payment-type-select selected">
                                <i class="iconfont icon-duigou"></i>
                            </div>
                        </template>
                        <template v-else="">
                            <div class="payment-type-select">
                                <i class="iconfont icon-quan"></i>
                            </div>
                        </template>
                    </div>

                </div>
            </div>

            <div class="btn-bottom" @click="payment">付款</div>

        </div>
        <form style="display: none;" id="pay_form" action="https://gateway.test.95516.com/gateway/api/frontTransReq.do"
              method="post">
        </form>

    </div>
</template>

<style lang="less" scoped>

    //地址栏信息
    .address-box {
        background-color: #fff;
        .address-box-top, .address-box-bottom {
            width: 100%;
            height: 3px;
            background-image: url("../../assets/img/dingdan/dingdanguanli_caisezhuangshi@2x.png");
        }
        .address-box-content {
            height: 3.8rem;
            padding: .5rem;

            .address-info-container {
                width: 100%;
                .detail-container {
                    .detail-row {
                        min-height: 1rem;
                        padding: .1rem 0;
                        line-height: .8rem;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;

                        .detail-item {
                            display: flex;
                            align-items: center;

                            .item-icon {
                                margin-right: 5px;
                                font-weight: bold;
                            }
                            .item-content {
                                word-break: break-all;
                            }
                        }
                    }

                    .detail-row:nth-child(2) {
                        margin-top: .1rem;
                    }
                }

            }

        }
    }

    .real-payment {
        height: 2.5rem;
        margin-top: .3rem;
        line-height: 2.5rem;
        background-color: #fff;
        color: #dd5a60;
        text-align: center;
    }

    //支付方式
    .payment-type {
        background-color: #fff;

        .payment-type-title {
            height: 1.7rem;
            line-height: 1.7rem;
            font-size: 14px;
            text-indent: .5rem;
            background-color: #f3f3f3;
            color: #222;
        }

        .payment-type-row {
            height: 3rem;
            border-bottom: 1px solid #f3f3f3;
            display: flex;
            justify-content: space-between;
            padding: .75rem .5rem;

            .payment-type-info {
                width: 100%;
                height: 1.5rem;
                display: flex;

                .payment-type-image {
                    width: 1.5rem;
                    height: 1.5rem;
                    background-size: cover;
                }

                .payment-icon-wx {
                    background-image: url("../../assets/img/payment/dingdanguanli_weixin@2x.png");
                }
                .payment-icon-zfb {
                    background-image: url("../../assets/img/payment/dingdanguanli_zhifubao@2x.png");
                }
                .payment-icon-yl {
                    background-image: url("../../assets/img/payment/dingdanguanli_yinglian@2x.png");
                }
                .payment-type-text {
                    margin-left: .5rem;
                    line-height: 1.5rem;
                }
            }

            .payment-type-select {
                flex-shrink: 0;
                width: 1.5rem;
                line-height: 1.5rem;
                text-align: center;
                i {
                    font-size: 1rem;
                    color: #ccc;
                }
            }
            .selected {
                color: #D9B766;

                i {
                    color: #D9B766;
                }
            }
        }
    }
</style>


<script>

    import service from '../../services'

    export default {

        data() {
            return {
                mode: 1,
                address: null,
                selector: {
                    selected: 'yl',
                    list: [
                        {
                            name: 'wx',
                            text: '微信',
                            enable: true,
                            icon: './src/assets/img/payment/dingdanguanli_weixin@2x.png'
                        },
                        {
                            name: 'zfb',
                            text: '支付宝',
                            enable: false,
                            icon: './src/assets/img/payment/dingdanguanli_yinglian@2x.png'
                        },
                        {
                            name: 'yl',
                            text: '银联支付',
                            enable: true,
                            icon: './src/assets/img/payment/dingdanguanli_yinglian@2x.png'
                        }
                    ]
                }
            }
        },
        created() {

            this.address = this.$store.getters.payment;

            if (!this.address) {
                this.$router.go(-1);
            }

            let params = this.$router.currentRoute.query;
            this.mode = params.mode;

        },
        methods: {
            onSelect(item) {
                if (!item.enable) {
                    return;
                }
                this.selector.selected = item.name;
            },
            pageBack() {
                this.$router.go(-1);
            },

            //付款
            payment() {
                if (!this.address) {
                    return;
                }
                if (this.selector.selected == "yl") {
                    service.post("/order/unionPayment", {
                        orderNo: this.address.orderNo,
                        version: this.address.version,
                        amountPaid: this.address.amountPaid
                    }).then((response) => {
                        let ret = response.data;
                        if (ret.success) {
                            this.payForYL(ret.data);
                        }
                    });
                }
                if (this.selector.selected == "zfb") {
                    service.post("/order/alipayPaymentForTfb", {
                        orderNo: this.address.orderNo
                    }).then((response) => {
                        let ret = response.data;
                        if (ret.success) {
                        }
                    });
                }
                if (this.selector.selected == "wx") {
                    service.get("/order/wechatAuthCode").then(response => {
                        console.log(response)
                    });
                }
            },

            //银联付款
            payForYL(data) {

                let arrHtml = [];
                let $form = this.$el.querySelector("#pay_form");
                for (let item in data) {
                    if (item === "action") {
                        $form.setAttribute("action", data[item])
                    } else {
                        arrHtml.push('<input type="hidden" id="' + item + '" name="' + item + '" value="' + data[item] + '"/>');
                    }
                }


                $form.innerHTML = arrHtml.join("");
                $form.submit();

            },

            //支付宝付款
            payForZFB(data) {

            }
        }
    }

</script>




























