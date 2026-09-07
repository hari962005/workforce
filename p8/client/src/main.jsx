import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { LayoutDashboard, Users, ClipboardCheck, Settings2, UserRound, CalendarDays, Files, Network, Clock3, FileText, FolderKanban, GraduationCap, UserCheck, MessageSquare, LogOut, Bell, Search, Menu, X, CheckCircle2, AlertCircle, BriefcaseBusiness, ChevronRight, Plus, Download, Eye, ShieldCheck, TrendingUp, CircleUserRound, Upload, Send, TimerReset, BarChart3, ChevronLeft, Save, Edit3, Paperclip, UserPlus, RefreshCw, Trash2, KeyRound, Building2, History, LockKeyhole, ExternalLink } from 'lucide-react';

import logo from './assets/logo.png';
import load from './assets/load.png';
import './styles.css';

const API = 'http://localhost:5000/api'; 
const api = axios.create({ baseURL: API });
const FILE_BASE = 'http://localhost:5000';
api.interceptors.request.use(config => {
  try {
    const s = JSON.parse(localStorage.getItem('bh_session') || 'null');
    if (s?.token) config.headers.Authorization = `Bearer ${s.token}`;
  } catch {}
  return config;
});
api.interceptors.response.use(r => r, err => {
  if (err.response?.status === 401) {
    localStorage.removeItem('bh_session');
    window.location.href = '/login';
  }
  return Promise.reject(err);
});

const roles = {
  admin: { label: 'Admin / HR', path: '/admin' },
  director: { label: 'Director', path: '/director' },
  employee: { label: 'Employee', path: '/employee' },
  intern: { label: 'Student / Intern', path: '/intern' }
};

const nav = {
  admin: [['Dashboard','/admin',LayoutDashboard],['Intern Directory','/admin/interns',Users],['Approvals & Review','/admin/approvals',ClipboardCheck],['Operations','/admin/operations',Settings2],['Leave Management','/admin/leaves',CalendarDays],['Employees','/admin/employees',UserRound],['Schedules','/admin/schedules',CalendarDays],['Documents','/admin/documents',Files],['Manage Teams','/admin/teams',Network],['Projects','/admin/projects',FolderKanban],['My Profile','/admin/profile',CircleUserRound]],
  employee: [['Dashboard','/employee',LayoutDashboard],['My Profile','/employee/profile',CircleUserRound],['Attendance','/employee/attendance',UserCheck],['Leave Management','/employee/leave',CalendarDays],['Timesheet','/employee/timesheet',Clock3],['Schedule','/employee/schedule',CalendarDays],['Work Submissions','/employee/submissions',FileText],['Projects','/employee/projects',FolderKanban],['Training & Skills','/employee/training',GraduationCap],['Documents & Access','/employee/documents',Files],['Teams','/employee/teams',Network],['Reach Outs','/employee/reach-outs',MessageSquare]],
  director: [['People History','/director/people',History],['Clients & Projects','/director/clients',Building2],['My Profile','/director/profile',CircleUserRound]],
  intern: [['Dashboard','/intern',LayoutDashboard],['My Profile','/intern/profile',CircleUserRound],['Attendance','/intern/attendance',UserCheck],['Leave Management','/intern/leave',CalendarDays],['Timesheet','/intern/timesheet',Clock3],['Schedule','/intern/schedule',CalendarDays],['Work Submissions','/intern/submissions',FileText],['Projects','/intern/projects',FolderKanban],['Training & Skills','/intern/training',GraduationCap],['Documents & Access','/intern/documents',Files],['Teams','/intern/teams',Network],['Reach Outs','/intern/reach-outs',MessageSquare]]
};

function useSession() {
  const [session, setSession] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem('bh_session') || 'null');
      return s?.token ? s : null;
    } catch { return null; }
  });

  const login = async (username, password) => {
    const r = await api.post('/auth/login', { username, password });
    const s = { ...r.data.user, token: r.data.token };
    localStorage.setItem('bh_session', JSON.stringify(s));
    setSession(s);
    return s;
  };

  const logout = () => {
    localStorage.removeItem('bh_session');
    setSession(null);
  };

  return { session, login, logout };
}

const Ctx = React.createContext(null);
const useCtx = () => React.useContext(Ctx);

function PureCssVfx({ isFinished }) {
  return (
    <div className={`vfx-splash-container ${isFinished ? 'fade-out' : ''}`}>
      {/* Background Energy Aura & Shockwaves */}
      <div className="vfx-energy-circle" />
      <div className="vfx-energy-ring pulse-1" />
      <div className="vfx-energy-ring pulse-2" />
      
      {/* Circuit Traces Laser Animation */}
      <svg className="vfx-circuit-overlay" viewBox="0 0 800 800">
        <defs>
          <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0051ff" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#00f7ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00f7ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central Spine Traces */}
        <line x1="400" y1="200" x2="400" y2="600" className="vfx-trace spine-line" />
        
        {/* Branching Neural Nodes */}
        <path d="M 400 350 L 320 310 L 250 310" className="vfx-trace branch-1" />
        <path d="M 400 350 L 480 310 L 550 310" className="vfx-trace branch-1" />
        <path d="M 400 400 L 300 400 L 220 450" className="vfx-trace branch-2" />
        <path d="M 400 400 L 500 400 L 580 450" className="vfx-trace branch-2" />
        <path d="M 400 450 L 330 490 L 270 490" className="vfx-trace branch-3" />
        <path d="M 400 450 L 470 490 L 530 490" className="vfx-trace branch-3" />

        {/* Glowing Circuit Terminals */}
        <circle cx="250" cy="310" r="7" className="vfx-node node-1" />
        <circle cx="550" cy="310" r="7" className="vfx-node node-1" />
        <circle cx="220" cy="450" r="8" className="vfx-node node-2" />
        <circle cx="580" cy="450" r="8" className="vfx-node node-2" />
        <circle cx="270" cy="490" r="6" className="vfx-node node-3" />
        <circle cx="530" cy="490" r="6" className="vfx-node node-3" />
      </svg>

      {/* Center Image with Light Sweep & Particle Surge */}
      <div className="vfx-logo-wrapper">
        <div className="vfx-scan-beam" />
        <img src={load} alt="Backbonehub" className="vfx-revealed-logo" />
      </div>

      {/* Subtitle & Power Brand Stinger */}
      <div className="vfx-brand-stinger">
        <span className="vfx-brand-name">BACKBONE<b>HUB</b></span>
        <span className="vfx-brand-tagline">— THE BACKBONE OF EVERY SOLUTION —</span>
      </div>
    </div>
  );
}

