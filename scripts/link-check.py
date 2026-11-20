"""Crawl every sitemap page (+ blog category pages) and report broken internal links, assets and #anchors.
python3 scripts/link-check.py [http://localhost:3000]   (external links are listed in /tmp/ext.json)"""
import re, sys, json, collections, urllib.request, urllib.error
from html.parser import HTMLParser

B = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
cache = {}


def get(u):
    if u in cache:
        return cache[u]
    try:
        r = urllib.request.urlopen(B + u, timeout=30)
        res = (r.status, r.read().decode("utf8", "ignore"))
    except urllib.error.HTTPError as e:
        res = (e.code, "")
    cache[u] = res
    return res


class P(HTMLParser):
    def __init__(s):
        super().__init__()
        s.links, s.ids = [], set()

    def handle_starttag(s, t, a):
        a = dict(a)
        if a.get("id"):
            s.ids.add(a["id"])
        for k in ("href", "src", "poster", "srcset"):
            v = a.get(k)
            if not v:
                continue
            if k == "srcset":
                s.links += [x.strip().split(" ")[0] for x in v.split(",")]
            else:
                s.links.append(v)


def parse(html):
    p = P()
    p.feed(html)
    return p


sm = get("/sitemap.xml")[1]
pages = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sm)]
pages += ["/blog-tags/" + t for t in "engagement-models modernization ai-governance ai-coe methodology market-pov odc-engineering leadership-pov ai-transformation".split()]
pages += ["/does-not-exist"]  # the 404 page's own links

refs, ext, parsed = collections.defaultdict(set), collections.defaultdict(set), {}
for p in pages:
    st, html = get(p)
    if st != 200 and p != "/does-not-exist":
        print("PAGE", st, p)
    parsed[p] = parse(html)
    for v in parsed[p].links:
        if v.startswith(("mailto:", "tel:", "data:", "javascript:")):
            continue
        if re.match(r"https?://(www\.)?neusix\.com|https?://localhost", v):
            v = re.sub(r"^https?://[^/]+", "", v) or "/"
        if v.startswith("http"):
            ext[v].add(p)
        else:
            refs[v].add(p)

bad = []
for r, src in sorted(refs.items()):
    path, _, frag = r.partition("#")
    if not path:  # same-page anchor
        bad += [("missing-anchor", r, s) for s in src if frag and frag not in parsed[s].ids]
        continue
    st, html = get(path)
    if st != 200:
        bad.append((st, r, sorted(src)[:3]))
    elif frag:
        ids = parsed[path].ids if path in parsed else parse(html).ids
        if frag not in ids:
            bad.append(("missing-anchor", r, sorted(src)[:3]))

print("pages", len(pages), "internal refs", len(refs), "external", len(ext))
for b in bad:
    print("BAD", b)
json.dump({k: sorted(v) for k, v in ext.items()}, open("/tmp/ext.json", "w"), indent=1)
for k in sorted(ext):
    print("EXT", k)
