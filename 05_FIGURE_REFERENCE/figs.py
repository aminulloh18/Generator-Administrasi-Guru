import numpy as np, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Polygon, Circle, FancyArrowPatch
plt.rcParams['font.family']='DejaVu Sans'
plt.rcParams['mathtext.fontset']='dejavusans'
GREEN='#2e8b57'; DARK='#1f3b57'; ORG='#e07b00'; GREY='#666666'

# ---------- Fig1: pohon pembelahan bakteri ----------
fig,ax=plt.subplots(figsize=(7.2,4.6),dpi=200); ax.axis('off'); ax.set_xlim(0,12); ax.set_ylim(-0.6,8.6)
levels=[(0,'Awal (0 menit)',1),(1,'20 menit',2),(2,'40 menit',4),(3,'60 menit',8)]
ys={0:7.6,1:5.5,2:3.4,3:1.3}
xs={}
for lv,lab,n in levels:
    w=6.0; xs[lv]=[3.6+w*(i+0.5)/n for i in range(n)]
for lv,lab,n in levels:
    ax.text(0.1,ys[lv],lab,fontsize=10,va='center',color=DARK,fontweight='bold')
    ax.text(11.9,ys[lv],f'{n} bakteri',fontsize=10,va='center',ha='right',color=ORG,fontweight='bold')
    for x in xs[lv]:
        ax.add_patch(FancyBboxPatch((x-0.32,ys[lv]-0.16),0.64,0.32,boxstyle='round,pad=0.02,rounding_size=0.16',fc='#bfe8cf',ec=GREEN,lw=1.4))
        ax.plot([x-0.12,x+0.12],[ys[lv],ys[lv]],color=GREEN,lw=1,alpha=.7)
    if lv<3:
        for i,x in enumerate(xs[lv]):
            for c in (2*i,2*i+1):
                ax.plot([x,xs[lv+1][c]],[ys[lv]-0.2,ys[lv+1]+0.2],color=GREY,lw=1)
for lv in range(1,4):
    ax.annotate('',xy=(3.0,ys[lv]+0.2),xytext=(3.0,ys[lv-1]-0.2),arrowprops=dict(arrowstyle='->',color=DARK,lw=1))
    ax.text(2.9,(ys[lv]+ys[lv-1])/2,'membelah\n×2',fontsize=8,ha='right',va='center',color=DARK)
ax.text(6,-0.4,'Setiap 20 menit, setiap bakteri membelah menjadi 2 bakteri',fontsize=9,ha='center',style='italic',color=GREY)
plt.savefig('fig1_bakteri.png',bbox_inches='tight',facecolor='white'); plt.close()

# ---------- Fig2: tangga pangkat ----------
fig,ax=plt.subplots(figsize=(6.2,5.4),dpi=200); ax.axis('off'); ax.set_xlim(0,10); ax.set_ylim(0,10.6)
exps=[4,3,2,1,0,-1,-2,-3]; vals=['16','8','4','2','?','?','?','?']
top=9.6; h=1.0
for i,(e,v) in enumerate(zip(exps,vals)):
    y=top-i*1.15
    q = v=='?'
    ax.add_patch(FancyBboxPatch((1.3,y-0.4),2.6,0.8,boxstyle='round,pad=0.02,rounding_size=0.12',fc='#dbe7f5',ec=DARK,lw=1.3))
    ax.text(2.6,y,rf'$2^{{{e}}}$',ha='center',va='center',fontsize=15,color=DARK)
    ax.text(4.3,y,'=',ha='center',va='center',fontsize=15)
    ax.add_patch(FancyBboxPatch((4.8,y-0.4),2.2,0.8,boxstyle='round,pad=0.02,rounding_size=0.12',fc='#fff3cd' if q else '#e3f4e8',ec=ORG if q else GREEN,lw=1.3))
    ax.text(5.9,y,v if not q else '?',ha='center',va='center',fontsize=15,color=ORG if q else GREEN,fontweight='bold')
    if i<len(exps)-1:
        ax.annotate('',xy=(8.2,y-1.15+0.35),xytext=(8.2,y-0.35),arrowprops=dict(arrowstyle='->',color=DARK,lw=1.4))
        ax.text(8.45,y-0.57,'÷ 2',fontsize=11,va='center',color=DARK,fontweight='bold')
        ax.annotate('',xy=(0.75,y-1.15+0.2),xytext=(0.75,y-0.2),arrowprops=dict(arrowstyle='->',color=GREY,lw=1.2))
        ax.text(0.65,y-0.57,'−1',fontsize=9,va='center',ha='right',color=GREY)
ax.text(2.6,10.35,'Eksponen turun 1',fontsize=9,ha='center',color=GREY)
ax.text(5.9,10.35,'Nilai dibagi 2',fontsize=9,ha='center',color=GREY)
plt.savefig('fig2_tangga.png',bbox_inches='tight',facecolor='white'); plt.close()

# ---------- Fig3: grafik y=2^x ----------
fig,ax=plt.subplots(figsize=(6.4,4.4),dpi=200)
xs_=np.linspace(-3.4,4.3,400); ax.plot(xs_,2**xs_,color=DARK,lw=2)
pts=[(-3,'1/8'),(-2,'1/4'),(-1,'1/2'),(0,'1'),(1,'2'),(2,'4'),(3,'8'),(4,'16')]
for x,l in pts:
    ax.plot([x],[2.0**x],'o',color=ORG,ms=6)
    ax.annotate(f'({x}, {l})',(x,2.0**x),textcoords='offset points',xytext=(-6,8) if x>=1 else (4,8),fontsize=8,color=ORG,ha='right' if x>=1 else 'left')
