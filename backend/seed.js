const fs = require('fs');
const path = require('path');
const db = require('./models');  

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

            // Handle categories
            for (const category of product.categories) {
                // Check if the category already exists, if not create it
                const [createdCategory] = await db.Category.findOrCreate({
                    where: { id: category.id }
                });
            
                // Associate the product with the category
                await createdProduct.addCategory(createdCategory);
            }
        }

        console.log('Database seeded successfully with products and categories!');
    } catch (error) {
        console.error('Failed to seed database:', error);
    } finally {
        await db.sequelize.close();
    }
}

seedDatabase();
