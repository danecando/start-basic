import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./db";

export type PostType = {
  id: string;
  title: string;
  body: string;
  authorId?: string;
  tags?: string[];
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  views?: number;
};

export const fetchPost = createServerFn()
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`);

    try {
      // Validate ObjectId format
      if (!ObjectId.isValid(data)) {
        throw Error("Not found");
      }

      const db = await connectToDatabase();
      const post = await db.collection("posts").findOne({
        _id: new ObjectId(data),
        published: true,
      });

      if (!post) {
        throw Error("Not found");
      }

      return {
        id: post._id.toString(),
        title: post.title,
        body: post.content,
        authorId: post.authorId?.toString(),
        tags: post.tags,
        published: post.published,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
        views: post.views,
      } as PostType;
    } catch (error) {
      if (error instanceof Error && error.message === "Not found") {
        throw error;
      }
      console.error("Failed to fetch post:", error);
      throw new Error("Failed to fetch post");
    }
  });

export const fetchPosts = createServerFn().handler(async () => {
  console.info("Fetching posts...");

  try {
    const db = await connectToDatabase();
    const posts = await db
      .collection("posts")
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      body: post.content,
      authorId: post.authorId?.toString(),
      tags: post.tags,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likes: post.likes,
      views: post.views,
    })) as Array<PostType>;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts");
  }
});