ax.axhline(0,color='k',lw=1); ax.axvline(0,color='k',lw=1)
ax.set_xlim(-3.6,4.6); ax.set_ylim(-1,18); ax.set_xticks(range(-3,5)); ax.set_yticks(range(0,18,2))
ax.grid(True,color='#cccccc',lw=.6,ls=':'); ax.set_xlabel('x',style='italic'); ax.set_ylabel('y',style='italic',rotation=0,labelpad=10)
ax.set_title(r'Grafik $y=2^{x}$',fontsize=12,color=DARK)
for s in ('top','right'): ax.spines[s].set_visible(False)
plt.savefig('fig3_grafik.png',bbox_inches='tight',facecolor='white'); plt.close()

# ---------- Fig4: skala ukuran (log) ----------
fig,ax=plt.subplots(figsize=(7.4,3.9),dpi=200); ax.set_xlim(-7,12.6); ax.set_ylim(-1.6,3.6); ax.axis('off')
ax.annotate('',xy=(11.7,0),xytext=(-6.7,0),arrowprops=dict(arrowstyle='-|>',color='k',lw=1.6))
for p in range(-6,12):
    ax.plot([p,p],[-0.12,0.12],color='k',lw=1); ax.text(p,-0.38,rf'$10^{{{p}}}$',ha='center',va='top',fontsize=7.5)
items=[(np.log10(7e-6),'Sel darah merah\n$7\\times10^{-6}$ m',1),(np.log10(7e-5),'Diameter rambut\n$7\\times10^{-5}$ m',2),
 (np.log10(3e-3),'Semut\n$3\\times10^{-3}$ m',1),(np.log10(1.7),'Tinggi manusia\n$1{,}7\\times10^{0}$ m',2),
 (np.log10(8.8e3),'Gunung Everest\n$8{,}8\\times10^{3}$ m',1),(np.log10(6.4e6),'Jari-jari Bumi\n$6{,}4\\times10^{6}$ m',2),
 (np.log10(3.84e8),'Bumi–Bulan\n$3{,}84\\times10^{8}$ m',1),(np.log10(1.5e11),'Bumi–Matahari\n$1{,}5\\times10^{11}$ m',2)]
for x,lab,lv in items:
    yt=1.0 if lv==1 else 2.3
    ax.plot([x,x],[0,yt-0.05],color=GREY,lw=.8,ls='--'); ax.plot([x],[0],'o',color=ORG,ms=6)
    ax.text(x,yt,lab,ha='center',va='bottom',fontsize=7.5,color=DARK,bbox=dict(boxstyle='round,pad=0.25',fc='#eef4fb',ec=DARK,lw=.6))
ax.text(-6.9,-1.3,'Panjang dalam meter, skala logaritmik: setiap satu garis ke kanan, ukurannya 10 kali lebih besar (nilai perkiraan).',fontsize=8,style='italic',color=GREY)
plt.savefig('fig4_skala.png',bbox_inches='tight',facecolor='white'); plt.close()

# ---------- Fig5: kubus ----------
fig,ax=plt.subplots(figsize=(6.4,3.6),dpi=200); ax.set_aspect('equal'); ax.axis('off'); ax.set_xlim(0,13); ax.set_ylim(0,6.2)
def cube(x0,y0,s,d,fc):
    F=[(x0,y0),(x0+s,y0),(x0+s,y0+s),(x0,y0+s)]
    T=[(x0,y0+s),(x0+s,y0+s),(x0+s+d,y0+s+d),(x0+d,y0+s+d)]
    R=[(x0+s,y0),(x0+s+d,y0+d),(x0+s+d,y0+s+d),(x0+s,y0+s)]
    ax.add_patch(Polygon(F,fc=fc,ec=DARK,lw=1.5)); ax.add_patch(Polygon(T,fc='#ffffff',ec=DARK,lw=1.5,alpha=.7)); ax.add_patch(Polygon(R,fc=fc,ec=DARK,lw=1.5,alpha=.65))
cube(0.8,1.0,3.0,1.2,'#bfe8cf')
ax.text(2.3,0.45,r'rusuk $s=\,?$ cm',ha='center',fontsize=11,color=DARK)
ax.text(2.7,2.4,r'$V=8\ \mathrm{cm}^{3}$',ha='center',fontsize=13,color=ORG,fontweight='bold')
cube(7.6,1.0,3.0,1.2,'#dbe7f5')
ax.text(9.1,0.45,r'rusuk $s=\,?$ cm',ha='center',fontsize=11,color=DARK)
ax.text(9.5,2.4,r'$V=27\ \mathrm{cm}^{3}$',ha='center',fontsize=13,color=ORG,fontweight='bold')
ax.text(2.6,5.5,r'$s\times s\times s=8$',ha='center',fontsize=13,color=DARK)
ax.text(9.4,5.5,r'$s\times s\times s=27$',ha='center',fontsize=13,color=DARK)
plt.savefig('fig5_kubus.png',bbox_inches='tight',facecolor='white'); plt.close()
from PIL import Image
import glob
for f in sorted(glob.glob('fig*.png')): print(f,Image.open(f).size)
