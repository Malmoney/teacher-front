<template>
<div>
    <MyHeader isGoBack='0' :header_title='header_title' />
    <el-row>
        <el-col :span="12">
            <div class="funModule bg-red" @click="goPath('/files')">
                <img src="https://buyi-teacher.oss-cn-beijing.aliyuncs.com/static/images/files_main.png" alt=""> <br>
                <span>文件采集</span>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import MyHeader from '../components/MyHeader'

    export default {
        name: 'welcome',
        data() {
            return {
                header_title:"热烈欢迎"
            }
        },
        components:{
            MyHeader
        },
        methods:{
            goPath(path){
                this.$router.push({ path });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >
    .funModule {
        height: 200px;
        img {
            width: 80px;
            margin-top: 20px;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        height: 50px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>