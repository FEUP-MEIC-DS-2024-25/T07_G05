import xml.etree.ElementTree as ET

# Caminho para o arquivo XML
xml_path = 'report/mutations.xml'
txt_output_path = 'pitest_results.txt'

# Parse do arquivo XML
tree = ET.parse(xml_path)
root = tree.getroot()

# Criação do arquivo de saída
with open(txt_output_path, 'w') as txt_file:
    txt_file.write('Resultados do PITEST\n\n')
    for mutation in root.findall('mutation'):
        source_file = mutation.find('sourceFile').text if mutation.find('sourceFile') is not None else 'N/A'
        mutated_class = mutation.find('mutatedClass').text if mutation.find('mutatedClass') is not None else 'N/A'
        mutated_method = mutation.find('mutatedMethod').text if mutation.find('mutatedMethod') is not None else 'N/A'
        line_number = mutation.find('lineNumber').text if mutation.find('lineNumber') is not None else 'N/A'
        status = mutation.find('status').text if mutation.find('status') is not None else 'N/A'

        txt_file.write(f'Arquivo: {source_file}\n')
        txt_file.write(f'Classe Mutada: {mutated_class}\n')
        txt_file.write(f'Método Mutado: {mutated_method}\n')
        txt_file.write(f'Linha: {line_number}\n')
        txt_file.write(f'Status: {status}\n')
        txt_file.write('-' * 40 + '\n')

print(f'Os resultados foram exportados para: {txt_output_path}')
