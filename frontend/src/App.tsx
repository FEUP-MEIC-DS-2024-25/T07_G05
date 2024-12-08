import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (input) {
      formData.append("content", input);
    }

    try {
      const response = await fetch("http://localhost:5000/Chat", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        setResponse(jsonResponse.content);
      } else {
        throw new Error("POST request failed");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleSubmitFile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("http://localhost:5000/UploadFile", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const jsonResponse = await uploadResponse.json();
        console.log("File upload successful:", jsonResponse);

        // Start tracking progress after the file upload
        trackProgress();
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const trackProgress = async () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:5000/progress");
        if (response.ok) {
          const jsonResponse = await response.json();

          // Update progress
          setProgress(jsonResponse.status);

          // Append to the response without duplication
          setResponse((prevResponse) => {
            return jsonResponse.result.startsWith(prevResponse)
              ? jsonResponse.result
              : prevResponse + jsonResponse.result;
          });

          // Stop tracking when progress reaches 100%
          if (jsonResponse.status === 100) {
            clearInterval(interval);
          }
        } else {
          throw new Error("Failed to fetch progress");
        }
      } catch (error) {
        console.error("Error during progress tracking:", error);
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        backgroundColor: "#302c54",
        color: "white",
      }}
    >
      <style>{`
        h1 {
          font-size: 24px;
          font-weight: bold;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: #2a274a;
          border-bottom: 2px solid #524f81;
        }

        header nav label {
          font-size: 14px;
          color: #c8c8d0;
        }

        header nav select {
          margin-left: 10px;
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          background-color: #524f81;
          color: white;
        }

        main {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        main section {
          margin-bottom: 20px;
          width: 100%;
          max-width: 600px;
        }

        main section label {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
          display: block;
        }

        textarea {
          width: 100%;
          height: 100px;
          background-color: #524f81;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px;
        }

        input.upload_btn {
          display: block;
          margin-top: 10px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          background-color: #524f81;
          color: white;
          cursor: pointer;
        }

        input.upload_btn:hover {
          background-color: #6a67a3;
        }

        button {
          margin-right: 10px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          background-color: #524f81;
          color: white;
          font-size: 14px;
          cursor: pointer;
        }

        button:hover {
          background-color: #6a67a3;
        }

        button:last-child {
          margin-right: 0;
        }

        footer {
          margin-top: 20px;
          padding: 10px;
          background-color: #2a274a;
          text-align: center;
          color: #c8c8d0;
          font-size: 14px;
        }
      `}</style>

      <header>
        <div>
          <h1>TwisterAI</h1>
        </div>
        <div>
          <nav>
            <label>Select the language:</label>
            <select>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </nav>
        </div>
      </header>
      <main>
        <section>
          <div>
            <label className="upload" htmlFor="code-file">
              Upload code file<i className="fa-solid fa-paperclip"></i>
            </label>
            <input className="upload_btn" type="file" />
          </div>
          <div>
            <label className="upload" htmlFor="tests-file">
              Upload tests file<i className="fa-solid fa-paperclip"></i>
            </label>
            <input className="upload_btn" type="file" />
          </div>
        </section>

        <section>
          <label htmlFor="context">Give me some context about your code:</label>
          <textarea id="context" placeholder="Insert here the context."></textarea>
        </section>

        <section>
          <button>Generate mutant tests</button>
          <button>Download mutant tests</button>
        </section>
      </main>
    </div>
  );
};

export default App;
