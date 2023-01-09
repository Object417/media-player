# To Do

## Bugs

- [x] Audio stops playing when tab is changed to "list".
      Possible solution: bring `<AudioElement>` to the top,
      so it can be rendered all the time, not only when "player" tab is active.
- [x] Current time label must show current audio position,
      not the `<Slider>` position. When you drag the slider, tooltip must show
      searching time but the label must still be going on and showing real current time
- [ ] Music continues playing when it has been deleted form the list

## General

- [ ] Learn what data types Redux can store
- [ ] Learn how uploaded files onto page are saved
- [x] Set up Redux store
- [x] Set up MUI `<ThemeProvider>`
- [ ] Import and apply the theme asynchronically
- [ ] Use JSDoc comments
- [ ] Explore why MUI `<Tabs>` can't be a `<CardHeader>`
- [ ] Better errors handling with toast messages
- [ ] Load the default audio (from the file from the `src/`)
- [ ] Optimise the number of rerenders
- [ ] Tree shaking
- [ ] Sort and format the imports

## Redux store

- [ ] Prevent uploading the same file twice (or more times)

## Audio list

- [x] Split `AudioList.jsx` into several components
- [x] Play the audio when user clicks onto list item
- [ ] Show on the list element icon what song is playing (or paused)

## Audio player

- [ ] ~ Develop AudioPlayerTab
- [x] Split into modules
- [x] Develop progress bar (the ability to track and change
      `currentTime` of the audio)
