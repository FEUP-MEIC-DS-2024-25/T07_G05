import threading
import subprocess
import sys

def run_shell_script_python(code, test):
    # Substitua pelo caminho do seu script shell
    script_path = "./script_python.sh"
    try:
        # Chamar o script com os argumentos passados
        subprocess.run(["bash", script_path, code, test], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o script: {e}")

def run_shell_script_javascript(code, test):
    # Substitua pelo caminho do seu script shell
    script_path = "./script_javascript.sh"
    try:
        # Chamar o script com os argumentos passados
        subprocess.run(["bash", script_path, code, test], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o script: {e}")

def run_shell_script_java(code):
    # Substitua pelo caminho do seu script shell
    script_path = "./script_java.sh"
    try:
        subprocess.run(["bash", script_path, code], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o script: {e}")

# Recebe como argumentos: linguagem -> código fonte -> ficheiro de teste -> contexto
if len(sys.argv) < 2:
    print("Uso: python script.py <linguagem> <code file> <test code file>")
    sys.exit(1)

if sys.argv[1] == "python":
    if len(sys.argv) < 4:
        print("Para Python, forneça o código fonte e o ficheiro de teste.")
        sys.exit(1)
    # Criar a thread
    thread = threading.Thread(target=run_shell_script_python, args=(sys.argv[2], sys.argv[3]))
    # Iniciar a thread
    thread.start()
    # Esperar a thread terminar (opcional)
    thread.join()

if sys.argv[1] == "javascript":
    if len(sys.argv) < 4:
        print("Para Javascript, forneça o código fonte e o ficheiro de teste.")
        sys.exit(1)
    # Criar a thread
    thread = threading.Thread(target=run_shell_script_javascript, args=(sys.argv[2], sys.argv[3]))
    # Iniciar a thread
    thread.start()
    # Esperar a thread terminar (opcional)
    thread.join()

elif sys.argv[1] == "java":
    if len(sys.argv) < 3:
        print("Para Java, código fonte e o ficheiro de teste.")
        sys.exit(1)
        
    # Criar a thread
    thread = threading.Thread(target=run_shell_script_java, args=(sys.argv[2],))  # Nota: Adicionada vírgula aqui
    # Iniciar a thread
    thread.start()
    # Esperar a thread terminar (opcional)
    thread.join()

else:
    print(f"Linguagem desconhecida: {sys.argv[1]}")
