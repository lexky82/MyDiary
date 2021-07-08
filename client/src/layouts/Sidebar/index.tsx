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
        <Li>
          <Link to="/">
            <HomeFilled style={{ width: "100%" }} />
          </Link>
        </Li>

        <Li>
          <Link to="/calendar">
            <CalendarOutlined style={{ width: "100%" }} />
          </Link>
        </Li>

        <Li>
          <Link to="/diary">
            <PlusOutlined style={{ width: "100%" }} />
          </Link>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Sidebar;
