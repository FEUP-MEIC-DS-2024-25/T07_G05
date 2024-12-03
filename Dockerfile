# Usa uma imagem base com Node.js e instala Java e Python
FROM node:18

# Instala Java, Python e outras ferramentas necessárias
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk python3 python3-pip && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Define variáveis de ambiente para Java
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Define o diretório de trabalho
WORKDIR /app

# Copia os ficheiros de dependências do JavaScript e Python
COPY javascript/package*.json ./javascript/
COPY python/requirements.txt ./python/

# Instala as dependências do JavaScript
RUN cd ./javascript && npm install

# Instala as dependências do Python
RUN pip3 install -r ./python/requirements.txt

# Copia todo o código da aplicação para o container
COPY . .

# Torna o script .sh executável, caso necessário
RUN chmod +x python/script.sh

# Compila o código Java
RUN javac java/*.java

# Expõe a porta usada pela aplicação, se aplicável
EXPOSE 3000

# Comando padrão para executar a aplicação ou um script principal
CMD ["bash", "python/script.sh"]
