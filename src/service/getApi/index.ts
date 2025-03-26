import api from "../api";

export const getFullMangaList = async (limit = 10, offset = 0) => {
  const response = await api.get("/mangas", {
    params: {
      limit,
      offset,
      "includes[]": ["author", "artist", "cover_art"],
      "order[latestUploadedChapter]": "desc",
    },
  });

  return response.data;
};
