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
            <a href="javascript:void(0)" @click="sortGoods" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd  @click="setPriceFilter('all')"><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}"  >All</a></dd>
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
                      <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li> 
                </ul>
                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <img src="../assets/loading-spinning-bubbles.svg" alt="">
              </div>
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
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import NavBread from "@/components/NavBread";
export default {
  data() {
    return {
      goodsList: [],
      page: 1,
      pageSize: 8,
      sortTag: true,
      busy: true,
      loading:true,
      priceFilter: [
        {
          startPrice: "0.00",
          endPrice: "100.00"
        },
        {
          startPrice: "100.00",
          endPrice: "500.00"
        },
        {
          startPrice: "500.00",
          endPrice: "1000.00"
        },
        {
          startPrice: "1000.00",
          endPrice: "5000.00"
        }
      ],
      priceChecked: "all", 
      filterBy: false,
      overLayFlag: false
    };
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  mounted: function() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortTag ? 1 : -1,
        priceLevel:this.priceChecked
      };
      this.loading=true;
      this.$http
        .get("/goods", {
          params: param
        })
        .then(res => { 
          this.loading=false;
          let data = res.data;
          console.log(data); 
          if (res.status == "200") {
            if (flag) {
              this.goodsList = this.goodsList.concat(data.result.list);
              if (data.result.list.length < 8) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = data.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
        });
    },
    sortGoods() {
      this.sortTag = !this.sortTag;
      this.page = 1;
      this.getGoodsList();
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop() {
      this.filterBy = false;
      this.overLayFlag = false;
    },
    setPriceFilter(index) { 
      this.priceChecked = index;
      this.closePop(); 
      this.page=1;
      this.getGoodsList();
    }
  }
};
</script> 
<style scoped> 
  .load-more{
    height:100px;
    line-height:100px;
    text-align: center;
  }
</style>
