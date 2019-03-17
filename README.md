# mobile-flashcards

This is a mobile app for users to collect their flash cards and 
take quiz to remember cards regularly. It's a project built with 
React Native, React Navigation, expo, Redux and Redux Thunk. The 
app has many views including deck list view, deck detail veiw, 
add deck view, add card view and the quiz view. It will also send 
a local notification every day at 10pm, if the user has finished 
any quiz on that day.

## Contribute to the project
To get started with this project:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── app.json - Configuration file for expo to configure parts of your app that don't belong in code. 
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── actions
│   └── index.js # all the actions which could be dispatched from the app. 
├── assets
│   ├── icon.jpg # Application Icon, You may change if you wish.
│   └── splash.png # Splash screen image
├── components
│   ├── AddDeck.js # This is the view for creating deck with no questions.
│   ├── AddQuestion.js # The view for adding a question to a deck
│   ├── CardsStatusBar.js # Customized status bar for the app.
│   ├── DeckDetail.js # The view showing the details and action buttons for the deck.
│   ├── DeckList.js # The view showing a list of all the decks.
│   ├── DeckSummary.js # This is a component showing summary info for one deck in the list.
│   ├── Home.js # This component contains navigation configuration for all the views.
│   ├── Quiz.js # This view handles how users take quiz on a deck and shows the results of quiz.
│   └── TextButton.js # This is a convenient component for creating a text button.
├── reducers
│   ├── decks.js # The reducer to handle state of decks.
│   └── index.js # combine all the reducers in one object.
└── utils
    ├── api.js # This file contains the API to read and save data in AsyncStorage. 
    ├── colors.js # This file contains all the colors used in the app.
    └── notifications.js # This file contains utility methods for managing notifications.
```

## Important
The app is now using AsyncStorage as backend. The data will be erased if you reinstall the app on the same device.