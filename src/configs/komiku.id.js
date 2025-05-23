const comicListConfig = {
    url: "https://komiku.id/daftar-komik/",
    waitUntil: "domcontentloaded",
    timeout: 15000,
    listComicsSelector: "div.ls4",
    titleSelector: "div.ls4 div.ls4j h4 a",
    linkSelector: "div.ls4 div.ls4v a",
    coverSelector: "div.ls4 div.ls4v a img"
}

const comicDetailConfig = {
    titleSelector: "div#Judul h1 span",
    descSelector: "div#Judul p.desc",
    chaptersList: "table#Daftar_Chapter tr",
    chapterLink: "td.judulseries a",
    chapterTitle: "td.judulseries a span"
}

const chapterConfig = {
    imagesSelector: "div#Baca_Komik img",
}



module.exports = {
    comicListConfig,
    comicDetailConfig,
    chapterConfig
}