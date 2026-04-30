/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

const AiAPI = {
  generateNucleus: async (item: string) => {
    const response = await api.post("/ai/generate", { item });
    return response.data;
  },
  generateFunction: async (title: string, objectNames?: string[]) => {
    const response = await api.post("/ai/generate-function", { title, objectNames });
    return response.data;
  },
};

export default AiAPI;
