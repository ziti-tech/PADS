import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowRight, Heart, GraduationCap, Stethoscope, Droplets, HandHeart, Users, BookOpen, BriefcaseBusiness} from 'lucide-react';
import './styles.css';
import {PageRouter} from './pages';

const A={ [Symbol.toPrimitive]:()=> '/images/ngo-4.jpg?asset=' };
const hero=['/images/education-community.png','/images/health-water-community.png','/images/women-livelihoods.png'];
const nav=[
  ['About us',[['Where We Work','/where-we-work/'],['Leadership','/leadership/'],['Accountability','/accountability/'],['In The Media','/in-the-media/'],['Newsletter','/newsletter/'],['Tribute','/tribute/']]],
  ['Programs',[["St. Patrick's Academy",'/st-patricks-academy/'],['Little Flower School','/little-flower-school/'],['Literacy Project','/literacy-project/'],['Sponsorship','/sponsorship/'],['Community Health','/community-health/'],['Women Empowerment','/women-empowerment/'],['Outreach','/outreach/'],['Vocational Training','/vocational-training/'],['Drinking Water','/drinking-water/']]],
  ['Get Involved',[["Volunteer",'/volunteer/'],['Legacy Gift','/legacy-gift/'],['Donating Methods','/donating-methods/']]]
];

function Header(){const [open,setOpen]=useState(false);const [expanded,setExpanded]=useState(null);const toggleGroup=name=>setExpanded(current=>current===name?null:name);return <>
  <div className="top"><div className="wrap topin"><span><Mail size={14}/> hello@padsngo.org</span><span><Phone size={14}/> +91 98765 43210</span><div className="social"><i>f</i><i>ig</i><i>in</i><i>▶</i></div></div></div>
  <header><div className="wrap headerin"><a className="brand" href="/"><span className="brandMark">PADS</span><span className="brandWords">People Action<br/>Development Society</span></a>
    <nav className={open?'open':''}><a href="/">Home</a>{nav.map(([n,items])=><div className={'navgroup '+(expanded===n?'expanded':'')} key={n}><button type="button" onClick={()=>toggleGroup(n)} aria-expanded={expanded===n}>{n}<ChevronDown className="navArrow" size={14}/></button><div className="dropdown">{items.map(([i,url])=><a href={url} key={i}>{i}</a>)}</div></div>)}<a href="/gallery/">Gallery</a><a href="/contact-us/">Contact</a><a className="mobileDonate" href="/make-your-contribution/">Donate Now</a></nav>
    <a className="donate" href="/make-your-contribution/">Donate Now</a><button className="hamb" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
  </div></header></>}

function Hero(){const [slide,setSlide]=useState(0);useEffect(()=>{const t=setInterval(()=>setSlide(x=>(x+1)%hero.length),5000);return()=>clearInterval(t)},[]);return <section className="hero">{hero.map((u,i)=><div key={u} className={'heroBg '+(i===slide?'active':'')} style={{backgroundImage:`url(${u})`}}/>)}<div className="heroShade"/><div className="wrap heroContent"><p className="eyebrow light">People-powered development</p><div className="heroCard"><h1>Together, We Build<br/><em>Better Futures.</em></h1><p>We partner with communities to advance education, health, livelihoods, clean water and equal opportunity.</p><a className="btn dark" href="/make-your-contribution/">Take Action Today <ArrowRight size={18}/></a></div></div><div className="dots">{hero.map((_,i)=><button className={i===slide?'active':''} onClick={()=>setSlide(i)} key={i}/>)}</div></section>}

function Counter({to,suffix='+'}){const [n,setN]=useState(0);useEffect(()=>{let start;const go=t=>{start??=t;let p=Math.min((t-start)/1500,1);setN(Math.floor(to*(1-(1-p)**3)));if(p<1)requestAnimationFrame(go)};requestAnimationFrame(go)},[to]);return <strong>{n.toLocaleString()}<span>{suffix}</span></strong>}

const impacts=[['Children were Educated in 25 years',125000,GraduationCap],['Patients are treated every month',1550,Stethoscope],['Homes were built for Widows',85,Heart],['Borewells erected for Poor Villages',65,Droplets]];
function Stats(){return <section className="stats"><div className="wrap statsGrid">{impacts.map(([t,n,I])=><div className="stat" key={t}><I/><Counter to={n}/><p>{t}</p></div>)}</div></section>}

const actions=[
  ['Donate','Donate and change a life forever',HandHeart],
  ['Volunteer','Join hands with us and make a difference',Users],
  ['Sponsor',"Sponsor and change a child's life forever",BookOpen],
  ['Empower',"Support and empower a woman's life forever",BriefcaseBusiness]];


