const fs = require('fs');
const path = require('path');
const db = require('./models');  // Assuming your models are initialized in `models/index.js`

// Read the JSON file
const productData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'productdata.json'), 'utf-8'));

async function seedDatabase() {
    try {
        await db.sequelize.sync({ force: true });  // Force sync for seeding, drops and recreates tables

        for (const product of productData) {
            // Create the product
            const createdProduct = await db.Product.create({
                name: product.name,
                short_explanation: product.short_explanation,
                slug: product.slug,
                photo_src: product.photo_src,
                comment_count: product.comment_count,
                average_star: product.average_star
            });

            // Create the price info related to the product
            await db.PriceInfo.create({
                profit: product.price_info.profit,
                total_price: product.price_info.total_price,
                discounted_price: product.price_info.discounted_price,
                price_per_servings: product.price_info.price_per_servings,
                discount_percentage: product.price_info.discount_percentage,
                ProductId: createdProduct.id  // Link the price info to the product
            });
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Failed to seed database:', error);
    } finally {
        await db.sequelize.close();
    }
}

seedDatabase();