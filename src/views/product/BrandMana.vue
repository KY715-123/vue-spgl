<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">闪购</el-breadcrumb-item>
        <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索筛选 -->
      <el-form :inline="true" :model="formInline" class="user-search">
        <!-- <el-form-item label="搜索：">
          <el-input size="small" v-model="formInline.id" placeholder="请输入id"></el-input>
        </el-form-item> -->
        <el-form-item>
          <!-- <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
          <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
        <!-- <el-table-column align="center" type="selection" width="60">
        </el-table-column> -->
        <el-table-column sortable prop="name" label="品牌名" width="100">
        </el-table-column>
        <el-table-column sortable prop="bigPic" label="专区大图" width="150">
            <template slot-scope="scope">
                <el-popover>
                    <img slot="reference" :src="scope.row.bigPic"  style="max-height: 50px;max-width: 50px">
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column sortable prop="logo" label="品牌logo" width="150">
            <template slot-scope="scope">
                <el-popover>
                    <img slot="reference" :src="scope.row.logo"  style="max-height: 50px;max-width: 50px">
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column sortable prop="brandStory" label="品牌故事" width="250">
        </el-table-column>
        <el-table-column sortable prop="firstLetter" label="首字母" width="90">
        </el-table-column>
        <el-table-column sortable prop="productCommentCount" label="产品评论数量" width="90">
        </el-table-column>
        <el-table-column sortable prop="productCount" label="产品数量" width="90">
        </el-table-column>
        <el-table-column sortable prop="showStatus" label="显示状态" width="90">
          <template slot-scope="scope">
             <el-switch
                v-model="scope.row.showStatus"
                :active-value="1"
                :inactive-value="0"
                active-color="#02538C"
                inactive-color="#B9B9B9"
                @change="changeSwitch(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
      <!-- 编辑界面 -->
      <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
        <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
          <el-form-item label="品牌名" prop="name">
            <el-input size="small" v-model="editForm.name" auto-complete="off" 
            placeholder="请输入品牌名"></el-input>
          </el-form-item>
          <el-form-item label="专区大图" prop="bigPic">
            <el-input size="small" v-model="editForm.bigPic" auto-complete="off" 
            placeholder="请输入专区大图链接"></el-input>
          </el-form-item>
          <el-form-item label="品牌logo" prop="logo">
            <el-input size="small" v-model="editForm.logo" auto-complete="off" 
            placeholder="请输入品牌logo链接"></el-input>
          </el-form-item>
          <el-form-item label="首字母" prop="firstLetter">
            <el-input size="small" v-model="editForm.firstLetter" auto-complete="off" 
            placeholder="请输入首字母"></el-input>
          </el-form-item>
          <el-form-item label="产品评论数量" prop="productCommentCount">
            <el-input size="small" type="number" v-model="editForm.productCommentCount" auto-complete="off" 
            placeholder="请输入产品评论数量"></el-input>
          </el-form-item>
          <el-form-item label="产品数量" prop="productCount">
            <el-input size="small" type="number" v-model="editForm.productCount" auto-complete="off" 
            placeholder="请输入产品数量"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDialog">取消</el-button>
          <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { getList,add,del, edit } from '../../api/brandMana'
  import Pagination from '../../components/Pagination'
  export default {
    data() {
      return {
        nshow: true, //switch开启
        fshow: false, //switch关闭
        loading: false, //是显示加载
        editFormVisible: false, //控制编辑页面显示与隐藏
        title: '添加',
        editForm: {
          id:null,
          name:'',
          bigPic:'',
          logo:'',
          brandStory:'',
          firstLetter:'',
          productCommentCount:0,
          productCount:0,
          showStatus:0,
        },
        // rules表单验证
        rules: {
          // dealerShortName: [
          //   { required: true, message: '请输入经销商名称', trigger: 'blur' }
          // ],
          // dealerCode: [{ required: true, message: '请输入经销商代码', trigger: 'blur' }]
        },
        //搜索条件
        formInline: {
          current: 1,
          size: 10,
        },
        listData: [], //用户数据
        // 分页参数
        pageparm: {
          current: 1,
          size: 10,
          total: 10
        }
      }
    },
    // 注册组件
    components: {
      Pagination
    },
    /**
     * 数据发生改变
     */
  
    /**
     * 创建完毕
     */
    created() {
      this.getdata(this.formInline)
      // console.log('页面创建完成');
    },
  
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      changeSwitch(data){
        //关是1 开是2
           console.log('开关')
           console.log(data);
           edit(data)
              .then(res => {
                if (res.code==1) {
                  this.$message({
                    type: 'success',
                    message: '修改成功！'
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: res.msg
                  })
                }
              })
      },
      getdata(parameter) {
        getList(parameter).then(res=>{
          console.log('打印响应')
          console.log(res);
          this.listData = res.data.page.records
          this.pageparm.total = res.data.page.total
         
        }).catch(err=>{
          console.log(err)
        })
        this.pageparm.current = this.formInline.page
        this.pageparm.size = this.formInline.size
      },
      // 分页插件事件
      callFather(parm) {
        if(!parm.pageSize){
          parm.pageSize=10
        }
        this.formInline.current = parm.currentPage
        this.formInline.size = parm.pageSize
        this.getdata(this.formInline)
      },
      // 搜索事件
      search() {
        console.log('点击了搜索?');
        if(this.formInline.id){
          getOne(this.formInline.id).then(res=>{
          console.log(res);
        })
        }else{
          this.getdata(this.formInline)
        }
      },
      //显示编辑界面
      handleEdit: function(index, row) {
        this.editFormVisible = true
        if (row != undefined && row != 'undefined') {
          this.title = '修改'
          this.editForm.id = row.id
          this.editForm.name = row.name
          this.editForm.bigPic = row.bigPic
          this.editForm.logo = row.logo
          this.editForm.brandStory = row.brandStory
          this.editForm.firstLetter = row.firstLetter
          this.editForm.productCommentCount = row.productCommentCount
          this.editForm.productCount = row.productCount
          this.editForm.showStatus = row.showStatus
        } 
        else {
          this.title = '添加'
          this.editForm.name = ''
          this.editForm.bigPic = ''
          this.editForm.logo = ''
          this.editForm.brandStory = ''
          this.editForm.firstLetter =''
          this.editForm.productCommentCount = 0
          this.editForm.productCount = 0
          this.editForm.showStatus = 0
        }
      },
      // 编辑、增加页面保存方法
      submitForm(editData) {
        this.$refs[editData].validate(valid => {
          if (valid) {
            if(this.editForm.id){
              edit(this.editForm)
              .then(res => {
                this.editFormVisible = false
                this.loading = false
                if (res.code==1) {
                  this.getdata(this.formInline)
                  this.$message({
                    type: 'success',
                    message: '修改成功！'
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: res.msg
                  })
                }
              })
              .catch(err => {
                this.editFormVisible = false
                this.loading = false
                this.$message.error('修改失败，请稍后再试！')
              })
              console.log('走修改')
              console.log(this.editForm);
            }else{
              add(this.editForm)
              .then(res => {
                this.editFormVisible = false
                this.loading = false
                if (res.code==1) {
                  this.getdata(this.formInline)
                  this.$message({
                    type: 'success',
                    message: '保存成功！'
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: res.msg
                  })
                }
              })
              .catch(err => {
                this.editFormVisible = false
                this.loading = false
                this.$message.error('保存失败，请稍后再试！')
              })
              console.log('走新增')
              console.log(this.editForm);
            }
         
          } else {
            return false
          }
        })
      },
      // 删除公司
      deleteUser(index, row) {
        console.log('删除数据?')
        console.log(row)
        this.$confirm('确定要删除吗?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            del({id:row.id})
              .then(res => {
                console.log('打印删除响应体',res)
                if (res.code==1) {
                  this.$message({
                    type: 'success',
                    message: '已删除!'
                  })
                  this.getdata(this.formInline)
                } else {
                  this.$message({
                    type: 'info',
                    message: res.msg
                  })
                }
              })
              .catch(err => {
                this.loading = false
                this.$message.error('删除失败，请稍后再试！')
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 关闭编辑、增加弹出框
      closeDialog() {
        this.editFormVisible = false
      }
    }
  }
  </script>
  
  <style scoped>
  .user-search {
    margin-top: 20px;
  }
  .userRole {
    width: 100%;
  }
  </style>
  
   
   