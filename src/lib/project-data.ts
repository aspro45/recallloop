import deployment from '../../deployment.json';

export const project = {
  id: "54-recallloop",
  name: "RecallLoop",
  product: "Product recall containment operations",
  audience: "manufacturer recall teams and public safety reviewers",
  pain: "prove that every affected lot and destination received, executed, and closed a recall action",
  kicker: "Containment command",
  headline: "Close every path an affected lot could take.",
  intro: "Trace affected lots through distribution destinations, attach public notices, and settle closure objections against one Studionet record.",
  metric: "containment coverage",
  action: "Open recall",
  icon: "fa-arrows-rotate",
  primaryKind: "recall",
  primaryTitle: "Affected product",
  extraLabel: "Recall authority",
  createMethod: "open_recall",
  childA: "lot",
  childB: "destination",
  routes: ["command","lots","actions","closures"],
  statuses: ["ACTIVE","ASSESSING","ASSESSED","OBJECTION_WINDOW","APPEALED","CLOSED","ARCHIVED"],
  outcomes: ["pending","contained","uncontained","indeterminate"],
  sourceUrl: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts",
  sourceLabel: "FDA recall and safety alert guidance",
  layout: "operations-wall",
  palette: ["#f4f2ec","#171a1f","#e23b2f","#ffd84a"],
} as const;

export const contractState = {
  network: 'GenLayer Studionet',
  chainId: deployment.chainId,
  status: 'deployed',
  address: deployment.contractAddress,
  deployTxHash: deployment.deployTxHash,
  explorerUrl: deployment.contractExplorer,
};
