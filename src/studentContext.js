import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

const api = "https://students-bac.herokuapp.com/api/student/";

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [formState, setFromState] = useState({
    loading: false,
    error: "",
  });

  const handleError = (error) => {
    console.log("error: ", error);
    setFromState({
      loading: false,
      error: error?.response?.message ?? error.message,
    });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      setFromState({ loading: true, error: "" });
      try {
        const { data } = await axios.get(api);
        setStudents(data);
        setFromState({ loading: false, error: "" });
      } catch (error) {
        handleError(error);
      }
    };
    fetchStudents();
  }, []);

  const addOrUpdateStudent = async (student) => {
    setFromState({ loading: true, error: "" });
    if (!student.name || !student.class || !student.age || !student.country) {
      setFromState({ loading: false, error: "Please enter all fields" });
      return;
    }
    try {
      const url = student._id ? `${api + student._id}` : api;
      const { data } = await axios[student._id ? "patch" : "post"]?.(
        url,
        student
      );
      setStudents((state) => [
        data,
        ...state.filter(({ _id }) => _id !== data._id),
      ]);
      setFromState({
        loading: false,
        error: "",
      });
    } catch (error) {
      handleError(error);
    }
  };

  const deleteStudent = async (studentId) => {
    setFromState({
      loading: true,
      error: "",
    });
    try {
      const { data } = await axios.delete(`${api + studentId}`);
      console.log("data: ", data);

      setStudents((state) => state.filter(({ _id }) => _id !== studentId));

      setFromState({
        loading: false,
        error: "",
      });
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    students,
    addOrUpdateStudent,
    deleteStudent,
    formState,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};
