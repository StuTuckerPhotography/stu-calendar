/* Stu Tucker Photography - wedding date calendar.
   Loaded on the website by:  <div id="stu-calendar"></div><script src="https://stutuckerphotography.github.io/stu-calendar/calendar.js"></script>
   Edit this file (dates, prices, rules) and the website updates automatically. */
(function(){
  var host=document.getElementById("stu-calendar");
  if(!host){host=document.createElement("div");host.id="stu-calendar";var s=document.currentScript;if(s&&s.parentNode)s.parentNode.insertBefore(host,s);else document.body.appendChild(host);}
  if(host.getAttribute("data-ready"))return; host.setAttribute("data-ready","1");
  if(!document.getElementById("stu-cal-font")){var l=document.createElement("link");l.id="stu-cal-font";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Manrope:wght@400;600&display=swap";document.head.appendChild(l);}
  var st=document.createElement("style");st.textContent="\n.stp-cal{--bg:#F4F3EF;--panel:#FFFFFF;--ink:#1F2622;--ink-2:#56605A;--muted:#7C847E;--rule:#DEDDD6;--grid:#E9E8E2;--accent:#2F5D4E}\n.stp-cal,.stp-cal *{box-sizing:border-box}\n.stp-cal,.stp-cal p,.stp-cal div,.stp-cal span,.stp-cal button,.stp-cal label,.stp-cal input,.stp-cal textarea,.stp-cal li{font-family:\"Manrope\",system-ui,-apple-system,\"Segoe UI\",sans-serif;text-align:left;letter-spacing:normal;text-transform:none}\n.stp-cal p{margin:0;line-height:1.5}\n.stp-cal .eyebrow,.stp-cal .bc-step{text-transform:uppercase;letter-spacing:.12em}\n.stp-cal .bc-dow,.stp-cal .bc-day{text-align:center}\n.stp-cal h1{text-align:left;letter-spacing:normal;text-transform:none}\n.stp-cal button{line-height:1.2;min-height:0;text-shadow:none;box-shadow:none}\n.stp-cal{background:var(--bg);border-radius:12px;color:var(--ink);font-family:\"Manrope\",system-ui,-apple-system,\"Segoe UI\",sans-serif;font-size:15px;line-height:1.5}\n.stp-cal .wrap{max-width:1000px;margin:0 auto;padding:40px 16px 60px;display:grid;gap:20px}\n.stp-cal .eyebrow{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-2)}\n.stp-cal h1{font-family:\"Cormorant Garamond\",Georgia,serif;font-weight:600;font-size:clamp(32px,6vw,46px);line-height:1.05;margin:6px 0 0}\n.stp-cal .lede{color:var(--ink-2);max-width:62ch;margin:10px 0 0}\n.stp-cal .panel{background:var(--panel);border:1px solid var(--rule);border-radius:10px;padding:20px;min-width:0}\n.stp-cal a.bc-btn{text-decoration:none;display:inline-flex;align-items:center}\n.stp-cal .back{color:var(--ink-2);font-size:14px}\n.bc{--bc-avail:#2f6b4f;--bc-avail-bg:#eaf3ee;--bc-booked:#b3261e;--bc-booked-bg:#fbe4e2;--bc-hol:#7a6ba8;--bc-hol-bg:#ece7f5;--bc-warn:#b5622b;display:grid;gap:16px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}\n@media (max-width:820px){.bc{grid-template-columns:minmax(0,1fr)}}\n.stp-cal{--bg:#F9F7F1;--panel:#FDFCFA;--ink:#373737;--muted:#7A776F;--rule:#E6E2D5;--grid:#EFECE3}\n#bc{--accent:#373737;--bc-avail:#3E5A44;--bc-avail-bg:#DDE7D8;--bc-hol:#FFFFFF;--bc-hol-bg:#1A1A1A}\n.bc-banner .bc-jump{margin-top:4px;font:inherit;font-size:13px;letter-spacing:.06em;background:none;border:0;border-bottom:1px solid #E6E2D5;padding:0 0 2px;color:#F9F7F1;cursor:pointer;border-radius:0}\n.bc-banner .bc-jump:hover{border-bottom-color:#F9F7F1}\n.bc-banner .bc-jump:focus-visible{outline:2px solid #F9F7F1;outline-offset:3px}\n.bc-banner{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;padding:18px 20px;border-radius:4px;background:#373737;color:#F9F7F1;border:1px solid #373737}\n.bc-banner b{font-family:\"Cormorant Garamond\",Georgia,serif;font-size:24px;font-weight:500;line-height:1.2;color:#F9F7F1;letter-spacing:.01em}\n.bc-banner span{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#E6E2D5}\n.bc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}\n.bc-head button{border:0;background:none;font-size:22px;line-height:1;cursor:pointer;color:var(--ink);width:36px;height:36px;border-radius:8px}\n.bc-head button:hover{background:var(--grid)}\n.bc-head button:disabled{opacity:.3;cursor:default;background:none}\n.bc-month{font-weight:600;font-size:16px}\n.bc-msel{display:flex;gap:6px;align-items:center}\n.bc-sel{font:inherit;font-size:15px;font-weight:600;color:var(--ink);background:var(--panel);border:1px solid var(--rule);border-radius:8px;padding:6px 8px;cursor:pointer;max-width:none;width:auto;height:auto;margin:0}\n.bc-sel:focus-visible{outline:2px solid var(--accent);outline-offset:1px}\n.bc-vh{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n\n.bc-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}\n.bc-dow{text-align:center;font-size:11px;color:var(--muted);padding-bottom:6px}\n.bc-day{aspect-ratio:1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;border:0;font:inherit;background:none;color:var(--ink);padding:0}\n.bc-day.empty{visibility:hidden}\n.bc-day.past{color:var(--muted);opacity:.5}\n.bc-day.avail{background:var(--bc-avail-bg);color:var(--bc-avail);cursor:pointer;font-weight:600}\n.bc-day.booked{background:var(--bc-booked-bg);color:var(--bc-booked);text-decoration:line-through;cursor:pointer}\n.bc-day.hol{background:var(--bc-hol-bg);color:var(--bc-hol);text-decoration:line-through}\n.bc-day.sel{outline:2px solid var(--ink);outline-offset:-2px}\n.bc-day.today{box-shadow:inset 0 0 0 2px var(--ink)}\n.bc-day:focus-visible{outline:2px solid var(--accent);outline-offset:1px}\n.bc-legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;font-size:12px;color:var(--ink-2)}\n.bc-legend span{display:inline-flex;align-items:center;gap:6px}\n.bc-dot{width:10px;height:10px;border-radius:3px;display:inline-block}\n.bc-step{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}\n.bc-muted{color:var(--ink-2);margin:0}\n.bc-date{font-weight:600;font-size:15px;margin:0 0 10px}\n.bc-pkgs{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n.bc-pkg{position:relative;text-align:left;border:1px solid var(--rule);border-radius:8px;padding:10px;background:var(--panel);color:var(--ink);font:inherit;font-size:13px;cursor:pointer}\n.bc-pkg:hover{border-color:var(--accent)}\n.bc-pkg[disabled]{opacity:.45;cursor:not-allowed}\n.bc-pkg b{display:block;font-size:12px;letter-spacing:.02em;margin-bottom:2px}\n.bc-pkg .p{font-weight:600}\n.bc-pkg .n{display:block;font-size:11px;color:var(--ink-2)}\n.bc-pkg .g{display:block;font-size:11px;color:var(--bc-avail)}\n.bc-pkg .w{display:block;font-size:11px;color:var(--bc-warn)}\n.bc-pkg .badge{position:absolute;top:-8px;right:6px;background:var(--bc-warn);color:#fff;font-size:10px;font-weight:600;padding:2px 6px;border-radius:6px}\n.bc-inc{list-style:none;padding:0;margin:10px 0 14px}\n.bc-inc li{display:flex;gap:8px;font-size:13px;padding:3px 0}\n.bc-inc li:before{content:'\\2713 ';color:var(--bc-avail);font-weight:700}\n.bc-row{display:flex;justify-content:space-between;gap:10px;font-size:14px;margin:4px 0}\n.bc-row.t{font-weight:600;border-top:1px solid var(--rule);padding-top:6px}\n.bc-actions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}\n.bc-btn{font:inherit;font-size:14px;font-weight:600;border-radius:8px;padding:10px 16px;cursor:pointer;border:1px solid var(--rule);background:var(--panel);color:var(--ink)}\n.bc-btn.primary{background:var(--accent);border-color:var(--accent);color:var(--panel)}\n.bc-quote{width:100%;box-sizing:border-box;min-height:200px;font:inherit;font-size:13px;line-height:1.5;border:1px solid var(--rule);border-radius:8px;padding:10px;background:var(--bg);color:var(--ink);margin-top:8px}\n.bc-who{margin:6px 0 0;padding-left:18px}\n.bc-int{border:1px solid var(--rule);border-radius:8px;padding:10px 12px;margin:0;display:grid;gap:8px}\n.bc-int legend{padding:0 4px;font-size:13px;color:var(--ink-2)}\n.bc-int.bad{border-color:#b5622b;background:#fbeee1}\n.bc-chk{display:flex;gap:8px;align-items:flex-start;font-size:14px;color:var(--ink);cursor:pointer;line-height:1.4}\n.bc-chk input{width:18px;height:18px;margin:1px 0 0;flex:none;accent-color:var(--accent)}\n.stp-cal .bc-f .bc-chk input,.bc-f .bc-chk input{width:18px;height:18px;min-width:18px;padding:0;margin:1px 0 0;border:0;background:none;box-shadow:none;flex:none;-webkit-appearance:checkbox;appearance:auto}\n.bc-int legend{float:none;width:auto}\n\n\n.bc-hrs{display:flex;align-items:center;gap:12px;margin:10px 0 4px}\n.bc-hrs span{font-size:16px}\n.bc-hrs .bc-btn{min-width:44px;padding:8px 0;font-size:18px;line-height:1;text-align:center}\n.bc-hrs .bc-btn[disabled]{opacity:.4;cursor:not-allowed}\n.stp-cal .bc-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.stp-cal .bc-f{display:grid;gap:4px;font-size:13px;color:var(--ink-2);min-width:0}\n.stp-cal .bc-f.w{grid-column:1/-1}\n.stp-cal .bc-f input,.stp-cal .bc-f textarea{font:inherit;font-size:15px;color:var(--ink);background:var(--panel);border:1px solid var(--rule);border-radius:8px;padding:9px 10px;width:100%}\n.stp-cal .bc-f input:focus,.stp-cal .bc-f textarea:focus{outline:2px solid var(--accent);outline-offset:1px}\n.stp-cal .bc-f .bad,.stp-cal .bc-f input.bad,.stp-cal .bc-f textarea.bad{border-color:#b5622b;background:#fbeee1}\n.stp-cal .bc-err{color:#b5622b;font-size:13px;margin:10px 0 0}\n.stp-cal .bc-nodate{margin-top:14px;padding-top:14px;border-top:1px solid var(--rule);display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;text-align:center;font-size:14px;color:var(--ink-2)}\n.stp-cal .bc-nd-btn{font:inherit;font-size:14px;font-weight:600;background:var(--panel);color:var(--accent);border:1px solid var(--accent);border-radius:999px;padding:7px 14px;cursor:pointer}\n.stp-cal .bc-nd-btn:hover{background:var(--accent);color:#fff}\n.stp-cal p.bc-nd-title{margin:6px 0 12px;line-height:1.25}\n.stp-cal p.bc-nd-lede{font-size:14px;line-height:1.6;margin:0 0 18px}\n.stp-cal .bc-from{display:grid;gap:0;margin:0 0 18px;padding:4px 14px;background:var(--bg);border-radius:10px;font-size:14px}\n.stp-cal .bc-from div{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:9px 0;border-bottom:1px solid var(--rule);line-height:1.35}\n.stp-cal .bc-from div span{min-width:0}\n.stp-cal .bc-from div b{white-space:nowrap;flex:none}\n.stp-cal .bc-from p{margin:0;padding:10px 0 8px;font-size:12px;line-height:1.45;color:var(--ink-2)}\n.stp-cal .bc-days{display:grid;grid-template-columns:repeat(4,max-content);gap:8px 22px}\n@media (max-width:420px){.stp-cal .bc-days{grid-template-columns:repeat(2,max-content)}}\n.stp-cal .bc-link{font:inherit;background:none;border:0;padding:0;color:var(--accent);text-decoration:underline;cursor:pointer}\n@media (max-width:480px){.stp-cal .bc-fields{grid-template-columns:1fr}}\n.stp-cal .bc-next{margin-top:14px;padding:12px;border:1px solid var(--rule);border-radius:8px;background:var(--bg);font-size:14px}\n\n";document.head.appendChild(st);
  host.innerHTML="<div class=\"stp-cal\"><div class=\"wrap\">\n  <header>\n    <div class=\"eyebrow\">Stu Tucker Photography</div>\n    <h1>Check your wedding date</h1>\n    <p class=\"lede\">Pick your date to see if I'm available, then choose a package to see the price for that day.</p>\n  </header>\n  <div id=\"bc\" class=\"bc\">\n    <div class=\"panel bc-card\">\n      <div class=\"bc-head\">\n        <button type=\"button\" id=\"bcPrev\" aria-label=\"Previous month\">&#8249;</button>\n        <span class=\"bc-msel\"><select class=\"bc-sel\" id=\"bcMSel\" aria-label=\"Month\"></select><select class=\"bc-sel\" id=\"bcYSel\" aria-label=\"Year\"></select></span><span class=\"bc-month bc-vh\" id=\"bcMonth\" aria-live=\"polite\"></span>\n        <button type=\"button\" id=\"bcNext\" aria-label=\"Next month\">&#8250;</button>\n      </div>\n      <div class=\"bc-grid\" id=\"bcDow\"></div>\n      <div class=\"bc-grid\" id=\"bcGrid\"></div>\n      <div class=\"bc-legend\">\n        <span><i class=\"bc-dot\" style=\"background:var(--bc-avail-bg);box-shadow:inset 0 0 0 1px var(--bc-avail)\"></i>Available</span>\n        <span><i class=\"bc-dot\" style=\"background:var(--bc-booked)\"></i>Booked</span>\n        <span><i class=\"bc-dot\" style=\"background:var(--bc-hol-bg)\"></i>Closed</span>\n      </div>\n      <div class=\"bc-nodate\"><span>Haven't picked a date yet?</span><button type=\"button\" class=\"bc-nd-btn\" id=\"bcNoDate\">We have no date yet</button></div>\n    </div>\n    <div class=\"panel bc-panel\" id=\"bcPanel\" aria-live=\"polite\">\n      <div class=\"bc-step\">Step 1 of 3 &#xb7; Choose a date</div>\n      <p class=\"bc-muted\">Pick an available date to see its packages and prices.</p>\n    </div>\n  </div>\n</div></div>";
})();
// ---------- Book a date (booking calendar) ----------
(()=>{
  const root=document.getElementById("bc"); if(!root) return;
  // "Dates left" banner. YEAR_LIMITS = full days Stu will take that year; YEAR_BOOKED = weddings booked so far (Claude updates this with every new booking).
  const YEAR_LIMITS={2027:53};
  const YEAR_BOOKED={2027:44};
  (()=>{const y=Object.keys(YEAR_LIMITS).map(Number).filter(v=>v>=new Date().getFullYear()).sort()[0]; if(!y) return;
    const left=Math.max(0,YEAR_LIMITS[y]-(YEAR_BOOKED[y]||0)), bk=YEAR_BOOKED[y]||0, el=document.createElement("div"); el.className="bc-banner"; el.setAttribute("role","status");
    el.innerHTML=left>0?'<b>I\'d love to be part of your wedding: just '+left+' full-day date'+(left===1?'':'s')+' left for '+y+'</b><span>'+bk+' couples have already said yes for '+y+'</span><button type="button" class="bc-jump" data-y="'+y+'">See '+y+' dates &rarr;</button>':'<b>My '+y+' full-day dates are now all booked</b><span>I\'d love to hear about your '+(y+1)+' plans</span><button type="button" class="bc-jump" data-y="'+(y+1)+'">See '+(y+1)+' dates &rarr;</button>';
    root.insertBefore(el,root.firstChild);})();
  // Packages, prices and rules carried over from the Booking Calendar artifact.
  const PACKAGES=[
    {name:"NOSTALGIA",price:2750,mid:2550,hours:"12 hours coverage",inc:["You choose start and finish time","Pre wedding video call","12 hours consecutive coverage","800+ digital images","1 roll of 35mm film, professionally developed and scanned","Private online gallery & gallery slideshow","30 digital preview images within 24 hours \"Happy One Day Married\""]},
    {name:"ESSENTIALS",price:2500,mid:2300,seasOff:350,popular:true,hours:"10 hours coverage",inc:["You choose start and finish time","Pre wedding video call","10 hours consecutive coverage","600+ images","Private online gallery & gallery slideshow","30 preview images within 24 hours \"Happy One Day Married\""]},
    {name:"HYBRID PHOTOGRAPHY & VIDEOGRAPHY",price:2800,mid:2500,hours:"10 hours coverage",inc:["You choose start and finish time","Solo shooting","Pre wedding video call","10 hours consecutive coverage","300+ images","A beautiful 3+ minute highlights film filmed in 4K","Personal online space for download","Colour and black and white versions of your highlights video","10 next day images \"Happy One Day Married\""]},
    {name:"ELOPE",price:650,hours:"Up to 2 hours coverage",inc:["Perfect for Registry Offices","You choose start and finish time","Pre wedding video call","Up to 2 hours coverage","150+ images","Private online gallery & gallery slideshow","10 next day previews \"Happy One Day Married\""]},
    {name:"BESPOKE BY THE HOUR WEDDING PHOTOGRAPHY",hourly:true,hours:"By the hour",inc:["You choose start and finish time","Pre wedding video call","Consecutive coverage for the hours you choose","Private online gallery & gallery slideshow"]}
  ];
  const DISCOUNT_MONTHS=[0,1,10,11], DISCOUNT=200;           // \u00a3200 off (not Elope) in Jan, Feb, Nov, Dec
  const CLOSED=[[11,24],[11,25],[11,26]];                      // Christmas Eve, Day, Boxing Day
  const SCHOOL_CLOSED=["2027-02-13","2027-02-14","2027-02-15","2027-02-16","2027-02-17","2027-02-18","2027-02-19","2027-02-20","2027-02-21"];  // school-holiday dates ticked in the dashboard Half term tab (kept in sync by Claude each morning)
  const OWN_CLOSED=["2027-06-02","2027-06-03","2027-06-04","2027-08-01","2027-08-02","2027-08-03","2027-08-04","2027-08-05","2027-08-06","2027-08-07","2027-08-08","2027-08-09","2027-08-10","2027-08-11","2027-08-12","2027-08-13","2027-08-14","2027-08-15","2027-08-16","2027-08-17","2027-08-18","2027-08-19","2027-08-20","2027-08-21","2027-08-22","2027-08-23"];  // your own holiday dates ticked in the dashboard Holidays tab (kept in sync by Claude)
  const HOLIDAYS=new Set([...SCHOOL_CLOSED,...OWN_CLOSED]);                                  // add "YYYY-MM-DD" dates you're away
  // Booked dates come from the dashboard's own bookings list.
  const BOOKED=new Set(["2026-10-25", "2026-10-29", "2026-10-31", "2026-11-07", "2026-11-12", "2026-11-21", "2026-12-02", "2026-12-18", "2026-12-20", "2026-12-28", "2026-12-29", "2026-12-30", "2027-02-26", "2027-03-14", "2027-03-25", "2027-03-27", "2027-03-28", "2027-04-01", "2027-04-24", "2027-04-25", "2027-05-01", "2027-05-04", "2027-05-09", "2027-05-22", "2027-05-26", "2027-05-27", "2027-05-28", "2027-05-29", "2027-05-31", "2027-06-01", "2027-06-05", "2027-06-12", "2027-06-17", "2027-06-18", "2027-06-21", "2027-06-26", "2027-07-01", "2027-07-07", "2027-07-15", "2027-07-17", "2027-07-23", "2027-07-24", "2027-07-29", "2027-07-31", "2027-08-27", "2027-08-28", "2027-09-01", "2027-09-04", "2027-09-10", "2027-09-17", "2027-09-24", "2027-10-01", "2027-10-09", "2027-10-14", "2027-11-06", "2027-11-11", "2027-12-03", "2028-03-18", "2028-04-22", "2028-06-01", "2028-08-08"]);
  const pad=n=>String(n).padStart(2,"0");
  const key=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
  const today=(()=>{const d=new Date();d.setHours(0,0,0,0);return d;})();
  // ---------- Anonymous activity tracking (GoatCounter, no cookies, no personal details) ----------
  // Put your GoatCounter code here (the bit before .goatcounter.com). Leave empty to switch tracking off.
  const GOATCOUNTER="stutucker";
  // Open the calendar page with #stu-notrack on the end of the address to stop (or restart) counting your own visits on that browser.
  let gcMsg="";try{if(location.hash==="#stu-notrack"){const off=localStorage.getItem("skipgc")==="t";if(off)localStorage.removeItem("skipgc");else localStorage.setItem("skipgc","t");
    gcMsg=off?"Visit tracking is back ON for this browser.":"Visit tracking is now OFF for this browser, so your own visits won't be counted. Open this page with #stu-notrack again to turn it back on.";}}catch(e){}
  const skipMe=(()=>{try{return localStorage.getItem("skipgc")==="t";}catch(e){return false;}})();
  const track=(()=>{if(!GOATCOUNTER||skipMe)return()=>{};const q=[],sent=new Set();
    const flush=()=>{const gc=window.goatcounter;if(!gc||!gc.count)return;while(q.length){try{gc.count(q.shift());}catch(e){}}};
    if(!window.goatcounter||!window.goatcounter.count){window.goatcounter=Object.assign(window.goatcounter||{},{no_onload:true});
      const s=document.createElement("script");s.async=true;s.src="https://gc.zgo.at/count.js";s.setAttribute("data-goatcounter","https://"+GOATCOUNTER+".goatcounter.com/count");s.onload=flush;document.head.appendChild(s);}
    return(path,title,once)=>{try{if(localStorage.getItem("skipgc")==="t")return;}catch(e){}if(once){if(sent.has(path))return;sent.add(path);}q.push({path:"cal/"+path,title:title||path,event:true});flush();};})();
  const isMid=d=>{const w=d.getDay();return w>=1&&w<=4;};
  const ord=n=>{const s=["th","st","nd","rd"],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);};
  const full=d=>d.toLocaleDateString("en-GB",{weekday:"long"})+" "+ord(d.getDate())+" "+d.toLocaleDateString("en-GB",{month:"long"})+" "+d.getFullYear();
  const gbp=n=>"\u00a3"+n.toLocaleString("en-GB");
  const closed=d=>CLOSED.some(([m,x])=>d.getMonth()===m&&d.getDate()===x);
  // Bespoke by the hour: price for each number of hours. Capped at 8 so it never undercuts Essentials (10 hrs) or Nostalgia (12 hrs).
  // Elope is not available on Fridays and Saturdays in peak season (April to October).
  const PEAK_MONTHS=[3,4,5,6,7,8,9];
  const elopePeak=d=>PEAK_MONTHS.includes(d.getMonth())&&(d.getDay()===5||d.getDay()===6);
  const HOURLY={prices:{2:650,3:940,4:1225,5:1515,6:1800,7:1900,8:2000},firstHrs:2,max:8,weekendMin:6};
  const isWknd=d=>{const w=d.getDay();return w===0||w===5||w===6;};   // Fri, Sat, Sun
  function price(p,d,h){if(!p.hourly)return basePrice(p,d);const min=isWknd(d)?HOURLY.weekendMin:HOURLY.firstHrs;h=Math.min(HOURLY.max,Math.max(min,h||min));const f=HOURLY.prices[h];return{base:f,final:f,seas:false,off:0,mid:false,hourly:true,h,min};}
  const plabel=(p,r)=>p.name+(r.hourly?" ("+r.h+" hours)":"")+(r.mid?" (midweek rate)":"");
  function basePrice(p,d){const base=(isMid(d)&&p.mid!=null)?p.mid:p.price;const seas=p.name!=="ELOPE"&&DISCOUNT_MONTHS.includes(d.getMonth());const off=seas?(p.seasOff||DISCOUNT):0;return{base,final:base-off,seas,off,mid:isMid(d)&&p.mid!=null};}
  // Family shoots only block their date once they're 7 days away or less.
  const FAMILY={"2026-10-24":"Tiffany Webb","2026-11-13":"Rubie Seaman","2026-11-14":"Steve Dennis"};
  const FAMILY_BLOCK_DAYS=7;
  const famBlocked=(k,d)=>FAMILY[k]&&Math.round((d-today)/864e5)<=FAMILY_BLOCK_DAYS;
  const FORMPKG={"NOSTALGIA":"Nostalgia - 12 Hours","ESSENTIALS":"Essentials - 10 Hours","LOW KEY":"Low Key - 8 Hours","MINI LUXE":"Mini Luxe - 6 Hours","HYBRID PHOTOGRAPHY & VIDEOGRAPHY":"Hybrid Photography & Videography - 10 Hours","ELOPE":"Elope - Up to 2 Hours"};
  const dmy=d=>pad(d.getDate())+"/"+pad(d.getMonth()+1)+"/"+d.getFullYear();
  const FORMSPREE="https://formspree.io/f/xkjgvpvd";
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  function form(d,p,r){
    const F=[["first","First name","text","given-name"],["last","Last name","text","family-name"],["partner","Partner's full name","text",""],["venue","Wedding venue","text",""],["email","Email","email","email"],["mobile","Mobile number","tel","tel"]];
    panel.innerHTML='<div class="bc-step">Your details</div><p class="bc-date">'+full(d)+'</p><div class="bc-muted" style="font-size:13px;margin:-6px 0 12px">'+plabel(p,r)+' \u00b7 '+gbp(r.final)+' \u00b7 <button type="button" class="bc-link" id="bcChange">change</button></div>'+
      '<form id="bcForm" novalidate><div class="bc-fields">'+F.map(([n,l,t,a])=>'<label class="bc-f'+(n==="partner"||n==="venue"||n==="email"||n==="mobile"?" w":"")+'"><span>'+l+' *</span><input name="'+n+'" type="'+t+'"'+(a?' autocomplete="'+a+'"':"")+' required></label>').join("")+
      '<fieldset class="bc-f w bc-int" id="bcInt"><legend>What would you like to do? *</legend><label class="bc-chk"><input type="checkbox" name="intent" value="We have reviewed your portfolio and would like to book for our date"> We have reviewed your portfolio and would like to book for our date</label><label class="bc-chk"><input type="checkbox" name="intent" value="We have some questions and will put them below"> We have some questions and will put them below</label></fieldset>'+'<label class="bc-f w"><span>How are your plans coming along? Ask me anything *</span><textarea name="message" rows="4" required></textarea></label></div>'+
      '<p class="bc-muted" style="font-size:12px;margin:8px 0 0">I reply to every enquiry personally, so please check your junk folder for my reply.</p>'+
      '<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">'+
      '<p class="bc-err" id="bcErr" role="alert" hidden></p><div class="bc-actions"><button type="button" class="bc-btn" id="bcBack2">Back</button><button type="submit" class="bc-btn primary" id="bcSend">Send enquiry</button></div></form>';
    document.getElementById("bcChange").onclick=()=>pick(d);
    document.getElementById("bcBack2").onclick=()=>detail(d,p,r.h);
    const fm=document.getElementById("bcForm"), err=document.getElementById("bcErr"), btn=document.getElementById("bcSend");
    fm.addEventListener("input",e=>{e.target.classList.remove("bad");track("form/typing","Started filling in the form",true);});
    fm.onsubmit=async e=>{e.preventDefault();
      const v=Object.fromEntries(new FormData(fm).entries()); let first=null;
      fm.querySelectorAll("[required]").forEach(el=>{const bad=!el.value.trim()||(el.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));el.classList.toggle("bad",bad);if(bad&&!first)first=el;});
      const intents=[...fm.querySelectorAll('input[name="intent"]:checked')].map(x=>x.value), ib=document.getElementById("bcInt");
      ib.classList.toggle("bad",!intents.length); if(!intents.length&&!first)first=ib.querySelector("input");
      if(first){err.textContent="Please fill in the highlighted fields.";err.hidden=false;first.focus();return;}
      if(v._gotcha)return;
      err.hidden=true;btn.disabled=true;btn.textContent="Sending\u2026";
      try{const res=await fetch(FORMSPREE,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({
          _subject:"New wedding enquiry: "+full(d)+" \u00b7 "+plabel(p,r), _replyto:v.email.trim(),
          "Wedding date":full(d), "Package":plabel(p,r), "Price quoted":gbp(r.final)+(r.seas?" (incl. "+gbp(r.off)+" seasonal discount)":""),
          "First name":v.first.trim(),"Last name":v.last.trim(),"Partner":v.partner.trim(),"Venue":v.venue.trim(),"Email":v.email.trim(),"Mobile":v.mobile.trim(),"What they would like to do":intents.join(" / "),"Message":v.message.trim()})});
        if(!res.ok)throw new Error(res.status);
        track("form/sent","Enquiry sent",true);
        panel.innerHTML='<div class="bc-step">Enquiry sent</div><p class="bc-date">Thank you, '+esc(v.first.trim())+'!</p><p class="bc-muted">Your enquiry for <b>'+full(d)+'</b> ('+p.name+') is with me. I\'ll be in touch personally by email, and I\'ll drop you a WhatsApp and text too so you know it\'s on its way. Do keep an eye on your junk folder just in case.</p>';
      }catch(x){btn.disabled=false;btn.textContent="Send enquiry";err.textContent="Sorry, that didn't send. Please try again, or email hello@stutuckerphotography.co.uk.";err.hidden=false;}
    };
    fm.querySelector("input").focus();
  }
  // ---------- No date booked yet ----------
  const fromPrice=p=>p.hourly?HOURLY.prices[HOURLY.firstHrs]:Math.min(p.price,p.mid!=null?p.mid:p.price)-(p.name==="ELOPE"?0:(p.seasOff||DISCOUNT));
  function nodate(){
    track("form/nodate-opened","No date yet form opened",true);
    const F=[["first","First name","text","given-name"],["last","Last name","text","family-name"],["partner","Partner's full name","text",""],["email","Email","email","email"],["mobile","Mobile number","tel","tel"]];
    const pn=n=>({"HYBRID PHOTOGRAPHY & VIDEOGRAPHY":"Hybrid photo & video","BESPOKE BY THE HOUR WEDDING PHOTOGRAPHY":"Bespoke, by the hour"})[n]||(n.charAt(0)+n.slice(1).toLowerCase());
    const from=PACKAGES.map(p=>'<div><span>'+pn(p.name)+'</span><b>from '+gbp(fromPrice(p))+'</b></div>').join("");
    panel.innerHTML='<div class="bc-step">No date booked yet</div><p class="bc-date bc-nd-title">Tell me roughly when</p><p class="bc-muted bc-nd-lede">No problem at all. Let me know roughly when you\'re thinking and I\'ll come back to you with the dates I have free and the prices for them.</p>'+
      '<div class="bc-from">'+from+'<p>Exact prices depend on the day: midweek dates and November to February weddings cost less.</p></div>'+
      '<form id="bcNdForm" novalidate><div class="bc-fields">'+F.map(([n,l,t,a])=>'<label class="bc-f'+(n==="partner"||n==="email"||n==="mobile"?" w":"")+'"><span>'+l+' *</span><input name="'+n+'" type="'+t+'"'+(a?' autocomplete="'+a+'"':"")+' required></label>').join("")+
      '<label class="bc-f w"><span>Roughly when? *</span><input name="when" type="text" placeholder="e.g. Summer 2027" required></label>'+
      '<fieldset class="bc-f w bc-int" id="bcNdDays"><legend>Which day of the week are you thinking?</legend><div class="bc-days">'+["Midweek","Friday","Saturday","Sunday"].map(d=>'<label class="bc-chk"><input type="checkbox" name="days" value="'+d+'"> '+d+'</label>').join("")+'</div></fieldset>'+
      '<label class="bc-f w"><span>Venue</span><input name="venue" type="text" placeholder="Venue name, or \'Still looking\'"></label>'+
      '<label class="bc-f w"><span>Anything else you\'d like to tell me or ask?</span><textarea name="message" rows="3"></textarea></label></div>'+
      '<p class="bc-muted" style="font-size:12px;margin:8px 0 0">I reply to every enquiry personally, so please check your junk folder for my reply.</p>'+
      '<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">'+
      '<p class="bc-err" id="bcNdErr" role="alert" hidden></p><div class="bc-actions"><button type="button" class="bc-btn" id="bcNdBack">Back</button><button type="submit" class="bc-btn primary" id="bcNdSend">Send enquiry</button></div></form>';
    document.getElementById("bcNdBack").onclick=intro;
    const fm=document.getElementById("bcNdForm"),err=document.getElementById("bcNdErr"),btn=document.getElementById("bcNdSend");
    fm.addEventListener("input",e=>{e.target.classList.remove("bad");track("form/nodate-typing","No date yet form: started typing",true);});
    fm.onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(fm).entries());let first=null;
      fm.querySelectorAll("[required]").forEach(el=>{const bad=!el.value.trim()||(el.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));el.classList.toggle("bad",bad);if(bad&&!first)first=el;});
      if(first){err.textContent="Please fill in the highlighted fields.";err.hidden=false;first.focus();return;}
      if(v._gotcha)return;const days=[...fm.querySelectorAll('input[name="days"]:checked')].map(x=>x.value);
      err.hidden=true;btn.disabled=true;btn.textContent="Sending…";
      try{const res=await fetch(FORMSPREE,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({
          _subject:"No date yet: "+v.when.trim()+(days.length?" · "+days.join(", "):""),_replyto:v.email.trim(),
          "Wedding date":"No date booked yet","Roughly when":v.when.trim(),"Day of the week":days.join(", ")||"Not given",
          "First name":v.first.trim(),"Last name":v.last.trim(),"Partner":v.partner.trim(),"Venue":(v.venue||"").trim()||"Not given","Email":v.email.trim(),"Mobile":v.mobile.trim(),"Message":(v.message||"").trim()})});
        if(!res.ok)throw new Error(res.status);track("form/nodate-sent","No date yet enquiry sent",true);
        panel.innerHTML='<div class="bc-step">Enquiry sent</div><p class="bc-date">Thank you, '+esc(v.first.trim())+'!</p><p class="bc-muted">I\'ll be in touch personally by email with the dates I have free around <b>'+esc(v.when.trim())+'</b>, and I\'ll drop you a WhatsApp and text too so you know it\'s on its way. Do keep an eye on your junk folder just in case.</p>';
      }catch(x){btn.disabled=false;btn.textContent="Send enquiry";err.textContent="Sorry, that didn't send. Please try again, or email hello@stutuckerphotography.co.uk.";err.hidden=false;}};
    fm.querySelector("input").focus();
    if(panel.scrollIntoView)panel.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function intro(){sel=null;render();panel.innerHTML='<div class="bc-step">Step 1 of 3 · Choose a date</div><p class="bc-muted">Pick an available date to see its packages and prices.</p><p class="bc-muted" style="margin-top:10px">No date yet? <button type="button" class="bc-link" id="bcNoDate2">Tell me roughly when</button></p>';document.getElementById("bcNoDate2").onclick=nodate;}
  let month=new Date(today.getFullYear(),today.getMonth(),1), sel=null;
  const grid=document.getElementById("bcGrid"), panel=document.getElementById("bcPanel");
  document.getElementById("bcDow").innerHTML=["M","T","W","T","F","S","S"].map(d=>'<div class="bc-dow">'+d+'</div>').join("");
  const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const mSel=document.getElementById("bcMSel"), ySel=document.getElementById("bcYSel");
  if(mSel&&ySel){
    for(let y=today.getFullYear();y<=today.getFullYear()+3;y++)ySel.insertAdjacentHTML("beforeend",'<option value="'+y+'">'+y+'</option>');
    const go=()=>{month=new Date(+ySel.value,+mSel.value,1);render();};mSel.onchange=go;ySel.onchange=go;}
  function render(){
    const minM=new Date(today.getFullYear(),today.getMonth(),1); if(month<minM)month=new Date(minM);   // no going back before this month
    document.getElementById("bcPrev").disabled=month.getTime()===minM.getTime();
    document.getElementById("bcMonth").textContent=month.toLocaleDateString("en-GB",{month:"long",year:"numeric"});
    if(mSel&&ySel){const yy=month.getFullYear();if(!ySel.querySelector('option[value="'+yy+'"]')){ySel.insertAdjacentHTML("beforeend",'<option value="'+yy+'">'+yy+'</option>');[...ySel.options].sort((a,b)=>a.value-b.value).forEach(o=>ySel.appendChild(o));}const first=yy===today.getFullYear()?today.getMonth():0;if(mSel.dataset.first!==String(first)){mSel.dataset.first=String(first);mSel.innerHTML=MONTHS.slice(first).map((n,i)=>'<option value="'+(i+first)+'">'+n+'</option>').join("");}mSel.value=String(month.getMonth());ySel.value=String(yy);}
    const y=month.getFullYear(),m=month.getMonth(),off=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate();
    let h="";for(let i=0;i<off;i++)h+='<div class="bc-day empty"></div>';
    for(let d=1;d<=n;d++){const dt=new Date(y,m,d),k=key(dt);let c="bc-day",t="",a="";
      if(dt<today)c+=" past";
      else if(BOOKED.has(k)||famBlocked(k,dt)){c+=" booked";t="Booked";}
      else if(closed(dt)||HOLIDAYS.has(k)){c+=" hol";t="Closed";}
      else{c+=" avail";a=' data-k="'+k+'"';t="Available";}
      if(k===key(today))c+=" today"; if(k===sel)c+=" sel";
      h+=(a?'<button type="button"':'<div')+' class="'+c+'" title="'+t.replace(/"/g,"&quot;")+'" aria-label="'+full(dt)+", "+t.replace(/"/g,"&quot;")+'"'+a+'>'+d+(a?'</button>':'</div>');}
    grid.innerHTML=h;
    grid.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{sel=b.dataset.k;render();const dt=new Date(sel+"T00:00:00");track("date/"+sel,"Date checked: "+full(dt),true);pick(dt);});
  }
  function pick(d){
    const cards=PACKAGES.map((p,i)=>{const r=price(p,d),blocked=p.name==="ELOPE"&&elopePeak(d);
      return '<button type="button" class="bc-pkg" data-i="'+i+'"'+(blocked?" disabled":"")+'>'+(p.popular?'<span class="badge">MOST POPULAR</span>':"")+'<b>'+p.name+'</b><span class="p">'+(r.seas?'<s style="opacity:.55;font-weight:400">'+gbp(r.base)+'</s> ':"")+(p.hourly?"from ":"")+gbp(r.final)+'</span><span class="n">'+(p.hourly?r.min+"\u2013"+HOURLY.max+" hours":p.hours)+'</span>'+(r.mid?'<span class="g">midweek rate</span>':"")+(r.seas?'<span class="g">'+gbp(r.off)+' seasonal discount</span>':"")+(blocked?'<span class="w">not available for this date</span>':"")+'</button>';}).join("");
    panel.innerHTML='<div class="bc-step">Step 2 of 3 \u00b7 Choose a package</div><p class="bc-date">'+full(d)+(isMid(d)?" \u00b7 midweek":"")+'</p><div class="bc-pkgs">'+cards+'</div>';
    panel.querySelectorAll(".bc-pkg:not([disabled])").forEach(b=>b.onclick=()=>{const pk=PACKAGES[+b.dataset.i];track("package/"+pk.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),"Package viewed: "+pk.name,true);detail(d,pk);});
  }
  function detail(d,p,h){
    const r=price(p,d,h);
    let rows=r.hourly?'<div class="bc-row"><span>'+r.h+' hours of coverage</span><span>'+gbp(r.final)+'</span></div>':'<div class="bc-row"><span>'+plabel(p,r)+'</span><span>'+gbp(r.base)+'</span></div>';
    if(r.seas)rows+='<div class="bc-row" style="color:var(--bc-avail)"><span>Seasonal discount</span><span>\u2212'+gbp(r.off)+'</span></div>';
    rows+='<div class="bc-row t"><span>Total</span><span>'+gbp(r.final)+'</span></div>';
    panel.innerHTML='<div class="bc-step">Step 3 of 3 \u00b7 Your package</div><p class="bc-date">'+full(d)+'</p><div style="font-weight:600">'+p.name+'</div>'+(r.hourly?'<div class="bc-hrs"><button type="button" class="bc-btn" id="bcMinus" aria-label="Fewer hours">\u2212</button><span><b>'+r.h+'</b> hours</span><button type="button" class="bc-btn" id="bcPlus" aria-label="More hours">+</button></div><div class="bc-muted" style="font-size:12px">'+r.min+' hour minimum '+(isWknd(d)?'on Fridays, Saturdays and Sundays':'on this date')+', up to '+HOURLY.max+' hours. Need longer? Essentials (10 hours) or Nostalgia (12 hours) is better value.</div>':'<div class="bc-muted" style="font-size:13px">'+p.hours+'</div>')+'<ul class="bc-inc">'+p.inc.map(x=>"<li>"+x+"</li>").join("")+'</ul>'+rows+
      '<div class="bc-actions"><button type="button" class="bc-btn" id="bcBack">Back</button><button type="button" class="bc-btn primary" id="bcGo">Enquire about this date</button></div>';
    document.getElementById("bcBack").onclick=()=>pick(d);
    if(r.hourly){const mi=document.getElementById("bcMinus"),pl=document.getElementById("bcPlus");mi.disabled=r.h<=r.min;pl.disabled=r.h>=HOURLY.max;mi.onclick=()=>detail(d,p,r.h-1);pl.onclick=()=>detail(d,p,r.h+1);}
    document.getElementById("bcGo").onclick=()=>{track("form/started","Enquiry form opened",true);form(d,p,r);};
  }
  document.getElementById("bcPrev").onclick=()=>{month.setMonth(month.getMonth()-1);render();};
  document.getElementById("bcNext").onclick=()=>{month.setMonth(month.getMonth()+1);render();};
  root.addEventListener("click",e=>{const b=e.target.closest(".bc-jump");if(!b)return;month=new Date(+b.dataset.y,0,1);render();const g=document.getElementById("bcGrid");if(g&&g.scrollIntoView)g.scrollIntoView({behavior:"smooth",block:"center"});});
  let sx=null;grid.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;},{passive:true});
  grid.addEventListener("touchend",e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40){month.setMonth(month.getMonth()+(dx>0?-1:1));render();}sx=null;},{passive:true});
  render();intro();
  document.getElementById("bcNoDate").onclick=nodate;
  track("opened","Calendar opened",true);
  const host=document.getElementById("stu-calendar")||document.body;
  const gcShow=t=>{let m=document.getElementById("stu-gc-msg");if(!m){m=document.createElement("div");m.id="stu-gc-msg";m.style.cssText="margin:0 auto 12px;max-width:720px;padding:10px 14px;border-radius:8px;background:#2F5D4E;color:#fff;font:600 14px/1.4 Manrope,system-ui,sans-serif;text-align:center";host.insertBefore(m,host.firstChild);}m.textContent=t;};
  if(gcMsg)gcShow(gcMsg);
  // Hidden switch for Stu: tap "STU TUCKER PHOTOGRAPHY" at the top of the calendar 5 times quickly to stop (or restart) counting your own visits on this device.
  (()=>{const eb=host.querySelector(".eyebrow");if(!eb)return;let n=0,t=0;eb.addEventListener("click",()=>{const now=Date.now();n=now-t<1500?n+1:1;t=now;if(n<5)return;n=0;
    try{const off=localStorage.getItem("skipgc")==="t";if(off)localStorage.removeItem("skipgc");else localStorage.setItem("skipgc","t");
      gcShow(off?"Visit tracking is back ON for this device.":"Visit tracking is now OFF for this device, so your own visits won't be counted. Tap STU TUCKER PHOTOGRAPHY 5 times again to turn it back on.");}
    catch(e){gcShow("This browser won't let the calendar remember that setting.");}});})();
})();

