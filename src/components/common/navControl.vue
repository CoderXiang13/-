<template>
  <div class="left-nav">
    <ul>
        <li v-for="(item,index) in categories" :key="index">
          <router-link :to="item.path">
           <div>
             <i :class="[`icon iconfont`,item.class]"></i>
             <p>{{item.title}}</p>
           </div>
          </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "navControl",
    data() {
      return {
        categories: [
          {class: 'icon-shouyin', title: '收银', path: '/detailsPage'},
          {class: 'icon-dianpu', title: '店铺', path: '/foodsShop'},
          {class: 'icon-shangpin', title: '商品', path: '/products'},
          {class: 'icon-huiyuan-', title: '会员', path: '/vip'},
          {class: 'icon-tongji', title: '统计', path: '/counts'},
          {class: 'icon-shezhi', title: '设置', path: '/setUp'},
        ]
      }
    }
  }
</script>

<style scoped>
@import '../../assets/font/iconfont.css';
.left-nav{
  color: #fff;
  font-size: 16px;
  height: 100vh;
  background-color:#409EFF;
  float: left;
  width: 8%;
}
.left-nav ul{
  margin: 0;
  padding: 0;
}
.left-nav li{
  list-style: none;
  height: 100px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #20a0ff;
  cursor: pointer;
  border-bottom: 1px solid #aaa;
}
li p{
  line-height: 0;
}
.left-nav li:hover {
  opacity: .6;
}
ul li div{
  height: 100px;
}
  a{
    text-decoration-line: none;
    color: white;
  }
</style>
