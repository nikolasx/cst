<template>

    <div class="page page-current">

        <!-- 标题栏 -->
        <header class="bar bar-nav">
            <a class="page-back pull-left" @click="pageBack">
                <i class="iconfont icon-callback"></i>
            </a>
            <h1 class="title" id="header-title">收货地址</h1>
        </header>
        <!-- 这里是页面内容区 -->
        <div class="content">
            <div class="list-block add-address-container">
                <ul style="background-color: transparent">
                    <li class="address-item">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">收货人</div>
                                <div class="item-input">
                                    <input type="text" v-model.trim="form.consignee" placeholder="请输入收货人">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="address-item">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">手机号码</div>
                                <div class="item-input">
                                    <input type="number" placeholder="请输入手机号码" v-model.trim="form.mobile">
                                </div>
                            </div>
                        </div>
                        <div class="info-text">收件人身份信息，所有的身份信息将进行保密，仅用于清关</div>
                    </li>
                    <li class="address-item">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">身份证号码</div>
                                <div class="item-input">
                                    <input type="text" placeholder="请输入身份证号码" v-model.trim="form.idcard">
                                </div>
                            </div>
                        </div>
                        <div class="info-text">身份证照片必须清晰、无水印、四角边框齐全，且身份证未过期。否则包裹将无法清关</div>
                    </li>
                    <li class="add-address-card">
                        <div class="card-box" id="idcard0" @click="selectImage('idcard0')">
                            <template v-if="showIdcardFrontUrl!=''">
                                <img v-bind:src="showIdcardFrontUrl" v-if="/^data/g.test(showIdcardFrontUrl)"
                                     style="width: 100%;height: 100%;"/>
                                <img v-bind:src="fdshost+showIdcardFrontUrl+'!m110x70.jpg'" v-else
                                     style="width: 100%;height: 100%;"/>
                            </template>
                            <template v-else>
                                <div class="card-icon"></div>
                                <p class="card-text">身份证正面</p>
                            </template>
                        </div>
                        <div class="card-box" id="idcard1" @click="selectImage('idcard1')">
                            <template v-if="showIdcardVersoUrl!=''">
                                <img v-bind:src="showIdcardVersoUrl" v-if="/^data/g.test(showIdcardVersoUrl)"
                                     style="width: 100%;height: 100%;"/>
                                <img v-bind:src="fdshost+showIdcardVersoUrl+'!m110x70.jpg'" v-else
                                     style="width: 100%;height: 100%;"/>
                            </template>
                            <template v-else>
                                <div class="card-icon"></div>
                                <p class="card-text">身份证反面</p>
                            </template>
                        </div>
                        <input type="file" name="imgFile" @change="uploadImage" style="display: none"/>
                    </li>
                    <li class="address-item">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">所在地区</div>
                                <a @click="selectAddress" class="address-select-container item-input">
                                    <div class="add-address-text">{{form.province + form.city + form.country}}</div>
                                    <i class="iconfont icon-xiangyou"></i>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="address-item">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">详细地址</div>
                                <div class="item-input">
                                    <input type="text" placeholder="街道、楼牌号等" v-model.trim="form.address">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="address-item">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">设为默认</div>
                                <div class="item-input">
                                    <label class="label-switch">
                                        <input type="checkbox" v-model="form.isDefault">
                                        <div class="checkbox"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="info-text">注：每次下单时会使用该地址</div>
                    </li>
                </ul>
            </div>

            <div class="btn-bottom" @click="save">{{buttonName}}</div>
        </div>
    </div>

</template>


