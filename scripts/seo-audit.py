"""SEO audit of every sitemap URL (plus extras): python3 scripts/seo-audit.py http://localhost:3000 [extra paths...]"""
import json, re, sys, urllib.request
from bs4 import BeautifulSoup

base = sys.argv[1].rstrip("/")
sm = urllib.request.urlopen(base + "/sitemap.xml").read().decode()
paths = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sm)] + sys.argv[2:]
titles, descs = {}, {}
for p in paths:
    try:
        html = urllib.request.urlopen(base + p).read().decode()
    except Exception as e:
        print(f"!! {p}: {e}"); continue
    s = BeautifulSoup(html, "html.parser")
    issues = []
    t = (s.title.string or "").strip() if s.title else ""
    d = (s.find("meta", attrs={"name": "description"}) or {}).get("content", "")
    can = (s.find("link", rel="canonical") or {}).get("href", "")
    og = {m.get("property"): m.get("content") for m in s.find_all("meta", property=re.compile("^og:"))}
    tw = s.find("meta", attrs={"name": "twitter:card"})
    h1 = [h.get_text(" ", strip=True) for h in s.find_all("h1")]
    heads = [int(h.name[1]) for h in s.select("main h1, main h2, main h3, main h4, main h5, main h6")]
    skips = [f"h{a}->h{b}" for a, b in zip(heads, heads[1:]) if b > a + 1]
    noalt = [i.get("src", "")[:50] for i in s.find_all("img") if i.get("alt") is None]
    ld = []
    for sc in s.find_all("script", type="application/ld+json"):
        try:
            j = json.loads(sc.string); ld += [x.get("@type") for x in (j if isinstance(j, list) else j.get("@graph", [j]))]
        except Exception: ld.append("INVALID")
    main = s.find("main"); words = len(main.get_text(" ", strip=True).split()) if main else 0
    if not (30 <= len(t) <= 65): issues.append(f"title {len(t)}ch")
    if not (110 <= len(d) <= 165): issues.append(f"desc {len(d)}ch")
    if not can: issues.append("no canonical")
    if not og.get("og:title") or not og.get("og:image"): issues.append(f"og missing {[k for k in ('og:title','og:description','og:image','og:url') if not og.get(k)]}")
    if not tw: issues.append("no twitter card")
    if len(h1) != 1: issues.append(f"h1 x{len(h1)}")
    if skips: issues.append(f"heading skips {sorted(set(skips))}")
    if noalt: issues.append(f"img no alt {noalt[:3]}")
    if words < 250: issues.append(f"thin {words} words")
    titles.setdefault(t, []).append(p); descs.setdefault(d, []).append(p)
    print(f"{p}\n   title({len(t)}): {t}\n   desc({len(d)}): {d[:90]}…\n   h1: {h1[:2]}  ld: {ld}  words: {words}\n   " + ("ISSUES: " + "; ".join(issues) if issues else "ok"))
for t, ps in titles.items():
    if len(ps) > 1: print("DUP TITLE", t, ps)
for d, ps in descs.items():
    if len(ps) > 1: print("DUP DESC", d[:60], ps)