function Footer(){return <footer id="contact"><div className="wrap footerGrid"><div className="footBrand"><div className="footerLogo">PADS</div><p>Building stronger, healthier and more self-reliant communities—one action at a time.</p></div><div><h4>Explore</h4><a href="/where-we-work/">About us</a><a href="/community-health/">Programs</a><a href="/gallery/">Gallery</a><a href="/make-your-contribution/">Donate</a></div><div><h4>Contact</h4><p><MapPin/> Community Resource Centre, India</p><p><Phone/> +91 98765 43210</p><p><Mail/> hello@padsngo.org</p></div></div><div className="wrap copyright"><span>© 2026 People Action Development Society.</span><span>Community-led action for sustainable development</span></div></footer>}

function Root(){return <><Header/><PageRouter Home={()=> <main><Hero/><Stats/>
  <HomeBody/></main>}/><Footer/></>}

function HomeBody(){return <>
  <section className="about section"><div className="wrap aboutGrid"><div><p className="eyebrow">People Action Development Society</p><h2>Action that creates <em>change.</em></h2><p>PADS is a community-focused nonprofit working alongside underserved families through education, healthcare, livelihoods, clean water and social development.</p><p>We believe people are the strongest force for lasting change. Our work connects local knowledge, volunteers and responsible support to build resilient, self-reliant communities.</p><a className="textLink" href="/where-we-work/">Discover our story <ArrowRight size={17}/></a></div><div className="aboutPhoto"><img src={'/images/women-livelihoods.png'}/><div className="quote">“Development works best when people lead it.”<small>PADS Community Team</small></div></div></div></section>
  <section className="actionSection section" id="donate"><div className="wrap"><p className="eyebrow center">You can make a difference</p><h2 className="center">Change a life <em>today</em></h2><div className="actionGrid">{actions.map(([t,p,Icon],i)=><a className="action" href={['/make-your-contribution/','/volunteer/','/sponsorship/','/women-empowerment/'][i]} key={t}><span className="actionNo">0{i+1}</span><span className="actionIcon"><Icon/></span><h3>{t}</h3><p>{p}</p><ArrowRight/></a>)}</div></div></section>
  <section className="giving section"><div className="wrap givingGrid"><div><p className="eyebrow light">Community-led change</p><h2>Small actions create <em>lasting impact.</em></h2><p>Your support helps local teams turn practical ideas into sustainable education, health, water and livelihood initiatives.</p><a className="btn orange" href="/donating-methods/">Ways to support <ArrowRight size={18}/></a></div><div className="securities"><h3>How you can participate</h3>{['Fund a Community Project','Volunteer Your Skills','Become a Monthly Supporter'].map((x,i)=><div className="broker" key={x}><span>0{i+1}</span><div><b>{x}</b><small>Make development people-powered</small></div><ArrowRight/></div>)}</div></div></section>
  <section className="media section"><div className="wrap"><div className="sectionHead"><div><p className="eyebrow">News & stories</p><h2>In the <em>Media</em></h2></div><p>Stories from the field show how local leadership and collective action create lasting progress.</p></div><div className="newsGrid">{[['Community Voices: Development Led by People','PADS Field Journal · June 2026','/images/media-interview.png'],['Learning Centres Open New Possibilities','Education Update · May 2026','/images/education-community.png'],['Clean Water, Healthier Communities','Health & Water · April 2026','/images/health-water-community.png']].map(([t,d,img])=><article className="news" key={t}><div className="newsImg" style={{backgroundImage:`url(${img})`}}/><small>{d}</small><h3>{t}</h3><a href="/in-the-media/">Read story <ArrowRight size={16}/></a></article>)}</div></div></section>
  <section className="spot section"><div className="wrap"><p className="eyebrow center">Community champions</p><h2 className="center">People behind the <em>progress</em></h2><div className="spotGrid"><article><img src={'/images/education-community.png'}/><div><small>Library Project</small><h3>Ananya Rao</h3><p>Ananya supports weekend learning circles and helps young readers discover the joy of books.</p><a className="textLink" href="/volunteer/">Volunteer with us <ArrowRight size={16}/></a></div></article><article><img src={'/images/women-livelihoods.png'}/><div><small>Operation Mooknayak</small><h3>Arun Kumar</h3><p>Arun works with village groups to turn local priorities into community-owned projects.</p><a className="textLink" href="/volunteer/">Volunteer with us <ArrowRight size={16}/></a></div></article></div></div></section>
  <section className="cta"><div className="wrap"><p className="eyebrow light">Every gift creates a ripple</p><h2>Be the voice for the <em>voiceless.</em></h2><a className="btn cream" href="/sponsorship/">Sponsor a child today <ArrowRight size={18}/></a></div></section></>}

createRoot(document.getElementById('root')).render(<Root/>);
