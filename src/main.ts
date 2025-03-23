import "jsr:@std/dotenv/load";
import { Hono } from "hono";
import { getDb } from "./plugins/db.ts";

const app = new Hono();

app.get("/", async (c) => {
  const db = await getDb(c);
  const result = await db.collection("collections").find({}).toArray();
  return c.json(result);
});

Deno.serve(app.fetch);
