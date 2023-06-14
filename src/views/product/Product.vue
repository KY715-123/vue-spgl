<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">闪购</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
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
      <el-table
    :data="listData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品id">
            <span>{{ props.row.brandId }}</span>
          </el-form-item>
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="标题详情">
            <span>{{ props.row.detailTitle }}</span>
          </el-form-item>
          <el-form-item label="赠送的成长值">
            <span>{{ props.row.giftGrowth }}</span>
          </el-form-item>
          <el-form-item label="赠送的积分">
            <span>{{ props.row.giftPoint }}</span>
          </el-form-item>
          <el-form-item label="关键字">
            <span>{{ props.row.keywords }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="库存预警值">
            <span>{{ props.row.lowStock }}</span>
          </el-form-item>
          <el-form-item label="商品分类名称">
            <span>{{ props.row.productCategoryName }}</span>
          </el-form-item>
          <el-form-item label="货号">
            <span>{{ props.row.productSn }}</span>
          </el-form-item>
          <el-form-item label="促销结束时间">
            <span>{{ props.row.promotionEndTime }}</span>
          </el-form-item>
          <el-form-item label="活动限购数量">
            <span>{{ props.row.promotionPerLimit }}</span>
          </el-form-item>
          <el-form-item label="促销开始时间">
            <span>{{ props.row.promotionStartTime }}</span>
          </el-form-item>
          <el-form-item label="	市场价">
            <span>{{ props.row.originalPrice }}</span>
          </el-form-item>
          <el-form-item label="	促销价">
            <span>{{ props.row.promotionPrice }}</span>
          </el-form-item>
          <el-form-item label="	库存">
            <span>{{ props.row.stock }}</span>
          </el-form-item>
          <el-form-item label="副标题">
            <span>{{ props.row.subTitle }}</span>
          </el-form-item>
          <el-form-item label="单位">
            <span>{{ props.row.unit }}</span>
          </el-form-item>
          <el-form-item label="限制使用的积分数">
            <span>{{ props.row.usePointLimit }}</span>
          </el-form-item>
          <el-form-item label="商品重量">
            <span>{{ props.row.weight }}克</span>
          </el-form-item>
          <el-form-item label="审核状态">
            <span>{{ props.row.verifyStatus==0? '未审核': '审核通过' }}</span>
          </el-form-item>
          <el-form-item label="是否新品">
            <span>{{ props.row.newStatus==0? '否': '是' }}</span>
          </el-form-item>
          <el-form-item label="是否预告商品">
            <span>{{ props.row.previewStatus==0? '否': '是' }}</span>
          </el-form-item>
          <el-form-item label="促销类型">
            <span v-if="props.row.promotionType === 0">没有促销使用原价</span>
                <span v-if="props.row.promotionType === 1">使用促销价</span>
                <span v-if="props.row.promotionType === 2">使用会员价</span>
                <span v-if="props.row.promotionType === 3">使用阶梯价格</span>
                <span v-if="props.row.promotionType === 4">使用满减价格</span>
                <span v-if="props.row.promotionType === 5">限时购</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="品牌名称"
      prop="brandName">
    </el-table-column>
    <el-table-column
      label="图片"
      prop="pic">
      <template slot-scope="scope">
        <el-popover>
            <img slot="reference" :src="scope.row.pic"  style="max-height: 50px;max-width: 50px">
        </el-popover>
    </template>
    </el-table-column>
    <el-table-column
      label="画册图"
      prop="albumPics">
      <template slot-scope="scope">
        <div class="image-list">
          <img v-for="image in scope.row.albumPics.split(',')" :src="image" />
        </div>
      </template>
    </el-table-column>
    
    <el-table-column
      label="价格"
      prop="price">
    </el-table-column>
    <el-table-column
      label="删除状态"
      prop="deleted">
      <template slot-scope="scope">
             <el-switch
                v-model="scope.row.deleted"
                :active-value="1"
                :inactive-value="0"
                active-color="#02538C"
                inactive-color="#B9B9B9"
                @change="changeSwitch(scope.row)"/>
          </template>
    </el-table-column>
    <el-table-column
      label="上架状态"
      prop="publishStatus">
      <template slot-scope="scope">
             <el-switch
                v-model="scope.row.publishStatus"
                :active-value="1"
                :inactive-value="0"
                active-color="#02538C"
                inactive-color="#B9B9B9"
                @change="changeSwitch(scope.row)"/>
          </template>
    </el-table-column>
    <el-table-column
      label="推荐状态"
      prop="recommandStatus">
      <template slot-scope="scope">
             <el-switch
                v-model="scope.row.recommandStatus"
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
      <el-dialog :title="title" :visible.sync="editFormVisible" width="80%" @click="closeDialog">
             <el-form label-width="100px" :model="editForm" :rules="rules" ref="editForm">
                <el-row>
                    <el-col :span="5">
                    <el-form-item label="商品名" prop="name">
                        <el-input size="small" v-model="editForm.name" auto-complete="off" 
                        placeholder="请输入商品名"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="品牌名称" prop="brandName">
                        <el-input size="small" v-model="editForm.brandName" auto-complete="off" 
                        placeholder="请输入品牌名称"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="产品描述" prop="description">
                        <el-input size="small" v-model="editForm.description" auto-complete="off" 
                        placeholder="请输入产品描述"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="赠送成长值" prop="giftGrowth">
                        <el-date-picker size="small"  type="number"  v-model="editForm.giftGrowth" auto-complete="off" 
                        placeholder="请输入赠送成长值"></el-date-picker>
                    </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="5">
                    <el-form-item label="赠送积分" prop="giftPoint">
                        <el-input size="small" type="number"  v-model="editForm.giftPoint" auto-complete="off" 
                        placeholder="请输入赠送积分"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="促销类型" prop="promotionType">
                        <el-select size="small" v-model="editForm.promotionType" placeholder="请选择促销类型">
                        <el-option label="没有促销使用原价" value="0"></el-option>
                        <el-option label="使用促销价" value="1"></el-option>
                        <el-option label="使用阶梯价格" value="2"></el-option>
                        <el-option label="使用满减价格" value="3"></el-option>
                        <el-option label="限时购" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="关键字" prop="keywords">
                        <el-input size="small" v-model="editForm.keywords" auto-complete="off" 
                        placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="库存预警值" prop="lowStock">
                        <el-input size="small" type="number"  v-model="editForm.lowStock" auto-complete="off" 
                        placeholder="请输入库存预警值"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="5">
                    <el-form-item label="市场价" prop="originalPrice">
                        <el-input size="small"  type="number" v-model="editForm.originalPrice" auto-complete="off" 
                        placeholder="请输入市场价"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="价格" prop="price">
                        <el-input size="small"  type="number" v-model="editForm.price" auto-complete="off" 
                        placeholder="请输入价格"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="促销价格" prop="promotionPrice">
                        <el-input size="small"  type="number" v-model="editForm.promotionPrice" auto-complete="off" 
                        placeholder="请输入促销价格"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="库存" prop="stock">
                        <el-input size="small"  type="number" v-model="editForm.stock" auto-complete="off" 
                        placeholder="请输入库存"></el-input>
                    </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="5">
                    <el-form-item label="重量/g" prop="weight">
                        <el-input size="small" type="number" v-model="editForm.weight" auto-complete="off" 
                        placeholder="请输入重量"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="副标题" prop="subTitle">
                        <el-input size="small" v-model="editForm.subTitle" auto-complete="off" 
                        placeholder="请输入副标题"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="销量" prop="sale">
                        <el-input size="small" type="number" v-model="editForm.sale" auto-complete="off" 
                        placeholder="请输入销量"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="商品分类名称" prop="productCategoryName">
                        <el-input size="small" v-model="editForm.productCategoryName" auto-complete="off" 
                        placeholder="请输入商品分类名称"></el-input>
                    </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">
                    <el-form-item label="促销开始时间" prop="promotionStartTime">
                        <el-input size="small" type="date" v-model="editForm.promotionStartTime" auto-complete="off" 
                        ></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="促销结束时间" prop="promotionEndTime">
                        <el-input size="small" type="date" v-model="editForm.promotionEndTime" auto-complete="off" 
                        ></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="图片链接" prop="pic">
                        <el-input size="small" v-model="editForm.pic" auto-complete="off" 
                        placeholder="请输入图片链接"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="5">
                    <el-form-item label="单位" prop="unit">
                        <el-input size="small" v-model="editForm.unit" auto-complete="off" 
                        placeholder="请输入单位"></el-input>
                    </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDialog">取消</el-button>
          <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { getList,add,del, edit,getOne } from '../../api/product'
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
          brandName:'',
          description:'',
          subTitle:'',
          keywords:'',
          productCategoryName:'',
          promotionStartTime:'',
          promotionEndTime:'',
          pic:'',
          unit:'',
          originalPrice:0,
          price:0,
          promotionPrice:0,
          stock:0,
          weight:0,
          sale:0,
          giftGrowth:0,
          giftPoint:0,
          promotionType:0,
          lowStock:0,

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
        console.log('开关啊')
        console.log(data);
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
          this.editForm.brandName = row.brandName
          this.editForm.description = row.description
          this.editForm.subTitle = row.subTitle
          this.editForm.productCategoryName = row.productCategoryName
          this.editForm.promotionStartTime = row.promotionStartTime
          this.editForm.promotionEndTime = row.promotionEndTime
          this.editForm.pic = row.pic
          this.editForm.unit = row.unit
          this.editForm.keywords = row.keywords
          this.editForm.giftGrowth = row.giftGrowth
          this.editForm.giftPoint = row.giftPoint
          this.editForm.promotionType = row.promotionType
          this.editForm.originalPrice = row.originalPrice
          this.editForm.price = row.price
          this.editForm.promotionPrice = row.promotionPrice
          this.editForm.lowStock = row.lowStock
          this.editForm.stock = row.stock
          this.editForm.weight = row.weight
          this.editForm.sale = row.sale

        } 
        else {
          this.title = '添加'
          this.editForm.name = ''
          this.editForm.brandName = ''
          this.editForm.description = ''
          this.editForm.subTitle = ''
          this.editForm.productCategoryName = ''
          this.editForm.promotionStartTime = ''
          this.editForm.promotionEndTime = ''
          this.editForm.pic = ''
          this.editForm.unit = ''
          this.editForm.keywords = ''
          this.editForm.giftGrowth = 0
          this.editForm.giftPoint =0
          this.editForm.originalPrice = 0
          this.editForm.price = 0
          this.editForm.promotionPrice =0
          this.editForm.lowStock = 0
          this.editForm.stock = 0
          this.editForm.weight = 0
          this.editForm.sale = 0
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.image-list img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
}
  </style>
  
   
   