function App() {
  const s = useSession();
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  useEffect(() => {
    // 3-second duration for the complete VFX sequence
    const timer = setTimeout(() => {
      setIsVideoFinished(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Ctx.Provider value={s}>
      {/* 100% Native Code-driven VFX Splash */}
      <PureCssVfx isFinished={isVideoFinished} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {['admin', 'director', 'employee', 'intern'].map(r => (
          <Route key={r} path={'/' + r} element={<Protected role={r}><Shell role={r} /></Protected>}>
            <Route index element={r === 'director' ? <Navigate to="people" replace /> : <Dashboard role={r} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<LeaveManagement />} />
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="submissions" element={<Submissions />} />
            {r !== 'admin' && <Route path="projects" element={<Projects />} />}
            <Route path="training" element={<Training />} />
            <Route path="documents" element={<Documents />} />
            <Route path="teams" element={<Teams />} />
            <Route path="reach-outs" element={<ReachOuts />} />
            {r === 'director' && (
              <>
                <Route path="people" element={<DirectorPeople />} />
                <Route path="clients" element={<DirectorClients />} />
              </>
            )}
            {r === 'admin' && (
              <>
                <Route path="interns" element={<Directory type="intern" />} />
                <Route path="employees" element={<Directory type="employee" />} />
                <Route path="approvals" element={<Approvals />} />
                <Route path="operations" element={<Operations />} />
                <Route path="schedules" element={<Schedule admin />} />
                <Route path="projects" element={<Projects admin />} />
                <Route path="leaves" element={<LeaveManagement admin />} />
              </>
            )}
          </Route>
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Ctx.Provider>
  );
}

function Protected({ role, children }) {
  const { session } = useCtx();
  return !session ? <Navigate to="/login" replace /> : session.role !== role ? <Navigate to={'/' + session.role} replace /> : children;
}

function Login() {
  const { session, login } = useCtx();
  const navg = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navg('/' + session.role, { replace: true });
  }, [session]);

  const submit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const s = await login(username.trim(), password);
      navg('/' + s.role);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-glow glow-one" />
      <div className="login-glow glow-two" />
      <section className="login-brand">
        <img src={logo} className="brand-logo" alt="Backbonehub Logo" />
        <div className="brand-copy">
          <span>THE BACKBONE OF EVERY SOLUTION</span>
          <h1>One portal.<br /><b>Every team.</b></h1>
          <p>One workspace for HR, directors, employees and interns to manage people, projects, attendance, documents and daily operations.</p>
        </div>
        <div className="feature-strip">
          <div><ShieldCheck />Secure access</div>
          <div><TrendingUp />Live workspace</div>
          <div><BriefcaseBusiness />Work management</div>
        </div>
      </section>
      <section className="login-card-wrap">
        <form className="login-card" onSubmit={submit}>
          <div className="mobile-logo"><img src={logo} alt="Backbonehub" /></div>
          <div className="eyebrow">BACKBONEHUB.IN WORKFORCE PORTAL</div>
          <h2>Welcome back</h2>
          <p className="muted">Sign in with your company account.</p>
          <label>Username or email<input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" placeholder="Enter your username or email" required /></label>
          <label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="Enter your password" required /></label>
          {error && <div className="error-box"><AlertCircle size={16} />{error}</div>}
          <button className="primary-btn wide-btn" type="submit" disabled={loading}><LockKeyhole size={17} />{loading ? 'Signing in...' : 'Sign in'} <ChevronRight size={18} /></button>
          <div className="secure-login-note"><ShieldCheck size={16} /><span>Company credentials are securely verified by the Backbonehub server.</span></div>
          <small className="login-footer">© {new Date().getFullYear()} Backbonehub.in</small>
        </form>
      </section>
    </main>
  );
}

function Shell({ role }) {
  const { logout, session } = useCtx();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const items = nav[role];
  const title = items.find(x => location.pathname === x[1])?.[0] || 'Dashboard';
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    api.get('/notifications/' + session.employeeId).then(r => setNotifications(r.data)).catch(() => {});
    const socket = io('http://localhost:5000');
    socket.on('notification', n => setNotifications(x => [{ ...n, read: false, _live: true }, ...x]));
    return () => socket.disconnect();
  }, [session]);

  const markRead = async n => {
    if (n._id) await api.patch('/notifications/' + n._id + '/read');
    setNotifications(x => x.map(a => a._id === n._id ? { ...a, read: true } : a));
  };

  return (
    <div className="app-shell">
      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <div className="side-brand">
          <img src={logo} alt="Logo" />
          <div>
            <strong>Backbone<span>hub</span></strong>
            <small>{role === 'admin' ? 'ADMIN / HR' : role === 'director' ? 'DIRECTOR' : role === 'employee' ? 'EMPLOYEE' : 'STUDENT / INTERN'}</small>
          </div>
          <button className="close-mobile" onClick={() => setOpen(false)}><X /></button>
        </div>
        <nav>
          {items.map(([label, path, Icon]) => (
            <NavLink key={path} to={path} end={path === `/${role}`} onClick={() => setOpen(false)}>
              <Icon size={18} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="mini-user">
            <div className="avatar">{session?.name?.slice(0, 1)}</div>
            <div>
              <b>{session?.name}</b>
              <span>{role === 'admin' ? 'HR Workspace' : role === 'director' ? 'Director Workspace' : role === 'employee' ? 'Employee Workspace' : 'Intern Workspace'}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}><LogOut size={17} /> Exit workspace</button>
        </div>
      </aside>
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}
      <main className="main">
        <header className="topbar">
          <div className="top-left">
            <button className="menu-btn" onClick={() => setOpen(true)}><Menu /></button>
            <div><span className="crumb">Workspace /</span><h1>{title}</h1></div>
          </div>
          <div className="top-actions">
            <div className="search"><Search size={17} /><input placeholder="Search workspace..." /></div>
            <div className="notif-wrap">
              <button className="icon-btn" title="Notifications" onClick={() => setShowNotifs(v => !v)}>
                <Bell size={19} />
                {notifications.filter(n => !n.read).length > 0 && <i />}
              </button>
              {showNotifs && (
                <div className="notif-popover">
                  <div className="notif-head"><b>Notifications</b><span>{notifications.filter(n => !n.read).length} unread</span></div>
                  {notifications.length ? notifications.slice(0, 8).map((n, i) => (
                    <button key={n._id || i} className={'notif-item ' + (!n.read ? 'unread' : '')} onClick={() => markRead(n)}>
                      <div className="notice-icon"><Bell size={15} /></div>
                      <span><b>{n.title}</b><small>{n.text}</small></span>
                    </button>
                  )) : <div className="empty-row">No notifications.</div>}
                </div>
              )}
            </div>
            <div className="top-avatar">{session?.name?.slice(0, 1)}</div>
          </div>
        </header>
        <div className="content"><Outlet /></div>
      </main>
    </div>
  );
}

function Head({ title, desc, action }) { return <div className="page-head"><div><h2>{title}</h2><p>{desc}</p></div>{action}</div>; }
function Panel({ title, children, action }) { return <section className="panel"><div className="panel-head"><h3>{title}</h3>{action}</div>{children}</section>; }
function Stat({ icon: Icon, label, value, sub }) { return <div className="stat-card"><div className="stat-icon"><Icon size={20} /></div><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div></div>; }
function Badge({ children }) { return <span className={'badge ' + String(children || '').toLowerCase().replaceAll(' ', '-')}>{children}</span>; }

function Dashboard({ role }) {
  const { session } = useCtx();
  const [data, setData] = useState({ total:0, present:0, pending:0, projects:0, attendance:0, hours:0, submissions:0, notifications:[] });
  const [emps, setEmps] = useState([]);
  const navg = useNavigate();
  useEffect(() => { if(role==='admin') Promise.all([api.get('/dashboard'),api.get('/employees')]).then(([a,b])=>{setData(a.data);setEmps(b.data);}); else if(role!=='director') api.get('/dashboard').then(r=>setData(r.data)); }, [role,session.employeeId]);
  if(role==='director') return <Navigate to="people" replace />;
  if(role==='admin') return <><Head title="Good afternoon, Admin 👋" desc="Live workforce overview for Backbonehub."/><div className="stats-grid"><Stat icon={Users} label="Total workforce" value={data.total || 0} sub="Employees + interns"/><Stat icon={UserCheck} label="Present today" value={data.present || 0} sub="Live attendance"/><Stat icon={ClipboardCheck} label="Pending approvals" value={data.pending || 0} sub="Needs review"/><Stat icon={FolderKanban} label="Active projects" value={data.projects || 0} sub="Current portfolio"/></div><Panel title="Employee activity" action={<button className="secondary-btn" onClick={()=>navg('/admin/employees')}><Users size={15}/> Manage employees</button>}><EmployeeTable employees={emps}/></Panel></>;
  return <><Head title={`Good afternoon, ${session.name || 'Welcome'} 👋`} desc={`Personal workspace for ${session.username}.`}/><div className="stats-grid"><Stat icon={UserCheck} label="Attendance" value={`${data.attendance || 0}%`} sub="Your attendance records"/><Stat icon={Clock3} label="Hours worked" value={`${Number(data.hours || 0).toFixed(2)}h`} sub="Recorded hours"/><Stat icon={FolderKanban} label="Active projects" value={data.projects || 0} sub="Projects assigned to you"/><Stat icon={ClipboardCheck} label="Submissions" value={data.submissions || 0} sub="Your work submissions"/></div><div className="grid-2"><Status/><Today/></div><Panel title="Your notifications">{data.notifications?.length ? data.notifications.map(n=><Notice key={n._id} title={n.title} text={n.text}/>) : <div className="empty-row">No notifications for your account.</div>}</Panel></>;
}

function DirectorPeople() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => { api.get('/director/people').then(r => setRows(r.data)).catch(() => {}); }, []);
  return <>
    <Head title="People history" desc="Review complete employee and intern history, activity and documents." />
    <Panel title="Employees & interns">
      <div className="table-wrap"><table><thead><tr><th>Person</th><th>Role</th><th>Team</th><th>Attendance</th><th>Leaves</th><th>Projects</th><th></th></tr></thead><tbody>{rows.map(r => <tr key={r.employee.employeeId}><td><div className="person"><div className="avatar">{r.employee.name?.slice(0,2).toUpperCase()}</div><span><b>{r.employee.name}</b><small>{r.employee.employeeId} · {r.employee.email}</small></span></div></td><td>{r.employee.role}</td><td>{r.employee.team || '—'}</td><td>{r.employee.attendance || 0}%</td><td>{r.leaves.length}</td><td>{r.employee.project || '—'}</td><td><button className="secondary-btn tiny" onClick={() => setSelected(r)}><Eye size={14}/> View history</button></td></tr>)}</tbody></table></div>
    </Panel>
    {selected && <Modal title={`${selected.employee.name} · History`} onClose={() => setSelected(null)}>
      <div className="form-grid"><Detail label="Employee ID" value={selected.employee.employeeId}/><Detail label="Email" value={selected.employee.email}/><Detail label="Role" value={selected.employee.role}/><Detail label="Department" value={selected.employee.department}/><Detail label="Team" value={selected.employee.team}/><Detail label="Joining date" value={selected.employee.joiningDate}/></div>
      <Panel title="Attendance history"><SimpleRows rows={selected.attendance.slice(0,10).map(a => ({title:a.date,sub:`${a.checkIn || '—'} → ${a.checkOut || '—'}`,status:`${a.hours || 0}h`}))}/></Panel>
      <Panel title="Leave history"><SimpleRows rows={selected.leaves.slice(0,10).map(l => ({title:l.type,sub:`${l.from} → ${l.to} · ${l.reason || ''}`,status:l.status}))}/></Panel>
      <Panel title="Timesheets & submissions"><SimpleRows rows={[...selected.timesheets.slice(0,5).map(t => ({title:t.project || 'Timesheet',sub:`${t.date} · ${t.task || ''} · ${t.notes || ''}`,status:t.approvalStatus})),...selected.submissions.slice(0,5).map(s => ({title:s.title,sub:`${s.project || ''} · ${s.description || ''}`,status:s.status}))]}/></Panel>
      <Panel title="Documents"><div className="doc-grid">{selected.documents.length ? selected.documents.map(d => <div className="doc-card" key={d._id}><Files/><b>{d.name}</b><span>{d.category || 'General'}</span>{d.fileUrl && <a href={FILE_BASE+d.fileUrl} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Open</a>}</div>) : <div className="empty-row">No documents assigned.</div>}</div></Panel>
    </Modal>}
  </>;
}

function DirectorClients() {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const load = () => api.get('/clients').then(r => setClients(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const open = async c => { const r = await api.get('/clients/' + c._id + '/details'); setSelected(r.data); };
  return <>
    <Head title="Clients & projects" desc="Client details, project portfolio and important client documents." />
    <div className="team-grid">{clients.map(c => <div className="team-card" key={c._id}><div className="team-top"><div className="team-icon"><Building2/></div><Badge>{c.status}</Badge></div><h3>{c.name}</h3><p>{c.company}</p><p>{c.industry || '—'} · {c.location || '—'}</p><button className="secondary-btn full" onClick={() => open(c)}>View client <ChevronRight size={15}/></button></div>)}</div>
    {selected && <Modal title={`${selected.client.name} · Client details`} onClose={() => setSelected(null)}>
      <div className="form-grid"><Detail label="Company" value={selected.client.company}/><Detail label="Email" value={selected.client.email}/><Detail label="Phone" value={selected.client.phone}/><Detail label="Industry" value={selected.client.industry}/><Detail label="Location" value={selected.client.location}/><Detail label="Manager" value={selected.client.manager}/></div>
      <Panel title="Projects"><SimpleRows rows={selected.projects.map(p => ({title:p.name,sub:`${p.team || ''} · ${p.status || ''} · Due ${p.deadline || 'TBD'}`,status:`${p.progress || 0}%`}))}/></Panel>
      <Panel title="Important client documents"><div className="doc-grid">{selected.documents.length ? selected.documents.map(d => <div className="doc-card" key={d._id}><Files/><b>{d.name}</b><span>{d.category || 'Client document'}</span>{d.fileUrl && <a href={FILE_BASE+d.fileUrl} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Open document</a>}</div>) : <div className="empty-row">No client documents uploaded yet.</div>}</div></Panel>
    </Modal>}
  </>;
}

function Status() {
  const [status, setStatus] = useState('Working');
  return (
    <Panel title="Today's status">
      <div className="status-editor">
        {['Working', 'Break', 'Meeting', 'Blocked', 'Completed'].map(s => (
          <button className={status === s ? 'selected' : ''} key={s} onClick={() => setStatus(s)}>{s}</button>
        ))}
        <div className="current-status"><span className="live-dot" />Current status: <b>{status}</b></div>
      </div>
    </Panel>
  );
}

function Today() {
  const { session } = useCtx();
  const [rows, setRows] = useState([]);
  useEffect(() => { api.get('/schedules').then(r => { const today = new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'}); setRows(r.data.filter(x => x.date === today)); }).catch(()=>{}); }, [session.employeeId]);
  return <Panel title="Today's schedule"><div className="timeline">{rows.length ? rows.map((x,i)=><div key={x._id||i}><b>{x.time||'—'}</b><span>{x.title}</span><small>{x.duration||'Scheduled'}{x.team?' · '+x.team:''}</small></div>) : <div className="empty-row">No schedule assigned for today.</div>}</div></Panel>;
}

function Notice({ title, text }) {
  return (
    <div className="notice">
      <div className="notice-icon"><CheckCircle2 size={17} /></div>
      <div><b>{title}</b><p>{text}</p></div>
      <span>Today</span>
    </div>
  );
}

function EmployeeTable({ employees, admin = false, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Employee</th><th>Role</th><th>Team</th><th>Type</th><th>Status</th><th>Attendance</th><th>Project</th>{admin && <th>Actions</th>}</tr></thead>
        <tbody>
          {employees.map(e => (
            <tr key={e._id}>
              <td><div className="person"><div className="avatar">{e.name.split(' ').map(x => x[0]).join('')}</div><span><b>{e.name}</b><small>{e.employeeId} · {e.email}</small></span></div></td>
              <td>{e.role}</td><td>{e.team || '—'}</td><td><Badge>{e.type}</Badge></td><td><Badge>{e.status}</Badge></td><td>{e.attendance || 0}%</td><td>{e.project || '—'}</td>
              {admin && <td><div className="head-actions"><button className="secondary-btn tiny" onClick={() => onEdit(e)}><Edit3 size={14}/> Edit</button><button className="reject" onClick={() => onDelete(e)}>Remove</button></div></td>}
            </tr>
          ))}
        </tbody>
      </table>
      {!employees.length && <div className="empty-row">No records yet.</div>}
    </div>
  );
}

function Directory({ type }) {
  const [employees, setEmployees] = useState([]);
  const [q, setQ] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const load = () => api.get('/employees', { params: { q } }).then(r => setEmployees(r.data.filter(e => e.type === type)));
  useEffect(() => { load(); }, [q, type]);
  const remove = async e => {
    if (!window.confirm(`Remove ${e.name} (${e.employeeId})? This will revoke their login and remove them from teams.`)) return;
    try { await api.delete('/employees/' + e._id); load(); } catch (err) { alert(err.response?.data?.error || 'Could not remove record.'); }
  };
  return (
    <>
      <Head title={type === 'intern' ? 'Intern directory' : 'Employees'} desc={`Search, edit and manage ${type} records.`} action={<button className="primary-btn compact" onClick={() => setShowAdd(true)}><Plus size={16} /> Add {type}</button>} />
      <div className="toolbar"><div className="search wide"><Search size={17} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, role, team..." /></div><button className="secondary-btn" onClick={() => window.open(API + '/export/employees', '_blank')}><Download size={16} /> Export Excel</button></div>
      <Panel title={`${employees.length} records`}><EmployeeTable employees={employees} admin onEdit={setEditing} onDelete={remove} /></Panel>
      {showAdd && <EmployeeModal type={type} onClose={() => setShowAdd(false)} onSaved={load} />}
      {editing && <EmployeeEditModal employee={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
    </>
  );
}

function EmployeeEditModal({ employee, onClose, onSaved }) {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ ...employee });
  const [saving, setSaving] = useState(false);
  useEffect(() => { Promise.all([api.get('/teams'), api.get('/projects')]).then(([a,b]) => { setTeams(a.data); setProjects(b.data); }).catch(() => {}); }, []);
  const save = async e => { e.preventDefault(); setSaving(true); try { await api.patch('/employees/' + employee._id, { name:form.name,email:form.email,role:form.role,department:form.department,team:form.team,phone:form.phone,joiningDate:form.joiningDate,status:form.status,project:form.project }); onSaved(); } catch(err) { alert(err.response?.data?.error || 'Could not update employee.'); } finally { setSaving(false); } };
  return <Modal title={`Edit ${employee.type} · ${employee.name}`} onClose={onClose}><form onSubmit={save}><div className="form-grid">
    <label className="field">Full name<input required value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})}/></label>
    <label className="field">Email<input required type="email" value={form.email||''} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label className="field">Role<input value={form.role||''} onChange={e=>setForm({...form,role:e.target.value})}/></label>
    <label className="field">Department<input value={form.department||''} onChange={e=>setForm({...form,department:e.target.value})}/></label>
    <label className="field">Team<select value={form.team||''} onChange={e=>setForm({...form,team:e.target.value})}><option value="">No team</option>{teams.map(t=><option key={t._id}>{t.name}</option>)}</select></label>
    <label className="field">Project<select value={form.project||''} onChange={e=>setForm({...form,project:e.target.value})}><option value="">No project</option>{projects.map(p=><option key={p._id}>{p.name}</option>)}</select></label>
    <label className="field">Status<select value={form.status||'Working'} onChange={e=>setForm({...form,status:e.target.value})}><option>Working</option><option>On Leave</option><option>Remote</option><option>Inactive</option></select></label>
    <label className="field">Phone<input value={form.phone||''} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
    <label className="field">Joining date<input type="date" value={form.joiningDate||''} onChange={e=>setForm({...form,joiningDate:e.target.value})}/></label>
  </div><div className="modal-actions"><button type="button" className="secondary-btn" onClick={onClose}>Cancel</button><button className="primary-btn" disabled={saving}><Save size={15}/>{saving?'Saving...':'Save changes'}</button></div></form></Modal>;
}

function EmployeeModal({ type = 'employee', onClose, onSaved }) {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '', role: type === 'intern' ? 'Intern' : 'Employee', department: '', team: '', phone: '', joiningDate: new Date().toISOString().slice(0, 10), type });
  const [saving, setSaving] = useState(false);

  useEffect(() => { Promise.all([api.get('/teams'), api.get('/projects')]).then(([a,b]) => { setTeams(a.data); setProjects(b.data); }).catch(() => {}); }, []);

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/employees', form);
      onSaved();
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || 'Could not add employee.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={`Add ${type}`} onClose={onClose}>
      <form onSubmit={save}>
        <div className="form-grid">
          <label className="field">Full name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
          <label className="field">Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
          <label className="field">Username<input required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="e.g. firstname" /></label>
          <label className="field">Initial password<input required minLength={8} type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>
          <label className="field">Employee ID<input placeholder="Auto if blank" value={form.employeeId || ''} onChange={e => setForm({ ...form, employeeId: e.target.value })} /></label>
          <label className="field">Role<input required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></label>
          <label className="field">Department<input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} /></label>
          <label className="field">Phone<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
          <label className="field">Joining date<input type="date" value={form.joiningDate} onChange={e => setForm({ ...form, joiningDate: e.target.value })} /></label>
          <label className="field">Assign project<select value={form.project || ''} onChange={e => setForm({ ...form, project: e.target.value })}><option value="">No project</option>{projects.map(p => <option key={p._id}>{p.name}</option>)}</select></label>
          <label className="field">Assign team<select value={form.team} onChange={e => setForm({ ...form, team: e.target.value })}><option value="">Select team</option>{teams.map(t => <option key={t._id}>{t.name}</option>)}</select></label>
        </div>
        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" disabled={saving}><UserPlus size={15} />{saving ? 'Saving...' : 'Add employee'}</button>
        </div>
      </form>
    </Modal>
  );
}

