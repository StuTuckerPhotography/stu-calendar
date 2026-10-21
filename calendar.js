/* Stu Tucker Photography - wedding date calendar.
   Loaded on the website by:  <div id="stu-calendar"></div><script src="https://stutuckerphotography.github.io/stu-calendar/calendar.js"></script>
   Edit this file (dates, prices, rules) and the website updates automatically. */
(function(){
  var host=document.getElementById("stu-calendar");
  if(!host){host=document.createElement("div");host.id="stu-calendar";var s=document.currentScript;if(s&&s.parentNode)s.parentNode.insertBefore(host,s);else document.body.appendChild(host);}
  if(host.getAttribute("data-ready"))return; host.setAttribute("data-ready","1");
  if(!document.getElementById("stu-cal-font")){var l=document.createElement("link");l.id="stu-cal-font";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Manrope:wght@400;600&display=swap";document.head.appendChild(l);}
  var st=document.createElement("style");st.textContent="\n.stp-cal{--bg:#F4F3EF;--panel:#FFFFFF;--ink:#1F2622;--ink-2:#56605A;--muted:#7C847E;--rule:#DEDDD6;--grid:#E9E8E2;--accent:#2F5D4E}\n.stp-cal,.stp-cal *{box-sizing:border-box}\n.stp-cal,.stp-cal p,.stp-cal div,.stp-cal span,.stp-cal button,.stp-cal label,.stp-cal input,.stp-cal textarea,.stp-cal li{font-family:\"Manrope\",system-ui,-apple-system,\"Segoe UI\",sans-serif;text-align:left;letter-spacing:normal;text-transform:none}\n.stp-cal p{margin:0;line-height:1.5}\n.stp-cal .eyebrow,.stp-cal .bc-step{text-transform:uppercase;letter-spacing:.12em}\n.stp-cal .bc-dow,.stp-cal .bc-day{text-align:center}\n.stp-cal h1{text-align:left;letter-spacing:normal;text-transform:none}\n.stp-cal button{line-height:1.2;min-height:0;text-shadow:none;box-shadow:none}\n.stp-cal{background:var(--bg);border-radius:12px;color:var(--ink);font-family:\"Manrope\",system-ui,-apple-system,\"Segoe UI\",sans-serif;font-size:15px;line-height:1.5}\n.stp-cal .wrap{max-width:1000px;margin:0 auto;padding:40px 16px 60px;display:grid;gap:20px}\n.stp-cal .eyebrow{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-2)}\n.stp-cal h1{font-family:\"Cormorant Garamond\",Georgia,serif;font-weight:600;font-size:clamp(32px,6vw,46px);line-height:1.05;margin:6px 0 0}\n.stp-cal .lede{color:var(--ink-2);max-width:62ch;margin:10px 0 0}\n.stp-cal .panel{background:var(--panel);border:1px solid var(--rule);border-radius:10px;padding:20px;min-width:0}\n.stp-cal a.bc-btn{text-decoration:none;display:inline-flex;align-items:center}\n.stp-cal .back{color:var(--ink-2);font-size:14px}\n.bc{--bc-avail:#2f6b4f;--bc-avail-bg:#eaf3ee;--bc-booked:#9a948a;--bc-booked-bg:#ecebe6;--bc-hol:#7a6ba8;--bc-hol-bg:#ece7f5;--bc-warn:#b5622b;display:grid;gap:16px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}\n@media (max-width:820px){.bc{grid-template-columns:minmax(0,1fr)}}\n.bc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}\n.bc-head button{border:0;background:none;font-size:22px;line-height:1;cursor:pointer;color:var(--ink);width:36px;height:36px;border-radius:8px}\n.bc-head button:hover{background:var(--grid)}\n.bc-month{font-weight:600;font-size:16px}\n.bc-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}\n.bc-dow{text-align:center;font-size:11px;color:var(--muted);padding-bottom:6px}\n.bc-day{aspect-ratio:1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;border:0;font:inherit;background:none;color:var(--ink);padding:0}\n.bc-day.empty{visibility:hidden}\n.bc-day.past{color:var(--muted);opacity:.5}\n.bc-day.avail{background:var(--bc-avail-bg);color:var(--bc-avail);cursor:pointer;font-weight:600}\n.bc-day.booked{background:var(--bc-booked-bg);color:var(--bc-booked);text-decoration:line-through;cursor:pointer}\n.bc-day.hol{background:var(--bc-hol-bg);color:var(--bc-hol);text-decoration:line-through}\n.bc-day.sel{outline:2px solid var(--ink);outline-offset:-2px}\n.bc-day.today{box-shadow:inset 0 0 0 2px var(--ink)}\n.bc-day:focus-visible{outline:2px solid var(--accent);outline-offset:1px}\n.bc-legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;font-size:12px;color:var(--ink-2)}\n.bc-legend span{display:inline-flex;align-items:center;gap:6px}\n.bc-dot{width:10px;height:10px;border-radius:3px;display:inline-block}\n.bc-step{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}\n.bc-muted{color:var(--ink-2);margin:0}\n.bc-date{font-weight:600;font-size:15px;margin:0 0 10px}\n.bc-pkgs{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n.bc-pkg{position:relative;text-align:left;border:1px solid var(--rule);border-radius:8px;padding:10px;background:var(--panel);color:var(--ink);font:inherit;font-size:13px;cursor:pointer}\n.bc-pkg:hover{border-color:var(--accent)}\n.bc-pkg[disabled]{opacity:.45;cursor:not-allowed}\n.bc-pkg b{display:block;font-size:12px;letter-spacing:.02em;margin-bottom:2px}\n.bc-pkg .p{font-weight:600}\n.bc-pkg .n{display:block;font-size:11px;color:var(--ink-2)}\n.bc-pkg .g{display:block;font-size:11px;color:var(--bc-avail)}\n.bc-pkg .w{display:block;font-size:11px;color:var(--bc-warn)}\n.bc-pkg .badge{position:absolute;top:-8px;right:6px;background:var(--bc-warn);color:#fff;font-size:10px;font-weight:600;padding:2px 6px;border-radius:6px}\n.bc-inc{list-style:none;padding:0;margin:10px 0 14px}\n.bc-inc li{display:flex;gap:8px;font-size:13px;padding:3px 0}\n.bc-inc li:before{content:'\\2713 ';color:var(--bc-avail);font-weight:700}\n.bc-row{display:flex;justify-content:space-between;gap:10px;font-size:14px;margin:4px 0}\n.bc-row.t{font-weight:600;border-top:1px solid var(--rule);padding-top:6px}\n.bc-actions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}\n.bc-btn{font:inherit;font-size:14px;font-weight:600;border-radius:8px;padding:10px 16px;cursor:pointer;border:1px solid var(--rule);background:var(--panel);color:var(--ink)}\n.bc-btn.primary{background:var(--accent);border-color:var(--accent);color:var(--panel)}\n.bc-quote{width:100%;box-sizing:border-box;min-height:200px;font:inherit;font-size:13px;line-height:1.5;border:1px solid var(--rule);border-radius:8px;padding:10px;background:var(--bg);color:var(--ink);margin-top:8px}\n.bc-who{margin:6px 0 0;padding-left:18px}\n.bc-hrs{display:flex;align-items:center;gap:12px;margin:10px 0 4px}\n.bc-hrs span{font-size:16px}\n.bc-hrs .bc-btn{min-width:44px;padding:8px 0;font-size:18px;line-height:1;text-align:center}\n.bc-hrs .bc-btn[disabled]{opacity:.4;cursor:not-allowed}\n.stp-cal .bc-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.stp-cal .bc-f{display:grid;gap:4px;font-size:13px;color:var(--ink-2);min-width:0}\n.stp-cal .bc-f.w{grid-column:1/-1}\n.stp-cal .bc-f input,.stp-cal .bc-f textarea{font:inherit;font-size:15px;color:var(--ink);background:var(--panel);border:1px solid var(--rule);border-radius:8px;padding:9px 10px;width:100%}\n.stp-cal .bc-f input:focus,.stp-cal .bc-f textarea:focus{outline:2px solid var(--accent);outline-offset:1px}\n.stp-cal .bc-f .bad,.stp-cal .bc-f input.bad,.stp-cal .bc-f textarea.bad{border-color:#b5622b;background:#fbeee1}\n.stp-cal .bc-err{color:#b5622b;font-size:13px;margin:10px 0 0}\n.stp-cal .bc-link{font:inherit;background:none;border:0;padding:0;color:var(--accent);text-decoration:underline;cursor:pointer}\n@media (max-width:480px){.stp-cal .bc-fields{grid-template-columns:1fr}}\n.stp-cal .bc-next{margin-top:14px;padding:12px;border:1px solid var(--rule);border-radius:8px;background:var(--bg);font-size:14px}\n\n";document.head.appendChild(st);
  host.innerHTML="<div class=\"stp-cal\"><div class=\"wrap\">\n  <header>\n    <div class=\"eyebrow\">Stu Tucker Photography</div>\n    <h1>Check your wedding date</h1>\n    <p class=\"lede\">Pick your date to see if I'm available, then choose a package to see the price for that day.</p>\n  </header>\n  <div id=\"bc\" class=\"bc\">\n    <div class=\"panel bc-card\">\n      <div class=\"bc-head\">\n        <button type=\"button\" id=\"bcPrev\" aria-label=\"Previous month\">&#8249;</button>\n        <span class=\"bc-month\" id=\"bcMonth\"></span>\n        <button type=\"button\" id=\"bcNext\" aria-label=\"Next month\">&#8250;</button>\n      </div>\n      <div class=\"bc-grid\" id=\"bcDow\"></div>\n      <div class=\"bc-grid\" id=\"bcGrid\"></div>\n      <div class=\"bc-legend\">\n        <span><i class=\"bc-dot\" style=\"background:var(--bc-avail)\"></i>Available</span>\n        <span><i class=\"bc-dot\" style=\"background:var(--bc-booked)\"></i>Booked</span>\n        <span><i class=\"bc-dot\" style=\"background:var(--bc-hol)\"></i>Closed</span>\n      </div>\n    </div>\n    <div class=\"panel bc-panel\" id=\"bcPanel\" aria-live=\"polite\">\n      <div class=\"bc-step\">Step 1 of 3 &#xb7; Choose a date</div>\n      <p class=\"bc-muted\">Pick an available date to see its packages and prices.</p>\n    </div>\n  </div>\n</div></div>";
})();
// ---------- Book a date (booking calendar) ----------
(()=>{
  const root=document.getElementById("bc"); if(!root) return;
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
  const HOLIDAYS=new Set([]);                                  // add "YYYY-MM-DD" dates you're away
  // Booked dates come from the dashboard's own bookings list.
  const BOOKED=new Set(["2026-10-25", "2026-10-29", "2026-10-31", "2026-11-07", "2026-11-12", "2026-11-21", "2026-12-02", "2026-12-18", "2026-12-20", "2026-12-28", "2026-12-29", "2026-12-30", "2027-02-26", "2027-03-14", "2027-03-25", "2027-03-27", "2027-03-28", "2027-04-01", "2027-04-24", "2027-04-25", "2027-05-01", "2027-05-04", "2027-05-09", "2027-05-22", "2027-05-26", "2027-05-27", "2027-05-28", "2027-05-29", "2027-05-31", "2027-06-01", "2027-06-05", "2027-06-12", "2027-06-17", "2027-06-18", "2027-06-21", "2027-06-26", "2027-07-01", "2027-07-07", "2027-07-15", "2027-07-17", "2027-07-23", "2027-07-24", "2027-07-29", "2027-07-31", "2027-08-27", "2027-08-28", "2027-09-01", "2027-09-04", "2027-09-10", "2027-09-17", "2027-09-24", "2027-10-01", "2027-10-09", "2027-10-14", "2027-11-06", "2027-11-11", "2027-12-03", "2028-03-18", "2028-04-22", "2028-06-01", "2028-08-08"]);
  const pad=n=>String(n).padStart(2,"0");
  const key=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
  const today=(()=>{const d=new Date();d.setHours(0,0,0,0);return d;})();
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
      '<label class="bc-f w"><span>How are your plans coming along? Ask me anything *</span><textarea name="message" rows="4" required></textarea></label></div>'+
      '<p class="bc-muted" style="font-size:12px;margin:8px 0 0">I reply to every enquiry personally, so please check your junk folder for my reply.</p>'+
      '<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">'+
      '<p class="bc-err" id="bcErr" role="alert" hidden></p><div class="bc-actions"><button type="button" class="bc-btn" id="bcBack2">Back</button><button type="submit" class="bc-btn primary" id="bcSend">Send enquiry</button></div></form>';
    document.getElementById("bcChange").onclick=()=>pick(d);
    document.getElementById("bcBack2").onclick=()=>detail(d,p,r.h);
    const fm=document.getElementById("bcForm"), err=document.getElementById("bcErr"), btn=document.getElementById("bcSend");
    fm.addEventListener("input",e=>e.target.classList.remove("bad"));
    fm.onsubmit=async e=>{e.preventDefault();
      const v=Object.fromEntries(new FormData(fm).entries()); let first=null;
      fm.querySelectorAll("[required]").forEach(el=>{const bad=!el.value.trim()||(el.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));el.classList.toggle("bad",bad);if(bad&&!first)first=el;});
      if(first){err.textContent="Please fill in the highlighted fields.";err.hidden=false;first.focus();return;}
      if(v._gotcha)return;
      err.hidden=true;btn.disabled=true;btn.textContent="Sending\u2026";
      try{const res=await fetch(FORMSPREE,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({
          _subject:"New wedding enquiry: "+full(d)+" \u00b7 "+plabel(p,r), _replyto:v.email.trim(),
          "Wedding date":full(d), "Package":plabel(p,r), "Price quoted":gbp(r.final)+(r.seas?" (incl. "+gbp(r.off)+" seasonal discount)":""),
          "First name":v.first.trim(),"Last name":v.last.trim(),"Partner":v.partner.trim(),"Venue":v.venue.trim(),"Email":v.email.trim(),"Mobile":v.mobile.trim(),"Message":v.message.trim()})});
        if(!res.ok)throw new Error(res.status);
        panel.innerHTML='<div class="bc-step">Enquiry sent</div><p class="bc-date">Thank you, '+esc(v.first.trim())+'!</p><p class="bc-muted">Your enquiry for <b>'+full(d)+'</b> ('+p.name+') is with me. I\'ll be in touch personally, so keep an eye on your junk folder just in case.</p>';
      }catch(x){btn.disabled=false;btn.textContent="Send enquiry";err.textContent="Sorry, that didn't send. Please try again, or email hello@stutuckerphotography.co.uk.";err.hidden=false;}
    };
    fm.querySelector("input").focus();
  }
  let month=new Date(today.getFullYear(),today.getMonth(),1), sel=null;
  const grid=document.getElementById("bcGrid"), panel=document.getElementById("bcPanel");
  document.getElementById("bcDow").innerHTML=["M","T","W","T","F","S","S"].map(d=>'<div class="bc-dow">'+d+'</div>').join("");
  function render(){
    document.getElementById("bcMonth").textContent=month.toLocaleDateString("en-GB",{month:"long",year:"numeric"});
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
    grid.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{sel=b.dataset.k;render();const dt=new Date(sel+"T00:00:00");pick(dt);});
  }
  function pick(d){
    const cards=PACKAGES.map((p,i)=>{const r=price(p,d),blocked=p.name==="ELOPE"&&elopePeak(d);
      return '<button type="button" class="bc-pkg" data-i="'+i+'"'+(blocked?" disabled":"")+'>'+(p.popular?'<span class="badge">MOST POPULAR</span>':"")+'<b>'+p.name+'</b><span class="p">'+(r.seas?'<s style="opacity:.55;font-weight:400">'+gbp(r.base)+'</s> ':"")+(p.hourly?"from ":"")+gbp(r.final)+'</span><span class="n">'+(p.hourly?r.min+"\u2013"+HOURLY.max+" hours":p.hours)+'</span>'+(r.mid?'<span class="g">midweek rate</span>':"")+(r.seas?'<span class="g">'+gbp(r.off)+' seasonal discount</span>':"")+(blocked?'<span class="w">not available for this date</span>':"")+'</button>';}).join("");
    panel.innerHTML='<div class="bc-step">Step 2 of 3 \u00b7 Choose a package</div><p class="bc-date">'+full(d)+(isMid(d)?" \u00b7 midweek":"")+'</p><div class="bc-pkgs">'+cards+'</div>';
    panel.querySelectorAll(".bc-pkg:not([disabled])").forEach(b=>b.onclick=()=>detail(d,PACKAGES[+b.dataset.i]));
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
    document.getElementById("bcGo").onclick=()=>form(d,p,r);
  }
  document.getElementById("bcPrev").onclick=()=>{month.setMonth(month.getMonth()-1);render();};
  document.getElementById("bcNext").onclick=()=>{month.setMonth(month.getMonth()+1);render();};
  let sx=null;grid.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;},{passive:true});
  grid.addEventListener("touchend",e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40){month.setMonth(month.getMonth()+(dx>0?-1:1));render();}sx=null;},{passive:true});
  render();
})();

