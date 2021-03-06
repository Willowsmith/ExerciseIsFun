# ExerciseIsFun

## Description

<pre>
    The motiviation behind this project was to provide an interactive workout website that would allow an 
easy to use method for the user to figure out their workout for a particular day. It is intended to allow 
for not only specifying muscle groups but also the exercises that work those groups and utilize videos to 
assit a user in figuring out how to safely and correctly accomplish the exercise. 

    The problem that this website solves is greatly increasing the efficiency of deciding on a workout as 
well as educating the user. It does so in a clean, simple, and motivating manner. In the process of creating 
this website we learned how to utilize a css framework that we were not practiced in coupled with importing 
data from multiple APIs and utilizing that data interactively within our website.
</pre>

## Usage

<pre>
    Upon load, the users shold be presented with an inspirational quote and four buttons which give options 
in tailoring the results to the user. These options are Create, Upper, Lower, and Full. 
</pre>

Link to website:
[Workout Planner website](https://willowsmith.github.io/ExerciseIsFun/)

![inital website](./assets/images/SS_load.png)

<pre>
    Clicking on Create will present the user with a modal that will allow the user to select a finer subset of 
areas to work as well as allow them to search for specific exercises. This will present the user with options 
that will allow them to customize their workout manually, this modal has 3 buttons as well, these being Clear 
Exercises, which will allow a user to remove all of their selections and start again, Submit Exercises, which 
will add the selected exercises to their presented plan, and Exit which will simply close the modal. 
</pre>

![modal example](./assets/images/SS_modal.png)
<pre>
    Upper will pesent the user with options that are specific to the upper body and allow them to select from 
those options as well as close any of the cards presented, they are also able to alter the suggested sets and 
reps. The Lower button will do the same as Upper but for the lower body, and Full presents options for the full 
body.
</pre>

![exercise options from preselection](./assets/images/SS_workout.png)

<pre>
    Once the user's workout is planned as they want they can hit the 'submit' button at the bottom, this will provide
a clean view of the workout by removing content from the top of the screen. Upon clicking the button 'print' a print 
screen will also pop up. 
</pre>

![Save and Print Selection](./assets/images/SS_print.png)

<pre>
    From the submit page they can also save this workout with a unique name to local storage. If they then reload the 
page and type in that name their saved workout would apppear once more.
</pre>

![Save and Print Selection](./assets/images/SS_save.png)
## Collaborators

- Paige Olsen [github address](https://github.com/POlsen-92)
- Mark Lohse-Miranda [github address](https://github.com/Mark-LohseMiranda)
- Mohammed Abbasi [github address](https://github.com/abbasiafnan9)
- Melyssa Dennis [github address](https://github.com/Willowsmith)

- Two APIs were used in the creation of this website from which exercise data and inspirational quotes were pulled.

  - [RapidAPI website link](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/details)
  - [Type.Fit API Quotes link](https://type.fit/api/quotes)

- We also used Pure.css for our css framework:
  - [Pure.css webpage](https://purecss.io/)
