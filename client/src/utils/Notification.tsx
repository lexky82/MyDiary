import { notification } from "antd";
import { UserOutlined } from "@ant-design/icons";

const openNotification = (title: string ,description: string, code: boolean) => {
    if (code === true) {
      // 로그인 성공
      notification.open({
        message: title,
        description: description,

        icon: <UserOutlined style={{ color: "black" }} />,
        placement: "topLeft",
      });
    }
    if (code === false) {
      // 로그인 실패
      notification.open({
        message: title,
        description: description,

        icon: <UserOutlined style={{ color: "red" }} />,
        placement: "topLeft",
      });
    }
  };

export default openNotification