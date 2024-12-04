# Verificar se os argumentos foram passados
if [ "$#" -ne 2 ]; then
    echo "Uso: $0 <my_code> <test_my_code>"
    exit 1
fi

# Argumentos
MY_CODE="$1"
TEST_MY_CODE="$2"

cd javascript

node generate_mutants.js sum.js