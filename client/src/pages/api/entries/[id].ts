import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "item id is required" });
  }

  if (req.method === "DELETE") {
    try {
      const result = await query(
        "delete from shoppingitems where itemid = $1",
        [id],
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "item not found" });
      }

      return res
        .status(200)
        .json({ message: "item deleted", deletedItem: result.rows[0] });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: "internal server error" });
      }
    }
  } else if (req.method === "PUT") {
    const { item, amount } = req.body;

    if (!item || !amount) {
      return res
        .status(400)
        .json({ error: "item name and amount are required" });
    }

    try {
      const result = await query(
        "update shoppingitems set item = $1, amount = $2 where itemid = $3 returning *",
        [item, amount, id],
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "item not found" });
      }
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("error executing query", error.stack);
      } else {
        console.error("unexpected error", error);
      }
      return res.status(500).json({ error: "internal server error" });
    }
  } else {
    res.setHeader("allow", ["DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
