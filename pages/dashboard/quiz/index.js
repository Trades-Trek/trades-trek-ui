import React from "react";
import { useRouter } from "next/router";
import { Card, Text, Button } from "@mantine/core";
import Layout, { useQuizData } from "../../../components/quiz/layout";
import { Loader } from "@mantine/core";

export default function Quiz() {
  const router = useRouter();
  const { userProgressData, groups, loading, error } = useQuizData();
  return (
    <Layout>
      <div>
        <div
          style={{
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)",
            borderRadius: 12,
            padding: "40px 32px",
            marginBottom: 32,
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              Start Your Trading Journey
            </h1>
            <p style={{ fontSize: 16, opacity: 0.9, maxWidth: 500, lineHeight: 1.5 }}>
              Learn the fundamentals of stock trading through interactive courses and quizzes.
              Complete each level to unlock new skills and strategies.
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              right: 60,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>
          Available Courses
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {loading ? (
            <Loader color="blue" />
          ) : (
            groups.map((track) => (
              <TrackCard
                key={track._id}
                title={track.name}
                description={track.description}
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

const TrackCard = ({ title, description, onClick }) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    className="w-70 m-4"
  >
    <Text fw={500} size="xl" mb="xs" style={{ textTransform: "capitalize" }}>
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
