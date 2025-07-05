import { useEffect, useState } from "react";
import { getDecisionSubjects, getOptionsBySubject } from "./api";

interface Subject {
  options: string[];
  name: string;
}

function App() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined
  );
  const [data, setData] = useState<Subject[]>([]);

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

  console.log("data:", data);

  return (
    <>
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
          <div>{selectedSubject}</div>
          {data
            .find((s) => s.name === selectedSubject)
            ?.options.map((option) => (
              <div>{option}</div>
            ))}
        </>
      )}
    </>
  );
}

export default App;
