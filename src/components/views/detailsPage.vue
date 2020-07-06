<template>
  <div id="details">
    <el-row>
      <el-col :span="7" class="foods-order">
        <el-tabs boder id="order-list">
          <el-tab-pane label="点餐">
            <el-table border :data="foodList">
              <el-table-column prop="name" label="商品名称" width="100">
              </el-table-column>
              <el-table-column prop="count" label="量" width="80">
              </el-table-column>
              <el-table-column prop="price" label="金额" width="80">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="150" border>
                <template slot-scope="scope">
                  <el-button type="success" size="small" @click="addProducts(scope.row)">增加</el-button>
                  <el-button type="danger" size="small"  @click="delProducts(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="getSum">
              <span>数量：{{ totalCount }}</span>
              <span>金额: {{ totalMoney }}元</span>
            </div>
            <div class="btn">
              <el-button type="warning" plain @click="submitList">挂单</el-button>
              <el-button type="danger" plain @click="delAllProducts">清空</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
            <el-table border :data="hangingList">
              <el-table-column prop="name" label="商品名称" width="171">
              </el-table-column>
              <el-table-column prop="count" label="量" width="171">
              </el-table-column>
              <el-table-column prop="price" label="金额" width="171">
              </el-table-column>
            </el-table>
            <div class="getSum">
              <span>数量：{{ totalCount }}</span>
              <span>金额: {{ totalMoney }}元</span>
            </div>
            <div class="btn">
              <el-button type="danger" @click="delAllProducts">删除</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17" class="popular-order" id="goodList">
        <div class="popular-goods">
          <h5>常用商品</h5>
          <div class="popular-goods_list">
            <ul>
              <li v-for="(item, index) in mainFoods" :key="index" @click="addProducts(item)">
                <span>{{ item.name }}</span>
                <span class="price">￥{{ item.price }}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane v-for="(goods, index) in foodCategories"
                          :key="index"
                          :label="goods.name">
              <ul class="goods-list">
                <li v-for="(item, key) in goods.goodsItem" :key="key" @click="addProducts(item)">
                  <span class="goods-img">
                    <img :src="item.imageUrl" width="80%"/>
                  </span>
                  <span class="goods-name">{{ item.name }}</span><br />
                  <span class="goods-price">￥{{ item.price }}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    name: "detailsPage",
    data: () => ({
      foodList: [],    // 餐单
      mainFoods: [],   // 常见商品
      foodCategories: [], // 商品分类
      // 初始化价格和数量
      totalMoney: 0,
      totalCount: 0,
      hangingList:[]    // 挂单的餐单数据
    }),
    created() {
      // 获取数据
      axios.get("../../static/data.json")
        .then(res => {
          console.log(res);
          // 常见食品数据
          this.mainFoods = res.data.foods;
          console.log(this.mainFoods);
          // 食品分类数据
          this.foodCategories = res.data.goods;
          console.log(this.foodCategories);
        })
        .catch(err => {
          console.log("error");
        });
    },
    mounted() {
      let orderHeight = document.body.clientHeight;
      document.getElementById("order-list").style.height = orderHeight + "px";
      document.getElementById("goodList").style.height = orderHeight + "px";
    },
    methods: {
      /*  添加商品 addProducts
      *   首先是格式化产品数量和 价格
      *   遍历出每一个商品
      * */
      addProducts(item) {
        this.totalMoney = 0;
        this.totalCount = 0;
        let isHave = false; // 标记变量  是否存在商品
        for (let i = 0; i < this.foodList.length; i++) {
          if (this.foodList[i].name === item.name) {
            isHave = true;
          }
        }
        if (isHave) {
          // 改变列表中商品数量
          let arr = this.foodList.filter(val => val.name === item.name);
          // console.log(arr);
          arr[0].count++;
        } else {
          let newList = {
            name: item.name,
            price: item.price,
            count: 1
          };
          this.foodList.push(newList);
        }
        this.getSum();
      },
      /*  删除单个商品 delProducts
      *
      * */
      delProducts(item) {
        this.foodList = this.foodList.filter(o => o.name !== item.name);
        this.getSum();
      },
      /*  删除所有食品 清空  delAllProducts
      *   判断点餐单里是否有商品，然后重新给餐单  赋值为空数组
      *   同样也调用格式化数量和价格统计函数
      *   用户操作后，弹出提示框
      * */
      delAllProducts(){
        if (this.foodList || this.hangingList) {
          this.foodList = [];
          this.hangingList = [];
          this.getSum();
          this.$message({
            showClose: true,
            type: "success",
            message: '清空成功！！！'
          });
        }
      },
      /*  计算数量和金额的总计  getSum
      *   先格式化数量和金钱
      *   然后判断餐单 是否有商品，有就遍历每一个商品的数量和价格
      * */
      getSum() {
        // 总数量和总金额清零
        this.totalMoney = 0;
        this.totalCount = 0;
        if (this.foodList) {
          // 计算总金额和数量
          this.foodList.forEach(item => {
            this.totalCount += item.count;
            this.totalMoney += item.price * item.count;
          });
        }
      },
      /*  挂单  submitList
      *   首先餐单赋值给 挂单的数据 ，然后赋值餐单为空数组
      * */
      submitList() {
        if (this.totalMoney !== 0) {
          this.hangingList = this.foodList;
          this.foodList = [];
          this.$message({
            showClose: true,
            message: '挂单成功！！！',
            type: 'success'
          });
          this.getSum()
        } else {
          this.$notify({
            showClose: true,
            message: '当前无订单！！！',
            type: 'warning'
          })
        }
      }

      // 结账功能
     /* posMoney: function(money) {
        if (this.allMoney != 0) {
          this.$confirm("结账金额：￥" + this.allMoney + "元", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {

              this.$message({
                type: "success",
                message: "结账成功!"
              });
              money += this.allMoney;
              this.$store.commit('posMoney',money);
              this.$store.commit('count');
              this.tableData = [];
              this.allMoney = 0;
              this.allCount = 0;
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消结账"
              });
            });
        }else{
          this.$message({
            type: "warning",
            message: "不能空结!这是不对的！"
          });
        }
      }*/
    }
  };
