import { firebaseConfig } from "./firebase-config.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const models = {
  brain: {
    title: "İnsan beyni",
    url: "https://sketchfab.com/models/0aa0e33c5c854d1bab7bac9e1c7acaec/embed?autostart=1&ui_infos=0&ui_annotations=0&ui_watermark=1",
    credit: "Model: FrankJohansson · Sketchfab · CC BY",
    symbol: "🧠",
    intro: "Beyin; duyulardan gelen bilgileri değerlendirir, hareketleri ve birçok yaşamsal işlevi düzenler.",
    fact: "Beyin, merkezi sinir sisteminin bir parçasıdır."
  },
  cell: {
    title: "Hayvan hücresi",
    url: "https://sketchfab.com/models/0d9f7f4257224975b2ef83a283709b2f/embed?autostart=1&ui_infos=0&ui_annotations=0&ui_watermark=1",
    credit: "Model: montanna · Sketchfab · CC BY",
    symbol: "🧫",
    intro: "Hayvan hücresi; hücre zarı, sitoplazma ve çeşitli organellerden oluşur. Nöron da özelleşmiş bir hayvan hücresidir.",
    fact: "Hücre zarı madde alışverişini düzenler."
  },
  neuron: {
    title: "Nöron",
    url: "https://sketchfab.com/models/d2a2dedec2f846cf9a04cb1969e40782/embed?autostart=1&ui_infos=0&ui_annotations=0&ui_watermark=1",
    credit: "Model: Sketchfab · Nöron modeli sayfası",
    symbol: "⚡",
    intro: "Nöron, sinir sisteminde bilgi alan, işleyen ve elektriksel-kimyasal sinyallerle ileten özelleşmiş hücredir.",
    fact: "Dendritler çoğunlukla sinyal alımında, akson ise iletimde rol oynar."
  },
  spine: {
    title: "Omurga ve omurilik bölgesi",
    url: "https://sketchfab.com/models/bcd9eee09ce044ef98a69c315aa792e2/embed?autostart=1&ui_infos=0&ui_annotations=0&ui_watermark=1",
    credit: "Model: Sketchfab · The Human Spinal Column",
    symbol: "🦴",
    intro: "Omurga, omuriliği çevreleyerek korur. Omurilik, beyin ile vücudun birçok bölgesi arasında sinirsel iletişimi sağlar.",
    fact: "Omurga ile omurilik aynı yapı değildir."
  }
};

const parts = {
  cerebrum: {symbol:"🧠",title:"Büyük beyin",text:"Büyük beyin; duyusal bilgilerin işlenmesi, düşünme, öğrenme, bellek ve istemli hareketlerin kontrolünde görev alır.",fact:"Beyin bölgeleri birlikte çalışır; işlevler tek bir bölgeyle sınırlı olmayabilir."},
  brainstem: {symbol:"🌿",title:"Beyin sapı",text:"Beyin sapı, beyin ile omurilik arasındaki bağlantıda rol oynar ve solunum gibi yaşamsal işlevlerin düzenlenmesine katkı sağlar.",fact:"Beyin sapı merkezi sinir sisteminin bir parçasıdır."},
  cerebellum: {symbol:"⚖️",title:"Beyincik",text:"Beyincik, hareketlerin dengeli ve uyumlu gerçekleşmesine, duruşun ve hareket öğreniminin düzenlenmesine katkı sağlar.",fact:"Beyincik hareketlerin hassas ayarlanmasında önemlidir."},
  membrane: {symbol:"🫧",title:"Hücre zarı",text:"Hücre zarı seçici geçirgendir. İyonların zarın iki tarafındaki dağılımı ve hareketi, nöronun zar potansiyelinde önemlidir.",fact:"İyon kanalları ve taşıyıcı proteinler zar işlevlerine katılır."},
  axon: {symbol:"⚡",title:"Akson",text:"Akson, nöronun elektriksel sinyalinin hedef hücreye doğru iletilmesinde görev alan uzantıdır. Bazı aksonlar miyelin kılıfla çevrilidir.",fact:"Miyelin, uygun nöronlarda iletim hızını artırır."}
};

