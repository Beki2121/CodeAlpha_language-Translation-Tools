import { useState, useEffect } from "react";
import { franc } from "franc-min";
import "./App.css";

const LANGUAGES = [
  { code: "auto", name: "Detect Language" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" },
  { code: "pt", name: "Portuguese" },
  { code: "nl", name: "Dutch" },
  { code: "ko", name: "Korean" },
  { code: "tr", name: "Turkish" },
  { code: "pl", name: "Polish" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
  { code: "cs", name: "Czech" },
  { code: "hu", name: "Hungarian" },
  { code: "ro", name: "Romanian" },
  { code: "bg", name: "Bulgarian" },
  { code: "hr", name: "Croatian" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "et", name: "Estonian" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "mt", name: "Maltese" },
  { code: "el", name: "Greek" },
  { code: "he", name: "Hebrew" },
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "id", name: "Indonesian" },
  { code: "ms", name: "Malay" },
  { code: "tl", name: "Filipino" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "mr", name: "Marathi" },
  { code: "ne", name: "Nepali" },
  { code: "si", name: "Sinhala" },
  { code: "my", name: "Burmese" },
  { code: "km", name: "Khmer" },
  { code: "lo", name: "Lao" },
  { code: "ka", name: "Georgian" },
  { code: "am", name: "Amharic" },
  { code: "sw", name: "Swahili" },
  { code: "zu", name: "Zulu" },
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "hy", name: "Armenian" },
  { code: "az", name: "Azerbaijani" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bs", name: "Bosnian" },
  { code: "ca", name: "Catalan" },
  { code: "cy", name: "Welsh" },
  { code: "eo", name: "Esperanto" },
  { code: "fo", name: "Faroese" },
  { code: "gl", name: "Galician" },
  { code: "is", name: "Icelandic" },
  { code: "ga", name: "Irish" },
  { code: "kk", name: "Kazakh" },
  { code: "ky", name: "Kyrgyz" },
  { code: "mk", name: "Macedonian" },
  { code: "mn", name: "Mongolian" },
  { code: "sr", name: "Serbian" },
  { code: "tg", name: "Tajik" },
  { code: "tk", name: "Turkmen" },
  { code: "uk", name: "Ukrainian" },
  { code: "uz", name: "Uzbek" },
  { code: "yi", name: "Yiddish" },
];

const ISO6391_TO_NAME = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l.name])
);
const ISO6393_TO_ISO6391 = {
  eng: "en",
  spa: "es",
  fra: "fr",
  deu: "de",
  ita: "it",
  rus: "ru",
  zho: "zh",
  ara: "ar",
  hin: "hi",
  jpn: "ja",
  por: "pt",
  nld: "nl",
  kor: "ko",
  tur: "tr",
  pol: "pl",
  swe: "sv",
  dan: "da",
  nor: "no",
  fin: "fi",
  ces: "cs",
  hun: "hu",
  ron: "ro",
  bul: "bg",
  hrv: "hr",
  slk: "sk",
  slv: "sl",
  est: "et",
  lav: "lv",
  lit: "lt",
  mlt: "mt",
  ell: "el",
  heb: "he",
  tha: "th",
  vie: "vi",
  ind: "id",
  msa: "ms",
  tgl: "tl",
  ben: "bn",
  tam: "ta",
  tel: "te",
  kan: "kn",
  mal: "ml",
  guj: "gu",
  pan: "pa",
  mar: "mr",
  nep: "ne",
  sin: "si",
  mya: "my",
  khm: "km",
  lao: "lo",
  kat: "ka",
  amh: "am",
  swa: "sw",
  zul: "zu",
  afr: "af",
  sqi: "sq",
  hye: "hy",
  aze: "az",
  eus: "eu",
  bel: "be",
  bos: "bs",
  cat: "ca",
  cym: "cy",
  epo: "eo",
  fao: "fo",
  glg: "gl",
  isl: "is",
  gle: "ga",
  kaz: "kk",
  kir: "ky",
  mkd: "mk",
  mon: "mn",
  srp: "sr",
  tgk: "tg",
  tuk: "tk",
  ukr: "uk",
  uzb: "uz",
  yid: "yi",
};

