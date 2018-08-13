import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoodsInfo, addToCart, buy } from "../actions/goods";
import GoodsList from "../components/goods/goodsList";
import Buy from "../components/goods/buy";

@connect(
  state => ({ goods: state.get("goods") }),
  {
    getGoodsInfo,
    buy,
    addToCart
  }
)
class Goods extends Component {
  componentDidMount() {
    if (this.props.goods.get("goodsList").isEmpty()) {
      this.props.getGoodsInfo();
    }
  }
  render() {
    const { goods, addToCart, buy } = this.props;
    const goodsList = goods.get("goodsList");
    const shopCart = goods.get("shopCart");
    return goodsList.isEmpty() ? null : (
      <div className="goods-list" style={{}}>
        <GoodsList
          goodsList={goodsList}
          addToCart={addToCart}
          shopCart={shopCart}
        />
        <Buy price={goods.get("totalPrice")} handleBuy={buy} />
      </div>
    );
  }
}
export default Goods;
