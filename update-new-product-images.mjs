import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { products } from "./drizzle/schema.ts";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

const imageUpdates = [
  { name: "Dunlop SP Sport Maxx", image: "/products/dunlop-tire.jpg" },
  { name: "Yokohama Advan Sport", image: "/products/yokohama-tire.jpg" },
  { name: "Hankook Ventus S1 evo3", image: "/products/hankook-tire.jpg" },
  { name: "Falken Azenis FK510", image: "/products/falken-tire.jpg" },
  { name: "Toyo Proxes Sport", image: "/products/toyo-tire.jpg" },
  { name: "Tom Ford Oud Wood", image: "/products/tom-ford-oud-wood.jpg" },
  { name: "YSL Y Eau de Parfum", image: "/products/ysl-y.jpg" },
  { name: "Gucci Guilty Pour Homme", image: "/products/gucci-guilty.jpg" },
  { name: "Jean Paul Gaultier Le Male", image: "/products/le-male.jpg" },
  { name: "Carolina Herrera 212 VIP", image: "/products/212-vip.jpg" },
];

async function updateImages() {
  console.log("Updating product images...");

  for (const update of imageUpdates) {
    try {
      const result = await db
        .update(products)
        .set({ imageUrl: update.image })
        .where(eq(products.nameEn, update.name));

      console.log(`✓ Updated image for: ${update.name}`);
    } catch (error) {
      console.error(`✗ Failed to update ${update.name}:`, error.message);
    }
  }

  console.log("\n✅ Image update complete!");
  process.exit(0);
}

updateImages().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
