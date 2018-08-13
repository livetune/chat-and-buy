import React from "react";
import { Card, Button } from "antd-mobile";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

const Item = ({ item, type, handleGetOrder, affirmOrder, chat, id }) => {
  let stateText = "";
  const state = item.get("state");
  const count = item.get("count");
  const orderId = item.get("_id");
  const customerId = item.get("customer");

  switch (state) {
    case 0:
      stateText = "等待接单";
      break;
    case 1:
      stateText = "正在派送";
      break;
    case 2:
      stateText = "订单已送达";
      break;
    default:
      break;
  }
  const countDesc = count > 1 ? `等${count}件` : "";

  let footerExtra = "";
  if (type === "deliver" && state === 0) {
    footerExtra = (
      <div>
        <Button
          type="ghost"
          inline
          size="small"
          style={{ marginLeft: "8px" }}
          onClick={() => handleGetOrder(orderId)}
        >
          接单
        </Button>
      </div>
    );
  } else if (state !== 0 && state !== 2) {
    footerExtra = (
      <div>
        <Button
          type="ghost"
          inline
          size="small"
          onClick={() =>
            chat(customerId === id ? item.get("deliver") : customerId)
          }
        >
          联系对方
        </Button>
        <Button
          type="ghost"
          inline
          size="small"
          style={{ marginLeft: "8px" }}
          onClick={() => affirmOrder(orderId)}
        >
          确认送达
        </Button>
      </div>
    );
  } else {
    footerExtra = null;
  }

  return (
    <Card className="list-item">
      <Card.Header title="肥佬烧鹅" extra={<span>{stateText}</span>} />
      <Card.Body>
        <div className="card-body">
          <div>{item.get("desc") + countDesc}</div>
          <div>￥{item.get("price")}</div>
        </div>
      </Card.Body>
      <Card.Footer extra={footerExtra} />
    </Card>
  );
};

Item.propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  type: PropTypes.string.isRequired,
  handleGetOrder: PropTypes.func,
  affirmOrder: PropTypes.func,
  chat: PropTypes.func,
  id: PropTypes.string
};
export default Item;
