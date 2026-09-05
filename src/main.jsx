import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ChevronDown, Phone, Mail, MapPin, ArrowRight, Heart, GraduationCap, Stethoscope, Droplets, HandHeart, Users, BookOpen, BriefcaseBusiness} from 'lucide-react';
import './styles.css';
import {PageRouter} from './pages';

const A={ [Symbol.toPrimitive]:()=> '/images/ngo-4.jpg?asset=' };
const hero=['/images/education-community.png','/images/health-water-community.png','/images/women-livelihoods.png'];
const nav=[
  ['About us',[['Where We Work','/where-we-work/'],['Leadership','/leadership/'],['Accountability','/accountability/'],['In The Media','/in-the-media/'],['Newsletter','/newsletter/'],['Tribute','/tribute/']]],
  ['Programs',[["St. John's Higher Secondary School",'/st-patricks-academy/'],['Literacy Project','/literacy-project/'],['Sponsorship','/sponsorship/'],['Community Health','/community-health/'],['Women Empowerment','/women-empowerment/'],['Outreach','/outreach/'],['Vocational Training','/vocational-training/'],['Drinking Water','/drinking-water/']]],
  ['Get Involved',[["Volunteer",'/volunteer/'],['Legacy Gift','/legacy-gift/'],['Donating Methods','/donating-methods/']]]
];

function Header(){const [open,setOpen]=useState(false);const [expanded,setExpanded]=useState(null);const toggleGroup=name=>setExpanded(current=>current===name?null:name);const toggleMenu=()=>{setOpen(value=>{if(value)setExpanded(null);return !value})};useEffect(()=>{const close=e=>{if(e.key==='Escape'){setOpen(false);setExpanded(null)}};addEventListener('keydown',close);return()=>removeEventListener('keydown',close)},[]);return <>
  <header><div className="wrap headerin"><a className="brand" href="/" aria-label="People Action Development Society home"><img className="brandLogo" src="/images/pads-logo-underlined.png" alt="People Action Development Society"/></a>
    <nav id="primary-navigation" className={open?'open':''}><a href="/">Home</a>{nav.map(([n,items])=><div className={'navgroup '+(expanded===n?'expanded':'')} key={n}><button type="button" onClick={()=>toggleGroup(n)} aria-expanded={expanded===n}>{n}<ChevronDown className="navArrow" size={14}/></button><div className="dropdown">{items.map(([i,url])=><a href={url} key={i}>{i}</a>)}</div></div>)}<a href="/gallery/">Gallery</a><a href="/contact-us/">Contact</a><a className="mobileDonate" href="/make-your-contribution/">Donate Now</a></nav>
    <a className="donate" href="/make-your-contribution/">Donate Now</a><button className={'hamb '+(open?'isOpen':'')} onClick={toggleMenu} aria-label={open?'Close navigation menu':'Open navigation menu'} aria-expanded={open} aria-controls="primary-navigation"><span className="hambIcon" aria-hidden="true"><i/><i/><i/></span></button>
  </div></header></>}

function Hero(){const [slide,setSlide]=useState(0);useEffect(()=>{const t=setInterval(()=>setSlide(x=>(x+1)%hero.length),5000);return()=>clearInterval(t)},[]);return <section className="hero">{hero.map((u,i)=><div key={u} className={'heroBg '+(i===slide?'active':'')} style={{backgroundImage:`url(${u})`}}/>)}<div className="heroShade"/><div className="wrap heroContent"><div className="heroCard"><h1>Together, We Build<br/><em>Better Futures.</em></h1><p>We support underprivileged children and young people in rural communities through education, helping them build brighter and more independent futures.</p><a className="btn dark" href="/make-your-contribution/">Support Our Work <ArrowRight size={18}/></a></div></div><div className="dots">{hero.map((_,i)=><button className={i===slide?'active':''} onClick={()=>setSlide(i)} key={i}/>)}</div></section>}