const classTopics = {
  "9": {
    title:"9. Sınıf • Hücre ve yapı-görev ilişkisi",
    desc:"Temel kavramları gözden geçir; nöronu anlamak için gerekli hücre bilgisini pekiştir.",
    topics:["Hücrenin temel kısımları","Hücre zarı ve seçici geçirgenlik","Sitoplazma ve organeller","Hücrede yapı-görev ilişkisi","Sinir sistemi organlarına giriş"]
  },
  "10": {
    title:"10. Sınıf • ATP ve hücresel enerji",
    desc:"Sinir hücrelerinin neden sürekli enerjiye ihtiyaç duyduğunu incele.",
    topics:["ATP'nin hücresel faaliyetlerdeki rolü","Hücresel solunum ve ATP üretimi","İyon dengesinin korunması","Aktif taşıma ve enerji ihtiyacı","Nöronların enerji gerektiren faaliyetleri"]
  },
  "11": {
    title:"11. Sınıf • Sinir sistemi",
    desc:"Reseptörlerden sinapslara kadar sinirsel iletişimin temel süreçlerini keşfet.",
    topics:["Reseptör çeşitleri","Miyelinli ve miyelinsiz nöronlar","Duyu, ara ve motor nöron","Serotonin, dopamin, epinefrin ve norepinefrin","Polarizasyon, depolarizasyon ve repolarizasyon","Nöronda impuls iletimi","Sinapsta impuls iletimi","Glia, mikroglia, oligodendrosit ve Schwann hücreleri","Beyin ve omuriliğin görevleri"]
  }
};

const topicExplanations = {
  "Hücrenin temel kısımları": {text:"Hücre zarı hücreyi çevreler, sitoplazma birçok kimyasal tepkimenin gerçekleştiği ortamdır ve çekirdek ökaryot hücrelerde kalıtsal bilgiyi taşır. Nöronlar da bu temel hücresel düzene sahiptir.",model:"cell"},
  "Hücre zarı ve seçici geçirgenlik": {text:"Hücre zarı fosfolipit çift tabaka ve proteinlerden oluşur. İyon kanalları ve taşıyıcılar, hangi maddelerin ne zaman geçeceğini düzenler. Bu özellik nöronun zar potansiyeli için kritiktir.",model:"cell"},
  "Sitoplazma ve organeller": {text:"Sitoplazmada organeller bulunur. Mitokondriler ATP üretimine katkı verir; ribozomlar protein sentezler. Nöronlar uzun uzantılarını ve sinaptik işlevlerini sürdürmek için hücresel kaynaklara ihtiyaç duyar.",model:"cell"},
  "Hücrede yapı-görev ilişkisi": {text:"Hücrenin şekli ve iç yapısı görevine uyum sağlar. Nöronun uzantıları uzak bölgeler arasında iletişime katkı verir; kas hücreleri ise kasılma için özelleşmiştir.",model:"neuron"},
  "Sinir sistemi organlarına giriş": {text:"Beyin ve omurilik merkezi sinir sistemini oluşturur. Çevresel sinirler merkezi sinir sistemi ile vücudun diğer bölümleri arasında iletişime katkı sağlar.",model:"brain"},
  "ATP'nin hücresel faaliyetlerdeki rolü": {text:"ATP, hücrede enerji aktarımında kullanılan temel moleküllerden biridir. İyon gradyanlarını koruyan bazı taşıma proteinleri ATP enerjisini kullanır.",model:"neuron"},
  "Hücresel solunum ve ATP üretimi": {text:"Hücresel solunumda besinlerden elde edilen enerji ATP üretiminde kullanılır. Nöronlar iyon dengesini, sinaptik iletimi ve hücresel bakım süreçlerini sürdürmek için enerjiye ihtiyaç duyar.",model:"cell"},
  "İyon dengesinin korunması": {text:"Sodyum ve potasyum gibi iyonların zarın iki tarafındaki dağılımı zar potansiyeline katkı verir. İyon kanalları ve pompalar bu düzenin kurulmasında ve korunmasında rol oynar.",model:"neuron"},
  "Aktif taşıma ve enerji ihtiyacı": {text:"Aktif taşıma, maddelerin uygun koşullarda enerji kullanılarak taşınmasını sağlar. Sodyum-potasyum pompası nöronlarda iyon dağılımının korunmasına katkı verir.",model:"neuron"},
  "Nöronların enerji gerektiren faaliyetleri": {text:"Nöronlar zar potansiyelini korumak, nörotransmitterleri paketlemek ve geri almak, hücresel yapılarını sürdürmek için enerji kullanır. Enerji gereksinimi etkinlik düzeyine göre değişebilir.",model:"neuron"},
  "Reseptör çeşitleri": {text:"Kemoreseptörler kimyasal, mekanoreseptörler mekanik, termoreseptörler sıcaklık, fotoreseptörler ışık uyaranlarını algılar. Ağrı reseptörleri doku hasarı oluşturabilecek uyaranlara yanıt verir.",model:"brain"},
  "Miyelinli ve miyelinsiz nöronlar": {text:"Miyelin kılıf bazı aksonları yalıtır ve impuls iletimini hızlandırır. Miyelinsiz aksonlarda da impuls iletilir; iletim biçimi ve hızı farklı olabilir.",model:"neuron"},
  "Duyu, ara ve motor nöron": {text:"Duyu nöronları duyusal bilgiyi merkezi sinir sistemine taşır. Ara nöronlar merkezi sinir sistemi içinde bağlantı kurar. Motor nöronlar sinyalleri kas veya bez gibi hedeflere iletir.",model:"neuron"},
  "Serotonin, dopamin, epinefrin ve norepinefrin": {text:"Bu maddeler sinirsel iletişimde rol alabilir. Dopamin ve serotonin nörotransmitter olarak bilinir. Epinefrin adrenalin, norepinefrin noradrenalin adıyla da anılır; etkileri reseptör ve dokuya göre değişebilir.",model:"neuron"},
  "Polarizasyon, depolarizasyon ve repolarizasyon": {text:"Polarizasyonda zarın iki tarafı arasında potansiyel farkı vardır. Depolarizasyonda zar potansiyeli daha az negatif olur; repolarizasyonda yeniden dinlenim değerine doğru döner.",model:"neuron"},
  "Nöronda impuls iletimi": {text:"Aksiyon potansiyeli, zar boyunca ardışık iyon kanalı değişimleriyle ilerler. Miyelinli aksonlarda impuls Ranvier boğumları arasında sıçramalı iletilir.",model:"neuron"},
  "Sinapsta impuls iletimi": {text:"Kimyasal sinapsta sinyal, sinaptik uçtan nörotransmitter salınmasını tetikler. Madde sinaptik aralıktan geçerek hedef hücredeki reseptörlere bağlanır ve yanıt oluşturabilir.",model:"neuron"},
  "Glia, mikroglia, oligodendrosit ve Schwann hücreleri": {text:"Glia hücreleri nöronları destekler. Mikroglia bağışıklık savunmasında rol alır. Oligodendrositler merkezi sinir sisteminde, Schwann hücreleri ise çevresel sinir sisteminde miyelin oluşturabilir.",model:"neuron"},
  "Beyin ve omuriliğin görevleri": {text:"Beyin duyusal bilgilerin işlenmesi, hareketlerin düzenlenmesi ve bilişsel işlevlerde rol oynar. Omurilik beyin ile vücut arasında iletişimi sağlar ve bazı reflekslerin düzenlenmesine katılır.",model:"spine"}
};


