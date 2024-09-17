import React, { useState, useEffect } from "react";
import { quizService } from "../../../services/quiz.service";
import { Tab, TabList, TabPanel } from "react-tabs";
import { useRouter } from "next/router";
import {
  Card,
  Text,
  Button,
  Group,
  Tabs,
  Badge,
  Progress,
} from "@mantine/core";

import { toast, ToastContainer } from "react-toastify";
import { Loader } from "@mantine/core";
import Layout, { useQuizData } from "../../../components/quiz/layout";

const CourseCard = ({
  title,
  description,
  progress,
  isSubscribed,
  sectors,
  onClick,

  content,
  cutoffPercentage,
  disabled,
  name,
  order,
  questions,
  _id,
}) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full mb-4">
    <Group position="apart" mb="xs">
      <Text weight={900}> {name}</Text>
      <Badge color="green">{questions?.length || 0} questions</Badge>
    </Group>
    <Text size="sm" color="dimmed" mb="md">
      Cut off Percentage: {cutoffPercentage}
    </Text>
    {isSubscribed && (
      <Progress value={progress} mb="md" size="sm" color="green" />
    )}

    <Button
      color="blue"
      style={{ background: "blue" }}
      fullWidth
      onClick={onClick}
    >
      {isSubscribed ? "Continue Course" : "View Course"}
    </Button>
  </Card>
);

