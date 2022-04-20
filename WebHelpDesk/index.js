/*
Web Help Desk Keyboard Short Cuts
*/
var index = 3; 

document.addEventListener("keydown", function (event) {
  // ALT + N create new tech note
  if (event.altKey && event.key === "n") {
    try {
      let cancelSection = [...document.querySelectorAll("#TechNoteEditorUpdateContainer > table > tbody > tr")].find(({innerText, textContent}) => innerText.match(/Cancel/g));
      // if note is already open
      if(cancelSection) {
        // close note
        cancelSection.querySelector("td > div > a").click();
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
      let notClicked = true;
      // buttons have different locations
      let saveButtons = [
        document.querySelector("#TicketSaveButtonsContainer > tr > td > table > tbody > tr > td:nth-child(2) > div > a:nth-child(14)"),
        document.querySelector("#TicketSaveButtonsContainer > tr > td > table > tbody > tr > td:nth-child(2) > div > a:nth-child(15)"),
      ];
      // find the right button to click
      for(let button of saveButtons) {
        if(button) {
          button.click();
          break;
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
  // ALT + Z copies ith elements to clipboard
  /*
  else if(event.altKey && event.key === "z") {
    try {
      let tabs = ""; 
      for(let i=1;i<index;i++) tabs += "\t";
      navigator.clipboard.writeText([...document.querySelector(`#DetailsPanelDiv > table > tbody > tr:nth-child(6) > td > div > select:nth-child(${index})`).options].map(e=>`${tabs}${e.textContent}`).join("\n"))
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + <NUMBER> sets index
  else if(event.altKey && parseInt(event.key)) {
    try {
      index = parseInt(event.key)
    } catch (error) {
      console.log(error);
    }
  }
  */
  // CTRL + Enter saves and formats tech note
  else if(event.ctrlKey && event.key === "Enter") {
    try {
      let element = document.activeElement
      console.log({element});
      if(element.tagName.toLowerCase() === "textarea") {
        document.querySelector("#TechNoteEditorUpdateContainer > table > tbody > tr:nth-child(5) > td > div > a:last-child").click();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
});

