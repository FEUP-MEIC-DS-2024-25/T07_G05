import React, { useState } from "react";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [testFile, setTestFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");

  // Função chamada quando o arquivo de teste é selecionado
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Pega o arquivo selecionado

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    setTestFile(selectedFile); // Atualiza o estado com o arquivo selecionado

    // Cria o FormData para enviar o arquivo ao servidor
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Faz a requisição POST para o servidor
      const uploadResponse = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const jsonResponse = await uploadResponse.json();
        console.log("File upload successful:", jsonResponse);
        setResponse(`File uploaded successfully: ${jsonResponse.filename}`); // Exibe o nome do arquivo
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setResponse("Error during file upload");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <header>
        <div>
          <h1>TwisterAI</h1>
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
              onChange={handleFileChange} // Chama a função handleFileChange ao selecionar o arquivo
            />
          </div>
          <div>
            <label className="upload" htmlFor="tests-file">
              Upload tests file<i className="fa-solid fa-paperclip"></i>
            </label>
            <input
              className="upload_btn"
              type="file"
              onChange={handleFileChange} // Chama a mesma função para enviar o arquivo de teste
            />
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

        <section>
          {/* Exibe a resposta do servidor */}
          <p>{response}</p>
        </section>
      </main>
    </div>
  );
};

export default App;