</script>

<style scoped>
#details{
  background-color: #e4e4e4;
}
#order-list {
  border-right: 1px solid #d0d0d0;
}
.btn {
  margin-top: 25px;
  text-align: center;
}
.foods-order {
  height: 100vh;
  background-color: #e4e4e4;
}
h5 {
  height: 28px;
  border-bottom: 3px solid #d0d0d0;
  padding: 10px;
  text-align: left;
  font-size: 20px;
  cursor: pointer;
}
.popular-goods {
  height: 40%;
}
.popular-goods_list ul {
  padding: 10px;
  margin: 0;
}
.popular-goods_list ul li {
  list-style: none;
  float: left;
  font-weight: bolder;
  padding: 10px;
  margin: 5px;
  background-color: #d0d0d0;
  border-radius: 3px;
  color: #555555;
  cursor: pointer;
}
.price {
  color: #409EFF;
}
.getSum{
  text-align: center;
  margin-top: 15px;
}
.getSum span:nth-child(2){
  margin-left: 30px;
}
.goods-type{
  margin-left: 10px;
}
.goods-list li {
  list-style: none;
  width: 23%;
  border: 1px solid #d0d0d0;
  height: 51px;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.goods-list li span {
  display: block;
  float: left;
}
.goods-img {
  width: 25%;
  text-align: center;
}
.goods-name {
  font-size: 10px;
  font-weight: bold;
  padding-left: 20px;
  color: brown;
}
.goods-price {
  font-size: 14px;
  padding-left: 18px;
  padding-top: 10px;
}
</style>
