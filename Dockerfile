# Use uma imagem base com suporte para múltiplas linguagens
FROM ubuntu:22.04

# Atualize o sistema e instale dependências essenciais
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    openjdk-11-jdk \
    nodejs \
    npm \
    git \
    curl \
    && apt-get clean

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie todos os arquivos do projeto para o container
COPY . .

# Instale dependências do Node.js (JavaScript e backend)
RUN npm install --prefix javascript
RUN npm install --prefix back_end_bd

# Adicionar JUnit ao projeto
RUN curl -O https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.9.3/junit-platform-console-standalone-1.9.3.jar \
    && mv junit-platform-console-standalone-1.9.3.jar /usr/local/lib/

# Compilar o código Java com o JUnit no classpath
RUN javac -cp /usr/local/lib/junit-platform-console-standalone-1.9.3.jar java/*.java

# Ajuste permissões para os scripts bash (se necessário)
RUN chmod +x *.sh

# Exponha portas necessárias (se tiver serviços web ou APIs)
EXPOSE 3000  
# Ajuste conforme a aplicação

# Defina o comando principal
CMD ["python3", "juncao.py"]
