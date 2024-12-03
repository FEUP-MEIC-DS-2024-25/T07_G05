import threading
import subprocess

def run_shell_script():
    # Substitua pelo caminho do seu script shell
    script_path = "./script.sh"  
    try:
        subprocess.run(["bash", script_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o script: {e}")

#............................................................

# Criar a thread
thread = threading.Thread(target=run_shell_script)

# Iniciar a thread
thread.start()

# Continuar a executar o programa principal
for i in range(5):
    print(f"Tarefa principal: {i}")

# Esperar a thread terminar (opcional)
thread.join()