// Phonetic mappings for supported languages
const PHONETIC_MAPPINGS = {
  zh: {
    你好: "nǐ hǎo",
    谢谢: "xiè xiè",
    再见: "zài jiàn",
    请: "qǐng",
    是: "shì",
    不: "bù",
    早上好: "zǎo shang hǎo",
    晚安: "wǎn ān",
  },
  ja: {
    こんにちは: "konnichiwa",
    ありがとう: "arigatō",
    さようなら: "sayōnara",
    お願いします: "onegaishimasu",
    はい: "hai",
    いいえ: "iie",
    おはようございます: "ohayō gozaimasu",
    おやすみなさい: "oyasuminasai",
  },
  ko: {
    안녕하세요: "annyeonghaseyo",
    감사합니다: "gamsahamnida",
    "안녕히 가세요": "annyeonghi gaseyo",
    부탁합니다: "butakhamnida",
    네: "ne",
    아니요: "aniyo",
    "좋은 아침입니다": "joeun achimimnida",
    "좋은 밤 되세요": "joeun bam doeseyo",
  },
  ru: {
    привет: "privet",
    спасибо: "spasibo",
    "до свидания": "do svidaniya",
    пожалуйста: "pozhaluysta",
    да: "da",
    нет: "net",
    "доброе утро": "dobroye utro",
    "спокойной ночи": "spokoynoy nochi",
  },
  ar: {
    مرحبا: "marhaba",
    شكرا: "shukran",
    وداعا: "wada'an",
    "من فضلك": "min fadlik",
    نعم: "na'am",
    لا: "la",
    "صباح الخير": "sabah al-khayr",
    "تصبح على خير": "tusbih 'ala khayr",
  },
  hi: {
    नमस्ते: "namaste",
    धन्यवाद: "dhanyavaad",
    अलविदा: "alvida",
    कृपया: "kripya",
    हाँ: "haan",
    नहीं: "nahin",
    सुप्रभात: "suprabhat",
    "शुभ रात्रि": "shubh ratri",
  },
  th: {
    สวัสดี: "sawadee",
    ขอบคุณ: "khob khun",
    ลาก่อน: "la gorn",
    กรุณา: "karuna",
    ใช่: "chai",
    ไม่: "mai",
    สวัสดีตอนเช้า: "sawadee ton chao",
    ราตรีสวัสดี: "ratree sawadee",
  },
  he: {
    שלום: "shalom",
    תודה: "todah",
    להתראות: "lehitra'ot",
    בבקשה: "bevakasha",
    כן: "ken",
    לא: "lo",
    "בוקר טוב": "boker tov",
    "לילה טוב": "laila tov",
  },
  el: {
    γεια: "yia",
    ευχαριστώ: "efcharisto",
    αντίο: "adio",
    παρακαλώ: "parakalo",
    ναι: "ne",
    όχι: "ochi",
    καλημέρα: "kalimera",
    καληνύχτα: "kalinichta",
  },
};