const questions = [
  {q:"Nöronda impulsun hücre gövdesinden uzağa taşınmasında temel rolü hangi yapı üstlenir?",a:["Akson","Çekirdekçik","Lizozom","Hücre duvarı"],correct:0,why:"Akson, sinirsel sinyalin hedef hücrelere doğru iletilmesinde görev alır."},
  {q:"Işık uyaranlarını algılayan reseptör çeşidi hangisidir?",a:["Termoreseptör","Fotoreseptör","Kemoreseptör","Mekanoreseptör"],correct:1,why:"Fotoreseptörler ışığa duyarlıdır ve gözün retinasında bulunur."},
  {q:"Nöron zarında iyon dağılımı ve zar potansiyelinin korunması için hangi molekül enerji sağlar?",a:["DNA","ATP","Oksijen tek başına","Glikojen doğrudan"],correct:1,why:"ATP, iyon gradyanlarının korunmasında görev alan taşıma süreçleri için enerji sağlar."},
  {q:"Miyelin kılıfın temel etkilerinden biri hangisidir?",a:["Hücreyi ikiye bölmek","İletimi hızlandırmak","ATP'yi yok etmek","Reseptörleri ışığa çevirmek"],correct:1,why:"Miyelinli aksonlarda impuls, Ranvier boğumları arasında sıçramalı iletilir."},
  {q:"Sıcaklık değişimlerini algılayan reseptör hangisidir?",a:["Termoreseptör","Fotoreseptör","Kemoreseptör","Ağrı reseptörü"],correct:0,why:"Termoreseptörler sıcaklık değişimlerine yanıt verir."},
  {q:"Sinapsta kimyasal iletimde hangi maddeler rol alabilir?",a:["Nörotransmitterler","Hücre duvarı","Safra tuzları","Klorofil"],correct:0,why:"Nörotransmitterler sinaptik aralıkta hedef hücrenin yanıtını etkiler."},
  {q:"Merkezi sinir sistemi hangi yapılardan oluşur?",a:["Beyin ve omurilik","Kalp ve akciğer","Kas ve tendon","Deri ve kemik"],correct:0,why:"Merkezi sinir sisteminin temel bölümleri beyin ve omuriliktir."},
  {q:"Schwann hücreleri en çok hangi görevle ilişkilidir?",a:["Çevresel sinir sisteminde miyelin oluşturma","ATP'yi depolama","Görme pigmenti üretme","Kanı pompalama"],correct:0,why:"Schwann hücreleri çevresel sinir sistemindeki aksonların miyelin kılıfını oluşturabilir."},
  {q:"Basınç ve titreşim gibi mekanik uyaranları algılayan reseptör hangisidir?",a:["Mekanoreseptör","Fotoreseptör","Kemoreseptör","Termoreseptör"],correct:0,why:"Mekanoreseptörler dokunma, basınç, titreşim ve bazı gerilme uyaranlarını algılar."},
  {q:"Koku ve tat gibi kimyasal uyaranların algılanmasında hangi reseptörler görev alır?",a:["Kemoreseptörler","Fotoreseptörler","Termoreseptörler","Yalnız ağrı reseptörleri"],correct:0,why:"Kemoreseptörler belirli kimyasal maddelere yanıt verir."},
  {q:"Doku hasarı oluşturabilecek uyaranlarla ilişkili reseptörler hangileridir?",a:["Ağrı reseptörleri","Fotoreseptörler","Yalnız mekanoreseptörler","Yalnız termoreseptörler"],correct:0,why:"Ağrı reseptörleri, dokuya zarar verme potansiyeli olan uyaranları algılar."},
  {q:"Dendritlerin temel görevlerinden biri hangisidir?",a:["Diğer hücrelerden gelen sinyalleri almak","Kanı pompalamak","Hücre duvarı oluşturmak","ATP'yi çekirdekte depolamak"],correct:0,why:"Dendritler çoğunlukla diğer hücrelerden gelen sinyallerin alınmasına katkı sağlar."},
  {q:"Nöronun çekirdeği genellikle hangi bölümde bulunur?",a:["Hücre gövdesi","Miyelin kılıf","Sinaptik aralık","Ranvier boğumu"],correct:0,why:"Çekirdek, nöronun hücre gövdesinde yer alır."},
  {q:"Duyu nöronunun temel işlevi nedir?",a:["Duyu reseptörlerinden merkezi sinir sistemine bilgi taşımak","Kasılmayı doğrudan gerçekleştirmek","Hormonları sindirmek","Miyelin üretmek"],correct:0,why:"Duyu nöronları duyusal bilgiyi merkezi sinir sistemine iletir."},
  {q:"Motor nöronlar hangi yönde bilgi taşır?",a:["Merkezi sinir sisteminden kas veya bezlere","Deriden yalnızca beyne","Yalnız iki duyu reseptörü arasında","Hücre çekirdeğinden mitokondriye"],correct:0,why:"Motor nöronlar merkezi sinir sisteminden efektör yapılara sinyal taşır."},
  {q:"Ara nöronlar çoğunlukla hangi görevle ilişkilidir?",a:["Merkezi sinir sisteminde nöronlar arasında bağlantı kurmak","Işığı algılamak","Miyelinli aksonu dış ortamdan korumak","Oksijen taşımak"],correct:0,why:"Ara nöronlar merkezi sinir sisteminde sinirsel bilgilerin işlenmesi ve bağlantı kurulmasına katılır."},
  {q:"Miyelinsiz nöronlarla ilgili doğru ifade hangisidir?",a:["Aksonlarında miyelin kılıf bulunmaz","Hiç impuls oluşturamazlar","Her zaman duyu nöronudur","Hücre zarı yoktur"],correct:0,why:"Miyelinsiz aksonlarda da impuls iletilebilir; iletim biçimi miyelinli aksonlardan farklıdır."},
  {q:"Dinlenim hâlindeki nöron zarının içi, dışına göre genellikle nasıldır?",a:["Daha negatif","Her zaman daha pozitif","Yüksüz ve eşit","Elektriksel olarak yoktur"],correct:0,why:"Dinlenim zar potansiyelinde hücre içi, hücre dışına göre daha negatiftir."},
  {q:"Depolarizasyon sırasında nöron zarında ne olur?",a:["Zar potansiyeli daha az negatif olur ve uygun koşullarda pozitifleşebilir","Zar tamamen kaybolur","Hücre çekirdeği dışarı çıkar","İyon hareketi durur"],correct:0,why:"Aksiyon potansiyelinin yükselişinde belirli iyon kanallarının açılması zar potansiyelini değiştirir."},
  {q:"Repolarizasyon neyi ifade eder?",a:["Zar potansiyelinin dinlenim değerine doğru dönmesini","Hücrenin bölünmesini","Nörotransmitterin DNA'ya dönüşmesini","Reseptörlerin yok olmasını"],correct:0,why:"Repolarizasyon, aksiyon potansiyeli sonrasında zar potansiyelinin yeniden negatif değerlere dönmesidir."},
  {q:"Polarizasyon terimi sinir hücresi bağlamında neyi anlatır?",a:["Zarın iki tarafı arasında elektriksel potansiyel farkı bulunmasını","Nöronun iki hücreye ayrılmasını","Yalnızca protein sentezini","Omuriliğin uzamasını"],correct:0,why:"İyonların eşit olmayan dağılımı ve zarın seçici geçirgenliği zar potansiyeline katkı verir."},
  {q:"Nörotransmitterler çoğunlukla nereden salınır?",a:["Sinaptik uçtaki keseciklerden","Hücre duvarından","Omurga kemiklerinden","Mitokondrinin dışından"],correct:0,why:"Kimyasal sinapsta nörotransmitterler sinaptik uçtan aralığa salınır."},
  {q:"Dopamin hangi gruba girer?",a:["Nörotransmitter","Hücre organeli","Reseptörün kendisi","İyon kanalı"],correct:0,why:"Dopamin sinir hücreleri arasında iletişimde rol oynayan bir nörotransmitterdir."},
  {q:"Serotonin için en uygun tanım hangisidir?",a:["Sinirsel iletişimde rol alan bir nörotransmitter","Hücre zarı tabakası","Miyelin oluşturan hücre","Bir reseptör çeşidinin adı"],correct:0,why:"Serotonin, sinir sisteminde çeşitli işlevlerin düzenlenmesine katılan bir nörotransmitterdir."},
  {q:"Epinefrin ve norepinefrin hangi adlarla da bilinir?",a:["Adrenalin ve noradrenalin","İnsülin ve glukagon","Aktin ve miyozin","Glikoz ve glikojen"],correct:0,why:"Epinefrin adrenalin, norepinefrin ise noradrenalin olarak da adlandırılır."},
  {q:"Mikroglia hücrelerinin sinir sistemindeki önemli görevi hangisidir?",a:["Bağışıklık savunması ve hücresel artıkların temizlenmesine katkı","Görme ışığını algılama","Kas liflerini kasma","Kemik dokusu oluşturma"],correct:0,why:"Mikroglia merkezi sinir sisteminin bağışıklık savunmasında rol alır."},
  {q:"Oligodendrositlerin temel görevi nedir?",a:["Merkezi sinir sisteminde miyelin oluşturmak","Çevresel sinirlerde tüm impulsları üretmek","Tat moleküllerini algılamak","ATP'yi hücre dışına pompalamak"],correct:0,why:"Oligodendrositler merkezi sinir sisteminde aksonların miyelinlenmesine katkı sağlar."},
  {q:"Hücre zarının seçici geçirgen olması ne anlama gelir?",a:["Maddelerin geçişinin türüne ve koşullara göre düzenlenmesi","Her maddenin serbestçe geçmesi","Hiçbir maddenin geçememesi","Yalnız suyun her zaman geçmesi"],correct:0,why:"Hücre zarı madde alışverişini seçici biçimde düzenler."},
  {q:"Hücresel solunumun nöron açısından önemi nedir?",a:["ATP üretimine katkı sağlayarak enerji ihtiyacını karşılamak","Nöronun ışık üretmesini sağlamak","Miyelini doğrudan elektrik akımına çevirmek","Sinaptik aralığı ortadan kaldırmak"],correct:0,why:"Hücresel solunum, hücrenin ATP gerektiren faaliyetlerini destekler."},
  {q:"ATP en doğru nasıl tanımlanır?",a:["Hücrede enerji aktarımında kullanılan molekül","Sinir hücresinin uzantısı","Bir reseptör çeşidi","Omuriliği koruyan kemik"],correct:0,why:"ATP, birçok hücresel süreçte kullanılabilir enerji aktarımında rol oynar."},
  {q:"Beyincik hangi işlevle özellikle ilişkilidir?",a:["Denge ve hareketlerin eşgüdümü","Kimyasal uyaranları burunda algılama","Hücre zarından iyon taşıma","Nörotransmitter üretiminin tek merkezi olma"],correct:0,why:"Beyincik hareketlerin koordinasyonu ve dengenin sağlanmasına katkıda bulunur."}
];

