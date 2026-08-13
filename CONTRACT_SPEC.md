# RecallLoop contract specification

Contract: [0x4f8fBEF918b97c58Ea95a82AB3d79F376169Dfe1](https://explorer-studio.genlayer.com/address/0x4f8fBEF918b97c58Ea95a82AB3d79F376169Dfe1)

## Domain records

- Primary record: `recall`
- Child record A: `lot` through `add_affected_lot`
- Child record B: `destination` through `add_distribution_destination`
- Review method: `assess_containment_with_genlayer`
- States: `ACTIVE`, `ASSESSING`, `ASSESSED`, `OBJECTION_WINDOW`, `APPEALED`, `CLOSED`, `ARCHIVED`
- Outcomes: `pending`, `contained`, `uncontained`, `indeterminate`

Evidence and domain records require the primary record operator. Protocol changes require the contract owner. Validator review ignores instructions embedded in rendered source content. Pending challenges or appeals block finalization, and granted rulings can revise the stored outcome and confidence before settlement.
