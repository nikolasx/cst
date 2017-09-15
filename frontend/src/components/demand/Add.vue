<template>

    <div class="page page-current">

        <header class="bar bar-nav">
            <a class="pull-left page-back" @click="pageBack">
                <i class="iconfont icon-callback"></i>
            </a>
            <h1 class="title">{{title}}</h1>
        </header>

        <div class="content">

            <ul class="form-container">
                <li class="form-item">
                    <div class="item-label">商品编号：</div>
                    <div class="item-input">
                        <input v-if="type=='add'" v-model="form.proNo" class="field-input" placeholder="输入、扫一扫、必填"/>
                        <span class="field-input-readonly" v-else>{{form.proNo}}</span>
                    </div>

                </li>
                <li class="form-item">
                    <div class="item-label">品牌：</div>
                    <div class="item-input">
                        <a class="select-brand" @click="selectBrand">
                            <span class="brand-value">{{brandNameEn}}</span>
                            <span class="iconfont icon-xiangyou" v-if="type=='add'"></span>
                        </a>
                    </div>
                </li>
                <li class="form-item">
                    <div class="item-label">品类：</div>
                    <div class="item-input">
                        <select class="field-input" v-model="form.categoryId" placeholder="请选择品类" v-if="type=='add'">
                            <option v-for="category in categoryList" :value="category.id">{{category.enName}}</option>
                        </select>
                        <span class="field-input-readonly" v-else>{{categoryNameEn}}</span>
                    </div>
                </li>
                <li class="form-item">
                    <div class="item-label">款式：</div>
                    <div class="item-input">
                        <select class="field-input" v-model="form.styleId" placeholder="请选择款式" v-if="type=='add'">
                            <option v-for="style in styleList" :value="style.id">{{style.enName}}</option>
                        </select>
                        <span class="field-input-readonly" v-else>{{styleNameEn}}</span>
                    </div>
                </li>
                <li class="form-item">
                    <div class="item-label">尺寸：</div>
                    <div class="item-input">
                        <input class="field-input" placeholder="请输入尺寸、选填" v-model="form.sizeNameEn"/>
                    </div>
                </li>
                <li class="form-item">
                    <div class="item-label">图片：</div>
                    <div class="item-input">
                        <span class="item-input-text">（最多添加6张图片）</span>
                    </div>
                </li>
                <div class="image-container">
                    <template v-for="imgItem in imgList">
                        <div class="image-item-container">
                            <img v-bind:src="imgItem.imgURL" :data-id="imgItem.id"/>
                            <div class="image-item-del" @click="delImg(imgItem)"></div>
                        </div>
                    </template>

                    <a v-if="imgCount<6" class="image-item-container image-item-add" @click="selectImage">
                        <i class="iconfont icon-add"></i>
                        <input type="file" name="imgFile" style="display: none;" @change="addImg($event)">
                    </a>
                </div>
            </ul>

            <div class="btn-bottom" @click="add">{{buttonName}}</div>
        </div>
    </div>


</template>

<style lang="less" scoped>
    .form-container {
        margin: 0 0 3rem 0;
        padding: 0;
        background-color: #fff;

        .form-item {
            list-style: none;
            display: flex;
            height: 3rem;
            padding: .75rem .5rem;
            border-top: 1px solid #f3f3f3;

            .item-label {
                width: 4.5rem;
                flex-shrink: 0;
                line-height: 1.5rem;
                text-align: right;
            }

            .item-input {
                position: relative;
                width: 100%;
                height: 1.5rem;
            }

            .item-input-text {
                line-height: 1.5rem;
                color: #999;
            }

            .select-brand {
                display: flex;
                width: 100%;
                height: 100%;

                .brand-value {
                    width: 100%;
                    line-height: 1.5rem;
                    text-indent: .2rem;
                }

                .iconfont {
                    width: 1rem;
                    flex-shrink: 0;
                    line-height: 1.5rem;
                    text-align: right;
                }
            }

            .field-input {
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                padding: .25rem .2rem;
                line-height: 1rem;
                background-color: #f3f3f3;
                border-radius: 2px;
            }
            .field-input-readonly {
                display: block;
                width: 100%;
                height: 100%;
                padding: .25rem .2rem;
                line-height: 1rem;
            }
        }

        .image-container {
            border-top: 1px solid #f3f3f3;
            padding: .5rem 0 .5rem .5rem;
            display: flex;
            flex-wrap: wrap;

            .image-item-container {
                position: relative;
                display: block;
                width: 4rem;
                height: 4rem;
                margin-bottom: .5rem;
                margin-right: .5rem;
                flex-shrink: 0;
                background-color: #F3F3F3;
                background-size: cover;

                img {
                    width: 100%;
                    height: 100%;
                }

                .image-item-del {
                    position: absolute;
                    top: -.375rem;
                    right: -.375rem;
                    width: .75rem;
                    height: .75rem;
                    background-image: url("../../assets/img/dingdan/chanpinxuqiu_shanchu@2x.png");
                    background-size: cover;
                }
            }
            .image-item-add {
                text-align: center;
                i {
                    font-size: 1.6rem;
                    line-height: 4rem;
                    color: #cccccc;
                }
            }
        }

    }
