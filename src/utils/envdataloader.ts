import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default function loadEnvVar(env: string=undefined) {
    const final_env = env || 'qa';
    const envPath = resolve(__dirname, '../../config/.env.' + final_env);
    dotenv.config({ path: envPath });    
}
