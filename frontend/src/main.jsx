import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, ArrowUpRight, Atom, Award, BookOpen, CheckCircle2, ChevronRight,
  Clock3, GraduationCap, Menu, ShieldCheck, Sparkles, Star, Users, X, Zap,
  Mail, MapPin, Phone, LockKeyhole, UserRound, LayoutDashboard, CalendarDays,
  BookMarked, Wallet, ClipboardCheck, LogOut, Search, Bell
} from 'lucide-react';
import './style.css';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
const courses = [
  { tag: 'FOUNDATION', title: 'School Excellence', desc: 'Build strong fundamentals with clear concepts, guided practice and personal support.', duration: 'Classes 6–10', icon: BookOpen, tone: 'blue', details: ['Concept-first classroom teaching', 'Chapter-wise practice and revision', 'Regular progress discussions', 'Doubt-clearing support'] },
  { tag: 'COMPETITIVE', title: 'JEE / NEET Preparation', desc: 'Structured preparation with focused mentoring, practice plans and mock-test guidance.', duration: 'Classes 11–12', icon: Atom, tone: 'violet', details: ['Physics, Chemistry, Mathematics and Biology', 'Topic-wise practice plans', 'Mock tests and performance review', 'Focused doubt-solving sessions'] },
  { tag: 'CAREER READY', title: 'Skills & Coding', desc: 'Practical digital skills, logical thinking and project-based learning for curious minds.', duration: 'All levels', icon: Zap, tone: 'amber', details: ['Programming fundamentals', 'Problem-solving practice', 'Guided mini projects', 'Digital confidence and creativity'] }
];
const faculty = [
  { initials: 'AS', name: 'Ananya Sharma', subject: 'Mathematics', experience: '8+ years teaching', tone: 'blue' },
  { initials: 'RK', name: 'Rahul Kapoor', subject: 'Physics', experience: '10+ years teaching', tone: 'violet' },
  { initials: 'PM', name: 'Priya Mishra', subject: 'Biology', experience: '7+ years teaching', tone: 'amber' }
];
const testimonials = [
  { quote: 'The teachers explain difficult concepts in a way that finally makes sense. I feel much more confident.', name: 'Aarav S.', meta: 'Class 12 student', initials: 'AS' },
  { quote: 'Regular feedback and a clear study plan helped our family understand exactly where improvement was needed.', name: 'Neha Verma', meta: 'Parent', initials: 'NV' },
  { quote: 'Small batches mean every student gets attention. The learning environment is focused but friendly.', name: 'Rohan K.', meta: 'JEE foundation', initials: 'RK' }
];
const navItems = [
  ['Home', '/'], ['Programs', '/programs'], ['Our approach', '/approach'],
  ['Faculty', '/faculty'], ['Results', '/results'], ['Contact', '/contact']
];