function Counter({to,suffix='+'}){const [n,setN]=useState(0);useEffect(()=>{let start;const go=t=>{start??=t;let p=Math.min((t-start)/1500,1);setN(Math.floor(to*(1-(1-p)**3)));if(p<1)requestAnimationFrame(go)};requestAnimationFrame(go)},[to]);return <strong>{n.toLocaleString()}<span>{suffix}</span></strong>}

const impacts=[['Underprivileged children educated in 36 years',30000,GraduationCap,'+'],['Community awareness and health camps conducted',50,Stethoscope,'+'],["Girls' hostel built for underprivileged children",1,Heart,''],['Community development centre for the marginalised Thurumbar community',1,Droplets,'']];
function Stats(){return <section className="stats"><div className="wrap statsGrid">{impacts.map(([t,n,I,s])=><div className="stat" key={t}><I/><Counter to={n} suffix={s}/><p>{t}</p></div>)}</div></section>}

const actions=[
  ['Donate','Donate and change a life forever',HandHeart],
  ['Volunteer','Join hands with us and make a difference',Users],
  ['Sponsor',"Sponsor and change a child's life forever",BookOpen],
  ['Empower',"Support and empower a woman's life forever",BriefcaseBusiness]];


function Footer(){return <footer id="contact"><div className="wrap footerGrid"><div className="footBrand"><div className="footerLogo"><img src="/images/pads-logo-underlined.png" alt="People Action Development Society"/></div><p>Building stronger, healthier and more self-reliant communities—one action at a time.</p></div><div><h4>Explore</h4><a href="/where-we-work/">About us</a><a href="/community-health/">Programs</a><a href="/gallery/">Gallery</a><a href="/make-your-contribution/">Donate</a></div><div><h4>Contact</h4><p><MapPin size={18}/><span>Community Resource Centre, India</span></p><p><Phone size={18}/><a href="tel:+919876543210">+91 98765 43210</a></p><p><Mail size={18}/><a href="mailto:secretary@padsindia.org">secretary@padsindia.org</a></p></div></div><div className="wrap copyright"><span>© 2026 People Action Development Society.</span><span>Community-led action for sustainable development</span></div></footer>}

function Root(){return <><Header/><PageRouter Home={()=> <main><Hero/><Stats/>
  <HomeBody/></main>}/><Footer/></>}

function HomeBody(){return <>
  <section className="about section"><div className="wrap aboutGrid"><div><p className="eyebrow">People Action Development Society</p><h2>Action that creates <em>change.</em></h2><p>PADS is a community-focused nonprofit working alongside underserved families through education, healthcare, livelihoods, clean water and social development.</p><p>We believe people are the strongest force for lasting change. Our work connects local knowledge, volunteers and responsible support to build resilient, self-reliant communities.</p><a className="textLink" href="/where-we-work/">Discover our story <ArrowRight size={17}/></a></div><div className="aboutPhoto"><img src={'/images/women-livelihoods.png'}/><div className="quote">“Development works best when people lead it.”<small>PADS Community Team</small></div></div></div></section>
  <section className="actionSection section" id="donate"><div className="wrap"><p className="eyebrow center">You can make a difference</p><h2 className="center">Change a life <em>today</em></h2><div className="actionGrid">{actions.map(([t,p,Icon],i)=><a className="action" href={['/make-your-contribution/','/volunteer/','/sponsorship/','/women-empowerment/'][i]} key={t}><span className="actionNo">0{i+1}</span><span className="actionIcon"><Icon/></span><h3>{t}</h3><p>{p}</p><ArrowRight/></a>)}</div></div></section>
  <section className="cta"><div className="wrap"><p className="eyebrow light">Every gift creates a ripple</p><h2>Be the voice for the <em>voiceless.</em></h2><a className="btn cream" href="/sponsorship/">Sponsor a child today <ArrowRight size={18}/></a></div></section></>}

createRoot(document.getElementById('root')).render(<Root/>);
