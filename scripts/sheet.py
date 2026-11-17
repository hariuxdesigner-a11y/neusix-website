# Make contact sheets from full-page screenshots: python3 scripts/sheet.py <png> <out.jpg> <chunk_h> <thumb_w>
import sys
from PIL import Image
src,out,ch,tw=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4])
im=Image.open(src);w,h=im.size
parts=[im.crop((0,y,w,min(h,y+ch))) for y in range(0,h,ch)]
for p in parts: p.thumbnail((tw,10000))
W=sum(p.size[0] for p in parts)+8*len(parts);H=max(p.size[1] for p in parts)
c=Image.new('RGB',(W,H),'red');x=0
for p in parts: c.paste(p,(x,0));x+=p.size[0]+8
c.convert('RGB').save(out,quality=72);print(h)
