import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Li, Nav, Ul } from "./styles";
import { HomeFilled, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const Sidebar = () => {
  const { data, error, revalidate, mutate } = useSWR(
    "/api/users/auth",
    fetcher
  );
  
  if (!data) {
    return <Redirect to="/login" />;
  }

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
