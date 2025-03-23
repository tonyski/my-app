import "jsr:@std/dotenv/load";
import { Hono } from "hono";
import { getDb } from "./plugins/db.ts";
import { cache } from "hono/cache";

const app = new Hono();

app.get(
  "*",
  cache({ cacheName: "my-app", cacheControl: "max-age=3600", wait: true })
);

app.get("/", async (c) => {
  const db = await getDb(c);
  const result = await db.collection("collections").find({}).toArray();
  return c.json(result);
});

Deno.serve(app.fetch);
