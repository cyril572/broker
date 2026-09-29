import { useState } from 'react'
import {
	Activity,
	ArrowDownRight,
	ArrowRight,
	ArrowUpRight,
	Bell,
	BriefcaseBusiness,
	ChevronDown,
	ChevronRight,
	CircleHelp,
	Command,
	FileText,
	LayoutDashboard,
	Menu,
	MessageCircle,
	Plus,
	Search,
	Send,
	Settings2,
	ShieldCheck,
	Sparkles,
	Star,
	WalletCards,
	X,
} from 'lucide-react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'

const chartData = {
	'1D': [
		{ label: '9:30', value: 270700 }, { label: '10:30', value: 272250 },
		{ label: '11:30', value: 271640 }, { label: '12:30', value: 275120 },
		{ label: '1:30', value: 273840 }, { label: '2:30', value: 278930 },
		{ label: '3:30', value: 281200 }, { label: '4:00', value: 284592 },
	],
	'1W': [
		{ label: 'Mon', value: 268200 }, { label: 'Tue', value: 272860 },
		{ label: 'Wed', value: 271440 }, { label: 'Thu', value: 277930 },
		{ label: 'Fri', value: 274610 }, { label: 'Mon', value: 280120 },
		{ label: 'Tue', value: 284592 },
	],
	'1M': [
		{ label: 'Sep 1', value: 260100 }, { label: 'Sep 5', value: 265700 },
		{ label: 'Sep 9', value: 263200 }, { label: 'Sep 13', value: 271400 },
		{ label: 'Sep 17', value: 268300 }, { label: 'Sep 21', value: 277900 },
		{ label: 'Sep 25', value: 275200 }, { label: 'Sep 29', value: 284592 },
	],
	'3M': [
		{ label: 'Jul', value: 239100 }, { label: 'Jul 15', value: 246200 },
		{ label: 'Aug', value: 243500 }, { label: 'Aug 15', value: 256700 },
		{ label: 'Sep', value: 260800 }, { label: 'Sep 15', value: 270400 },
		{ label: 'Sep 29', value: 284592 },
	],
	'1Y': [
		{ label: 'Oct', value: 203400 }, { label: 'Dec', value: 215700 },
		{ label: 'Feb', value: 224900 }, { label: 'Apr', value: 231100 },
		{ label: 'Jun', value: 246200 }, { label: 'Aug', value: 263300 },
		{ label: 'Sep', value: 284592 },
	],
	ALL: [
		{ label: '2021', value: 102400 }, { label: '2022', value: 128600 },
		{ label: '2023', value: 161100 }, { label: '2024', value: 196400 },
		{ label: '2025', value: 237500 }, { label: '2026', value: 284592 },
	],
}

const periodStats = {
	'1D': ['+$3,482.18', '+1.24%'],
	'1W': ['+$6,128.42', '+2.20%'],
	'1M': ['+$10,314.80', '+3.76%'],
	'3M': ['+$28,692.18', '+11.22%'],
	'1Y': ['+$70,442.65', '+32.92%'],
	ALL: ['+$182,192.65', '+178.44%'],
}

const holdings = [
	{ symbol: 'NVDA', name: 'NVIDIA Corporation', shares: '120 shares', price: '$142.87', value: '$17,144.40', change: '+3.42%', positive: true, color: '#76b900' },
	{ symbol: 'AAPL', name: 'Apple Inc.', shares: '85 shares', price: '$255.45', value: '$21,713.25', change: '+1.18%', positive: true, color: '#848c98' },
	{ symbol: 'MSFT', name: 'Microsoft Corporation', shares: '42 shares', price: '$512.30', value: '$21,516.60', change: '+0.86%', positive: true, color: '#36a4da' },
	{ symbol: 'TSLA', name: 'Tesla, Inc.', shares: '28 shares', price: '$444.72', value: '$12,452.16', change: '-1.24%', positive: false, color: '#e45c4a' },
]

