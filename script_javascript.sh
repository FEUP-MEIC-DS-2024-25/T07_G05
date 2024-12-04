# Verificar se os argumentos foram passados
if [ "$#" -ne 2 ]; then
    echo "Uso: $0 <my_code> <test_my_code>"
    exit 1
fi

# Argumentos
MY_CODE="$1"
TEST_MY_CODE="$2"

#Mover os ficheiros para a pasta abaixo
mv "$MY_CODE" "javascript"
mv "$TEST_MY_CODE" "javascript"

#Fazer o processo normal para obter os teste
cd javascript
node generate_mutants.js "$MY_CODE"

#Voltar a mover os ficheiros para a pasta principal + resultado
mv "$MY_CODE" "../"
mv "$TEST_MY_CODE" "../"
mv "mutations.txt" "../"