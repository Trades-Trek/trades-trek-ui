import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel } from "react-tabs";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Card, Text, Button } from "@mantine/core";
import Layout, { useQuizData } from "../../../components/quiz/layout";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "@mantine/core";

export default function Quiz() {
  const router = useRouter();

  const { userProgressData, groups, loading, error } = useQuizData();

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Choose Your Learning Track</h1>
        <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
          {loading ? (
            <Loader color="blue" />
          ) : (
            groups.map((track) => (
              <TrackCard
                key={track._id}
                title={track.name}
                description={track.description}
                userProgressData={userProgressData}
                onClick={() =>
                  router.push({
                    pathname: `/dashboard/quiz/${track.name}`,
                  })
                }
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

const TrackCard = ({ title, description, onClick, userProgressData }) => {
  const cardStyle = { background: "white" }
    // userProgressData.currentGroup === null && title === "beginner"
    //   ? { background: "white" }
    //   : { background: "#C9E4CA" };

  const isButtonDisabled = false
    // userProgressData.currentGroup === null && title === "beginner"
    //   ? false
    //   : true;
  return (
    <Card
      style={cardStyle}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="w-70 m-4"
    >
      <Text fw={500} size="xl" mb="xs">
        {title}
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        {description}
      </Text>

      <Button
        disabled={isButtonDisabled}
        color="blue"
        fullWidth
        onClick={onClick}
        style={{ background: "blue" }}
      >
        View Courses
      </Button>
    </Card>
  );
};
