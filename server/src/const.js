export const db_Name="room"

import dotenv from "dotenv";
dotenv.config()

// export const dbLife = Number(process.env.DB_LIFE) ; // fallback 5h (18000s)
export const dbLife = 1*10*60 ; // fallback 5h (18000s)