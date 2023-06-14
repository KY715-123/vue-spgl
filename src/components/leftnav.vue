/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#4c83db" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/mypro.png" alt="">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'li-icon-xiangmuguanli',
          menuname: '闪购',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 6,
              icon: 'li-icon-dingdanguanli',
              menuname: '商品管理',
              hasThird: 'N',
              url: 'product/Product',
              menus: null
            },
            {
              menuid: 7,
              icon: 'li-icon-dingdanguanli',
              menuname: '品牌管理',
              hasThird: 'N',
              url: 'product/BrandMana',
              menus: null
            },
            {
              menuid: 8,
              icon: 'li-icon-dingdanguanli',
              menuname: '属性管理',
              hasThird: 'N',
              url: 'product/Attributes',
              menus: null
            },
            {
                  menuid: 9,
                  icon: 'li-icon-dingdanguanli',
                  menuname: '分类管理',
                  hasThird: 'N',
                  url: 'product/Category',
                  menus:null
            },
            {
                  menuid: 10,
                  icon: 'li-icon-dingdanguanli',
                  menuname: '属性分类',
                  hasThird: 'N',
                  url: 'product/AttributeCate',
                  menus:null
            }
          ]
        }
      ],
      msg: 'success'
    }
          this.allmenu = res.data
    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #175fb3 !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>