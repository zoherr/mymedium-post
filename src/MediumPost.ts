import { MediumPostItem } from "./types.js";

export class MediumPost {
  username: string;

  constructor(username: string) {
    if (!username || typeof username !== "string") {
      throw new Error("Medium username must be a valid non-empty string.");
    }

    this.username = username.trim();
  }

  /**
   * Fetch Medium RSS Feed
   */
  private async fetchFeed(): Promise<string> {
    const rssUrl = `https://medium.com/feed/@${this.username}`;

    try {
      const response = await fetch(rssUrl);

      if (!response.ok) {
        throw new Error(`Medium returned HTTP ${response.status}`);
      }

      return await response.text();
    } catch (err: any) {
      throw new Error(`Failed to fetch Medium feed: ${err.message}`);
    }
  }

  /**
   * Parse XML <item> entries from Medium RSS
   */
  private parsePosts(xml: string): MediumPostItem[] {
    const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));

    if (items.length === 0) {
      throw new Error("No posts found in Medium RSS feed.");
    }

    return items.map((match) => {
      const item = match[1];

      const title =
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
        "Untitled";

      const description =
        item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
        "";

      const link =
        item.match(/<link>(.*?)<\/link>/)?.[1] ||
        `https://medium.com/@${this.username}`;

      const dateRaw = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
      const formattedDate = dateRaw
        ? new Date(dateRaw).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        : "Unknown";

      const imgMatch = item.match(/<img[^>]+src="([^"]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : null;

      return {
        title,
        description,
        url: link,
        date: formattedDate,
        imageUrl
      };
    });
  }

  /**
   * Public Method: Get all Medium Posts
   */
  async getAllPosts(): Promise<MediumPostItem[]> {
    try {
      const xml = await this.fetchFeed();
      return this.parsePosts(xml);
    } catch (err: any) {
      throw new Error(`Unable to load Medium posts: ${err.message}`);
    }
  }
}
