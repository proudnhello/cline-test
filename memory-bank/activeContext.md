# Active Context

## Current Focus

The current focus is on initializing the project and establishing the foundational structure of the application. This includes setting up the initial game state, creating the core UI components, and implementing the basic game loop.

## Recent Changes

-   **Backend Integration:**
    -   Installed and configured the Supabase client.
    -   Created a database migration to add a `profiles` table for storing game state.
    -   Implemented `saveGameState` and `loadGameState` functions.
    -   Integrated save/load logic into the `GameContainer` component. Game now loads state on startup and saves periodically and on upgrades.

## Next Steps

1.  **Test Supabase Integration:**
    -   Verify that the game state is being saved to and loaded from Supabase correctly.
2.  **Enhance UI/UX:**
    -   Provide more feedback on upgrade purchases.
    -   Animate the money counter when it increases.
    -   Add upgrades that provide unique, non-linear bonuses (e.g., manipulating market trends).
3.  **Authentication:**
    -   Implement a proper login/signup flow so users can create accounts.
    -   Add a logout button.

## Active Decisions

-   We will start with a simple, client-side implementation to get the core gameplay working.
-   We will use basic React state management (`useState`, `useContext`) for now and refactor to a more advanced solution if needed.
-   Upgrades will be implemented using a functional approach, where each upgrade's `apply` method contains the logic for how it modifies the game state.
-   Book completion will be tracked by `wordCount` and `wordsWritten` to intuitively handle both active and passive writing.
