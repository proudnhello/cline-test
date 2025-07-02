# System Patterns

## Application Architecture

The application will be a single-page application (SPA) built with Next.js and React. The architecture will be client-centric, with the majority of the game logic residing on the frontend. Supabase will be used for data persistence, primarily for saving player progress.

### Frontend

-   **Game State Management:** The core game state (e.g., player's money, upgrades, books written) will be managed within React components, likely using `useState` and `useContext` or a state management library like Zustand for more complex state.
-   **Component Structure:** The UI will be broken down into a series of reusable components (e.g., `Book`, `Upgrade`, `StatDisplay`).
-   **Game Loop:** The core game loop (e.g., passive income generation) will be driven by `setInterval` or `requestAnimationFrame` to update the game state at regular intervals.

### Backend

-   **Data Persistence:** Player progress will be saved to a Supabase database. This will allow players to close the game and resume their progress later. The application will periodically sync the local game state with the database.
-   **Schema:** The database schema will be simple, likely consisting of a `users` table and a `profiles` table to store game state as a JSON object.

## Key Technical Decisions

-   **Client-Side Logic:** Most of the game logic will be on the client to ensure a responsive and smooth user experience. The backend will primarily be used for data persistence.
-   **State Management:** We will start with simple React state management (`useState`, `useContext`) and introduce a more robust solution (like Zustand or Redux) if the state becomes too complex to manage.
-   **Data Sync:** The application will auto-save player progress to Supabase every few minutes and on key events (e.g., purchasing an upgrade).

## Component Relationships

```mermaid
graph TD
    A[Page] --> B(GameContainer)
    B --> C{GameState}
    B --> D(BookDisplay)
    B --> E(UpgradePanel)
    B --> F(StatsPanel)

    C -- Manages --> D
    C -- Manages --> E
    C -- Manages --> F
