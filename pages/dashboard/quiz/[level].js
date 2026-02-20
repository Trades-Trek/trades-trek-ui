import React, { useState, useEffect } from "react";
import { quizService } from "../../../services/quiz.service";
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

const isModuleCompleted = (groupProgress, groupId, moduleId) => {
  if (!groupProgress || !groupId) return false;
  const group = groupProgress[groupId];
  if (!group || !group.modules) return false;
  const mod = group.modules.find(
    (m) => m.moduleId === moduleId || m.moduleId?._id === moduleId
  );
  return mod?.completed === true;
};

const getModuleScore = (groupProgress, groupId, moduleId) => {
  if (!groupProgress || !groupId) return null;
  const group = groupProgress[groupId];
  if (!group || !group.modules) return null;
  const mod = group.modules.find(
    (m) => m.moduleId === moduleId || m.moduleId?._id === moduleId
  );
  return mod?.score ?? null;
};

const CourseCard = ({
  groupProgress,
  groupId,
  onClick,
  content,
  cutoffPercentage,
  disabled,
  name,
  order,
  questions,
  _id,
}) => {
  const completed = isModuleCompleted(groupProgress, groupId, _id);
  const score = getModuleScore(groupProgress, groupId, _id);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full mb-4">
      <Group position="apart" mb="xs">
        <Text weight={900}>{name}</Text>
        <div style={{ display: "flex", gap: 8 }}>
          <Badge color="green">{questions?.length || 0} questions</Badge>
          {completed && (
            <Badge color="teal">Completed</Badge>
          )}
        </div>
      </Group>
      <Text size="sm" color="dimmed" mb="md">
        Cut off Percentage: {cutoffPercentage}%
      </Text>
      {score !== null && (
        <Progress
          value={score}
          mb="md"
          size="sm"
          color={completed ? "green" : "orange"}
        />
      )}

      <Button
        color="blue"
        style={{ background: completed ? "teal" : "blue" }}
        fullWidth
        onClick={onClick}
      >
        {completed ? "Review Course" : "View Course"}
      </Button>
    </Card>
  );
};

