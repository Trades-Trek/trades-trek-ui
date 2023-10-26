import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tabs, rem } from "@mantine/core";
import ResearchTab from "../../components/Learning/ResearchTab.js";
import LearningTab from "../../components/Learning/LearningTab.js";

import { IconPhoto, IconMessageCircle } from "@tabler/icons-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Loader } from "@mantine/core";
import { supportService } from "./../../services/support.service";

const iconStyle = { width: 12, height: 12 };

export default function Sub() {
  const [allLearning, setAllLearning] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    supportService
      .GetAllLearning()
      .then((res) => {
        if (res.success) {
          setAllLearning(res.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="site--content h-screen" style={{ height: "100vh" }}>
        <div
          className="page--title--block"
          style={{ background: "white", padding: 20 }}
        >
          <Tabs
            color="indigo"
            variant="pills"
            radius="xs"
            defaultValue="Learning"
            style={{ height: "100%" }}
          >
            <Tabs.List style={{ justifyContent: "center", marginBottom: 20, fontSize: '14px' }}>
              <Tabs.Tab
                value="Learning"
                leftSection={<IconMessageCircle style={iconStyle} />}
              >
                Learning
              </Tabs.Tab>
              <Tabs.Tab
                value="Research"
                leftSection={<IconPhoto style={iconStyle} />}
              >
                Research
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="Learning">
              <LearningTab />
            </Tabs.Panel>

            <Tabs.Panel value="Research">
              <ResearchTab />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  );
}
