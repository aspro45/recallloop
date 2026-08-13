import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { openOnchainAction, useOnchain } from '../lib/onchain';
import { contractState, project } from '../lib/project-data';
import { ProductVisual } from './ProductVisual';

const human = (value: string) => value.replaceAll('_', ' ').toLowerCase();
const short = (value: string) => value ? value.slice(0, 7) + '...' + value.slice(-5) : 'not available';
const routeHref = (route: string) => route === project.routes[0] ? '/' : '/' + route;
const icons = ["fa-tower-broadcast","fa-boxes-stacked","fa-route","fa-circle-check"];

export function AppFrame({ view = "command" }: { view?: string }) {
  const { snapshot, refreshing, refresh } = useOnchain();
  const active = snapshot.cases[0];
  const details = active ? snapshot.details[active.id] : undefined;
  const evidence = details?.evidence.length || 0;
  const reviews = details?.reviews.length || 0;
  const challenges = details?.challenges.length || 0;
  const appeals = details?.appeals.length || 0;
  const disputes = challenges + appeals;
  const confidence = Math.round((active?.confidenceBps || 0) / 100);
  const pending = (details?.challenges.filter(item => item.ruling === 'pending').length || 0)
    + (details?.appeals.filter(item => item.ruling === 'pending').length || 0);
  const records = snapshot.cases;
  const viewLabel = human(view);
  
  return <div className="recall-app">
    <Head><title>{project.name} | Containment command</title><meta name="description" content={project.intro} /><link rel="icon" href="data:," /></Head>
    <header className="recall-top">
      <Link href="/" className="recall-brand"><span><i className="fa-solid fa-arrows-rotate" /></span>{project.name}</Link>
      <div className="incident-belt"><b>RC-2026-001</b><span>Public safety recall</span><em>{human(active?.status || 'active')}</em></div>
      <div className="recall-wallet"><ConnectButton chainStatus="icon" showBalance={false} accountStatus="address" /></div>
    </header>
    <aside className="recall-rail">
      <nav>{project.routes.map((route, index) => <Link title={human(route)} className={route === view ? 'active' : ''} href={routeHref(route)} key={route}><i className={'fa-solid ' + icons[index]} /><span>{human(route)}</span></Link>)}</nav>
      <button title="Open a new recall" onClick={() => openOnchainAction('create')}><i className="fa-solid fa-plus" /></button>
    </aside>
    <main className="recall-workspace">
      <section className="recall-command">
        <div><span>Containment command / {viewLabel}</span><h1>{active?.title || 'No active recall'}</h1><p>{active?.summary || active?.claim || project.intro}</p></div>
        <dl><div><dt>Coverage</dt><dd>{confidence}%</dd></div><div><dt>Evidence</dt><dd>{evidence}</dd></div><div><dt>Open objections</dt><dd>{pending}</dd></div></dl>
        <button title="Refresh live contract" onClick={() => void refresh()} disabled={refreshing}><i className={'fa-solid fa-rotate' + (refreshing ? ' fa-spin' : '')} /></button>
      </section>
      <section className="recall-board">
        <article className="containment-map"><header><span>Distribution containment map</span><b>LIVE / STUDIONET</b></header><ProductVisual evidence={evidence} reviews={reviews} disputes={disputes} confidence={confidence} /></article>
        <aside className="closure-inspector">
          <header><small>Closure authority</small><b>{human(active?.outcome || 'pending')}</b></header>
          <div className="closure-score"><strong>{confidence}</strong><span>containment<br />confidence</span></div>
          <ol><li className={evidence > 0 ? 'done' : ''}>Authority notice linked</li><li className={evidence > 1 ? 'done' : ''}>Lot trail evidenced</li><li className={reviews > 0 ? 'done' : ''}>Validator review recorded</li><li className={pending === 0 ? 'done' : ''}>Objections resolved</li></ol>
          <button onClick={() => openOnchainAction('lifecycle', active?.id)}>Manage closure <i className="fa-solid fa-arrow-right" /></button>
          <a href={contractState.explorerUrl} target="_blank" rel="noreferrer"><i className="fa-solid fa-link" /> {short(contractState.address)}</a>
        </aside>
      </section>
      <section className="lot-ledger">
        <header><div><small>{viewLabel}</small><h2>Affected lot ledger</h2></div><button onClick={() => openOnchainAction('create')}><i className="fa-solid fa-plus" /> Open recall</button></header>
        <div className="lot-table"><div className="lot-head"><span>Record</span><span>Source</span><span>Evidence</span><span>Disputes</span><span>Decision</span><span /></div>{records.map(record => <article key={record.id}><b>RC-{record.id.padStart(3, '0')}</b><a href={record.sourceUrl} target="_blank" rel="noreferrer">{record.title}</a><span>{record.evidenceCount}</span><span>{record.challengeCount + record.appealCount}</span><em>{human(record.outcome)}</em><button title="Manage recall" onClick={() => openOnchainAction('lifecycle', record.id)}><i className="fa-solid fa-arrow-right" /></button></article>)}</div>
      </section>
    </main>
  </div>;
  
}
