<template>
  <el-row>
      <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <span v-if="isGoBack==1" @click="goBack" class="goBack" >返回</span>
            <span class="title">{{ header_title }}</span>
          </div>
      </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
  },
  props:['isGoBack','header_title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.grid-content{
      @bar-height:40px;
      margin-bottom: 30px;
      height: @bar-height;
      background-color: #007acc;
      .goBack{
        float: left;
        color: white;
        line-height: @bar-height;
        margin-left: 5px;
      }
      .title{
        line-height: @bar-height;
        color: white;
      }
    }
</style>
