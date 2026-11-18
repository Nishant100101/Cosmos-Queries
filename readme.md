# Cosmos Queries 🌌

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Live Application:** [https://cosmos-queries-aiqa.vercel.app/](https://cosmos-queries-aiqa.vercel.app/)

Cosmos Queries is a robust, full-stack community-driven Q&A platform designed for developers and knowledge seekers. Built with a modern tech stack, it features seamless authentication, a rich markdown editor, advanced global search, and a complex reputation/badge system to encourage user engagement.

## 🚀 Key Features

- **Advanced Q&A Mechanics:** Users can ask questions, write detailed answers, and upvote/downvote content.
- **Global & Local Search:** A highly optimized, debounced search system that queries across Questions, Answers, Tags, and Users simultaneously.
- **Tagging System:** Categorize questions with dynamic tags, allowing users to filter content by their specific interests.
- **Reputation & Badges:** An automated gamification engine that awards reputation points and badges based on user interactions (asking, answering, receiving upvotes).
- **Saved Collections:** Users can bookmark specific questions to their personal collections for easy access.
- **Responsive & Accessible UI:** Fully responsive design built with Tailwind CSS and Shadcn UI, featuring seamless Light/Dark mode toggling.
- **Optimistic UI Updates:** Voting and interaction buttons provide instant user feedback before server confirmation.

## 🛠️ Tech Stack & Architecture

### Frontend

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component Library:** Shadcn UI (Radix Primitives)
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide React

### Backend

- **Architecture:** Next.js Server Actions (eliminating the need for traditional REST API routes).
- **Database:** MongoDB
- **ORM:** Mongoose (with custom connection caching for serverless environments).
- **Authentication:** Clerk (via Webhooks).

---

## 🧠 System Architecture & Data Flow

This application is built with a focus on scalability and performance, specifically tailored for serverless deployments like Vercel.

### 1. Serverless Connection Pooling

To prevent database connection exhaustion in a serverless environment, the application utilizes a custom Mongoose connection cache (`lib/mongoose.ts`). The connection instance and promise are stored in the Node.js `global` object. When Next.js spins up multiple serverless functions, they reuse the single active connection pool rather than opening hundreds of new TCP connections to MongoDB.

### 2. Form Mutation Flow (Client to Server)

The application strictly separates UI state from business logic:

1. **Client-Side Validation:** Forms (e.g., Ask Question) utilize `react-hook-form` paired with a strict `zod` schema to ensure data integrity without unnecessary server roundtrips.
2. **Server Actions:** Once validated, the client directly invokes an asynchronous Server Action.
3. **Database Transaction:** The Server Action interacts with the MongoDB database using Mongoose. Complex operations (like adding a question, generating associated tags, and updating the author's reference array) are handled atomically.
4. **Cache Invalidation:** Upon successful mutation, Next.js `revalidatePath` is called to purge the server-side cache for the affected route, ensuring the user instantly sees the updated data upon redirect without a hard browser reload.

### 3. Asynchronous Authentication Sync

Authentication is handled via an external provider (Clerk). To maintain a synchronized single source of truth in the primary MongoDB database:

- When a user signs up, the Auth provider fires an event to a secure API webhook (`api/webhook/route.ts`).
- The backend verifies the webhook signature (to prevent spoofing) and processes the payload.
- A Server Action then creates or updates the user profile directly in the MongoDB `User` collection.

---

## 📂 Project Structure

```text
├── (auth)/                 # Authentication routes (Sign In / Sign Up)
├── (root)/                 # Main application routes (Layouts, Pages)
│   ├── (Home)/             # Feed & Global search
│   ├── ask-question/       # Question creation form
│   ├── collection/         # Saved questions
│   ├── community/          # User directory
│   ├── profile/            # User profiles & settings
│   ├── question/           # Dynamic question details & edit routes
│   └── tags/               # Dynamic tag feeds
├── api/
│   └── webhook/            # Webhook listeners for Auth synchronization
├── components/
│   ├── cards/              # Reusable UI cards (Question, Answer, User)
│   ├── forms/              # Complex client-side forms (RHF + Zod)
│   ├── shared/             # Global components (Navbar, Sidebar, Pagination, Search)
│   └── ui/                 # Shadcn UI primitives
├── database/               # Mongoose schemas (User, Question, Answer, Tag, Interaction)
├── lib/
│   ├── actions/            # Next.js Server Actions (Core business logic)
│   ├── mongoose.ts         # Database connection & pooling logic
│   └── validations.tsx     # Zod schemas for form validation
└── styles/                 # Global CSS and syntax highlighting themes
```

## 💻 Local Development Setup

To run this project locally, follow these steps:

**1. Clone the repository**

```bash
git clone https://github.com/your-username/cosmos-queries.git
cd cosmos-queries
```

**2. Install dependencies**

```bash
npm install
# or
yarn install
```

**3. Setup Environment Variables**
Create a `.env.local` file in the root directory and add the following keys. You will need to obtain these from your MongoDB dashboard and Clerk (or your chosen Auth provider) dashboard.

```env
MONGODB_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_TINY_EDITOR_API_KEY=
SIGNING_SECRET=

# Deployment URL (for metadata and absolute links)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**4. Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
