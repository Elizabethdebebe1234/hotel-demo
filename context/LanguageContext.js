"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  EN: {
    home: "Home",
    rooms: "Rooms",
    dining: "Dining",
    experiences: "Experiences",
    contact: "Contact",
    reserve: "RESERVE YOUR STAY",
    tagline: "RESORT & EXPERIENCES",
    selectLanguage: "Select Language",

    // Home hero
    heroEyebrow: "✦ AN EXTRAORDINARY ESCAPE ✦",
    heroTitle: "ESCAPE THE",
    heroHighlight: "ORDINARY.",
    heroDescription:
      "Discover a world of luxury, Ethiopian flavors, unforgettable nights and extraordinary experiences.",
    exploreExperiences: "EXPLORE EXPERIENCES",
    discoverRooms: "DISCOVER ROOMS",
    heroBottom: "YOUR ESCAPE. YOUR STORY.",

    // Welcome section
    welcomeEyebrow: "WELCOME TO NIGHTFALL",
    welcomeTitle: "MORE THAN A STAY.",
    welcomeHighlight: "A FEELING.",
    welcomeDescription:
      "Wake up somewhere beautiful, spend your afternoon beside the pool, taste authentic Ethiopian cuisine and end your night under the stars.",
    discoverStory: "DISCOVER OUR STORY",

    // Rooms section
    privateEscape: "YOUR PRIVATE ESCAPE",
    stayIn: "STAY IN",
    style: "STYLE.",
    allRooms: "ALL ROOMS",
    signature: "SIGNATURE",
    signatureSuite: "The Signature Suite",
    signatureDescription: "Luxury, comfort and panoramic views.",
    premium: "PREMIUM",
    royalResidence: "Royal Residence",
    royalDescription: "A beautiful space for extraordinary stays.",
    comfort: "COMFORT",
    classicEscape: "Classic Escape",
    classicDescription: "Relax in effortless elegance.",
    perNight: " / NIGHT",

    // Dining section
    diningEyebrow: "THE ART OF DINING",
    diningTitle: "FIRE. FLAVOR.",
    diningHighlight: "FEAST.",
    diningDescription:
      "From Ethiopian tibs and kitfo to signature grilled meats, discover a dining experience worth remembering.",
    exploreDining: "EXPLORE DINING",

    // Experiences section
    momentsEyebrow: "UNFORGETTABLE MOMENTS",
    liveThe: "LIVE THE",
    moment: "MOMENT.",
    allExperiences: "ALL EXPERIENCES",
    dayExperience: "DAY EXPERIENCE",
    poolsideParadise: "Poolside Paradise",
    poolDescription: "Sunshine, swimming and relaxation.",
    nightExperience: "NIGHT EXPERIENCE",
    campfire: "The Great Campfire",
    campfireDescription: "Music, stories and nights under the stars.",

    // Shared components
    keepExploring: "KEEP EXPLORING",
    moreTo: "THERE'S MORE TO",
    discover: "DISCOVER.",
    nextMoment: "Your next unforgettable moment is just around the corner.",
    luxuryRooms: "Luxury Rooms",
    luxuryRoomsText: "Find your perfect private escape.",
    diningBars: "Dining & Bars",
    diningBarsText: "Discover fire, flavor and Ethiopian food.",
    experiencesText: "Make memories beyond the ordinary.",
    contactUs: "Contact Us",
    contactText: "Let's plan your next visit.",
    discoverLabel: "DISCOVER",
    explore: "EXPLORE",
    discoverMore: "DISCOVER MORE",
    footerTagline: "AN EXTRAORDINARY ESCAPE. ETHIOPIA.",
    copyright: "© 2026 NIGHTFALL RESORT · DEMO CONCEPT",
    // Rooms page
