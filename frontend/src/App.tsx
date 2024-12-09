import React, { useState } from "react";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [testFile, setTestFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");

  // Função chamada quando o arquivo de teste é selecionado
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "code" | "test"
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const uploadResponse = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
        headers: {
          "X-File-Type": type, // Adiciona o tipo como cabeçalho
        },
      });
  
      if (uploadResponse.ok) {
        const jsonResponse = await uploadResponse.json();
        console.log("File upload successful:", jsonResponse);
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };
  
  

  const handleGenerateTests = async () => {
    const textarea = document.getElementById("context") as HTMLTextAreaElement;
    const context = textarea.value; // Obtém o valor do <textarea>
    const languageElem = document.getElementById("language") as HTMLSelectElement;
    const language = languageElem.value;
  
    if (!context.trim()) {
      setResponse("Por favor, insira algum contexto."); // Mostra um aviso se o textarea estiver vazio
      return;
    }
  
    try {
      // Envia o conteúdo como JSON
      const saveResponse = await fetch("http://localhost:3000/save-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, language }), // Formata os dados corretamente
      });
  
      if (saveResponse.ok) {
        const jsonResponse = await saveResponse.json();
        console.log("Context saved successfully:", jsonResponse);
        setResponse(jsonResponse.message); // Atualiza a mensagem de sucesso no UI
      } else {
        throw new Error("Erro ao salvar o contexto");
      }
    } catch (error) {
      console.error("Erro durante o salvamento do contexto:", error);
      setResponse("Erro durante o salvamento do contexto"); // Atualiza a mensagem de erro no UI
    }
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
            <select id="language">
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
            <input
                className="upload_btn"
                type="file"
                onChange={(e) => handleFileChange(e, 'code')} // Arquivo de código
                />
          </div>
          <div>
            <label className="upload" htmlFor="tests-file">
              Upload tests file<i className="fa-solid fa-paperclip"></i>
            </label>
            <input
                className="upload_btn"
                type="file"
                onChange={(e) => handleFileChange(e, 'test')} // Arquivo de teste
                />
          </div>
        </section>

        <section>
            <label htmlFor="context">Give me some context about your code:</label>
            <textarea id="context" placeholder="Insert here the context."></textarea>
        </section>

        <section>
            <button onClick={handleGenerateTests}>Generate mutant tests</button>
            <button>Download mutant tests</button>
        </section>


        <section>
          {/* Exibe a resposta do servidor */}
          <p>{response}</p>
        </section>
      </main>
    </div>
  );
};

export default App;
