<template>
  <div class="main">
    <MyHeader isGoBack='1' header_title='文件采集' />
  <el-form ref="form" :model="form" label-width="60px">
    <el-form-item label="班级">
      <el-select
        v-model="form.class"
        placeholder="请选择班级"
        style="width: 270px"
      >
            <el-option v-for="(item,index) in classList" :key="index" :label="item.name" :value="item.id"></el-option>
        
      </el-select>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input
        type="input"
        v-model="form.name"
        style="width: 270px"
        placeholder="请选择学生姓名"
        @change="selectStudentListByName"
      ></el-input>
    </el-form-item>
    <el-form-item label="事件">
      <el-select
        v-model="form.event"
        placeholder="请选择事件"
        style="width: 270px"
      >
        <el-option v-for="(item,index) in eventList" :key="index" :label="item.title" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        type="textarea"
        v-model="form.remark"
        style="width: 270px"
        placeholder="为了方便老师统计信息，请合理填写备注"
      ></el-input>
    </el-form-item>
    <div ref="uploadFileButton">
    <el-form-item >
      <el-upload
        class="upload-file"
        action="#"
        :http-request="uploadFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="10"
        :on-exceed="handleExceed"
        :file-list="tempFileList"
        auto-upload
        :before-upload="checkFileUpload"
      >
        <el-button type="primary" plain style="width:300px;height:40px;position: relative;left: -30px;font-size:10px">点击上传文件</el-button>
        <div slot="tip" class="upload_file_tip">
          
        </div>
      </el-upload>
    </el-form-item>
    </div>
    <div ref="submitButton">
        <el-form-item>
        <el-button type="primary"  @click="onSubmit" style="width:300px;position: relative;left: -30px;" >立即提交</el-button>
        </el-form-item>     
    </div>
  </el-form>
</div>
</template>
<script>

import OSSClient from "@/common/OSSClient"
import MyHeader from "@/components/MyHeader"
export default {
  components:{
    MyHeader
  },
  data() {
    return {
      form: {
        name: "",
        event: "",
        class: "",
        remark:"",
        fileList: [],
      },
      classList:[],
      eventList:[],
      studentFlag:false,
      className:"",
      studentId:"",
        eventName:"",
        tempFileList:[],
    };
  },
  methods: {
    onSubmit() {
        if(!this.form.class){
            this.$message.warning("请先选择班级...");
            this.studentFlag =false;
            return;
        }
        if(!this.studentFlag){
            this.$message.warning("学生信息不存在，请核对姓名班级是否正确...");
            return;
        }
        if(!this.form.event){
            this.$message.warning("请先选择事件...");
            return;
        }
        if(this.tempFileList.length===0){
            this.$message.warning("请上传文件 ...");
            return;
        }
        let listForm = this.form.fileList;
        let tempList = this.tempFileList;
        for(let i =0 ; i<tempList.length;i++){
            let file = tempList[i];
            //判断扩展名
            const prePath="/"+this.className+"/"+this.eventName+"/"
            const fileName =prePath+file.name
            listForm[i] = {
                fileName:fileName,
                oldName:file.name,
                fileType:file.type,
                fileSize:file.size
            }
        }
        
        let req = {
            fileList:this.form.fileList,
            studentName:this.form.name,
            studentId:this.studentId,
            clazzId:this.form.class,
            clazzName:this.className,
            remark:this.form.remark,
            eventId:this.form.event
        }
        console.log(111);
    
       this.$axios.post('/files/addFileRecord',req).then(res => {
             if(res.data.rspCode === '0000'){
                this.$refs.submitButton.style.display = "none";
                this.$refs.uploadFileButton.style.display = "none";   
                this.$message.success("提交成功!");
            }else{
                this.$message.warning("提交失败！");
            }
        })
    },
    handleRemove(file, fileList) {
        this.tempFileList = fileList;

    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
      );
    },
    checkFileUpload(){
        if(!this.form.class){
            this.$message.warning("请先选择班级...")
            return false
        }
        if(!this.form.event){
            this.$message.warning("请先选择事件...")
            return false
        }
        return true
    },
    uploadFile(f){
        console.log("上传文件");
        let file = f.file
        // const exname = file.name.substring(file.name.lastIndexOf(".") + 1)
        const prePath=this.className+"/"+this.eventName+"/"
        const fileName =prePath+file.name
        OSSClient.put(fileName, file).then(res=>{
          if(res.url){
            let list = this.tempFileList
            list[list.length] = file
          }else{
            this.$message.error('文件上传失败')
          }
        }).catch(err=>{this.$message.error('文件上传失败')})
    },
    beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}?`);
        return true;
    },
    getClassList(){
        this.$axios.post('/class/selectClassList').then(res => {
            this.classList = res.data.rspData;
        })
    },
    selectStudentListByName(){
        this.studentFlag = false;
        if(!this.form.class){
            this.$message.warning("请先选择班级");
            // alert("请先选择班级！");
            this.studentFlag =false;
            return;
        }
        let req = {
            studentName: this.form.name,
            classId : this.form.class
        }
        this.$axios.post(
            '/student/selectStudentListByName',req).then(res => {
            if(res.data.rspCode === '0000'){
                if (res.data.rspData && res.data.rspData.length>=1){
                    this.studentId = res.data.rspData[0].id;
                    this.studentFlag =true;
                }else{
                    this.$message.warning("学生信息不存在，请核对姓名班级是否正确！");
                }
            }else{
            }
        })
    },
    getEventList(){
        this.$axios.post('/event/selectEventList').then(res => {
            if(res.data.rspCode === '0000'){
                this.eventList = res.data.rspData;
            }else{

            }
        })
    },
  },
  created(){
      this.getClassList();
      this.getEventList();
  },
  watch: {
    'form.class': function(newVal){
        this.form.name=""
        for(let i =0; i < this.classList.length;i++){
            if(this.classList[i].id === newVal){
                this.className =  this.classList[i].name;
                return;
            }
        }
    },
    'form.event': function(newVal){
        for(let i =0; i < this.eventList.length;i++){
            if(this.eventList[i].id === newVal){
                this.eventName =  this.eventList[i].title;
                return;
            }
        }
    },
    
  }
};
</script>

<style type="text/less" lang="less" scoped>
</style>