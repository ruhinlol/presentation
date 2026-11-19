/**
 * slideData.js — 17 Slayd Tam Versiyası (Statistika və Həll Yolu daxil)
 * Çıxışın Adı: "Endirim Etiketindən Ulduz Tozuna: Biz Həqiqətən Kimsəyik?"
 */

const SLIDES = [
  // ──── SLAYD 1 (id: 1, index 0): Açılış (00:00 - 02:00) ────
  {
    id: 1,
    title: "Endirim Etiketindən\nUlduz Tozuna",
    subtitle: "Biz Həqiqətən Kimsəyik?",
    keywords: ["İstehlakçılıq", "Beyin Hack", "Kapitalizm"],
    image: "assets/yeni1.jpg",
    imageAlt: "Alış-veriş torbalarından kosmosa keçid",
    bgGradient: "linear-gradient(135deg, #1a0a1e 0%, #2d0a3e 30%, #0d0d1a 100%)",
    bgAccent: "#FF2D78",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd1_1a.mp4",
    notes: `GİRİŞ (00:00 - 02:00):
(Səhnəyə əlində rəngli bir mağaza paketi ilə enerjili şəkildə daxil olursan. Arxada yüngül ambient musiqisi səslənir. Gülümsəyərək auditoriyaya baxırsan və bir neçə saniyə susursan.)

"Hər kəsə salam! Gəlin sizlə kiçik bir situasiyanı canlandıraq. Təsəvvür edin ki, Cümə axşamıdır, yorğun bir iş günündən və ya universitetdən sonra sadəcə bir çörək, bir də bəlkə su almaq üçün marketə girmisiniz. Amma evə qayıdanda əlinizdəki paketlərə baxırsınız: 3 fərqli şokolad, endirimdə olan amma bəlkə də heç vaxt geyinməyəcəyiniz o köynək, bir də ki... avokado. Niyə? Çünki hamı avokado yeyir! (Gülüş)

Sonra güzgünün qarşısında dayanıb özünüzə o klassik sualı verirsiniz: 'Mən bunu niyə aldım?! Mənim heç buna ehtiyacım yox idi!'

Xanımlar və bəylər, yəqin ki, bu hiss salondakı əksəriyyətinizə çox tanışdır. Amma özünüzü günahlandırmayın. Sizin iradəniz zəif deyil. Sadəcə olaraq, sizin və mənim beynim dünyanın ən böyük, ən ağıllı sistemi tərəfindən hack olunub: Kapitalizm tərəfindən."`
  },

  // ──── SLAYD 2 (id: 2, index 1): YENİ 1A — Güzgü Qarşısı ────
  {
    id: 2,
    title: "Mən Bunu Niyə Aldım?!",
    subtitle: "«Mənim heç buna ehtiyacım yox idi...»\nBeynimiz kapitalizm tərəfindən hack olunub.",
    keywords: ["Çaşqınlıq", "İmpulsiv Alış", "Güzgü"],
    image: "assets/yeni1a.jpg",
    imageAlt: "Güzgünün qarşısında çaşqın insan",
    bgGradient: "linear-gradient(135deg, #1a0a1e 0%, #2d0a3e 30%, #0d0d1a 100%)",
    bgAccent: "#E91E63",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd1a_2.mp4",
    notes: ""
  },

  // ──── SLAYD 3 (id: 3, index 2): Marketin Labirinti (Köhnə Slayd 2) ────
  {
    id: 3,
    title: "Marketin Labirinti",
    subtitle: "Göz səviyyəsi: 1 metr 60 santimetr.\nÇörək və süd isə — həmişə ən arxada.",
    keywords: ["Labirint", "1m 60sm Göz Səviyyəsi", "Təməl Tələ"],
    image: "assets/yeni2.jpg",
    imageAlt: "Market rəfləri labirint",
    bgGradient: "linear-gradient(135deg, #1a0a1e 0%, #2d1535 50%, #0d0d1a 100%)",
    bgAccent: "#FFD600",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd2_2a.mp4",
    notes: `"Bu gün biz insanların yaratdığı bu reallığın, Birinci Addımın içinə girəcəyik, oradan çıxıb əsl həqiqətə doğru səyahət edəcəyik. Gəlin əvvəlcə o marketin qapısından içəri yenidən girək.

Bilirdinizmi ki, heç bir böyük marketdə çörək və süd qapının ağzında olmur? Onlar həmişə ən uzaq küncdə, ən arxada yerləşir. Niyə? Çünki siz o təməl ehtiyacınıza çatana qədər labirintdən keçməli və ən azı 10 dənə lazımsız məhsulla göz-gözə gəlməlisiniz.

Gözünüzün tam bərabərində – yəni 1 metr 60 santimetr hündürlükdə – ən bahalı və marketin ən çox satmaq istədiyi mallar düzülür. Ucuzları isə ən aşağı rəfə qoyurlar ki, əyilməyə ərincəklik edəsiniz."`
  },

  // ──── SLAYD 4 (id: 4, index 3): YENİ 2A — Göz Səviyyəsi ────
  {
    id: 4,
    title: "1 Metr 60 Santimetr",
    subtitle: "Ən bahalı mallar göz bərabərində.\nUcuzlar isə — əyilməyə ərincəklik edəcəyiniz ən alt rəfdə.",
    keywords: ["Göz Səviyyəsi", "Təməl Tələ", "Market Hiyləsi"],
    image: "assets/yeni2a.jpg",
    imageAlt: "Market rəfi göz səviyyəsi",
    bgGradient: "linear-gradient(135deg, #1a0a1e 0%, #2d1535 50%, #0d0d1a 100%)",
    bgAccent: "#FFD600",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd2a_3.mp4",
    notes: ""
  },

  // ──── SLAYD 5 (id: 5, index 4): 70% Endirim və FOMO (Köhnə Slayd 3) ────
  {
    id: 5,
    title: "70% ENDİRİM",
    subtitle: "Fürsəti itirmək qorxusu (FOMO).\nBeyin qazanmaq hissini deyil, itirmək qorxusunu yaşayır.",
    keywords: ["FOMO", "Neyrobiologiya", "Məntiqin İflası"],
    image: "assets/yeni3.jpg",
    imageAlt: "Qırmızı endirim etiketi",
    bgGradient: "linear-gradient(135deg, #1a0505 0%, #3d0a0a 50%, #0d0d1a 100%)",
    bgAccent: "#FF3B30",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd3_3a.mp4",
    hasCounter: true,
    counterTarget: 70,
    counterSuffix: "%",
    counterLabel: "ENDİRİM",
    notes: `"Bəs o qırmızı rəngli '70% ENDİRİM' yazısı? Neyrobioloqlar sübut edib ki, beynimiz o yazını görəndə məntiq mərkəzimiz sıradan çıxır. Beyin 'qazanmaq' hissini deyil, 'fürsəti itirmək qorxusunu' (FOMO) daha şiddətli yaşayır.

Rəqəmlərə baxaq: Qlobal araşdırmalara görə, gündəlik alış-verişlərimizin 68%-i əvvəlcədən planlaşdırılmamış, sırf emosional və impulsiv qərarlardır! Şirkətlər təkcə bizi bu labirintlərdə saxlamaq üçün hər il dünyada 1 trilyon dollardan çox reklam və marketinq vəsaiti xərcləyirlər."`
  },

  // ──── SLAYD 6 (id: 6, index 5): YENİ 3A — Qlobal İqtisadi Tələ & Statistika ────
  {
    id: 6,
    title: "Qlobal İqtisadi Tələ",
    subtitle: "Gündəlik alışların 68%-i impulsivdir.\n1 trilyon dollar reklam və trilyonlarla istehlakçı borcu.",
    keywords: ["68% İmpulsiv Alış", "$1T Reklam", "Qlobal Borc", "Sistemik Tələ"],
    image: "assets/yeni3a.jpg",
    imageAlt: "Qlobal borc və maliyyə matrisi",
    bgGradient: "linear-gradient(135deg, #1a0505 0%, #2a0808 50%, #0d0d1a 100%)",
    bgAccent: "#FF3B30",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd3a_4.mp4",
    notes: `İQTİSADİYYAT VƏ QLOBAL BORC TƏLƏSİ:
"Bəs bu iqtisadiyyata necə təsir edir? Tam olaraq desək, bu mexanizm iqtisadiyyata belə təsir edir:

İqtisadiyyat təbii ehtiyaclar deyil, süni şəkildə qızışdırılan tələbat və nəhəng istehlakçı borclanması üzərində fırlanır. İnsanlar mövcud olmayan pulla — kredit kartları ilə — ehtiyacları olmayan şeyləri alırlar və bu gün qlobal istehlakçı borcu trilyonlarla dollarlıq rekord həddə çatıb.

İqtisadiyyat 'artım naminə artım' prinsipinə qurban verilir və planetin tükənən resursları bir dəfəlik əşyalara sərf olunur."`
  },

  // ──── SLAYD 7 (id: 7, index 6): Filtrlənmiş Həyat (Köhnə Slayd 4) ────
  {
    id: 7,
    title: "Filtrlənmiş Həyat",
    subtitle: "«Mən yetərsizəm.»\nSaxta highlight reallığı ilə müqayisə tələsi.",
    keywords: ["Qüsursuzluq İllüziyası", "Müqayisə Tələsi", "Özgüvən Eroziyası"],
    image: "assets/yeni4.jpg",
    imageAlt: "Sosial media telefon ekranları",
    bgGradient: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0d0d1a 100%)",
    bgAccent: "#9B59B6",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd4_4a.mp4",
    notes: `SOSİAL MEDİA VƏ ÖZGÜVƏN İLLÜZİYASI (02:00 - 05:00):
(Səs tonunu bir az ciddiləşdirirsən)

"Amma məsələ yalnız market rəflərində və endirim etiketlərində bitmir. Gəlin bir az daha dərinə, əlimizdən düşməyən telefonlarımızın içinə və ruhumuzun boşluqlarına baxaq.

Niyə biz dayanmadan istehlak edirik? Niyə bizə daim yeni nəsə lazımdır?

Çünki hər gün sosial medianı açanda biz insanların yalnız ən mükəmməl, filtrlənmiş, ən xoşbəxt anlarını görürük. O qüsursuz dərilər, bahalı maşınlar, elit kafelərdə içilən qəhvələr, mükəmməl bədən ölçüləri. Və istər-istəməz insan öz həqiqi, adi həyatını o saxta reallıqla müqayisə etməyə başlayır.

Beynimizdə bir siqnal yanır: 'Mən yetərsizəm'. Özgüvənimiz sarsılır. Və bilirsiz kapitalizm bizə nə deyir? 'Sən kədərlisən? Yetərsizsən? Gəl, sən o yeni kosmetikanı, ya da o prestijli saatı al, sən də hamı kimi olacaqsan!'

Biz mağazalara əşya almağa getmirik. Biz içimizdəki o özgüvən boşluğunu doldurmağa gedirik. Biz xoşbəxtlik, status və 'mən də varam' hissini satın almağa çalışırıq. Biz elə bilirik ki, bu əşyalar bizi 'biz' edir."`
  },

  // ──── SLAYD 8 (id: 8, index 7): YENİ 4A — Daxili Boşluğun Satışı ────
  {
    id: 8,
    title: "Daxili Boşluğun Satışı",
    subtitle: "Biz əşya almağa getmirik.\nİçimizdəki o özgüvən boşluğunu doldurmağa gedirik.",
    keywords: ["Özgüvən Boşluğu", "Status İllüziyası", "Saxta Dəyər"],
    image: "assets/yeni4a.jpg",
    imageAlt: "Mağaza vitrini qarşısında boş siluet",
    bgGradient: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0d0d1a 100%)",
    bgAccent: "#FF6B35",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd4a_5.mp4",
    notes: ""
  },

  // ──── SLAYD 9 (id: 9, index 8): Kapitalizmin Vədi (Köhnə Slayd 5) ────
  {
    id: 9,
    title: "Al, sən də hamı\nkimi olacaqsan.",
    subtitle: "Biz əşya yox, hisslər alırıq.\nXoşbəxtlik, status və «mən də varam» illüziyası.",
    keywords: ["Özgüvən Boşluğu", "Status Tələsi", "Brend Asılılığı"],
    image: "assets/yeni5.jpg",
    imageAlt: "Brend etiketləri ilə örtülmüş siluet",
    bgGradient: "linear-gradient(135deg, #1a1005 0%, #2d1a0a 50%, #0d0d1a 100%)",
    bgAccent: "#FF6B35",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd56.mp4",
    notes: `"Özgüvənimiz sarsılır. Və bilirsiz kapitalizm bizə nə deyir? 'Sən kədərlisən? Yetərsizsən? Gəl, sən o yeni kosmetikanı, ya da o prestijli saatı al, sən də hamı kimi olacaqsan!'

Biz mağazalara əşya almağa getmirik. Biz içimizdəki o özgüvən boşluğunu doldurmağa gedirik. Biz xoşbəxtlik, status və 'mən də varam' hissini satın almağa çalışırıq. Biz elə bilirik ki, bu əşyalar bizi 'biz' edir."`
  },

  // ──── SLAYD 10 (id: 10, index 9): Sürü Psixologiyası (Köhnə Slayd 6) ────
  {
    id: 10,
    title: "Sürü Psixologiyası\nvə Fiziki Ağrı",
    subtitle: "Kütlədən seçilmək ölüm demək idi.\nfMRI: Kütləyə qarşı çıxmaq beynin fiziki ağrı mərkəzini aktivləşdirir!",
    keywords: ["Biologiya", "Sürü İnstinkti", "fMRI Neyroelm", "Fiziki Ağrı"],
    image: "assets/yeni6.jpg",
    imageAlt: "fMRI beynin ağrı mərkəzi və sürü instinkti",
    bgGradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1035 50%, #0d0d1a 100%)",
    bgAccent: "#D4A017",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd6_6a.mp4",
    notes: `SÜRÜ PSİXOLOGİYASI VƏ BEYİN (05:00 - 06:30):
(Səhnədə bir az irəli gəlirsən, tamaşaçılarla göz kontaktı qurursan)

"Bəlkə də indi çoxunuz düşünürsünüz ki: 'Əgər bunu biliriksə, niyə sadəcə dayanıb bu oyunu oynamırıq?'

Çünki biologiyamız bizə mane olur. Sürü psixologiyası! Min illər əvvəl mağarada yaşayanda kütlədən seçilmək ölüm demək idi. Funksional MRT aparatlarında insanların beyinlərini incələyəndə kəşf etdilər ki, kütləyə qarşı çıxmaq, qrupdan fərqli bir şey etmək beynin fiziki ağrı mərkəzini aktivləşdirir. Bəli, kütlədən fərqli düşünmək sözün əsl mənasında beynimizə fiziki ağrı verir! Biz sırf cəmiyyətin bir hissəsi olmaq üçün, bir illüziyanın içində — Birinci Addımda var gücümüzlə qaçırıq."`
  },

  // ──── SLAYD 11 (id: 11, index 10): YENİ 6A — fMRI Beyin Analizi ────
  {
    id: 11,
    title: "fMRI Beyin Analizi",
    subtitle: "Kütləyə qarşı çıxmaq sözün əsl mənasında\nbeynimizin fiziki ağrı mərkəzini aktivləşdirir!",
    keywords: ["Neyrobiologiya", "fMRI Skan", "Fiziki Ağrı", "Qrup Təzyiqi"],
    image: "assets/yeni6a.jpg",
    imageAlt: "fMRI beyin skan təsviri",
    bgGradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1035 50%, #0d0d1a 100%)",
    bgAccent: "#D4A017",
    phase: "consumer",
    transitionVideo: "assets/transitions/slayd6a_7.mp4",
    notes: ""
  },

  // ──── SLAYD 12 (id: 12, index 11): Market Xaosu (Köhnə Slayd 7) ────
  {
    id: 12,
    title: "Musiqi və Xaos\nİllüziyası",
    subtitle: "O xüsusi musiqilər olmasaydı...\nParlaq reallığın arxa planı xaos kimi səslənərdi.",
    keywords: ["İllüziya", "Market Xaosu", "Səssizlik", "Manipulyasiya"],
    image: "assets/yeni7.jpg",
    imageAlt: "Supermarketdə səs dalğaları və xaos illüziyası",
    bgGradient: "linear-gradient(135deg, #1a0515 0%, #2a0a25 50%, #0d0d1a 100%)",
    bgAccent: "#FF2D78",
    phase: "consumer",
    transitionVideo: null,
    notes: `KULMİNASİYA KEÇİDİ: MUSİQİ VƏ XAOS İLLÜZİYASI (06:30 - 07:30):
(Gülümsəyərək səsini qəsdən bir az alçaldırsan. Çıxışın əvvəlindən bəri arxa planda gedən o yüngül musiqi qəflətən KƏSİLİR. Zalda tam sükut yaranır).

"Fikir verdinizsə, mən bura çıxandan bəri arxa fonda çox yüngül, rahatlaşdırıcı bir musiqi sədası gəlirdi. İndi isə bitdi. Bilirsiniz o musiqi bütün bu müddət ərzində niyə çalırdı? Çünki sizə kiçik bir situasiya yaşatmaq istədim.
Əgər o böyük, bəzəkli mağazalarda bu cür xüsusi seçilmiş musiqilər olmasaydı, o parlaq reallığın arxa planı əslində tam olaraq belə səslənərdi..."

(Burada zalda qəflətən xaos səs-küyü: market arabalarının səsi, uğultu, uşaq ağlaması, qarmaqarışıq insan səsləri eşidilir. 5-6 saniyə çalır və sən danışmağa başlayanda səs-küy yavaş-yavaş azalır).

"Təsəvvür edirsiniz? Sadəcə bir musiqi ilə o qarmaqarışıq xaosu ört-basdır edib, sizi o məkanda daha uzun müddət saxlaya, vaxtın necə keçdiyini unutdura bilirlər. İnsan varoluşu qədər mürəkkəb, dərin və sirrli bir mexanizm yox ikən, bizim belə sadə illüziyalara aldanmağımız çox qəribə deyilmi?
Gəlin indi bu səs-küyü, bu illüziyanı, insanların yaratdığı o süni materialist dünyanı tamamilə kənara qoyaq. Üzərimizdəki o 'markaları', geyimləri, cəmiyyətin bizə yapışdırdığı etiketləri çıxarsaq... geriyə nə qalır?"`
  },

  // ──── SLAYD 13 (id: 13, index 12): Keçid — Geriyə Nə Qalır? (Köhnə Slayd 8) ────
  {
    id: 13,
    title: "Geriyə nə qalır?",
    subtitle: "Üzərimizdəki markaları, etiketləri çıxartsaq...\nBiz həqiqətən kimsəyik?",
    keywords: ["Etiketlərdən Azadlıq", "Həqiqi Mənlik", "Kosmik Keçid"],
    image: "assets/yeni8.jpg",
    imageAlt: "Etiketlərin soyulması — keçid anı",
    bgGradient: "linear-gradient(135deg, #0d0d1a 0%, #0a0a2e 50%, #050510 100%)",
    bgAccent: "#3a3a5c",
    phase: "transition",
    transitionVideo: "assets/transitions/slayd89.mp4",
    notes: `KEÇİD: VAROLUŞA DOĞRU:
(Səs tonunu dərinləşdirir və sakit, səmimi bir nəfəs alırsan)

"Amma gəlin bu gün o qəbilədən, o sürünün təzyiqindən, endirim etiketlərindən bir anlıq kənara çıxaq.

Üzərimizdəki o 'markaları', geyimləri, cəmiyyətin bizə yapışdırdığı bütün o süni etiketləri çıxarsaq... geriyə nə qalır?

Biz həqiqətən kimsəyik? Gəlin indi kainatın düz mərkəzinə gedək..."

(M83 - "Outro" mahnısı 0:00-dan 5s gecikmə ilə başlayır, partlayış 2:25-də olur).`
  },

  // ──── SLAYD 14 (id: 14, index 13): Ulduz Tozu (Köhnə Slayd 9) ────
  {
    id: 14,
    title: "Biz ulduz tozundan\nyaranmışıq.",
    subtitle: "Biz kainatın özünə baxan gözləriyik.\nŞüurumuz 13.8 milyard illik möcüzədir.",
    keywords: ["Fe", "Ca", "O₂", "C"],
    image: "assets/yeni9.jpg",
    imageAlt: "Supernova partlayışı qalaktikada",
    bgGradient: "linear-gradient(135deg, #050510 0%, #0a0a2e 50%, #050510 100%)",
    bgAccent: "#4FC3F7",
    phase: "cosmic",
    transitionVideo: "assets/transitions/slayd9_9a.mp4",
    hasCounter: true,
    counterTarget: 13.8,
    counterSuffix: " mlrd il",
    counterLabel: "Kainatın yaşı",
    notes: `KULMİNASİYA: VAROLUŞ VƏ KAİNAT (07:30 - 09:30):
"Biz həqiqətən kimik? Gəlin Üçüncü Addıma, kainatın düz mərkəzinə gedək.
Elmə, astrofizikaya müraciət edək. Bu kainatın 13.8 milyard yaşı var! Bizim isə bu planetdə orta hesabla cəmi 70-80 illik qısa bir vizitimiz var.

Bilirdinizmi ki, bədəninizdəki o elementlər – qanınızdakı dəmir, sümüklərimizdəki kalsium, nəfəs aldığınız oksigen, saçlarınızdakı karbon necə yaranıb? Onlar milyardlarla il əvvəl qalaktikanın hansısa bir küncündə nəhəng ulduzların partlaması nəticəsində kosmosa səpələnib.

Bəli, ehtiyacınız olmayan bir əşyanı ala bilmədiyiniz üçün özünüzü pis hiss etdiyiniz o bədəniniz... əslində ulduz tozundan ibarətdir!

Təsəvvür edirsiniz? Kainat 13.8 milyard il əlləşib, ulduzlar yaradıb, qalaktikalar toqquşdurub, planetləri formalaşdırıb ki, bu gün siz var olasınız. Biz, kainatın özünə baxan gözləriyik!

Amma biz neynirik? Biz bu möhtəşəm, möcüzəvi varoluş səbəbimizi unudub, oturub sosial mediada kiminsə həyatına baxıb depressiyaya düşürük. Varlığımızın əsl səbəbi, həqiqi müdriklik — neçə dənə bahalı əşyaya sahib olmağımız deyil. Sizi dəyərli edən geyindiyiniz paltar, istifadə etdiyiniz telefon deyil. Sizi dəyərli edən milyardlarla illik kosmik bir təkamülün nəticəsi olan şüurunuzdur."`
  },

  // ──── SLAYD 15 (id: 15, index 14): YENİ 9A — Kainatın Gözləri ────
  {
    id: 15,
    title: "Kainatın Gözləri",
    subtitle: "Kainat 13.8 milyard il əlləşib ki, bu gün siz var olasınız.\nBiz, kainatın özünə baxan gözləriyik!",
    keywords: ["Şüur", "Kosmik Təkamül", "Kainatın Gözü"],
    image: "assets/yeni9a.jpg",
    imageAlt: "Kosmik göz nebulası",
    bgGradient: "linear-gradient(135deg, #050510 0%, #0a0a2e 50%, #050510 100%)",
    bgAccent: "#7C4DFF",
    phase: "cosmic",
    transitionVideo: "assets/transitions/slayd9a_9b.mp4",
    notes: ""
  },

  // ──── SLAYD 16 (id: 16, index 15): YENİ 9B — Həll Yolu (Solution) ────
  {
    id: 16,
    title: "Həll Yolu:\nŞüurlu İstehlak",
    subtitle: "«72 Saat Qaydası» ilə dopamin tələsini sındırın.\nDairəvi İqtisadiyyat ilə resursları qoruyun.",
    keywords: ["72 Saat Qaydası", "Dairəvi İqtisadiyyat", "Şüurlu İstehlak", "Azadlıq"],
    image: "assets/yeni9b.jpg",
    imageAlt: "72 saat qaydası kosmik qum saatı və dairəvi harmoniya",
    bgGradient: "linear-gradient(135deg, #050515 0%, #101035 50%, #050510 100%)",
    bgAccent: "#FFD700",
    phase: "cosmic",
    transitionVideo: "assets/transitions/slayd9b_10.mp4",
    notes: `HƏLL YOLU (SOLUTİON):
"Bəs yaxşı, sual olunur: Biz bu problemi necə həll edə bilərik? Bu labirintdən çıxış yolu nədir?

Həll həm fərdi, həm də qlobal iqtisadi səviyyədə mövcuddur:
Birincisi, fərdi səviyyədə: '72 Saat Qaydası'. Neyroiqtisadiyyat sübut edir ki, hər hansı bir əşyanı almaq istəyəndə sadəcə 72 saat gözləsəniz, beyindəki süni dopamin dalğası enir və impulsiv alış qərarlarının 80%-i ləğv olunur. Özünüzə sadə bir sual verin: 'Bu əşya mənim həqiqi həyat keyfiyyətimi artıracaq, yoxsa sadəcə 5 dəqiqəlik status illüziyası verir?'

İkincisi, iqtisadi səviyyədə: Şüurlu İstehlakçılıq və Dairəvi İqtisadiyyat (Circular Economy). Biz iqtisadi uğuru yalnız kor-təbii istehlakla və şişirdilmiş ÜDM rəqəmləri ilə deyil, cəmiyyətin real rifahı və resursların dayanıqlılığı ilə ölçməyi öyrənməliyik. Tələbatı reklam alqoritmləri yox, şüurlu insanlar formalaşdırmalıdır."`
  },

  // ──── SLAYD 17 (id: 17, index 16): Final (Köhnə Slayd 10) ────
  {
    id: 17,
    title: "Mən ulduz tozuyam.\nMən kainatam.",
    subtitle: "Məqsədimiz nələrisə almaq yox;\nanlamaq, yaşamaq və var olmaqdır.",
    keywords: ["Dərin Şüur", "Həqiqi Azadlıq", "Varoluş"],
    image: "assets/yeni10.jpg",
    imageAlt: "Kosmik ulduz tozu — final",
    bgGradient: "linear-gradient(135deg, #050510 0%, #080820 50%, #050510 100%)",
    bgAccent: "#7C4DFF",
    phase: "cosmic",
    transitionVideo: null,
    notes: `SONLUQ VƏ MESAJ:
(Yenidən gülümsəyir, amma səmimi və güclü bir səs tonu ilə yekunlaşdırırsan)

"Buna görə də, əziz dinləyicilər... Növbəti dəfə mağazada əlinizi heç vaxt istifadə etməyəcəyiniz o məhsula uzadanda... Ya da gecə yatmazdan əvvəl sosial mediada kiməsə baxıb özünüzü yetərsiz hiss edəndə... sadəcə bir saniyəlik dayanın. Dərin bir nəfəs alın.

Özünüzə xatırladın: Mən ucuz bir marketinq hiyləsinə, bir endirim etiketinə qurban gedəcək qədər sadə deyiləm. Mənim dəyərim başqalarının 'like'ları ilə ölçülə bilməz.

Mən ulduz tozuyam. Mən kainatam. Və mənim bu dünyadakı məqsədim nələrisə almaq yox, sadəcə... anlamaq, yaşamaq və var olmaqdır.

Təşəkkür edirəm!"`
  }
];
