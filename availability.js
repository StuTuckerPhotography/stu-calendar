/* Stu Tucker Photography - availability calendar (view only).
   Just the calendar: booked, available and closed dates. No packages, prices or enquiry form.
   Loaded on the website by:
     <div id="stu-availability"></div><script src="https://stutuckerphotography.github.io/stu-calendar/availability.js"></script>
   The dates are read live from calendar.js (BOOKED, closed dates, holidays and family shoots), so it never needs updating
   on its own: every booking added to calendar.js shows here too. Nothing else in calendar.js is used. */
(function(){
  var SRC="https://stutuckerphotography.github.io/stu-calendar/calendar.js";
  var host=document.getElementById("stu-availability");
  if(!host){host=document.createElement("div");host.id="stu-availability";var s=document.currentScript;if(s&&s.parentNode)s.parentNode.insertBefore(host,s);else document.body.appendChild(host);}
  if(host.getAttribute("data-ready"))return; host.setAttribute("data-ready","1");
  if(!document.getElementById("stu-cal-font")){var l=document.createElement("link");l.id="stu-cal-font";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Manrope:wght@400;600&display=swap";document.head.appendChild(l);}
  var st=document.createElement("style");
  st.textContent=[
    ".stp-av{--bg:#F9F7F1;--panel:#FDFCFA;--ink:#373737;--ink2:#56605A;--muted:#7A776F;--rule:#E6E2D5;--avail:#3E5A44;--avail-bg:#DDE7D8;--booked:#b3261e;--booked-bg:#fbe4e2;--closed:#FFFFFF;--closed-bg:#1A1A1A;",
    "box-sizing:border-box;max-width:460px;margin:0 auto;background:var(--panel);border:1px solid var(--rule);border-radius:12px;padding:20px 16px;color:var(--ink);font-family:Manrope,system-ui,-apple-system,'Segoe UI',sans-serif;font-size:15px;line-height:1.5}",
    ".stp-av *{box-sizing:border-box;font-family:inherit;letter-spacing:normal;text-transform:none;text-align:left}",
    ".stp-av .av-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 12px}",
    ".stp-av .av-nav{border:0;background:none;font-size:24px;line-height:1;cursor:pointer;color:var(--ink);width:40px;height:40px;border-radius:8px;padding:0;margin:0;min-height:0;box-shadow:none}",
    ".stp-av .av-nav:hover{background:var(--bg)}.stp-av .av-nav:disabled{opacity:.3;cursor:default;background:none}",
    ".stp-av .av-nav:focus-visible,.stp-av .av-sel:focus-visible{outline:2px solid var(--ink);outline-offset:1px}",
    ".stp-av .av-msel{display:flex;gap:6px;align-items:center;justify-content:center;flex:1;min-width:0}",
    ".stp-av .av-sel{font-size:15px;font-weight:600;color:var(--ink);background:var(--panel);border:1px solid var(--rule);border-radius:8px;padding:6px 8px;cursor:pointer;width:auto;max-width:none;height:auto;margin:0}",
    ".stp-av .av-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}",
    ".stp-av .av-dow{text-align:center;font-size:11px;color:var(--muted);padding-bottom:6px}",
    ".stp-av .av-day{aspect-ratio:1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--ink);text-align:center}",
    ".stp-av .av-day.empty{visibility:hidden}",
    ".stp-av .av-day.past{color:var(--muted);opacity:.45}",
    ".stp-av .av-day.avail{background:var(--avail-bg);color:var(--avail);font-weight:600}",
    ".stp-av .av-day.booked{background:var(--booked-bg);color:var(--booked);text-decoration:line-through}",
    ".stp-av .av-day.closed{background:var(--closed-bg);color:var(--closed);text-decoration:line-through}",
    ".stp-av .av-day.today{box-shadow:inset 0 0 0 2px var(--ink)}",
    ".stp-av .av-legend{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:14px;font-size:12px;color:var(--ink2)}",
    ".stp-av .av-legend span{display:inline-flex;align-items:center;gap:6px}",
    ".stp-av .av-dot{width:10px;height:10px;border-radius:3px;display:inline-block}",
    ".stp-av .av-msg{margin:10px 0 0;font-size:13px;color:var(--ink2);text-align:center}",
    ".stp-av .av-vh{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}"
  ].join("\n");
  document.head.appendChild(st);
  var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  host.innerHTML='<div class="stp-av"><div class="av-head"><button type="button" class="av-nav" id="avPrev" aria-label="Previous month">&#8249;</button>'+
    '<span class="av-msel"><select class="av-sel" id="avM" aria-label="Month"></select><select class="av-sel" id="avY" aria-label="Year"></select></span>'+
    '<button type="button" class="av-nav" id="avNext" aria-label="Next month">&#8250;</button></div>'+
    '<span class="av-vh" id="avLive" aria-live="polite"></span>'+
    '<div class="av-grid" id="avDow"></div><div class="av-grid" id="avGrid" role="grid"></div>'+
    '<div class="av-legend"><span><i class="av-dot" style="background:var(--avail-bg);box-shadow:inset 0 0 0 1px var(--avail)"></i>Available</span><span><i class="av-dot" style="background:var(--booked)"></i>Booked</span><span><i class="av-dot" style="background:var(--closed-bg)"></i>Closed</span></div>'+
    '<p class="av-msg" id="avMsg" hidden></p></div>';
  var $=function(id){return document.getElementById(id);};
  $("avDow").innerHTML=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(function(d){return '<div class="av-dow">'+d+'</div>';}).join("");
  var pad=function(n){return String(n).padStart(2,"0");};
  var key=function(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());};
  var today=new Date();today.setHours(0,0,0,0);
  var ord=function(n){var s=["th","st","nd","rd"],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);};
  var full=function(d){return d.toLocaleDateString("en-GB",{weekday:"long"})+" "+ord(d.getDate())+" "+MONTHS[d.getMonth()]+" "+d.getFullYear();};
  var month=new Date(today.getFullYear(),today.getMonth(),1);
  var D={booked:new Set(),hol:new Set(),closed:[[11,24],[11,25],[11,26]],family:{},famDays:7,ready:false};
  var lastY=today.getFullYear()+3;
  function fill(){
    var y=month.getFullYear(),first=y===today.getFullYear()?today.getMonth():0,ms=$("avM"),ys=$("avY");
    if(!ys.options.length){for(var yy=today.getFullYear();yy<=lastY;yy++)ys.insertAdjacentHTML("beforeend",'<option value="'+yy+'">'+yy+'</option>');}
    ms.innerHTML=MONTHS.slice(first).map(function(n,i){return '<option value="'+(i+first)+'">'+n+'</option>';}).join("");
    ms.value=String(month.getMonth());ys.value=String(y);
  }
  function status(dt,k){
    if(dt<today)return "past";
    if(!D.ready)return "";
    if(D.booked.has(k))return "booked";
    if(D.family[k]&&Math.round((dt-today)/864e5)<=D.famDays)return "booked";
    if(k===key(today)||D.hol.has(k)||D.closed.some(function(c){return dt.getMonth()===c[0]&&dt.getDate()===c[1];}))return "closed";
    return "avail";
  }
  var LABEL={past:"",booked:"Booked",closed:"Closed",avail:"Available","":""};
  function render(){
    var minM=new Date(today.getFullYear(),today.getMonth(),1),maxM=new Date(lastY,11,1);
    if(month<minM)month=new Date(minM); if(month>maxM)month=new Date(maxM);
    $("avPrev").disabled=month.getTime()===minM.getTime(); $("avNext").disabled=month.getTime()===maxM.getTime();
    fill();
    var y=month.getFullYear(),m=month.getMonth(),off=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate(),h="";
    for(var i=0;i<off;i++)h+='<div class="av-day empty" aria-hidden="true"></div>';
    for(var d=1;d<=n;d++){var dt=new Date(y,m,d),k=key(dt),s=status(dt,k),t=LABEL[s];
      h+='<div class="av-day '+s+(k===key(today)?" today":"")+'" role="gridcell"'+(t?' title="'+t+'"':"")+' aria-label="'+full(dt)+(t?", "+t:"")+'">'+d+'</div>';}
    $("avGrid").innerHTML=h;
    $("avLive").textContent=MONTHS[m]+" "+y;
  }
  $("avPrev").onclick=function(){month=new Date(month.getFullYear(),month.getMonth()-1,1);render();};
  $("avNext").onclick=function(){month=new Date(month.getFullYear(),month.getMonth()+1,1);render();};
  var go=function(){month=new Date(+$("avY").value,+$("avM").value,1);render();};
  $("avM").onchange=go;$("avY").onchange=go;
  render();
  // read the dates from calendar.js (the one place bookings are kept)
  var arr=function(src,name){var m=new RegExp("const "+name+"=(?:new Set\\()?(\\[[^\\]]*\\])").exec(src);if(!m)return null;try{return JSON.parse(m[1]);}catch(e){return null;}};
  fetch(SRC+"?v="+Math.floor(Date.now()/600000),{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error(r.status);return r.text();}).then(function(src){
    var b=arr(src,"BOOKED");if(!b)throw new Error("no dates");
    D.booked=new Set(b);
    D.hol=new Set([].concat(arr(src,"SCHOOL_CLOSED")||[],arr(src,"OWN_CLOSED")||[]));
    var c=arr(src,"CLOSED");if(c)D.closed=c;
    var f=/const FAMILY=(\{[^}]*\})/.exec(src);if(f){try{D.family=JSON.parse(f[1]);}catch(e){}}
    var fd=/const FAMILY_BLOCK_DAYS=(\d+)/.exec(src);if(fd)D.famDays=+fd[1];
    D.ready=true;render();
  }).catch(function(){var m=$("avMsg");m.textContent="Availability couldn’t load just now. Please refresh the page, or get in touch to check your date.";m.hidden=false;});
})();
