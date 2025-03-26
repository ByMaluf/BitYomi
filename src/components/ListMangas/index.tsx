import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { getFullMangaList } from '../../service/getApi';

export default function ListMangas() {

  const [mangas, setMangas] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFullMangaList(100, 0);
        setMangas(data.data);
        console.log(data.data)
      } catch (error) {
        console.error("Erro ao buscar mangás:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getCoverUrl = (manga: Manga) => {
    const cover = manga.relationships.find((rel) => rel.type === "cover_art");
    const fileName = cover?.attributes?.fileName;
    return fileName
      ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
      : null;
  };

  return (
    <div>
      <h1>📚 Lista de Mangás</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {mangas.map((manga) => {
            const imageUrl = getCoverUrl(manga);

            return (
              <li key={manga.id} style={{ marginBottom: "2rem" }}>
                <h2>{manga.attributes.title.en || "Sem título"}</h2>

                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={manga.attributes.title.en || "Capa"}
                    style={{ width: "200px", borderRadius: "8px", marginTop: "1rem" }}
                  />
                )}

                <p><strong>Status:</strong> {manga.attributes.status}</p>
                <p><strong>Classificação:</strong> {manga.attributes.contentRating}</p>
                <p>
                  <strong>Descrição:</strong>{" "}
                  {manga.attributes.description.en?.slice(0, 200) || "Sem descrição"}...
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  )
}