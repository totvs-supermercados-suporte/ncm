const inputArquivo = document.getElementById('arquivo-xml');
const btnProcessar = document.getElementById('btn-processar');
const resultadosEiframe = document.getElementById('resultados-e-iframe');

btnProcessar.addEventListener('click', () => {
    const arquivo = inputArquivo.files[0];

    if (arquivo) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const xml = e.target.result;
            processarXML(xml);
        };

        reader.readAsText(arquivo);
    } else {
        alert('Selecione um arquivo XML');
    }
});

function processarXML(xml) {
    let contadorNCMs = 0;
    let resultado = "";

    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");

        const ncms = xmlDoc.getElementsByTagName("NCM");

        for (let i = 0; i < ncms.length; i++) {
            const ncm = ncms[i].textContent;
            contadorNCMs++;
            resultado += `${contadorNCMs}. ${ncm}\n`; 
        }

        resultado += `\nTotal de NCMs encontrados: ${contadorNCMs}`;
        document.getElementById('resultado-texto').textContent = resultado;
        
        // Exibir o elemento após o processamento do XML
        resultadosEiframe.style.display = 'block';
    } catch (e) {
        alert('Erro ao processar o XML:', e.message);
    }
}