let questionIndex = 0;
let score = Number(localStorage.getItem("nasseScore") || 0);
let done = Number(localStorage.getItem("nasseDone") || 0);
let answered = false;
let firebaseAuth = null;
let firebaseReady = false;

function updateScore() {
  $("#scoreTop").textContent = score;
  $("#scoreValue").textContent = score;
  $("#doneTop").textContent = done;
  $("#scoreBar").style.width = `${Math.min(100, score / (questions.length * 10) * 100)}%`;
  $("#achievementText").textContent = done ? `${done} görev tamamlandı. Harika ilerliyorsun!` : "İlk görevini tamamla.";
  localStorage.setItem("nasseScore", String(score));
  localStorage.setItem("nasseDone", String(done));
}

function renderQuestion() {
  const item = questions[questionIndex];
  answered = false;
  $("#questionCount").textContent = `SORU ${questionIndex + 1} / ${questions.length}`;
  $("#quizProgress").style.width = `${questionIndex / questions.length * 100}%`;
  $("#questionText").textContent = item.q;
  $("#answers").innerHTML = "";
  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = questionIndex === questions.length - 1 ? "Yeniden başla ↻" : "Sonraki soru →";
  item.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener("click", () => chooseAnswer(index, button));
    $("#answers").appendChild(button);
  });
}
function chooseAnswer(index, button) {
  if (answered) return;
  answered = true;
  const item = questions[questionIndex];
  $$(".answer").forEach((b, i) => {
    b.disabled = true;
    if (i === item.correct) b.classList.add("correct");
  });
  if (index === item.correct) {
    score += 10;
    done += 1;
    $("#feedback").textContent = `Doğru! ${item.why}`;
    $("#feedback").className = "feedback good";
  } else {
    button.classList.add("wrong");
    $("#feedback").textContent = `Henüz değil. ${item.why}`;
    $("#feedback").className = "feedback bad";
  }
  updateScore();
  $("#quizProgress").style.width = `${(questionIndex + 1) / questions.length * 100}%`;
  $("#nextQuestion").disabled = false;
}
$("#nextQuestion").addEventListener("click", () => {
  questionIndex = (questionIndex + 1) % questions.length;
  renderQuestion();
});
$("#resetProgress").addEventListener("click", () => {
  if (!confirm("Bu cihazdaki puan ve görev ilerlemesi sıfırlansın mı?")) return;
  score = 0; done = 0; questionIndex = 0; updateScore(); renderQuestion(); toast("İlerlemen sıfırlandı.");
});

