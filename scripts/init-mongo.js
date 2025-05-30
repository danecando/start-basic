// MongoDB initialization script
db = db.getSiblingDB('start_basic');

// Create collections and insert sample data
db.users.insertMany([
  {
    _id: ObjectId(),
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    createdAt: new Date(),
    preferences: {
      theme: "dark",
      notifications: true
    }
  },
  {
    _id: ObjectId(),
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
    createdAt: new Date(),
    preferences: {
      theme: "light",
      notifications: false
    }
  },
  {
    _id: ObjectId(),
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    age: 35,
    createdAt: new Date(),
    preferences: {
      theme: "auto",
      notifications: true
    }
  }
]);

db.posts.insertMany([
  {
    _id: ObjectId(),
    title: "Getting Started with MongoDB",
    content: "MongoDB is a document-oriented NoSQL database...",
    authorId: db.users.findOne({email: "john.doe@example.com"})._id,
    tags: ["mongodb", "database", "nosql"],
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true
  },
  {
    _id: ObjectId(),
    title: "TanStack Start Framework",
    content: "TanStack Start is a modern full-stack framework...",
    authorId: db.users.findOne({email: "jane.smith@example.com"})._id,
    tags: ["tanstack", "react", "framework"],
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true
  },
  {
    _id: ObjectId(),
    title: "Draft Post",
    content: "This is a draft post that hasn't been published yet...",
    authorId: db.users.findOne({email: "bob.johnson@example.com"})._id,
    tags: ["draft"],
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false
  }
]);

print("Database initialized with sample data");