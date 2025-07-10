import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getDecisionSubjects, getOptionsBySubject } from "./api";

interface Subject {
  options: string[];
  name: string;
}

function App() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined
  );
  const [data, setData] = useState<Subject[]>([]);
  const [showToastBackdrop, setShowToastBackdrop] = useState<boolean>(false);

  useEffect(() => {
    getDecisionSubjects().then((subjects: string[]) => {
      setSubjects(subjects);
      subjects.forEach((subject) => {
        getOptionsBySubject(subject).then((options: string[]) => {
          console.log(`Options for ${subject}:`, options);
          const subj: Subject = {
            options,
            name: subject,
          };
          setData((data) => [...data, subj]);
        });
      });
    });
  }, []);

  console.log("data:", data, selectedOption);

  const handleMakeDecision = () => {
    const subjectData = data.find((s) => s.name === selectedSubject);
    if (subjectData && subjectData.options.length > 0) {
      const randomOption =
        subjectData.options[
          Math.floor(Math.random() * subjectData.options.length - 1)
        ];
      setSelectedOption(randomOption);
      toast(
        <div>
          <span style={{ fontWeight: 400, fontSize: "0.7rem" }}>
            Decision made:{" "}
          </span>
          <span style={{ fontWeight: 600 }}>{randomOption}</span>
        </div>,
        {
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onOpen: () => setShowToastBackdrop(true),
          onClose: () => setShowToastBackdrop(false),
        }
      );
    }
  };

  return (
    <>
      <div
        className={`toast-backdrop ${showToastBackdrop ? "show" : ""}`}
        // onClick={handleBackdropClick}
      />
      {!showOptions &&
        subjects.map((subject) => (
          <button
            className="btn"
            onClick={() => {
              setShowOptions(true);
              setSelectedSubject(subject);
            }}
          >
            {subject}
          </button>
        ))}
      {showOptions && (
        <>
          <button className="btn" onClick={handleMakeDecision}>
            Make a decision
          </button>
          <div className="options">
            {data
              .find((s) => s.name === selectedSubject)
              ?.options.map((option) => (
                <div>{option}</div>
              ))}
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
