import json,html,urllib.parse,re
exec(open('tools/redesign/gen.py').read().split("E=lambda")[0])  # reuse arr, tr, WA, CATS, CK, UI
gal=json.load(open('tools/redesign/gal.json'))
arr=[a for a in arr if a['id']!=21]
tr['25']=[tr['25'][0]+' — style 2',tr['25'][1]+' — modèle 2',tr['25'][2]+' — موديل 2']
UI.update({
'nocash':["No prepayment · Check the product before you pay","Aucun paiement d'avance · Vérifiez le produit avant de payer","ما كتخلص والو قبل · شوف المنتج قبل ما تخلص"],
'search':["Search a product…","Rechercher un produit…","قلّب على منتج…"],
'sort_l':["Sort","Trier","ترتيب"],'sort_rec':["Recommended","Recommandés","المقترحة"],'sort_low':["Price: low to high","Prix croissant","الثمن: من الأرخص"],'sort_high':["Price: high to low","Prix décroissant","الثمن: من الأغلى"],'sort_off':["Biggest discount","Plus grosse remise","أكبر تخفيض"],
'none':["No product matches your search. Ask us on WhatsApp — we may have it.","Aucun produit ne correspond. Demandez-nous sur WhatsApp, on l'a peut-être.","ما لقينا حتى منتج. سولنا فواتساب، يمكن يكون عندنا."],
'photos':["photos","photos","صور"],'details':["View photos & details","Voir photos et détails","شوف الصور والتفاصيل"],
'save':["You save {s} MAD","Vous économisez {s} DH","كتربح {s} درهم"],
'm1':["Cash on delivery — no prepayment","Paiement à la livraison — rien à payer d'avance","الخلاص عند الاستلام — ما كتخلص والو قبل"],
'm2':["Free delivery in Salé & Rabat","Livraison gratuite à Salé et Rabat","توصيل مجاني لسلا والرباط"],
'm3':["Check the product before you pay","Vérifiez le produit avant de payer","شوف المنتج قبل ما تخلص"],
'askp':["Ask a question about this product","Poser une question sur ce produit","سول على هاد المنتج"],
'wa_ask':["Hello, I have a question about: {t}","Bonjour, j'ai une question sur : {t}","السلام، عندي سؤال على: {t}"],
'close':["Close","Fermer","سد"],'prev':["Previous photo","Photo précédente","الصورة السابقة"],'next':["Next photo","Photo suivante","الصورة التالية"],
'rev_tap':["Tap a conversation to enlarge it.","Touchez une conversation pour l'agrandir.","ضغط على محادثة باش تكبر."],
'about_h':["Who we are","Qui sommes-nous","شكون حنا"],
'about_p':["Since 2024, nexProMa has offered a varied selection of products with cash on delivery. We are committed to quality products that meet our customers' needs, with a reliable, safe and comfortable shopping experience.","Depuis 2024, nexProMa propose des produits variés avec paiement à la livraison. Nous nous engageons à offrir des produits de qualité qui répondent aux besoins de nos clients, avec une expérience d'achat fiable, sûre et confortable.","فـ 2024، تميزت منصة نكس بروما للتجارة الإلكترونية بتوفير منتجات متنوعة مع خيار الدفع عند الاستلام. نحن ملتزمون بتقديم منتجات عالية الجودة تلبي احتياجات عملائنا بشكل موثوق وآمن، مع ضمان تجربة شراء مريحة وآمنة."],
'about_c':["Talk to us on WhatsApp","Parlez-nous sur WhatsApp","هضر معانا فواتساب"],
'fd':["Free delivery to Rabat & Salé","Livraison gratuite Rabat et Salé","توصيل فابور للرباط وسلا"],
'more':["See all products","Voir tous les produits","شوف جميع المنتجات"],
'fab':["Chat on WhatsApp","Discuter sur WhatsApp","هضر معانا فواتساب"],
})
UI['see'][0]="See the products"
UI['pill']=["Free delivery in Salé & Rabat, pay on delivery","Livraison gratuite à Salé et Rabat, paiement à la réception","توصيل مجاني لسلا والرباط، والخلاص عند الاستلام"]
UI['h1a']=["Great products, ordered on WhatsApp, ","De bons produits, commandés sur WhatsApp, ","منتجات مزيانة، كتطلبها فواتساب "]
UI['h1b']=["paid when they arrive.","payés à la réception.","وكتخلصها ملي توصلك."]
UI['nocash']=["No prepayment. Check the product before you pay.","Rien à payer d'avance. Vérifiez le produit avant de payer.","ما كتخلص والو قبل. شوف المنتج قبل ما تخلص."]
for _k,_v in UI.items():
    _v[1]=_v[1].replace(' :','\u00a0:').replace(' ?','\u00a0?').replace(' !','\u00a0!')
