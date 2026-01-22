import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { products } from "./drizzle/schema.ts";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

const imageUpdates = [
  { slug: "samsung-galaxy-s24-ultra", imageUrl: "/products/samsung-s24-ultra-clean.jpg" },
  { slug: "iphone-15-pro-max", imageUrl: "/products/iphone-15-pro-max-clean.png" },
  { slug: "ipad-pro-11", imageUrl: "/products/ipad-pro-clean.png" },
  { slug: "apple-watch-series-9", imageUrl: "/products/apple-watch-s9-clean.png" },
  { slug: "airpods-pro-2", imageUrl: "/products/airpods-pro-clean.png" },
  { slug: "macbook-pro-14-m3", imageUrl: "/products/macbook-pro-clean.png" },
];

async function updateImages() {
  console.log("Updating product images with clean backgrounds...");
  
  for (const update of imageUpdates) {
    try {
      await db
        .update(products)
        .set({ imageUrl: update.imageUrl })
        .where(eq(products.slug, update.slug));
      console.log(`✓ Updated ${update.slug}`);
    } catch (error) {
      console.error(`✗ Failed to update ${update.slug}:`, error);
    }
  }
  
  console.log("Image update complete!");
  process.exit(0);
}

updateImages();