export default function Quiz() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setGroupsModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userProgressData, loading } = useQuizData();

  const router = useRouter();
  const { level } = router.query;

  useEffect(() => {
    fetchGroupModule(level);
  }, [level]);

  const fetchGroupModule = async (level) => {
    if (!level) return;
    try {
      const response = await quizService.getLearningModuleByGroupName(level);
      setSelectedTrack(response.data.group); //  {_id: '66e7e8d1fab02f9b607b2ff0', name: 'beginner'}
      setGroupsModules(response.data.modules);
    } catch (error) {
      toast.error("Failed to fetch groups", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const courses = [
    {
      id: "market-basics",
      title: "Introduction to Stock Market",
      description:
        "Understand the fundamental concepts of stock trading, including how stocks are bought and sold, and the role of stock exchanges.",
      progress: 85,
      isSubscribed: true,
      sectors: ["Finance", "Investing", "Economics"],
    },
    {
      id: "technical-analysis",
      title: "Technical Analysis for Beginners",
      description:
        "Learn how to read stock charts, understand trends, and use technical indicators to make informed trading decisions.",
      progress: 50,
      isSubscribed: true,
      sectors: ["Finance", "Investing", "Data Analysis"],
    },
    {
      id: "fundamental-analysis",
      title: "Fundamental Analysis of Stocks",
      description:
        "Gain insights into how to evaluate a company's financial health, analyze balance sheets, income statements, and cash flow statements.",
      progress: 30,
      isSubscribed: false,
      sectors: ["Finance", "Accounting", "Economics"],
    },
    {
      id: "risk-management",
      title: "Risk Management in Trading",
      description:
        "Learn strategies to manage and mitigate risk while trading in the stock market, including diversification and the use of stop-loss orders.",
      progress: 0,
      isSubscribed: false,
      sectors: ["Finance", "Investing", "Risk Management"],
    },
  ];

  // const ChildComponent = () => {
  //   if (selectedCourse) {
  //     // Render course content (implement this part)
  //     return (
  //       <div>
  //         {/* Text Content */}
  //         <p>
  //           {`You are currently viewing the course titled "${
  //             selectedCourse.title
  //           }". This course will help you understand key concepts related to ${selectedCourse.title.toLowerCase()}. Below, you'll find some questions related to this course. Please answer them to test your knowledge.`}
  //         </p>

  //         {/* Question and Answer Component */}
  //         <div>
  //           <h3>Course Questions</h3>
  //           <div>
  //             <label>
  //               Question 1: What is the mai n purpose of{" "}
  //               {selectedCourse.title.toLowerCase()}?
  //             </label>
  //             <input type="text" placeholder="Type your answer here..." />
  //           </div>
  //           <div>
  //             <label>
  //               Question 2: How does {selectedCourse.title.toLowerCase()} impact
  //               your sector?
  //             </label>
  //             <input type="text" placeholder="Type your answer here..." />
  //           </div>
  //           {/* Add more questions as needed */}
  //         </div>
  //       </div>
  //     );
  //   }

  //   // if (selectedTrack) {

  //   return (
  //     <div className="p-8">
  //     <h1 className="text-3xl font-bold mb-6">{selectedTrack.name}</h1>
  //     <Text size="lg" mb="lg">{selectedTrack.title}</Text>

  //     <Tabs defaultValue="all">
  //       <Tabs.List>
  //         <Tabs.Tab value="all">All courses</Tabs.Tab>
  //         <Tabs.Tab value="incomplete">Incomplete</Tabs.Tab>
  //         <Tabs.Tab value="completed">Completed</Tabs.Tab>
  //       </Tabs.List>

  //       <Tabs.Panel value="all" pt="xs">

  //         {courses.filter(course => course.isSubscribed).map(course => (
  //           <CourseCard key={course.id} {...course} onClick={() => setSelectedCourse(course)} />
  //         ))}
  //         {/* <Text weight={500} size="lg" my="md">Unsubscribed (4)</Text>
  //         {courses.filter(course => !course.isSubscribed).map(course => (
  //           <CourseCard key={course.id} {...course} onClick={() => setSelectedCourse(course)} />
  //         ))} */}
  //       </Tabs.Panel>

  //       <Tabs.Panel value="incomplete" pt="xs">
  //         {courses.filter(course => course.isSubscribed && course.progress < 100).map(course => (
  //           <CourseCard key={course.id} {...course} onClick={() => setSelectedCourse(course)} />
  //         ))}
  //       </Tabs.Panel>

  //       <Tabs.Panel value="completed" pt="xs">
  //         {courses.filter(course => course.isSubscribed && course.progress === 100).map(course => (
  //           <CourseCard key={course.id} {...course} onClick={() => setSelectedCourse(course)} />
  //         ))}
  //       </Tabs.Panel>
  //     </Tabs>
  //   </div>
  //   );
  //   // }

  //   return (
  //     <div className="p-8">
  //       <h1 className="text-3xl font-bold mb-6">Choose Your Learning Track</h1>
  //       <div className="flex flex-wrap" style={{ justifyContent: "center" }}>
  //         {isLoading ? (
  //           <Loader color="blue" />
  //         ) : (
  //           groups.map((track) => (
  //             <TrackCard
  //               key={track._id}
  //               title={track.name}
  //               description={track.name}
  //               onClick={() => setSelectedTrack(track)}
  //             />
  //           ))
  //         )}

  //       </div>
  //     </div>
  //   );
  // };

  return (
    <Layout>
      <div className="p-8">
        <div
          className="flex flex-wrap"
          style={{ justifyContent: "center", width: "80%" }}
        >
          {isLoading || loading ? (
            <Loader color="blue" />
          ) : (
            <div style={{ width: "100%" }} className="p-8">
              <h1 className="text-3xl font-bold mb-6">{selectedTrack.name}</h1>
              <Text size="lg" mb="lg">
                {selectedTrack.title}
              </Text>

              <Tabs defaultValue="all">
                <Tabs.List>
                  <Tabs.Tab value="all">All courses</Tabs.Tab>
                  <Tabs.Tab value="incomplete">Incomplete</Tabs.Tab>
                  <Tabs.Tab value="completed">Completed</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="all" pt="xs">
                  {modules.map((module) => (
                    <CourseCard
                      key={module._id}
                      {...module}
                      onClick={() => setSelectedCourse(module)}
                    />
                  ))}
                </Tabs.Panel>

                {/* <Tabs.Panel value="incomplete" pt="xs">
                  {courses
                    .filter(
                      (course) => course.isSubscribed && course.progress < 100
                    )
                    .map((course) => (
                      <CourseCard
                        key={course.id}
                        {...course}
                        onClick={() => setSelectedCourse(course)}
                      />
                    ))}
                </Tabs.Panel> */}

                {/* <Tabs.Panel value="completed" pt="xs">
                  {courses
                    .filter(
                      (course) => course.isSubscribed && course.progress === 100
                    )
                    .map((course) => (
                      <CourseCard
                        key={course.id}
                        {...course}
                        onClick={() => setSelectedCourse(course)}
                      />
                    ))}
                </Tabs.Panel> */}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

const TrackCard = ({ title, description, onClick }) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder className="w-70 m-4">
    <Text fw={500} size="xl" mb="xs">
      {title}
    </Text>
    <Text size="sm" c="dimmed" mb="md">
      {description}
    </Text>

    <Button
      color="blue"
      fullWidth
      onClick={onClick}
      style={{ background: "blue" }}
    >
      View Courses
    </Button>
  </Card>
);
