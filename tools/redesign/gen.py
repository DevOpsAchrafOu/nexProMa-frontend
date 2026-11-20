import json,html,urllib.parse
arr=json.load(open('tools/redesign/articles.json')); tr=json.load(open('tools/redesign/tr.json'))
WA='212600000000'
CATS={'إلكترونيات':['Electronics','Électronique','إلكترونيات'],'رياضة ولياقة':['Sport & fitness','Sport & fitness','رياضة ولياقة'],'إكسسوارات شخصية':['Accessories','Accessoires','إكسسوارات شخصية'],'المنزل والرفاهية':['Home & comfort','Maison & confort','المنزل والرفاهية']}
CK={'إلكترونيات':'elec','رياضة ولياقة':'sport','إكسسوارات شخصية':'acc','المنزل والرفاهية':'home'}
UI={
'title':["nexProMa — Free delivery in Salé & Rabat, cash on delivery","nexProMa — Livraison gratuite à Salé et Rabat, paiement à la livraison","nexProMa — توصيل مجاني لسلا والرباط والدفع عند الاستلام"],
'nav_products':["Products","Produits","المنتجات"],'nav_how':["How to order","Commander","كيفاش نطلب"],'nav_reviews':["Reviews","Avis","آراء الزبناء"],'nav_faq':["FAQ","FAQ","أسئلة"],
'pill':["Free delivery in Salé & Rabat · Cash on delivery","Livraison gratuite à Salé et Rabat · Paiement à la livraison","توصيل مجاني لسلا والرباط · الخلاص عند الاستلام"],
'h1a':["Handpicked products at great prices — ","Des produits choisis à bon prix — ","منتجات مختارة بأثمنة مزيانة — "],
'h1b':["order on WhatsApp, pay when it arrives","commandez sur WhatsApp, payez à la réception","طلب فواتساب، وخلص ملي توصلك"],
'lead':["Electronics, sport, accessories and home products. No account, no bank card: pick a product, send us a message, and we deliver it to you.","Électronique, sport, accessoires et maison. Sans compte ni carte bancaire : choisissez un produit, envoyez-nous un message, on vous le livre.","إلكترونيات، رياضة، إكسسوارات ومنتجات للدار. ما كاين لا حساب لا بطاقة بنكية: اختار المنتج، صيفط لينا ميساج، ونوصلوه ليك."],
'see':["See the products","Voir les produits","شوف المنتجات"],'ask':["Ask us on WhatsApp","Écrivez-nous sur WhatsApp","سولنا فواتساب"],
't1':["Cash on delivery","Paiement à la livraison","الدفع عند الاستلام"],'t2':["Free delivery in Salé & Rabat","Livraison gratuite à Salé et Rabat","توصيل مجاني لسلا والرباط"],'t3':["Témara on weekends","Témara le week-end","تمارة فعطلة آخر الأسبوع"],'t4':["After-sales support 24/7","Service après-vente 24h/24, 7j/7","خدمة ما بعد البيع 24/24 طول الأسبوع"],
'p_h':["Products","Produits","المنتجات"],'p_sub':["Every product is one tap away: the WhatsApp message is written for you.","Chaque produit se commande en un clic : le message WhatsApp s'écrit tout seul.","كل منتج كيتطلب بضغطة وحدة: الميساج كيتكتب بوحدو فواتساب."],
'all':["All","Tous","الكل"],'order':["Order on WhatsApp","Commander sur WhatsApp","اطلب فواتساب"],'cur':["MAD","DH","درهم"],
'how_h':["How to order","Comment commander","كيفاش نطلب؟"],'how_sub':["3 steps, no sign-up.","3 étapes, sans inscription.","3 خطوات، بلا تسجيل."],
's1h':["Pick a product","Choisissez un produit","اختار المنتج"],'s1p':["Tap “Order on WhatsApp” under the product you like.","Appuyez sur « Commander sur WhatsApp » sous le produit.","ضغط على «اطلب فواتساب» تحت المنتج اللي عجبك."],
's2h':["Send the message","Envoyez le message","صيفط الميساج"],'s2p':["We confirm your address and delivery time with you.","On confirme avec vous l'adresse et l'heure de livraison.","كنأكدو معاك العنوان ووقت التوصيل."],
's3h':["Pay on delivery","Payez à la réception","خلص ملي توصلك"],'s3p':["Check the product with your own eyes, then pay.","Vérifiez le produit, puis payez.","شوف المنتج بعينيك، ومن بعد خلص."],
'rev_h':["Our products speak for themselves","Nos produits parlent d'eux-mêmes","منتجاتنا كتهضر على راسها"],'rev_sub':["Real WhatsApp conversations with our customers.","Vraies conversations WhatsApp avec nos clients.","محادثات حقيقية مع زبنائنا فواتساب."],
'faq_h':["Frequently asked questions","Questions fréquentes","أسئلة كتكرر"],
'q1':["Can I pay when the order arrives?","Puis-je payer à la livraison ?","واش نقدر نخلص ملي توصلني السلعة؟"],'a1':["Yes, you pay cash on delivery. No bank card or account needed.","Oui, vous payez à la livraison. Pas besoin de carte bancaire ni de compte.","إيه، الخلاص كيكون عند الاستلام. ما كتحتاج لا بطاقة بنكية لا حساب."],
'q2':["How much is delivery?","Combien coûte la livraison ?","شحال كيكلف التوصيل؟"],'a2':["Delivery is free in Salé and Rabat. We deliver to Témara on weekends.","La livraison est gratuite à Salé et Rabat. Témara est livrée le week-end.","التوصيل مجاني لسلا والرباط. تمارة كنوصلو ليها فعطلة آخر الأسبوع."],
'q3':["I live in another city. Do you deliver?","J'habite dans une autre ville. Vous livrez ?","كنسكن فمدينة أخرى، واش كتوصلو؟"],'a3':["Send us your city and the product on WhatsApp and we'll get back to you.","Envoyez-nous votre ville et le produit sur WhatsApp, on vous répond.","صيفط لينا فواتساب المدينة ديالك والمنتج اللي بغيتي، ونجاوبوك."],
'q4':["What if there's a problem with the product?","Et s'il y a un problème avec le produit ?","إلا كان شي مشكل فالمنتج؟"],'a4':["After-sales support is available 24/7 on WhatsApp.","Le service après-vente est disponible 24h/24, 7j/7 sur WhatsApp.","خدمة ما بعد البيع متوفرة 24/24 طول الأسبوع فواتساب."],
'fin_h':["Found something you like?","Vous avez trouvé votre bonheur ?","لقيتي شي حاجة عجباتك؟"],'fin_p':["Message us now — delivery is free in Salé and Rabat.","Écrivez-nous maintenant — livraison gratuite à Salé et Rabat.","صيفط لينا دابا، والتوصيل فابور لسلا والرباط."],
'fin_b':["Order on WhatsApp","Commander sur WhatsApp","طلب فواتساب"],'rights':["© 2026 nexProMa — All rights reserved","© 2026 nexProMa — Tous droits réservés","© 2026 nexProMa — جميع الحقوق محفوظة"],
'bar_p':["Products","Produits","المنتجات"],
'wa_q':["Hello, I have a question about a product","Bonjour, j'ai une question sur un produit","السلام، عندي سؤال على منتج"],
'wa_o':["Hello, I'd like to order: {t} — {p} MAD","Bonjour, je souhaite commander : {t} — {p} DH","السلام، بغيت نطلب: {t} — {p} درهم"],
'avis_alt':["Real WhatsApp conversation with a customer","Vraie conversation WhatsApp avec un client","محادثة واتساب حقيقية مع زبون"],
}
E=lambda k:html.escape(UI[k][0])
def wa(text): return f"https://wa.me/{WA}?text="+urllib.parse.quote(text)
WAICON='<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>'
CHK='<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
T=lambda k:f'<span data-i18n="{k}">{E(k)}</span>'
cards=[]
for a in arr:
    i=str(a['id']); t=tr[i][0]; ck=CK[a['categorie']]
    pct=round((a['price_del']-a['price'])*100/a['price_del'])
    cards.append(f'''<article class="card" data-cat="{ck}" data-id="{i}" data-price="{a['price']}">
<div class="ph"><img src="img/p{i}.jpg" alt="{html.escape(t)}" loading="lazy" width="600" height="600"><span class="off" dir="ltr">-{pct}%</span></div>
<div class="cb"><span class="cat" data-cat-label="{ck}">{CATS[a['categorie']][0]}</span>
<h3 data-title="{i}">{html.escape(t)}</h3>
<div class="pr"><strong>{a['price']} {T('cur')}</strong><s>{a['price_del']} {T('cur')}</s></div>
<a class="btn wa" data-order="{i}" href="{html.escape(wa(UI['wa_o'][0].format(t=t,p=a['price'])))}" target="_blank" rel="noopener">{WAICON}{T('order')}</a>
</div></article>''')
chips=f'<button class="chip on" data-f="all" type="button" aria-pressed="true">{T("all")} ({len(arr)})</button>'+''.join(f'<button class="chip" data-f="{CK[c]}" type="button" aria-pressed="false"><span data-cat-label="{CK[c]}">{CATS[c][0]}</span> ({sum(1 for a in arr if a["categorie"]==c)})</button>' for c in CATS)
avis=''.join(f'<img src="img/avis{i}.jpg" alt="{E("avis_alt")}" data-i18n-alt="avis_alt" loading="lazy" width="420" height="866">' for i in range(1,13))
WAQ=html.escape(wa(UI['wa_q'][0]))
waq=lambda label:f'<a class="btn wa" data-waq href="{WAQ}" target="_blank" rel="noopener">{WAICON}{label}</a>'
data={'ui':UI,'tr':tr,'cats':{CK[k]:v for k,v in CATS.items()},'wa':WA}
css=open('tools/redesign/style.css').read()
page=f'''<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E('title')}</title>
<meta name="description" content="nexProMa: electronics, sport, accessories and home products at great prices. Free delivery in Salé and Rabat, cash on delivery. Order directly on WhatsApp.">
<meta property="og:title" content="{E('title')}">
<meta property="og:image" content="img/p23.jpg">
<link rel="alternate" hreflang="en" href="?lang=en"><link rel="alternate" hreflang="fr" href="?lang=fr"><link rel="alternate" hreflang="ar" href="?lang=ar">
<link rel="icon" href="../favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"Store","name":"nexProMa","telephone":"+212768808146","areaServed":["Salé","Rabat","Témara"],"paymentAccepted":"Cash on delivery","url":"https://devopsachrafou.github.io/nexProMa-frontend/redesign/"}}</script>
<style>{css}</style>
</head>
<body>
<header class="top"><div class="wrap">
<a class="logo" href="#top" aria-label="nexProMa"><img src="../assets/images/nexProMa_logo.svg" alt="nexProMa" width="160" height="40"></a>
<nav aria-label="Menu"><a href="#products">{T('nav_products')}</a><a href="#how">{T('nav_how')}</a><a href="#avis">{T('nav_reviews')}</a><a href="#faq">{T('nav_faq')}</a></nav>
<div class="right">
<div class="lang" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="true">EN</button><button type="button" data-lang="fr" aria-pressed="false">FR</button><button type="button" data-lang="ar" aria-pressed="false" lang="ar">ع</button></div>
<a class="btn wa hide-sm" data-waq href="{WAQ}" target="_blank" rel="noopener">{WAICON}WhatsApp</a>
</div>
</div></header>

<main id="top">
<div class="hero"><div class="wrap">
<div class="txt">
<span class="pill">{T('pill')}</span>
<h1>{T('h1a')}<em>{T('h1b')}</em></h1>
<p class="lead">{T('lead')}</p>
<div class="ctas"><a class="btn blue" href="#products">{T('see')} ({len(arr)})</a>{waq(T('ask'))}</div>
</div>
<div class="collage" aria-hidden="true"><img src="img/p23.jpg" alt=""><img src="img/p1.jpg" alt=""><img src="img/p12.jpg" alt=""></div>
</div></div>

<div class="trust"><div class="wrap">
<span>{CHK}{T('t1')}</span><span>{CHK}{T('t2')}</span><span>{CHK}{T('t3')}</span><span>{CHK}{T('t4')}</span>
</div></div>

<section id="products"><div class="wrap">
<h2>{T('p_h')}</h2><p class="sub">{T('p_sub')}</p>
<div class="chips" role="group">{chips}</div>
<div class="grid">
{chr(10).join(cards)}
</div>
</div></section>

<section id="how" class="white"><div class="wrap">
<h2>{T('how_h')}</h2><p class="sub">{T('how_sub')}</p>
<div class="steps">
<div class="step"><b>1</b><h3>{T('s1h')}</h3><p>{T('s1p')}</p></div>
<div class="step"><b>2</b><h3>{T('s2h')}</h3><p>{T('s2p')}</p></div>
<div class="step"><b>3</b><h3>{T('s3h')}</h3><p>{T('s3p')}</p></div>
</div>
</div></section>

<section id="avis"><div class="wrap">
<h2>{T('rev_h')}</h2><p class="sub">{T('rev_sub')}</p>
<div class="avis" tabindex="0">{avis}</div>
</div></section>

<section id="faq" class="white"><div class="wrap narrow">
<h2>{T('faq_h')}</h2>
{''.join(f'<details><summary>{T("q"+str(n))}</summary><p>{T("a"+str(n))}</p></details>' for n in range(1,5))}
</div></section>

<section class="final"><div class="wrap">
<h2>{T('fin_h')}</h2><p>{T('fin_p')}</p>
{waq(T('fin_b'))}
</div></section>
</main>

<footer><div class="wrap"><span>{T('rights')}</span><span>Redesign by OA</span></div></footer>
<div class="bar">{waq('WhatsApp')}<a class="btn blue" href="#products">{T('bar_p')}</a></div>

<script>
var D={json.dumps(data,ensure_ascii=False)};
(function(){{
var IDX={{en:0,fr:1,ar:2}};
function wa(t){{return 'https://wa.me/'+D.wa+'?text='+encodeURIComponent(t)}}
function setLang(l){{
 if(!(l in IDX))l='en';var i=IDX[l];
 document.documentElement.lang=l;document.documentElement.dir=(l==='ar'?'rtl':'ltr');
 document.title=D.ui.title[i];
 document.querySelectorAll('[data-i18n]').forEach(function(e){{var k=e.getAttribute('data-i18n');if(D.ui[k])e.textContent=D.ui[k][i]}});
 document.querySelectorAll('[data-i18n-alt]').forEach(function(e){{e.alt=D.ui[e.getAttribute('data-i18n-alt')][i]}});
 document.querySelectorAll('[data-cat-label]').forEach(function(e){{e.textContent=D.cats[e.getAttribute('data-cat-label')][i]}});
 document.querySelectorAll('[data-title]').forEach(function(e){{e.textContent=D.tr[e.getAttribute('data-title')][i]}});
 document.querySelectorAll('.card').forEach(function(c){{var id=c.getAttribute('data-id'),t=D.tr[id][i];c.querySelector('img').alt=t;
  c.querySelector('[data-order]').href=wa(D.ui.wa_o[i].replace('{{t}}',t).replace('{{p}}',c.getAttribute('data-price')))}});
 document.querySelectorAll('[data-waq]').forEach(function(a){{a.href=wa(D.ui.wa_q[i])}});
 document.querySelectorAll('[data-lang]').forEach(function(b){{b.setAttribute('aria-pressed',b.getAttribute('data-lang')===l)}});
 try{{localStorage.setItem('nx_lang',l)}}catch(e){{}}
}}
document.querySelectorAll('[data-lang]').forEach(function(b){{b.addEventListener('click',function(){{setLang(b.getAttribute('data-lang'))}})}});
var q=new URLSearchParams(location.search).get('lang'),s=null;try{{s=localStorage.getItem('nx_lang')}}catch(e){{}}
var l=q||s||'en';if(l!=='en')setLang(l);
document.querySelectorAll('.chip').forEach(function(b){{b.addEventListener('click',function(){{
 var f=b.getAttribute('data-f');document.querySelectorAll('.chip').forEach(function(x){{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)}});
 document.querySelectorAll('.card').forEach(function(c){{c.hidden=!(f==='all'||c.getAttribute('data-cat')===f)}})}})}});
}})();
</script>
</body>
</html>
'''
open('docs/redesign/index.html','w',encoding='utf-8').write(page)
print(len(page)//1024,'KB')