const initialWatchlist = [
	{ symbol: 'NVDA', name: 'NVIDIA', price: '$142.87', change: '+3.42%', positive: true, line: '2,24 13,18 23,21 33,11 43,15 53,7 64,11 74,3' },
	{ symbol: 'AAPL', name: 'Apple', price: '$255.45', change: '+1.18%', positive: true, line: '2,19 13,24 23,17 33,21 43,10 53,13 64,5 74,8' },
	{ symbol: 'MSFT', name: 'Microsoft', price: '$512.30', change: '+0.86%', positive: true, line: '2,23 13,17 23,20 33,13 43,17 53,8 64,12 74,5' },
	{ symbol: 'TSLA', name: 'Tesla', price: '$444.72', change: '-1.24%', positive: false, line: '2,7 13,11 23,6 33,18 43,12 53,22 64,16 74,24' },
]

const allocation = [
	{ name: 'Stocks', value: 62, amount: '$176,447', color: '#16765c' },
	{ name: 'ETFs', value: 24, amount: '$68,302', color: '#8fb9a9' },
	{ name: 'Cash', value: 14, amount: '$39,843', color: '#d9a759' },
]

const activity = [
	{ title: 'Dividend received', detail: 'SCHD · Schwab US Dividend Equity ETF', date: 'Today, 10:42 AM', amount: '+$84.26', positive: true, initials: 'S', color: 'mint' },
	{ title: 'Buy order filled', detail: 'NVDA · 8 shares at $139.20', date: 'Yesterday, 2:18 PM', amount: '-$1,113.60', positive: false, initials: 'N', color: 'lime' },
	{ title: 'Recurring investment', detail: 'VTI · Vanguard Total Market ETF', date: 'Sep 26, 9:30 AM', amount: '-$500.00', positive: false, initials: 'V', color: 'blue' },
]

const navItems = [
	{ label: 'Overview', icon: LayoutDashboard, target: 'top' },
	{ label: 'Portfolio', icon: BriefcaseBusiness, target: 'holdings' },
	{ label: 'Watchlist', icon: Star, target: 'watchlist' },
	{ label: 'Activity', icon: Activity, target: 'activity' },
]