function Approvals() {
  const [times, setTimes] = useState([]);
  const [subs, setSubs] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const load = () => Promise.all([api.get('/timesheets'), api.get('/submissions'), api.get('/leaves')]).then(([a, b, c]) => {
    setTimes(a.data);
    setSubs(b.data);
    setLeaves(c.data);
  });

  useEffect(() => { load(); }, []);

  const act = async (type, id, status) => {
    await api.patch(`/${type}/${id}`, type === 'timesheets' ? { approvalStatus: status } : { status });
    load();
  };

  return (
    <>
      <Head title="Approvals & review" desc="Review employee and intern submissions with full details." />
      <div className="stats-grid">
        <Stat icon={ClipboardCheck} label="Timesheets" value={times.filter(x => x.approvalStatus === 'Pending').length} sub="Pending" />
        <Stat icon={FileText} label="Submissions" value={subs.filter(x => x.status === 'Under Review').length} sub="Under review" />
        <Stat icon={CalendarDays} label="Leave requests" value={leaves.filter(x => x.status === 'Pending').length} sub="Pending" />
        <Stat icon={BarChart3} label="Total records" value={times.length + subs.length + leaves.length} sub="In pipeline" />
      </div>
      <Panel title="Timesheets"><ApprovalTable rows={times} label="approvalStatus" onAction={(id, s) => act('timesheets', id, s)} /></Panel>
      <Panel title="Work submissions"><ApprovalTable rows={subs} label="status" onAction={(id, s) => act('submissions', id, s)} /></Panel>
      <Panel title="Leave requests"><ApprovalTable rows={leaves} label="status" onAction={(id, s) => act('leaves', id, s)} /></Panel>
    </>
  );
}

