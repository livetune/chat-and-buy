import React, { Component } from "react";
import List from "../components/allOrders/list";
import { connect } from "react-redux";
import { getAllOrders, getOrder } from "../actions/order";

@connect(
  state => ({ order: state.get("order") }),
  {
    getAllOrders,
    getOrder
  }
)
class AllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders();
  }
  render() {
    const { order, getOrder } = this.props;
    const allOrders = order.get("allOrders");
    return (
      <div className="good-list">
        <List allOrders={allOrders} getOrder={getOrder} />
      </div>
    );
  }
}
export default AllOrders;
