<template>
    <div class="page order-container page-current">
        <!-- 标题栏 -->
        <header class="bar bar-nav" style="background-color: #fff;">
            <a class="pull-left page-back" @click="pageBack">
                <i class="iconfont icon-callback"></i>
            </a>

            <h1 class="title header-title">{{title}}</h1>
        </header>

        <div class="content">

            <div class="address-box" v-if="baseInfo.quantity">
                <div class="address-box-top"></div>
                <a class="address-box-content" @click.prevent="selectAddress">
                    <div class="address-info-container">

                        <template v-if="address==null">
                            <div class="default-container">
                                <span class="item-icon iconfont icon-dizhi"></span>
                                <span class="item-content">添加地址</span>
                            </div>
                        </template>
                        <template v-else>
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
                        </template>
                    </div>
                    <div class="address-direct">
                        <i class="iconfont icon-xiangyou" v-if="mode==1"></i>
                    </div>
                </a>

                <div class="address-box-bottom"></div>
            </div>

            <div class="tpl-container">
                <div class="total-order" v-if="baseInfo.quantity">
                    <div class="total-order-label">共<label class="total-order-count">{{baseInfo.quantity}}</label>件
                    </div>
                    <div class="total-order-direct"></div>
                </div>
                <ul class="order-list-container">

                    <li class="order-item" v-for="item in list">

                        <template v-if="item.remoteImgLst && item.remoteImgLst.length>0">
                            <div class="order-item-image"
                                 v-bind:style="'background-image: url('+item.remoteImgLst[0].riFileurl+'!m90x90.jpg)'"></div>
                        </template>

                        <template v-else>
                            <div class="order-item-image"></div>
                        </template>

                        <div class="order-item-info">
                            <div class="order-info-item order-info-name">{{item.brandNameEn}} {{item.categoryNameEn}}
                                {{item.styleNameEn}}
                            </div>
                            <div class="order-info-item order-info-size">尺码：{{item.sizeNameEn}}</div>
                            <div class="order-info-item-box">
                                <div class="order-info-item-line">
                                    <div class="order-info-item order-info-size">单价：<label
                                        class="cred">CNY {{item.finalPrice && item.finalPrice.toFixed(2)}}</label></div>
                                </div>
                                <div class="order-info-item-line">
                                    <div class="order-info-item order-info-size">运费：<label
                                        class="cred">CNY {{item.freightPayable && item.freightPayable.toFixed(2)}}</label>
                                    </div>
                                    <div class="order-info-item order-info-size">税费：<label
                                        class="cred">CNY {{item.inlandTaxes && item.inlandTaxes.toFixed(2)}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-info-count">x{{item.quantity}}</div>

                    </li>

                </ul>
                <ul class="product-info" v-if="baseInfo.productTotalPrice">
                    <li class="product-item">
                        <div class="product-item-label">商品金额</div>
                        <div class="product-item-content">+CNY <label>{{baseInfo.productTotalPrice}}</label></div>
                    </li>
                    <li class="product-item">
                        <div class="product-item-label">商家运费</div>
                        <div class="product-item-content" v-bind:class="{'product-item-content-del':baseInfo.isFree}">
                            +CNY <label>{{baseInfo.freightPayable}}</label></div>
                    </li>
                    <li class="product-item">
                        <div class="product-item-label">商家税费</div>
                        <div class="product-item-content">
                            +CNY <label>{{baseInfo.taxesPayable}}</label></div>
                    </li>
                </ul>
                <div class="real-amount" v-if="baseInfo.amountPayable">
                    <div class="real-amount-label">应付款</div>
                    <div class="real-amount-content">
                        <div class="real-amount-line"><strong>+CNY <label>{{baseInfo.amountPayable}}</label></strong>
                        </div>
                        <div class="real-amount-line c9">{{((1 - baseInfo.discountRate) * 100).toFixed(2)}}% Off</div>
                    </div>
                </div>
            </div>
            <div class="btn-bottom">
                <div class="btn-bottom-item btn-bottom-item1">实付款: CNY<strong>{{baseInfo.amountPaid}}</strong></div>
                <a class="btn-bottom-item" @click="payment">去付款</a>
            </div>
        </div>

    </div>

</template>

//样式
<style lang="less" scoped>

    .content {
        padding-bottom: 3rem;
    }

    .address-box {

        background-color: #fff;
        .address-box-top, .address-box-bottom {
            width: 100%;
            height: 3px;
            background-image: url("../../assets/img/dingdan/dingdanguanli_caisezhuangshi@2x.png");
        }
        .address-box-content {
            display: flex;
            padding: .5rem;
            align-items: center;

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

                .default-container {
                    height: 2.8rem;
                    padding: .7rem 0;

                    .item-icon, .item-content {
                        line-height: 1rem;
                    }
                }

            }

            .address-direct {
                width: 1rem;
                flex-shrink: 0;
                text-align: right;
            }
        }

    }

    .total-order {
        height: 2.5rem;
        margin-top: .5rem;
        padding: 0 .5rem;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        .total-order-label {
            line-height: 2.5rem;
            i {
                font-size: .9rem !important;
            }
        }
        .total-order-direct {
            line-height: 2.5rem;
        }
    }

    .order-list-container {

        margin: 0;
        padding: 0;
        overflow: hidden;

        .order-item {
            list-style: none;
            display: flex;
            margin-top: 2px;
            padding: .75rem .5rem;
            background-color: #fff;
            overflow: hidden;
            position: relative;

            .order-item-image {
                width: 4.5rem;
                height: 4.5rem;
                flex-shrink: 0;
                background-size: cover;
                background-position: center center;
                background-color: #f3f3f3;
            }

            .order-item-info {
                width: 100%;
                overflow: hidden;
                position: relative;

                .order-info-item {
                    height: 1rem;
                    font-size: .6rem !important;
                    line-height: 1rem;
                    padding-left: .5rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    label {
                        font-size: .6rem !important;
                    }
                }
                .order-info-name {
                    font-weight: bold
                }
                .order-info-color, .order-info-size {
                    width: 100%;
                    height: 1rem;
                    color: #777;
                }

                .order-info-item-box {
                    height: 2rem;
                    margin-top: .5rem;

                    .order-info-item-line {
                        display: flex;
                    }
                }
                .order-info-price {
                    width: 100%;
                    height: 1rem;
                    color: #dd5a60;
                }

            }
            .order-info-count {
                position: absolute;
                bottom: .75rem;
                right: .5rem;
                color: #777;
            }
        }

    }

    .product-info {
        margin: .5rem 0 0;
        padding: .2rem .5rem;
        background-color: #fff;

        .product-item {
            list-style: none;
            display: flex;
            justify-content: space-between;
            height: 1rem;

            .product-item-label {
                line-height: 1rem;
                color: #777;
            }

            .product-item-content {
                line-height: 1rem;
                color: #dd5a60;
                label {
                    color: #dd5a60;
                }

                &.product-item-content-del {
                    color: #999;
                    text-decoration: line-through;
                    label {
                        color: #999;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }

    .real-amount {
        height: 3.5rem;
        margin-top: 2px;
        padding: 0 .5rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;

        .real-amount-label {
            line-height: 2.5rem;
        }
        .real-amount-content {
            height: 3.5rem;
            padding: .75rem 0;

            .real-amount-line {
                line-height: 1rem;
                text-align: right;
                color: #dd5a60;
                label, strong {
                    color: #dd5a60;
                }
            }
        }
    }

    .btn-bottom {
        display: flex;

        .btn-bottom-item {
            display: block;
            height: 100%;
            line-height: 2.5rem;
            width: 100%;
            text-align: center;
        }
        .btn-bottom-item1 {
            padding-right: 1rem;
            width: 200%;
            text-align: right;
            background-color: #ffffff;
        }
    }

</style>


<script>

    import service from '../../services'
    import {each as _each} from 'underscore'

    export default {

        data() {
            return {
                mode: 1,
                address: null,
                list: [],
                baseInfo: {}
            }
        },

        computed: {
            title() {
                return this.mode == 1 ? "填写订单" : "订单详情"
            }
        },

        created() {


            this.address = this.$store.getters.address;
            this.list = this.$store.getters.productList;
            this.baseInfo = this.$store.getters.baseInfo

            this.mode = this.baseInfo.hasOrder ? 3 : 1;


        },

        methods: {

            payment() {

                if (!this.address || this.list.length == 0 || !!this.locked) {
                    return false;
                }

                //校验购买件数小于库存
                let valid = true
                _each(this.list, item => {
                    if (item.quantity > item.repertory) {
                        valid = false
                        this.$toast.warning(item.brandNameEn + "超过了库存量")
                        return false
                    }
                })
                if (!valid) {
                    return false
                }

                this.locked = true;

                if (!this.baseInfo.hasOrder) {
                    let supplierIds = [];
                    _each(this.list, (item) => {
                        supplierIds.push(item.feedbackId);
                    })

                    service.post("/order/add", {
                        supplierIds: supplierIds.join(","),
                        consignee: this.address.consignee,
                        mobile: this.address.mobile,
                        address: this.address.province + this.address.city + this.address.country + this.address.address,
                        rate: this.baseInfo.exchangeRate,
                        productIds: this.baseInfo.productIds

                    }).then((response) => {
                        let ret = response.data;
                        if (ret.success) {
                            this.$store.dispatch("setPaymentInfo", {data: ret.data}).then(() => {
                                this.$store.dispatch("setOrderStatus", {address: ret.data}).then(() => {
                                    this.$router.push({path: "/payment", query: {mode: this.mode}})
                                })
                            });
                        }
                    }).catch(e => {
                        this.locked = false
                    })
                }

                if (this.baseInfo.hasOrder) {
                    this.$store.dispatch("setPaymentInfo", {data: this.address}).then(() => {
                        this.$router.push({path: "/payment", query: {mode: this.mode}})
                    });
                }


            },

            //选择收获地址
            selectAddress() {
                if (this.mode == 1) {
                    this.$router.push({
                        path: '/selectaddress'
                    })
                }
            },

            pageBack() {
                this.$router.go(-1)
            }
        }

    }
</script>


















