# Active Context

## Current Focus

The current focus is on initializing the project and establishing the foundational structure of the application. This includes setting up the initial game state, creating the core UI components, and implementing the basic game loop.

## Recent Changes

-   **Styled the application:** Applied a consistent dark-theme design to all major components (`GameContainer`, `StatsPanel`, `BookDisplay`, `UpgradePanel`) using Tailwind CSS.
-   **Improved UI/UX:**
    -   Created a two-column layout for better organization.
    -   Added visual feedback for disabled buttons in the `UpgradePanel`.
    -   Implemented a custom progress bar in `BookDisplay`.
-   **Expanded Gameplay:** Added a variety of new upgrades with escalating costs and effects to enhance player progression.

## Next Steps

1.  **Implement "In-Fashion" Genre Mechanic:**
    -   Create a system to periodically change the `trendingGenre`.
    -   Update book value calculations to give a bonus for the trending genre.
2.  **Rebalance and Refine Upgrades:**
    -   Adjust upgrade costs and money generation to improve game pacing.
    -   Hide upgrades that are significantly more expensive than the player's current money.
    -   Add upgrades that unlock new genres.
    -   Add upgrades that provide unique, non-linear bonuses.
3.  **Backend Integration:**
    -   Set up Supabase to save and load player progress.

## Active Decisions

-   We will start with a simple, client-side implementation to get the core gameplay working.
-   We will use basic React state management (`useState`, `useContext`) for now and refactor to a more advanced solution if needed.
-   Upgrades will be implemented using a functional approach, where each upgrade's `apply` method contains the logic for how it modifies the game state.
-   Book completion will be tracked by `wordCount` and `wordsWritten` to intuitively handle both active and passive writing.
