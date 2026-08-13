# RecallLoop

Close every path an affected lot could take.

RecallLoop is a GenLayer Studionet application for product recall containment operations. It gives manufacturer recall teams and public safety reviewers a concrete workflow to prove that every affected lot and destination received, executed, and closed a recall action. The client reads its register from the deployed intelligent contract; it does not ship sample records or substitute static outcomes when a contract read fails.

## Live architecture

| Layer | Implementation |
| --- | --- |
| Network | GenLayer Studionet, chain `61999` |
| Contract | [`0x4f8fBEF918b97c58Ea95a82AB3d79F376169Dfe1`](https://explorer-studio.genlayer.com/address/0x4f8fBEF918b97c58Ea95a82AB3d79F376169Dfe1) |
| Reasoning | `gl.nondet.web.render`, `gl.nondet.exec_prompt`, comparative validator consensus |
| Settlement | operator permissions, challenges, appeals, blocked finalization, audit log, reputation |
| Wallet UX | RainbowKit + wagmi on Studionet |
| Interface | operations wall, D3 flow lanes, Font Awesome prepared icon assets |

## Product workflow

1. Create a recall with a public primary source.
2. Attach lot and destination records.
3. Lock the evidence set and invoke GenLayer web reasoning.
4. Open the review window, then resolve challenges and appeals.
5. Finalize only when no filing remains pending.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Connect an EVM browser wallet through RainbowKit and switch to GenLayer Studionet when prompted.

## Verification

```bash
npm run typecheck
npm run build
npm test
npm run test:studionet
```

See [CONTRACT_SPEC.md](./CONTRACT_SPEC.md), [DESIGN.md](./DESIGN.md), [SECURITY.md](./SECURITY.md), and [public/assets/ASSET_SOURCES.md](./public/assets/ASSET_SOURCES.md).