</style>

<script>

    import service from '../../services'
    import {each as _each, keys as _keys} from 'underscore'
    import {createGUID, string, extend} from '../../lib/util'
    import ImageAgent from '../../plugins/compressimage'

    export default {

        data() {
            return {

                type: "add", //add:新增;edit:编辑

                brandList: [],
                categoryList: [],
                styleList: [],


                form: {
                    id: "",
                    productId: "",
                    proNo: "",
                    brandId: "",
                    categoryId: "",
                    styleId: "",
                    sizeNameEn: "",
                },

                //图片操作
                imgList: [],
                delImgs: [],
                newImageList: [],

                //防止多次提交
                locked: false
            }
        },

        computed: {

            //图片数量
            imgCount() {
                return this.imgList.length;
            },

            title() {
                return this.type == "add" ? "新增商品需求" : "编辑商品需求"
            },

            buttonName() {
                return this.type == "add" ? "新增" : "保存"
            },

            brandNameEn() {
                if (this.brandList && this.brandList.length > 0 && this.form.brandId) {
                    let tmpObj = {}
                    this.getNameById(this.brandList, this.form.brandId, tmpObj, 'brandName', 'brandNameEn')
                    return tmpObj.brandNameEn ? tmpObj.brandNameEn : ''
                } else {
                    return '';
                }
            },
            categoryNameEn() {
                if (this.categoryList && this.categoryList.length > 0 && this.form.categoryId) {
                    let tmpObj = {}
                    this.getNameById(this.categoryList, this.form.categoryId, tmpObj, 'categoryName', 'categoryNameEn')
                    return tmpObj.categoryNameEn ? tmpObj.categoryNameEn : ''
                } else {
                    return '';
                }
            },
            styleNameEn() {
                if (this.styleList && this.styleList.length > 0 && this.form.styleId) {
                    let tmpObj = {}
                    this.getNameById(this.styleList, this.form.styleId, tmpObj, 'styleName', 'styleNameEn')
                    return tmpObj.styleNameEn ? tmpObj.styleNameEn : ''
                } else {
                    return '';
                }
            }


        },

        created() {


            //获取品牌列表
            service.get("/product/brandList").then((response) => {
                let ret = response.data;
                if (ret.success) {
                    this.brandList = ret.dataList;
                }
            })
            //获取品类列表
            service.get("/product/categoryList").then((response) => {
                let ret = response.data;
                if (ret.success) {
                    this.categoryList = ret.dataList;
                }
            })
            //获取款式列表
            service.get("/product/styleList").then((response) => {
                let ret = response.data;
                if (ret.success) {
                    this.styleList = ret.dataList;
                }
            });

            let params = this.$router.currentRoute.query;
            this.type = params.type;

            if (params.type == "edit") {

                service.get("/product/load", {
                    id: params.id
                }).then((res) => {
                    let ret = res.data;
                    if (ret.success) {
                        let data = ret.data,
                            form = this.form;

                        _each(_keys(form), (item) => {
                            form[item] = data[item];
                        })

                        //塞入图片信息
                        if (data.remoteImgLst && data.remoteImgLst.length > 0) {
                            _each(data.remoteImgLst, (item) => {
                                this.imgList.push({
                                    imgURL: item.riFileurl + '!m90x90.jpg',
                                    id: item.riId,
                                    type: "old"
                                });
                            })
                        }

                    }
                })
            } else {
                extend(this.form, this.$store.getters.demandObj)
                this.imgList = this.$store.getters.demandImgList
                this.newImageList = this.$store.getters.demandNewImageList
            }
        },

        methods: {
            pageBack() {
                if (this.type == "add") {
                    this.$store.dispatch('clearDemand')
                }
                this.$router.go(-1);
            },

            //选择品牌
            selectBrand() {
                if (this.type == 'add' && !this.locked) {
                    this.$store.dispatch("updateDemand", this.form, this.imgList, this.newImageList)
                    this.$router.push("/selectbrand")
                }
            },

            //选择图片
            selectImage() {
                this.$el.querySelector('input[name="imgFile"]').click();
            },

            addImg(e) {

                let input = e.target;
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
                            let guid = createGUID();

                            this.imgList.push({
                                id: guid,
                                imgURL: res,
                                type: "new"
                            });

                            this.newImageList.push({
                                id: guid,
                                imgURL: res,
                                name: file.name
                            })

                            input.value = "";
                        })

                    }

                    reader.readAsDataURL(file);

                } catch (error) {
                }

            },


            //移除图片
            delImg(imgObj) {
                let delIndex;
                _each(this.imgList, (item, index) => {
                    if (item.id == imgObj.id) {
                        delIndex = index;
                        if (imgObj.type == "old") {
                            this.delImgs.push(imgObj.id);
                        }
                    }
                })
                if (delIndex !== void 0) {
                    this.imgList.splice(delIndex, 1);
                }

                //若为临时照片，则需要从临时照片列表中删除
                delIndex = void 0;
                _each(this.newImageList, (item, index) => {
                    if (item.id == imgObj.id) {
                        delIndex = index
                    }
                })
                if (delIndex !== void 0) {
                    this.newImageList.splice(delIndex, 1);
                }
            },


            //校验
            validate() {
                let form = this.form;
                if (!form.proNo) {
                    this.$toast.warning("请输入商品编号");
                    return false;
                }
                if (!form.brandId) {
                    this.$toast.warning("请选择品牌");
                    return false;
                }
                if (!form.categoryId) {
                    this.$toast.warning("请选择品类");
                    return false;
                }
                if (!form.styleId) {
                    this.$toast.warning("请选择款式");
                    return false;
                }
                return true;
            },

            //新增
            add() {

                if (!this.validate()) {
                    return;
                }


                let formData = this.form;
                //获取中文名和英文名
                this.getNameById(this.brandList, formData.brandId, formData, 'brandName', 'brandNameEn');
                this.getNameById(this.categoryList, formData.categoryId, formData, 'categoryName', 'categoryNameEn');
                this.getNameById(this.styleList, formData.styleId, formData, 'styleName', 'styleNameEn');


                let url;
                if (this.type == "add") {
                    url = "/product/add";
                } else {
                    url = "/product/update"
                    formData.isInfo = 1;
                }

                if (this.locked) {
                    return; //防止多次提交
                }
                this.locked = true;

                //清空缓存数据，防止多次提交
                if (this.type == 'add') {
                    this.$store.dispatch('clearDemand')
                }

                service.post(url, formData).then((res) => {
                    let ret = res.data;
                    if (ret.success) {

                        let tmpImageStrLst = [], tmpImageNameLst = [];
                        _each(this.newImageList, item => {
                            tmpImageNameLst.push(item.name)
                            tmpImageStrLst.push(item.imgURL)
                        })

                        service.post("/product/imgFileUpload", {
                            id: ret.data,
                            riIds: this.delImgs.join(','),
                            imageStrLst: tmpImageStrLst.join('@CST@'),
                            imageNameLst: tmpImageNameLst.join('@CST@')
                        }).then(res => {
                            let ret = res.data;
                            if (ret.success) {

                                this.$router.go(-1);
                            } else {
                                this.locked = false
                            }
                        }).catch(e => {
                            this.locked = false
                        })
                    }
                }).catch(e => {
                    this.locked = false
                })

            },

            //根据id获取对应的中文名称、英文名称
            getNameById(list, id, form, zhName, enName) {

                _each(list, (item) => {
                    if (item.id == id) {
                        form[zhName] = item.zhName;
                        form[enName] = item.enName;
                    }
                })
            }
        }
    }
</script>

