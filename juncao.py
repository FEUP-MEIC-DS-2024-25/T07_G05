import threading
import subprocess
import sys

def run_shell_script_python():
    # Substitua pelo caminho do seu script shell
    script_path = "./script_python.sh"  
    try:
        subprocess.run(["bash", script_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o script: {e}")

def run_shell_script_javascript():
    # Substitua pelo caminho do seu script shell
    script_path = "./script.sh"  
    try:
        subprocess.run(["bash", script_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o script: {e}")

#............................................................
#Recebe como arguemntos, linguagem -> code file -> test code file -> context

if (sys.argv[1]=="python"):
    # Criar a thread
    thread = threading.Thread(target=run_shell_script_python)
    # Iniciar a thread
    thread.start()
    # Esperar a thread terminar (opcional)
    thread.join()

elif (sys.argv[1]=="javascript"):
    # Criar a thread
    thread = threading.Thread(target=run_shell_script_javascript)
    # Iniciar a thread
    thread.start()
    # Esperar a thread terminar (opcional)
    thread.join()
