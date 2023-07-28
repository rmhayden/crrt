------------------------------
CRRT Virtual Patient Simulator 
------------------------------

BRIEF SUMMARY
-------------
This web app game is a virtual patient simulator designed to teach intensive care unit physicians and other providers the basic approach to managing a patient on CRRT (continuous renal replacement therapy). The objective of the game is to keep the patient alive for a "time period" of 24 hours (approximately one minute in real time), a task which will require the user to react to clinical data in real time and adjust the CRRT prescription accordingly. Viewing the trends in clinical data, including how they are impacted by changes to the CRRT prescription, are the primary means of teaching the user CRRT management in this low-stakes virtual simulation. This can be challenging, as the intervention to manage one condition may negatively impact another.

GAME DESIGN AND USER-EXPERIENCE
-------------------------------
The goal of the game is to keep the patient alive for "24 hours" (approximately one minute in real time). Game time is broken down into six intervals of time, each "four hours" time for the patient (ten seconds in real time). At each interval, clinical data returns for interpretation by the user, who must then adjust the CRRT prescription accordingly; the adjustments in CRRT settings will take effect upon progression to the following interval.

There are three main categories of disease processes that may be lethal if not adequately managed: 1 -- metabolic deranagements (specifically, hyperkalemia, hypokalemia, hypophosphatemia); 2 -- hemodynamic decompensation (in this case, worsening shock due to excessive ultrafiltration); 3 -- respiratory failure (which may be made worse by inadequate ultrafiltration with the CRRT prescription).

As the game begins, an introductory message describes the patient and task at hand (image below):

<img width="468" alt="image" src="https://github.com/rmhayden/crrt/assets/138035971/d1bc0cd5-fd25-4299-a4ae-9949cf0b811d">


Key interactive features are highlighted in red (image below), which shows a screenshot of the game's user experience:

![image](https://github.com/rmhayden/crrt/assets/138035971/f25e86d9-bfda-4978-a23a-a57341a361f9)


At the end of the game, if the patient does not survive, targeted feedback based on what could have been better optimized is given to the user to ensure optimal learning. See screen shot example (image below:)

![image](https://github.com/rmhayden/crrt/assets/138035971/356d7569-46d0-4a3a-a43d-99af5bfad8ef)


TECHNOLOGIES USED
-----------------
This browser-based web app game functions as a result of HTML/CSS/JavaScript, all integrated using VS Code and GitHub. The animated graphic of the patient on the ventilator and CRRT machine was created by this author using Adobe Animate. The author would like to acknowledge General Assembly, as this product was created as part of the SEI bootcamp with help from classmates and instructors.


HOW TO PLAY THE GAME
--------------------
The browser-based web app game is live and can be played by clicking one of the following links:

GitHub Pages - [https://rmhayden.github.io/crrt/]
RenalPrimers.com - [https://renalprimers.com/crrt/index.html]


FUTURE FEATURES
---------------
In future versions, the following features may be added:
- additional pertinent laboratory values (such as pH and bicarbonate)
- interactive animated graphics (ventilator, hemodynamics, CRRT machine animations change in accordance with the phenotype in the game)
- the option to pick one or more specific cases (would help the user understand different clinical scenarios)
- customization: could allow the instructor to input specific starting data and elements of the case that are then set as initial values for pertinent variables
- appreciate any feedback for other suggested future features!


-----------------
Robert Hayden, MD  |  Kidney Medicine  |  Boston, MA  |  July, 2023
