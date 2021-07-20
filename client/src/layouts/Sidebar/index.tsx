import React, { useEffect } from "react";
import { Link, RouteChildrenProps, withRouter } from "react-router-dom";
import { Li, Nav, Ul } from "./styles";
import {
  PieChartOutlined,
  CalendarOutlined,
  PlusOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const Sidebar = ({ history }: RouteChildrenProps) => {
  const { data } = useSWR("/api/users/auth", fetcher);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (!data.isAuth) {
      history.push("/login");
    }
  }, [data]);

  return (
    <Nav>
      <Ul>
        <Li>
          <Link to="/">
            <PieChartOutlined style={{ width: "100%" }} />
          </Link>
        </Li>

        <Li>
          <Link to="/calendar">
            <CalendarOutlined style={{ width: "100%" }} />
          </Link>
        </Li>

        <Li>
          <Link to="/mapview">
            <EnvironmentOutlined style={{ width: "100%" }} />
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

export default withRouter(Sidebar);