function ApprovalTable({ rows, label, onAction }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="approval-list">
      {rows.length ? rows.map(r => (
        <div key={r._id} className="approval-card">
          <div className="approval-main">
            <div className="avatar">{(r.employeeId || 'U').slice(-2)}</div>
            <span><b>{r.title || r.project || r.type || 'Request'}</b><small>{r.employeeId} · {r.date || r.from || new Date(r.createdAt || Date.now()).toLocaleDateString()}</small></span>
            <Badge>{r[label]}</Badge>
            {(String(r[label]).toLowerCase().includes('pending') || String(r[label]).toLowerCase().includes('review')) && (
              <>
                <button className="approve" onClick={() => onAction(r._id, 'Approved')}>Approve</button>
                <button className="reject" onClick={() => onAction(r._id, 'Rejected')}>Reject</button>
              </>
            )}
            <button className="secondary-btn tiny" onClick={() => setOpen(open === r._id ? null : r._id)}><Eye size={14} /> Details</button>
          </div>
          {open === r._id && (
            <div className="approval-details">
              <Detail label="Employee / Intern" value={r.employeeId} />
              {r.project && <Detail label="Project" value={r.project} />}
              {r.task && <Detail label="Task" value={r.task} />}
              {r.hours !== undefined && <Detail label="Hours" value={r.hours} />}
              {r.notes && <Detail label="Notes" value={r.notes} />}
              {r.description && <Detail label="Description" value={r.description} />}
              {r.reason && <Detail label="Reason" value={r.reason} />}
              {r.from && <Detail label="From" value={r.from} />}
              {r.to && <Detail label="To" value={r.to} />}
              {r.fileUrl && <a className="file-link" href={FILE_BASE + r.fileUrl} target="_blank" rel="noreferrer"><Paperclip size={14} /> Open attached file</a>}
            </div>
          )}
        </div>
      )) : <div className="empty-row">Nothing waiting for review.</div>}
    </div>
  );
}

function Detail({ label, value }) { return <div><b>{label}</b><span>{value || '—'}</span></div>; }

function Operations() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [section, setSection] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState('Working');

  useEffect(() => {
    api.get('/employees').then(r => setEmployees(r.data));
    api.get('/leaves').then(r => setLeaves(r.data));
  }, []);

  const send = async () => {
    if (!message) return;
    await api.post('/notifications', { employeeId: 'ALL', title: 'HR Announcement', text: message });
    setSent(true);
    setMessage('');
  };

  const saveStatus = async () => {
    if (!selected) return;
    await api.patch('/employees/by-employee-id/' + selected, { status });
    alert('Employee status updated.');
  };

  const cards = [
    ['Attendance corrections', 'Correct a workforce attendance status.'],
    ['Leave management', 'Review and monitor leave requests.'],
    ['Onboarding', 'Start a new employee onboarding record.'],
    ['Access control', 'Review employee access information.'],
    ['Payroll inputs', 'Export workforce records for payroll.'],
    ['Announcements', 'Send a live announcement to everyone.']
  ];

  return (
    <>
      <Head title="Operations" desc="Daily HR operations and workforce controls." />
      <div className="quick-grid">
        {cards.map(([x, d]) => (
          <div className={'quick-card ' + (section === x ? 'active' : '')} key={x}>
            <Settings2 /><b>{x}</b><p>{d}</p><button onClick={() => setSection(x)}>Open <ChevronRight size={15} /></button>
          </div>
        ))}
      </div>
      {section === 'Attendance corrections' && (
        <Panel title="Attendance correction">
          <div className="form-grid">
            <label className="field">Employee<select value={selected} onChange={e => setSelected(e.target.value)}><option value="">Select employee</option>{employees.map(e => <option key={e._id} value={e._id}>{e.employeeId} · {e.name}</option>)}</select></label>
            <label className="field">Status<select value={status} onChange={e => setStatus(e.target.value)}><option>Working</option><option>On Leave</option><option>Absent</option><option>Remote</option></select></label>
          </div>
          <button className="primary-btn" onClick={saveStatus}><Save size={15} /> Save correction</button>
        </Panel>
      )}
      {section === 'Leave management' && (
        <Panel title="Leave requests">
          <ApprovalTable rows={leaves} label="status" onAction={async (id, s) => {
            await api.patch('/leaves/' + id, { status: s });
            setLeaves((await api.get('/leaves')).data);
          }} />
        </Panel>
      )}
      {section === 'Onboarding' && (
        <Panel title="Employee onboarding">
          <p className="muted">Create the employee record and assign a team. You can publish onboarding documents from the Documents page.</p>
          <button className="primary-btn" onClick={() => setShowAdd(true)}><UserPlus size={15} /> Add employee</button>
        </Panel>
      )}
      {showAdd && <EmployeeModal type="employee" onClose={() => setShowAdd(false)} onSaved={() => { setShowAdd(false); api.get('/employees').then(r => setEmployees(r.data)); }} />}
      {section === 'Access control' && <Panel title="Access control"><EmployeeTable employees={employees} /></Panel>}
      {section === 'Payroll inputs' && (
        <Panel title="Payroll export">
          <p className="muted">Download the current employee master data for payroll preparation.</p>
          <button className="primary-btn" onClick={() => window.open(API + '/export/employees', '_blank')}><Download size={15} /> Export payroll data</button>
        </Panel>
      )}
      {section === 'Announcements' && (
        <Panel title="Company announcement">
          <textarea className="notes" value={message} onChange={e => setMessage(e.target.value)} placeholder="Write an announcement for employees and interns..." />
          <button className="primary-btn" onClick={send}><Send size={16} /> Publish announcement</button>
          {sent && <div className="success-box"><CheckCircle2 /> Announcement sent to all employees and interns.</div>}
        </Panel>
      )}
    </>
  );
}


