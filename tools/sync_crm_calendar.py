#!/usr/bin/env python3
"""Copy the website booking calendar (calendar.js) into Stu's CRM so both look and work the same.

calendar.js is the ONE source of truth. Never hand-edit the calendar inside the CRM:
change calendar.js, then run

    python3 tools/sync_crm_calendar.py path/to/crm/index.html

and republish the CRM artifact (https://claude.ai/artifact/582JxJ2vxwbPtzhw1oCGU6).

The only differences the CRM keeps on purpose:
  * booked dates come from the CRM's own bookings list (window.BV_CAL)
  * ticks in the Half term / Holidays tabs close dates straight away (window.BV_closures)
  * the main enquiry form shows a preview of the email instead of sending it
  * no GoatCounter visit counting
  * no jump to the website's thank-you page after sending
  * always shows availability, whatever the website's SHOW_DATES switch says
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
crm_path = pathlib.Path(sys.argv[1])
js = (ROOT / "calendar.js").read_text(encoding="utf-8")
crm = crm_path.read_text(encoding="utf-8")


def one(hay, needle, what):
    n = hay.count(needle)
    if n != 1:
        sys.exit(f"sync stopped: expected 1 '{what}', found {n}. calendar.js changed shape; update this script.")
    return hay.index(needle)


# ---------- pull CSS, markup and logic out of calendar.js ----------
css = json.loads(re.search(r'st\.textContent=("(?:[^"\\]|\\.)*")', js).group(1))
markup = json.loads(re.search(r'host\.innerHTML=("(?:[^"\\]|\\.)*")', js).group(1))
logic = js[one(js, "// ---------- Book a date (booking calendar) ----------", "Book a date marker"):].rstrip()
assert logic.endswith("})();")

# ---------- CRM-only adjustments to the logic ----------
def swap(src, old, new, what):
    one(src, old, what)
    return src.replace(old, new)

logic = swap(logic, "// ---------- Book a date (booking calendar) ----------",
             "// ---------- Book a date (booking calendar) ----------\n"
             "// AUTO-COPIED from the website's calendar.js by stu-calendar/tools/sync_crm_calendar.py.\n"
             "// Don't edit the calendar here: change calendar.js and re-run the script so the website and this page stay identical.",
             "header")

hol = re.search(r"\n  const HOLIDAYS=new Set\(\[\.\.\.SCHOOL_CLOSED,\.\.\.OWN_CLOSED\]\);[^\n]*", logic)
if not hol: sys.exit("sync stopped: HOLIDAYS line not found")
logic = logic.replace(hol.group(0), """
  const HOLIDAYS=window.BV_HOLIDAYS=new Set([...SCHOOL_CLOSED,...OWN_CLOSED]);
  // Ticks in the Half term and Holidays tabs close dates here straight away; the website follows once Claude syncs.
  window.BV_SCHOOL_CLOSED=new Set(SCHOOL_CLOSED); window.BV_OWN_CLOSED=new Set(OWN_CLOSED);
  const BASE_CLOSED=[...HOLIDAYS].filter(k=>!window.BV_SCHOOL_CLOSED.has(k)&&!window.BV_OWN_CLOSED.has(k));
  window.BV_closures={school:new Set(SCHOOL_CLOSED),own:new Set(OWN_CLOSED)};
  window.BV_applyClosures=()=>{HOLIDAYS.clear();BASE_CLOSED.forEach(k=>HOLIDAYS.add(k));window.BV_closures.school.forEach(k=>HOLIDAYS.add(k));window.BV_closures.own.forEach(k=>HOLIDAYS.add(k));if(window.BV_bcRender)window.BV_bcRender();};""")

bk = re.search(r"\n  const BOOKED=new Set\(\[[^\n]*", logic)
if not bk: sys.exit("sync stopped: BOOKED line not found")
logic = logic.replace(bk.group(0), '\n  const BOOKED=new Set((window.BV_CAL||[]).map(([d])=>d.slice(0,4)+"-"+d.slice(4,6)+"-"+d.slice(6,8)));  // the CRM\'s own bookings list')

sd = re.search(r'const SHOW_DATES=(true|false);', logic)
if not sd: sys.exit("sync stopped: SHOW_DATES line not found")
logic = logic.replace(sd.group(0), 'const SHOW_DATES=true;  /* the CRM always shows your availability */', 1)

th = re.search(r'const THANKYOU="[^"]*"', logic)
if not th: sys.exit("sync stopped: THANKYOU line not found")
logic = logic.replace(th.group(0), 'const THANKYOU=""  /* the CRM never leaves the page after sending */', 1)

a = one(logic, "  // ---------- Anonymous activity tracking", "tracking start")
b = logic.index("\n", logic.index("return(path,title,once)", a))
logic = logic[:a] + "  const track=()=>{};  // the CRM never counts visits" + logic[b:]

a = one(logic, 'err.hidden=true;btn.disabled=true;btn.textContent="Sending\\u2026";', "main form send")
b = logic.index("\n", logic.index("}catch(x){", a))
logic = logic[:a] + r"""err.hidden=true;
      const mail=[["Subject","New wedding enquiry: "+full(d)+" · "+plabel(p,r)],["Wedding date",full(d)],["Package",plabel(p,r)],["Price quoted",gbp(r.final)+(r.seas?" (incl. "+gbp(r.off)+" seasonal discount)":"")],["First name",v.first.trim()],["Last name",v.last.trim()],["Partner",v.partner.trim()],["Venue",v.venue.trim()],["Email",v.email.trim()],["Mobile",v.mobile.trim()],["What they would like to do",intents.join(" / ")],["Message",v.message.trim()]];
      panel.innerHTML='<div class="bc-step">Preview · not sent</div><p class="bc-muted" style="margin-bottom:10px">On your website, this enquiry is emailed to you. Claude pages can\'t send, so here is the email you would receive:</p>'+mail.map(([k,x])=>'<div class="bc-row"><span>'+k+'</span><span style="text-align:right">'+esc(x)+'</span></div>').join("")+'<div class="bc-actions"><button type="button" class="bc-btn" id="bcAgain">Start again</button></div>';
      document.getElementById("bcAgain").onclick=()=>intro();""" + logic[b:]

a = one(logic, '\n  const host=document.getElementById("stu-calendar")||document.body;', "tail")
logic = logic[:a] + "\n  window.BV_bcRender=render;\n})();"

# ---------- write into the CRM ----------
# 1. logic
s = one(crm, "// ---------- Book a date (booking calendar) ----------", "CRM logic marker")
e = crm.index("\n})();", s) + len("\n})();")
crm = crm[:s] + logic + crm[e:]

# 2. markup: the website's whole calendar block, word for word
style = ('<link id="stu-cal-font" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Manrope:wght@400;600&display=swap">\n'
         '<style id="stu-cal-css">\n' + css + '\n#stu-calendar .stp-cal .wrap{padding:24px 16px 28px}\n</style>\n')
block = '<!-- stu-cal:start (copied from calendar.js) -->\n' + style + '<div id="stu-calendar">' + markup + '</div>\n<!-- stu-cal:end -->\n'
if "<!-- stu-cal:start" in crm:
    s = crm.index("<!-- stu-cal:start"); e = crm.index("<!-- stu-cal:end -->", s) + len("<!-- stu-cal:end -->\n")
else:
    s = one(crm, '<div id="bc" class="bc">', "CRM #bc")
    s = crm.rindex("\n", 0, s) + 1
    e = crm.index('<div class="panel ca-wrap" id="caBox">', s); e = crm.rindex("\n", 0, e) + 1
crm = crm[:s] + block + crm[e:]

# 3. # the website calendar has no dark mode, so drop the CRM's old dark colours for it
crm = re.sub(r'@media \(prefers-color-scheme:dark\)\{:root:not\(\[data-theme="light"\]\) (?:\.bc|#bc)\{[^}]*\}\}\n', "", crm)
crm = re.sub(r':root\[data-theme="dark"\] (?:\.bc|#bc)\{[^}]*\}\n', "", crm)
crm_path.write_text(crm, encoding="utf-8")
print("CRM calendar now matches calendar.js")
