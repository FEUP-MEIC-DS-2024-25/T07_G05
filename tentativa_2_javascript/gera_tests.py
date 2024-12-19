import sys
import re

def gerar_mutacoes_js(linha):
    """
    Gera mutações possíveis para uma linha de código JavaScript.
    """
    mutacoes = []
    
    # Exemplo 1: Substituir operadores aritméticos
    operadores = {"+": "-", "-": "+", "*": "/", "/": "*"}
    for op in operadores:
        if op in linha:
            mutacoes.append(linha.replace(op, operadores[op]))

    # Exemplo 2: Negar condições
    if "===" in linha:
        mutacoes.append(linha.replace("===", "!=="))
    if "!==" in linha:
        mutacoes.append(linha.replace("!==", "==="))

    # Exemplo 3: Alterar valores booleanos
    if "true" in linha:
        mutacoes.append(linha.replace("true", "false"))
    if "false" in linha:
        mutacoes.append(linha.replace("false", "true"))

    # Exemplo 4: Modificar números constantes
    numeros = re.findall(r'\b\d+\b', linha)
    for numero in numeros:
        mutacoes.append(linha.replace(numero, str(int(numero) + 1)))  # Incrementa
        mutacoes.append(linha.replace(numero, str(int(numero) - 1)))  # Decrementa

    return mutacoes

def main():
    if len(sys.argv) != 2:
        print("Uso: python script.py <nome_do_ficheiro_js>")
        sys.exit(1)

    nome_ficheiro = sys.argv[1]

    try:
        with open(nome_ficheiro, 'r') as ficheiro:
            linhas = ficheiro.readlines()
            resultado = []

            for num, linha in enumerate(linhas, start=1):
                linha = linha.strip()  # Remove espaços extras
                mutacoes = gerar_mutacoes_js(linha)  # Gera mutações
                # Adiciona a linha original e suas mutações
                entrada = [linha] + mutacoes
                resultado.append(entrada)

            print(resultado)
            return resultado  # Retorna a lista com as linhas e mutações

    except FileNotFoundError:
        print(f"Erro: O ficheiro '{nome_ficheiro}' não foi encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

if __name__ == "__main__":
    main()
