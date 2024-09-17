import Sidebar from "../Sidebar/Sidebar";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { quizService } from "../../services/quiz.service";

export const useQuizData = () => {
  const [userProgressData, setUserProgressData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userProgress, learningModuleGroups] = await Promise.all([
          quizService.getUserProgress(),
          quizService.getLearningModuleGroups(),
        ]);

        setUserProgressData(userProgress.data);
        setGroups(learningModuleGroups.data);
      } catch (err) {
        setError(err);
        // Handle error here, e.g., show a toast message
        console.error('Error fetching quiz data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userProgressData, groups, loading, error };
};

const Layout = ({ children }) => {
    return (
      <>
        <Sidebar />
        <div className="site--content pageCenterWidth">
          <div className="page--title--block">
            <div
              className="page--title--block"
              style={{ background: "white", padding: 20 }}
            >
              {children}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Layout;