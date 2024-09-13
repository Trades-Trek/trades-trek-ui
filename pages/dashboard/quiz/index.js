import React, { useState, useEffect } from "react";
import { quizService } from "../../../services/quiz.service";
import { Tab, TabList, TabPanel } from "react-tabs";
import { useRouter } from "next/router";
import { useContext } from "react";

import { Card, Text, Button } from "@mantine/core";
import Layout from "../../../components/quiz/layout";

import { toast, ToastContainer } from "react-toastify";
import { Loader } from "@mantine/core";

export default function Quiz() {
  const [isLoading, setIsLoading] = useState(false);
const router  = useRouter()
  const [userProgressData, setUserProgressData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userProgress, learningModuleGroups] = await Promise.all([
          quizService.getUserProgress(),
          quizService.getLearningModuleGroups(),
        ]);

        // Combine the data and update state
        setUserProgressData(userProgress);
        setGroups(learningModuleGroups); // assuming response structure has .data
      } catch (err) {
        setError(err);
        toast.error("Failed to fetch data", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Choose Your Learning Track</h1>
        <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
          {isLoading ? (
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
  const cardStyle =
  userProgressData.currentGroup === null && title === 'beginner'
    ? { background: 'white' }
    : { background: '#C9E4CA' };

    const isButtonDisabled =
    userProgressData.currentGroup === null && title === 'beginner'
      ? false
      : true
  return (
    <Card
    style={cardStyle}
    shadow="sm" padding="lg" radius="md" withBorder className="w-70 m-4" >
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
