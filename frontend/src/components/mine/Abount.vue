<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <a class="pull-left page-back" @click="pageBack">
                <i class="iconfont icon-callback"></i>
            </a>

            <h1 class="title">关于我们</h1>
        </header>
        <div class="content">
            <div class="container">
                <p class="description">GOGO买手平台是连接海外知名供应商和国内高端消费者的专业级B2B跨境电商交易平台，
                    专注海外高端奢侈品领域，掌握一手优质货源，为国内买手提供更便捷、高品质、超实惠的海外正品好货。</p>
                <p class="description">看得到的实惠尖货，尽在您掌中。</p>
                <div class="contact-container">
                    <div class="contact-line">电话： 400-995-5289</div>
                    <div class="contact-line">邮箱： service@chinastartec.com</div>
                    <div class="contact-line">地址： 深圳市南山区科苑南路储能大厦35DE单元</div>
                </div>
            </div>
        </div>

    </div>
</template>


<style lang="less" scoped>


    .container {
        padding: .7rem;
        background-color: #ffffff;

        .description {
            margin: 0;
            color: #282828;
            line-height: 1.4rem;
            //text-indent: 1.4rem;
        }
        .contact-container {
            margin-top: 2rem;
            .contact-line {
                line-height: 1.4rem;
                color: #7a7a7a;
            }
        }

    }
</style>


<script>


    export default {

        methods: {
            pageBack() {
                this.$emit("back")
            }
        }
    }

</script>