function Profile() {
  const { session } = useCtx();
  const admin = session.role === 'admin';
  const director = session.role === 'director';
  const [data, setData] = useState(null);
  const [form, setForm] = useState({});
  const [teams, setTeams] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const load = () => {
    if (admin || director) {
      setData({ name: session.name || (admin ? 'Admin / HR' : 'Director'), email: session.email || '', employeeId: session.employeeId || (admin ? 'ADMIN' : 'DIRECTOR'), role: admin ? 'HR Administrator' : 'Director', department: admin ? 'Human Resources' : 'Executive Management', team: 'All Teams', phone: '', joiningDate: '' });
      return;
    }
    api.get('/employees/by-employee-id/' + session.employeeId).then(r => {
      setData(r.data);
      setForm(r.data);
    }).catch(() => {});
  };

  useEffect(() => {
    load();
    api.get('/teams').then(r => setTeams(r.data)).catch(() => {});
  }, [session]);

  if (!data) return <div className="empty-row">Loading profile...</div>;

  const save = async e => {
    e.preventDefault();
    await api.patch('/employees/by-employee-id/' + session.employeeId, {
      name: form.name, email: form.email, role: form.role, department: form.department, team: form.team, phone: form.phone, joiningDate: form.joiningDate
    });
    localStorage.setItem('bh_session', JSON.stringify({ ...session, name: form.name, email: form.email }));
    setEditing(false);
    load();
  };

  return (
    <>
      <Head title={admin ? 'Admin profile' : director ? 'Director profile' : 'My profile'} desc={admin ? 'Manage your HR workspace profile.' : director ? 'Manage your director workspace profile.' : 'Edit your personal workforce information.'} action={!admin && !director && <button className="secondary-btn" onClick={() => setEditing(v => !v)}><Edit3 size={15} />{editing ? 'Cancel' : 'Edit profile'}</button>} />
      <div className="profile-card">
        <div className="profile-avatar">{data.name.slice(0, 1)}</div>
        <div><h2>{data.name}</h2><p>{data.role} · Backbonehub.in</p><Badge>Active</Badge></div>
      </div>
      <Panel title="Account security" action={<button className="secondary-btn" onClick={() => setShowPassword(v => !v)}><KeyRound size={15}/> {showPassword ? 'Cancel' : 'Change password'}</button>}>
        {showPassword && <ChangePassword />}
      </Panel>
      <Panel title="Profile information">
        {editing && !admin && !director ? (
          <form onSubmit={save}>
            <ProfileForm form={form} setForm={setForm} teams={teams} />
            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={() => setEditing(false)}>Cancel</button>
              <button className="primary-btn"><Save size={15} /> Save changes</button>
            </div>
          </form>
        ) : (
          <div className="form-grid">
            <Field label="Name" value={data.name} /><Field label="Email" value={data.email} /><Field label="Employee ID" value={data.employeeId} />
            <Field label="Role" value={data.role} /><Field label="Department" value={data.department} /><Field label="Team" value={data.team} />
            <Field label="Phone" value={data.phone} /><Field label="Joining date" value={data.joiningDate} />
          </div>
        )}
      </Panel>
    </>
  );
}

function ChangePassword() {
  const [form, setForm] = useState({ currentPassword:'', newPassword:'', confirmPassword:'' });
  const [saving, setSaving] = useState(false);
  const save = async e => { e.preventDefault(); if(form.newPassword !== form.confirmPassword) return alert('New passwords do not match.'); setSaving(true); try { await api.post('/auth/change-password',{currentPassword:form.currentPassword,newPassword:form.newPassword}); alert('Password changed successfully.'); setForm({currentPassword:'',newPassword:'',confirmPassword:''}); } catch(err){ alert(err.response?.data?.error || 'Could not change password.'); } finally { setSaving(false); } };
  return <form onSubmit={save}><div className="form-grid"><label className="field">Current password<input required type="password" value={form.currentPassword} onChange={e=>setForm({...form,currentPassword:e.target.value})}/></label><label className="field">New password<input required minLength={8} type="password" value={form.newPassword} onChange={e=>setForm({...form,newPassword:e.target.value})}/></label><label className="field">Confirm new password<input required minLength={8} type="password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})}/></label></div><button className="primary-btn" disabled={saving}><LockKeyhole size={15}/> {saving?'Updating...':'Update password'}</button></form>;
}

function ProfileForm({ form, setForm, teams }) {
  return (
    <div className="form-grid">
      <label className="field">Name<input required value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
      <label className="field">Email<input required type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
      <label className="field">Role<input value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} /></label>
      <label className="field">Department<input value={form.department || ''} onChange={e => setForm({ ...form, department: e.target.value })} /></label>
      <label className="field">Team<select value={form.team || ''} onChange={e => setForm({ ...form, team: e.target.value })}><option value="">No team</option>{teams.map(t => <option key={t._id}>{t.name}</option>)}</select></label>
      <label className="field">Phone<input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
      <label className="field">Joining date<input type="date" value={form.joiningDate || ''} onChange={e => setForm({ ...form, joiningDate: e.target.value })} /></label>
    </div>
  );
}

function Field({ label, value }) { return <label className="field">{label}<input value={value || ''} readOnly /></label>; }

function Attendance() {
  const { session } = useCtx();
  const [rows, setRows] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());

  const load = () => api.get('/attendance/' + session.employeeId).then(r => {
    const data = [...r.data].sort((a, b) => new Date(b.checkInAt || 0) - new Date(a.checkInAt || 0));
    setRows(data);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const a = data.find(x => x.date === today && x.checkInAt && !x.checkOutAt);
    setActive(a || null);
  }).catch(() => {});

  useEffect(() => { load(); }, [session]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active]);

  const toggle = async () => {
    setLoading(true);
    try {
      await api.post(active ? '/attendance/checkout' : '/attendance/checkin', { employeeId: session.employeeId });
      await load();
    } catch (e) {
      alert(e.response?.data?.error || 'Could not update attendance.');
    } finally {
      setLoading(false);
    }
  };

  const liveHours = active?.checkInAt ? Math.max(0, (nowTick - new Date(active.checkInAt).getTime()) / 3600000) : 0;
  const formatDuration = h => {
    const total = Math.floor(h * 60), hrs = Math.floor(total / 60), mins = total % 60, secs = Math.floor((h * 3600) % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };
  const totalHours = rows.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);

  return (
    <>
      <Head title="Attendance" desc="Clock in, clock out and track your exact working time." action={
        <div className="head-actions">
          <button className="primary-btn compact" onClick={toggle} disabled={loading}>
            {active ? <TimerReset size={16} /> : <UserCheck size={16} />} {loading ? 'Updating...' : active ? 'Clock out' : 'Clock in'}
          </button>
          <button className="secondary-btn" onClick={() => window.open(API + '/export/attendance', '_blank')}><Download size={16} /> Export</button>
        </div>
      } />
      <div className="stats-grid">
        <Stat icon={UserCheck} label="Attendance" value={`${Math.round((rows.filter(r => r.status === 'Present').length / Math.max(rows.length, 1)) * 100)}%`} sub="Based on records" />
        <Stat icon={Clock3} label="Hours worked" value={`${totalHours.toFixed(2)}h`} sub="Exact recorded hours" />
        <Stat icon={CalendarDays} label="Days logged" value={rows.length} sub="Attendance records" />
        <Stat icon={CheckCircle2} label="Status" value={active ? 'Working' : 'Not clocked in'} sub={active ? `Current session: ${formatDuration(liveHours)}` : 'Today'} />
      </div>
      {active && (
        <Panel title="Live attendance">
          <div className="live-attendance">
            <div><span className="live-dot" />Clocked in at <b>{active.checkIn}</b></div>
            <strong>{formatDuration(liveHours)}</strong>
            <small>Clock out when your workday ends. The server records the exact check-out time and calculates the actual duration.</small>
          </div>
        </Panel>
      )}
      <Panel title="Attendance history">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Check in</th><th>Check out</th><th>Status</th><th>Hours</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r._id}>
                  <td>{r.date}</td>
                  <td>{r.checkIn || '—'}</td>
                  <td>{r.checkOut || '—'}</td>
                  <td><Badge>{r.status}</Badge></td>
                  <td>{r.hours !== undefined && r.hours !== null ? `${Number(r.hours).toFixed(2)}h` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && <div className="empty-row">No attendance records yet.</div>}
        </div>
      </Panel>
    </>
  );
}

