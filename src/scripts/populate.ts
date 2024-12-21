import { connectDB } from '../client';
import products from '../data/products.json';

async function populate() {
  try {
    const db = await connectDB();
    const collection = db.collection('products');

    // Delete existing records (optional)
    await collection.deleteMany({});
    console.log('Deleted existing products');

    // Insert new records
    const result = await collection.insertMany(
      products.map(product => ({
        name: product.name,
        price: product.price,
        company: product.company.toLowerCase(),
        featured: product.featured || false,
        rating: product.rating || 0,
      }))
    );

    console.log(`Created ${result.insertedCount} products`);
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    process.exit(0);
  }
}

populate();