roomsHeroEyebrow: "01 / YOUR PRIVATE SANCTUARY",
roomsHeroTitle: "STAY IN",
roomsHeroHighlight: "STYLE.",
roomsHeroDescription: "Beautiful spaces. Exceptional comfort. A stay worth remembering.",
findSpace: "FIND YOUR PERFECT SPACE",
roomsHeading: "ROOMS &",
suites: "SUITES.",
roomsIntro: "Discover a room that feels like it was made just for you.",
royalCollection: "ROYAL COLLECTION",
royalRoomDescription: "Spacious comfort and refined luxury.",
classicCollection: "CLASSIC COLLECTION",
classicRoomDescription: "A peaceful stay with everything you need.",
premiumCollection: "PREMIUM COLLECTION",
grandRetreat: "The Grand Retreat",
grandDescription: "A stylish escape for a memorable getaway.",
wakeUp: "WAKE UP TO",
wonder: "WONDER.",
nextChapter: "YOUR NEXT CHAPTER BEGINS HERE",
extraordinaryStay: "Make your stay extraordinary.",
inquireStay: "INQUIRE ABOUT A STAY",

// Experiences page
experiencesHeroEyebrow: "03 / LIFE IS AN ADVENTURE",
experiencesHeroTitle: "LIVE THE",
experiencesHeroHighlight: "MOMENT.",
experiencesHeroDescription: "From sunlit afternoons to unforgettable nights, there is always something happening.",
discoverExtraordinary: "DISCOVER SOMETHING EXTRAORDINARY",
eventsHeading: "EXPERIENCES &",
eventsHighlight: "EVENTS.",
eventsIntro: "Explore the moments that make every visit unforgettable.",
daytimeEscape: "DAYTIME ESCAPE",
underStars: "UNDER THE STARS",
liveEntertainment: "LIVE ENTERTAINMENT",
foodCulture: "FOOD & CULTURE",
specialOccasions: "SPECIAL OCCASIONS",
musicNightlife: "MUSIC & NIGHTLIFE",
circusCelebration: "Circus & Celebration",
circusDescription: "Spectacular performances and entertainment.",
meatNights: "Meat Nights",
meatDescription: "Open-fire grilled meat and Ethiopian feasts.",
privateCelebrations: "Private Celebrations",
celebrationsDescription: "Beautiful settings for special moments.",
musicStars: "Music Under The Stars",
musicDescription: "An unforgettable atmosphere after dark.",
whenSunset: "WHEN THE SUN GOES DOWN",
nightYours: "THE NIGHT IS",
yours: "YOURS.",
nightDescription: "Music. Fire. Flavors. Unforgettable memories.",
nightDining: "DISCOVER NIGHT DINING",

