import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Input } from "@/components/ui/input";
import { InputFile } from "./components/ui/file_input";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>(""); // Start as empty string to allow appending
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData();
    if (input) {
        formData.append('content', input);
    }

    try {
        const response = await fetch('http://localhost:5000/Chat', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            setResponse(jsonResponse.content);
        } else {
            throw new Error('POST request failed');
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
    <div className="flex flex-col items-center space-y-6 p-6">
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
                            <label class="upload" for="code-file">Upload code file<i class="fa-solid fa-paperclip"></i></label>{/* código para trocar icon */}
                            <input className="upload_btn" type="file"/>
                        </div>
                        <div>
                            <label class="upload" for="tests-file">Upload tests file<i class="fa-solid fa-paperclip"></i></label>{/* código para trocar icon */}
                            <input className="upload_btn" type="file"/>
                        </div>
                    </section>

                    <section>
                        <label for="context">Give me some context about your code:</label>
                        <textarea id="context" placeholder="Insert here the context."></textarea>
                    </section>

                    <section>
                        <button>Generate mutant tests</button>
                        <button>Download mutant tests</button> {/* acrescentar icon */}
                    </section>
                </main>
    </div>
  );
};

export default App;