function Sparkline({ line, positive }) {
	return (
		<svg className="sparkline" viewBox="0 0 76 28" role="img" aria-label={positive ? 'Trending up' : 'Trending down'}>
			<polyline points={line} fill="none" stroke={positive ? '#208267' : '#d8665b'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function ChartTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null
	return (
		<div className="chart-tooltip">
			<span>{label}</span>
			<strong>${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
		</div>
	)
}

function App() {
	const [period, setPeriod] = useState('1M')
	const [activeNav, setActiveNav] = useState('Overview')
	const [tradeSide, setTradeSide] = useState(null)
	const [tradeTicker, setTradeTicker] = useState('NVDA')
	const [quantity, setQuantity] = useState('10')
	const [tradeComplete, setTradeComplete] = useState(false)
	const [watchlist, setWatchlist] = useState(initialWatchlist)
	const [selectedTicker, setSelectedTicker] = useState('NVDA')
	const [searchTerm, setSearchTerm] = useState('')
	const [notificationsOpen, setNotificationsOpen] = useState(false)
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [toast, setToast] = useState('')
	const [chatOpen, setChatOpen] = useState(false)
	const [chatDraft, setChatDraft] = useState('')
	const [chatMessages, setChatMessages] = useState([
		{ id: 1, from: 'support', time: 'Now', text: 'Hi Alex. What can we help you with today?' },
	])

	const quote = watchlist.find((item) => item.symbol === tradeTicker) ?? initialWatchlist[0]
	const tradePrice = Number(quote.price.replace(/[$,]/g, ''))
	const orderTotal = (tradePrice * (Number(quantity) || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
	const filteredWatchlist = watchlist.filter((item) => `${item.symbol} ${item.name}`.toLowerCase().includes(searchTerm.toLowerCase()))
	const selectedQuote = watchlist.find((item) => item.symbol === selectedTicker) ?? watchlist[0]

	function navigate(item) {
		setActiveNav(item.label)
		setSidebarOpen(false)
		const target = item.target === 'top' ? document.body : document.getElementById(item.target)
		target?.scrollIntoView({ behavior: 'smooth', block: item.target === 'top' ? 'start' : 'center' })
	}

	function showToast(message) {
		setToast(message)
		window.setTimeout(() => setToast(''), 3000)
	}

	function toggleWatch(symbol) {
		const item = initialWatchlist.find((stock) => stock.symbol === symbol)
		if (!item) return
		const alreadyAdded = watchlist.some((stock) => stock.symbol === symbol)
		setWatchlist(alreadyAdded ? watchlist.filter((stock) => stock.symbol !== symbol) : [...watchlist, item])
		if (alreadyAdded) setSelectedTicker(watchlist.find((stock) => stock.symbol !== symbol)?.symbol ?? 'AAPL')
		else setSelectedTicker(symbol)
		showToast(alreadyAdded ? `${symbol} removed from your watchlist` : `${symbol} added to your watchlist`)
	}

	function submitTrade(event) {
		event.preventDefault()
		if (Number(quantity) <= 0) return
		setTradeComplete(true)
		showToast(`${tradeSide === 'buy' ? 'Buy' : 'Sell'} order preview ready for ${quantity} ${tradeTicker} shares`)
	}

	function sendChatMessage(event) {
		event.preventDefault()
		const message = chatDraft.trim()
		if (!message) return

		const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
		setChatMessages((current) => [...current, { id: Date.now(), from: 'you', time, text: message }])
		setChatDraft('')
		window.setTimeout(() => {
			setChatMessages((current) => [...current, {
				id: Date.now(),
				from: 'support',
				time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
				text: 'Thanks for reaching out. This chat preview is not connected to a live support team yet, so no agent can see your message.',
			}])
		}, 650)
	}

	const activeChange = periodStats[period]

	return (
		<div className="app-shell">
			<aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
				<a className="brand" href="#top" onClick={() => navigate(navItems[0])} aria-label="Northstar home">
					<span className="brand-mark"><Sparkles size={17} strokeWidth={2} /></span>
					<span className="brand-name">northstar<span>.</span></span>
				</a>

				<div className="account-switcher">
					<div className="account-monogram">N</div>
					<div className="account-copy"><span>PERSONAL ACCOUNT</span><strong>Premium</strong></div>
					<ChevronDown size={15} className="account-chevron" />
				</div>

				<span className="sidebar-label">WORKSPACE</span>
				<nav className="primary-nav" aria-label="Main navigation">
					{navItems.map((item) => {
						const Icon = item.icon
						return (
							<button key={item.label} className={`nav-item ${activeNav === item.label ? 'nav-item--active' : ''}`} onClick={() => navigate(item)}>
								<Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>
								{item.label === 'Activity' && <span className="nav-dot" />}
							</button>
						)
					})}
					<button className="nav-item" onClick={() => showToast('Your latest statements are ready in Documents.')}>
						<FileText size={17} strokeWidth={1.8} /><span>Documents</span>
					</button>
				</nav>

				<div className="sidebar-market">
					<div className="market-status"><span className="live-dot" />MARKETS OPEN</div>
					<div className="market-index">S&amp;P 500</div>
					<div className="market-index-value">5,842.47 <span>+0.62%</span></div>
					<div className="market-mini-chart" aria-label="S&P 500 rising today"><svg viewBox="0 0 196 43" preserveAspectRatio="none"><path d="M0 34 C13 31 17 17 31 21 S49 38 62 25 S81 16 93 21 S110 12 124 18 S142 27 151 15 S170 20 180 7 S192 11 196 2" /></svg></div>
					<div className="market-index market-index--nasdaq">NASDAQ</div>
					<div className="market-index-value">18,152.76 <span>+0.91%</span></div>
				</div>

				<div className="sidebar-bottom">
					<button className="sidebar-tool" onClick={() => showToast('Help center is ready when you need it.')}><CircleHelp size={17} /><span>Help &amp; support</span></button>
					<button className="sidebar-tool" onClick={() => showToast('Your account settings are up to date.')}><Settings2 size={17} /><span>Settings</span></button>
					<button className="profile-switch" onClick={() => showToast('Signed in as Alex Morgan.') }>
						<span className="profile-avatar">AM</span><span className="profile-details"><strong>Alex Morgan</strong><small>Individual investor</small></span><ChevronDown size={14} />
					</button>
				</div>
			</aside>

			{sidebarOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}

			<div className="main-column" id="top">
				<header className="topbar">
					<button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
					<div className="breadcrumb"><span>My workspace</span><ChevronRight size={14} /><strong>{activeNav}</strong></div>
					<div className="topbar-actions">
						<label className="global-search"><Search size={16} /><input aria-label="Search investments" placeholder="Search anything" onChange={(event) => setSearchTerm(event.target.value)} onFocus={() => navigate(navItems[2])} /><kbd><Command size={11} /> K</kbd></label>
						<span className="topbar-divider" />
						<div className="notification-wrap">
							<button className={`icon-button notification-button ${notificationsOpen ? 'icon-button--active' : ''}`} aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={18} /><span className="notification-dot" /></button>
							{notificationsOpen && <div className="notification-popover"><div className="popover-heading"><strong>Notifications</strong><span>2 new</span></div><p><span className="notice-icon notice-icon--green"><ArrowUpRight size={15} /></span><span><strong>NVDA is up 3.42%</strong><small>Your watchlist moved today</small></span></p><p><span className="notice-icon notice-icon--gold"><WalletCards size={15} /></span><span><strong>Monthly statement ready</strong><small>September statement · 2 min ago</small></span></p></div>}
						</div>
						<button className="topbar-avatar" aria-label="Account Alex Morgan" onClick={() => showToast('Your account is in good standing.')}>AM</button>
					</div>
				</header>

				<main className="dashboard-content">
					<section className="welcome-row">
						<div><div className="eyebrow"><span className="live-dot" />TUESDAY, SEPTEMBER 29, 2026</div><h1>Good morning, Alex <span>✳</span></h1><p>Here’s what’s happening with your portfolio today.</p></div>
						<div className="welcome-actions"><button className="button button--quiet" onClick={() => showToast('Your account is protected with two-factor authentication.')}><ShieldCheck size={15} /> Account protected</button><button className="button button--primary" onClick={() => { setTradeSide('buy'); setTradeComplete(false) }}><Plus size={17} /> New trade</button></div>
					</section>

					<section className="metrics-row" aria-label="Account summary">
						<article className="metric-card metric-card--value"><div className="metric-label">TOTAL PORTFOLIO VALUE <button className="help-dot" aria-label="Portfolio value includes all investments and cash">i</button></div><div className="metric-value">$284,592<span>.34</span></div><div className="metric-foot"><span className="change-pill"><ArrowUpRight size={13} />4.73%</span><span>+$12,840.18 all time</span></div></article>
						<article className="metric-card"><div className="metric-label">INVESTED</div><div className="metric-value metric-value--small">$241,790<span>.12</span></div><div className="metric-foot"><span className="metric-foot-copy">85% of portfolio</span><span className="metric-track"><i style={{ width: '85%' }} /></span></div></article>
						<article className="metric-card"><div className="metric-label">CASH BALANCE</div><div className="metric-value metric-value--small">$42,802<span>.22</span></div><div className="metric-foot"><span className="cash-indicator"><span />Ready to invest</span></div></article>
						<article className="metric-card"><div className="metric-label">BUYING POWER</div><div className="metric-value metric-value--small">$128,406<span>.66</span></div><div className="metric-foot"><span className="metric-foot-copy">Available to trade</span></div></article>
					</section>

					<section className="primary-grid">
						<article className="panel portfolio-panel">
							<div className="panel-header portfolio-header"><div><div className="section-kicker">YOUR PORTFOLIO <span className="secure-mark"><ShieldCheck size={12} /> SECURE</span></div><div className="chart-value">$284,592.34</div><div className="chart-change"><span>{activeChange[0]}</span><span>{activeChange[1]}</span><span className="change-period">past {period === 'ALL' ? 'all time' : period}</span></div></div><button className="icon-button panel-more" aria-label="Portfolio chart options" onClick={() => showToast('Portfolio chart options')}><span>···</span></button></div>
							<div className="chart-toolbar"><div className="chart-periods" role="group" aria-label="Chart time period">{Object.keys(chartData).map((item) => <button key={item} className={period === item ? 'period-button period-button--active' : 'period-button'} onClick={() => setPeriod(item)}>{item}</button>)}</div><button className="chart-menu" onClick={() => showToast('Showing your full portfolio performance.')}><span className="chart-menu-dot" />Portfolio <ChevronDown size={13} /></button></div>
							<div className="portfolio-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData[period]} margin={{ top: 12, right: 3, left: 0, bottom: 0 }}><defs><linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2e9075" stopOpacity={0.17} /><stop offset="100%" stopColor="#2e9075" stopOpacity={0.005} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef0ed" strokeDasharray="2 6" /><Tooltip content={<ChartTooltip />} cursor={{ stroke: '#bbcec6', strokeDasharray: '3 4' }} /><Area type="monotone" dataKey="value" stroke="#19795e" strokeWidth={2.4} fill="url(#portfolioFill)" activeDot={{ r: 4, fill: '#19795e', stroke: '#fff', strokeWidth: 3 }} /></AreaChart></ResponsiveContainer></div>
							<div className="chart-axis"><span>{chartData[period][0].label}</span><span>{chartData[period][Math.floor(chartData[period].length / 2)].label}</span><span>{chartData[period][chartData[period].length - 1].label}</span></div>
							<div className="chart-caption"><span><i />Portfolio value</span><span>Data delayed by 15 min <CircleHelp size={12} /></span></div>
						</article>

						<aside className="right-rail">
							<article className="panel market-panel"><div className="panel-title-row"><div><div className="section-kicker">MARKET SNAPSHOT</div><h2>Market pulse</h2></div><span className="market-open-badge"><span className="live-dot" />LIVE</span></div><div className="index-list"><div className="index-row"><div><span className="index-symbol">S&amp;P</span><span className="index-name">S&amp;P 500</span></div><div className="index-data"><strong>5,842.47</strong><span className="index-positive">+0.62%</span></div><Sparkline positive line="2,18 13,15 23,19 33,10 43,14 53,8 64,10 74,3" /></div><div className="index-row"><div><span className="index-symbol index-symbol--blue">N</span><span className="index-name">NASDAQ</span></div><div className="index-data"><strong>18,152.76</strong><span className="index-positive">+0.91%</span></div><Sparkline positive line="2,21 13,15 23,18 33,11 43,14 53,7 64,12 74,4" /></div><div className="index-row"><div><span className="index-symbol index-symbol--gold">D</span><span className="index-name">DOW JONES</span></div><div className="index-data"><strong>42,208.31</strong><span className="index-negative">−0.14%</span></div><Sparkline positive={false} line="2,5 13,9 23,7 33,18 43,12 53,22 64,17 74,23" /></div></div><button className="panel-link" onClick={() => showToast('Market overview is up to date.')}>See full market overview <ArrowRight size={14} /></button></article>

							<article className="panel allocation-panel"><div className="panel-title-row"><div><div className="section-kicker">AT A GLANCE</div><h2>Asset allocation</h2></div><button className="text-icon-button" aria-label="Asset allocation details" onClick={() => showToast('Your portfolio is diversified across three asset classes.')}><ArrowUpRight size={16} /></button></div><div className="allocation-content"><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={allocation} dataKey="value" nameKey="name" innerRadius="72%" outerRadius="96%" paddingAngle={3} stroke="none">{allocation.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie></PieChart></ResponsiveContainer><div className="donut-center"><strong>3</strong><span>ASSETS</span></div></div><div className="allocation-legend">{allocation.map((item) => <div className="allocation-line" key={item.name}><span className="allocation-name"><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}%</strong></div>)}</div></div></article>
						</aside>
					</section>

					<section className="secondary-grid">
						<article className="panel holdings-panel" id="holdings"><div className="panel-title-row holdings-heading"><div><div className="section-kicker">YOUR INVESTMENTS</div><h2>Top holdings</h2></div><button className="panel-link panel-link--button" onClick={() => showToast('Showing all 12 positions in your portfolio.')}>View all <ArrowRight size={14} /></button></div><div className="holdings-table-wrap"><table className="holdings-table"><thead><tr><th>ASSET</th><th>PRICE</th><th>MARKET VALUE</th><th>TODAY</th><th aria-label="Trade actions" /></tr></thead><tbody>{holdings.map((item) => <tr key={item.symbol}><td><div className="asset-cell"><span className="asset-monogram" style={{ '--asset-color': item.color }}>{item.symbol.slice(0, 1)}</span><span><strong>{item.symbol}</strong><small>{item.name}</small></span></div></td><td className="table-price">{item.price}<small>{item.shares}</small></td><td className="table-value">{item.value}</td><td><span className={`table-change ${item.positive ? 'positive' : 'negative'}`}>{item.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{item.change}</span></td><td><button className="row-action" aria-label={`Trade ${item.symbol}`} onClick={() => { setTradeTicker(item.symbol); setTradeSide('buy'); setTradeComplete(false) }}><ArrowUpRight size={15} /></button></td></tr>)}</tbody></table></div><button className="mobile-view-all" onClick={() => showToast('Showing all 12 positions in your portfolio.')}>View all holdings <ArrowRight size={14} /></button></article>

						<article className="panel watchlist-panel" id="watchlist"><div className="panel-title-row watchlist-heading"><div><div className="section-kicker">KEEP AN EYE ON</div><h2>Watchlist</h2></div><button className="text-icon-button" aria-label="Add a watchlist item" onClick={() => toggleWatch('TSLA')}><Plus size={17} /></button></div><div className="watchlist-selected"><div><span className="selected-label">SELECTED</span><strong>{selectedQuote.symbol}</strong></div><div className="selected-price"><strong>{selectedQuote.price}</strong><span className={selectedQuote.positive ? 'index-positive' : 'index-negative'}>{selectedQuote.change} today</span></div></div><div className="watchlist-rows">{filteredWatchlist.map((item) => <button className={`watch-row ${selectedTicker === item.symbol ? 'watch-row--selected' : ''}`} key={item.symbol} onClick={() => setSelectedTicker(item.symbol)}><span className="watch-monogram">{item.symbol.slice(0, 1)}</span><span className="watch-name"><strong>{item.symbol}</strong><small>{item.name}</small></span><Sparkline line={item.line} positive={item.positive} /><span className="watch-price"><strong>{item.price}</strong><small className={item.positive ? 'index-positive' : 'index-negative'}>{item.change}</small></span></button>)}</div><button className="panel-link watchlist-link" onClick={() => showToast('Your watchlist is up to date.')}>Manage watchlist <ArrowRight size={14} /></button></article>
					</section>

					<section className="panel activity-panel" id="activity"><div className="panel-title-row activity-heading"><div><div className="section-kicker">RECENT TRANSACTIONS</div><h2>Activity</h2></div><button className="panel-link panel-link--button" onClick={() => showToast('Showing your complete transaction history.')}>All activity <ArrowRight size={14} /></button></div><div className="activity-list">{activity.map((item) => <div className="activity-row" key={item.title}><span className={`activity-icon activity-icon--${item.color}`}>{item.initials}</span><span className="activity-title"><strong>{item.title}</strong><small>{item.detail}</small></span><span className="activity-date">{item.date}</span><span className={`activity-amount ${item.positive ? 'positive' : ''}`}>{item.amount}</span><ChevronRight className="activity-chevron" size={15} /></div>)}</div></section>

					<footer className="dashboard-footer"><span>Northstar Brokerage · Member FINRA / SIPC</span><span>Demo account · Market data delayed by 15 min</span><button onClick={() => showToast('Last synced just now.')}>Last synced just now</button></footer>
				</main>
			</div>

			{tradeSide && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setTradeSide(null) }}><section className="trade-modal" role="dialog" aria-modal="true" aria-labelledby="trade-title"><div className="modal-header"><div><div className="section-kicker">NORTHSTAR TRADING</div><h2 id="trade-title">{tradeComplete ? 'Order preview' : `${tradeSide === 'buy' ? 'Buy' : 'Sell'} stocks`}</h2></div><button className="icon-button" aria-label="Close trade" onClick={() => setTradeSide(null)}><X size={18} /></button></div>{tradeComplete ? <div className="order-confirmation"><span className="confirmation-icon"><ShieldCheck size={22} /></span><h3>Your order is ready</h3><p>{tradeSide === 'buy' ? 'Buy' : 'Sell'} {quantity} shares of {tradeTicker} at the current market price.</p><div className="order-summary"><span>Estimated total</span><strong>${orderTotal}</strong></div><div className="demo-notice">Demo preview only. No order has been sent to a brokerage.</div><button className="button button--primary modal-submit" onClick={() => { setTradeSide(null); showToast('Order preview closed. No trade was placed.') }}>Done</button></div> : <form onSubmit={submitTrade}><div className="trade-tabs"><button type="button" className={tradeSide === 'buy' ? 'trade-tab trade-tab--active' : 'trade-tab'} onClick={() => setTradeSide('buy')}>Buy</button><button type="button" className={tradeSide === 'sell' ? 'trade-tab trade-tab--active trade-tab--sell' : 'trade-tab'} onClick={() => setTradeSide('sell')}>Sell</button></div><label className="form-label" htmlFor="ticker">Stock</label><select id="ticker" value={tradeTicker} onChange={(event) => setTradeTicker(event.target.value)}>{initialWatchlist.map((item) => <option key={item.symbol} value={item.symbol}>{item.symbol} · {item.name}</option>)}</select><label className="form-label" htmlFor="quantity">Number of shares</label><input id="quantity" type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} required /><div className="order-summary"><span>Market price</span><strong>${tradePrice.toFixed(2)}</strong></div><div className="order-summary order-summary--total"><span>Estimated total</span><strong>${orderTotal}</strong></div><div className="demo-notice">Preview only. This demo does not place real trades.</div><button className="button button--primary modal-submit" type="submit">Review {tradeSide} order <ArrowRight size={16} /></button></form>}</section></div>}

			{chatOpen ? (
				<section className="support-chat-panel" role="dialog" aria-label="Northstar support chat">
					<header className="support-chat-header">
						<span className="support-chat-avatar"><MessageCircle size={18} /></span>
						<div className="support-chat-title"><strong>Northstar support</strong><span><i />Demo chat · not connected</span></div>
						<button className="support-chat-close" aria-label="Close support chat" onClick={() => setChatOpen(false)}><X size={17} /></button>
					</header>
					<div className="support-chat-messages" aria-live="polite">
						<div className="chat-day-divider"><span>TODAY</span></div>
						{chatMessages.map((message) => <div className={`chat-message-row ${message.from === 'you' ? 'chat-message-row--you' : ''}`} key={message.id}>
							{message.from === 'support' && <span className="chat-agent-mark"><MessageCircle size={13} /></span>}
							<div className="chat-message-content">{message.from === 'support' && <span className="chat-sender">Northstar support <time>{message.time}</time></span>}<p>{message.text}</p>{message.from === 'you' && <span className="chat-message-time">{message.time}</span>}</div>
						</div>)}
						{chatMessages.length === 1 && <div className="chat-quick-replies"><span>QUICK TOPICS</span><div><button type="button" onClick={() => setChatDraft('I have a question about transfers.')}>Transfers</button><button type="button" onClick={() => setChatDraft('I have a question about trading.')}>Trading</button><button type="button" onClick={() => setChatDraft('I need help with my account.')}>Account help</button></div></div>}
					</div>
					<div className="chat-demo-note"><ShieldCheck size={13} /><span>This local preview is not monitored by a support agent.</span></div>
					<form className="support-chat-composer" onSubmit={sendChatMessage}>
						<input aria-label="Write a message" placeholder="Write a message..." value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} />
						<button aria-label="Send message" type="submit" disabled={!chatDraft.trim()}><Send size={16} /></button>
					</form>
				</section>
			) : (
				<button className="support-chat-launcher" aria-label="Open support chat" aria-haspopup="dialog" aria-expanded={chatOpen} onClick={() => setChatOpen(true)}><MessageCircle size={18} /><span>Chat with us</span><i /></button>
			)}

			{toast && <div className="toast-message" role="status"><span className="toast-check"><ShieldCheck size={15} /></span>{toast}<button aria-label="Dismiss message" onClick={() => setToast('')}><X size={14} /></button></div>}
		</div>
	)
}

export default App