export default function Quiz() {
  const [selectedTrack, setSelectedTrack] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setGroupsModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const { userProgressData, loading, refetchUserProgress } = useQuizData();

  const router = useRouter();
  const { level } = router.query;

  useEffect(() => {
    fetchGroupModule(level);
  }, [level]);

  const fetchGroupModule = async (level) => {
    if (!level) return;
    try {
      const response = await quizService.getLearningModuleByGroupName(level);
      setSelectedTrack(response.data.group);
      setGroupsModules(response.data.modules);
    } catch (error) {
      toast.error("Failed to fetch groups", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const groupProgress = userProgressData?.groupProgress;
  const groupId = selectedTrack?._id;

  const completedModules = modules.filter((m) =>
    isModuleCompleted(groupProgress, groupId, m._id)
  );
  const incompleteModules = modules.filter(
    (m) => !isModuleCompleted(groupProgress, groupId, m._id)
  );

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
                refetchUserProgress={refetchUserProgress}
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
                    <Tabs.Tab value="incomplete">
                      Incomplete ({incompleteModules.length})
                    </Tabs.Tab>
                    <Tabs.Tab value="completed">
                      Completed ({completedModules.length})
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="all" pt="xs">
                    {modules.map((module) => (
                      <CourseCard
                        key={module._id}
                        groupProgress={groupProgress}
                        groupId={groupId}
                        {...module}
                        onClick={() => {
                          setSelectedModule(module);
                          open();
                        }}
                      />
                    ))}
                  </Tabs.Panel>

                  <Tabs.Panel value="incomplete" pt="xs">
                    {incompleteModules.length === 0 ? (
                      <Text color="dimmed" mt="md">All courses completed!</Text>
                    ) : (
                      incompleteModules.map((module) => (
                        <CourseCard
                          key={module._id}
                          groupProgress={groupProgress}
                          groupId={groupId}
                          {...module}
                          onClick={() => {
                            setSelectedModule(module);
                            open();
                          }}
                        />
                      ))
                    )}
                  </Tabs.Panel>

                  <Tabs.Panel value="completed" pt="xs">
                    {completedModules.length === 0 ? (
                      <Text color="dimmed" mt="md">No courses completed yet.</Text>
                    ) : (
                      completedModules.map((module) => (
                        <CourseCard
                          key={module._id}
                          groupProgress={groupProgress}
                          groupId={groupId}
                          {...module}
                          onClick={() => {
                            setSelectedModule(module);
                            open();
                          }}
                        />
                      ))
                    )}
                  </Tabs.Panel>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

const ModuleModal = ({ opened, close, selectedModule, refetchUserProgress }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [score, setScore] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [shouldRetry, setShouldRetry] = useState(false);
  const router = useRouter();
  const { userProgressData } = useQuizData();

  const content = selectedModule?.content
    ? JSON.parse(selectedModule.content)
    : null;
  const questions = selectedModule?.questions || [];

  // Detect if module is in review mode (already completed)
  const isReviewMode = () => {
    if (!userProgressData || !userProgressData.groupProgress) return false;
    const groupProgress = userProgressData.groupProgress[selectedModule?.group];
    if (!groupProgress) return false;
    const module = groupProgress.modules?.find(
      (m) => m.moduleId === selectedModule?._id || m.moduleId?._id === selectedModule?._id
    );
    return module?.completed === true;
  };

  const getReviewModeScore = () => {
    if (!userProgressData || !userProgressData.groupProgress) return null;
    const groupProgress = userProgressData.groupProgress[selectedModule?.group];
    if (!groupProgress) return null;
    const module = groupProgress.modules?.find(
      (m) => m.moduleId === selectedModule?._id || m.moduleId?._id === selectedModule?._id
    );
    return module?.score ?? null;
  };

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
            setResponseMessage(message);
            setShouldRetry(shouldRetryModule);
            return;
          }
          toast.success(message);
          setResponseMessage(message);
          
          // Refetch user progress to update the UI
          if (refetchUserProgress) {
            await refetchUserProgress();
          }
        } catch (error) {
          setIsLoading(false);
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

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setShowContent(false);
    setScore(0);
    setShouldRetry(false);
    setResponseMessage("");
  };

  const handleReadCourseAgain = () => {
    resetQuiz();
    setShowContent(true);
    setShowResult(false);
  };

  const handleRetakeQuiz = () => {
    resetQuiz();
    setShowContent(false);
  };

  const handleComeBackLater = () => {
    resetQuiz();
    setShowContent(true);
    close();
    router.push("/dashboard/quiz");
  };

  const handleStartQuiz = () => {
    setShowContent(false);
  };

  const handleCloseModal = () => {
    resetQuiz();
    setShowContent(true);
    close();
  };

  const reviewModeScore = getReviewModeScore();

  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      title={selectedModule?.name || "Module Content"}
      fullScreen
      styles={{ modal: { padding: "2rem" } }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      {isReviewMode() ? (
        // Review Mode - Show results only
        <div className="result-section" style={{ textAlign: "center", padding: "2rem" }}>
          <Typography variant="h4" gutterBottom style={{ marginBottom: "1rem" }}>
            📋 Course Results
          </Typography>
          <Typography variant="h5" gutterBottom>
            Course Completed! 🎉
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom style={{ marginTop: "1rem" }}>
            Score: {reviewModeScore} / {questions.length} (
            {questions.length > 0
              ? Math.round((reviewModeScore / questions.length) * 100)
              : 0}
            %)
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32, maxWidth: 400, margin: "32px auto 0" }}>
            <Button
              style={{ background: "blue" }}
              fullWidth
              onClick={handleCloseModal}
            >
              Back to Courses
            </Button>
          </div>
        </div>
      ) : showContent && content ? (
        <div className="content-section mb-8">
          <Text size="lg" mb="md">
            {content.blocks.map((block, index) => (
              <p key={index}>{block.text}</p>
            ))}
          </Text>
          {questions.length > 0 && (
            <Button
              style={{ background: "blue", marginTop: 24 }}
              fullWidth
              onClick={handleStartQuiz}
            >
              Start Quiz ({questions.length} questions)
            </Button>
          )}
        </div>
      ) : !showResult ? (
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
              ? "Submitting..."
              : "Finish"}
          </Button>
        </div>
      ) : loading ? (
        <Box pos="relative" style={{ minHeight: 200 }}>
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        </Box>
      ) : (
        <div className="result-section" style={{ textAlign: "center", padding: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            {responseMessage}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Score: {score} / {questions.length} (
            {questions.length > 0
              ? Math.round((score / questions.length) * 100)
              : 0}
            %)
          </Typography>

          {shouldRetry ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24, maxWidth: 400, margin: "24px auto 0" }}>
              <Button
                fullWidth
                style={{ background: "blue" }}
                onClick={handleReadCourseAgain}
              >
                Read the Course Again
              </Button>
              <Button
                fullWidth
                style={{ background: "green" }}
                onClick={handleRetakeQuiz}
              >
                Retake the Quiz
              </Button>
              <Button
                fullWidth
                variant="outline"
                color="gray"
                onClick={handleComeBackLater}
              >
                Come Back Later
              </Button>
            </div>
          ) : (
            <Button
              style={{ background: "blue", marginTop: 24 }}
              onClick={handleCloseModal}
            >
              Back to Courses
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};