function LeaveManagement({ admin = false }) {
  const { session } = useCtx();
  const [rows, setRows] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ type: 'Casual Leave', from: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }), to: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }), reason: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const params = admin ? {} : { employeeId: session.employeeId };
      const [l, e] = await Promise.all([api.get('/leaves', { params }), api.get('/employees')]);
      setEmployees(e.data);
      setRows(l.data);
    } catch (e) {}
  };

  useEffect(() => { load(); }, [session, admin]);

  const submit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/leaves', { employeeId: session.employeeId, type: form.type, from: form.from, to: form.to, reason: form.reason, status: 'Pending' });
      setForm({ ...form, reason: '' });
      alert('Leave request submitted to Admin / HR.');
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Could not submit leave request.');
    } finally {
      setSaving(false);
    }
  };

  const act = async (id, status) => {
    try {
      await api.patch('/leaves/' + id, { status });
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Could not update leave request.');
    }
  };

  const nameOf = id => employees.find(e => e.employeeId === id)?.name || id;

  return (
    <>
      {admin ? (
        <>
          <Head title="Leave Management" desc="Review, approve or reject leave requests submitted by employees and interns." />
          <div className="stats-grid">
            <Stat icon={CalendarDays} label="Pending" value={rows.filter(r => r.status === 'Pending').length} sub="Needs HR action" />
            <Stat icon={CheckCircle2} label="Approved" value={rows.filter(r => r.status === 'Approved').length} sub="Approved requests" />
            <Stat icon={AlertCircle} label="Rejected" value={rows.filter(r => r.status === 'Rejected').length} sub="Rejected requests" />
            <Stat icon={Users} label="Total requests" value={rows.length} sub="All leave requests" />
          </div>
          <Panel title="Leave requests">
            <div className="approval-list">
              {rows.length ? rows.map(r => (
                <div key={r._id} className="approval-card">
                  <div className="approval-main">
                    <div className="avatar">{(r.employeeId || 'U').slice(-2)}</div>
                    <span><b>{nameOf(r.employeeId)}</b><small>{r.employeeId} · {r.type} · {r.from} to {r.to}</small></span>
                    <Badge>{r.status}</Badge>
                    {r.status === 'Pending' && (
                      <>
                        <button className="approve" onClick={() => act(r._id, 'Approved')}>Approve</button>
                        <button className="reject" onClick={() => act(r._id, 'Rejected')}>Reject</button>
                      </>
                    )}
                  </div>
                  <div className="approval-details">
                    <Detail label="Leave type" value={r.type} />
                    <Detail label="From" value={r.from} />
                    <Detail label="To" value={r.to} />
                    <Detail label="Reason" value={r.reason} />
                    <Detail label="Employee / Intern" value={`${nameOf(r.employeeId)} (${r.employeeId})`} />
                  </div>
                </div>
              )) : <div className="empty-row">No leave requests yet.</div>}
            </div>
          </Panel>
        </>
      ) : (
        <>
          <Head title="Leave Management" desc="Apply for leave and track your request status." />
          <Panel title="Apply for leave">
            <form onSubmit={submit}>
              <div className="form-grid">
                <label className="field">Leave type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Casual Leave</option><option>Sick Leave</option><option>Personal Leave</option><option>Work From Home</option><option>Emergency Leave</option></select></label>
                <label className="field">From<input required type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} /></label>
                <label className="field">To<input required type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} /></label>
              </div>
              <label className="field">Reason<textarea required className="notes" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Explain the reason for your leave..." /></label>
              <button className="primary-btn" disabled={saving}><Send size={15} />{saving ? 'Submitting...' : 'Submit leave request'}</button>
            </form>
          </Panel>
          <Panel title="My leave requests">
            <div className="approval-list">
              {rows.length ? rows.map(r => (
                <div key={r._id} className="approval-card">
                  <div className="approval-main">
                    <div className="avatar">{r.type?.slice(0, 2).toUpperCase()}</div>
                    <span><b>{r.type}</b><small>{r.from} to {r.to}</small></span>
                    <Badge>{r.status}</Badge>
                  </div>
                  <div className="approval-details">
                    <Detail label="Leave type" value={r.type} />
                    <Detail label="From" value={r.from} />
                    <Detail label="To" value={r.to} />
                    <Detail label="Reason" value={r.reason} />
                    <Detail label="Status" value={r.status} />
                  </div>
                </div>
              )) : <div className="empty-row">You have not submitted any leave requests.</div>}
            </div>
          </Panel>
        </>
      )}
    </>
  );
}

function Timesheet() {
  const { session } = useCtx();
  const [form, setForm] = useState({ project: '', task: '', hours: 8, notes: '' });
  const [rows, setRows] = useState([]);
  const load = () => api.get('/timesheets', { params: { employeeId: session.employeeId } }).then(r => setRows(r.data));

  useEffect(() => { load(); }, []);

  const save = async e => {
    e.preventDefault();
    await api.post('/timesheets', { ...form, employeeId: session.employeeId, date: new Date().toISOString().slice(0, 10) });
    setForm({ project: '', task: '', hours: 8, notes: '' });
    load();
  };

  return (
    <>
      <Head title="Timesheet" desc="Log your work and submit it for manager approval." />
      <Panel title="New timesheet entry">
        <form onSubmit={save}>
          <div className="form-grid">
            <label className="field">Project<input required value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} /></label>
            <label className="field">Task<input required value={form.task} onChange={e => setForm({ ...form, task: e.target.value })} /></label>
            <label className="field">Hours<input type="number" min="0" max="24" value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} /></label>
          </div>
          <textarea className="notes" placeholder="What did you work on?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <button className="primary-btn"><Send size={16} /> Submit timesheet</button>
        </form>
      </Panel>
      <Panel title="My submissions"><SimpleRows rows={rows.map(r => ({ title: r.project, sub: `${r.date} · ${r.task} · ${r.hours}h · ${r.notes || ''}`, status: r.approvalStatus }))} /></Panel>
    </>
  );
}

function SimpleRows({ rows }) {
  return (
    <div className="submission-list">
      {rows.length ? rows.map((r, i) => (
        <div key={i}>
          <div className="file-icon"><FileText /></div>
          <div><b>{r.title}</b><small>{r.sub}</small></div>
          <Badge>{r.status}</Badge>
        </div>
      )) : <div className="empty-row">No records yet.</div>}
    </div>
  );
}