function currentPath() { return window.location.pathname.replace(/\/$/, '') || '/'; }
function Brand() {
  return <a className="brand" href="/" aria-label="EduNex Academy home"><span className="brand-mark"><GraduationCap size={24}/></span><span className="brand-copy"><b>EduNex</b><small>ACADEMY</small></span></a>;
}
function Header({ path }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [path]);
  return <>
    <div className="topline"><span><Sparkles size={14}/> Admissions open for 2026–27</span><a href="/contact">Talk to our team <ArrowRight size={13}/></a></div>
    <header className="site-header"><div className="header-inner"><Brand/>
      <button className="mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navItems.map(([label, href]) => <a key={href} href={href} className={path === href ? 'active' : ''}>{label}</a>)}
        <a className="mobile-portal" href="/portal-login"><LockKeyhole size={15}/> Portal login</a>
        <a className="mobile-apply" href="/contact">Enquire now <ArrowUpRight size={15}/></a>
      </nav>
      <div className="header-actions"><a className="portal-link" href="/portal-login"><LockKeyhole size={15}/> Portal login</a><a className="button button-primary header-apply" href="/contact">Enquire now <ArrowUpRight size={16}/></a></div>
    </div></header>
  </>;
}
function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Brand/><p>A focused learning environment built around strong concepts, consistent practice and personal guidance.</p></div><div><h4>Explore</h4><a href="/programs">Programs</a><a href="/approach">Our approach</a><a href="/faculty">Faculty</a><a href="/results">Results</a></div><div><h4>Get in touch</h4><a href="/contact"><Mail size={15}/> Send an enquiry</a><a href="/contact"><Phone size={15}/> Request a callback</a><a href="/portal-login"><LockKeyhole size={15}/> Portal login</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} EduNex Academy. All rights reserved.</span><span>Learn with clarity. Grow with confidence.</span></div></footer>;
}
function PageShell({ path, children }) { return <div className="app-shell"><Header path={path}/>{children}<Footer/></div>; }
function Eyebrow({ children, light = false }) { return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span/> {children}</div>; }
function PageIntro({ eyebrow, title, accent, description }) {
  return <section className="page-intro"><div className="container"><Eyebrow>{eyebrow}</Eyebrow><h1>{title} <em>{accent}</em></h1><p>{description}</p></div></section>;
}
function CTA({ title = 'Ready to take the next step?', text = 'Tell us what you are working towards. Our team will help you find a suitable learning path.' }) {
  return <section className="cta-band"><div><Eyebrow light>LET’S GET STARTED</Eyebrow><h2>{title}</h2><p>{text}</p></div><a className="button button-white" href="/contact">Make an enquiry <ArrowRight size={17}/></a></section>;
}
function CourseCard({ course, index }) {
  const Icon = course.icon;
  return <article className={`course-card tone-${course.tone}`}><div className="course-card-top"><span className="course-icon"><Icon size={23}/></span><span className="course-number">0{index + 1}</span></div><span className="course-tag">{course.tag}</span><h3>{course.title}</h3><p>{course.desc}</p><div className="course-meta"><span><Clock3 size={15}/> {course.duration}</span><a href="/contact" aria-label={`Enquire about ${course.title}`}><ArrowUpRight size={19}/></a></div></article>;
}
function HomePage() {
  return <PageShell path="/">
    <main>
      <section className="hero-section"><div className="hero-copy"><Eyebrow>A SMARTER WAY TO LEARN</Eyebrow><h1>Big dreams.<br/><em>Brighter futures.</em></h1><p>Build strong fundamentals, learn from dedicated educators and grow the confidence to take your next step.</p><div className="hero-actions"><a className="button button-primary" href="/programs">Explore programs <ArrowRight size={17}/></a><a className="text-link" href="/approach">Discover our approach <ChevronRight size={17}/></a></div><div className="hero-trust"><span><ShieldCheck size={17}/> Student-first learning</span><span><Users size={17}/> Personal mentoring</span></div></div>
        <div className="hero-art" aria-label="Illustration of books and learning"><div className="art-circle circle-one"/><div className="art-circle circle-two"/><div className="art-note note-top"><span className="note-icon"><Sparkles size={17}/></span><span><b>Learn with clarity</b><small>One concept at a time</small></span></div><div className="book-illustration"><div className="book-layer layer-back"/><div className="book-layer layer-mid"/><div className="book-layer layer-front"><GraduationCap size={56}/><span>EDUNEX</span></div></div><div className="art-note note-bottom"><span className="note-check"><CheckCircle2 size={18}/></span><span><b>Progress that matters</b><small>Practice · Feedback · Growth</small></span></div><div className="art-caption">A BETTER WAY TO LEARN <span>01 / 03</span></div></div>
      </section>
      <section className="quick-points"><div><b>Concept-first</b><span>Understand before memorising</span></div><div><b>Focused batches</b><span>More room to ask questions</span></div><div><b>Regular practice</b><span>Build confidence steadily</span></div><div><b>Personal guidance</b><span>Know your next step</span></div></section>
      <section className="section-block"><div className="container"><div className="section-heading"><div><Eyebrow>FIND YOUR PATH</Eyebrow><h2>Learning built around <em>you.</em></h2></div><a className="text-link" href="/programs">View all programs <ArrowRight size={16}/></a></div><div className="course-grid">{courses.map((course, i) => <CourseCard key={course.title} course={course} index={i}/>)}</div></div></section>
      <section className="home-approach"><div className="approach-visual"><div className="visual-heading">YOUR LEARNING JOURNEY <span>IN MOTION</span></div>{['Understand the concept', 'Practice with purpose', 'Track your progress'].map((item, i) => <div className={`journey-item ${i === 2 ? 'journey-current' : ''}`} key={item}><span>{i < 2 ? <CheckCircle2 size={18}/> : <Zap size={18}/>}</span><div><b>{item}</b><small>{['Learn the why, not just the what', 'Build accuracy and confidence', 'Know what to improve next'][i]}</small></div></div>)}<div className="journey-progress"><span>Consistency comes from small steps</span><div><i/></div></div></div><div className="approach-summary"><Eyebrow>THE EDUNEX DIFFERENCE</Eyebrow><h2>Not just more study.<br/><em>Better learning.</em></h2><p>Real progress starts when students feel supported, challenged and understood. Our approach keeps learning clear, structured and purposeful.</p><a className="button button-outline" href="/approach">Explore our approach <ArrowRight size={16}/></a></div></section>
      <section className="section-block soft-section"><div className="container"><div className="section-heading"><div><Eyebrow>MEET YOUR MENTORS</Eyebrow><h2>Guidance from <em>educators.</em></h2></div><a className="text-link" href="/faculty">Meet the faculty <ArrowRight size={16}/></a></div><FacultyGrid compact/></div></section>
      <section className="testimonial-section"><div className="container"><div className="section-heading"><div><Eyebrow>COMMUNITY VOICES</Eyebrow><h2>Learning feels better<br/>when you’re <em>supported.</em></h2></div><a className="text-link" href="/results">Read our approach to results <ArrowRight size={16}/></a></div><TestimonialGrid/><p className="demo-disclaimer">Sample testimonial content for this website demo. Replace with approved student or parent feedback before publishing.</p></div></section>
      <CTA/>
    </main>
  </PageShell>;
}
function ProgramsPage() {
  return <PageShell path="/programs"><PageIntro eyebrow="PROGRAMS & COURSES" title="A clear path for" accent="every goal." description="Choose a learning track that matches your current level and what you want to achieve next."/><main className="container page-content"><div className="course-grid course-grid-large">{courses.map((course, i) => <CourseCard key={course.title} course={course} index={i}/>)}</div><div className="detail-grid">{courses.map(course => <article className="detail-card" key={course.title}><span className="detail-label">{course.tag}</span><h3>{course.title}</h3><ul>{course.details.map(detail => <li key={detail}><CheckCircle2 size={16}/>{detail}</li>)}</ul><a href="/contact" className="text-link">Ask about this program <ArrowRight size={15}/></a></article>)}</div><div className="notice-strip"><ShieldCheck size={20}/><p>Course availability, batch timings and fee details can be confirmed by the academy team during your enquiry.</p></div></main><CTA title="Not sure which program is right?" text="Share your class, interests and learning goals. We’ll help you understand the available options."/></PageShell>;
}
function ApproachPage() {
  const steps = [
    ['01', 'Clarity before complexity', 'We make the fundamentals click before moving to advanced ideas.'],
    ['02', 'Mentoring that sees you', 'Guidance that adapts to each learner’s strengths, questions and goals.'],
    ['03', 'Practice with purpose', 'Structured practice helps students turn understanding into confidence.'],
    ['04', 'Progress you can measure', 'Regular feedback helps identify strengths and the next areas to improve.']
  ];
  return <PageShell path="/approach"><PageIntro eyebrow="OUR APPROACH" title="Learn with purpose." accent="Grow with confidence." description="A supportive and structured learning experience that values understanding, consistency and steady improvement."/><main className="container page-content"><div className="approach-page-grid"><div className="approach-lead-card"><span className="large-symbol"><GraduationCap size={36}/></span><h2>Strong learning starts with strong foundations.</h2><p>We believe students learn best when concepts are explained clearly, questions are welcomed and progress is built step by step.</p></div><div className="steps-list">{steps.map(([num, title, desc]) => <article className="step-card" key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></div></main><CTA/></PageShell>;
}
function FacultyGrid({ compact = false }) {
  return <div className={`faculty-grid ${compact ? 'faculty-compact' : ''}`}>{faculty.map((person, i) => <article className="faculty-card" key={person.name}><div className={`faculty-avatar avatar-${person.tone}`}><span>{person.initials}</span><small>0{i + 1}</small></div><div className="faculty-details"><h3>{person.name}</h3><b>{person.subject}</b><p>{person.experience}</p></div></article>)}</div>;
}
function FacultyPage() {
  return <PageShell path="/faculty"><PageIntro eyebrow="OUR FACULTY" title="Great teachers." accent="Lasting impact." description="Meet the sample faculty profiles included in this demo. Replace these details with the institute’s confirmed faculty information before publishing."/><main className="container page-content"><FacultyGrid/><div className="notice-strip"><Users size={20}/><p>Faculty names, subjects and experience shown here are sample demo content and must be verified by the academy before the site goes public.</p></div></main><CTA title="Want to learn from our team?" text="Send an enquiry and ask about faculty, subjects and available batches."/></PageShell>;
}
function TestimonialGrid() {
  return <div className="testimonial-grid">{testimonials.map(item => <article className="testimonial-card" key={item.name}><div className="testimonial-stars" aria-label="Sample five star rating">★★★★★</div><p>“{item.quote}”</p><div className="testimonial-author"><span>{item.initials}</span><div><b>{item.name}</b><small>{item.meta}</small></div></div></article>)}</div>;
}
function ResultsPage() {
  return <PageShell path="/results"><PageIntro eyebrow="PROGRESS & OUTCOMES" title="Every milestone" accent="matters." description="We value the work behind every result: the questions asked, the habits built and the confidence earned along the way."/><main className="container page-content"><div className="results-grid"><article className="result-feature"><span className="result-icon"><Award size={28}/></span><span className="detail-label">A CULTURE OF PROGRESS</span><h2>Effort becomes achievement.</h2><p>Students need clear goals, consistent practice and useful feedback. Our learning approach is designed to support all three.</p></article><div className="result-points"><div><CheckCircle2/><span><b>Regular practice</b><small>Build strong learning habits.</small></span></div><div><ClipboardCheck/><span><b>Useful feedback</b><small>Understand what to improve next.</small></span></div><div><Star/><span><b>Celebrate growth</b><small>Recognise effort and milestones.</small></span></div></div></div><div className="notice-strip"><ShieldCheck size={20}/><p>No ranks, marks, selections or success percentages are claimed in this demo. Verified student outcomes can be added after the academy supplies approved records.</p></div><section className="testimonials-page"><div className="section-heading"><div><Eyebrow>COMMUNITY VOICES</Eyebrow><h2>Stories from the <em>learning journey.</em></h2></div></div><p className="demo-disclaimer">The testimonials below are sample demo text. Replace them with approved feedback from real students or parents before launch.</p><TestimonialGrid/></section></main><CTA title="Let’s work towards your next milestone."/></PageShell>;
}
function EnquiryForm() {
  const [state, setState] = useState({ sending: false, sent: false, error: '' });
  async function handleSubmit(event) {
    event.preventDefault();
    if (state.sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(['full_name', 'phone', 'email', 'program', 'current_class', 'message'].map(key => [key, data.get(key) || '']));
    setState({ sending: true, sent: false, error: '' });
    try {
      const response = await fetch(`${API_BASE}/enquiries/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setState({ sending: false, sent: true, error: '' });
      form.reset();
    } catch {
      setState({ sending: false, sent: false, error: 'Your enquiry could not be sent. Please check that the academy server is running, then try again.' });
    }
  }
  if (state.sent) return <div className="form-success"><CheckCircle2 size={34}/><h3>Enquiry received</h3><p>Thank you for contacting EduNex Academy. The team can now review your enquiry in the academy admin panel.</p><button className="button button-outline" onClick={() => setState({ sending: false, sent: false, error: '' })}>Send another enquiry</button></div>;
  return <form className="enquiry-form" onSubmit={handleSubmit}><div className="form-heading"><span>ADMISSIONS ENQUIRY</span><h2>Let’s talk about your goals.</h2><p>Share a few details and request a callback from the academy team.</p></div><div className="form-row"><label>Student / parent name<input name="full_name" required maxLength="140" placeholder="Your full name" autoComplete="name"/></label><label>Mobile number<input name="phone" required type="tel" inputMode="tel" pattern="[0-9+() -]{8,20}" maxLength="20" placeholder="Your phone number" autoComplete="tel"/></label></div><div className="form-row"><label>Email address <span>(optional)</span><input name="email" type="email" maxLength="254" placeholder="name@example.com" autoComplete="email"/></label><label>Current class / level<input name="current_class" required maxLength="80" placeholder="e.g. Class 10"/></label></div><label>Program of interest<select name="program" required defaultValue=""><option value="" disabled>Select a program</option>{courses.map(c => <option key={c.title}>{c.title}</option>)}</select></label><label>Message <span>(optional)</span><textarea name="message" rows="4" maxLength="2000" placeholder="Tell us what you would like to know"/></label>{state.error && <p className="form-error" role="alert">{state.error}</p>}<button className="button button-primary submit-button" type="submit" disabled={state.sending}>{state.sending ? 'Sending enquiry…' : 'Request a callback'} <ArrowRight size={17}/></button><small className="form-privacy">Your details are used only to respond to this enquiry.</small></form>;
}
function ContactPage() {
  return <PageShell path="/contact"><PageIntro eyebrow="CONTACT & ADMISSIONS" title="Your next step" accent="starts here." description="Have a question about courses, batches or admissions? Send an enquiry and the academy team can get back to you."/><main className="container page-content contact-layout"><div className="contact-aside"><div className="contact-card"><span className="contact-icon"><Phone size={20}/></span><h3>Request a callback</h3><p>Leave your number in the enquiry form and ask the team to call you.</p></div><div className="contact-card"><span className="contact-icon"><Mail size={20}/></span><h3>Admissions enquiry</h3><p>Ask about course options, current batches, timings and fees.</p></div><div className="contact-card"><span className="contact-icon"><MapPin size={20}/></span><h3>Visit the academy</h3><p>Institute address and official contact details can be added here after confirmation.</p></div></div><EnquiryForm/></main></PageShell>;
}
function PortalLoginPage() {
  const [role, setRole] = useState('student');
  function submit(event) {
    event.preventDefault();
    window.location.href = `/portal-demo?role=${encodeURIComponent(role)}`;
  }
  return <PageShell path="/portal-login"><main className="portal-page"><div className="portal-card"><div className="portal-card-head"><span className="portal-symbol"><LockKeyhole size={24}/></span><Eyebrow>EDUNEX LEARNING PORTAL</Eyebrow><h1>Explore your workspace.</h1><p>Select a portal to open its interactive sample dashboard.</p></div><div className="role-options" role="group" aria-label="Choose portal role">{['student', 'teacher', 'admin'].map(item => <button type="button" key={item} className={role === item ? 'selected' : ''} aria-pressed={role === item} onClick={() => setRole(item)}><span>{item === 'student' ? <GraduationCap/> : item === 'teacher' ? <BookOpen/> : <LayoutDashboard/>}</span>{item[0].toUpperCase() + item.slice(1)}</button>)}</div><form className="login-form" onSubmit={submit}><div className="portal-preview-copy"><ShieldCheck size={17}/><span>This is a website preview. No email or password is needed.</span></div><button className="button button-primary submit-button" type="submit">Open {role} demo <ArrowRight size={17}/></button></form><p className="portal-warning"><ShieldCheck size={16}/> Sample workspace only. Secure sign-in and live account data are not connected.</p><a className="back-link" href="/">← Back to academy website</a></div></main></PageShell>;
}
function PortalDemoPage() {
  const params = new URLSearchParams(window.location.search);
  const role = ['student', 'teacher', 'admin'].includes(params.get('role')) ? params.get('role') : 'student';
  const [tab, setTab] = useState('Overview');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const nav = role === 'admin' ? ['Overview', 'Students', 'Teachers', 'Courses', 'Fees', 'Attendance', 'Enquiries'] : role === 'teacher' ? ['Overview', 'My Classes', 'Attendance', 'Assignments', 'Marks'] : ['Overview', 'My Courses', 'Attendance', 'Fees', 'Exams & Results'];
  const records = tab === 'Students' ? [['ST-1001', 'Aarav Sharma', 'Class 12 · Science', 'Active'], ['ST-1002', 'Ananya Verma', 'Class 11 · Science', 'Active'], ['ST-1003', 'Rohan Singh', 'Class 10 · Foundation', 'Active']] : tab === 'Teachers' ? [['TC-020', 'Ananya Sharma', 'Mathematics', 'Active'], ['TC-021', 'Rahul Kapoor', 'Physics', 'Active'], ['TC-022', 'Priya Mishra', 'Biology', 'Active']] : [['#101', 'Mathematics', 'Class 12 · Batch A', 'Updated today'], ['#102', 'Physics', 'Class 11 · Batch B', 'Updated yesterday'], ['#103', 'Biology', 'NEET · Batch A', 'Updated this week']];
  const filtered = records.filter(row => row.join(' ').toLowerCase().includes(query.toLowerCase()));
  return <div className="portal-demo"><aside className="demo-sidebar"><Brand/><span className="demo-label">{role.toUpperCase()} PORTAL · PREVIEW</span><nav>{nav.map((item, i) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => { setTab(item); setNotice(''); }}>{[<LayoutDashboard/>, <Users/>, <BookOpen/>, <BookMarked/>, <Wallet/>, <ClipboardCheck/>][i % 6]}{item}</button>)}</nav><a href="/portal-login" className="demo-back"><LogOut size={16}/> Exit preview</a></aside><main className="demo-main"><header className="demo-topbar"><span>EduNex Academy <b>/</b> {tab}</span><span className="preview-chip">Sample data preview</span></header><section className="demo-content"><div className="demo-welcome"><div><Eyebrow>YOUR WORKSPACE</Eyebrow><h1>{tab === 'Overview' ? `${role[0].toUpperCase() + role.slice(1)} overview` : tab}</h1><p>Explore the layout using sample academy information.</p></div><span className="demo-avatar">{role.slice(0, 1).toUpperCase()}</span></div>{notice && <div className="demo-notice">{notice}</div>}<div className="demo-metrics">{(role === 'admin' ? [['Students', '428'], ['Teachers', '24'], ['Courses', '12'], ['Enquiries', '36']] : role === 'teacher' ? [['My students', '86'], ['Classes today', '4'], ['Assignments', '12'], ['Attendance', '92%']] : [['My courses', '3'], ['Attendance', '94%'], ['Next assessment', 'Friday'], ['Fee status', 'Up to date']]).map(([label, value]) => <article key={label}><span>{label}</span><b>{value}</b><small>Illustrative demo value</small></article>)}</div><section className="demo-table-card"><div className="demo-table-head"><div><h2>{tab === 'Overview' ? 'Recent activity' : tab}</h2><p>Example records to demonstrate the interface</p></div><label><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sample records"/></label></div><div className="table-scroll"><table><thead><tr><th>ID</th><th>Name / subject</th><th>Details</th><th>Status</th></tr></thead><tbody>{filtered.map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}{!filtered.length && <tr><td colSpan="4">No matching sample records.</td></tr>}</tbody></table></div></section><div className="demo-notice demo-warning"><Bell size={16}/> This workspace uses sample data. Live records, role permissions and secure authentication are not connected.</div></section></main></div>;
}
function NotFoundPage() { return <PageShell path=""><main className="not-found"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>Let’s get you <em>back on track.</em></h1><p>The page you’re looking for may have moved.</p><a className="button button-primary" href="/">Go to homepage <ArrowRight size={17}/></a></main></PageShell>; }
function App() {
  const path = currentPath();
  useEffect(() => { document.title = `${path === '/' ? 'Home' : path.slice(1).replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase())} | EduNex Academy`; window.scrollTo(0, 0); }, [path]);
  if (path === '/') return <HomePage/>;
  if (path === '/programs') return <ProgramsPage/>;
  if (path === '/approach') return <ApproachPage/>;
  if (path === '/faculty') return <FacultyPage/>;
  if (path === '/results') return <ResultsPage/>;
  if (path === '/contact') return <ContactPage/>;
  if (path === '/portal-login') return <PortalLoginPage/>;
  if (path === '/portal-demo') return <PortalDemoPage/>;
  return <NotFoundPage/>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