// Comprehensive translation dictionary
const TRANSLATIONS = {
  // Common phrases and words
  hello: {
    es: "hola",
    fr: "bonjour",
    de: "hallo",
    it: "ciao",
    ru: "привет",
    zh: "你好",
    ja: "こんにちは",
    ko: "안녕하세요",
    ar: "مرحبا",
    hi: "नमस्ते",
    pt: "olá",
    nl: "hallo",
    tr: "merhaba",
    pl: "cześć",
    sv: "hej",
    da: "hej",
    no: "hei",
    fi: "hei",
    cs: "ahoj",
    hu: "szia",
    ro: "salut",
    bg: "здравей",
    hr: "zdravo",
    sk: "ahoj",
    sl: "zdravo",
    et: "tere",
    lv: "sveiki",
    lt: "labas",
    mt: "bonġu",
    el: "γεια",
    he: "שלום",
    th: "สวัสดี",
    vi: "xin chào",
    id: "halo",
    ms: "halo",
    tl: "kumusta",
    bn: "হ্যালো",
    ta: "வணக்கம்",
    te: "నమస్కారం",
    kn: "ನಮಸ್ಕಾರ",
    ml: "നമസ്കാരം",
    gu: "નમસ્તે",
    pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    mr: "नमस्कार",
    ne: "नमस्ते",
    si: "ආයුබෝවන්",
    my: "မင်္ဂလာပါ",
    km: "ជំរាបសួរ",
    lo: "ສະບາຍດີ",
    ka: "გამარჯობა",
    am: "ሰላም",
    sw: "jambo",
    zu: "sawubona",
    af: "hallo",
    sq: "përshëndetje",
    hy: "բարև",
    az: "salam",
    eu: "kaixo",
    be: "прывітанне",
    bs: "zdravo",
    ca: "hola",
    cy: "helo",
    eo: "saluton",
    fo: "hey",
    gl: "ola",
    is: "halló",
    ga: "dia dhuit",
    kk: "сәлем",
    ky: "салам",
    mk: "здраво",
    mn: "сайн байна уу",
    sr: "здраво",
    tg: "салом",
    tk: "salam",
    uk: "привіт",
    uz: "salom",
    yi: "העלא",
  },
  goodbye: {
    es: "adiós",
    fr: "au revoir",
    de: "auf wiedersehen",
    it: "arrivederci",
    ru: "до свидания",
    zh: "再见",
    ja: "さようなら",
    ko: "안녕히 가세요",
    ar: "وداعا",
    hi: "अलविदा",
    pt: "adeus",
    nl: "tot ziens",
    tr: "güle güle",
    pl: "do widzenia",
    sv: "hej då",
    da: "farvel",
    no: "ha det",
    fi: "näkemiin",
    cs: "na shledanou",
    hu: "viszlát",
    ro: "la revedere",
    bg: "довиждане",
    hr: "doviđenja",
    sk: "dovidenia",
    sl: "nasvidenje",
    et: "head aega",
    lv: "uz redzēšanos",
    lt: "iki pasimatymo",
    mt: "sahha",
    el: "αντίο",
    he: "להתראות",
    th: "ลาก่อน",
    vi: "tạm biệt",
    id: "selamat tinggal",
    ms: "selamat tinggal",
    tl: "paalam",
    bn: "বিদায়",
    ta: "பிரியாவிடை",
    te: "వీడ్కోలు",
    kn: "ವಿದಾಯ",
    ml: "വിട",
    gu: "આવજો",
    pa: "ਫਿਰ ਮਿਲਾਂਗੇ",
    mr: "निरोप",
    ne: "अलविदा",
    si: "ආයුබෝවන්",
    my: "သွားတော့မယ်",
    km: "លាសិនឡើយ",
    lo: "ລາກ່ອນ",
    ka: "ნახვამდის",
    am: "ደህና ሁን",
    sw: "kwaheri",
    zu: "sala kahle",
    af: "totsiens",
    sq: "mirupafshim",
    hy: "ցտեսություն",
    az: "sağ ol",
    eu: "agur",
    be: "да пабачэння",
    bs: "doviđenja",
    ca: "adéu",
    cy: "hwyl fawr",
    eo: "ĝis revido",
    fo: "far væl",
    gl: "adeus",
    is: "bless",
    ga: "slán",
    kk: "сау бол",
    ky: "өтүнөмүн",
    mk: "довидување",
    mn: "сайн байна уу",
    sr: "здраво",
    tg: "худо",
    tk: "hoş",
    uk: "до побачення",
    uz: "xayr",
    yi: "זיי געזונט",
  },
  "thank you": {
    es: "gracias",
    fr: "merci",
    de: "danke",
    it: "grazie",
    ru: "спасибо",
    zh: "谢谢",
    ja: "ありがとう",
    ko: "감사합니다",
    ar: "شكرا",
    hi: "धन्यवाद",
    pt: "obrigado",
    nl: "dank je",
    tr: "teşekkürler",
    pl: "dziękuję",
    sv: "tack",
    da: "tak",
    no: "takk",
    fi: "kiitos",
    cs: "děkuji",
    hu: "köszönöm",
    ro: "mulțumesc",
    bg: "благодаря",
    hr: "hvala",
    sk: "ďakujem",
    sl: "hvala",
    et: "aitäh",
    lv: "paldies",
    lt: "ačiū",
    mt: "grazzi",
    el: "ευχαριστώ",
    he: "תודה",
    th: "ขอบคุณ",
    vi: "cảm ơn",
    id: "terima kasih",
    ms: "terima kasih",
    tl: "salamat",
    bn: "ধন্যবাদ",
    ta: "நன்றி",
    te: "ధన్యవాదాలు",
    kn: "ಧನ್ಯವಾದಗಳು",
    ml: "നന്ദി",
    gu: "આભાર",
    pa: "ਧੰਨਵਾਦ",
    mr: "धन्यवाद",
    ne: "धन्यवाद",
    si: "ස්තූතියි",
    my: "ကျေးဇူးတင်ပါတယ်",
    km: "សូមអរគុណ",
    lo: "ຂອບໃຈ",
    ka: "მადლობა",
    am: "አመሰግናለሁ",
    sw: "asante",
    zu: "ngiyabonga",
    af: "dankie",
    sq: "faleminderit",
    hy: "շնորհակալություն",
    az: "təşəkkür edirəm",
    eu: "eskerrik asko",
    be: "дзякуй",
    bs: "hvala",
    ca: "gràcies",
    cy: "diolch",
    eo: "dankon",
    fo: "takk fyri",
    gl: "grazas",
    is: "þakka þér",
    ga: "go raibh maith agat",
    kk: "рахмет",
    ky: "рахмат",
    mk: "благодарам",
    mn: "баярлалаа",
    sr: "хвала",
    tg: "ташаккур",
    tk: "sag bol",
    uk: "дякую",
    uz: "rahmat",
    yi: "אַ דאַנק",
  },
  please: {
    es: "por favor",
    fr: "s'il vous plaît",
    de: "bitte",
    it: "per favore",
    ru: "пожалуйста",
    zh: "请",
    ja: "お願いします",
    ko: "부탁합니다",
    ar: "من فضلك",
    hi: "कृपया",
    pt: "por favor",
    nl: "alsjeblieft",
    tr: "lütfen",
    pl: "proszę",
    sv: "snälla",
    da: "venligst",
    no: "vær så snill",
    fi: "ole hyvä",
    cs: "prosím",
    hu: "kérem",
    ro: "vă rog",
    bg: "моля",
    hr: "molim",
    sk: "prosím",
    sl: "prosim",
    et: "palun",
    lv: "lūdzu",
    lt: "prašau",
    mt: "jekk jogħġbok",
    el: "παρακαλώ",
    he: "בבקשה",
    th: "กรุณา",
    vi: "xin vui lòng",
    id: "tolong",
    ms: "sila",
    tl: "pakiusap",
    bn: "অনুগ্রহ করে",
    ta: "தயவுசெய்து",
    te: "దయచేసి",
    kn: "ದಯವಿಟ್ಟು",
    ml: "ദയവായി",
    gu: "કૃપા કરીને",
    pa: "ਕਿਰਪਾ ਕਰਕੇ",
    mr: "कृપયा",
    ne: "कृપયा",
    si: "කරුණාකර",
    my: "ကျေးဇူးပြု၍",
    km: "សូម",
    lo: "ກະລຸນາ",
    ka: "გთხოვთ",
    am: "እባክዎ",
    sw: "tafadhali",
    zu: "ngicela",
    af: "asseblief",
    sq: "ju lutem",
    hy: "խնդրում եմ",
    az: "zəhmət olmasa",
    eu: "mesedez",
    be: "калі ласка",
    bs: "molim",
    ca: "si us plau",
    cy: "os gwelwch yn dda",
    eo: "bonvolu",
    fo: "vinarliga",
    gl: "por favor",
    is: "vinsamlegast",
    ga: "le do thoil",
    kk: "өтінемін",
    ky: "өтүнөмүн",
    mk: "ве молиме",
    mn: "уучлаарай",
    sr: "молим",
    tg: "лутфан",
    tk: "haýyş edýärin",
    uk: "будь ласка",
    uz: "iltimos",
    yi: "ביטע",
  },
  yes: {
    es: "sí",
    fr: "oui",
    de: "ja",
    it: "sì",
    ru: "да",
    zh: "是",
    ja: "はい",
    ko: "네",
    ar: "نعم",
    hi: "हाँ",
    pt: "sim",
    nl: "ja",
    tr: "evet",
    pl: "tak",
    sv: "ja",
    da: "ja",
    no: "ja",
    fi: "kyllä",
    cs: "ano",
    hu: "igen",
    ro: "da",
    bg: "да",
    hr: "da",
    sk: "áno",
    sl: "da",
    et: "jah",
    lv: "jā",
    lt: "taip",
    mt: "iva",
    el: "ναι",
    he: "כן",
    th: "ใช่",
    vi: "có",
    id: "ya",
    ms: "ya",
    tl: "oo",
    bn: "হ্যাঁ",
    ta: "ஆம்",
    te: "అవును",
    kn: "ಹೌದು",
    ml: "അതെ",
    gu: "હા",
    pa: "ਹਾਂ",
    mr: "होय",
    ne: "हो",
    si: "ඔව්",
    my: "ဟုတ်ကဲ့",
    km: "បាទ",
    lo: "ແມ່ນ",
    ka: "დიახ",
    am: "አዎ",
    sw: "ndiyo",
    zu: "yebo",
    af: "ja",
    sq: "po",
    hy: "այո",
    az: "bəli",
    eu: "bai",
    be: "так",
    bs: "da",
    ca: "sí",
    cy: "ie",
    eo: "jes",
    fo: "ja",
    gl: "si",
    is: "já",
    ga: "tá",
    kk: "иә",
    ky: "ооба",
    mk: "да",
    mn: "тийм",
    sr: "да",
    tg: "ҳа",
    tk: "ha",
    uk: "так",
    uz: "ha",
    yi: "יאָ",
  },
  no: {
    es: "no",
    fr: "non",
    de: "nein",
    it: "no",
    ru: "нет",
    zh: "不",
    ja: "いいえ",
    ko: "아니요",
    ar: "لا",
    hi: "नहीं",
    pt: "não",
    nl: "nee",
    tr: "hayır",
    pl: "nie",
    sv: "nej",
    da: "nej",
    no: "nei",
    fi: "ei",
    cs: "ne",
    hu: "nem",
    ro: "nu",
    bg: "не",
    hr: "ne",
    sk: "nie",
    sl: "ne",
    et: "ei",
    lv: "nē",
    lt: "ne",
    mt: "le",
    el: "όχι",
    he: "לא",
    th: "ไม่",
    vi: "không",
    id: "tidak",
    ms: "tidak",
    tl: "hindi",
    bn: "না",
    ta: "இல்லை",
    te: "లేదు",
    kn: "ಇಲ್ಲ",
    ml: "ഇല്ല",
    gu: "ના",
    pa: "ਨਹੀਂ",
    mr: "नाही",
    ne: "होइन",
    si: "නැත",
    my: "မဟုတ်ဘူး",
    km: "ទេ",
    lo: "ບໍ່",
    ka: "არა",
    am: "አይ",
    sw: "hapana",
    zu: "cha",
    af: "nee",
    sq: "jo",
    hy: "ոչ",
    az: "xeyr",
    eu: "ez",
    be: "не",
    bs: "ne",
    ca: "no",
    cy: "na",
    eo: "ne",
    fo: "nei",
    gl: "non",
    is: "nei",
    ga: "níl",
    kk: "жоқ",
    ky: "жок",
    mk: "не",
    mn: "үгүй",
    sr: "не",
    tg: "не",
    tk: "ýok",
    uk: "ні",
    uz: "yo'q",
    yi: "ניין",
  },
  "good morning": {
    es: "buenos días",
    fr: "bonjour",
    de: "guten morgen",
    it: "buongiorno",
    ru: "доброе утро",
    zh: "早上好",
    ja: "おはようございます",
    ko: "좋은 아침입니다",
    ar: "صباح الخير",
    hi: "सुप्रभात",
    pt: "bom dia",
    nl: "goedemorgen",
    tr: "günaydın",
    pl: "dzień dobry",
    sv: "god morgon",
    da: "god morgen",
    no: "god morgen",
    fi: "hyvää huomenta",
    cs: "dobré ráno",
    hu: "jó reggelt",
    ro: "bună dimineața",
    bg: "добро утро",
    hr: "dobro jutro",
    sk: "dobré ráno",
    sl: "dobro jutro",
    et: "tere hommikust",
    lv: "labrīt",
    lt: "labas rytas",
    mt: "bonġu",
    el: "καλημέρα",
    he: "בוקר טוב",
    th: "สวัสดีตอนเช้า",
    vi: "chào buổi sáng",
    id: "selamat pagi",
    ms: "selamat pagi",
    tl: "magandang umaga",
    bn: "শুভ সকাল",
    ta: "காலை வணக்கம்",
    te: "శుభోదయం",
    kn: "ಶುಭೋದಯ",
    ml: "സുപ്രഭാതം",
    gu: "સુપ્રભાત",
    pa: "ਸ਼ੁਭ ਸਵੇਰ",
    mr: "सुप्रभात",
    ne: "शुभ प्रभात",
    si: "සුභ උදෑසනක්",
    my: "မင်္ဂလာအနက်ခင်းပါ",
    km: "អរុណសួស្តី",
    lo: "ສະບາຍດີຕອນເຊົ້າ",
    ka: "დილა მშვიდობისა",
    am: "እንደምን አደርክ",
    sw: "habari za asubuhi",
    zu: "sawubona ekuseni",
    af: "goeie môre",
    sq: "mirëmëngjes",
    hy: "բարի առավոտ",
    az: "günaydın",
    eu: "egun on",
    be: "добрай раніцы",
    bs: "dobro jutro",
    ca: "bon dia",
    cy: "bore da",
    eo: "bonan matenon",
    fo: "góðan morgun",
    gl: "bos días",
    is: "góðan daginn",
    ga: "maidin mhaith",
    kk: "қайырлы таң",
    ky: "куйрулуң таң",
    mk: "добро утро",
    mn: "өглөөний мэнд",
    sr: "добро јутро",
    tg: "субҳ ба хайр",
    tk: "günüňiz aýdyň",
    uk: "добрий ранок",
    uz: "xayrli tong",
    yi: "גוט מארגן",
  },
  "good night": {
    es: "buenas noches",
    fr: "bonne nuit",
    de: "gute nacht",
    it: "buonanotte",
    ru: "спокойной ночи",
    zh: "晚安",
    ja: "おやすみなさい",
    ko: "좋은 밤 되세요",
    ar: "تصبح على خير",
    hi: "शुभ रात्रि",
    pt: "boa noite",
    nl: "goedenacht",
    tr: "iyi geceler",
    pl: "dobranoc",
    sv: "god natt",
    da: "god nat",
    no: "god natt",
    fi: "hyvää yötä",
    cs: "dobrou noc",
    hu: "jó éjszakát",
    ro: "noapte bună",
    bg: "лека нощ",
    hr: "laku noć",
    sk: "dobrú noc",
    sl: "lahko noč",
    et: "head ööd",
    lv: "sweiku nakti",
    lt: "labanakt",
    mt: "il-lejl it-tajjeb",
    el: "καληνύχτα",
    he: "לילה טוב",
    th: "ราตรีสวัสดี",
    vi: "chúc ngủ ngon",
    id: "selamat malam",
    ms: "selamat malam",
    tl: "magandang gabi",
    bn: "শুভ রাত্রি",
    ta: "இனிய இரவு",
    te: "శుభ రాత్రి",
    kn: "ಶುಭ ರಾತ್ರಿ",
    ml: "ശുഭ രാത്രി",
    gu: "શુભ રાત્રી",
    pa: "ਚੰਗੀ ਰਾਤ",
    mr: "शुभ रात्री",
    ne: "शुभ रात्री",
    si: "සුභ රාත්රියක්",
    my: "အပန်းဖြေပါတယ်",
    km: "រាត្រីសួស្តី",
    lo: "ຝັນສວຍ",
    ka: "ღამე მშვიდობისა",
    am: "ለም ለም እንደምን አደርክ",
    sw: "usiku mwema",
    zu: "ulale kahle",
    af: "goeie nag",
    sq: "natën e mirë",
    hy: "բարի գիշեր",
    az: "yaxşı gecə",
    eu: "gau on",
    be: "дабранач",
    bs: "laku noć",
    ca: "bona nit",
    cy: "nos da",
    eo: "bonan nokton",
    fo: "góða nátt",
    gl: "boas noites",
    is: "góða nótt",
    ga: "oíche mhaith",
    kk: "жақсы түн",
    ky: "жақшы түн",
    mk: "добра ноќ",
    mn: "сайн шөнө",
    sr: "лаку ноћ",
    tg: "шаб ба хайр",
    tk: "gijäňiz rahat",
    uk: "доброї ночі",
    uz: "xayrli tun",
    yi: "א גוטע נאכט",
  },
};

