/*
Web Help Desk Keyboard Short Cuts
*/

document.addEventListener("keydown", function (event) {
  // ALT + N create new tech note
  if (event.altKey && event.key === "n") {
    try {
      let cancelButton = document.querySelector("#TechNoteEditorUpdateContainer > table > tbody > tr:nth-child(6) > td > div > a:nth-child(1)");
      // if note is already open
      if(cancelButton) {
        // close note
        cancelButton.click();
      }
      // create new note
      else {
        document.querySelector("#NoteListUpdateDiv > table > tbody > tr.header > td.newNoteHeader > a").click();
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + A goes to asset tab
  else if(event.altKey && event.key === "a") {
    try {
      document.querySelector("#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > div").click();
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + C goes to client tab
  else if(event.altKey && event.key === "c") {
    try {
      document.querySelector("#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > div").click();
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + T goes to ticket tab
  else if(event.altKey && event.key === "t") {
    try {
      document.querySelector("#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > div").click();
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + S saves ticket
  else if(event.altKey && event.key === "s") {
    try {
      document.querySelector("#TicketSaveButtonsContainer > tr > td > table > tbody > tr > td:nth-child(2) > div > a:nth-child(14)").click();
    } catch (error) {
      console.log(error);
    }
  }
});

