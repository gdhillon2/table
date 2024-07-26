import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await db.query("select * from users");
    res.status(200).json(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.error("error executing query", error.stack);
    } else {
      console.error("unexpected error:", error);
    }
    res.status(500).json({ error: "internal server error" });
  }
}
