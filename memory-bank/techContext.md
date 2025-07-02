# Tech Context

## Technology Stack

-   **Framework:** Next.js 14+ with App Router
-   **Styling:** Tailwind CSS
-   **Backend:** Supabase
-   **Deployment:** Vercel
-   **Version Control:** GitHub

## Project Structure

The project follows a standard Next.js structure:

-   `/app`: Contains the application's pages, following the App Router paradigm.
-   `/components`: Houses reusable React components.
-   `/lib`: For utility functions and libraries.
-   `/types`: Holds TypeScript type definitions.
-   `/supabase/migrations`: Stores SQL migration files for the database schema.
-   `/supabase/seed`: Contains data for seeding the database.
-   `/public`: For static assets like images and fonts.

## Development Workflow

-   **Code Development:** All code changes are to be written and reviewed in collaboration with Cline.
-   **Deployment:** The `main` branch is automatically deployed to Vercel.
-   **Database Migrations:** All database migrations must be reviewed by Cline before execution to ensure they are safe and efficient. Migrations are numbered sequentially (e.g., `001_...`, `002_...`).

## Security Considerations

-   Sensitive files such as `.env` files, files containing secrets, API keys, or other credentials must not be read or modified.