function Schedule({ admin = false }) {
  const { session } = useCtx();
  const [rows, setRows] = useState([]);
  const [cursor, setCursor] = useState(new Date());
  const [selected, setSelected] = useState(new Date().toISOString().slice(0, 10));
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: '', date: new Date().toISOString().slice(0, 10), time: '09:30', duration: '30 min', team: 'General', employeeId: '', type: 'Shift' });

  const load = () => api.get('/schedules').then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const visible = admin ? rows : rows.filter(r => !r.employeeId || r.employeeId === session.employeeId);
  const year = cursor.getFullYear(), month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const events = visible.filter(r => r.date === selected);

  const add = async e => {
    e.preventDefault();
    await api.post('/schedules', form);
    setShow(false);
    load();
  };

  return (
    <>
      <Head title={admin ? 'Schedules & shifts' : 'Schedule'} desc={admin ? 'Create shifts and manage the company calendar.' : 'View your calendar, shifts and team activities.'} action={admin && <button className="primary-btn compact" onClick={() => setShow(true)}><Plus size={16} /> Add shift</button>} />
      <div className="calendar-box">
        <div className="calendar-top">
          <button onClick={() => setCursor(new Date(year, month - 1, 1))}><ChevronLeft size={16} /></button>
          <h3>{cursor.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          <button onClick={() => setCursor(new Date(year, month + 1, 1))}><ChevronRight size={16} /></button>
        </div>
        <div className="calendar-grid">
          <b>Sun</b><b>Mon</b><b>Tue</b><b>Wed</b><b>Thu</b><b>Fri</b><b>Sat</b>
          {cells.map((d, i) => {
            if (!d) return <span key={i} />;
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const has = visible.some(r => r.date === key);
            return <button key={key} className={selected === key ? 'today' : ''} onClick={() => setSelected(key)}>{d}{has && <i className="calendar-dot" />}</button>;
          })}
        </div>
      </div>
      <Panel title={`Schedule for ${selected}`}>
        <div className="timeline">
          {events.length ? events.map(r => (
            <div key={r._id}><b>{r.time}</b><span>{r.title}</span><small>{r.duration || '30 min'} · {r.team || 'General'} {r.employeeId ? `· ${r.employeeId}` : ''}</small></div>
          )) : <div className="empty-row">No events or shifts on this date.</div>}
        </div>
      </Panel>
      {show && (
        <Modal title="Add shift / schedule" onClose={() => setShow(false)}>
          <form onSubmit={add}>
            <div className="form-grid">
              <label className="field">Title<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
              <label className="field">Date<input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label>
              <label className="field">Time<input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} /></label>
              <label className="field">Duration<input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} /></label>
              <label className="field">Team<input value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} /></label>
              <label className="field">Employee ID<input placeholder="Optional" value={form.employeeId} onChange={e => setForm({ ...form, employeeId: e.target.value })} /></label>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={() => setShow(false)}>Cancel</button>
              <button className="primary-btn"><Save size={15} /> Save shift</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

function Submissions() {
  const { session } = useCtx();
  const [form, setForm] = useState({ title: '', project: '', description: '' });
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const load = () => api.get('/submissions', { params: { employeeId: session.employeeId } }).then(r => setRows(r.data));

  useEffect(() => { load(); }, []);

  const save = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('employeeId', session.employeeId);
    fd.append('title', form.title);
    fd.append('project', form.project);
    fd.append('description', form.description);
    if (file) fd.append('file', file);
    await api.post('/submissions/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    setForm({ title: '', project: '', description: '' });
    setFile(null);
    load();
  };

  return (
    <>
      <Head title="Work submissions" desc="Submit deliverables and track review feedback." />
      <Panel title="New work submission">
        <form onSubmit={save}>
          <div className="form-grid">
            <label className="field">Title<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
            <label className="field">Project<input required value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} /></label>
          </div>
          <textarea className="notes" required placeholder="Describe your deliverable..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <label className="secondary-btn upload-label"><Upload size={15} /> {file ? file.name : 'Attach deliverable'}<input type="file" hidden onChange={e => setFile(e.target.files?.[0] || null)} /></label>{' '}
          <button className="primary-btn"><Send size={16} /> Submit for review</button>
        </form>
      </Panel>
      <Panel title="Recent submissions"><SimpleRows rows={rows.map(r => ({ title: r.title, sub: `${r.project} · ${new Date(r.createdAt).toLocaleDateString()} · ${r.description}`, status: r.status }))} /></Panel>
    </>
  );
}

function Projects({ admin = false }) {
  const { session } = useCtx();
  const [rows, setRows] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selected, setSelected] = useState(null);
  const [docs, setDocs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [people, setPeople] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({ name:'', team:'', manager:'', progress:0, deadline:'', status:'Working', members:[] });

  const load = () => Promise.all([
    api.get('/projects'),
    api.get('/tasks'),
    admin ? api.get('/teams') : Promise.resolve({data:[]} ),
    admin ? api.get('/employees') : Promise.resolve({data:[]} )
  ]).then(([a,b,t,e]) => { setRows(a.data); setTasks(b.data); setTeams(t.data); setPeople(e.data); });

  useEffect(() => { load(); }, [admin, session.employeeId]);

  const openProject = async p => {
    setSelected(p);
    try { const r = await api.get('/documents', { params:{ projectId:p._id } }); setDocs(r.data); } catch { setDocs([]); }
  };

  const addTask = async () => {
    if (!newTask || !selected) return;
    try { const r = await api.post('/tasks', { projectId:selected._id, title:newTask, assigneeId:session.employeeId, status:'To Do', priority:'Medium' }); setTasks(x=>[...x,r.data]); setNewTask(''); }
    catch(err){ alert(err.response?.data?.error || 'Could not add task.'); }
  };

  const createProject = async e => {
    e.preventDefault();
    try { await api.post('/projects', projectForm); setShowProjectForm(false); setProjectForm({name:'',team:'',manager:'',progress:0,deadline:'',status:'Working',members:[]}); load(); }
    catch(err){ alert(err.response?.data?.error || 'Could not create project.'); }
  };

  const updateMembers = async members => {
    try { const r=await api.patch('/projects/'+selected._id,{members}); setSelected(r.data); load(); }
    catch(err){ alert(err.response?.data?.error || 'Could not update project members.'); }
  };

  const deleteProject = async p => {
    if(!window.confirm(`Delete project ${p.name}? This also removes its tasks and project documents.`)) return;
    try { await api.delete('/projects/'+p._id); if(selected?._id===p._id)setSelected(null); load(); }
    catch(err){ alert(err.response?.data?.error || 'Could not delete project.'); }
  };

  const visibleRows = admin ? rows : rows.filter(p => p.members?.includes(session.employeeId));

  return <>
    <Head title={admin ? 'Project management' : 'Projects'} desc={admin ? 'Create projects, assign members and manage project access.' : `Projects assigned to ${session.name || session.username}.`} action={admin && <button className="primary-btn compact" onClick={()=>setShowProjectForm(true)}><Plus size={16}/> Create project</button>} />

    {admin && showProjectForm && <Modal title="Create project" onClose={()=>setShowProjectForm(false)}><form onSubmit={createProject}><div className="form-grid">
      <label className="field">Project name<input required value={projectForm.name} onChange={e=>setProjectForm({...projectForm,name:e.target.value})}/></label>
      <label className="field">Team<select value={projectForm.team} onChange={e=>setProjectForm({...projectForm,team:e.target.value})}><option value="">No team</option>{teams.map(t=><option key={t._id}>{t.name}</option>)}</select></label>
      <label className="field">Manager<input value={projectForm.manager} onChange={e=>setProjectForm({...projectForm,manager:e.target.value})}/></label>
      <label className="field">Deadline<input type="date" value={projectForm.deadline} onChange={e=>setProjectForm({...projectForm,deadline:e.target.value})}/></label>
      <label className="field">Status<select value={projectForm.status} onChange={e=>setProjectForm({...projectForm,status:e.target.value})}><option>Working</option><option>On Track</option><option>Planning</option><option>Completed</option></select></label>
      <label className="field">Members<select multiple value={projectForm.members} onChange={e=>setProjectForm({...projectForm,members:Array.from(e.target.selectedOptions,x=>x.value)})}>{people.map(x=><option key={x.employeeId} value={x.employeeId}>{x.employeeId} · {x.name}</option>)}</select></label>
    </div><div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setShowProjectForm(false)}>Cancel</button><button className="primary-btn"><Save size={15}/> Create project</button></div></form></Modal>}

    <Panel title={admin ? `${visibleRows.length} projects` : 'Your assigned projects'}>
      <div className="project-grid">
        {visibleRows.map(p=><div className="project-card" key={p._id}><div className="project-head"><FolderKanban/><Badge>{p.status}</Badge></div><h3>{p.name}</h3><p>{p.team || 'No team'} · Manager: {p.manager || '—'}</p><div className="progress"><span style={{width:`${p.progress||0}%`}}/></div><small>{p.progress||0}% complete · Due {p.deadline||'TBD'}</small><div className="project-foot"><span>{p.members?.length||0} members</span><button onClick={()=>openProject(p)}>{admin?'Manage':'Open'} <ChevronRight size={15}/></button>{admin&&<button className="reject" onClick={()=>deleteProject(p)}><Trash2 size={14}/> Delete</button>}</div></div>)}
        {!visibleRows.length&&<div className="empty-row">{admin?'No projects created yet.':'No projects have been assigned to your account yet.'}</div>}
      </div>
    </Panel>

    {selected && admin && <Panel title={`${selected.name} · Project members`} action={<button className="secondary-btn" onClick={()=>setSelected(null)}>Close</button>}><div className="form-grid"><label className="field">Members<select multiple value={selected.members||[]} onChange={e=>updateMembers(Array.from(e.target.selectedOptions,x=>x.value))}>{people.map(x=><option key={x.employeeId} value={x.employeeId}>{x.employeeId} · {x.name}</option>)}</select></label></div><p className="muted">Hold Ctrl (Windows) or Command (Mac) to select multiple members.</p></Panel>}

    {selected && <Panel title={`${selected.name} · Important files`} action={!admin&&<button className="secondary-btn" onClick={()=>setSelected(null)}>Close</button>}><div className="doc-grid">{docs.length?docs.map(d=><div className="doc-card" key={d._id}><Files/><b>{d.name}</b><span>{d.category||'Project file'}</span>{d.fileUrl?<a href={FILE_BASE+d.fileUrl} target="_blank" rel="noreferrer"><Eye size={14}/> Open file</a>:<span>No file attached</span>}</div>):<div className="empty-row">No project files uploaded by Admin yet.</div>}</div></Panel>}

    <Panel title="Project tasks"><div className="toolbar"><input className="task-input" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder={selected?'Add a task to selected project...':'Open a project first'}/><button className="primary-btn compact" disabled={!selected} onClick={addTask}><Plus size={15}/> Add task</button></div><SimpleRows rows={tasks.filter(t=>!selected||t.projectId===selected._id).map(t=>({title:t.title,sub:`${t.priority} priority · ${t.dueDate||'No due date'} · ${t.assigneeId}`,status:t.status}))}/></Panel>
  </>;
}

