Here is a **professional, production-grade README.md** for your NPM package **mymedium-post** — written exactly like top-tier open-source libraries.
You can paste this directly into your repo.

---

# 📦 **mymedium-post**

A lightweight, fully typed JavaScript/TypeScript library for fetching and parsing Medium blog posts via RSS.
Built with clean error handling, validation, and zero dependencies.

Easily retrieve all posts from any Medium username using a simple, class-based API.

---

## ✨ **Features**

* 🚀 Fetch posts from **any Medium user**
* ⚡ Zero dependencies — fast & lightweight
* 🎯 Works in **Node.js, Next.js, Bun, Deno**
* 🔒 Includes validation & informative error handling
* 📑 Extracts:

  * Title
  * Description
  * Published date
  * Post URL
  * First image (if available)
* 📘 Fully **TypeScript supported** (bundles `.d.ts` types automatically)
* 🧩 Clean and simple API:

  ```ts
  const medium = new MediumPost("username");
  const posts = await medium.getAllPosts();
  ```

---

## 📥 **Installation**

### Using npm

```bash
npm install mymedium-post
```

### Using yarn

```bash
yarn add mymedium-post
```

### Using pnpm

```bash
pnpm add mymedium-post
```

---

## 🚀 **Quick Start**

### **TypeScript**

```ts
import { MediumPost } from "mymedium-post";

const medium = new MediumPost("zoher");

const posts = await medium.getAllPosts();

console.log(posts);
```

### **JavaScript**

```js
import { MediumPost } from "mymedium-post";

const medium = new MediumPost("zoher");

medium.getAllPosts().then(console.log);
```

---

## 🧠 **What the Output Looks Like**

`getAllPosts()` returns an array of:

```ts
interface MediumPostItem {
  title: string;
  description: string;
  date: string;       // formatted: "Jan 10, 2025"
  url: string;
  imageUrl: string | null;
}
```

Example:

```json
[
  {
    "title": "My Journey into Web Development",
    "description": "In this article I explain...",
    "date": "Jan 5, 2025",
    "url": "https://medium.com/@zoher/my-journey...",
    "imageUrl": "https://miro.medium.com/v2/resize..."
  }
]
```

---

## 📚 **API Reference**

### ### **Class: `MediumPost`**

---

### **`new MediumPost(username: string)`**

Creates a new instance for a Medium user.

#### **Parameters**

| Name       | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `username` | `string` | Your Medium username (without "@") |

#### **Throws**

* `"Medium username must be a valid non-empty string."`

---

### **`getAllPosts(): Promise<MediumPostItem[]>`**

Fetches all Medium posts for the configured username.

#### **Returns**

* `Promise<MediumPostItem[]>` — array of parsed posts.

#### **Throws**

* `Failed to fetch Medium feed: ...`
* `Medium returned HTTP 404`
* `No posts found in Medium RSS feed.`
* `Unable to load Medium posts: ...`

---

## ⚠️ **Error Handling**

This package provides **clear developer-focused error messages**, such as:

* Invalid username
* Medium feed unreachable
* Medium RSS changed or empty
* Network failure
* XML parsing failure

Example:

```ts
try {
  const posts = await medium.getAllPosts();
} catch (err) {
  console.error("Medium fetch failed:", err.message);
}
```

---

## 🤝 **Contributing**

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or PR.

---

## 📄 **License**

MIT License © 2025 — Developed with ❤️ by **Zoher R**

