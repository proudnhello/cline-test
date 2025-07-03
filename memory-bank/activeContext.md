# Active Context

## Current Focus

The current focus is on initializing the project and establishing the foundational structure of the application. This includes setting up the initial game state, creating the core UI components, and implementing the basic game loop.

## Recent Changes

-   **Rebalanced Gameplay Mechanics:**
    -   Compressed the cost of all upgrades to accelerate progression.
    -   Reduced the word count for books and randomized it (50-100 words).
    -   Added a new `wordCountMultiplier` and associated upgrades to decrease book length over time.
-   **Improved UI/UX:**
    -   Hid unaffordable upgrades to reduce clutter in the `UpgradePanel`.
    -   Added a fallback message in the `UpgradePanel` for when no upgrades are visible, preventing layout issues.
    -   Created a two-column layout for better organization.
    -   Added visual feedback for disabled buttons in the `UpgradePanel`.
    -   Implemented a custom progress bar in `BookDisplay`.
-   **Updated Project Brief:** Changed the target time for next upgrade from 30-60 seconds to 10-30 seconds.
-   **Styled the application:** Applied a consistent dark-theme design to all major components (`GameContainer`, `StatsPanel`, `BookDisplay`, `UpgradePanel`) using Tailwind CSS.

## Next Steps

1.  **Backend Integration:**
    -   Set up Supabase to save and load player progress.
2.  **Enhance UI/UX:**
    -   Provide more feedback on upgrade purchases.
    -   Animate the money counter when it increases.
    -   Add upgrades that provide unique, non-linear bonuses (e.g., manipulating market trends).
2.  **Backend Integration:**
    -   Set up Supabase to save and load player progress.
3.  **Enhance UI/UX:**
    -   Provide more feedback on upgrade purchases.
    -   Animate the money counter when it increases.

## Active Decisions

-   We will start with a simple, client-side implementation to get the core gameplay working.
-   We will use basic React state management (`useState`, `useContext`) for now and refactor to a more advanced solution if needed.
-   Upgrades will be implemented using a functional approach, where each upgrade's `apply` method contains the logic for how it modifies the game state.
-   Book completion will be tracked by `wordCount` and `wordsWritten` to intuitively handle both active and passive writing.
