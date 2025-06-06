# 📚 Book Manager - Full Stack Application

A modern CRUD application for managing personal book collections, built with Next.js, Supabase, and Tailwind CSS. Features user authentication and full book management capabilities.

## ✨ Features

- 🔐 Secure authentication with Supabase Auth (Email/Password)
- 📖 Full CRUD operations for books:
  - Add new books with title, author, year, and category
  - View personal book collection
  - Edit existing book details
  - Delete books
- 🔍 Search and filter functionality
- 🎨 Responsive UI built with Tailwind CSS and ShadCN components
- 🐳 Local development with Dockerized Supabase
- ☁️ Production deployment on Vercel with Supabase Cloud

## 🛠 Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI components
- **Backend**: Supabase (Auth, Database, Storage)
- **Database**: PostgreSQL (via Supabase)
- **Tools**: Docker, v0.dev (UI generation)
- **Deployment**: Vercel

## 📦 Project Structure

```
book-manager/
├── my-app/ # Next.js application
│ ├── components/ # React components
│ ├── lib/ # Supabase client and utilities
│ ├── app/ # Next.js app router structure
│ ├── public/ # Static assets
| ├── services/ # Services to connect with Supabase
| └── utils/ # Utils for the project
├── docker/ # Local Supabase setup
│ ├── docker-compose.yml # Docker configuration
│ └── seed.sql # Database seeding script
└── README.md # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Docker Desktop (for local development)
- Git

### Local Development Setup

1. **Clone the repository**

   ```bash
   git git remote add origin https://github.com/Jaycom17/app-books.git
   cd app-books
   ```

2. **Set up environment variables**

To simplify the setup process, the .env files contain generic information based on the official Supabase documentation.

If needed, you can update the Supabase credentials (for example, during local development, using the values from the Docker setup). These changes should be made in the .env file inside the docker folder.

You can run this project without modifying any .env files, as it uses the default values from the Supabase documentation.

3. **Start Supabase locally with Docker**

The container setup and Docker configuration are based on the Supabase self-hosting documentation, with some modifications to automatically load the database structure (seed.sql) during initialization.

The .env file has been adjusted to disable email verification in the local environment, simplifying the registration process for development purposes.

```bash
cd /docker
docker-compose up -d
```

Wait for all containers to fully initialize (this may take a few minutes on the first run).

If you want to access Supabase Studio, open http://localhost:8000 in your browser and use the following credentials:
```
user: supabase
password: this_password_is_insecure_and_should_be_updated
```

4. **Install dependencies for the frontend**

```bash
cd ../my-app
npm install
```

5. **Run the development server**

```bash
npm run dev
```

6. **Access the application**

- Open http://localhost:3000 in your browser.

## Production Deployment

### Vercel Deployment

The project is deyplyed in: 

### Supabase Cloud Setup

A project for the app was created with the following database configuration:

```sql
create table if not exists books (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  author text not null,
  year int,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Activar RLS
alter table books enable row level security;

-- Políticas RLS
create policy "Users can view their own books"
  on books
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own books"
  on books
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own books"
  on books
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own books"
  on books
  for delete
  using (auth.uid() = user_id);
```

- This configuration enables the app to securely manage books associated with individual users.

- The app dynamically reads the Supabase URL and the anonymous key (anon key) from the environment variables to connect to the backend.

## 🐳 Docker Setup Details

The included docker-compose.yml sets up a complete local Supabase environment with:

- PostgreSQL database

- Supabase API

- Studio interface (accessible at http://localhost:8000)

- Auth services

- Automatic database seeding

To stop the services:

```bash
cd /docker
docker-compose down
```

if you want te delete the volumes:

```bash
cd /docker
docker-compose down -v
```

## 📧 Contact

Juan Camilo Orejuela - juanorejuela499@gmail.com

Project Link: git remote add origin https://github.com/Jaycom17/app-books

Live Demo: https://book-manager.vercel.app
