import { notification } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const openNotification = (title: string ,description: string, code: boolean) => {
    if (code === true) {
      notification.open({
        message: title,
        description: description,

        icon: <CheckOutlined style={{ color: "green" }} />,
        placement: "topLeft",
      });
    }
    if (code === false) {
      notification.open({
        message: title,
        description: description,

        icon: <CloseOutlined style={{ color: "red" }} />,
        placement: "topLeft",
      });
    }
  };

export default openNotification