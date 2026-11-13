const artistas = [
    "Tarsila do Amaral",
    "Anita Malfatti",
    "Di Cavalcanti",
    "Candido Portinari",
    "Lasar Segall"
];

document.addEventListener("DOMContentLoaded", carregarObras);

async function carregarObras() {
    const listaHtml = document.getElementById("obras");
    listaHtml.innerHTML = "";

    try {
        for (const artista of artistas) {
            const termoBusca = encodeURIComponent(`${artista} painting`);
            const API_URL = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&generator=search&formatversion=2&iiprop=url&iiurlwidth=400&gsrsearch=Tarsila%20do%20Amaral%20painting&gsrnamespace=&gsrlimit=50&gsrprop=`;

            const resposta = await fetch(API_URL,  {headers :  {
                'Content-Type': 'application/json',
                'Accept': '*'
            }
  });
            const dados = await resposta.json();
            
            console.log(dados)
          
            const paginas = Object.values(dados.query?.pages || {});

            for (const obra of paginas) {
                const imagem = obra.imageinfo?.[0]?.thumburl;
                if (!imagem) continue;

                const titulo = obra.title
                    .replace(/^File:/i, "")
                    .replace(/\.[^.]+$/, "")
                    .replaceAll("_", " ");

                const card = document.createElement("div");
                card.className = "obra_card";

                card.innerHTML = `
                    <img class="imagem_obra" src="${imagem}" width="200" height="250" alt="${titulo}">
                    <p class="titulo2">Título: ${titulo}</p>
                    <button class="botao_resenhar">Resenhar</button>
                `;

                listaHtml.appendChild(card);
            }
        }
    } catch (error) {
        listaHtml.innerHTML = "<p>Algo está errado</p>";
        console.error(error);
    }
}