// Language flag mappings
const LANGUAGE_FLAGS = {
  auto: "🌐",
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
  ru: "🇷🇺",
  zh: "🇨🇳",
  ar: "🇸🇦",
  hi: "🇮🇳",
  ja: "🇯🇵",
  pt: "🇵🇹",
  nl: "🇳🇱",
  ko: "🇰🇷",
  tr: "🇹🇷",
  pl: "🇵🇱",
  sv: "🇸🇪",
  da: "🇩🇰",
  no: "🇳🇴",
  fi: "🇫🇮",
  cs: "🇨🇿",
  hu: "🇭🇺",
  ro: "🇷🇴",
  bg: "🇧🇬",
  hr: "🇭🇷",
  sk: "🇸🇰",
  sl: "🇸🇮",
  et: "🇪🇪",
  lv: "🇱🇻",
  lt: "🇱🇹",
  mt: "🇲🇹",
  el: "🇬🇷",
  he: "🇮🇱",
  th: "🇹🇭",
  vi: "🇻🇳",
  id: "🇮🇩",
  ms: "🇲🇾",
  tl: "🇵🇭",
  bn: "🇧🇩",
  ta: "🇮🇳",
  te: "🇮🇳",
  kn: "🇮🇳",
  ml: "🇮🇳",
  gu: "🇮🇳",
  pa: "🇮🇳",
  mr: "🇮🇳",
  ne: "🇳🇵",
  si: "🇱🇰",
  my: "🇲🇲",
  km: "🇰🇭",
  lo: "🇱🇦",
  ka: "🇬🇪",
  am: "🇪🇹",
  sw: "🇹🇿",
  zu: "🇿🇦",
  af: "🇿🇦",
  sq: "🇦🇱",
  hy: "🇦🇲",
  az: "🇦🇿",
  eu: "🇪🇸",
  be: "🇧🇾",
  bs: "🇧🇦",
  ca: "🇪🇸",
  cy: "🇬🇧",
  eo: "🌍",
  fo: "🇫🇴",
  gl: "🇪🇸",
  is: "🇮🇸",
  ga: "🇮🇪",
  kk: "🇰🇿",
  ky: "🇰🇬",
  mk: "🇲🇰",
  mn: "🇲🇳",
  sr: "🇷🇸",
  tg: "🇹🇯",
  tk: "🇹🇲",
  uk: "🇺🇦",
  uz: "🇺🇿",
  yi: "🇮🇱",
};

