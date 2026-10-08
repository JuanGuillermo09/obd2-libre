/**
 * Servicio de búsqueda web.
 *
 * Contiene la lógica para buscar información en la web.
 * Actualmente usa DuckDuckGo (sin API key).
 */
const cheerio = require('cheerio');

/**
 * Busca información en la web usando DuckDuckGo.
 * Devuelve los primeros 5 resultados con título, descripción y URL.
 */
async function buscarEnWeb(q) {
  if (!q || q.length < 2) {
    throw new Error('Ingresa al menos 2 caracteres para buscar');
  }

  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`DuckDuckGo respondió ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const resultados = [];

    $('.result').each((i, el) => {
      if (resultados.length >= 5) return false;
      const titleEl = $(el).find('.result__a').first();
      const snippetEl = $(el).find('.result__snippet').first();
      const href = titleEl.attr('href') || '';
      const titulo = titleEl.text().trim();
      const descripcion = snippetEl.text().trim();
      if (titulo && href) {
        resultados.push({ titulo, url: href, descripcion });
      }
    });

    return {
      query: q,
      total: resultados.length,
      resultados
    };
  } catch (err) {
    console.error('Error en búsqueda web:', err.message);
    return {
      query: q,
      total: 0,
      resultados: [],
      error: 'No se pudo completar la búsqueda'
    };
  }
}

module.exports = {
  buscarEnWeb,
};
