<template>

    <my-scroll :refresh="refresh" :loadMore="loadMore" :list="list" :hasMoreData="hasMoreData">
        <ul class="demand-list" id="demand-list">
            <template v-for="(item,index) in list">
                <li class="list-item">
                    <div class="info-box">
                        <div class="item-row">
                            <span class="item-label">商品编号：</span>
                            <span class="item-text">{{item.proNo}}</span>
                        </div>
                        <div class="item-row">
                            <span class="item-label">品牌：</span>
                            <span class="item-text">{{item.brandNameEn}}</span>
                        </div>
                        <div class="item-row">
                            <span class="item-label">品类：</span>
                            <span class="item-text">{{item.categoryNameEn}}</span>
                        </div>
                    </div>

                    <!--<template v-if="item.status=='1100'">
                      <div class="item-bottom">
                        <a class="btn-simple" @click="cancel(item)">取消</a>
                        <a class="btn-simple" @click="edit(item)">编辑</a>
                      </div>
                    </template>-->
                    <template v-if="item.status=='1100'||item.status=='1200'">
                        <div class="item-bottom">
                            <a class="btn-simple" @click="cancel(item)">取消</a>
                            <a class="btn-simple" @click="edit(item)"
                               v-if="!item.feedbackList || (item.feedbackList && item.feedbackList.length ===0)">编辑</a>
                        </div>
                    </template>
                    <template v-if="item.status=='1300'">
                        <div class="item-bottom">
                            <a class="btn-color" @click="addShoppingCart(item)">加入购物车</a>
                            <router-link class="btn-simple" :to="{ path: '/demanddetail', query: { id: item.id }}">详情
                            </router-link>
                        </div>
                    </template>
                    <template v-if="item.status=='1400'">
                        <div class="item-bottom">
                            <a class="btn-simple" @click="deleteDemand(item)">删除</a>
                        </div>
                    </template>
                    <template v-if="item.status=='1500'">
                        <div class="item-bottom">
                            <router-link class="btn-simple" :to="{ path: '/demanddetail', query: { id: item.id }}">详情
                            </router-link>
                        </div>
                    </template>
                    <div v-if="item.status=='1100' || item.status=='1200'" class="item-icon item-icon-daifankui"></div>
                    <div v-if="item.status=='1300'" class="item-icon item-icon-yifankui"></div>
                    <div v-if="item.status=='1400'" class="item-icon item-icon-yiquxiao"></div>
                    <div v-if="item.status=='1500'" class="item-icon item-icon-yiwancheng"></div>
                </li>
            </template>
        </ul>
        <div v-if="load && list.length === 0" class="empty-container">
            <div class="empty-icon"></div>
            <p class="empty-text">对不起，目前没有数据</p>
        </div>

    </my-scroll>

</template>


<style lang="less" scoped>
    .demand-list {
        margin: 0;
        padding: 0;

        .list-item {
            position: relative;
            list-style: none;
            display: block;
            background-color: #fff;
            margin-bottom: .5rem;

            .info-box {
                padding: .5rem .5rem;
            }
            .item-row {
                height: 1.2rem;
                display: flex;
            }
            .item-label {
                width: 4rem;
                flex-shrink: 0;
                line-height: 1.2rem;
                text-align: right;
            }
            .item-text {
                width: 100%;
                line-height: 1.2rem;
                text-indent: .5rem;
            }

            .item-bottom {
                display: flex;
                height: 2rem;
                padding: 0 .5rem;
                border-top: 1px solid #f3f3f3;
                flex-direction: row-reverse;

                .btn-color, .btn-simple {
                    width: 3rem;
                    height: 1.1rem;
                    margin: .45rem 0 0 .5rem;
                    line-height: 1rem;
                    text-align: center;
                    border: 1px solid #D9B766;
                    color: #D9B766;
                    border-radius: .2rem;
                }
                .btn-color {
                    width: 4rem;
                    background-color: #D9B766;
                    color: #ffffff;
                }
            }

            .item-icon {
                position: absolute;
                width: 2rem;
                height: 2rem;
                top: 0;
                right: 0;
                z-index: 1;
                background-size: cover;
            }

            .item-icon-daifankui {
                background-image: url("../../assets/img/dingdan/chanpinxuqiu_daifankui@2x.png");
            }
            .item-icon-yifankui {
                background-image: url("../../assets/img/dingdan/chanpinxuqiu_yifankui@2x.png");
            }
            .item-icon-yiquxiao {
                background-image: url("../../assets/img/dingdan/chanpinxuqiu_yiquxiao@2x.png");
            }
            .item-icon-yiwancheng {
                background-image: url("../../assets/img/dingdan/chanpinxuqiu_yiwancheng@2x.png");
            }
        }
    }
