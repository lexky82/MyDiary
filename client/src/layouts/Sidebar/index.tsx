import React from "react";
import { Link } from "react-router-dom";
import { Li, Nav, Ul } from "./styles";
import { HomeFilled, CalendarOutlined, PlusOutlined } from "@ant-design/icons";

const Sidebar = () => {
  return (
    <Nav>
      <Ul>
        <Link to="/">
          <Li>
            <HomeFilled style={{ width: "100%" }} />
          </Li>
        </Link>

        <Link to="/calendar">
          <Li>
            <CalendarOutlined style={{ width: "100%" }} />
          </Li>
        </Link>

        <Link to="/diary">
          <Li>
            <PlusOutlined style={{ width: "100%" }} />
          </Li>
        </Link>
      </Ul>
    </Nav>
  );
};

export default Sidebar;
