# Active Context

## Current Focus

The current focus is on initializing the project and establishing the foundational structure of the application. This includes setting up the initial game state, creating the core UI components, and implementing the basic game loop.

## Recent Changes

-   Created the `types/index.ts` file, which defines the core data structures for the game (`GameState`, `Book`, `Upgrade`, `Genre`).
-   Refined the `Upgrade` interface to use a functional approach for applying effects, making the system more extensible.
-   Updated the `GameState` to include tracking for a `trendingGenre`.
-   Adjusted the `Genre` type to start with only 'Romance'.

## Next Steps

1.  **Set up Game State:** (Completed) Define the initial game state structure in a new file, `/types/index.ts`.
2.  **Create Core Components:** Develop the initial set of React components for the game interface. This will include:
    -   A `GameContainer` component to hold the main game logic.
    -   A `BookDisplay` component to show the current book being written.
    -   An `UpgradePanel` component to display available upgrades.
    -   A `StatsPanel` component to show the player's current stats (e.g., money, books per second).
3.  **Implement Game Loop:** Create the basic game loop to handle passive income generation and other time-based events.
4.  **Style the Application:** Apply basic styling using Tailwind CSS to create a clean and functional UI.

## Active Decisions

-   We will start with a simple, client-side implementation to get the core gameplay working.
-   We will use basic React state management (`useState`, `useContext`) for now and refactor to a more advanced solution if needed.
-   Upgrades will be implemented using a functional approach, where each upgrade's `apply` method contains the logic for how it modifies the game state.
-   Book completion will be tracked by `wordCount` and `wordsWritten` to intuitively handle both active and passive writing.