function App() {
  const [input, setInput] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("es");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detectedLang, setDetectedLang] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [phoneticText, setPhoneticText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [detectionWarning, setDetectionWarning] = useState("");

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("translationTheme");
    if (savedTheme !== null) {
      setIsDarkTheme(savedTheme === "dark");
    }
  }, []);

  // Save theme preference to localStorage and update body class
  useEffect(() => {
    localStorage.setItem("translationTheme", isDarkTheme ? "dark" : "light");
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US"; // Default language

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("translationFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("translationFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleTranslate = async (e) => {
    e.preventDefault();
    setError("");
    setTranslated("");
    setDetectedLang(null);
    setPhoneticText("");
    setDetectionWarning("");
    if (!input.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    // Warn if input is too short for reliable detection
    const wordCount = input.trim().split(/\s+/).length;
    let actualSourceLang = sourceLang;
    if (sourceLang === "auto") {
      // Use franc-min to detect language
      let francCode = franc(input);
      let iso6391 = ISO6393_TO_ISO6391[francCode];
      if (
        francCode === "und" ||
        !iso6391 ||
        !LANGUAGES.some((l) => l.code === iso6391)
      ) {
        // Fallback: try to detect from TRANSLATIONS dictionary for short/known words
        const lowerText = input.toLowerCase().trim();
        if (TRANSLATIONS[lowerText]) {
          // Use the first available language code from the dictionary
          const possibleLangs = Object.keys(TRANSLATIONS[lowerText]);
          iso6391 = possibleLangs.find((code) =>
            LANGUAGES.some((l) => l.code === code)
          );
          if (iso6391) {
            setDetectedLang(iso6391);
            actualSourceLang = iso6391;
          } else {
            setError("Could not detect language. Please enter more text.");
            return;
          }
        } else {
          setError("Could not detect language. Please enter more text.");
          return;
        }
      } else {
        // Only set detectedLang if input is long enough
        if (input.trim().length >= 4 && wordCount > 1) {
          setDetectedLang(iso6391);
        } else {
          setDetectedLang(null);
        }
        actualSourceLang = iso6391;
      }
    }
    if (actualSourceLang === targetLang) {
      setError("Source and target languages must be different.");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      try {
        let translation = translateText(input, actualSourceLang, targetLang);
        if (!translation) {
          // Fallback: use Google Translate API
          translation = await translateWithGoogle(
            input,
            actualSourceLang,
            targetLang
          );
        }
        if (translation) {
          setTranslated(translation);
          // Get phonetic text if available
          const phonetic = getPhoneticText(translation, targetLang);
          if (phonetic) {
            setPhoneticText(phonetic);
          }
        } else {
          setError(
            'Translation not available for this text. Try common phrases like "hello", "thank you", "goodbye".'
          );
        }
      } catch (err) {
        setError("Translation failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const translateText = (text, source, target) => {
    const lowerText = text.toLowerCase().trim();

    // Check if we have a direct translation
    if (TRANSLATIONS[lowerText] && TRANSLATIONS[lowerText][target]) {
      return TRANSLATIONS[lowerText][target];
    }

    // Try to translate word by word for simple phrases
    const words = lowerText.split(" ");
    if (words.length > 1) {
      const translatedWords = words.map((word) => {
        if (TRANSLATIONS[word] && TRANSLATIONS[word][target]) {
          return TRANSLATIONS[word][target];
        }
        return word; // Keep original if no translation found
      });
      return translatedWords.join(" ");
    }

    return null;
  };

  const getPhoneticText = (text, language) => {
    if (PHONETIC_MAPPINGS[language] && PHONETIC_MAPPINGS[language][text]) {
      return PHONETIC_MAPPINGS[language][text];
    }
    return null;
  };

  const handleCopy = () => {
    if (translated) {
      navigator.clipboard.writeText(translated);
    }
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window && translated) {
      const utter = new window.SpeechSynthesisUtterance(translated);
      utter.lang = targetLang;
      window.speechSynthesis.speak(utter);
    }
  };

  const handleShare = async () => {
    if (input && translated) {
      const shareData = {
        title: "Translation",
        text: `${input} → ${translated}`,
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          // Fallback: copy to clipboard
          const shareText = `${input} → ${translated}\n\nTranslated with Language Translation Tool`;
          await navigator.clipboard.writeText(shareText);
          alert("Translation copied to clipboard!");
        }
      } catch (err) {
        console.error("Share failed:", err);
        // Fallback: copy to clipboard
        try {
          const shareText = `${input} → ${translated}\n\nTranslated with Language Translation Tool`;
          await navigator.clipboard.writeText(shareText);
          alert("Translation copied to clipboard!");
        } catch (clipboardErr) {
          alert("Failed to share or copy translation.");
        }
      }
    }
  };

  const handleSpeechToText = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const handleLanguageChange = (newSourceLang) => {
    setSourceLang(newSourceLang);
    // Update recognition language if available
    if (recognition && newSourceLang !== "auto") {
      const langMap = {
        en: "en-US",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        ru: "ru-RU",
        zh: "zh-CN",
        ja: "ja-JP",
        ko: "ko-KR",
        ar: "ar-SA",
        hi: "hi-IN",
        pt: "pt-BR",
        nl: "nl-NL",
        tr: "tr-TR",
        pl: "pl-PL",
        sv: "sv-SE",
        da: "da-DK",
        no: "no-NO",
        fi: "fi-FI",
        cs: "cs-CZ",
        hu: "hu-HU",
        ro: "ro-RO",
        bg: "bg-BG",
        hr: "hr-HR",
        sk: "sk-SK",
        sl: "sl-SI",
        et: "et-EE",
        lv: "lv-LV",
        lt: "lt-LT",
        mt: "mt-MT",
        el: "el-GR",
        he: "he-IL",
        th: "th-TH",
        vi: "vi-VN",
        id: "id-ID",
        ms: "ms-MY",
        tl: "tl-PH",
      };
      const speechLang = langMap[newSourceLang] || "en-US";
      recognition.lang = speechLang;
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInput(translated);
    setTranslated("");
  };

  const handleAddToFavorites = () => {
    if (input && translated) {
      const newFavorite = {
        id: Date.now(),
        originalText: input,
        translatedText: translated,
        sourceLang: detectedLang || sourceLang,
        targetLang: targetLang,
        timestamp: new Date().toISOString(),
      };
      setFavorites((prev) => [newFavorite, ...prev]);
    }
  };

  const handleRemoveFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const handleUseFavorite = (favorite) => {
    setInput(favorite.originalText);
    setSourceLang(favorite.sourceLang);
    setTargetLang(favorite.targetLang);
    setTranslated(favorite.translatedText);
    setShowFavorites(false);
  };

  const isInFavorites = () => {
    return favorites.some(
      (fav) =>
        fav.originalText === input &&
        fav.translatedText === translated &&
        fav.sourceLang === (detectedLang || sourceLang) &&
        fav.targetLang === targetLang
    );
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className="translator-container">
      <div className="header-controls">
        <h1>Language Translation Tool</h1>
        <button
          className="theme-toggle-btn"
          onClick={handleThemeToggle}
          title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkTheme ? "☀️" : "🌙"}
        </button>
      </div>
      {/* Favorites Toggle */}
      <div className="favorites-toggle">
        <button
          className="favorites-btn"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Hide" : "Show"} Favorites ({favorites.length})
        </button>
      </div>
      {/* Favorites Section */}
      {showFavorites && (
        <div className="favorites-section">
          <h3>Favorite Translations</h3>
          {favorites.length === 0 ? (
            <p>No favorite translations yet.</p>
          ) : (
            <div className="favorites-list">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="favorite-item">
                  <div className="favorite-content">
                    <div className="favorite-text">
                      <strong>{favorite.originalText}</strong> →{" "}
                      <strong>{favorite.translatedText}</strong>
                    </div>
                    <div className="favorite-langs">
                      {LANGUAGE_FLAGS[favorite.sourceLang]}{" "}
                      {ISO6391_TO_NAME[favorite.sourceLang]} →{" "}
                      {LANGUAGE_FLAGS[favorite.targetLang]}{" "}
                      {ISO6391_TO_NAME[favorite.targetLang]}
                    </div>
                    <div className="favorite-date">
                      {new Date(favorite.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="favorite-actions">
                    <button onClick={() => handleUseFavorite(favorite)}>
                      Use
                    </button>
                    <button
                      onClick={() => handleRemoveFromFavorites(favorite.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <form className="translator-form" onSubmit={handleTranslate}>
        <div className="input-container">
          <textarea
            className="translator-input"
            rows={4}
            placeholder="Enter text to translate... (Try: hello, thank you, goodbye, good morning, good night, please, yes, no)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            className={`mic-btn ${isListening ? "listening" : ""}`}
            onClick={handleSpeechToText}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? "🔴" : "🎤"}
          </button>
        </div>
        <div className="translator-options">
          <div>
            <label>From: </label>
            <select
              value={sourceLang}
              onChange={(e) => {
                handleLanguageChange(e.target.value);
                setSourceLang(e.target.value);
              }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {LANGUAGE_FLAGS[lang.code]} {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="swap-btn"
            onClick={handleSwapLanguages}
            title="Swap languages"
          >
            ⇄
          </button>
          <div>
            <label>To: </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {LANGUAGES.filter((l) => l.code !== "auto").map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {LANGUAGE_FLAGS[lang.code]} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="translator-btn" type="submit" disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>
      {/* Show detection warning if present */}
      {detectionWarning && (
        <div className="translator-error" style={{ color: "#ffb347" }}>
          {detectionWarning}
        </div>
      )}
      {error && <div className="translator-error">{error}</div>}
      {translated && (
        <div className="translator-output-section">
          <div className="translator-output">{translated}</div>
          {phoneticText && (
            <div className="phonetic-text">
              <strong>Pronunciation:</strong> {phoneticText}
            </div>
          )}
          <div className="translator-actions">
            <button className="translator-btn" onClick={handleCopy}>
              Copy to Clipboard
            </button>
            <button className="translator-btn" onClick={handleSpeak}>
              Text-to-Speech
            </button>
            <button className="translator-btn" onClick={handleShare}>
              Share
            </button>
            <button
              className={`favorite-btn ${isInFavorites() ? "favorited" : ""}`}
              onClick={handleAddToFavorites}
              title={
                isInFavorites() ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isInFavorites() ? "★" : "☆"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

async function translateWithGoogle(text, source, target) {
  try {
    const res = await fetch("http://localhost:5001/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source, target }),
    });
    if (!res.ok) throw new Error("Translation API error");
    const data = await res.json();
    return data.translatedText;
  } catch (err) {
    return null;
  }
}
