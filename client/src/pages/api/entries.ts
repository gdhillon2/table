import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const result = await query("select * from shoppingitems order by item asc");
      res.status(200).json(result.rows);
    } catch (error) {
      if (error instanceof Error) {
        console.error("error executing query", error.stack);
      } else {
        console.error("unexpected error", error);
      }
    }
  } else if (req.method === "POST") {
    const { item, amount } = req.body;

    if (!item) {
      return res.status(400).json({ error: "item name is required" });
    }

    try {
      const result = await query(
        "insert into shoppingitems (item, amount) values ($1, $2) returning *",
        [item, amount || "1"],
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("error executing query", error.stack);
      } else {
        console.error("unexpected error", error);
      }
    }
    res.status(500).json({ error: "internal server error" });
  }
}
