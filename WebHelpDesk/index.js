/*
Web Help Desk Keyboard Short Cuts
RegEx to match keybinds: /(?<=\/\/ )(ALT|ENTER)[^\n]+/gim
*/

var index = 3;

document.addEventListener("keydown", function (event) {
  // ALT + N open new tech note or a new ticket if on ticket queue page
  if (event.altKey && event.key === "n") {
    try {
      // on dashboard page
      if (
        document
          .querySelector(
            "#TicketListHeaderDiv > table > tbody > tr:nth-child(1) > td > div.buttonsLeft > table > tbody"
          )
          ?.innerText?.match(/New Ticket/g)
      ) {
        // create new ticket
        document
          .querySelector(
            "#TicketListHeaderDiv > table > tbody > tr:nth-child(1) > td > div.buttonsLeft > table > tbody > tr > td:nth-child(1) > a"
          )
          .click();
      } else {
        let cancelSection = [
          ...document.querySelectorAll(
            "#TechNoteEditorUpdateContainer > table > tbody > tr"
          ),
        ].find(({ innerText, textContent }) => innerText.match(/Cancel/g));
        // if note is already open
        if (cancelSection) {
          // close note
          cancelSection.querySelector("td > div > a").click();
        }
        // create new note
        else {
          document
            .querySelector(
              "#NoteListUpdateDiv > table > tbody > tr.header > td.newNoteHeader > a"
            )
            .click();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // CTRL + ENTER saves tech notes and formats it (bolds assets)
  else if (event.ctrlKey && event.key === "Enter") {
    try {
      let element = document.getElementById("noteText");
      if (element) {
        // formats tech note
        element.value = element.value.replace(
          /(?<=[^\]])a\d{6}/gim,
          (m) => `[b]${m.toUpperCase()}[/b]`
        );
        // bolds urls but unnecessary
        // element.value = element.value.replace(
        //   /(?<=[^\]][^ ])https?:\/\/\S+/gim,
        //   (m) => `[b] ${m} [/b]`
        // );
        // // quote an email
        // if (element.value.match(/^From:/g))
        //   element.value = `[quote]${element.value}[/quote]`;
        // // bold subject line
        // if (element.value.match(/(?<=^Subject:).*/gim))
        //   element.value = element.value.replace(
        //     /(?<=^Subject:).*/gim,
        //     (m) => `[b]${m}[/b]`
        //   );

        // mark visible to client if email
        if (element.value.match(/^(\[quote\])?From:/g)) {
          document.querySelector(
            "#TechNoteEditorUpdateContainer > table > tbody > tr:nth-child(1) > td.dataTop > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > input[type=checkbox]"
          ).checked = true;
        }
        // find save button
        let buttonSection = [
          ...document.querySelectorAll(
            "#TechNoteEditorUpdateContainer > table > tbody > tr"
          ),
        ].find(({ innerText, textContent }) => innerText.match(/Save/g));
        // if note is already open
        if (buttonSection) {
          // close note
          [...buttonSection.querySelectorAll("td > div > a")]
            .find((b) => b.innerText.match(/Save/g))
            .click();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + A goes to asset tab
  else if (event.altKey && event.key === "a") {
    try {
      document
        .querySelector(
          "#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > div"
        )
        .click();
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + C goes to client tab
  else if (event.altKey && event.key === "c") {
    try {
      document
        .querySelector(
          "#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > div"
        )
        .click();
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + T goes to ticket tab
  else if (event.altKey && event.key === "t") {
    try {
      document
        .querySelector(
          "#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > div"
        )
        .click();
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + S saves ticket (when on ticket tab)
  else if (event.altKey && event.key === "s") {
    try {
      let notClicked = true;
      // buttons have different locations
      let saveButtons = [
        document.querySelector(
          "#TicketSaveButtonsContainer > tr > td > table > tbody > tr > td:nth-child(2) > div > a:nth-child(14)"
        ),
        document.querySelector(
          "#TicketSaveButtonsContainer > tr > td > table > tbody > tr > td:nth-child(2) > div > a:nth-child(15)"
        ),
      ];
      // find the right button to click
      for (let button of saveButtons) {
        if (button) {
          button.click();
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + Q goes to the "My Tickets" queue
  else if (event.altKey && event.key === "q") {
    try {
      window.location =
        "https://whd.biola.edu/helpdesk/WebObjects/Helpdesk.woa/wa/TicketActions/view?tab=mine";
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + J jumps to a ticket from ticket number, pasting T224397, Ticket 224397, and 224397 work (capitalization does not matter)
  else if (event.altKey && event.key === "j") {
    try {
      let ticketNumber;
      while (!ticketNumber) {
        ticketNumber = prompt("Enter a ticket number:").match(
          /(?<=T?(icket ?)?)\d{6}/gim
        );
      }
      ticketNumber = ticketNumber[0];
      window.location = `https://whd.biola.edu/helpdesk/WebObjects/Helpdesk.woa/wa/TicketActions/view?ticket=${ticketNumber}`;
    } catch (error) {
      console.log(error);
    }
  }
  // ALT + R expands request type select menu
  else if (event.altKey && event.key === "r") {
    try {
      ExpandSelect(
        [...document.getElementById("ticketRequestTypeObserverDiv").childNodes]
          .filter((t) => t.tagName === "SELECT")
          .at(-1)
      );
    } catch (error) {
      console.log(error);
    }
  }
});

// format on copy/paste
document.addEventListener("paste", async (event) => {
  let element = event.target;
  let text = await navigator.clipboard.readText();
  text = text.replace(/\r/gim, "");
  text = text.replace(/^\n+---------- Forwarded message ---------\n/g, "");
  let isEmail = text.match(/^From:/g);
  if (isEmail) {
    let isFormstack = text.match(
      /^From: OnceHub Mailer \<mailer@oncehub.com\>/g
    );
    // is formstack form
    if (isFormstack) {
      // bolds next line after the following headers
      // first group is `text + newline` (for field being on next line)
      // second group is `text:` (for field being on same line)
      text = text.replace(
        /(?<=((To: <it.helpdesk@biola.edu>\n\n\n |Booking page image|Subject|Technical Support Appointment|Calendar|Your time|Customer time|Location|Booking ID|Customer name|Phone number|Customer's mobile phone|Type of Assistance|What type of computer is being updated\?|Best number to reach you|Asset Number|Computer OS Update Time Slot|Ticket Number)\n)|((Passcode:|Meeting ID:|Meeting passcode:) ?)).*/gm,
        (m) => `[b]${m}[/b]`
      );
    }
    // bold sender
    text = text.replace(/(?<=^From: )[^\<]+/gim, (m) => `[b]${m}[/b]`);
    // bold subject line
    text = text.replace(/(?<=^Subject: ).*/gim, (m) => `[b]${m}[/b]`);
    // removes ticket thread
    text = text.replace(
      /On .* Biola IT Helpdesk <it.helpdesk@biola.edu> wrote:[^]+/gim,
      ""
    );

    // quotes email
    text = `[quote]${text}[/quote]`;
    element.value = text;
    event.preventDefault();
  }
});
