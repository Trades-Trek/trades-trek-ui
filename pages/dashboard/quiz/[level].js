import React, { useState, useEffect } from "react";
import { quizService } from "../../../services/quiz.service";
import { Tab, TabList, TabPanel } from "react-tabs";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";

import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Tabs,
  Badge,
  Progress,
  Modal,
  Loader,
  CheckIcon,
  LoadingOverlay,
  Box,
} from "@mantine/core";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { useDisclosure } from "@mantine/hooks";
import { toast, ToastContainer } from "react-toastify";
import Layout, { useQuizData } from "../../../components/quiz/layout";

const CourseCard = ({
  groupProgress,
  isSubscribed,
  selectedTrack,
  onClick,

  content,
  cutoffPercentage,
  disabled,
  name,
  order,
  questions,
  _id,
}) => {

  //pick out the the current track from the groupProgress

  // const data  = groupProgress[selectedTrack._id]
  console.log(groupProgress[selectedTrack._id], '...', groupProgress) // {_id: '66e7e8d1fab02f9b607b2ff0', name: 'beginner'} 
  // console.log(groupProgress,  _id)
 
//   {  // id of beginner learning module group
//     "66e7e8d1fab02f9b607b2ff0": {
//       "groupId": "66e7e8d1fab02f9b607b2ff0",
//       "name": "beginner",
//       "modules": [
//           {
//               "moduleId": "66e7ed97fab02f9b607b3a57",
//               "name": "Nigerian Exchange Group (NGX Group)",
//               "answeredQuestions": {
//                   "66e7ed97fab02f9b607b3a58": "Africa",
//                   "66e7ed97fab02f9b607b3a59": "listing and trading securities, licensing, market data solutions, ancillary technology, regulation, real estate"
//               },
//               "score": 100,
//               "completed": true
//           }
//       ],
//       "completed": true
//   }
// }
  return(
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full mb-4">
      <Group position="apart" mb="xs">
        <Text weight={900}> {name}</Text>
        <Badge color="green">{questions?.length || 0} questions</Badge>
      </Group>
      <Text size="sm" color="dimmed" mb="md">
        Cut off Percentage: {cutoffPercentage}
      </Text>
      <Progress value={50} mb="md" size="sm" color="green" />
  
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
}

export default function Quiz() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setGroupsModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
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

  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="p-8">
        <div
          className="flex flex-wrap"
          style={{ justifyContent: "center", width: "80%" }}
        >
          {isLoading || loading ? (
            <Loader color="blue" />
          ) : (
            <>
              <ModuleModal
                opened={opened}
                close={close}
                selectedModule={selectedModule}
              />

              <div style={{ width: "100%" }} className="p-8">
                <h1 className="text-3xl font-bold mb-6">
                  {selectedTrack.name}
                </h1>
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
                        selectedTrack={selectedTrack}
                        groupProgress={userProgressData.groupProgress}
                        {...module}
                        onClick={() => {
                          setSelectedModule(module);
                          open();
                        }}
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

const ModuleModal = ({ opened, close, selectedModule }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [visible, { toggle }] = useDisclosure(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [shouldRetry, setShouldRetry] = useState(false);

  const content = selectedModule?.content
    ? JSON.parse(selectedModule.content)
    : null;
  const questions = selectedModule?.questions || [];

  const handleAnswerSubmit = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answers[currentQuestion._id]) {
      if (
        answers[currentQuestion._id] ===
        currentQuestion.options[currentQuestion.correctOption]
      ) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        try {
          setIsLoading(true);
          setResponseMessage("");
          setShowResult(true);

          const data = {
            groupId: selectedModule.group,
            moduleId: selectedModule._id,
            answers,
          };

          const {
            success,
            message,
            shouldRetryModule,
          } = await quizService.saveUserModuleProgress(data);
          setIsLoading(false);
          if (!success) {
            toast.error(message);
            setResponseMessage(message);
            setShouldRetry(shouldRetryModule);
            return;
          }
          toast.success(message);
          resetQuiz(true)
        } catch (error) {
          setIsLoading(falsee);
        }
      }
    }
  };

  const handleAnswerChange = (e) => {
    const questionId = questions[currentQuestionIndex]._id;
    const selectedOption =
      questions[currentQuestionIndex].options[parseInt(e.target.value)];
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const resetQuiz = (shouldClose) => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
    setShouldRetry(false);
    setResponseMessage("");
    if(shouldClose){
      close()
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={selectedModule?.name || "Module Content"}
      fullScreen
      styles={{ modal: { padding: "2rem" } }}
    >
      {content && (
        <div className="content-section mb-8">
          <Text size="lg">
            {content.blocks.map((block, index) => (
              <p key={index}>{block.text}</p>
            ))}
          </Text>
        </div>
      )}

      {!showResult ? (
        <div className="question-section">
          <Typography variant="h5" gutterBottom>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {questions[currentQuestionIndex]?.text}
          </Typography>
          <FormControl component="fieldset" style={{ marginBottom: "1rem" }}>
            <RadioGroup
              aria-label="quiz-question"
              name="quiz-question"
              value={
                Object.keys(answers).includes(
                  questions[currentQuestionIndex]?._id
                )
                  ? questions[currentQuestionIndex].options
                      .indexOf(answers[questions[currentQuestionIndex]?._id])
                      .toString()
                  : ""
              }
              onChange={handleAnswerChange}
            >
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <br />
          <Button
            style={{ background: "green" }}
            variant="contained"
            color="primary"
            onClick={handleAnswerSubmit}
            disabled={!answers[questions[currentQuestionIndex]?._id]}
          >
            {currentQuestionIndex !== questions.length - 1
              ? "Next Question"
              : loading
              ? "Submitting"
              : "Finish"}
          </Button>
        </div>
      ) : loading ? (
        <Box pos="relative">
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        </Box>
      ) : (
        <div className="result-section">
          <Typography variant="h5" gutterBottom>
            {responseMessage}
          </Typography>
         

          {shouldRetry && (
            <Button variant="contained"  style={{ background: "blue" }} onClick={() => resetQuiz(false)}>
              Retake Quiz
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};


