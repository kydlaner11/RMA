import {
  DownloadOutlined,
  PlayCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { useTour } from "@reactour/tour";
import { Button, DatePicker, FloatButton, Spin, Table } from "antd";
import dayjs from "dayjs";
import { default as React, useEffect, useState } from "react";
import { charactersColumn } from "../../constant/columns/characters";
import { GET_CHARACTERS } from "../../constant/queries/character";
import { Can } from "../../context/AbilityContext";
import useSearchColumn from "../../hooks/useSearchColumn";
import StickyHeader from "../../layouts/StickyHeader";
import { useQueryGql } from "../../lib/useQueryGql";
import UserDrawer from "./components/UserDrawer";

const { RangePicker } = DatePicker;

const Users = () => {
  const { setIsOpen, setCurrentStep, setSteps, isOpen } = useTour();

  const { data, loading } = useQueryGql(GET_CHARACTERS);
  const searchProps = useSearchColumn();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().add(-7, "days"));
  const [endDate, setEndDate] = useState(dayjs());

  // const [getCharacter, { data: charData, loading: charLoad }] = useLazyQuery(
  //   GET_CHARACTER,
  //   { variables: { id: 2 } }
  // );

  const handleChangeDate = (date) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
  };

  const handleTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const steps = [
    {
      selector: ".tour-btn",
      content: (
        <div>
          You can restart anytime <b>Tour</b> by clicking this button
        </div>
      ),
    },
    {
      selector: ".ant-picker-range",
      stepInteraction: false,
      content: (
        <div>You can click this button to filter table by date range.</div>
      ),
    },
    {
      selector: ".ant-picker-panel-container",
      // stepInteraction: false,
      // observe: ".ant-picker-dropdown-hidden",
      // highlightedSelectors: [".ant-picker-panel-container"],
      // mutationObservables: [".ant-picker-panel-container"],
      resizeObservables: [".ant-picker-panel-container"],
      // ? Diakali agar focus bisa mengetahui saat date picker terbuka
      action: async (node) => {
        await setTimeout(async () => {
          // console.log("node", node);
          await node.focus();
        }, 5000);

        setOpenDate(true);
      },
      actionAfter: () => {
        setOpenDate(false);
      },
      content: (
        <div>
          You can filter data by date range. <b>Click me!</b>
        </div>
      ),
    },
    {
      selector: ".user-drawer-btn",
      stepInteraction: false,
      content: <div>You can click this button to open user form.</div>,
    },
    {
      selector: ".user-drawer",
      // observe: ".user-drawer",
      // highlightedSelectors: [".user-drawer"],
      // mutationObservables: [".user-drawer"],
      resizeObservables: [".user-drawer"],
      stepInteraction: false,
      // ? Diakali agar focus bisa mengetahui saat drawer terbuka
      action: async (node) => {
        await setTimeout(async () => {
          // console.log("node", node);
          await node.focus();
        }, 5000);

        setOpenDrawer(true);
      },
      actionAfter: () => {
        setOpenDrawer(false);
      },
      content: (
        <div>You can fill all these field and submit to create a new user.</div>
      ),
    },
  ];

  useEffect(() => {
    setSteps(steps);
  }, []);

  return (
    <div>
      <Spin spinning={loading} size="large">
        <StickyHeader title={"Users"}>
          <Button
            icon={<PlayCircleFilled />}
            onClick={handleTour}
            className="tour-btn"
          >
            Run tour
          </Button>

          <RangePicker
            placement="bottomRight"
            presets={[
              {
                label: "Last 7 days",
                value: [dayjs().add(-7, "days"), dayjs()],
              },
              {
                label: "Last 30 days",
                value: [dayjs().add(-30, "days"), dayjs()],
              },
            ]}
            onOpenChange={(open) => {
              isOpen ? null : setOpenDate(open);
            }}
            open={openDate}
            dropdownClassName={`range-drop`}
            className="range-ui"
            onChange={handleChangeDate}
            value={[startDate, endDate]}
            format={"DD/MM/YYYY"}
            allowClear={false}
          />

          <Button icon={<DownloadOutlined />} size="middle" title="Export" />
        </StickyHeader>

        <div style={{ padding: 32 }}>
          <Table
            loading={loading}
            columns={charactersColumn({ searchProps })}
            // TODO: Fix bug undefined
            dataSource={data === undefined ? [] : data.characters.results}
            scroll={{ x: 1000 }}
          />
        </div>
      </Spin>

      <Can I="create" a="dashboard">
        <FloatButton
          className="user-drawer-btn"
          shape="square"
          type="primary"
          tooltip="Add new character"
          style={{ width: 56, height: 56 }}
          icon={<PlusOutlined />}
          onClick={() => setOpenDrawer(true)}
        />
      </Can>

      <UserDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

export default Users;