// Contact page
contactHeroEyebrow: "04 / WE WOULD LOVE TO WELCOME YOU",
contactHeroTitle: "LET'S MAKE",
contactHeroHighlight: "MEMORIES.",
contactHeroDescription: "Your extraordinary escape is waiting. Get in touch with our team.",
getInTouch: "GET IN TOUCH",
storyStarts: "YOUR STORY STARTS",
here: "HERE.",
contactIntro: "Contact our team to discuss your visit, events or accommodation.",
call: "CALL",
write: "WRITE",
visit: "VISIT",
phone: "Phone",
email: "Email",
location: "Location",
phonePlaceholder: "Hotel phone number goes here",
emailPlaceholder: "Hotel email goes here",
addressPlaceholder: "Saris, Addis Ababa, Ethiopia",
exploreOurRooms: "EXPLORE OUR ROOMS",
discoverEvents: "DISCOVER EVENTS",
findUs: "FIND US",
mapDescription: "Visit Nightfall Resort in Saris, Addis Ababa.",
mapLabel: "Saris, Addis Ababa, Ethiopia",
  },

  AM: {
    home: "መነሻ",
    rooms: "ክፍሎች",
    dining: "ምግብ እና መጠጥ",
    experiences: "ልዩ ተሞክሮዎች",
    contact: "ያግኙን",
    reserve: "ቆይታዎን ያስይዙ",
    tagline: "ሪዞርት እና ልዩ ተሞክሮዎች",
    selectLanguage: "ቋንቋ ይምረጡ",

    heroEyebrow: "✦ ልዩ የእረፍት ተሞክሮ ✦",
    heroTitle: "ከተለመደው",
    heroHighlight: "ዓለም ይውጡ።",
    heroDescription:
      "የቅንጦት አገልግሎትን፣ የኢትዮጵያ ጣዕሞችን፣ የማይረሱ ምሽቶችን እና ልዩ ተሞክሮዎችን ያግኙ።",
    exploreExperiences: "ልዩ ተሞክሮዎችን ይመልከቱ",
    discoverRooms: "ክፍሎቻችንን ይመልከቱ",
    heroBottom: "የእርስዎ እረፍት። የእርስዎ ታሪክ።",

    welcomeEyebrow: "ወደ ናይትፎል እንኳን በደህና መጡ",
    welcomeTitle: "ከቆይታ በላይ።",
    welcomeHighlight: "ልዩ ስሜት።",
    welcomeDescription:
      "በሚያምር ቦታ ይንቁ፣ ከሰዓትዎን በመዋኛ ገንዳው አጠገብ ያሳልፉ፣ እውነተኛ የኢትዮጵያ ምግብ ይቅመሱ እና ምሽትዎን በከዋክብት ስር ይጨርሱ።",
    discoverStory: "ስለ እኛ ይወቁ",

    privateEscape: "የእርስዎ የግል ማረፊያ",
    stayIn: "በቅጡ",
    style: "ይቆዩ።",
    allRooms: "ሁሉንም ክፍሎች ይመልከቱ",
    signature: "ልዩ",
    signatureSuite: "ልዩ ሱዊት",
    signatureDescription: "ቅንጦት፣ ምቾት እና ውብ እይታዎች።",
    premium: "ፕሪሚየም",
    royalResidence: "ሮያል መኖሪያ",
    royalDescription: "ለልዩ ቆይታ የተዘጋጀ ውብ ቦታ።",
    comfort: "ምቾት",
    classicEscape: "ክላሲክ ማረፊያ",
    classicDescription: "በቀላል ውበት ዘና ይበሉ።",
    perNight: " / በአንድ ሌሊት",

    diningEyebrow: "የምግብ ጥበብ",
    diningTitle: "እሳት። ጣዕም።",
    diningHighlight: "ድግስ።",
    diningDescription:
      "ከኢትዮጵያ ጥብስና ክትፎ እስከ ልዩ የተጠበሱ ስጋዎች ድረስ፣ የማይረሳ የምግብ ተሞክሮ ያግኙ።",
    exploreDining: "የምግብ አገልግሎታችንን ይመልከቱ",

    momentsEyebrow: "የማይረሱ አፍታዎች",
    liveThe: "አፍታውን",
    moment: "ይኑሩ።",
    allExperiences: "ሁሉንም ተሞክሮዎች ይመልከቱ",
    dayExperience: "የቀን ተሞክሮ",
    poolsideParadise: "የመዋኛ ገንዳ ደስታ",
    poolDescription: "ፀሐይ፣ ዋና እና ዘና ያለ ጊዜ።",
    nightExperience: "የምሽት ተሞክሮ",
    campfire: "የእሳት ዙሪያ ምሽት",
    campfireDescription: "ሙዚቃ፣ ታሪኮች እና በከዋክብት ስር የሚያሳልፉ ምሽቶች።",

    keepExploring: "ማሰስዎን ይቀጥሉ",
    moreTo: "ተጨማሪ ነገር",
    discover: "ይጠብቅዎታል።",
    nextMoment: "ቀጣዩ የማይረሳ ተሞክሮዎ በቅርብ ነው።",
    luxuryRooms: "የቅንጦት ክፍሎች",
    luxuryRoomsText: "ለእርስዎ የሚስማማውን የግል ማረፊያ ያግኙ።",
    diningBars: "ምግብ እና ባሮች",
    diningBarsText: "እሳትን፣ ጣዕምን እና የኢትዮጵያ ምግብን ይቅመሱ።",
    experiencesText: "ከተለመደው የተለዩ ትዝታዎችን ይፍጠሩ።",
    contactUs: "ያግኙን",
    contactText: "ቀጣዩን ጉብኝትዎን አብረን እናቅድ።",
    discoverLabel: "ይመልከቱ",
    explore: "ይመልከቱ",
    discoverMore: "ተጨማሪ ይመልከቱ",
    footerTagline: "ልዩ የእረፍት ተሞክሮ። ኢትዮጵያ።",
    copyright: "© 2026 ናይትፎል ሪዞርት · የማሳያ ፕሮጀክት",
    // Rooms page
roomsHeroEyebrow: "01 / የእርስዎ የግል ማረፊያ",
roomsHeroTitle: "በቅጡ",
roomsHeroHighlight: "ይቆዩ።",
roomsHeroDescription: "ውብ ቦታዎች። ልዩ ምቾት። የማይረሳ ቆይታ።",
findSpace: "ለእርስዎ የሚስማማውን ክፍል ያግኙ",
roomsHeading: "ክፍሎች እና",
suites: "ሱዊቶች።",
roomsIntro: "ለእርስዎ ብቻ የተዘጋጀ የሚመስል ክፍል ያግኙ።",
royalCollection: "ሮያል ክምችት",
royalRoomDescription: "ሰፊ ምቾት እና የተራቀቀ ቅንጦት።",
classicCollection: "ክላሲክ ክምችት",
classicRoomDescription: "የሚያስፈልግዎት ሁሉ ያለበት ሰላማዊ ቆይታ።",
premiumCollection: "ፕሪሚየም ክምችት",
grandRetreat: "ግራንድ ማረፊያ",
grandDescription: "የማይረሳ የእረፍት ጊዜ የሚሆን ውብ ቦታ።",
wakeUp: "ወደ ድንቅ ዓለም",
wonder: "ይንቁ።",
nextChapter: "ቀጣዩ ታሪክዎ እዚህ ይጀምራል",
extraordinaryStay: "ቆይታዎን ልዩ ያድርጉት።",
inquireStay: "ስለ ቆይታ ይጠይቁ",

// Experiences page
experiencesHeroEyebrow: "03 / ሕይወት ጀብዱ ነው",
experiencesHeroTitle: "አፍታውን",
experiencesHeroHighlight: "ይኑሩ።",
experiencesHeroDescription: "ከፀሐያማ ከሰዓት እስከ የማይረሱ ምሽቶች ድረስ ሁልጊዜ የሚደረግ ነገር አለ።",
discoverExtraordinary: "ልዩ ነገር ያግኙ",
eventsHeading: "ተሞክሮዎች እና",
eventsHighlight: "ዝግጅቶች።",
eventsIntro: "እያንዳንዱን ጉብኝት የማይረሳ የሚያደርጉ አፍታዎችን ይመልከቱ።",
daytimeEscape: "የቀን እረፍት",
underStars: "በከዋክብት ስር",
liveEntertainment: "ቀጥታ መዝናኛ",
foodCulture: "ምግብ እና ባህል",
specialOccasions: "ልዩ አጋጣሚዎች",
musicNightlife: "ሙዚቃ እና የምሽት መዝናኛ",
circusCelebration: "ሰርከስ እና ደስታ",
circusDescription: "አስደናቂ ትርኢቶች እና መዝናኛዎች።",
meatNights: "የስጋ ምሽቶች",
meatDescription: "በክፍት እሳት የተጠበሰ ስጋ እና የኢትዮጵያ ግብዣዎች።",
privateCelebrations: "የግል ዝግጅቶች",
celebrationsDescription: "ለልዩ አፍታዎች የተዘጋጁ ውብ ቦታዎች።",
musicStars: "በከዋክብት ስር ሙዚቃ",
musicDescription: "ከጨለማ በኋላ የማይረሳ ድባብ።",
whenSunset: "ፀሐይ ስትጠልቅ",
nightYours: "ምሽቱ",
yours: "የእርስዎ ነው።",
nightDescription: "ሙዚቃ። እሳት። ጣዕም። የማይረሱ ትዝታዎች።",
nightDining: "የምሽት ምግብን ይመልከቱ",

// Contact page
contactHeroEyebrow: "04 / እርስዎን በደስታ እንቀበላለን",
contactHeroTitle: "የማይረሱ",
contactHeroHighlight: "ትዝታዎችን እንፍጠር።",
contactHeroDescription: "ልዩ የእረፍት ተሞክሮዎ እየጠበቀዎት ነው። ከቡድናችን ጋር ይገናኙ።",
getInTouch: "ያግኙን",
storyStarts: "ታሪክዎ እዚህ",
here: "ይጀምራል።",
contactIntro: "ስለ ጉብኝትዎ፣ ዝግጅቶችዎ ወይም ማረፊያዎ ከቡድናችን ጋር ይወያዩ።",
call: "ይደውሉ",
write: "ይጻፉ",
visit: "ይጎብኙ",
phone: "ስልክ",
email: "ኢሜይል",
location: "አድራሻ",
phonePlaceholder: "የሆቴሉ ስልክ ቁጥር እዚህ ይገባል",
emailPlaceholder: "የሆቴሉ ኢሜይል እዚህ ይገባል",
addressPlaceholder: "ሳሪስ፣ አዲስ አበባ፣ ኢትዮጵያ",
exploreOurRooms: "ክፍሎቻችንን ይመልከቱ",
discoverEvents: "ዝግጅቶችን ይመልከቱ",
findUs: "እኛን ያግኙ",
mapDescription: "ናይትፎል ሪዞርትን በሳሪስ፣ አዲስ አበባ ይጎብኙ።",
mapLabel: "ሳሪስ፣ አዲስ አበባ፣ ኢትዮጵያ",
  },

  OR: {
    home: "Mana",
    rooms: "Kutaawwan",
    dining: "Nyaataa fi Dhugaatii",
    experiences: "Muuxannoowwan",
    contact: "Nu Qunnamaa",
    reserve: "BOQONNAA KEESSAN QABSIISAA",
    tagline: "RIIZORTII FI MUUXANNOOWWAN",
    selectLanguage: "Afaan Filadhaa",

    heroEyebrow: "✦ BOQONNAA ADDaa ✦",
    heroTitle: "WANTA BARAME",
    heroHighlight: "IRRA DARBAA.",
    heroDescription:
      "Addunyaa qananii, mi'aa nyaata Itoophiyaa, halkan hin dagatamne fi muuxannoo addaa ta'e keessa seenaa.",
    exploreExperiences: "MUUXANNOOWWAN ILAALAA",
    discoverRooms: "KUTAAWWAN ILAALAA",
    heroBottom: "BOQONNAA KEESSAN. SEENAA KEESSAN.",

    welcomeEyebrow: "GARA NIGHTFALL BAGA NAGAAN DHUFTAN",
    welcomeTitle: "BOQONNAA QOFA MITI.",
    welcomeHighlight: "MIIRAA ADDaa.",
    welcomeDescription:
      "Bakka bareedaa keessatti dammaqaa, waaree booda yeroo keessan cina bishaan daakaa dabarsaa, nyaata dhugaa Itoophiyaa dhandhamaa, halkan keessan immoo urjiiwwan jala xumuraa.",
    discoverStory: "SEENAA KEENYA BARADHAA",

    privateEscape: "BOQONNAA DHUNFAA KEESSAN",
    stayIn: "AKKAAN",
    style: "BOQODHAA.",
    allRooms: "KUTAAWWAN HUNDA",
    signature: "ADDaa",
    signatureSuite: "Kutaa Signature",
    signatureDescription: "Qananii, mijataa fi ilaalcha bal'aa.",
    premium: "PREEMIYAMII",
    royalResidence: "Mana Jireenyaa Mootii",
    royalDescription: "Bakka bareedaa boqonnaa addaa ta'eef mijatu.",
    comfort: "MIJATAA",
    classicEscape: "Boqonnaa Classic",
    classicDescription: "Bareedina salphaa keessatti boqodhaa.",
    perNight: " / Halkan tokkoof",

    diningEyebrow: "OGUMMAA NYAATAA",
    diningTitle: "IBIDDA. MI'AA.",
    diningHighlight: "IRBAATA.",
    diningDescription:
      "Tibsii fi kitoo Itoophiyaa irraa kaasee hanga foon addaa waadameetti, muuxannoo nyaataa yaadatamu argadhaa.",
    exploreDining: "NYAATA KEENYA ILAALAA",

    momentsEyebrow: "YEROOWWAN HIN DAGATAMNE",
    liveThe: "YEROO",
    moment: "KEESSAN DABARSAA.",
    allExperiences: "MUUXANNOOWWAN HUNDA",
    dayExperience: "MUUXANNOO GUYYAA",
    poolsideParadise: "Gammachuu Cinaa Bishaan Daakaa",
    poolDescription: "Ifa aduu, daakuu fi boqonnaa.",
    nightExperience: "MUUXANNOO Halkan",
    campfire: "Ibidda Guddicha Naannoo",
    campfireDescription: "Muuziqaa, seenaa fi halkan urjiiwwan jala.",

    keepExploring: "BARUU KEESSAN ITTI FUFAA",
    moreTo: "WANTI BIROO",
    discover: "ISIN EEGAA.",
    nextMoment: "Muuxannoon keessan itti aanu isa hin dagatamne ta'a.",
    luxuryRooms: "Kutaawwan Qananiisaa",
    luxuryRoomsText: "Bakka boqonnaa dhuunfaa isinitti tolu argadhaa.",
    diningBars: "Nyaataa fi Baarota",
    diningBarsText: "Ibidda, mi'aa fi nyaata Itoophiyaa dhandhamaa.",
    experiencesText: "Yaadannoo addaa uumadhaa.",
    contactUs: "Nu Qunnamaa",
    contactText: "Daawwannaa keessan itti aanu waliin haa karoorfannu.",
    discoverLabel: "ILAALAA",
    explore: "ILAALAA",
    discoverMore: "DABALATA BARADHAA",
    footerTagline: "BOQONNAA ADDAA. ITOOPHIYAA.",
    copyright: "© 2026 NIGHTFALL RESORT · Pirojektii Agarsiisaa",
    // Rooms page
roomsHeroEyebrow: "01 / BOQONNAA DHUNFAA KEESSAN",
roomsHeroTitle: "AKKAAN",
roomsHeroHighlight: "BOQODHAA.",
roomsHeroDescription: "Bakka bareedaa. Mijataa olaanaa. Boqonnaa yaadatamu.",
findSpace: "KUTAA ISINITTI TOLU BARBAADAA",
roomsHeading: "KUTAAWWAN &",
suites: "SUWIITOTA.",
roomsIntro: "Kutaa akka isin qofaaf qophaa'e fakkaatu argadhaa.",
royalCollection: "KUUSAA ROOYAL",
royalRoomDescription: "Mijataa bal'aa fi qananii olaanaa.",
classicCollection: "KUUSAA KILAASIKII",
classicRoomDescription: "Boqonnaa tasgabbaa'aa wantoota isin barbaachisan hunda qabu.",
premiumCollection: "KUUSAA PREEMIYAMII",
grandRetreat: "Boqonnaa Guddicha",
grandDescription: "Boqonnaa yaadatamuuf bakka bareedaa.",
wakeUp: "GARA DINQISIISAATTI",
wonder: "DAMMAQAA.",
nextChapter: "BOQONNAAN KEESSAN ITTI AANU ASITTI JALQABA",
extraordinaryStay: "Boqonnaa keessan addaa godhaa.",
inquireStay: "WAA'EE BOQONNAA GAAFADHAA",

// Experiences page
experiencesHeroEyebrow: "03 / JIREENYI IMALA JAALATA",
experiencesHeroTitle: "YEROO",
experiencesHeroHighlight: "KEESSAN DABARSAA.",
experiencesHeroDescription: "Waaree ifaa irraa hanga halkan yaadatamuutti, yeroo hunda wanti raawwatamu jira.",
discoverExtraordinary: "WANTA ADDAA TA'E BARBAADAA",
eventsHeading: "MUUXANNOOWWAN &",
eventsHighlight: "TAATEEWWAN.",
eventsIntro: "Yeroo daawwannaa hunda yaadatamaa kan godhan muuxannoowwan ilaalaa.",
daytimeEscape: "BOQONNAA GUYYAA",
underStars: "URJIIWWAN JALA",
liveEntertainment: "BOHARSAA KALLATTII",
foodCulture: "NYAATAA FI AADAA",
specialOccasions: "YEROOWWAN ADDAA",
musicNightlife: "MUUZIQAA FI JIREENYA HALKANII",
circusCelebration: "Sirkii fi Ayyaana",
circusDescription: "Agarsiisa ajaa'ibaa fi bashannana.",
meatNights: "Halkan Foonii",
meatDescription: "Foon ibidda banaa irratti waadame fi nyaata ayyaanaa Itoophiyaa.",
privateCelebrations: "Ayyaana Dhuunfaa",
celebrationsDescription: "Yeroo addaa keessaniif bakka bareedaa.",
musicStars: "Muuziqaa Urjiiwwan Jala",
musicDescription: "Halkan dukkanaa'ee booda haala yaadatamu.",
whenSunset: "YEROO ADUUN SEENTU",
nightYours: "HALKAN",
yours: "KEESSANI.",
nightDescription: "Muuziqaa. Ibidda. Mi'aa. Yaadannoo hin dagatamne.",
nightDining: "NYAATA HALKANII ILAALAA",

// Contact page
contactHeroEyebrow: "04 / ISIN SIMACHUUF GAMMADDINA",
contactHeroTitle: "YAADANNOO",
contactHeroHighlight: "HAA UUMNU.",
contactHeroDescription: "Boqonnaan addaa keessan isin eeggata. Garee keenya qunnamaa.",
getInTouch: "NU QUNNAMAA",
storyStarts: "SEENAA KEESSAN",
here: "ASITTI JALQABA.",
contactIntro: "Daawwannaa, taatee ykn bakka boqonnaa keessan irratti garee keenya waliin mari'adhaa.",
call: "BILBILAA",
write: "BARREESSAA",
visit: "DAAWADHAA",
phone: "Bilbila",
email: "Imeelii",
location: "Bakka",
phonePlaceholder: "Lakkoofsi bilbila hoteelichaa asitti galfama",
emailPlaceholder: "Imeeliin hoteelichaa asitti galfama",
addressPlaceholder: "Saaris, Finfinnee, Itoophiyaa",
exploreOurRooms: "KUTAAWWAN KEENYA ILAALAA",
discoverEvents: "TAATEEWWAN ILAALAA",
findUs: "NU ARAGAA",
mapDescription: "Nightfall Resort Saaris, Finfinnee keessatti daawwadhaa.",
mapLabel: "Saaris, Finfinnee, Itoophiyaa",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("nightfall-language");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nightfall-language", language);

    const htmlLanguage = {
      EN: "en",
      AM: "am",
      OR: "om",
    };

    document.documentElement.lang = htmlLanguage[language];
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.EN[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: changeLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}