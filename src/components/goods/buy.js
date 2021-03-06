import React from 'react';
import PropTypes from "prop-types";

const Buy = ({ price, handleBuy }) => (
  <div className="buy-warpper">
    <div className="price">￥{price}</div>
    <div
      className={price > 0 ? "buy-button" : "no-buy-button"}
      onClick={() => price > 0 && handleBuy()}
    >
      购买
    </div>
  </div>
);

Buy.propTypes = {
  price: PropTypes.number.isRequired,
  handleBuy: PropTypes.func.isRequired
};

export default Buy;
