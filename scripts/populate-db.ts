import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/start_basic?authSource=admin';

async function populateDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('start_basic');
    
    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('posts').deleteMany({});
    console.log('Cleared existing data');
    
    // Insert users
    const users = await db.collection('users').insertMany([
      {
        name: "Alice Wilson",
        email: "alice.wilson@example.com",
        age: 28,
        createdAt: new Date(),
        preferences: {
          theme: "dark",
          notifications: true,
          language: "en"
        }
      },
      {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        age: 32,
        createdAt: new Date(),
        preferences: {
          theme: "light",
          notifications: false,
          language: "en"
        }
      },
      {
        name: "Diana Prince",
        email: "diana.prince@example.com",
        age: 29,
        createdAt: new Date(),
        preferences: {
          theme: "auto",
          notifications: true,
          language: "es"
        }
      }
    ]);
    
    console.log(`Inserted ${users.insertedCount} users`);
    
    // Get user IDs for posts
    const userIds = Object.values(users.insertedIds);
    
    // Insert posts
    const posts = await db.collection('posts').insertMany([
      {
        title: "Building Modern Web Applications",
        content: "In this post, we'll explore the latest trends in web development and how to build scalable applications.",
        authorId: userIds[0],
        tags: ["web development", "javascript", "react"],
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        likes: 15,
        views: 120
      },
      {
        title: "Database Design Best Practices",
        content: "Learn about effective database design patterns and how to optimize your data models.",
        authorId: userIds[1],
        tags: ["database", "mongodb", "design"],
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        likes: 8,
        views: 85
      },
      {
        title: "Docker and Containerization",
        content: "A comprehensive guide to containerizing your applications with Docker.",
        authorId: userIds[2],
        tags: ["docker", "devops", "containers"],
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        likes: 22,
        views: 150
      },
      {
        title: "Work in Progress",
        content: "This article is still being written...",
        authorId: userIds[0],
        tags: ["draft", "wip"],
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
        likes: 0,
        views: 0
      }
    ]);
    
    console.log(`Inserted ${posts.insertedCount} posts`);
    
    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('posts').createIndex({ authorId: 1 });
    await db.collection('posts').createIndex({ tags: 1 });
    await db.collection('posts').createIndex({ published: 1 });
    
    console.log('Created database indexes');
    console.log('Database population completed successfully!');
    
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await client.close();
  }
}

populateDatabase();