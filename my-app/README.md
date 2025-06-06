# Book Manager

Book Manager is a web application to manage your personal book collection. Users can sign up, sign in, add, edit, delete, search, filter, and sort books. The app features a modern UI built with Next.js, Shadcn, React, and Tailwind CSS starting for a V0 generated project, and uses Supabase for authentication and database management.

## Features

- User authentication (Supabase Auth)
- Add, edit, and delete books
- Search, filter, and sort books
- Change password and sign out
- Responsive and modern UI
- Supabase/PostgreSQL backend

## Project Structure

- `my-app/`: Next.js application source code
  - `components/`: UI and logic components
  - `models/`: Data models and validation schemas
  - `services/`: API and Supabase logic
  - `hooks/`, `utils/`, `public/`, etc.
- `docker/`: Docker Compose files and scripts for local Supabase setup

## Requirements

- Node.js >= 18
- Docker & Docker Compose (for local Supabase)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd app-books/my-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.local` and update Supabase keys if needed.
   - For backend, check `docker/.env`.

4. **Start Supabase locally (optional, for development):**
   ```sh
   cd ../docker
   docker-compose up
   ```

5. **Run the Next.js app:**
   ```sh
   npm run dev
   ```

6. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start in production mode
- `npm run lint` — Run linter

## License

MIT

---

Built with ❤️ using Next.js, React, Tailwind CSS, and Supabase.