<style lang="stylus" scoped>

    .add-address-container {

        .item-input {
            position relative;
        }

        margin: 0 0 3rem !important;

        * {
            font-size .7rem !important;
        }

        .address-item {
            border-bottom 1px solid #F3F3F3;
            background-color #fff;

            .item-content {
                padding 0.4rem .75rem !important;
                border-bottom none !important;
            }

            .item-inner {

                &:after {
                    width 0;
                    height 0;
                }
            }
        }

        .add-address-card {
            display flex;
            padding .6rem !important;
            background-color transparent !important;

            .card-box {
                width 5.5rem;
                height 3.5rem;
                background-color #fff;
                margin-right .6rem;

                .card-icon {
                    width: 1.1rem;
                    height: .9rem;
                    margin: .8rem auto 0;
                    background-image url(../../assets/img/address/shouhuodizhi_xiangji@2x.png)
                    background-size cover;
                }
                .card-text {
                    text-align center;
                    line-height 1;
                    margin-top .5rem;
                }
            }
        }

        .info-text {
            width 100%;
            padding .2rem .75rem;
            font-size .6rem !important;
            background-color #FFFAF2;
        }

        .item-area {
            i {
                font-size .8rem !important;
                line-height .6 * 1.5rem;
            }
        }

        .address-select-container {
            display flex;
            justify-content space-between;
        }
    }
</style>