function Training() {
  const { session } = useCtx();
  const [rows, setRows] = useState([]);
  const load = () => api.get('/training').then(r => setRows(r.data));
  useEffect(() => { load(); }, []);

  const complete = async id => {
    await api.patch('/training/' + id + '/complete', { employeeId: session.employeeId });
    load();
  };

  return (
    <>
      <Head title="Training & skills" desc="Complete modules and maintain your skill development." />
      <div className="skill-cloud">
        {[...new Set(rows.flatMap(r => r.skills || []))].map(x => <span key={x}>{x}</span>)}
        {!rows.some(r => (r.skills || []).length) && <span>No skills assigned yet</span>}
      </div>
      <Panel title="Training modules">
        <div className="training-list">
          {rows.map(r => {
            const done = r.completedBy?.includes(session.employeeId);
            return (
              <div key={r._id}>
                <GraduationCap />
                <span><b>{r.title}</b><small>{r.description}</small></span>
                <button className={done ? 'done' : ''} disabled={done} onClick={() => complete(r._id)}>{done ? 'Completed' : 'Mark complete'}</button>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}

function Documents() {
  const { session } = useCtx();
  const [rows, setRows] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Company Document');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const admin = session.role === 'admin';

  const load = () => {
    const params = admin ? {} : { employeeId: session.employeeId, team: session.team || '' };
    api.get('/documents', { params }).then(r => setRows(r.data)).catch(() => {});
  };

  useEffect(() => {
    load();
    api.get('/projects').then(r => setProjects(r.data)).catch(() => {});
    if (admin) api.get('/clients').then(r => setClients(r.data)).catch(() => {});
  }, []);

  const uploadFile = async () => {
    if (!file || !admin) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('employeeId', 'ALL');
    fd.append('category', category);
    if (projectId) fd.append('projectId', projectId);
    if (clientId) fd.append('clientId', clientId);
    fd.append('uploadedBy', 'ADMIN');
    fd.append('role', 'admin');
    await api.post('/documents', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    setFile(null);
    setProjectId('');
    setClientId('');
    load();
  };

  return (
    <>
      <Head title={admin ? 'Documents' : 'Documents & access'} desc={admin ? 'Upload and publish documents for employees and interns.' : 'Access documents published by Admin.'} action={admin && <label className="primary-btn compact upload-label"><Upload size={16} /> Choose file<input type="file" hidden onChange={e => setFile(e.target.files?.[0] || null)} /></label>} />
      {admin && file && (
        <Panel title="Upload document">
          <div className="form-grid">
            <label className="field">Category<input value={category} onChange={e => setCategory(e.target.value)} /></label>
            <label className="field">Project (optional)<select value={projectId} onChange={e => setProjectId(e.target.value)}><option value="">Company / general</option>{projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}</select></label>
            <label className="field">Client (optional)<select value={clientId} onChange={e => setClientId(e.target.value)}><option value="">No client</option>{clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}</select></label>
          </div>
          <div className="success-box"><Files /> {file.name} <button className="primary-btn compact" onClick={uploadFile}>Upload & publish</button></div>
        </Panel>
      )}
      <Panel title={admin ? 'Published document library' : 'Documents available to you'}>
        <div className="doc-grid">
          {rows.map(d => (
            <div className="doc-card" key={d._id}>
              <Files /><b>{d.name}</b><span>{d.category || 'General'} {d.projectId ? '· Project file' : ''}</span>
              {d.fileUrl ? <a href={FILE_BASE + d.fileUrl} target="_blank" rel="noreferrer"><Eye size={14} /> Open file</a> : <span>Record only</span>}
            </div>
          ))}
          {!rows.length && <div className="empty-row">No documents uploaded yet.</div>}
        </div>
      </Panel>
    </>
  );
}

function Teams() {
  const { session } = useCtx();
  const admin = session.role === 'admin';
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [people, setPeople] = useState([]);
  const load = () => Promise.all([api.get('/teams'), admin ? api.get('/employees') : api.get('/employees/by-employee-id/' + session.employeeId)]).then(([a,b]) => { setRows(a.data); setPeople(admin ? b.data : [b.data]); if(!admin && b.data?.team) setSelected(a.data.find(t=>t.name===b.data.team)||null); });
  useEffect(() => { load(); }, [session.role, session.employeeId]);
  const visible = admin ? rows : rows.filter(t => t.name === selected?.name || t.name === people[0]?.team);
  const saveMembers = async (team, members) => { try { await api.patch('/teams/'+team._id,{members}); load(); } catch(err){ alert(err.response?.data?.error || 'Could not update team.'); } };
  return <>
    <Head title={admin ? 'Manage teams' : 'My team'} desc={admin ? 'Create teams and add or remove team members.' : 'Your team members and private team chat.'} action={admin && <button className="primary-btn compact" onClick={async()=>{const name=prompt('Team name'); if(name?.trim()){try{await api.post('/teams',{name:name.trim(),lead:'Admin / HR',members:[],projects:[]});load();}catch(e){alert(e.response?.data?.error||'Could not create team.')}}}}><Plus size={15}/> Create team</button>} />
    <div className="team-grid">{visible.map(t => <div className="team-card" key={t._id}><div className="team-top"><div className="team-icon"><Network/></div><span>{t.members?.length||0} members</span></div><h3>{t.name}</h3><p>Lead: {t.lead || '—'}</p><div className="stack">{(t.memberDetails||[]).map(m=><span key={m.employeeId}>{m.name}</span>)}</div>{admin && <label className="field">Edit members<select multiple value={t.members||[]} onChange={e=>saveMembers(t,Array.from(e.target.selectedOptions,x=>x.value))}>{people.map(p=><option key={p.employeeId} value={p.employeeId}>{p.employeeId} · {p.name}</option>)}</select></label>}<button className="secondary-btn full" onClick={()=>setSelected(t)}>Open team chat</button></div>)}</div>
    {!admin && !visible.length && <div className="empty-row">You are not assigned to a team yet.</div>}
    {selected && <TeamChat team={selected} currentId={session.employeeId} onClose={()=>setSelected(null)} />}
  </>;
}

function TeamChat({ team, currentId, onClose }) {
  const [messages, setMessages] = useState([]); const [text, setText] = useState('');
  const load = () => api.get('/messages',{params:{teamId:team._id}}).then(r=>setMessages(r.data));
  useEffect(()=>{load();const socket=io('http://localhost:5000');socket.on('team-message',m=>{if(m.teamId===team._id)setMessages(x=>x.some(a=>a._id===m._id)?x:[...x,m]);});return()=>socket.disconnect();},[team._id]);
  const send=async()=>{if(!text.trim())return;try{const r=await api.post('/messages',{teamId:team._id,fromId:currentId,text});setMessages(x=>x.some(m=>m._id===r.data._id)?x:[...x,r.data]);setText('');}catch(err){alert(err.response?.data?.error||'You cannot message this team.');}};
  return <Panel title={`Team chat · ${team.name}`} action={onClose&&<button className="secondary-btn" onClick={onClose}>Close</button>}><div className="chat-box">{messages.length?messages.map((m,i)=><div key={m._id||i} className={'chat-message '+(m.fromId===currentId?'mine':'')}><b>{m.fromName||m.fromId}</b><span>{m.text}</span><small>{new Date(m.createdAt||Date.now()).toLocaleTimeString()}</small></div>):<div className="empty-row">No messages yet.</div>}</div><div className="chat-compose"><input value={text} onChange={e=>setText(e.target.value)} placeholder="Message your team..." onKeyDown={e=>e.key==='Enter'&&send()}/><button className="primary-btn compact" onClick={send}><Send size={15}/> Send</button></div></Panel>;
}

function ReachOuts() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const { session } = useCtx();

  const send = async () => {
    if (!message.trim()) return;
    await api.post('/messages', { fromId: session.employeeId, toRole: 'HR', subject: 'Reach out', text: message });
    setSent(true);
    setMessage('');
  };

  return (
    <>
      <Head title="Reach outs" desc="Contact HR, your manager or IT support." />
      <div className="reach-grid">
        {['HR / Admin', 'Project Mentor', 'IT Support'].map(x => (
          <div className="reach-card" key={x}>
            <div className="team-icon"><MessageSquare /></div>
            <h3>{x}</h3>
            <p>Send a message regarding work, access or support.</p>
            <button className="primary-btn" onClick={() => setMessage(`Hello ${x}, `)}>Message</button>
          </div>
        ))}
      </div>
      <Panel title="Message">
        <textarea className="notes" value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your message..." />
        <button className="primary-btn" onClick={send}><Send size={16} /> Send message</button>
        {sent && <div className="success-box"><CheckCircle2 /> Message sent.</div>}
      </Panel>
    </>
  );
}

function ManageTeams() {
  return <Teams />;
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head">
          <h3>{title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);