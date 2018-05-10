<template>
  <div> 
      <nav-header></nav-header>
      <nav-bread>
          <span slot="bread">Goods</span>
          <!-- <span slot="B">测试一下</span> -->
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}"  >All</a></dd>
                <dd v-for="(item,index) in priceFilter"  :key="item.price" @click="setPriceFilter(index)">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" >{{item.startPrice}} - {{item.endPrice}}</a>
                </dd> 
              </dl>
            </div> 
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList" :key="item.productId">
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/'+item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li> 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
     <nav-footer></nav-footer>
  </div>
</template>

<script>
import "./../assets/css/base.css";
import "./../assets/css/product.css";
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
export default {
  data() {
    return {
        goodsList:[],
         priceFilter:[
                  {
                      startPrice:'0.00',
                      endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
                ],
                priceChecked:'all',
                filterBy:false,
                overLayFlag:false
    };
  },
  components: {
      NavHeader,
      NavFooter,
      NavBread
  },
  mounted:function(){
      this.getGoodsList();
  },
  methods:{
      getGoodsList(){
          this.$http.get('/goods')
          .then((result)=>{
              console.log(result);
              let res=result.data.data;
              this.goodsList=res.result;
          })
      },
      showFilterPop(){
          this.filterBy=true;
          this.overLayFlag=true;
      },
      closePop(){ 
          this.filterBy=false;
          this.overLayFlag=false;
      },
      setPriceFilter(index){
          this.priceChecked=index;
          this.closePop();
      }
  }
};
</script> 
<style scoped>

</style>
