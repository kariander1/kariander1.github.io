// German A1 vocabulary (based on the Goethe-Zertifikat A1 word list).
// Format: "# key | English name | Hebrew name" starts a category; each line after is
// "German | English | Hebrew". Nouns carry their article (der/die/das).
const VOCAB_RAW = `
# phrases | Greetings & phrases | ברכות וביטויים
Hallo | hello | שלום
Guten Morgen | good morning | בוקר טוב
Guten Tag | good day / hello | שלום (יום טוב)
Guten Abend | good evening | ערב טוב
Gute Nacht | good night | לילה טוב
Tschüs | bye | ביי
Auf Wiedersehen | goodbye | להתראות
bitte | please / you're welcome | בבקשה
danke | thank you | תודה
Entschuldigung | excuse me / sorry | סליחה
ja | yes | כן
nein | no | לא
Wie geht's? | how are you? | מה שלומך?
Willkommen | welcome | ברוכים הבאים
Herzlichen Glückwunsch | congratulations | מזל טוב
Alles Gute | all the best | כל טוב
okay | okay | בסדר
genau | exactly | בדיוק
natürlich | of course | כמובן
vielleicht | maybe | אולי
gern | gladly | בשמחה
leider | unfortunately | לצערי
zum Beispiel | for example | לדוגמה

# people | People & personal info | אנשים ופרטים אישיים
der Mann | man / husband | גבר / בעל
die Frau | woman / wife / Mrs. | אישה / גברת
das Kind | child | ילד
der Junge | boy | נער
das Mädchen | girl | ילדה
das Baby | baby | תינוק
der Herr | gentleman / Mr. | אדון / מר
die Leute (Pl.) | people | אנשים
der Mensch | human being | אדם
die Person | person | אדם (אישיות)
der Freund | friend (m) / boyfriend | חבר
die Freundin | friend (f) / girlfriend | חברה
der Nachbar | neighbor | שכן
der Gast | guest | אורח
der Name | name | שם
der Vorname | first name | שם פרטי
der Familienname | surname | שם משפחה
das Alter | age | גיל
der Geburtstag | birthday | יום הולדת
der Geburtsort | place of birth | מקום לידה
die Adresse | address | כתובת
die Telefonnummer | phone number | מספר טלפון
die Hausnummer | house number | מספר בית
die Postleitzahl | postal code | מיקוד
die Sprache | language | שפה
die Muttersprache | native language | שפת אם
die Fremdsprache | foreign language | שפה זרה
die Heimat | homeland | מולדת
ledig | single | רווק
verheiratet | married | נשוי
geschieden | divorced | גרוש
der Ausweis | ID card | תעודה מזהה
der Pass | passport | דרכון
das Formular | form | טופס
die Unterschrift | signature | חתימה
unterschreiben | to sign | לחתום
die Anmeldung | registration | הרשמה
anmelden | to register | לרשום / להירשם
das Amt | (government) office | לשכה ממשלתית
der Kunde | customer | לקוח

# family | Family | משפחה
die Familie | family | משפחה
die Eltern (Pl.) | parents | הורים
der Vater | father | אבא
die Mutter | mother | אמא
der Sohn | son | בן
die Tochter | daughter | בת
der Bruder | brother | אח
die Schwester | sister | אחות
die Geschwister (Pl.) | siblings | אחים ואחיות
der Großvater | grandfather | סבא
die Großmutter | grandmother | סבתא
der Opa | grandpa | סבא
die Oma | grandma | סבתא
die Großeltern (Pl.) | grandparents | סבא וסבתא
der Onkel | uncle | דוד
die Tante | aunt | דודה
der Ehemann | husband | בעל
die Ehefrau | wife | רעיה
der Partner | partner (m) | בן זוג
die Partnerin | partner (f) | בת זוג
die Hochzeit | wedding | חתונה
heiraten | to marry | להתחתן

# body | Body & health | גוף ובריאות
der Körper | body | גוף
der Kopf | head | ראש
das Auge | eye | עין
das Ohr | ear | אוזן
die Nase | nose | אף
der Mund | mouth | פה
der Zahn | tooth | שן
das Haar | hair | שיער
die Hand | hand | יד
der Arm | arm | זרוע
das Bein | leg | רגל
der Fuß | foot | כף רגל
der Bauch | belly | בטן
der Rücken | back | גב
der Arzt | doctor (m) | רופא
die Ärztin | doctor (f) | רופאה
die Praxis | (doctor's) practice | מרפאה
das Krankenhaus | hospital | בית חולים
die Apotheke | pharmacy | בית מרקחת
das Medikament | medicine | תרופה
die Tablette | pill | כדור (תרופה)
krank | sick | חולה
gesund | healthy | בריא
die Gesundheit | health / bless you! | בריאות / לבריאות!
die Schmerzen (Pl.) | pain | כאבים
wehtun | to hurt | לכאוב
das Fieber | fever | חום
der Termin | appointment | תור / פגישה
der Notruf | emergency call | שיחת חירום
die Polizei | police | משטרה
die Hilfe | help | עזרה
helfen | to help | לעזור

# food | Food & drink | אוכל ושתייה
das Essen | food / meal | אוכל / ארוחה
essen | to eat | לאכול
trinken | to drink | לשתות
das Getränk | drink | משקה
das Wasser | water | מים
der Kaffee | coffee | קפה
der Tee | tea | תה
die Milch | milk | חלב
der Saft | juice | מיץ
das Bier | beer | בירה
der Wein | wine | יין
das Brot | bread | לחם
das Brötchen | bread roll | לחמנייה
die Butter | butter | חמאה
der Käse | cheese | גבינה
die Wurst | sausage | נקניק
das Fleisch | meat | בשר
das Hähnchen | chicken | עוף
der Fisch | fish | דג
das Ei | egg | ביצה
das Obst | fruit | פירות
der Apfel | apple | תפוח
die Banane | banana | בננה
die Orange | orange | תפוז
das Gemüse | vegetables | ירקות
die Kartoffel | potato | תפוח אדמה
die Tomate | tomato | עגבנייה
der Salat | salad / lettuce | סלט / חסה
der Reis | rice | אורז
die Nudeln (Pl.) | pasta / noodles | פסטה
die Suppe | soup | מרק
der Kuchen | cake | עוגה
das Eis | ice cream / ice | גלידה / קרח
der Zucker | sugar | סוכר
das Salz | salt | מלח
der Pfeffer | pepper | פלפל (תבלין)
das Öl | oil | שמן
das Frühstück | breakfast | ארוחת בוקר
frühstücken | to have breakfast | לאכול ארוחת בוקר
das Mittagessen | lunch | ארוחת צהריים
das Abendessen | dinner | ארוחת ערב
kochen | to cook | לבשל
der Hunger | hunger | רעב
der Durst | thirst | צמא
schmecken | to taste (good) | להיות טעים
lecker | tasty | טעים
das Restaurant | restaurant | מסעדה
das Café | café | בית קפה
die Speisekarte | menu | תפריט
der Kellner | waiter | מלצר
bestellen | to order | להזמין (אוכל)
die Rechnung | bill | חשבון
bezahlen | to pay | לשלם
das Glas | glass | כוס (זכוכית)
die Tasse | cup | ספל
die Flasche | bottle | בקבוק
der Teller | plate | צלחת
das Messer | knife | סכין
die Gabel | fork | מזלג
der Löffel | spoon | כף
das Kilo | kilo | קילו
das Gramm | gram | גרם
der Liter | liter | ליטר
das Stück | piece | חתיכה

# home | Home | בית ודיור
die Wohnung | apartment | דירה
das Haus | house | בית
das Zimmer | room | חדר
die Küche | kitchen | מטבח
das Bad | bathroom / bath | חדר רחצה / אמבטיה
die Toilette | toilet | שירותים
das Schlafzimmer | bedroom | חדר שינה
das Wohnzimmer | living room | סלון
der Balkon | balcony | מרפסת
der Garten | garden | גינה
die Tür | door | דלת
das Fenster | window | חלון
der Tisch | table | שולחן
der Stuhl | chair | כיסא
das Bett | bed | מיטה
der Schrank | cupboard / wardrobe | ארון
das Sofa | sofa | ספה
die Lampe | lamp | מנורה
die Möbel (Pl.) | furniture | רהיטים
der Kühlschrank | fridge | מקרר
der Herd | stove | כיריים
die Waschmaschine | washing machine | מכונת כביסה
der Fernseher | TV set | טלוויזיה
der Stock | floor (storey) | קומה
der Aufzug | elevator | מעלית
die Treppe | stairs | מדרגות
der Schlüssel | key | מפתח
die Miete | rent | שכר דירה
mieten | to rent | לשכור
vermieten | to rent out | להשכיר
der Vermieter | landlord | משכיר
wohnen | to live (reside) | לגור
hell | bright | מואר
dunkel | dark | חשוך

# city | City & shopping | עיר וקניות
die Stadt | city | עיר
das Dorf | village | כפר
das Land | country / countryside | ארץ / כפר
die Straße | street | רחוב
das Zentrum | center | מרכז
der Platz | square / place / seat | כיכר / מקום
die Ecke | corner | פינה
die Ampel | traffic light | רמזור
der Weg | way / path | דרך
der Park | park | פארק
die Bank | bank / bench | בנק / ספסל
die Post | post office / mail | דואר
der Brief | letter | מכתב
die Briefmarke | stamp | בול
das Paket | package | חבילה
die Karte | card / map / ticket | כרטיס / מפה
die Kirche | church | כנסייה
das Museum | museum | מוזיאון
das Kino | cinema | קולנוע
das Theater | theater | תיאטרון
die Information | information | מידע
der Eingang | entrance | כניסה
der Ausgang | exit | יציאה
das Schild | sign | שלט
das Geschäft | shop / business | חנות / עסק
der Laden | shop | חנות
der Supermarkt | supermarket | סופרמרקט
der Markt | market | שוק
die Bäckerei | bakery | מאפייה
die Kasse | checkout / till | קופה
kaufen | to buy | לקנות
verkaufen | to sell | למכור
einkaufen | to go shopping | לעשות קניות
der Preis | price | מחיר
kosten | to cost | לעלות (מחיר)
teuer | expensive | יקר
billig | cheap | זול
günstig | good value | משתלם
das Angebot | offer / special | מבצע / הצעה
das Geld | money | כסף
der Euro | euro | יורו
der Cent | cent | סנט
bar | (in) cash | במזומן
die Kreditkarte | credit card | כרטיס אשראי
der Automat | (vending/ticket) machine | מכונה אוטומטית
links | left | שמאלה
rechts | right | ימינה
geradeaus | straight ahead | ישר
hier | here | כאן
dort | there | שם
nah | near | קרוב
weit | far | רחוק

# travel | Transport & travel | תחבורה ונסיעות
der Bahnhof | train station | תחנת רכבת
der Flughafen | airport | שדה תעופה
die Haltestelle | stop (bus/tram) | תחנה
der Bus | bus | אוטובוס
der Zug | train | רכבת
die Bahn | railway / train | רכבת
die S-Bahn | suburban train | רכבת פרברית
die U-Bahn | subway | רכבת תחתית
die Straßenbahn | tram | חשמלית
das Auto | car | מכונית
das Taxi | taxi | מונית
das Fahrrad | bicycle | אופניים
das Flugzeug | airplane | מטוס
das Schiff | ship | ספינה
die Fahrkarte | ticket | כרטיס נסיעה
das Ticket | ticket | כרטיס
der Fahrplan | timetable | לוח זמנים
das Gleis | platform / track | רציף
die Abfahrt | departure | יציאה
die Ankunft | arrival | הגעה
abfahren | to depart | לצאת לדרך
ankommen | to arrive | להגיע
fahren | to drive / go (by vehicle) | לנסוע
fliegen | to fly | לטוס
gehen | to go / walk | ללכת
umsteigen | to change (trains) | להחליף קו
einsteigen | to get on | לעלות (לרכב)
aussteigen | to get off | לרדת (מרכב)
die Reise | trip | נסיעה / טיול
reisen | to travel | לנסוע / לטייל
der Urlaub | vacation | חופשה
das Hotel | hotel | מלון
das Einzelzimmer | single room | חדר ליחיד
das Doppelzimmer | double room | חדר זוגי
das Gepäck | luggage | מטען
der Koffer | suitcase | מזוודה
buchen | to book | להזמין (מקום)
parken | to park | לחנות (רכב)
der Parkplatz | parking space | חניה
die Tankstelle | gas station | תחנת דלק
das Ausland | abroad | חוץ לארץ
die Welt | world | עולם

# time | Time & calendar | זמן ולוח שנה
die Zeit | time | זמן
die Uhr | clock / o'clock | שעון / שעה
die Stunde | hour | שעה
die Minute | minute | דקה
der Moment | moment | רגע
der Tag | day | יום
die Woche | week | שבוע
der Monat | month | חודש
das Jahr | year | שנה
das Wochenende | weekend | סוף שבוע
das Datum | date | תאריך
heute | today | היום
morgen | tomorrow | מחר
gestern | yesterday | אתמול
der Morgen | morning | בוקר
der Vormittag | (late) morning | לפני הצהריים
der Mittag | noon | צהריים
der Nachmittag | afternoon | אחר הצהריים
der Abend | evening | ערב
die Nacht | night | לילה
jetzt | now | עכשיו
bald | soon | בקרוב
später | later | מאוחר יותר
früh | early | מוקדם
spät | late | מאוחר
pünktlich | on time | בזמן
immer | always | תמיד
oft | often | לעיתים קרובות
manchmal | sometimes | לפעמים
nie | never | אף פעם
schon | already | כבר
noch | still / yet | עדיין / עוד
dann | then | אז
zuerst | first (of all) | קודם כל
danach | afterwards | אחר כך
halb | half | חצי
das Viertel | quarter | רבע
die Pause | break | הפסקה
der Feiertag | public holiday | חג
das Ende | end | סוף
der Montag | Monday | יום שני
der Dienstag | Tuesday | יום שלישי
der Mittwoch | Wednesday | יום רביעי
der Donnerstag | Thursday | יום חמישי
der Freitag | Friday | יום שישי
der Samstag | Saturday | שבת
der Sonntag | Sunday | יום ראשון
der Januar | January | ינואר
der Februar | February | פברואר
der März | March | מרץ
der April | April | אפריל
der Mai | May | מאי
der Juni | June | יוני
der Juli | July | יולי
der August | August | אוגוסט
der September | September | ספטמבר
der Oktober | October | אוקטובר
der November | November | נובמבר
der Dezember | December | דצמבר
der Frühling | spring | אביב
der Sommer | summer | קיץ
der Herbst | autumn | סתיו
der Winter | winter | חורף

# numbers | Numbers & amounts | מספרים וכמויות
null | zero | אפס
eins | one | אחת
zwei | two | שתיים
drei | three | שלוש
vier | four | ארבע
fünf | five | חמש
sechs | six | שש
sieben | seven | שבע
acht | eight | שמונה
neun | nine | תשע
zehn | ten | עשר
elf | eleven | אחת־עשרה
zwölf | twelve | שתים־עשרה
zwanzig | twenty | עשרים
dreißig | thirty | שלושים
hundert | hundred | מאה
tausend | thousand | אלף
erste | first | ראשון
zweite | second | שני
dritte | third | שלישי
die Zahl | number | מספר
die Nummer | number | מספר
einmal | once | פעם אחת
viel | much / a lot | הרבה
wenig | little / few | מעט
ein bisschen | a bit | קצת
mehr | more | יותר
alle | all / everyone | כולם
ungefähr | approximately | בערך
fast | almost | כמעט

# colors | Colors & weather | צבעים ומזג אוויר
die Farbe | color | צבע
rot | red | אדום
blau | blue | כחול
grün | green | ירוק
gelb | yellow | צהוב
schwarz | black | שחור
weiß | white | לבן
grau | gray | אפור
braun | brown | חום
orange | orange | כתום
rosa | pink | ורוד
lila | purple | סגול
bunt | colorful | צבעוני
das Wetter | weather | מזג אוויר
die Sonne | sun | שמש
der Regen | rain | גשם
regnen | to rain | לרדת (גשם)
der Schnee | snow | שלג
der Wind | wind | רוח
warm | warm | חמים
kalt | cold | קר
heiß | hot | חם מאוד
das Grad | degree | מעלה
das Meer | sea | ים
der See | lake | אגם
der Berg | mountain | הר
die Blume | flower | פרח
der Baum | tree | עץ
das Tier | animal | חיה
der Hund | dog | כלב
die Katze | cat | חתולה / חתול

# work | Work & school | עבודה ולימודים
die Arbeit | work | עבודה
arbeiten | to work | לעבוד
der Beruf | profession | מקצוע
der Job | job | משרה
die Firma | company | חברה (עסק)
das Büro | office | משרד
der Chef | boss (m) | בוס
die Chefin | boss (f) | בוסית
der Kollege | colleague (m) | עמית
die Kollegin | colleague (f) | עמיתה
der Lehrer | teacher (m) | מורה
die Lehrerin | teacher (f) | מורה (נ׳)
der Schüler | pupil (m) | תלמיד
die Schülerin | pupil (f) | תלמידה
der Student | student (m) | סטודנט
die Studentin | student (f) | סטודנטית
der Verkäufer | salesperson (m) | מוכר
die Verkäuferin | salesperson (f) | מוכרת
der Computer | computer | מחשב
das Handy | mobile phone | טלפון נייד
das Telefon | telephone | טלפון
telefonieren | to talk on the phone | לדבר בטלפון
anrufen | to call | להתקשר
die E-Mail | email | אימייל
das Internet | internet | אינטרנט
die Nachricht | message / news | הודעה / חדשות
das Papier | paper | נייר
das Bild | picture | תמונה
die Schule | school | בית ספר
der Kurs | course | קורס
der Unterricht | lessons / class | שיעור
lernen | to learn | ללמוד
studieren | to study (at university) | ללמוד באוניברסיטה
die Prüfung | exam | מבחן
die Hausaufgabe | homework | שיעורי בית
die Frage | question | שאלה
fragen | to ask | לשאול
die Antwort | answer | תשובה
antworten | to answer | לענות
das Wort | word | מילה
der Satz | sentence | משפט
das Buch | book | ספר
der Kuli | pen | עט
die Seite | page / side | עמוד / צד
das Beispiel | example | דוגמה
der Fehler | mistake | טעות
das Problem | problem | בעיה
richtig | correct | נכון
falsch | wrong | שגוי
verstehen | to understand | להבין
wiederholen | to repeat | לחזור על
buchstabieren | to spell | לאיית
ankreuzen | to tick / mark | לסמן (ב־X)
schreiben | to write | לכתוב
lesen | to read | לקרוא

# leisure | Free time & clothes | פנאי וביגוד
die Freizeit | free time | זמן פנוי
das Hobby | hobby | תחביב
der Sport | sport | ספורט
der Fußball | soccer / football | כדורגל
spielen | to play | לשחק
das Spiel | game | משחק
schwimmen | to swim | לשחות
tanzen | to dance | לרקוד
singen | to sing | לשיר
die Musik | music | מוזיקה
das Konzert | concert | הופעה / קונצרט
hören | to hear / listen | לשמוע
sehen | to see | לראות
fernsehen | to watch TV | לצפות בטלוויזיה
der Film | movie | סרט
das Foto | photo | תמונה
fotografieren | to take photos | לצלם
die Zeitung | newspaper | עיתון
spazieren gehen | to go for a walk | לטייל ברגל
besuchen | to visit | לבקר
treffen | to meet | לפגוש
einladen | to invite | להזמין (אורחים)
die Einladung | invitation | הזמנה
feiern | to celebrate | לחגוג
die Party | party | מסיבה
das Geschenk | gift | מתנה
der Spaß | fun | כיף
Weihnachten | Christmas | חג המולד
die Kleidung | clothing | ביגוד
das Kleid | dress | שמלה
die Hose | trousers | מכנסיים
das Hemd | shirt | חולצה מכופתרת
der Rock | skirt | חצאית
die Jacke | jacket | ז׳קט
der Mantel | coat | מעיל
der Pullover | sweater | סוודר
das T-Shirt | T-shirt | חולצת טי
der Schuh | shoe | נעל
die Tasche | bag / pocket | תיק / כיס
anziehen | to put on (clothes) | ללבוש
tragen | to wear / carry | ללבוש / לסחוב
die Größe | size | מידה
passen | to fit | להתאים

# verbs | Common verbs | פעלים נפוצים
sein | to be | להיות
haben | to have | שיש ל־ (להחזיק)
werden | to become | להפוך ל־
können | can / to be able to | יכול
müssen | must / to have to | חייב
wollen | to want | לרצות
möchten | would like | הייתי רוצה
dürfen | may / to be allowed | מותר
sollen | should / ought to | אמור
mögen | to like | לחבב
machen | to do / make | לעשות
kommen | to come | לבוא
bleiben | to stay | להישאר
sagen | to say | לומר
sprechen | to speak | לדבר
erzählen | to tell | לספר
heißen | to be called | להיקרא
leben | to live | לחיות
geben | to give | לתת
nehmen | to take | לקחת
bringen | to bring | להביא
holen | to fetch | להביא (ללכת ולהביא)
abholen | to pick up | לאסוף
bekommen | to get / receive | לקבל
schicken | to send | לשלוח
finden | to find / think | למצוא / לחשוב
suchen | to look for | לחפש
brauchen | to need | להזדקק
wissen | to know (a fact) | לדעת
kennen | to know (be familiar with) | להכיר
kennenlernen | to get to know | להכיר (לראשונה)
glauben | to believe | להאמין
denken | to think | לחשוב
lieben | to love | לאהוב
gefallen | to please / be liked | למצוא חן
gehören | to belong | להשתייך
öffnen | to open | לפתוח
aufmachen | to open | לפתוח
schließen | to close | לסגור
zumachen | to close | לסגור
anfangen | to start | להתחיל
beginnen | to begin | להתחיל
aufhören | to stop | להפסיק
dauern | to last | לארוך (זמן)
warten | to wait | לחכות
schlafen | to sleep | לישון
aufstehen | to get up | לקום
duschen | to shower | להתקלח
waschen | to wash | לרחוץ / לכבס
putzen | to clean | לנקות
liegen | to lie (be lying) | לשכב / להימצא
stehen | to stand | לעמוד
sitzen | to sit | לשבת
laufen | to run / walk | לרוץ / ללכת
zeigen | to show | להראות
benutzen | to use | להשתמש
vergessen | to forget | לשכוח
lachen | to laugh | לצחוק
mitkommen | to come along | לבוא יחד
ausfüllen | to fill in | למלא (טופס)
sich freuen | to be glad | לשמוח
rauchen | to smoke | לעשן

# adjectives | Adjectives & adverbs | שמות תואר ותוארי פועל
gut | good / well | טוב
schlecht | bad | רע
neu | new | חדש
alt | old | ישן / זקן
jung | young | צעיר
schön | beautiful / nice | יפה
groß | big / tall | גדול / גבוה
klein | small | קטן
lang | long | ארוך
kurz | short | קצר
schnell | fast | מהיר
langsam | slow | איטי
leicht | easy / light | קל
schwer | difficult / heavy | קשה / כבד
einfach | simple | פשוט
frei | free / vacant | פנוי / חופשי
besetzt | occupied | תפוס
offen | open | פתוח
kaputt | broken | שבור
müde | tired | עייף
froh | glad | שמח
nett | nice / kind | נחמד
freundlich | friendly | ידידותי
toll | great | נהדר
super | super | מצוין
interessant | interesting | מעניין
wichtig | important | חשוב
ruhig | quiet | שקט
laut | loud | רועש
sauber | clean | נקי
voll | full | מלא
leer | empty | ריק
fertig | ready / finished | מוכן / גמור
möglich | possible | אפשרי
allein | alone | לבד
zusammen | together | ביחד
andere | other | אחר
gleich | same / right away | אותו דבר / מיד
ganz | whole / quite | שלם / די
sehr | very | מאוד
auch | also | גם
nur | only | רק
wieder | again | שוב
zurück | back | בחזרה
oben | above / upstairs | למעלה
unten | below / downstairs | למטה
draußen | outside | בחוץ
so | so / like this | כך
also | so / therefore | אז / לכן

# grammar | Little words | מילות יחס, שאלה וכינויים
wer | who | מי
was | what | מה
wo | where | איפה
woher | where from | מאיפה
wohin | where to | לאן
wann | when | מתי
wie | how | איך
wie viel | how much | כמה
warum | why | למה
welcher | which | איזה
ich | I | אני
du | you (informal) | אתה / את
er | he | הוא
sie | she / they | היא / הם
es | it | זה
wir | we | אנחנו
ihr | you (plural) | אתם / אתן
Sie | you (formal) | אתה / את (בנימוס)
mein | my | שלי
dein | your | שלך
man | one / you (generic) | (גוף סתמי) אנשים
und | and | ו־
oder | or | או
aber | but | אבל
denn | because | כי
mit | with | עם
ohne | without | בלי
für | for | בשביל
von | from / of | מ־ / של
aus | from / out of | מ־ (מוצא)
in | in | ב־
an | at / on (vertical) | ליד / על
auf | on (top of) | על
bei | at / near | אצל
neben | next to | ליד
zwischen | between | בין
über | over / about | מעל / על (נושא)
unter | under | מתחת
hinter | behind | מאחורי
vor | in front of / before / ago | לפני / מול
nach | after / to | אחרי / ל־ (יעד)
zu | to / too / closed | אל / מדי / סגור
um | at (time) / around | ב־ (שעה) / סביב
seit | since / for | מאז / כבר
bis | until | עד
nicht | not | לא
kein | no / not a | שום / לא
alles | everything | הכול
etwas | something | משהו
nichts | nothing | כלום
jeder | every / each | כל אחד
`;

const CATEGORIES = [];
const WORDS = [];
(function parse() {
  let cat = null;
  for (const raw of VOCAB_RAW.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('#')) {
      const [key, en, he] = line.slice(1).split('|').map(s => s.trim());
      cat = { key, en, he };
      CATEGORIES.push(cat);
      continue;
    }
    const [de, en, he] = line.split('|').map(s => s.trim());
    const m = de.match(/^(der|die|das) /);
    WORDS.push({ id: cat.key + ':' + de, de, en, he, cat: cat.key, article: m ? m[1] : null });
  }
})();
