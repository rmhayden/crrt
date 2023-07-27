
GAME CHOICE: 
>> ICU Medicine Simulation: "continuous renal replacement therapy"


RATIONALE / PURPOSE:
>> this virtual patient simulation game will help doctors learn the principles of how to manage continuous renal replacement therapy (CRRT) in the intensive care unit
>> specific learning goals: 1. learn how to prescribe CRRT and then see how the replacement fluid choice and rate both influence metabolic parameters 2. observe and manage the balance of fluid removal with CRRT (to improve repsiratory status) and hemodynamics. 3. 


GAME SET UP:
>> VIRTUAL PATIENT SIMULATOR - control the CVVH prescription over time; react appropriately to changes in critically ill patient
>> GOAL: keep the patient ALIVE for 24 hours (divided into six 4-hour intervals)
>> Major Variables that the patient avatar will portray and that are influenced by the CRRT prescription orders are broken down into three buckets: 1. METABOLIC  2.HEMODYNAMIC  3. RESPIRATORY
>> each of these three major variables will have a "score" between 0-5 that may change from one time interval to the next
>> phenotypic changes that may be observed on the userinterface include changes in graphics, cached lab values (will return a random value within a pre-spsecified range for the current metabolic "phenotype" as an array over time; checked every 4 hours), vital signs (pressor requirement and mean arterial pressure will track with hemodynamic phenotype), ventilator settings (will track with respiratory phenotype), and other elements
>> TIME INTERVAL: every 4 hours, the game advances - phenotypic changes may occur following each interva, and there is an opportunity to change the CRRT prescription by "signing" the orderes to start or update CRRT--just like in real life, these new/updated orders will take effect after the next "interval"


WIREFRAME / PSEUDOCODE:
>> see attached under DOCS as a PDF
>> can also find a backup original copy here: https://robscontent.com/crrt_wireframe.pdf
>> will later write out all functions in this document (or in JS directly); initially, it was helpful to simulatenously pseudocode while looing at the wireframe with element class names listed there as well


KEY PARAMETERS / ACTIONS / INTERACTIONS:
>> the starting "score" for 1. METABOLIC  2.HEMODYNAMIC  3. RESPIRATORY phenotypes (0-5) will be set initially (0 = mild, 5 = death)
>> DEATH outcome occurs if any one of the three phenotypes reaches 5
>> SURVIVED outcome occurs if patient does not die within 6 intervals (24 hrs total)
>> KEY INTERACTIONS: excessive net positive fluid intake will worsen respiratory status; but excessive net negative fluid status (too much ultrafiltration) will worsen heomdynamics


SELF-SUGGESTIONS FOR APPROACH:
>> expect CSS flexbox/grid will help with all the different DOM elements (see wireframe- lots of buttons and images)
>> will start with graphics that may not be "perfect" -- can polish them later, focusing first on the coding
>> in order to make sure the game runs, will start first with only ONE of the three major phenotypes (metabolic), since this is the least interactive of the three


POSSIBLE IDEAS TO GROW/STRETCH THE GAME:
>> could have prespecified "events" occur (probably notification with a modal) at set time intervals in the game (for example bowel ischemia, which would worsen hemodynamics and likely result in a worsening metabolic profile) to which the user must react and change the CRRT prescription accordingly
>> later, may add "feedback" based on things the user did wrong... for example, if the ideal replacement fluid rate would have been prismasol (instead of phoxillum) in the context of elevated phos, could return a comment about this in a feedback modal after gameEnd() runs
>> can envision this game having multiple possible cases; could even customize it so a senior doctor could set initial parameters for a teaching case to then have a student doctor run through
>> likely add a timer so the game will auto-run... perhaps 2 minus = four hours (one interval)
