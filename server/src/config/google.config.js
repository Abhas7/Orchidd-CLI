import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const config = {
    googleApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
    model: process.env.ORBITAL_MODEL || "gemini-1.5-flash"
}    