function showModel(key) {
  const model = models[key];
  $("#modelFrame").src = model.url;
  $("#modelTitle").textContent = model.title;
  $("#modelCredit").textContent = model.credit;
  $("#infoSymbol").textContent = model.symbol;
  $("#infoTitle").textContent = model.title;
  $("#infoText").textContent = model.intro;
  $("#infoFact").textContent = model.fact;
  $$(".model-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.model === key));
}
$$(".model-tab").forEach(tab => tab.addEventListener("click", () => showModel(tab.dataset.model)));
$$(".structure").forEach(button => button.addEventListener("click", () => {
  const part = parts[button.dataset.part];
  if (!part) return;
  $$(".structure").forEach(b => b.classList.toggle("active", b === button));
  $("#infoSymbol").textContent = part.symbol;
  $("#infoTitle").textContent = part.title;
  $("#infoText").textContent = part.text;
  $("#infoFact").textContent = part.fact;
}));

$$("[data-class]").forEach(button => button.addEventListener("click", () => {
  const item = classTopics[button.dataset.class];
  const panel = $("#classDetails");
  panel.classList.remove("hidden");
  panel.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p><div class="topic-pills">${item.topics.map((t,i) => `<button class="topic-pill" type="button" data-topic-index="${i}">${t}</button>`).join("")}</div><article id="topicExplanation" class="topic-explanation"><p class="eyebrow">KONU ANLATIMI</p><h4>Bir konu seç</h4><p>Yukarıdaki konu başlıklarından birine dokun. Açıklaması burada görünecek.</p></article>`;
  panel.scrollIntoView({behavior:"smooth",block:"nearest"});
  panel.querySelectorAll(".topic-pill").forEach(pill => pill.addEventListener("click", () => {
    const topicName = pill.textContent;
    const explanation = topicExplanations[topicName] || {text:"Bu başlık, seçilen sınıfın temel kavramlarını pekiştirmek için hazırlanmıştır. Konuyu model ve görevlerle birlikte çalış.",model:"neuron"};
    panel.querySelectorAll(".topic-pill").forEach(p => p.classList.toggle("selected", p === pill));
    $("#topicExplanation").innerHTML = `<p class="eyebrow">KONU ANLATIMI</p><h4>${topicName}</h4><p>${explanation.text}</p><button class="text-button" id="openTopicModel" type="button">İlgili 3B modeli aç →</button>`;
    $("#openTopicModel").addEventListener("click", () => { $("#laboratuvar").scrollIntoView({behavior:"smooth"}); showModel(explanation.model); });
  }));
}));

const contextSteps = [
  {q:"Bir öğrenci sıcak bir yüzeye dokunduğunda elini hızla geri çekiyor. İlk algılamayı hangi reseptör grubu başlatır?",opts:["Fotoreseptörler","Termoreseptörler ve ağrı reseptörleri","Yalnız kemoreseptörler"],correct:1,explain:"Sıcaklık ve dokuya zarar verebilecek uyaranlar ilgili termoreseptörler ve ağrı reseptörleri tarafından algılanabilir. Bilgi duyu nöronlarıyla merkezi sinir sistemine taşınır."},
  {q:"Sinir hücresi iyon dengesini sürdürmek ve sinyallerden sonra eski dağılımı yeniden kurmak için neden enerjiye ihtiyaç duyar?",opts:["ATP kullanan taşıma süreçleri için","Hücre duvarı üretmek için","Işığı kimyasal enerjiye çevirmek için"],correct:0,explain:"İyon gradyanlarının korunması ve yeniden oluşturulmasında ATP kullanan taşıma mekanizmaları görev alır. ATP hücresel solunum süreçleriyle üretilebilir."},
  {q:"Bu olayda beyin ve omurilik için en doğru ifade hangisidir?",opts:["İkisi de merkezi sinir sistemindedir; omurilik bazı reflekslerde hızlı yanıtların düzenlenmesine katılır.","Omurilik çevresel sinir sistemine aittir.","Beyin yalnızca kaslardan oluşur."],correct:0,explain:"Beyin ve omurilik merkezi sinir sistemini oluşturur. Bazı refleks yolları omurilik düzeyinde düzenlenebilir; yanıtın ayrıntısı refleks türüne bağlıdır."}
];
let contextIndex = 0;
function renderContext() {
  const step = contextSteps[contextIndex];
  const box = $("#contextBox");
  box.classList.remove("hidden");
  box.innerHTML = `<p class="eyebrow">SENARYO ${contextIndex + 1} / ${contextSteps.length}</p><h3>${step.q}</h3><div class="context-options">${step.opts.map((o,i)=>`<button data-context-answer="${i}">${o}</button>`).join("")}</div><p id="contextFeedback"></p>`;
  box.querySelectorAll("[data-context-answer]").forEach(btn => btn.addEventListener("click", () => {
    box.querySelectorAll("button").forEach(b => b.disabled = true);
    const correct = Number(btn.dataset.contextAnswer) === step.correct;
    $("#contextFeedback").textContent = `${correct ? "Doğru bağlantı! " : "Bir kez daha düşün. "}${step.explain}`;
    $("#contextFeedback").style.color = correct ? "#58e6b4" : "#ffb2bd";
    if (correct) { score += 10; done += 1; updateScore(); }
    const next = document.createElement("button");
    next.className = "button button-primary";
    next.style.marginTop = "12px";
    next.textContent = contextIndex === contextSteps.length - 1 ? "Senaryoyu tamamla ✓" : "Sonraki senaryo →";
    next.addEventListener("click", () => {
      if (contextIndex < contextSteps.length - 1) { contextIndex++; renderContext(); }
      else { box.innerHTML = "<h3>Bağlam laboratuvarı tamamlandı! ✨</h3><p>Hücre, enerji ve sinir sistemi arasındaki bağlantıları kurdun.</p>"; }
    });
    box.appendChild(next);
  }));
}
$("#startContext").addEventListener("click", () => { contextIndex = 0; renderContext(); $("#contextBox").scrollIntoView({behavior:"smooth",block:"nearest"}); });

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.classList.remove("show"), 2800);
}
const modal = $("#loginModal");
$("#openLogin").addEventListener("click", () => modal.classList.remove("hidden"));
$("#closeLogin").addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });
function authMessage(message, kind="") { $("#authMessage").textContent = message; $("#authMessage").className = `auth-message ${kind}`; }
function firebaseConfigured() {
  return firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("BURAYA") &&
    firebaseConfig.projectId && !firebaseConfig.projectId.startsWith("BURAYA");
}
async function initFirebase() {
  if (!firebaseConfigured()) return;
  try {
    const appMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
    const authMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
    const app = appMod.initializeApp(firebaseConfig);
    firebaseAuth = authMod.getAuth(app);
    firebaseReady = true;
    $("#googleLogin").addEventListener("click", async () => {
      try {
        const provider = new authMod.GoogleAuthProvider();
        await authMod.signInWithRedirect(firebaseAuth, provider);
      } catch (err) { authMessage(friendlyAuthError(err), "error"); }
    });
    $("#emailForm").addEventListener("submit", async e => {
      e.preventDefault();
      if (!firebaseReady) return;
      try {
        await authMod.signInWithEmailAndPassword(firebaseAuth, $("#email").value.trim(), $("#password").value);
        authMessage("Giriş başarılı.", "success");
      } catch (err) { authMessage(friendlyAuthError(err), "error"); }
    });
    $("#emailRegister").addEventListener("click", async () => {
      if (!firebaseReady) return;
      try {
        await authMod.createUserWithEmailAndPassword(firebaseAuth, $("#email").value.trim(), $("#password").value);
        authMessage("Hesabın oluşturuldu.", "success");
      } catch (err) { authMessage(friendlyAuthError(err), "error"); }
    });
    $("#logoutButton").addEventListener("click", async () => {
      await authMod.signOut(firebaseAuth);
      authMessage("Çıkış yapıldı.");
    });
    authMod.onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        $("#openLogin").textContent = user.displayName ? user.displayName.split(" ")[0] : "Hesabım";
        $("#logoutButton").classList.remove("hidden");
        authMessage(`Giriş yapıldı: ${user.email || user.displayName || "kullanıcı"}`, "success");
      } else {
        $("#openLogin").textContent = "Giriş yap";
        $("#logoutButton").classList.add("hidden");
      }
    });
    try { await authMod.getRedirectResult(firebaseAuth); } catch (err) { authMessage(friendlyAuthError(err), "error"); }
    authMessage("Firebase bağlantısı hazır. Google veya e-posta ile giriş yapabilirsin.", "success");
  } catch (err) {
    authMessage("Firebase başlatılamadı. Yapılandırmayı ve internet bağlantısını kontrol et.", "error");
    console.error(err);
  }
}
function friendlyAuthError(err) {
  const code = err?.code || "";
  const messages = {
    "auth/invalid-email":"E-posta adresini kontrol et.",
    "auth/missing-password":"Şifreni yaz.",
    "auth/weak-password":"Şifre en az 6 karakter olmalı.",
    "auth/email-already-in-use":"Bu e-posta ile hesap var. Giriş yapmayı dene.",
    "auth/invalid-credential":"E-posta veya şifre hatalı.",
    "auth/operation-not-allowed":"Firebase Console'da bu giriş yöntemini etkinleştir.",
    "auth/unauthorized-domain":"Firebase Authentication ayarlarında bu site alan adını yetkilendir.",
    "auth/network-request-failed":"Bağlantı sorunu. İnternetini kontrol et."
  };
  return messages[code] || `Giriş yapılamadı (${code || "bilinmeyen hata"}). Firebase ayarlarını kontrol et.`;
}
if (!firebaseConfigured()) {
  $("#googleLogin").addEventListener("click", () => authMessage("Önce firebase-config.js dosyasına Firebase web uygulaması ayarlarını ekle.", "error"));
  $("#emailForm").addEventListener("submit", e => { e.preventDefault(); authMessage("Önce firebase-config.js dosyasına Firebase web uygulaması ayarlarını ekle.", "error"); });
  $("#emailRegister").addEventListener("click", () => authMessage("Önce firebase-config.js dosyasına Firebase web uygulaması ayarlarını ekle.", "error"));
} else {
  initFirebase();
}
updateScore();
renderQuestion();
