# RecallLoop interface system

## Product surface

RecallLoop uses an independent incident command cockpit with fixed operational rail, distribution map, closure inspector, and lot ledger. Its primary interaction is to trace a recalled lot through destinations and closure actions.

## Design DNA

- Product: Product recall containment operations
- Navigation: command, lots, actions, closures
- Visual engine: D3 flow lanes
- Asset system: prepared safety and logistics icons, using prepared Font Awesome assets
- Typography: condensed industrial plus neutral sans
- Palette: #f4f2ec, #171a1f, #e23b2f, #ffd84a

## Differentiation rule

This interface does not reuse the shared headline, side visual, three metrics, record cards, and four-detail-panel skeleton from the first pass. Layout, navigation placement, information density, responsive behavior, and interaction hierarchy are specific to this product.

The client reads real deployed state from GenLayer Studionet. Loading and error states do not replace unavailable contract data with sample records.