<script>

    import service from '../../services'
    import Picker from 'better-picker'
    import {each as _each, keys as _keys} from 'underscore'
    import ImageAgent from '../../plugins/compressimage'

    export default {

        data() {
            return {
                mode: 1,
                fdshost: "",
                form: {
                    id: "",
                    accountId: "",
                    consignee: "",
                    mobile: "",
                    idcard: "",
                    idcardFrontUrl: "",
                    idcardVersoUrl: "",
                    province: "",
                    city: "",
                    country: "",
                    address: "",
                    isDefault: false
                },
                cardId: "idcard0",
                showIdcardFrontUrl: "",
                showIdcardVersoUrl: ""
            }
        },

        computed: {
            buttonName() {
                return this.mode == 1 ? "新增" : "保存"
            }
        },

        created() {
            //获取基础参数
            let params = this.$router.currentRoute.query;
            this.mode = params.mode;

            if (this.mode == 2) {
                service.post("/addressManage/load", {
                    id: params.id
                }).then((res) => {
                    let ret = res.data;
                    if (ret.success) {
                        let data = ret.data;
                        let form = this.form;

                        _each(_keys(form), (item) => {
                            form[item] = data[item]
                        })
                        this.showIdcardFrontUrl = form["idcardFrontUrl"]
                        this.showIdcardVersoUrl = form["idcardVersoUrl"]
                        this.fdshost = data.fdshost;
                    }
                })
            }

            this.createPicker();

        },

        methods: {

            pageBack() {
                //移除picker的DOM
                document.body.removeChild(document.querySelector(".picker"))
                this.$router.go(-1)
            },

            selectImage(id) {
                this.cardId = id;
                this.$el.querySelector('input[name="imgFile"]').click();
            },

            uploadImage() {

                let input = this.$el.querySelector('input[name="imgFile"]'),
                    cardId = this.cardId

                try {

                    let file = null;
                    if (input.files && input.files[0]) {
                        file = input.files[0];
                    } else if (input.files && input.files.item(0)) {
                        file = input.files.item(0);
                    } else {
                        return;
                    }

                    let reader = new FileReader();
                    reader.onload = e => {
                        ImageAgent.mixedCompress(e.target.result).then(res => {

                            //这里先用前端图片显示在页面上
                            if (cardId == "idcard0") {
                                this.showIdcardFrontUrl = res;
                            } else {
                                this.showIdcardVersoUrl = res;
                            }

                            service.post("/addressManage/imgFileUpload", {
                                imageStrLst: res,
                                imageNameLst: file.name
                            }).then(res => {
                                let ret = res.data
                                if (ret.success) {
                                    let data = ret.data;
                                    this.fdshost = data["fdshost"];
                                    if (cardId == "idcard0") {
                                        this.form.idcardFrontUrl = data['path'];
                                    } else {
                                        this.form.idcardVersoUrl = data['path'];
                                    }
                                } else {
                                    if (cardId == "idcard0") {
                                        this.showIdcardFrontUrl = this.form.idcardFrontUrl;
                                    } else {
                                        this.showIdcardVersoUrl = this.form.idcardVersoUrl;
                                    }
                                }
                            })
                            input.value = "";
                        })

                    }

                    reader.readAsDataURL(file);

                } catch (e) {

                }


            },

            validate() {
                var data = this.form;
                if (data.consignee == "") {
                    this.$toast.warning("请填写收货人！");
                    return false;
                }
                if (data.mobile == "") {
                    this.$toast.warning("请填写电话号码！");
                    return false;
                }
                if (!/^1([0-9]{10})$/.test(data.mobile)) {
                    this.$toast.warning("请填写正确的手机号码！");
                    return false;
                }
                if (data.idcard == "") {
                    this.$toast.warning("请填写身份证号码！");
                    return false;
                }
                if (!/^(\d{15}$|^\d{17}(\d|X|x))$/.test(data.idcard)) {
                    this.$toast.warning("请填写正确的身份证号码！");
                    return false;
                }
                if (data.idcardFrontUrl == "") {
                    this.$toast.warning("请选择身份证正面照！");
                    return false;
                }
                if (data.idcardVersoUrl == "") {
                    this.$toast.warning("请选择身份证反面照！");
                    return false;
                }
                if (data.province == "") {
                    this.$toast.warning("请选择省市区信息！");
                    return false;
                }
                if (data.address == "") {
                    this.$toast.warning("请填写详细地址！");
                    return false;
                }
                return true;
            },

            //保存
            save() {
                let formData = this.form;
                if (!this.validate()) {
                    return;
                }
                formData.isDefault = formData.isDefault ? 1 : 0;

                let url = this.mode == 1 ? "/addressManage/add" : "/addressManage/update";
                service.post(url, formData).then((res) => {
                    let ret = res.data;
                    if (ret.success) {
                        this.pageBack();
                    }
                })
            },

            //获取省市区信息
            getRegionData(parentId) {

                return new Promise((resolve, reject) => {
                    service.post("/addressManage/regionList", {
                        parentId: parentId
                    }).then((res) => {
                        let ret = res.data;
                        if (ret.success) {
                            let result = [];
                            _each(ret.dataList, (item) => {
                                result.push({
                                    value: item.regionId,
                                    text: item.regionName,
                                    parentId: item.parentId
                                })
                            })
                            resolve(result)
                        }
                    })
                })

            },

            //创建一个选择器对象
            createPicker() {
                let province = [], city = [], country = [];
                this.getRegionData(1).then((res) => {
                    province = res;
                    this.getRegionData(province[0].value).then(res => {
                        city = res;
                        this.getRegionData(city[0].value).then(res => {
                            country = res;
                            let picker = new Picker({
                                data: [province, city, country]
                            });

                            let that = this;

                            picker.on("picker.select", (arrVal, arrIndex) => {
                                that.form.province = province[arrIndex[0]].text;
                                that.form.city = city[arrIndex[1]] && city[arrIndex[1]].text || "";
                                that.form.country = country[arrIndex[2]] && country[arrIndex[2]].text || ""
                            })
                            picker.on("picker.change", (index, selectedIndex) => {

                                if (index == 0) {
                                    let val = province[selectedIndex];
                                    this.getRegionData(val.value).then((res) => {
                                        city = res;
                                        picker.refillColumn(1, city);

                                        this.getRegionData(city[0].value).then((res) => {
                                            country = res;
                                            picker.refillColumn(2, country)
                                        })
                                    })
                                }
                                else if (index == 1) {
                                    let val = city[selectedIndex]
                                    this.getRegionData(val.value).then((res) => {
                                        country = res;
                                        picker.refillColumn(2, country);
                                    })
                                }
                            })


                            this.picker = picker;
                        })

                    })


                });

            },

            selectAddress() {
                this.picker.show();
            }
        }


    }

</script>