</style>


<script>

    import service from '../../services'
    import MyScroll from '../common/MyScroll'


    export default {
        components: {
            MyScroll
        },
        name: "demand-list",
        props: {
            status: {
                type: String,
                default: null
            },
            show: {
                required: true,
                type: Boolean
            }
        },
        data() {
            return {
                pageSize: 10,
                pageIndex: 1,
                pageCount: 1,

                load: false,
                hasMoreData: true,
                list: []
            }
        },

        watch: {
            show(val) {
                if (val === true && !this.load) {
                    this.getList(true);
                }
            }
        },

        methods: {

            //获取列表数据
            //flag: true 刷新数据，flag: false 附加数据
            getList(flag) {

                return service.get("/product/list", {
                    page: this.pageIndex,
                    limit: this.pageSize,
                    status: this.status
                }).then((response) => {
                    let ret = response.data;
                    if (ret.success) {
                        if (flag) {
                            this.list = ret.dataList
                        } else {
                            this.list = this.list.concat(ret.dataList)
                        }
                        this.load = true;
                        this.pageCount = Math.ceil(ret.totalCount / this.pageSize);

                        this.hasMoreData = this.pageIndex < this.pageCount ? true : false;
                    }
                })
            },

            //取消
            cancel(item) {


                this.$toast.confirm("确认取消此需求", () => {
                    service.post("/product/cancel", {
                        productId: item.productId,
                        id: item.id,
                        status: item.status,
                        version: item.version
                    }).then((res) => {
                        let ret = res.data;
                        if (ret.success) {
                            this.getList(true)
                        } else {
                            this.$toast.error(ret.msg);
                        }
                    })
                })


            },

            //编辑
            edit(item) {
                this.$router.push({
                    path: '/adddemand',
                    query: {
                        type: 'edit',
                        id: item.id
                    }
                })
            },

            //加入购物车
            addShoppingCart(item) {
                service.get("/shappingCart/load", {
                    id: item.id,
                    quantity: 1
                }).then(res => {
                    let ret = res.data;
                    if (ret.success) {
                        if (ret.data == "true") {
                            service.post("/shappingCart/add", {
                                quantity: 1,
                                subtotal: item.finalPrice,
                                productId: item.id
                            }).then((res) => {
                                let ret = res.data;
                                if (ret.success) {
                                    this.$toast.success("加入购物车成功！")
                                } else {
                                    this.$toast.error(ret.msg);
                                }
                            })
                        } else {
                            this.$toast.warning("库存不足！")
                        }
                    }
                })

            },

            //删除
            deleteDemand(item) {

                this.$toast.confirm("确认删除此需求？", () => {
                    service.post("/product/delete", {
                        id: item.productId
                    }).then((res) => {
                        let ret = res.data;
                        if (ret.success) {
                            this.getList(true)
                        }
                    })
                })


            },

            //列表刷新
            refresh(done) {
                setTimeout(() => {
                    this.pageIndex = 1;
                    this.getList(true).then(() => {
                        done();
                    })
                }, 500)
            },

            loadMore(done) {
                setTimeout(() => {
                    if (this.pageIndex < this.pageCount) {
                        this.pageIndex++;
                        this.getList(false).then(() => {
                            done();
                        })


                    } else {
                        done();
                    }
                }, 500)
            }

        }
    }
</script>