E=lambda k:html.escape(UI[k][0])
T=lambda k:f'<span data-i18n="{k}">{E(k)}</span>'
def wa(text): return f"https://wa.me/{WA}?text="+urllib.parse.quote(text)
WAICON='<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>'
CHK='<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
CAM='<svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'
WAQ=html.escape(wa(UI['wa_q'][0]))
waq=lambda label,cls='btn wa':f'<a class="{cls}" data-waq href="{WAQ}" target="_blank" rel="noopener">{WAICON}{label}</a>'
cards=[]
for n,a in enumerate(arr):
    i=str(a['id']); t=tr[i][0]; ck=CK[a['categorie']]
    pct=round((a['price_del']-a['price'])*100/a['price_del'])
    cards.append(f'''<article class="card{' more' if n>=4 else ''}" data-cat="{ck}" data-id="{i}" data-price="{a['price']}" data-old="{a['price_del']}" data-off="{pct}" data-rank="{n}">
<button class="ph" type="button" data-open="{i}"><img src="img/p{i}.jpg" alt="{html.escape(t)}" loading="lazy" width="600" height="600"><span class="off" dir="ltr">-{pct}%</span><span class="cnt">{CAM}<span dir="ltr">{gal[i]}</span></span><span class="sr" data-i18n="details">{E('details')}</span></button>
<div class="cb"><span class="cat" data-cat-label="{ck}">{CATS[a['categorie']][0]}</span>
<h3><button class="tl" type="button" data-open="{i}" data-title="{i}">{html.escape(t)}</button></h3>
<div class="pr"><strong>{a['price']} {T('cur')}</strong><s>{a['price_del']} {T('cur')}</s></div>
<span class="fd"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>{T('fd')}</span>
<a class="btn wa" data-order="{i}" href="{html.escape(wa(UI['wa_o'][0].format(t=t,p=a['price'])))}" target="_blank" rel="noopener">{WAICON}{T('order')}</a>
</div></article>''')
from collections import Counter
cc=Counter(a['categorie'] for a in arr)
chips=f'<button class="chip on" data-f="all" type="button" aria-pressed="true">{T("all")} ({len(arr)})</button>'+''.join(f'<button class="chip" data-f="{CK[c]}" type="button" aria-pressed="false"><span data-cat-label="{CK[c]}">{CATS[c][0]}</span> ({cc[c]})</button>' for c in CATS)
avis=''.join(f'<button type="button" class="av" data-avis="{i}"><img src="img/avis{i}.jpg" alt="{E("avis_alt")}" data-i18n-alt="avis_alt" loading="lazy" width="420" height="866"></button>' for i in range(1,13))
P={str(a['id']):{'p':a['price'],'o':a['price_del'],'c':CK[a['categorie']],'n':gal[str(a['id'])]} for a in arr}
data={'ui':UI,'tr':tr,'cats':{CK[k]:v for k,v in CATS.items()},'wa':WA,'p':P}
css=open('tools/redesign/style.css').read()+open('tools/redesign/style2.css').read()
page=open('tools/redesign/tpl.html',encoding='utf-8').read()
rep={'TITLE':E('title'),'CSS':css,'CARDS':'\n'.join(cards),'CHIPS':chips,'AVIS':avis,'N':str(len(arr)),'DATA':json.dumps(data,ensure_ascii=False),'WAICON':WAICON,'CHK':CHK}
for k,v in rep.items(): page=page.replace('%%'+k+'%%',v)
page=re.sub(r'%%T:(\w+)%%',lambda m:T(m.group(1)),page)
page=re.sub(r'%%E:(\w+)%%',lambda m:E(m.group(1)),page)
page=re.sub(r'%%WAQ:(\w+)%%',lambda m:waq(T(m.group(1))),page)
page=page.replace('%%WAQHREF%%',WAQ)
assert '%%' not in page, re.findall(r'%%[^%]*%%',page)[:3]
open('docs/redesign/index.html','w',encoding='utf-8').write(page)
print(len(page)//1024,'KB', len(arr),'products')
