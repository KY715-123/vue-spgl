<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">闪购</el-breadcrumb-item>
        <el-breadcrumb-item>商品属性</el-breadcrumb-item>
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
        <el-table-column sortable prop="name" label="属性名" width="100">
        </el-table-column>
        <el-table-column sortable prop="inputList" label="可选值列表" width="250">
        </el-table-column>
        <el-table-column sortable prop="filterType" label="分类筛选样式" width="100">
        </el-table-column>
        <el-table-column sortable prop="handAddStatus" label="是否支持手动新增" width="100">
        </el-table-column>
        <el-table-column sortable prop="inputType" label="属性录入方式" width="100">
        </el-table-column>
        <el-table-column sortable prop="relatedStatus" label="相同属性产品是否关联" width="100">
        </el-table-column>
        <el-table-column sortable prop="searchType" label="检索类型" width="100">
        </el-table-column>
        <el-table-column sortable prop="selectType" label="属性选择类型" width="100">
        </el-table-column>
        <el-table-column sortable prop="type" label="属性的类型" width="100">
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
          <el-form-item label="属性名" prop="name">
            <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入属性名"></el-input>
          </el-form-item>
          <el-form-item label="可选值列表" prop="inputList">
            <el-input size="small" type="number" v-model="editForm.inputList" auto-complete="off" placeholder="请输入可选值列表"></el-input>
          </el-form-item>
          <el-form-item label="分类筛选样式" prop="filterType">
            <el-input size="small" type="number" v-model="editForm.endDate" auto-complete="off" placeholder="请输入分类筛选样式"></el-input>
          </el-form-item>
          <el-form-item label="是否支持手动新增" prop="handAddStatus">
            <el-input size="small" type="number" v-model="editForm.handAddStatus" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性录入方式" prop="inputType">
            <el-input size="small" type="number" v-model="editForm.inputType" auto-complete="off" placeholder="请输入属性录入方式"></el-input>
          </el-form-item>
          <el-form-item label="相同属性产品是否关联" prop="relatedStatus">
            <el-input size="small" type="number" v-model="editForm.relatedStatus" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="检索类型" prop="searchType">
            <el-input size="small" type="number" v-model="editForm.searchType" auto-complete="off" placeholder="请输入检索类型"></el-input>
          </el-form-item>
          <el-form-item label="属性选择类型" prop="selectType">
            <el-input size="small" type="number" v-model="editForm.selectType" auto-complete="off" placeholder="请输入属性选择类型"></el-input>
          </el-form-item>
          <el-form-item label="属性的类型" prop="type">
            <el-input size="small" type="number" v-model="editForm.type" auto-complete="off" placeholder="请输入属性的类型"></el-input>
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
  import { getList,add,del, edit } from '../../api/attributes'
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
          filterType:0,
          handAddStatus:0,
          inputList:'',
          relatedStatus:0,
          searchType:0,
          selectTypeselectType:0,
          type:0,
          inputType:0,
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
          this.editForm.filterType = row.filterType
          this.editForm.handAddStatus = row.handAddStatus
          this.editForm.inputList = row.inputList
          this.editForm.relatedStatus = row.relatedStatus
          this.editForm.searchType = row.searchType
          this.editForm.selectTypeselectType = row.selectTypeselectType
          this.editForm.type = row.type
          this.editForm.inputType = row.inputType
        } 
        else {
          this.title = '添加'
          this.editForm.name = ''
          this.editForm.filterType = 0
          this.editForm.handAddStatus = 0
          this.editForm.inputList = ''
          this.editForm.relatedStatus = 0
          this.editForm.searchType = 0
          this.editForm.selectTypeselectType = 0
          this.editForm.type = 0
          this.editForm.inputType = 0
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
  
   
   