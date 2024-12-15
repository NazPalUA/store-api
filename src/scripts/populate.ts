import { Company, PrismaClient } from '.prisma/client';
import products from '../data/products.json';

const prisma = new PrismaClient();

async function populate() {
  try {
    // Delete existing records (optional)
    await prisma.product.deleteMany({});
    console.log('Deleted existing products');

    // Insert new records
    const createdProducts = await prisma.product.createMany({
      data: products.map(product => ({
        name: product.name,
        price: product.price,
        company: product.company.toLowerCase() as Company,
        featured: product.featured || false,
        rating: product.rating || 0,
      })),
    });

    console.log(`Created ${createdProducts.count} products`);
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populate();
